"use client";

import { useState } from "react";

type ExecutionMode = "sweep" | "compact";

const executionStages = {
  sweep: [
    { name: "scan plan", detail: "保留 marked objects 的原地址，识别连续 dead ranges", tone: "border-cyan-500/35 bg-cyan-500/10" },
    { name: "coalesce", detail: "把相邻 dead objects 合并成可遍历 free objects", tone: "border-amber-500/35 bg-amber-500/10" },
    { name: "rebuild lists", detail: "按 heap/size 维护 free-list entries 与分配元数据", tone: "border-violet-500/35 bg-violet-500/10" },
    { name: "trim", detail: "处理空 segment 和可 decommit tail，刷新边界后恢复", tone: "border-emerald-500/35 bg-emerald-500/10" },
  ],
  compact: [
    { name: "relocate roots", detail: "依据 plug plans 更新栈、句柄、静态等外部引用", tone: "border-cyan-500/35 bg-cyan-500/10" },
    { name: "relocate fields", detail: "扫描 live objects，把内部引用改为目标地址", tone: "border-violet-500/35 bg-violet-500/10" },
    { name: "move plugs", detail: "按重叠安全顺序把可移动 plugs 复制到计划目标", tone: "border-rose-500/35 bg-rose-500/10" },
    { name: "rebuild boundaries", detail: "刷新代起点、allocation pointer、cards/bricks 后恢复", tone: "border-emerald-500/35 bg-emerald-500/10" },
  ],
} as const;

