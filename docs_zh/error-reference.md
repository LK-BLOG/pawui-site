# 错误参考

PawUI 的错误都带位置信息，格式统一为：

```
PawUI error: <message>  (at line N:C)
```

## 错误类型

| 类型 | 何时抛出 |
|------|----------|
| `PyxError` | 基类，其余都继承它 |
| `LexerError` | 词法阶段（少见） |
| `ParseError` | 标签/属性/结构解析失败 |
| `ComponentError` | 组件定义问题（如缺 name） |
| `RenderError` | 渲染阶段（未知组件、找不到图片等） |
| `ScriptError` | `<script>` 编译或执行失败 |

都提供 `e.message`、`e.pos`（含行/列）与 `e.formatted()`。

```python
from pawui.errors import PyxError

try:
    ...
except PyxError as e:
    print(e.formatted())
```

## 解析错误（ParseError）

| 消息 | 原因 |
|------|------|
| `mismatched closing tag: expected </A> got </B>` | 开闭标签不配对 |
| `unclosed tag <A>` | 漏写闭合标签 |
| `unterminated tag <A>` | 标签内少了 `>` |
| `unterminated comment` | `<!--` 没有对应的 `-->` |
| `malformed attribute` | 属性写法有误 |
| `<Component> requires a name attribute` | `<Component>` 缺 `name` |

## 组件错误（ComponentError）

| 消息 | 原因 |
|------|------|
| `component is missing a name` | 自定义组件定义缺少 name |

## 渲染错误（RenderError）

| 消息 | 原因 |
|------|------|
| `unknown component <X>` | 标签名拼错或不存在 |
| `no UI elements found in the file` | 文件里没有可渲染内容 |
| `only one root <Window> is allowed` | 出现多个 `<Window>` |
| `top-level elements must live inside <Window>` | UI 元素与 `<Window>` 平级 |
| `component <X> has no body` | 自定义组件没有根元素 |
| `image not found: <src>` | 图片路径错误（相对工作目录） |
| `Web component requires PySide6-Addons` | 未安装附加包 |

## 脚本错误（ScriptError）

| 消息 | 原因 |
|------|------|
| `script block has invalid Python syntax: ...` | `<script>` 里语法错误 |
| `script block failed at runtime: ...` | 脚本执行时抛异常 |

`ScriptError` 会附带底层异常内容，便于定位。

## 定位技巧

1. 复制错误信息里的 `line:col`，直接跳到 `.paw` 对应行。
2. `pawui check app.paw` 可在运行前发现多数解析错误。
3. 遇到 `image not found`，确认运行目录（用 `pwd`）并改用正确相对/绝对路径。

## 退出码（CLI）

| 码 | 含义 |
|----|------|
| 0 | 成功 |
| 1 | 运行/解析错误 |
| 2 | 参数用法错误 |
| 130 | 用户中断（Ctrl+C） |

## 下一步

- [调试](#/docs/debugging) — 定位流程
- [命令行](#/docs/cli) — `check` 与 `render`
