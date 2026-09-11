# 控制流

`<If>` 与 `<For>` 是**逻辑容器**：它们不产生可见边框，只为子元素提供条件或循环。

## `<If>` 条件渲染

```html
<If condition="{$show_detail}">
  <Text>详情内容</Text>
</If>
```

`condition` 接受：

- 一个**状态引用**：`{$flag}`
- 一个**布尔字面量**：`condition="true"`

它**不做表达式求值**。下面这样不会按预期工作：

```html
<!-- 错误：不会计算 a and b -->
<If condition="{$a and $b}">
```

正确做法是在脚本里先算好一个布尔键：

```python
def refresh():
    state.show_detail = bool(state.logged_in and state.count > 0)
```

## 取反

没有取反语法，维护一个语义相反的布尔键即可：

```python
state.items = []
state.empty = True

def update():
    state.empty = len(state.items) == 0
```

```html
<If condition="{$empty}">
  <Text color="subtext">暂无数据</Text>
</If>
```

## `<For>` 列表循环

```html
<For each="user" in="{$users}">
  <Row spacing="8">
    <Text>{$user.name}</Text>
    <Text color="subtext">{$user.email}</Text>
  </Row>
</For>
```

- `each` 是循环变量名，默认 `item`。
- `in` 取列表引用。用 `{$users}` 时得到的是原始列表对象，能正确遍历。
- 循环变量只在 `<For>` 子树内可见。

## 嵌套

逻辑容器可以任意嵌套，并与其他容器组合：

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

## 空列表

`<For>` 遍历空列表时什么都不渲染。配合 `<If>` 显示占位：

```html
<If condition="{$is_empty}">
  <Text color="subtext">还没有内容</Text>
</If>
<For each="item" in="{$items}">
  <Text>{$item}</Text>
</For>
```

## 与动画配合

`<For>` 的子元素支持入场动画，配合外层容器的 `stagger` 可逐个入场：

```html
<Column stagger="50">
  <For each="item" in="{$items}">
    <Text animate="slide-up">{$item}</Text>
  </For>
</Column>
```

## 性能提示

`<For>` 会为每一项构建真实控件。上千项时应分页或只渲染可见部分（见[性能](#/docs/performance)）。

## 下一步

- [列表](#/docs/lists) — 列表渲染与增删改
- [数据绑定](#/docs/data-binding) — 模板与作用域
