# Scroll

Scrolls when content exceeds the available space. Vertical.

## Attributes

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `padding` | int / list | 12 | Inner padding (1/2/4 values) |
| `spacing` | int | 8 | Gap between children |
| `bg` | str | — | Background |

```html
<Scroll padding="16" spacing="8" expand="true">
  <For each="item" in="{$items}">
    <Text>{$item}</Text>
  </For>
</Scroll>
```

## Why expand matters

Containers size to their content by default. To have the scroll area fill the window's remaining space and scroll overflow, add `expand="true"`:

```html
<Window height="400">
  <Column padding="16" spacing="12" expand="true">
    <Text size="18" bold>List</Text>
    <Scroll expand="true" spacing="6">
      <For each="row" in="{$rows}">
        <Text>{$row}</Text>
      </For>
    </Scroll>
  </Column>
</Window>
```

## Scrolling long text

For large text, a read-only text box scrolls more efficiently:

```html
<TextArea readonly="true" height="300" value="{$log}"/>
```

Or put it in a `<Scroll>`:

```html
<Scroll expand="true">
  <Text>{$log}</Text>
</Scroll>
```

## Appending log lines

```python
state.logs = ["[boot] ready"]

def add_log():
    state.logs = state.logs + [f"[event] #{len(state.logs) + 1}"]
```

Each line renders as a `<Text>`; the scroll area grows with the content.

## Nested scrolling

`Scroll` can nest layouts, but **avoid horizontal scroll inside vertical** — PawUI's `Scroll` is vertical only. Wide content should wrap, truncate, or be scaled down.

## Background

```html
<Scroll bg="surface" padding="12" spacing="8" expand="true">
  ...
</Scroll>
```

## Troubleshooting

- Content clipped, no scrolling? Add `expand="true"` to the `Scroll`.
- No scrollbar? It only appears when content exceeds the container height.
- Want one card to stretch vertically? Add `expand="true"` to that card.

## Next

- [Lists](#/docs/lists) — list rendering
- [Layout](#/docs/layout) — containers and flex
