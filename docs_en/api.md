# API Reference

## Core Classes

### `pawui.Runtime`

Main runtime class.

```python
class Runtime:
    def __init__(self, source: str, filename: str = "<memory>", 
                 context: dict | None = None, theme: str = "dark")
    
    def run(self, block: bool = True) -> QWidget
    def set_theme(self, name_or_theme: str | Theme) -> None
    def refresh(self) -> None
    def invoke(self, handler: Any, *args: Any) -> Any
    def queue_animation(self, widget: QWidget, kind: str, 
                        duration: int, delay: int, curve: str) -> None
```

### `pawui.State`

Reactive state container.

```python
class State:
    def __init__(self, initial: dict[str, Any] | None = None)
    
    def get(self, key: str, default: Any = "") -> Any
    def set(self, key: str, value: Any) -> None
    def has(self, key: str) -> bool
    def watch(self, key: str, fn: Callable[[Any], None]) -> Callable[[], None]
    def keys(self) -> list[str]
    def snapshot(self) -> dict[str, Any]
    
    # Attribute access
    def __getattr__(self, key: str) -> Any
    def __setattr__(self, key: str, value: Any) -> None
    def __getitem__(self, key: str) -> Any
    def __setitem__(self, key: str, value: Any) -> None
    def __contains__(self, key: str) -> bool
```

### `pawui.Theme`

Theme configuration.

```python
class Theme:
    background: str
    surface: str
    text: str
    subtext: str
    accent: str
    border: str
    danger: str
    spacing: int
    padding: int
    radius: int
    font_family: str
    font_size: int
    title_size: int
    custom: dict[str, str]
    
    @classmethod
    def light(cls) -> "Theme"
    @classmethod
    def dark(cls) -> "Theme"
    
    def override(self, **kwargs) -> "Theme"
    def color(self, name: str, default: str | None = None) -> str | None
    def apply(self, overrides: dict[str, str]) -> "Theme"
    def qss(self) -> str
    def to_dict(self) -> dict[str, Any]
```

### `pawui.parser.parse`

```python
def parse(source: str, filename: str = "<memory>") -> Program
```

### `pawui.resolve`

```python
def resolve_prop_value(value: Any, scope: dict, runtime: Runtime) -> Any
def resolve_raw(value: Any, scope: dict, runtime: Runtime) -> Any
def resolve_template(template: str, scope: dict, runtime: Runtime) -> str
def resolve_handler(value: Any, scope: dict, runtime: Runtime) -> Any
def is_template(v: Any) -> bool
def collect_refs(template: str, scope: dict, runtime: Runtime) -> set[str]
```

### `pawui.animate`

```python
def entrance(widget: QWidget, kind: str, duration: int = 260, 
             delay: int = 0, curve: str = "out-cubic") -> QParallelAnimationGroup
def easing(name: str) -> QEasingCurve.Type
def is_animation(kind: str) -> bool
```

## Built-in Components

Available via `pawui.components.BUILTINS`:

- `Window`
- `Column`
- `Row`
- `Text`
- `Button`
- `Input`
- `Checkbox`
- `Divider`
- `Spacer`
- `Slider`
- `Progress`
- `Select`
- `Dialog`
- `Menu`
- `Form`
- `Tabs`
- `Image`
- `Tooltip`
- `TextArea`
- `Scroll`
- `Web`
- `Grid`
- `Radio`
- `RadioGroup`
- `Segmented`
- `NumberInput`
- `DatePicker`
- `TimePicker`
- `FilePicker`
- `Badge`
- `Avatar`
- `Skeleton`
- `Spinner`
- `Link`
- `CodeBlock`
- `Markdown`
- `Panel`
- `Accordion`
- `SplitPane`
- `List`
- `Table`
- `VirtualList`
- `Canvas`
- `Shortcut`

共 44 个内置组件，另有 `<If>` / `<For>` 两个逻辑容器。

## DOM API（`Runtime` / `<script>` 里的 `app`）

```python
app.query(selector)                  # -> Element | None
app.query_all(selector)              # -> list[Element]
app.on(selector, kind, handler)      # 按选择器绑事件，返回绑定数量
app.append(target, markup, prepend=False)   # -> list[Element]
app.remove(target)                   # -> bool
app.inject_css(text)                 # 全局注入，追加在 <Style> 之后
app.css(selector, declarations)
app.toast(text, kind="info", duration=2400)
app.ready(fn)                        # 控件树建好后执行
app.validate()                       # 校验并把错误画到字段上 -> bool
app.submit()                         # 校验 + 调 <Form on_submit>
app.inspect_tree()                   # -> str，pawui inspect 用的就是它
```

`Element` 句柄（`app.query(...)` 的返回值）：

```python
el.text / el.value / el.id / el.tag / el.classes
el.attr(name, value=None)
el.add_class(*names) / el.remove_class(*names) / el.toggle_class(name) / el.has_class(name)
el.css(declarations) / el.on(kind, handler)
el.append(markup) / el.prepend(markup) / el.clear() / el.remove()
el.children() / el.closest(selector) / el.query(selector) / el.query_all(selector)
```

事件类型：`click` `change` `input` `enter` `hover` `leave` `focus` `blur`。
回调收到 `Event`，字段为 `type` / `target` / `value` / `key` / `checked`。

## Errors

```python
class PyxError(Exception)
class LexerError(PyxError)
class ParseError(PyxError)
class ComponentError(PyxError)
class RenderError(PyxError)
class ScriptError(PyxError)
```

## AST Nodes

```python
class Element
class ScriptBlock
class Program
class ComponentDef
class Symbol          # 运行时解析用；解析器不产生此节点
class Position
```

## Module Exports

```python
# pawui/__init__.py
__all__ = ["run", "main", "Runtime", "State", "Theme",
           "PawUIError", "PyxError", "ParseError", "RenderError", "ScriptError"]
__version__ = "0.1.3.1"

# pawui.cli
run(path, context=None, theme="dark") -> None
main(argv=None) -> int
```
