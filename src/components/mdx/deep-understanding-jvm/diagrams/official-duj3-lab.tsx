"use client";

import { useMemo, useState } from "react";

type View = "structure" | "execution" | "evidence";
type Scenario = "baseline" | "fault" | "recovery";
type VmModel = {
  studio: string;
  boundary: string;
  axisA: { label: string; levels: readonly [string, string, string] };
  axisB: { label: string; levels: readonly [string, string, string] };
  metric: string;
  risk: string;
  fault: string;
  invariant: string;
  task: string;
  artifact: string;
  signal: string;
  practiceMode: string;
};
type Props = { unitId: string; title: string; concepts: readonly string[]; chain: readonly string[]; model: VmModel; view: View };

const labels: Record<Scenario, string> = { baseline: "固定基线", fault: "故障变体", recovery: "恢复重放" };
const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function OfficialDuj3Lab({ unitId, title, concepts, chain, model, view }: Props) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [axisA, setAxisA] = useState(1);
  const [axisB, setAxisB] = useState(1);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [snapshots, setSnapshots] = useState(0);
  const result = useMemo(() => {
    const penalty = scenario === "fault" ? 31 : 0;
    const recovery = scenario === "recovery" ? 14 : 0;
    const reproducibility = clamp(45 + axisA * 15 + axisB * 8 - penalty + recovery);
    const distortion = clamp(20 + axisA * 8 - axisB * 5 + penalty - recovery);
    const evidence = clamp(43 + axisB * 13 + snapshots * 8 - (scenario === "fault" ? 9 : 0));
    return { reproducibility, distortion, evidence, pass: reproducibility >= 60 && distortion <= 58 && evidence >= 58 };
  }, [axisA, axisB, scenario, snapshots]);
  const reset = () => { setConceptIndex(0); setAxisA(1); setAxisB(1); setScenario("baseline"); setSnapshots(0); };
  const current = concepts[conceptIndex] ?? title;

  return (
    <section className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50" aria-label={`${title} · ${model.studio}实验`} data-duj3-unit={unitId}>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0"><p className="text-xs font-semibold text-orange-700 dark:text-orange-300">深入理解JVM 3e · {model.studio} · {view === "structure" ? "规范—实现地图" : view === "execution" ? "单变量探针" : "故障与恢复"}</p><h3 className="break-words text-base font-semibold">{title}</h3></div>
        <button type="button" onClick={reset} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-zinc-300 bg-white px-3 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800" aria-label={`重置${model.studio}`}><span aria-hidden="true">↺</span></button>
      </header>
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)]">
        <div className="min-w-0 border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
          {view === "structure" ? <>
            <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">选择正式节点，先判定规范、HotSpot实现、JDK发行版与应用观测层次。</p>
            <div className="max-h-72 overflow-y-auto rounded border border-zinc-200 p-2 dark:border-zinc-800"><div className="grid gap-2 sm:grid-cols-2">{concepts.map((concept, index) => <button key={`${concept}-${index}`} type="button" onClick={() => setConceptIndex(index)} aria-pressed={conceptIndex === index} className={`min-h-11 min-w-0 rounded border px-3 py-2 text-left text-xs leading-5 [overflow-wrap:anywhere] ${conceptIndex === index ? "border-orange-700 bg-orange-50 font-semibold text-orange-950 dark:bg-orange-950 dark:text-orange-50" : "border-zinc-300 dark:border-zinc-700"}`}>{concept}</button>)}</div></div>
            <ol className="mt-4 grid gap-2 sm:grid-cols-5">{chain.map((stage, index) => <li key={stage} className={`min-w-0 border p-2 text-xs [overflow-wrap:anywhere] ${index === conceptIndex % chain.length ? "border-violet-600 bg-violet-50 dark:bg-violet-950" : "border-zinc-200 dark:border-zinc-800"}`}><span className="block font-mono font-semibold">0{index + 1}</span>{stage}</li>)}</ol>
          </> : view === "execution" ? <div className="space-y-5">
            {[[model.axisA, axisA, setAxisA], [model.axisB, axisB, setAxisB]].map(([axis, value, setter]) => { const typed = axis as VmModel["axisA"]; return <fieldset key={typed.label}><legend className="mb-2 text-sm font-semibold">{typed.label}</legend><div className="grid grid-cols-3 gap-2">{typed.levels.map((level, index) => <button key={level} type="button" onClick={() => (setter as (next: number) => void)(index)} aria-pressed={value === index} className={`min-h-11 min-w-0 rounded border px-2 py-2 text-xs [overflow-wrap:anywhere] ${value === index ? "border-violet-700 bg-violet-50 font-semibold text-violet-950 dark:bg-violet-950 dark:text-violet-50" : "border-zinc-300 dark:border-zinc-700"}`}>{level}</button>)}</div></fieldset>; })}
            <div className="rounded border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900"><strong>章专属探针</strong><p className="mt-1 [overflow-wrap:anywhere]">{model.task}</p></div>
          </div> : <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">使用同一JDK镜像、参数、工作量与采集窗口比较基线、故障和恢复，禁止复用污染的日志或转储。</p>
            <div className="mt-3 grid grid-cols-3 gap-2">{(Object.keys(labels) as Scenario[]).map((item) => <button key={item} type="button" onClick={() => setScenario(item)} aria-pressed={scenario === item} className={`min-h-11 rounded border px-2 py-2 text-xs ${scenario === item ? "border-zinc-950 bg-zinc-950 font-semibold text-white dark:border-white dark:bg-white dark:text-zinc-950" : "border-zinc-300 dark:border-zinc-700"}`}>{labels[item]}</button>)}</div>
            <div className="mt-4 rounded border border-rose-300 bg-rose-50 p-3 text-sm text-rose-950 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-50"><strong>失败样本</strong><p className="mt-1 [overflow-wrap:anywhere]">{model.fault}</p></div>
            <div className="mt-3 rounded border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-50"><strong>恢复不变量</strong><p className="mt-1 [overflow-wrap:anywhere]">{model.invariant}</p></div>
          </div>}
        </div>
        <div className="min-w-0 p-4">
          <p className="text-xs font-semibold text-zinc-500">当前虚拟机坐标</p><p className="mt-1 text-sm font-semibold [overflow-wrap:anywhere]">{current}</p><p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">{model.boundary}</p>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">{[[model.metric, result.reproducibility], [model.risk, result.distortion], ["证据闭环度", result.evidence]].map(([label, value]) => <div key={String(label)} className="min-w-0 border border-zinc-200 p-2 dark:border-zinc-800"><dt className="min-h-10 [overflow-wrap:anywhere]">{label}</dt><dd className="mt-1 text-lg font-semibold">{value}</dd></div>)}</dl>
          <div className={`mt-3 border p-3 text-sm ${result.pass ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-50"}`}><strong>{result.pass ? "层次、探针与证据可交付" : "仍需缩小结论或补对照"}</strong><p className="mt-1 [overflow-wrap:anywhere]">{model.artifact}；核对 {model.signal}。</p></div>
          <button type="button" onClick={() => setSnapshots((value) => value + 1)} className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded bg-orange-700 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-800">保存JVM原始证据 #{snapshots + 1}</button>
        </div>
      </div>
    </section>
  );
}
