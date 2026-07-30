"use client";

import { useState } from "react";

export type AndroidArchitectureEvidenceModel = {
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
    owner: string;
    event: string;
    output: string;
    check: string;
  }[];
  cases: readonly {
    name: string;
    setup: string;
    historical: string;
    current: string;
    boundary: string;
  }[];
  referenceTrace: readonly string[];
  faultTrace: readonly string[];
  recoveryTrace: readonly string[];
  gates: readonly { label: string; detail: string }[];
};

type Props = {
  model: AndroidArchitectureEvidenceModel;
  view: "responsibility-contract" | "lifecycle-trace" | "migration-gate";
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

function ResponsibilityContract({
  model,
}: {
  model: AndroidArchitectureEvidenceModel;
}) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [mode, setMode] = useState<"reference" | "counterexample">("reference");
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
      data-visual-kind="android-responsibility-contract"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            责任—事件—状态合同
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            选择正式目录坐标，逐步核对输入、唯一状态所有者、事件方向和可观察输出。
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
            {(["reference", "counterexample"] as const).map((item) => (
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
                {item === "reference" ? "参考合同" : "单一反例"}
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

        <article
          className="rounded-card border border-border bg-background p-4"
          aria-live="polite"
        >
          <p className="text-xs text-muted-foreground">
            阶段 {stageIndex + 1}/{model.stages.length}
          </p>
          <h4 className="mt-1 font-semibold text-foreground">{stage?.name}</h4>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">输入与约束</dt>
              <dd className="mt-1 text-foreground">{stage?.input}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">唯一状态所有者</dt>
              <dd className="mt-1 text-foreground">{stage?.owner}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">事件与数据方向</dt>
              <dd className="mt-1 text-foreground">
                {mode === "reference" ? stage?.event : model.fault}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">输出与裁决</dt>
              <dd className="mt-1 text-foreground">
                {mode === "reference"
                  ? `${stage?.output}；${stage?.check}`
                  : `只对“${concept}”注入反例，寻找首个不再满足“${stage?.check}”的状态。`}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function LifecycleTrace({
  model,
}: {
  model: AndroidArchitectureEvidenceModel;
}) {
  const [mode, setMode] = useState<"reference" | "fault" | "recovery">(
    "reference",
  );
  const [step, setStep] = useState(0);
  const trace =
    mode === "reference"
      ? model.referenceTrace
      : mode === "fault"
        ? model.faultTrace
        : model.recoveryTrace;

  function reset() {
    setMode("reference");
    setStep(0);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="android-lifecycle-trace"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            生命周期与异步回放
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.question}
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["reference", "fault", "recovery"] as const).map((item) => (
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
            {item === "reference"
              ? "参考轨迹"
              : item === "fault"
                ? "故障轨迹"
                : "恢复轨迹"}
          </button>
        ))}
      </div>

      <ol className="mt-4 space-y-2" aria-live="polite">
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
          ? `轨迹必须持续满足“${model.invariant}”。`
          : mode === "fault"
            ? `首个分岔必须只归因到“${model.fault}”。`
            : "撤销故障后，状态、订阅、界面与副作用都必须回到声明的恢复点。"}
      </p>
    </section>
  );
}

function MigrationGate({ model }: { model: AndroidArchitectureEvidenceModel }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [track, setTrack] = useState<"historical" | "current">("historical");
  const [openGates, setOpenGates] = useState<number[]>([]);
  const [artifactOpen, setArtifactOpen] = useState(false);
  const activeCase = model.cases[caseIndex] ?? model.cases[0];

  function reset() {
    setCaseIndex(0);
    setTrack("historical");
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
      data-visual-kind="android-migration-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            2018 历史轨道—当前迁移门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            保留原作语境，再决定哪些边界需要迁移
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.2fr)]">
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
                setTrack("historical");
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

          <div className="grid grid-cols-2 gap-2 pt-1">
            {(["historical", "current"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`${buttonClass} ${
                  track === item ? "border-primary bg-primary/10" : ""
                }`}
                aria-pressed={track === item}
                onClick={() => setTrack(item)}
              >
                {item === "historical" ? "2018 原作轨道" : "当前官方轨道"}
              </button>
            ))}
          </div>

          <div
            className="rounded-card border border-border bg-background p-3 text-sm"
            aria-live="polite"
          >
            <p className="font-semibold text-foreground">
              {track === "historical" ? "历史结论" : "当前迁移检查"}
            </p>
            <p className="mt-1 text-muted-foreground">
              {track === "historical"
                ? activeCase?.historical
                : activeCase?.current}
            </p>
            <p className="mt-2 font-semibold text-foreground">不可越过的边界</p>
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

export function AndroidArchitectureEvidenceLab({ model, view }: Props) {
  if (view === "responsibility-contract")
    return <ResponsibilityContract model={model} />;
  if (view === "lifecycle-trace") return <LifecycleTrace model={model} />;
  return <MigrationGate model={model} />;
}
