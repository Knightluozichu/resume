"use client";

import { useMemo, useState, type ReactNode } from "react";

type View = "system" | "contrast" | "time";

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
};

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 360"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="360" rx="14" fill="var(--bg)" />
      {children}
    </svg>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const leftX = x2 - size * Math.cos(angle - Math.PI / 6);
  const leftY = y2 - size * Math.sin(angle - Math.PI / 6);
  const rightX = x2 - size * Math.cos(angle + Math.PI / 6);
  const rightY = y2 - size * Math.sin(angle + Math.PI / 6);
  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <polygon
        points={`${x2},${y2} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={COLORS.accent}
      />
    </>
  );
}

export function Cgp05VisualSystemDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="视觉系统链路：光到达视网膜，信号经神经通路进入皮层并形成可报告知觉">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            visual system：从光学刺激到可报告知觉
          </text>
          <rect
            x="34"
            y="112"
            width="132"
            height="112"
            rx="14"
            fill={COLORS.warning}
            fillOpacity="0.14"
            stroke={COLORS.warning}
            strokeWidth="2"
          />
          <circle
            cx="100"
            cy="162"
            r="28"
            fill={COLORS.warning}
            fillOpacity="0.2"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
          <circle cx="100" cy="162" r="8" fill={COLORS.warning} />
          <text
            x="100"
            y="254"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            光学输入
          </text>
          <Arrow x1={174} y1={168} x2={228} y2={168} />
          <rect
            x="236"
            y="112"
            width="132"
            height="112"
            rx="14"
            fill={COLORS.accent}
            fillOpacity="0.14"
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <path
            d="M262 180 C274 126 292 126 304 180 C316 218 334 218 346 154"
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <text
            x="302"
            y="254"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            retina
          </text>
          <Arrow x1={376} y1={168} x2={430} y2={168} />
          <rect
            x="438"
            y="112"
            width="132"
            height="112"
            rx="14"
            fill={COLORS.success}
            fillOpacity="0.14"
            stroke={COLORS.success}
            strokeWidth="2"
          />
          <path
            d="M462 178 L482 154 L500 180 L520 144 L544 174"
            fill="none"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <text
            x="504"
            y="254"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            neural pathway
          </text>
          <Arrow x1={578} y1={168} x2={632} y2={168} />
          <circle
            cx="664"
            cy="168"
            r="28"
            fill={COLORS.accent}
            fillOpacity="0.18"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <circle cx="664" cy="168" r="8" fill={COLORS.accent} />
          <text
            x="664"
            y="254"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            皮层整合
          </text>
          <text
            x="360"
            y="310"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            每一步都能改变信号，但最后的知觉不是输入亮度的逐点复制
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        视觉系统是一条有阶段、有反馈和有上下文的处理链；“看见”不是光线直接贴到意识上。
      </figcaption>
    </figure>
  );
}

export function Cgp05ReceptiveFieldDiagram() {
  const panels = [
    {
      x: 84,
      center: 70,
      surround: 20,
      color: COLORS.success,
      label: "亮中心 / 暗周围",
    },
    {
      x: 390,
      center: 70,
      surround: 92,
      color: COLORS.warning,
      label: "亮中心 / 亮周围",
    },
  ];
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="中心—周围感受野：相同中心刺激在不同周围背景下产生不同响应">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            receptive field：神经元读取的是局部关系
          </text>
          {panels.map((panel) => {
            const response = Math.max(0, panel.center - panel.surround * 0.55);
            return (
              <g key={panel.label}>
                <rect
                  x={panel.x}
                  y="70"
                  width="220"
                  height="164"
                  rx="14"
                  fill={COLORS.surface}
                  stroke={COLORS.border}
                  strokeWidth="2"
                />
                <circle
                  cx={panel.x + 110}
                  cy="148"
                  r="62"
                  fill={panel.surround > 50 ? "var(--border)" : "var(--bg)"}
                  stroke={COLORS.secondary}
                  strokeWidth="2"
                />
                <circle
                  cx={panel.x + 110}
                  cy="148"
                  r="28"
                  fill={panel.color}
                  fillOpacity={0.82}
                />
                <text
                  x={panel.x + 110}
                  y="260"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill={COLORS.text}
                >
                  {panel.label}
                </text>
                <rect
                  x={panel.x + 34}
                  y="282"
                  width="152"
                  height="10"
                  rx="5"
                  fill={COLORS.border}
                />
                <rect
                  x={panel.x + 34}
                  y="282"
                  width={152 * (response / 70)}
                  height="10"
                  rx="5"
                  fill={panel.color}
                />
              </g>
            );
          })}
          <text
            x="360"
            y="332"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            同一个中心并不保证同一个知觉：周围背景会参与解释
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        感受野把局部中心与周围放进同一比较窗口，帮助系统检测边缘和变化，而不是只读绝对亮度。
      </figcaption>
    </figure>
  );
}

export function Cgp05TemporalIntegrationDiagram() {
  const pulses = [
    34, 62, 91, 120, 149, 178, 207, 236, 265, 294, 323, 352, 381, 410, 439, 468,
    497, 526, 555, 584,
  ];
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="时间整合：短暂刺激在一段时间窗口内被汇总，连续变化比单个瞬间更容易被感知">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            temporal integration：知觉也有时间窗口
          </text>
          <line
            x1="54"
            y1="238"
            x2="652"
            y2="238"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          {pulses.map((x, index) => (
            <line
              key={`pulse-${index}`}
              x1={x}
              y1={238}
              x2={x}
              y2={index % 4 === 0 ? 124 : 178}
              stroke={index % 4 === 0 ? COLORS.accent : COLORS.secondary}
              strokeWidth={index % 4 === 0 ? 4 : 2}
            />
          ))}
          <rect
            x="212"
            y="88"
            width="190"
            height="174"
            rx="12"
            fill={COLORS.accent}
            fillOpacity="0.1"
            stroke={COLORS.accent}
            strokeWidth="2"
            strokeDasharray="7 5"
          />
          <text
            x="307"
            y="112"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.accent}
          >
            integration window
          </text>
          <text x="92" y="278" fontSize="13" fill={COLORS.secondary}>
            t0
          </text>
          <text x="604" y="278" fontSize="13" fill={COLORS.secondary}>
            t1
          </text>
          <text
            x="360"
            y="320"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            连续信号在窗口中累积，单个极短脉冲可能不足以改变报告
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        时间窗口让系统对短暂噪声不至于过度反应，也让连续运动和闪烁成为可辨认的事件。
      </figcaption>
    </figure>
  );
}

const VIEWS: Array<{ id: View; label: string; detail: string }> = [
  {
    id: "system",
    label: "系统链路",
    detail: "从光学输入到皮层整合，逐段标出信号在哪里被编码和重组。",
  },
  {
    id: "contrast",
    label: "局部对比",
    detail: "固定中心刺激，改变周围背景，观察局部关系如何改变响应。",
  },
  {
    id: "time",
    label: "时间窗口",
    detail: "把短暂刺激放进时间窗口，区分瞬间输入和可报告的连续事件。",
  },
];

function ContrastScene({
  target,
  surround,
}: {
  target: number;
  surround: number;
}) {
  const response = Math.max(0, target - surround * 0.55);
  return (
    <SvgFrame label="局部对比实验：中心亮度与周围亮度共同影响响应">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live contrast：输入相同，周围关系不同
      </text>
      <rect
        x="32"
        y="72"
        width="310"
        height="220"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <circle
        cx="187"
        cy="180"
        r="78"
        fill={`rgb(${surround} ${surround} ${surround})`}
        stroke={COLORS.secondary}
        strokeWidth="2"
      />
      <circle
        cx="187"
        cy="180"
        r="34"
        fill={`rgb(${target} ${target} ${target})`}
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <text
        x="187"
        y="326"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        center {target} · surround {surround}
      </text>
      <line
        x1="384"
        y1="180"
        x2="438"
        y2="180"
        stroke={COLORS.accent}
        strokeWidth="3"
      />
      <polygon points="432,168 454,180 432,192" fill={COLORS.accent} />
      <rect
        x="472"
        y="92"
        width="218"
        height="178"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="494" y="128" fontSize="14" fontWeight="700" fill={COLORS.text}>
        local response
      </text>
      <rect
        x="494"
        y="164"
        width="174"
        height="16"
        rx="8"
        fill={COLORS.border}
      />
      <rect
        x="494"
        y="164"
        width={174 * (response / 100)}
        height="16"
        rx="8"
        fill={COLORS.success}
      />
      <text x="494" y="218" fontSize="13" fill={COLORS.secondary}>
        center − surround × 0.55
      </text>
      <text x="494" y="248" fontSize="13" fill={COLORS.success}>
        response {response.toFixed(0)}
      </text>
    </SvgFrame>
  );
}

function TimeScene({ speed }: { speed: number }) {
  const phase = 82 + speed * 2.1;
  return (
    <SvgFrame label="时间整合实验：变化速度与时间窗口中的事件重叠">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live time window：变化速度影响整合方式
      </text>
      <rect
        x="36"
        y="100"
        width="648"
        height="118"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="70"
        y1="160"
        x2="650"
        y2="160"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <rect
        x="220"
        y="116"
        width="196"
        height="88"
        rx="10"
        fill={COLORS.accent}
        fillOpacity="0.1"
        stroke={COLORS.accent}
        strokeWidth="2"
        strokeDasharray="7 5"
      />
      <circle cx={phase} cy="160" r="12" fill={COLORS.warning} />
      <line
        x1={phase}
        y1="160"
        x2={Math.min(650, phase + 84)}
        y2="160"
        stroke={COLORS.warning}
        strokeWidth="4"
        strokeDasharray="7 5"
      />
      <text
        x="318"
        y="142"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.accent}
      >
        integration window
      </text>
      <text
        x="318"
        y="260"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        speed {speed} · 速度改变时，事件在窗口中的重叠也改变
      </text>
      <text x="70" y="290" fontSize="13" fill={COLORS.secondary}>
        输入开始
      </text>
      <text x="580" y="290" fontSize="13" fill={COLORS.secondary}>
        输入结束
      </text>
    </SvgFrame>
  );
}

export function Cgp05VisualPerceptionLab() {
  const [view, setView] = useState<View>("system");
  const [target, setTarget] = useState(76);
  const [surround, setSurround] = useState(34);
  const [speed, setSpeed] = useState(42);
  const current = VIEWS.find((item) => item.id === view) ?? VIEWS[0];

  function reset() {
    setView("system");
    setTarget(76);
    setSurround(34);
    setSpeed(42);
  }

  const controlsVisible = view !== "system";

  return (
    <section
      aria-label="人类视觉感知专属实验：视觉系统、局部对比与时间窗口"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-05-human-visual-perception"
      data-unit-id="cgp-05"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属实验 · visual perception
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把“看见”拆成可观察的处理链
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：把中心亮度保持不变，只改变周围背景或变化速度，报告出来的知觉会保持不变吗？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置人类视觉感知实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择视觉感知观察视角">
          {VIEWS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={view === item.id}
              onClick={() => setView(item.id)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                view === item.id
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {controlsVisible && (
          <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
            {view === "contrast" ? (
              <>
                <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
                  <span className="flex justify-between gap-3">
                    <span>中心亮度</span>
                    <span className="font-mono text-primary">{target}</span>
                  </span>
                  <input
                    type="range"
                    min={30}
                    max={100}
                    step={1}
                    value={target}
                    onChange={(event) => setTarget(Number(event.target.value))}
                    className="accent-accent"
                  />
                </label>
                <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
                  <span className="flex justify-between gap-3">
                    <span>周围亮度</span>
                    <span className="font-mono text-primary">{surround}</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={surround}
                    onChange={(event) =>
                      setSurround(Number(event.target.value))
                    }
                    className="accent-accent"
                  />
                </label>
              </>
            ) : (
              <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
                <span className="flex justify-between gap-3">
                  <span>变化速度</span>
                  <span className="font-mono text-primary">{speed}</span>
                </span>
                <input
                  type="range"
                  min={8}
                  max={90}
                  step={1}
                  value={speed}
                  onChange={(event) => setSpeed(Number(event.target.value))}
                  className="accent-accent"
                />
              </label>
            )}
          </div>
        )}
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          {view === "system" ? (
            <Cgp05VisualSystemDiagram />
          ) : view === "contrast" ? (
            <ContrastScene target={target} surround={surround} />
          ) : (
            <TimeScene speed={speed} />
          )}
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{current.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {current.detail}
          </p>
        </div>
      </div>
    </section>
  );
}
