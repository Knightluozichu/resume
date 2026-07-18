"use client";

import { useState } from "react";

const triggerStages = [
  {
    name: "allocation",
    detail: "SOH/LOH 分配推进各自的预算计数；显式请求和内存压力也可能进入触发路径",
    className: "border-cyan-500/35 bg-cyan-500/10",
  },
  {
    name: "trigger",
    detail: "预算阈值、induced GC 或运行时策略提出一次回收请求，而不是证明物理内存已满",
    className: "border-amber-500/35 bg-amber-500/10",
  },
  {
    name: "generation",
    detail: "运行时选择 Gen 0、Gen 1 或 Gen 2；收集高代时同时覆盖所有更年轻的代",
    className: "border-violet-500/35 bg-violet-500/10",
  },
  {
    name: "suspend",
    detail: "SuspendEE 请求线程在安全点协作停下，使根和托管引用处于可扫描状态",
    className: "border-rose-500/35 bg-rose-500/10",
  },
  {
    name: "collect + resume",
    detail: "标记、计划、清扫/压缩后更新状态并恢复线程；具体阶段由后续三章展开",
    className: "border-emerald-500/35 bg-emerald-500/10",
  },
] as const;

export function DnmGcTriggerDecisionMap() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div
          role="img"
          aria-label=".NET 垃圾回收从分配预算或显式请求开始，经过触发、代选择、线程挂起、回收和恢复的决策链"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          {triggerStages.map((stage, index) => (
            <section key={stage.name} className={`min-h-48 border p-4 ${stage.className}`}>
              <span className="text-xs text-secondary">phase 0{index + 1}</span>
              <strong className="mt-2 block text-sm text-primary">{stage.name}</strong>
              <p className="mb-0 mt-4 text-xs text-secondary">{stage.detail}</p>
            </section>
          ))}
        </div>
        <div className="mt-3 grid gap-3 text-xs sm:grid-cols-3">
          <div className="border border-border bg-background/60 p-3 text-secondary">SOH 与 LOH 有不同的分配锁和预算观察点</div>
          <div className="border border-border bg-background/60 p-3 text-secondary">Gen 2 collection = Gen 2 + Gen 1 + Gen 0</div>
          <div className="border border-border bg-background/60 p-3 text-secondary">事件 reason/type/depth 是诊断依据，不靠猜测触发原因</div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        回收是一次由预算和策略驱动的协调流程；“发生 GC”不能直接翻译成“堆已无可用空间”。
      </figcaption>
    </figure>
  );
}

export function DnmGenerationBudgetLab() {
  const [sohRate, setSohRate] = useState(80);
  const [youngBudget, setYoungBudget] = useState(160);
  const [lohRate, setLohRate] = useState(8);
  const [lohBudget, setLohBudget] = useState(320);

  const youngSeconds = sohRate === 0 ? Number.POSITIVE_INFINITY : youngBudget / sohRate;
  const lohSeconds = lohRate === 0 ? Number.POSITIVE_INFINITY : lohBudget / lohRate;
  const lohFirst = lohSeconds < youngSeconds;
  const trigger = lohFirst ? "LOH 预算先到" : "年轻代预算先到";
  const selectedGeneration = lohFirst ? "通常需要完整回收候选" : "Gen 0 候选";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
          <div className="space-y-5">
            <label className="block text-sm text-primary">
              SOH 分配速率：{sohRate} MB/s
              <input type="range" min="5" max="240" step="5" value={sohRate} onChange={(event) => setSohRate(Number(event.target.value))} className="mt-2 w-full accent-cyan-500" />
            </label>
            <label className="block text-sm text-primary">
              年轻代示意预算：{youngBudget} MB
              <input type="range" min="40" max="480" step="20" value={youngBudget} onChange={(event) => setYoungBudget(Number(event.target.value))} className="mt-2 w-full accent-emerald-500" />
            </label>
            <label className="block text-sm text-primary">
              LOH 分配速率：{lohRate} MB/s
              <input type="range" min="1" max="80" value={lohRate} onChange={(event) => setLohRate(Number(event.target.value))} className="mt-2 w-full accent-violet-500" />
            </label>
            <label className="block text-sm text-primary">
              LOH 示意预算：{lohBudget} MB
              <input type="range" min="80" max="960" step="40" value={lohBudget} onChange={(event) => setLohBudget(Number(event.target.value))} className="mt-2 w-full accent-amber-500" />
            </label>
          </div>
          <section aria-live="polite" className="min-h-96 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">next budget boundary</span>
            <strong className="mt-2 block text-xl text-primary">{trigger}</strong>
            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="border border-cyan-500/35 bg-cyan-500/10 p-3">
                <span className="text-secondary">SOH 预计</span>
                <strong className="mt-2 block text-primary">{youngSeconds.toFixed(1)} s</strong>
              </div>
              <div className="border border-violet-500/35 bg-violet-500/10 p-3">
                <span className="text-secondary">LOH 预计</span>
                <strong className="mt-2 block text-primary">{lohSeconds.toFixed(1)} s</strong>
              </div>
            </div>
            <div className="mt-3 border border-amber-500/35 bg-amber-500/10 p-3 text-xs text-primary">
              代选择：{selectedGeneration}
            </div>
            <p className="mb-0 mt-5 border-t border-border pt-4 text-xs text-secondary">
              这是因果实验，不是 CLR 精确预测器。真实预算会按存活量、堆状态、GC flavor 和运行时版本动态调整；请用 GCStart 事件确认实际 reason 与 depth。
            </p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先预测哪一类分配会先越过预算，再调节四个变量；即使进程还有空闲内存，预算边界仍可合理触发回收。
      </figcaption>
    </figure>
  );
}

