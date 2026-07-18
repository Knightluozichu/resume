"use client";

import { useState } from "react";

type Flavor = "workstation-background" | "workstation-blocking" | "server-background" | "server-blocking";

const flavors: Array<{
  id: Flavor;
  label: string;
  heaps: string;
  workers: string;
  strength: string;
  cost: string;
}> = [
  { id: "workstation-background", label: "Workstation + Background", heaps: "单逻辑 heap", workers: "应用触发线程 + 1 个后台 GC 线程", strength: "较低资源占用，Gen 2 大部分工作可与应用并发", cost: "吞吐扩展较弱；仍有 foreground/短暂停顿" },
  { id: "workstation-blocking", label: "Workstation + Blocking", heaps: "单逻辑 heap", workers: "触发 GC 的应用线程", strength: "执行模型直接、后台竞争少", cost: "完整回收期间托管线程暂停，响应性风险更高" },
  { id: "server-background", label: "Server + Background", heaps: "多个 heaps，数量由运行时/配置决定", workers: "每 heap 的专用 GC 工作 + 后台线程", strength: "适合多核高分配吞吐，Gen 2 可并发推进", cost: "更多 CPU/内存开销与工作集；内存带宽限制扩展" },
  { id: "server-blocking", label: "Server + Blocking", heaps: "多个 heaps", workers: "多个专用 GC 线程并行", strength: "批处理式并行回收，追求吞吐", cost: "完整阶段暂停更集中；并行不等于线性加速" },
];

