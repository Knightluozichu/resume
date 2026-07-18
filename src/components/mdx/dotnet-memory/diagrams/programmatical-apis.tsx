"use client";

import { useState } from "react";

type ApiIntent = "observe" | "collect" | "pressure" | "no-gc" | "refresh";

const apiIntents: Record<ApiIntent, { label: string; api: string; precondition: string; effect: string; verify: string; risk: string }> = {
  observe: { label: "Observe", api: "GetGCMemoryInfo / counters", precondition: "define GCKind and time window", effect: "reads a snapshot or cumulative value", verify: "correlate Index + timestamps + events", risk: "mixing process, heap and last-GC scopes" },
  collect: { label: "Request GC", api: "GC.Collect overload", precondition: "rare measured scenario", effect: "requests a generation/mode; runtime still decides details", verify: "CollectionCount + GCStart/Stop + pause", risk: "promotion, pause and throughput loss" },
  pressure: { label: "Native pressure", api: "Add / RemoveMemoryPressure", precondition: "large native allocation paired exactly", effect: "influences GC scheduling heuristics", verify: "native bytes + Gen 2 + release path", risk: "unbalanced calls or double accounting" },
  "no-gc": { label: "No GC region", api: "TryStart / EndNoGCRegion", precondition: "bounded SOH/LOH budget and no nesting", effect: "attempts to suppress GC in critical path", verify: "start result, allocations, End outcome", risk: "budget overrun ends mode and End throws" },
  refresh: { label: "Refresh limit", api: "GC.RefreshMemoryLimit", precondition: "host/container limit really changed", effect: "updates GC state and suspends runtime briefly", verify: "limit snapshot + pause + post-state", risk: "calling on a polling loop" },
};

export function DnmGcApiDecisionLab() {
  const [intent, setIntent] = useState<ApiIntent>("observe");
  const selected = apiIntents[intent];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 GC API 意图" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {(Object.keys(apiIntents) as ApiIntent[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={intent === item} onClick={() => setIntent(item)} className={`min-h-14 border px-2 py-2 text-xs transition-colors ${intent === item ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{apiIntents[item].label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[25rem] border border-border bg-background/60 p-4">
          <strong className="text-xl text-primary">{selected.api}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <div className="min-h-28 border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">precondition</span><p className="mb-0 mt-3 text-sm text-primary">{selected.precondition}</p></div>
            <div className="min-h-28 border border-violet-500/35 bg-violet-500/10 p-3"><span className="text-xs text-secondary">runtime effect</span><p className="mb-0 mt-3 text-sm text-primary">{selected.effect}</p></div>
            <div className="min-h-28 border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">evidence</span><p className="mb-0 mt-3 text-sm text-primary">{selected.verify}</p></div>
            <div className="min-h-28 border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-xs text-secondary">failure mode</span><p className="mb-0 mt-3 text-sm text-primary">{selected.risk}</p></div>
          </div>
          <div className="mt-5 border border-amber-500/35 bg-amber-500/10 p-4 text-sm text-primary">先问“观察还是干预”。观察 API 也有口径和开销；干预 API 必须有进入条件、退出条件和回滚指标。</div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">按意图比较 System.GC API：调用签名只是入口，前置条件、运行时副作用与证据闭环才决定能否上线。</figcaption>
    </figure>
  );
}

