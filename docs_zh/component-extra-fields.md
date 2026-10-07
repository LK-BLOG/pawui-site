# 表单增强与展示：Alert、GroupBox、DoubleInput、DateTimePicker、ColorPicker、Dial、LCD、Tree

0.1.3.4 补的 8 个组件。都是「Qt 本来就有、PawUI 之前没暴露」的那一批。

## `<Alert>`

```xml
<Alert kind="info" title="信息">info 默认跟随主题主色。</Alert>
<Alert kind="success" title="保存成功">配置已写入。</Alert>
<Alert kind="warning" title="注意">磁盘剩余空间不足。</Alert>
<Alert kind="error" title="出错了">写入失败，请重试。</Alert>
```

行内提示条。`kind` 取 `info` / `success` / `warning` / `error`（`danger` 是 `error` 的别名）。
配色取自主题的状态色（`theme.accent` / `success` / `warning` / `danger`），所以跟着主题走，
和 `app.toast()` 同一种 kind 是同一个颜色。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `kind` | string | `info` | info / success / warning / error |
| `title` | string | `""` | 加粗标题；不写就只有正文 |
| `accent` | color | 按 kind | 覆盖条带颜色 |
| `radius` | integer | `10` | 圆角 |
| `shadow` | boolean | 主题 `shadow` | 是否加投影 |

正文写在标签之间，或者用 `text` 属性。

## `<GroupBox>`

```xml
<GroupBox title="高级设置" shadow="true">
  <Input placeholder="线程数"/>
</GroupBox>
```

带标题边框的分组容器，是**容器**（里面能放任意子元素，支持 `justify` / `align` / `padding` / `gap`）。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `title` | string | `""` | 分组标题（画在边框左上角） |
| `bg` | color | `surface` | 底色 |
| `radius` | integer | `10` | 圆角 |
| `shadow` | boolean | `false` | 是否加投影 |

## `<DoubleInput>`

```xml
<DoubleInput min="0" max="1" step="0.01" decimals="2" value="{$ratio}" bind="ratio" on_change="on_ratio"/>
```

浮点数输入（`QDoubleSpinBox`）。`<NumberInput>` 只收整数，要小数用这个。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `min` / `max` | number | `0` / `100` | 范围 |
| `step` | number | `0.1` | 步长 |
| `decimals` | integer | `2` | 小数位数 |
| `value` | number / `{$x}` | — | 初值；写模板时跟随 state |
| `readonly` | boolean | `false` | 只读 |
| `on_change` | handler | — | 收到 `float` |
| `bind` | string | — | 把值写回 state |

## `<DateTimePicker>`

```xml
<DateTimePicker value="2026-09-27T13:45" on_change="on_when" calendar="true"/>
```

日期 + 时间一个控件搞定（`QDateTimeEdit`）。值用 **ISO 字符串**（`2026-09-27T13:45`），
比 `<DatePicker>` + `<TimePicker>` 少一个控件、少一次同步。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `value` | string | — | ISO 日期时间；解析失败则用当前时间 |
| `format` | string | `yyyy-MM-dd HH:mm` | 显示格式 |
| `calendar` | boolean | `true` | 是否带日历弹出 |
| `on_change` | handler | — | 收到 ISO 字符串 |
| `bind` | string | — | 把 ISO 字符串写回 state |

## `<ColorPicker>`

```xml
<ColorPicker value="{$picked}" bind="picked" on_change="on_pick"/>
```

一个色块按钮，点开系统取色器；值用 `#rrggbb`。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `value` | string | `#ffffff` | 当前颜色；写 `{$x}` 时跟随 state |
| `size` | integer | `34` | 色块高度（宽度是两倍） |
| `radius` | integer | `8` | 圆角 |
| `title` | string | `""` | 取色器窗口标题 |
| `on_change` | handler | — | 收到 `#rrggbb` |
| `bind` | string | — | 把颜色写回 state |

## `<Dial>`

```xml
<Dial min="0" max="100" value="{$volume}" bind="volume" text="true"/>
```

旋钮（`QDial`），适合音量/亮度这类「转一下」的输入。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `min` / `max` | integer | `0` / `100` | 范围 |
| `step` | integer | `1` | 步长 |
| `value` | integer | `0` | 当前值 |
| `size` | integer | `64` | 控件边长 |
| `notches` | boolean | `true` | 是否显示刻度 |
| `text` | boolean | `false` | 是否在下方显示当前数值 |
| `on_change` | handler | — | 收到 `int` |
| `bind` | string | — | 把值写回 state |

## `<LCD>`

```xml
<LCD value="{$count}" digits="4" color="accent"/>
```

数码管风格的数字显示（`QLCDNumber`）。`value` 写 `{$x}` 时会跟着 state 变。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `value` | integer / `{$x}` | `0` | 显示的数字 |
| `digits` | integer | `4` | 位数 |
| `color` | color | `accent` | 数字颜色 |
| `radius` | integer | `8` | 圆角 |

## `<Tree>`

```xml
<Tree headers="名称,类型" height="200" items="{$nodes}" on_select="on_pick" bind="picked"/>
```

树形列表（`QTreeWidget`）。`items` 吃**嵌套结构**，也吃扁平字符串数组：

```python
state.nodes = [
    {"label": "布局", "items": [
        {"label": "Window"},
        {"label": "Column"},
    ]},
    {"label": "数据", "items": [{"label": "Table"}]},
]
```

每个节点是 `{"label": ..., "items": [...]}`（`text` / `children` 是 `label` / `items` 的别名）。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `items` | array | `[]` | 嵌套节点；支持 `{$state}`，变了就重建 |
| `headers` | string | `""` | 逗号分隔的列名；不写则隐藏表头 |
| `height` | integer | — | 固定高度；不写按内容 |
| `indent` | integer | `16` | 缩进宽度 |
| `radius` | integer | `10` | 圆角 |
| `on_select` | handler | — | 收到选中节点的文字 |
| `bind` | string | — | 把选中节点的文字写回 state |

默认会 `expandAll()` 展开所有节点。
