"use client";

import { useState } from "react";

export type OpenGlStateModel = {
  unitId: string;
  title: string;
  task: string;
  owner: string;
  state: string;
  event: string;
  invariant: string;
  fault: string;
  proof: string;
  concepts: readonly string[];
  stages: readonly [
    { action: string; resource: string; result: string; observation: string },
    { action: string; resource: string; result: string; observation: string },
    { action: string; resource: string; result: string; observation: string },
    { action: string; resource: string; result: string; observation: string },
    { action: string; resource: string; result: string; observation: string },
  ];
  scenarios: readonly [
    { label: string; input: string; expected: string },
    { label: string; input: string; expected: string },
  ];
};

type Props = {
  model: OpenGlStateModel;
  view: "contract" | "trace" | "fault";
};

function ContractLab({ model }: { model: OpenGlStateModel }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [conceptIndex, setConceptIndex] = useState(0);
  const scenario = model.scenarios[scenarioIndex];
  const stage = model.stages[conceptIndex % model.stages.length];

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-cyan-200 bg-cyan-50 dark:border-cyan-900 dark:bg-cyan-950/30"
      data-visual-kind={`opengl-contract-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-cyan-200 px-4 py-3 dark:border-cyan-900 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-[0.16em] text-cyan-700 uppercase dark:text-cyan-300">
            Context · resource · observable result
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：状态合同</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {model.task}
          </p>
        </div>
        <button
          aria-label="重置 OpenGL 状态合同"
          className="min-h-11 rounded-lg border border-cyan-300 bg-white px-3 py-2 text-sm dark:border-cyan-800 dark:bg-slate-950"
          onClick={() => {
            setScenarioIndex(0);
            setConceptIndex(0);
          }}
          type="button"
        >
          重置实验
        </button>
      </header>

      <div className="grid min-w-0 gap-4 p-4 sm:p-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="min-w-0 space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">验证场景</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {model.scenarios.map((item, index) => (
                <button
                  aria-pressed={scenarioIndex === index}
                  className={`min-h-11 rounded-lg border px-2 py-2 text-sm ${
                    scenarioIndex === index
                      ? "border-cyan-700 bg-cyan-700 text-white"
                      : "border-cyan-200 bg-white dark:border-cyan-800 dark:bg-slate-950"
                  }`}
                  key={item.label}
                  onClick={() => setScenarioIndex(index)}
                  type="button"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">
              官方教程正式概念
            </p>
            <div className="mt-2 max-h-64 space-y-2 overflow-y-auto pr-1">
              {model.concepts.map((concept, index) => (
                <button
                  aria-pressed={conceptIndex === index}
                  className={`min-h-11 w-full rounded-lg border px-3 py-2 text-left text-xs ${
                    conceptIndex === index
                      ? "border-cyan-700 bg-white font-semibold text-cyan-800 dark:bg-slate-950 dark:text-cyan-200"
                      : "border-cyan-200 bg-white text-slate-600 dark:border-cyan-800 dark:bg-slate-950 dark:text-slate-300"
                  }`}
                  key={`${concept}-${index}`}
                  onClick={() => setConceptIndex(index)}
                  type="button"
                >
                  {concept}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-xl bg-slate-950 p-4 text-slate-100">
          <p className="text-xs font-semibold tracking-[0.14em] text-cyan-300 uppercase">
            {model.unitId} · {scenario.label}
          </p>
          <p className="mt-2 break-words text-sm text-slate-200">
            <strong className="text-cyan-300">
              {model.concepts[conceptIndex]}
            </strong>
            ：{scenario.input}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
              <span className="text-xs text-slate-400">状态所有者</span>
              <strong className="mt-2 block break-words text-sm text-cyan-200">
                {model.owner}
              </strong>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
              <span className="text-xs text-slate-400">受控状态/资源</span>
              <strong className="mt-2 block break-words text-sm text-cyan-200">
                {model.state}
              </strong>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
              <span className="text-xs text-slate-400">触发命令</span>
              <strong className="mt-2 block break-words text-sm text-cyan-200">
                {model.event}
              </strong>
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-cyan-800 bg-cyan-950/60 p-3">
            <p className="text-xs text-cyan-300">{stage.action}</p>
            <p className="mt-1 break-words text-sm">{stage.resource}</p>
            <p className="mt-2 break-words text-xs text-slate-300">
              结果：{stage.result}
            </p>
            <p className="mt-1 break-words text-xs text-slate-400">
              观测：{stage.observation}
            </p>
          </div>
          <p className="mt-3 break-words text-xs leading-5 text-slate-300">
            <strong className="text-cyan-300">预期：</strong>
            {scenario.expected}
          </p>
        </div>
      </div>
    </section>
  );
}

function TraceLab({ model }: { model: OpenGlStateModel }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30"
      data-visual-kind={`opengl-trace-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-violet-200 px-4 py-3 dark:border-violet-900 sm:px-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-violet-700 uppercase dark:text-violet-300">
            CPU command · GL state · GPU result
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：五段轨迹</h3>
        </div>
        <button
          aria-label="重置 OpenGL 五段轨迹"
          className="min-h-11 rounded-lg border border-violet-300 bg-white px-3 py-2 text-sm dark:border-violet-800 dark:bg-slate-950"
          onClick={() => setActiveStep(0)}
          type="button"
        >
          重置实验
        </button>
      </header>
      <div className="p-4 sm:p-5">
        <div className="rounded-xl bg-slate-950 p-4 text-slate-100">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-violet-300">
              选择一段命令—资源—结果
            </span>
            <span className="text-slate-400">
              {activeStep + 1} / {model.stages.length}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {model.stages.map((stage, index) => (
              <button
                aria-pressed={activeStep === index}
                className={`min-h-36 rounded-lg border p-3 text-left ${
                  activeStep === index
                    ? "border-violet-300 bg-violet-900"
                    : index < activeStep
                      ? "border-emerald-700 bg-emerald-950"
                      : "border-slate-700 bg-slate-900"
                }`}
                key={`${stage.action}-${index}`}
                onClick={() => setActiveStep(index)}
                type="button"
              >
                <strong className="block break-words text-xs">
                  {index + 1}. {stage.action}
                </strong>
                <span className="mt-2 block break-words text-xs text-slate-300">
                  {stage.resource}
                </span>
                <span className="mt-2 block break-words text-xs text-violet-300">
                  {stage.result}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
            <p className="rounded-lg border border-slate-700 p-3 leading-5 text-slate-300">
              <strong className="text-violet-300">当前观测：</strong>
              {model.stages[activeStep].observation}
            </p>
            <p className="rounded-lg border border-slate-700 p-3 leading-5 text-slate-300">
              <strong className="text-violet-300">不变量：</strong>
              {model.invariant}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaultLab({ model }: { model: OpenGlStateModel }) {
  const [faultInjected, setFaultInjected] = useState(false);
  const [replay, setReplay] = useState(1);
  const events = [
    {
      phase: "冻结输入",
      detail: `第 ${replay} 次沿用同一 context、资源、uniform 与 draw 输入`,
      pass: true,
    },
    {
      phase: "注入单故障",
      detail: faultInjected ? model.fault : model.scenarios[1].input,
      pass: !faultInjected,
    },
    {
      phase: "定位首差",
      detail: faultInjected
        ? `在 ${model.owner} 管理的 ${model.state} 处拒绝错误状态继续传播`
        : model.invariant,
      pass: !faultInjected,
    },
    {
      phase: "清理并重放",
      detail: faultInjected
        ? "保留首个 GL 错误、帧缓冲或像素差异；撤销故障前不声称通过"
        : model.proof,
      pass: !faultInjected,
    },
  ];

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
      data-visual-kind={`opengl-fault-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-200 px-4 py-3 dark:border-emerald-900 sm:px-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-300">
            Single fault · first divergence · replay
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：反例与恢复</h3>
        </div>
        <button
          aria-label="重置 OpenGL 故障实验"
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
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[0.6fr_1.4fr]">
        <div className="space-y-3">
          <button
            aria-pressed={faultInjected}
            className={`min-h-11 w-full rounded-lg px-3 py-2 text-sm font-semibold text-white ${
              faultInjected ? "bg-rose-700" : "bg-emerald-700"
            }`}
            onClick={() => setFaultInjected((value) => !value)}
            type="button"
          >
            {faultInjected ? "撤销章专属故障" : "注入章专属故障"}
          </button>
          <button
            className="min-h-11 w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm dark:border-emerald-800 dark:bg-slate-950"
            onClick={() => setReplay((value) => value + 1)}
            type="button"
          >
            同输入重放
          </button>
          <p className="break-words text-xs leading-5 text-slate-600 dark:text-slate-300">
            故障：{model.fault}
          </p>
        </div>
        <div className="space-y-2">
          {events.map((event, index) => (
            <div
              className={`rounded-lg border p-3 ${
                event.pass
                  ? "border-emerald-300 bg-white dark:border-emerald-800 dark:bg-slate-950"
                  : "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40"
              }`}
              key={event.phase}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm">
                  {index + 1}. {event.phase}
                </strong>
                <span className="text-xs">{event.pass ? "一致" : "拒绝"}</span>
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

export function OpenGlStateLab({ model, view }: Props) {
  if (view === "contract") return <ContractLab model={model} />;
  if (view === "trace") return <TraceLab model={model} />;
  return <FaultLab model={model} />;
}
