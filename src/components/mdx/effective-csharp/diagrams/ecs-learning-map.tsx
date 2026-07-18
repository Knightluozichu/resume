"use client";

import { useState } from "react";

const chapters = [
  { label: "1 Language", items: "1-10", question: "How should source express type, text, callback and dispatch?", artifact: "API idiom decision table", gate: "version, culture, lifetime and allocation tests" },
  { label: "2 Resources", items: "11-17", question: "Who owns creation, valid state and release?", artifact: "construction/resource ownership map", gate: "fault injection across every lifecycle phase" },
  { label: "3 Generics", items: "18-28", question: "What capability and substitution does T promise?", artifact: "constraint/variance/API matrix", gate: "compile cases, laws and compatibility suite" },
  { label: "4 LINQ", items: "29-44", question: "When and where does a sequence execute?", artifact: "construction-to-enumeration trace", gate: "enumeration count, provider and cardinality evidence" },
  { label: "5 Exceptions", items: "45-50", question: "What remains true when work cannot complete?", artifact: "failure taxonomy and state guarantee", gate: "fault matrix, cleanup and cause-chain checks" },
];

export function EcsOfficialRoadmapLab() {
  const [selected, setSelected] = useState(0);
  const item = chapters[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{chapters.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["original items", item.items], ["chapter question", item.question], ["study artifact", item.artifact], ["acceptance gate", item.gate]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">第3版按5个原章推进：语言、资源、泛型、LINQ、异常，每章都以可交付证据收口。</figcaption></figure>;
}

const clusters = [
  { label: "compile-time", items: "1, 3, 6-10, 18, 22-28", relation: "make invalid representation or substitution fail early", rehearsal: "rename, invalid conversion and generic compile cases", failure: "syntax is concise but contract remains hidden" },
  { label: "lifetime", items: "7-8, 11-17, 21, 41, 46", relation: "delegates, resources and iterators retain state", rehearsal: "owner graph plus normal/fault/cancel/dispose", failure: "GC is mistaken for deterministic cleanup" },
  { label: "execution", items: "29-44", relation: "query construction differs from enumeration", rehearsal: "counter, provider command and terminal operator", failure: "deferred work repeats or escapes its scope" },
  { label: "failure", items: "39, 45-50", relation: "signal, cleanup and post-fault state form one contract", rehearsal: "fault injection at every boundary", failure: "catch hides cause or partial mutation" },
];

export function EcsItemClusterLab() {
  const [selected, setSelected] = useState(0);
  const item = clusters[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{clusters.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["related items", item.items], ["cross-chapter relation", item.relation], ["rehearsal", item.rehearsal], ["failure signal", item.failure]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">纵向读完原章后，再按compile-time、lifetime、execution和failure四条横线复盘。</figcaption></figure>;
}

const gates = [
  { label: "title coverage", input: "50 publisher Item titles", action: "map each title to one official chapter page", output: "100% outline coverage", reject: "topic sampling or invented chapter" },
  { label: "decision", input: "one real code boundary", action: "state alternatives and tradeoff", output: "chosen contract with owner", reject: "memorized slogan without scenario" },
  { label: "visual", input: "chapter-specific state choices", action: "interact and predict transition", output: "observable before/after model", reject: "generic decorative diagram" },
  { label: "practice", input: "normal plus fault cases", action: "run code/compile/provider/fault evidence", output: "reproducible acceptance", reject: "answer-only reading" },
  { label: "modern note", input: "2017 C# 6 guidance", action: "separate original advice from current runtime", output: "version-bounded recommendation", reject: "rewriting history as modern syntax" },
];

export function EcsStudyGateLab() {
  const [selected, setSelected] = useState(0);
  const item = gates[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{gates.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["input", item.input], ["action", item.action], ["evidence", item.output], ["reject", item.reject]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">每章必须同时通过目录、决策、视觉、实践和版本边界五道门禁。</figcaption></figure>;
}
