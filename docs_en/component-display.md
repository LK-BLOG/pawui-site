# Display components: badges, avatars, skeletons, code, markdown

## `<Badge>`

```xml
<Badge text="NEW" bg="danger"/>
<Badge text="beta" bg="accent" size="10" radius="8"/>
```

A compact status pill. `bg`/`fg` take theme tokens or colours, so a badge
switches with the theme for free.

## `<Avatar>`

```xml
<Avatar src="me.png" size="48"/>
<Avatar initials="LK" size="48" bg="accent"/>
```

Circular crop for images, coloured initials otherwise. Both paths are painted
by hand, so corners stay round at any size.

## `<Skeleton>` and `<Spinner>`

```xml
<Skeleton width="240" height="14"/>
<Skeleton width="160" height="14" radius="7"/>
<Spinner size="20" thickness="3"/>
```

`<Skeleton>` is the shimmering placeholder you show while loading; `<Spinner>`
is the spinning arc for a busy action. Neither needs an image asset or an
animation loop written by you.

## `<Link>`

```xml
<Link href="https://pawui.pages.dev">Website</Link>
<Link href="#docs" external="false" on_click="go_docs">Docs</Link>
```

## `<CodeBlock>`

```xml
<CodeBlock language="python">def f(x):
    return x + 1</CodeBlock>
```

Monospace, read-only, selectable, no wrapping. `height` pins it; otherwise the
height follows the line count.

## `<Markdown>`

```xml
<Markdown>{$readme}</Markdown>
```

Markdown is converted to Qt rich text, so headings, lists, code fences, bold
and links all render without a browser engine. `{$state}` bindings re-render on
change.

The converter is deliberately small — it covers what a UI needs (headings,
paragraphs, lists, quotes, hr, code fences, inline code, bold, italic, links).
For full CommonMark, render with `<Web html="...">`.
