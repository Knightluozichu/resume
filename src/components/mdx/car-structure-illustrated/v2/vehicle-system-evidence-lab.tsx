"use client";

import { useState } from "react";

export type VehicleSystemEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  nodeCards: readonly {
    name: string;
    input: string;
    transform: string;
    output: string;
    boundary: string;
  }[];
  normalTrace: readonly string[];
  failureTrace: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  boundaries: readonly {
    label: string;
    detail: string;
  }[];
};

type VehicleSystemEvidenceLabProps = {
  model: VehicleSystemEvidenceModel;
  view: "topology" | "path-trace" | "boundary-probe";
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

function TopologyLab({ model }: { model: VehicleSystemEvidenceModel }) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const current = model.nodeCards[nodeIndex];

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="vehicle-system-topology"
      aria-label={`${model.title}系统拓扑实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">系统拓扑</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            选择节点，核对输入到边界
          </h3>
        </div>
        <ResetButton onReset={() => setNodeIndex(0)} />
      </div>

      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {model.nodeCards.map((node, index) => (
          <div key={node.name} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setNodeIndex(index)}
              aria-pressed={nodeIndex === index}
              className={`${buttonClass} ${
                nodeIndex === index
                  ? "border-accent bg-accent/10 text-primary"
                  : "text-secondary"
              }`}
            >
              {node.name}
            </button>
            {index < model.nodeCards.length - 1 && (
              <span aria-hidden="true" className="text-secondary">
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {[
          ["输入", current.input],
          ["转换", current.transform],
          ["输出", current.output],
          ["边界", current.boundary],
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
        正式坐标：{model.concepts.join("、")}
      </p>
    </section>
  );
}

function PathTraceLab({ model }: { model: VehicleSystemEvidenceModel }) {
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
      data-visual-kind="vehicle-system-path-trace"
      aria-label={`${model.title}系统路径实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">系统路径</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            用相同工况比较正常与故障
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
          正常路径
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
          故障路径
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
        系统不变量：{model.invariant}
      </p>
    </section>
  );
}

function BoundaryProbe({ model }: { model: VehicleSystemEvidenceModel }) {
  const [boundaryIndex, setBoundaryIndex] = useState<number | null>(null);
  const [artifactVisible, setArtifactVisible] = useState(false);
  const reset = () => {
    setBoundaryIndex(null);
    setArtifactVisible(false);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="vehicle-system-boundary-probe"
      aria-label={`${model.title}系统边界与证据实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">系统边界</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            一次只打开一个边界风险
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {model.boundaries.map((boundary, index) => (
          <button
            key={boundary.label}
            type="button"
            onClick={() =>
              setBoundaryIndex((current) => (current === index ? null : index))
            }
            aria-pressed={boundaryIndex === index}
            className={`${buttonClass} ${
              boundaryIndex === index
                ? "border-danger bg-danger/10 text-primary"
                : "text-secondary"
            }`}
          >
            <span className="block font-medium">{boundary.label}</span>
            <span className="mt-1 block text-xs leading-5">
              {boundary.detail}
            </span>
          </button>
        ))}
      </div>

      <div
        className={`mt-4 rounded-card border px-4 py-3 text-sm leading-6 ${
          boundaryIndex === null
            ? "border-success bg-success/10 text-primary"
            : "border-danger bg-danger/10 text-primary"
        }`}
        role="status"
        aria-live="polite"
      >
        {boundaryIndex === null
          ? `当前证据满足基线：${model.invariant}`
          : `暂停结论并处理${model.boundaries[boundaryIndex].label}；“${model.fault}”不能越过该门。`}
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

export function VehicleSystemEvidenceLab({
  model,
  view,
}: VehicleSystemEvidenceLabProps) {
  if (view === "topology") return <TopologyLab model={model} />;
  if (view === "path-trace") return <PathTraceLab model={model} />;
  return <BoundaryProbe model={model} />;
}
