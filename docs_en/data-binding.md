# Data Binding

PawUI's reactivity comes from "templates + state". This page covers template parsing, path lookups, and two-way binding in detail.

## Three template forms

```html
<Text>{$count}</Text>      <!-- $ prefix, recommended -->
<Text>{count}</Text>       <!-- no prefix -->
```

A standalone reference may also use `$name` (no braces), but inside text you must use braces:

```html
<Text>Hello, {$name}!</Text>
```

## Paths and indexing

References support attribute paths and subscripts:

```html
<Text>{$user.name}</Text>
<Text>{$items[0]}</Text>
<Text>{$config["theme"]}</Text>
<Text>{$rows[2].title}</Text>
```

If a lookup fails partway, it resolves to an empty string instead of raising.

## Name resolution order

For `{$foo}`, PawUI looks up `foo` in this order:

1. Current scope (`<For>` loop variable, custom component props)
2. `state` keys
3. Script namespace (top-level functions/variables from `<script>`)
4. Theme attributes (`accent`, `surface`, ...)
5. Otherwise → empty string

## Important gotcha: theme tokens resolve automatically

Any **string prop or text content** whose value exactly equals a theme token name is replaced by that color:

```html
<!-- "accent" is not text — it becomes the accent color #7aa2f7 -->
<Text>accent</Text>
```

Tokens: `background` `surface` `text` `subtext` `accent` `border` `danger`, plus any custom color names from `<Color name="...">`. To display such a word literally, use a template:

```html
<Text>{"accent"}</Text>
```

(The interpolation result is a string and is not re-resolved.)

## Two-way binding

Interactive components write values back to state with `bind`:

```html
<Input bind="username"/>
<TextArea bind="bio"/>
<Checkbox bind="agreed">Agree</Checkbox>
<Slider bind="volume" min="0" max="100"/>
```

For full two-way (state changes also update the widget), give `value` a template:

```html
<Input value="{$username}" bind="username"/>
<Slider value="{$volume}" bind="volume"/>
```

| Component | Writes back |
|-----------|-------------|
| Input / TextArea | `str` |
| Checkbox | `bool` |
| Slider | `int` |

## Derived values

Templates automatically **call** callable values:

```python
def total():
    return len(state.items)

state.total = total
```

```html
<Text>{$total} items</Text>
```

Called on every evaluation. Keep them light.

## Lists and scope

```html
<For each="item" in="{$items}">
  <Text>{$item.name}</Text>
</For>
```

- `in` takes a list reference. `{$items}` yields the **raw object** (not a string), so iteration works correctly.
- The variable declared by `each` is visible only inside the `<For>` subtree.

## Conditional rendering

```html
<If condition="{$visible}">
  <Text>Content</Text>
</If>
```

`condition` takes a **boolean or a single state reference**; expressions are not evaluated. For combined conditions, compute a boolean key in the script:

```python
def refresh():
    state.visible = bool(state.logged_in and state.count > 0)
```

## Common pitfalls

### In-place mutation doesn't refresh

```python
state.items.append(x)            # no refresh
state.items = state.items + [x]  # correct: assign a new object to fire listeners
```

### Unset keys return an empty string

```python
state.count = state.get("count", 0) + 1   # safe
```

### Component props resolve at build time

Custom component props are read once at build. To react to state, use template binding or rebuild the UI (`app.refresh()`).

## Next

- [State & Scripts](#/state-scripts) — the full `state` API
- [Events](#/events) — handlers and async
