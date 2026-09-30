# PawUI 官网 / 文档站

线上地址：<https://pawui.pages.dev>（Cloudflare Pages，Git 集成自动部署）

## 目录

| 内容 | 位置 |
| --- | --- |
| 页面（首页） | `index.html` |
| 文档页外壳 | `docs/index.html`（正文由 JS 从 `static/data.js` 渲染） |
| 静态资源 | `static/`（`style.css` / `docs.js` / `marked.min.js` / `dompurify.min.js` / `data.js`） |
| 正文（英文源） | `docs_en/*.md` |
| 正文（中文源） | `docs_zh/*.md` |
| 生成脚本 | `build.py` |

## 改文档的正确姿势

正文单一事实源在**主仓库** `PawUI/docs/*.md`（英文）和 `PawUI/docs/zh/*.md`（中文）——
`pawui help <topic>` 读的就是这两份。流程：

1. 改主仓库 `docs/`（英文 `docs/*.md` + 中文 `docs/zh/*.md`）
2. 同步到本仓库：`docs_en/` ← `docs/`，`docs_zh/` ← `docs/zh/`
3. 新增文档时在 `build.py` 的 `GROUPS` 里登记 id（不登记就不会进侧边栏）
4. 生成数据：`python build.py`（产物是 `static/data.js`，别手改）
5. 提交推送，Cloudflare Pages 自动发布

## 本地预览

```bash
python -m http.server 8777
# 打开 http://127.0.0.1:8777/
```

## 部署

Cloudflare Pages 的 Git 集成：

| 设置 | 值 |
| --- | --- |
| Build command | `python build.py` |
| Build output directory | `.`（仓库根即站点根） |
| Root directory | `/` |

也可以本地直传：

```bash
wrangler pages deploy . --project-name pawui
```

`_headers` 里已经把缓存设成 `must-revalidate`，改完立刻生效，不需要清缓存。
