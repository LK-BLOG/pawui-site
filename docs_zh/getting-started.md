# 快速上手

从零到跑起来，只需几分钟。

## 1. 安装

```bash
pip install pawui
```

依赖会自动安装 `PySide6>=6.5`。如果网络较慢，可以先单独装 PySide6：

```bash
pip install pyside6
pip install pawui
```

验证安装：

```bash
pawui --version
```

## 2. 创建第一个应用

新建文件 `app.paw`：

```html
<Window title="计数器" width="400" height="300" theme="dark">
  <Column padding="32" spacing="16">
    <Text size="28" bold color="accent">计数器</Text>
    <Text size="48" bold>{$count}</Text>
    <Row spacing="12">
      <Button on_click="increment">+1</Button>
      <Button on_click="decrement" bg="surface" fg="text">-1</Button>
      <Button on_click="reset" bg="surface" fg="subtext">重置</Button>
    </Row>
  </Column>
</Window>

<script>
state.count = 0

def increment():
    state.count = state.count + 1

def decrement():
    state.count = max(0, state.count - 1)

def reset():
    state.count = 0
</script>
```

## 3. 运行

```bash
pawui app.paw
```

窗口会立即弹出。点击按钮，`{$count}` 会随 `state.count` 自动更新。

> 也可以直接 `pawui run app.paw`，效果相同。

运行效果：

![计数器运行效果](../static/shots/counter-dark.png)

## 4. 热重载开发

开发时不想反复重启：

```bash
pawui watch app.paw
```

保存 `.paw` 文件后窗口自动重建，**State 与脚本中定义的函数会保留**。

## 5. 语法检查

写错了先看诊断信息（含行号）：

```bash
pawui check app.paw
```

输出示例：

```
✓ app.paw: syntax OK
  Elements: 1
  Script: yes
```

有错误时会打印 `PawUI error: ... (at line N:col)`。

## 6. 内置帮助

```bash
pawui help              # 列出所有主题
pawui help components   # 查看组件文档
pawui help syntax
pawui help theming
```

## 项目结构约定

一个最小项目只需要一个 `.paw` 文件：

```
myapp/
├── app.paw
└── assets/
    └── logo.png     # <Image src="assets/logo.png"/> 使用
```

`<Image>` 的 `src` 相对当前工作目录解析。

## 下一步

- [语法参考](#/syntax) — 完整的标签与属性列表
- [布局](#/layout) — 容器与间距
- [组件](#/components) — 每个组件的属性表
- [状态与脚本](#/state-scripts) — 理解 `state` 如何驱动界面
