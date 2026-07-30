"use client";

import { useState } from "react";

export type UnityAnimationEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  clips: readonly {
    name: string;
    duration: string;
    property: string;
    from: string;
    to: string;
    clock: string;
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

type UnityAnimationEvidenceLabProps = {
  model: UnityAnimationEvidenceModel;
  view: "timeline-sampler" | "state-trace" | "runtime-gate";
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

function TimelineSampler({
  model,
}: {
  model: UnityAnimationEvidenceModel;
}) {
  const [clipIndex, setClipIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const clip = model.clips[clipIndex];
  const progress = frameIndex / 4;
  const changeClip = (index: number) => {
    setClipIndex(index);
    setFrameIndex(0);
  };
  const reset = () => {
    setClipIndex(0);
    setFrameIndex(0);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="unity-animation-timeline-sampler"
      aria-label={`${model.title}时间采样实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">时间采样</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            同一剪辑，用明确时钟读取属性
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {model.clips.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => changeClip(index)}
            aria-pressed={clipIndex === index}
            className={`${buttonClass} ${
              clipIndex === index
                ? "border-accent bg-accent/10 text-primary"
                : "text-secondary"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-5 rounded-card border border-border bg-background p-4">
        <div className="flex flex-wrap justify-between gap-2 text-xs text-secondary">
          <span>0.00</span>
          <span>
            {clip.duration} · {clip.clock}
          </span>
        </div>
        <div className="relative mt-3 h-3 rounded-full bg-border">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-accent"
            style={{ width: `${progress * 100}%` }}
          />
          <div
            className="absolute top-1/2 h-6 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
            style={{ left: `${progress * 100}%` }}
          />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs text-accent">动画属性</p>
            <p className="mt-1 text-sm text-primary">{clip.property}</p>
          </div>
          <div>
            <p className="text-xs text-accent">端点</p>
            <p className="mt-1 text-sm text-primary">
              {clip.from} → {clip.to}
            </p>
          </div>
          <div>
            <p className="text-xs text-accent">当前采样</p>
            <p className="mt-1 font-mono text-sm text-primary">
              t = {progress.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setFrameIndex((value) => Math.max(0, value - 1))}
          disabled={frameIndex === 0}
          className={`${buttonClass} text-secondary disabled:cursor-not-allowed disabled:opacity-40`}
        >
          上一采样点
        </button>
        <button
          type="button"
          onClick={() => setFrameIndex((value) => Math.min(4, value + 1))}
          disabled={frameIndex === 4}
          className={`${buttonClass} text-secondary disabled:cursor-not-allowed disabled:opacity-40`}
        >
          下一采样点
        </button>
      </div>

      <p className="mt-4 text-xs leading-5 text-secondary">
        本页目录坐标：{model.concepts.join("、")}
      </p>
    </section>
  );
}

function StateTrace({ model }: { model: UnityAnimationEvidenceModel }) {
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
      data-visual-kind="unity-animation-state-trace"
      aria-label={`${model.title}状态轨迹实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">状态与过渡</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            固定输入，只改变一项动画条件
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
        必须保持：{model.invariant}
      </p>
    </section>
  );
}

function RuntimeGate({ model }: { model: UnityAnimationEvidenceModel }) {
  const [gateState, setGateState] = useState(() =>
    model.gates.map(() => true),
  );
  const [artifactVisible, setArtifactVisible] = useState(false);
  const allPass = gateState.every(Boolean);
  const reset = () => {
    setGateState(model.gates.map(() => true));
    setArtifactVisible(false);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="unity-animation-runtime-gate"
      aria-label={`${model.title}运行时验收门`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">运行时验收门</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            预览成立，还要通过运行时证据
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
          ? `允许提交动画资产：${model.invariant}`
          : `拒绝提交并定位“${model.fault}”对应的第一项失败门。`}
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

export function UnityAnimationEvidenceLab({
  model,
  view,
}: UnityAnimationEvidenceLabProps) {
  if (view === "timeline-sampler") return <TimelineSampler model={model} />;
  if (view === "state-trace") return <StateTrace model={model} />;
  return <RuntimeGate model={model} />;
}
