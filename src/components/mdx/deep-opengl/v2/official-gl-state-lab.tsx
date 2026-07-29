"use client";

import { useId, useState } from "react";

export type ApiConceptNode = {
  label: string;
  unit: string;
  mechanism: string;
  probe: string;
};

export type ApiExperimentModel = {
  focus: string;
  formula: string;
  invariant: string;
  fault: string;
  evidence: string;
  sourceLabel: string;
};

type OfficialGlStateLabProps = {
  mode: "state" | "fault" | "evidence";
  unitTitle: string;
  nodes: ApiConceptNode[];
  model: ApiExperimentModel;
};

const CHECKS = [
  "记录context与API版本",
  "保存对象、绑定与开关快照",
  "标记第一条调试消息或像素差异",
  "恢复同输入并重放",
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

function StateView({
  unitTitle,
  nodes,
  model,
}: Omit<OfficialGlStateLabProps, "mode">) {
  const [selected, setSelected] = useState(0);
  const [stage, setStage] = useState<"context" | "binding" | "object" | "draw">(
    "context",
  );
  const markerId = useId().replaceAll(":", "");
  const active = nodes[selected] ?? nodes[0];
  const reset = () => {
    setSelected(0);
    setStage("context");
  };
  const stages = [
    ["context", "Context"],
    ["binding", "Binding"],
    ["object", "Object"],
    ["draw", "Draw"],
  ] as const;

  return (
    <>
      <Header
        eyebrow="OpenGL 状态所有权图"
        title={unitTitle}
        description={`把“${model.focus}”放回context、binding、object与draw的真实责任边界。`}
        reset={reset}
      />
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.3fr)]">
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
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {stages.map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={stage === id}
                className={`rounded-control border px-3 py-2 text-xs ${
                  stage === id
                    ? "border-accent bg-accent/10 text-primary"
                    : "border-border bg-surface text-secondary"
                }`}
                onClick={() => setStage(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="overflow-hidden rounded-card border border-border bg-surface p-3">
            <svg
              viewBox="0 0 720 250"
              className="h-auto w-full"
              role="img"
              aria-label="OpenGL context、binding、object与draw状态路径"
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
              {stages.map(([id, label], index) => {
                const x = 35 + index * 170;
                const activeStage = stage === id;
                return (
                  <g key={id}>
                    <rect
                      x={x}
                      y="72"
                      width="140"
                      height="82"
                      rx="12"
                      className={
                        activeStage
                          ? "fill-accent/15 stroke-accent"
                          : "fill-elevated stroke-border"
                      }
                      strokeWidth="2"
                    />
                    <text
                      x={x + 70}
                      y="105"
                      textAnchor="middle"
                      className="fill-primary text-[16px] font-semibold"
                    >
                      {label}
                    </text>
                    <text
                      x={x + 70}
                      y="132"
                      textAnchor="middle"
                      className="fill-secondary text-[12px]"
                    >
                      {activeStage ? "当前检查点" : `stage ${index + 1}`}
                    </text>
                    {index < stages.length - 1 ? (
                      <line
                        x1={x + 140}
                        y1="113"
                        x2={x + 166}
                        y2="113"
                        className="stroke-accent"
                        strokeWidth="2"
                        markerEnd={`url(#${markerId})`}
                      />
                    ) : null}
                  </g>
                );
              })}
              <text
                x="35"
                y="205"
                className="fill-accent text-[13px] font-semibold"
              >
                {active?.label ?? "state"}
              </text>
              <text x="35" y="228" className="fill-secondary text-[12px]">
                probe: {(active?.probe ?? model.evidence).slice(0, 58)}
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
              <p className="text-xs font-semibold text-success">当前合同</p>
              <code className="mt-2 block overflow-x-auto whitespace-pre-wrap break-words text-xs leading-5 text-secondary">
                {model.formula}
              </code>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function FaultView({
  unitTitle,
  model,
}: Pick<OfficialGlStateLabProps, "unitTitle" | "model">) {
  const [caseId, setCaseId] = useState<"baseline" | "leak" | "lost">(
    "baseline",
  );
  const [explicitState, setExplicitState] = useState(true);
  const reset = () => {
    setCaseId("baseline");
    setExplicitState(true);
  };
  const cases = {
    baseline: {
      label: "正常基线",
      event: "完整建立对象、绑定、能力与输出目标",
      result: "同输入像素与状态快照一致",
    },
    leak: {
      label: "状态泄漏",
      event: model.fault,
      result: "首个绑定或开关与基线分叉",
    },
    lost: {
      label: "上下文/能力变化",
      event: "丢失上下文或撤销一个能力后继续使用旧路径",
      result: "对象失效或fallback未被选择",
    },
  } as const;
  const active = cases[caseId];
  const accepted = caseId === "baseline" && explicitState;

  return (
    <>
      <Header
        eyebrow="OpenGL 单变量反事实"
        title={unitTitle}
        description="只改变状态所有权或能力条件，观察事件、资源和像素从哪一步分叉。"
        reset={reset}
      />
      <div className="space-y-5 p-5">
        <section className="flex flex-wrap gap-2">
          {(Object.keys(cases) as Array<keyof typeof cases>).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={caseId === id}
              className={`rounded-control border px-3 py-2 text-xs ${
                caseId === id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary"
              }`}
              onClick={() => setCaseId(id)}
            >
              {cases[id].label}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={explicitState}
            className={`rounded-control border px-3 py-2 text-xs ${
              explicitState
                ? "border-success bg-success/10 text-primary"
                : "border-warning bg-warning/10 text-primary"
            }`}
            onClick={() => setExplicitState((value) => !value)}
          >
            {explicitState ? "显式建立状态" : "依赖残留状态"}
          </button>
        </section>
        <section
          className="grid min-w-0 gap-3 md:grid-cols-3"
          aria-live="polite"
        >
          <div className="min-w-0 rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-accent">事件</p>
            <p className="mt-2 break-words text-sm leading-6 text-primary">
              {active.event}
            </p>
          </div>
          <div className="min-w-0 rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-warning">观察</p>
            <p className="mt-2 break-words text-sm leading-6 text-primary">
              {active.result}
            </p>
          </div>
          <div className="min-w-0 rounded-card border border-border bg-elevated p-4">
            <p className="text-xs font-semibold text-success">裁决</p>
            <p className="mt-2 break-words text-sm leading-6 text-primary">
              {accepted
                ? `通过：${model.invariant}`
                : `拒绝：由${model.evidence}定位后恢复基线`}
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
}: Pick<OfficialGlStateLabProps, "unitTitle" | "model">) {
  const [phase, setPhase] = useState<"reference" | "fault" | "replay">(
    "reference",
  );
  const [checked, setChecked] = useState(() => CHECKS.map(() => false));
  const reset = () => {
    setPhase("reference");
    setChecked(CHECKS.map(() => false));
  };
  const phaseText = {
    reference: `保存正常参考：${model.invariant}`,
    fault: `注入单一故障：${model.fault}`,
    replay: `恢复并核对：${model.evidence}`,
  }[phase];

  return (
    <>
      <Header
        eyebrow="OpenGL 证据回放"
        title={unitTitle}
        description="证据必须同时包含能力、对象状态、第一条错误事件与输出，不能只保留截图。"
        reset={reset}
      />
      <div className="grid min-w-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
        <section className="min-w-0 border-b border-border p-5 lg:border-r lg:border-b-0">
          <div className="grid gap-2">
            {(
              [
                ["reference", "1. 正常参考"],
                ["fault", "2. 单一故障"],
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

export function OfficialGlStateLab(props: OfficialGlStateLabProps) {
  return (
    <figure
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind={`opengl-state-object-${props.mode}`}
    >
      {props.mode === "state" ? (
        <StateView
          unitTitle={props.unitTitle}
          nodes={props.nodes}
          model={props.model}
        />
      ) : props.mode === "fault" ? (
        <FaultView unitTitle={props.unitTitle} model={props.model} />
      ) : (
        <EvidenceView unitTitle={props.unitTitle} model={props.model} />
      )}
      <figcaption className="border-t border-border px-5 py-3 text-xs leading-5 text-secondary">
        事实边界：{props.model.sourceLabel}
        。图中只表达可由规范与运行证据核对的状态关系。
      </figcaption>
    </figure>
  );
}
