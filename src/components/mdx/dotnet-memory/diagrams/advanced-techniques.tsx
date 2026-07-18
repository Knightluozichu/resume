"use client";

import { useState } from "react";

type BackingKind = "array" | "string" | "stack" | "native";

const backings: Record<BackingKind, { label: string; view: string; mutable: string; lifetime: string; async: string; tone: string }> = {
  array: { label: "T[] -> Span<T>", view: "managed array interior", mutable: "read/write", lifetime: "array strong root", async: "use Memory<T>", tone: "border-cyan-500/35 bg-cyan-500/10" },
  string: { label: "string -> ReadOnlySpan<char>", view: "string interior", mutable: "read-only", lifetime: "string strong root", async: "use ReadOnlyMemory<char>", tone: "border-violet-500/35 bg-violet-500/10" },
  stack: { label: "stackalloc -> Span<T>", view: "current stack frame", mutable: "read/write", lifetime: "frame scoped", async: "cannot cross await", tone: "border-amber-500/35 bg-amber-500/10" },
  native: { label: "pointer -> Span<T>", view: "unmanaged address", mutable: "depends on API", lifetime: "external owner", async: "owner must outlive work", tone: "border-rose-500/35 bg-rose-500/10" },
};

export function DnmSpanSliceLab() {
  const [backing, setBacking] = useState<BackingKind>("array");
  const [start, setStart] = useState(3);
  const [length, setLength] = useState(5);
  const selected = backings[backing];
  const cells = Array.from({ length: 12 }, (_, index) => index);
  const safeLength = Math.min(length, 12 - start);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 Span 后备存储" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(backings) as BackingKind[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={backing === item} onClick={() => setBacking(item)} className={`min-h-14 border px-2 py-2 text-xs transition-colors ${backing === item ? backings[item].tone + " text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{backings[item].label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[25rem] border border-border bg-background/60 p-4">
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
            {cells.map((index) => {
              const active = index >= start && index < start + safeLength;
              return <div key={index} className={`flex aspect-square min-h-10 items-center justify-center border text-sm ${active ? "border-emerald-500 bg-emerald-500/20 text-primary" : "border-border bg-elevated text-secondary"}`}>{index}</div>;
            })}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <div className={`min-h-24 border p-3 ${selected.tone}`}><span className="text-xs text-secondary">view</span><strong className="mt-2 block text-sm text-primary">{selected.view}</strong></div>
            <div className="min-h-24 border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">mutation</span><strong className="mt-2 block text-sm text-primary">{selected.mutable}</strong></div>
            <div className="min-h-24 border border-violet-500/35 bg-violet-500/10 p-3"><span className="text-xs text-secondary">lifetime</span><strong className="mt-2 block text-sm text-primary">{selected.lifetime}</strong></div>
            <div className="min-h-24 border border-amber-500/35 bg-amber-500/10 p-3"><span className="text-xs text-secondary">async boundary</span><strong className="mt-2 block text-sm text-primary">{selected.async}</strong></div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-xs text-secondary">slice start: {start}<input className="mt-2 block w-full accent-emerald-500" type="range" min={0} max={11} value={start} onChange={(event) => setStart(Number(event.target.value))} /></label>
            <label className="text-xs text-secondary">requested length: {length}, actual: {safeLength}<input className="mt-2 block w-full accent-cyan-500" type="range" min={1} max={12} value={length} onChange={(event) => setLength(Number(event.target.value))} /></label>
          </div>
          <p className="mb-0 mt-5 border-t border-border pt-4 text-sm text-secondary">Slice 只复制 view 的 reference/offset/length，不复制绿色元素；任何消费者都受同一 backing storage 与 owner 生命周期约束。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">切换数组、字符串、栈和本机后备，观察同一 Span API 背后的可变性、所有权与 async 边界。</figcaption>
    </figure>
  );
}

type LeaseScenario = "sync" | "async" | "owner-transfer" | "pool-return";

const leases: Record<LeaseScenario, { label: string; owner: string; consumer: string; lease: string; end: string; violation: string; stages: string[] }> = {
  sync: { label: "sync Span", owner: "caller", consumer: "callee", lease: "method call", end: "return", violation: "callee retains view", stages: ["owner creates", "Span passed", "callee consumes", "returns", "owner continues"] },
  async: { label: "async Memory", owner: "caller", consumer: "async operation", lease: "until Task terminal", end: "success/fault/cancel", violation: "owner mutates early", stages: ["owner creates", "Memory passed", "Task pending", "Task terminal", "lease ends"] },
  "owner-transfer": { label: "IMemoryOwner transfer", owner: "receiver after call", consumer: "receiver", lease: "until receiver Dispose", end: "Dispose once", violation: "sender keeps using", stages: ["sender rents", "owner passed", "ownership moves", "receiver uses", "receiver disposes"] },
  "pool-return": { label: "ArrayPool lease", owner: "renting scope", consumer: "current operation", lease: "Rent to Return", end: "finally Return", violation: "use after Return", stages: ["Rent", "slice valid length", "consume", "clear if needed", "Return"] },
};

