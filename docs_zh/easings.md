# 缓动曲线

`easing` 决定入场动画在时间上的速度分布。选对曲线，动画会"自然"很多。

## 可用曲线

| 值 | 感觉 | 适合 |
|----|------|------|
| `linear` | 匀速 | 进度、循环（UI 入场很少用） |
| `in-cubic` | 慢进快出 | 离场/入场起始 |
| `out-cubic` | 快进慢出（**默认**） | 大多数入场 |
| `in-out-cubic` | 两端平滑 | 位移、切换 |
| `out-quad` | 轻微缓出 | 细微淡入 |
| `out-quart` | 强烈缓出 | 快速到位、干净 |
| `out-back` | 略微回弹超出 | 强调、俏皮 |
| `out-elastic` | 弹性震荡 | 强反馈、游戏感 |

## 用法

```html
<Text animate="fade" easing="out-cubic">默认缓出</Text>
<Button animate="slide-up" easing="out-back" duration="420">回弹入场</Button>
<Image src="logo.png" animate="reveal" easing="out-quart" duration="500"/>
```

未指定时使用 `out-cubic`。

## 怎么选

- **大多数入场**：`out-cubic` 或 `out-quart`——快速到位、结尾平稳。
- **需要"啪"一下的强调**：`out-back`（轻微过冲），别滥用。
- **游戏/活泼界面**：`out-elastic`，适度。
- **位置变化**：`in-out-cubic`，两端都顺滑。
- **避免**：给淡入用 `linear`，会显得机械。

## 时长配合

曲线和 `duration` 要一起调：

```html
<Text animate="fade" duration="200" easing="out-quart">轻快</Text>
<Text animate="slide-up" duration="500" easing="out-cubic">舒展</Text>
```

- 短时长（150–250ms）：快、干脆，配 `out-quart`。
- 中时长（300–450ms）：默认区间，配 `out-cubic`。
- 长时长（500ms+）：大块内容的展开，配 `in-out-cubic`。

## 与位移类型搭配

```html
<!-- 轻微上滑 -->
<Text animate="slide-up" easing="out-cubic" duration="320">标题</Text>

<!-- 弹性滑入 -->
<Button animate="slide-left" easing="out-elastic" duration="600">提示</Button>

<!-- 高度展开 -->
<Column animate="reveal" easing="out-quart" duration="400">...</Column>
```

## 可访问性

PawUI 尊重系统的"减少动态"设置：`prefers-reduced-motion` 生效时，动画会被自动禁用。因此无需为无障碍单独移除动画。

## 下一步

- [动画](#/docs/animation) — 动画类型与属性
- [逐个入场](#/docs/stagger) — 序列化入场
