"use client";

import { useState } from "react";

export type CompilerEvidenceModel = {
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
  gates: readonly { label: string; detail: string }[];
};

type Props = {
  model: CompilerEvidenceModel;
  view: "pipeline-contract" | "state-trace" | "verification-gate";
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

function PipelineContract({ model }: { model: CompilerEvidenceModel }) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [mode, setMode] = useState<"reference" | "fault">("reference");
  const [stageIndex, setStageIndex] = useState(0);
  const concept = model.concepts[conceptIndex] ?? model.title;
  const stage = model.stages[stageIndex] ?? model.stages[0];

  function reset() {
    setConceptIndex(0);
    setMode("reference");
    setStageIndex(0);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="compiler-pipeline-contract"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            输入—表示—翻译流水线
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            选择正式目录坐标，再比较参考编译合同与单一故障的首个状态分岔。
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
                setStageIndex(0);
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
                  setStageIndex(0);
                }}
              >
                {item === "reference" ? "参考流水线" : "单一故障"}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={buttonClass}
              disabled={stageIndex === 0}
              onClick={() => setStageIndex((value) => Math.max(0, value - 1))}
            >
              上一阶段
            </button>
            <button
              type="button"
              className={buttonClass}
              disabled={stageIndex >= model.stages.length - 1}
              onClick={() =>
                setStageIndex((value) =>
                  Math.min(model.stages.length - 1, value + 1),
                )
              }
            >
              下一阶段
            </button>
          </div>
        </div>

        <article className="rounded-card border border-border bg-background p-4">
          <p className="text-xs text-muted-foreground">
            阶段 {stageIndex + 1}/{model.stages.length}
          </p>
          <h4 className="mt-1 font-semibold text-foreground">{stage?.name}</h4>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">输入</dt>
              <dd className="mt-1 text-foreground">{stage?.input}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">变换</dt>
              <dd className="mt-1 text-foreground">
                {mode === "reference" ? stage?.operation : model.fault}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">输出证据</dt>
              <dd className="mt-1 text-foreground">{stage?.output}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">不变量检查</dt>
              <dd className="mt-1 text-foreground">
                {mode === "reference"
                  ? stage?.check
                  : `“${concept}”只注入该故障后，定位首个不再满足“${stage?.check}”的状态。`}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function StateTrace({ model }: { model: CompilerEvidenceModel }) {
  const [mode, setMode] = useState<"reference" | "fault">("reference");
  const [step, setStep] = useState(0);
  const trace = mode === "reference" ? model.referenceTrace : model.faultTrace;

  function reset() {
    setMode("reference");
    setStep(0);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="compiler-state-trace"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            状态—不变量—反事实轨迹
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
            {item === "reference" ? "参考轨迹" : "故障轨迹"}
          </button>
        ))}
      </div>

      <ol className="mt-4 space-y-2">
        {trace.slice(0, step + 1).map((item, index) => (
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
          ? `每一步都必须维持“${model.invariant}”。`
          : `首个分岔必须能归因到“${model.fault}”，不能同时更换源程序、表示、目标机和验证用例。`}
      </p>
    </section>
  );
}

function VerificationGate({ model }: { model: CompilerEvidenceModel }) {
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
      data-visual-kind="compiler-verification-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            等价性与交付验证门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            从变换结果回查到语义、代价与边界
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
                  className="flex min-h-11 w-full items-center justify-between gap-3 text-left"
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

export function CompilerEvidenceLab({ model, view }: Props) {
  if (view === "pipeline-contract") return <PipelineContract model={model} />;
  if (view === "state-trace") return <StateTrace model={model} />;
  return <VerificationGate model={model} />;
}
