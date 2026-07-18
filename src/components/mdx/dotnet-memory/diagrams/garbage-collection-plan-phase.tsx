"use client";

import { useState } from "react";

const layout = [
  { id: "gap-0", kind: "gap", size: 1, oldStart: 0, newStart: null },
  { id: "plug-A", kind: "plug", size: 3, oldStart: 1, newStart: 0 },
  { id: "gap-1", kind: "gap", size: 2, oldStart: 4, newStart: null },
  { id: "plug-B", kind: "plug", size: 2, oldStart: 6, newStart: 3 },
  { id: "gap-2", kind: "gap", size: 1, oldStart: 8, newStart: null },
  { id: "plug-C", kind: "plug", size: 2, oldStart: 9, newStart: 5 },
] as const;

export function DnmPlugGapPlanMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="img" aria-label="标记结果被分组为连续存活 plug 和前置 gap，并为每个 plug 计算压缩目标地址" className="space-y-5">
          <section className="border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">marked heap · old addresses</span>
            <div className="mt-3 flex min-h-24 overflow-hidden border border-border">
              {layout.map((item) => (
                <div key={item.id} style={{ flex: item.size }} className={`flex min-w-12 flex-col items-center justify-center border-r border-border px-2 text-center text-xs ${item.kind === "plug" ? "bg-emerald-500/15 text-primary" : "bg-rose-500/10 text-secondary"}`}>
                  <strong>{item.id}</strong>
                  <span className="mt-1">@{item.oldStart}</span>
                </div>
              ))}
            </div>
          </section>
          <div className="grid gap-3 sm:grid-cols-3">
            {layout.filter((item) => item.kind === "plug").map((item) => (
              <div key={item.id} className="border border-violet-500/35 bg-violet-500/10 p-3 text-xs text-secondary">
                <strong className="block text-primary">{item.id}</strong>
                <span className="mt-2 block">plan: old @{item.oldStart} → new @{item.newStart}</span>
              </div>
            ))}
          </div>
          <section className="border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">planned compacted layout · no bytes moved yet</span>
            <div className="mt-3 flex min-h-24 overflow-hidden border border-border">
              {layout.filter((item) => item.kind === "plug").map((item) => (
                <div key={item.id} style={{ flex: item.size }} className="flex min-w-16 flex-col items-center justify-center border-r border-border bg-cyan-500/15 px-2 text-center text-xs text-primary">
                  <strong>{item.id}</strong>
                  <span className="mt-1">target @{item.newStart}</span>
                </div>
              ))}
              <div style={{ flex: 4 }} className="flex min-w-20 items-center justify-center bg-background text-xs text-secondary">contiguous free tail</div>
            </div>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Plan Phase 把相邻存活对象归成 plugs，并利用其前置 gaps 保存/关联重定位信息；这里只计算目标，不执行复制。
      </figcaption>
    </figure>
  );
}

export function DnmCompactionDecisionLab() {
  const [fragmentation, setFragmentation] = useState(28);
  const [survival, setSurvival] = useState(42);
  const [pinned, setPinned] = useState(4);
  const [memoryLoad, setMemoryLoad] = useState(65);

  const reclaimOpportunity = fragmentation * (100 - survival) / 100;
  const moveCost = survival * (1 + pinned / 25);
  const pressureBenefit = reclaimOpportunity * (0.6 + memoryLoad / 100);
  const compactScore = pressureBenefit - moveCost * 0.35 - pinned * 0.8;
  const choice = compactScore >= 0 ? "Compact 候选" : "Sweep 候选";
  const detail = compactScore >= 0
    ? "碎片与内存负载带来的连续空间收益，高于当前存活搬运和 pin 障碍的示意成本。"
    : "存活搬运或 pin 障碍较高，保留地址并重建 free list 的示意成本更低。";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.92fr]">
          <div className="space-y-5">
            <label className="block text-sm text-primary">碎片比例：{fragmentation}%<input type="range" min="0" max="70" value={fragmentation} onChange={(event) => setFragmentation(Number(event.target.value))} className="mt-2 w-full accent-rose-500" /></label>
            <label className="block text-sm text-primary">存活比例：{survival}%<input type="range" min="5" max="95" value={survival} onChange={(event) => setSurvival(Number(event.target.value))} className="mt-2 w-full accent-emerald-500" /></label>
            <label className="block text-sm text-primary">固定对象比例：{pinned}%<input type="range" min="0" max="40" value={pinned} onChange={(event) => setPinned(Number(event.target.value))} className="mt-2 w-full accent-amber-500" /></label>
            <label className="block text-sm text-primary">内存负载：{memoryLoad}%<input type="range" min="20" max="95" value={memoryLoad} onChange={(event) => setMemoryLoad(Number(event.target.value))} className="mt-2 w-full accent-violet-500" /></label>
          </div>
          <section aria-live="polite" className="min-h-96 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">illustrative plan</span>
            <strong className="mt-2 block text-xl text-primary">{choice}</strong>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-secondary">连续空间收益</span><strong className="mt-2 block text-primary">{pressureBenefit.toFixed(1)}</strong></div>
              <div className="border border-amber-500/35 bg-amber-500/10 p-3"><span className="text-secondary">搬运/固定成本</span><strong className="mt-2 block text-primary">{(moveCost * 0.35 + pinned * 0.8).toFixed(1)}</strong></div>
            </div>
            <p className="mt-5 text-sm text-secondary">{detail}</p>
            <p className="mb-0 mt-4 border-t border-border pt-4 text-xs text-secondary">此模型只训练权衡方向，不复刻 CLR 私有阈值。真实选择还受 heap kind、GC flavor、历史预算、硬限制与运行时版本影响。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先预测碎片、存活、pin 和内存负载如何改变策略，再调节参数；“空洞多”不自动意味着压缩一定更便宜。
      </figcaption>
    </figure>
  );
}

