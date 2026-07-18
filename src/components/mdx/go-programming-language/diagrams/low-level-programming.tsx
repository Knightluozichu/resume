"use client";

import { useMemo, useState } from "react";

type FieldSpec = { name: string; size: number; align: number; offset?: number };

function alignUp(value: number, alignment: number) {
  return Math.ceil(value / alignment) * alignment;
}

function layout(fields: FieldSpec[]) {
  let cursor = 0;
  let structAlign = 1;
  const placed = fields.map((field) => {
    cursor = alignUp(cursor, field.align);
    const placedField = { ...field, offset: cursor };
    cursor += field.size;
    structAlign = Math.max(structAlign, field.align);
    return placedField;
  });
  return { fields: placed, size: alignUp(cursor, structAlign), align: structAlign };
}

export function GoplUnsafeLayoutLab() {
  const [pointerSize, setPointerSize] = useState(8);
  const [compact, setCompact] = useState(false);
  const fields = compact
    ? [{ name: "Ptr", size: pointerSize, align: pointerSize }, { name: "Code", size: 2, align: 2 }, { name: "Flag", size: 1, align: 1 }]
    : [{ name: "Flag", size: 1, align: 1 }, { name: "Ptr", size: pointerSize, align: pointerSize }, { name: "Code", size: 2, align: 2 }];
  const result = layout(fields);
  const bytes = Array.from({ length: result.size }, (_, index) => result.fields.find((field) => index >= (field.offset ?? 0) && index < (field.offset ?? 0) + field.size)?.name ?? "pad");

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">pointer size<select value={pointerSize} onChange={(event) => setPointerSize(Number(event.target.value))} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value={4}>4 bytes</option><option value={8}>8 bytes</option></select></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={compact} onChange={(event) => setCompact(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />order fields by decreasing alignment</label></section>
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4"><div className={`grid gap-1 ${result.size > 16 ? "grid-cols-12 sm:grid-cols-24" : "grid-cols-8 sm:grid-cols-16"}`}>{bytes.map((name, index) => <div key={index} className={`grid aspect-square min-w-0 place-items-center border text-[9px] ${name === "pad" ? "border-amber-500/30 bg-amber-500/10 text-secondary" : "border-border bg-bg text-primary"}`} title={`byte ${index}: ${name}`}>{index}</div>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">unsafe.Sizeof</span><strong className="mt-2 block text-lg text-primary">{result.size}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">unsafe.Alignof</span><strong className="mt-2 block text-lg text-primary">{result.align}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Offsetof fields</span><strong className="mt-2 block text-sm text-primary">{result.fields.map((field) => `${field.name}:${field.offset}`).join(" · ")}</strong></div></div><p className="mt-4 text-sm leading-7 text-secondary">padding 满足每个 field alignment并把struct size补到整体alignment倍数；结果随architecture/type layout变化，不能当portable wire format。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Sizeof/Alignof/Offsetof 描述当前 target ABI下的Go layout；field reorder可减少padding，却可能改变binary compatibility。</figcaption>
    </figure>
  );
}

type PointerCase = "field-offset" | "stored-uintptr" | "out-of-bounds";

