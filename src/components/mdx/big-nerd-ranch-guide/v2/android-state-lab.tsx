"use client";

import { useState } from "react";

export type AndroidStateModel = {
  unitId: string;
  title: string;
  task: string;
  owner: string;
  state: string;
  event: string;
  invariant: string;
  fault: string;
  evidence: string;
  concepts: readonly string[];
  transitions: readonly [
    { action: string; state: string; evidence: string },
    { action: string; state: string; evidence: string },
    { action: string; state: string; evidence: string },
    { action: string; state: string; evidence: string },
    { action: string; state: string; evidence: string },
  ];
  scenarios: readonly [
    { label: string; input: string; expected: string },
    { label: string; input: string; expected: string },
  ];
};

type Props = {
  model: AndroidStateModel;
  view: "contract" | "lifecycle" | "fault";
};

function ContractLab({ model }: { model: AndroidStateModel }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [conceptIndex, setConceptIndex] = useState(0);
  const scenario = model.scenarios[scenarioIndex];
  const transition = model.transitions[conceptIndex % model.transitions.length];

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-cyan-200 bg-cyan-50 dark:border-cyan-900 dark:bg-cyan-950/30"
      data-visual-kind={`android-contract-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-cyan-200 px-4 py-3 dark:border-cyan-900 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-[0.16em] text-cyan-700 uppercase dark:text-cyan-300">
            Owner · state · observable result
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：状态合同</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {model.task}
          </p>
        </div>
        <button
          aria-label="重置 Android 状态合同"
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
              第四版正式目录节点
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
              <span className="text-xs text-slate-400">受控状态</span>
              <strong className="mt-2 block break-words text-sm text-cyan-200">
                {model.state}
              </strong>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
              <span className="text-xs text-slate-400">触发事件</span>
              <strong className="mt-2 block break-words text-sm text-cyan-200">
                {model.event}
              </strong>
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-cyan-800 bg-cyan-950/60 p-3">
            <p className="text-xs text-cyan-300">{transition.action}</p>
            <p className="mt-1 break-words text-sm">{transition.state}</p>
            <p className="mt-2 break-words text-xs text-slate-300">
              观察：{transition.evidence}
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

function LifecycleLab({ model }: { model: AndroidStateModel }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30"
      data-visual-kind={`android-lifecycle-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-violet-200 px-4 py-3 dark:border-violet-900 sm:px-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-violet-700 uppercase dark:text-violet-300">
            Deterministic event replay
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：事件轨迹</h3>
        </div>
        <button
          aria-label="重置 Android 事件轨迹"
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
              选择一次状态转换
            </span>
            <span className="text-slate-400">
              {activeStep + 1} / {model.transitions.length}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {model.transitions.map((transition, index) => (
              <button
                aria-pressed={activeStep === index}
                className={`min-h-32 rounded-lg border p-3 text-left ${
                  activeStep === index
                    ? "border-violet-300 bg-violet-900"
                    : index < activeStep
                      ? "border-emerald-700 bg-emerald-950"
                      : "border-slate-700 bg-slate-900"
                }`}
                key={transition.action}
                onClick={() => setActiveStep(index)}
                type="button"
              >
                <strong className="block break-words text-xs">
                  {index + 1}. {transition.action}
                </strong>
                <span className="mt-2 block break-words text-xs text-slate-300">
                  {transition.state}
                </span>
                <span className="mt-2 block break-words text-xs text-violet-300">
                  {transition.evidence}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
            <p className="rounded-lg border border-slate-700 p-3 leading-5 text-slate-300">
              <strong className="text-violet-300">不变量：</strong>
              {model.invariant}
            </p>
            <p className="rounded-lg border border-slate-700 p-3 leading-5 text-slate-300">
              <strong className="text-violet-300">交付证据：</strong>
              {model.evidence}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaultLab({ model }: { model: AndroidStateModel }) {
  const [faultInjected, setFaultInjected] = useState(false);
  const [replay, setReplay] = useState(1);
  const events = [
    {
      phase: "冻结输入",
      detail: `第 ${replay} 次使用相同 SDK、设备配置、初始状态与用户事件`,
      pass: true,
    },
    {
      phase: "注入边界",
      detail: faultInjected ? model.fault : model.scenarios[1].input,
      pass: !faultInjected,
    },
    {
      phase: "检查所有者",
      detail: faultInjected
        ? `拒绝旧所有者或错误状态继续提交：${model.owner}`
        : model.invariant,
      pass: !faultInjected,
    },
    {
      phase: "核对结果",
      detail: faultInjected
        ? "保留首个分岔，未恢复前不声称通过"
        : model.evidence,
      pass: !faultInjected,
    },
  ];

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
      data-visual-kind={`android-fault-replay-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-200 px-4 py-3 dark:border-emerald-900 sm:px-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-300">
            Fault · cancel · restore
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：反例与恢复</h3>
        </div>
        <button
          aria-label="重置 Android 故障实验"
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

export function AndroidStateLab({ model, view }: Props) {
  if (view === "contract") return <ContractLab model={model} />;
  if (view === "lifecycle") return <LifecycleLab model={model} />;
  return <FaultLab model={model} />;
}
