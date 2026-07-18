"use client";

import { useState } from "react";

const auditCases = [
  { label: "public SDK", language: "readonly, typed API, callback/event contract", resource: "owner and Dispose surface", generic: "minimal constraint and bridge", linq: "deferred surface is explicit", exception: "stable public failure types" },
  { label: "data pipeline", language: "culture-safe input/output", resource: "reader and buffer scopes", generic: "typed comparer/strategy", linq: "provider and materialization boundary", exception: "strong state guarantee" },
  { label: "plugin host", language: "dispatch and string adapter", resource: "plugin scope ownership", generic: "variance and classic compatibility", linq: "no leaked live query", exception: "isolate, preserve cause, continue policy" },
  { label: "hot service", language: "boxing/allocation profile", resource: "bounded cache/pool", generic: "measured specialization", linq: "round trips and scans", exception: "filters observe, boundary logs once" },
];

export function EcsWholeBookAuditLab() {
  const [selected, setSelected] = useState(0);
  const item = auditCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{auditCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["language", item.language], ["resource", item.resource], ["generic", item.generic], ["LINQ", item.linq], ["exception", item.exception]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">同一真实系统横穿5章审计，防止只在孤立代码片段上背诵Item。</figcaption></figure>;
}

const chains = [
  { label: "type", first: "typed representation", second: "generic constraint/variance", third: "provider or runtime binding", gate: "compile and substitution evidence" },
  { label: "lifetime", first: "creator declares owner", second: "delegate/iterator may retain", third: "Dispose/materialize closes scope", gate: "normal/fault/cancel graph" },
  { label: "execution", first: "query/callback construction", second: "enumeration/invocation", third: "terminal/failure boundary", gate: "count and timeline evidence" },
  { label: "failure", first: "specific signal", second: "cleanup and state guarantee", third: "filter/handler policy", gate: "cause chain and snapshot" },
];

export function EcsContractChainLab() {
  const [selected, setSelected] = useState(0);
  const item = chains[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{chains.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["start", item.first], ["middle", item.second], ["boundary", item.third], ["proof", item.gate]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">把孤立建议串成type、lifetime、execution和failure四条端到端contract chain。</figcaption></figure>;
}

const finalGates = [
  { label: "outline", proof: "5 chapters and all 50 Item titles", pass: "100% publisher TOC coverage", fail: "missing or invented unit" },
  { label: "code", proof: "compile, unit, provider and fault scenarios", pass: "all decisions reproducible", fail: "only prose answers" },
  { label: "visual", proof: "3 unique interactive labs per chapter", pass: "state changes explain chapter contract", fail: "generic reused decoration" },
  { label: "compatibility", proof: "base/derived, generic/classic, local/remote", pass: "substitution and versions agree", fail: "one happy-path static type" },
  { label: "release", proof: "MDX, type, lint and book audit", pass: "all gates green before promotion", fail: "deploy to discover content errors" },
];

export function EcsFinalGateLab() {
  const [selected, setSelected] = useState(0);
  const item = finalGates[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{finalGates.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["proof", item.proof], ["pass", item.pass], ["reject", item.fail]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">整书验收同时检查权威目录、可复现代码、专属视觉、兼容性和发布门禁。</figcaption></figure>;
}
