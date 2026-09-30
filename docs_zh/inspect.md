# 用 pawui inspect 排查

`pawui inspect app.paw` 会离屏渲染这个文件，然后打三样东西：控件树、每个控件真正命中的 CSS 选择器、还有哪些 state 键有人监听。

```
# app.paw
<Window> 470x860
<Column> 470x535
  <Text> 422x24 "欢迎使用"
      ← .title
      ← #hero
      aria: 欢迎使用
  <Row> 422x58
    <Button> 96x34 "运行"
        aria: 运行

state subscriptions: count(2), name(1)
```

## 该看什么

**规则没生效？** `←` 那几行就是真正命中的选择器。你自己的选择器不在里面，说明是选择器写错或 class 没对上，不是 Qt 的锅。

**颜色不对？** 看命中列表：同类权重里后面写的赢，`#id` 压 `.class` 压标签名。

**状态变了没反应？** 最后一行的订阅列表告诉你哪些键有监听。空的就说明没有控件绑到那个键，通常是 `{$key}` 忘了写。

**控件看不见？** `宽x高` 那列直接告诉你为什么。

## 代码里用

```python
rt = Runtime(source)
rt.run(block=False)
print(rt.inspect_tree())
```

CLI 走的就是这个方法，测试里也能拿来快照整棵树。
