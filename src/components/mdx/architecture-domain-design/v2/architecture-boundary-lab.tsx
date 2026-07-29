"use client";

import { useState } from "react";

export type ArchitectureCourseModel = {
  unitId: string;
  title: string;
  focus: string;
  invariant: string;
  fault: string;
  evidence: string;
  concepts: readonly string[];
  zones: readonly [
    { label: string; detail: string },
    { label: string; detail: string },
    { label: string; detail: string },
  ];
  trace: readonly string[];
  scenarios: readonly [
    { label: string; input: string; expected: string },
    { label: string; input: string; expected: string },
  ];
};

type Props = {
  model: ArchitectureCourseModel;
  view: "boundary" | "trace" | "violation";
};

function BoundaryMap({ model }: { model: ArchitectureCourseModel }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [conceptIndex, setConceptIndex] = useState(0);
  const scenario = model.scenarios[scenarioIndex];
  const activeConcept = model.concepts[conceptIndex] ?? model.concepts[0];

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-cyan-200 bg-cyan-50 shadow-sm dark:border-cyan-900 dark:bg-cyan-950/30"
      data-visual-kind={`architecture-boundary-map-${model.unitId}`}
    >
      <header className="border-b border-cyan-200 px-4 py-3 dark:border-cyan-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-cyan-700 uppercase dark:text-cyan-300">
          Boundary model
        </p>
        <h3 className="mt-1 font-semibold">{model.title}：边界与责任地图</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {model.focus}
        </p>
      </header>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="min-w-0 space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">切换最小情境</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {model.scenarios.map((item, index) => (
                <button
                  className={`min-h-11 min-w-0 rounded-lg border px-3 py-2 text-sm ${
                    index === scenarioIndex
                      ? "border-cyan-700 bg-cyan-700 text-white"
                      : "border-cyan-200 bg-white dark:border-cyan-800 dark:bg-slate-950"
                  }`}
                  key={item.label}
                  onClick={() => setScenarioIndex(index)}
                  type="button"
                >
                  <span className="block break-words">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500">定位正式概念</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {model.concepts.map((concept, index) => (
                <button
                  className={`min-h-11 min-w-0 rounded-lg border px-2 py-2 text-xs ${
                    index === conceptIndex
                      ? "border-cyan-700 bg-white font-semibold text-cyan-800 dark:bg-slate-950 dark:text-cyan-200"
                      : "border-cyan-200 bg-white text-slate-600 dark:border-cyan-800 dark:bg-slate-950 dark:text-slate-300"
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
        </div>

        <div className="min-w-0 rounded-xl bg-slate-950 p-4 text-slate-100">
          <p className="text-xs font-semibold tracking-[0.14em] text-cyan-300 uppercase">
            {model.unitId} · 当前观察
          </p>
          <p className="mt-2 break-words text-sm text-slate-200">
            <strong className="text-cyan-300">{activeConcept}</strong>：
            {scenario.input}
          </p>

          <div className="mt-4 grid min-w-0 gap-2 sm:grid-cols-3">
            {model.zones.map((zone, index) => (
              <div className="min-w-0" key={zone.label}>
                <div
                  className={`h-full min-h-32 rounded-xl border p-3 ${
                    index === conceptIndex % model.zones.length
                      ? "border-cyan-300 bg-cyan-950"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  <span className="text-xs text-slate-400">
                    区域 {index + 1}
                  </span>
                  <strong className="mt-2 block break-words text-sm text-cyan-200">
                    {zone.label}
                  </strong>
                  <p className="mt-2 break-words text-xs leading-5 text-slate-300">
                    {zone.detail}
                  </p>
                </div>
                {index < model.zones.length - 1 ? (
                  <p className="my-1 text-center text-lg text-cyan-300 sm:hidden">
                    ↓
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-slate-700 p-3">
            <p className="text-xs font-semibold text-cyan-300">情境验收</p>
            <p className="mt-1 break-words text-xs leading-5 text-slate-300">
              {scenario.expected}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DecisionTrace({ model }: { model: ArchitectureCourseModel }) {
  const [activeStep, setActiveStep] = useState(0);
  const progress =
    model.trace.length > 1 ? activeStep / (model.trace.length - 1) : 1;

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-violet-200 bg-violet-50 shadow-sm dark:border-violet-900 dark:bg-violet-950/30"
      data-visual-kind={`architecture-decision-trace-${model.unitId}`}
    >
      <header className="border-b border-violet-200 px-4 py-3 dark:border-violet-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-violet-700 uppercase dark:text-violet-300">
          Decision trace
        </p>
        <h3 className="mt-1 font-semibold">{model.title}：逐步决策轨迹</h3>
      </header>

      <div className="min-w-0 p-4 sm:p-5">
        <div className="min-w-0 rounded-xl bg-slate-950 p-4">
          <div className="h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-violet-500 transition-[width]"
              style={{ width: `${Math.max(4, progress * 100)}%` }}
            />
          </div>
          <div className="mt-4 grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {model.trace.map((step, index) => (
              <button
                className={`min-h-20 min-w-0 rounded-lg border p-3 text-left ${
                  index === activeStep
                    ? "border-violet-300 bg-violet-900 text-white"
                    : index < activeStep
                      ? "border-emerald-700 bg-emerald-950 text-emerald-100"
                      : "border-slate-700 bg-slate-900 text-slate-300"
                }`}
                key={step}
                onClick={() => setActiveStep(index)}
                type="button"
              >
                <span className="text-xs opacity-70">0{index + 1}</span>
                <strong className="mt-1 block break-words text-xs">
                  {step}
                </strong>
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
            <div className="rounded-lg border border-slate-700 p-3">
              <strong className="text-violet-300">本步必须保持</strong>
              <p className="mt-1 break-words leading-5 text-slate-300">
                {model.invariant}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700 p-3">
              <strong className="text-violet-300">本步留下证据</strong>
              <p className="mt-1 break-words leading-5 text-slate-300">
                {model.evidence}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ViolationReplay({ model }: { model: ArchitectureCourseModel }) {
  const [faultInjected, setFaultInjected] = useState(false);
  const [replay, setReplay] = useState(1);
  const events = [
    {
      phase: "边界输入",
      detail: `第 ${replay} 次重放使用同一个业务情境和同一组职责定义`,
      pass: true,
    },
    {
      phase: "依赖或模型",
      detail: faultInjected ? model.fault : model.invariant,
      pass: !faultInjected,
    },
    {
      phase: "可观察证据",
      detail: faultInjected
        ? `拒绝当前设计：从“${model.evidence}”定位首个越界`
        : model.evidence,
      pass: !faultInjected,
    },
    {
      phase: "发布判断",
      detail: faultInjected
        ? "违规仍存在，不能用最终功能可运行掩盖结构债务"
        : "边界、依赖与业务语言在同输入重放中一致",
      pass: !faultInjected,
    },
  ];

  return (
    <section
      className="my-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30"
      data-visual-kind={`architecture-violation-replay-${model.unitId}`}
    >
      <header className="border-b border-emerald-200 px-4 py-3 dark:border-emerald-900 sm:px-5">
        <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-300">
          Violation and recovery
        </p>
        <h3 className="mt-1 font-semibold">{model.title}：违规注入与恢复</h3>
      </header>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.6fr_1.4fr]">
        <div className="min-w-0 space-y-3">
          <button
            className={`min-h-11 w-full rounded-lg px-3 py-2 text-sm font-semibold text-white ${
              faultInjected ? "bg-rose-700" : "bg-emerald-700"
            }`}
            onClick={() => setFaultInjected((value) => !value)}
            type="button"
          >
            {faultInjected ? "撤销架构违规" : "注入架构违规"}
          </button>
          <button
            className="min-h-11 w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm dark:border-emerald-800 dark:bg-slate-950"
            onClick={() => setReplay((value) => value + 1)}
            type="button"
          >
            用相同业务情境重放
          </button>
          <p className="break-words text-xs leading-5 text-slate-600 dark:text-slate-300">
            单一违规：{model.fault}
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
                  {event.pass ? "通过" : "越界"}
                </span>
              </div>
              <p className="mt-1 break-words text-xs leading-5 text-slate-600 dark:text-slate-300">
                {event.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArchitectureBoundaryLab({ model, view }: Props) {
  if (view === "boundary") return <BoundaryMap model={model} />;
  if (view === "trace") return <DecisionTrace model={model} />;
  return <ViolationReplay model={model} />;
}