export function DnmNoGcBudgetLab() {
  const [totalMiB, setTotalMiB] = useState(64);
  const [lohMiB, setLohMiB] = useState(8);
  const [sohRate, setSohRate] = useState(12);
  const [lohRate, setLohRate] = useState(2);
  const [duration, setDuration] = useState(3);
  const usedSoh = sohRate * duration;
  const usedLoh = lohRate * duration;
  const totalUsed = usedSoh + usedLoh;
  const sohBudget = totalMiB - lohMiB;
  const fits = usedSoh <= sohBudget && usedLoh <= lohMiB && totalUsed <= totalMiB;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <section className="min-h-[27rem] border border-border bg-background/60 p-4">
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="min-h-28 border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">total reserved</span><strong className="mt-3 block text-xl text-primary">{totalMiB} MiB</strong></div>
            <div className="min-h-28 border border-violet-500/35 bg-violet-500/10 p-3"><span className="text-xs text-secondary">SOH used / budget</span><strong className="mt-3 block text-lg text-primary">{usedSoh} / {sohBudget} MiB</strong></div>
            <div className="min-h-28 border border-amber-500/35 bg-amber-500/10 p-3"><span className="text-xs text-secondary">LOH used / budget</span><strong className="mt-3 block text-lg text-primary">{usedLoh} / {lohMiB} MiB</strong></div>
            <div className={`min-h-28 border p-3 ${fits ? "border-emerald-500/35 bg-emerald-500/10" : "border-rose-500/35 bg-rose-500/10"}`}><span className="text-xs text-secondary">prediction</span><strong className="mt-3 block text-lg text-primary">{fits ? "budget fits" : "region will fail"}</strong></div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-xs text-secondary">totalSize: {totalMiB} MiB<input className="mt-2 block w-full accent-cyan-500" type="range" min={16} max={256} step={8} value={totalMiB} onChange={(event) => setTotalMiB(Number(event.target.value))} /></label>
            <label className="text-xs text-secondary">lohSize: {lohMiB} MiB<input className="mt-2 block w-full accent-violet-500" type="range" min={0} max={64} step={2} value={lohMiB} onChange={(event) => setLohMiB(Number(event.target.value))} /></label>
            <label className="text-xs text-secondary">SOH allocation rate: {sohRate} MiB/s<input className="mt-2 block w-full accent-emerald-500" type="range" min={1} max={64} value={sohRate} onChange={(event) => setSohRate(Number(event.target.value))} /></label>
            <label className="text-xs text-secondary">LOH allocation rate: {lohRate} MiB/s<input className="mt-2 block w-full accent-amber-500" type="range" min={0} max={32} value={lohRate} onChange={(event) => setLohRate(Number(event.target.value))} /></label>
          </div>
          <label className="mt-5 block text-xs text-secondary">critical duration: {duration} s<input className="mt-2 block w-full accent-rose-500" type="range" min={1} max={15} value={duration} onChange={(event) => setDuration(Number(event.target.value))} /></label>
          <p className="mb-0 mt-5 border-t border-border pt-4 text-sm text-secondary">这是进入前预算模型，不是成功保证：并发线程、隐藏框架分配、预算可提交性和 runtime 状态仍会影响 TryStart 结果。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">调整 SOH/LOH 预算、分配速率和关键区时长，先预测 no-GC region 是否会超额，再以实际 Start/End 和 GC 事件验证。</figcaption>
    </figure>
  );
}

type EvidenceLayer = "metrics" | "events" | "dump" | "clrmd";

const evidenceLayers: Record<EvidenceLayer, { label: string; question: string; data: string; cost: string; output: string; limitation: string }> = {
  metrics: { label: "Counters / snapshots", question: "when did pressure grow?", data: "allocation, heap, Gen counts, pause, RSS", cost: "low / continuous", output: "time series and alert", limitation: "no object-to-root proof" },
  events: { label: "EventPipe", question: "which GC and allocation stack?", data: "GCStart/Stop, heap stats, allocations, stacks", cost: "bounded trace window", output: "correlated timeline", limitation: "provider/keyword loss or sampling" },
  dump: { label: "Dump", question: "what is retained now?", data: "heap objects, roots, threads, native state", cost: "pause, I/O and sensitive data", output: "point-in-time snapshot", limitation: "not a history" },
  clrmd: { label: "ClrMD automation", question: "can the proof repeat at scale?", data: "typed heap/root enumeration from dump", cost: "tool code + version compatibility", output: "machine-readable report", limitation: "bad heap or wrong DAC/runtime limits" },
};

export function DnmDiagnosticsEvidenceLab() {
  const [layer, setLayer] = useState<EvidenceLayer>("events");
  const selected = evidenceLayers[layer];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择诊断证据层" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(evidenceLayers) as EvidenceLayer[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={layer === item} onClick={() => setLayer(item)} className={`min-h-14 border px-2 py-2 text-xs transition-colors ${layer === item ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{evidenceLayers[item].label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[25rem] border border-border bg-background/60 p-4">
          <strong className="text-xl text-primary">{selected.question}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <div className="min-h-28 border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">evidence</span><p className="mb-0 mt-3 text-sm text-primary">{selected.data}</p></div>
            <div className="min-h-28 border border-violet-500/35 bg-violet-500/10 p-3"><span className="text-xs text-secondary">collection cost</span><p className="mb-0 mt-3 text-sm text-primary">{selected.cost}</p></div>
            <div className="min-h-28 border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">deliverable</span><p className="mb-0 mt-3 text-sm text-primary">{selected.output}</p></div>
            <div className="min-h-28 border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-xs text-secondary">cannot prove alone</span><p className="mb-0 mt-3 text-sm text-primary">{selected.limitation}</p></div>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-4">
            {(["detect", "correlate", "prove", "automate"] as const).map((stage, index) => <div key={stage} className={`flex min-h-20 items-center justify-center border p-3 text-center text-xs ${index <= Object.keys(evidenceLayers).indexOf(layer) ? "border-emerald-500/35 bg-emerald-500/10 text-primary" : "border-border bg-elevated text-secondary"}`}>{index + 1}. {stage}</div>)}
          </div>
          <p className="mb-0 mt-5 border-t border-border pt-4 text-sm text-secondary">证据层不是替代关系：低成本指标发现窗口，事件解释过程，dump 证明当前保留，ClrMD 把同一证明变成可重复报告。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">从指标到事件、dump 与 ClrMD 逐层加深；每一层回答不同问题，也有不同暂停、数据敏感性和版本成本。</figcaption>
    </figure>
  );
}
