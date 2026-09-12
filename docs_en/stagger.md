# Stagger

Reveal multiple elements in sequence instead of all at once. One `stagger` attribute does it.

## Basic usage

Add `stagger` to a **container**; its children's animation delays accumulate in order:

```html
<Column padding="24" spacing="12" stagger="70">
  <Text animate="slide-up">First</Text>
  <Text animate="slide-up">Second</Text>
  <Text animate="slide-up">Third</Text>
</Column>
```

Result: the first is delayed 0ms, the second 70ms, the third 140ms.

## Added to each child's own delay

A child's own `delay` adds on top of stagger:

```html
<Column stagger="60">
  <Text animate="fade" delay="0">Starts first</Text>
  <Text animate="fade" delay="200">200ms later still</Text>
</Column>
```

The second item's actual delay = 60 (container accumulation) + 200 (its own).

## Nesting

Containers nest, and stagger values stack:

```html
<Column stagger="40">
  <Row spacing="8" stagger="40">
    <Text animate="slide-up">A</Text>
    <Text animate="slide-up">B</Text>
  </Row>
  <Text animate="slide-up">C</Text>
</Column>
```

## List entrances

Lists rendered by `<For>` reveal item by item:

```html
<Column stagger="50">
  <For each="item" in="{$items}">
    <Row padding="10" bg="surface" radius="10" animate="slide-up">
      <Text>{$item}</Text>
    </Row>
  </For>
</Column>
```

## What value to use

| stagger | Feel |
|---------|------|
| 30–50ms | Tight, fluid |
| 60–90ms | Clear sequential rhythm |
| 100ms+ | Noticeable but slow; careful with many items |

Use small values for many items, or the last one waits a long time.

## Full example

```html
<Window title="Entrance" width="420" height="380" theme="dark">
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

## Performance and accessibility

- With many items, stagger delays readability; skip it for large lists.
- With `prefers-reduced-motion` active, animations are disabled and content shows immediately.

## Next

- [Animation](#/animation) — animation types
- [Easing Curves](#/easings) — choosing curves
