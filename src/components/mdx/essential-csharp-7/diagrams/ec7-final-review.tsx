"use client";

import { useState } from "react";

const reviewCases = [
  { label: "Ch 1-5", invariant: "a value has a compile-time type; binding and evaluation follow explicit rules", contracts: "conversion, expression, control and parameter contracts", inspect: "compiler diagnostics, overload choice, observable side effects", pass: "predict result and failure before execution" },
  { label: "Ch 6-11", invariant: "public type preserves construction, substitution, equality, disposal and failure rules", contracts: "class/interface/value/object/exception contracts", inspect: "API tests, equality properties, disposal and stack trace", pass: "consumer cannot create invalid state through public API" },
  { label: "Ch 12-18", invariant: "types and behavior compose without losing timing, lifetime or provider semantics", contracts: "generic, delegate/event, enumeration/query and metadata contracts", inspect: "allocation, invocation list, enumerator state, expression tree", pass: "state when work executes and who retains whom" },
  { label: "Ch 19-21", invariant: "operation, shared state and native memory each have explicit owner and end condition", contracts: "Task/cancel, lock/wait, ABI/pointer/callback contracts", inspect: "timeline, wait graph, buffer length and unregister/drain", pass: "fault/cancel/dispose cannot leak or corrupt shared state" },
  { label: "Ch 22", invariant: "contract, artifact and execution stage are not conflated", contracts: "CLI/CTS/CLS, API target, assembly/metadata, JIT/AOT", inspect: "manifest, CIL, loader resolution and runtime target", pass: "locate portability/load/performance failure in the correct layer" },
];

export function Ec7OfficialReviewMatrixLab() {
  const [selected, setSelected] = useState(0);
  const item = reviewCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{reviewCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["central invariant", item.invariant], ["contracts", item.contracts], ["inspect evidence", item.inspect], ["pass condition", item.pass]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">用五段矩阵复核官方22章的核心不变量、证据与通过条件。</figcaption></figure>;
}

const integratedCases = [
  { label: "typed parser", chapters: "Ch 2-5, 9-12", input: "text tokens and parse policy", chain: "value conversion → control flow → method contract → result value/exception", boundary: "culture, overflow, nullable and equality", evidence: "table-driven tests for valid, invalid and boundary inputs" },
  { label: "plugin catalog", chapters: "Ch 6-8, 12-18, 22", input: "assemblies and metadata", chain: "interface contract → generic registry → reflection discovery → typed activation", boundary: "load/type failure, duplicate identity, event subscription", evidence: "manifest/type diagnostics and lifecycle-safe unload policy" },
  { label: "bounded importer", chapters: "Ch 11-20", input: "async stream of records", chain: "query/iterator → Task/cancel → bounded concurrency → synchronized commit", boundary: "partial effects, callback exception, deadlock and timer overlap", evidence: "cancel/fault timeline plus invariant and throughput tests" },
  { label: "native bridge", chapters: "Ch 9-11, 18, 21-22", input: "native header, library and callbacks", chain: "layout → DllImport/marshalling → delegate rooting → loader/runtime", boundary: "width, charset, ownership, in-flight callback", evidence: "sizeof/offset/ABI tests and unregister-drain proof" },
  { label: "portable library", chapters: "Ch 6-18, 21-22", input: "public API and target contract", chain: "well-formed types → CLS surface → .NET Standard references → package", boundary: "platform API, reflection/AOT and native dependency", evidence: "cross-target compile, load and behavior matrix" },
];

export function Ec7IntegratedCaseLab() {
  const [selected, setSelected] = useState(1);
  const item = integratedCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{integratedCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[0.45fr_1.55fr]"><div className="border border-border bg-bg p-4 text-sm font-semibold text-primary">{item.chapters}</div><div className="border border-border bg-bg p-4 text-sm text-secondary">input: {item.input}</div></div><div className="mt-3 grid gap-3 md:grid-cols-3"><div className="border border-cyan-500/40 bg-cyan-500/10 p-3 text-sm text-primary">chain: {item.chain}</div><div className="border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">boundary: {item.boundary}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">evidence: {item.evidence}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换五个综合系统，把章节知识连接成输入、契约、边界与证据链。</figcaption></figure>;
}

const diagnosisCases = [
  { label: "wrong overload", symptom: "unexpected method selected or ambiguous compile", start: "Ch 2-5", inspect: "static type, conversions, parameter modifiers and candidate set", fix: "make contract/conversion explicit; do not patch runtime branch" },
  { label: "lifecycle leak", symptom: "subscriber, iterator or native handle never releases", start: "Ch 10, 14-18, 21", inspect: "strong-reference owner and registration/disposal path", fix: "one owner, deterministic unsubscribe/dispose and in-flight coordination" },
  { label: "deadlock", symptom: "tasks remain incomplete and threads wait", start: "Ch 19-20", inspect: "operation timeline, captured context, lock/permit wait-for graph", fix: "async-all-the-way, stable lock order and bounded critical section" },
  { label: "memory corruption", symptom: "failure appears after P/Invoke return", start: "Ch 9, 21", inspect: "ABI width/calling/layout, capacity, pointer validity and callback root", fix: "rederive signature from header and validate ownership on every path" },
  { label: "load/AOT failure", symptom: "assembly/type missing only on target or publish", start: "Ch 18, 22", inspect: "manifest identity, references, metadata roots, target API/native assets", fix: "make dependency/reachability explicit and test target artifact" },
];

export function Ec7DiagnosisRouteLab() {
  const [selected, setSelected] = useState(0);
  const item = diagnosisCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{diagnosisCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["symptom", item.symptom], ["start chapters", item.start], ["inspect", item.inspect], ["repair direction", item.fix]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">从症状选择诊断路线，回到定义该contract与lifetime的确切章节。</figcaption></figure>;
}
