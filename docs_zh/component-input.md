# Input — 输入框

单行文本输入（`Input`）与多行输入（`TextArea`）。两者都自闭合。

## Input 属性

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `placeholder` | str | `""` | 占位提示 |
| `value` | str | `""` | 初始值，支持 `{$x}` |
| `on_change` | str | — | 内容变化时调用 `handler(text)` |
| `on_enter` | str | — | 回车时调用 `handler(text)` |
| `size` | int | 0 | 字号（0 跟随主题） |
| `show` | str | — | 非空则作为密码框 |
| `bind` | str | — | 双向绑定到 state key |

```html
<Input placeholder="用户名" bind="username"/>
<Input placeholder="搜索..." on_change="search" expand="true"/>
<Input show="password" bind="password" placeholder="密码"/>
<Input on_enter="submit" placeholder="输入后回车提交"/>
```

## 双向绑定

`bind` 把用户输入写回 state；`value="{$key}"` 让 state 的变化回填输入框。二者合用即双向：

```html
<Input bind="query" value="{$query}" placeholder="搜索"/>
```

```python
state.query = ""   # 清空 state 即可清空输入框
```

## 密码框

给 `show` 一个非空值即切换为密码模式：

```html
<Input show="password" bind="pin" placeholder="PIN"/>
```

## 事件

```python
def search(text):
    state.query = text or ""

def submit(text):
    state.submitted = text
```

`on_change` 每次输入都触发；`on_enter` 只在回车时触发。

## TextArea — 多行

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
<TextArea placeholder="写点什么..." height="140" bind="content"/>
<TextArea readonly="true" height="300" value="{$log}"/>
```

## 常用模式

### 带默认值的输入

```html
<Input value="{$name}" bind="name" placeholder="姓名"/>
```

### 只读展示

`TextArea readonly="true"` 适合展示长日志或只读文本，滚动高效。

### 实时字符计数

```python
def count(text):
    state.length = len(text or "")
```

```html
<Input bind="content" on_change="count" placeholder="内容"/>
<Text size="12" color="subtext">{$length} 字符</Text>
```

## 常见问题

- 输入没写回 state？确认加了 `bind`。
- state 改了输入框没变？确认 `value="{$key}"` 存在。
- 数值运算报错？`state.get("count", 0)` 取默认值。

## 下一步

- [表单](#/forms) — 表单校验
- [数据绑定](#/data-binding) — 绑定机制
