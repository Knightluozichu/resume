"use client";

import { useMemo, useState } from "react";

type LabView = "map" | "experiment" | "evidence";
type Scenario = "baseline" | "boundary" | "recovery";

type StatisticalModel = {
  studio: string;
  axisA: { label: string; levels: readonly [string, string, string] };
  axisB: { label: string; levels: readonly [string, string, string] };
  metric: string;
  risk: string;
  fault: string;
  invariant: string;
  task: string;
  practiceMode: string;
};

type Props = {
  unitId: string;
  title: string;
  concepts: readonly string[];
  chain: readonly string[];
  model: StatisticalModel;
  view: LabView;
};

const scenarios: Record<Scenario, string> = {
  baseline: "训练基线",
  boundary: "前提边界",
  recovery: "修复重算",
};
const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function OfficialStatisticalLearningLab({ unitId, title, concepts, chain, model, view }: Props) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [axisA, setAxisA] = useState(1);
  const [axisB, setAxisB] = useState(1);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [checks, setChecks] = useState(0);

  const result = useMemo(() => {
    const boundary = scenario === "boundary" ? 27 : scenario === "recovery" ? 5 : 0;
    const fit = clamp(42 + axisA * 16 + axisB * 8 - boundary + (scenario === "recovery" ? 16 : 0));
    const risk = clamp(28 + axisA * 9 - axisB * 7 + boundary);
    const evidence = clamp(45 + axisB * 13 + checks * 7 - (scenario === "boundary" ? 8 : 0));
    return { fit, risk, evidence, pass: fit >= 58 && risk <= 62 && evidence >= 58 };
  }, [axisA, axisB, checks, scenario]);

  const reset = () => {
    setConceptIndex(0);
    setAxisA(1);
    setAxisB(1);
    setScenario("baseline");
    setChecks(0);
  };
  const current = concepts[conceptIndex] ?? concepts[0];

  return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={`${title} · ${model.studio}实验`} data-slm-unit={unitId}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">统计学习方法 2e · {model.studio} · {view === "map" ? "模型地图" : view === "experiment" ? "单变量计算" : "边界与复算"}</p>
          <h3 className="break-words text-base font-semibold">{title}</h3>
        </div>
        <button type="button" onClick={reset} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-zinc-300 bg-white px-3 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800" aria-label={`重置${model.studio}`}><span aria-hidden="true">↺</span></button>
      </header>

      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)]">
        <div className="min-w-0 border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
          {view === "map" ? (
            <>
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">选择正式节点，先写模型对象、优化或推断量、成立前提和可手算断言。</p>
              <div className="max-h-72 overflow-y-auto rounded border border-zinc-200 p-2 dark:border-zinc-800">
                <div className="grid gap-2 sm:grid-cols-2">
                  {concepts.map((concept, index) => <button key={`${concept}-${index}`} type="button" onClick={() => setConceptIndex(index)} aria-pressed={index === conceptIndex} className={`min-h-11 min-w-0 rounded border px-3 py-2 text-left text-xs leading-5 [overflow-wrap:anywhere] ${index === conceptIndex ? "border-blue-600 bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-50" : "border-zinc-300 dark:border-zinc-700"}`}>{concept}</button>)}
                </div>
              </div>
              <ol className="mt-4 grid gap-2 sm:grid-cols-5">{chain.map((stage, index) => <li key={stage} className={`min-w-0 border p-2 text-xs [overflow-wrap:anywhere] ${index === conceptIndex % chain.length ? "border-violet-500 bg-violet-50 dark:bg-violet-950" : "border-zinc-200 dark:border-zinc-800"}`}><span className="block font-mono font-semibold">0{index + 1}</span>{stage}</li>)}</ol>
            </>
          ) : view === "experiment" ? (
            <div className="space-y-5">
              {[[model.axisA, axisA, setAxisA], [model.axisB, axisB, setAxisB]].map(([axis, value, setter]) => {
                const typed = axis as StatisticalModel["axisA"];
                return <fieldset key={typed.label}><legend className="mb-2 text-sm font-semibold">{typed.label}</legend><div className="grid grid-cols-3 gap-2">{typed.levels.map((level, index) => <button key={level} type="button" onClick={() => (setter as (next: number) => void)(index)} aria-pressed={value === index} className={`min-h-11 min-w-0 rounded border px-2 py-2 text-xs [overflow-wrap:anywhere] ${value === index ? "border-violet-700 bg-violet-50 font-semibold text-violet-950 dark:bg-violet-950 dark:text-violet-50" : "border-zinc-300 dark:border-zinc-700"}`}>{level}</button>)}</div></fieldset>;
              })}
              <div className="rounded border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"><strong>计算任务</strong><p className="mt-1 [overflow-wrap:anywhere]">{model.task}</p></div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">用同一数据、折分和随机种子比较基线、前提破坏与修复重算；复算不得复用污染的派生状态。</p>
              <div className="mt-3 grid grid-cols-3 gap-2">{(Object.keys(scenarios) as Scenario[]).map((key) => <button key={key} type="button" onClick={() => setScenario(key)} aria-pressed={scenario === key} className={`min-h-11 rounded border px-2 py-2 text-xs ${scenario === key ? "border-zinc-950 bg-zinc-950 font-semibold text-white dark:border-white dark:bg-white dark:text-zinc-950" : "border-zinc-300 dark:border-zinc-700"}`}>{scenarios[key]}</button>)}</div>
              <div className="mt-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-950 dark:border-red-800 dark:bg-red-950 dark:text-red-50"><strong>失败样本</strong><p className="mt-1 [overflow-wrap:anywhere]">{model.fault}</p></div>
              <div className="mt-3 rounded border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-50"><strong>通过不变量</strong><p className="mt-1 [overflow-wrap:anywhere]">{model.invariant}</p></div>
            </div>
          )}
        </div>

        <div className="min-w-0 p-4">
          <p className="text-xs font-semibold text-zinc-500">当前数学坐标</p><p className="mt-1 text-sm font-semibold [overflow-wrap:anywhere]">{current}</p><p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">{chain[conceptIndex % chain.length]}</p>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">{[[model.metric, result.fit], [model.risk, result.risk], ["证据闭环度", result.evidence]].map(([label, value]) => <div key={String(label)} className="min-w-0 border border-zinc-200 p-2 dark:border-zinc-800"><dt className="min-h-10 [overflow-wrap:anywhere]">{label}</dt><dd className="mt-1 text-lg font-semibold">{value}</dd></div>)}</dl>
          <div className={`mt-3 border p-3 text-sm ${result.pass ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-50"}`}><strong>{result.pass ? "计算与边界证据可接受" : "检查前提、尺度或泄漏"}</strong><p className="mt-1 [overflow-wrap:anywhere]">{model.task}</p></div>
          <button type="button" onClick={() => setChecks((value) => value + 1)} className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800">保存手算/残差快照 #{checks + 1}</button>
        </div>
      </div>
    </section>
  );
}
