"use client";

import { useMemo, useState } from "react";

type ReceiverKind = "Point" | "*Point";
type MethodKind = "Distance" | "ScaleBy";

export function GoplReceiverMethodSetLab() {
  const [receiver, setReceiver] = useState<ReceiverKind>("Point");
  const [method, setMethod] = useState<MethodKind>("ScaleBy");
  const [addressable, setAddressable] = useState(true);
  const methodNeedsPointer = method === "ScaleBy";
  const directMethodSet = receiver === "*Point" || !methodNeedsPointer;
  const callAllowed = directMethodSet || (receiver === "Point" && addressable && methodNeedsPointer);
  const interfaceSatisfied = directMethodSet;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">receiver expression<select value={receiver} onChange={(event) => setReceiver(event.target.value as ReceiverKind)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="Point">Point value</option><option value="*Point">*Point pointer</option></select></label><label className="block text-sm text-primary">method<select value={method} onChange={(event) => setMethod(event.target.value as MethodKind)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="Distance">Distance · value receiver</option><option value="ScaleBy">ScaleBy · pointer receiver</option></select></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={addressable} onChange={(event) => setAddressable(event.target.checked)} disabled={receiver === "*Point"} className="h-4 w-4 accent-[var(--accent)] disabled:opacity-40" />Point expression is addressable</label></section>
          <section className={`border p-4 ${callAllowed ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite"><code className="block border border-border bg-bg p-3 text-sm text-primary">receiver.{method}(...)</code><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">declared receiver</span><strong className="mt-2 block text-sm text-primary">{methodNeedsPointer ? "*Point" : "Point"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">method call</span><strong className="mt-2 block text-sm text-primary">{callAllowed ? directMethodSet ? "direct" : "compiler inserts &" : "compile error"}</strong></div><div className={`border p-3 ${interfaceSatisfied ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`}><span className="text-xs text-secondary">interface method set</span><strong className="mt-2 block text-sm text-primary">{interfaceSatisfied ? "satisfied" : "not satisfied"}</strong></div></div><p className="mt-4 text-sm leading-7 text-secondary">call syntax 可对 addressable value 自动取址，但 interface satisfaction 只看 method set，不应用这层调用糖。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">T method set 只有 value-receiver methods；*T method set 同时包含 value 与 pointer-receiver methods。</figcaption>
    </figure>
  );
}

export function GoplEmbeddingPromotionLab() {
  const [secondEmbedding, setSecondEmbedding] = useState(false);
  const [selector, setSelector] = useState("Distance");
  const ambiguous = secondEmbedding && selector === "Distance";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.86fr_1.14fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={secondEmbedding} onChange={(event) => setSecondEmbedding(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />embed a second type with Distance</label><label className="block text-sm text-primary">selector<select value={selector} onChange={(event) => setSelector(event.target.value)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="Distance">Distance()</option><option value="ScaleBy">ScaleBy()</option></select></label></section>
          <section className={`border p-4 ${ambiguous ? "border-rose-500/40 bg-rose-500/10" : "border-violet-500/40 bg-violet-500/10"}`} aria-live="polite"><div className="grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">ColoredPoint</span><strong className="mt-2 block text-sm text-primary">embeds Point</strong></div>{secondEmbedding && <div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">ColoredPoint</span><strong className="mt-2 block text-sm text-primary">embeds Vector</strong></div>}<div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">promoted selector</span><strong className="mt-2 block text-sm text-primary">cp.{selector}()</strong></div></div><strong className="mt-4 block text-sm text-primary">{ambiguous ? "ambiguous: choose cp.Point.Distance or cp.Vector.Distance" : `resolved through embedded ${selector === "Distance" ? "Point" : "*Point"}`}</strong><p className="mt-3 text-sm leading-7 text-secondary">promotion 缩短 selector，不改变 nested storage，也不允许同 depth 的冲突自动选择。显式 path 保留 composition evidence。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">anonymous field 的 methods 可被 promotion；同一 depth 出现同名 selector 时必须显式指定 embedded path。</figcaption>
    </figure>
  );
}

type Invocation = "method-value" | "method-expression";

export function GoplIntSetMethodLab() {
  const [items, setItems] = useState([1, 9, 65]);
  const [candidate, setCandidate] = useState(5);
  const [invocation, setInvocation] = useState<Invocation>("method-value");
  const hasCandidate = items.includes(candidate);
  const words = useMemo(() => {
    const result = [0, 0, 0];
    for (const item of items) {
      const word = Math.floor(item / 32);
      if (word < result.length) result[word] = (result[word] | (1 << (item % 32))) >>> 0;
    }
    return result;
  }, [items]);

  function toggleCandidate() {
    setItems((current) => current.includes(candidate) ? current.filter((item) => item !== candidate) : [...current, candidate].sort((a, b) => a - b));
  }

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">candidate: <strong>{candidate}</strong><input type="range" min="0" max="95" value={candidate} onChange={(event) => setCandidate(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><button type="button" onClick={toggleCandidate} className="min-h-11 w-full border border-border text-sm text-primary hover:bg-elevated">{hasCandidate ? "Remove" : "Add"} {candidate}</button><label className="block text-sm text-primary">invocation<select value={invocation} onChange={(event) => setInvocation(event.target.value as Invocation)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary"><option value="method-value">method value</option><option value="method-expression">method expression</option></select></label></section>
          <section className="border border-cyan-500/40 bg-cyan-500/10 p-4"><div className="grid gap-3 sm:grid-cols-3">{words.map((word, index) => <div key={index} className="border border-border bg-bg p-3"><span className="text-xs text-secondary">words[{index}] · bits {index * 32}..{index * 32 + 31}</span><code className="mt-2 block break-all text-xs text-primary">0x{word.toString(16).padStart(8, "0")}</code></div>)}</div><div className="mt-4 border border-border bg-bg p-3"><code className="text-sm text-primary">{invocation === "method-value" ? "has := set.Has; has(x)" : "has := (*IntSet).Has; has(&set, x)"}</code><p className="mt-2 text-sm leading-7 text-secondary">{invocation === "method-value" ? "receiver 已绑定进 function value。" : "receiver 变成 function 的第一个显式 parameter。"}</p></div><strong className="mt-4 block text-sm text-primary">set = &#123;{items.join(" ")}&#125; · Has({candidate}) = {String(hasCandidate)}</strong></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">IntSet 用 []uint words 存 bits；method value 绑定 receiver，method expression 把 receiver 暴露为第一个参数。</figcaption>
    </figure>
  );
}
