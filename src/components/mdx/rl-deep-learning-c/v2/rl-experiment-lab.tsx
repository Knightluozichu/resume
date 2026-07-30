"use client";

import { useState } from "react";

export type RlcExperimentStage = {
  label: string;
  contract: string;
  evidence: string;
};

export type RlcExperimentModel = {
  unitId: string;
  title: string;
  question: string;
  sourceBoundary: string;
  concepts: readonly string[];
  stages: readonly RlcExperimentStage[];
  normalTrace: readonly string[];
  failureTrace: readonly string[];
  invariant: string;
  formula: string;
  artifact: string;
  fault: string;
};

type RlcExperimentLabProps = {
  model: RlcExperimentModel;
  view: "pipeline" | "replay" | "fault";
};

const buttonClass =
  "rounded-control border border-border px-3 py-2 text-left text-sm transition-colors hover:border-accent hover:text-primary";

function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
    >
      重置实验
    </button>
  );
}

function PipelineLab({ model }: { model: RlcExperimentModel }) {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = model.stages[stageIndex];

  const reset = () => setStageIndex(0);

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="concept-map"
      aria-label={`${model.title}实现管线`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">实现管线</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            {model.title}
          </h3>
          <p className="mt-2 max-w-3xl text-sm text-secondary">
            {model.question}
          </p>
        </div>
        <ResetButton onClick={reset} />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {model.stages.map((candidate, index) => (
          <button
            key={candidate.label}
            type="button"
            onClick={() => setStageIndex(index)}
            aria-pressed={stageIndex === index}
            className={`${buttonClass} ${
              stageIndex === index
                ? "border-accent bg-accent/10 text-primary"
                : "text-secondary"
            }`}
          >
            <span className="block text-xs text-accent">阶段 {index + 1}</span>
            <span className="mt-1 block font-medium">{candidate.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">输入与状态合同</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {stage.contract}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">必须留下的证据</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {stage.evidence}
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-card border border-border px-4 py-3 font-mono text-xs leading-6 text-secondary">
        {model.formula}
      </p>
      <p className="mt-3 text-xs leading-5 text-secondary">
        来源边界：{model.sourceBoundary}
      </p>
    </section>
  );
}

function ReplayLab({ model }: { model: RlcExperimentModel }) {
  const [mode, setMode] = useState<"normal" | "failure">("normal");
  const [stepIndex, setStepIndex] = useState(0);
  const trace = mode === "normal" ? model.normalTrace : model.failureTrace;

  const selectMode = (nextMode: "normal" | "failure") => {
    setMode(nextMode);
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
      aria-label={`${model.title}逐步重放`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">逐步重放</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            正常轨迹与失败轨迹使用同一输入合同
          </h3>
        </div>
        <ResetButton onClick={reset} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => selectMode("normal")}
          aria-pressed={mode === "normal"}
          className={`${buttonClass} ${
            mode === "normal"
              ? "border-success bg-success/10 text-primary"
              : "text-secondary"
          }`}
        >
          正常运行
        </button>
        <button
          type="button"
          onClick={() => selectMode("failure")}
          aria-pressed={mode === "failure"}
          className={`${buttonClass} ${
            mode === "failure"
              ? "border-danger bg-danger/10 text-primary"
              : "text-secondary"
          }`}
        >
          注入故障
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
        不变量：{model.invariant}
      </p>
    </section>
  );
}

function FaultLab({ model }: { model: RlcExperimentModel }) {
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
      aria-label={`${model.title}故障与证据`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">反例与证据</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            删除一个前提，定位首个错误状态
          </h3>
        </div>
        <ResetButton onClick={reset} />
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
          <span className="block text-xs text-accent">故障开关</span>
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
          <span className="block text-xs text-accent">验收产物</span>
          <span className="mt-1 block font-medium">展开可复核记录</span>
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
          ? `拒绝当前运行：${model.fault}。请在扩大训练规模前回到首个分岔。`
          : `基线可继续：${model.invariant}`}
      </div>

      {artifactVisible && (
        <div className="mt-4 rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">复核记录</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {model.artifact}
          </p>
          <p className="mt-3 text-xs leading-5 text-secondary">
            正式节点：{model.concepts.join("、")}
          </p>
        </div>
      )}
    </section>
  );
}

export function RlcExperimentLab({ model, view }: RlcExperimentLabProps) {
  if (view === "pipeline") return <PipelineLab model={model} />;
  if (view === "replay") return <ReplayLab model={model} />;
  return <FaultLab model={model} />;
}
