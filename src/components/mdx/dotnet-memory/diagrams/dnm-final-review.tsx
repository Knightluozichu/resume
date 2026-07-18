"use client";

import { useState } from "react";

type Incident = "allocation" | "pause" | "retention" | "native";

const incidents: Record<Incident, { label: string; detect: string; correlate: string; prove: string; fix: string; chapters: string }> = {
  allocation: { label: "高分配/高 CPU", detect: "allocation rate + Gen 0", correlate: "allocation tick / stack", prove: "hot type + call site", fix: "remove materialization or bounded pool", chapters: "Ch3, 6, 13-14" },
  pause: { label: "长 GC 暂停", detect: "pause p99 + GC kind", correlate: "GCStart/Stop + SuspendEE", prove: "survival/pins/fragmentation", fix: "reduce cause before flavor tuning", chapters: "Ch3, 5, 7-11" },
  retention: { label: "回收后堆增长", detect: "post-GC low-water", correlate: "type delta across snapshots", prove: "representative root path", fix: "change owner/lifetime", chapters: "Ch3, 8, 12, 15" },
  native: { label: "RSS/native 增长", detect: "RSS vs managed/commit", correlate: "native owner and allocation", prove: "release path / mapping", fix: "Dispose/SafeHandle/limit", chapters: "Ch2-3, 12, 15" },
};

export function DnmIncidentTriageLab() {
  const [incident, setIncident] = useState<Incident>("retention");
  const selected = incidents[incident];
  const stages = [
    { name: "detect", detail: selected.detect, tone: "border-cyan-500/35 bg-cyan-500/10" },
    { name: "correlate", detail: selected.correlate, tone: "border-violet-500/35 bg-violet-500/10" },
    { name: "prove", detail: selected.prove, tone: "border-amber-500/35 bg-amber-500/10" },
    { name: "intervene", detail: selected.fix, tone: "border-emerald-500/35 bg-emerald-500/10" },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择综合内存故障" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(incidents) as Incident[]).map((item) => <button key={item} type="button" role="tab" aria-selected={incident === item} onClick={() => setIncident(item)} className={`min-h-14 border px-2 py-2 text-xs transition-colors ${incident === item ? "border-rose-500 bg-rose-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{incidents[item].label}</button>)}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[25rem] border border-border bg-background/60 p-4">
          <div className="grid gap-3 sm:grid-cols-4">
            {stages.map((stage, index) => <div key={stage.name} className={`min-h-36 border p-4 ${stage.tone}`}><span className="text-xs text-secondary">{index + 1}. {stage.name}</span><strong className="mt-4 block text-sm text-primary">{stage.detail}</strong></div>)}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="border border-border bg-elevated p-4"><span className="text-xs text-secondary">chapter route</span><strong className="mt-2 block text-primary">{selected.chapters}</strong></div>
            <div className="border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">closure</span><strong className="mt-2 block text-primary">same load, same window, correctness + p99 + heap/RSS</strong></div>
          </div>
          <p className="mb-0 mt-5 text-sm text-secondary">任何路线都不从“调哪个开关”开始；先找到时间窗，再用机制证据把现象缩成可证伪假设。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">选择高分配、长暂停、逻辑保留或 native 增长，沿 detect-correlate-prove-intervene 完成跨章诊断闭环。</figcaption>
    </figure>
  );
}

type GcPhase = "trigger" | "mark" | "plan" | "reclaim" | "resume";

const gcPhases: Record<GcPhase, { label: string; input: string; invariant: string; failure: string; evidence: string; chapters: string }> = {
  trigger: { label: "Trigger + suspend", input: "allocation budget / induced / pressure", invariant: "selected generations and threads reach safe suspension", failure: "long SuspendEE or wrong generation assumption", evidence: "GCStart reason/type + suspension", chapters: "Ch5-7, 11, 15" },
  mark: { label: "Mark", input: "roots, handles, cards, finalization", invariant: "all reachable objects marked, dead graph excluded", failure: "unexpected root or dirty-card work", evidence: "roots/gchandles + survival", chapters: "Ch8, 12" },
  plan: { label: "Plan", input: "live layout, gaps, pins, heap kind", invariant: "non-overlapping relocation or valid sweep plan", failure: "pins split plugs and reduce compact benefit", evidence: "fragmentation + pin count + compact decision", chapters: "Ch5, 9" },
  reclaim: { label: "Sweep / compact", input: "free ranges or relocation map", invariant: "references and object addresses stay consistent", failure: "free blocks unusable or raw pointer stale", evidence: "Compacted + generation before/after", chapters: "Ch10, 13" },
  resume: { label: "Rebuild + resume", input: "new boundaries, budgets, cards", invariant: "mutators see valid heap and owners remain correct", failure: "pause/throughput or post-GC low-water regresses", evidence: "GCStop + heap stats + request p99", chapters: "Ch7, 10-11" },
};

