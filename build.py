#!/usr/bin/env python3
"""Build static/data.js from docs_zh/ and docs_en/ markdown sources.

Output format (window.PAWUI_DOCS):
{
  "order": ["index", ...],
  "groups": [{"id","zh","en","docs":[...]}, ...],
  "docs": {"index": {"zh": {"title","body"}, "en": {"title","body"}}, ...}
}
`body` is base64-encoded UTF-8 markdown, decoded in the browser at runtime.
"""
from __future__ import annotations

import base64
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
DOCS_ZH = ROOT / "docs_zh"
DOCS_EN = ROOT / "docs_en"
OUT = ROOT / "static" / "data.js"

GROUPS = [
    ("start", "开始", "Getting Started", ["index", "getting-started"]),
    ("basics", "基础", "Basics", ["syntax", "layout", "components", "state-scripts", "events"]),
    ("advanced", "进阶", "Advanced", ["animation", "theming", "custom-components"]),
    ("reference", "参考", "Reference", ["api", "cli", "examples", "faq"]),
]

ORDER = [doc for _, _, _, docs in GROUPS for doc in docs]


def first_title(text: str, fallback: str) -> str:
    for line in text.splitlines():
        line = line.strip()
        if line.startswith("# "):
            return line[2:].strip()
    return fallback


def read_doc(folder: Path, doc_id: str) -> tuple[str, str]:
    path = folder / f"{doc_id}.md"
    if not path.exists():
        print(f"  ! missing {path}", file=sys.stderr)
        return doc_id, "{}"
    text = path.read_text(encoding="utf-8")
    title = first_title(text, doc_id)
    body = base64.b64encode(text.encode("utf-8")).decode("ascii")
    return title, body


def main() -> int:
    docs: dict[str, dict[str, dict[str, str]]] = {}
    for doc_id in ORDER:
        zh_title, zh_body = read_doc(DOCS_ZH, doc_id)
        en_title, en_body = read_doc(DOCS_EN, doc_id)
        docs[doc_id] = {
            "zh": {"title": zh_title, "body": zh_body},
            "en": {"title": en_title, "body": en_body},
        }

    payload = {
        "order": ORDER,
        "groups": [
            {"id": gid, "zh": zh, "en": en, "docs": list(items)}
            for gid, zh, en, items in GROUPS
        ],
        "docs": docs,
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    js = "window.PAWUI_DOCS = " + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n"
    OUT.write_text(js, encoding="utf-8")
    print(f"wrote {OUT} ({len(js):,} bytes, {len(ORDER)} docs x 2 langs)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
