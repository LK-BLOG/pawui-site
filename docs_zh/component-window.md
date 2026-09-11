# Window — 窗口

根窗口容器。每个 `.paw` 文件必须有且仅有一个 `<Window>`。

## 属性

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `title` | str | `"PawUI"` | 窗口标题 |
| `width` | int | `480` | 宽度（px） |
| `height` | int | `640` | 高度（px） |
| `theme` | str | `"dark"` | `dark` / `light` |
| `padding` | int | `0` | 窗口内边距 |
| `spacing` | int | `8` | 子元素间距 |

```html
<Window title="我的应用" width="720" height="480" padding="16" spacing="12" theme="dark">
  <Text size="22" bold>内容从这里开始</Text>
</Window>
```

## 唯一性

一个文件只能有一个根窗口。若顶层出现多个 `<Window>`，或 UI 元素与 `<Window>` 平级，会报错：

```
PawUI error: only one root <Window> is allowed
PawUI error: top-level elements must live inside <Window>
```

`<script>`、`<Component>`、`<Theme>` 是例外——它们可以出现在顶层。

## 隐式窗口

如果顶层是一组 UI 元素而没有 `<Window>`，PawUI 会自动用一个隐式窗口包裹它们。但仍建议显式写出 `<Window>` 以明确标题与尺寸。

## 主题优先级

`<Window theme="...">` 指定基础主题（默认 `dark`）。`<Theme extends="...">` 与 `<Color>` 覆盖会在此基础上应用。详见[主题](#/docs/theming)。

## 运行时修改标题/尺寸

在脚本里可通过 `app.root` 访问底层窗口：

```python
def rename():
    app.root.setWindowTitle(f"标题 - {state.count}")
```

## 窗口尺寸与滚动

内容超出窗口高度时，把内容放进 `<Scroll>`，否则会被截断：

```html
<Window height="400">
  <Scroll expand="true" spacing="8">
    <For each="item" in="{$items}">
      <Text>{$item}</Text>
    </For>
  </Scroll>
</Window>
```

## 窗口淡入

切换主题（`app.set_theme`）时窗口会做一次淡入过渡，无需额外处理。

## 下一步

- [Column / Row](#/docs/layout) — 布局容器
- [主题](#/docs/theming) — 颜色与主题切换
