"use client";

import { useState } from "react";

export type LangchainEvidenceModel = {
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
    book2024: string;
    currentV1: string;
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

type View = "version-contract" | "runnable-trace" | "release-gate";

type Props = {
  model: LangchainEvidenceModel;
  view: View;
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

function VersionContract({ model }: { model: LangchainEvidenceModel }) {
  const [track, setTrack] = useState<"book" | "current">("book");
  const [conceptIndex, setConceptIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const concept = model.concepts[conceptIndex] ?? model.title;
  const stage = model.stages[stageIndex] ?? model.stages[0];

  function reset() {
    setTrack("book");
    setConceptIndex(0);
    setStageIndex(0);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="langchain-version-contract"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            原书 2024 / 当前 v1 双轨合同
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            选择正式目录坐标和流水阶段，再切换轨道；接口名称变化不能掩盖输入、状态与输出合同。
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
            {(["book", "current"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`${buttonClass} ${
                  track === item ? "border-primary bg-primary/10" : ""
                }`}
                aria-pressed={track === item}
                onClick={() => {
                  setTrack(item);
                  setStageIndex(0);
                }}
              >
                {item === "book" ? "原书 2024 轨道" : "当前 v1 轨道"}
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
            {concept} · 阶段 {stageIndex + 1}/{model.stages.length}
          </p>
          <h4 className="mt-1 font-semibold text-foreground">{stage?.name}</h4>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">输入合同</dt>
              <dd className="mt-1 text-foreground">{stage?.input}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                {track === "book" ? "原书接口语义" : "当前接口语义"}
              </dt>
              <dd className="mt-1 text-foreground">
                {track === "book" ? stage?.book2024 : stage?.currentV1}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">输出证据</dt>
              <dd className="mt-1 text-foreground">{stage?.output}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">兼容裁决</dt>
              <dd className="mt-1 text-foreground">{stage?.check}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function RunnableTrace({ model }: { model: LangchainEvidenceModel }) {
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
      data-visual-kind="langchain-runnable-trace"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            输入—状态—事件—输出轨迹
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
            {item === "reference" ? "参考执行" : "迁移故障"}
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
          ? `执行持续满足“${model.invariant}”。`
          : `首个分岔必须能归因于“${model.fault}”，不能同时更换包版本、模型、数据与评估集。`}
      </p>
    </section>
  );
}

function ReleaseGate({ model }: { model: LangchainEvidenceModel }) {
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
      data-visual-kind="langchain-release-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            版本迁移与发布证据门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            从演示成功回查到依赖、轨迹、评估与回退
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

export function LangchainEvidenceLab({ model, view }: Props) {
  if (view === "version-contract") return <VersionContract model={model} />;
  if (view === "runnable-trace") return <RunnableTrace model={model} />;
  return <ReleaseGate model={model} />;
}
