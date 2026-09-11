# 调试

PawUI 的目标是让错误一眼可读。这一节讲如何快速定位问题。

## 先做语法检查

```bash
pawui check app.paw
```

只解析、不运行，几毫秒出结果：

```
✓ app.paw: syntax OK
  Elements: 1
  Script: yes
  Component: Sidebar
```

失败时给出**行号与列号**：

```
PawUI error: mismatched closing tag: expected </Column> got </Row>  (at line 12:3)
```

大多数问题（标签不匹配、属性写错、Python 缩进）在 `check` 阶段就能发现。

## 运行时错误

运行时的异常同样带位置：

```
PawUI error: unknown component <Buton>  (at line 5:5)
PawUI error: component <Card> has no body
PawUI error: image not found: assets/logo.png
```

在 Python 中捕获并格式化：

```python
from pawui.errors import PyxError
from pawui import run

try:
    run("app.paw")
except PyxError as e:
    print(e.formatted())     # 带行号的友好信息
```

## 离线渲染检查

在无显示环境（CI、远程）验证应用能否构建：

```bash
pawui render app.paw
```

输出窗口标题与尺寸，不弹窗。

## 热重载调试

```bash
pawui watch app.paw
```

保存即重建。**语法错误不会让旧窗口消失**——错误打印到终端，修好后自动恢复。非常适合边改边看。

## 常见错误定位

| 症状 | 可能原因 |
|------|----------|
| `unknown component <X>` | 标签拼错或大小写不符 |
| `mismatched closing tag` | 开闭标签不配对 |
| `unclosed tag` | 漏写闭合标签 |
| `has no body` | 自定义组件没有根元素 |
| `image not found` | 路径相对工作目录，不是 `.paw` 所在目录 |
| `script block has invalid Python syntax` | 缩进/冒号问题 |
| 界面没更新 | 原地修改了集合，或模板键名拼错 |
| 数值 `TypeError` | 未设置的键返回 `""`，用 `state.get(k, 0)` |

## 最小化复现

遇到疑难，把 `.paw` 裁到最小：

1. 删掉所有非必要组件，只留报错那一行附近。
2. 删掉脚本里无关函数。
3. 用 `pawui check` 反复验证。

多数问题集中在三处：**标签匹配、state 键名、条件表达式**。

## 打印调试

在脚本里用标准 `print`，输出到终端：

```python
def submit():
    print("submit called, email =", state.email)
    ...
```

（`app.invoke_async` 的后台线程打印同样输出到终端。）

## 下一步

- [错误参考](#/docs/error-reference) — 错误类型清单
- [常见问题](#/docs/faq) — 排错 FAQ
