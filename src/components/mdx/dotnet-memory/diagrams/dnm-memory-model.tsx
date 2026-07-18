"use client";

import { useState } from "react";

type BookPhase = "foundations" | "gc" | "lifetime" | "advanced";

const phases: Record<BookPhase, { label: string; chapters: Array<{ no: number; title: string }>; input: string; outcome: string; tone: string }> = {
  foundations: {
    label: "I 基础与测量",
    chapters: [
      { no: 1, title: "Basic Concepts" },
      { no: 2, title: "Low-Level Memory" },
      { no: 3, title: "Measurements" },
      { no: 4, title: ".NET Fundamentals" },
    ],
    input: "对象图、OS/CPU、指标口径、CLR/JIT",
    outcome: "能区分分配、存活、提交、RSS 与硬件局部性",
    tone: "border-cyan-500/35 bg-cyan-500/10",
  },
  gc: {
    label: "II 堆与 GC 实现",
    chapters: [
      { no: 5, title: "Memory Partitioning" },
      { no: 6, title: "Memory Allocation" },
      { no: 7, title: "GC Introduction" },
      { no: 8, title: "Mark Phase" },
      { no: 9, title: "Plan Phase" },
      { no: 10, title: "Sweep & Compact" },
      { no: 11, title: "Flavors & Settings" },
    ],
    input: "SOH/LOH/POH、budget、roots、plugs/gaps、模式",
    outcome: "能从触发到恢复手推一次 GC，并解释暂停与碎片",
    tone: "border-violet-500/35 bg-violet-500/10",
  },
  lifetime: {
    label: "III 生命周期与高阶内存",
    chapters: [
      { no: 12, title: "Object Lifetime" },
      { no: 13, title: "Miscellaneous Topics" },
      { no: 14, title: "Advanced Techniques" },
    ],
    input: "finalization/Dispose、ref safety、Span/Memory/owner",
    outcome: "能设计资源所有权、借用期限和低分配缓冲管线",
    tone: "border-emerald-500/35 bg-emerald-500/10",
  },
  advanced: {
    label: "IV API 与自动诊断",
    chapters: [{ no: 15, title: "Programmatical APIs" }],
    input: "System.GC、no-GC、notifications、EventPipe、ClrMD",
    outcome: "能让观察与干预都带前置条件、失败路径和证据",
    tone: "border-amber-500/35 bg-amber-500/10",
  },
};

