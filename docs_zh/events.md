# 事件

PawUI 的事件模型很简单：属性里写**处理器的名字**，运行时从脚本命名空间里查找同名函数并调用。参数按函数签名**智能传递**。

## 声明处理器

```html
<Button on_click="save">保存</Button>
<Input on_change="on_name_change" on_enter="submit"/>
<Checkbox on_change="on_toggle"/>
<Slider on_change="on_volume" min="0" max="100"/>
```

属性值也可以省略引号或写成模板：

```html
<Button on_click=save>保存</Button>
<Button on_click="{$handler}">动态</Button>
```

## 参数传递规则

运行时用 `inspect.signature` 检查处理器签名：

| 处理器签名 | 调用方式 | 收到的参数 |
|------------|----------|------------|
| `def handler():` | `handler()` | 无 |
| `def handler(text):` | `handler(event_value)` | 事件值 |
| `def handler(*args):` | `handler(event_value)` | 事件值 |

也就是说——**无参函数不会因为组件传了事件值而报错**。这让同一个处理器可以灵活复用：

```python
def save():             # 可以被 on_click 直接调用
    ...

def log(text):          # 接收事件值
    print(text)
```

各组件提供的事件值：

| 事件 | 组件 | 参数 |
|------|------|------|
| `on_click` | Button | 无 |
| `on_change` | Input / TextArea | `text: str` |
| `on_enter` | Input | `text: str` |
| `on_change` | Checkbox | `checked: bool` |
| `on_change` | Slider | `value: int` |

## 处理器去哪里找

按顺序解析：**当前作用域 → `state` → 脚本命名空间 → 主题属性**。

- 脚本里定义的顶层函数最常用。
- 你也可以把一个函数放进 `state`，用名字引用：

```python
def confirm():
    ...

state.confirm = confirm
```

```html
<Button on_click="confirm">确认</Button>
```

## 双向绑定 `bind`

`bind` 把交互组件的值写回 state，**不需要写处理器**：

```html
<Input bind="username"/>
<Checkbox bind="agreed">同意</Checkbox>
<Slider bind="volume"/>
<TextArea bind="content"/>
```

等价于在 `on_change` 里手动写 state。配合 `value="{$key}"` 还能反向更新控件：

```html
<Input value="{$username}" bind="username"/>
```

| 组件 | bind 写回的值 |
|------|----------------|
| Input / TextArea | 文本 `str` |
| Checkbox | 布尔 `bool` |
| Slider | 整数 `int` |

## 常见模式

### 表单提交

```html
<Input bind="email" value="{$email}" on_enter="submit" placeholder="邮箱"/>
<Button on_click="submit">提交</Button>
```

```python
def submit():
    if "@" not in state.email:
        state.message = "邮箱格式不正确"
        return
    state.message = "提交成功"
```

### 计数器（无参处理器）

```html
<Button on_click="inc">+1</Button>
```

```python
state.count = 0

def inc():
    state.count = state.count + 1
```

### 列表项操作（带参数）

```html
<For each="item" in="{$items}">
  <Row spacing="8">
    <Text>{$item}</Text>
    <Button on_click="{$remove}" .../>  <!-- 复杂场景用索引 -->
  </Row>
</For>
```

> 循环内按索引删除时，建议把索引存进 state 或用 `item` 的稳定 id。PawUI 当前的事件值只传递控件自身值，不直接携带循环变量。

## 异步与耗时任务

在处理器里直接做耗时操作会**阻塞界面**。使用 `app.invoke_async` 在后台线程执行，完成后回到主线程更新：

```python
def load_data():
    # 后台线程：只做计算，不要碰控件
    import time
    time.sleep(2)
    return ["结果1", "结果2"]

def on_loaded(result, error):
    # 主线程：安全地更新 state
    if error:
        state.status = f"失败：{error}"
        return
    state.items = result
    state.status = "加载完成"

def start_load():
    state.status = "加载中..."
    app.invoke_async(load_data, done=on_loaded)
```

```html
<Button on_click="start_load">开始加载</Button>
<Text>{$status}</Text>
```

要点：

- `handler` 在后台线程运行，**绝不能操作 Qt 控件**。
- `done(result, error)` 在主线程被调用，可以安全更新 state。
- 适合网络请求、文件读写、批量计算。

## 主题切换

运行时可以动态换主题：

```python
def toggle_theme():
    state.dark = not state.dark
    app.set_theme("dark" if state.dark else "light")
```

## 下一步

- [状态与脚本](#/state-scripts) — `state` 的完整 API
- [API 参考](#/api) — `Runtime.invoke` / `invoke_async`
