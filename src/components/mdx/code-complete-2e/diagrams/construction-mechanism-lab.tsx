"use client";

import { useMemo, useState } from "react";

type Scenario = "baseline" | "boundary" | "fault";

type ExperimentModel = {
  primaryLabel: string;
  primaryUnit: string;
  primaryInitial: number;
  primaryMax: number;
  primaryWeight: number;
  secondaryLabel: string;
  secondaryUnit: string;
  secondaryInitial: number;
  secondaryMax: number;
  secondaryWeight: number;
  basePressure: number;
  boundaryPenalty: number;
  faultPenalty: number;
  limit: number;
  metricLabel: string;
};

type Props = {
  unitId: string;
  title: string;
  nodes: readonly string[];
  concepts: readonly string[];
  mechanism: string;
  success: string;
  failure: string;
  model: ExperimentModel;
};

const scenarioLabels: Record<Scenario, string> = {
  baseline: "基线",
  boundary: "边界",
  fault: "注入故障",
};

export function ConstructionMechanismLab({
  unitId,
  title,
  nodes,
  concepts,
  mechanism,
  success,
  failure,
  model,
}: Props) {
  const [primary, setPrimary] = useState(model.primaryInitial);
  const [secondary, setSecondary] = useState(model.secondaryInitial);
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [stage, setStage] = useState(0);
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const scenarioPenalty =
      scenario === "baseline"
        ? 0
        : scenario === "boundary"
          ? model.boundaryPenalty
          : model.faultPenalty;
    const pressure = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          model.basePressure +
            primary * model.primaryWeight +
            secondary * model.secondaryWeight +
            scenarioPenalty,
        ),
      ),
    );
    const accepted = scenario !== "fault" && pressure <= model.limit;
    const evidence = Math.max(
      0,
      Math.min(100, Math.round(100 - pressure * 0.68 + Math.min(runs, 4) * 4)),
    );
    return {
      accepted,
      evidence,
      focus: nodes[Math.min(stage, nodes.length - 1)] ?? title,
      pressure,
      trace: runs + 1,
    };
  }, [model, nodes, primary, runs, scenario, secondary, stage, title]);

  const reset = () => {
    setPrimary(model.primaryInitial);
    setSecondary(model.secondaryInitial);
    setScenario("baseline");
    setStage(0);
    setRuns(0);
  };

  return (
    <section
      aria-label={`${title}专属因果实验`}
      className="not-prose my-6 overflow-hidden rounded-lg border border-slate-300 bg-white text-slate-950 shadow-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300">
            {unitId} · 单变量构建实验
          </p>
          <h3 className="break-words text-base font-semibold">{title}</h3>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800"
        >
          重置实验
        </button>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(290px,0.92fr)]">
        <div className="border-b border-slate-200 p-4 lg:border-r lg:border-b-0 dark:border-slate-800">
          <p className="text-sm font-semibold">本页机制链</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-5">
            {nodes.map((node, index) => (
              <button
                key={`${node}-${index}`}
                type="button"
                aria-label={`检查第 ${index + 1} 个节点：${node}`}
                aria-pressed={stage === index}
                onClick={() => setStage(index)}
                className={`min-h-11 min-w-0 rounded border px-2 py-2 text-xs leading-5 ${
                  stage === index
                    ? "border-indigo-700 bg-indigo-50 text-indigo-950 dark:bg-indigo-950 dark:text-indigo-50"
                    : "border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900"
                }`}
              >
                <span className="block font-semibold">{index + 1}</span>
                <span className="block break-words">{node}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              {model.primaryLabel}：{primary}
              {model.primaryUnit}
              <input
                type="range"
                min="1"
                max={model.primaryMax}
                value={primary}
                onChange={(event) => setPrimary(Number(event.target.value))}
                className="mt-1 h-11 w-full accent-indigo-700"
              />
            </label>
            <label className="text-sm">
              {model.secondaryLabel}：{secondary}
              {model.secondaryUnit}
              <input
                type="range"
                min="1"
                max={model.secondaryMax}
                value={secondary}
                onChange={(event) => setSecondary(Number(event.target.value))}
                className="mt-1 h-11 w-full accent-amber-600"
              />
            </label>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {mechanism}
          </p>
          <div className="mt-3 flex flex-wrap gap-2" aria-label="目录节点证据">
            {concepts.slice(0, 12).map((concept) => (
              <span
                key={concept}
                className="rounded-full border border-slate-300 px-2 py-1 text-xs dark:border-slate-700"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div
            className="grid grid-cols-3 gap-2"
            role="group"
            aria-label="实验场景"
          >
            {(Object.keys(scenarioLabels) as Scenario[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={scenario === key}
                onClick={() => setScenario(key)}
                className={`min-h-11 rounded border px-2 text-xs font-semibold ${
                  scenario === key
                    ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                    : "border-slate-300 dark:border-slate-700"
                }`}
              >
                {scenarioLabels[key]}
              </button>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="rounded border border-slate-200 p-3 dark:border-slate-800">
              <dt className="text-slate-500 dark:text-slate-400">
                {model.metricLabel}
              </dt>
              <dd className="mt-1 text-xl font-semibold">{result.pressure}%</dd>
            </div>
            <div className="rounded border border-slate-200 p-3 dark:border-slate-800">
              <dt className="text-slate-500 dark:text-slate-400">证据完整度</dt>
              <dd className="mt-1 text-xl font-semibold">{result.evidence}%</dd>
            </div>
          </dl>

          <div
            aria-live="polite"
            className={`mt-3 rounded border p-3 text-sm ${
              result.accepted
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                : "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50"
            }`}
          >
            <strong>{result.accepted ? "本轮可接受" : "本轮必须拒绝"}</strong>
            <p className="mt-1 break-words">
              首查节点：{result.focus}；证据轨迹 #{result.trace}
            </p>
            <p className="mt-1 break-words">
              {result.accepted ? success : failure}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-indigo-700 px-3 text-sm font-semibold text-white hover:bg-indigo-800"
          >
            运行并保存本轮证据
          </button>
        </div>
      </div>
    </section>
  );
}
