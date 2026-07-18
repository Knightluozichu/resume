"use client";

import { useMemo, useState } from "react";

export function GoplArraySliceBackingLab() {
  const [length, setLength] = useState(3);
  const [capacity, setCapacity] = useState(5);
  const [appendCount, setAppendCount] = useState(2);
  const backing = [10, 20, 30, 40, 50, 60, 70, 80];
  const reallocated = length + appendCount > capacity;
  const resultCapacity = reallocated ? Math.max(capacity * 2, length + appendCount) : capacity;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">len: <strong>{length}</strong><input type="range" min="1" max="5" value={length} onChange={(event) => { const next = Number(event.target.value); setLength(next); setCapacity((current) => Math.max(current, next)); }} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">cap: <strong>{capacity}</strong><input type="range" min={length} max="8" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="block text-sm text-primary">append items: <strong>{appendCount}</strong><input type="range" min="1" max="5" value={appendCount} onChange={(event) => setAppendCount(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label></section>
          <section className={`border p-4 ${reallocated ? "border-amber-500/40 bg-amber-500/10" : "border-emerald-500/40 bg-emerald-500/10"}`} aria-live="polite"><span className="text-xs text-secondary">backing array and slice window</span><div className="mt-4 grid grid-cols-8 gap-1">{backing.map((value, index) => <div key={value} className={`grid min-h-14 place-items-center border text-xs ${index < length ? "border-cyan-500 bg-cyan-500/10 text-primary" : index < capacity ? "border-border bg-bg text-secondary" : "border-border/50 bg-elevated text-secondary/60"}`}>{value}<span className="block text-[10px]">{index < length ? "len" : index < capacity ? "cap" : "out"}</span></div>)}</div><div className="mt-4 grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">append needs</span><strong className="mt-2 block text-sm text-primary">{length + appendCount}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">allocation</span><strong className="mt-2 block text-sm text-primary">{reallocated ? "new backing array" : "reuse backing array"}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">result cap</span><strong className="mt-2 block text-sm text-primary">≈ {resultCapacity}</strong></div></div><p className="mt-4 text-sm leading-7 text-secondary">append 返回的新 slice 才是结果 owner；若扩容，旧 aliases 看不到新 backing array；若复用，写入可能被共享 aliases 观察到。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">array value 包含固定数量元素；slice 只是 pointer/len/cap descriptor，append 是否复用 backing array 取决于 capacity。</figcaption>
    </figure>
  );
}

export function GoplMapStructLab() {
  const [lookup, setLookup] = useState("alpha");
  const [embedded, setEmbedded] = useState(true);
  const counts: Record<string, number> = { alpha: 2, beta: 0, gamma: 5 };
  const exists = Object.prototype.hasOwnProperty.call(counts, lookup);
  const value = counts[lookup] ?? 0;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="border border-border bg-bg p-4"><label className="block text-sm text-primary">map lookup key<input value={lookup} onChange={(event) => setLookup(event.target.value)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary outline-none focus:border-cyan-500" /></label><code className="mt-4 block border border-border bg-elevated p-3 text-sm text-primary">value, ok := counts[{JSON.stringify(lookup)}]</code><div className="mt-3 grid grid-cols-2 gap-3"><div className="border border-border bg-elevated p-3"><span className="text-xs text-secondary">value</span><strong className="mt-2 block text-lg text-primary">{value}</strong></div><div className={`border p-3 ${exists ? "border-emerald-500/40 bg-emerald-500/10" : "border-amber-500/40 bg-amber-500/10"}`}><span className="text-xs text-secondary">ok</span><strong className="mt-2 block text-lg text-primary">{String(exists)}</strong></div></div><p className="mt-3 text-sm leading-7 text-secondary">zero value 0 不能区分 missing 与 present-zero；comma-ok 保留 membership evidence。</p></section>
          <section className="border border-violet-500/40 bg-violet-500/10 p-4"><label className="flex min-h-11 items-center gap-3 border border-border bg-bg px-3 text-sm text-primary"><input type="checkbox" checked={embedded} onChange={(event) => setEmbedded(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />anonymous embedded Point</label><div className="mt-4 border border-border bg-bg p-3 font-mono text-sm leading-8 text-primary">type Point struct &#123; X, Y int &#125;<br />type Circle struct &#123;<br />&nbsp;&nbsp;{embedded ? "Point" : "Center Point"}<br />&nbsp;&nbsp;Radius int<br />&#125;</div><strong className="mt-4 block text-sm text-primary">access: {embedded ? "c.X · promoted field" : "c.Center.X · named field"}</strong><p className="mt-3 text-sm leading-7 text-secondary">embedding 让 selector promotion 更短，但 storage 仍是 nested field；conflict 时必须显式选择 path。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">map 的 lookup contract 需要 value+ok；struct 把具名 fields 组成值，anonymous field 支持 selector promotion 而非继承。</figcaption>
    </figure>
  );
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&#34;").replaceAll("'", "&#39;");
}

export function GoplJsonTemplateLab() {
  const [name, setName] = useState("<b>Gopher</b>");
  const [exported, setExported] = useState(true);
  const [htmlTemplate, setHtmlTemplate] = useState(true);
  const payload = useMemo(() => exported ? { name, score: 98 } : { score: 98 }, [exported, name]);
  const rendered = htmlTemplate ? `<p>${escapeHtml(name)}</p>` : `<p>${name}</p>`;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">untrusted name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary outline-none focus:border-cyan-500" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={exported} onChange={(event) => setExported(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />JSON field is exported (`Name`)</label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={htmlTemplate} onChange={(event) => setHtmlTemplate(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />render with html/template</label></section>
          <section className="space-y-3 border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">encoding/json</span><code className="mt-2 block break-all text-sm text-primary">{JSON.stringify(payload)}</code></div><div className={`border p-3 ${htmlTemplate ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`}><span className="text-xs text-secondary">template output source</span><code className="mt-2 block break-all text-sm text-primary">{rendered}</code></div><p className="text-sm leading-7 text-secondary">JSON encoder只观察 exported fields/tags；html/template 按 HTML context escaping data。template source 必须 trusted，不能把用户输入拼成 executable template。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">struct tags 把 Go fields 映射到 JSON schema；html/template 在 HTML、attribute、URL 等 context 中转义不可信 data。</figcaption>
    </figure>
  );
}
