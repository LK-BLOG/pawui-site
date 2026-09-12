# Control Flow

`<If>` and `<For>` are **logical containers**: they add no visible border, only conditions or iteration for their children.

## `<If>` — conditional rendering

```html
<If condition="{$show_detail}">
  <Text>Details</Text>
</If>
```

`condition` accepts:

- a **state reference**: `{$flag}`
- a **boolean literal**: `condition="true"`

It does **not** evaluate expressions. The following will not work as expected:

```html
<!-- wrong: does not compute a and b -->
<If condition="{$a and $b}">
```

Compute a boolean key in the script instead:

```python
def refresh():
    state.show_detail = bool(state.logged_in and state.count > 0)
```

## Negation

There is no negation syntax; keep a boolean with the opposite meaning:

```python
state.items = []
state.empty = True

def update():
    state.empty = len(state.items) == 0
```

```html
<If condition="{$empty}">
  <Text color="subtext">No data</Text>
</If>
```

## `<For>` — list loop

```html
<For each="user" in="{$users}">
  <Row spacing="8">
    <Text>{$user.name}</Text>
    <Text color="subtext">{$user.email}</Text>
  </Row>
</For>
```

- `each` is the loop variable name, default `item`.
- `in` takes a list reference. `{$users}` yields the raw list, so iteration works.
- The loop variable is visible only inside the `<For>` subtree.

## Nesting

Logical containers nest arbitrarily and combine with other containers:

```html
<For each="group" in="{$groups}">
  <Column spacing="6" padding="12" bg="surface" radius="10">
    <Text size="15" bold>{$group.name}</Text>
    <For each="item" in="{$group.items}">
      <If condition="{$item.visible}">
        <Text size="13" color="subtext">{$item.title}</Text>
      </If>
    </For>
  </Column>
</For>
```

## Empty lists

A `<For>` over an empty list renders nothing. Pair with `<If>` for a placeholder:

```html
<If condition="{$is_empty}">
  <Text color="subtext">Nothing here yet</Text>
</If>
<For each="item" in="{$items}">
  <Text>{$item}</Text>
</For>
```

## With animation

`<For>` children support entrance animations; combine with `stagger` on the parent for a sequential reveal:

```html
<Column stagger="50">
  <For each="item" in="{$items}">
    <Text animate="slide-up">{$item}</Text>
  </For>
</Column>
```

## Performance note

`<For>` builds a real widget per item. With thousands of items, paginate or render only what's visible (see [Performance](#/performance)).

## Next

- [Lists](#/lists) — rendering, add/remove
- [Data Binding](#/data-binding) — templates and scope
