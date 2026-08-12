"use client";

import { useState, type ReactNode } from "react";

type InteractionMode = "arcball" | "trackball" | "unicam";

const COLORS = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 380"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="380" rx="14" fill="var(--bg)" />
      {children}
    </svg>
  );
}

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        {children}
      </div>
    </figure>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 9;
  const left = {
    x: x2 - size * Math.cos(angle - Math.PI / 6),
    y: y2 - size * Math.sin(angle - Math.PI / 6),
  };
  const right = {
    x: x2 - size * Math.cos(angle + Math.PI / 6),
    y: y2 - size * Math.sin(angle + Math.PI / 6),
  };
  return (
    <>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="3" />
      <polygon
        points={
          String(x2) +
          "," +
          String(y2) +
          " " +
          String(left.x) +
          "," +
          String(left.y) +
          " " +
          String(right.x) +
          "," +
          String(right.y)
        }
        fill={color}
      />
    </>
  );
}

function CameraGlyph({
  cx,
  cy,
  rotation = 0,
  color = COLORS.accent,
}: {
  cx: number;
  cy: number;
  rotation?: number;
  color?: string;
}) {
  return (
    <g transform={"translate(" + cx + " " + cy + ") rotate(" + rotation + ")"}>
      <path
        d="M-32 -18 L-12 -18 L-4 -28 L14 -28 L22 -18 L32 -18 L32 20 L-32 20 Z"
        fill={COLORS.surface}
        stroke={color}
        strokeWidth="3"
      />
      <circle
        r="11"
        fill={color}
        fillOpacity="0.18"
        stroke={color}
        strokeWidth="3"
      />
      <circle r="4" fill={color} />
    </g>
  );
}

