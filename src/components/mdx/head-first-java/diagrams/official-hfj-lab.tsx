"use client";

import { useMemo, useState } from "react";

type LabProps = { title: string; focus: string; stages: string[] };

const evidenceModes = {
  normal: { label: "正常", result: "合同成立", note: "类型、输出和状态转移与预测一致。" },
  boundary: { label: "边界", result: "缩小范围", note: "空值、极值、关闭或调度变化暴露遗漏前提。" },
  counter: { label: "反例", result: "退回修复", note: "反例推翻核心解释，不能只修改展示文本。" },
} as const;

export function HfjReferenceMapLab({ title, focus, stages }: LabProps) {
  const [selected, setSelected] = useState(0);
  function resetExperiment() {
    setSelected(0);
  }

  return (
    <section className="my-6 overflow-hidden rounded-md border border-emerald-300 bg-white dark:border-emerald-800 dark:bg-zinc-950">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="border-b border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/40">
        <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-100">{title}</p>
        <p className="mt-1 text-xs text-emerald-800 dark:text-emerald-300">当前合同：{focus}</p>
      </header>
      <div className="grid gap-2 p-4 sm:grid-cols-5">
        {stages.map((stage, index) => (
          <button key={stage} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={"min-h-20 rounded border px-2 py-3 text-left text-xs transition " + (selected === index ? "border-emerald-600 bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-100" : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-emerald-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300")}>
            <span className="block font-mono text-[11px]">0{index + 1}</span>
            <span className="mt-2 block font-semibold">{stage}</span>
          </button>
        ))}
      </div>
      <div className="grid min-h-28 gap-2 border-t border-zinc-200 p-4 sm:grid-cols-3 dark:border-zinc-800" aria-live="polite">
        <div className="rounded border border-zinc-200 p-3 dark:border-zinc-800"><p className="text-xs text-zinc-500">输入</p><p className="mt-2 text-sm">冻结代码与前置状态</p></div>
        <div className="rounded border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/30"><p className="text-xs text-emerald-700">当前阶段</p><p className="mt-2 text-sm font-semibold">{stages[selected]}</p></div>
        <div className="rounded border border-zinc-200 p-3 dark:border-zinc-800"><p className="text-xs text-zinc-500">证据</p><p className="mt-2 text-sm">命令、输出、状态和解释</p></div>
      </div>
    </section>
  );
}

export function HfjExecutionExperimentLab({ title, focus }: LabProps) {
  const [objects, setObjects] = useState(4);
  const [operations, setOperations] = useState(12);
  const [workers, setWorkers] = useState(1);
  function resetExperiment() {
    setObjects(4);
    setOperations(12);
    setWorkers(1);
  }

  const metrics = useMemo(() => {
    const work = objects * operations;
    const ideal = work / workers;
    const coordination = workers === 1 ? 0 : (workers - 1) * Math.log2(objects + 1);
    return { work, ideal, coordination, observed: ideal + coordination };
  }, [objects, operations, workers]);
  return (
    <section className="my-6 overflow-hidden rounded-md border border-amber-300 bg-white dark:border-amber-800 dark:bg-zinc-950">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900 dark:bg-amber-950/30"><p className="text-sm font-semibold text-amber-950 dark:text-amber-100">{title}</p><p className="mt-1 text-xs text-amber-800 dark:text-amber-300">实验工件：{focus}</p></header>
      <div className="grid gap-5 p-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">对象数：{objects}<input className="mt-2 w-full accent-emerald-600" type="range" min="1" max="20" value={objects} onChange={(event) => setObjects(Number(event.target.value))} /></label>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">每对象操作：{operations}<input className="mt-2 w-full accent-amber-600" type="range" min="1" max="40" value={operations} onChange={(event) => setOperations(Number(event.target.value))} /></label>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">工作线程：{workers}<input className="mt-2 w-full accent-sky-600" type="range" min="1" max="8" value={workers} onChange={(event) => setWorkers(Number(event.target.value))} /></label>
        </div>
        <div className="grid grid-cols-2 gap-2" aria-live="polite">
          {[ ["总工作", metrics.work.toFixed(0)], ["理想步数", metrics.ideal.toFixed(1)], ["协调成本", metrics.coordination.toFixed(1)], ["估算总量", metrics.observed.toFixed(1)] ].map(([label, value]) => <div key={label} className="min-h-24 rounded border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900"><p className="text-xs text-zinc-500">{label}</p><p className="mt-2 font-mono text-lg font-semibold text-zinc-900 dark:text-zinc-100">{value}</p></div>)}
        </div>
      </div>
    </section>
  );
}

export function HfjEvidenceLab({ title, focus }: LabProps) {
  const [mode, setMode] = useState<keyof typeof evidenceModes>("normal");
  function resetExperiment() {
    setMode("normal");
  }

  const current = evidenceModes[mode];
  return (
    <section className="my-6 overflow-hidden rounded-md border border-sky-300 bg-white dark:border-sky-800 dark:bg-zinc-950">
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="border-b border-sky-200 bg-sky-50 px-4 py-3 dark:border-sky-900 dark:bg-sky-950/30"><p className="text-sm font-semibold text-sky-950 dark:text-sky-100">{title}</p><p className="mt-1 text-xs text-sky-800 dark:text-sky-300">反例焦点：{focus}</p></header>
      <div className="grid grid-cols-3 border-b border-zinc-200 dark:border-zinc-800">
        {(Object.keys(evidenceModes) as Array<keyof typeof evidenceModes>).map((key) => <button key={key} type="button" aria-pressed={mode === key} onClick={() => setMode(key)} className={"min-h-11 border-r border-zinc-200 px-2 text-sm last:border-r-0 dark:border-zinc-800 " + (mode === key ? "bg-sky-100 font-semibold text-sky-950 dark:bg-sky-950 dark:text-sky-100" : "bg-white text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300")}>{evidenceModes[key].label}</button>)}
      </div>
      <div className="grid min-h-32 gap-3 p-4 sm:grid-cols-[10rem_1fr]" aria-live="polite"><div className="rounded border border-sky-200 bg-sky-50 p-3 dark:border-sky-900 dark:bg-sky-950/30"><p className="text-xs text-sky-700 dark:text-sky-300">判定</p><p className="mt-2 text-sm font-semibold text-sky-950 dark:text-sky-100">{current.result}</p></div><p className="self-center text-sm text-zinc-700 dark:text-zinc-300">{current.note} 必须保存输入、JDK 版本、命令、输出与解释，才可进入下一单元。</p></div>
    </section>
  );
}
