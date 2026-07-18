"use client";

import { useMemo, useState } from "react";

export function RplVecCapacityLab() {
  const [length, setLength] = useState(3);
  const [capacity, setCapacity] = useState(4);
  const [borrowed, setBorrowed] = useState(true);
  const nextLength = length + 1;
  const reallocates = nextLength > capacity;
  const compiles = !borrowed;
  const nextCapacity = reallocates ? Math.max(capacity * 2, nextLength) : capacity;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.3fr]">
          <section className="space-y-5 border border-border bg-bg p-4">
            <label className="block text-sm text-primary">len：{length}<input type="range" min="1" max="8" value={length} onChange={(event) => { const value = Number(event.target.value); setLength(value); if (capacity < value) setCapacity(value); }} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="block text-sm text-primary">capacity：{capacity}<input type="range" min={length} max="10" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} className="mt-2 w-full accent-[var(--accent)]" /></label>
            <label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={borrowed} onChange={(event) => setBorrowed(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />push 后仍使用 `&v[0]`</label>
          </section>
          <section className={`min-h-80 border p-4 ${compiles ? "border-emerald-500/40 bg-emerald-500/10" : "border-rose-500/40 bg-rose-500/10"}`} aria-live="polite">
            <span className="text-xs text-secondary">执行 v.push(new_value)</span>
            <div className="mt-5 grid grid-cols-5 gap-2">
              {Array.from({ length: capacity }, (_, index) => <div key={index} className={`aspect-square min-h-10 border p-2 text-center text-xs ${index < length ? "border-cyan-500/50 bg-bg text-primary" : "border-border bg-bg text-secondary"}`}>{index < length ? `v${index}` : "空"}</div>)}
            </div>
            <h3 className="mt-6 text-base font-semibold text-primary">{compiles ? `允许修改，push 后 len=${nextLength}` : "E0502：活跃共享借用阻止可变借用"}</h3>
            <p className="mt-4 text-sm text-secondary">{reallocates ? `容量不足，可能迁移到 capacity=${nextCapacity} 的新缓冲；旧元素地址不能继续被引用。` : "本次容量足够，但借用规则不依赖运行时是否碰巧扩容，仍阻止潜在失效。"}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Vec 的元素连续存放；push 需要整个 Vec 的可变借用，并可能迁移缓冲区。</figcaption>
    </figure>
  );
}

const utf8Samples = {
  hola: { label: "Hola", text: "Hola", bytes: [72, 111, 108, 97], chars: ["H", "o", "l", "a"], graphemes: ["H", "o", "l", "a"] },
  cyrillic: { label: "Зд", text: "Зд", bytes: [208, 151, 208, 180], chars: ["З", "д"], graphemes: ["З", "д"] },
  devanagari: { label: "नमस्ते", text: "नमस्ते", bytes: [224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164, 224, 165, 135], chars: ["न", "म", "स", "्", "त", "े"], graphemes: ["न", "म", "स्", "ते"] },
} as const;

type Utf8Sample = keyof typeof utf8Samples;
type Utf8View = "bytes" | "chars" | "graphemes";