export function Cgp21InteractionPipelineDiagram() {
  return (
    <Figure>
      <SvgFrame label="交互技术流程图：输入事件经过映射、约束和相机更新，形成可预测的视图变化">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          interaction techniques：把输入变成视图变化
        </text>
        <rect
          x="34"
          y="92"
          width="140"
          height="190"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="104"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          输入事件
        </text>
        <circle
          cx="82"
          cy="176"
          r="17"
          fill={COLORS.accent}
          fillOpacity="0.18"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <circle cx="82" cy="176" r="5" fill={COLORS.accent} />
        <path
          d="M108 166 Q132 176 108 190"
          fill="none"
          stroke={COLORS.warning}
          strokeWidth="3"
        />
        <text
          x="104"
          y="230"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          pointer / wheel
        </text>
        <text
          x="104"
          y="253"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          按键 / 触摸
        </text>
        <Arrow x1={190} y1={187} x2={238} y2={187} color={COLORS.accent} />
        <rect
          x="252"
          y="92"
          width="170"
          height="190"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="337"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          映射与约束
        </text>
        <text
          x="337"
          y="165"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          arcball
        </text>
        <text
          x="337"
          y="193"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          trackball
        </text>
        <text
          x="337"
          y="221"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          unicam
        </text>
        <text
          x="337"
          y="258"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          保持状态连续
        </text>
        <Arrow x1={438} y1={187} x2={486} y2={187} color={COLORS.accent} />
        <rect
          x="500"
          y="92"
          width="186"
          height="190"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="593"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          相机状态
        </text>
        <CameraGlyph cx={593} cy={191} color={COLORS.success} />
        <line
          x1="540"
          y1="247"
          x2="646"
          y2="247"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="593"
          y="271"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          位置 · 方向 · 目标
        </text>
        <text
          x="360"
          y="336"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          好的交互让“同样的手势”产生连续、可解释的变化
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp21ArcballProjectionDiagram() {
  const spherePoints = Array.from({ length: 9 }, (_, index) => {
    const angle = (index / 8) * Math.PI;
    return { x: 214 + Math.cos(angle) * 86, y: 196 - Math.sin(angle) * 86 };
  });
  return (
    <Figure>
      <SvgFrame label="Arcball 球面投影图：屏幕指针的起点与终点投影到虚拟球面，叉积给出旋转轴">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          arcball：把二维拖动提升为球面旋转
        </text>
        <circle
          cx="214"
          cy="196"
          r="92"
          fill={COLORS.surface}
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <ellipse
          cx="214"
          cy="196"
          rx="92"
          ry="28"
          fill="none"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <path
          d="M122 196 Q214 108 306 196"
          fill="none"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        {spherePoints.map((point, index) => (
          <circle
            key={"arcball-point-" + index}
            cx={point.x}
            cy={point.y}
            r="3.5"
            fill={COLORS.secondary}
          />
        ))}
        <circle cx="157" cy="236" r="8" fill={COLORS.warning} />
        <circle cx="276" cy="139" r="8" fill={COLORS.success} />
        <path
          d="M157 236 Q208 250 276 139"
          fill="none"
          stroke={COLORS.warning}
          strokeWidth="4"
        />
        <text
          x="146"
          y="273"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          起点 p₀
        </text>
        <text
          x="286"
          y="122"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.success}
        >
          终点 p₁
        </text>
        <Arrow x1={344} y1={196} x2={397} y2={196} color={COLORS.accent} />
        <text
          x="370"
          y="168"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          p₀ × p₁
        </text>
        <rect
          x="420"
          y="91"
          width="252"
          height="210"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="546"
          y="126"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          旋转状态
        </text>
        <text
          x="546"
          y="168"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          轴：p₀ × p₁
        </text>
        <text
          x="546"
          y="198"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.accent}
        >
          角度：夹角(p₀, p₁)
        </text>
        <text
          x="546"
          y="228"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.secondary}
        >
          四元数 / 旋转矩阵
        </text>
        <text
          x="546"
          y="267"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          释放指针后仍保持当前姿态
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp21TechniqueComparisonDiagram() {
  const modes: Array<{
    name: string;
    focus: string;
    gesture: string;
    color: string;
  }> = [
    {
      name: "arcball",
      focus: "虚拟球面",
      gesture: "拖动 → 旋转",
      color: COLORS.accent,
    },
    {
      name: "trackball",
      focus: "连续轴向",
      gesture: "拖动 + 滚轮",
      color: COLORS.success,
    },
    {
      name: "unicam",
      focus: "相机约束",
      gesture: "轨道 + 平移",
      color: COLORS.warning,
    },
  ];
  return (
    <Figure>
      <SvgFrame label="交互技术对比图：arcball、trackball 和 unicam 在状态模型与手势上的取舍">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          三种交互技术：相同输入，不同状态模型
        </text>
        {modes.map((mode, index) => {
          const x = 34 + index * 228;
          return (
            <g key={mode.name}>
              <rect
                x={x}
                y="82"
                width="202"
                height="238"
                rx="16"
                fill={COLORS.surface}
                stroke={COLORS.border}
                strokeWidth="2"
              />
              <circle
                cx={x + 101}
                cy="130"
                r="32"
                fill={mode.color}
                fillOpacity="0.16"
                stroke={mode.color}
                strokeWidth="3"
              />
              {index === 0 ? (
                <path
                  d={
                    "M" +
                    (x + 78) +
                    " 138 Q" +
                    (x + 101) +
                    " 104 " +
                    (x + 124) +
                    " 138"
                  }
                  fill="none"
                  stroke={mode.color}
                  strokeWidth="4"
                />
              ) : index === 1 ? (
                <>
                  <line
                    x1={x + 76}
                    y1="130"
                    x2={x + 126}
                    y2="130"
                    stroke={mode.color}
                    strokeWidth="4"
                  />
                  <circle cx={x + 101} cy="130" r="6" fill={mode.color} />
                </>
              ) : (
                <>
                  <circle cx={x + 101} cy="130" r="8" fill={mode.color} />
                  <path
                    d={
                      "M" +
                      (x + 101) +
                      " 96 V164 M" +
                      (x + 68) +
                      " 130 H" +
                      (x + 134)
                    }
                    stroke={mode.color}
                    strokeWidth="3"
                  />
                </>
              )}
              <text
                x={x + 101}
                y="193"
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill={COLORS.text}
              >
                {mode.name}
              </text>
              <text
                x={x + 101}
                y="228"
                textAnchor="middle"
                fontSize="14"
                fill={COLORS.secondary}
              >
                {mode.focus}
              </text>
              <text
                x={x + 101}
                y="256"
                textAnchor="middle"
                fontSize="14"
                fill={mode.color}
              >
                {mode.gesture}
              </text>
              <text
                x={x + 101}
                y="291"
                textAnchor="middle"
                fontSize="13"
                fill={COLORS.secondary}
              >
                连续性 / 可控性权衡
              </text>
            </g>
          );
        })}
        <text
          x="360"
          y="354"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          先定义“用户想改变什么”，再选择输入到相机状态的映射
        </text>
      </SvgFrame>
    </Figure>
  );
}

function InteractionScene({
  mode,
  x,
  y,
  sensitivity,
  constrained,
}: {
  mode: InteractionMode;
  x: number;
  y: number;
  sensitivity: number;
  constrained: boolean;
}) {
  const yaw = (x - 50) * sensitivity;
  const pitch = (y - 50) * sensitivity * 0.6;
  const cameraRotation = mode === "unicam" && constrained ? yaw * 0.45 : yaw;
  const targetX = 400 + Math.cos((yaw * Math.PI) / 180) * 72;
  const targetY = 193 + Math.sin((pitch * Math.PI) / 180) * 44;
  const modeColor =
    mode === "arcball"
      ? COLORS.accent
      : mode === "trackball"
        ? COLORS.success
        : COLORS.warning;
  return (
    <svg
      viewBox="0 0 720 320"
      role="img"
      aria-label="交互技术实验场景：拖动控制点改变相机方向与目标约束"
      className="block h-auto w-full"
    >
      <rect width="720" height="320" rx="14" fill="var(--bg)" />
      <text
        x="360"
        y="27"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode}：输入映射到相机状态
      </text>
      <rect
        x="28"
        y="56"
        width="190"
        height="222"
        rx="16"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="123"
        y="87"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        指针轨迹
      </text>
      <rect
        x="60"
        y="110"
        width="126"
        height="126"
        rx="63"
        fill={COLORS.bg}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <circle
        cx={60 + (x / 100) * 126}
        cy={110 + (y / 100) * 126}
        r="9"
        fill={modeColor}
      />
      <line
        x1="123"
        y1="173"
        x2={60 + (x / 100) * 126}
        y2={110 + (y / 100) * 126}
        stroke={modeColor}
        strokeWidth="3"
        strokeDasharray="7 6"
      />
      <text
        x="123"
        y="259"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        X {Math.round(x)} · Y {Math.round(y)}
      </text>
      <Arrow x1={236} y1={168} x2={286} y2={168} color={modeColor} />
      <rect
        x="304"
        y="56"
        width="212"
        height="222"
        rx="16"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="410"
        y="87"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        相机与目标
      </text>
      <circle
        cx="410"
        cy="193"
        r="58"
        fill={COLORS.bg}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="410"
        y1="193"
        x2={targetX}
        y2={targetY}
        stroke={modeColor}
        strokeWidth="4"
      />
      <circle cx={targetX} cy={targetY} r="8" fill={COLORS.success} />
      <CameraGlyph
        cx={410}
        cy={193}
        rotation={cameraRotation}
        color={modeColor}
      />
      <text
        x="410"
        y="250"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        yaw {Math.round(cameraRotation)}° · pitch {Math.round(pitch)}°
      </text>
      <text
        x="410"
        y="270"
        textAnchor="middle"
        fontSize="12"
        fill={constrained ? COLORS.success : COLORS.warning}
      >
        {constrained ? "目标约束：开启" : "目标约束：关闭"}
      </text>
      <Arrow x1={534} y1={168} x2={584} y2={168} color={modeColor} />
      <rect
        x="602"
        y="56"
        width="90"
        height="222"
        rx="16"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="647"
        y="87"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        反馈
      </text>
      <circle
        cx="647"
        cy="145"
        r="12"
        fill={modeColor}
        fillOpacity="0.18"
        stroke={modeColor}
        strokeWidth="3"
      />
      <text
        x="647"
        y="183"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        连续
      </text>
      <text
        x="647"
        y="207"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        可控
      </text>
      <text
        x="647"
        y="231"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        可恢复
      </text>
    </svg>
  );
}

