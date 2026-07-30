"use client";

import { useState } from "react";

export type NodeDiagnosticsEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  symptom: string;
  invariant: string;
  fault: string;
  artifact: string;
  stages: readonly {
    label: string;
    hypothesis: string;
    capture: string;
    identity: string;
    falsifier: string;
  }[];
  cases: readonly {
    name: string;
    input: string;
    historical: string;
    current: string;
    boundary: string;
  }[];
  baselineTrace: readonly string[];
  faultTrace: readonly string[];
  recoveryTrace: readonly string[];
  gates: readonly { label: string; detail: string }[];
};

type Props = {
  model: NodeDiagnosticsEvidenceModel;
  view: "hypothesis-ladder" | "artifact-triangulation" | "migration-gate";
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

function HypothesisLadder({ model }: { model: NodeDiagnosticsEvidenceModel }) {
  const [coordinateIndex, setCoordinateIndex] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [track, setTrack] = useState<"node8" | "current">("node8");
  const stage = model.stages[stageIndex] ?? model.stages[0];

  function reset() {
    setCoordinateIndex(0);
    setStageIndex(0);
    setTrack("node8");
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="node-diagnostics-hypothesis-ladder"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            症状—假设—证据阶梯
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            从可复现症状出发，逐层缩小到能被原始工件推翻的假设。
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
              value={coordinateIndex}
              onChange={(event) => {
                setCoordinateIndex(Number(event.target.value));
                setStageIndex(0);
              }}
            >
              {model.concepts.map((concept, index) => (
                <option key={`${concept}-${index}`} value={index}>
                  {concept}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["node8", "current"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`${controlClass} ${track === item ? "border-primary bg-primary/10" : ""}`}
                aria-pressed={track === item}
                onClick={() => setTrack(item)}
              >
                {item === "node8" ? "Node 8.9.4 原作轨道" : "当前 Node 轨道"}
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
            {track === "node8" ? "作者原仓库历史复现" : "当前官方能力迁移"} ·
            坐标 {coordinateIndex + 1}/{model.concepts.length}
          </p>
          <h4 className="mt-1 font-semibold text-foreground">{stage?.label}</h4>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">待证伪假设</dt>
              <dd className="mt-1 text-foreground">{stage?.hypothesis}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">采集工件</dt>
              <dd className="mt-1 text-foreground">{stage?.capture}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">身份标签</dt>
              <dd className="mt-1 text-foreground">
                {track === "node8"
                  ? stage?.identity
                  : `${stage?.identity}；重新记录当前Node、V8、平台、探针和配置版本。`}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">推翻条件</dt>
              <dd className="mt-1 text-foreground">{stage?.falsifier}</dd>
            </div>
          </dl>
        </article>
      </div>
    </section>
  );
}

function ArtifactTriangulation({
  model,
}: {
  model: NodeDiagnosticsEvidenceModel;
}) {
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
      data-visual-kind="node-diagnostics-artifact-triangulation"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            指标—剖析—事件三角校验
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.question}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            单一图表只能提示方向；工件身份与时间窗口对齐后才能裁决。
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
                ? "单故障"
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
            ? `首个分岔只能归因到“${model.fault}”，否则继续保留竞争性解释。`
            : "撤销单一变量后，同一流量与数据必须回到基线且工件身份连续。"}
      </p>
    </section>
  );
}

function MigrationGate({ model }: { model: NodeDiagnosticsEvidenceModel }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [openGates, setOpenGates] = useState<number[]>([]);
  const active = model.cases[caseIndex] ?? model.cases[0];

  function reset() {
    setCaseIndex(0);
    setOpenGates([]);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="node-diagnostics-migration-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            历史工具—当前能力迁移门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            先保留原作身份，再决定复现、替换或停止
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          {model.cases.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={`${controlClass} w-full ${caseIndex === index ? "border-primary bg-primary/10" : ""}`}
              aria-pressed={caseIndex === index}
              onClick={() => {
                setCaseIndex(index);
                setOpenGates([]);
              }}
            >
              <span className="block font-semibold">{item.name}</span>
              <span className="mt-1 block text-xs text-muted-foreground">
                {item.input}
              </span>
            </button>
          ))}
          <article
            className="rounded-card border border-border bg-background p-3 text-sm"
            aria-live="polite"
          >
            <p className="font-semibold">2018 原作轨道</p>
            <p className="mt-1 text-muted-foreground">{active?.historical}</p>
            <p className="mt-2 font-semibold">当前迁移轨道</p>
            <p className="mt-1 text-muted-foreground">{active?.current}</p>
            <p className="mt-2 font-semibold">不可跨越边界</p>
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

export function NodeDiagnosticsEvidenceLab({ model, view }: Props) {
  if (view === "hypothesis-ladder") return <HypothesisLadder model={model} />;
  if (view === "artifact-triangulation")
    return <ArtifactTriangulation model={model} />;
  return <MigrationGate model={model} />;
}
