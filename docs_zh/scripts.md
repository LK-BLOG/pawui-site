# 脚本

`<script>` 块是 PawUI 的逻辑层：纯 Python，在本文件内提供事件处理器、派生值与状态。

## 规则

- 整个文件**最多一个** `<script>` 块，位于顶层。
- 内容是原始 Python，会被编译后执行。
- 执行时的命名空间自动包含 `state` 和 `app`（运行时实例）。
- 脚本中的**顶层函数与变量**会进入运行时命名空间，供模板与事件按名引用。

```html
<script>
state.count = 0

def increment():
    state.count += 1
</script>
```

```html
<Text>{$count}</Text>
<Button on_click="increment">+1</Button>
```

## 命名空间里有什么

| 名字 | 说明 |
|------|------|
| `state` | 响应式状态对象 |
| `app` | 运行时实例（可调用 `invoke_async` / `set_theme` / `refresh` 等） |
| 你的顶层函数/变量 | 供 `on_click`、模板引用 |
| `context` | 通过 Python API 注入的外部依赖 |

## 使用 import

标准库或第三方包可正常导入：

```python
import time
import json
from datetime import datetime

def now():
    return datetime.now().strftime("%H:%M:%S")
```

## 注入外部依赖（context）

用 Python API 运行时，可以通过 `context` 把外部对象注入脚本，避免在 `.paw` 里硬编码：

```python
from pawui.runtime import Runtime

class Repo:
    def all(self):
        return ["a", "b", "c"]

rt = Runtime(source, context={"repo": Repo()})
rt.run(block=True)
```

```python
def load():
    state.items = repo.all()
```

## 函数作为处理器

处理器按名解析，运行时只传入其声明的参数：

```python
def save():            # 无参
    ...

def log(text):         # 收到事件值
    print(text)
```

## 函数作为派生值

模板遇到可调用对象会自动调用：

```python
def total():
    return len(state.items)

state.total = total
```

## 编译与错误

脚本中的 Python 语法错误会在加载时报 `ScriptError`：

```
PawUI error: script block has invalid Python syntax: ...  (at line N:C)
```

用 `pawui check app.paw` 可以只做解析、不运行，快速定位问题。

## 与 state 的分工

- **脚本**：定义函数与初始逻辑。
- **state**：存放可变数据，驱动界面刷新。

保持处理器短小：读取 state → 计算 → 写回 state（见[最佳实践](#/best-practices)）。

## 下一步

- [状态进阶](#/state-advanced) — 订阅与生命周期
- [异步](#/async) — 耗时任务
- [API 参考](#/api) — `Runtime` 与 `context`
