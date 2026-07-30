"use client";

import { useState } from "react";

export type CppEvidenceStep = {
  label: string;
  contract: string;
  evidence: string;
};

export type CppEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  steps: readonly CppEvidenceStep[];
  normalTrace: readonly string[];
  failureTrace: readonly string[];
  invariant: string;
  artifact: string;
  fault: string;
};

type CppEvidenceLabProps = {
  model: CppEvidenceModel;
  view: "contract" | "trace" | "fault";
};

const choiceClass =
  "rounded-control border border-border px-3 py-2 text-left text-sm transition-colors hover:border-accent hover:text-primary";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
    >
      重置实验
    </button>
  );
}

function ContractLab({ model }: { model: CppEvidenceModel }) {
  const [stepIndex, setStepIndex] = useState(0);
  const current = model.steps[stepIndex];

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="concept-map"
      aria-label={`${model.title}输入与状态合同`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">输入与状态合同</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            {model.title}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            {model.question}
          </p>
        </div>
        <ResetButton onReset={() => setStepIndex(0)} />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {model.steps.map((step, index) => (
          <button
            key={step.label}
            type="button"
            onClick={() => setStepIndex(index)}
            aria-pressed={stepIndex === index}
            className={`${choiceClass} ${
              stepIndex === index
                ? "border-accent bg-accent/10 text-primary"
                : "text-secondary"
            }`}
          >
            <span className="block text-xs text-accent">
              检查点 {index + 1}
            </span>
            <span className="mt-1 block font-medium">{step.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">必须先声明</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {current.contract}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">可复核证据</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {current.evidence}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-secondary">
        正式节点：{model.concepts.join("、")}
      </p>
    </section>
  );
}

function TraceLab({ model }: { model: CppEvidenceModel }) {
  const [mode, setMode] = useState<"normal" | "failure">("normal");
  const [stepIndex, setStepIndex] = useState(0);
  const trace = mode === "normal" ? model.normalTrace : model.failureTrace;

  const changeMode = (next: "normal" | "failure") => {
    setMode(next);
    setStepIndex(0);
  };
  const reset = () => {
    setMode("normal");
    setStepIndex(0);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="execution-trace"
      aria-label={`${model.title}编译与运行轨迹`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">编译与运行轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            同一输入下比较正常与失败路径
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => changeMode("normal")}
          aria-pressed={mode === "normal"}
          className={`${choiceClass} ${
            mode === "normal"
              ? "border-success bg-success/10 text-primary"
              : "text-secondary"
          }`}
        >
          正常路径
        </button>
        <button
          type="button"
          onClick={() => changeMode("failure")}
          aria-pressed={mode === "failure"}
          className={`${choiceClass} ${
            mode === "failure"
              ? "border-danger bg-danger/10 text-primary"
              : "text-secondary"
          }`}
        >
          故障路径
        </button>
      </div>

      <ol className="mt-5 space-y-2">
        {trace.map((item, index) => (
          <li
            key={`${mode}-${index}`}
            className={`rounded-card border px-4 py-3 text-sm leading-6 ${
              index === stepIndex
                ? "border-accent bg-accent/10 text-primary"
                : index < stepIndex
                  ? "border-border text-primary"
                  : "border-border text-secondary"
            }`}
          >
            <span className="mr-2 font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item}
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
          disabled={stepIndex === 0}
          className={`${choiceClass} text-secondary disabled:cursor-not-allowed disabled:opacity-40`}
        >
          上一步
        </button>
        <button
          type="button"
          onClick={() =>
            setStepIndex((value) => Math.min(trace.length - 1, value + 1))
          }
          disabled={stepIndex === trace.length - 1}
          className={`${choiceClass} text-secondary disabled:cursor-not-allowed disabled:opacity-40`}
        >
          下一步
        </button>
      </div>

      <p className="mt-4 rounded-card border border-border bg-background px-4 py-3 text-sm leading-6 text-primary">
        不变量：{model.invariant}
      </p>
    </section>
  );
}

function FaultLab({ model }: { model: CppEvidenceModel }) {
  const [faultEnabled, setFaultEnabled] = useState(false);
  const [artifactVisible, setArtifactVisible] = useState(false);

  const reset = () => {
    setFaultEnabled(false);
    setArtifactVisible(false);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="counterexample"
      aria-label={`${model.title}故障定位`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">故障定位与复位</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            一次只破坏一个前提
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setFaultEnabled((value) => !value)}
          aria-pressed={faultEnabled}
          className={`${choiceClass} ${
            faultEnabled
              ? "border-danger bg-danger/10 text-primary"
              : "text-secondary"
          }`}
        >
          <span className="block text-xs text-accent">故障开关</span>
          <span className="mt-1 block font-medium">{model.fault}</span>
        </button>
        <button
          type="button"
          onClick={() => setArtifactVisible((value) => !value)}
          aria-pressed={artifactVisible}
          className={`${choiceClass} ${
            artifactVisible
              ? "border-accent bg-accent/10 text-primary"
              : "text-secondary"
          }`}
        >
          <span className="block text-xs text-accent">验收产物</span>
          <span className="mt-1 block font-medium">展开证据包</span>
        </button>
      </div>

      <div
        className={`mt-4 rounded-card border px-4 py-4 text-sm leading-6 ${
          faultEnabled
            ? "border-danger bg-danger/10 text-primary"
            : "border-success bg-success/10 text-primary"
        }`}
        role="status"
        aria-live="polite"
      >
        {faultEnabled
          ? `拒绝运行：${model.fault}。请回到第一处不同的诊断、状态或输出。`
          : `基线可继续：${model.invariant}`}
      </div>

      {artifactVisible && (
        <div className="mt-4 rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">独立复核证据</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {model.artifact}
          </p>
        </div>
      )}
    </section>
  );
}

export function CppEvidenceLab({ model, view }: CppEvidenceLabProps) {
  if (view === "contract") return <ContractLab model={model} />;
  if (view === "trace") return <TraceLab model={model} />;
  return <FaultLab model={model} />;
}
