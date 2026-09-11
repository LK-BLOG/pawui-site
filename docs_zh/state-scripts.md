# 状态与脚本

PawUI 的响应式核心是一个轻量的 `state` 对象。**写 state → 绑定的界面自动刷新**，无需手动操作控件。

## `state` 对象

在 `<script>` 中，`state` 会自动注入命名空间，可直接使用。

### 读取

```python
state.count            # 属性风格，不存在时返回 ""
state["count"]         # 字典风格
state.get("count", 0)  # 带默认值，推荐用于数值
state.has("count")     # 是否存在
state.keys()           # 所有键
state.snapshot()       # 返回普通 dict 副本
```

> 注意：未设置的键通过属性访问返回 `""` 而不是报错。做算术前用 `state.get("x", 0)` 更安全。

### 写入

```python
state.count = 42          # 属性风格
state["count"] = 42       # 字典风格
state.set("count", 42)    # 方法风格
```

写入会触发该键的所有监听器，从而更新绑定的组件。

### 订阅

```python
def on_count_change(value):
    print("count 变成了", value)

unsub = state.watch("count", on_count_change)
# unsub()  # 取消订阅
state.watch("*", lambda v: print("任意键变化了"))  # 订阅全部
```

## 模板绑定（state → UI）

在界面里用插值引用状态。状态变化时，使用该状态的组件自动更新：

```html
<Text>{$count}</Text>
<Text>你好，{$name}</Text>
<Progress value="{$progress}" max="100"/>
<Progress value="{$progress}" max="100"/>
```

支持的三种写法：`{$count}`、`{count}`、`$count`（见 [语法](#/docs/syntax)）。

## 双向绑定（UI ↔ state）

交互组件（`Input`、`TextArea`、`Checkbox`、`Slider`）用 `bind` 把控件值**写回** state：

```html
<Input bind="username"/>
<Slider bind="volume" min="0" max="100"/>
<Checkbox bind="agreed">同意</Checkbox>
```

为了让 state **写回**控件形成完整双向，再给 `value` 一个模板：

```html
<Input value="{$username}" bind="username"/>
<Slider value="{$volume}" bind="volume"/>
```

`bind="username"` 会把用户输入写入 `state.username`；`value="{$username}"` 会在 `state.username` 变化时更新输入框。

## `<script>` 块

- 整个文件**顶层最多一个** `<script>` 块。
- 内容是原始 Python，会先编译再执行。
- 执行时命名空间包含：`state`、`app`（Runtime 实例）、以及传入的 `context`。
- 脚本中定义的**顶层函数**会进入运行时命名空间，供 `on_click` 等属性按名引用。

```html
<script>
state.items = ["苹果", "香蕉"]
state.selected = ""

def select(item):
    state.selected = item

def clear():
    state.items = []
    state.selected = ""
</script>
```

## 函数作为状态值

模板插值在解析到可调用对象时会**自动调用它**：

```html
<Text>{$summary}</Text>
```

```python
def summary():
    return f"共 {len(state.items)} 项"

state.summary = summary
```

每次 `state.summary` 被求值都会调用函数。这适合做轻量派生值。

## 状态持久性

- **窗口刷新 (`app.refresh()`)**：重建 UI，脚本**不重新执行**，State 保留。
- **热重载 (`pawui watch`)**：重新解析并执行脚本，但 **State 对象与命名空间函数保留**。
- 因此热重载时，`state.count = 0` 这类初始化不会把已有状态清空——如果你希望重新初始化，需要在脚本里显式判断：

```python
if not state.has("count"):
    state.count = 0
```

## 常见模式

### 表单校验

```python
def submit():
    if not state.username.strip():
        state.error = "用户名不能为空"
        return
    state.error = ""
    # ... 提交逻辑
```

```html
<Input bind="username" value="{$username}" placeholder="用户名"/>
<If condition="{$has_error}">
  <Text color="danger">{$error}</Text>
</If>
```

### 列表增删

```python
state.todos = []

def add():
    text = state.draft.strip()
    if text:
        state.todos = state.todos + [text]
        state.draft = ""

def remove(index):
    items = list(state.todos)
    items.pop(index)
    state.todos = items
```

### 派生值

```python
def count():
    return len(state.todos)

state.count = count
```

```html
<Text>共 {$count} 项</Text>
```

## 下一步

- [事件](#/docs/events) — 处理器如何被调用
- [API 参考](#/docs/api) — `State` 与 `Runtime` 的 Python 接口
