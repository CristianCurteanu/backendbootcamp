#!/usr/bin/env python3
"""Run the Python examples in lesson Markdown and write their real output back.

Fence attributes (Hugo-style, after the language):
  {output=auto}   run the block, insert/refresh a following ```text {filename="Output"} block
  {check=true}    run the block, fail on error, but show nothing
  {expect=error}  the block must raise; the last traceback line is shown as output
No attribute -> the block is never run (use for network, GUI, audio and OS-specific code).

Usage: python3 tests/lesson_runner.py [--check] PATH...   (--check = verify only, write nothing)
"""
from __future__ import annotations

import re
import subprocess
import sys
import tempfile
from pathlib import Path

FENCE = re.compile(r"^```python(?P<attrs>[^\n]*)\n(?P<code>.*?)^```[ \t]*\n", re.S | re.M)
OUT_FENCE = re.compile(r"\A\n*```text \{filename=\"Output\"\}\n.*?^```[ \t]*\n", re.S | re.M)


def attrs_of(raw: str) -> dict[str, str]:
    return {k: v.strip('"') for k, v in re.findall(r'(\w+)=("[^"]*"|[^\s}]+)', raw)}


def run(code: str, expect_error: bool) -> tuple[bool, str]:
    with tempfile.TemporaryDirectory() as tmp:
        script = Path(tmp) / "lesson.py"
        script.write_text(code, encoding="utf-8")
        try:
            p = subprocess.run([sys.executable, "-I", str(script)], cwd=tmp, capture_output=True, text=True, timeout=20, env={"PYTHONHASHSEED": "0", "PYTHONIOENCODING": "utf-8", "PATH": "/usr/bin:/bin"})
        except subprocess.TimeoutExpired:
            return False, "TIMEOUT"
    out = p.stdout
    if expect_error:
        last = [l for l in p.stderr.strip().splitlines() if l.strip()]
        return p.returncode != 0, (out + (last[-1] if last else "")).rstrip("\n")
    if p.returncode != 0:
        return False, (out + p.stderr).rstrip("\n")
    return True, out.rstrip("\n")


def process(path: Path, check_only: bool) -> list[str]:
    text = path.read_text(encoding="utf-8")
    problems: list[str] = []
    pos, pieces = 0, []
    for m in FENCE.finditer(text):
        a = attrs_of(m["attrs"])
        pieces.append(text[pos : m.end()])
        pos = m.end()
        if not (a.get("output") == "auto" or a.get("check") == "true" or a.get("expect") == "error"):
            continue
        ok, out = run(m["code"], a.get("expect") == "error")
        if not ok:
            line = text[: m.start()].count("\n") + 1
            problems.append(f"{path}:{line}: example failed:\n    " + out.replace("\n", "\n    ")[:600])
            continue
        if a.get("check") == "true" or check_only:
            continue
        rest = text[pos:]
        old = OUT_FENCE.match(rest)
        if old:
            pos += old.end()
        shown = out if out else "(no output)"
        pieces.append(f'\n```text {{filename="Output"}}\n{shown}\n```\n')
    pieces.append(text[pos:])
    new = "".join(pieces)
    if not check_only and new != text:
        path.write_text(new, encoding="utf-8")
    return problems


def main(argv: list[str]) -> int:
    check_only = "--check" in argv
    paths = [Path(a) for a in argv if not a.startswith("--")]
    files = [f for p in paths for f in ([p] if p.is_file() else sorted(p.rglob("*.md")))]
    bad: list[str] = []
    for f in files:
        bad += process(f, check_only)
    for b in bad:
        print(b)
    print(f"{len(files)} files, {len(bad)} problems")
    return 1 if bad else 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
