# Typography

Sizes, weights, and hierarchy. PawUI has no rich text, but the basics are enough for a clear visual hierarchy.

## Size

Use `size` (px) to control text size. It defaults to the theme's font size (12):

```html
<Text size="26" bold>Page title</Text>
<Text size="17" bold>Section</Text>
<Text size="14">Body</Text>
<Text size="12" color="subtext">Caption</Text>
```

## Weight and style

```html
<Text bold>Bold emphasis</Text>
<Text italic color="subtext">Italic note</Text>
<Text bold italic>Both</Text>
```

Two weights only: regular and bold (bold uses weight 600).

## Building hierarchy

Titles use "larger + bolder + accent"; captions use "smaller + secondary color":

```html
<Column spacing="6">
  <Text size="22" bold color="accent">Dashboard</Text>
  <Text size="12" color="subtext">Last 7 days</Text>
</Column>
```

A common scale:

| Role | Size | Attributes |
|------|------|------------|
| Page title | 24–28 | `bold color="accent"` |
| Section title | 16–18 | `bold` |
| Body | 14 | — |
| Caption | 12 | `color="subtext"` |
| Metric | 28–48 | `bold color="accent"` |

## Font settings in the theme

A theme carries font-related fields (tunable from Python):

| Field | Default | Notes |
|-------|---------|-------|
| `font_family` | `Segoe UI` | Font family |
| `font_size` | 12 | Default size |
| `title_size` | 18 | Title size |

```python
from pawui.theme import Theme

t = Theme.dark()
t.font_family = "Inter"
t.font_size = 13
app.set_theme(t)
```

> An explicit component `size` overrides the theme default.

## Numbers and alignment

There is no text-alignment attribute; `Text` is left-aligned and vertically centered. Emphasize metrics with size and color:

```html
<Column padding="16" bg="surface" radius="12" expand="true">
  <Text size="30" bold color="accent">{$users}</Text>
  <Text size="12" color="subtext">Users</Text>
</Column>
```

## CJK display

PawUI renders natively on Qt; Chinese (and IME input) are handled by system fonts with no extra setup. Use a family that supports CJK (Windows falls back to Microsoft YaHei and similar by default).

## Next

- [Color Tokens](#/docs/color-tokens) — reinforce hierarchy with color
- [Theming](#/docs/theming) — theme parameters
