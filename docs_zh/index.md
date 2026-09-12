# 简介

**PawUI** 是一个轻量的声明式 Python UI 库。你用类 HTML 的 `.paw` 文件描述界面，用 Python 编写逻辑，底层由 Qt（PySide6）原生渲染。

没有构建步骤，没有前端工具链，也不需要手写 `QWidget` 样板代码——`pip install pawui` 之后直接运行。

![PawUI 仪表盘示例](../static/shots/dashboard-dark.png)

## 它解决什么问题

传统 Qt 开发要写大量命令式代码：创建控件、设置布局、连接信号、手动更新界面。PawUI 把这些收敛成声明式语法：

```html
<Window title="Greeter" width="360" height="200">
  <Column padding="24" spacing="12">
    <Text size="20" bold>你好，{$name}</Text>
    <Input bind="name" placeholder="输入名字" on_change="greet"/>
  </Column>
</Window>

<script>
state.name = "世界"
def greet(text):
    state.name = text or "世界"
</script>
```

状态一变，界面自动刷新；事件处理器就是普通 Python 函数。

## 核心特性

- **类 HTML 语法** — 熟悉的标签与属性，几分钟上手
- **响应式状态** — `{$name}` 模板绑定，`state.name = ...` 自动刷新
- **17 个内置组件** — 布局、展示、交互全覆盖
- **原生渲染** — Qt 抗锯齿、圆角、悬停态、IME 中文输入
- **双主题 + 自定义颜色** — `dark` / `light`，或定义自己的颜色令牌
- **入场动画** — 声明式淡入 / 滑入 / 展开，支持缓动与逐个延时
- **热重载** — `pawui watch app.paw`，保存即重建，状态保留

## 运行环境

| 项目 | 要求 |
|------|------|
| Python | 3.10 或更高 |
| 依赖 | `PySide6 >= 6.5` |
| 平台 | Windows / macOS / Linux |

## 一段完整代码

```html
<Window title="计数器" width="400" height="320" theme="dark">
  <Column padding="32" spacing="16">
    <Text size="28" bold color="accent">计数器</Text>
    <Text size="48" bold>{$count}</Text>
    <Row spacing="12">
      <Button on_click="dec" bg="surface" fg="text">-</Button>
      <Button on_click="inc">+1</Button>
      <Button on_click="reset" bg="surface" fg="subtext">重置</Button>
    </Row>
  </Column>
</Window>

<script>
state.count = 0

def inc():
    state.count = state.count + 1

def dec():
    state.count = max(0, state.count - 1)

def reset():
    state.count = 0
</script>
```

## 文档导航

- [快速上手](#/getting-started) — 安装并运行第一个应用
- [语法参考](#/syntax) — 标签、属性、模板、控制流
- [布局](#/layout) — 容器、间距与弹性
- [组件](#/components) — 全部 17 个组件
- [状态与脚本](#/state-scripts) — `state` 与 `<script>`
- [事件](#/events) — 处理器、绑定与异步
- [动画](#/animation) — 入场动画与缓动
- [主题](#/theming) — 颜色令牌与自定义
- [自定义组件](#/custom-components) — `<Component>` 与 `<Prop>`
- [API 参考](#/api) — Python 接口
- [命令行](#/cli) — `pawui` 命令
- [示例](#/examples) — 完整应用
- [常见问题](#/faq) — 排错与陷阱
