# State & Scripts

## State Object

Global reactive state accessible from both markup and scripts.

```html
<Text>{$count}</Text>
<Text>{$user.name}</Text>
```

```python
# In <script>
state.count = 0
state.user = {"name": "Alice"}

# Triggers UI update
state.count = 42
```

### State API

```python
state.get(key, default="")      # Get value
state.set(key, value)           # Set value (triggers watchers)
state.has(key)                  # Check existence
state.watch(key, fn)            # Subscribe to changes
state.watch("*", fn)            # Subscribe to all changes
state.keys()                    # List all keys
state.snapshot()                # Copy of all data
```

### Attribute Access

```python
state.count = 1          # Same as state.set("count", 1)
value = state.count      # Same as state.get("count")
value = state["count"]   # Dict-style access
```

### Watchers

```python
def on_count_change(new_value):
    print(f"Count changed to {new_value}")

unwatch = state.watch("count", on_count_change)
state.count = 5  # Prints: Count changed to 5
unwatch()        # Stop listening
```

## Script Block

Raw Python executed at startup.

```html
<script>
# Available: state, app (Runtime instance)
state.title = "My App"
state.items = ["a", "b", "c"]

def add_item():
    state.items = state.items + [f"item{len(state.items)}"]

def clear():
    state.items = []
</script>
```

### Available in Script

- `state` - State instance
- `app` - Runtime instance (has `set_theme()`, `refresh()`)
- Any function/variable defined here becomes available as event handler

### Theme Switching

```python
def toggle_theme():
    current = "light" if app.theme.background == "#1e1e2e" else "dark"
    app.set_theme(current)
    app.refresh()
```

### Refresh

```python
# Force full UI rebuild
app.refresh()
```

## Control Flow

Conditional rendering with `<If>`:

```html
<Window>
    <If condition="{$logged_in}">
        <Text>Welcome back!</Text>
    </If>
</Window>
```

The `condition` prop accepts a resolved boolean, a state reference (`{$flag}`)
or a literal string (`true` / `yes` / `on` / `1`).

Looping with `<For>`:

```html
<Window>
    <For each="item" in="{$items}">
        <Text>{$item.name} — {$item.price}$</Text>
    </For>
</Window>
```

- `each` — the loop variable name (defaults to `item`).
- `in` — a state/namespace reference to a list (use `{$items}` so the raw
  list is used, not its string form).
- Supports nested loops and `<If>` inside a loop, with full attribute /
  index access on the loop value: `{$item.name}`, `{$row[0]}`.

## Best Practices

1. **Keep logic in script** - No expressions in markup
2. **Use state for UI data** - Triggers automatic updates
3. **Handlers are pure functions** - Receive args, mutate state
4. **Avoid side effects in script body** - Use handlers