"use client";

import { useState } from "react";

type LayoutMode = "natural" | "packed" | "reordered";

const layouts: Record<LayoutMode, {
  label: string;
  size: number;
  fields: Array<{ name: string; from: number; width: number; tone: string }>;
  detail: string;
}> = {
  natural: {
    label: "Sequential / Pack=0",
    size: 24,
    fields: [
      { name: "byte Kind", from: 0, width: 1, tone: "bg-cyan-500/25" },
      { name: "padding", from: 1, width: 7, tone: "bg-amber-500/20" },
      { name: "double Value", from: 8, width: 8, tone: "bg-violet-500/25" },
      { name: "int Count", from: 16, width: 4, tone: "bg-emerald-500/25" },
      { name: "tail padding", from: 20, width: 4, tone: "bg-amber-500/20" },
    ],
    detail: "字段顺序不变；double 需要自然对齐，实例数组的每个元素因此占 24 bytes。",
  },
  packed: {
    label: "Sequential / Pack=1",
    size: 13,
    fields: [
      { name: "byte Kind", from: 0, width: 1, tone: "bg-cyan-500/25" },
      { name: "double Value", from: 1, width: 8, tone: "bg-violet-500/25" },
      { name: "int Count", from: 9, width: 4, tone: "bg-emerald-500/25" },
    ],
    detail: "去掉 padding 可缩小互操作布局，但产生非对齐访问；协议要求 Pack=1 时才应明确使用。",
  },
  reordered: {
    label: "Reordered / natural",
    size: 16,
    fields: [
      { name: "double Value", from: 0, width: 8, tone: "bg-violet-500/25" },
      { name: "int Count", from: 8, width: 4, tone: "bg-emerald-500/25" },
      { name: "byte Kind", from: 12, width: 1, tone: "bg-cyan-500/25" },
      { name: "tail padding", from: 13, width: 3, tone: "bg-amber-500/20" },
    ],
    detail: "按对齐从大到小排列，保持自然对齐并把大小降到 16 bytes；公开 ABI 不能随意改序。",
  },
};

export function DnmStructLayoutLab() {
  const [mode, setMode] = useState<LayoutMode>("natural");
  const [copies, setCopies] = useState(1_000_000);
  const layout = layouts[mode];
  const movedMiB = (layout.size * copies) / 1024 / 1024;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择结构体布局" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(Object.keys(layouts) as LayoutMode[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={mode === item} onClick={() => setMode(item)} className={`min-h-14 border px-3 py-2 text-sm transition-colors ${mode === item ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {layouts[item].label}
            </button>
          ))}
        </div>

        <section role="tabpanel" className="mt-4 min-h-[25rem] border border-border bg-background/60 p-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div><span className="text-xs text-secondary">computed instance size</span><strong className="mt-1 block text-2xl text-primary">{layout.size} bytes</strong></div>
            <div className="text-right"><span className="text-xs text-secondary">{copies.toLocaleString()} value copies</span><strong className="mt-1 block text-lg text-primary">{movedMiB.toFixed(1)} MiB moved</strong></div>
          </div>
          <div className="mt-5 grid grid-cols-8 gap-1 sm:grid-cols-12">
            {Array.from({ length: layout.size }, (_, offset) => {
              const field = layout.fields.find((candidate) => offset >= candidate.from && offset < candidate.from + candidate.width);
              return <div key={offset} title={`${offset}: ${field?.name ?? "padding"}`} className={`flex aspect-square min-h-8 items-center justify-center border border-border text-[10px] text-primary ${field?.tone ?? "bg-background"}`}>{offset}</div>;
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {layout.fields.map((field) => <span key={`${field.name}-${field.from}`} className={`border border-border px-2 py-1 text-xs text-primary ${field.tone}`}>{field.name}: {field.from}..{field.from + field.width - 1}</span>)}
          </div>
          <label className="mt-5 block text-xs text-secondary" htmlFor="dnm-copy-count">复制次数：{copies.toLocaleString()}</label>
          <input id="dnm-copy-count" className="mt-2 w-full accent-cyan-500" type="range" min={100_000} max={5_000_000} step={100_000} value={copies} onChange={(event) => setCopies(Number(event.target.value))} />
          <p className="mb-0 mt-4 border-t border-border pt-4 text-sm text-secondary">{layout.detail} 复制字节只是上界线索，最终是否应改为 ref/in 必须以 JIT 代码与基准验证。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换自然、紧凑与重排布局，观察 padding 如何同时影响数组密度、复制流量与互操作契约。</figcaption>
    </figure>
  );
}

type RefMode = "value" | "in" | "ref-return" | "ref-struct";

const refModes: Record<RefMode, {
  label: string;
  storage: string;
  alias: string;
  escape: string;
  mutation: string;
  risk: string;
}> = {
  value: { label: "value copy", storage: "caller value + callee copy", alias: "no alias", escape: "returned value owns its copy", mutation: "callee changes copy", risk: "large or repeated structs can move many bytes" },
  in: { label: "in / ref readonly", storage: "caller storage", alias: "readonly managed reference", escape: "normally call scoped", mutation: "no direct assignment", risk: "non-readonly members may trigger defensive copies" },
  "ref-return": { label: "ref local / return", storage: "owner storage", alias: "writable alias", escape: "cannot outlive referent", mutation: "writes update owner", risk: "collection resize can invalidate interior aliases" },
  "ref-struct": { label: "ref struct / scoped", storage: "stack-confined view", alias: "may contain ref fields", escape: "compiler-restricted", mutation: "depends on readonly modifiers", risk: "cannot cross an await/yield segment or boxing boundary" },
};

export function DnmRefLifetimeLab() {
  const [mode, setMode] = useState<RefMode>("ref-return");
  const selected = refModes[mode];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择值或引用传递方式" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(refModes) as RefMode[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={mode === item} onClick={() => setMode(item)} className={`min-h-14 border px-2 py-2 text-sm transition-colors ${mode === item ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{refModes[item].label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[25rem] border border-border bg-background/60 p-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_5rem_1fr_5rem_1fr] sm:items-center">
            <div className="min-h-32 border border-cyan-500/35 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">owner/storage</span><strong className="mt-3 block text-primary">{selected.storage}</strong></div>
            <div className="text-center text-xs text-secondary">{mode === "value" ? "copy ->" : "alias ->"}</div>
            <div className="min-h-32 border border-violet-500/35 bg-violet-500/10 p-4"><span className="text-xs text-secondary">callee/view</span><strong className="mt-3 block text-primary">{selected.alias}</strong></div>
            <div className="text-center text-xs text-secondary">escape?</div>
            <div className="min-h-32 border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">lifetime boundary</span><strong className="mt-3 block text-primary">{selected.escape}</strong></div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-24 border border-border bg-elevated p-3 text-sm"><span className="text-xs text-secondary">write semantics</span><p className="mb-0 mt-2 text-primary">{selected.mutation}</p></div>
            <div className="min-h-24 border border-rose-500/35 bg-rose-500/10 p-3 text-sm"><span className="text-xs text-secondary">failure mode</span><p className="mb-0 mt-2 text-primary">{selected.risk}</p></div>
          </div>
          <p className="mb-0 mt-5 border-t border-border pt-4 text-sm text-secondary">编译器证明引用不能比目标活得久；它不证明别名期间容器不会扩容，也不证明绕过复制一定更快。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">比较值复制、只读借用、可写别名和 byref-like 视图；核心问题始终是“存储归谁、别名能活多久”。</figcaption>
    </figure>
  );
}

