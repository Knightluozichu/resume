"use client";

import { useState, type CSSProperties } from "react";

export type CssSecretsEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  visualKind:
    | "cascade"
    | "background"
    | "shape"
    | "effect"
    | "typography"
    | "ux"
    | "layout"
    | "motion";
  recipes: readonly {
    name: string;
    declaration: string;
    fallback: string;
    explanation: string;
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

type CssSecretsEvidenceLabProps = {
  model: CssSecretsEvidenceModel;
  view: "render-probe" | "cascade-trace" | "release-gate";
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

function previewStyle(
  kind: CssSecretsEvidenceModel["visualKind"],
  value: number,
) {
  const ratio = value / 100;
  const base: CSSProperties = {
    transition: "none",
  };
  if (kind === "background") {
    return {
      ...base,
      backgroundImage: `repeating-linear-gradient(135deg, rgba(6, 182, 212, 0.9) 0 ${8 + ratio * 18}px, rgba(124, 58, 237, 0.72) ${8 + ratio * 18}px ${18 + ratio * 32}px)`,
      border: `${2 + ratio * 8}px solid rgba(255, 255, 255, 0.48)`,
      backgroundClip: "padding-box",
    };
  }
  if (kind === "shape") {
    const cut = 6 + ratio * 24;
    return {
      ...base,
      clipPath: `polygon(${cut}% 0, 100% 0, 100% ${100 - cut}%, ${100 - cut}% 100%, 0 100%, 0 ${cut}%)`,
      borderRadius: `${ratio * 50}% / ${20 + ratio * 30}%`,
      background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
    };
  }
  if (kind === "effect") {
    return {
      ...base,
      background: "rgba(15, 23, 42, 0.68)",
      boxShadow: `${8 + ratio * 18}px ${6 + ratio * 16}px ${10 + ratio * 30}px rgba(2, 6, 23, 0.48)`,
      filter: `saturate(${0.65 + ratio * 1.1}) blur(${ratio * 1.2}px)`,
      backdropFilter: `blur(${4 + ratio * 12}px)`,
    };
  }
  if (kind === "typography") {
    return {
      ...base,
      textDecorationLine: "underline",
      textDecorationColor: "#06b6d4",
      textDecorationThickness: `${1 + ratio * 5}px`,
      textUnderlineOffset: `${2 + ratio * 8}px`,
      letterSpacing: `${ratio * 0.08}em`,
      lineHeight: 1.3 + ratio * 0.7,
    };
  }
  if (kind === "ux") {
    return {
      ...base,
      padding: `${8 + ratio * 18}px ${12 + ratio * 28}px`,
      outline: `${2 + ratio * 3}px solid rgba(6, 182, 212, 0.75)`,
      outlineOffset: `${2 + ratio * 8}px`,
      cursor: "pointer",
      background: "linear-gradient(135deg, #0f766e, #6d28d9)",
    };
  }
  if (kind === "layout") {
    return {
      ...base,
      width: `${48 + ratio * 48}%`,
      minWidth: "12rem",
      marginInline: "auto",
      padding: `${12 + ratio * 20}px`,
      background: "linear-gradient(135deg, #164e63, #4c1d95)",
    };
  }
  if (kind === "motion") {
    return {
      ...base,
      transform: `translateX(${(ratio - 0.5) * 150}px) rotate(${(ratio - 0.5) * 80}deg)`,
      borderRadius: "999px",
      background: "linear-gradient(135deg, #06b6d4, #7c3aed)",
    };
  }
  return {
    ...base,
    background: `linear-gradient(135deg, rgba(6, 182, 212, ${0.3 + ratio * 0.6}), rgba(124, 58, 237, ${0.3 + ratio * 0.6}))`,
    borderRadius: `${4 + ratio * 28}px`,
    outline: `${1 + ratio * 4}px solid rgba(255, 255, 255, 0.38)`,
  };
}

function RenderProbe({ model }: { model: CssSecretsEvidenceModel }) {
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [intensity, setIntensity] = useState(50);
  const recipe = model.recipes[recipeIndex];
  const reset = () => {
    setRecipeIndex(0);
    setIntensity(50);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="css-secrets-render-probe"
      aria-label={`${model.title}CSS渲染探针`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">声明与渲染探针</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            改一个量，观察真实绘制结果
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {model.recipes.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setRecipeIndex(index)}
            aria-pressed={recipeIndex === index}
            className={`${buttonClass} ${
              recipeIndex === index
                ? "border-accent bg-accent/10 text-primary"
                : "text-secondary"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-card border border-border bg-background p-4">
          <label
            className="text-xs font-medium text-accent"
            htmlFor={`${model.unitId}-css-value`}
          >
            单一控制量：{intensity}
          </label>
          <input
            id={`${model.unitId}-css-value`}
            type="range"
            min="0"
            max="100"
            step="10"
            value={intensity}
            onChange={(event) => setIntensity(Number(event.target.value))}
            className="mt-3 w-full accent-[var(--accent)]"
          />
          <code className="mt-4 block overflow-x-auto rounded-control border border-border px-3 py-3 text-xs leading-5 text-primary">
            {recipe.declaration}
          </code>
          <p className="mt-3 text-xs leading-5 text-secondary">
            基线：{recipe.fallback}
          </p>
          <p className="mt-2 text-xs leading-5 text-secondary">
            {recipe.explanation}
          </p>
        </div>

        <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-card border border-border bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.28),transparent_42%),linear-gradient(135deg,#111827,#020617)] p-8">
          <div
            className="flex min-h-32 min-w-48 items-center justify-center px-6 py-5 text-center text-base font-semibold text-white"
            style={previewStyle(model.visualKind, intensity)}
          >
            {recipe.name}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-secondary">
        本页目录坐标：{model.concepts.join("、")}
      </p>
    </section>
  );
}

function CascadeTrace({ model }: { model: CssSecretsEvidenceModel }) {
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
      data-visual-kind="css-secrets-cascade-trace"
      aria-label={`${model.title}CSS值处理轨迹`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">CSS值处理轨迹</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从声明追到实际绘制
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
          反例轨迹
        </button>
      </div>

      <ol className="mt-5 grid gap-2 lg:grid-cols-5">
        {trace.map((item, index) => (
          <li
            key={`${mode}-${index}`}
            className={`min-h-32 rounded-card border px-3 py-3 text-xs leading-5 ${
              index === stepIndex
                ? mode === "failure"
                  ? "border-danger bg-danger/10 text-primary"
                  : "border-accent bg-accent/10 text-primary"
                : index < stepIndex
                  ? "border-success bg-success/10 text-primary"
                  : "border-border text-secondary"
            }`}
          >
            <span className="block font-mono text-accent">
              {["声明", "层叠", "计算", "使用", "绘制"][index]}
            </span>
            <span className="mt-2 block">{item}</span>
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
          上一阶段
        </button>
        <button
          type="button"
          onClick={() =>
            setStepIndex((value) => Math.min(trace.length - 1, value + 1))
          }
          disabled={stepIndex === trace.length - 1}
          className={`${buttonClass} text-secondary disabled:cursor-not-allowed disabled:opacity-40`}
        >
          下一阶段
        </button>
      </div>

      <p className="mt-4 rounded-card border border-border bg-background px-4 py-3 text-sm leading-6 text-primary">
        必须保持：{model.invariant}
      </p>
    </section>
  );
}

function ReleaseGate({ model }: { model: CssSecretsEvidenceModel }) {
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
      data-visual-kind="css-secrets-release-gate"
      aria-label={`${model.title}CSS发布门`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">渐进增强发布门</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            好看的技巧也要有语义、回退与边界
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
          ? `允许提交样式：${model.invariant}`
          : `拒绝提交，并定位“${model.fault}”对应的第一项失败门。`}
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

export function CssSecretsEvidenceLab({
  model,
  view,
}: CssSecretsEvidenceLabProps) {
  if (view === "render-probe") return <RenderProbe model={model} />;
  if (view === "cascade-trace") return <CascadeTrace model={model} />;
  return <ReleaseGate model={model} />;
}
