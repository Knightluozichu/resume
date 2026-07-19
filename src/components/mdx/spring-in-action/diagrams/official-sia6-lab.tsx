"use client";

import { useMemo, useState } from "react";

type LabView = "map" | "experiment" | "evidence";
type Scenario = "baseline" | "fault" | "recovery";

type SpringLabModel = {
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
  model: SpringLabModel;
  view: LabView;
};

const scenarioLabels: Record<Scenario, string> = {
  baseline: "合同基线",
  fault: "受控故障",
  recovery: "修复重放",
};

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function OfficialSiaLab({ unitId, title, concepts, chain, model, view }: Props) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [axisA, setAxisA] = useState(1);
  const [axisB, setAxisB] = useState(1);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [snapshots, setSnapshots] = useState(0);

  const result = useMemo(() => {
    const faultPenalty = scenario === "fault" ? 34 : 0;
    const recoveryGain = scenario === "recovery" ? 15 : 0;
    const contract = clamp(46 + axisA * 15 + axisB * 7 - faultPenalty + recoveryGain);
    const exposure = clamp(18 + axisA * 9 - axisB * 5 + faultPenalty - recoveryGain);
    const evidence = clamp(42 + axisB * 14 + snapshots * 8 - (scenario === "fault" ? 10 : 0));
    return {
      contract,
      exposure,
      evidence,
      pass: contract >= 60 && exposure <= 58 && evidence >= 58,
    };
  }, [axisA, axisB, scenario, snapshots]);

  const reset = () => {
    setConceptIndex(0);
    setAxisA(1);
    setAxisB(1);
    setScenario("baseline");
    setSnapshots(0);
  };

  const currentConcept = concepts[conceptIndex] ?? concepts[0] ?? title;

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${title} · ${model.studio}`}
      data-sia-unit={unitId}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            Spring in Action 6e · {model.studio} · {view === "map" ? "边界地图" : view === "experiment" ? "单变量实验" : "故障与恢复"}
          </p>
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
          {view === "map" ? (
            <>
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">
                选择正式目录节点，为它绑定请求或事件入口、Spring 边界、领域结果与可反证信号。
              </p>
              <div className="max-h-72 overflow-y-auto rounded border border-zinc-200 p-2 dark:border-zinc-800">
                <div className="grid gap-2 sm:grid-cols-2">
                  {concepts.map((concept, index) => (
                    <button
                      key={`${concept}-${index}`}
                      type="button"
                      onClick={() => setConceptIndex(index)}
                      aria-pressed={conceptIndex === index}
                      className={`min-h-11 min-w-0 rounded border px-3 py-2 text-left text-xs leading-5 [overflow-wrap:anywhere] ${conceptIndex === index ? "border-emerald-700 bg-emerald-50 font-semibold text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-zinc-300 dark:border-zinc-700"}`}
                    >
                      {concept}
                    </button>
                  ))}
                </div>
              </div>
              <ol className="mt-4 grid gap-2 sm:grid-cols-5">
                {chain.map((stage, index) => (
                  <li key={stage} className={`min-w-0 border p-2 text-xs [overflow-wrap:anywhere] ${index === conceptIndex % chain.length ? "border-cyan-600 bg-cyan-50 dark:bg-cyan-950" : "border-zinc-200 dark:border-zinc-800"}`}>
                    <span className="block font-mono font-semibold">0{index + 1}</span>
                    {stage}
                  </li>
                ))}
              </ol>
            </>
          ) : view === "experiment" ? (
            <div className="space-y-5">
              {[[model.axisA, axisA, setAxisA], [model.axisB, axisB, setAxisB]].map(([axis, value, setter]) => {
                const typedAxis = axis as SpringLabModel["axisA"];
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
                          className={`min-h-11 min-w-0 rounded border px-2 py-2 text-xs [overflow-wrap:anywhere] ${value === index ? "border-cyan-700 bg-cyan-50 font-semibold text-cyan-950 dark:bg-cyan-950 dark:text-cyan-50" : "border-zinc-300 dark:border-zinc-700"}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                );
              })}
              <div className="rounded border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-900">
                <strong>章专属操作</strong>
                <p className="mt-1 [overflow-wrap:anywhere]">{model.task}</p>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                在同一提交、输入、配置和依赖版本下比较基线、故障与恢复；恢复必须重新建立派生状态。
              </p>
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
                <strong>失败样本</strong>
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
          <p className="text-xs font-semibold text-zinc-500">当前 Spring 边界</p>
          <p className="mt-1 text-sm font-semibold [overflow-wrap:anywhere]">{currentConcept}</p>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">{model.boundary}</p>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
            {[[model.metric, result.contract], [model.risk, result.exposure], ["证据闭环度", result.evidence]].map(([label, value]) => (
              <div key={String(label)} className="min-w-0 border border-zinc-200 p-2 dark:border-zinc-800">
                <dt className="min-h-10 [overflow-wrap:anywhere]">{label}</dt>
                <dd className="mt-1 text-lg font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <div className={`mt-3 border p-3 text-sm ${result.pass ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-50"}`}>
            <strong>{result.pass ? "合同、风险与证据可交付" : "仍需缩小边界或补证据"}</strong>
            <p className="mt-1 [overflow-wrap:anywhere]">{model.artifact}；观察 {model.signal}。</p>
          </div>
          <button
            type="button"
            onClick={() => setSnapshots((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            保存合同/故障快照 #{snapshots + 1}
          </button>
        </div>
      </div>
    </section>
  );
}
