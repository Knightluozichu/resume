"use client";

import { useState } from "react";

const scenarios = [
  { label: "import API", chapters: "1, 2, 5, 7, 11", design: "Try validation + bounded collection + one exception boundary + narrow application contract", faults: "overflow, repeated query, swallowed exception, mutable collection leak", proof: "boundary rows, enumeration count, cause chain and API tests" },
  { label: "plugin event", chapters: "3, 4, 7, 8", design: "generic constraint + event ownership + disposable subscription + sealed adapter", faults: "closure leak, delegate field overwrite, premature disposal, fragile inheritance", proof: "variance, subscribe/unsubscribe/GC and substitution tests" },
  { label: "parallel export", chapters: "4, 5, 6, 9", design: "owned streams + cooperative cancellation + bounded CPU parallelism + signed/encrypted artifact", faults: "handle leak, unobserved tasks, lock contention, untrusted digest", proof: "handle baseline, all-fault inventory, benchmark and signature verification" },
  { label: "versioned UI", chapters: "10, 11, 12", design: "semantic names + cohesive surface + protocol selector/flag + first-UI automation", faults: "ambiguous event tense, duplicated rules, stale flags, brittle selectors", proof: "analyzers, change rehearsal, version matrix and critical journey" },
  { label: "service security", chapters: "1, 5, 9, 12", design: "checked bounds + fail-closed TLS/auth + secret manager + least privilege release gate", faults: "overflow, accept-all cert, leaked secret, strong-name trust confusion", proof: "boundary/tamper/deny tests and deployed smoke" },
];

export function CqcAuditScenarioLab() {
  const [selected, setSelected] = useState(0);
  const item = scenarios[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{scenarios.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 border border-border bg-bg p-4"><span className="text-xs text-secondary">chapters</span><strong className="mt-2 block text-sm text-cyan-400">{item.chapters}</strong><strong className="mt-2 block text-sm leading-6 text-primary">{item.design}</strong></div><div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">faults: {item.faults}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">proof: {item.proof}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">用跨章节真实场景复核建议是否能组合成一条可运行、可失败、可验证的contract链。</figcaption></figure>;
}

const chains = [
  { label: "value", input: "untrusted text/default bits", transform: "parse, validate, equality/hash", output: "stable domain value/key", lifecycle: "immutable for collection lifetime", gate: "boundary + algebraic property tests" },
  { label: "query", input: "collection or IQueryable source", transform: "projection, deferred plan, materialization", output: "owned result/snapshot", lifecycle: "single/repeat enumeration explicit", gate: "generated command + enumeration count" },
  { label: "resource", input: "owned/borrowed handle", transform: "operation with cancellation/fault", output: "committed result or preserved cause", lifecycle: "Dispose/await using + fallback", gate: "handle baseline + fault injection" },
  { label: "API", input: "caller capability", transform: "member/type strategy", output: "minimal stable contract", lifecycle: "version/deprecation migration", gate: "API diff + substitution tests" },
  { label: "release", input: "source/test/version metadata", transform: "CI gates + signed artifact + deployment", output: "observable running version", lifecycle: "rollout/rollback/flag deletion", gate: "matrix + provenance + smoke" },
];

export function CqcContractChainLab() {
  const [selected, setSelected] = useState(4);
  const item = chains[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{chains.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-4">{[["input", item.input], ["transform", item.transform], ["output", item.output], ["lifecycle", item.lifecycle]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-3"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-violet-500/40 bg-violet-500/10 p-3 text-sm text-primary">gate: {item.gate}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">从input、transformation、output追到lifetime和gate，检查每条建议是否有producer-to-consumer证据。</figcaption></figure>;
}

const finalGates = [
  { label: "outline", requirement: "12 chapters and all 157 original titles mapped", evidence: "verified author TOC manifest", fail: "missing/ad-hoc topics or wrong edition", result: "100% fidelity" },
  { label: "chapter", requirement: "objectives, terms, traps, visuals, practice and source", evidence: "quality dimensions all at 100", fail: "generic visual or no verification", result: "14/14 pages pass" },
  { label: "source", requirement: "no legacy slugs/registrations/reviews remain", evidence: "source-level reference scan", fail: "deleted page still in nav/review bundle", result: "one authoritative route set" },
  { label: "compile", requirement: "TypeScript, MDX, lint and diff checks clean", evidence: "repeatable command outputs", fail: "warning/error or malformed content", result: "release candidate source" },
  { label: "publish", requirement: "only after all-book global goal allows build/push/deploy", evidence: "global checkpoint and deployment proof", fail: "premature production build or stale deploy", result: "observable deployed version" },
];

export function CqcFinalGateLab() {
  const [selected, setSelected] = useState(1);
  const item = finalGates[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{finalGates.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["requirement", item.requirement], ["evidence", item.evidence], ["fail", item.fail], ["result", item.result]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">终审从目录、章节、source、compile到publish逐门通过，publish仍服从225本全局完成条件。</figcaption></figure>;
}
