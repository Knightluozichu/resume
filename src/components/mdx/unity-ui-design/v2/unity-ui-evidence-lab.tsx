"use client";

import { useState } from "react";

export type UnityUiEvidenceModel = {
  unitId: string;
  title: string;
  question: string;
  concepts: readonly string[];
  viewports: readonly {
    name: string;
    width: number;
    height: number;
    safeInset: number;
    scaleNote: string;
  }[];
  panels: readonly {
    name: string;
    anchorMin: readonly [number, number];
    anchorMax: readonly [number, number];
    pivot: readonly [number, number];
    offset: string;
    owner: string;
  }[];
  normalRoute: readonly string[];
  failureRoute: readonly string[];
  invariant: string;
  fault: string;
  artifact: string;
  gates: readonly {
    label: string;
    detail: string;
  }[];
};

type UnityUiEvidenceLabProps = {
  model: UnityUiEvidenceModel;
  view: "layout-probe" | "event-route" | "release-gate";
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

function LayoutProbe({ model }: { model: UnityUiEvidenceModel }) {
  const [viewportIndex, setViewportIndex] = useState(0);
  const [panelIndex, setPanelIndex] = useState(0);
  const viewport = model.viewports[viewportIndex];
  const panel = model.panels[panelIndex];
  const anchorWidth = (panel.anchorMax[0] - panel.anchorMin[0]) * 100;
  const anchorHeight = (panel.anchorMax[1] - panel.anchorMin[1]) * 100;
  const stretchesX = anchorWidth > 0;
  const stretchesY = anchorHeight > 0;
  const panelStyle = {
    left: stretchesX
      ? `${panel.anchorMin[0] * 100 + 4}%`
      : `calc(${panel.anchorMin[0] * 100}% - 48px)`,
    top: stretchesY
      ? `${(1 - panel.anchorMax[1]) * 100 + 4}%`
      : `calc(${(1 - panel.anchorMin[1]) * 100}% - 24px)`,
    width: stretchesX ? `${Math.max(12, anchorWidth - 8)}%` : "96px",
    height: stretchesY ? `${Math.max(12, anchorHeight - 8)}%` : "48px",
  };
  const reset = () => {
    setViewportIndex(0);
    setPanelIndex(0);
  };

  return (
    <section
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-6"
      data-visual-kind="unity-ui-layout-probe"
      aria-label={`${model.title}画布锚点与布局探针`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">画布与锚点探针</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            固定布局合同，再切换分辨率
          </h3>
        </div>
        <ResetButton onReset={reset} />
      </div>

      <p className="mt-3 text-sm leading-6 text-secondary">{model.question}</p>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-accent">目标视口</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {model.viewports.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setViewportIndex(index)}
                  aria-pressed={viewportIndex === index}
                  className={`${buttonClass} ${
                    viewportIndex === index
                      ? "border-accent bg-accent/10 text-primary"
                      : "text-secondary"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-accent">
              被测 RectTransform
            </p>
            <div className="mt-2 grid gap-2">
              {model.panels.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setPanelIndex(index)}
                  aria-pressed={panelIndex === index}
                  className={`${buttonClass} ${
                    panelIndex === index
                      ? "border-accent bg-accent/10 text-primary"
                      : "text-secondary"
                  }`}
                >
                  <span className="block font-medium">{item.name}</span>
                  <span className="mt-1 block text-xs">{item.owner}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-card border border-border bg-background p-4">
          <div className="flex flex-wrap justify-between gap-2 text-xs text-secondary">
            <span>
              {viewport.width} × {viewport.height}
            </span>
            <span>{viewport.scaleNote}</span>
          </div>
          <div className="mt-4 flex min-h-72 items-center justify-center">
            <div
              className="relative max-h-72 w-full overflow-hidden border-2 border-primary bg-elevated"
              style={{
                aspectRatio: `${viewport.width} / ${viewport.height}`,
                maxWidth: viewport.width < viewport.height ? "190px" : "100%",
              }}
            >
              <div
                className="absolute border border-dashed border-success"
                style={{
                  inset: `${viewport.safeInset}%`,
                }}
              >
                <span className="absolute left-1 top-1 text-[10px] text-success">
                  safe area
                </span>
              </div>
              <div
                className="absolute flex items-center justify-center overflow-hidden border-2 border-accent bg-accent/20 px-2 text-center text-xs font-medium text-primary"
                style={panelStyle}
              >
                {panel.name}
              </div>
              <span
                className="absolute h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-warning bg-background"
                style={{
                  left: `${panel.anchorMin[0] * 100}%`,
                  bottom: `${panel.anchorMin[1] * 100}%`,
                }}
                aria-hidden="true"
              />
              <span
                className="absolute h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full border-2 border-warning bg-background"
                style={{
                  left: `${panel.anchorMax[0] * 100}%`,
                  bottom: `${panel.anchorMax[1] * 100}%`,
                }}
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2">
            <p className="m-0 text-secondary">
              Anchor Min / Max
              <code className="mt-1 block text-primary">
                ({panel.anchorMin.join(", ")}) → ({panel.anchorMax.join(", ")})
              </code>
            </p>
            <p className="m-0 text-secondary">
              Pivot / Offset
              <code className="mt-1 block text-primary">
                ({panel.pivot.join(", ")}) · {panel.offset}
              </code>
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-secondary">
        本页目录坐标：{model.concepts.join("、")}
      </p>
    </section>
  );
}

function EventRoute({ model }: { model: UnityUiEvidenceModel }) {
  const [mode, setMode] = useState<"normal" | "failure">("normal");
  const [stepIndex, setStepIndex] = useState(0);
  const route = mode === "normal" ? model.normalRoute : model.failureRoute;
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
      data-visual-kind="unity-ui-event-route"
      aria-label={`${model.title}事件路由实验`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">EventSystem 路由</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从输入模块追到第一个接收者
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
          正常路由
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
          故障路由
        </button>
      </div>

      <ol className="mt-5 grid gap-2 lg:grid-cols-5">
        {route.map((item, index) => (
          <li
            key={`${mode}-${index}`}
            className={`min-h-28 rounded-card border px-3 py-3 text-xs leading-5 ${
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
              {String(index + 1).padStart(2, "0")}
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
          上一跳
        </button>
        <button
          type="button"
          onClick={() =>
            setStepIndex((value) => Math.min(route.length - 1, value + 1))
          }
          disabled={stepIndex === route.length - 1}
          className={`${buttonClass} text-secondary disabled:cursor-not-allowed disabled:opacity-40`}
        >
          下一跳
        </button>
      </div>

      <p className="mt-4 rounded-card border border-border bg-background px-4 py-3 text-sm leading-6 text-primary">
        必须保持：{model.invariant}
      </p>
    </section>
  );
}

function ReleaseGate({ model }: { model: UnityUiEvidenceModel }) {
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
      data-visual-kind="unity-ui-release-gate"
      aria-label={`${model.title}多分辨率发布门`}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-accent">多分辨率发布门</p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            编辑器看起来正确，还不能直接发布
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
          ? `允许提交 UI：${model.invariant}`
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

export function UnityUiEvidenceLab({ model, view }: UnityUiEvidenceLabProps) {
  if (view === "layout-probe") return <LayoutProbe model={model} />;
  if (view === "event-route") return <EventRoute model={model} />;
  return <ReleaseGate model={model} />;
}
