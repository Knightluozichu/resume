"use client";

import { useState } from "react";

export type FrontendPipelineEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  nodeCards: readonly {
    name: string;
    input: string;
    action: string;
    output: string;
    gate: string;
  }[];
  normalTrace: readonly string[];
  failureTrace: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  gates: readonly {
    label: string;
    detail: string;
  }[];
};

type FrontendPipelineEvidenceLabProps = {
  model: FrontendPipelineEvidenceModel;
  view: "architecture" | "execution-trace" | "release-gate";
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

function ArchitectureLab({ model }: { model: FrontendPipelineEvidenceModel }) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const current = model.nodeCards[nodeIndex];

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="frontend-pipeline-architecture"
      aria-label={`${model.title}前端工程体系实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">体系节点</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从版本化输入走到可晋级产物
          </h3>
        </div>
        <ResetButton onReset={() => setNodeIndex(0)} />
      </div>

      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {model.nodeCards.map((node, index) => (
          <div key={node.name} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setNodeIndex(index)}
              aria-pressed={nodeIndex === index}
              className={`${buttonClass} ${
                nodeIndex === index
                  ? "border-accent bg-accent/10 text-primary"
                  : "text-secondary"
              }`}
            >
              {node.name}
            </button>
            {index < model.nodeCards.length - 1 && (
              <span aria-hidden="true" className="text-secondary">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {[
          ["版本化输入", current.input],
          ["工程动作", current.action],
          ["可验证输出", current.output],
          ["晋级门", current.gate],
        ].map(([label, detail]) => (
          <div
            key={label}
            className="rounded-card border border-border bg-background p-4"
          >
            <p className="text-xs font-medium text-accent">{label}</p>
            <p className="mt-2 text-sm leading-6 text-primary">{detail}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs leading-5 text-secondary">
        公开目录坐标：{model.concepts.join("、")}
      </p>
    </section>
  );
}

function ExecutionTrace({
  model,
}: {
  model: FrontendPipelineEvidenceModel;
}) {
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
      data-visual-kind="frontend-pipeline-execution-trace"
      aria-label={`${model.title}工程执行轨迹`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">执行轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            固定提交，只改变一项工程条件
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
          正常轨迹
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

function ReleaseGate({ model }: { model: FrontendPipelineEvidenceModel }) {
  const [gateState, setGateState] = useState(() =>
    model.gates.map(() => true),
  );
  const [artifactVisible, setArtifactVisible] = useState(false);
  const allPass = gateState.every(Boolean);
  const reset = () => {
    setGateState(model.gates.map(() => true));
    setArtifactVisible(false);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="frontend-pipeline-release-gate"
      aria-label={`${model.title}发布门实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">发布门</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            任一门失败，产物不得晋级
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {model.gates.map((gate, index) => (
          <button
            key={gate.label}
            type="button"
            onClick={() =>
              setGateState((current) =>
                current.map((value, itemIndex) =>
                  itemIndex === index ? !value : value,
                ),
              )
            }
            aria-pressed={gateState[index]}
            className={`${buttonClass} ${
              gateState[index]
                ? "border-success bg-success/10 text-primary"
                : "border-danger bg-danger/10 text-primary"
            }`}
          >
            <span className="block font-medium">
              {gateState[index] ? "通过 · " : "阻断 · "}
              {gate.label}
            </span>
            <span className="mt-1 block text-xs leading-5">{gate.detail}</span>
          </button>
        ))}
      </div>

      <div
        className={`mt-4 rounded-card border px-4 py-3 text-sm leading-6 ${
          allPass
            ? "border-success bg-success/10 text-primary"
            : "border-danger bg-danger/10 text-primary"
        }`}
        role="status"
        aria-live="polite"
      >
        {allPass
          ? `可以进入下一环境：${model.invariant}`
          : `拒绝晋级并检查“${model.fault}”对应的最早失败门。`}
      </div>

      <button
        type="button"
        onClick={() => setArtifactVisible((value) => !value)}
        aria-pressed={artifactVisible}
        className={`${buttonClass} mt-4 ${
          artifactVisible
            ? "border-accent bg-accent/10 text-primary"
            : "text-secondary"
        }`}
      >
        {artifactVisible ? "收起证据包" : "展开证据包"}
      </button>

      {artifactVisible && (
        <div className="mt-3 rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">独立复核材料</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {model.artifact}
          </p>
        </div>
      )}
    </section>
  );
}

export function FrontendPipelineEvidenceLab({
  model,
  view,
}: FrontendPipelineEvidenceLabProps) {
  if (view === "architecture") return <ArchitectureLab model={model} />;
  if (view === "execution-trace") return <ExecutionTrace model={model} />;
  return <ReleaseGate model={model} />;
}
