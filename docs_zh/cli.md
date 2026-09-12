# 命令行

安装后会得到一个 `pawui` 命令。

```bash
pawui <file.paw>            # 直接运行
pawui run <file.paw>        # 显式运行
pawui watch <file.paw>      # 热重载
pawui check <file.paw>      # 语法检查
pawui schema                # 输出组件 Schema (JSON)
pawui render <file.paw>     # 离屏渲染
pawui help [topic]          # 内置文档
pawui --version
pawui --help
```

## run

```bash
pawui app.paw
pawui run app.paw
```

运行 `.paw` 文件，阻塞直到窗口关闭。文件不存在会报错。

## watch

```bash
pawui watch app.paw
```

每 400ms 轮询文件修改时间。文件变化时重新解析并重建窗口，**保留 State 与脚本函数**：

```
  ↻ app.paw changed, rebuilding…
  ✓ reloaded
```

有语法错误时打印错误但保留旧窗口，修好后自动恢复。

## check

```bash
pawui check app.paw
```

只解析、不运行。成功时输出：

```
✓ app.paw: syntax OK
  Elements: 1
  Script: yes
  Component: UserCard
```

失败时输出带位置的错误：

```
PawUI error: mismatched closing tag: expected </Column> got </Row>  (at line 12:3)
```

退出码：`0` 成功，`1` 失败，`2` 参数错误。

## schema

```bash
pawui schema
```

输出所有组件、属性、动画与主题的 JSON Schema，适合编辑器补全或工具集成：

```json
{
  "components": {
    "Button": {
      "props": {
        "on_click": {"type": "string"},
        "bg": {"type": "string", "default": "accent"}
      }
    }
  }
}
```

## render

```bash
pawui render app.paw
```

以离屏模式（`QT_QPA_PLATFORM=offscreen`）渲染并输出信息，适合 CI 校验：

```
✓ app.paw: render OK
  Window: 计数器
  Size: 400x300
```

## help

```bash
pawui help              # 列出主题
pawui help components   # 打印某主题全文
```

从随包 `docs/` 目录读取 Markdown 并输出到终端。可用主题取决于安装内容（如 `components`、`syntax`、`theming`）。

## 版本与帮助

```bash
pawui --version    # PawUI 0.1.1
pawui -h
pawui --help
```

## 在 Python 中调用

```python
from pawui import main

code = main(["check", "app.paw"])   # 返回退出码
```

## 退出码

| 码 | 含义 |
|----|------|
| 0 | 成功 |
| 1 | 运行 / 解析错误 |
| 2 | 参数用法错误 |
| 130 | 用户中断（Ctrl+C） |

## 下一步

- [API 参考](#/api) — Python 接口
- [常见问题](#/faq) — 排错