export function GoplUnsafePointerLab() {
  const [pointerCase, setPointerCase] = useState<PointerCase>("field-offset");
  const [offset, setOffset] = useState(8);
  const objectSize = 24;
  const valid = pointerCase === "field-offset" && offset < objectSize;
  const steps = pointerCase === "field-offset" ? ["*Struct", "unsafe.Pointer", `+ Offsetof (${offset})`, "*Field in same expression"] : pointerCase === "stored-uintptr" ? ["unsafe.Pointer", "uintptr stored", "GC may move/reclaim lifetime", "convert back later"] : ["base pointer", `+ ${offset}`, "outside original allocation", "invalid dereference"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">conversion pattern<select value={pointerCase} onChange={(event) => setPointerCase(event.target.value as PointerCase)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="field-offset">field offset in one expression</option><option value="stored-uintptr">store uintptr and reuse later</option><option value="out-of-bounds">pointer outside allocation</option></select></label><label className="block text-sm text-primary">offset: <strong>{offset}</strong><input type="range" min="0" max="32" step="2" value={offset} onChange={(event) => setOffset(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label></section>
          <section className={`border p-4 ${valid ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite"><div className="grid gap-2 sm:grid-cols-4">{steps.map((step, index) => <div key={step} className="min-h-24 border border-border bg-bg p-3 text-sm text-primary"><span className="text-xs text-secondary">0{index + 1}</span><strong className="mt-2 block">{step}</strong></div>)}</div><strong className="mt-4 block text-sm text-primary">{valid ? "valid only while result remains inside original object and object stays live" : pointerCase === "stored-uintptr" ? "invalid: uintptr is not a GC-tracked reference" : "invalid: pointer arithmetic escapes original allocation"}</strong><p className="mt-3 text-sm leading-7 text-secondary">official unsafe patterns require exact conversion shape；modern unsafe.Add/Slice still require same allocation、bounds、alignment与lifetime。checkptr/tests不能把invalid program变安全。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">unsafe.Pointer 是typed-pointer bridge；uintptr只是integer，不能保存object lifetime或跨safe point充当pointer。</figcaption>
    </figure>
  );
}

type BoundaryMode = "deep-equal" | "cgo";

export function GoplDeepEqualCgoLab() {
  const [mode, setMode] = useState<BoundaryMode>("deep-equal");
  const [cycle, setCycle] = useState(true);
  const [nan, setNan] = useState(false);
  const [cRetainsPointer, setCRetainsPointer] = useState(false);
  const [freed, setFreed] = useState(true);
  const equal = !nan;
  const cgoSafe = !cRetainsPointer && freed;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border"><button type="button" onClick={() => setMode("deep-equal")} className={`min-h-11 border-r border-border text-sm ${mode === "deep-equal" ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>deep equivalence</button><button type="button" onClick={() => setMode("cgo")} className={`min-h-11 text-sm ${mode === "cgo" ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>cgo boundary</button></div>{mode === "deep-equal" ? <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><section className="space-y-4 border border-border bg-bg p-4"><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={cycle} onChange={(event) => setCycle(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />graphs contain matching cycles</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={nan} onChange={(event) => setNan(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />leaf contains NaN</label></section><section className={`border p-4 ${equal ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`}><div className="grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">cycle policy</span><strong className="mt-2 block text-sm text-primary">{cycle ? "visited pair prevents recursion" : "acyclic walk"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">NaN policy</span><strong className="mt-2 block text-sm text-primary">{nan ? "NaN != NaN" : "ordinary leaves"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">equal</span><strong className="mt-2 block text-sm text-primary">{String(equal)}</strong></div></div><p className="mt-4 text-sm leading-7 text-secondary">deep equality 是domain relation，不只是递归==：nil/empty、NaN、functions、unexported fields、cycles、map keys与custom Equal methods都需policy。</p></section></div> : <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><section className="space-y-4 border border-border bg-bg p-4"><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={cRetainsPointer} onChange={(event) => setCRetainsPointer(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />C retains Go pointer after call</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={freed} onChange={(event) => setFreed(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />caller calls C.free for C.CString</label></section><section className={`border p-4 ${cgoSafe ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`}><div className="grid gap-2 sm:grid-cols-4">{["Go string", "C.CString copies to C heap", "C call", freed ? "C.free" : "leak"].map((step, index) => <div key={step} className="min-h-24 border border-border bg-bg p-3 text-sm text-primary"><span className="text-xs text-secondary">0{index + 1}</span><strong className="mt-2 block">{step}</strong></div>)}</div><strong className="mt-4 block text-sm text-primary">{cgoSafe ? "ownership closed" : cRetainsPointer ? "invalid retention unless memory is legally pinned for full duration" : "C allocation leaked"}</strong><p className="mt-3 text-sm leading-7 text-secondary">C allocation不受Go GC管理；Go pointer passing受pinned/reachable-pointer规则约束。复杂Go values跨边界优先copy或runtime/cgo.Handle。</p></section></div>}
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">deep equality需定义value relation；cgo需定义allocation domain、copy、pin/retention与free responsibility。</figcaption>
    </figure>
  );
}
