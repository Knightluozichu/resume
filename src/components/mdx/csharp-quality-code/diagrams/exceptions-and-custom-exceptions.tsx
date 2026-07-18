"use client";

import { useState } from "react";

const failureCases = [
  { label: "invalid input", event: "user text fails expected validation", channel: "Try/Result/validation errors", caller: "correct input or report field error", evidence: "no exception rate for normal invalid data" },
  { label: "not found", event: "absence is allowed by domain", channel: "nullable/Option/TryGet", caller: "choose alternate business branch", evidence: "absence cannot be confused with default value" },
  { label: "broken invariant", event: "internal state violates contract", channel: "specific exception, fail fast", caller: "abort operation and diagnose defect", evidence: "stack starts at invariant check" },
  { label: "I/O failure", event: "filesystem/network dependency fails", channel: "exception with preserved cause", caller: "retry only when policy and idempotency allow", evidence: "root cause, target and attempt context retained" },
  { label: "cancellation", event: "caller requests stop", channel: "CancellationToken / OperationCanceledException", caller: "propagate cancellation, not generic failure", evidence: "token identity and partial-effect policy tested" },
];

export function CqcFailureChannelLab() {
  const [selected, setSelected] = useState(0);
  const item = failureCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{failureCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]"><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">failure event</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.event}</strong></div><div className="flex min-h-12 items-center justify-center text-xl text-cyan-400">→</div><div className="border border-cyan-500/40 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">channel</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.channel}</strong></div></div>
      <div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-3 text-sm text-primary">caller action: {item.caller}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">evidence: {item.evidence}</div></div>
    </div><figcaption className="mt-2 text-center text-sm text-secondary">按failure taxonomy选择Try/Result、absence、exception或cancellation channel，并写出caller action。</figcaption></figure>
  );
}

const propagationCases = [
  { label: "throw;", catchPoint: "same abstraction cannot recover", stack: "preserves original throw site", context: "existing exception data", cleanup: "finally/using still runs", rule: "default rethrow when adding no new abstraction context" },
  { label: "throw ex;", catchPoint: "caught exception variable", stack: "resets visible origin to rethrow line", context: "adds nothing", cleanup: "finally runs", rule: "avoid because diagnosis loses provenance" },
  { label: "wrap", catchPoint: "abstraction boundary", stack: "outer stack plus InnerException chain", context: "adds stable domain/operation meaning", cleanup: "finally runs", rule: "wrap once when caller needs a different contract" },
  { label: "filter", catchPoint: "catch when predicate is true", stack: "exception remains unhandled if filter is false", context: "classifies without catch/rethrow", cleanup: "finally runs during unwind", rule: "filter must be side-effect-light and non-throwing" },
  { label: "finally", catchPoint: "normal or exceptional exit", stack: "does not replace active exception unless it throws", context: "cleanup only", cleanup: "must complete reliably", rule: "never return/throw casually from finally" },
];

export function CqcPropagationLab() {
  const [selected, setSelected] = useState(0);
  const item = propagationCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{propagationCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div>
      <div className="mt-4 grid gap-3 md:grid-cols-4">{[["catch point", item.catchPoint], ["stack", item.stack], ["context", item.context], ["cleanup", item.cleanup]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-3"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div>
      <div className="mt-3 border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">rule: {item.rule}</div>
    </div><figcaption className="mt-2 text-center text-sm text-secondary">比较rethrow、wrap、filter与finally如何影响stack provenance、context和cleanup。</figcaption></figure>
  );
}

const boundaryCases = [
  { label: "request", location: "HTTP/RPC application boundary", handles: "known domain/validation exceptions", action: "map to stable response; log unexpected once", continue: "next request can proceed", owner: "request middleware" },
  { label: "batch item", location: "per-item processing boundary", handles: "documented recoverable item failure", action: "record item result and continue by policy", continue: "yes, if state is isolated", owner: "batch orchestrator" },
  { label: "background task", location: "host-owned Task", handles: "all terminal task faults", action: "observe, log, retry/restart or stop host", continue: "only after state assessment", owner: "BackgroundService supervisor" },
  { label: "raw thread", location: "thread entry point", handles: "exceptions inside that thread", action: "signal supervisor; do not expect creator catch", continue: "policy-specific", owner: "thread entry/supervisor" },
  { label: "process fatal", location: "last-resort process boundary", handles: "unrecoverable unexpected fault", action: "minimal telemetry, flush best effort, terminate", continue: "no", owner: "host/runtime" },
];

export function CqcExceptionBoundaryLab() {
  const [selected, setSelected] = useState(0);
  const item = boundaryCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{boundaryCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">{[["location", item.location], ["handles", item.handles], ["action", item.action], ["can continue", item.continue]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div>
      <div className="mt-3 border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">log/decision owner: {item.owner}</div>
    </div><figcaption className="mt-2 text-center text-sm text-secondary">把catch、logging和continue/terminate decision放到真正能恢复或结束工作的boundary。</figcaption></figure>
  );
}
