# 无障碍

PawUI 把 `aria-*` 映射到 Qt 的无障碍层 —— 也就是 NVDA、讲述人、VoiceOver 真正去读的地方。

```xml
<Button aria_label="保存文档" aria_description="把改动写入磁盘">保存</Button>
<Text tabindex="-1">装饰性说明文字</Text>
```

| 属性 | Qt | 效果 |
| --- | --- | --- |
| `aria_label` | `accessibleName` | 读屏软件念出来的名字 |
| `aria_description` | `accessibleDescription` | 需要时补充的细节 |
| `title` | tooltip + description | 悬停提示 |
| `tabindex="0"` | `StrongFocus` | 能被 Tab 聚焦 |
| `tabindex="-1"` | `NoFocus` | Tab 跳过 |

## 默认就够用

不写 `aria_label` 时，PawUI 拿控件自己的文字兜底，所以 `<Text>合计</Text>` 和 `<Button>保存</Button>` 不用额外写也能被正确朗读。只有视觉文字不够时才需要显式给，比如只有图标的按钮：

```xml
<Button aria_label="关闭面板">✕</Button>
```

## 键盘顺序

Tab 顺序跟着控件在树里的顺序走，从上到下。装饰性元素写上 `tabindex="-1"`，键盘用户就不会卡在上面。`pawui inspect` 会把每个元素算出来的 `aria` 名字打出来，漏标一眼就能看见。
