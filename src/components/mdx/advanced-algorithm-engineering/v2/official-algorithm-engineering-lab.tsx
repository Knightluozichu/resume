"use client";

import { useMemo, useState } from "react";

export type AlgorithmEngineeringModel = {
  title: string;
  focus: string;
  formula: string;
  invariant: string;
  fault: string;
  evidence: string;
  stages: string[];
};

type Props = {
  mode: "cost" | "trace" | "evidence";
  model: AlgorithmEngineeringModel;
};

const WORKLOADS = [
  { label: "缓存内", scale: 1, block: 8 },
  { label: "主存", scale: 8, block: 32 },
  { label: "外存", scale: 64, block: 128 },
] as const;

function CostLab({ model }: { model: AlgorithmEngineeringModel }) {
  const [workload, setWorkload] = useState(1);
  const [locality, setLocality] = useState<"sequential" | "scattered">(
    "sequential",
  );
  const active = WORKLOADS[workload];
  const transfers =
    locality === "sequential"
      ? Math.max(1, Math.ceil((active.scale * 1024) / active.block))
      : active.scale * 1024;
  const relativeCost =
    locality === "sequential" ? active.scale : active.scale * active.block;

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-cyan-200 bg-cyan-50 shadow-sm dark:border-cyan-900 dark:bg-cyan-950/30"
      data-visual-kind={`algorithm-cost-${model.title}`}
    >
      <div className="border-b border-cyan-200 px-4 py-3 dark:border-cyan-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-cyan-700 uppercase dark:text-cyan-300">
          Cost-model laboratory
        </p>
        <h3 className="mt-1 font-semibold">{model.title}</h3>
        <p className="mt-1 break-words text-sm text-slate-600 dark:text-slate-300">
          {model.focus}
        </p>
      </div>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="min-w-0 space-y-4">
          <fieldset>
            <legend className="text-xs font-semibold text-slate-500">
              工作集所在层级
            </legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {WORKLOADS.map((item, index) => (
                <button
                  className={`min-h-11 min-w-0 rounded-lg border px-2 py-2 text-xs ${
                    workload === index
                      ? "border-cyan-700 bg-cyan-700 text-white"
                      : "border-cyan-200 bg-white dark:border-cyan-800 dark:bg-slate-950"
                  }`}
                  key={item.label}
                  onClick={() => setWorkload(index)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            className="min-h-11 w-full rounded-lg border border-cyan-300 bg-white px-3 py-2 text-left text-sm dark:border-cyan-800 dark:bg-slate-950"
            onClick={() =>
              setLocality((value) =>
                value === "sequential" ? "scattered" : "sequential",
              )
            }
            type="button"
          >
            访问模式：
            <strong>
              {locality === "sequential" ? "连续批量" : "离散跳转"}
            </strong>
          </button>
        </div>

        <div className="min-w-0 rounded-xl bg-slate-950 p-4 text-slate-100">
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="min-w-0 rounded-lg bg-slate-900 p-3">
              <span className="block text-slate-400">规模</span>
              <strong className="mt-1 block break-words">
                {active.scale * 1024}
              </strong>
            </div>
            <div className="min-w-0 rounded-lg bg-slate-900 p-3">
              <span className="block text-slate-400">传输</span>
              <strong className="mt-1 block break-words">{transfers}</strong>
            </div>
            <div className="min-w-0 rounded-lg bg-slate-900 p-3">
              <span className="block text-slate-400">相对成本</span>
              <strong className="mt-1 block break-words">
                {relativeCost}×
              </strong>
            </div>
          </div>
          <pre className="mt-3 min-w-0 overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-slate-700 p-3 text-xs leading-6 text-cyan-300">
            {model.formula}
          </pre>
          <p className="mt-3 break-words text-xs text-slate-300">
            不变量：{model.invariant}
          </p>
        </div>
      </div>
    </section>
  );
}

function TraceLab({ model }: { model: AlgorithmEngineeringModel }) {
  const [activeStage, setActiveStage] = useState(0);
  const stages = model.stages.slice(0, 6);
  const progress = stages.length > 1 ? activeStage / (stages.length - 1) : 1;

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-violet-200 bg-violet-50 shadow-sm dark:border-violet-900 dark:bg-violet-950/30"
      data-visual-kind={`algorithm-trace-${model.title}`}
    >
      <div className="border-b border-violet-200 px-4 py-3 dark:border-violet-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-violet-700 uppercase dark:text-violet-300">
          State-and-transfer trace
        </p>
        <h3 className="mt-1 font-semibold">从输入契约到可复核输出</h3>
      </div>

      <div className="min-w-0 p-4 sm:p-5">
        <div className="min-w-0 overflow-hidden rounded-xl bg-slate-950 p-3">
          <svg
            aria-label={`${model.title} 的阶段状态与数据传输轨迹`}
            className="h-auto w-full"
            viewBox="0 0 660 230"
          >
            <rect
              fill="#0f172a"
              height="206"
              rx="16"
              width="636"
              x="12"
              y="12"
            />
            <line
              stroke="#475569"
              strokeWidth="8"
              x1="72"
              x2="588"
              y1="112"
              y2="112"
            />
            <line
              stroke="#8b5cf6"
              strokeLinecap="round"
              strokeWidth="8"
              x1="72"
              x2={72 + 516 * progress}
              y1="112"
              y2="112"
            />
            {stages.map((stage, index) => {
              const x =
                stages.length === 1
                  ? 330
                  : 72 + (516 * index) / (stages.length - 1);
              const active = index <= activeStage;
              return (
                <g key={stage}>
                  <circle
                    cx={x}
                    cy="112"
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
                    y={index % 2 === 0 ? 62 : 177}
                  >
                    {index + 1}
                  </text>
                </g>
              );
            })}
            <text fill="#c4b5fd" fontSize="13" x="28" y="34">
              固定输入 → 记录中间状态 → 核对输出与成本
            </text>
            <text
              fill="#e2e8f0"
              fontSize="13"
              textAnchor="middle"
              x="330"
              y="218"
            >
              {stages[activeStage]}
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
        <p className="mt-3 break-words text-xs text-slate-500">
          当前检查点：{stages[activeStage]}
          。每次只推进一个阶段，保留前一阶段的输入、 状态摘要与成本计数。
        </p>
      </div>
    </section>
  );
}

function EvidenceLab({ model }: { model: AlgorithmEngineeringModel }) {
  const [faultInjected, setFaultInjected] = useState(false);
  const [run, setRun] = useState(1);
  const events = useMemo(
    () => [
      {
        phase: "baseline",
        value: `run=${run} · 输入、参数与随机种子已冻结`,
        pass: true,
      },
      {
        phase: "mechanism",
        value: faultInjected ? model.fault : model.invariant,
        pass: !faultInjected,
      },
      {
        phase: "oracle",
        value: faultInjected ? "首个差异已标红，拒绝最终结果" : model.evidence,
        pass: !faultInjected,
      },
      {
        phase: "replay",
        value: faultInjected ? "等待撤销故障" : "同一输入重放一致",
        pass: !faultInjected,
      },
    ],
    [faultInjected, model.evidence, model.fault, model.invariant, run],
  );

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30"
      data-visual-kind={`algorithm-evidence-${model.title}`}
    >
      <div className="border-b border-emerald-200 px-4 py-3 dark:border-emerald-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-300">
          Falsification and replay
        </p>
        <h3 className="mt-1 font-semibold">基线、故障、恢复证据链</h3>
      </div>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.62fr_1.38fr]">
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
          <p className="break-words text-xs text-slate-500">
            必存证据：{model.evidence}
          </p>
        </div>

        <div className="min-w-0 space-y-2">
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

export function OfficialAlgorithmEngineeringLab({ mode, model }: Props) {
  if (mode === "cost") return <CostLab model={model} />;
  if (mode === "trace") return <TraceLab model={model} />;
  return <EvidenceLab model={model} />;
}
