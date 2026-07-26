"use client";

import { useMemo, useState } from "react";
type LabProps = { title: string; focus: string; stages: string[] };
const modes = {
  before: { label: "原方案", result: "风险未界定", note: "只描述实现，没有公开合同与失败边界。" },
  item: { label: "采用Item", result: "合同收紧", note: "按建议改变API，并保留被放弃方案。" },
  counter: { label: "反例", result: "适用域明确", note: "反例决定保留、调整或拒绝该建议。" },
} as const;

export function EjvDecisionMapLab({ title, focus, stages }: LabProps) {
  const [selected, setSelected] = useState(0);
  function resetExperiment() {
    setSelected(0);
  }

  return <section className="my-6 overflow-hidden rounded-md border border-emerald-300 bg-white dark:border-emerald-800 dark:bg-zinc-950">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span><header className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/40"><p className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">{title}</p><p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">评审焦点：{focus}</p></header><div className="grid gap-2 p-4 sm:grid-cols-5">{stages.map((stage, index) => <button key={stage} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={"min-h-20 rounded border px-2 py-3 text-left text-xs transition " + (selected === index ? "border-emerald-600 bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-100" : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-emerald-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300")}><span className="block font-mono text-[11px]">0{index + 1}</span><span className="mt-2 block font-semibold">{stage}</span></button>)}</div><div className="grid min-h-28 gap-2 border-t border-zinc-200 p-4 sm:grid-cols-3 dark:border-zinc-800" aria-live="polite">{[["context", "调用者与版本"], ["current", stages[selected]], ["evidence", "代码+测试+取舍"]].map(([label, value]) => <div key={label} className="rounded border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"><p className="font-mono text-[11px] text-zinc-500">{label}</p><p className="mt-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200">{value}</p></div>)}</div></section>;
}

export function EjvTradeoffExperimentLab({ title, focus }: LabProps) {
  const [surface, setSurface] = useState(12); const [mutability, setMutability] = useState(35); const [clients, setClients] = useState(8);
  function resetExperiment() {
    setSurface(12);
    setMutability(35);
    setClients(8);
  }

  const metrics = useMemo(() => { const compatibility = surface * clients; const stateRisk = compatibility * mutability / 100; const testCases = Math.ceil(surface * (1 + mutability / 50)); return { compatibility, stateRisk, testCases, score: Math.max(0, 100 - stateRisk / 2) }; }, [surface, mutability, clients]);
  return <section className="my-6 overflow-hidden rounded-md border border-amber-300 bg-white dark:border-amber-800 dark:bg-zinc-950">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span><header className="border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/30"><p className="text-sm font-semibold text-amber-950 dark:text-amber-100">{title}</p><p className="mt-1 text-xs text-amber-800 dark:text-amber-300">决策工件：{focus}</p></header><div className="grid gap-5 p-4 lg:grid-cols-[1fr_1.1fr]"><div className="space-y-4"><label className="block text-xs text-zinc-700 dark:text-zinc-300">公开成员：{surface}<input className="mt-2 w-full accent-emerald-600" type="range" min="2" max="40" value={surface} onChange={(event) => setSurface(Number(event.target.value))} /></label><label className="block text-xs text-zinc-700 dark:text-zinc-300">可变状态：{mutability}%<input className="mt-2 w-full accent-amber-600" type="range" min="0" max="100" value={mutability} onChange={(event) => setMutability(Number(event.target.value))} /></label><label className="block text-xs text-zinc-700 dark:text-zinc-300">调用方：{clients}<input className="mt-2 w-full accent-sky-600" type="range" min="1" max="30" value={clients} onChange={(event) => setClients(Number(event.target.value))} /></label></div><div className="grid grid-cols-2 gap-2" aria-live="polite">{[["兼容触点", metrics.compatibility.toFixed(0)], ["状态风险", metrics.stateRisk.toFixed(1)], ["测试下界", metrics.testCases.toFixed(0)], ["可演化分", metrics.score.toFixed(0)]].map(([label, value]) => <div key={label} className="min-h-24 rounded border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"><p className="text-xs text-zinc-500">{label}</p><p className="mt-2 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">{value}</p></div>)}</div></div></section>;
}

export function EjvEvidenceLab({ title, focus }: LabProps) {
  const [mode, setMode] = useState<keyof typeof modes>("before");
  function resetExperiment() {
    setMode("before");
  }
 const current = modes[mode];
  return <section className="my-6 overflow-hidden rounded-md border border-sky-300 bg-white dark:border-sky-800 dark:bg-zinc-950">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span><header className="border-b border-sky-200 bg-sky-50 px-4 py-3 dark:border-sky-900 dark:bg-sky-950/30"><p className="text-sm font-semibold text-sky-950 dark:text-sky-100">{title}</p><p className="mt-1 text-xs text-sky-800 dark:text-sky-300">反例焦点：{focus}</p></header><div className="grid grid-cols-3 border-b border-zinc-200 dark:border-zinc-800">{(Object.keys(modes) as Array<keyof typeof modes>).map((key) => <button key={key} type="button" aria-pressed={mode === key} onClick={() => setMode(key)} className={"min-h-11 border-r border-zinc-200 px-2 text-sm last:border-r-0 dark:border-zinc-800 " + (mode === key ? "bg-sky-100 font-semibold text-sky-950 dark:bg-sky-950 dark:text-sky-100" : "bg-white text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300")}>{modes[key].label}</button>)}</div><div className="grid min-h-32 gap-3 p-4 sm:grid-cols-[10rem_1fr]" aria-live="polite"><div className="rounded border border-sky-200 bg-sky-50 p-3 dark:border-sky-900 dark:bg-sky-950/30"><p className="text-xs text-sky-700 dark:text-sky-300">判定</p><p className="mt-2 text-sm font-semibold text-sky-950 dark:text-sky-100">{current.result}</p></div><p className="self-center text-sm text-zinc-700 dark:text-zinc-300">{current.note} 记录Java版本、调用方、替代方案、反例与回滚条件。</p></div></section>;
}
