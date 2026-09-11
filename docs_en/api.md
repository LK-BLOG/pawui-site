# API Reference

PawUI runs `.paw` files from the command line, and can also be embedded as a Python library.

## Top-level API

```python
from pawui import run, main

run("app.paw")                 # run a file (blocks until the window closes)
main(["check", "app.paw"])     # CLI equivalent, returns exit code
```

| Name | Notes |
|------|-------|
| `pawui.run(path, context=None, theme="dark")` | Read and run a `.paw` file |
| `pawui.main(argv=None) -> int` | CLI entry point, returns exit code |
| `pawui.__version__` | Version string |

## Runtime

```python
from pawui.runtime import Runtime, render
```

### `render(...)`

```python
def render(source, filename="<memory>", context=None, theme="dark", block=False):
    ...
```

Render from a source string; returns the root `QWidget`.

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

| Member | Notes |
|--------|-------|
| `rt.state` | Reactive `State` object |
| `rt.root` | Root `QWidget` |
| `rt.namespace` | Script top-level namespace (functions, etc.) |
| `rt.theme` | Current `Theme` |
| `rt.run(block=True)` | Prepare, build, and enter the event loop |
| `rt.refresh()` | Rebuild the UI (scheduled on the event loop) |
| `rt.reload(source)` | Re-parse and rebuild, preserving State |
| `rt.invoke(handler, *args)` | Call a handler according to its signature |
| `rt.invoke_async(handler, *args, done=None)` | Run on a thread; `done(result, error)` on the main thread |
| `rt.set_theme(name_or_theme)` | Switch theme |

### Injecting `context`

`context` passed to `Runtime` / `render` is merged into the script namespace, useful for dependency injection:

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

## Parser

```python
from pawui.parser import parse
from pawui.nodes import Element, ScriptBlock, Program

program = parse(source, "app.paw")
program.elements     # list[Element]
program.script       # ScriptBlock | None
```

| Node | Fields |
|------|--------|
| `Program` | `elements`, `script` |
| `Element` | `tag`, `props`, `children`, `pos`, `name` |
| `ScriptBlock` | `source`, `pos` |

## State

```python
from pawui.state import State

s = State({"count": 0})
s.count                # 0
s["count"]             # 0
s.get("missing", 5)    # 5
s.has("count")         # True
s.set("count", 1)      # notifies listeners
s.watch("count", fn)   # subscribe; returns unsubscribe
s.keys()               # ["count"]
s.snapshot()           # {"count": 1}
```

## Theme

```python
from pawui.theme import Theme, THEMES

Theme.dark()            # dark Theme instance
Theme.light()           # light Theme instance
THEMES["dark"]          # factory function

t = Theme.dark()
t.accent = "#ff6b6b"
t.override(radius=12)   # returns a new Theme
t.color("accent")       # look up a color
t.apply({"brand": "#4ecdc4"})  # batch overrides
```

## Errors

```python
from pawui.errors import (
    PyxError,        # base; .message / .pos / .formatted()
    LexerError,
    ParseError,
    ComponentError,
    RenderError,
    ScriptError,
)
```

Catch and display nicely:

```python
from pawui.errors import PyxError

try:
    run("app.paw")
except PyxError as e:
    print(e.formatted())   # PawUI error: ...  (at line N:C)
```

## Full embedding example

```python
from pawui.runtime import Runtime
from pawui.errors import PyxError

SOURCE = """
<Window title="Embedded" width="360" height="200">
  <Column padding="24" spacing="12">
    <Text size="18" bold>{$message}</Text>
    <Button on_click="greet">Greet</Button>
  </Column>
</Window>

<script>
state.message = "Hello"

def greet():
    state.message = "Button clicked"
</script>
"""

rt = Runtime(SOURCE, context={})
try:
    rt.run(block=True)          # blocks until the window closes
except PyxError as e:
    print(e.formatted())
```

## Next

- [CLI](#/docs/cli) — every `pawui` command
- [State & Scripts](#/docs/state-scripts) — state-driven UI
