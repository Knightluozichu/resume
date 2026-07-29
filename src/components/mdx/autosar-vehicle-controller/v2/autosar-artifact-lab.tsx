"use client";

import { useState } from "react";

export type AutosarArtifactModel = {
  unitId: string;
  title: string;
  decision: string;
  invariant: string;
  fault: string;
  evidence: string;
  concepts: readonly string[];
  pipeline: readonly [
    { label: string; artifact: string },
    { label: string; artifact: string },
    { label: string; artifact: string },
    { label: string; artifact: string },
    { label: string; artifact: string },
  ];
  scenarios: readonly [
    { label: string; input: string; expected: string },
    { label: string; input: string; expected: string },
  ];
};

type Props = {
  model: AutosarArtifactModel;
  view: "artifact" | "trace" | "fault";
};

function ArtifactChain({ model }: { model: AutosarArtifactModel }) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [conceptIndex, setConceptIndex] = useState(0);
  const scenario = model.scenarios[scenarioIndex];
  const activeStage = conceptIndex % model.pipeline.length;

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30"
      data-visual-kind={`autosar-artifact-chain-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-blue-200 px-4 py-3 dark:border-blue-900 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-[0.16em] text-blue-700 uppercase dark:text-blue-300">
            Contract · artifact · owner
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：工件链</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {model.decision}
          </p>
        </div>
        <button
          aria-label="重置 AUTOSAR 工件链"
          className="min-h-11 rounded-lg border border-blue-300 bg-white px-3 py-2 text-sm dark:border-blue-800 dark:bg-slate-950"
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
            <p className="text-xs font-semibold text-slate-500">选择验证场景</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {model.scenarios.map((item, index) => (
                <button
                  aria-pressed={scenarioIndex === index}
                  className={`min-h-11 rounded-lg border px-2 py-2 text-sm ${
                    scenarioIndex === index
                      ? "border-blue-700 bg-blue-700 text-white"
                      : "border-blue-200 bg-white dark:border-blue-800 dark:bg-slate-950"
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
              定位正式目录节点
            </p>
            <div className="mt-2 max-h-64 space-y-2 overflow-y-auto pr-1">
              {model.concepts.map((concept, index) => (
                <button
                  aria-pressed={conceptIndex === index}
                  className={`min-h-11 w-full rounded-lg border px-3 py-2 text-left text-xs ${
                    conceptIndex === index
                      ? "border-blue-700 bg-white font-semibold text-blue-800 dark:bg-slate-950 dark:text-blue-200"
                      : "border-blue-200 bg-white text-slate-600 dark:border-blue-800 dark:bg-slate-950 dark:text-slate-300"
                  }`}
                  key={concept}
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
          <p className="text-xs font-semibold tracking-[0.14em] text-blue-300 uppercase">
            {model.unitId} · {scenario.label}
          </p>
          <p className="mt-2 break-words text-sm text-slate-200">
            <strong className="text-blue-300">
              {model.concepts[conceptIndex]}
            </strong>
            ：{scenario.input}
          </p>
          <div className="mt-4 grid min-w-0 gap-2 sm:grid-cols-5">
            {model.pipeline.map((stage, index) => (
              <div className="min-w-0" key={stage.label}>
                <div
                  className={`h-full min-h-32 rounded-xl border p-3 ${
                    activeStage === index
                      ? "border-blue-300 bg-blue-950"
                      : "border-slate-700 bg-slate-900"
                  }`}
                >
                  <span className="text-xs text-slate-400">0{index + 1}</span>
                  <strong className="mt-2 block break-words text-xs text-blue-200">
                    {stage.label}
                  </strong>
                  <p className="mt-2 break-words text-xs leading-5 text-slate-300">
                    {stage.artifact}
                  </p>
                </div>
                {index < model.pipeline.length - 1 ? (
                  <p className="my-1 text-center text-blue-300 sm:hidden">↓</p>
                ) : null}
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-lg border border-slate-700 p-3 text-xs leading-5 text-slate-300">
            <strong className="text-blue-300">预期：</strong>
            {scenario.expected}
          </p>
        </div>
      </div>
    </section>
  );
}

function ContractTrace({ model }: { model: AutosarArtifactModel }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30"
      data-visual-kind={`autosar-contract-trace-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-violet-200 px-4 py-3 dark:border-violet-900 sm:px-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-violet-700 uppercase dark:text-violet-300">
            Deterministic transformation
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：逐工件追踪</h3>
        </div>
        <button
          aria-label="重置 AUTOSAR 追踪"
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
            <span className="font-semibold text-violet-300">选择转换阶段</span>
            <span className="text-slate-400">
              {activeStep + 1} / {model.pipeline.length}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {model.pipeline.map((stage, index) => (
              <button
                aria-pressed={activeStep === index}
                className={`min-h-24 rounded-lg border p-3 text-left ${
                  activeStep === index
                    ? "border-violet-300 bg-violet-900"
                    : index < activeStep
                      ? "border-emerald-700 bg-emerald-950"
                      : "border-slate-700 bg-slate-900"
                }`}
                key={stage.label}
                onClick={() => setActiveStep(index)}
                type="button"
              >
                <strong className="block break-words text-xs">
                  {stage.label}
                </strong>
                <span className="mt-2 block break-words text-xs text-slate-300">
                  {stage.artifact}
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
              <strong className="text-violet-300">证据：</strong>
              {model.evidence}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaultReplay({ model }: { model: AutosarArtifactModel }) {
  const [faultInjected, setFaultInjected] = useState(false);
  const [replay, setReplay] = useState(1);
  const events = [
    ["输入冻结", `第 ${replay} 次重放使用同一版次、输入工件与初始状态`, true],
    [
      "首个转换",
      faultInjected ? model.fault : model.pipeline[0].artifact,
      !faultInjected,
    ],
    [
      "一致性门禁",
      faultInjected ? `拒绝：${model.fault}` : model.invariant,
      !faultInjected,
    ],
    [
      "恢复证据",
      faultInjected ? "仍有故障，不能生成、下载或声称安全结论" : model.evidence,
      !faultInjected,
    ],
  ] as const;

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
      data-visual-kind={`autosar-fault-replay-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-200 px-4 py-3 dark:border-emerald-900 sm:px-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-300">
            Single fault · rollback
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：故障与回退</h3>
        </div>
        <button
          aria-label="重置 AUTOSAR 故障实验"
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
            {faultInjected ? "撤销单一故障" : "注入单一故障"}
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
          {events.map(([phase, detail, basePass], index) => {
            const pass = basePass || (index === 0 && faultInjected);
            return (
              <div
                className={`rounded-lg border p-3 ${
                  pass
                    ? "border-emerald-300 bg-white dark:border-emerald-800 dark:bg-slate-950"
                    : "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40"
                }`}
                key={phase}
              >
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-sm">
                    {index + 1}. {phase}
                  </strong>
                  <span className="text-xs">{pass ? "一致" : "拒绝"}</span>
                </div>
                <p className="mt-1 break-words text-xs leading-5 text-slate-600 dark:text-slate-300">
                  {detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AutosarArtifactLab({ model, view }: Props) {
  if (view === "artifact") return <ArtifactChain model={model} />;
  if (view === "trace") return <ContractTrace model={model} />;
  return <FaultReplay model={model} />;
}
