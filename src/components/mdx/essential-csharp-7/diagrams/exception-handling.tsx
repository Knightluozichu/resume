"use client";

import { useState } from "react";

const exceptionCases = [
  { label: "Format", thrown: "FormatException", filter: "n/a", selected: "catch (FormatException)", trace: ["Parse() throws", "first typed catch matches", "finally runs", "method continues"] },
  { label: "I/O transient", thrown: "IOException", filter: "attempt < 3 → true", selected: "catch (IOException) when (...) ", trace: ["Read() throws", "type + filter match", "schedule retry", "finally runs"] },
  { label: "I/O final", thrown: "IOException", filter: "attempt < 3 → false", selected: "catch (Exception)", trace: ["filter evaluated false", "search next handler", "general catch logs/rethrows", "finally runs"] },
  { label: "no error", thrown: "none", filter: "not evaluated", selected: "no catch", trace: ["try completes", "skip catches", "finally runs", "method continues"] },
];

export function Ec7CatchSelectionLab() {
  const [selected, setSelected] = useState(0);
  const item = exceptionCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{exceptionCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3">{[["thrown", item.thrown], ["filter", item.filter], ["selected handler", item.selected]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><ol className="mt-3 border border-violet-500/40 bg-violet-500/10 p-4 text-sm leading-7 text-primary">{item.trace.map((entry, index) => <li key={entry}><span className="mr-2 text-cyan-400">{index + 1}</span>{entry}</li>)}</ol></div><figcaption className="mt-2 text-center text-sm text-secondary">切换exception/filter场景，观察typed catch selection与finally顺序。</figcaption></figure>;
}

const propagationCases = [
  { label: "handled here", frames: ["Controller catch handles", "Service call", "Parser throws"], outcome: "normal result or explicit fallback", cleanup: "finally in unwound frames executes" },
  { label: "propagate", frames: ["Controller (search handler)", "Service (no catch)", "Parser throws"], outcome: "caller decides", cleanup: "Service finally runs while unwinding" },
  { label: "catch all swallow", frames: ["Controller catch(Exception)", "Service", "Parser throws"], outcome: "false success / lost evidence", cleanup: "finally runs, but failure hidden" },
  { label: "expected input", frames: ["Controller receives false", "TryParse returns", "no exception"], outcome: "validation branch", cleanup: "ordinary control flow" },
];

export function Ec7PropagationPolicyLab() {
  const [selected, setSelected] = useState(0);
  const item = propagationCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{propagationCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_2fr]"><div className="flex flex-col gap-2">{item.frames.map(frame => <div key={frame} className="border border-violet-500/40 bg-violet-500/10 p-3 text-center text-xs text-primary">{frame}</div>)}</div><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">outcome</span><strong className="mt-2 block text-primary">{item.outcome}</strong><span className="mt-4 block text-xs text-secondary">cleanup</span><strong className="mt-2 block text-sm text-primary">{item.cleanup}</strong></div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换handling policy，比较expected flow、stack unwinding、cleanup与failure evidence。</figcaption></figure>;
}

const rethrowCases = [
  { label: "throw;", code: "catch { Log(); throw; }", stack: "preserves original throw site", chain: "same exception", use: "log/add context outside exception, then propagate" },
  { label: "throw ex;", code: "catch (Exception ex) { throw ex; }", stack: "resets visible throw origin", chain: "same object, damaged stack evidence", use: "avoid" },
  { label: "wrap", code: "throw new OrderLoadException(id, ex);", stack: "new boundary site + inner original stack", chain: "domain exception → inner exception", use: "translate abstraction while preserving cause" },
  { label: "custom", code: "throw new QuotaExceededException(limit);", stack: "specific domain failure", chain: "typed data/properties", use: "caller needs distinct recovery policy" },
];

export function Ec7RethrowWrapLab() {
  const [selected, setSelected] = useState(0);
  const item = rethrowCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{rethrowCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-11 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><code className="mt-4 block border border-border bg-bg p-4 text-sm text-primary">{item.code}</code><div className="mt-3 grid gap-3 md:grid-cols-3">{[["stack trace", item.stack], ["cause chain", item.chain], ["appropriate use", item.use]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换rethrow/wrap/custom paths，比较stack trace、inner cause与recovery contract。</figcaption></figure>;
}
