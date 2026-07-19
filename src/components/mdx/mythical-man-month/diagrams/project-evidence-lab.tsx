"use client";

import { useMemo, useState } from "react";

type LabMode = "dependency" | "schedule" | "evidence";
type Scenario = "baseline" | "constraint" | "failure";

type Action = {
  label: string;
  detail: string;
  delayDelta: number;
  clarityDelta: number;
  riskDelta: number;
};

type Props = {
  unitId: string;
  title: string;
  question: string;
  roles: readonly [string, string, string];
  phases: readonly [string, string, string, string, string];
  concepts: readonly string[];
  actions: readonly [Action, Action, Action];
  metricLabels: readonly [string, string, string];
  boundaryNote: string;
  failureNote: string;
  mode: LabMode;
  baseline: readonly [number, number, number];
};

const scenarioLabels: Record<Scenario, string> = {
  baseline: "基线项目",
  constraint: "约束收紧",
  failure: "失效注入",
};

const modeLabels: Record<LabMode, string> = {
  dependency: "依赖与职责图",
  schedule: "进度因果实验",
  evidence: "命题证据门禁",
};

const scenarioEffects: Record<
  Scenario,
  { delay: number; clarity: number; risk: number }
> = {
  baseline: { delay: 0, clarity: 0, risk: 0 },
  constraint: { delay: 10, clarity: -8, risk: 12 },
  failure: { delay: 24, clarity: -20, risk: 30 },
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function ProjectEvidenceLab({
  unitId,
  title,
  question,
  roles,
  phases,
  concepts,
  actions,
  metricLabels,
  boundaryNote,
  failureNote,
  mode,
  baseline,
}: Props) {
  const [scenario, setScenario] = useState<Scenario>("baseline");
  const [phase, setPhase] = useState(0);
  const [action, setAction] = useState(0);
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const scenarioEffect = scenarioEffects[scenario];
    const intervention = actions[action];
    const delay = clamp(
      baseline[0] + scenarioEffect.delay + intervention.delayDelta + phase * 2,
    );
    const clarity = clamp(
      baseline[1] + scenarioEffect.clarity + intervention.clarityDelta,
    );
    const risk = clamp(
      baseline[2] + scenarioEffect.risk + intervention.riskDelta + phase,
    );
    const accepted =
      scenario !== "failure" && delay <= 62 && clarity >= 58 && risk <= 55;
    return { delay, clarity, risk, accepted };
  }, [action, actions, baseline, phase, scenario]);

  const reset = () => {
    setScenario("baseline");
    setPhase(0);
    setAction(0);
    setRuns(0);
  };

  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-md border border-zinc-300 bg-white text-zinc-950 shadow-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
      aria-label={`${title}${modeLabels[mode]}实验`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">
            {unitId} · {modeLabels[mode]}
          </p>
          <h3 className="mt-1 break-words text-base font-semibold">{title}</h3>
          <p className="mt-1 break-words text-sm text-zinc-600 dark:text-zinc-300">
            {question}
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded border border-zinc-300 bg-white text-xl hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 dark:border-zinc-700 dark:bg-zinc-950 dark:hover:bg-zinc-800"
          aria-label="重置项目实验"
          title="重置项目实验"
        >
          <span aria-hidden="true">↺</span>
        </button>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <div className="border-b border-zinc-200 p-4 lg:border-r lg:border-b-0 dark:border-zinc-800">
          <p className="text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            三方职责
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {roles.map((role, index) => (
              <div
                key={role}
                className="min-w-0 border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <span className="text-xs text-zinc-500">角色 {index + 1}</span>
                <strong className="mt-1 block break-words text-sm">
                  {role}
                </strong>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            项目状态推进
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-5">
            {phases.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setPhase(index)}
                className={`min-h-11 min-w-0 border px-2 py-2 text-xs leading-5 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  phase === index
                    ? "border-blue-700 bg-blue-50 font-semibold text-blue-950 dark:bg-blue-950 dark:text-blue-50"
                    : "border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
                }`}
              >
                <span className="block text-[10px] text-zinc-500">
                  {index + 1}
                </span>
                <span className="block break-words">{item}</span>
              </button>
            ))}
          </div>

          <div className="mt-3 border border-zinc-200 p-3 dark:border-zinc-800">
            <strong className="text-sm">当前检查：{phases[phase]}</strong>
            <p className="mt-1 break-words text-sm text-zinc-600 dark:text-zinc-300">
              目录证据：{concepts[phase % concepts.length]}
            </p>
          </div>

          <p className="mt-4 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            只选择一项管理干预
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {actions.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setAction(index)}
                className={`min-h-11 min-w-0 border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  action === index
                    ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                }`}
              >
                <strong className="block break-words text-sm">
                  {item.label}
                </strong>
                <span className="mt-1 block break-words text-xs opacity-75">
                  {item.detail}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div
            className="grid grid-cols-3 gap-2"
            role="group"
            aria-label="项目样本"
          >
            {(Object.keys(scenarioLabels) as Scenario[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setScenario(key)}
                className={`min-h-11 border px-2 py-2 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  scenario === key
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
                }`}
              >
                {scenarioLabels[key]}
              </button>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2">
            {[
              [metricLabels[0], result.delay],
              [metricLabels[1], result.clarity],
              [metricLabels[2], result.risk],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="min-w-0 border border-zinc-200 p-2 dark:border-zinc-800"
              >
                <dt className="break-words text-xs text-zinc-500">{label}</dt>
                <dd className="mt-1 text-xl font-semibold">{value}%</dd>
              </div>
            ))}
          </dl>

          <div
            className={`mt-3 border p-3 text-sm ${
              result.accepted
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                : "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50"
            }`}
          >
            <strong>{result.accepted ? "项目证据通过" : "项目证据拒绝"}</strong>
            <p className="mt-1 break-words">
              {scenario === "failure" ? failureNote : boundaryNote}
            </p>
            <p className="mt-2 text-xs">已保存运行：{runs}</p>
          </div>

          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            运行并保存项目轨迹
          </button>
        </div>
      </div>
    </section>
  );
}
