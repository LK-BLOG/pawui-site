# CSS 变量与设计令牌

Qt 不支持 `var()`。PawUI 在**编译期**把它实现掉：样式表进 Qt 之前，所有 `var(--name)` 已经换成真实值 —— 你写的是现代 CSS，Qt 收到的是普通 QSS 字符串。

```xml
<Style>
  :root {
    --brand:   #ff7a1a;
    --pad:     14px;
    --radius:  14px;
  }

  Card     { radius: var(--radius); padding: var(--pad); }
  Button   { bg: var(--brand); }
  Divider  { color: var(--border); }        /* 主题令牌 */
  Text     { color: var(--missing, #333); } /* 兜底值 */
</Style>
```

## 主题令牌直接可用

当前主题的每个字段都暴露成变量，所以切主题时你的自定义 CSS 跟着一起换：

| 变量 | 来源 |
| --- | --- |
| `--background` / `--bg` | `Theme.background` |
| `--surface` | `Theme.surface` |
| `--text` / `--fg` | `Theme.text` |
| `--subtext` | `Theme.subtext` |
| `--accent` | `Theme.accent` |
| `--border` / `--danger` | `Theme.border` / `Theme.danger` |
| `--radius` / `--padding` / `--spacing` | 布局令牌 |
| `--font_family` / `--font_size` | 排版令牌 |
| `--<name>` | 你声明的任意 `<Color name="..."/>` |

```xml
<Theme extends="dark">
  <Color name="brand" value="#22d3ee"/>
</Theme>
```

`--brand` 现在在 CSS 里随便用，而且切回浅色主题也不会丢。

## 兜底与缺失

`var(--x, 兜底)` 在没有 `--x` 时用兜底值。既没定义又没兜底时，PawUI 会记录下来并提示你 —— 而不是像裸 QSS 那样静默丢掉整条声明。

## 这东西值在哪

变量让设计系统变便宜：`:root` 里定义一次令牌，全项目引用，改一个 `<Theme>` / `<Color>` 就换掉整个应用的观感，不用碰任何组件代码。
