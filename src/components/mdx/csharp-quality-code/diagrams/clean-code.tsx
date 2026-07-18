"use client";

import { useState } from "react";

const readabilityCases = [
  { label: "access", weak: "public by convenience", stronger: "private/internal by default; explicit public contract", signal: "capability boundary", proof: "no external consumer requires hidden member", risk: "implicit modifier may be misread across type/member contexts" },
  { label: "braces", weak: "single-line body without braces", stronger: "braced body formatted by tool", signal: "stable edit boundary", proof: "adding statement cannot escape condition accidentally", risk: "generated/compact expression syntax is a different construct" },
  { label: "name", weak: "data / Do / tmp", stronger: "invoiceSnapshot / PublishInvoice", signal: "domain purpose and lifetime", proof: "reader predicts role without implementation", risk: "long name can repeat obvious scope" },
  { label: "abstraction", weak: "policy step mixed with SQL/string plumbing", stronger: "orchestrator calls same-level operations", signal: "top-down narrative", proof: "each line answers one level of why/how", risk: "too many one-line wrappers add indirection" },
  { label: "public surface", weak: "expose every helper", stronger: "small use-case contract, internal implementation", signal: "minimum supported operations", proof: "consumer tests use only stable entry points", risk: "reflection/serialization can accidentally widen surface" },
];

export function CqcReadableSurfaceLab() {
  const [selected, setSelected] = useState(3);
  const item = readabilityCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{readabilityCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]"><div className="border border-rose-500/40 bg-rose-500/10 p-4"><span className="text-xs text-secondary">weak</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.weak}</strong></div><div className="flex min-h-12 items-center justify-center text-xl text-cyan-400">→</div><div className="border border-cyan-500/40 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">stronger</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.stronger}</strong></div></div><div className="mt-3 grid gap-3 md:grid-cols-3">{[["signal", item.signal], ["proof", item.proof], ["risk", item.risk]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-3"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较access、braces、names、abstraction和public surface如何降低未来修改歧义。</figcaption></figure>;
}

const refactorCases = [
  { label: "parameter object", smell: "five related primitive properties travel together", move: "validated value/parameter object", preserves: "call-site meaning and cross-field invariant", evidence: "same group appears in multiple signatures", caution: "avoid empty data bag without behavior/rules" },
  { label: "DRY knowledge", smell: "same business rule encoded in several places", move: "one named policy/source of truth", preserves: "rule changes once", evidence: "change history modifies copies together", caution: "similar syntax may represent different concepts" },
  { label: "table driven", smell: "long switch maps stable keys to data/actions", move: "dictionary/table of immutable entries", preserves: "explicit default/unknown behavior", evidence: "branches differ only by constants/handler", caution: "complex control flow may be clearer as strategy" },
  { label: "lambda", smell: "tiny one-use method obscures query policy", move: "short pure lambda near call site", preserves: "typed predicate/selector", evidence: "logic fits one local concept", caution: "extract when reused, complex or independently testable" },
  { label: "split class", smell: "unrelated reasons change one large class", move: "cohesive collaborators around ownership", preserves: "stable facade/use case", evidence: "commit history and dependency clusters", caution: "line count alone does not prove multiple responsibilities" },
];

export function CqcRefactoringEvidenceLab() {
  const [selected, setSelected] = useState(1);
  const item = refactorCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{refactorCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["smell", item.smell], ["refactor", item.move], ["preserves", item.preserves], ["evidence", item.evidence]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">caution: {item.caution}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">按change evidence选择parameter object、knowledge DRY、table、lambda或class split。</figcaption></figure>;
}

const contractCases = [
  { label: "event field", surface: "public delegate field", caller: "can replace/raise invocation list", fix: "event keyword or custom accessors", documentation: "subscription lifetime and handler failure", test: "outside code cannot assign or invoke" },
  { label: "why comment", surface: "non-obvious constraint/workaround", caller: "reader sees rationale and expiry condition", fix: "short comment linked to issue/spec", documentation: "why, not line-by-line what", test: "comment remains true after refactor" },
  { label: "API docs", surface: "public operation", caller: "needs contract without source", fix: "XML docs + examples where useful", documentation: "inputs, result, side effects, cancellation", test: "docs build and contract tests" },
  { label: "exception docs", surface: "public method can throw actionable exceptions", caller: "can prevent or handle documented type", fix: "exception XML tags and stable conditions", documentation: "type + exact condition, not every runtime fault", test: "boundary tests trigger documented cases" },
  { label: "hazard comment", surface: "security/concurrency/interop invariant", caller: "maintainer must preserve protocol", fix: "orienting comment beside fragile block", documentation: "ownership, ordering or memory rule", test: "fault/race/security regression test" },
];

export function CqcContractDocumentationLab() {
  const [selected, setSelected] = useState(3);
  const item = contractCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{contractCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["surface", item.surface], ["caller need", item.caller], ["design", item.fix], ["document", item.documentation]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">proof: {item.test}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">区分event protection、why comments、API docs、exception docs与hazard comments的contract价值。</figcaption></figure>;
}
