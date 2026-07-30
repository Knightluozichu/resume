"use client";

import { useState } from "react";

export type LinearProofModel = {
  unitId: string;
  title: string;
  question: string;
  theorem: string;
  assumptions: readonly string[];
  concepts: readonly string[];
  normalExample: string;
  boundaryExample: string;
  invariant: string;
  proofArtifact: string;
  proofSteps: readonly [
    { label: string; claim: string; reason: string },
    { label: string; claim: string; reason: string },
    { label: string; claim: string; reason: string },
    { label: string; claim: string; reason: string },
    { label: string; claim: string; reason: string },
  ];
};

type Props = {
  model: LinearProofModel;
  view: "assumptions" | "proof" | "counterexample";
};

function AssumptionLab({ model }: { model: LinearProofModel }) {
  const [assumptionIndex, setAssumptionIndex] = useState(0);
  const [exampleMode, setExampleMode] = useState<"normal" | "boundary">(
    "normal",
  );
  const selected = model.assumptions[assumptionIndex];

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-cyan-200 bg-cyan-50 dark:border-cyan-900 dark:bg-cyan-950/30"
      data-visual-kind={`linear-assumptions-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-cyan-200 px-4 py-3 dark:border-cyan-900 sm:px-5">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-[0.16em] text-cyan-700 uppercase dark:text-cyan-300">
            Quantifier · space · hypothesis
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：假设检查台</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {model.question}
          </p>
        </div>
        <button
          aria-label="重置线性代数假设实验"
          className="min-h-11 rounded-lg border border-cyan-300 bg-white px-3 py-2 text-sm dark:border-cyan-800 dark:bg-slate-950"
          onClick={() => {
            setAssumptionIndex(0);
            setExampleMode("normal");
          }}
          type="button"
        >
          重置实验
        </button>
      </header>
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-slate-500">
              选择一条不可省略的假设
            </p>
            <div className="mt-2 space-y-2">
              {model.assumptions.map((assumption, index) => (
                <button
                  aria-pressed={assumptionIndex === index}
                  className={`min-h-11 w-full rounded-lg border px-3 py-2 text-left text-xs ${
                    assumptionIndex === index
                      ? "border-cyan-700 bg-cyan-700 text-white"
                      : "border-cyan-200 bg-white dark:border-cyan-800 dark:bg-slate-950"
                  }`}
                  key={assumption}
                  onClick={() => setAssumptionIndex(index)}
                  type="button"
                >
                  {assumption}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {(["normal", "boundary"] as const).map((mode) => (
              <button
                aria-pressed={exampleMode === mode}
                className={`min-h-11 rounded-lg border px-3 py-2 text-sm ${
                  exampleMode === mode
                    ? "border-cyan-700 bg-white font-semibold text-cyan-800 dark:bg-slate-950 dark:text-cyan-200"
                    : "border-cyan-200 bg-white dark:border-cyan-800 dark:bg-slate-950"
                }`}
                key={mode}
                onClick={() => setExampleMode(mode)}
                type="button"
              >
                {mode === "normal" ? "正常对象" : "边界对象"}
              </button>
            ))}
          </div>
        </div>
        <div className="min-w-0 rounded-xl bg-slate-950 p-4 text-slate-100">
          <p className="text-xs font-semibold tracking-[0.14em] text-cyan-300 uppercase">
            {model.unitId} · assumption {assumptionIndex + 1}
          </p>
          <p className="mt-3 break-words text-sm leading-6">{model.theorem}</p>
          <div className="mt-4 rounded-lg border border-cyan-800 bg-cyan-950/60 p-3">
            <span className="text-xs text-cyan-300">当前必须成立</span>
            <strong className="mt-1 block break-words text-sm">
              {selected}
            </strong>
          </div>
          <div className="mt-3 rounded-lg border border-slate-700 bg-slate-900 p-3">
            <span className="text-xs text-slate-400">
              {exampleMode === "normal" ? "用于重建证明" : "用于检查结论边界"}
            </span>
            <p className="mt-1 break-words text-sm">
              {exampleMode === "normal"
                ? model.normalExample
                : model.boundaryExample}
            </p>
          </div>
          <p className="mt-3 break-words text-xs leading-5 text-slate-300">
            <strong className="text-cyan-300">保持量：</strong>
            {model.invariant}
          </p>
        </div>
      </div>
    </section>
  );
}

function ProofLab({ model }: { model: LinearProofModel }) {
  const [activeStep, setActiveStep] = useState(0);
  const active = model.proofSteps[activeStep];

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30"
      data-visual-kind={`linear-proof-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-violet-200 px-4 py-3 dark:border-violet-900 sm:px-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-violet-700 uppercase dark:text-violet-300">
            Definition · lemma · claim
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：证明重建器</h3>
        </div>
        <button
          aria-label="重置线性代数证明实验"
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
              选择一个必须能解释的推导节点
            </span>
            <span className="text-slate-400">
              {activeStep + 1} / {model.proofSteps.length}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {model.proofSteps.map((step, index) => (
              <button
                aria-pressed={activeStep === index}
                className={`min-h-32 rounded-lg border p-3 text-left ${
                  activeStep === index
                    ? "border-violet-300 bg-violet-900"
                    : index < activeStep
                      ? "border-emerald-700 bg-emerald-950"
                      : "border-slate-700 bg-slate-900"
                }`}
                key={`${step.label}-${index}`}
                onClick={() => setActiveStep(index)}
                type="button"
              >
                <strong className="block break-words text-xs">
                  {index + 1}. {step.label}
                </strong>
                <span className="mt-2 block break-words text-xs text-slate-300">
                  {step.claim}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-violet-700 bg-violet-950/50 p-3">
              <span className="text-xs text-violet-300">本步结论</span>
              <p className="mt-1 break-words text-sm">{active.claim}</p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
              <span className="text-xs text-slate-400">允许使用的理由</span>
              <p className="mt-1 break-words text-sm">{active.reason}</p>
            </div>
          </div>
          <p className="mt-3 break-words text-xs leading-5 text-slate-300">
            <strong className="text-violet-300">交付工件：</strong>
            {model.proofArtifact}
          </p>
        </div>
      </div>
    </section>
  );
}

function CounterexampleLab({ model }: { model: LinearProofModel }) {
  const [removedIndex, setRemovedIndex] = useState(0);
  const [faultInjected, setFaultInjected] = useState(false);
  const [replay, setReplay] = useState(1);
  const removed = model.assumptions[removedIndex];
  const trace = [
    {
      phase: "冻结对象",
      detail: `第 ${replay} 次沿用同一个域、空间、映射和基`,
      pass: true,
    },
    {
      phase: "删去假设",
      detail: faultInjected ? removed : "所有假设仍保留",
      pass: !faultInjected,
    },
    {
      phase: "寻找首差",
      detail: faultInjected ? model.boundaryExample : model.normalExample,
      pass: !faultInjected,
    },
    {
      phase: "恢复结论",
      detail: faultInjected
        ? "保留反例，不把偶然成立写成定理"
        : model.proofArtifact,
      pass: !faultInjected,
    },
  ];

  return (
    <section
      className="not-prose my-6 min-w-0 overflow-hidden rounded-2xl border border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30"
      data-visual-kind={`linear-counterexample-${model.unitId}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-emerald-200 px-4 py-3 dark:border-emerald-900 sm:px-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.16em] text-emerald-700 uppercase dark:text-emerald-300">
            Remove one hypothesis · preserve the witness
          </p>
          <h3 className="mt-1 font-semibold">{model.title}：反例实验</h3>
        </div>
        <button
          aria-label="重置线性代数反例实验"
          className="min-h-11 rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm dark:border-emerald-800 dark:bg-slate-950"
          onClick={() => {
            setRemovedIndex(0);
            setFaultInjected(false);
            setReplay(1);
          }}
          type="button"
        >
          重置实验
        </button>
      </header>
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-500">
            要删除的假设
            <select
              className="mt-2 min-h-11 w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm text-slate-900 dark:border-emerald-800 dark:bg-slate-950 dark:text-slate-100"
              onChange={(event) => setRemovedIndex(Number(event.target.value))}
              value={removedIndex}
            >
              {model.assumptions.map((assumption, index) => (
                <option key={assumption} value={index}>
                  {assumption}
                </option>
              ))}
            </select>
          </label>
          <button
            aria-pressed={faultInjected}
            className={`min-h-11 w-full rounded-lg px-3 py-2 text-sm font-semibold text-white ${
              faultInjected ? "bg-rose-700" : "bg-emerald-700"
            }`}
            onClick={() => setFaultInjected((value) => !value)}
            type="button"
          >
            {faultInjected ? "恢复这条假设" : "删除这条假设"}
          </button>
          <button
            className="min-h-11 w-full rounded-lg border border-emerald-300 bg-white px-3 py-2 text-sm dark:border-emerald-800 dark:bg-slate-950"
            onClick={() => setReplay((value) => value + 1)}
            type="button"
          >
            同对象重放
          </button>
        </div>
        <div className="space-y-2">
          {trace.map((item, index) => (
            <div
              className={`rounded-lg border p-3 ${
                item.pass
                  ? "border-emerald-300 bg-white dark:border-emerald-800 dark:bg-slate-950"
                  : "border-rose-300 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/40"
              }`}
              key={item.phase}
            >
              <div className="flex items-center justify-between gap-3">
                <strong className="text-sm">
                  {index + 1}. {item.phase}
                </strong>
                <span className="text-xs">{item.pass ? "成立" : "失效"}</span>
              </div>
              <p className="mt-1 break-words text-xs leading-5 text-slate-600 dark:text-slate-300">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LinearProofLab({ model, view }: Props) {
  if (view === "assumptions") return <AssumptionLab model={model} />;
  if (view === "proof") return <ProofLab model={model} />;
  return <CounterexampleLab model={model} />;
}
