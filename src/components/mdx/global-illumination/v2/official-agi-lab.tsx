"use client";

import { useState } from "react";

export interface GraphicsConceptNode {
  label: string;
  unit: string;
  mechanism: string;
  probe: string;
}

export interface GraphicsExperimentModel {
  focus: string;
  formula: string;
  invariant: string;
  fault: string;
  evidence: string;
  sourceLabel: string;
}

interface OfficialAgiLabProps {
  mode: "transport" | "estimator" | "evidence";
  unitTitle: string;
  nodes: readonly GraphicsConceptNode[];
  model: GraphicsExperimentModel;
}

const PATH_EVENTS = [
  {
    label: "传感器",
    symbol: "E",
    detail: "选择像素与初始方向，定义最终测量。",
  },
  {
    label: "表面散射",
    symbol: "S₁",
    detail: "乘入BSDF、余弦项与采样概率。",
  },
  {
    label: "间接反弹",
    symbol: "S₂",
    detail: "继续传播吞吐量并检查可见性。",
  },
  {
    label: "光源",
    symbol: "L",
    detail: "连接发射项，形成一条完整贡献路径。",
  },
] as const;

const SAMPLE_COUNTS = [1, 4, 16] as const;
const DISTRIBUTIONS = [
  {
    id: "uniform",
    label: "均匀半球",
    behavior: "覆盖完整但在集中贡献场景中浪费大量样本。",
  },
  {
    id: "cosine",
    label: "余弦加权",
    behavior: "更贴近漫反射核，但未利用光源位置。",
  },
  {
    id: "importance",
    label: "贡献导向",
    behavior: "PDF接近被积函数时权重更稳定，但必须保持测度一致。",
  },
] as const;

const CHECKS = [
  "记录路径顶点、事件类型与可见性",
  "保存正向/反向PDF和当前测度",
  "分开报告偏差、方差、时间与内存",
  "恢复后用独立随机批次重放结论",
] as const;

function Header({
  eyebrow,
  title,
  description,
  reset,
}: {
  eyebrow: string;
  title: string;
  description: string;
  reset: () => void;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-wide text-accent">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-base font-semibold text-primary">{title}</h3>
        <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
          {description}
        </p>
      </div>
      <button
        type="button"
        className="rounded-control border border-border bg-surface px-3 py-2 text-xs text-secondary hover:border-accent hover:text-primary"
        onClick={reset}
      >
        重置实验
      </button>
    </header>
  );
}

