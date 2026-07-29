"use client";

import { useMemo, useState } from "react";

export type AgentApplicationModel = {
  title: string;
  focus: string;
  invariant: string;
  fault: string;
  evidence: string;
  stages: string[];
  signals: [string, string, string, string];
};

type Props = {
  mode: "model" | "trace" | "evidence";
  model: AgentApplicationModel;
};

const STRATEGIES = [
  {
    label: "简单基线",
    autonomy: 18,
    latency: 24,
    cost: 20,
    observability: 92,
  },
  {
    label: "受控工作流",
    autonomy: 46,
    latency: 52,
    cost: 48,
    observability: 78,
  },
  {
    label: "自主循环",
    autonomy: 82,
    latency: 84,
    cost: 80,
    observability: 58,
  },
] as const;

function labelForSvg(value: string) {
  return value.length > 10 ? `${value.slice(0, 9)}…` : value;
}

function ModelLab({ model }: { model: AgentApplicationModel }) {
  const [strategyIndex, setStrategyIndex] = useState(1);
  const strategy = STRATEGIES[strategyIndex];
  const stages = model.stages.slice(0, 5);
  const activeStages = Math.max(
    1,
    Math.ceil((stages.length * (strategyIndex + 1)) / STRATEGIES.length),
  );

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-sky-200 bg-sky-50 shadow-sm dark:border-sky-900 dark:bg-sky-950/30"
      data-visual-kind={`agent-application-model-${model.title}`}
    >
      <div className="border-b border-sky-200 px-4 py-3 dark:border-sky-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-sky-700 uppercase dark:text-sky-300">
          Architecture decision laboratory
        </p>
        <h3 className="mt-1 font-semibold">{model.title}</h3>
        <p className="mt-1 break-words text-sm text-slate-600 dark:text-slate-300">
          {model.focus}
        </p>
      </div>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="min-w-0 space-y-3">
          <fieldset>
            <legend className="text-xs font-semibold text-slate-500">
              复杂度档位
            </legend>
            <div className="mt-2 grid gap-2">
              {STRATEGIES.map((item, index) => (
                <button
                  className={`min-h-11 min-w-0 rounded-lg border px-3 py-2 text-left text-sm ${
                    strategyIndex === index
                      ? "border-sky-700 bg-sky-700 text-white"
                      : "border-sky-200 bg-white dark:border-sky-800 dark:bg-slate-950"
                  }`}
                  key={item.label}
                  onClick={() => setStrategyIndex(index)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>
          <p className="break-words text-xs text-slate-500">
            不变量：{model.invariant}
          </p>
        </div>

        <div className="min-w-0 overflow-hidden rounded-xl bg-slate-950 p-3 text-slate-100">
          <svg
            aria-label={`${model.title} 的阶段结构与复杂度边界`}
            className="h-auto w-full"
            viewBox="0 0 720 310"
          >
            <rect
              fill="#0f172a"
              height="286"
              rx="16"
              width="696"
              x="12"
              y="12"
            />
            <text fill="#bae6fd" fontSize="13" fontWeight="700" x="28" y="38">
              {strategy.label}：只激活能够由收益证明的阶段
            </text>
            {stages.map((stage, index) => {
              const width = 112;
              const gap =
                stages.length > 1 ? (620 - width) / (stages.length - 1) : 0;
              const x = 44 + index * gap;
              const active = index < activeStages;
              return (
                <g key={stage}>
                  {index > 0 ? (
                    <line
                      stroke={active ? "#38bdf8" : "#475569"}
                      strokeDasharray={active ? undefined : "6 6"}
                      strokeWidth="4"
                      x1={x - gap + width}
                      x2={x}
                      y1="136"
                      y2="136"
                    />
                  ) : null}
                  <rect
                    fill={active ? "#0c4a6e" : "#1e293b"}
                    height="76"
                    rx="12"
                    stroke={active ? "#7dd3fc" : "#64748b"}
                    strokeWidth="3"
                    width={width}
                    x={x}
                    y="98"
                  />
                  <text
                    fill={active ? "#f0f9ff" : "#94a3b8"}
                    fontSize="12"
                    fontWeight="700"
                    textAnchor="middle"
                    x={x + width / 2}
                    y="131"
                  >
                    {index + 1}
                  </text>
                  <text
                    fill={active ? "#e0f2fe" : "#94a3b8"}
                    fontSize="11"
                    textAnchor="middle"
                    x={x + width / 2}
                    y="153"
                  >
                    {labelForSvg(stage)}
                  </text>
                </g>
              );
            })}
            <text fill="#94a3b8" fontSize="12" x="28" y="220">
              蓝色表示当前方案承担的责任；虚线阶段仍留在系统边界外。
            </text>
            <text fill="#e2e8f0" fontSize="12" x="28" y="250">
              关键证据：{labelForSvg(model.evidence)}
            </text>
          </svg>

          <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs sm:grid-cols-4">
            {[
              ["自主性", strategy.autonomy],
              ["延迟", strategy.latency],
              ["成本", strategy.cost],
              ["可观测", strategy.observability],
            ].map(([label, value]) => (
              <div className="rounded-lg bg-slate-900 p-2" key={String(label)}>
                <span className="block text-slate-400">{label}</span>
                <strong className="mt-1 block text-sky-300">{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TraceLab({ model }: { model: AgentApplicationModel }) {
  const [activeStage, setActiveStage] = useState(0);
  const stages = model.stages.slice(0, 6);
  const progress = stages.length > 1 ? activeStage / (stages.length - 1) : 1;

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-violet-200 bg-violet-50 shadow-sm dark:border-violet-900 dark:bg-violet-950/30"
      data-visual-kind={`agent-application-trace-${model.title}`}
    >
      <div className="border-b border-violet-200 px-4 py-3 dark:border-violet-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-violet-700 uppercase dark:text-violet-300">
          State and decision trace
        </p>
        <h3 className="mt-1 font-semibold">逐步查看首个状态分叉</h3>
      </div>

      <div className="min-w-0 p-4 sm:p-5">
        <div className="min-w-0 overflow-hidden rounded-xl bg-slate-950 p-3">
          <svg
            aria-label={`${model.title} 的输入、决策、执行与验收轨迹`}
            className="h-auto w-full"
            viewBox="0 0 680 240"
          >
            <rect
              fill="#0f172a"
              height="216"
              rx="16"
              width="656"
              x="12"
              y="12"
            />
            <line
              stroke="#475569"
              strokeWidth="8"
              x1="70"
              x2="610"
              y1="118"
              y2="118"
            />
            <line
              stroke="#8b5cf6"
              strokeLinecap="round"
              strokeWidth="8"
              x1="70"
              x2={70 + 540 * progress}
              y1="118"
              y2="118"
            />
            {stages.map((stage, index) => {
              const x =
                stages.length === 1
                  ? 340
                  : 70 + (540 * index) / (stages.length - 1);
              const active = index <= activeStage;
              return (
                <g key={stage}>
                  <circle
                    cx={x}
                    cy="118"
                    fill={active ? "#7c3aed" : "#1e293b"}
                    r={index === activeStage ? 22 : 16}
                    stroke={active ? "#ddd6fe" : "#64748b"}
                    strokeWidth="3"
                  />
                  <text
                    fill={active ? "#f5f3ff" : "#94a3b8"}
                    fontSize="12"
                    fontWeight="700"
                    textAnchor="middle"
                    x={x}
                    y={index % 2 === 0 ? 66 : 184}
                  >
                    {index + 1}
                  </text>
                </g>
              );
            })}
            <text fill="#c4b5fd" fontSize="13" x="28" y="38">
              固定任务、工具、权限与预算，再逐步推进
            </text>
            <text
              fill="#e2e8f0"
              fontSize="13"
              textAnchor="middle"
              x="340"
              y="226"
            >
              {labelForSvg(stages[activeStage])}
            </text>
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {stages.map((stage, index) => (
            <button
              className={`min-h-11 min-w-0 rounded-lg border px-2 py-2 text-xs ${
                activeStage === index
                  ? "border-violet-700 bg-violet-700 text-white"
                  : "border-violet-200 bg-white dark:border-violet-800 dark:bg-slate-950"
              }`}
              key={stage}
              onClick={() => setActiveStage(index)}
              type="button"
            >
              <span className="block truncate">{stage}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
          <p className="break-words rounded-lg border border-violet-200 bg-white p-3 dark:border-violet-800 dark:bg-slate-950">
            当前检查：{stages[activeStage]}
          </p>
          <p className="break-words rounded-lg border border-violet-200 bg-white p-3 dark:border-violet-800 dark:bg-slate-950">
            对应信号：{model.signals[activeStage % model.signals.length]}
          </p>
        </div>
      </div>
    </section>
  );
}

function EvidenceLab({ model }: { model: AgentApplicationModel }) {
  const [faultInjected, setFaultInjected] = useState(false);
  const [run, setRun] = useState(1);
  const scores = faultInjected ? [100, 64, 28, 12] : [100, 96, 94, 92];
  const events = useMemo(
    () => [
      {
        phase: "baseline",
        value: `run=${run} · 输入、工具、权限与预算已冻结`,
        pass: true,
      },
      {
        phase: "mechanism",
        value: faultInjected ? model.fault : model.invariant,
        pass: !faultInjected,
      },
      {
        phase: "oracle",
        value: faultInjected
          ? "首个分叉已标红，拒绝继续副作用"
          : model.evidence,
        pass: !faultInjected,
      },
      {
        phase: "replay",
        value: faultInjected ? "等待撤销故障" : "恢复后同输入重放一致",
        pass: !faultInjected,
      },
    ],
    [faultInjected, model.evidence, model.fault, model.invariant, run],
  );

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30"
      data-visual-kind={`agent-application-evidence-${model.title}`}
    >
      <div className="border-b border-emerald-200 px-4 py-3 dark:border-emerald-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-300">
          Fault injection and replay
        </p>
        <h3 className="mt-1 font-semibold">基线、故障、恢复与重放</h3>
      </div>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="min-w-0 space-y-3">
          <button
            className={`min-h-11 w-full rounded-lg px-3 py-2 text-sm font-semibold text-white ${
              faultInjected ? "bg-rose-700" : "bg-emerald-700"
            }`}
            onClick={() => setFaultInjected((value) => !value)}
            type="button"
          >
            {faultInjected ? "撤销单变量故障" : "注入单变量故障"}
          </button>
          <button
            className="min-h-11 w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm dark:border-emerald-800 dark:bg-slate-950"
            onClick={() => setRun((value) => value + 1)}
            type="button"
          >
            以相同输入重放
          </button>
          <button
            className="min-h-11 w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm dark:border-emerald-800 dark:bg-slate-950"
            onClick={() => {
              setFaultInjected(false);
              setRun(1);
            }}
            type="button"
          >
            重置实验
          </button>
          <p className="break-words text-xs text-slate-500">
            必存证据：{model.evidence}
          </p>
        </div>

        <div className="min-w-0 space-y-3">
          <div className="min-w-0 overflow-hidden rounded-xl bg-slate-950 p-3">
            <svg
              aria-label={`${model.title} 的四阶段证据完整度`}
              className="h-auto w-full"
              viewBox="0 0 560 210"
            >
              <rect
                fill="#0f172a"
                height="186"
                rx="14"
                width="536"
                x="12"
                y="12"
              />
              {scores.map((score, index) => {
                const y = 38 + index * 38;
                return (
                  <g key={model.signals[index]}>
                    <text fill="#cbd5e1" fontSize="11" x="28" y={y + 12}>
                      {labelForSvg(model.signals[index])}
                    </text>
                    <rect
                      fill="#334155"
                      height="16"
                      rx="8"
                      width="300"
                      x="208"
                      y={y}
                    />
                    <rect
                      fill={faultInjected && index > 0 ? "#e11d48" : "#10b981"}
                      height="16"
                      rx="8"
                      width={3 * score}
                      x="208"
                      y={y}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {events.map((event, index) => (
            <div
              className={`min-w-0 rounded-lg border p-3 ${
                event.pass
                  ? "border-emerald-300 bg-white dark:border-emerald-800 dark:bg-slate-950"
                  : "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40"
              }`}
              key={event.phase}
            >
              <div className="flex min-w-0 items-center justify-between gap-3">
                <strong className="min-w-0 break-words text-sm">
                  {index + 1}. {event.phase}
                </strong>
                <span className="shrink-0 text-xs">
                  {event.pass ? "一致" : "分叉"}
                </span>
              </div>
              <p className="mt-1 break-words text-xs text-slate-600 dark:text-slate-300">
                {event.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AgentApplicationPatternLab({ mode, model }: Props) {
  if (mode === "model") return <ModelLab model={model} />;
  if (mode === "trace") return <TraceLab model={model} />;
  return <EvidenceLab model={model} />;
}
