"use client";

import { useState } from "react";

export type GenerativeEvidenceModel = {
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
  model: GenerativeEvidenceModel;
  view: "distribution-ledger" | "latent-objective-trace" | "sampling-gate";
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
      重置生成模型实验
    </button>
  );
}

function DistributionLedgerLab({ model }: { model: GenerativeEvidenceModel }) {
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
      data-visual-kind="generative-distribution-ledger"
      aria-label={`${model.title}分布与张量账本`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">
            概率分布、潜变量与张量账本
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            选择样本情形，逐阶段核对密度、shape与随机变量
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
          ["数据与分布设置", activeCase.setup],
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
          ["进入本阶段的数据、随机变量与参数", activeStage.input],
          ["本阶段唯一允许的概率或张量变换", activeStage.operation],
          ["离开本阶段的分布、目标或样本状态", activeStage.output],
          ["归一化、shape、数值与随机性检查", activeStage.check],
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

function LatentObjectiveTraceLab({
  model,
}: {
  model: GenerativeEvidenceModel;
}) {
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
      data-visual-kind="generative-latent-objective-trace"
      aria-label={`${model.title}潜变量与目标轨迹`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">
            潜变量、目标函数与采样状态轨迹
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
          <p className="text-xs font-medium text-success">本页数值不变量</p>
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

function SamplingGateLab({ model }: { model: GenerativeEvidenceModel }) {
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
      data-visual-kind="generative-sampling-gate"
      aria-label={`${model.title}独立采样验收门`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">
            训练与独立采样验收门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            逐项锁定数据、分布、参数、随机性与边界证据
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
          ? `验收门通过：“${model.title}”的分布与样本结论可以进入独立复核。`
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
        {artifactVisible ? "收起生成模型证据包" : "展开生成模型证据包"}
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

export function GenerativeEvidenceLab({ model, view }: Props) {
  if (view === "distribution-ledger")
    return <DistributionLedgerLab model={model} />;
  if (view === "latent-objective-trace")
    return <LatentObjectiveTraceLab model={model} />;
  return <SamplingGateLab model={model} />;
}
