"use client";

import { useMemo, useState } from "react";

export type WindowsJourneyCoverageNode = {
  label: string;
  mechanism: string;
  probe: string;
};

export type WindowsJourneyCausalModel = {
  historicalLabel: string;
  modernLabel: string;
  unit: string;
  historicalBase: number;
  historicalSlope: number;
  modernBase: number;
  modernSlope: number;
  faultPenalty: number;
  invariant: string;
  fault: string;
  evidence: string;
};

type LabProps = {
  title: string;
  focus: string;
  stages: string[];
  nodes: WindowsJourneyCoverageNode[];
  model: WindowsJourneyCausalModel;
};

const LOADS = [
  { label: "最小场景", factor: 1 },
  { label: "典型场景", factor: 2 },
  { label: "压力场景", factor: 4 },
] as const;

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="min-h-11 rounded-control border border-border bg-canvas px-3 text-sm font-semibold text-primary"
    >
      重置实验
    </button>
  );
}

export function WindowsJourneyPipelineLab({
  title,
  focus,
  stages,
  nodes,
  model,
}: LabProps) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const node = nodes[Math.min(nodeIndex, nodes.length - 1)];

  const reset = () => {
    setNodeIndex(0);
    setStageIndex(0);
  };

  return (
    <section
      aria-label={`${title} 状态链实验`}
      className="not-prose my-6 overflow-hidden rounded-card border border-sky-300 bg-canvas shadow-sm dark:border-sky-800"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-sky-200 bg-sky-50 p-4 dark:border-sky-900 dark:bg-sky-950/30">
        <div>
          <p className="font-semibold text-sky-950 dark:text-sky-100">
            {title} · 专属状态链
          </p>
          <p className="mt-1 text-sm text-sky-800 dark:text-sky-300">
            {focus}
          </p>
        </div>
        <ResetButton onReset={reset} />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <label className="text-sm font-medium text-primary">
          正式目录节点
          <select
            value={nodeIndex}
            onChange={(event) => setNodeIndex(Number(event.target.value))}
            className="mt-2 min-h-11 w-full rounded-control border border-border bg-canvas px-3 text-primary"
          >
            {nodes.map((item, index) => (
              <option key={`${item.label}-${index}`} value={index}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {stages.map((stage, index) => (
            <button
              key={`${stage}-${index}`}
              type="button"
              aria-pressed={stageIndex === index}
              onClick={() => setStageIndex(index)}
              className={
                "min-h-11 rounded-control border px-2 text-xs font-semibold " +
                (stageIndex === index
                  ? "border-sky-600 bg-sky-100 text-sky-950 dark:bg-sky-950 dark:text-sky-100"
                  : "border-border bg-canvas text-secondary")
              }
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 border-t border-border p-4 md:grid-cols-3">
        <div className="rounded-card border border-border bg-elevated p-3">
          <p className="text-xs font-semibold text-secondary">当前节点</p>
          <p className="mt-2 text-sm font-semibold text-primary">{node.label}</p>
        </div>
        <div className="rounded-card border border-border bg-elevated p-3">
          <p className="text-xs font-semibold text-secondary">本阶段机制</p>
          <p className="mt-2 text-sm text-primary">
            {stages[stageIndex]}：{node.mechanism}
          </p>
        </div>
        <div className="rounded-card border border-border bg-elevated p-3">
          <p className="text-xs font-semibold text-secondary">可验证证据</p>
          <p className="mt-2 text-sm text-primary">{node.probe}</p>
        </div>
      </div>

      <p className="border-t border-border px-4 py-3 text-xs text-secondary">
        不变量：{model.invariant}
      </p>
    </section>
  );
}

export function WindowsJourneyMigrationLab({
  title,
  focus,
  stages,
  nodes,
  model,
}: LabProps) {
  const [modern, setModern] = useState(false);
  const [loadIndex, setLoadIndex] = useState(0);
  const [fault, setFault] = useState(false);
  const load = LOADS[loadIndex];
  const result = useMemo(() => {
    const base = modern ? model.modernBase : model.historicalBase;
    const slope = modern ? model.modernSlope : model.historicalSlope;
    return base + slope * load.factor + (fault ? model.faultPenalty : 0);
  }, [fault, load.factor, modern, model]);
  const historicalBudget = model.historicalBase + model.historicalSlope * 2;

  const reset = () => {
    setModern(false);
    setLoadIndex(0);
    setFault(false);
  };

  return (
    <section
      aria-label={`${title} 历史与迁移实验`}
      className="not-prose my-6 overflow-hidden rounded-card border border-amber-300 bg-canvas shadow-sm dark:border-amber-800"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
        <div>
          <p className="font-semibold text-amber-950 dark:text-amber-100">
            {title} · 2013 基线与现代迁移
          </p>
          <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">
            保留历史 API 身份，再用同一输入验证 {focus}。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </header>

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-2">
          {[
            [false, model.historicalLabel],
            [true, model.modernLabel],
          ].map(([value, label]) => (
            <button
              key={String(label)}
              type="button"
              aria-pressed={modern === value}
              onClick={() => setModern(Boolean(value))}
              className={
                "min-h-11 rounded-control border px-3 text-sm font-semibold " +
                (modern === value
                  ? "border-amber-600 bg-amber-100 text-amber-950 dark:bg-amber-950 dark:text-amber-100"
                  : "border-border bg-canvas text-secondary")
              }
            >
              {String(label)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {LOADS.map((item, index) => (
            <button
              key={item.label}
              type="button"
              aria-pressed={loadIndex === index}
              onClick={() => setLoadIndex(index)}
              className={
                "min-h-11 rounded-control border px-2 text-xs sm:text-sm " +
                (loadIndex === index
                  ? "border-cyan-600 bg-cyan-100 text-cyan-950 dark:bg-cyan-950 dark:text-cyan-100"
                  : "border-border bg-canvas text-secondary")
              }
            >
              {item.label} ×{item.factor}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-pressed={fault}
          onClick={() => setFault((value) => !value)}
          className={
            "min-h-11 w-full rounded-control border px-3 text-sm font-semibold " +
            (fault
              ? "border-rose-600 bg-rose-100 text-rose-950 dark:bg-rose-950 dark:text-rose-100"
              : "border-border bg-canvas text-secondary")
          }
        >
          {fault ? `已注入：${model.fault}` : `注入故障：${model.fault}`}
        </button>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-card border border-border bg-elevated p-3">
            <p className="text-xs text-secondary">当前技术坐标</p>
            <p className="mt-2 font-semibold text-primary">
              {modern ? model.modernLabel : model.historicalLabel}
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-3">
            <p className="text-xs text-secondary">可复算指标</p>
            <p className="mt-2 text-2xl font-semibold text-primary">
              {result.toFixed(1)} {model.unit}
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-3">
            <p className="text-xs text-secondary">判定</p>
            <p className="mt-2 text-sm font-semibold text-primary">
              {result <= historicalBudget ? "不变量仍成立" : "需要定位首个分叉"}
            </p>
          </div>
        </div>
      </div>

      <p className="border-t border-border px-4 py-3 text-xs text-secondary">
        证据口径：{model.evidence}；正式节点：{nodes.length}；链路：
        {stages.join(" → ")}。
      </p>
    </section>
  );
}

export function WindowsJourneyRecoveryLab({
  title,
  focus,
  stages,
  nodes,
  model,
}: LabProps) {
  const [scenario, setScenario] = useState<"normal" | "fault" | "recovery">(
    "normal",
  );
  const scenarios = {
    normal: {
      label: "正常轨迹",
      trigger: stages[0],
      result: `保持：${model.invariant}`,
    },
    fault: {
      label: "故障轨迹",
      trigger: model.fault,
      result: `在“${stages[Math.min(2, stages.length - 1)]}”冻结证据，不继续掩盖错误。`,
    },
    recovery: {
      label: "恢复重放",
      trigger: `逆序清理后以相同输入重跑 ${nodes.length} 个节点`,
      result: `用${model.evidence}比较初始与恢复状态。`,
    },
  } as const;
  const current = scenarios[scenario];

  return (
    <section
      aria-label={`${title} 故障恢复实验`}
      className="not-prose my-6 overflow-hidden rounded-card border border-violet-300 bg-canvas shadow-sm dark:border-violet-800"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-violet-200 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-950/30">
        <div>
          <p className="font-semibold text-violet-950 dark:text-violet-100">
            {title} · 故障—恢复—重放
          </p>
          <p className="mt-1 text-sm text-violet-800 dark:text-violet-300">
            {focus}
          </p>
        </div>
        <ResetButton onReset={() => setScenario("normal")} />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="grid gap-2" role="group" aria-label="恢复场景">
          {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map(
            (key) => (
              <button
                key={key}
                type="button"
                aria-pressed={scenario === key}
                onClick={() => setScenario(key)}
                className={
                  "min-h-11 rounded-control border px-3 text-left text-sm font-semibold " +
                  (scenario === key
                    ? "border-violet-600 bg-violet-100 text-violet-950 dark:bg-violet-950 dark:text-violet-100"
                    : "border-border bg-canvas text-secondary")
                }
              >
                {scenarios[key].label}
              </button>
            ),
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-secondary">触发与首错</p>
            <p className="mt-2 text-sm text-primary">{current.trigger}</p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-secondary">通过条件</p>
            <p className="mt-2 text-sm text-primary">{current.result}</p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-4 sm:col-span-2">
            <p className="text-xs font-semibold text-secondary">迁移边界</p>
            <p className="mt-2 text-sm text-primary">
              历史实现和现代实现可以使用不同 API，但必须消费相同输入、记录相同证据，并守住同一不变量；API 名称相似不算迁移成功。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
