# Checkbox — 开关

iOS 风格的开关，标签写在标签之间。

## 属性

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `checked` | bool | `false` | 初始状态 |
| `on_change` | str | — | 切换时调用 `handler(checked)` |
| `size` | int | 12 | 标签字号 |
| `fg` | str | `text` | 标签颜色 |
| `bind` | str | — | 写回 state |

```html
<Checkbox bind="auto_save" checked="true">自动保存</Checkbox>
<Checkbox bind="notifications" on_change="on_toggle">桌面通知</Checkbox>
```

## 事件与绑定

```python
def on_toggle(checked):
    state.enabled = checked
```

`on_change` 收到布尔值。若只关心状态，用 `bind` 即可，无需处理器：

```html
<Checkbox bind="agreed">我同意</Checkbox>
```

`bind` 会把开关状态写入 `state.agreed`。

## 读取开关状态

```python
if state.agreed:
    ...
```

未勾选且未初始化时，`state.agreed` 可能是 `""`（假值）；要严格布尔用 `state.get("agreed", False)`，或初始化为 `False`：

```python
state.agreed = False
```

## 动态标签

标签内容支持插值：

```html
<Checkbox bind="enabled">功能已{if_state}</Checkbox>
```

## 常见模式

### 设置项列表

```html
<Column spacing="12" padding="16">
  <Checkbox bind="opt_auto_save" checked="true">自动保存</Checkbox>
  <Checkbox bind="opt_sync">云端同步</Checkbox>
  <Checkbox bind="opt_updates" checked="true">自动更新</Checkbox>
</Column>
```

### 勾选解锁操作

```html
<Checkbox bind="agreed">我已阅读并同意</Checkbox>
<Button on_click="proceed">继续</Button>
```

配合条件渲染即可在未勾选时隐藏/禁用按钮（`disabled` 不会随状态实时变化，用 `<If>` 切换两版按钮）：

```html
<If condition="{$agreed}">
  <Button on_click="proceed">继续</Button>
</If>
<If condition="{$not_agreed}">
  <Button disabled>请先勾选</Button>
</If>
```

## 下一步

- [表单](#/forms) — 表单字段
- [数据绑定](#/data-binding) — 写回规则