function TransportView({
  unitTitle,
  nodes,
  model,
}: Omit<OfficialAgiLabProps, "mode">) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const [eventIndex, setEventIndex] = useState(0);
  const active = nodes[nodeIndex] ?? nodes[0];
  const reset = () => {
    setNodeIndex(0);
    setEventIndex(0);
  };

  return (
    <>
      <Header
        eyebrow="路径空间与光传输事件"
        title={unitTitle}
        description={`把${model.focus}展开为传感器、散射、反弹与光源四类事件。`}
        reset={reset}
      />
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.35fr)]">
        <section className="min-w-0 border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="mb-3 text-xs font-semibold text-primary">正式概念</p>
          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {nodes.map((node, index) => (
              <button
                key={`${node.label}-${index}`}
                type="button"
                aria-pressed={nodeIndex === index}
                className={`w-full rounded-control border px-3 py-2 text-left text-sm ${
                  nodeIndex === index
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary"
                }`}
                onClick={() => setNodeIndex(index)}
              >
                <span className="mr-2 font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {node.label}
              </button>
            ))}
          </div>
        </section>

        <section className="min-w-0 p-5" aria-live="polite">
          <div className="grid gap-2 sm:grid-cols-4">
            {PATH_EVENTS.map((event, index) => (
              <button
                key={event.label}
                type="button"
                aria-pressed={eventIndex === index}
                className={`rounded-control border p-3 text-left ${
                  eventIndex === index
                    ? "border-accent bg-accent/10"
                    : "border-border bg-surface"
                }`}
                onClick={() => setEventIndex(index)}
              >
                <span className="block font-mono text-sm font-semibold text-accent">
                  {event.symbol}
                </span>
                <span className="mt-1 block text-xs font-semibold text-primary">
                  {event.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-card border border-border bg-surface p-4">
            <svg
              viewBox="0 0 520 170"
              role="img"
              aria-label="从传感器经过两个散射点连接到光源的四事件光路径"
              className="block h-auto w-full"
            >
              <polyline
                points="52,122 188,74 330,112 468,46"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
              />
              {[
                [52, 122],
                [188, 74],
                [330, 112],
                [468, 46],
              ].map(([x, y], index) => (
                <g key={`${x}-${y}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r={eventIndex === index ? 13 : 9}
                    fill={
                      eventIndex === index ? "var(--warning)" : "var(--success)"
                    }
                  />
                  <text
                    x={x}
                    y={y + 31}
                    textAnchor="middle"
                    fontSize="12"
                    fill="var(--text-secondary)"
                  >
                    {PATH_EVENTS[index].symbol}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold text-accent">
                {active?.unit} / {active?.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {active?.mechanism}
              </p>
            </div>
            <div className="rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold text-success">
                {PATH_EVENTS[eventIndex].label}
              </p>
              <p className="mt-2 text-sm leading-6 text-primary">
                {PATH_EVENTS[eventIndex].detail}
              </p>
              <p className="mt-2 text-xs leading-5 text-secondary">
                探针：{active?.probe}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function EstimatorView({
  unitTitle,
  model,
}: Pick<OfficialAgiLabProps, "unitTitle" | "model">) {
  const [samples, setSamples] = useState<(typeof SAMPLE_COUNTS)[number]>(4);
  const [distributionIndex, setDistributionIndex] = useState(1);
  const [fault, setFault] = useState(false);
  const distribution = DISTRIBUTIONS[distributionIndex];
  const reset = () => {
    setSamples(4);
    setDistributionIndex(1);
    setFault(false);
  };

  return (
    <>
      <Header
        eyebrow="蒙特卡洛估计器实验"
        title={unitTitle}
        description="样本数改变重复试验的稳定性，分布改变权重；打开故障只破坏PDF或路径合同。"
        reset={reset}
      />
      <div className="space-y-5 p-5">
        <section className="flex flex-wrap gap-2">
          {SAMPLE_COUNTS.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={samples === value}
              className={`rounded-control border px-4 py-2 text-sm ${
                samples === value
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary"
              }`}
              onClick={() => setSamples(value)}
            >
              {value} 个样本
            </button>
          ))}
        </section>

        <section className="grid gap-2 sm:grid-cols-3">
          {DISTRIBUTIONS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={distributionIndex === index}
              className={`rounded-control border p-3 text-left ${
                distributionIndex === index
                  ? "border-accent bg-accent/10"
                  : "border-border bg-surface"
              }`}
              onClick={() => setDistributionIndex(index)}
            >
              <span className="block text-xs font-semibold text-primary">
                {item.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-secondary">
                {item.behavior}
              </span>
            </button>
          ))}
        </section>

        <button
          type="button"
          aria-pressed={fault}
          className={`rounded-control border px-4 py-2 text-sm ${
            fault
              ? "border-warning bg-warning/10 text-warning"
              : "border-border bg-surface text-secondary"
          }`}
          onClick={() => setFault((value) => !value)}
        >
          {fault ? "已注入：PDF/权重不一致" : "注入PDF/权重不一致"}
        </button>

        <section className="grid gap-3 md:grid-cols-3" aria-live="polite">
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-accent">采样合同</p>
            <p className="mt-2 text-sm leading-6 text-primary">
              {samples} 个样本 · {distribution.label}
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-warning">估计行为</p>
            <p className="mt-2 text-sm leading-6 text-primary">
              {fault ? model.fault : distribution.behavior}
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-success">判定证据</p>
            <p className="mt-2 text-sm leading-6 text-primary">
              {fault ? `由${model.evidence}定位后拒绝估计` : model.invariant}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

function EvidenceView({
  unitTitle,
  model,
}: Pick<OfficialAgiLabProps, "unitTitle" | "model">) {
  const [phase, setPhase] = useState<"reference" | "divergence" | "replay">(
    "reference",
  );
  const [checked, setChecked] = useState(() => CHECKS.map(() => false));
  const reset = () => {
    setPhase("reference");
    setChecked(CHECKS.map(() => false));
  };
  const phaseText = {
    reference: `建立独立批次基线：${model.invariant}`,
    divergence: `保存第一条异常路径：${model.fault}`,
    replay: `撤销故障并比较：${model.evidence}`,
  }[phase];

  return (
    <>
      <Header
        eyebrow="光传输算法证据包"
        title={unitTitle}
        description="同一均值可能来自不同偏差和方差；路径、PDF、资源开销与独立批次必须一起保存。"
        reset={reset}
      />
      <div className="grid lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <section className="border-b border-border p-5 lg:border-r lg:border-b-0">
          <div className="grid gap-2">
            {(
              [
                ["reference", "1. 参考批次"],
                ["divergence", "2. 首条分叉"],
                ["replay", "3. 恢复重放"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={phase === id}
                className={`rounded-control border px-3 py-3 text-left text-sm ${
                  phase === id
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary"
                }`}
                onClick={() => setPhase(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <p
            className="mt-4 rounded-control border border-border bg-elevated p-4 text-sm leading-6 text-primary"
            aria-live="polite"
          >
            {phaseText}
          </p>
        </section>
        <section className="p-5">
          <p className="mb-3 text-xs font-semibold text-primary">
            已确认 {checked.filter(Boolean).length}/{CHECKS.length}
          </p>
          <div className="space-y-2">
            {CHECKS.map((item, index) => (
              <button
                key={item}
                type="button"
                aria-pressed={checked[index]}
                className={`flex w-full gap-3 rounded-control border p-3 text-left text-sm ${
                  checked[index]
                    ? "border-success bg-success/10 text-primary"
                    : "border-border bg-surface text-secondary"
                }`}
                onClick={() =>
                  setChecked((current) =>
                    current.map((value, itemIndex) =>
                      itemIndex === index ? !value : value,
                    ),
                  )
                }
              >
                <span className="font-mono text-xs text-accent">
                  {checked[index] ? "✓" : String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export function OfficialAgiLab(props: OfficialAgiLabProps) {
  return (
    <figure
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind={`agi-light-transport-${props.mode}`}
    >
      {props.mode === "transport" ? (
        <TransportView
          unitTitle={props.unitTitle}
          nodes={props.nodes}
          model={props.model}
        />
      ) : props.mode === "estimator" ? (
        <EstimatorView unitTitle={props.unitTitle} model={props.model} />
      ) : (
        <EvidenceView unitTitle={props.unitTitle} model={props.model} />
      )}
      <figcaption className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        来源边界：{props.model.sourceLabel}
        。浏览稿与一手论文用于核对公式，课程交互不冒充原书图表。
      </figcaption>
    </figure>
  );
}
