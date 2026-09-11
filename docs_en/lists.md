# Lists

Lists are the most common structure in desktop apps. This page covers rendering, add/remove, empty states, and pagination.

## Rendering

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

Use `<Scroll expand="true">` so the list fills the remaining space and scrolls.

## Add / remove / update

**Assign a new list** so the UI refreshes:

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

> Removing by index inside `<For>` requires passing the index to the handler; `on_click` currently calls zero-arg handlers. Track the "current item" in state and handle it uniformly.

## Empty state

```html
<If condition="{$is_empty}">
  <Column padding="40" spacing="8">
    <Text color="subtext">Nothing here yet</Text>
    <Button on_click="add_sample">Add a sample</Button>
  </Column>
</If>
```

```python
def refresh():
    state.is_empty = len(state.items) == 0
```

## Filtering

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
<Input bind="query" on_change="on_query" placeholder="Search..." expand="true"/>
```

```python
def on_query(text):
    state.query = text or ""
    apply_filter()
```

## Pagination (large lists)

```python
state.all = [f"Item {i}" for i in range(1, 101)]
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
  <Button on_click="prev" bg="surface" fg="text">Prev</Button>
  <Text>{$page} / {$total_pages}</Text>
  <Button on_click="next">Next</Button>
</Row>
```

## Selection

Track the selected item in state and compare at render time:

```python
state.selected = ""

def select(title):
    state.selected = title
```

```html
<For each="item" in="{$items}">
  <Button on_click="{$select}" bg="surface" fg="text">{$item}</Button>
</For>
<Text>Selected: {$selected}</Text>
```

## Performance

`<For>` builds a widget per item. Paginate beyond a hundred items; always paginate in the thousands (see [Performance](#/docs/performance)).

## Next

- [Control Flow](#/docs/control-flow) — `<For>` and `<If>` details
- [Recipes](#/docs/recipes) — search/pagination snippets
