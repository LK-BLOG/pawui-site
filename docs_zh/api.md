# API 参考

PawUI 既可以用命令行运行 `.paw` 文件，也可以作为 Python 库嵌入到你的代码中。

## 顶层 API

```python
from pawui import run, main

run("app.paw")                 # 运行文件（阻塞直到窗口关闭）
main(["check", "app.paw"])     # 等价于命令行，返回退出码
```

| 名称 | 说明 |
|------|------|
| `pawui.run(path, context=None, theme="dark")` | 读取并运行 `.paw` 文件 |
| `pawui.main(argv=None) -> int` | 命令行入口，返回退出码 |
| `pawui.__version__` | 版本字符串 |

## 运行时

```python
from pawui.runtime import Runtime, render
```

### `render(...)`

```python
def render(source, filename="<memory>", context=None, theme="dark", block=False):
    ...
```

从源码字符串渲染，返回根 `QWidget`。

```python
from pawui.runtime import render

source = open("app.paw", encoding="utf-8").read()
root = render(source, block=False)
```

### `Runtime`

```python
from pawui.runtime import Runtime

rt = Runtime(source, filename="app.paw", context={"api": client}, theme="dark")
rt.run(block=True)
```

| 成员 | 说明 |
|------|------|
| `rt.state` | 响应式 `State` 对象 |
| `rt.root` | 根 `QWidget` |
| `rt.namespace` | 脚本顶层命名空间（函数等） |
| `rt.theme` | 当前 `Theme` |
| `rt.run(block=True)` | 准备、构建并进入事件循环 |
| `rt.refresh()` | 重建 UI（调度到事件循环） |
| `rt.reload(source)` | 重新解析源码并重建，保留 State |
| `rt.invoke(handler, *args)` | 按签名调用处理器 |
| `rt.invoke_async(handler, *args, done=None)` | 后台线程执行，`done(result, error)` 回主线程 |
| `rt.set_theme(name_or_theme)` | 切换主题 |

### `context` 注入

传给 `Runtime` / `render` 的 `context` 会合并进脚本命名空间，用于注入外部依赖：

```python
class Client:
    def fetch(self):
        return ["a", "b"]

rt = Runtime(source, context={"client": Client()})
```

```html
<Button on_click="load"/>
```

```python
def load():
    state.items = client.fetch()
```

## 解析器

```python
from pawui.parser import parse
from pawui.nodes import Element, ScriptBlock, Program

program = parse(source, "app.paw")
program.elements     # list[Element]
program.script       # ScriptBlock | None
```

| 节点 | 字段 |
|------|------|
| `Program` | `elements`, `script` |
| `Element` | `tag`, `props`, `children`, `pos`, `name` |
| `ScriptBlock` | `source`, `pos` |

## 状态

```python
from pawui.state import State

s = State({"count": 0})
s.count                # 0
s["count"]             # 0
s.get("missing", 5)    # 5
s.has("count")         # True
s.set("count", 1)      # 触发监听器
s.watch("count", fn)   # 订阅，返回退订函数
s.keys()               # ["count"]
s.snapshot()           # {"count": 1}
```

## 主题

```python
from pawui.theme import Theme, THEMES

Theme.dark()            # 深色主题实例
Theme.light()           # 浅色主题实例
THEMES["dark"]          # 工厂函数

t = Theme.dark()
t.accent = "#ff6b6b"
t.override(radius=12)   # 返回新 Theme
t.color("accent")       # 取色
t.apply({"brand": "#4ecdc4"})  # 批量覆盖
```

## 错误类型

```python
from pawui.errors import (
    PyxError,        # 基类，含 .message / .pos / .formatted()
    LexerError,
    ParseError,
    ComponentError,
    RenderError,
    ScriptError,
)
```

捕获并友好显示：

```python
from pawui.errors import PyxError

try:
    run("app.paw")
except PyxError as e:
    print(e.formatted())   # PawUI error: ...  (at line N:C)
```

## 完整嵌入示例

```python
from pawui.runtime import Runtime
from pawui.errors import PyxError

SOURCE = """
<Window title="嵌入" width="360" height="200">
  <Column padding="24" spacing="12">
    <Text size="18" bold>{$message}</Text>
    <Button on_click="greet">打招呼</Button>
  </Column>
</Window>

<script>
state.message = "你好"

def greet():
    state.message = "按钮被点击了"
</script>
"""

rt = Runtime(SOURCE, context={})
try:
    rt.run(block=True)          # 阻塞，直到关闭窗口
except PyxError as e:
    print(e.formatted())
```

## 下一步

- [命令行](#/cli) — `pawui` 的所有命令
- [状态与脚本](#/state-scripts) — 状态驱动界面
