"use client";

import { useMemo, useState } from "react";

type Mode = "structure" | "trace" | "evidence";
type Scenario = "baseline" | "fault" | "recovery";

type RedisModel = {
  studio: string;
  axisA: { label: string; levels: readonly [string, string, string] };
  axisB: { label: string; levels: readonly [string, string, string] };
  outcomes: { signal: string; risk: string; evidence: string };
  fault: string;
  task: string;
  invariant: string;
  command: string;
  practiceMode: string;
  riskEffects: readonly [number, number];
};

type Props = {
  unitId: string;
  unitTitle: string;
  concepts: readonly string[];
  stages: readonly string[];
  focuses: readonly string[];
  model: RedisModel;
  mode: Mode;
};

const scenarios: Record<Scenario, string> = {
  baseline: "稳定基线",
  fault: "故障注入",
  recovery: "修复重放",
};

const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function OfficialRedisDesignLab({
  unitId,
  unitTitle,
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
  const [captures, setCaptures] = useState(0);
  function resetExperiment() {
    setConceptIndex(0);
    setAxisA(1);
    setAxisB(1);
    setScenario("baseline");
    setCaptures(0);
  }


  const result = useMemo(() => {
    const faultShift = scenario === "fault" ? 28 : scenario === "recovery" ? 6 : 0;
    const recoveryShift = scenario === "recovery" ? 17 : 0;
    const signal = clamp(38 + axisA * 15 + axisB * 12 + recoveryShift);
    const risk = clamp(
      31 +
        model.riskEffects[0] * axisA * 9 +
        model.riskEffects[1] * axisB * 8 +
        faultShift,
    );
    const evidence = clamp(45 + axisB * 14 + captures * 6 - (scenario === "fault" ? 8 : 0));
    return {
      signal,
      risk,
      evidence,
      accepted: signal >= 58 && risk <= 66 && evidence >= 59,
    };
  }, [axisA, axisB, captures, model.riskEffects, scenario]);

  const reset = () => {
    setConceptIndex(0);
    setAxisA(1);
    setAxisB(1);
    setScenario("baseline");
    setCaptures(0);
  };

  const currentConcept = concepts[conceptIndex] ?? concepts[0];
  const currentStage = stages[conceptIndex % stages.length];
  const currentFocus = focuses[conceptIndex % focuses.length];

  return (
    <section
      className="my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${unitTitle} · ${model.studio}实验`}
      data-rdi-unit={unitId}
    >
      <span style={{position:'absolute',top:6,right:6,zIndex:20}}><button type="button" onClick={resetExperiment} title="重置实验" aria-label="重置实验" className="inline-flex size-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-lg hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"><span aria-hidden="true">↺</span></button></span>
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-red-700 dark:text-red-300">
            Redis 3.0 · {model.studio} · {mode === "structure" ? "结构地图" : mode === "trace" ? "状态轨迹" : "故障与恢复"}
          </p>
          <h3 className="break-words text-base font-semibold">{unitTitle}</h3>
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
          {mode === "structure" ? (
            <>
              <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-300">
                选择正式目录节点，指出它改变的字段、所有权或事件顺序，再写出可推翻结论的反例。
              </p>
              <div className="max-h-72 overflow-y-auto rounded border border-zinc-200 p-2 dark:border-zinc-800">
                <div className="grid gap-2 sm:grid-cols-2">
                  {concepts.map((concept, index) => (
                    <button
                      key={`${concept}-${index}`}
                      type="button"
                      onClick={() => setConceptIndex(index)}
                      aria-pressed={index === conceptIndex}
                      className={`min-h-11 min-w-0 rounded border px-3 py-2 text-left text-xs leading-5 [overflow-wrap:anywhere] ${index === conceptIndex ? "border-red-600 bg-red-50 text-red-950 dark:bg-red-950 dark:text-red-50" : "border-zinc-300 bg-white hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"}`}
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
                    className={`min-w-0 border p-2 text-xs [overflow-wrap:anywhere] ${stage === currentStage ? "border-amber-500 bg-amber-50 dark:bg-amber-950" : "border-zinc-200 dark:border-zinc-800"}`}
                  >
                    <span className="block font-mono font-semibold">0{index + 1}</span>
                    {stage}
                  </li>
                ))}
              </ol>
            </>
          ) : mode === "trace" ? (
            <div className="space-y-5">
              {[
                [model.axisA, axisA, setAxisA],
                [model.axisB, axisB, setAxisB],
              ].map(([axis, value, setter]) => {
                const typedAxis = axis as RedisModel["axisA"];
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
                          className={`min-h-11 min-w-0 rounded border px-2 py-2 text-xs [overflow-wrap:anywhere] ${value === index ? "border-amber-700 bg-amber-50 font-semibold text-amber-950 dark:bg-amber-950 dark:text-amber-50" : "border-zinc-300 dark:border-zinc-700"}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                );
              })}
              <div className="rounded border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900">
                <p className="text-xs font-semibold text-zinc-500">本章可重放命令或源码探针</p>
                <code className="mt-2 block whitespace-pre-wrap text-xs [overflow-wrap:anywhere]">{model.command}</code>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                用同一输入依次保存稳定、故障和恢复轨迹；恢复后仍要复位，确认旧状态已经回收。
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(Object.keys(scenarios) as Scenario[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setScenario(key)}
                    aria-pressed={scenario === key}
                    className={`min-h-11 rounded border px-2 py-2 text-xs ${scenario === key ? "border-zinc-950 bg-zinc-950 font-semibold text-white dark:border-white dark:bg-white dark:text-zinc-950" : "border-zinc-300 dark:border-zinc-700"}`}
                  >
                    {scenarios[key]}
                  </button>
                ))}
              </div>
              <div className="mt-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-950 dark:border-red-800 dark:bg-red-950 dark:text-red-50">
                <strong>本章故障注入</strong>
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
          <p className="text-xs font-semibold text-zinc-500">当前源码坐标</p>
          <p className="mt-1 text-sm font-semibold [overflow-wrap:anywhere]">{currentConcept}</p>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">{currentStage} → {currentFocus}</p>
          <dl className="mt-4 grid grid-cols-3 gap-2 text-xs">
            {[
              [model.outcomes.signal, result.signal],
              [model.outcomes.risk, result.risk],
              [model.outcomes.evidence, result.evidence],
            ].map(([label, value]) => (
              <div key={String(label)} className="min-w-0 border border-zinc-200 p-2 dark:border-zinc-800">
                <dt className="min-h-11 [overflow-wrap:anywhere]">{label}</dt>
                <dd className="mt-1 text-lg font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
          <div className={`mt-3 border p-3 text-sm ${result.accepted ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50" : "border-amber-500 bg-amber-50 text-amber-950 dark:bg-amber-950 dark:text-amber-50"}`}>
            <strong>{result.accepted ? "源码与运行证据可接受" : "继续采证或撤回实现结论"}</strong>
            <p className="mt-1 [overflow-wrap:anywhere]">{model.task}</p>
          </div>
          <button
            type="button"
            onClick={() => setCaptures((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded bg-violet-700 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-800"
          >
            保存版本化证据快照 #{captures + 1}
          </button>
        </div>
      </div>
    </section>
  );
}
