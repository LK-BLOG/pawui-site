# Text

Displays a run of text, written between the tags, with state interpolation.

## Attributes

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `size` | int | 12 | Font size (px); `font_size` also accepted |
| `bold` | bool | `false` | Bold |
| `italic` | bool | `false` | Italic |
| `color` / `fg` | str | `text` | Text color |

```html
<Text>Plain text</Text>
<Text size="28" bold color="accent">Big heading</Text>
<Text size="12" color="subtext">Caption</Text>
<Text size="14" italic color="subtext">Italic</Text>
```

## Interpolation

Content can reference state, with attribute paths and indexing:

```html
<Text>{$count}</Text>
<Text>Hello, {$user.name}!</Text>
<Text>First item: {$items[0]}</Text>
<Text>Progress {$progress}%</Text>
```

The text updates automatically when state changes.

## Color tokens

Any color may be a token name that follows the theme:

```html
<Text color="text">Body</Text>
<Text color="subtext">Secondary</Text>
<Text color="accent">Accent</Text>
<Text color="danger">Error</Text>
```

Hex values work too: `<Text color="#ff6b6b">`.

> **Gotcha**: content or a prop whose value exactly equals a token name is replaced by that color. `<Text>accent</Text>` shows the color value, not "accent". To show the word, interpolate: `<Text>{"accent"}</Text>`.

## Heading hierarchy

PawUI has no built-in heading component; express hierarchy with `size` + `bold`:

```html
<Text size="26" bold color="accent">Page title</Text>
<Text size="17" bold>Section</Text>
<Text size="12" color="subtext">Caption</Text>
```

## Long text

For a bit of multiline text, `<Text>` is fine; for tens of thousands of characters, use a read-only text box for efficient scrolling:

```html
<TextArea readonly="true" height="300" value="{$log}"/>
```

## Dynamic content

Interpolation refreshes on state change. When the whole string is generated, expose it as a callable on state:

```python
def summary():
    return f"{len(state.items)} items, {state.done} done"

state.summary = summary
```

```html
<Text>{$summary}</Text>
```

## Next

- [Theming](#/docs/theming) — color tokens
- [Data Binding](#/docs/data-binding) — interpolation details
