# 数据绑定

PawUI 的响应式来自「模板 + 状态」。这一节深入讲解模板解析、路径取值与双向绑定的细节。

## 模板的三种写法

```html
<Text>{$count}</Text>      <!-- $ 前缀，推荐 -->
<Text>{count}</Text>       <!-- 无前缀 -->
```

单独引用时也可用 `$name`（不带花括号），但在文本中必须用花括号：

```html
<Text>你好，{$name}！</Text>
```

## 路径与索引

引用支持属性路径和下标：

```html
<Text>{$user.name}</Text>
<Text>{$items[0]}</Text>
<Text>{$config["theme"]}</Text>
<Text>{$rows[2].title}</Text>
```

取值时如果中途取不到，返回空串而不是报错。

## 名字解析顺序

当模板中出现 `{$foo}` 时，PawUI 按以下顺序查找 `foo`：

1. 当前作用域（`<For>` 的循环变量、自定义组件属性）
2. `state` 中的键
3. 脚本命名空间（`<script>` 里的顶层函数/变量）
4. 主题属性（`accent`、`surface` 等）
5. 都没有 → 空串

## 重要陷阱：主题令牌会被自动解析

任何**字符串属性或文本内容**，如果它的值正好等于一个主题令牌名，会被替换成对应的颜色值：

```html
<!-- "accent" 不是文字，而是主题色 #7aa2f7 -->
<Text>accent</Text>
```

可用令牌：`background` `surface` `text` `subtext` `accent` `border` `danger`，以及你通过 `<Color name="...">` 定义的自定义色名。想显示这些词本身，请用别名或做插值：

```html
<Text>{"accent"}</Text>
```

（插值结果是字符串，不会被二次解析。）

## 双向绑定

交互组件用 `bind` 把值写回 state：

```html
<Input bind="username"/>
<TextArea bind="bio"/>
<Checkbox bind="agreed">同意</Checkbox>
<Slider bind="volume" min="0" max="100"/>
```

要形成完整的双向（state 变化也更新控件），再给 `value` 一个模板：

```html
<Input value="{$username}" bind="username"/>
<Slider value="{$volume}" bind="volume"/>
```

| 组件 | 写回类型 |
|------|----------|
| Input / TextArea | `str` |
| Checkbox | `bool` |
| Slider | `int` |

## 派生值

模板遇到**可调用对象**时会自动调用它：

```python
def total():
    return len(state.items)

state.total = total
```

```html
<Text>共 {$total} 项</Text>
```

每次求值都会调用。适合轻量计算；避免在其中做重活。

## 列表与作用域

```html
<For each="item" in="{$items}">
  <Text>{$item.name}</Text>
</For>
```

- `in` 接受列表引用。用 `{$items}` 时取到的是**原始对象**（不是字符串），因此能正确遍历。
- `each` 声明的变量只在 `<For>` 子树内可见。

## 条件渲染

```html
<If condition="{$visible}">
  <Text>内容</Text>
</If>
```

`condition` 只接受**布尔值或单个状态引用**，不做表达式求值。需要组合条件时，在脚本里算好一个布尔键：

```python
def refresh():
    state.visible = bool(state.logged_in and state.count > 0)
```

## 常见陷阱

### 原地修改集合不会刷新

```python
state.items.append(x)           # 不会刷新
state.items = state.items + [x] # 正确：赋新对象触发监听
```

### 未设置的键返回空串

```python
state.count = state.get("count", 0) + 1   # 安全
```

### 组件属性是构建时解析的

自定义组件的属性在构建时取一次值。要让界面响应状态变化，使用模板绑定或重建 UI（`app.refresh()`）。

## 下一步

- [状态与脚本](#/state-scripts) — `state` 的完整 API
- [事件](#/events) — 处理器与异步
