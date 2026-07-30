"use client";

import { useState } from "react";

export type GoSemanticsEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  stages: readonly {
    label: string;
    input: string;
    state: string;
    transition: string;
    observation: string;
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
  model: GoSemanticsEvidenceModel;
  view: "version-contract" | "state-trace" | "evidence-gate";
};

const controlClass =
  "min-h-11 rounded-control border border-border bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button type="button" className={controlClass} onClick={onReset}>
      重置本实验
    </button>
  );
}

function VersionContract({ model }: { model: GoSemanticsEvidenceModel }) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [track, setTrack] = useState<"first-edition" | "current">(
    "first-edition",
  );
  const stage = model.stages[stageIndex] ?? model.stages[0];

  function reset() {
    setConceptIndex(0);
    setStageIndex(0);
    setTrack("first-edition");
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="go-version-semantics-contract"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            版本—状态—观察合同
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            先选择正式目录坐标与时代，再沿输入、状态、迁移和观察逐步裁决。
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
            {(["first-edition", "current"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`${controlClass} ${track === item ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={track === item}
                onClick={() => setTrack(item)}
              >
                {item === "first-edition"
                  ? "2015 首版轨道"
                  : "当前 Go 1.26 轨道"}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {model.stages.map((item, index) => (
              <button
                key={item.label}
                type="button"
                className={`${controlClass} w-full ${stageIndex === index ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={stageIndex === index}
                onClick={() => setStageIndex(index)}
              >
                <span className="mr-2 font-mono text-xs text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <article
          className="rounded-card border border-border bg-background p-4"
          aria-live="polite"
        >
          <p className="text-xs text-muted-foreground">
            {track === "first-edition"
              ? "首版目录与官方示例仓库复现"
              : "当前规范和工具链迁移"}{" "}
            · 坐标 {conceptIndex + 1}/{model.concepts.length}
          </p>
          <h4 className="mt-1 font-semibold text-foreground">{stage?.label}</h4>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">冻结输入</dt>
              <dd className="mt-1 text-foreground">{stage?.input}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">程序状态</dt>
              <dd className="mt-1 text-foreground">{stage?.state}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">唯一迁移</dt>
              <dd className="mt-1 text-foreground">{stage?.transition}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">应见观察</dt>
              <dd className="mt-1 text-foreground">
                {track === "first-edition"
                  ? stage?.observation
                  : `${stage?.observation}；同时保存 go.mod 的 go 版本、工具链、GOOS/GOARCH 与依赖图。`}
              </dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function StateTrace({ model }: { model: GoSemanticsEvidenceModel }) {
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
      data-visual-kind="go-program-state-trace"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            基线—故障—恢复状态轨迹
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.question}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            一次只改变一个条件，显示首个状态分岔而不是生成综合评分。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(["baseline", "fault", "recovery"] as const).map((item) => (
          <button
            key={item}
            type="button"
            className={`${controlClass} ${mode === item ? "border-primary bg-primary/10" : ""}`}
            aria-pressed={mode === item}
            onClick={() => {
              setMode(item);
              setStep(0);
            }}
          >
            {item === "baseline"
              ? "参考基线"
              : item === "fault"
                ? "单一故障"
                : "同输入恢复"}
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
          className={controlClass}
          disabled={step === 0}
          onClick={() => setStep((value) => Math.max(0, value - 1))}
        >
          上一步
        </button>
        <button
          type="button"
          className={controlClass}
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
            ? `首个分岔必须能由“${model.fault}”解释；否则保留竞争性解释。`
            : "撤销单一变量后，同一源码、输入和工具链必须恢复基线，且无 goroutine、资源或依赖残留。"}
      </p>
    </section>
  );
}

function EvidenceGate({ model }: { model: GoSemanticsEvidenceModel }) {
  const [experimentIndex, setExperimentIndex] = useState(0);
  const [openGates, setOpenGates] = useState<number[]>([]);
  const active = model.experiments[experimentIndex] ?? model.experiments[0];
  const complete = openGates.length === model.gates.length;

  function reset() {
    setExperimentIndex(0);
    setOpenGates([]);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="go-release-evidence-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            语义—工程—迁移发布门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            从“能运行”回查到版本化证据
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
              className={`${controlClass} w-full ${experimentIndex === index ? "border-primary bg-primary/10" : ""}`}
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
          <article className="rounded-card border border-border bg-background p-3 text-sm">
            <p className="font-semibold">预注册预测</p>
            <p className="mt-1 text-muted-foreground">{active?.prediction}</p>
            <p className="mt-2 font-semibold">适用边界</p>
            <p className="mt-1 text-muted-foreground">{active?.boundary}</p>
          </article>
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
                    {open ? "已核对" : "待核对"}
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
          <p
            className={`rounded-card border p-3 text-sm ${
              complete
                ? "border-primary/30 bg-primary/5"
                : "border-border bg-muted"
            }`}
            aria-live="polite"
          >
            {complete
              ? `门禁闭合，可以交付：${model.artifact}`
              : `尚有 ${model.gates.length - openGates.length} 项门禁未核对，不能发布结论。`}
          </p>
        </div>
      </div>
    </section>
  );
}

export function GoSemanticsEvidenceLab({ model, view }: Props) {
  if (view === "version-contract") return <VersionContract model={model} />;
  if (view === "state-trace") return <StateTrace model={model} />;
  return <EvidenceGate model={model} />;
}
