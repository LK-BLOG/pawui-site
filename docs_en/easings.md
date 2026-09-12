# Easing Curves

`easing` controls how an entrance animation distributes speed over time. The right curve makes motion feel natural.

## Available curves

| Value | Feel | Best for |
|-------|------|----------|
| `linear` | Constant | Progress, loops (rarely for UI entrances) |
| `in-cubic` | Slow in, fast out | Exit/entrance starts |
| `out-cubic` | Fast in, slow out (**default**) | Most entrances |
| `in-out-cubic` | Smooth both ends | Position changes, transitions |
| `out-quad` | Gentle ease-out | Subtle fades |
| `out-quart` | Strong ease-out | Snappy, clean settles |
| `out-back` | Slight overshoot | Emphasis, playful |
| `out-elastic` | Elastic oscillation | Strong feedback, game-like |

## Usage

```html
<Text animate="fade" easing="out-cubic">Default ease-out</Text>
<Button animate="slide-up" easing="out-back" duration="420">Bouncy</Button>
<Image src="logo.png" animate="reveal" easing="out-quart" duration="500"/>
```

`out-cubic` is used when unspecified.

## How to choose

- **Most entrances**: `out-cubic` or `out-quart` — fast to arrive, calm to settle.
- **Needs a "pop"**: `out-back` (slight overshoot); don't overuse.
- **Playful UI**: `out-elastic`, in moderation.
- **Position changes**: `in-out-cubic`, smooth at both ends.
- **Avoid**: `linear` for fades — it looks mechanical.

## Pairing with duration

Tune curves and `duration` together:

```html
<Text animate="fade" duration="200" easing="out-quart">Snappy</Text>
<Text animate="slide-up" duration="500" easing="out-cubic">Relaxed</Text>
```

- Short (150–250ms): crisp, pair with `out-quart`.
- Medium (300–450ms): the default range, pair with `out-cubic`.
- Long (500ms+): large content reveals, pair with `in-out-cubic`.

## With displacement types

```html
<!-- subtle slide -->
<Text animate="slide-up" easing="out-cubic" duration="320">Title</Text>

<!-- elastic slide -->
<Button animate="slide-left" easing="out-elastic" duration="600">Hint</Button>

<!-- height reveal -->
<Column animate="reveal" easing="out-quart" duration="400">...</Column>
```

## Accessibility

PawUI respects the system "reduce motion" setting: when `prefers-reduced-motion` is active, animations are disabled automatically. No need to remove them for accessibility.

## Next

- [Animation](#/animation) — types and attributes
- [Stagger](#/stagger) — sequenced entrances
