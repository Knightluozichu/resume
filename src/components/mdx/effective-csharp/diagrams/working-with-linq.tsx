"use client";

import { useState } from "react";

const sequenceCases = [
  { label: "iterator", construction: "method returns IEnumerable<T>", execution: "yield body runs on enumeration", coupling: "consumer chooses when and how much", risk: "resource scope must survive enumeration" },
  { label: "query syntax", construction: "from/where/select describes transformation", execution: "maps to standard query operators", coupling: "intent separated from loop mechanics", risk: "provider support differs" },
  { label: "composable API", construction: "returns sequence, not terminal side effect", execution: "caller appends filter/order/projection", coupling: "pipeline remains reusable", risk: "hidden enumeration breaks composition" },
  { label: "decoupled action", construction: "iteration receives predicate/function", execution: "one traversal policy, supplied behavior", coupling: "no duplicated loops", risk: "callback exceptions need contract" },
  { label: "generated items", construction: "yield computes next item on demand", execution: "bounded by consumer", coupling: "supports large/infinite sequence", risk: "re-enumeration recomputes" },
];

export function EcsSequencePipelineLab() {
  const [selected, setSelected] = useState(0);
  const item = sequenceCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{sequenceCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["construction", item.construction], ["execution", item.execution], ["coupling", item.coupling], ["risk", item.risk]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">从iterator到on-demand generation，序列API把生产、变换和消费时机分开。</figcaption></figure>;
}

const queryCases = [
  { label: "function parameter", compose: "caller supplies predicate/projection", resolution: "normal delegate binding", timing: "per element during enumeration", failure: "pure callback keeps pipeline predictable" },
  { label: "extension overload", compose: "same name in multiple namespaces", resolution: "compile-time candidate set", timing: "selected before execution", failure: "never overload solely by provider semantics" },
  { label: "query mapping", compose: "where/select/order clauses", resolution: "translated to method calls", timing: "source decides Enumerable or Queryable", failure: "inspect actual expression/operator chain" },
  { label: "lazy query", compose: "pipeline stores operators", resolution: "no result snapshot yet", timing: "every enumeration may rerun", failure: "materialize at an explicit boundary" },
  { label: "lambda", compose: "local behavior beside query", resolution: "delegate or expression tree", timing: "capture evaluated by closure/provider", failure: "name complex/reused/faulting logic" },
  { label: "throwing callback", compose: "function throws for expected data", resolution: "terminal enumeration faults", timing: "possibly far from construction", failure: "filter/Result for expected invalid values" },
  { label: "early vs deferred", compose: "ToList/Count vs Where/Select", resolution: "terminal operator executes", timing: "snapshot now or live query later", failure: "document consistency and cost" },
];

export function EcsQueryCompositionLab() {
  const [selected, setSelected] = useState(3);
  const item = queryCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-4">{queryCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["composition", item.compose], ["resolution", item.resolution], ["execution time", item.timing], ["failure contract", item.failure]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">组合语法不等于执行；先确定operator resolution，再确定evaluation time与failure boundary。</figcaption></figure>;
}

const boundaryCases = [
  { label: "captured stream", boundary: "iterator captures an open resource", semantics: "resource needed until enumeration ends", assertion: "enumerate inside owner scope or iterator owns using", danger: "disposed-before-enumeration or leak" },
  { label: "IEnumerable", boundary: "local delegate pipeline", semantics: "CLR executes functions in process", assertion: "count enumeration and side effects", danger: "multiple scans and mutable source drift" },
  { label: "IQueryable", boundary: "expression tree sent to provider", semantics: "provider translates supported nodes", assertion: "inspect generated command and round trips", danger: "client evaluation or translation failure" },
  { label: "Single / First", boundary: "cardinality terminal", semantics: "Single asserts exactly one; First asserts at least one", assertion: "test zero/one/many and ordering", danger: "hiding duplicate data with First" },
  { label: "bound variable", boundary: "lambda closes over mutable storage", semantics: "reads current variable at execution", assertion: "copy per iteration or use immutable input", danger: "all callbacks observe final value" },
];

export function EcsExecutionBoundaryLab() {
  const [selected, setSelected] = useState(2);
  const item = boundaryCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{boundaryCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["boundary", item.boundary], ["semantics", item.semantics], ["acceptance", item.assertion], ["danger", item.danger]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">Resource、provider、cardinality和closure都在enumeration boundary显现，必须在终端操作处验收。</figcaption></figure>;
}
