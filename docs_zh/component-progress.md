# Progress — 进度条

显示 0 到 `max` 之间的进度。自闭合。

## 属性

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `value` | int | 0 | 当前值，支持 `{$x}` |
| `max` | int | 100 | 最大值 |
| `height` | int | 10 | 高度（px） |
| `text` | bool | `false` | 显示百分比文字 |
| `accent` | str | `accent` | 进度颜色 |
| `bg` | str | `surface` | 背景颜色 |

```html
<Progress value="{$progress}" max="100"/>
<Progress value="{$progress}" max="100" text="true"/>
```

## 绑定状态

`value` 支持模板，状态变化时进度条自动更新：

```html
<Progress value="{$done}" max="{$total}" text="true"/>
<Text size="12" color="subtext">{$done} / {$total}</Text>
```

```python
state.done = 3
state.total = 10
```

## 作为完成度指示

```python
def update_progress():
    total = len(state.tasks)
    done = sum(1 for t in state.tasks if t.get("done"))
    state.done = done
    state.total = max(1, total)
```

`max` 至少为 1，避免除零或空条。

## 不确定进度

PawUI 没有单独的"忙碌"模式。不确定进度时可用文字状态代替：

```html
<Text color="subtext">{$status}</Text>
```

```python
def start():
    state.status = "处理中..."
    app.invoke_async(work, done=on_done)
```

## 配色

```html
<Progress value="{$p}" accent="accent" bg="surface"/>
<Progress value="{$p}" accent="danger" bg="surface"/>
```

## 尺寸

```html
<Progress value="{$p}" height="6"/>    <!-- 细 -->
<Progress value="{$p}" height="16"/>   <!-- 粗 -->
```

## 常见模式：带标签的进度

```html
<Column spacing="8">
  <Text size="13">上传进度</Text>
  <Progress value="{$uploaded}" max="{$size}" text="true"/>
</Column>
```

## 下一步

- [Slider](#/component-slider) — 可拖动取值
- [异步](#/async) — 加载任务与进度
