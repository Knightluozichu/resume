"use client";

import { useState } from "react";

const ownershipCases = [
  { label: "managed value", resource: "ordinary managed object", owner: "GC tracks reachability", release: "no Dispose solely to clear memory", fallback: "none", proof: "no scarce external handle remains" },
  { label: "owned stream", resource: "FileStream created by this object", owner: "creating object transfers/retains explicit ownership", release: "Dispose/await using promptly", fallback: "FileStream/SafeHandle owns native cleanup", proof: "handle count returns to baseline" },
  { label: "borrowed stream", resource: "Stream passed by caller", owner: "caller unless API says leaveOpen=false", release: "do not dispose borrowed dependency", fallback: "original owner remains responsible", proof: "stream remains usable after operation" },
  { label: "SafeHandle", resource: "native OS handle", owner: "SafeHandle subclass", release: "Dispose closes deterministically", fallback: "SafeHandle critical finalization", proof: "release runs once under explicit and fallback paths" },
  { label: "async resource", resource: "resource with asynchronous flush", owner: "IAsyncDisposable owner", release: "await DisposeAsync before scope exit", fallback: "do not rely on finalizer for business flush", proof: "pending writes complete or cancellation policy is explicit" },
];

export function CqcOwnershipGraphLab() {
  const [selected, setSelected] = useState(1);
  const item = ownershipCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{ownershipCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]">
          <div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">resource</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.resource}</strong></div>
          <div className="flex min-h-12 items-center justify-center text-xl text-cyan-400">→</div>
          <div className="border border-cyan-500/40 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">owner</span><strong className="mt-2 block text-sm leading-6 text-primary">{item.owner}</strong></div>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">{[["deterministic release", item.release], ["fallback", item.fallback], ["proof", item.proof]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-3"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换managed、owned/borrowed、SafeHandle与async resource，先确认ownership再决定release path。</figcaption>
    </figure>
  );
}

const disposeCases = [
  { label: "active", trigger: "normal method call", managed: "allowed", native: "owned SafeHandle valid", next: "remain active", rule: "guard against concurrent dispose if contract allows it" },
  { label: "Dispose", trigger: "caller leaves scope", managed: "dispose owned managed fields", native: "dispose SafeHandle", next: "disposed", rule: "idempotent; suppress only this type's finalizer" },
  { label: "Dispose again", trigger: "duplicate cleanup", managed: "no-op", native: "no second close", next: "disposed", rule: "must not throw solely because already disposed" },
  { label: "finalizer", trigger: "GC fallback for direct native ownership", managed: "must not touch arbitrary managed objects", native: "release minimal unmanaged state", next: "reclaimed", rule: "prefer SafeHandle so application type needs no finalizer" },
  { label: "after dispose", trigger: "public member call", managed: "not accessed", native: "not accessed", next: "disposed", rule: "throw ObjectDisposedException where operation requires live state" },
];

export function CqcDisposeStateLab() {
  const [selected, setSelected] = useState(1);
  const item = disposeCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{disposeCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">{[["trigger", item.trigger], ["managed path", item.managed], ["native path", item.native], ["next state", item.next]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-3"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div>
        <div className="mt-3 border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">rule: {item.rule}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">检查Dispose、重复Dispose、finalizer fallback和disposed-state调用的状态转换。</figcaption>
    </figure>
  );
}

const serializationCases = [
  { label: "DTO contract", include: "explicit public data members", exclude: "runtime cache, handle, callback and secret", version: "named fields plus tolerant defaults", mechanism: "JSON/protobuf/source-generated serializer", boundary: "map domain object to a transport DTO" },
  { label: "ignore member", include: "stable persisted state", exclude: "[JsonIgnore]/ignore attribute member", version: "removing a field still needs reader compatibility", mechanism: "serializer-specific contract metadata", boundary: "attribute changes wire shape, not ownership" },
  { label: "custom converter", include: "validated canonical representation", exclude: "implementation-only fields", version: "explicit format version and migration", mechanism: "converter/surrogate", boundary: "round-trip with hostile and old payloads" },
  { label: "ISerializable", include: "legacy SerializationInfo keys", exclude: "unsafe BinaryFormatter assumptions", version: "manual keys and base chaining", mechanism: "legacy compatibility only", boundary: "do not choose for new cross-process formats" },
  { label: "derived type", include: "base contract plus derived fields", exclude: "duplicate or inaccessible base implementation state", version: "base and derived migrations coordinate", mechanism: "base hook/DTO composition", boundary: "subtype must preserve parent serialized invariants" },
];

export function CqcSerializationContractLab() {
  const [selected, setSelected] = useState(0);
  const item = serializationCases[selected];
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{serializationCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">{[["include", item.include], ["exclude", item.exclude], ["versioning", item.version], ["mechanism", item.mechanism]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div>
        <div className="mt-3 border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-primary">boundary: {item.boundary}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">比较DTO、ignore attribute、converter、legacy ISerializable与derived contract的include/exclude/version规则。</figcaption>
    </figure>
  );
}
