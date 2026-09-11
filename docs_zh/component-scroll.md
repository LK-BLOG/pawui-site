# Scroll — 滚动容器

内容超出可用空间时滚动。垂直方向。

## 属性

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `padding` | int / list | 12 | 内边距（1/2/4 值） |
| `spacing` | int | 8 | 子元素间距 |
| `bg` | str | — | 背景色 |

```html
<Scroll padding="16" spacing="8" expand="true">
  <For each="item" in="{$items}">
    <Text>{$item}</Text>
  </For>
</Scroll>
```

## 为什么需要 expand

容器的默认行为是"内容决定高度"。要让滚动区占据窗口剩余空间并能滚动多余内容，给它加 `expand="true"`：

```html
<Window height="400">
  <Column padding="16" spacing="12" expand="true">
    <Text size="18" bold>列表</Text>
    <Scroll expand="true" spacing="6">
      <For each="row" in="{$rows}">
        <Text>{$row}</Text>
      </For>
    </Scroll>
  </Column>
</Window>
```

## 长文本滚动

用只读文本框展示大量文本，滚动更高效：

```html
<TextArea readonly="true" height="300" value="{$log}"/>
```

或放进 `<Scroll>`：

```html
<Scroll expand="true">
  <Text>{$log}</Text>
</Scroll>
```

## 日志自动追加

```python
state.logs = ["[启动] 就绪"]

def add_log():
    state.logs = state.logs + [f"[事件] #{len(state.logs) + 1}"]
```

逐条渲染为 `<Text>`，滚动区随内容增长。

## 嵌套滚动

`Scroll` 内可嵌套布局，但**避免横向滚动嵌套纵向滚动**——PawUI 的 `Scroll` 是垂直方向。宽内容应改用换行/截断或缩小。

## 背景

```html
<Scroll bg="surface" padding="12" spacing="8" expand="true">
  ...
</Scroll>
```

## 常见问题

- 内容被截断不滚动？给 `Scroll` 加 `expand="true"`。
- 没有滚动条？只有内容超过容器高度时才会出现。
- 想让某一个卡片纵向拉伸？给该卡片加 `expand="true"`。

## 下一步

- [列表](#/docs/lists) — 列表渲染
- [布局](#/docs/layout) — 容器与弹性
