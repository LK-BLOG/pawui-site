# Animation

## Entrance Animations

Add to any element:

```html
<Text animate="fade" duration="300">Fades in</Text>
<Text animate="slide-up" duration="400" delay="100">Slides up</Text>
<Text animate="slide-down">Slides down</Text>
<Text animate="slide-left">Slides from left</Text>
<Text animate="slide-right">Slides from right</Text>
<Text animate="reveal">Height expands from 0</Text>
```

### Animation Types

| Kind | Effect |
|------|--------|
| `fade` | Opacity 0 → 1 |
| `slide-up` | Moves from below |
| `slide-down` | Moves from above |
| `slide-left` | Moves from right |
| `slide-right` | Moves from left |
| `reveal` | Height 0 → auto |

### Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | int | 260 | Duration in ms |
| `delay` | int | 0 | Delay before start |
| `easing` | string | "out-cubic" | Easing curve |

### Easing Curves

```
linear
in-cubic
out-cubic (default)
in-out-cubic
out-quad
out-quart
out-back (bouncy)
out-elastic (springy)
```

```html
<Button animate="slide-up" easing="out-back" duration="500">Bouncy</Button>
<Card animate="fade" easing="out-elastic" duration="600">Springy</Card>
```

## Staggered Animations

On containers (`Column`, `Row`):

```html
<Column stagger="60">
  <Text animate="slide-up">First (0ms delay)</Text>
  <Text animate="slide-up">Second (60ms delay)</Text>
  <Text animate="slide-up">Third (120ms delay)</Text>
</Column>
```

Each child gets `delay + index * stagger` additional delay.

## Window Fade

Automatic on theme switch:

```python
app.set_theme("light")  # Triggers window fade
```

## Programmatic Animation

```python
from pawui.animate import entrance

entrance(widget, "slide-up", duration=400, delay=0, curve="out-cubic")
```

## Best Practices

1. **Use stagger for lists** - Creates pleasant cascade
2. **Keep durations short** - 200-400ms feels responsive
3. **Combine with delay** - Sequence related elements
4. **Avoid animating layout properties** - Use transform-based animations