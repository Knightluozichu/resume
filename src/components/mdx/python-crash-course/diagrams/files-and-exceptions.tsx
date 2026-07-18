"use client";

import { useState } from "react";

const pathCases = [
  { label: "relative to cwd", code: "Path('data/pi.txt')", base: "/app", resolved: "/app/data/pi.txt", risk: "不同启动目录会解析到不同文件" },
  { label: "relative to script", code: "Path(__file__).parent / 'data/pi.txt'", base: "/app/src", resolved: "/app/src/data/pi.txt", risk: "与script位置绑定，适合随代码分发的resource" },
  { label: "absolute path", code: "Path('/tmp/pi.txt')", base: "ignored", resolved: "/tmp/pi.txt", risk: "部署环境可能没有相同目录或权限" },
  { label: "write text", code: "path.write_text(contents, encoding='utf-8')", base: "target parent", resolved: "returns characters written", risk: "parent必须存在，覆盖策略要明确" },
];

export function PccPathResolutionLab() {
  const [selected, setSelected] = useState(0);
  const item = pathCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">path scenario<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{pathCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label><code className="mt-4 block overflow-x-auto border border-border bg-bg p-3 text-sm text-primary">{item.code}</code><div className="mt-3 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">base</span><strong className="mt-2 block break-all text-sm text-primary">{item.base}</strong></div><div className="border border-cyan-500/40 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">resolved / result</span><strong className="mt-2 block break-all text-sm text-primary">{item.resolved}</strong></div><div className="border border-amber-500/40 bg-amber-500/10 p-3"><span className="text-xs text-secondary">boundary check</span><p className="mt-2 text-sm leading-6 text-primary">{item.risk}</p></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">Path object表达位置，read_text/write_text执行I/O；relative path必须声明解析base。</figcaption></figure>
  );
}

const exceptionCases = [
  { label: "valid file", tryStep: "read_text succeeds", exceptStep: "skipped", elseStep: "parse and count words", final: "report count", owner: "else只处理依赖成功结果的逻辑" },
  { label: "missing file", tryStep: "read_text raises FileNotFoundError", exceptStep: "show path-specific message", elseStep: "skipped", final: "caller chooses retry/skip", owner: "只捕获可处理的具体exception" },
  { label: "division by zero", tryStep: "numerator / denominator", exceptStep: "catch ZeroDivisionError", elseStep: "skipped", final: "request new denominator", owner: "parse错误与zero错误应分开" },
  { label: "unexpected bug", tryStep: "internal code raises TypeError", exceptStep: "not caught by narrow handler", elseStep: "skipped", final: "traceback remains visible", owner: "不要用bare except掩盖programming error" },
];

export function PccExceptionFlowLab() {
  const [selected, setSelected] = useState(0);
  const item = exceptionCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 border border-border sm:grid-cols-4">{exceptionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border-border text-xs sm:text-sm ${index < exceptionCases.length - 1 ? "border-r" : ""} ${selected === index ? "bg-primary text-bg" : "bg-bg text-primary hover:bg-elevated"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-2 sm:grid-cols-4">{[["try", item.tryStep], ["except", item.exceptStep], ["else", item.elseStep], ["outcome", item.final]].map(([label, value], index) => <div key={String(label)} className={`min-h-24 border p-3 ${index === 1 ? "border-rose-500/40 bg-rose-500/10" : index === 2 ? "border-emerald-500/40 bg-emerald-500/10" : "border-border bg-bg"}`}><span className="text-xs text-secondary">{String(label)}</span><p className="mt-2 text-sm leading-6 text-primary">{String(value)}</p></div>)}</div><p className="mt-3 border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">{item.owner}</p></div><figcaption className="mt-2 text-center text-sm text-secondary">try只包可能失败的最小操作；except处理已知失败，else执行成功依赖逻辑。</figcaption></figure>
  );
}

const jsonCases = [
  { label: "first run", storage: "missing", load: "FileNotFoundError", decision: "ask user", write: "json.dumps then write_text", next: "subsequent run can load" },
  { label: "valid profile", storage: "valid JSON", load: "json.loads → dict", decision: "verify current user", write: "no write until user confirms", next: "typed fields enter core logic" },
  { label: "corrupt JSON", storage: "truncated JSON", load: "JSONDecodeError", decision: "report corrupt state", write: "do not overwrite evidence silently", next: "recover from backup or recreate explicitly" },
  { label: "schema drift", storage: "valid JSON, missing field", load: "json.loads succeeds", decision: "schema validation fails", write: "migrate or reject", next: "syntax validity is not domain validity" },
];

export function PccJsonPersistenceLab() {
  const [selected, setSelected] = useState(0);
  const item = jsonCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="rounded-card border border-border bg-elevated p-4 sm:p-5"><label className="block text-sm text-primary">persistence scenario<select value={selected} onChange={(event) => setSelected(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-bg px-3 text-sm text-primary">{jsonCases.map((entry, index) => <option key={entry.label} value={index}>{entry.label}</option>)}</select></label><div className="mt-4 grid gap-2 sm:grid-cols-5">{[["storage", item.storage], ["load", item.load], ["decision", item.decision], ["write", item.write], ["next run", item.next]].map(([label, value]) => <div key={String(label)} className="min-h-28 border border-border bg-bg p-3"><span className="text-xs text-secondary">{String(label)}</span><p className="mt-2 text-xs leading-6 text-primary">{String(value)}</p></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">JSON持久化要区分missing file、invalid syntax、schema drift和成功load，不把它们压成一个None。</figcaption></figure>
  );
}
