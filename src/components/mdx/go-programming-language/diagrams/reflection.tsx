"use client";

import { useState } from "react";

type ReflectedSample = "string" | "slice" | "struct" | "pointer" | "nil-interface";

const samples: Record<ReflectedSample, { type: string; kind: string; value: string; nil: boolean }> = {
  string: { type: "string", kind: "String", value: '"gopher"', nil: false },
  slice: { type: "[]int", kind: "Slice", value: "[2 3 5]", nil: false },
  struct: { type: "Movie", kind: "Struct", value: "{Title: Go Year: 2015}", nil: false },
  pointer: { type: "*Movie", kind: "Ptr", value: "&{Title: Go Year: 2015}", nil: false },
  "nil-interface": { type: "<nil>", kind: "Invalid", value: "<invalid Value>", nil: true },
};

export function GoplReflectTypeValueLab() {
  const [sample, setSample] = useState<ReflectedSample>("struct");
  const [fromPointerElem, setFromPointerElem] = useState(false);
  const selected = samples[sample];
  const addressable = sample === "pointer" && fromPointerElem;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">interface input<select value={sample} onChange={(event) => setSample(event.target.value as ReflectedSample)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="string">string</option><option value="slice">[]int</option><option value="struct">Movie struct</option><option value="pointer">*Movie pointer</option><option value="nil-interface">nil interface</option></select></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={fromPointerElem} onChange={(event) => setFromPointerElem(event.target.checked)} disabled={sample !== "pointer"} className="h-4 w-4 accent-[var(--accent)] disabled:opacity-40" />inspect ValueOf(pointer).Elem()</label></section>
          <section className={`border p-4 ${selected.nil ? "border-amber-500/40 bg-amber-500/10" : "border-cyan-500/40 bg-cyan-500/10"}`} aria-live="polite"><div className="grid gap-3 sm:grid-cols-4"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Type</span><strong className="mt-2 block text-sm text-primary">{fromPointerElem && sample === "pointer" ? "Movie" : selected.type}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Kind</span><strong className="mt-2 block text-sm text-primary">{fromPointerElem && sample === "pointer" ? "Struct" : selected.kind}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">CanAddr</span><strong className="mt-2 block text-sm text-primary">{String(addressable)}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">CanSet</span><strong className="mt-2 block text-sm text-primary">{String(addressable)}</strong></div></div><code className="mt-4 block border border-border bg-bg p-3 text-sm text-primary">reflect.Value = {selected.value}</code><p className="mt-4 text-sm leading-7 text-secondary">Type 描述静态 concrete type，Kind 折叠为 Struct/Slice/Ptr等representation category；zero reflect.Value 是 Invalid，很多 methods会panic。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">reflect.TypeOf/ValueOf 从 interface dynamic pair 进入反射；通过 pointer Elem 才能得到可寻址、可能可设置的原变量。</figcaption>
    </figure>
  );
}

type CodecMode = "display" | "encode" | "decode";

export function GoplReflectCodecLab() {
  const [mode, setMode] = useState<CodecMode>("display");
  const [depth, setDepth] = useState(3);
  const [cycle, setCycle] = useState(false);
  const [limit, setLimit] = useState(4);
  const accepted = depth <= limit && !cycle;
  const output = mode === "display" ? "root.Child.Values[0] = 7" : mode === "encode" ? '(node (name "root") (values 7 9))' : "Node{Name: root, Values: [7 9]}";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="reflection codec mode">{(["display", "encode", "decode"] as CodecMode[]).map((item, index) => <button key={item} type="button" onClick={() => setMode(item)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${mode === item ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>{item}</button>)}</div><div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">value depth: <strong>{depth}</strong><input type="range" min="1" max="8" value={depth} onChange={(event) => setDepth(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">depth limit: <strong>{limit}</strong><input type="range" min="1" max="8" value={limit} onChange={(event) => setLimit(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={cycle} onChange={(event) => setCycle(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />input contains pointer cycle</label></section><section className={`border p-4 ${accepted ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`}><div className="grid gap-2 sm:grid-cols-4">{["inspect Kind", "validate supported type", "recurse with path/limits", mode === "decode" ? "set typed destination" : "emit output"].map((item, index) => <div key={item} className="min-h-24 border border-border bg-bg p-3 text-sm text-primary"><span className="text-xs text-secondary">0{index + 1}</span><strong className="mt-2 block">{item}</strong></div>)}</div><code className="mt-4 block border border-border bg-bg p-3 text-sm text-primary">{accepted ? output : cycle ? "error: cycle at root.Child.Parent" : `error: depth ${depth} exceeds ${limit}`}</code><p className="mt-4 text-sm leading-7 text-secondary">recursive reflection needs path、cycle detection、depth/size limits与unsupported-kind errors；decoder还必须要求non-nil pointer destination并先验证后commit。</p></section></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Display、S-expression encode/decode 都按 Kind 递归；生产 codec 必须限制 graph 并把 panic-prone reflection 转为带路径 error。</figcaption>
    </figure>
  );
}

export function GoplReflectMutationTagLab() {
  const [addressable, setAddressable] = useState(true);
  const [exported, setExported] = useState(true);
  const [tag, setTag] = useState('json:"title,omitempty" validate:"required"');
  const [pointerType, setPointerType] = useState(true);
  const canSet = addressable && exported;
  const methods = pointerType ? ["String", "Validate", "SetTitle"] : ["String", "Validate"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={addressable} onChange={(event) => setAddressable(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />Value came from pointer.Elem()</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={exported} onChange={(event) => setExported(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />field is exported</label><label className="block text-sm text-primary">struct tag<input value={tag} onChange={(event) => setTag(event.target.value)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={pointerType} onChange={(event) => setPointerType(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />enumerate methods of *Movie</label></section>
          <section className={`border p-4 ${canSet ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`}><div className="grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">CanAddr</span><strong className="mt-2 block text-sm text-primary">{String(addressable)}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">CanSet field</span><strong className="mt-2 block text-sm text-primary">{String(canSet)}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">NumMethod</span><strong className="mt-2 block text-sm text-primary">{methods.length}</strong></div></div><div className="mt-4 border border-border bg-bg p-3"><span className="text-xs text-secondary">tag lookup</span><code className="mt-2 block break-all text-sm text-primary">{tag || "<empty>"}</code></div><div className="mt-4 flex flex-wrap gap-2">{methods.map((method) => <span key={method} className="border border-border bg-bg px-3 py-2 text-xs text-primary">{method}</span>)}</div><p className="mt-4 text-sm leading-7 text-secondary">set 需要addressable且允许访问的Value；StructTag.Get/Lookup解释约定key；Type.Method只枚举exported methods，T与*T method sets不同。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">reflection mutation 受 addressability/export rules约束；struct tags承载schema metadata；method enumeration仍遵守method set。</figcaption>
    </figure>
  );
}
