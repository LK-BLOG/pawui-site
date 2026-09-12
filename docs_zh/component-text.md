# Text — 文本

显示一段文本，内容写在标签之间，支持状态插值。

## 属性

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `size` | int | 12 | 字号（px），也接受 `font_size` |
| `bold` | bool | `false` | 粗体 |
| `italic` | bool | `false` | 斜体 |
| `color` / `fg` | str | `text` | 文字颜色 |

```html
<Text>普通文本</Text>
<Text size="28" bold color="accent">大标题</Text>
<Text size="12" color="subtext">次要说明</Text>
<Text size="14" italic color="subtext">斜体</Text>
```

## 插值

内容里可引用状态，也支持属性路径与索引：

```html
<Text>{$count}</Text>
<Text>你好，{$user.name}！</Text>
<Text>共 {$items[0]} 项</Text>
<Text>进度 {$progress}%</Text>
```

状态变化时文本自动更新。

## 颜色令牌

凡是颜色，直接写令牌名即可跟随主题：

```html
<Text color="text">正文</Text>
<Text color="subtext">次要</Text>
<Text color="accent">强调</Text>
<Text color="danger">错误</Text>
```

也可写十六进制：`<Text color="#ff6b6b">`。

> **陷阱**：内容或属性若正好等于令牌名，会被替换成颜色。`<Text>accent</Text>` 显示的是颜色值而非 "accent"。要显示这个词，用插值：`<Text>{"accent"}</Text>`。

## 作为标题层级

PawUI 没有内置标题组件，用 `size` + `bold` 表达层级：

```html
<Text size="26" bold color="accent">页面标题</Text>
<Text size="17" bold>小节标题</Text>
<Text size="12" color="subtext">说明文字</Text>
```

## 长文本

少量多行文本可用 `<Text>`；上万字符请用只读文本框以获得高效滚动：

```html
<TextArea readonly="true" height="300" value="{$log}"/>
```

## 动态内容

插值会在状态变化时刷新。整段内容由函数生成时，把它作为可调用值挂到 state：

```python
def summary():
    return f"共 {len(state.items)} 项，已完成 {state.done}"

state.summary = summary
```

```html
<Text>{$summary}</Text>
```

## 下一步

- [主题](#/theming) — 颜色令牌
- [数据绑定](#/data-binding) — 插值细节
