# 数据组件：Table / List / VirtualList

展示集合有三种方式，按规模和意图选。

## `<Table>` —— 可排序的表格

```xml
<Table columns="[名称, 星数, 语言]"
       rows="{$repos}"
       height="260"
       on_select="pick"/>
```

```python
repos = [
    {"名称": "PawUI", "星数": 42, "语言": "Python"},
    {"名称": "Docs",  "星数": 7,  "语言": "Markdown"},
]

def pick(row):          # row = ["PawUI", "42", "Python"]
    print(row)
```

行可以是 dict（按列名取值）或 list。看起来是数字的单元格按数字排序，不按字符串。可用属性：`sortable`、`striped`、`index`（行号列）、`radius`、`height`。写 `rows="{$state}"` 时状态一变就重渲染。

纯标记里想直接写数据也可以给 JSON：

```xml
<Table columns="[a, b]" rows='[{"a": 1, "b": 2}, {"a": 3, "b": 4}]'/>
```

## `<List>` —— 单选列表

```xml
<List items="{$files}" value="{$current}" bind="current" on_select="open_file"/>
```

`items` 接受状态引用、`[a, b, c]` 或 `a, b, c`。给 `bind` 时选中项会写回 state。

## `<VirtualList>` —— 十万行也只建 20 个控件

`<For>` 会老老实实给每一行建控件：1000 行就是 3000 个 QWidget，又慢又沉。`<VirtualList>` 只建视口里的那几行，滚动时换掉可见的一段，成本是常数：

```xml
<VirtualList rows="{$rows}" row_height="34" height="420">
  <Row><Text>{$item.name}</Text><Badge text="{$index}"/></Row>
</VirtualList>
```

同一套行模板，在同一台机器上的实测：

| 行数 | `<For>` 建树 | `<VirtualList>` 建树 |
| --- | --- | --- |
| 100 | 45 ms | 57 ms |
| 1 000 | 1 300 ms | 87 ms |
| 2 000 | 3 200 ms | 88 ms |
| 100 000 | — | 139 ms |

行模板是唯一的子元素。`each` 可以改循环变量名（默认 `item`），`index` 永远可用。

## 怎么选

| 场景 | 用什么 |
| --- | --- |
| 结构化、要排序、几百行以内 | `<Table>` |
| 从固定短列表里挑一个 | `<List>` 或 `<Select>` |
| 几千到几百万行 | `<VirtualList>` |
| 手写几行 | `<For>` / `<Row>` |
