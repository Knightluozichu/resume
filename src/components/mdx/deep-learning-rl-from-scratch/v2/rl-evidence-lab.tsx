"use client";

import { useState } from "react";

export type RlEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  stages: readonly {
    name: string;
    input: string;
    transition: string;
    output: string;
    evidence: string;
  }[];
  cases: readonly {
    name: string;
    setup: string;
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
  model: RlEvidenceModel;
  view: "transition-ledger" | "return-update-trace" | "evaluation-gate";
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
      重置强化学习实验
    </button>
  );
}

function TransitionLedgerLab({ model }: { model: RlEvidenceModel }) {
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
      data-visual-kind="rl-transition-ledger"
      aria-label={`${model.title}状态动作转移账本`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">
            强化学习状态—动作—奖励账本
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            选择运行情形，逐阶段核对真实对象与状态变化
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
          ["环境与策略设置", activeCase.setup],
          ["运行前预测", activeCase.prediction],
          ["适用与拒绝边界", activeCase.boundary],
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
          ["进入本阶段的对象与状态", activeStage.input],
          ["本阶段唯一允许的动作", activeStage.transition],
          ["离开本阶段的真实状态", activeStage.output],
          ["必须保存的可复核证据", activeStage.evidence],
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
        原版目录坐标：{model.concepts.join("、")}
      </p>
    </section>
  );
}

function ReturnUpdateTraceLab({ model }: { model: RlEvidenceModel }) {
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
      data-visual-kind="rl-return-update-trace"
      aria-label={`${model.title}收益目标与更新轨迹`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">
            收益、目标与参数更新轨迹
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            对照参考运行与单一故障，定位第一处分岔
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
          <p className="text-xs font-medium text-success">本页运行不变量</p>
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

function EvaluationGateLab({ model }: { model: RlEvidenceModel }) {
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
      data-visual-kind="rl-evaluation-gate"
      aria-label={`${model.title}冻结评估验收门`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">
            强化学习冻结评估验收门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            逐项锁定环境、策略、随机性、预算与证据工件
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
          ? `验收门通过：“${model.title}”的结论可以进入独立复核。`
          : `尚未验收：还需锁定 ${enabled.filter((value) => !value).length} 项真实条件。`}
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
        {artifactVisible ? "收起强化学习证据包" : "展开强化学习证据包"}
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

export function RlEvidenceLab({ model, view }: Props) {
  if (view === "transition-ledger")
    return <TransitionLedgerLab model={model} />;
  if (view === "return-update-trace")
    return <ReturnUpdateTraceLab model={model} />;
  return <EvaluationGateLab model={model} />;
}
