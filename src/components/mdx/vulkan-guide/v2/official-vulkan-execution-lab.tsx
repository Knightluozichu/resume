"use client";

import { useId, useState } from "react";

export type VulkanConceptNode = {
  label: string;
  unit: string;
  mechanism: string;
  probe: string;
};

export type VulkanExperimentModel = {
  focus: string;
  formula: string;
  invariant: string;
  fault: string;
  evidence: string;
  sourceLabel: string;
};

type OfficialVulkanExecutionLabProps = {
  mode: "execution" | "hazard" | "evidence";
  unitTitle: string;
  nodes: VulkanConceptNode[];
  model: VulkanExperimentModel;
};

const CHECKS = [
  "固定实例、设备与扩展能力",
  "记录资源、layout与queue owner",
  "记录stage/access和信号值",
  "恢复后以同一提交序列重放",
];

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
        <h3 className="mt-1 break-words text-base font-semibold text-primary">
          {title}
        </h3>
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

function ExecutionView({
  unitTitle,
  nodes,
  model,
}: Omit<OfficialVulkanExecutionLabProps, "mode">) {
  const [selected, setSelected] = useState(0);
  const [queue, setQueue] = useState<"graphics" | "compute" | "present">(
    "graphics",
  );
  const [cursor, setCursor] = useState(1);
  const markerId = useId().replaceAll(":", "");
  const active = nodes[selected] ?? nodes[0];
  const stages = ["Host", "Record", "Submit", "Execute", "Signal"];
  const reset = () => {
    setSelected(0);
    setQueue("graphics");
    setCursor(1);
  };

  return (
    <>
      <Header
        eyebrow="Vulkan 提交与执行时间线"
        title={unitTitle}
        description={`把“${model.focus}”放到host、command buffer、queue与resource时间线上。`}
        reset={reset}
      />
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.35fr)]">
        <section className="min-w-0 border-b border-border p-4 lg:border-r lg:border-b-0">
          <p className="mb-3 text-xs font-semibold text-primary">正式坐标</p>
          <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
            {nodes.map((node, index) => (
              <button
                key={`${node.unit}-${node.label}-${index}`}
                type="button"
                aria-pressed={selected === index}
                className={`w-full rounded-control border px-3 py-2 text-left text-sm ${
                  selected === index
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary"
                }`}
                onClick={() => setSelected(index)}
              >
                <span className="mr-2 font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="break-words">{node.label}</span>
              </button>
            ))}
          </div>
        </section>
        <section className="min-w-0 space-y-4 p-5">
          <div className="flex flex-wrap gap-2">
            {(["graphics", "compute", "present"] as const).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={queue === id}
                className={`rounded-control border px-3 py-2 text-xs ${
                  queue === id
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary"
                }`}
                onClick={() => setQueue(id)}
              >
                {id} queue
              </button>
            ))}
            <button
              type="button"
              className="rounded-control border border-border bg-surface px-3 py-2 text-xs text-secondary"
              onClick={() => setCursor((value) => (value + 1) % stages.length)}
            >
              推进一步
            </button>
          </div>
          <div className="overflow-hidden rounded-card border border-border bg-surface p-3">
            <svg
              viewBox="0 0 760 285"
              className="h-auto w-full"
              role="img"
              aria-label="Vulkan host、录制、提交、执行与信号时间线"
            >
              <defs>
                <marker
                  id={markerId}
                  markerWidth="8"
                  markerHeight="8"
                  refX="7"
                  refY="4"
                  orient="auto"
                >
                  <path d="M0,0 L8,4 L0,8 z" className="fill-accent" />
                </marker>
              </defs>
              <line
                x1="70"
                y1="128"
                x2="700"
                y2="128"
                className="stroke-border"
                strokeWidth="4"
              />
              {stages.map((stage, index) => {
                const x = 75 + index * 155;
                const activeStage = index === cursor;
                return (
                  <g key={stage}>
                    <circle
                      cx={x}
                      cy="128"
                      r={activeStage ? "25" : "18"}
                      className={
                        activeStage
                          ? "fill-accent/20 stroke-accent"
                          : "fill-elevated stroke-border"
                      }
                      strokeWidth="3"
                    />
                    <text
                      x={x}
                      y="84"
                      textAnchor="middle"
                      className="fill-primary text-[14px] font-semibold"
                    >
                      {stage}
                    </text>
                    <text
                      x={x}
                      y="174"
                      textAnchor="middle"
                      className="fill-secondary text-[11px]"
                    >
                      {index === cursor ? "当前事件" : `t${index}`}
                    </text>
                    {index < stages.length - 1 ? (
                      <line
                        x1={x + 25}
                        y1="210"
                        x2={x + 120}
                        y2="210"
                        className="stroke-accent"
                        strokeWidth="2"
                        markerEnd={`url(#${markerId})`}
                      />
                    ) : null}
                  </g>
                );
              })}
              <rect
                x="70"
                y="232"
                width="630"
                height="38"
                rx="10"
                className="fill-elevated stroke-border"
              />
              <text x="90" y="256" className="fill-accent text-[13px]">
                {queue} / {(active?.label ?? "resource").slice(0, 46)}
              </text>
            </svg>
          </div>
          <div className="grid min-w-0 gap-3 md:grid-cols-2">
            <div className="min-w-0 rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold text-accent">
                {active?.unit}
              </p>
              <p className="mt-2 break-words text-sm leading-6 text-primary">
                {active?.mechanism}
              </p>
            </div>
            <div className="min-w-0 rounded-card border border-border bg-elevated p-4">
              <p className="text-xs font-semibold text-success">提交合同</p>
              <code className="mt-2 block overflow-x-auto whitespace-pre-wrap break-words text-xs leading-5 text-secondary">
                {model.formula}
              </code>
              <p className="mt-2 break-words text-xs leading-5 text-secondary">
                探针：{active?.probe}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function HazardView({
  unitTitle,
  model,
}: Pick<OfficialVulkanExecutionLabProps, "unitTitle" | "model">) {
  const [hazard, setHazard] = useState<"none" | "raw" | "owner">("none");
  const [barrier, setBarrier] = useState(true);
  const reset = () => {
    setHazard("none");
    setBarrier(true);
  };
  const cases = {
    none: {
      label: "正常依赖",
      producer: "producer WRITE",
      consumer: "consumer READ",
    },
    raw: {
      label: "RAW hazard",
      producer: "write未进入可见域",
      consumer: "read过早读取",
    },
    owner: {
      label: "队列所有权",
      producer: "release缺失",
      consumer: "另一family直接使用",
    },
  } as const;
  const active = cases[hazard];
  const pass = hazard === "none" && barrier;

  return (
    <>
      <Header
        eyebrow="Vulkan hazard 与依赖矩阵"
        title={unitTitle}
        description="一次只改变资源访问、队列所有权或屏障，核对执行顺序和内存可见性。"
        reset={reset}
      />
      <div className="space-y-5 p-5">
        <section className="flex flex-wrap gap-2">
          {(Object.keys(cases) as Array<keyof typeof cases>).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={hazard === id}
              className={`rounded-control border px-3 py-2 text-xs ${
                hazard === id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary"
              }`}
              onClick={() => setHazard(id)}
            >
              {cases[id].label}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={barrier}
            className={`rounded-control border px-3 py-2 text-xs ${
              barrier
                ? "border-success bg-success/10 text-primary"
                : "border-warning bg-warning/10 text-primary"
            }`}
            onClick={() => setBarrier((value) => !value)}
          >
            {barrier ? "依赖已声明" : "依赖缺失"}
          </button>
        </section>
        <section className="grid min-w-0 gap-3 md:grid-cols-[1fr_auto_1fr]">
          <div className="min-w-0 rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-accent">生产者</p>
            <p className="mt-2 break-words text-sm leading-6 text-primary">
              {active.producer}
            </p>
          </div>
          <div className="flex items-center justify-center px-2 text-xl text-accent">
            {barrier ? "→" : "×"}
          </div>
          <div className="min-w-0 rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-warning">消费者</p>
            <p className="mt-2 break-words text-sm leading-6 text-primary">
              {active.consumer}
            </p>
          </div>
        </section>
        <section
          className={`min-w-0 rounded-card border p-4 ${
            pass
              ? "border-success bg-success/10"
              : "border-warning bg-warning/10"
          }`}
          aria-live="polite"
        >
          <p className="text-xs font-semibold text-primary">
            {pass ? "依赖成立" : "拒绝当前提交"}
          </p>
          <p className="mt-2 break-words text-sm leading-6 text-secondary">
            {pass
              ? model.invariant
              : `${model.fault}；必须由${model.evidence}定位后恢复`}
          </p>
        </section>
      </div>
    </>
  );
}

function EvidenceView({
  unitTitle,
  model,
}: Pick<OfficialVulkanExecutionLabProps, "unitTitle" | "model">) {
  const [phase, setPhase] = useState<"baseline" | "fault" | "replay">(
    "baseline",
  );
  const [checked, setChecked] = useState(() => CHECKS.map(() => false));
  const reset = () => {
    setPhase("baseline");
    setChecked(CHECKS.map(() => false));
  };
  const phaseText = {
    baseline: `保存提交基线：${model.invariant}`,
    fault: `注入单一错误：${model.fault}`,
    replay: `恢复并核对：${model.evidence}`,
  }[phase];

  return (
    <>
      <Header
        eyebrow="Vulkan 提交证据包"
        title={unitTitle}
        description="VUID只是入口；完整证据还要包含资源、stage/access、layout、队列与信号值。"
        reset={reset}
      />
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <section className="min-w-0 border-b border-border p-5 lg:border-r lg:border-b-0">
          <div className="grid gap-2">
            {(
              [
                ["baseline", "1. 提交基线"],
                ["fault", "2. 单一错误"],
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
            className="mt-4 break-words rounded-control border border-border bg-elevated p-4 text-sm leading-6 text-primary"
            aria-live="polite"
          >
            {phaseText}
          </p>
        </section>
        <section className="min-w-0 p-5">
          <p className="mb-3 text-xs font-semibold text-primary">
            已确认 {checked.filter(Boolean).length}/{CHECKS.length}
          </p>
          <div className="space-y-2">
            {CHECKS.map((item, index) => (
              <button
                key={item}
                type="button"
                aria-pressed={checked[index]}
                className={`flex w-full min-w-0 gap-3 rounded-control border p-3 text-left text-sm ${
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
                <span className="shrink-0 font-mono text-xs text-accent">
                  {checked[index] ? "✓" : String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 break-words">{item}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export function OfficialVulkanExecutionLab(
  props: OfficialVulkanExecutionLabProps,
) {
  return (
    <figure
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind={`vulkan-submit-hazard-${props.mode}`}
    >
      {props.mode === "execution" ? (
        <ExecutionView
          unitTitle={props.unitTitle}
          nodes={props.nodes}
          model={props.model}
        />
      ) : props.mode === "hazard" ? (
        <HazardView unitTitle={props.unitTitle} model={props.model} />
      ) : (
        <EvidenceView unitTitle={props.unitTitle} model={props.model} />
      )}
      <figcaption className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        事实边界：{props.model.sourceLabel}
        。时间线与hazard矩阵必须由规范、VUID和同输入重放共同验证。
      </figcaption>
    </figure>
  );
}
