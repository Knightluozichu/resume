"use client";

import { useState } from "react";

export type KernelEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  stages: readonly {
    label: string;
    object: string;
    control: string;
    signal: string;
    rollback: string;
  }[];
  experiments: readonly {
    name: string;
    setup: string;
    prediction: string;
    boundary: string;
  }[];
  baselineTrace: readonly string[];
  faultTrace: readonly string[];
  recoveryTrace: readonly string[];
  gates: readonly { label: string; detail: string }[];
};

type Props = {
  model: KernelEvidenceModel;
  view: "object-contract" | "signal-trace" | "safety-gate";
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

function ObjectContract({ model }: { model: KernelEvidenceModel }) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [track, setTrack] = useState<"historical" | "current">("historical");
  const stage = model.stages[stageIndex] ?? model.stages[0];

  function reset() {
    setConceptIndex(0);
    setStageIndex(0);
    setTrack("historical");
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="kernel-object-contract"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            对象—控制—信号合同
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            先锁定内核对象和版本，再解释控制写入怎样改变可观测信号。
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
            {(["historical", "current"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`${buttonClass} ${track === item ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={track === item}
                onClick={() => setTrack(item)}
              >
                {item === "historical" ? "原书历史轨道" : "当前内核轨道"}
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
            {track === "historical" ? "2.6.18—3.0 历史复现" : "当前接口迁移"} ·
            阶段 {stageIndex + 1}/{model.stages.length}
          </p>
          <h4 className="mt-1 font-semibold text-foreground">{stage?.label}</h4>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">内核对象</dt>
              <dd className="mt-1 text-foreground">{stage?.object}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">控制写入</dt>
              <dd className="mt-1 text-foreground">{stage?.control}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">应见信号</dt>
              <dd className="mt-1 text-foreground">{stage?.signal}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">撤销与边界</dt>
              <dd className="mt-1 text-foreground">
                {track === "historical"
                  ? stage?.rollback
                  : `${stage?.rollback}；迁移前重新核对当前内核文档与发行版配置。`}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function SignalTrace({ model }: { model: KernelEvidenceModel }) {
  const [mode, setMode] = useState<"baseline" | "fault" | "recovery">(
    "baseline",
  );
  const [step, setStep] = useState(0);
  const trace =
    mode === "baseline"
      ? model.baselineTrace
      : mode === "fault"
        ? model.faultTrace
        : model.recoveryTrace;

  function reset() {
    setMode("baseline");
    setStep(0);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="kernel-signal-trace"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            基线—首错—恢复轨迹
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.question}
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {(["baseline", "fault", "recovery"] as const).map((item) => (
          <button
            key={item}
            type="button"
            className={`${buttonClass} ${mode === item ? "border-primary bg-primary/10" : ""}`}
            aria-pressed={mode === item}
            onClick={() => {
              setMode(item);
              setStep(0);
            }}
          >
            {item === "baseline"
              ? "基线"
              : item === "fault"
                ? "单故障"
                : "恢复"}
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
            <span>{item}</span>
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
      <p className="mt-4 rounded-control bg-muted px-3 py-2 text-sm">
        裁决：
        {mode === "baseline"
          ? model.invariant
          : mode === "fault"
            ? `首个分岔只能归因到“${model.fault}”。`
            : "撤销控制或恢复快照后，同输入必须回到基线且无残留对象。"}
      </p>
    </section>
  );
}

function SafetyGate({ model }: { model: KernelEvidenceModel }) {
  const [experimentIndex, setExperimentIndex] = useState(0);
  const [openGates, setOpenGates] = useState<number[]>([]);
  const active = model.experiments[experimentIndex] ?? model.experiments[0];

  function reset() {
    setExperimentIndex(0);
    setOpenGates([]);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="kernel-safety-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            破坏性操作安全门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            从命令成功回查到对象、信号与可恢复性
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          {model.experiments.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`${buttonClass} w-full ${experimentIndex === index ? "border-primary bg-primary/10" : ""}`}
              aria-pressed={experimentIndex === index}
              onClick={() => {
                setExperimentIndex(index);
                setOpenGates([]);
              }}
            >
              <span className="block font-semibold">{item.name}</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {item.setup}
              </span>
            </button>
          ))}
          <div className="rounded-card border border-border bg-background p-3 text-sm">
            <p className="font-semibold">预注册预测</p>
            <p className="mt-1 text-muted-foreground">{active?.prediction}</p>
            <p className="mt-2 font-semibold">适用边界</p>
            <p className="mt-1 text-muted-foreground">{active?.boundary}</p>
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
                  onClick={() =>
                    setOpenGates((current) =>
                      current.includes(index)
                        ? current.filter((item) => item !== index)
                        : [...current, index],
                    )
                  }
                >
                  <span className="font-semibold">{gate.label}</span>
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
          <p className="rounded-card border border-primary/30 bg-primary/5 p-3 text-sm">
            最终交付：{model.artifact}
          </p>
        </div>
      </div>
    </section>
  );
}

export function KernelEvidenceLab({ model, view }: Props) {
  if (view === "object-contract") return <ObjectContract model={model} />;
  if (view === "signal-trace") return <SignalTrace model={model} />;
  return <SafetyGate model={model} />;
}
