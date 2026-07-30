"use client";

import { useState } from "react";

export type FacilitationEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  purposeOptions: readonly string[];
  participantOptions: readonly string[];
  authorityOptions: readonly string[];
  stages: readonly {
    name: string;
    action: string;
  }[];
  normalTrace: readonly string[];
  failureTrace: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  riskCases: readonly {
    label: string;
    detail: string;
  }[];
};

type FacilitationEvidenceLabProps = {
  model: FacilitationEvidenceModel;
  view: "session-contract" | "participation-trace" | "ethics-probe";
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

function ChoiceGroup({
  label,
  options,
  selectedIndex,
  onSelect,
}: {
  label: string;
  options: readonly string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-accent">{label}</p>
      <div className="mt-2 grid gap-2">
        {options.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(index)}
            aria-pressed={selectedIndex === index}
            className={`${buttonClass} ${
              selectedIndex === index
                ? "border-accent bg-accent/10 text-primary"
                : "text-secondary"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function SessionContract({ model }: { model: FacilitationEvidenceModel }) {
  const [purposeIndex, setPurposeIndex] = useState(0);
  const [participantIndex, setParticipantIndex] = useState(0);
  const [authorityIndex, setAuthorityIndex] = useState(0);
  const reset = () => {
    setPurposeIndex(0);
    setParticipantIndex(0);
    setAuthorityIndex(0);
  };
  const aligned =
    purposeIndex === participantIndex && participantIndex === authorityIndex;

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="facilitation-session-contract"
      aria-label={`${model.title}会议合同实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">会议合同</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            目的、参与与权限必须对齐
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <ChoiceGroup
          label="当前目的"
          options={model.purposeOptions}
          selectedIndex={purposeIndex}
          onSelect={setPurposeIndex}
        />
        <ChoiceGroup
          label="关键参与者"
          options={model.participantOptions}
          selectedIndex={participantIndex}
          onSelect={setParticipantIndex}
        />
        <ChoiceGroup
          label="决策权限"
          options={model.authorityOptions}
          selectedIndex={authorityIndex}
          onSelect={setAuthorityIndex}
        />
      </div>

      <div
        className={`mt-5 rounded-card border px-4 py-3 text-sm leading-6 ${
          aligned
            ? "border-success bg-success/10 text-primary"
            : "border-warning bg-warning/10 text-primary"
        }`}
        role="status"
        aria-live="polite"
      >
        {aligned
          ? `合同可以进入下一阶段：${model.stages[purposeIndex]?.name ?? model.stages[0].name}。`
          : "三个选择指向不同阶段；先澄清谁受影响、谁能决定和这次会议究竟交付什么。"}
      </div>

      <p className="mt-4 text-xs leading-5 text-secondary">
        正式坐标：{model.concepts.join("、")}
      </p>
    </section>
  );
}

function ParticipationTrace({ model }: { model: FacilitationEvidenceModel }) {
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
      data-visual-kind="facilitation-participation-trace"
      aria-label={`${model.title}参与轨迹实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">参与轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            固定情境，只改变一项流程条件
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

function EthicsProbe({ model }: { model: FacilitationEvidenceModel }) {
  const [riskIndex, setRiskIndex] = useState<number | null>(null);
  const [artifactVisible, setArtifactVisible] = useState(false);
  const reset = () => {
    setRiskIndex(null);
    setArtifactVisible(false);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="facilitation-ethics-probe"
      aria-label={`${model.title}伦理与证据实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">伦理与证据</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            风险出现时，先保护群体再完成产物
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {model.riskCases.map((risk, index) => (
          <button
            key={risk.label}
            type="button"
            onClick={() =>
              setRiskIndex((current) => (current === index ? null : index))
            }
            aria-pressed={riskIndex === index}
            className={`${buttonClass} ${
              riskIndex === index
                ? "border-danger bg-danger/10 text-primary"
                : "text-secondary"
            }`}
          >
            <span className="block font-medium">{risk.label}</span>
            <span className="mt-1 block text-xs leading-5">{risk.detail}</span>
          </button>
        ))}
      </div>

      <div
        className={`mt-4 rounded-card border px-4 py-3 text-sm leading-6 ${
          riskIndex === null
            ? "border-success bg-success/10 text-primary"
            : "border-danger bg-danger/10 text-primary"
        }`}
        role="status"
        aria-live="polite"
      >
        {riskIndex === null
          ? `当前基线可继续核对：${model.invariant}`
          : `暂停交付并处理${model.riskCases[riskIndex].label}；不能用“${model.fault}”掩盖风险。`}
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
        {artifactVisible ? "收起独立复核材料" : "展开独立复核材料"}
      </button>

      {artifactVisible && (
        <div className="mt-3 rounded-card border border-border bg-background p-4">
          <p className="text-xs font-medium text-accent">交付证据包</p>
          <p className="mt-2 text-sm leading-6 text-primary">
            {model.artifact}
          </p>
        </div>
      )}
    </section>
  );
}

export function FacilitationEvidenceLab({
  model,
  view,
}: FacilitationEvidenceLabProps) {
  if (view === "session-contract") return <SessionContract model={model} />;
  if (view === "participation-trace")
    return <ParticipationTrace model={model} />;
  return <EthicsProbe model={model} />;
}
