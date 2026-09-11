# 异步与耗时任务

界面运行在 Qt 主线程。任何耗时操作（网络、磁盘、睡眠、重计算）如果直接放在处理器里，都会**冻结整个界面**。用 `app.invoke_async` 解决。

## 基本用法

```python
import time

def work():
    # 后台线程执行：只做计算，绝对不要碰任何控件或 state
    time.sleep(2)
    return ["结果 1", "结果 2", "结果 3"]

def on_done(result, error):
    # 主线程执行：可以安全更新 state
    if error:
        state.status = f"失败：{error}"
        return
    state.items = result
    state.status = "加载完成"

def start():
    state.status = "加载中..."
    app.invoke_async(work, done=on_done)
```

```html
<Button on_click="start">开始加载</Button>
<Text color="subtext">{$status}</Text>
<For each="row" in="{$items}">
  <Text>{$row}</Text>
</For>
```

## 两条铁律

1. **`handler` 在后台线程运行** —— 不要在其中访问控件或调用 `state`。
2. **`done(result, error)` 在主线程运行** —— 在这里更新 `state`。

违反第一条会导致界面随机崩溃或死锁。

## 错误处理

`done` 会收到 `error` 参数。它非空时表示后台任务抛出了异常：

```python
def on_done(result, error):
    if error:
        state.status = "加载失败，请重试"
        state.detail = str(error)
        return
    state.data = result
```

务必处理错误，否则失败时界面会一直停在"加载中"。

## 传参

`invoke_async` 支持向后台函数传参：

```python
def fetch(url):
    ...
    return data

def load(url):
    app.invoke_async(fetch, url, done=on_done)
```

```html
<Button on_click="load" ...>
```

> 注意：处理器当前从事件中拿到的是控件值；需要区分多个参数时，可把目标存进 state 再在处理器里读取。

## 进度反馈

后台不能写 state，但可以在 `done` 里做阶段更新；需要细粒度进度时，可以让后台任务返回中间结果：

```python
def work():
    results = []
    for i in range(1, 6):
        results.append(i * 10)
    return results
```

## 常见场景

| 场景 | 做法 |
|------|------|
| 网络请求 | 后台 `requests`/`urllib`，`done` 里赋值 |
| 读取大文件 | 后台读取，`done` 里解析/展示 |
| 批量计算 | 后台计算，`done` 里写 state |
| 定时刷新 | 后台任务 + 结果回调；避免在处理器里 `sleep` |

## 与 `refresh` 的区别

- `app.invoke_async`：在后台跑一段**逻辑**，完成后回主线程。
- `app.refresh()`：重建整棵控件树（昂贵），仅用于结构变化。

## 下一步

- [事件](#/docs/events) — 处理器解析规则
- [性能](#/docs/performance) — 保持流畅
