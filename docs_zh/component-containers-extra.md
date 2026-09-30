# 布局组件：Grid / Panel / Accordion / SplitPane

`<Column>` 和 `<Row>` 负责堆叠，这四个负责排布。

## `<Grid>`

```xml
<Grid columns="3" gap="12">
  <Card value="1"/><Card value="2"/><Card value="3"/>
  <Card value="4"/>
</Grid>
```

行优先自动排布：给个 `columns`，从左往右填，填满换行。`gap` 同时管两个方向。

## Row / Column 的 flex 属性

| 属性 | 含义 |
| --- | --- |
| `grow="2"` | 占两份剩余空间（`expand` 就是 `grow="1"`） |
| `shrink="0"` | 不接受被压到比 sizeHint 更小 |
| `wrap="true"`（Row） | 挤不下就换行 |
| `justify` | `start` / `center` / `end` / `space-between` / `space-around` |
| `align` | 交叉轴对齐 |
| `gap` / `spacing` | 子元素间距 |
| `padding`、`margin` | 盒模型（CSS 顺序：上 右 下 左） |
| `border`、`border_width`、`border_color` | 元素自身的边框 |
| `width`、`height`、`min_*`、`max_*` | 尺寸 |

## `<Panel>` 与 `<Accordion>`

```xml
<Accordion multiple="false">
  <Panel title="常规" open="true">
    <Input placeholder="名称"/>
  </Panel>
  <Panel title="高级">
    <Input placeholder="代理"/>
  </Panel>
</Accordion>
```

`multiple="false"` 时同时只开一个。Panel 支持 `title`、`open` 和 `on_toggle(checked)`。

## `<SplitPane>`

```xml
<SplitPane ratio="0.3" width="900" height="500">
  <Scroll><Column>…</Column></Scroll>
  <Column>…</Column>
</SplitPane>
```

两个子元素，中间是可拖拽的分隔条。`ratio` 是初始比例，`axis="y"` 改成上下分栏。
