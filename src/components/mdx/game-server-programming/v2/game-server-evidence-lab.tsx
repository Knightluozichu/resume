"use client";

import { useState } from "react";

export type GameServerEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  nodes: readonly {
    name: string;
    input: string;
    action: string;
    output: string;
    owner: string;
  }[];
  normalTrace: readonly string[];
  failureTrace: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  gates: readonly {
    label: string;
    detail: string;
  }[];
};

type Props = {
  model: GameServerEvidenceModel;
  view: "request-path" | "failure-trace" | "operational-gate";
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

function RequestPath({ model }: { model: GameServerEvidenceModel }) {
  const [nodeIndex, setNodeIndex] = useState(0);
  const node = model.nodes[nodeIndex];
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="game-server-request-path"
      aria-label={`${model.title}请求路径实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">请求与状态路径</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            沿真实对象查看输入、动作与输出
          </h3>
        </div>
        <ResetButton onReset={() => setNodeIndex(0)} />
      </div>
      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-5 grid gap-2 lg:grid-cols-5">
        {model.nodes.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setNodeIndex(index)}
            aria-pressed={nodeIndex === index}
            className={`${buttonClass} min-h-24 ${
              nodeIndex === index
                ? "border-accent bg-accent/10 text-primary"
                : index < nodeIndex
                  ? "border-success bg-success/10 text-primary"
                  : "text-secondary"
            }`}
          >
            <span className="block font-mono text-xs text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 block font-medium">{item.name}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 rounded-card border border-border bg-background p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-xs text-accent">输入</p>
          <p className="mt-1 text-sm leading-6 text-primary">{node.input}</p>
        </div>
        <div>
          <p className="text-xs text-accent">动作</p>
          <p className="mt-1 text-sm leading-6 text-primary">{node.action}</p>
        </div>
        <div>
          <p className="text-xs text-accent">输出</p>
          <p className="mt-1 text-sm leading-6 text-primary">{node.output}</p>
        </div>
        <div>
          <p className="text-xs text-accent">所有者</p>
          <p className="mt-1 text-sm leading-6 text-primary">{node.owner}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setNodeIndex((value) => Math.max(0, value - 1))}
          disabled={nodeIndex === 0}
          className={`${buttonClass} text-secondary disabled:cursor-not-allowed disabled:opacity-40`}
        >
          上一节点
        </button>
        <button
          type="button"
          onClick={() =>
            setNodeIndex((value) => Math.min(model.nodes.length - 1, value + 1))
          }
          disabled={nodeIndex === model.nodes.length - 1}
          className={`${buttonClass} text-secondary disabled:cursor-not-allowed disabled:opacity-40`}
        >
          下一节点
        </button>
      </div>
      <p className="mt-4 text-xs leading-5 text-secondary">
        本页目录坐标：{model.concepts.join("、")}
      </p>
    </section>
  );
}

function FailureTrace({ model }: { model: GameServerEvidenceModel }) {
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
      data-visual-kind="game-server-failure-trace"
      aria-label={`${model.title}故障轨迹实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">正常与单故障轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            固定输入，定位第一处状态偏离
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
                ? mode === "failure"
                  ? "border-danger bg-danger/10 text-primary"
                  : "border-accent bg-accent/10 text-primary"
                : index < stepIndex
                  ? "border-success text-primary"
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
          className={`${buttonClass} text-secondary disabled:opacity-40`}
        >
          上一步
        </button>
        <button
          type="button"
          onClick={() =>
            setStepIndex((value) => Math.min(trace.length - 1, value + 1))
          }
          disabled={stepIndex === trace.length - 1}
          className={`${buttonClass} text-secondary disabled:opacity-40`}
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

function OperationalGate({ model }: { model: GameServerEvidenceModel }) {
  const [gateState, setGateState] = useState(() => model.gates.map(() => true));
  const [artifactVisible, setArtifactVisible] = useState(false);
  const allPass = gateState.every(Boolean);
  const reset = () => {
    setGateState(model.gates.map(() => true));
    setArtifactVisible(false);
  };
  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="game-server-operational-gate"
      aria-label={`${model.title}运行发布门`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">运行与安全发布门</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            功能成功，还要验证容量、权限和恢复
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {model.gates.map((gate, index) => (
          <button
            key={gate.label}
            type="button"
            onClick={() =>
              setGateState((current) =>
                current.map((value, itemIndex) =>
                  itemIndex === index ? !value : value,
                ),
              )
            }
            aria-pressed={gateState[index]}
            className={`${buttonClass} ${
              gateState[index]
                ? "border-success bg-success/10 text-primary"
                : "border-danger bg-danger/10 text-primary"
            }`}
          >
            <span className="block font-medium">
              {gateState[index] ? "通过 · " : "阻断 · "}
              {gate.label}
            </span>
            <span className="mt-1 block text-xs leading-5">{gate.detail}</span>
          </button>
        ))}
      </div>
      <div
        className={`mt-4 rounded-card border px-4 py-3 text-sm leading-6 ${
          allPass
            ? "border-success bg-success/10 text-primary"
            : "border-danger bg-danger/10 text-primary"
        }`}
        role="status"
        aria-live="polite"
      >
        {allPass
          ? `允许发布服务：${model.invariant}`
          : `拒绝发布，并定位“${model.fault}”对应的第一项失败门。`}
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

export function GameServerEvidenceLab({ model, view }: Props) {
  if (view === "request-path") return <RequestPath model={model} />;
  if (view === "failure-trace") return <FailureTrace model={model} />;
  return <OperationalGate model={model} />;
}
