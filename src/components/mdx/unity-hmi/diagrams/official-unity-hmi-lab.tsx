"use client";

import { useMemo, useState } from "react";

type View = "scope" | "decision" | "recovery";
type Scenario = "baseline" | "fault" | "recovery";
type HmiModel = {
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
type Props = {
  unitId: string;
  title: string;
  concepts: readonly string[];
  chain: readonly string[];
  model: HmiModel;
  view: View;
};

const scenarioLabels: Record<Scenario, string> = {
  baseline: "固定配置",
  fault: "注入故障",
  recovery: "恢复重放",
};
const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function OfficialUnityHmiLab({ unitId, title, concepts, chain, model, view }: Props) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [axisA, setAxisA] = useState(1);
  const [axisB, setAxisB] = useState(1);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [captures, setCaptures] = useState(0);
  const result = useMemo(() => {
    const faultPenalty = scenario === "fault" ? 38 : 0;
    const recoveryGain = scenario === "recovery" ? 13 : 0;
    const confidence = clamp(52 + axisA * 12 + axisB * 8 - faultPenalty + recoveryGain);
    const exposure = clamp(62 - axisA * 12 - axisB * 7 + faultPenalty - recoveryGain);
    const evidence = clamp(50 + axisB * 12 + captures * 8 - (scenario === "fault" ? 11 : 0) + (scenario === "recovery" ? 8 : 0));
    return {
      confidence,
      exposure,
      evidence,
      pass: confidence >= 65 && exposure <= 55 && evidence >= 58,
    };
  }, [axisA, axisB, captures, scenario]);
  const reset = () => {
    setConceptIndex(0);
    setAxisA(1);
    setAxisB(1);
    setScenario("baseline");
    setCaptures(0);
  };
  const current = concepts[conceptIndex] ?? title;
  const viewLabel = view === "scope" ? "原页—工程范围" : view === "decision" ? "单变量决策" : "故障与恢复";

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${title} · ${model.studio}实验`}
      data-uhm-unit={unitId}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">Unity for HMI 2024 · {model.studio} · {viewLabel}</p>
          <h3 className="break-words text-base font-semibold">{title}</h3>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-zinc-300 bg-white px-3 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"
          aria-label={`重置${model.studio}`}
        >
          <span aria-hidden="true">↺</span>
        </button>
      </header>

      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)]">
        <div className="min-w-0 border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
          {view === "scope" ? (
            <>
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">选择原演讲节点，区分页级主张、工程解释、补证任务与不能推出项。</p>
              <div className="max-h-72 overflow-y-auto rounded border border-zinc-200 p-2 dark:border-zinc-800">
                <div className="grid gap-2 sm:grid-cols-2">
                  {concepts.map((concept, index) => (
                    <button
                      key={`${concept}-${index}`}
                      type="button"
                      onClick={() => setConceptIndex(index)}
                      aria-pressed={conceptIndex === index}
                      className={`min-h-11 min-w-0 rounded border px-3 py-2 text-left text-xs leading-5 [overflow-wrap:anywhere] ${conceptIndex === index ? "border-cyan-700 bg-cyan-50 font-semibold text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50" : "border-zinc-300 dark:border-zinc-700"}`}
                    >
                      {concept}
                    </button>
                  ))}
                </div>
              </div>
              <ol className="mt-4 grid gap-2 sm:grid-cols-5">
                {chain.map((stage, index) => (
                  <li key={stage} className={`min-w-0 border p-2 text-xs [overflow-wrap:anywhere] ${index === conceptIndex % chain.length ? "border-sky-600 bg-sky-50 dark:bg-sky-950" : "border-zinc-200 dark:border-zinc-800"}`}>
                    <span className="block font-mono font-semibold">0{index + 1}</span>
                    {stage}
                  </li>
                ))}
              </ol>
            </>
          ) : view === "decision" ? (
            <div className="space-y-5">
              {[[model.axisA, axisA, setAxisA], [model.axisB, axisB, setAxisB]].map(([axis, value, setter]) => {
                const typedAxis = axis as HmiModel["axisA"];
                return (
                  <fieldset key={typedAxis.label}>
                    <legend className="mb-2 text-sm font-semibold">{typedAxis.label}</legend>
                    <div className="grid grid-cols-3 gap-2">
                      {typedAxis.levels.map((level, index) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => (setter as (next: number) => void)(index)}
                          aria-pressed={value === index}
                          className={`min-h-11 min-w-0 rounded border px-2 py-2 text-xs [overflow-wrap:anywhere] ${value === index ? "border-sky-700 bg-sky-50 font-semibold text-sky-950 dark:bg-sky-950 dark:text-sky-50" : "border-zinc-300 dark:border-zinc-700"}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                );
              })}
              <div className="rounded border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
                <strong>本页操作任务</strong>
                <p className="mt-1 [overflow-wrap:anywhere]">{model.task}</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">用同一构建ID、平台锁、场景输入和采集窗口比较基线、故障与恢复；恢复后必须清除派生缓存再重放。</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(Object.keys(scenarioLabels) as Scenario[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setScenario(item)}
                    aria-pressed={scenario === item}
                    className={`min-h-11 rounded border px-2 py-2 text-xs ${scenario === item ? "border-zinc-950 bg-zinc-950 font-semibold text-white dark:border-white dark:bg-white dark:text-zinc-950" : "border-zinc-300 dark:border-zinc-700"}`}
                  >
                    {scenarioLabels[item]}
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded border border-rose-300 bg-rose-50 p-3 text-sm text-rose-950 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-50">
                <strong>失败注入</strong>
                <p className="mt-1 [overflow-wrap:anywhere]">{model.fault}</p>
              </div>
              <div className="mt-3 rounded border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-50">
                <strong>恢复不变量</strong>
                <p className="mt-1 [overflow-wrap:anywhere]">{model.invariant}</p>
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 p-4">
          <p className="text-xs font-semibold text-zinc-500">当前HMI证据坐标</p>
          <p className="mt-1 text-sm font-semibold [overflow-wrap:anywhere]">{current}</p>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">{model.boundary}</p>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
            {[[model.metric, result.confidence], [model.risk, result.exposure], ["证据闭环度", result.evidence]].map(([label, value]) => (
              <div key={String(label)} className="min-w-0 border border-zinc-200 p-2 dark:border-zinc-800">
                <dt className="min-h-10 [overflow-wrap:anywhere]">{label}</dt>
                <dd className="mt-1 text-lg font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <div className={`mt-3 border p-3 text-sm ${result.pass ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-50"}`}>
            <strong>{result.pass ? "范围、配置与证据可进入评审" : "仍需缩小主张或补目标机证据"}</strong>
            <p className="mt-1 [overflow-wrap:anywhere]">{model.artifact}；核对 {model.signal}。</p>
          </div>
          <button
            type="button"
            onClick={() => setCaptures((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded bg-cyan-700 px-3 py-2 text-sm font-semibold text-white hover:bg-cyan-800"
          >
            保存本页原始证据 #{captures + 1}
          </button>
        </div>
      </div>
    </section>
  );
}
