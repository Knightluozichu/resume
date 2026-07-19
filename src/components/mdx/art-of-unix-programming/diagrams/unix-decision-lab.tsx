"use client";

import { useMemo, useState } from "react";

type Scenario = "normal" | "boundary" | "fault";
type View = "topology" | "representation" | "evidence";

type Action = {
  label: string;
  detail: string;
  riskDelta: number;
  visibilityDelta: number;
  recoveryDelta: number;
};

export type UnixDecisionLabProps = {
  unitId: string;
  title: string;
  view: View;
  question: string;
  nodes: readonly string[];
  concepts: readonly string[];
  actions: readonly Action[];
  metricLabels: readonly [string, string, string];
  baseline: readonly [number, number, number];
  boundaryNote: string;
  faultNote: string;
};

const scenarioLabels: Record<Scenario, string> = {
  normal: "正常输入",
  boundary: "恰好边界",
  fault: "单点故障",
};

const viewLabels: Record<View, string> = {
  topology: "组合拓扑",
  representation: "表示选择",
  evidence: "证据门禁",
};

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function UnixDecisionLab({
  unitId,
  title,
  view,
  question,
  nodes,
  concepts,
  actions,
  metricLabels,
  baseline,
  boundaryNote,
  faultNote,
}: UnixDecisionLabProps) {
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [actionIndex, setActionIndex] = useState(0);
  const [nodeIndex, setNodeIndex] = useState(0);
  const [runs, setRuns] = useState(0);

  const result = useMemo(() => {
    const action = actions[actionIndex] ?? actions[0];
    const penalty =
      scenario === "normal" ? 0 : scenario === "boundary" ? 14 : 34;
    const risk = clamp(baseline[0] + penalty + action.riskDelta);
    const visibility = clamp(
      baseline[1] - penalty * 0.55 + action.visibilityDelta,
    );
    const recovery = clamp(baseline[2] - penalty * 0.72 + action.recoveryDelta);
    const accepted =
      scenario !== "fault" && risk <= 58 && visibility >= 54 && recovery >= 50;
    return { action, risk, visibility, recovery, accepted };
  }, [actionIndex, actions, baseline, scenario]);

  const reset = () => {
    setScenario("normal");
    setActionIndex(0);
    setNodeIndex(0);
    setRuns(0);
  };

  return (
    <section
      className="not-prose my-6 overflow-hidden rounded-card border border-border bg-surface text-primary shadow-sm"
      aria-label={`${title}${viewLabels[view]}实验`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-elevated px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            {unitId} · {viewLabels[view]}
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

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)]">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
            点击链路节点，定位当前观察点
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-5">
            {nodes.map((node, index) => (
              <button
                key={`${node}-${index}`}
                type="button"
                aria-pressed={nodeIndex === index}
                onClick={() => setNodeIndex(index)}
                className={`min-h-11 min-w-0 rounded-md border px-2 py-2 text-xs leading-5 ${
                  nodeIndex === index
                    ? "border-blue-600 bg-blue-50 font-semibold text-blue-950 dark:bg-blue-950 dark:text-blue-50"
                    : "border-border bg-elevated hover:border-blue-400"
                }`}
              >
                <span className="block text-[11px] text-secondary">
                  {index + 1}
                </span>
                <span className="block break-words">{node}</span>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-md border border-border bg-elevated p-3 text-sm">
            <p className="font-semibold">当前观察：{nodes[nodeIndex]}</p>
            <p className="mt-1 break-words text-secondary">
              复核坐标：
              {concepts[nodeIndex % Math.max(1, concepts.length)] ?? title}
            </p>
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-secondary">
            选择一次可撤回的工程动作
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {actions.map((action, index) => (
              <button
                key={action.label}
                type="button"
                aria-pressed={actionIndex === index}
                onClick={() => setActionIndex(index)}
                className={`min-h-11 rounded-md border px-3 py-2 text-left text-sm ${
                  actionIndex === index
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-50"
                    : "border-border bg-surface hover:bg-elevated"
                }`}
              >
                <span className="block font-semibold">{action.label}</span>
                <span className="mt-1 block text-xs leading-5 text-secondary">
                  {action.detail}
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
              [metricLabels[0], result.risk],
              [metricLabels[1], result.visibility],
              [metricLabels[2], result.recovery],
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
            <strong>{result.accepted ? "证据允许继续" : "证据要求停止"}</strong>
            <p className="mt-1 break-words">
              {scenario === "fault"
                ? faultNote
                : scenario === "boundary"
                  ? boundaryNote
                  : result.action.detail}
            </p>
            <p className="mt-1 text-xs">已保存轨迹：{runs}</p>
          </div>

          <button
            type="button"
            onClick={() => setRuns((value) => value + 1)}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            运行并保存本次证据
          </button>
        </div>
      </div>
    </section>
  );
}
