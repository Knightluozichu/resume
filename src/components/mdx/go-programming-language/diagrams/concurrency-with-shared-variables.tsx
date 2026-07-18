"use client";

import { useState } from "react";

export function GoplRaceMutexLab() {
  const [protectedByMutex, setProtectedByMutex] = useState(false);
  const [interleaving, setInterleaving] = useState<"serial" | "lost-update">("lost-update");
  const lostUpdate = !protectedByMutex && interleaving === "lost-update";
  const events = lostUpdate
    ? ["G1 read x=0", "G2 read x=0", "G1 write x=1", "G2 write x=1"]
    : ["G1 Lock/read/write x=1/Unlock", "G2 Lock/read/write x=2/Unlock"];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={protectedByMutex} onChange={(event) => setProtectedByMutex(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />protect read-modify-write with one Mutex</label><label className="block text-sm text-primary">scheduler interleaving<select value={interleaving} onChange={(event) => setInterleaving(event.target.value as "serial" | "lost-update")} disabled={protectedByMutex} className="mt-2 min-h-11 w-full border border-border bg-elevated px-3 text-sm text-primary disabled:opacity-50"><option value="serial">serial-looking</option><option value="lost-update">lost update</option></select></label></section>
          <section className={`border p-4 ${lostUpdate ? "border-rose-500/40 bg-rose-500/10" : "border-emerald-500/40 bg-emerald-500/10"}`} aria-live="polite"><div className="grid gap-2 sm:grid-cols-4">{events.map((event, index) => <div key={event} className="min-h-24 border border-border bg-bg p-3 text-sm text-primary"><span className="text-xs text-secondary">0{index + 1}</span><strong className="mt-2 block">{event}</strong></div>)}</div><div className="mt-4 grid grid-cols-2 gap-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">expected</span><strong className="mt-2 block text-lg text-primary">x = 2</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">observed</span><strong className="mt-2 block text-lg text-primary">x = {lostUpdate ? 1 : 2}</strong></div></div><p className="mt-4 text-sm leading-7 text-secondary">`x++` 是 read-modify-write，不是原子 operation。Mutex 保护的是“x 的复合 invariant”，而不是某一行看起来短。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">两个 goroutines 未同步访问同一 location 且至少一个 write 就构成 data race；lost update 只是可能表现之一。</figcaption>
    </figure>
  );
}

type SyncMode = "mutex" | "rwmutex" | "once";

export function GoplSynchronizationPrimitiveLab() {
  const [mode, setMode] = useState<SyncMode>("rwmutex");
  const [readers, setReaders] = useState(4);
  const [writerWaiting, setWriterWaiting] = useState(true);
  const activeReaders = mode === "mutex" ? Math.min(1, readers) : mode === "rwmutex" && !writerWaiting ? readers : mode === "rwmutex" ? Math.min(readers, 2) : readers;
  const initializationRuns = mode === "once" ? 1 : readers;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="synchronization primitive">{(["mutex", "rwmutex", "once"] as SyncMode[]).map((item, index) => <button key={item} type="button" onClick={() => setMode(item)} className={`min-h-11 text-sm ${index < 2 ? "border-r border-border" : ""} ${mode === item ? "bg-primary text-bg" : "text-primary hover:bg-bg"}`}>{item}</button>)}</div><div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]"><section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">concurrent callers: <strong>{readers}</strong><input type="range" min="1" max="8" value={readers} onChange={(event) => setReaders(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={writerWaiting} onChange={(event) => setWriterWaiting(event.target.checked)} disabled={mode !== "rwmutex"} className="h-4 w-4 accent-[var(--accent)] disabled:opacity-40" />writer waiting</label></section><section className="border border-cyan-500/40 bg-cyan-500/10 p-4"><div className="grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">simultaneous readers</span><strong className="mt-2 block text-lg text-primary">{mode === "once" ? readers : activeReaders}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">initialization runs</span><strong className="mt-2 block text-lg text-primary">{initializationRuns}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">publication edge</span><strong className="mt-2 block text-sm text-primary">{mode === "once" ? "f return → all Do return" : mode === "rwmutex" ? "Unlock/RUnlock → next lock" : "Unlock → next Lock"}</strong></div></div><p className="mt-4 text-sm leading-7 text-secondary">{mode === "rwmutex" ? "RWMutex 只在 read-mostly 且 critical section 足够大时可能收益；writer 必须独占，不能从 RLock 升级。" : mode === "once" ? "Once 同时保证 exactly-once execution 与 initialized data visibility；f panic 也被视为已完成。" : "Mutex 简单、可预测，先用它守住 invariant，再以 measurement 决定是否需要读写锁。"}</p></section></div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">Mutex/RWMutex 保护持续变化的共享状态；sync.Once 安全发布只初始化一次的状态。</figcaption>
    </figure>
  );
}

export function GoplMemoSchedulerLab() {
  const [callers, setCallers] = useState(5);
  const [duplicateSuppression, setDuplicateSuppression] = useState(true);
  const [gomaxprocs, setGomaxprocs] = useState(2);
  const fetches = duplicateSuppression ? 1 : callers;
  const waiting = Math.max(0, callers - fetches);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <section className="space-y-4 border border-border bg-bg p-4"><label className="block text-sm text-primary">same-key callers: <strong>{callers}</strong><input type="range" min="1" max="8" value={callers} onChange={(event) => setCallers(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label><label className="flex min-h-11 items-center gap-3 border border-border px-3 text-sm text-primary"><input type="checkbox" checked={duplicateSuppression} onChange={(event) => setDuplicateSuppression(event.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />per-key entry.ready duplicate suppression</label><label className="block text-sm text-primary">GOMAXPROCS: <strong>{gomaxprocs}</strong><input type="range" min="1" max="8" value={gomaxprocs} onChange={(event) => setGomaxprocs(Number(event.target.value))} className="mt-2 block w-full accent-[var(--accent)]" /></label></section>
          <section className="border border-violet-500/40 bg-violet-500/10 p-4"><div className="grid gap-3 sm:grid-cols-3"><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">underlying fetches</span><strong className="mt-2 block text-lg text-primary">{fetches}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">wait on ready</span><strong className="mt-2 block text-lg text-primary">{waiting}</strong></div><div className="border border-border bg-bg p-3"><span className="text-xs text-secondary">Go code parallel slots</span><strong className="mt-2 block text-lg text-primary">{gomaxprocs}</strong></div></div><div className="mt-4 grid gap-2 sm:grid-cols-4">{["lookup key", "install in-flight entry", "fetch outside lock", "close ready + publish"].map((item, index) => <div key={item} className="min-h-24 border border-border bg-bg p-3 text-sm text-primary"><span className="text-xs text-secondary">0{index + 1}</span><strong className="mt-2 block">{item}</strong></div>)}</div><p className="mt-4 text-sm leading-7 text-secondary">GOMAXPROCS 限制同时执行 Go code 的并行度，不限制 goroutine 数量；blocked goroutines 由 runtime scheduler 停放并让其他 runnable work 继续。</p></section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">concurrent memo 用 per-key ready channel 合并相同计算；runtime 在少量 OS threads 上调度大量 growable-stack goroutines。</figcaption>
    </figure>
  );
}
