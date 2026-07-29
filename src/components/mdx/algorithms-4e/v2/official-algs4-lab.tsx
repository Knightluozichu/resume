"use client";

import { useMemo, useState } from "react";

export type Algs4SectionModel = {
  unitId: string;
  title: string;
  focus: string;
  formula: string;
  invariant: string;
  fault: string;
  evidence: string;
  concepts: readonly string[];
  trace: readonly string[];
  scenarios: readonly [
    {
      label: string;
      input: string;
      expected: string;
    },
    {
      label: string;
      input: string;
      expected: string;
    },
  ];
};

type Props = {
  model: Algs4SectionModel;
  view: "model" | "trace" | "counterexample";
};

function ConceptModel({ model }: { model: Algs4SectionModel }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [conceptIndex, setConceptIndex] = useState(0);
  const scenario = model.scenarios[scenarioIndex];
  const concepts = model.concepts.slice(0, 6);
  const activeConcept = concepts[conceptIndex] ?? concepts[0];

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-sky-200 bg-sky-50 shadow-sm dark:border-sky-900 dark:bg-sky-950/30"
      data-visual-kind={`algs4-concept-model-${model.unitId}`}
    >
      <header className="border-b border-sky-200 px-4 py-3 dark:border-sky-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-sky-700 uppercase dark:text-sky-300">
          Section model
        </p>
        <h3 className="mt-1 font-semibold">
          {model.title}：对象、操作与不变量
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {model.focus}
        </p>
      </header>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-500">选择最小情境</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {model.scenarios.map((item, index) => (
              <button
                className={`min-h-11 min-w-0 rounded-lg border px-3 py-2 text-sm ${
                  index === scenarioIndex
                    ? "border-sky-700 bg-sky-700 text-white"
                    : "border-sky-200 bg-white dark:border-sky-800 dark:bg-slate-950"
                }`}
                key={item.label}
                onClick={() => setScenarioIndex(index)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <p className="mt-4 text-xs font-semibold text-slate-500">
            切换正式概念
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {concepts.map((concept, index) => (
              <button
                className={`min-h-11 min-w-0 rounded-lg border px-2 py-2 text-xs ${
                  index === conceptIndex
                    ? "border-sky-700 bg-white font-semibold text-sky-800 dark:bg-slate-950 dark:text-sky-200"
                    : "border-sky-200 bg-white text-slate-600 dark:border-sky-800 dark:bg-slate-950 dark:text-slate-300"
                }`}
                key={concept}
                onClick={() => setConceptIndex(index)}
                type="button"
              >
                <span className="block break-words">{concept}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-0 rounded-xl bg-slate-950 p-4 text-slate-100">
          <svg
            aria-label={`${model.title} 的输入、操作与证书关系图`}
            className="h-auto w-full"
            viewBox="0 0 640 230"
          >
            <rect
              fill="#0f172a"
              height="206"
              rx="16"
              width="616"
              x="12"
              y="12"
            />
            <path
              d="M145 115 H300 M340 115 H495"
              fill="none"
              markerEnd="url(#algs4-arrow)"
              stroke="#38bdf8"
              strokeWidth="5"
            />
            <defs>
              <marker
                id="algs4-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M0 0 L8 4 L0 8 Z" fill="#38bdf8" />
              </marker>
            </defs>
            {[
              { x: 35, width: 110, label: "输入合同" },
              { x: 300, width: 40, label: "操作" },
              { x: 495, width: 110, label: "证书" },
            ].map((node) => (
              <g key={node.label}>
                <rect
                  fill={node.label === "操作" ? "#0369a1" : "#1e293b"}
                  height="72"
                  rx="12"
                  stroke="#7dd3fc"
                  strokeWidth="2"
                  width={node.width}
                  x={node.x}
                  y="79"
                />
                <text
                  fill="#e0f2fe"
                  fontSize="13"
                  fontWeight="700"
                  textAnchor="middle"
                  x={node.x + node.width / 2}
                  y="119"
                >
                  {node.label}
                </text>
              </g>
            ))}
            <text fill="#7dd3fc" fontSize="13" x="28" y="42">
              {model.unitId} · 先给前提，再执行，再验收
            </text>
            <text
              fill="#e2e8f0"
              fontSize="13"
              textAnchor="middle"
              x="320"
              y="191"
            >
              当前概念：{conceptIndex + 1}/{concepts.length}
            </text>
          </svg>

          <dl className="mt-3 grid gap-2 text-xs">
            <div className="rounded-lg border border-slate-700 p-3">
              <dt className="font-semibold text-sky-300">{scenario.label}</dt>
              <dd className="mt-1 break-words text-slate-300">
                {scenario.input}
              </dd>
            </div>
            <div className="rounded-lg border border-slate-700 p-3">
              <dt className="font-semibold text-sky-300">当前观察</dt>
              <dd className="mt-1 break-words text-slate-300">
                {activeConcept}：{scenario.expected}
              </dd>
            </div>
          </dl>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-slate-700 p-3 text-xs leading-6 text-sky-300">
            {model.formula}
          </pre>
        </div>
      </div>
    </section>
  );
}

function ExecutionTrace({ model }: { model: Algs4SectionModel }) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = model.trace.slice(0, 6);
  const progress = steps.length > 1 ? activeStep / (steps.length - 1) : 1;

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-violet-200 bg-violet-50 shadow-sm dark:border-violet-900 dark:bg-violet-950/30"
      data-visual-kind={`algs4-execution-trace-${model.unitId}`}
    >
      <header className="border-b border-violet-200 px-4 py-3 dark:border-violet-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-violet-700 uppercase dark:text-violet-300">
          Executable trace
        </p>
        <h3 className="mt-1 font-semibold">{model.title}：逐步执行轨迹</h3>
      </header>

      <div className="min-w-0 p-4 sm:p-5">
        <div className="min-w-0 overflow-hidden rounded-xl bg-slate-950 p-3">
          <svg
            aria-label={`${model.title} 的逐步状态轨迹`}
            className="h-auto w-full"
            viewBox="0 0 660 224"
          >
            <rect
              fill="#0f172a"
              height="200"
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
              y1="104"
              y2="104"
            />
            <line
              stroke="#8b5cf6"
              strokeLinecap="round"
              strokeWidth="8"
              x1="72"
              x2={72 + 516 * progress}
              y1="104"
              y2="104"
            />
            {steps.map((step, index) => {
              const x =
                steps.length === 1
                  ? 330
                  : 72 + (516 * index) / (steps.length - 1);
              const reached = index <= activeStep;
              return (
                <g key={step}>
                  <circle
                    cx={x}
                    cy="104"
                    fill={reached ? "#7c3aed" : "#1e293b"}
                    r={index === activeStep ? 22 : 16}
                    stroke={reached ? "#ddd6fe" : "#64748b"}
                    strokeWidth="3"
                  />
                  <text
                    fill={reached ? "#f5f3ff" : "#94a3b8"}
                    fontSize="13"
                    fontWeight="700"
                    textAnchor="middle"
                    x={x}
                    y={index % 2 === 0 ? 57 : 161}
                  >
                    {index + 1}
                  </text>
                </g>
              );
            })}
            <text fill="#c4b5fd" fontSize="13" x="28" y="36">
              每次只推进一个状态，禁止跳过中间证据
            </text>
            <text
              fill="#e2e8f0"
              fontSize="13"
              textAnchor="middle"
              x="330"
              y="204"
            >
              {steps[activeStep]}
            </text>
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {steps.map((step, index) => (
            <button
              className={`min-h-11 min-w-0 rounded-lg border px-2 py-2 text-xs ${
                index === activeStep
                  ? "border-violet-700 bg-violet-700 text-white"
                  : "border-violet-200 bg-white dark:border-violet-800 dark:bg-slate-950"
              }`}
              key={step}
              onClick={() => setActiveStep(index)}
              type="button"
            >
              <span className="block break-words">{step}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 break-words text-xs text-slate-600 dark:text-slate-300">
          当前必须保存：{model.evidence}。完成本步后再检查“不变量：
          {model.invariant}”。
        </p>
      </div>
    </section>
  );
}

function CounterexampleLab({ model }: { model: Algs4SectionModel }) {
  const [faultInjected, setFaultInjected] = useState(false);
  const [replay, setReplay] = useState(1);
  const events = useMemo(
    () => [
      {
        phase: "输入",
        detail: `replay=${replay}；输入、实现版本与随机种子保持不变`,
        pass: true,
      },
      {
        phase: "机制",
        detail: faultInjected ? model.fault : model.invariant,
        pass: !faultInjected,
      },
      {
        phase: "证书",
        detail: faultInjected
          ? `拒绝结果：先从“${model.evidence}”定位首个分叉`
          : model.evidence,
        pass: !faultInjected,
      },
      {
        phase: "结论",
        detail: faultInjected ? "故障尚未撤销，不能发布结论" : "同输入重放一致",
        pass: !faultInjected,
      },
    ],
    [faultInjected, model.evidence, model.fault, model.invariant, replay],
  );

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30"
      data-visual-kind={`algs4-counterexample-${model.unitId}`}
    >
      <header className="border-b border-emerald-200 px-4 py-3 dark:border-emerald-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-300">
          Counterexample and replay
        </p>
        <h3 className="mt-1 font-semibold">{model.title}：反例与恢复证书</h3>
      </header>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.62fr_1.38fr]">
        <div className="min-w-0 space-y-3">
          <button
            className={`min-h-11 w-full rounded-lg px-3 py-2 text-sm font-semibold text-white ${
              faultInjected ? "bg-rose-700" : "bg-emerald-700"
            }`}
            onClick={() => setFaultInjected((value) => !value)}
            type="button"
          >
            {faultInjected ? "撤销本节反例" : "注入本节反例"}
          </button>
          <button
            className="min-h-11 w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm dark:border-emerald-800 dark:bg-slate-950"
            onClick={() => setReplay((value) => value + 1)}
            type="button"
          >
            用相同输入重放
          </button>
          <p className="break-words text-xs text-slate-600 dark:text-slate-300">
            单变量故障：{model.fault}
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
                {event.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Algs4SectionLab({ model, view }: Props) {
  if (view === "model") return <ConceptModel model={model} />;
  if (view === "trace") return <ExecutionTrace model={model} />;
  return <CounterexampleLab model={model} />;
}
