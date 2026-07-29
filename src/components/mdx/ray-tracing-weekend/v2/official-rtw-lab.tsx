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

interface OfficialRtwLabProps {
  mode: "geometry" | "sampling" | "evidence";
  unitTitle: string;
  nodes: readonly GraphicsConceptNode[];
  model: GraphicsExperimentModel;
}

const SAMPLE_COUNTS = [1, 4, 16] as const;
const RAY_PARAMETERS = [0.5, 1, 2] as const;
const FAILURE_MODES = [
  {
    id: "baseline",
    label: "正确基线",
    result: "保持几何、样本权重与输出顺序一致。",
  },
  {
    id: "space",
    label: "空间/方向混用",
    result: "射线或法线落在错误坐标系，首个几何量立即偏离。",
  },
  {
    id: "interval",
    label: "命中区间失效",
    result: "相机背后或更远的根覆盖了应保留的最近命中。",
  },
  {
    id: "weight",
    label: "样本权重错误",
    result: "图像仍有形状，但亮度均值或噪声收敛方向错误。",
  },
] as const;

const CHECKS = [
  "固定场景、随机种子与图像尺寸",
  "保存首条异常射线或散射事件",
  "核对命中区间、PDF或颜色权重",
  "恢复后同输入重放并比较输出摘要",
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

function GeometryView({
  unitTitle,
  nodes,
  model,
}: Omit<OfficialRtwLabProps, "mode">) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const [rayParameter, setRayParameter] =
    useState<(typeof RAY_PARAMETERS)[number]>(1);
  const active = nodes[nodeIndex] ?? nodes[0];
  const pointX = 76 + rayParameter * 142;
  const reset = () => {
    setNodeIndex(0);
    setRayParameter(1);
  };

  return (
    <>
      <Header
        eyebrow="射线、交点与章节机制"
        title={unitTitle}
        description={`沿一条可见射线检查${model.focus}，改变t时只移动采样点，不偷偷改变原点或方向。`}
        reset={reset}
      />
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.3fr)]">
        <section className="min-w-0 border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="mb-3 text-xs font-semibold text-primary">
            正式概念坐标
          </p>
          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {nodes.map((node, index) => (
              <button
                key={`${node.label}-${index}`}
                type="button"
                aria-pressed={index === nodeIndex}
                className={`w-full rounded-control border px-3 py-2 text-left text-sm transition-colors ${
                  index === nodeIndex
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary hover:text-primary"
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
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-primary">
              射线参数 t
            </span>
            {RAY_PARAMETERS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={rayParameter === value}
                className={`rounded-full border px-3 py-1.5 text-xs ${
                  rayParameter === value
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary"
                }`}
                onClick={() => setRayParameter(value)}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-card border border-border bg-surface p-3">
            <svg
              viewBox="0 0 420 150"
              role="img"
              aria-label={`从Q沿方向d发出的射线，当前参数t为${rayParameter}`}
              className="block h-auto w-full"
            >
              <defs>
                <marker
                  id={`rtw-arrow-${unitTitle.replace(/\W/g, "")}`}
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
                </marker>
              </defs>
              <line
                x1="76"
                y1="92"
                x2="368"
                y2="42"
                stroke="var(--accent)"
                strokeWidth="3"
                markerEnd={`url(#rtw-arrow-${unitTitle.replace(/\W/g, "")})`}
              />
              <circle cx="76" cy="92" r="8" fill="var(--warning)" />
              <circle
                cx={pointX}
                cy={92 - (pointX - 76) * (50 / 292)}
                r="9"
                fill="var(--success)"
              />
              <text x="52" y="122" fontSize="12" fill="var(--text-secondary)">
                Q 原点
              </text>
              <text
                x={Math.min(pointX + 8, 346)}
                y={Math.max(92 - (pointX - 76) * (50 / 292) - 12, 24)}
                fontSize="12"
                fill="var(--text-primary)"
              >
                P({rayParameter})
              </text>
              <text x="184" y="124" fontSize="12" fill="var(--text-secondary)">
                P(t)=Q+td
              </text>
            </svg>
          </div>

          <div className="mt-4 rounded-control border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-accent">
              {active?.unit} / {active?.label}
            </p>
            <p className="mt-2 text-sm leading-6 text-primary">
              {active?.mechanism}
            </p>
            <p className="mt-2 text-xs leading-5 text-secondary">
              可推翻探针：{active?.probe}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

function SamplingView({
  unitTitle,
  model,
}: Pick<OfficialRtwLabProps, "unitTitle" | "model">) {
  const [samples, setSamples] = useState<(typeof SAMPLE_COUNTS)[number]>(4);
  const [failureIndex, setFailureIndex] = useState(0);
  const failure = FAILURE_MODES[failureIndex];
  const reset = () => {
    setSamples(4);
    setFailureIndex(0);
  };

  return (
    <>
      <Header
        eyebrow="固定种子的采样反事实"
        title={unitTitle}
        description="样本数只改变估计稳定性；故障模式只改变一条几何、区间或权重合同。"
        reset={reset}
      />
      <div className="space-y-5 p-5">
        <section>
          <p className="mb-2 text-xs font-semibold text-primary">
            每像素样本数
          </p>
          <div className="flex flex-wrap gap-2">
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
                {value} spp
              </button>
            ))}
          </div>
        </section>

        <section className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {FAILURE_MODES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={index === failureIndex}
              className={`rounded-control border p-3 text-left ${
                index === failureIndex
                  ? "border-accent bg-accent/10"
                  : "border-border bg-surface"
              }`}
              onClick={() => setFailureIndex(index)}
            >
              <span className="block text-xs font-semibold text-primary">
                {item.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-secondary">
                {item.result}
              </span>
            </button>
          ))}
        </section>

        <section className="grid gap-3 md:grid-cols-3" aria-live="polite">
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-accent">输入</p>
            <p className="mt-2 text-sm leading-6 text-primary">
              固定场景与随机种子，{samples} 个样本
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-warning">单一变化</p>
            <p className="mt-2 text-sm leading-6 text-primary">
              {failure.label}：{failure.result}
            </p>
          </div>
          <div className="rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-success">判定</p>
            <p className="mt-2 text-sm leading-6 text-primary">
              {failure.id === "baseline"
                ? model.invariant
                : `由${model.evidence}定位首个分叉后拒绝结果`}
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
}: Pick<OfficialRtwLabProps, "unitTitle" | "model">) {
  const [phase, setPhase] = useState<"baseline" | "fault" | "recovery">(
    "baseline",
  );
  const [checked, setChecked] = useState(() => CHECKS.map(() => false));
  const reset = () => {
    setPhase("baseline");
    setChecked(CHECKS.map(() => false));
  };
  const phaseText = {
    baseline: `保存正常轨迹：${model.invariant}`,
    fault: `只注入一个错误：${model.fault}`,
    recovery: `撤销错误并核对：${model.evidence}`,
  }[phase];

  return (
    <>
      <Header
        eyebrow="C++路径追踪证据包"
        title={unitTitle}
        description="漂亮图像不是验收标准；输入、首错、恢复与输出摘要必须能独立重放。"
        reset={reset}
      />
      <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <section className="border-b border-border p-5 lg:border-r lg:border-b-0">
          <div className="grid gap-2">
            {(
              [
                ["baseline", "1. 正常基线"],
                ["fault", "2. 单一故障"],
                ["recovery", "3. 恢复重放"],
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
                className={`flex w-full items-start gap-3 rounded-control border p-3 text-left text-sm ${
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

export function OfficialRtwLab(props: OfficialRtwLabProps) {
  return (
    <figure
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind={`rtw-ray-path-${props.mode}`}
    >
      {props.mode === "geometry" ? (
        <GeometryView
          unitTitle={props.unitTitle}
          nodes={props.nodes}
          model={props.model}
        />
      ) : props.mode === "sampling" ? (
        <SamplingView unitTitle={props.unitTitle} model={props.model} />
      ) : (
        <EvidenceView unitTitle={props.unitTitle} model={props.model} />
      )}
      <figcaption className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        版本坐标：{props.model.sourceLabel}
        。实验状态只解释本章因果合同，不替代官方C++源码。
      </figcaption>
    </figure>
  );
}
