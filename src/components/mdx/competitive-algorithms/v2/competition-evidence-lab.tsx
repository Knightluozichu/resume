"use client";

import { useState } from "react";

export type CompetitionEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  constraints: readonly {
    label: string;
    premise: string;
    decision: string;
    evidence: string;
  }[];
  normalTrace: readonly string[];
  failureTrace: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
};

type CompetitionEvidenceLabProps = {
  model: CompetitionEvidenceModel;
  view: "constraint-map" | "execution-trace" | "counterexample";
};

const buttonClass =
  "rounded-control border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className={`${buttonClass} text-secondary`}
    >
      重置
    </button>
  );
}

function ConstraintMap({ model }: { model: CompetitionEvidenceModel }) {
  const [constraintIndex, setConstraintIndex] = useState(0);
  const current = model.constraints[constraintIndex];

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="algorithm-constraint-map"
      aria-label={`${model.title}约束到算法决策图`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">约束到算法决策</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            先固定问题，再比较策略
          </h3>
        </div>
        <ResetButton onReset={() => setConstraintIndex(0)} />
      </div>

      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {model.constraints.map((constraint, index) => (
          <button
            key={constraint.label}
            type="button"
            onClick={() => setConstraintIndex(index)}
            aria-pressed={constraintIndex === index}
            className={`${buttonClass} ${
              constraintIndex === index
                ? "border-accent bg-accent/10 text-primary"
                : "text-secondary"
            }`}
          >
            <span className="block font-mono text-xs text-accent">
              约束 {index + 1}
            </span>
            <span className="mt-1 block font-medium">{constraint.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">问题前提</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {current.premise}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">算法决策</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {current.decision}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">验收证据</p>
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

function ExecutionTrace({ model }: { model: CompetitionEvidenceModel }) {
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
      data-visual-kind="algorithm-execution-trace"
      aria-label={`${model.title}算法执行轨迹`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">执行轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            用同一输入比较正常与失败路径
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => changeMode("normal")}
          aria-pressed={mode === "normal"}
          className={`${buttonClass} ${
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
          className={`${buttonClass} ${
            mode === "failure"
              ? "border-danger bg-danger/10 text-primary"
              : "text-secondary"
          }`}
        >
          失败路径
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
          className={`${buttonClass} text-secondary disabled:cursor-not-allowed disabled:opacity-40`}
        >
          上一步
        </button>
        <button
          type="button"
          onClick={() =>
            setStepIndex((value) => Math.min(trace.length - 1, value + 1))
          }
          disabled={stepIndex === trace.length - 1}
          className={`${buttonClass} text-secondary disabled:cursor-not-allowed disabled:opacity-40`}
        >
          下一步
        </button>
      </div>

      <p className="mt-4 rounded-card border border-border bg-background px-4 py-3 text-sm leading-6 text-primary">
        必须保持：{model.invariant}
      </p>
    </section>
  );
}

function CounterexampleLab({ model }: { model: CompetitionEvidenceModel }) {
  const [faultEnabled, setFaultEnabled] = useState(false);
  const [artifactVisible, setArtifactVisible] = useState(false);

  const reset = () => {
    setFaultEnabled(false);
    setArtifactVisible(false);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="algorithm-counterexample"
      aria-label={`${model.title}算法反例实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">反例与证据包</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            让错误策略在最小输入上失败
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setFaultEnabled((value) => !value)}
          aria-pressed={faultEnabled}
          className={`${buttonClass} ${
            faultEnabled
              ? "border-danger bg-danger/10 text-primary"
              : "text-secondary"
          }`}
        >
          <span className="block text-xs text-accent">错误策略</span>
          <span className="mt-1 block font-medium">{model.fault}</span>
        </button>
        <button
          type="button"
          onClick={() => setArtifactVisible((value) => !value)}
          aria-pressed={artifactVisible}
          className={`${buttonClass} ${
            artifactVisible
              ? "border-accent bg-accent/10 text-primary"
              : "text-secondary"
          }`}
        >
          <span className="block text-xs text-accent">复核材料</span>
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
          ? `反例成立：${model.fault}。回到失败轨迹的第一处错误决策。`
          : `当前基线满足：${model.invariant}`}
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

export function CompetitionEvidenceLab({
  model,
  view,
}: CompetitionEvidenceLabProps) {
  if (view === "constraint-map") return <ConstraintMap model={model} />;
  if (view === "execution-trace") return <ExecutionTrace model={model} />;
  return <CounterexampleLab model={model} />;
}
