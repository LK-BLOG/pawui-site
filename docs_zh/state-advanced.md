# 状态进阶

`state` 不只是键值存储。这一节讲订阅、快照、重置与生命周期。

## 订阅变化

`watch` 监听某个键（或全部键）的变化：

```python
def on_count(value):
    print("count 现在是", value)

unsub = state.watch("count", on_count)   # 返回退订函数

# 订阅所有键
state.watch("*", lambda v: print("有状态变化"))
```

`watch` 返回的退订函数可随时调用：

```python
unsub()
```

## 遍历与快照

```python
state.keys()        # 所有键名列表
state.snapshot()    # 返回普通 dict 副本（可安全遍历/序列化）
state.has("count")  # 键是否存在
```

`snapshot()` 适合把当前状态传给外部函数或写日志，避免读到实时变化。

## 条件初始化

热重载会**重新执行脚本**但保留 State。直接写 `state.count = 0` 会覆盖已有值。只初始化一次：

```python
if not state.has("count"):
    state.count = 0
```

这样就既能在首次运行时初始化，又不会在热重载时重置用户数据。

## 重置状态

提供显式的重置函数，而不是重新赋值每个键：

```python
def reset():
    state.count = 0
    state.query = ""
    state.items = []
```

## 避免循环触发

监听器里再次写入同一个键会造成循环。谨慎在 `watch` 回调中改写被监听的键：

```python
# 危险：可能无限递归
state.watch("a", lambda v: state.set("a", v + 1))
```

需要派生值时用只读的派生函数，而不是回写（见下）。

## 派生值 vs 冗余存储

优先把派生值写成函数挂在 state 上，界面里直接引用：

```python
def total():
    return sum(float(x) for x in state.prices)

state.total = total
```

```html
<Text>合计 {$total}</Text>
```

这样不会出现「主数据变了但冗余键没同步」的问题。

## 命名空间中的函数

`<script>` 里的顶层函数既可作事件处理器，也可作派生值：

```python
def greeting():
    return f"你好，{state.name or '访客'}"

state.greeting = greeting
```

## 下一步

- [状态与脚本](#/docs/state-scripts) — 基础 API
- [表单](#/docs/forms) — 用状态驱动表单
