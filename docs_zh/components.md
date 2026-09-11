# 组件

PawUI 内置 **17 个组件**，覆盖布局、展示、交互与逻辑。所有组件都支持动画属性（`animate` / `duration` / `delay` / `easing`）与 `expand`。

![设置面板示例](../static/shots/settings-dark.png)

## Window

根窗口容器，每文件仅一个。

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `title` | str | `"PawUI"` | 窗口标题 |
| `width` | int | `480` | 宽度（px） |
| `height` | int | `640` | 高度（px） |
| `theme` | str | `"dark"` | `dark` / `light` |
| `padding` | int | `0` | 内边距 |
| `spacing` | int | `8` | 子元素间距 |

## Column / Row

垂直 / 水平布局容器，属性相同。

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `padding` | int / list | `12` | 内边距（1/2/4 值） |
| `spacing` | int | `8` | 子元素间距 |
| `bg` | str | — | 背景色 |
| `radius` | int | `24` | 圆角 |
| `expand` | bool | `false` | 拉伸填充 |
| `stagger` | int | `0` | 子元素动画逐个延时（ms） |

## Scroll

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `padding` | int / list | `12` | 内边距 |
| `spacing` | int | `8` | 子元素间距 |
| `bg` | str | — | 背景色 |

## Tabs / Tab

标签页。子元素用 `<Tab label="标签名">`。

| 属性 | 类型 | 默认 |
|------|------|------|
| `bg` | str | `background` |

```html
<Tabs>
  <Tab label="首页"><Text>首页内容</Text></Tab>
  <Tab label="设置"><Text>设置内容</Text></Tab>
</Tabs>
```

## Tooltip

包裹一个子元素，悬停时显示提示。

| 属性 | 类型 | 说明 |
|------|------|------|
| `text` | str | 提示文字（也可写在标签内容里） |

```html
<Tooltip text="点击保存文件">
  <Button on_click="save">保存</Button>
</Tooltip>
```

## Text

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `size` | int | 12 | 字号（px），也接受 `font_size` |
| `bold` | bool | `false` | 粗体 |
| `italic` | bool | `false` | 斜体 |
| `color` / `fg` | str | `text` | 文字颜色 |

```html
<Text size="28" bold color="accent">标题</Text>
<Text color="subtext" size="12">说明文字</Text>
<Text>你好，{$name}</Text>
```

## Image

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `src` | str | — | 路径或来源 |
| `width` | int | 原图宽 | 显示宽度 |
| `height` | int | 原图高 | 显示高度 |
| `cover` | bool | `false` | 等比裁剪填充 |

```html
<Image src="assets/logo.png" width="120"/>
<Image src="assets/banner.jpg" width="400" height="200" cover/>
```

找不到图片会抛出 `RenderError: image not found: <src>`。

## Divider

| 属性 | 类型 | 默认 |
|------|------|------|
| `thickness` | int | 2 |
| `color` | str | `border` |

## Spacer

| 属性 | 类型 | 默认 |
|------|------|------|
| `width` | int | 1 |
| `height` | int | 1 |

## Progress

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `value` | int | 0 | 当前值，支持 `{$x}` |
| `max` | int | 100 | 最大值 |
| `height` | int | 10 | 高度（px） |
| `text` | bool | `false` | 显示百分比 |
| `accent` | str | `accent` | 进度色 |
| `bg` | str | `surface` | 背景色 |

```html
<Progress value="{$progress}" max="100" text/>
```

## Button

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `on_click` | str | — | 点击处理器名 |
| `bg` | str | `accent` | 背景色 |
| `fg` | str | `background` | 文字色 |
| `size` | int | 12 | 字号 |
| `radius` | int | 17 | 圆角 |
| `disabled` | bool | `false` | 禁用 |

```html
<Button on_click="submit">提交</Button>
<Button on_click="cancel" bg="surface" fg="text">取消</Button>
<Button bg="danger" fg="background">删除</Button>
<Button disabled>不可用</Button>
```

## Input

