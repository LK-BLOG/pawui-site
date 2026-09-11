# Scripts

The `<script>` block is PawUI's logic layer: plain Python that provides handlers, derived values, and state for the file.

## Rules

- At most **one** `<script>` block per file, at the top level.
- Its content is raw Python, compiled then executed.
- The namespace automatically includes `state` and `app` (the Runtime instance).
- **Top-level functions and variables** enter the runtime namespace, referencable by name from templates and events.

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

## What's in the namespace

| Name | Description |
|------|-------------|
| `state` | Reactive state object |
| `app` | Runtime instance (`invoke_async` / `set_theme` / `refresh`, ...) |
| Your top-level functions/vars | Referenced by `on_click`, templates |
| `context` | External dependencies injected via the Python API |

## Imports

Standard library and third-party packages import normally:

```python
import time
import json
from datetime import datetime

def now():
    return datetime.now().strftime("%H:%M:%S")
```

## Injecting dependencies (context)

When running via the Python API, pass external objects into the script via `context`, instead of hardcoding them in the `.paw`:

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

## Functions as handlers

Handlers resolve by name; the runtime passes only the parameters they declare:

```python
def save():            # zero-arg
    ...

def log(text):         # receives the event value
    print(text)
```

## Functions as derived values

Templates automatically call callable values:

```python
def total():
    return len(state.items)

state.total = total
```

## Compilation and errors

Python syntax errors in the script raise `ScriptError` at load:

```
PawUI error: script block has invalid Python syntax: ...  (at line N:C)
```

Use `pawui check app.paw` to parse without running.

## Division of labor with state

- **Script**: defines functions and initial logic.
- **state**: holds mutable data that drives the UI.

Keep handlers small: read state → compute → write state (see [Best Practices](#/docs/best-practices)).

## Next

- [State, In Depth](#/docs/state-advanced) — subscriptions and lifecycle
- [Async](#/docs/async) — long tasks
- [API Reference](#/docs/api) — `Runtime` and `context`
