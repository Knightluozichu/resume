"use client";

import { useState } from "react";

export type TextbookEvidenceModel = {
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
  model: TextbookEvidenceModel;
  view: "dependency-map" | "computation-trace" | "evidence-gate";
};

const buttonClass =
  "rounded-control border border-border bg-background px-3 py-2 text-left text-sm transition-colors hover:border-primary/60 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button type="button" className={buttonClass} onClick={onReset}>
      重置本实验
    </button>
  );
}

function DependencyMap({ model }: { model: TextbookEvidenceModel }) {
  const [conceptIndex, setConceptIndex] = useState(0);
  const [mode, setMode] = useState<"reference" | "counterexample">("reference");
  const [revealed, setRevealed] = useState(false);
  const concept = model.concepts[conceptIndex] ?? model.title;

  function reset() {
    setConceptIndex(0);
    setMode("reference");
    setRevealed(false);
  }

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-card p-4 shadow-sm sm:p-5"
      data-visual-kind="textbook-dependency-map"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            依赖与状态地图
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            {model.title}
          </h3>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            选择原版坐标，再比较参考合同与单一反例怎样改变同一条计算链。
          </p>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            原版目录坐标
            <select
              className="mt-1 min-h-11 w-full rounded-control border border-border bg-background px-3 py-2 text-sm"
              value={conceptIndex}
              onChange={(event) => {
                setConceptIndex(Number(event.target.value));
                setRevealed(false);
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
                  setRevealed(false);
                }}
              >
                {item === "reference" ? "参考合同" : "单一反例"}
              </button>
            ))}
          </div>

          <button
            type="button"
            className={buttonClass}
            onClick={() => setRevealed((value) => !value)}
          >
            {revealed ? "隐藏预测裁决" : "展开预测裁决"}
          </button>
        </div>

        <div className="space-y-2">
          {model.stages.map((stage, index) => (
            <article
              key={stage.name}
              className="rounded-card border border-border bg-background p-3"
            >
              <div className="flex items-center gap-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </span>
                <h4 className="font-semibold text-foreground">{stage.name}</h4>
              </div>
              <dl className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-muted-foreground">输入</dt>
                  <dd className="text-foreground">{stage.input}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground">操作与输出</dt>
                  <dd className="text-foreground">
                    {stage.operation} → {stage.output}
                  </dd>
                </div>
              </dl>
              {revealed ? (
                <p className="mt-2 rounded-control bg-muted px-3 py-2 text-sm text-foreground">
                  {mode === "reference"
                    ? `“${concept}”在本阶段应满足：${stage.check}`
                    : `“${concept}”只注入“${model.fault}”，检查首个不再满足：${stage.check}`}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComputationTrace({ model }: { model: TextbookEvidenceModel }) {
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
      data-visual-kind="textbook-computation-trace"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            计算与反事实轨迹
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
          ? `轨迹必须持续满足“${model.invariant}”。`
          : `首个分岔必须能归因到“${model.fault}”，不能同时改数据、模型和评估口径。`}
      </p>
    </section>
  );
}

function EvidenceGate({ model }: { model: TextbookEvidenceModel }) {
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
      data-visual-kind="textbook-evidence-gate"
      data-unit-id={model.unitId}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            独立证据门
          </p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">
            从结论回查到数据、计算与边界
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
            <p className="font-semibold text-foreground">先写预测</p>
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
                  className="flex w-full items-center justify-between gap-3 text-left"
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
            {artifactOpen ? "收起交付包" : "展开交付包"}
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

export function TextbookEvidenceLab({ model, view }: Props) {
  if (view === "dependency-map") return <DependencyMap model={model} />;
  if (view === "computation-trace") return <ComputationTrace model={model} />;
  return <EvidenceGate model={model} />;
}
