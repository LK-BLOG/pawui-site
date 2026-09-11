# Input

Single-line text input (`Input`) and multi-line input (`TextArea`). Both are self-closing.

## Input attributes

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `placeholder` | str | `""` | Placeholder |
| `value` | str | `""` | Initial value; supports `{$x}` |
| `on_change` | str | — | Calls `handler(text)` on change |
| `on_enter` | str | — | Calls `handler(text)` on Enter |
| `size` | int | 0 | Font size (0 = theme default) |
| `show` | str | — | Non-empty makes it a password field |
| `bind` | str | — | Two-way bind to a state key |

```html
<Input placeholder="Username" bind="username"/>
<Input placeholder="Search..." on_change="search" expand="true"/>
<Input show="password" bind="password" placeholder="Password"/>
<Input on_enter="submit" placeholder="Type and press Enter"/>
```

## Two-way binding

`bind` writes user input to state; `value="{$key}"` pushes state changes back. Together they're two-way:

```html
<Input bind="query" value="{$query}" placeholder="Search"/>
```

```python
state.query = ""   # clearing state clears the field
```

## Password field

Give `show` any non-empty value to switch to password mode:

```html
<Input show="password" bind="pin" placeholder="PIN"/>
```

## Events

```python
def search(text):
    state.query = text or ""

def submit(text):
    state.submitted = text
```

`on_change` fires on every keystroke; `on_enter` only on Enter.

## TextArea — multi-line

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `placeholder` | str | — | Placeholder |
| `value` | str | — | Initial text; supports `{$x}` |
| `on_change` | str | — | `handler(text)` |
| `readonly` | bool | `false` | Read-only |
| `height` | int | — | Fixed height (px) |
| `size` | int | 14 | Font size |
| `bind` | str | — | Two-way bind |

```html
<TextArea placeholder="Write something..." height="140" bind="content"/>
<TextArea readonly="true" height="300" value="{$log}"/>
```

## Common patterns

### Input with a default value

```html
<Input value="{$name}" bind="name" placeholder="Name"/>
```

### Read-only display

`TextArea readonly="true"` is ideal for long logs or read-only text with efficient scrolling.

### Live character count

```python
def count(text):
    state.length = len(text or "")
```

```html
<Input bind="content" on_change="count" placeholder="Content"/>
<Text size="12" color="subtext">{$length} chars</Text>
```

## Troubleshooting

- Input isn't written to state? Make sure `bind` is set.
- State changed but the field didn't? Make sure `value="{$key}"` is present.
- Arithmetic error? Use `state.get("count", 0)`.

## Next

- [Forms](#/docs/forms) — form validation
- [Data Binding](#/docs/data-binding) — binding mechanics
