"use client";

import { useState } from "react";

export type VehicleSystemModel = {
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
  model: VehicleSystemModel;
  view: "system" | "trace" | "fault";
};

function SystemSlice({ model }: { model: VehicleSystemModel }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [conceptIndex, setConceptIndex] = useState(0);
  const scenario = model.scenarios[scenarioIndex];
  const concept = model.concepts[conceptIndex] ?? model.concepts[0];

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/30"
      data-visual-kind={`vehicle-system-slice-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-sky-200 px-4 py-3 dark:border-sky-900 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-[0.16em] text-sky-700 uppercase dark:text-sky-300">
            Energy · signal · mechanics
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：系统切片</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {model.focus}
          </p>
        </div>
        <button
          aria-label="重置系统切片"
          className="min-h-11 rounded-lg border border-sky-300 bg-white px-3 py-2 text-sm dark:border-sky-800 dark:bg-slate-950"
          onClick={() => {
            setScenarioIndex(0);
            setConceptIndex(0);
          }}
          type="button"
        >
          重置实验
        </button>
      </header>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="min-w-0 space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">选择工况</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {model.scenarios.map((item, index) => (
                <button
                  aria-pressed={index === scenarioIndex}
                  className={`min-h-11 min-w-0 rounded-lg border px-3 py-2 text-sm ${
                    index === scenarioIndex
                      ? "border-sky-700 bg-sky-700 text-white"
                      : "border-sky-200 bg-white dark:border-sky-800 dark:bg-slate-950"
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
              {model.concepts.map((item, index) => (
                <button
                  aria-pressed={index === conceptIndex}
                  className={`min-h-11 min-w-0 rounded-lg border px-2 py-2 text-xs ${
                    index === conceptIndex
                      ? "border-sky-700 bg-white font-semibold text-sky-800 dark:bg-slate-950 dark:text-sky-200"
                      : "border-sky-200 bg-white text-slate-600 dark:border-sky-800 dark:bg-slate-950 dark:text-slate-300"
                  }`}
                  key={item}
                  onClick={() => setConceptIndex(index)}
                  type="button"
                >
                  <span className="block break-words">{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-xl bg-slate-950 p-4 text-slate-100">
          <p className="text-xs font-semibold tracking-[0.14em] text-sky-300 uppercase">
            {model.unitId} · 当前工况
          </p>
          <p className="mt-2 break-words text-sm text-slate-200">
            <strong className="text-sky-300">{concept}</strong>：
            {scenario.input}
          </p>

          <div className="mt-4 grid min-w-0 gap-2 sm:grid-cols-3">
            {model.zones.map((zone, index) => (
              <div className="min-w-0" key={zone.label}>
                <div
                  className={`h-full min-h-32 rounded-xl border p-3 ${
                    index === conceptIndex % model.zones.length
                      ? "border-sky-300 bg-sky-950"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  <span className="text-xs text-slate-400">
                    边界 {index + 1}
                  </span>
                  <strong className="mt-2 block break-words text-sm text-sky-200">
                    {zone.label}
                  </strong>
                  <p className="mt-2 break-words text-xs leading-5 text-slate-300">
                    {zone.detail}
                  </p>
                </div>
                {index < model.zones.length - 1 ? (
                  <p className="my-1 text-center text-lg text-sky-300 sm:hidden">
                    ↓
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-slate-700 p-3">
            <p className="text-xs font-semibold text-sky-300">工况验收</p>
            <p className="mt-1 break-words text-xs leading-5 text-slate-300">
              {scenario.expected}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ControlTrace({ model }: { model: VehicleSystemModel }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30"
      data-visual-kind={`vehicle-control-trace-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-violet-200 px-4 py-3 dark:border-violet-900 sm:px-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-violet-700 uppercase dark:text-violet-300">
            State trace
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：状态与控制轨迹</h3>
        </div>
        <button
          aria-label="重置状态轨迹"
          className="min-h-11 rounded-lg border border-violet-300 bg-white px-3 py-2 text-sm dark:border-violet-800 dark:bg-slate-950"
          onClick={() => setActiveStep(0)}
          type="button"
        >
          重置实验
        </button>
      </header>

      <div className="min-w-0 p-4 sm:p-5">
        <div className="min-w-0 rounded-xl bg-slate-950 p-4 text-slate-100">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-violet-300">逐步执行</span>
            <span className="text-slate-400">
              当前 {activeStep + 1} / {model.trace.length}
            </span>
          </div>
          <div className="mt-4 grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {model.trace.map((step, index) => (
              <button
                aria-pressed={index === activeStep}
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
              <strong className="text-violet-300">始终保持</strong>
              <p className="mt-1 break-words leading-5 text-slate-300">
                {model.invariant}
              </p>
            </div>
            <div className="rounded-lg border border-slate-700 p-3">
              <strong className="text-violet-300">本步证据</strong>
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

function FaultReplay({ model }: { model: VehicleSystemModel }) {
  const [faultInjected, setFaultInjected] = useState(false);
  const [replay, setReplay] = useState(1);
  const events = [
    {
      phase: "固定输入",
      detail: `第 ${replay} 次重放沿用相同工况、初始状态与边界条件`,
      pass: true,
    },
    {
      phase: "系统状态",
      detail: faultInjected ? model.fault : model.invariant,
      pass: !faultInjected,
    },
    {
      phase: "诊断证据",
      detail: faultInjected
        ? `拒绝当前结果：从“${model.evidence}”定位第一个不一致`
        : model.evidence,
      pass: !faultInjected,
    },
    {
      phase: "恢复判断",
      detail: faultInjected
        ? "故障仍在，不能用最终输出看似正常代替边界恢复"
        : "同输入重放后，能量、信号、机械状态与诊断证据重新一致",
      pass: !faultInjected,
    },
  ];

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
      data-visual-kind={`vehicle-fault-replay-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-200 px-4 py-3 dark:border-emerald-900 sm:px-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-300">
            Fault injection · recovery
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：故障注入与恢复</h3>
        </div>
        <button
          aria-label="重置故障重放"
          className="min-h-11 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm dark:border-emerald-800 dark:bg-slate-950"
          onClick={() => {
            setFaultInjected(false);
            setReplay(1);
          }}
          type="button"
        >
          重置实验
        </button>
      </header>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.6fr_1.4fr]">
        <div className="min-w-0 space-y-3">
          <button
            aria-pressed={faultInjected}
            className={`min-h-11 w-full rounded-lg px-3 py-2 text-sm font-semibold text-white ${
              faultInjected ? "bg-rose-700" : "bg-emerald-700"
            }`}
            onClick={() => setFaultInjected((value) => !value)}
            type="button"
          >
            {faultInjected ? "撤销单一故障" : "注入单一故障"}
          </button>
          <button
            className="min-h-11 w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm dark:border-emerald-800 dark:bg-slate-950"
            onClick={() => setReplay((value) => value + 1)}
            type="button"
          >
            用相同工况重放
          </button>
          <p className="break-words text-xs leading-5 text-slate-600 dark:text-slate-300">
            单一故障：{model.fault}
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
                  {event.pass ? "一致" : "故障"}
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

export function VehicleSystemLab({ model, view }: Props) {
  if (view === "system") return <SystemSlice model={model} />;
  if (view === "trace") return <ControlTrace model={model} />;
  return <FaultReplay model={model} />;
}
