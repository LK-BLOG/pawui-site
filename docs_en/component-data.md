# Data components: Table, List, VirtualList

Three ways to show a collection, picked by size and intent.

## `<Table>` — sortable data

```xml
<Table columns="[Name, Stars, Lang]"
       rows="{$repos}"
       height="260"
       on_select="pick"/>
```

```python
repos = [
    {"Name": "PawUI", "Stars": 42, "Lang": "Python"},
    {"Name": "Docs",  "Stars": 7,  "Lang": "Markdown"},
]

def pick(row):          # row = ["PawUI", "42", "Python"]
    print(row)
```

Rows may be dicts (looked up by column name) or lists. Numeric-looking cells are
sorted as numbers, not as strings. Props: `sortable`, `striped`, `index`
(row-number column), `radius`, `height`. `rows="{$state}"` re-renders whenever
that state key changes.

For markup-only data you can pass JSON directly:

```xml
<Table columns="[a, b]" rows='[{"a": 1, "b": 2}, {"a": 3, "b": 4}]'/>
```

## `<List>` — single selection

```xml
<List items="{$files}" value="{$current}" bind="current" on_select="open_file"/>
```

`items` accepts a state reference, `[a, b, c]` or `a, b, c`. The selected text
is written back to state when you pass `bind`.

## `<VirtualList>` — 100 000 rows, 20 widgets

`<For>` builds a real widget for every row: 1000 rows means 3000 QWidgets and a
list that feels heavy. `<VirtualList>` builds only the rows inside the viewport
and swaps them as you scroll, so the cost is constant:

```xml
<VirtualList rows="{$rows}" row_height="34" height="420">
  <Row><Text>{$item.name}</Text><Badge text="{$index}"/></Row>
</VirtualList>
```

Measured on a laptop with the same row template:

| Rows | `<For>` build | `<VirtualList>` build |
| --- | --- | --- |
| 100 | 45 ms | 57 ms |
| 1 000 | 1 300 ms | 87 ms |
| 2 000 | 3 200 ms | 88 ms |
| 100 000 | — | 139 ms |

The row template is the single child element. `each` renames the loop variable
(default `item`); `index` is always available.

## Choosing

| Situation | Use |
| --- | --- |
| Structured, sortable, ≤ a few hundred rows | `<Table>` |
| Pick one from a short fixed list | `<List>` or `<Select>` |
| Thousands to millions of rows | `<VirtualList>` |
| A handful of hand-written rows | `<For>` / `<Row>` |