export function RplUtf8LayersLab() {
  const [sample, setSample] = useState<Utf8Sample>("devanagari");
  const [view, setView] = useState<Utf8View>("bytes");
  const selected = utf8Samples[sample];
  const values = selected[view];
  const labels = { bytes: "UTF-8 bytes / len()", chars: "Unicode scalar values / chars()", graphemes: "用户感知字符 / 外部 Unicode 分段" } as const;
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="UTF-8 示例">
          {(Object.keys(utf8Samples) as Utf8Sample[]).map((item) => <button key={item} type="button" aria-pressed={sample === item} onClick={() => setSample(item)} className={`min-h-11 border-r border-border text-sm last:border-r-0 ${sample === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{utf8Samples[item].label}</button>)}
        </div>
        <div className="mt-4 grid grid-cols-3 border border-border" role="group" aria-label="字符串观察层次">
          {(["bytes", "chars", "graphemes"] as Utf8View[]).map((item) => <button key={item} type="button" aria-pressed={view === item} onClick={() => setView(item)} className={`min-h-11 border-r border-border px-2 text-xs last:border-r-0 sm:text-sm ${view === item ? "bg-cyan-500 text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{item}</button>)}
        </div>
        <section className="mt-5 min-h-80 border border-cyan-500/40 bg-cyan-500/10 p-4" aria-live="polite">
          <div className="flex items-start justify-between gap-4"><div><span className="text-xs text-secondary">String 内容</span><h3 className="mt-2 text-2xl font-semibold text-primary">{selected.text}</h3></div><span className="border border-border bg-bg px-3 py-2 text-xs text-primary">count = {values.length}</span></div>
          <p className="mt-5 text-sm text-secondary">{labels[view]}</p>
          <div className="mt-3 flex min-h-28 flex-wrap content-start gap-2">
            {values.map((value, index) => <div key={`${value}-${index}`} className="min-w-12 border border-border bg-bg px-3 py-2 text-center font-mono text-sm text-primary">{value}</div>)}
          </div>
          <p className="mt-5 border-t border-border pt-4 text-sm text-secondary">单个整数索引无法同时承诺 byte、char 与 grapheme 语义；String 因此不提供 `s[i]`。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">UTF-8 文本有字节、Unicode scalar 与 grapheme 三个观察层，数量可能各不相同。</figcaption>
    </figure>
  );
}

type MapMode = "overwrite" | "orInsert" | "count";

export function RplHashMapEntryLab() {
  const [mode, setMode] = useState<MapMode>("count");
  const [text, setText] = useState("hello world wonderful world");
  const entries = useMemo(() => {
    if (mode === "overwrite") return [["Blue", 25], ["Yellow", 50]] as const;
    if (mode === "orInsert") return [["Blue", 10], ["Yellow", 50]] as const;
    const counts = new Map<string, number>();
    for (const word of text.trim().split(/\s+/).filter(Boolean)) counts.set(word, (counts.get(word) ?? 0) + 1);
    return [...counts.entries()];
  }, [mode, text]);
  const code = mode === "overwrite" ? 'scores.insert("Blue", 25);' : mode === "orInsert" ? 'scores.entry("Blue").or_insert(50);' : "*map.entry(word).or_insert(0) += 1;";
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="HashMap 更新策略">
          {(["overwrite", "orInsert", "count"] as MapMode[]).map((item) => <button key={item} type="button" aria-pressed={mode === item} onClick={() => setMode(item)} className={`min-h-11 border-r border-border px-2 text-xs last:border-r-0 sm:text-sm ${mode === item ? "bg-primary text-bg" : "bg-bg text-secondary hover:text-primary"}`}>{item === "orInsert" ? "or_insert" : item === "count" ? "词频" : "覆盖"}</button>)}
        </div>
        <div className="mt-5 grid min-h-80 gap-4 lg:grid-cols-[1.1fr_1fr]">
          <section className="border border-border bg-bg p-4">
            {mode === "count" && <label className="block text-sm text-primary">输入文本<textarea value={text} onChange={(event) => setText(event.target.value)} rows={3} className="mt-2 w-full resize-none border border-border bg-elevated p-3 text-sm text-primary outline-none focus:border-cyan-500" /></label>}
            <span className="mt-4 block text-xs text-secondary">更新表达式</span>
            <code className="mt-2 block min-h-20 break-words border border-border bg-elevated p-3 text-xs leading-6 text-primary">{code}</code>
          </section>
          <section className="border border-emerald-500/40 bg-emerald-500/10 p-4" aria-live="polite">
            <span className="text-xs text-secondary">HashMap entries（迭代顺序不作契约）</span>
            <div className="mt-3 space-y-2">
              {entries.map(([key, value]) => <div key={key} className="grid min-h-10 grid-cols-[1fr_auto] items-center gap-3 border border-border bg-bg px-3 py-2 text-sm"><span className="break-words text-primary">{key}</span><strong className="text-primary">{value}</strong></div>)}
            </div>
            <p className="mt-5 border-t border-border pt-4 text-xs text-secondary">entry 在 Vacant/Occupied 间选择；or_insert 返回 `&mut V`，解引用后可原地累计。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">同一 key 只有一个 value；insert 覆盖，entry 可保留旧值或基于旧值更新。</figcaption>
    </figure>
  );
}
