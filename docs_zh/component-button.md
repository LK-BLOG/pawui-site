# Button — 按钮

可点击的按钮，文字写在标签之间。

## 属性

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `on_click` | str | — | 点击处理器名 |
| `bg` | str | `accent` | 背景色 |
| `fg` | str | `background` | 文字色 |
| `size` | int | 12 | 字号 |
| `radius` | int | 17 | 圆角 |
| `disabled` | bool | `false` | 禁用 |

```html
<Button on_click="save">保存</Button>
<Button on_click="cancel" bg="surface" fg="text">取消</Button>
<Button bg="danger" fg="background" on_click="delete">删除</Button>
<Button disabled>不可用</Button>
```

悬停与按下状态由组件自动处理（在基色上混合明暗），无需手动定义。

## 处理器

`on_click` 按名解析脚本中的函数。无参或有参都能用；点击事件本身不携带值，通常用无参函数：

```python
def save():
    ...
```

动态处理器也可以从模板来：`<Button on_click="{$handler}">`。

## 主次按钮

用 `bg`/`fg` 区分层级：

```html
<Row spacing="10">
  <Button on_click="submit">主要操作</Button>
  <Button on_click="later" bg="surface" fg="text">次要操作</Button>
  <Button on_click="cancel" bg="surface" fg="subtext">取消</Button>
</Row>
```

## 图标按钮

PawUI 没有图标参数，可用符号或短文本，或用 `<Image>` 组合：

```html
<Button on_click="close" bg="surface" fg="subtext" radius="17">×</Button>
```

## 占满宽度

`expand` 让按钮填满所在容器的剩余空间：

```html
<Column spacing="10" padding="24">
  <Button on_click="login" expand="true">登录</Button>
</Column>
```

## 根据状态禁用

PawUI 的 `disabled` 是构建时属性，不随状态实时变化。要动态控制，可在脚本里判断并重建 UI，或改用条件渲染两份按钮：

```html
<If condition="{$valid}">
  <Button on_click="submit">提交</Button>
</If>
<If condition="{$invalid}">
  <Button disabled>提交</Button>
</If>
```

## 按钮作为导航项

按钮也可用于菜单/侧栏：

```html
<For each="item" in="{$nav}">
  <Button on_click="{$select}" bg="surface" fg="text">{$item}</Button>
</For>
```

## 下一步

- [Input](#/docs/component-input) — 文本输入
- [事件](#/docs/events) — 处理器规则
