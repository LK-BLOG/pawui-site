# State & Scripts

PawUI's reactive core is a lightweight `state` object. **Write state → bound UI refreshes automatically.** No manual widget updates.

## The `state` object

Inside `<script>`, `state` is injected into the namespace and ready to use.

### Reading

```python
state.count            # attribute style; "" if missing
state["count"]         # dict style
state.get("count", 0)  # with default; preferred for numbers
state.has("count")     # membership
state.keys()           # all keys
state.snapshot()       # plain dict copy
```

> Note: reading an unset key via attribute access returns `""` rather than raising. Prefer `state.get("x", 0)` before arithmetic.

### Writing

```python
state.count = 42          # attribute style
state["count"] = 42       # dict style
state.set("count", 42)    # method style
```

Writing notifies all listeners for that key, updating bound widgets.

### Subscribing

```python
def on_count_change(value):
    print("count is now", value)

unsub = state.watch("count", on_count_change)
# unsub()  # cancel
state.watch("*", lambda v: print("any key changed"))  # watch all
```

## Template binding (state → UI)

Reference state in the UI. When it changes, widgets using it update automatically:

```html
<Text>{$count}</Text>
<Text>Hello, {$name}</Text>
<Progress value="{$progress}" max="100"/>
```

Three equivalent forms: `{$count}`, `{count}`, `$count` (see [Syntax](#/syntax)).

## Two-way binding (UI ↔ state)

Interactive components (`Input`, `TextArea`, `Checkbox`, `Slider`) use `bind` to **write back** to state:

```html
<Input bind="username"/>
<Slider bind="volume" min="0" max="100"/>
<Checkbox bind="agreed">Agree</Checkbox>
```

To also push state back into the widget, give `value` a template:

```html
<Input value="{$username}" bind="username"/>
<Slider value="{$volume}" bind="volume"/>
```

`bind="username"` writes user input to `state.username`; `value="{$username}"` updates the field when `state.username` changes.

## The `<script>` block

- At most **one** `<script>` block per file, at the top level.
- Its content is raw Python, compiled then executed.
- The namespace includes `state`, `app` (the Runtime instance), and any injected `context`.
- **Top-level functions** defined in the script enter the runtime namespace and can be referenced by name from `on_click` etc.

```html
<script>
state.items = ["Apple", "Banana"]
state.selected = ""

def select(item):
    state.selected = item

def clear():
    state.items = []
    state.selected = ""
</script>
```

## Functions as state values

Templates automatically **call** callable values:

```html
<Text>{$summary}</Text>
```

```python
def summary():
    return f"{len(state.items)} items"

state.summary = summary
```

Every time `state.summary` is evaluated the function is called. Useful for lightweight derived values.

## State persistence

- **Window refresh (`app.refresh()`)**: UI rebuilds; the script does **not** re-run; State is preserved.
- **Hot reload (`pawui watch`)**: source is re-parsed and the script re-runs, but the **State object and namespace functions are preserved**.
- So an initialization like `state.count = 0` will overwrite on reload. To initialize only once:

```python
if not state.has("count"):
    state.count = 0
```

## Common patterns

### Form validation

```python
def submit():
    if not state.username.strip():
        state.error = "Username is required"
        return
    state.error = ""
    # ... submit
```

```html
<Input bind="username" value="{$username}" placeholder="Username"/>
<If condition="{$has_error}">
  <Text color="danger">{$error}</Text>
</If>
```

### List add/remove

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

### Derived values

```python
def count():
    return len(state.todos)

state.count = count
```

```html
<Text>{$count} items</Text>
```

## Next

- [Events](#/events) — how handlers are invoked
- [API Reference](#/api) — Python interfaces for `State` and `Runtime`
