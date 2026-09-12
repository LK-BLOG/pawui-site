# Slider

A horizontal slider for picking a value within a range. Self-closing.

## Attributes

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `min` | int | 0 | Minimum |
| `max` | int | 100 | Maximum |
| `step` | int | 1 | Step |
| `value` | int | `min` | Initial value; supports `{$x}` |
| `on_change` | str | — | `handler(value)` |
| `accent` | str | `accent` | Filled track color |
| `bg` | str | `border` | Track background |
| `bind` | str | — | Writes back to state |

```html
<Slider min="0" max="100" value="{$volume}" bind="volume"/>
<Slider min="0" max="100" step="5" on_change="on_zoom" accent="accent"/>
```

## Events and binding

`on_change` receives an integer. With `value="{$key}"` + `bind="key"` you get two-way binding:

```html
<Slider min="0" max="100" value="{$volume}" bind="volume"/>
<Text size="12" color="subtext">Volume: {$volume}</Text>
```

```python
state.volume = 60
```

Dragging updates `{$volume}` live.

## Step

`step` controls granularity:

```html
<Slider min="0" max="100" step="10" bind="level"/>
```

## Custom colors

```html
<Slider min="0" max="100" accent="danger" bg="surface"/>
```

Hex works too: `accent="#ff6b6b"`.

## Common patterns

### Volume / progress control

```html
<Column spacing="8" padding="16">
  <Text size="13" color="subtext">Volume</Text>
  <Slider min="0" max="100" value="{$volume}" bind="volume"/>
  <Text size="12" color="subtext">{$volume}</Text>
</Column>
```

### Range hint

```python
state.volume = 50

def level():
    v = state.volume
    if v == 0:
        return "Muted"
    return f"{v}%"

state.level = level
```

```html
<Text>{$level}</Text>
```

### Continuous values

`min`/`max` can be any integer range:

```html
<Slider min="50" max="200" step="5" value="{$scale}" bind="scale"/>
<Text>Zoom {$scale}%</Text>
```

> Slider only handles integer ranges. For decimals, scale up (e.g. 0–100 for 0.0–1.0) and divide for display.

## Next

- [Progress](#/component-progress) — progress display
- [Forms](#/forms) — form fields
