# Color Tokens

PawUI decouples component styling from themes through a set of **color tokens**. Change the theme and every token reference follows.

## Built-in tokens

| Token | dark | light | Use |
|-------|------|-------|-----|
| `background` | `#1e1e2e` | `#f5f5f7` | Window background |
| `surface` | `#282a36` | `#ffffff` | Cards, inputs |
| `text` | `#f8f8f2` | `#1d1d1f` | Body text |
| `subtext` | `#a6adc8` | `#6e6e73` | Secondary text |
| `accent` | `#7aa2f7` | `#0071e3` | Accent |
| `border` | `#44475a` | `#d2d2d7` | Borders, dividers |
| `danger` | `#f7768e` | `#ff375f` | Danger/errors |

## Using them in components

```html
<Text color="text">Body</Text>
<Text color="subtext">Caption</Text>
<Button bg="accent" fg="background">Primary</Button>
<Button bg="surface" fg="text">Secondary</Button>
<Text color="danger">Error</Text>
<Divider color="border"/>
```

Hex values also work:

```html
<Text color="#ff6b6b">Custom red</Text>
```

## Resolution rule (important)

Any string prop or text content whose value **exactly equals** a token name is replaced by that color:

```html
<Button bg="accent">      <!-- accent → #7aa2f7 -->
<Text color="surface"/>   <!-- surface → its color -->
```

Text content is affected too:

```html
<Text>accent</Text>       <!-- shows the color value, not "accent" -->
```

To show such a word literally, interpolate:

```html
<Text>{"accent"}</Text>
```

## Custom colors

Define named colors at the top level with `<Color>` inside `<Theme>`:

```html
<Theme extends="dark">
  <Color name="brand" value="#ff5c8a"/>
  <Color name="success" value="#3ddc97"/>
</Theme>
```

Then use them like built-in tokens:

```html
<Text color="brand">Brand</Text>
<Button bg="success" fg="background">Success</Button>
```

If `name` matches a built-in token (e.g. `accent`), it overrides that token instead.

## Overriding built-in tokens

```html
<Theme extends="light">
  <Color name="accent" value="#7c3aed"/>
  <Color name="background" value="#fafafa"/>
</Theme>
```

## From Python

```python
from pawui.theme import Theme

t = Theme.dark()
t.accent = "#ff6b6b"
t.apply({"brand": "#4ecdc4"})
app.set_theme(t)
```

## Why tokens

```html
<!-- good: follows the theme -->
<Text color="subtext">Caption</Text>

<!-- avoid: won't change with the theme -->
<Text color="#9aa0a6">Caption</Text>
```

Hardcoded colors lose contrast in dark/light themes. Prefer tokens.

## Next

- [Theming](#/docs/theming) — themes and switching
- [Typography](#/docs/typography) — fonts and sizes
