"use client";

import { useState } from "react";

export type RubyEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  stages: readonly {
    label: string;
    input: string;
    state: string;
    evidence: string;
  }[];
  normalTrace: readonly string[];
  failureTrace: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
};

type RubyEvidenceLabProps = {
  model: RubyEvidenceModel;
  view: "object-model" | "control-trace" | "boundary-probe";
};

const choiceClass =
  "rounded-control border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className={`${choiceClass} text-secondary`}
    >
      重置
    </button>
  );
}

function ObjectModelLab({ model }: { model: RubyEvidenceModel }) {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = model.stages[stageIndex];

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="ruby-object-model"
      aria-label={`${model.title}对象与状态模型`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">对象与状态模型</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从输入、接收者到可观察证据
          </h3>
        </div>
        <ResetButton onReset={() => setStageIndex(0)} />
      </div>

      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {model.stages.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setStageIndex(index)}
            aria-pressed={stageIndex === index}
            className={`${choiceClass} ${
              stageIndex === index
                ? "border-accent bg-accent/10 text-primary"
                : "text-secondary"
            }`}
          >
            <span className="block font-mono text-xs text-accent">
              阶段 {index + 1}
            </span>
            <span className="mt-1 block font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">输入与接收者</p>
          <p className="mt-2 text-sm leading-6 text-primary">{stage.input}</p>
        </div>
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">状态变化</p>
          <p className="mt-2 text-sm leading-6 text-primary">{stage.state}</p>
        </div>
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">观察证据</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {stage.evidence}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-secondary">
        正式节点：{model.concepts.join("、")}
      </p>
    </section>
  );
}

function ControlTraceLab({ model }: { model: RubyEvidenceModel }) {
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
      data-visual-kind="ruby-control-trace"
      aria-label={`${model.title}正常与故障控制轨迹`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">控制与消息轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            在相同初值下定位首个分岔
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
          正常轨迹
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
          故障轨迹
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
        运行不变量：{model.invariant}
      </p>
    </section>
  );
}

function BoundaryProbeLab({ model }: { model: RubyEvidenceModel }) {
  const [faultEnabled, setFaultEnabled] = useState(false);
  const [artifactVisible, setArtifactVisible] = useState(false);

  const reset = () => {
    setFaultEnabled(false);
    setArtifactVisible(false);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="ruby-boundary-probe"
      aria-label={`${model.title}边界故障探针`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">边界故障探针</p>
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
          <span className="block text-xs text-accent">故障注入</span>
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
          <span className="block text-xs text-accent">复核材料</span>
          <span className="mt-1 block font-medium">展开最小证据包</span>
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
          ? `拒绝当前结论：${model.fault}。请回到故障轨迹的第一处状态分岔。`
          : `基线满足：${model.invariant}`}
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

export function RubyEvidenceLab({ model, view }: RubyEvidenceLabProps) {
  if (view === "object-model") return <ObjectModelLab model={model} />;
  if (view === "control-trace") return <ControlTraceLab model={model} />;
  return <BoundaryProbeLab model={model} />;
}