单行输入，自闭合。

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `placeholder` | str | `""` | 占位提示 |
| `value` | str | `""` | 初始值，支持 `{$x}` |
| `on_change` | str | — | 变化时调用 `handler(text)` |
| `on_enter` | str | — | 回车时调用 `handler(text)` |
| `size` | int | 0 | 字号（0 表示跟随主题） |
| `show` | str | — | 非空则作为密码框 |
| `bind` | str | — | 双向绑定到 state key |

```html
<Input placeholder="请输入用户名" bind="username"/>
<Input placeholder="搜索" on_change="search" expand/>
<Input show="password" bind="password" placeholder="密码"/>
```

## TextArea

多行输入，自闭合。

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `placeholder` | str | — | 占位提示 |
| `value` | str | — | 初始文本，支持 `{$x}` |
| `on_change` | str | — | `handler(text)` |
| `readonly` | bool | `false` | 只读 |
| `height` | int | — | 固定高度（px） |
| `size` | int | 14 | 字号 |
| `bind` | str | — | 双向绑定 |

```html
<TextArea placeholder="写点什么..." height="120" bind="content"/>
```

## Checkbox

iOS 风格开关，标签写在标签内容里。

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `checked` | bool | `false` | 初始状态 |
| `on_change` | str | — | `handler(checked)` |
| `size` | int | 12 | 字号 |
| `fg` | str | `text` | 标签颜色 |
| `bind` | str | — | 写回 state |

```html
<Checkbox checked on_change="on_agree" bind="agreed">我同意条款</Checkbox>
```

## Slider

水平滑块，自闭合。

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `min` | int | 0 | 最小值 |
| `max` | int | 100 | 最大值 |
| `step` | int | 1 | 步进 |
| `value` | int | `min` | 初始值，支持 `{$x}` |
| `on_change` | str | — | `handler(value)` |
| `accent` | str | `accent` | 已完成轨道色 |
| `bg` | str | `border` | 轨道底色 |
| `bind` | str | — | 写回 state |

```html
<Slider min="0" max="100" value="{$volume}" bind="volume" on_change="on_volume"/>
```

## Web

内嵌网页，需要 `PySide6-Addons`（`pip install PySide6-Addons`）。

| 属性 | 类型 | 说明 |
|------|------|------|
| `src` | str | 网页 URL |
| `html` | str | 直接注入 HTML（`src` 为空时使用） |
| `bg` | str | 背景色 |

```html
<Web src="https://example.com"/>
```

## If

条件渲染逻辑容器，不产生可见边框。

| 属性 | 类型 | 说明 |
|------|------|------|
| `condition` | bool / ref | 为真时渲染子元素 |

```html
<If condition="{$show_detail}">
  <Text>详情内容</Text>
</If>
```

## For

列表循环逻辑容器。

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `each` | str | `"item"` | 循环变量名 |
| `in` | list ref | — | 要遍历的列表 |

```html
<For each="task" in="{$tasks}">
  <Text>{$task.title}</Text>
</For>
```

## 组合示例

```html
<Window title="待办" width="440" height="560" theme="dark">
  <Column padding="24" spacing="16">
    <Text size="22" bold color="accent">待办事项</Text>

    <Row spacing="8">
      <Input bind="new_task" placeholder="添加任务..." on_enter="add" expand/>
      <Button on_click="add">添加</Button>
    </Row>

    <Divider/>

    <Scroll padding="0" spacing="8">
      <For each="task" in="{$tasks}">
        <Row spacing="12" padding="10" bg="surface" radius="10">
          <Checkbox bind="task.done">完成</Checkbox>
          <Text size="14" color="text">{$task.title}</Text>
        </Row>
      </For>
    </Scroll>

    <Progress value="{$done}" max="{$total}" text/>
  </Column>
</Window>

<script>
state.tasks = []
state.new_task = ""

def add():
    title = state.new_task.strip()
    if title:
        state.tasks = state.tasks + [{"title": title, "done": False}]
        state.new_task = ""

def done():
    return sum(1 for t in state.tasks if t.get("done"))

def total():
    return len(state.tasks)
</script>
```
