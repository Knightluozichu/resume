"use client";

import { useState } from "react";

export type StatisticalLearningEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  stages: readonly {
    name: string;
    input: string;
    transform: string;
    output: string;
    evidence: string;
  }[];
  cases: readonly {
    name: string;
    condition: string;
    prediction: string;
    target: string;
    contribution: string;
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

type StatisticalLearningEvidenceLabProps = {
  model: StatisticalLearningEvidenceModel;
  view: "model-space" | "fit-trace" | "validation-gate";
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

function ModelSpaceLab({ model }: { model: StatisticalLearningEvidenceModel }) {
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
      data-visual-kind="statistical-learning-model-space"
      aria-label={`${model.title}模型空间实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">模型空间</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            固定样本，追踪模型到风险
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="数据情形">
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

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["条件", activeCase.condition],
          ["预测", activeCase.prediction],
          ["目标", activeCase.target],
          ["风险贡献", activeCase.contribution],
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
          ["阶段输入", activeStage.input],
          ["变换", activeStage.transform],
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

function FitTraceLab({ model }: { model: StatisticalLearningEvidenceModel }) {
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
      data-visual-kind="statistical-learning-fit-trace"
      aria-label={`${model.title}拟合轨迹实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">拟合轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            用同一数据比较基线与反例
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={mode === "normal"}
          onClick={() => changeMode("normal")}
          className={`${buttonClass} ${
            mode === "normal"
              ? "border-success bg-success/10 text-primary"
              : "text-secondary"
          }`}
        >
          正常拟合
        </button>
        <button
          type="button"
          aria-pressed={mode === "failure"}
          onClick={() => changeMode("failure")}
          className={`${buttonClass} ${
            mode === "failure"
              ? "border-danger bg-danger/10 text-primary"
              : "text-secondary"
          }`}
        >
          边界反例
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
          <p className="text-xs font-medium text-success">拟合不变量</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {model.invariant}
          </p>
        </div>
        <div className="rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-danger">本轮只注入</p>
          <p className="mt-2 text-sm leading-6 text-primary">{model.fault}</p>
        </div>
      </div>
    </section>
  );
}

function ValidationGateLab({
  model,
}: {
  model: StatisticalLearningEvidenceModel;
}) {
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
      data-visual-kind="statistical-learning-validation-gate"
      aria-label={`${model.title}验证门实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">验证门</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            逐项锁定独立评估合同
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
          ? `验证门通过：“${model.title}”可以进入独立复核。`
          : `尚未接受结论：还需锁定 ${enabled.filter((value) => !value).length} 项条件。`}
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

export function StatisticalLearningEvidenceLab({
  model,
  view,
}: StatisticalLearningEvidenceLabProps) {
  if (view === "model-space") return <ModelSpaceLab model={model} />;
  if (view === "fit-trace") return <FitTraceLab model={model} />;
  return <ValidationGateLab model={model} />;
}