export function DnmSweepCompactExecutionMap() {
  const [mode, setMode] = useState<ExecutionMode>("compact");
  const stages = executionStages[mode];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 Sweep 或 Compact 执行路径" className="grid grid-cols-2 gap-2">
          {(["sweep", "compact"] as const).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={mode === item} onClick={() => setMode(item)} className={`min-h-12 border px-3 py-2 text-sm transition-colors ${mode === item ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item === "sweep" ? "Sweep · 保持地址" : "Compact · 执行移动"}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <section key={stage.name} className={`min-h-48 border p-4 ${stage.tone}`}>
              <span className="text-xs text-secondary">phase 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{stage.name}</strong>
              <p className="mb-0 mt-4 text-xs text-secondary">{stage.detail}</p>
            </section>
          ))}
        </div>
        <div className="mt-4 border border-border bg-background/60 p-4 text-xs text-secondary">
          {mode === "sweep" ? "结果：live addresses 稳定；内部 gaps 进入 free list，连续尾部/空 segment 可另行回收。" : "结果：所有受 GC 管理的引用与移动后对象一致；free tail 连续，pinned anchors 保持原址。"}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换执行路径查看顺序；Sweep 与 Compact 共享 Mark/Plan 输入，但产生完全不同的地址和空闲空间结果。
      </figcaption>
    </figure>
  );
}

const relocationSteps = [
  { label: "plan ready", root: "0x120", field: "0x180", objectA: "0x120", objectB: "0x180", note: "计划已知 A→0x100、B→0x140，但引用和对象内容仍在旧址。" },
  { label: "roots relocated", root: "0x100", field: "0x180", objectA: "0x120", objectB: "0x180", note: "栈/句柄/静态根先依据 plug mapping 指向 A 的目标地址。" },
  { label: "fields relocated", root: "0x100", field: "0x140", objectA: "0x120", objectB: "0x180", note: "扫描 live A，把 A.Next 从 B 旧址改为 B 目标地址；更新后的字段稍后随 A 一起复制。" },
  { label: "plugs moved", root: "0x100", field: "0x140", objectA: "0x100", objectB: "0x140", note: "A/B 内容移动到目标；所有托管根和字段现在与新布局一致。" },
  { label: "metadata rebuilt", root: "0x100", field: "0x140", objectA: "0x100", objectB: "0x140", note: "代边界、allocation pointer、cards/bricks 和尾部空闲状态更新，线程才可恢复。" },
] as const;

export function DnmReferenceRelocationLab() {
  const [step, setStep] = useState(0);
  const state = relocationSteps[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <label className="block text-sm text-primary">执行步骤：{step + 1}/{relocationSteps.length} · {state.label}<input type="range" min="0" max={relocationSteps.length - 1} value={step} onChange={(event) => setStep(Number(event.target.value))} className="mt-2 w-full accent-cyan-500" /></label>
        <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <section aria-live="polite" className="min-h-80 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">managed references</span>
            <div className="mt-4 space-y-3 text-xs">
              <div className="border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-secondary">root → A</span><strong className="mt-2 block text-primary">{state.root}</strong></div>
              <div className="border border-violet-500/35 bg-violet-500/10 p-3"><span className="text-secondary">A.Next → B</span><strong className="mt-2 block text-primary">{state.field}</strong></div>
            </div>
          </section>
          <section className="min-h-80 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">object bytes</span>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className={`border p-4 ${state.objectA === "0x100" ? "border-emerald-500/45 bg-emerald-500/15" : "border-amber-500/35 bg-amber-500/10"}`}><strong className="text-primary">object A</strong><span className="mt-2 block text-secondary">current {state.objectA}</span><span className="mt-1 block text-secondary">target 0x100</span></div>
              <div className={`border p-4 ${state.objectB === "0x140" ? "border-emerald-500/45 bg-emerald-500/15" : "border-amber-500/35 bg-amber-500/10"}`}><strong className="text-primary">object B</strong><span className="mt-2 block text-secondary">current {state.objectB}</span><span className="mt-1 block text-secondary">target 0x140</span></div>
            </div>
            <p className="mb-0 mt-5 border-t border-border pt-4 text-sm text-secondary">{state.note}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        拖动步骤观察“先把受管引用改到目标，再移动对象内容”的一致性链；裸 native pointer 不在这条自动更新链中。
      </figcaption>
    </figure>
  );
}

export function DnmFreeListRebuildLab() {
  const [requestSize, setRequestSize] = useState(64);
  const [coalesce, setCoalesce] = useState(true);
  const rawHoles = [24, 48, 32, 96, 160];
  const holes = coalesce ? [24, 80, 96, 160] : rawHoles;
  const selectedIndex = holes.findIndex((size) => size >= requestSize);
  const selectedSize = selectedIndex >= 0 ? holes[selectedIndex] : null;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <label className="block text-sm text-primary">请求大小：{requestSize} KB<input type="range" min="16" max="192" step="8" value={requestSize} onChange={(event) => setRequestSize(Number(event.target.value))} className="mt-2 w-full accent-violet-500" /></label>
            <label className="mt-5 flex min-h-11 items-center gap-3 border border-border bg-background/60 px-3 text-sm text-primary"><input type="checkbox" checked={coalesce} onChange={(event) => setCoalesce(event.target.checked)} className="size-4 accent-cyan-500" />合并相邻 48 KB + 32 KB 死区</label>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {holes.map((size, index) => (
                <div key={`${size}-${index}`} className={`flex min-h-20 flex-col items-center justify-center border text-xs ${index === selectedIndex ? "border-emerald-500/45 bg-emerald-500/15 text-primary" : "border-border bg-background text-secondary"}`}><strong>{size} KB</strong><span className="mt-1">free</span></div>
              ))}
            </div>
          </div>
          <section aria-live="polite" className="min-h-72 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">allocation result</span>
            <strong className="mt-2 block text-xl text-primary">{selectedSize === null ? "当前 free list 无匹配块" : `使用 ${selectedSize} KB 空洞`}</strong>
            <p className="mt-5 text-sm text-secondary">{selectedSize === null ? "即使总 free bytes 足够，也可能因没有单个连续块而扩展 segment 或触发 GC。" : `满足 ${requestSize} KB 后剩余 ${selectedSize - requestSize} KB；余量只有达到可表示/复用条件时才继续入链。`}</p>
            <p className="mb-0 mt-4 border-t border-border pt-4 text-xs text-secondary">这里用首个可容纳块演示，不承诺 CLR 的具体 size class、搜索顺序或拆分阈值。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        调节请求并切换相邻死区合并；Sweep 回收的是可复用区间，能否满足分配还取决于单块尺寸，而非 free bytes 总和。
      </figcaption>
    </figure>
  );
}
