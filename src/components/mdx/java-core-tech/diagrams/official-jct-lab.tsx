"use client";

import { useMemo, useState } from "react";

type Mode = "map" | "experiment" | "evidence";
type Scenario = "baseline" | "fault" | "recovery";

type LabModel = {
  studio: string;
  axisA: { label: string; levels: readonly [string, string, string] };
  axisB: { label: string; levels: readonly [string, string, string] };
  outcomes: { success: string; risk: string; evidence: string };
  fault: string;
  task: string;
  invariant: string;
  probe: string;
  practiceMode: string;
  riskEffects: readonly [number, number];
};

type Props = {
  unitId: string;
  title: string;
  concepts: readonly string[];
  stages: readonly string[];
  focuses: readonly string[];
  model: LabModel;
  mode: Mode;
};

const scenarioLabels: Record<Scenario, string> = {
  baseline: "正常输入",
  fault: "故障输入",
  recovery: "修复重放",
};

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function OfficialJct25Studio({
  unitId,
  title,
  concepts,
  stages,
  focuses,
  model,
  mode,
}: Props) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [axisA, setAxisA] = useState(1);
  const [axisB, setAxisB] = useState(1);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [runs, setRuns] = useState(0);
  function resetExperiment() {
    setConceptIndex(0);
    setAxisA(1);
    setAxisB(1);
    setScenario("baseline");
    setRuns(0);
  }


  const result = useMemo(() => {
    const scenarioSuccess =
      scenario === "fault" ? -24 : scenario === "recovery" ? 10 : 0;
    const scenarioRisk =
      scenario === "fault" ? 31 : scenario === "recovery" ? -16 : 0;
    const correctness = clamp(44 + axisA * 15 + axisB * 11 + scenarioSuccess);
    const risk = clamp(
      34 +
        model.riskEffects[0] * axisA * 10 +
        model.riskEffects[1] * axisB * 9 +
        scenarioRisk,
    );
    const evidence = clamp(
      49 + axisB * 13 + runs * 5 - (scenario === "fault" ? 7 : 0),
    );
    return {
      correctness,
      risk,
      evidence,
      accepted: correctness >= 60 && risk <= 64 && evidence >= 60,
    };
  }, [axisA, axisB, model.riskEffects, runs, scenario]);

  const reset = () => {
    setConceptIndex(0);
    setAxisA(1);
    setAxisB(1);
    setScenario("baseline");
    setRuns(0);
  };

  const currentConcept = concepts[conceptIndex] ?? concepts[0];
  const currentStage = stages[conceptIndex % stages.length];
  const currentFocus = focuses[conceptIndex % focuses.length];

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${title} · ${model.studio}实验`}
      data-jct-unit={unitId}
    >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
            Java 25 · {model.studio} ·{" "}
            {mode === "map"
              ? "语义与运行链"
              : mode === "experiment"
                ? "单变量代码实验"
                : "故障与恢复证据"}
          </p>
          <h3 className="break-words text-base font-semibold">{title}</h3>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white px-3 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"
          aria-label={`重置${model.studio}`}
        >
          <span aria-hidden="true">↺</span>
        </button>
      </header>

      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)]">
        <div className="min-w-0 border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
          {mode === "map" ? (
            <>
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">
                选择正式目录节点，核对它落在语义、运行时与证据链的哪一步。
              </p>
              <div className="max-h-72 overflow-y-auto rounded border border-zinc-200 p-2 dark:border-zinc-800">
                <div className="grid gap-2 sm:grid-cols-2">
                  {concepts.map((concept, index) => (
                    <button
                      key={concept}
                      type="button"
                      onClick={() => setConceptIndex(index)}
                      aria-pressed={index === conceptIndex}
                      className={`min-h-11 min-w-0 rounded border px-3 py-2 text-left text-xs leading-5 [overflow-wrap:anywhere] ${
                        index === conceptIndex
                          ? "border-amber-600 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-50"
                          : "border-zinc-300 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
                      }`}
                    >
                      {concept}
                    </button>
                  ))}
                </div>
              </div>
              <ol className="mt-4 grid gap-2 sm:grid-cols-5">
                {stages.map((stage, index) => (
                  <li
                    key={stage}
                    className={`min-w-0 border p-2 text-xs [overflow-wrap:anywhere] ${
                      stage === currentStage
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                        : "border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <span className="block font-mono font-semibold">
                      0{index + 1}
                    </span>
                    {stage}
                  </li>
                ))}
              </ol>
            </>
          ) : mode === "experiment" ? (
            <div className="space-y-5">
              {[
                [model.axisA, axisA, setAxisA],
                [model.axisB, axisB, setAxisB],
              ].map(([axis, value, setter]) => {
                const typedAxis = axis as LabModel["axisA"];
                return (
                  <fieldset key={typedAxis.label}>
                    <legend className="mb-2 text-sm font-semibold">
                      {typedAxis.label}
                    </legend>
                    <div className="grid grid-cols-3 gap-2">
                      {typedAxis.levels.map((level, index) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() =>
                            (setter as (next: number) => void)(index)
                          }
                          aria-pressed={value === index}
                          className={`min-h-11 min-w-0 rounded border px-2 py-2 text-xs [overflow-wrap:anywhere] ${
                            value === index
                              ? "border-blue-600 bg-blue-50 font-semibold text-blue-950 dark:bg-blue-950 dark:text-blue-50"
                              : "border-zinc-300 dark:border-zinc-700"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                );
              })}
              <div className="rounded border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs font-semibold text-zinc-500">最小探针</p>
                <code className="mt-2 block whitespace-pre-wrap text-xs [overflow-wrap:anywhere]">
                  {model.probe}
                </code>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                故障路径必须留下首错，然后进入修复重放，最后用重置核对初值。
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(Object.keys(scenarioLabels) as Scenario[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setScenario(key)}
                    aria-pressed={scenario === key}
                    className={`min-h-11 rounded border px-2 py-2 text-xs ${
                      scenario === key
                        ? "border-zinc-950 bg-zinc-950 font-semibold text-white dark:border-white dark:bg-white dark:text-zinc-950"
                        : "border-zinc-300 dark:border-zinc-700"
                    }`}
                  >
                    {scenarioLabels[key]}
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded border border-rose-300 bg-rose-50 p-3 text-sm text-rose-950 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-50">
                <strong>故障注入</strong>
                <p className="mt-1 [overflow-wrap:anywhere]">{model.fault}</p>
              </div>
              <div className="mt-3 rounded border border-emerald-300 bg-emerald-50 p-3 text-sm text-emerald-950 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-50">
                <strong>必须守住的不变量</strong>
                <p className="mt-1 [overflow-wrap:anywhere]">
                  {model.invariant}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 p-4">
          <p className="text-xs font-semibold text-zinc-500">当前证据坐标</p>
          <p className="mt-1 text-sm font-semibold [overflow-wrap:anywhere]">
            {currentConcept}
          </p>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
            {currentStage} → {currentFocus}
          </p>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
            {[
              [model.outcomes.success, result.correctness],
              [model.outcomes.risk, result.risk],
              [model.outcomes.evidence, result.evidence],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="min-w-0 border border-zinc-200 p-2 dark:border-zinc-800"
              >
                <dt className="min-h-11 [overflow-wrap:anywhere]">{label}</dt>
                <dd className="mt-1 text-lg font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <div
            className={`mt-3 border p-3 text-sm ${
              result.accepted
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                : "border-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-50"
            }`}
          >
            <strong>
              {result.accepted ? "本轮证据可接受" : "拒绝或缩小结论"}
            </strong>
            <p className="mt-1 [overflow-wrap:anywhere]">{model.task}</p>
          </div>
          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            运行并保存 Java 25 轨迹 #{runs + 1}
          </button>
        </div>
      </div>
    </section>
  );
}
