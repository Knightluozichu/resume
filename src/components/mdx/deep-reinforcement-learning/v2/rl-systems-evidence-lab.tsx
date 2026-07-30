"use client";

import { useState } from "react";

export type RlSystemsEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
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
  gates: readonly {
    label: string;
    detail: string;
  }[];
};

type Props = {
  model: RlSystemsEvidenceModel;
  view: "environment-contract" | "return-update-trace" | "evaluation-gate";
};

const buttonClass =
  "min-h-11 rounded-control border border-border bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button type="button" className={buttonClass} onClick={onReset}>
      重置本实验
    </button>
  );
}

function EnvironmentContract({ model }: { model: RlSystemsEvidenceModel }) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [mode, setMode] = useState<"reference" | "counterfactual">("reference");
  const [cursor, setCursor] = useState(0);
  const concept = model.concepts[conceptIndex] ?? model.title;
  const stage = model.stages[cursor] ?? model.stages[0];

  function reset() {
    setConceptIndex(0);
    setMode("reference");
    setCursor(0);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="rl-environment-contract"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            环境—轨迹合同
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            选择正式目录坐标，冻结环境角色，再定位参考轨迹与单一反事实的首个分岔。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            正式目录坐标
            <select
              className="mt-1 min-h-11 w-full rounded-control border border-border bg-background px-3 py-2 text-sm"
              value={conceptIndex}
              onChange={(event) => {
                setConceptIndex(Number(event.target.value));
                setCursor(0);
              }}
            >
              {model.concepts.map((item, index) => (
                <option key={`${item}-${index}`} value={index}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <div className="grid grid-cols-2 gap-2">
            {(["reference", "counterfactual"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`${buttonClass} ${
                  mode === item ? "border-primary bg-primary/10" : ""
                }`}
                aria-pressed={mode === item}
                onClick={() => {
                  setMode(item);
                  setCursor(0);
                }}
              >
                {item === "reference" ? "参考合同" : "单一反事实"}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className={buttonClass}
              disabled={cursor === 0}
              onClick={() => setCursor((value) => Math.max(0, value - 1))}
            >
              上一角色
            </button>
            <button
              type="button"
              className={buttonClass}
              disabled={cursor >= model.stages.length - 1}
              onClick={() =>
                setCursor((value) =>
                  Math.min(model.stages.length - 1, value + 1),
                )
              }
            >
              下一角色
            </button>
          </div>
        </div>

        <article className="rounded-card border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">
            合同 {cursor + 1}/{model.stages.length}
          </p>
          <h4 className="mt-1 font-semibold text-foreground">{stage?.name}</h4>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">输入角色</dt>
              <dd className="mt-1 text-foreground">{stage?.input}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">状态变化</dt>
              <dd className="mt-1 text-foreground">
                {mode === "reference" ? stage?.operation : model.fault}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">应留证据</dt>
              <dd className="mt-1 text-foreground">{stage?.output}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">即时裁决</dt>
              <dd className="mt-1 text-foreground">
                {mode === "reference"
                  ? stage?.check
                  : `“${concept}”只注入该故障后，寻找首个不再满足“${stage?.check}”的状态。`}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function ReturnUpdateTrace({ model }: { model: RlSystemsEvidenceModel }) {
  const [mode, setMode] = useState<"reference" | "fault">("reference");
  const [step, setStep] = useState(0);
  const trace = mode === "reference" ? model.referenceTrace : model.faultTrace;
  const visible = trace.slice(0, step + 1);

  function reset() {
    setMode("reference");
    setStep(0);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="rl-return-update-trace"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            回报—目标—更新轨迹
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.question}
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["reference", "fault"] as const).map((item) => (
          <button
            key={item}
            type="button"
            className={`${buttonClass} ${
              mode === item ? "border-primary bg-primary/10" : ""
            }`}
            aria-pressed={mode === item}
            onClick={() => {
              setMode(item);
              setStep(0);
            }}
          >
            {item === "reference" ? "参考更新" : "故障更新"}
          </button>
        ))}
      </div>

      <ol className="mt-4 space-y-2">
        {visible.map((item, index) => (
          <li
            key={`${item}-${index}`}
            className="flex gap-3 rounded-card border border-border bg-background p-3 text-sm"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 font-semibold text-primary">
              {index + 1}
            </span>
            <span className="text-foreground">{item}</span>
          </li>
        ))}
      </ol>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={buttonClass}
          disabled={step === 0}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
        >
          上一步
        </button>
        <button
          type="button"
          className={buttonClass}
          disabled={step >= trace.length - 1}
          onClick={() =>
            setStep((value) => Math.min(trace.length - 1, value + 1))
          }
        >
          下一步
        </button>
      </div>

      <p className="mt-4 rounded-control bg-muted px-3 py-2 text-sm text-foreground">
        当前裁决：
        {mode === "reference"
          ? `每一步都必须保持“${model.invariant}”。`
          : `首个分岔必须能单独归因到“${model.fault}”，不能同时更换环境、轨迹、目标与评估快照。`}
      </p>
    </section>
  );
}

function EvaluationGate({ model }: { model: RlSystemsEvidenceModel }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [openGates, setOpenGates] = useState<number[]>([]);
  const [artifactOpen, setArtifactOpen] = useState(false);
  const activeCase = model.cases[caseIndex] ?? model.cases[0];

  function reset() {
    setCaseIndex(0);
    setOpenGates([]);
    setArtifactOpen(false);
  }

  function toggleGate(index: number) {
    setOpenGates((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="rl-evaluation-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            异策略与多智能体评估门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            从训练回报回查到独立策略快照
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.2fr)]">
        <div className="space-y-2">
          {model.cases.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`${buttonClass} w-full ${
                caseIndex === index ? "border-primary bg-primary/10" : ""
              }`}
              aria-pressed={caseIndex === index}
              onClick={() => {
                setCaseIndex(index);
                setOpenGates([]);
                setArtifactOpen(false);
              }}
            >
              <span className="block font-semibold">{item.name}</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {item.setup}
              </span>
            </button>
          ))}

          <div className="rounded-card border border-border bg-background p-3 text-sm">
            <p className="font-semibold text-foreground">预注册预测</p>
            <p className="mt-1 text-muted-foreground">
              {activeCase?.prediction}
            </p>
            <p className="mt-2 font-semibold text-foreground">适用边界</p>
            <p className="mt-1 text-muted-foreground">{activeCase?.boundary}</p>
          </div>
        </div>

        <div className="space-y-2">
          {model.gates.map((gate, index) => {
            const open = openGates.includes(index);
            return (
              <article
                key={gate.label}
                className="rounded-card border border-border bg-background p-3"
              >
                <button
                  type="button"
                  className="min-h-11 flex w-full items-center justify-between gap-3 text-left"
                  aria-expanded={open}
                  onClick={() => toggleGate(index)}
                >
                  <span className="font-semibold text-foreground">
                    {gate.label}
                  </span>
                  <span className="text-sm text-primary">
                    {open ? "收起" : "检查"}
                  </span>
                </button>
                {open ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {gate.detail}
                  </p>
                ) : null}
              </article>
            );
          })}

          <button
            type="button"
            className={`${buttonClass} w-full`}
            onClick={() => setArtifactOpen((value) => !value)}
          >
            {artifactOpen ? "收起交付证据" : "展开交付证据"}
          </button>
          {artifactOpen ? (
            <p className="rounded-card border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">
              交付：{model.artifact}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function RlSystemsEvidenceLab({ model, view }: Props) {
  if (view === "environment-contract")
    return <EnvironmentContract model={model} />;
  if (view === "return-update-trace")
    return <ReturnUpdateTrace model={model} />;
  return <EvaluationGate model={model} />;
}
