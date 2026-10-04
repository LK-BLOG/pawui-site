# 弹层与选择：对话框、菜单、快捷键、下拉框

`Dialog` / `Menu` / `Shortcut` / `Select` 四个组件的用法。它们分散在「数据」「交互」「其他」三类里，属性也不一样，这里合起来讲。

## `<Select>`

```xml
<Select items="[日, 周, 月]" value="{$range}" bind="range" on_change="on_range"/>
<Select items="{$cities}" placeholder="选城市"/>
```

原生下拉框（`QComboBox`）。`items` 吃字面量数组，也吃 `{$state}` 引用 —— 状态一变列表就重建。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `items` | array | `[]` | 选项列表，支持 `[a, b, c]` 字面量或 `{$list}` 引用 |
| `value` | string | `""` | 当前选项；写 `{$x}` 时跟随 state 双向同步 |
| `on_change` | handler | — | 选中的文本（`str`）作为参数 |
| `bind` | string | — | 把选中的文本写回 state 的这个键 |

`<Select>` 和 `<Segmented>` 都从固定短列表里挑一个，区别是：

- **选项少（2–5 个）且想让人一眼看全** → `<Segmented>`，一次点亮，更好点；
- **选项多、或者要省横向空间** → `<Select>`，点开再选。

## `<Dialog>`

```xml
<Dialog title="删除确认" open="{$show}"
        cancel="取消" accept="删除"
        on_accept="do_delete" on_reject="cancel_it">
  <Text>这条记录会被永久删除，确定吗？</Text>
</Dialog>
```

内联对话框面板：标题 + 底部按钮 + 内容区。它不是弹出窗口（不挡其它内容），显隐由 `open` 控制，所以可以直接绑 state 做开关。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `title` | string | `""` | 标题文字；空字符串则不显示标题行 |
| `open` | boolean | `true` | 是否可见；写 `{$show}` 可跟随 state |
| `cancel` | string | `"Cancel"` | 取消按钮的**文案**；传空字符串则不显示该按钮 |
| `accept` | string | `"OK"` | 确认按钮的文案；传空字符串则不显示该按钮 |
| `on_accept` | handler | — | 点确认时调用，无参数 |
| `on_reject` | handler | — | 点取消时调用，无参数 |
| `radius` | integer | `12` | 面板圆角 |
| `button_radius` | integer | `10` | 按钮圆角 |

注意 `cancel` / `accept` 是**按钮上的文字**，不是回调；回调是 `on_reject` / `on_accept`。两者容易看串。

`<Dialog>` 是容器（`Container` 的子类），里面可以放任意子元素，也支持 `justify` / `align`。

## `<Menu>`

```xml
<Menu label="文件" items="[打开, 保存, 退出]" on_select="on_file" bind="picked"/>
<Menu label="更多" items="{$actions}"/>
```

点一下弹出原生菜单的按钮。`items` 同样支持字面量和 `{$list}`。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `label` | string | `"Menu"` | 按钮上的文字 |
| `items` | array | `[]` | 菜单项，`[a, b, c]` 或 `{$list}` |
| `on_select` | handler | — | 选中项的文本（`str`）作为参数 |
| `bind` | string | — | 把选中项的文本写回 state 的这个键 |
| `bg` | color | `surface` | 按钮底色，接受主题令牌 |
| `fg` | color | `text` | 按钮文字色 |
| `radius` | integer | `10` | 按钮圆角 |

菜单项是**纯文本**，不支持嵌套子菜单或图标 —— 需要复杂菜单时用 `<List>` 或自己拼按钮。

## `<Shortcut>`

```xml
<Shortcut keys="Ctrl+S" on_press="save"/>
<Shortcut keys="Ctrl+Shift+F" on_press="search"/>
```

应用级快捷键。它**不占任何视觉位置** —— 控件本身是 0×0 的，只负责把按键映射到回调，所以放在 `<Window>` 里任何地方都行（通常就丢在根节点下）。

| 属性 | 类型 | 默认 | 说明 |
| --- | --- | --- | --- |
| `keys` | string | — | Qt 快捷键串，如 `Ctrl+S`、`Ctrl+Shift+F` |
| `on_press` | handler | — | 按下时调用，无参数 |

`keys` 用 Qt 的写法：修饰键是 `Ctrl` / `Shift` / `Alt` / `Meta`，用 `+` 连接，例如 `Ctrl+Alt+Delete`。它是**应用级**的（窗口不在前台也能触发），不是某个输入框的局部快捷键。