type BoundaryStrategy = "copy" | "pin" | "stack";

const boundaryStrategies: Record<BoundaryStrategy, { label: string; address: string; gc: string; lifetime: string; bestFor: string; risk: string }> = {
  copy: { label: "copy to native", address: "native buffer stable", gc: "managed heap remains movable", lifetime: "native owner controls copied buffer", bestFor: "long or asynchronous native retention", risk: "allocation and copy bandwidth" },
  pin: { label: "fixed / pin", address: "managed address temporarily stable", gc: "compaction must route around pin", lifetime: "pointer valid only inside pin contract", bestFor: "short synchronous calls", risk: "long/high-count pins fragment or delay GC" },
  stack: { label: "stackalloc", address: "stack address stable for frame", gc: "no managed object to move", lifetime: "cannot escape stack frame", bestFor: "small bounded temporary buffers", risk: "large/unbounded size can exhaust stack" },
};

export function DnmInteropBoundaryLab() {
  const [strategy, setStrategy] = useState<BoundaryStrategy>("pin");
  const [duration, setDuration] = useState(2);
  const selected = boundaryStrategies[strategy];
  const pressure = strategy === "pin" ? (duration <= 5 ? "low" : duration <= 30 ? "rising" : "high") : strategy === "copy" ? "copy cost" : "stack bound";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择托管到本机边界策略" className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {(Object.keys(boundaryStrategies) as BoundaryStrategy[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={strategy === item} onClick={() => setStrategy(item)} className={`min-h-14 border px-3 py-2 text-sm transition-colors ${strategy === item ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{boundaryStrategies[item].label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[25rem] border border-border bg-background/60 p-4">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="min-h-28 border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">address</span><p className="mb-0 mt-3 text-sm text-primary">{selected.address}</p></div>
            <div className="min-h-28 border border-violet-500/35 bg-violet-500/10 p-3"><span className="text-xs text-secondary">GC effect</span><p className="mb-0 mt-3 text-sm text-primary">{selected.gc}</p></div>
            <div className="min-h-28 border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">lifetime</span><p className="mb-0 mt-3 text-sm text-primary">{selected.lifetime}</p></div>
            <div className="min-h-28 border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-xs text-secondary">risk</span><p className="mb-0 mt-3 text-sm text-primary">{selected.risk}</p></div>
          </div>
          <div className="mt-5 border border-border bg-elevated p-4">
            <div className="flex flex-wrap items-end justify-between gap-2"><label htmlFor="dnm-native-duration" className="text-xs text-secondary">本机持有窗口：{duration} ms</label><strong className="text-sm text-primary">pressure: {pressure}</strong></div>
            <input id="dnm-native-duration" className="mt-3 w-full accent-emerald-500" type="range" min={1} max={100} value={duration} onChange={(event) => setDuration(Number(event.target.value))} />
          </div>
          <div className="mt-4 border border-amber-500/35 bg-amber-500/10 p-4 text-sm text-primary">推荐窗口：{selected.bestFor}。如果本机代码在调用返回后仍保存指针，fixed 作用域再短也不安全，必须转移/复制到有明确 owner 的存储。</div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">用持有时长比较复制、短期固定与栈缓冲；地址稳定性、所有权和 GC 代价必须一起决定。</figcaption>
    </figure>
  );
}
