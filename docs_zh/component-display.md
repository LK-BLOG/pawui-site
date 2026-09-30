# 展示组件：徽标、头像、骨架屏、代码、Markdown

## `<Badge>`

```xml
<Badge text="NEW" bg="danger"/>
<Badge text="beta" bg="accent" size="10" radius="8"/>
```

小状态标签。`bg` / `fg` 接受主题令牌或颜色，所以徽标跟着主题走，不用单独维护。

## `<Avatar>`

```xml
<Avatar src="me.png" size="48"/>
<Avatar initials="LK" size="48" bg="accent"/>
```

有图裁成圆的，没图就用首字母加底色。两条路径都是自绘，任意尺寸都不会出现方角。

## `<Skeleton>` 与 `<Spinner>`

```xml
<Skeleton width="240" height="14"/>
<Skeleton width="160" height="14" radius="7"/>
<Spinner size="20" thickness="3"/>
```

`<Skeleton>` 是加载时的呼吸占位块，`<Spinner>` 是忙碌时的转圈。两个都不需要图片素材，也不用你写动画循环。

## `<Link>`

```xml
<Link href="https://pawui.pages.dev">官网</Link>
<Link href="#docs" external="false" on_click="go_docs">文档</Link>
```

## `<CodeBlock>`

```xml
<CodeBlock language="python">def f(x):
    return x + 1</CodeBlock>
```

等宽、只读、可选中、不折行。`height` 可以钉高度，不写就按行数走。

## `<Markdown>`

```xml
<Markdown>{$readme}</Markdown>
```

Markdown 会转成 Qt 富文本：标题、列表、代码块、粗体、链接都能渲染，不需要塞一个浏览器内核。`{$state}` 绑定时一变就重渲染。

转换器是刻意写小的 —— 够 UI 用就行（标题、段落、列表、引用、分割线、代码块、行内代码、粗体、斜体、链接）。要完整 CommonMark 就用 `<Web html="...">`。