export function DnmSuspensionTimelineLab() {
  const [slowestSafePointMs, setSlowestSafePointMs] = useState(3);
  const [gcWorkMs, setGcWorkMs] = useState(8);
  const [resumeMs, setResumeMs] = useState(1);
  const pauseMs = slowestSafePointMs + gcWorkMs + resumeMs;
  const suspendShare = (slowestSafePointMs / pauseMs) * 100;
  const diagnosis = suspendShare >= 40
    ? "挂起等待占比较高：先查最慢线程、GC mode、长时间本机调用或缺少轮询的执行区间。"
    : gcWorkMs >= 20
      ? "GC 工作占主导：结合 depth、存活量、晋升和 heap size 继续定位。"
      : "暂停较短；仍应以 p95/p99 和业务时间线判断是否值得优化。";

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <label className="block text-sm text-primary">
              最慢线程到安全点：{slowestSafePointMs} ms
              <input type="range" min="1" max="50" value={slowestSafePointMs} onChange={(event) => setSlowestSafePointMs(Number(event.target.value))} className="mt-2 w-full accent-rose-500" />
            </label>
            <label className="block text-sm text-primary">
              GC 阶段工作：{gcWorkMs} ms
              <input type="range" min="1" max="80" value={gcWorkMs} onChange={(event) => setGcWorkMs(Number(event.target.value))} className="mt-2 w-full accent-violet-500" />
            </label>
            <label className="block text-sm text-primary">
              恢复协调：{resumeMs} ms
              <input type="range" min="1" max="12" value={resumeMs} onChange={(event) => setResumeMs(Number(event.target.value))} className="mt-2 w-full accent-emerald-500" />
            </label>
          </div>
          <section aria-live="polite" className="min-h-80 border border-border bg-background/60 p-4">
            <span className="text-xs text-secondary">observed pause</span>
            <strong className="mt-2 block text-xl text-primary">{pauseMs} ms</strong>
            <div className="mt-5 flex min-h-16 overflow-hidden border border-border text-xs text-primary">
              <div style={{ flex: slowestSafePointMs }} className="flex min-w-16 items-center justify-center bg-rose-500/25 px-2 text-center">suspend {slowestSafePointMs} ms</div>
              <div style={{ flex: gcWorkMs }} className="flex min-w-16 items-center justify-center bg-violet-500/25 px-2 text-center">GC {gcWorkMs} ms</div>
              <div style={{ flex: resumeMs }} className="flex min-w-16 items-center justify-center bg-emerald-500/25 px-2 text-center">resume {resumeMs} ms</div>
            </div>
            <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
              <div className="border border-border p-3 text-secondary">T1 · 已在 safe point</div>
              <div className="border border-border p-3 text-secondary">T2 · GC poll 后停下</div>
              <div className="border border-border p-3 text-secondary">T3 · 最晚协作决定挂起尾部</div>
            </div>
            <p className="mb-0 mt-4 border-t border-border pt-4 text-xs text-secondary">{diagnosis}</p>
          </section>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        应用暂停不仅包含标记或压缩；最慢线程到达安全点的等待也可能成为尾延迟，因此要分开观察 suspension 与 GC work。
      </figcaption>
    </figure>
  );
}
