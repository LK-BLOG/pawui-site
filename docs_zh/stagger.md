# 逐个入场

多个元素依次入场，而不是同时出现。用一个 `stagger` 属性即可。

## 基本用法

给**容器**加 `stagger`，其子元素的动画延迟会按顺序累加：

```html
<Column padding="24" spacing="12" stagger="70">
  <Text animate="slide-up">第一项</Text>
  <Text animate="slide-up">第二项</Text>
  <Text animate="slide-up">第三项</Text>
</Column>
```

效果：第一项延时 0ms，第二项 70ms，第三项 140ms。

## 与自身 delay 叠加

子元素自己的 `delay` 会再加到 stagger 上：

```html
<Column stagger="60">
  <Text animate="fade" delay="0">立即开始</Text>
  <Text animate="fade" delay="200">额外再晚 200ms</Text>
</Column>
```

第二项实际延时 = 60（容器累计）+ 200（自身）。

## 嵌套

容器可以嵌套，stagger 值会叠加：

```html
<Column stagger="40">
  <Row spacing="8" stagger="40">
    <Text animate="slide-up">A</Text>
    <Text animate="slide-up">B</Text>
  </Row>
  <Text animate="slide-up">C</Text>
</Column>
```

## 列表入场

`<For>` 渲染的列表逐项入场：

```html
<Column stagger="50">
  <For each="item" in="{$items}">
    <Row padding="10" bg="surface" radius="10" animate="slide-up">
      <Text>{$item}</Text>
    </Row>
  </For>
</Column>
```

## 该用多大

| stagger | 感觉 |
|---------|------|
| 30–50ms | 紧凑、流畅 |
| 60–90ms | 清晰的逐个节奏 |
| 100ms+ | 明显但偏慢，项多时慎用 |

项目多时用小值，否则最后一项要等很久才出现。

## 完整示例

```html
<Window title="入场" width="420" height="380" theme="dark">
  <Column padding="32" spacing="16" stagger="60">
    <Text size="26" bold color="accent" animate="slide-down" duration="360">欢迎</Text>
    <Text color="subtext" animate="fade" duration="420">一个简单的演示</Text>
    <Row spacing="10" animate="slide-up" duration="380">
      <Button on_click="ok">开始</Button>
      <Button on_click="later" bg="surface" fg="text">稍后</Button>
    </Row>
  </Column>
</Window>
```

## 性能与可访问性

- 项数很多时，stagger 会让内容"分批"出现，影响即时可读性；大列表建议不加 stagger。
- `prefers-reduced-motion` 开启时动画会被禁用，直接显示最终状态。

## 下一步

- [动画](#/docs/animation) — 动画类型
- [缓动曲线](#/docs/easings) — 曲线选择