export function DnmOfficialBookMap() {
  const [phase, setPhase] = useState<BookPhase>("gc");
  const selected = phases[phase];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择原书学习阶段" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(Object.keys(phases) as BookPhase[]).map((item) => (
            <button key={item} type="button" role="tab" aria-selected={phase === item} onClick={() => setPhase(item)} className={`min-h-14 border px-2 py-2 text-xs transition-colors ${phase === item ? phases[item].tone + " text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{phases[item].label}</button>
          ))}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[26rem] border border-border bg-background/60 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className={`min-h-24 border p-3 ${selected.tone}`}><span className="text-xs text-secondary">knowledge input</span><strong className="mt-2 block text-sm text-primary">{selected.input}</strong></div>
            <div className="min-h-24 border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">stage acceptance</span><strong className="mt-2 block text-sm text-primary">{selected.outcome}</strong></div>
          </div>
          <div className={`mt-5 grid gap-3 ${selected.chapters.length > 4 ? "sm:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
            {selected.chapters.map((chapter) => (
              <div key={chapter.no} className="min-h-28 border border-border bg-elevated p-3">
                <span className="text-xs text-secondary">Chapter {chapter.no}</span>
                <strong className="mt-3 block text-sm text-primary">{chapter.title}</strong>
              </div>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-4 gap-2">
            {(Object.keys(phases) as BookPhase[]).map((item, index) => <div key={item} className={`h-3 border ${item === phase ? phases[item].tone : "border-border bg-elevated"}`} title={`${index + 1}. ${phases[item].label}`} />)}
          </div>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">按出版社 15 章目录分成四段：先统一口径，再学习 GC 实现，随后处理生命周期/缓冲，最后编程化观察与干预。</figcaption>
    </figure>
  );
}

type Symptom = "allocation" | "pause" | "retention" | "rss" | "interop";

const symptomRoutes: Record<Symptom, { label: string; chapters: string[]; firstEvidence: string; avoid: string; closure: string }> = {
  allocation: { label: "分配率过高", chapters: ["Ch3 测量", "Ch6 分配", "Ch13 值/ref", "Ch14 Span/Pool"], firstEvidence: "allocation rate + stacks", avoid: "先改成池却不知道热点", closure: "alloc B/op、CPU、p99、pool high-water" },
  pause: { label: "GC 暂停过长", chapters: ["Ch3 测量", "Ch7 触发", "Ch8-10 阶段", "Ch11 模式/配置"], firstEvidence: "GC timeline + GCKind", avoid: "直接切 Server/LowLatency", closure: "pause p99、throughput、RSS、Gen 2" },
  retention: { label: "回收后堆增长", chapters: ["Ch3 dump/trace", "Ch8 roots", "Ch12 lifetime", "Ch15 ClrMD"], firstEvidence: "post-GC low-water + type delta", avoid: "周期 GC.Collect", closure: "root path 消失且低峰基线稳定" },
  rss: { label: "RSS 涨而堆稳定", chapters: ["Ch2 VM/commit", "Ch3 口径", "Ch12 resources", "Ch15 pressure/API"], firstEvidence: "RSS vs committed GC/native", avoid: "把 RSS 当 live heap", closure: "native owner/release 与进程余量可解释" },
  interop: { label: "互操作/固定问题", chapters: ["Ch5 POH/segments", "Ch9-10 pins/compact", "Ch12 SafeHandle", "Ch13-14 pin/Memory"], firstEvidence: "pin count/duration + native lease", avoid: "用永久 GCHandle 保地址", closure: "无悬垂 pointer，碎片与暂停不过线" },
};

export function DnmSymptomRouteLab() {
  const [symptom, setSymptom] = useState<Symptom>("retention");
  const selected = symptomRoutes[symptom];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择内存症状" className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {(Object.keys(symptomRoutes) as Symptom[]).map((item) => <button key={item} type="button" role="tab" aria-selected={symptom === item} onClick={() => setSymptom(item)} className={`min-h-14 border px-2 py-2 text-xs transition-colors ${symptom === item ? "border-rose-500 bg-rose-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{symptomRoutes[item].label}</button>)}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[26rem] border border-border bg-background/60 p-4">
          <div className="grid gap-2 sm:grid-cols-4">
            {selected.chapters.map((chapter, index) => <div key={chapter} className="flex min-h-24 items-center justify-center border border-cyan-500/35 bg-cyan-500/10 p-3 text-center text-xs text-primary">{index + 1}. {chapter}</div>)}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="min-h-28 border border-violet-500/35 bg-violet-500/10 p-3"><span className="text-xs text-secondary">start with</span><p className="mb-0 mt-3 text-sm text-primary">{selected.firstEvidence}</p></div>
            <div className="min-h-28 border border-rose-500/35 bg-rose-500/10 p-3"><span className="text-xs text-secondary">do not jump to</span><p className="mb-0 mt-3 text-sm text-primary">{selected.avoid}</p></div>
            <div className="min-h-28 border border-emerald-500/35 bg-emerald-500/10 p-3"><span className="text-xs text-secondary">acceptance proof</span><p className="mb-0 mt-3 text-sm text-primary">{selected.closure}</p></div>
          </div>
          <p className="mb-0 mt-5 border-t border-border pt-4 text-sm text-secondary">症状决定回读路径，但第 3 章测量始终靠前；先建立时间窗和口径，再进入对象图、GC 阶段或所有权机制。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">选择生产症状得到最短章节回读路径；路线从证据开始，以可量化的修复验证结束。</figcaption>
    </figure>
  );
}

type Competency = "model" | "measure" | "predict" | "design" | "automate";

const competencies: Record<Competency, { label: string; prompt: string; chapters: string; artifact: string; gate: string }> = {
  model: { label: "建模", prompt: "对象/页/堆/代/segment 的边界是什么？", chapters: "Ch1-5", artifact: "对象图 + 地址/提交/堆分区图", gate: "能解释 managed heap 与 RSS 差异" },
  measure: { label: "测量", prompt: "哪个时间窗、哪个口径、谁在分配或保留？", chapters: "Ch3, Ch7-8, Ch15", artifact: "counter/event/dump 对齐表", gate: "结论带时间、GCKind、root 证据" },
  predict: { label: "推演", prompt: "一次 GC 从触发到 mark/plan/sweep/compact 会怎样？", chapters: "Ch6-11", artifact: "阶段状态与成本预测", gate: "能预测 pin/存活/碎片对暂停的影响" },
  design: { label: "设计", prompt: "资源、ref、buffer 的 owner 与 lease 是谁？", chapters: "Ch12-14", artifact: "所有权/借用/失败状态机", gate: "异常、取消、归还后无悬垂使用" },
  automate: { label: "自动化", prompt: "如何把诊断与干预变成可重复工具？", chapters: "Ch15 + 全书", artifact: "EventPipe/ClrMD 报告与回滚线", gate: "观察低开销，干预可失败可回滚" },
};

export function DnmCompetencyMatrixLab() {
  const [competency, setCompetency] = useState<Competency>("predict");
  const selected = competencies[competency];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        <div role="tablist" aria-label="选择学习能力" className="grid grid-cols-5 gap-2">
          {(Object.keys(competencies) as Competency[]).map((item) => <button key={item} type="button" role="tab" aria-selected={competency === item} onClick={() => setCompetency(item)} className={`min-h-12 border px-1 py-2 text-xs transition-colors ${competency === item ? "border-emerald-500 bg-emerald-500/15 text-primary" : "border-border bg-background text-secondary hover:text-primary"}`}>{competencies[item].label}</button>)}
        </div>
        <section role="tabpanel" className="mt-4 min-h-[24rem] border border-border bg-background/60 p-4">
          <strong className="text-lg text-primary">{selected.prompt}</strong>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="min-h-32 border border-cyan-500/35 bg-cyan-500/10 p-4"><span className="text-xs text-secondary">chapters</span><strong className="mt-3 block text-primary">{selected.chapters}</strong></div>
            <div className="min-h-32 border border-violet-500/35 bg-violet-500/10 p-4"><span className="text-xs text-secondary">deliverable</span><strong className="mt-3 block text-primary">{selected.artifact}</strong></div>
            <div className="min-h-32 border border-emerald-500/35 bg-emerald-500/10 p-4"><span className="text-xs text-secondary">acceptance gate</span><strong className="mt-3 block text-primary">{selected.gate}</strong></div>
          </div>
          <div className="mt-5 grid grid-cols-5 gap-2">{(Object.keys(competencies) as Competency[]).map((item) => <div key={item} className={`h-12 border ${item === competency ? "border-emerald-500 bg-emerald-500/20" : "border-border bg-elevated"}`} />)}</div>
          <p className="mb-0 mt-5 text-sm text-secondary">完成一章不等于掌握：每一段都要留下可检查产物，并能解释失败案例与回滚条件。</p>
        </section>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">按建模、测量、推演、设计、自动化五种能力复查全书；章节只是输入，证据产物才是完成标准。</figcaption>
    </figure>
  );
}
