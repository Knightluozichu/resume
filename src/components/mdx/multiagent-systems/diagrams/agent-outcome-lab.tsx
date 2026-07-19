"use client";

import { useMemo, useState } from "react";

type EvidenceMode = "model" | "interaction" | "evidence";
type Scenario = "complete" | "partial" | "strategic";

type Intervention = {
  label: string;
  detail: string;
  instabilityDelta: number;
  welfareDelta: number;
  traceDelta: number;
};

export type AgentOutcomeLabProps = {
  unitId: string;
  title: string;
  mode: EvidenceMode;
  question: string;
  actors: readonly string[];
  stages: readonly string[];
  concepts: readonly string[];
  interventions: readonly Intervention[];
  metricLabels: readonly [string, string, string];
  baseline: readonly [number, number, number];
  partialNote: string;
  strategicNote: string;
};

const modeLabels: Record<EvidenceMode, string> = {
  model: "联合状态模型",
  interaction: "策略交互",
  evidence: "性质与证据",
};

const scenarioLabels: Record<Scenario, string> = {
  complete: "信息完整",
  partial: "信息不全",
  strategic: "策略偏离",
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function AgentOutcomeLab({
  unitId,
  title,
  mode,
  question,
  actors,
  stages,
  concepts,
  interventions,
  metricLabels,
  baseline,
  partialNote,
  strategicNote,
}: AgentOutcomeLabProps) {
  const [scenario, setScenario] = useState<Scenario>("complete");
  const [interventionIndex, setInterventionIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const intervention = interventions[interventionIndex] ?? interventions[0];
    const penalty =
      scenario === "complete" ? 0 : scenario === "partial" ? 16 : 36;
    const instability = clamp(
      baseline[0] + penalty + intervention.instabilityDelta,
    );
    const welfare = clamp(
      baseline[1] - penalty * 0.64 + intervention.welfareDelta,
    );
    const trace = clamp(baseline[2] - penalty * 0.52 + intervention.traceDelta);
    const accepted =
      scenario !== "strategic" &&
      instability <= 58 &&
      welfare >= 52 &&
      trace >= 55;
    return { intervention, instability, welfare, trace, accepted };
  }, [baseline, interventionIndex, interventions, scenario]);

  const reset = () => {
    setScenario("complete");
    setInterventionIndex(0);
    setStageIndex(0);
    setRuns(0);
  };

  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-surface text-primary shadow-sm"
      aria-label={`${title}${modeLabels[mode]}实验`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-elevated px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">
            {unitId} · {modeLabels[mode]}
          </p>
          <h3 className="mt-1 break-words text-base font-semibold">{title}</h3>
          <p className="mt-1 max-w-3xl text-sm text-secondary">{question}</p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md border border-border bg-surface px-3 text-lg hover:bg-elevated"
          aria-label="重置实验"
          title="重置实验"
        >
          <span aria-hidden="true">↺</span>
        </button>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <div className="grid gap-2 sm:grid-cols-3">
            {actors.map((actor, index) => (
              <div
                key={actor}
                className="min-w-0 rounded-md border border-border bg-elevated p-3"
              >
                <p className="text-xs text-secondary">参与者 {index + 1}</p>
                <p className="mt-1 break-words text-sm font-semibold">
                  {actor}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-secondary">
            联合状态推进
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-5">
            {stages.map((stage, index) => (
              <button
                key={`${stage}-${index}`}
                type="button"
                aria-pressed={stageIndex === index}
                onClick={() => setStageIndex(index)}
                className={`min-h-11 min-w-0 rounded-md border px-2 py-2 text-xs leading-5 ${
                  stageIndex === index
                    ? "border-violet-600 bg-violet-50 font-semibold text-violet-950 dark:bg-violet-950 dark:text-violet-50"
                    : "border-border bg-surface hover:bg-elevated"
                }`}
              >
                <span className="block text-[11px] text-secondary">
                  {index + 1}
                </span>
                <span className="block break-words">{stage}</span>
              </button>
            ))}
          </div>

          <div className="mt-3 rounded-md border border-border bg-elevated p-3 text-sm">
            <p className="font-semibold">当前状态：{stages[stageIndex]}</p>
            <p className="mt-1 break-words text-secondary">
              目录证据：
              {concepts[stageIndex % Math.max(1, concepts.length)] ?? title}
            </p>
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-secondary">
            选择干预，只改一个条件
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {interventions.map((intervention, index) => (
              <button
                key={intervention.label}
                type="button"
                aria-pressed={interventionIndex === index}
                onClick={() => setInterventionIndex(index)}
                className={`min-h-11 rounded-md border px-3 py-2 text-left text-sm ${
                  interventionIndex === index
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                    : "border-border bg-surface hover:bg-elevated"
                }`}
              >
                <span className="block font-semibold">
                  {intervention.label}
                </span>
                <span className="mt-1 block text-xs leading-5 text-secondary">
                  {intervention.detail}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {(Object.keys(scenarioLabels) as Scenario[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={scenario === key}
                onClick={() => setScenario(key)}
                className={`min-h-11 rounded-md border px-2 py-2 text-xs font-semibold ${
                  scenario === key
                    ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-border bg-surface hover:bg-elevated"
                }`}
              >
                {scenarioLabels[key]}
              </button>
            ))}
          </div>

          <dl className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              [metricLabels[0], result.instability],
              [metricLabels[1], result.welfare],
              [metricLabels[2], result.trace],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="rounded-md border border-border p-3"
              >
                <dt className="break-words text-xs text-secondary">{label}</dt>
                <dd className="mt-1 text-xl font-semibold">{value}%</dd>
              </div>
            ))}
          </dl>

          <div
            role="status"
            className={`mt-3 rounded-md border p-3 text-sm ${
              result.accepted
                ? "border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                : "border-rose-500 bg-rose-50 text-rose-950 dark:bg-rose-950 dark:text-rose-50"
            }`}
          >
            <strong>{result.accepted ? "联合证据通过" : "联合证据拒绝"}</strong>
            <p className="mt-1 break-words">
              {scenario === "strategic"
                ? strategicNote
                : scenario === "partial"
                  ? partialNote
                  : result.intervention.detail}
            </p>
            <p className="mt-1 text-xs">已保存联合轨迹：{runs}</p>
          </div>

          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-violet-700 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-800"
          >
            运行并保存联合轨迹
          </button>
        </div>
      </div>
    </section>
  );
}
