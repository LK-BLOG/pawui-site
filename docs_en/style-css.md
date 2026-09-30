# Writing CSS inside .paw

PawUI takes CSS3 seriously: a `<Style>` block in your `.paw` file is compiled to
Qt Style Sheets and applied to the widgets you actually rendered. No external
stylesheet file, no build step — it is part of the same document.

```xml
<Style>
  :root { --brand: #ff7a1a; --pad: 14px; }

  Card            { radius: 14; padding: var(--pad); bg: surface; }
  .card.primary   { bg: var(--brand); }
  #save           { font-weight: 600; }
  .card Text      { color: subtext; }
  Row > Button    { grow: 1; }
  Button:hover    { bg: #2b7fff; }
</Style>
```

## Selectors

| You write | What it matches |
| --- | --- |
| `Button`, `Text`, `Input` | Every instance of that component |
| `Card` (your own `<Component>`) | Every rendered `Card` |
| `.card` | Elements with `class="card"` |
| `.card.primary` | Elements with both classes |
| `#save` | The element with `id="save"` |
| `[pw-tag="Text"]` | Raw attribute form of a component tag |
| `.card Text` | Descendant |
| `Row > Button` | Direct child |
| `.a, .b` | Grouping |
| `Button:hover`, `:pressed`, `:disabled` | Qt pseudo states |

Qt has no custom class selector, so PawUI stores `class="..."` as a dynamic
property and rewrites `.card` into `[pw-class~="card"]` for you. Everything in
the table above is what you write — the rewriting is an implementation detail.

## Properties

Standard CSS names work (`background-color`, `border-radius`, `font-size`,
`padding`, …), plus these short aliases:

| Alias | Expands to |
| --- | --- |
| `bg` | `background-color` |
| `fg` / `color` | `color` |
| `radius` | `border-radius` |

Bare numbers get `px` appended for length properties, so `radius: 12;` and
`radius: 12px;` are the same thing. `border: 1 solid #ccc;` also works.

## Cascade

Priority, from highest to lowest:

1. runtime injections (`app.inject_css`, `el.css(...)`)
2. your `<Style>` rules
3. component defaults (`<Button radius="20">`)
4. the active theme

Inside your own CSS, the more specific selector wins: `#id` beats `.class`
beats a tag name, and later rules beat earlier ones.

## Text properties that are not QSS

Qt Style Sheets have no concept of wrapping or line height. PawUI accepts them
anywhere in your CSS and applies them at runtime, on the widgets that match:

```css
.body { wrap: true; line-height: 1.6; align: center; ellipsis: true; selectable: true; }
```

They also work as component props: `<Text wrap="true" align="center">`.

## Scoped styles

`class` and `id` are the scoping tools — the same as HTML, except `id` must be
unique per document if you want `#id` rules to be predictable.

```xml
<Card class="plan featured" id="pro">
  <Text class="price">¥99</Text>
</Card>
```

```css
.plan          { radius: 18; padding: 18; }
.plan.featured { border: 2 solid var(--accent); }
#pro .price    { font-size: 28px; font-weight: 600; }
```

## Injecting at runtime

From Python (or `<script>`):

```python
app.inject_css("Button { radius: 6px; }")      # global, wins over <Style>
app.css(".card", "radius: 6; bg: #fff;")        # by selector
app.query("#save").css("bg: #22c55e;")          # one element
app.query("#save").add_class("primary")         # class = restyle trigger
```

Injected rules are appended after your `<Style>` block, so they always win.
Injecting the same text twice is a no-op.

## Debugging

If a rule does not apply, run `pawui inspect app.paw`. It prints the widget tree
and, under each widget, the selectors that actually matched it.
