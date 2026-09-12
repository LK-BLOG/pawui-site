# 列表

列表是桌面应用最常见的结构。这一节讲渲染、增删、空状态与分页。

## 渲染

```html
<Scroll spacing="8" expand="true">
  <For each="item" in="{$items}">
    <Row spacing="12" padding="10" bg="surface" radius="10">
      <Text size="14" expand="true">{$item.title}</Text>
      <Text size="12" color="subtext">{$item.meta}</Text>
    </Row>
  </For>
</Scroll>
```

用 `<Scroll expand="true">` 让列表占据剩余空间并可滚动。

## 增删改

更新列表时**赋新列表**以触发刷新：

```python
state.items = []

def add(title):
    state.items = state.items + [{"title": title, "meta": ""}]

def remove(index):
    items = list(state.items)
    if 0 <= index < len(items):
        items.pop(index)
        state.items = items

def update(index, key, value):
    items = [dict(it) for it in state.items]
    if 0 <= index < len(items):
        items[index][key] = value
        state.items = items
```

> 直接在 For 内按索引删除需要把索引传给处理器；当前 `on_click` 只调用无参处理器，可在渲染时用数据本身的稳定 id 记录"当前选中项"，再统一处理。

## 空状态

```html
<If condition="{$is_empty}">
  <Column padding="40" spacing="8">
    <Text color="subtext">还没有内容</Text>
    <Button on_click="add_sample">添加示例</Button>
  </Column>
</If>
```

```python
def refresh():
    state.is_empty = len(state.items) == 0
```

## 过滤

```python
state.all = []
state.query = ""
state.items = []
state.is_empty = True

def apply_filter():
    q = state.query.strip().lower()
    result = [x for x in state.all if q in x["title"].lower()] if q else list(state.all)
    state.items = result
    state.is_empty = len(result) == 0
```

```html
<Input bind="query" on_change="on_query" placeholder="搜索..." expand="true"/>
```

```python
def on_query(text):
    state.query = text or ""
    apply_filter()
```

## 分页（大列表）

```python
state.all = [f"条目 {i}" for i in range(1, 101)]
state.page = 1
state.per_page = 20

def page_items():
    start = (state.page - 1) * state.per_page
    return state.all[start:start + state.per_page]

def total_pages():
    return max(1, (len(state.all) + state.per_page - 1) // state.per_page)

state.items = page_items
state.total_pages = total_pages
```

```html
<For each="row" in="{$items}">
  <Text>{$row}</Text>
</For>
<Row spacing="8">
  <Button on_click="prev" bg="surface" fg="text">上一页</Button>
  <Text>{$page} / {$total_pages}</Text>
  <Button on_click="next">下一页</Button>
</Row>
```

## 选中项

用 state 记录选中项，在渲染时对比：

```python
state.selected = ""

def select(title):
    state.selected = title
```

```html
<For each="item" in="{$items}">
  <Button on_click="{$select}" bg="surface" fg="text">{$item}</Button>
</For>
<Text>已选：{$selected}</Text>
```

## 性能

`<For>` 为每一项构建控件。上百项用分页，上千项务必分页（见[性能](#/performance)）。

## 下一步

- [控制流](#/control-flow) — `<For>` 与 `<If>` 细则
- [配方](#/recipes) — 搜索/分页片段
