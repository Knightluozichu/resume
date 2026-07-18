"use client";

import { useState } from "react";

const abiCases = [
  { label: "matched ABI", native: "int32 sum(const int32* values, int32 count)", managed: "int Sum(int[] values, int count)", contract: "cdecl + 32-bit integers + input buffer", result: "arguments and return value decode predictably" },
  { label: "wrong width", native: "size_t length on 64-bit host", managed: "int length", contract: "native-sized unsigned value was truncated", result: "large lengths become corrupt or negative" },
  { label: "wrong charset", native: "const wchar_t* path", managed: "ANSI string conversion", contract: "code-unit width and termination disagree", result: "path is mojibake or ends early" },
  { label: "wrong calling", native: "stdcall callee cleans stack", managed: "cdecl declaration", contract: "caller and callee disagree on stack cleanup", result: "stack corruption at or after return" },
  { label: "wrong bool", native: "1-byte C++ bool", managed: "default 4-byte Win32 BOOL", contract: "Boolean representation differs", result: "field offsets and return decoding drift" },
];

export function Ec7InteropBoundaryLab() {
  const [selected, setSelected] = useState(0);
  const item = abiCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{abiCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_1fr]"><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">native declaration</span><code className="mt-2 block break-words text-sm leading-6 text-primary">{item.native}</code></div><div className="flex min-h-12 items-center justify-center text-xl text-cyan-400">⇄</div><div className="border border-border bg-bg p-4"><span className="text-xs text-secondary">managed declaration</span><code className="mt-2 block break-words text-sm leading-6 text-primary">{item.managed}</code></div></div><div className="mt-3 grid gap-3 md:grid-cols-2"><div className="border border-border bg-bg p-3 text-sm text-secondary">ABI contract: {item.contract}</div><strong className="border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-primary">outcome: {item.result}</strong></div></div><figcaption className="mt-2 text-center text-sm text-secondary">逐项切换ABI mismatch，检查entry point、calling convention、width、charset和representation。</figcaption></figure>;
}

const marshallingCases = [
  { label: "blittable", managed: "int / double / fixed-layout numeric struct", transport: "same in-memory representation", owner: "caller owns pinned or copied buffer", release: "no element conversion; still define lifetime" },
  { label: "string input", managed: "immutable managed string", transport: "encode and copy to terminated native buffer", owner: "marshaller owns temporary copy", release: "valid only for the duration promised by call" },
  { label: "output buffer", managed: "StringBuilder or byte array + capacity", transport: "native writes no more than capacity", owner: "managed caller owns storage", release: "validate returned length before decoding" },
  { label: "struct layout", managed: "StructLayout + FieldOffset/Pack when required", transport: "fields placed at explicit ABI offsets", owner: "nested pointers need separate policy", release: "verify size and offsets against native header" },
  { label: "native handle", managed: "SafeHandle-derived wrapper", transport: "opaque pointer-sized token", owner: "wrapper owns exactly one native resource", release: "ReleaseHandle once, including exception paths" },
];

export function Ec7MarshallingOwnershipLab() {
  const [selected, setSelected] = useState(0);
  const item = marshallingCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{marshallingCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["managed shape", item.managed], ["boundary transport", item.transport], ["ownership", item.owner], ["release/validation", item.release]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">比较blittable、string、output buffer、struct和handle的转换、所有权与释放责任。</figcaption></figure>;
}

const unsafeCases = [
  { label: "movable object", memory: "managed byte[] may relocate at a GC safepoint", scope: "ordinary managed reference", native: "do not cache its address", guard: "copy or pin only for the required interval" },
  { label: "fixed scope", memory: "GC keeps the selected object at one address", scope: "pointer valid only inside fixed block", native: "synchronous call may consume pointer", guard: "keep scope short; pinning fragments the heap" },
  { label: "pointer walk", memory: "p + i advances by sizeof(element)", scope: "unsafe block has no automatic bounds check", native: "count must describe reachable storage", guard: "prove 0 <= i < count before dereference" },
  { label: "stackalloc", memory: "short-lived storage belongs to current stack frame", scope: "invalid after method returns", native: "pass only to non-retaining call", guard: "prefer a bounds-checked span view where possible" },
  { label: "callback delegate", memory: "runtime creates native-callable thunk for delegate", scope: "native may retain function pointer after registration", native: "calls back using exact unmanaged signature", guard: "root delegate until unregister and drain callbacks" },
];

export function Ec7UnsafeLifetimeLab() {
  const [selected, setSelected] = useState(1);
  const item = unsafeCases[selected];
  return <figure className="mdx-figure not-prose mx-auto my-6"><div className="border border-border bg-elevated p-4 sm:p-5"><div className="grid grid-cols-3 gap-2 sm:grid-cols-5">{unsafeCases.map((entry, index) => <button key={entry.label} type="button" onClick={() => setSelected(index)} className={`min-h-12 border px-2 text-xs ${selected === index ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-bg text-secondary"}`}>{entry.label}</button>)}</div><div className="mt-4 grid gap-3 md:grid-cols-2">{[["memory fact", item.memory], ["valid scope", item.scope], ["native side", item.native], ["required guard", item.guard]].map(([title, value]) => <div key={title} className="border border-border bg-bg p-4"><span className="text-xs text-secondary">{title}</span><strong className="mt-2 block text-sm leading-6 text-primary">{value}</strong></div>)}</div></div><figcaption className="mt-2 text-center text-sm text-secondary">切换地址、fixed、pointer、stackalloc与delegate callback，追踪每个地址的有效生命周期。</figcaption></figure>;
}
