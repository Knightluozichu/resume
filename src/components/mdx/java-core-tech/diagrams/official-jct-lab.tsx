"use client";

import { useMemo, useState } from "react";

type LabProps = { title: string; focus: string; stages: string[] };
const evidenceModes = {
  contract: { label: "合同", result: "可解释", note: "输入、类型、所有权与输出均已声明。" },
  boundary: { label: "边界", result: "需分段", note: "容量、版本、区域或失败条件改变结论。" },
  handoff: { label: "交接", result: "待复现", note: "由另一环境重建结果，差异即进入修订。" },
} as const;

export function JctContractMapLab({ title, focus, stages }: LabProps) {
  const [selected, setSelected] = useState(0);
  return <section className="my-6 overflow-hidden rounded-md border border-emerald-300 bg-white dark:border-emerald-800 dark:bg-zinc-950">
    <header className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/40"><p className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">{title}</p><p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">工程焦点：{focus}</p></header>
    <div className="grid gap-2 p-4 sm:grid-cols-5">{stages.map((stage, index) => <button key={stage} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={"min-h-20 rounded border px-2 py-3 text-left text-xs transition " + (selected === index ? "border-emerald-600 bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-100" : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-emerald-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300")}><span className="block font-mono text-[11px]">0{index + 1}</span><span className="mt-2 block font-semibold">{stage}</span></button>)}</div>
    <div className="grid min-h-28 gap-2 border-t border-zinc-200 p-4 sm:grid-cols-4 dark:border-zinc-800" aria-live="polite">{[["source", "冻结输入"], ["type/runtime", stages[selected]], ["resource", "明确所有者"], ["evidence", "命令+输出"]].map(([label, value]) => <div key={label} className="rounded border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"><p className="font-mono text-[11px] text-zinc-500">{label}</p><p className="mt-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">{value}</p></div>)}</div>
  </section>;
}

export function JctCapacityExperimentLab({ title, focus }: LabProps) {
  const [items, setItems] = useState(1000);
  const [workers, setWorkers] = useState(4);
  const [latency, setLatency] = useState(20);
  const metrics = useMemo(() => { const work = items * latency; const ideal = work / workers; const coordination = Math.max(0, workers - 1) * Math.log2(items + 1); return { work, ideal, coordination, total: ideal + coordination }; }, [items, workers, latency]);
  return <section className="my-6 overflow-hidden rounded-md border border-amber-300 bg-white dark:border-amber-800 dark:bg-zinc-950">
    <header className="border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/30"><p className="text-sm font-semibold text-amber-950 dark:text-amber-100">{title}</p><p className="mt-1 text-xs text-amber-800 dark:text-amber-300">验收工件：{focus}</p></header>
    <div className="grid gap-5 p-4 lg:grid-cols-[1fr_1.1fr]"><div className="space-y-4">
      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">数据项：{items}<input className="mt-2 w-full accent-emerald-600" type="range" min="100" max="10000" step="100" value={items} onChange={(event) => setItems(Number(event.target.value))} /></label>
      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">工作单元：{workers}<input className="mt-2 w-full accent-amber-600" type="range" min="1" max="16" value={workers} onChange={(event) => setWorkers(Number(event.target.value))} /></label>
      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">单项成本：{latency}<input className="mt-2 w-full accent-sky-600" type="range" min="1" max="100" value={latency} onChange={(event) => setLatency(Number(event.target.value))} /></label>
    </div><div className="grid grid-cols-2 gap-2" aria-live="polite">{[["总工作", metrics.work.toFixed(0)], ["理想分摊", metrics.ideal.toFixed(1)], ["协调成本", metrics.coordination.toFixed(1)], ["估算总量", metrics.total.toFixed(1)]].map(([label, value]) => <div key={label} className="min-h-24 rounded border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"><p className="text-xs text-zinc-500">{label}</p><p className="mt-2 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">{value}</p></div>)}</div></div>
  </section>;
}

export function JctFailureEvidenceLab({ title, focus }: LabProps) {
  const [mode, setMode] = useState<keyof typeof evidenceModes>("contract"); const current = evidenceModes[mode];
  return <section className="my-6 overflow-hidden rounded-md border border-sky-300 bg-white dark:border-sky-800 dark:bg-zinc-950">
    <header className="border-b border-sky-200 bg-sky-50 px-4 py-3 dark:border-sky-900 dark:bg-sky-950/30"><p className="text-sm font-semibold text-sky-950 dark:text-sky-100">{title}</p><p className="mt-1 text-xs text-sky-800 dark:text-sky-300">风险焦点：{focus}</p></header>
    <div className="grid grid-cols-3 border-b border-zinc-200 dark:border-zinc-800">{(Object.keys(evidenceModes) as Array<keyof typeof evidenceModes>).map((key) => <button key={key} type="button" aria-pressed={mode === key} onClick={() => setMode(key)} className={"min-h-11 border-r border-zinc-200 px-2 text-sm last:border-r-0 dark:border-zinc-800 " + (mode === key ? "bg-sky-100 font-semibold text-sky-950 dark:bg-sky-950 dark:text-sky-100" : "bg-white text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300")}>{evidenceModes[key].label}</button>)}</div>
    <div className="grid min-h-32 gap-3 p-4 sm:grid-cols-[10rem_1fr]" aria-live="polite"><div className="rounded border border-sky-200 bg-sky-50 p-3 dark:border-sky-900 dark:bg-sky-950/30"><p className="text-xs text-sky-700 dark:text-sky-300">当前判定</p><p className="mt-2 text-sm font-semibold text-sky-950 dark:text-sky-100">{current.result}</p></div><p className="self-center text-sm text-zinc-700 dark:text-zinc-300">{current.note} 证据必须绑定 Java 25、源码版本、输入、命令、实际输出与适用边界。</p></div>
  </section>;
}
