# Slider — 滑块

水平滑块，用于在范围内取值。自闭合。

## 属性

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `min` | int | 0 | 最小值 |
| `max` | int | 100 | 最大值 |
| `step` | int | 1 | 步进 |
| `value` | int | `min` | 初始值，支持 `{$x}` |
| `on_change` | str | — | `handler(value)` |
| `accent` | str | `accent` | 已完成轨道颜色 |
| `bg` | str | `border` | 轨道底色 |
| `bind` | str | — | 写回 state |

```html
<Slider min="0" max="100" value="{$volume}" bind="volume"/>
<Slider min="0" max="100" step="5" on_change="on_zoom" accent="accent"/>
```

## 事件与绑定

`on_change` 收到整数。配合 `value="{$key}"` + `bind="key"` 得到双向绑定：

```html
<Slider min="0" max="100" value="{$volume}" bind="volume"/>
<Text size="12" color="subtext">音量：{$volume}</Text>
```

```python
state.volume = 60
```

拖动时 `{$volume}` 实时更新。

## 步进

`step` 控制取值的粒度：

```html
<Slider min="0" max="100" step="10" bind="level"/>
```

## 自定义配色

```html
<Slider min="0" max="100" accent="danger" bg="surface"/>
```

也可写十六进制：`accent="#ff6b6b"`。

## 常见模式

### 音量/进度控制

```html
<Column spacing="8" padding="16">
  <Text size="13" color="subtext">音量</Text>
  <Slider min="0" max="100" value="{$volume}" bind="volume"/>
  <Text size="12" color="subtext">{$volume}</Text>
</Column>
```

### 范围提示

```python
state.volume = 50

def level():
    v = state.volume
    if v == 0:
        return "静音"
    return f"{v}%"

state.level = level
```

```html
<Text>{$level}</Text>
```

### 缩放/亮度等连续量

`min`/`max` 可为任意整数范围：

```html
<Slider min="50" max="200" step="5" value="{$scale}" bind="scale"/>
<Text>缩放 {$scale}%</Text>
```

> Slider 只接受整数范围。需要小数时，用整数放大表示（如 0–100 表示 0.0–1.0），显示时再除以 100。

## 下一步

- [Progress](#/component-progress) — 进度展示
- [表单](#/forms) — 表单字段
