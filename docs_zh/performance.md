# 性能

PawUI 适合构建中小型桌面工具。遵循下面几点，界面就能保持流畅。

## 不要阻塞主线程

处理器运行在 Qt 主线程；任何耗时操作（网络、文件、睡眠）都会冻结界面。用 `app.invoke_async`：

```python
def heavy():
    # 后台线程：只做计算，不要碰任何控件
    return expensive_computation()

def on_done(result, error):
    # 主线程：可以安全更新 state
    if error:
        state.status = f"失败：{error}"
    else:
        state.data = result
        state.status = "完成"

def start():
    state.status = "处理中..."
    app.invoke_async(heavy, done=on_done)
```

规则：`handler` 在后台线程，`done` 在主线程。

## 状态写入用新对象

监听器只在**赋值**时触发。原地修改集合既不会刷新界面，也可能让依赖它的逻辑漏更新：

```python
state.items.append(x)             # 差：不触发刷新
state.items = state.items + [x]   # 好：赋新列表
```

## 长列表用 `<VirtualList>`

`<For>` 会给每一项建真实控件 —— 1000 行就是约 3000 个 QWidget，窗口又慢又沉。
`<VirtualList>` 只建视口里的行，滚动时替换可见的那一段，成本不再随数据量增长：

| 行数 | `<For>` 建树 | `<VirtualList>` 建树 |
| --- | --- | --- |
| 100 | 45 ms | 57 ms |
| 1 000 | 1 300 ms | 87 ms |
| 2 000 | 3 200 ms | 88 ms |
| 100 000 | — | 139 ms |

```html
<VirtualList rows="{$rows}" row_height="34" height="420">
  <Row><Text>{$item.name}</Text></Row>
</VirtualList>
```

几行用 `<For>`、几百行用 `<Table>`，再往上就该 `<VirtualList>`。如果坚持分页，切片要小：

```python
state.page = 1
def page_items():
    start = (state.page - 1) * 50
    return state.all_items[start:start + 50]
state.page_items = page_items
```

## 样式不贵，但也别乱来

规则在文档加载时解析一次，之后匹配控件只是查表；算出来没变的样式表会跳过重设。
但别在循环里 `inject_css` —— 注入一次带 class 的规则，然后 `.add_class(...)` 切换。

## 少用全量 refresh

`app.refresh()` 会销毁并重建整棵控件树，代价高。只在结构确实变化时使用；单纯的值变化靠状态绑定即可。

## 图片别放大

尽量以接近显示尺寸加载图片。`<Image>` 会按 `width`/`height` 缩放，但源图过大仍然占用内存：

```html
<Image src="avatar.png" width="64" height="64"/>
```

## 合理设置动画

入场动画只播放一次，但高 `stagger`、长 `duration` 会让内容"迟迟不出"：

```html
<Column stagger="40">   <!-- 每项 +40ms，别太大 -->
```

## 大量文本

超长文本用 `<TextArea readonly="true">`（原生文本框，滚动高效），而不是把几万字符塞进一个 `<Text>`。

## 检查点

- 主线程里有没有 `time.sleep` / 同步网络请求？
- 列表是原地修改还是赋新对象？
- 是否频繁调用 `app.refresh()`？
- 长列表是否用了 `<VirtualList>` 而不是 `<For>`？
- `inject_css` 是不是只在样式变化时调一次，而不是塞在循环里？

## 下一步

- [状态与脚本](#/state-scripts) — 触发更新的机制
- [事件](#/events) — `invoke_async` 详解
