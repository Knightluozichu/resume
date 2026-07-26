"use client";

import { useState } from "react";

export interface GpuProSnapshot {
  readonly label: string;
  readonly stage: string;
  readonly action: string;
  readonly evidence: string;
  readonly warning: string;
}

export function GpuProSeriesLab({ title, mode, snapshots, initial = 0 }: { title: string; mode: "map" | "tradeoff" | "evidence"; snapshots: ReadonlyArray<GpuProSnapshot>; initial?: number }) {
  const [active, setActive] = useState(Math.min(initial, snapshots.length - 1));
  function resetExperiment() {
    setActive(Math.min(initial, snapshots.length - 1));
  }

  const current = snapshots[active];
  return <figure className="mdx-figure not-prose mx-auto my-6">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
    <div className="overflow-hidden rounded-card border border-border bg-elevated">
      <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div><strong className="block text-sm text-primary">{title}</strong><span className="mt-1 block text-xs uppercase text-secondary">GPU Pro 1-7 · {mode}</span></div>
        <span className="rounded-control border border-emerald-500/35 bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">official inventory evidence</span>
      </header>
      <div role="tablist" aria-label={title} className="grid grid-cols-5 border-b border-border">
        {snapshots.map((snapshot, index) => <button key={snapshot.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={"min-h-12 border-r border-border px-2 py-2 text-xs font-semibold last:border-r-0 " + (active === index ? "bg-accent/15 text-accent" : "bg-bg/35 text-secondary hover:bg-bg/70")}>{snapshot.label}</button>)}
      </div>
      <div className="grid min-h-56 md:grid-cols-[1.25fr_.75fr]">
        <section className="border-b border-border p-5 md:border-b-0 md:border-r">
          <span className="text-xs font-semibold uppercase text-accent">{String(active + 1).padStart(2, "0")} / {String(snapshots.length).padStart(2, "0")}</span>
          <h3 className="mt-3 text-base font-semibold text-primary">{current.stage}</h3>
          <p className="mt-3 text-sm leading-6 text-secondary">{current.action}</p>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-border"><div className="h-full bg-accent transition-[width]" style={{ width: ((active + 1) / snapshots.length * 100) + "%" }} /></div>
        </section>
        <aside className="grid content-start gap-4 bg-bg/30 p-5">
          <div><span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">EVIDENCE</span><p className="mt-1 text-sm leading-6 text-primary">{current.evidence}</p></div>
          <div className="border-l-2 border-amber-500 pl-3"><span className="text-xs font-semibold text-amber-700 dark:text-amber-300">BOUNDARY</span><p className="mt-1 text-xs leading-5 text-secondary">{current.warning}</p></div>
        </aside>
      </div>
    </div>
    <figcaption className="mt-2 text-center text-sm text-secondary">点击阶段，对照官方身份、算法不变量、现代实现和运行证据。</figcaption>
  </figure>;
}
