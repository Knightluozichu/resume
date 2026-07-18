"use client";

import { useState } from "react";

const typeNameCases = [
  { label: "namespace", weak: "Helpers.Utils", stronger: "Billing.Invoicing", signal: "domain/module vocabulary", collision: "dot segments scope discovery", rule: "company/product/domain only where it adds stable ownership" },
  { label: "assembly", weak: "one assembly per namespace", stronger: "Billing.Contracts.dll hosts several cohesive namespaces", signal: "deployment/version boundary", collision: "independent from source namespace tree", rule: "name by artifact responsibility" },
  { label: "FCL collision", weak: "MyApp.Task / String / File", stronger: "ImportJob / CustomerText / StoredDocument", signal: "domain meaning", collision: "avoids ambiguous using and mistaken semantics", rule: "do not reuse familiar platform type names" },
  { label: "interface", weak: "IDataManager", stronger: "IInvoiceReader / IRetryable", signal: "role or capability", collision: "I prefix distinguishes contract", rule: "noun role or adjective capability, not implementation bucket" },
  { label: "enum", weak: "plural Statuses", stronger: "OrderStatus; FilePermissions for [Flags]", signal: "single value vs bit set", collision: "member names remain singular", rule: "plural only when values combine as flags" },
];

export function CqcTypeNamingLab() {
  const [selected, setSelected] = useState(0);
  const item = typeNameCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{typeNameCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]"><div className="border border-rose-500/40 bg-rose-500/10 p-4"><span className="text-xs text-secondary">weak</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.weak}</strong></div><div className="flex min-h-12 items-center justify-center text-xl text-cyan-400">→</div><div className="border border-cyan-500/40 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">stronger</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.stronger}</strong></div></div><div className="mt-3 grid gap-3 md:grid-cols-3">{[["signal", item.signal], ["collision", item.collision], ["rule", item.rule]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-3"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">从domain signal、artifact boundary和collision风险选择namespace、type、interface与enum命名。</figcaption></figure>;
}

const memberNameCases = [
  { label: "public API", weak: "get_user / processDATA", stronger: "GetUser / ProcessData", style: "PascalCase", meaning: "public contract consistent with ecosystem", caveat: "acronyms follow project/FCL convention" },
  { label: "private/local", weak: "strNm / m_name", stronger: "_displayName / retryCount", style: "_camelCase field; camelCase local", meaning: "scope and purpose visible", caveat: "team analyzer is source of truth" },
  { label: "property type", weak: "OrderState CurrentOrderState", stronger: "OrderState State or Color Color when natural", style: "semantic property name", meaning: "reads naturally at call site", caveat: "same-as-type is acceptable only without ambiguity" },
  { label: "boolean", weak: "NotDisabled / Flag", stronger: "IsEnabled / CanRetry / HasItems", style: "positive predicate", meaning: "true case states capability/state", caveat: "avoid double negatives in conditions" },
  { label: "version", weak: "NewService / LatestParser", stronger: "StreamingParser or ProtocolV2 during coexistence", style: "semantic suffix first", meaning: "difference or protocol version is explicit", caveat: "remove numeric version when migration completes" },
];

export function CqcMemberNamingLab() {
  const [selected, setSelected] = useState(3);
  const item = memberNameCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{memberNameCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["weak", item.weak], ["stronger", item.stronger], ["style", item.style], ["meaning", item.meaning]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">caveat: {item.caveat}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较public/private、property、boolean和version names在call site传达的语义。</figcaption></figure>;
}

const eventNameCases = [
  { label: "event args", declaration: "OrderPaidEventArgs", event: "OrderPaid", handler: "OnOrderPaid / HandleOrderPaid", tense: "past tense: completed fact", boundary: "payload type ends with EventArgs" },
  { label: "cancelable", declaration: "OrderPayingEventArgs", event: "OrderPaying", handler: "OnOrderPaying", tense: "present participle: before completion", boundary: "cancellation semantics explicit" },
  { label: "delegate type", declaration: "ValidationHandler / Converter", event: "not necessarily an event", handler: "Validate / Convert", tense: "role/action name", boundary: "use Handler/Callback only when it clarifies callable contract" },
  { label: "field handler", declaration: "EventHandler<ChangedEventArgs>", event: "Changed", handler: "HandleChanged", tense: "fact event", boundary: "avoid anonymous lambda when unsubscribe is required" },
  { label: "UI legacy", declaration: "Button.Click", event: "Click", handler: "SaveButton_Click", tense: "framework event name", boundary: "composition form is acceptable in designer-generated UI code" },
];

export function CqcEventNamingLab() {
  const [selected, setSelected] = useState(0);
  const item = eventNameCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{eventNameCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-3">{[["declaration", item.declaration], ["event", item.event], ["handler", item.handler]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div><div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-3 text-sm text-primary">tense: {item.tense}</div><div className="border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-primary">boundary: {item.boundary}</div></div></div><figcaption className="mt-2 text-center text-sm text-secondary">把event fact/cancel timing、delegate role、EventArgs和handler composition放在同一命名链中。</figcaption></figure>;
}
