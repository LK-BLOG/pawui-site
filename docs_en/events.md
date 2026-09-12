# Events

PawUI's event model is simple: an attribute names a **handler**, and the runtime looks up a function of that name in the script namespace and calls it. Arguments are passed based on the function's signature.

## Declaring handlers

```html
<Button on_click="save">Save</Button>
<Input on_change="on_name_change" on_enter="submit"/>
<Checkbox on_change="on_toggle"/>
<Slider on_change="on_volume" min="0" max="100"/>
```

Values may omit quotes or use a template:

```html
<Button on_click=save>Save</Button>
<Button on_click="{$handler}">Dynamic</Button>
```

## Argument rules

The runtime inspects the handler signature with `inspect.signature`:

| Signature | Invocation | Receives |
|-----------|------------|----------|
| `def handler():` | `handler()` | nothing |
| `def handler(text):` | `handler(event_value)` | the event value |
| `def handler(*args):` | `handler(event_value)` | the event value |

In other words, **a zero-arg function won't error just because the component provides an event value** — handy for reuse:

```python
def save():             # usable directly as on_click
    ...

def log(text):          # receives the event value
    print(text)
```

Event values by component:

| Event | Component | Argument |
|-------|-----------|----------|
| `on_click` | Button | none |
| `on_change` | Input / TextArea | `text: str` |
| `on_enter` | Input | `text: str` |
| `on_change` | Checkbox | `checked: bool` |
| `on_change` | Slider | `value: int` |

## Where handlers are resolved

Resolution order: **current scope → `state` → script namespace → theme attributes**.

- Top-level functions in the script are the common case.
- You can also store a function in `state` and reference it by name:

```python
def confirm():
    ...

state.confirm = confirm
```

```html
<Button on_click="confirm">Confirm</Button>
```

## Two-way binding with `bind`

`bind` writes an interactive component's value back to state, **no handler needed**:

```html
<Input bind="username"/>
<Checkbox bind="agreed">Agree</Checkbox>
<Slider bind="volume"/>
<TextArea bind="content"/>
```

This is equivalent to writing state in `on_change`. Combined with `value="{$key}"` it updates the widget too:

```html
<Input value="{$username}" bind="username"/>
```

| Component | `bind` writes |
|-----------|---------------|
| Input / TextArea | text `str` |
| Checkbox | bool |
| Slider | int |

## Common patterns

### Form submit

```html
<Input bind="email" value="{$email}" on_enter="submit" placeholder="Email"/>
<Button on_click="submit">Submit</Button>
```

```python
def submit():
    if "@" not in state.email:
        state.message = "Invalid email"
        return
    state.message = "Submitted"
```

### Counter (zero-arg handler)

```html
<Button on_click="inc">+1</Button>
```

```python
state.count = 0

def inc():
    state.count = state.count + 1
```

## Async and long tasks

Doing heavy work in a handler **blocks the UI**. Use `app.invoke_async` to run it on a background thread and update on completion:

```python
def load_data():
    # background thread: compute only, do not touch widgets
    import time
    time.sleep(2)
    return ["result 1", "result 2"]

def on_loaded(result, error):
    # main thread: safe to update state
    if error:
        state.status = f"Failed: {error}"
        return
    state.items = result
    state.status = "Done"

def start_load():
    state.status = "Loading..."
    app.invoke_async(load_data, done=on_loaded)
```

```html
<Button on_click="start_load">Load</Button>
<Text>{$status}</Text>
```

Key points:

- The handler runs on a background thread — **never touch Qt widgets there**.
- `done(result, error)` runs on the main thread; update state safely.
- Good for network, file I/O, heavy computation.

## Theme switching

Switch themes at runtime:

```python
def toggle_theme():
    state.dark = not state.dark
    app.set_theme("dark" if state.dark else "light")
```

## Next

- [State & Scripts](#/state-scripts) — the full `state` API
- [API Reference](#/api) — `Runtime.invoke` / `invoke_async`
