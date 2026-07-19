"use client";

import { useMemo, useState } from "react";

type Mode = "map" | "experiment" | "evidence";
type Scenario = "baseline" | "fault" | "recovery";

type Model = {
  studio: string;
  axisA: { label: string; levels: readonly [string, string, string] };
  axisB: { label: string; levels: readonly [string, string, string] };
  outcomes: { success: string; risk: string; evidence: string };
  fault: string;
  task: string;
  practiceMode: string;
  riskEffects: readonly [number, number];
};

type Props = {
  unitId: string;
  title: string;
  concepts: readonly string[];
  nodes: readonly string[];
  focuses: readonly string[];
  model: Model;
  mode: Mode;
};

const scenarioLabels: Record<Scenario, string> = {
  baseline: "正常基线",
  fault: "故障注入",
  recovery: "恢复复位",
};

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function OfficialOoc16Studio({
  unitId,
  title,
  concepts,
  nodes,
  focuses,
  model,
  mode,
}: Props) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [axisA, setAxisA] = useState(1);
  const [axisB, setAxisB] = useState(1);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const scenarioSuccess =
      scenario === "fault" ? -20 : scenario === "recovery" ? 8 : 0;
    const scenarioRisk =
      scenario === "fault" ? 28 : scenario === "recovery" ? -14 : 0;
    const success = clamp(42 + axisA * 16 + axisB * 12 + scenarioSuccess);
    const risk = clamp(
      36 +
        model.riskEffects[0] * axisA * 11 +
        model.riskEffects[1] * axisB * 9 +
        scenarioRisk,
    );
    const evidence = clamp(
      48 + axisB * 14 + runs * 4 - (scenario === "fault" ? 8 : 0),
    );
    return {
      success,
      risk,
      evidence,
      accepted: success >= 58 && risk <= 62 && evidence >= 58,
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
  const currentNode = nodes[conceptIndex % nodes.length];
  const currentFocus = focuses[conceptIndex % focuses.length];

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${title} · ${model.studio}实验`}
      data-ooc-unit={unitId}
    >
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {model.studio} ·{" "}
            {mode === "map"
              ? "机制地图"
              : mode === "experiment"
                ? "反事实实验"
                : "故障证据"}
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

      <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)]">
        <div className="min-w-0 border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
          {mode === "map" ? (
            <>
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">
                选择正式目录节点，观察它进入哪一步机制与哪项证据。
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
                          ? "border-blue-600 bg-blue-50 text-blue-950 dark:bg-blue-950 dark:text-blue-50"
                          : "border-zinc-300 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
                      }`}
                    >
                      {concept}
                    </button>
                  ))}
                </div>
              </div>
              <ol className="mt-4 grid gap-2 sm:grid-cols-5">
                {nodes.map((node, index) => (
                  <li
                    key={node}
                    className={`min-w-0 border p-2 text-xs [overflow-wrap:anywhere] ${
                      node === currentNode
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950"
                        : "border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <span className="block font-semibold">{index + 1}</span>
                    {node}
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
                const typedAxis = axis as Model["axisA"];
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
            </div>
          ) : (
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                注入故障后必须进入恢复场景，再用重置核对初值。
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
                <strong>故障假设</strong>
                <p className="mt-1 [overflow-wrap:anywhere]">{model.fault}</p>
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
            {currentNode} → {currentFocus}
          </p>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
            {[
              [model.outcomes.success, result.success],
              [model.outcomes.risk, result.risk],
              [model.outcomes.evidence, result.evidence],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="min-w-0 border border-zinc-200 p-2 dark:border-zinc-800"
              >
                <dt className="min-h-10 [overflow-wrap:anywhere]">{label}</dt>
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
              {result.accepted ? "证据门禁通过" : "保留或缩小主张"}
            </strong>
            <p className="mt-1 [overflow-wrap:anywhere]">{model.task}</p>
          </div>
          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            运行并保存轨迹 #{runs + 1}
          </button>
        </div>
      </div>
    </section>
  );
}
