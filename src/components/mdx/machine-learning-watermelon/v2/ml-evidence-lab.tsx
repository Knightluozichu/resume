"use client";

import { useState } from "react";

export type MlEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  stages: readonly {
    name: string;
    input: string;
    operation: string;
    output: string;
    evidence: string;
  }[];
  experiments: readonly {
    name: string;
    setup: string;
    expected: string;
    boundary: string;
  }[];
  baselineTrace: readonly string[];
  faultTrace: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  gates: readonly {
    label: string;
    detail: string;
  }[];
};

type MlEvidenceLabProps = {
  model: MlEvidenceModel;
  view: "data-protocol" | "experiment-trace" | "acceptance-gate";
};

const buttonClass =
  "rounded-control border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-40";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={onReset}
      className={`${buttonClass} text-secondary`}
    >
      重置实验
    </button>
  );
}

function DataProtocolLab({ model }: { model: MlEvidenceModel }) {
  const [experimentIndex, setExperimentIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const activeExperiment = model.experiments[experimentIndex];
  const activeStage = model.stages[stageIndex];
  const reset = () => {
    setExperimentIndex(0);
    setStageIndex(0);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="ml-data-protocol"
      aria-label={`${model.title}数据协议实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">数据与模型协议</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            选择实验，再逐阶段检查信息边界
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {model.experiments.map((experiment, index) => (
          <button
            key={experiment.name}
            type="button"
            aria-pressed={experimentIndex === index}
            onClick={() => {
              setExperimentIndex(index);
              setStageIndex(0);
            }}
            className={`${buttonClass} ${
              experimentIndex === index
                ? "border-accent bg-accent/10 text-primary"
                : "text-secondary"
            }`}
          >
            {experiment.name}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {[
          ["实验设置", activeExperiment.setup],
          ["预期结果", activeExperiment.expected],
          ["适用边界", activeExperiment.boundary],
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

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {model.stages.map((stage, index) => (
          <div key={stage.name} className="flex items-center gap-2">
            <button
              type="button"
              aria-pressed={stageIndex === index}
              onClick={() => setStageIndex(index)}
              className={`${buttonClass} ${
                stageIndex === index
                  ? "border-success bg-success/10 text-primary"
                  : "text-secondary"
              }`}
            >
              {stage.name}
            </button>
            {index < model.stages.length - 1 && (
              <span aria-hidden="true" className="text-secondary">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {[
          ["允许输入", activeStage.input],
          ["本阶段操作", activeStage.operation],
          ["阶段输出", activeStage.output],
          ["复核证据", activeStage.evidence],
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
        原版坐标：{model.concepts.join("、")}
      </p>
    </section>
  );
}

function ExperimentTraceLab({ model }: { model: MlEvidenceModel }) {
  const [mode, setMode] = useState<"baseline" | "fault">("baseline");
  const [stepIndex, setStepIndex] = useState(0);
  const trace = mode === "baseline" ? model.baselineTrace : model.faultTrace;
  const changeMode = (next: "baseline" | "fault") => {
    setMode(next);
    setStepIndex(0);
  };
  const reset = () => {
    setMode("baseline");
    setStepIndex(0);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="ml-experiment-trace"
      aria-label={`${model.title}实验轨迹`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">对照实验轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            比较基线与单变量故障
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={mode === "baseline"}
          onClick={() => changeMode("baseline")}
          className={`${buttonClass} ${
            mode === "baseline"
              ? "border-success bg-success/10 text-primary"
              : "text-secondary"
          }`}
        >
          冻结基线
        </button>
        <button
          type="button"
          aria-pressed={mode === "fault"}
          onClick={() => changeMode("fault")}
          className={`${buttonClass} ${
            mode === "fault"
              ? "border-danger bg-danger/10 text-primary"
              : "text-secondary"
          }`}
        >
          单故障对照
        </button>
      </div>

      <ol className="mt-5 space-y-2" aria-live="polite">
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
          disabled={stepIndex === 0}
          onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
          className={`${buttonClass} text-secondary`}
        >
          上一步
        </button>
        <button
          type="button"
          disabled={stepIndex === trace.length - 1}
          onClick={() =>
            setStepIndex((value) => Math.min(trace.length - 1, value + 1))
          }
          className={`${buttonClass} text-secondary`}
        >
          下一步
        </button>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-success">学习不变量</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {model.invariant}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-danger">本轮只改变</p>
          <p className="mt-2 text-sm leading-6 text-primary">{model.fault}</p>
        </div>
      </div>
    </section>
  );
}

function AcceptanceGateLab({ model }: { model: MlEvidenceModel }) {
  const [enabled, setEnabled] = useState<boolean[]>(() =>
    model.gates.map(() => false),
  );
  const [artifactVisible, setArtifactVisible] = useState(false);
  const reset = () => {
    setEnabled(model.gates.map(() => false));
    setArtifactVisible(false);
  };
  const allEnabled = enabled.every(Boolean);

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="ml-acceptance-gate"
      aria-label={`${model.title}模型验收门`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">模型验收门</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            逐项锁定可复现实验合同
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {model.gates.map((gate, index) => (
          <button
            key={gate.label}
            type="button"
            aria-pressed={enabled[index]}
            onClick={() =>
              setEnabled((current) =>
                current.map((value, itemIndex) =>
                  itemIndex === index ? !value : value,
                ),
              )
            }
            className={`${buttonClass} ${
              enabled[index]
                ? "border-success bg-success/10 text-primary"
                : "text-secondary"
            }`}
          >
            <span className="block font-medium">
              {enabled[index] ? "已锁定 · " : "待锁定 · "}
              {gate.label}
            </span>
            <span className="mt-1 block text-xs leading-5">{gate.detail}</span>
          </button>
        ))}
      </div>

      <div
        className={`mt-4 rounded-card border px-4 py-3 text-sm leading-6 ${
          allEnabled
            ? "border-success bg-success/10 text-primary"
            : "border-warning bg-warning/10 text-primary"
        }`}
        role="status"
        aria-live="polite"
      >
        {allEnabled
          ? `验收门通过：“${model.title}”可以进入独立复核。`
          : `尚未验收：还需锁定 ${enabled.filter((value) => !value).length} 项实验条件。`}
      </div>

      <button
        type="button"
        aria-pressed={artifactVisible}
        onClick={() => setArtifactVisible((value) => !value)}
        className={`${buttonClass} mt-4 ${
          artifactVisible
            ? "border-accent bg-accent/10 text-primary"
            : "text-secondary"
        }`}
      >
        {artifactVisible ? "收起复核包" : "展开复核包"}
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

export function MlEvidenceLab({ model, view }: MlEvidenceLabProps) {
  if (view === "data-protocol") return <DataProtocolLab model={model} />;
  if (view === "experiment-trace") return <ExperimentTraceLab model={model} />;
  return <AcceptanceGateLab model={model} />;
}
