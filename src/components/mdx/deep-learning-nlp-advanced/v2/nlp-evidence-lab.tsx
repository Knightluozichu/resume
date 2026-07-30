"use client";

import { useState } from "react";

export type NlpEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  stages: readonly {
    name: string;
    input: string;
    operation: string;
    output: string;
    check: string;
  }[];
  cases: readonly {
    name: string;
    observation: string;
    prediction: string;
    boundary: string;
  }[];
  referenceTrace: readonly string[];
  faultTrace: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  gates: readonly {
    label: string;
    detail: string;
  }[];
};

type Props = {
  model: NlpEvidenceModel;
  view: "representation-ledger" | "sequence-trace" | "evaluation-gate";
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
      重置NLP实验
    </button>
  );
}

function RepresentationLedgerLab({ model }: { model: NlpEvidenceModel }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const activeCase = model.cases[caseIndex];
  const activeStage = model.stages[stageIndex];
  const reset = () => {
    setCaseIndex(0);
    setStageIndex(0);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="nlp-representation-ledger"
      aria-label={`${model.title}表示与shape账本`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">NLP 表示与shape账本</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            选择运行情形，逐步核对词ID、表示、时序状态与输出
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {model.cases.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-pressed={caseIndex === index}
            onClick={() => {
              setCaseIndex(index);
              setStageIndex(0);
            }}
            className={`${buttonClass} ${
              caseIndex === index
                ? "border-accent bg-accent/10 text-primary"
                : "text-secondary"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {[
          ["输入设置", activeCase.observation],
          ["事前预测", activeCase.prediction],
          ["适用边界", activeCase.boundary],
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
          ["进入本阶段的数据与状态", activeStage.input],
          ["表示、序列或评价动作", activeStage.operation],
          ["离开本阶段的证据状态", activeStage.output],
          ["词ID、shape、状态、梯度与指标检查", activeStage.check],
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

function SequenceTraceLab({ model }: { model: NlpEvidenceModel }) {
  const [mode, setMode] = useState<"reference" | "fault">("reference");
  const [stepIndex, setStepIndex] = useState(0);
  const trace = mode === "reference" ? model.referenceTrace : model.faultTrace;
  const changeMode = (next: "reference" | "fault") => {
    setMode(next);
    setStepIndex(0);
  };
  const reset = () => {
    setMode("reference");
    setStepIndex(0);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="nlp-sequence-trace"
      aria-label={`${model.title}序列与梯度轨迹`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">
            表示、序列与梯度状态轨迹
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            对照参考运行与单一故障
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={mode === "reference"}
          onClick={() => changeMode("reference")}
          className={`${buttonClass} ${
            mode === "reference"
              ? "border-success bg-success/10 text-primary"
              : "text-secondary"
          }`}
        >
          参考运行
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
          单故障运行
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
          <p className="text-xs font-medium text-success">NLP实验不变量</p>
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

function EvaluationGateLab({ model }: { model: NlpEvidenceModel }) {
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
      data-visual-kind="nlp-evaluation-gate"
      aria-label={`${model.title}独立评价验收门`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">NLP 独立评价验收门</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            逐项锁定语料、词表、表示、序列、随机性与评价条件
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
          ? `验收门通过：“${model.title}”的结论可进入独立复核。`
          : `尚未验收：还需锁定 ${enabled.filter((value) => !value).length} 项证据条件。`}
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
        {artifactVisible ? "收起NLP证据包" : "展开NLP证据包"}
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

export function NlpEvidenceLab({ model, view }: Props) {
  if (view === "representation-ledger")
    return <RepresentationLedgerLab model={model} />;
  if (view === "sequence-trace") return <SequenceTraceLab model={model} />;
  return <EvaluationGateLab model={model} />;
}
