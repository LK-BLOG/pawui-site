# 布局

PawUI 用嵌套容器完成布局：`Column` 纵向、`Row` 横向、`Scroll` 滚动，属性控制内边距、间距与弹性。

## Window

根窗口，每文件有且仅有一个。

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `title` | str | `"PawUI"` | 窗口标题 |
| `width` | int | `480` | 宽度（px） |
| `height` | int | `640` | 高度（px） |
| `theme` | str | `"dark"` | `dark` / `light` |
| `padding` | int | `0` | 内边距 |
| `spacing` | int | `8` | 子元素间距 |

```html
<Window title="我的应用" width="640" height="480" padding="16" spacing="12">
  ...
</Window>
```

## Column / Row

`Column` 纵向排列，`Row` 横向排列，属性相同。

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `padding` | int / list | 12 | 内边距，支持 1/2/4 个值 |
| `spacing` | int | 8 | 子元素间距 |
| `bg` | str | — | 背景色（令牌或 hex） |
| `radius` | int | 24 | 圆角 |
| `expand` | bool | false | 在父容器中拉伸 |
| `stagger` | int | 0 | 子元素入场动画的逐个延时（ms） |

```html
<Column padding="24" spacing="12" bg="surface" radius="16">
  <Text size="18" bold>设置</Text>
  <Row spacing="8">
    <Text>音量</Text>
    <Slider bind="volume"/>
  </Row>
</Column>
```

### padding 的多种写法

`padding` 接受 1、2 或 4 个值（空白分隔）：

| 写法 | 含义 |
|------|------|
| `padding="16"` | 四边 16 |
| `padding="12 24"` | 上下 12，左右 24 |
| `padding="8 16 4 16"` | 上 8、右 16、下 4、左 16 |

### 弹性布局

容器会在末尾添加一个弹性空间，因此子元素默认**从上/左开始排列**。要让某个子元素占满剩余空间，加 `expand`：

```html
<Row spacing="8">
  <Input bind="query" expand/>
  <Button on_click="search">搜索</Button>
</Row>
```

这里 `Input` 会占据剩余宽度，按钮保持自然宽度。

> PawUI 当前**没有** `align` / `justify` 属性。需要居中时，可用 `expand` 配合两侧 `Spacer`，或调整容器结构与 `padding`。

## Spacer

占位空白。横向会弹性扩展，纵向可固定高度。

| 属性 | 类型 | 默认 |
|------|------|------|
| `width` | int | 1 |
| `height` | int | 1 |

```html
<Row>
  <Text>左侧</Text>
  <Spacer/>          <!-- 把右侧内容推开 -->
  <Text>右侧</Text>
</Row>

<Spacer height="24"/>  <!-- 固定垂直间距 -->
```

## Scroll

内容超出窗口时滚动。

| 属性 | 类型 | 默认 |
|------|------|------|
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

标签页容器。子元素应是 `<Tab label="...">`：

```html
<Tabs>
  <Tab label="常规">
    <Column padding="16" spacing="8">
      <Text>常规设置</Text>
    </Column>
  </Tab>
  <Tab label="高级">
    <Column padding="16" spacing="8">
      <Text>高级设置</Text>
    </Column>
  </Tab>
</Tabs>
```

> 非 `<Tab>` 的直接子元素会被当作一个单独页面，标签名为 `Tab`。

## Divider

| 属性 | 类型 | 默认 |
|------|------|------|
| `thickness` | int | 2 |
| `color` | str | `border` |

```html
<Divider/>
<Divider thickness="1" color="surface"/>
```

## 嵌套与组合

布局的本质是任意嵌套：

```html
<Window width="480" height="480">
  <Column padding="20" spacing="16">
    <Text size="22" bold>仪表盘</Text>
    <Divider/>
    <Row spacing="12">
      <Column padding="16" bg="surface" radius="12" expand>
        <Text size="28" bold color="accent">{$users}</Text>
        <Text size="12" color="subtext">用户</Text>
      </Column>
      <Column padding="16" bg="surface" radius="12" expand>
        <Text size="28" bold color="accent">{$orders}</Text>
        <Text size="12" color="subtext">订单</Text>
      </Column>
    </Row>
    <Spacer/>
  </Column>
</Window>
```
