# 动画

PawUI 提供声明式**入场动画**：给任意组件加 `animate` 属性即可，无需写动画代码。

## 基本用法

```html
<Text animate="fade">淡入</Text>
<Button animate="slide-up" duration="320" delay="80">上滑入场</Button>
<Image src="logo.png" animate="reveal" duration="400"/>
```

## 动画属性

| 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `animate` | str | — | 动画类型，见下表 |
| `duration` | int | 260 | 时长（ms） |
| `delay` | int | 0 | 延迟（ms） |
| `easing` | str | `out-cubic` | 缓动曲线 |
| `stagger` | int | 0 | 容器属性：子元素逐个延时（ms） |

## 动画类型

| 值 | 效果 |
|----|------|
| `fade` | 淡入 |
| `reveal` | 从高度 0 展开 |
| `slide-up` | 从下方向上滑入 |
| `slide-down` | 从上方向下滑入 |
| `slide-left` | 从右方向左滑入 |
| `slide-right` | 从左方向右滑入 |

> 动画本质上都是「淡入 + 位移/展开」的组合。所有类型都会同时改变透明度。

## 缓动曲线

| 值 | 说明 |
|----|------|
| `linear` | 匀速 |
| `in-cubic` | 慢进快出 |
| `out-cubic` | 快进慢出（默认） |
| `in-out-cubic` | 两端平滑 |
| `out-quad` | 缓出（弱） |
| `out-quart` | 缓出（强） |
| `out-back` | 回弹超出 |
| `out-elastic` | 弹性回弹 |

```html
<Button animate="slide-up" easing="out-back" duration="420">回弹入场</Button>
```

## 逐个入场（stagger）

给容器加 `stagger`，其子元素的 `delay` 会按顺序自动累加：

```html
<Column padding="24" spacing="12" stagger="70">
  <Text animate="slide-up">第一项</Text>
  <Text animate="slide-up">第二项</Text>
  <Text animate="slide-up">第三项</Text>
</Column>
```

效果：第一项延时 0ms，第二项 70ms，第三项 140ms。

> `stagger` 会与子元素自身 `delay` 相加。嵌套容器的 `stagger` 也会叠加。

## 组合示例

```html
<Window title="入场" width="420" height="360">
  <Column padding="32" spacing="16" stagger="60">
    <Text size="26" bold color="accent" animate="slide-down" duration="360">欢迎</Text>
    <Text color="subtext" animate="fade" duration="420">这是一个演示</Text>
    <Row spacing="10" animate="slide-up" duration="380">
      <Button on_click="ok">开始</Button>
      <Button on_click="later" bg="surface" fg="text">稍后</Button>
    </Row>
  </Column>
</Window>
```

## 条件与循环中的动画

`<If>` 和 `<For>` 是逻辑容器，其子元素同样支持动画。列表逐项入场很自然：

```html
<For each="item" in="{$items}">
  <Text animate="slide-up">{$item}</Text>
</For>
```

配合 `<For>` 外层容器的 `stagger` 效果更佳。

## 主题切换动画

调用 `app.set_theme(...)` 时，窗口会做一次淡入过渡（`windowOpacity` 0.55 → 1.0），无需手动处理。

## 注意事项

- 动画在组件**构建时**排队，窗口显示后开始播放，属一次性入场效果。
- 目前没有「状态变化触发动画」这一层（重渲染是重建控件，而非补间）。需要的话可以重建 UI（`app.refresh()`）触发入场动画。
- 位移距离固定（22px），不可配置。
