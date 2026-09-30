# Layout components: Grid, Panel, Accordion, SplitPane

`<Column>` and `<Row>` stack things; these four arrange them.

## `<Grid>`

```xml
<Grid columns="3" gap="12">
  <Card value="1"/><Card value="2"/><Card value="3"/>
  <Card value="4"/>
</Grid>
```

Row-major auto placement: give it `columns` and it fills left to right, wrapping
into new rows. `gap` sets both axes.

## Row/Column flex props

Every container accepts the flex primitives:

| Prop | Meaning |
| --- | --- |
| `grow="2"` | Take two shares of the free space (`expand` = `grow="1"`) |
| `shrink="0"` | Refuse to be squeezed below its size hint |
| `wrap="true"` (Row) | Flow onto the next line when out of room |
| `justify` | `start` / `center` / `end` / `space-between` / `space-around` |
| `align` | Cross-axis alignment |
| `gap` / `spacing` | Space between children |
| `padding`, `margin` | Box model (CSS order: top right bottom left) |
| `border`, `border_width`, `border_color` | Border on the element itself |
| `width`, `height`, `min_*`, `max_*` | Sizing |

## `<Panel>` and `<Accordion>`

```xml
<Accordion multiple="false">
  <Panel title="General" open="true">
    <Input placeholder="Name"/>
  </Panel>
  <Panel title="Advanced">
    <Input placeholder="Proxy"/>
  </Panel>
</Accordion>
```

`multiple="false"` keeps a single panel open. Each panel takes `title`, `open`
and `on_toggle(checked)`.

## `<SplitPane>`

```xml
<SplitPane ratio="0.3" width="900" height="500">
  <Scroll><Column>…</Column></Scroll>
  <Column>…</Column>
</SplitPane>
```

Two children, a draggable handle between them, `ratio` for the initial split
and `axis="y"` for a horizontal divider.