export function DnmBufferLeaseLab() {
  const [scenario, setScenario] = useState<LeaseScenario>("async");
  const selected = leases[scenario];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择缓冲区所有权情景" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(leases) as LeaseScenario[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={scenario === item} onClick={() => setScenario(item)} className={`min-h-14 border px-2 py-2 text-xs transition-colors ${scenario === item ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{leases[item].label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[25rem] border border-border bg-background/60 p-4">
          <div className="grid gap-2 sm:grid-cols-5">
            {selected.stages.map((stage, index) => <div key={`${stage}-${index}`} className={`flex min-h-24 items-center justify-center border p-3 text-center text-xs ${index === selected.stages.length - 1 ? "border-emerald-500/35 bg-emerald-500/10 text-primary" : "border-cyan-500/35 bg-cyan-500/10 text-primary"}`}>{index + 1}. {stage}</div>)}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <div className="min-h-24 border border-border bg-elevated p-3"><span className="text-xs text-secondary">owner</span><strong className="mt-2 block text-sm text-primary">{selected.owner}</strong></div>
            <div className="min-h-24 border border-border bg-elevated p-3"><span className="text-xs text-secondary">consumer</span><strong className="mt-2 block text-sm text-primary">{selected.consumer}</strong></div>
            <div className="min-h-24 border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">lease / end</span><strong className="mt-2 block text-sm text-primary">{selected.lease} / {selected.end}</strong></div>
            <div className="min-h-24 border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-xs text-secondary">invalid action</span><strong className="mt-2 block text-sm text-primary">{selected.violation}</strong></div>
          </div>
          <p className="mb-0 mt-5 border-t border-border pt-4 text-sm text-secondary">Buffer 可以有多个先后消费者，但同一时刻只有一个 owner；转移 IMemoryOwner 后，发送方既不能继续使用，也不能再 Dispose。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">比较同步借用、异步 lease、owner 转移与 ArrayPool 归还；类型只表达一部分，终止时点必须写进 API 契约。</figcaption>
    </figure>
  );
}

type PipelineMode = "allocate" | "span" | "pooled" | "segmented";

const pipelines: Record<PipelineMode, { label: string; allocPerRequest: number; copies: number; owner: string; tradeoff: string }> = {
  allocate: { label: "Split + Substring", allocPerRequest: 7, copies: 3, owner: "each temporary object", tradeoff: "simple, but allocation rate scales with requests" },
  span: { label: "ReadOnlySpan parse", allocPerRequest: 0, copies: 0, owner: "input owner", tradeoff: "synchronous and contiguous; parsed values must not retain view" },
  pooled: { label: "ArrayPool scratch", allocPerRequest: 0, copies: 1, owner: "Rent/Return scope", tradeoff: "bounded reuse; stale data and use-after-return are risks" },
  segmented: { label: "ReadOnlySequence", allocPerRequest: 0, copies: 0, owner: "pipeline segments", tradeoff: "handles multi-segment input; parser must advance positions correctly" },
};

export function DnmAllocationPipelineLab() {
  const [mode, setMode] = useState<PipelineMode>("span");
  const [rate, setRate] = useState(25_000);
  const selected = pipelines[mode];
  const allocations = selected.allocPerRequest * rate;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择解析管线" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(pipelines) as PipelineMode[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={mode === item} onClick={() => setMode(item)} className={`min-h-14 border px-2 py-2 text-xs transition-colors ${mode === item ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{pipelines[item].label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[25rem] border border-border bg-background/60 p-4">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="min-h-28 border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">requests / second</span><strong className="mt-3 block text-xl text-primary">{rate.toLocaleString()}</strong></div>
            <div className="min-h-28 border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-xs text-secondary">temporary objects / second</span><strong className="mt-3 block text-xl text-primary">{allocations.toLocaleString()}</strong></div>
            <div className="min-h-28 border border-violet-500/35 bg-violet-500/10 p-3"><span className="text-xs text-secondary">payload copies</span><strong className="mt-3 block text-xl text-primary">{selected.copies}</strong></div>
            <div className="min-h-28 border border-amber-500/35 bg-amber-500/10 p-3"><span className="text-xs text-secondary">owner</span><strong className="mt-3 block text-sm text-primary">{selected.owner}</strong></div>
          </div>
          <label htmlFor="dnm-pipeline-rate" className="mt-5 block text-xs text-secondary">请求速率：{rate.toLocaleString()} /s</label>
          <input id="dnm-pipeline-rate" className="mt-2 w-full accent-emerald-500" type="range" min={1_000} max={100_000} step={1_000} value={rate} onChange={(event) => setRate(Number(event.target.value))} />
          <div className="mt-5 border border-border bg-elevated p-4 text-sm text-secondary">{selected.tradeoff} 零分配只说明 managed allocation 计数，不代表没有边界检查、扫描、复制、池保留或生命周期复杂度。</div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">调整吞吐并切换解析方式，区分临时对象、数据复制和 owner 风险；优化目标是管线总成本，而非单一 allocation 数字。</figcaption>
    </figure>
  );
}
