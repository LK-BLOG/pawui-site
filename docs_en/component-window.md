# Window

The root window container. Every `.paw` file must have exactly one `<Window>`.

## Attributes

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `title` | str | `"PawUI"` | Window title |
| `width` | int | `480` | Width (px) |
| `height` | int | `640` | Height (px) |
| `theme` | str | `"dark"` | `dark` / `light` |
| `padding` | int | `0` | Window padding |
| `spacing` | int | `8` | Gap between children |

```html
<Window title="My app" width="720" height="480" padding="16" spacing="12" theme="dark">
  <Text size="22" bold>Content starts here</Text>
</Window>
```

## Uniqueness

One root window per file. Multiple `<Window>`s, or UI elements alongside `<Window>`, are errors:

```
PawUI error: only one root <Window> is allowed
PawUI error: top-level elements must live inside <Window>
```

`<script>`, `<Component>`, and `<Theme>` are exceptions — they may appear at the top level.

## Implicit window

If the top level is a set of UI elements without a `<Window>`, PawUI wraps them in an implicit window. Still, prefer writing `<Window>` explicitly to set the title and size.

## Theme precedence

`<Window theme="...">` sets the base theme (default `dark`). `<Theme extends="...">` and `<Color>` overrides apply on top. See [Theming](#/theming).

## Changing title/size at runtime

Access the underlying window via `app.root`:

```python
def rename():
    app.root.setWindowTitle(f"Title - {state.count}")
```

## Size and scrolling

When content exceeds the window height, put it in a `<Scroll>` or it gets clipped:

```html
<Window height="400">
  <Scroll expand="true" spacing="8">
    <For each="item" in="{$items}">
      <Text>{$item}</Text>
    </For>
  </Scroll>
</Window>
```

## Window fade

Switching themes (`app.set_theme`) fades the window automatically.

## Next

- [Column / Row](#/layout) — layout containers
- [Theming](#/theming) — colors and theme switching