const cells = ["A", "A", "dead", "B", "B", "dead", "C", "C", "dead", "D", "D", "dead"] as const;

export function DnmPinnedRelocationLab() {
  const [pinnedPlug, setPinnedPlug] = useState<"none" | "B" | "C">("B");
  const targets = pinnedPlug === "none"
    ? { A: 0, B: 2, C: 4, D: 6 }
    : pinnedPlug === "B"
      ? { A: 0, B: 3, C: 5, D: 7 }
      : { A: 0, B: 2, C: 6, D: 8 };
  const retainedGap = pinnedPlug === "none" ? 0 : pinnedPlug === "B" ? 1 : 2;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择固定 plug" className="grid grid-cols-3 gap-2">
          {(["none", "B", "C"] as const).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={pinnedPlug === item} onClick={() => setPinnedPlug(item)} className={`min-h-12 border px-2 py-2 text-sm transition-colors ${pinnedPlug === item ? "border-amber-500 bg-amber-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {item === "none" ? "无固定" : `固定 plug ${item}`}
            </button>
          ))}
        </div>
        <section className="mt-4 border border-border bg-background/60 p-4">
          <span className="text-xs text-secondary">old layout</span>
          <div className="mt-3 grid grid-cols-12 gap-1">
            {cells.map((cell, index) => (
              <div key={`${cell}-${index}`} className={`flex min-h-16 items-center justify-center border text-xs ${cell === "dead" ? "border-border bg-rose-500/10 text-secondary" : cell === pinnedPlug ? "border-amber-500/45 bg-amber-500/20 text-primary" : "border-emerald-500/35 bg-emerald-500/10 text-primary"}`}>
                {cell === "dead" ? "gap" : cell}
              </div>
            ))}
          </div>
        </section>
        <section aria-live="polite" className="mt-4 border border-border bg-background/60 p-4">
          <span className="text-xs text-secondary">planned plug destinations</span>
          <div className="mt-3 grid gap-2 sm:grid-cols-4">
            {Object.entries(targets).map(([plug, target]) => (
              <div key={plug} className={`border p-3 text-xs ${plug === pinnedPlug ? "border-amber-500/45 bg-amber-500/15" : "border-cyan-500/35 bg-cyan-500/10"}`}>
                <strong className="text-primary">plug {plug}</strong>
                <span className="mt-2 block text-secondary">target cell {target}{plug === pinnedPlug ? " · immovable" : ""}</span>
              </div>
            ))}
          </div>
          <p className="mb-0 mt-4 border-t border-border pt-4 text-sm text-secondary">计划后仍保留 {retainedGap} 个示意 gap。固定 plug 是地址锚点，前后可分别压缩，但不能把它跨越搬走。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        切换固定锚点观察目标地址；pin 不会让整段都无法规划，但会切断连续搬运并可能留下不可合并空洞。
      </figcaption>
    </figure>
  );
}
