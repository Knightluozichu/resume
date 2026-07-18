"use client";

import { useState } from "react";

const contractCases = [
  { label: "invalid argument", contract: "public precondition fails", signal: "ArgumentException family", caller: "fix input or reject request", evidence: "parameter and non-secret context" },
  { label: "invalid state", contract: "operation unavailable in current object state", signal: "InvalidOperationException", caller: "change sequence/state", evidence: "state transition and operation" },
  { label: "expected miss", contract: "normal lookup may find nothing", signal: "Try/Result/nullable by API design", caller: "branch normally", evidence: "no stack unwinding for routine flow" },
  { label: "dependency fault", contract: "method cannot complete promised work", signal: "specific original or abstraction exception", caller: "retry/respond at policy boundary", evidence: "cause chain and operation id" },
];

export function EcsExceptionContractLab() {
  const [selected, setSelected] = useState(0);
  const item = contractCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{contractCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-rose-500 bg-rose-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["contract", item.contract], ["signal", item.signal], ["caller action", item.caller], ["evidence", item.evidence]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">Exception type应让caller知道下一步动作；routine miss与broken contract不能混为一类。</figcaption></figure>;
}

const guaranteeCases = [
  { label: "using cleanup", before: "resource acquired", operation: "body succeeds or throws", after: "Dispose always runs", guarantee: "resource lifetime closes, business state separate" },
  { label: "custom exception", before: "abstraction-specific failure", operation: "wrap only at boundary", after: "typed properties plus InnerException", guarantee: "caller sees stable domain contract" },
  { label: "strong guarantee", before: "valid aggregate state", operation: "prepare changes without publishing", after: "commit all or retain exact prior state", guarantee: "failure has no observable partial mutation" },
  { label: "basic guarantee", before: "valid state", operation: "partial progress may occur", after: "invariants hold but values may change", guarantee: "document recovery/compensation" },
];

export function EcsExceptionGuaranteeLab() {
  const [selected, setSelected] = useState(2);
  const item = guaranteeCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{guaranteeCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["before", item.before], ["operation", item.operation], ["after failure", item.after], ["guarantee", item.guarantee]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">Cleanup、exception type和state guarantee分别保护lifetime、diagnosis与observable state。</figcaption></figure>;
}

const filterCases = [
  { label: "filter false", search: "filter observes exception before unwind", filter: "condition returns false", unwind: "search continues; finally runs later", handler: "outer matching handler may catch" },
  { label: "filter true", search: "filter matches type and condition", filter: "condition returns true", unwind: "inner finally blocks execute", handler: "selected catch handles" },
  { label: "observe and pass", search: "filter records diagnostics", filter: "helper returns false", unwind: "original stack/cause continues", handler: "no catch-and-rethrow needed" },
  { label: "filter throws", search: "filter expression itself fails", filter: "filter exception is discarded", unwind: "treated as false", handler: "next candidate searched" },
];

export function EcsExceptionFilterLab() {
  const [selected, setSelected] = useState(2);
  const item = filterCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{filterCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["search phase", item.search], ["filter result", item.filter], ["unwind", item.unwind], ["handler", item.handler]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">Exception filter先参与handler search，再发生unwind；有限观察可保留原始stack，但不能承担业务mutation。</figcaption></figure>;
}
