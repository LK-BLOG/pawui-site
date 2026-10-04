# Layout

PawUI lays out with nested containers: `Column` (vertical), `Row` (horizontal), `Scroll` (scrolling). Attributes control padding, spacing, and flex.

## Window

The root window, exactly one per file.

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `title` | str | `"PawUI"` | Window title |
| `width` | int | `480` | Width in px |
| `height` | int | `640` | Height in px |
| `theme` | str | `"dark"` | `dark` / `light` |
| `padding` | int | `0` | Inner padding |
| `spacing` | int | `8` | Gap between children |

```html
<Window title="My app" width="640" height="480" padding="16" spacing="12">
  ...
</Window>
```

## Column / Row

`Column` stacks vertically, `Row` horizontally. Same attributes.

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `padding` | int / list | 12 | 1, 2, or 4 values |
| `spacing` | int | 8 | Gap between children |
| `bg` | str | — | Background (token or hex) |
| `radius` | int | 24 | Corner radius |
| `expand` | bool | false | Stretch in parent |
| `stagger` | int | 0 | Per-child animation delay (ms) |

```html
<Column padding="24" spacing="12" bg="surface" radius="16">
  <Text size="18" bold>Settings</Text>
  <Row spacing="8">
    <Text>Volume</Text>
    <Slider bind="volume"/>
  </Row>
</Column>
```

### padding forms

`padding` accepts 1, 2, or 4 space-separated values:

| Form | Meaning |
|------|---------|
| `padding="16"` | 16 on all sides |
| `padding="12 24"` | 12 top/bottom, 24 left/right |
| `padding="8 16 4 16"` | top 8, right 16, bottom 4, left 16 |

### Flex

Containers append a trailing stretch, so children lay out from the **top-left** by default. To make a child fill the remaining space, add `expand`:

```html
<Row spacing="8">
  <Input bind="query" expand/>
  <Button on_click="search">Search</Button>
</Row>
```

Here the `Input` takes the remaining width and the button keeps its natural size.

> PawUI currently has **no** `align` / `justify`. To center content, combine `expand` with `Spacer` elements, or adjust the container structure and `padding`.

## Spacer

Blank space. Expands horizontally; fixed height vertically.

| Attribute | Type | Default |
|-----------|------|---------|
| `width` | int | 1 |
| `height` | int | 1 |

```html
<Row>
  <Text>Left</Text>
  <Spacer/>          <!-- pushes the right item away -->
  <Text>Right</Text>
</Row>

<Spacer height="24"/>  <!-- fixed vertical gap -->
```

## Scroll

Scroll when content exceeds the window.

| Attribute | Type | Default |
|-----------|------|---------|
| `padding` | int / list | 12 |
| `spacing` | int | 8 |
| `bg` | str | — |

```html
<Window height="400">
  <Scroll padding="16" spacing="8">
    <For each="item" in="{$items}">
      <Text>{$item}</Text>
    </For>
  </Scroll>
</Window>
```

## Tabs / Tab

Tabbed container. Children should be `<Tab label="...">`:

```html
<Tabs>
  <Tab label="General">
    <Column padding="16" spacing="8">
      <Text>General settings</Text>
    </Column>
  </Tab>
  <Tab label="Advanced">
    <Column padding="16" spacing="8">
      <Text>Advanced settings</Text>
    </Column>
  </Tab>
</Tabs>
```

> Direct non-`<Tab>` children become a page labeled `Tab`.

## Divider

| Attribute | Type | Default |
|-----------|------|---------|
| `thickness` | int | 2 |
| `color` | str | `border` |

```html
<Divider/>
<Divider thickness="1" color="surface"/>
```

## Nesting and composition

Layout is just arbitrary nesting:

```html
<Window width="480" height="480">
  <Column padding="20" spacing="16">
    <Text size="22" bold>Dashboard</Text>
    <Divider/>
    <Row spacing="12">
      <Column padding="16" bg="surface" radius="12" expand>
        <Text size="28" bold color="accent">{$users}</Text>
        <Text size="12" color="subtext">Users</Text>
      </Column>
      <Column padding="16" bg="surface" radius="12" expand>
        <Text size="28" bold color="accent">{$orders}</Text>
        <Text size="12" color="subtext">Orders</Text>
      </Column>
    </Row>
    <Spacer/>
  </Column>
</Window>
```
