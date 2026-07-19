"use client";

import { useMemo, useState } from "react";

export type GppCoverageNode = {
  label: string;
  mechanism: string;
  probe: string;
};

export type GppCausalModel = {
  baselineLabel: string;
  candidateLabel: string;
  unit: string;
  baselineBase: number;
  baselineSlope: number;
  candidateBase: number;
  candidateSlope: number;
  faultPenalty: number;
  invariant: string;
  fault: string;
  evidence: string;
};

type LabProps = {
  title: string;
  focus: string;
  stages: string[];
  nodes: GppCoverageNode[];
  model: GppCausalModel;
};

const LOADS = [
  { label: "基线", factor: 1 },
  { label: "扩展", factor: 2 },
  { label: "压力", factor: 4 },
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

export function GppMechanismLab({
  title,
  focus,
  stages,
  nodes,
  model,
}: LabProps) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const selected = nodes[Math.min(nodeIndex, nodes.length - 1)];

  const reset = () => {
    setNodeIndex(0);
    setStageIndex(0);
  };

  return (
    <section
      aria-label={`${title} 机制实验`}
      className="not-prose my-6 overflow-hidden rounded-card border border-emerald-300 bg-canvas shadow-sm dark:border-emerald-800"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
        <div>
          <p className="font-semibold text-emerald-950 dark:text-emerald-100">
            {title} · 因果机制图
          </p>
          <p className="mt-1 text-sm text-emerald-800 dark:text-emerald-300">
            {focus}
          </p>
        </div>
        <ResetButton onReset={reset} />
      </header>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <label className="text-sm font-medium text-primary">
          正式节点
          <select
            value={nodeIndex}
            onChange={(event) => setNodeIndex(Number(event.target.value))}
            className="mt-2 min-h-11 w-full rounded-control border border-border bg-canvas px-3 text-primary"
          >
            {nodes.map((node, index) => (
              <option key={`${node.label}-${index}`} value={index}>
                {node.label}
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
                  ? "border-emerald-600 bg-emerald-100 text-emerald-950 dark:bg-emerald-950 dark:text-emerald-100"
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
          <p className="mt-2 text-sm font-semibold text-primary">
            {selected.label}
          </p>
        </div>
        <div className="rounded-card border border-border bg-elevated p-3">
          <p className="text-xs font-semibold text-secondary">机制变化</p>
          <p className="mt-2 text-sm text-primary">{selected.mechanism}</p>
        </div>
        <div className="rounded-card border border-border bg-elevated p-3">
          <p className="text-xs font-semibold text-secondary">本步验证</p>
          <p className="mt-2 text-sm text-primary">
            {stages[stageIndex]}：{selected.probe}
          </p>
        </div>
      </div>

      <p className="border-t border-border px-4 py-3 text-xs text-secondary">
        不变量：{model.invariant}
      </p>
    </section>
  );
}

export function GppTradeoffLab({
  title,
  focus,
  stages,
  nodes,
  model,
}: LabProps) {
  const [loadIndex, setLoadIndex] = useState(0);
  const [candidate, setCandidate] = useState(false);
  const [fault, setFault] = useState(false);
  const load = LOADS[loadIndex];
  const result = useMemo(() => {
    const base = candidate ? model.candidateBase : model.baselineBase;
    const slope = candidate ? model.candidateSlope : model.baselineSlope;
    const faultCost = fault
      ? model.faultPenalty * (candidate ? 0.55 : 1)
      : 0;
    return base + slope * load.factor + faultCost;
  }, [candidate, fault, load.factor, model]);
  const normalBudget = model.baselineBase + model.baselineSlope * 2;

  const reset = () => {
    setLoadIndex(0);
    setCandidate(false);
    setFault(false);
  };

  return (
    <section
      aria-label={`${title} 取舍实验`}
      className="not-prose my-6 overflow-hidden rounded-card border border-amber-300 bg-canvas shadow-sm dark:border-amber-800"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
        <div>
          <p className="font-semibold text-amber-950 dark:text-amber-100">
            {title} · 取舍对照台
          </p>
          <p className="mt-1 text-sm text-amber-800 dark:text-amber-300">
            一次只改变实现、负载或故障之一，观察 {focus}。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </header>

      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-2">
          {[
            [false, model.baselineLabel],
            [true, model.candidateLabel],
          ].map(([value, label]) => (
            <button
              key={String(label)}
              type="button"
              aria-pressed={candidate === value}
              onClick={() => setCandidate(Boolean(value))}
              className={
                "min-h-11 rounded-control border px-3 text-sm font-semibold " +
                (candidate === value
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
                "min-h-11 rounded-control border px-2 text-sm " +
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
            <p className="text-xs text-secondary">当前方案</p>
            <p className="mt-2 font-semibold text-primary">
              {candidate ? model.candidateLabel : model.baselineLabel}
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-3">
            <p className="text-xs text-secondary">可复算结果</p>
            <p className="mt-2 text-2xl font-semibold text-primary">
              {result.toFixed(1)} {model.unit}
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-3">
            <p className="text-xs text-secondary">判断</p>
            <p className="mt-2 text-sm font-semibold text-primary">
              {result <= normalBudget ? "仍在基线预算内" : "已越过基线预算"}
            </p>
          </div>
        </div>
      </div>

      <p className="border-t border-border px-4 py-3 text-xs text-secondary">
        证据口径：{model.evidence}；节点数：{nodes.length}；链路：
        {stages.join(" → ")}。
      </p>
    </section>
  );
}

export function GppFailureLab({
  title,
  focus,
  stages,
  nodes,
  model,
}: LabProps) {
  const [scenario, setScenario] = useState<"normal" | "stress" | "fault">(
    "normal",
  );
  const scenarios = {
    normal: {
      label: "正常路径",
      trigger: stages[0],
      result: `保持：${model.invariant}`,
    },
    stress: {
      label: "压力路径",
      trigger: `${nodes.length} 个正式节点同时进入复核`,
      result: `先量化 ${model.evidence}，再决定是否保留候选方案。`,
    },
    fault: {
      label: "反例路径",
      trigger: model.fault,
      result: `若无法恢复“${model.invariant}”，当前模式选择即失败。`,
    },
  } as const;
  const current = scenarios[scenario];

  return (
    <section
      aria-label={`${title} 反例实验`}
      className="not-prose my-6 overflow-hidden rounded-card border border-cyan-300 bg-canvas shadow-sm dark:border-cyan-800"
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-900 dark:bg-cyan-950/30">
        <div>
          <p className="font-semibold text-cyan-950 dark:text-cyan-100">
            {title} · 反例诊断器
          </p>
          <p className="mt-1 text-sm text-cyan-800 dark:text-cyan-300">
            {focus}
          </p>
        </div>
        <ResetButton onReset={() => setScenario("normal")} />
      </header>

      <div className="grid grid-cols-3 gap-2 p-4">
        {(Object.keys(scenarios) as Array<keyof typeof scenarios>).map(
          (key) => (
            <button
              key={key}
              type="button"
              aria-pressed={scenario === key}
              onClick={() => setScenario(key)}
              className={
                "min-h-11 rounded-control border px-2 text-xs font-semibold sm:text-sm " +
                (scenario === key
                  ? "border-cyan-600 bg-cyan-100 text-cyan-950 dark:bg-cyan-950 dark:text-cyan-100"
                  : "border-border bg-canvas text-secondary")
              }
            >
              {scenarios[key].label}
            </button>
          ),
        )}
      </div>

      <div className="grid gap-3 border-t border-border p-4 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-card border border-border bg-elevated p-3">
          <p className="text-xs font-semibold text-secondary">触发输入</p>
          <p className="mt-2 text-sm text-primary">{current.trigger}</p>
        </div>
        <div className="rounded-card border border-border bg-elevated p-3">
          <p className="text-xs font-semibold text-secondary">因果结论</p>
          <p className="mt-2 text-sm text-primary">{current.result}</p>
        </div>
      </div>
    </section>
  );
}