export function Cgp21InteractionTechniquesLab() {
  const [mode, setMode] = useState<InteractionMode>("arcball");
  const [x, setX] = useState(68);
  const [y, setY] = useState(36);
  const [sensitivity, setSensitivity] = useState(1);
  const [constrained, setConstrained] = useState(true);

  function reset() {
    setMode("arcball");
    setX(68);
    setY(36);
    setSensitivity(1);
    setConstrained(true);
  }

  return (
    <section
      aria-label="交互技术专属实验"
      data-visual-kind="cgp-21-interaction-techniques"
      data-unit-id="cgp-21"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp21 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            交互技术专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            先固定输入轨迹，再切换状态模型；观察 arcball、trackball 和 unicam
            如何改变相机反馈。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置交互技术实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择交互技术">
        {(["arcball", "trackball", "unicam"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={mode === option}
            onClick={() => setMode(option)}
            className={
              "min-h-11 rounded-control border px-3 py-2 text-sm " +
              (mode === option
                ? "border-accent bg-accent/10 font-semibold text-primary"
                : "border-border text-secondary")
            }
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4 grid gap-4 rounded-card border border-border bg-background p-4 md:grid-cols-3">
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>指针 X</span>
            <span className="font-mono text-primary">{x}</span>
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={x}
            onChange={(event) => setX(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>指针 Y</span>
            <span className="font-mono text-primary">{y}</span>
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={y}
            onChange={(event) => setY(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>灵敏度</span>
            <span className="font-mono text-primary">
              {sensitivity.toFixed(1)}
            </span>
          </span>
          <input
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={sensitivity}
            onChange={(event) => setSensitivity(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-secondary md:col-span-3">
          <input
            type="checkbox"
            checked={constrained}
            onChange={(event) => setConstrained(event.target.checked)}
            className="size-5 accent-accent"
          />
          <span>开启目标约束：让 unicam 保持可导航的相机轨道</span>
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <InteractionScene
          mode={mode}
          x={x}
          y={y}
          sensitivity={sensitivity}
          constrained={constrained}
        />
      </div>
      <div
        className="mt-4 rounded-card border border-border bg-background p-4"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-semibold text-primary">
          当前方案：{mode} · 输入变化{" "}
          {Math.round(Math.abs(x - 50) + Math.abs(y - 50))} · 约束{" "}
          {constrained ? "开" : "关"}
        </p>
        <p className="mt-1 text-sm leading-6 text-secondary">
          先预测相机目标会不会漂移，再只改变一个控制量；如果结果跳变，检查映射、状态更新与约束边界。
        </p>
      </div>
    </section>
  );
}
