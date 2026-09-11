# 自定义组件

把重复的 UI 片段封装成可复用组件。用 `<Component name="...">` 定义，像内置标签一样使用。

## 定义组件

```html
<Component name="Card">
  <Column padding="16" bg="surface" radius="12" spacing="8">
    <Text size="16" bold>{$title}</Text>
    <Text size="13" color="subtext">内容占位</Text>
  </Column>
</Component>
```

组件定义放在顶层（和 `<Window>` 同级），不会直接渲染。

## 使用组件

```html
<Window title="卡片">
  <Column padding="20" spacing="12">
    <Card title="第一张"/>
    <Card title="第二张"/>
  </Column>
</Window>
```

传给组件的属性 `title` 会在组件内部通过 `{$title}` 引用。

## 默认属性 `<Prop>`

用 `<Prop>` 声明默认值。调用时未传则用默认：

```html
<Component name="Badge">
  <Prop name="text" default="标签"/>
  <Prop name="color" default="accent"/>
  <Text size="12" bold color="{$color}" bg="surface" radius="999" padding="4 8">
    {$text}
  </Text>
</Component>

<Badge text="新" color="accent"/>
<Badge text="普通"/>          <!-- 用默认 color -->
<Badge/>                       <!-- 全部用默认 -->
```

## 属性解析顺序

组件内部引用某个名字时，按此顺序解析：

1. 调用时传入的属性（`<Card title="...">`）
2. `<Prop>` 的 `default`
3. 外层作用域 / state / 主题

因此组件可以读取外部 state，也可以被参数覆盖：

```html
<Component name="Stat">
  <Prop name="value" default="0"/>
  <Column padding="16" bg="surface" radius="12">
    <Text size="28" bold color="accent">{$value}</Text>
    <Text size="12" color="subtext">{$label}</Text>
  </Column>
</Component>
```

```html
<Stat value="{$user_count}" label="用户"/>
<Stat value="{$order_count}" label="订单"/>
```

## 传递事件处理器

`on_*` 属性会被特殊处理——作为可调用对象传入组件作用域：

```html
<Component name="ActionButton">
  <Button on_click="{$on_click}" bg="accent">{$label}</Button>
</Component>
```

```html
<ActionButton label="保存" on_click="save"/>
<ActionButton label="取消" on_click="cancel"/>
```

## 组件的可见性

- 组件定义本身不占布局，也不会渲染。
- 组件内部的**根元素**会替换掉调用点的位置。
- 组件可以嵌套使用其他自定义组件。

```html
<Component name="Panel">
  <Column padding="16" bg="surface" radius="14" spacing="10">
    <Badge text="{$status}"/>
    <Text size="15" bold>{$heading}</Text>
    {$body}
  </Column>
</Component>
```

## 完整示例

```html
<Window title="组件演示" width="420" height="420" theme="dark">
  <Column padding="24" spacing="16">
    <Text size="22" bold color="accent">用户卡片</Text>
    <For each="user" in="{$users}">
      <UserCard name="{$user.name}" role="{$user.role}" on_click="pick"/>
    </For>
  </Column>
</Window>

<Component name="UserCard">
  <Prop name="name" default="匿名"/>
  <Prop name="role" default="访客"/>
  <Row padding="14" bg="surface" radius="12" spacing="12">
    <Column spacing="2" expand>
      <Text size="15" bold>{$name}</Text>
      <Text size="12" color="subtext">{$role}</Text>
    </Column>
    <Button on_click="{$on_click}" bg="accent">选择</Button>
  </Row>
</Component>

<script>
state.users = [
    {"name": "Alice", "role": "管理员"},
    {"name": "Bob", "role": "编辑"},
]

def pick():
    state.selected = "已选择"
</script>
```

## 注意事项

- 组件名区分大小写，需与 `<Component name="...">` 完全一致。
- 组件定义中必须有一个根元素作为内容，否则报 `component <X> has no body`。
- 目前组件属性是**静态解析**的：每次构建取一次值。依赖 state 的变化需要重建 UI（`app.refresh()` 或状态绑定）。

## 下一步

- [语法参考](#/docs/syntax) — 组件相关语法
- [状态与脚本](#/docs/state-scripts) — 用 state 驱动组件
