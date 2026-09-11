# 术语表

PawUI 文档中常用术语的简明解释。

## 核心概念

**State（状态）**
响应式的数据容器。读写 `state.key`，写入会触发绑定它的组件自动更新。

**Template（模板）**
在属性或文本中引用状态的写法：`{$count}`、`{count}`、`$count`。

**Interpolation（插值）**
把模板替换成实际值的过程，支持属性路径与索引：`{$user.name}`、`{$items[0]}`。

**Bind（绑定）**
`bind="key"` 把交互组件的值写回 state。配合 `value="{$key}"` 构成双向绑定。

**Derived value（派生值）**
存放在 state 中的可调用对象（函数）。模板遇到它会自动调用，用于实时计算的值。

## 结构

**Component（组件）**
内置标签（`Text`、`Button`…）或用户自定义的 `<Component name="...">`。

**Container（容器）**
能容纳子元素的组件：`Window`、`Column`、`Row`、`Scroll`、`Tabs`、`Tooltip`。

**Logical container（逻辑容器）**
`<If>` 与 `<For>`。它们提供条件/循环但不产生可见边框。

**Prop（属性）**
自定义组件通过 `<Prop name="..." default="..."/>` 声明的默认参数。

**Scope（作用域）**
名字解析的可见范围。`<For>` 的循环变量只在子树内可见。

**Script block（脚本块）**
`<script>` 中的 Python 代码，定义处理器与初始逻辑。

**Runtime（运行时）**
驱动解析、构建、事件与状态的引擎，在脚本里以 `app` 访问。

**Context（上下文）**
通过 Python API 注入脚本命名空间的外部对象（依赖注入）。

## 样式与动画

**Theme（主题）**
一套颜色、字体与间距参数。内置 `dark` / `light`。

**Token（令牌）**
主题中的具名颜色：`background`、`surface`、`text`、`subtext`、`accent`、`border`、`danger`，以及自定义色名。

**Entrance animation（入场动画）**
组件构建时一次性播放的效果，用 `animate` 声明。

**Easing（缓动）**
动画在时间上的速度分布，用 `easing` 选择，如 `out-cubic`。

**Stagger（逐个入场）**
容器的 `stagger` 属性，让子元素按顺序依次入场。

## 工具

**Hot reload（热重载）**
`pawui watch` 监视文件，保存即重建，保留 State。

**Check（检查）**
`pawui check` 只解析不运行，输出结构统计。

**Schema（架构）**
`pawui schema` 输出的组件/属性/动画/主题 JSON 描述。

**Offscreen render（离屏渲染）**
`pawui render` 在无显示环境下构建窗口，用于 CI 校验。

## 缩写

| 缩写 | 全称 | 含义 |
|------|------|------|
| QSS | Qt Style Sheet | Qt 的样式表（PawUI 内部使用） |
| IME | Input Method Editor | 输入法编辑器（中文输入） |
| CWD | Current Working Directory | 当前工作目录（资源路径基准） |
