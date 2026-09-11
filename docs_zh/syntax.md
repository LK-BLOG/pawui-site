# 语法参考

PawUI 文件由**元素树**和可选的 **`<script>` Python 块**组成，语法接近 HTML。

## 文件结构

```html
<Window title="标题" width="480" height="360" theme="dark">
  <!-- 组件树 -->
  <Column padding="24">
    <Text>内容</Text>
  </Column>
</Window>

<script>
# 这里是纯 Python
state.count = 0

def handler():
    state.count += 1
</script>
```

规则：

- 顶层要么是**唯一一个** `<Window>`，要么是一组元素（会被自动包进一个隐式 Window）。
- `<Window>` 之外只允许 `<script>`、`<Component>`、`<Theme>` 等顶层元素。
- 元素可以自闭合 `<Divider/>`，也可以成对 `<Text>...</Text>`。
- 支持 `<!-- 注释 -->`。

## 标签总览

### 容器

| 标签 | 说明 |
|------|------|
| `Window` | 根窗口，每文件仅一个 |
| `Column` | 垂直布局 |
| `Row` | 水平布局 |
| `Scroll` | 可滚动容器 |
| `Tabs` / `Tab` | 标签页 |
| `Tooltip` | 悬停提示包裹层 |

### 展示

| 标签 | 说明 |
|------|------|
| `Text` | 文本 |
| `Image` | 图片 |
| `Divider` | 分割线 |
| `Spacer` | 弹性空白 |
| `Progress` | 进度条 |

### 交互

| 标签 | 说明 |
|------|------|
| `Button` | 按钮 |
| `Input` | 单行输入 |
| `TextArea` | 多行输入 |
| `Checkbox` | 开关 |
| `Slider` | 滑块 |
| `Web` | 内嵌网页（需 PySide6-Addons） |

### 逻辑

| 标签 | 说明 |
|------|------|
| `If` | 条件渲染 |
| `For` | 列表循环 |

每个组件的完整属性见 [组件](#/docs/components)。

## 属性

### 写法

```html
<Text size="20" bold color="accent">标题</Text>
<Button disabled>不可用</Button>
<Divider thickness=2/>
```

- 值可以用双引号、单引号或不加引号：`size="20"`、`size='20'`、`size=20`。
- 裸属性等价于 `true`：`<Button disabled/>`。
- `true` / `false`（不区分大小写）会解析成布尔值。

### 颜色属性

凡是颜色属性（`bg`、`fg`、`color`、`accent` 等），可以直接写**主题令牌名**：

```html
<Text color="accent">强调色</Text>
<Button bg="surface" fg="text">次要按钮</Button>
```

可用令牌：`background` `surface` `text` `subtext` `accent` `border` `danger`，以及你自定义的颜色名。也可以直接写十六进制值 `#ff6b6b`。

## 模板插值

在文本或属性值中引用状态，支持三种写法：

```html
<Text>{$count}</Text>      <!-- $ 前缀，推荐 -->
<Text>{count}</Text>       <!-- 无前缀 -->
```

支持属性与索引路径：

```html
<Text>{$user.name}</Text>
<Text>{$items[0]}</Text>
<Text>{$data["key"]}</Text>
```

插值可以直接放在一段文字里：

```html
<Text>你好，{$name}！你有 {$count} 条消息</Text>
```

## 控制流

### `<If>` 条件渲染

`condition` 接受一个**布尔值**或**单个状态引用**：

```html
<If condition="{$show_detail}">
  <Text>详情内容</Text>
</If>
```

> **注意**：`condition` 不做表达式求值。`condition="{$a and $b}"` 不会按你预期工作。
> 需要组合条件时，在脚本里先算好一个布尔状态：

```python
def refresh():
    state.show_detail = bool(state.count > 0 and state.logged_in)
```

```html
<If condition="{$show_detail}">
  <Text>详情</Text>
</If>
```

### `<For>` 列表循环

```html
<For each="user" in="{$users}">
  <Row spacing="8">
    <Text>{$user.name}</Text>
    <Text color="subtext">{$user.email}</Text>
  </Row>
</For>
```

- `each` 是循环变量名，默认 `item`。
- `in` 接受一个列表，通常是 `{$list}` 这样的引用。
- 循环变量只在 `<For>` 子树内可见。

## 事件

```html
<Button on_click="save">保存</Button>
<Input on_change="on_name" on_enter="submit" bind="name"/>
<Checkbox on_change="on_toggle" bind="enabled"/>
<Slider on_change="on_volume" bind="volume"/>
```

处理器是脚本里同名的 Python 函数。运行时**只传入处理器声明了的参数**：无参函数不会被传参，带 `text` 参数的会收到文本。详见 [事件](#/docs/events)。

## 自定义组件

```html
<Component name="Card">
  <Prop name="title" default="卡片"/>
  <Column padding="16" bg="surface" radius="12" spacing="8">
    <Text size="16" bold>{$title}</Text>
  </Column>
</Component>

<!-- 使用 -->
<Card title="我的卡片"/>
```

详见 [自定义组件](#/docs/custom-components)。

## 主题

```html
<Window theme="dark"> ... </Window>

<!-- 或自定义 -->
<Theme extends="light">
  <Color name="accent" value="#ff6b6b"/>
  <Color name="brand" value="#4ecdc4"/>
</Theme>
```

详见 [主题](#/docs/theming)。

## 动画

```html
<Text animate="fade">淡入</Text>
<Button animate="slide-up" duration="320" delay="80">上滑</Button>
<Column stagger="60">
  <Text>第一项</Text>
  <Text>第二项</Text>
</Column>
```

详见 [动画](#/docs/animation)。
