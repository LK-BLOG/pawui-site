# Animation

PawUI offers declarative **entrance animations**: add an `animate` attribute to any component. No animation code required.

## Basic usage

```html
<Text animate="fade">Fade in</Text>
<Button animate="slide-up" duration="320" delay="80">Slide in</Button>
<Image src="logo.png" animate="reveal" duration="400"/>
```

## Animation attributes

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `animate` | str | — | Animation kind (below) |
| `duration` | int | 260 | Duration (ms) |
| `delay` | int | 0 | Delay (ms) |
| `easing` | str | `out-cubic` | Easing curve |
| `stagger` | int | 0 | Container: per-child delay (ms) |

## Animation kinds

| Value | Effect |
|-------|--------|
| `fade` | Fade in |
| `reveal` | Expand from height 0 |
| `slide-up` | Slide up into place |
| `slide-down` | Slide down into place |
| `slide-left` | Slide in from the right |
| `slide-right` | Slide in from the left |

> Every kind is a combination of fade plus displacement / reveal. All of them animate opacity.

## Easing curves

| Value | Notes |
|-------|-------|
| `linear` | Constant |
| `in-cubic` | Slow in, fast out |
| `out-cubic` | Fast in, slow out (default) |
| `in-out-cubic` | Smooth at both ends |
| `out-quad` | Gentle ease-out |
| `out-quart` | Strong ease-out |
| `out-back` | Overshoot |
| `out-elastic` | Elastic bounce |

```html
<Button animate="slide-up" easing="out-back" duration="420">Bouncy</Button>
```

## Stagger

Add `stagger` to a container; children's delays accumulate in order:

```html
<Column padding="24" spacing="12" stagger="70">
  <Text animate="slide-up">First</Text>
  <Text animate="slide-up">Second</Text>
  <Text animate="slide-up">Third</Text>
</Column>
```

Result: the first item is delayed 0ms, the second 70ms, the third 140ms.

> `stagger` is added to each child's own `delay`. Nested container `stagger` values stack.

## Composed example

```html
<Window title="Entrance" width="420" height="360">
  <Column padding="32" spacing="16" stagger="60">
    <Text size="26" bold color="accent" animate="slide-down" duration="360">Welcome</Text>
    <Text color="subtext" animate="fade" duration="420">A quick demo</Text>
    <Row spacing="10" animate="slide-up" duration="380">
      <Button on_click="ok">Start</Button>
      <Button on_click="later" bg="surface" fg="text">Later</Button>
    </Row>
  </Column>
</Window>
```

## Animation in conditionals and loops

`<If>` and `<For>` are logical containers; their children support animation too. Per-item list entrances are natural:

```html
<For each="item" in="{$items}">
  <Text animate="slide-up">{$item}</Text>
</For>
```

Combine with `stagger` on the surrounding container for the best effect.

## Theme-switch animation

Calling `app.set_theme(...)` fades the window (`windowOpacity` 0.55 → 1.0) automatically.

## Caveats

- Animations are queued at widget build time and play once when the window shows.
- There is no "animate on state change" layer (a re-render rebuilds widgets rather than tweening). Call `app.refresh()` to rebuild and replay entrance animations.
- Displacement is fixed (22px) and not configurable.