export function DnmGcReconstructionLab() {
  const [phase, setPhase] = useState<GcPhase>("plan");
  const selected = gcPhases[phase];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 GC 重建阶段" className="grid grid-cols-5 gap-2">
          {(Object.keys(gcPhases) as GcPhase[]).map((item) => <button key={item} type="button" role="tab" aria-selected={phase === item} onClick={() => setPhase(item)} className={`min-h-14 border px-1 py-2 text-xs transition-colors ${phase === item ? "border-violet-500 bg-violet-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{gcPhases[item].label}</button>)}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[26rem] border border-border bg-background/60 p-4">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="min-h-32 border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">input</span><p className="mb-0 mt-3 text-sm text-primary">{selected.input}</p></div>
            <div className="min-h-32 border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">must remain true</span><p className="mb-0 mt-3 text-sm text-primary">{selected.invariant}</p></div>
            <div className="min-h-32 border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-xs text-secondary">failure</span><p className="mb-0 mt-3 text-sm text-primary">{selected.failure}</p></div>
            <div className="min-h-32 border border-amber-500/35 bg-amber-500/10 p-3"><span className="text-xs text-secondary">evidence</span><p className="mb-0 mt-3 text-sm text-primary">{selected.evidence}</p></div>
          </div>
          <div className="mt-5 grid grid-cols-5 gap-2">{(Object.keys(gcPhases) as GcPhase[]).map((item, index) => <div key={item} className={`flex h-16 items-center justify-center border text-xs ${item === phase ? "border-violet-500 bg-violet-500/20 text-primary" : "border-border bg-elevated text-secondary"}`}>{index + 1}</div>)}</div>
          <div className="mt-4 border border-border bg-elevated p-4 text-sm text-secondary">回读：{selected.chapters}。每个阶段都要能说出输入、不变量、失败形态和可观测证据。</div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">从触发/挂起到恢复逐阶段重建一次 GC；用不变量区分“运行时做了什么”和“应用为何付出成本”。</figcaption>
    </figure>
  );
}

type Intervention = "reduce" | "pool" | "lifetime" | "config" | "no-gc";

const interventions: Record<Intervention, { label: string; target: string; benefit: string; cost: string; prerequisite: string; rollback: string }> = {
  reduce: { label: "减少物化/复制", target: "hot allocation site", benefit: "lower allocation and bandwidth", cost: "ref/span lifetime complexity", prerequisite: "stack proves temporary materialization", rollback: "correctness, CPU or p99 regression" },
  pool: { label: "池化 buffer", target: "repeated bounded buffers", benefit: "fewer arrays and LOH churn", cost: "RSS high-water, stale data, lease bugs", prerequisite: "Rent/Return ownership closes", rollback: "pool retention or use-after-return" },
  lifetime: { label: "修复 owner/root", target: "post-GC retained graph", benefit: "lower long-lived heap/native use", cost: "API ownership changes", prerequisite: "representative root/release proof", rollback: "behavioral contract breaks" },
  config: { label: "调整 GC flavor/config", target: "measured topology mismatch", benefit: "throughput/latency tradeoff", cost: "CPU, RSS and pause shift", prerequisite: "same-load A/B and actual config verified", rollback: "p99/throughput/RSS threshold" },
  "no-gc": { label: "NoGCRegion", target: "short bounded critical path", benefit: "suppressed GC in accepted window", cost: "reserved budget and failure state", prerequisite: "SOH/LOH budget + fallback", rollback: "low start rate, overrun or End failure" },
};

export function DnmInterventionTradeoffLab() {
  const [intervention, setIntervention] = useState<Intervention>("lifetime");
  const selected = interventions[intervention];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择内存干预" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {(Object.keys(interventions) as Intervention[]).map((item) => <button key={item} type="button" role="tab" aria-selected={intervention === item} onClick={() => setIntervention(item)} className={`min-h-14 border px-2 py-2 text-xs transition-colors ${intervention === item ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{interventions[item].label}</button>)}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[25rem] border border-border bg-background/60 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="min-h-28 border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">target</span><strong className="mt-3 block text-primary">{selected.target}</strong></div>
            <div className="min-h-28 border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">expected benefit</span><strong className="mt-3 block text-primary">{selected.benefit}</strong></div>
            <div className="min-h-28 border border-amber-500/35 bg-amber-500/10 p-3"><span className="text-xs text-secondary">new cost</span><strong className="mt-3 block text-primary">{selected.cost}</strong></div>
            <div className="min-h-28 border border-violet-500/35 bg-violet-500/10 p-3"><span className="text-xs text-secondary">entry gate</span><strong className="mt-3 block text-primary">{selected.prerequisite}</strong></div>
          </div>
          <div className="mt-5 border border-rose-500/35 bg-rose-500/10 p-4 text-sm text-primary"><span className="text-xs text-secondary">rollback when</span><strong className="mt-2 block">{selected.rollback}</strong></div>
          <p className="mb-0 mt-5 text-sm text-secondary">优化改变的是成本分布，不会消除成本；必须同时验收正确性、CPU、吞吐、p99、heap/RSS 和运维复杂度。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">比较减少物化、池化、修复生命周期、GC 配置与 no-GC region；每个方案都有进入证据、新成本和回滚线。</figcaption>
    </figure>
  );
}