export function DnmGcFlavorMatrixMap() {
  const [active, setActive] = useState<Flavor>("server-background");
  const selected = flavors.find((flavor) => flavor.id === active) ?? flavors[0];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 .NET GC flavor" className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {flavors.map((flavor) => (
            <button key={flavor.id} type="button" role="tab" aria-selected={active === flavor.id} onClick={() => setActive(flavor.id)} className={`min-h-16 border px-2 py-2 text-sm transition-colors ${active === flavor.id ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>
              {flavor.label}
            </button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-80 border border-border bg-background/60 p-4">
          <strong className="text-lg text-primary">{selected.label}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="min-h-28 border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-xs text-secondary">heap topology</span><p className="mb-0 mt-2 text-sm text-primary">{selected.heaps}</p></div>
            <div className="min-h-28 border border-violet-500/35 bg-violet-500/10 p-3"><span className="text-xs text-secondary">execution</span><p className="mb-0 mt-2 text-sm text-primary">{selected.workers}</p></div>
            <div className="min-h-28 border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">fit</span><p className="mb-0 mt-2 text-sm text-primary">{selected.strength}</p></div>
            <div className="min-h-28 border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-xs text-secondary">trade-off</span><p className="mb-0 mt-2 text-sm text-primary">{selected.cost}</p></div>
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两个正交维度组成四种常见组合：heap/线程拓扑选择 workstation/server，Gen 2 执行方式选择 background/blocking。
      </figcaption>
    </figure>
  );
}

export function DnmBackgroundGcTimelineLab() {
  const [backgroundWorkMs, setBackgroundWorkMs] = useState(80);
  const [allocationRate, setAllocationRate] = useState(160);
  const [youngBudget, setYoungBudget] = useState(40);
  const foregroundCount = Math.max(0, Math.floor((backgroundWorkMs * allocationRate / 1000) / youngBudget));
  const foregroundPauseMs = Math.max(1, Math.round(2 + allocationRate / 80));
  const totalForegroundPause = foregroundCount * foregroundPauseMs;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <label className="block text-sm text-primary">后台 Gen 2 工作：{backgroundWorkMs} ms<input type="range" min="20" max="300" step="10" value={backgroundWorkMs} onChange={(event) => setBackgroundWorkMs(Number(event.target.value))} className="mt-2 w-full accent-violet-500" /></label>
            <label className="block text-sm text-primary">应用分配速率：{allocationRate} MB/s<input type="range" min="20" max="600" step="20" value={allocationRate} onChange={(event) => setAllocationRate(Number(event.target.value))} className="mt-2 w-full accent-cyan-500" /></label>
            <label className="block text-sm text-primary">年轻代示意预算：{youngBudget} MB<input type="range" min="10" max="120" step="10" value={youngBudget} onChange={(event) => setYoungBudget(Number(event.target.value))} className="mt-2 w-full accent-emerald-500" /></label>
          </div>
          <section aria-live="polite" className="min-h-80 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">background window</span>
            <strong className="mt-2 block text-xl text-primary">{foregroundCount} 次 foreground GC 候选</strong>
            <div className="mt-5 min-h-20 border border-border bg-violet-500/10 p-3">
              <div className="h-5 w-full bg-violet-500/30" />
              <div className="mt-3 flex gap-2">
                {Array.from({ length: Math.min(foregroundCount, 8) }).map((_, index) => <span key={index} className="h-8 flex-1 bg-rose-500/35" title={`foreground ${index + 1}`} />)}
                {foregroundCount === 0 && <span className="text-xs text-secondary">当前窗口内预算未形成 foreground 候选</span>}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-secondary">单次示意 pause</span><strong className="mt-2 block text-primary">{foregroundPauseMs} ms</strong></div>
              <div className="border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-secondary">累计 foreground</span><strong className="mt-2 block text-primary">{totalForegroundPause} ms</strong></div>
            </div>
            <p className="mb-0 mt-4 border-t border-border pt-4 text-xs text-secondary">后台并不等于零暂停：Gen 0/1 foreground 可请求后台线程在安全点让路，完成后两者继续。</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        调节后台时长、分配速率与年轻代预算；应用能与 Gen 2 工作并发，但持续分配仍会插入需要暂停的 foreground collections。
      </figcaption>
    </figure>
  );
}

type Workload = "ui" | "service" | "batch" | "container";
type Latency = "Interactive" | "SustainedLowLatency" | "Batch";

const workloadDefaults: Record<Workload, { label: string; server: boolean; concurrent: boolean; latency: Latency; reason: string }> = {
  ui: { label: "交互式客户端", server: false, concurrent: true, latency: "Interactive", reason: "单进程响应性与适中资源占用优先，先保留自调节默认值。" },
  service: { label: "多核吞吐服务", server: true, concurrent: true, latency: "Interactive", reason: "高并发分配可从多 heap 和后台 Gen 2 获益，但必须验证工作集与 CPU 竞争。" },
  batch: { label: "离线批处理", server: true, concurrent: false, latency: "Batch", reason: "允许集中暂停，优先回收吞吐；仍需防止内存带宽成为并行瓶颈。" },
  container: { label: "受限容器", server: true, concurrent: true, latency: "Interactive", reason: "先让 GC 感知容器限制，再按吞吐/内存证据决定 heap count 与 conserve memory。" },
};

export function DnmGcSettingsExperimentLab() {
  const [workload, setWorkload] = useState<Workload>("service");
  const [conserveMemory, setConserveMemory] = useState(0);
  const [heapLimitPercent, setHeapLimitPercent] = useState(75);
  const preset = workloadDefaults[workload];
  const memoryRisk = preset.server ? 32 + conserveMemory * 3 : 20 + conserveMemory * 2;
  const pauseRisk = preset.concurrent ? 25 + conserveMemory * 4 : 55 + conserveMemory * 3;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择 GC 配置实验工作负载" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(workloadDefaults) as Workload[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={workload === item} onClick={() => setWorkload(item)} className={`min-h-12 border px-2 py-2 text-sm transition-colors ${workload === item ? "border-cyan-500 bg-cyan-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{workloadDefaults[item].label}</button>
          ))}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <label className="block text-sm text-primary">ConserveMemory：{conserveMemory}<input type="range" min="0" max="9" value={conserveMemory} onChange={(event) => setConserveMemory(Number(event.target.value))} className="mt-2 w-full accent-amber-500" /></label>
            <label className="block text-sm text-primary">Heap hard limit：{heapLimitPercent}%<input type="range" min="20" max="90" step="5" value={heapLimitPercent} onChange={(event) => setHeapLimitPercent(Number(event.target.value))} className="mt-2 w-full accent-violet-500" /></label>
            <p className="text-xs text-secondary">数值只用于比较方向。实际 hard limit 需要给运行时和 native memory 留余量，不能直接等同容器总限制。</p>
          </div>
          <section role="tabpanel" aria-live="polite" className="min-h-96 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">baseline candidate</span>
            <strong className="mt-2 block text-lg text-primary">{preset.label}</strong>
            <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
              <div className="border border-cyan-500/35 bg-cyan-500/10 p-3"><span className="text-secondary">flavor</span><strong className="mt-2 block text-primary">{preset.server ? "Server" : "Workstation"}</strong></div>
              <div className="border border-violet-500/35 bg-violet-500/10 p-3"><span className="text-secondary">Gen 2</span><strong className="mt-2 block text-primary">{preset.concurrent ? "Background" : "Blocking"}</strong></div>
              <div className="border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-secondary">latency</span><strong className="mt-2 block text-primary">{preset.latency}</strong></div>
            </div>
            <p className="mt-4 text-sm text-secondary">{preset.reason}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="border border-amber-500/35 bg-amber-500/10 p-3"><span className="text-secondary">示意内存压力</span><strong className="mt-2 block text-primary">{Math.max(5, memoryRisk - conserveMemory * 5)} / 100</strong></div>
              <div className="border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-secondary">示意暂停压力</span><strong className="mt-2 block text-primary">{Math.min(100, pauseRisk)} / 100</strong></div>
            </div>
            <code className="mt-4 block break-words border border-border p-3 text-xs text-accent">System.GC.HeapHardLimitPercent={heapLimitPercent} · System.GC.ConserveMemory={conserveMemory}</code>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        工作负载只给出实验起点，不给出万能配置；每次只改一个开关，并用吞吐、暂停、CPU、heap/working set 与 OOM 余量验收。
      </figcaption>
    </figure>
  );
}
