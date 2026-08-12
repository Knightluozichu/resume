"use client";

import { useMemo, useState, type ReactNode } from "react";

type ProjectionMode = "perspective" | "orthographic";

const COLORS = {
  accent: "var(--accent)",
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

function CameraIcon({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width="42"
        height="28"
        rx="6"
        fill={COLORS.surface}
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <circle
        cx={x + 21}
        cy={y + 14}
        r="7"
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <path
        d={`M${x + 42} ${y + 7} L${x + 54} ${y + 2} L${x + 54} ${y + 26} L${x + 42} ${y + 21}`}
        fill={COLORS.accent}
        fillOpacity="0.18"
        stroke={COLORS.accent}
        strokeWidth="2"
      />
    </g>
  );
}

export function Cgp13CameraBasisDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="相机基向量：视点、目标和上方向共同定义观察坐标系">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            camera specifications：位置之外，还要约定观察方向
          </text>
          <CameraIcon x={92} y={190} />
          <text
            x="88"
            y="250"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            eye
          </text>
          <circle cx="334" cy="184" r="9" fill={COLORS.success} />
          <text
            x="326"
            y="222"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.success}
          >
            target
          </text>
          <ArrowLine
            from={{ x: 146, y: 204 }}
            to={{ x: 326, y: 188 }}
            color={COLORS.accent}
            label="forward"
          />
          <ArrowLine
            from={{ x: 118, y: 190 }}
            to={{ x: 118, y: 102 }}
            color={COLORS.success}
            label="up"
          />
          <ArrowLine
            from={{ x: 116, y: 202 }}
            to={{ x: 206, y: 250 }}
            color={COLORS.warning}
            label="right"
          />
          <rect
            x="420"
            y="84"
            width="252"
            height="188"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="444"
            y="120"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            相机规格最小集合
          </text>
          <text x="444" y="154" fontSize="13" fill={COLORS.secondary}>
            position：相机在哪里
          </text>
          <text x="444" y="182" fontSize="13" fill={COLORS.accent}>
            forward：看向哪里
          </text>
          <text x="444" y="210" fontSize="13" fill={COLORS.success}>
            up：画面顶部方向
          </text>
          <text x="444" y="246" fontSize="13" fill={COLORS.warning}>
            near / far：保留深度范围
          </text>
          <text
            x="360"
            y="318"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            先由 eye、target、up 建立正交基，再构造 view matrix
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        相机不是一个孤立的位置点；姿态和裁剪范围共同决定世界如何进入观察空间。
      </figcaption>
    </figure>
  );
}

function ArrowLine({
  from,
  to,
  color,
  label,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
  label: string;
}) {
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const left = {
    x: to.x - 9 * Math.cos(angle - Math.PI / 6),
    y: to.y - 9 * Math.sin(angle - Math.PI / 6),
  };
  const right = {
    x: to.x - 9 * Math.cos(angle + Math.PI / 6),
    y: to.y - 9 * Math.sin(angle + Math.PI / 6),
  };
  return (
    <g>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth="3"
      />
      <polygon
        points={`${to.x},${to.y} ${left.x},${left.y} ${right.x},${right.y}`}
        fill={color}
      />
      <text
        x={(from.x + to.x) / 2 + 8}
        y={(from.y + to.y) / 2 - 8}
        fontSize="13"
        fill={color}
      >
        {label}
      </text>
    </g>
  );
}

export function Cgp13ProjectionModeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="透视相机与正交相机对照：透视投影会缩小远处物体，正交投影保持平行尺度">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            perspective camera / orthographic camera：投影规则不同
          </text>
          <rect
            x="40"
            y="70"
            width="300"
            height="220"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="190"
            y="100"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.accent}
          >
            perspective camera
          </text>
          <CameraIcon x={74} y={188} />
          <line
            x1="128"
            y1="202"
            x2="272"
            y2="136"
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <line
            x1="128"
            y1="202"
            x2="272"
            y2="250"
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <rect x="272" y="126" width="4" height="136" fill={COLORS.border} />
          <rect
            x="226"
            y="168"
            width="20"
            height="30"
            fill={COLORS.warning}
            fillOpacity="0.2"
            stroke={COLORS.warning}
            strokeWidth="2"
          />
          <rect
            x="296"
            y="184"
            width="48"
            height="64"
            fill={COLORS.warning}
            fillOpacity="0.2"
            stroke={COLORS.warning}
            strokeWidth="2"
          />
          <text
            x="190"
            y="278"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            远处更小，视线汇聚
          </text>
          <rect
            x="380"
            y="70"
            width="300"
            height="220"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="530"
            y="100"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.success}
          >
            orthographic camera
          </text>
          <line
            x1="424"
            y1="136"
            x2="638"
            y2="136"
            stroke={COLORS.success}
            strokeWidth="2"
          />
          <line
            x1="424"
            y1="250"
            x2="638"
            y2="250"
            stroke={COLORS.success}
            strokeWidth="2"
          />
          <line
            x1="460"
            y1="136"
            x2="460"
            y2="250"
            stroke={COLORS.success}
            strokeWidth="2"
          />
          <line
            x1="552"
            y1="136"
            x2="552"
            y2="250"
            stroke={COLORS.success}
            strokeWidth="2"
          />
          <rect
            x="440"
            y="176"
            width="28"
            height="36"
            fill={COLORS.accent}
            fillOpacity="0.16"
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <rect
            x="572"
            y="176"
            width="28"
            height="36"
            fill={COLORS.accent}
            fillOpacity="0.16"
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <text
            x="530"
            y="278"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            平行投影，尺度不随深度缩小
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        透视与正交不是同一相机的两个颜色选项，而是两套不同的空间到屏幕映射规则。
      </figcaption>
    </figure>
  );
}

export function Cgp13FrustumDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="相机可见体：near 和 far 平面共同限制进入投影的深度范围">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            可见体：视场角与 near / far 共同定义边界
          </text>
          <CameraIcon x={72} y={184} />
          <polygon
            points="128,198 292,104 292,276"
            fill={COLORS.accent}
            fillOpacity="0.08"
            stroke={COLORS.accent}
            strokeWidth="2"
          />
          <line
            x1="212"
            y1="150"
            x2="212"
            y2="246"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
          <line
            x1="292"
            y1="104"
            x2="292"
            y2="276"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <text
            x="212"
            y="294"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.warning}
          >
            near
          </text>
          <text
            x="292"
            y="294"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.success}
          >
            far
          </text>
          <rect
            x="374"
            y="80"
            width="300"
            height="204"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="398"
            y="118"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            规格变化的后果
          </text>
          <text x="398" y="154" fontSize="13" fill={COLORS.secondary}>
            视场角变大 → 视野更宽
          </text>
          <text x="398" y="184" fontSize="13" fill={COLORS.warning}>
            near 太大 → 近处被裁掉
          </text>
          <text x="398" y="214" fontSize="13" fill={COLORS.success}>
            far 太小 → 远处被裁掉
          </text>
          <text x="398" y="250" fontSize="13" fill={COLORS.secondary}>
            深度范围必须配合场景尺度
          </text>
          <text
            x="360"
            y="328"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            每个规格都要对应一个可观察的裁剪或尺度结果
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        看到物体消失时，先问它是否落在可见体之外，而不是立刻修改物体位置。
      </figcaption>
    </figure>
  );
}

function ProjectionScene({
  mode,
  fov,
  depth,
  yaw,
}: {
  mode: ProjectionMode;
  fov: number;
  depth: number;
  yaw: number;
}) {
  const points = [
    { x: -1.1, z: 2.2, color: COLORS.warning, label: "近" },
    { x: 0.1, z: 4.2, color: COLORS.accent, label: "中" },
    { x: 1.1, z: 6.4, color: COLORS.success, label: "远" },
  ];
  const perspectiveScale = 112 / Math.tan((fov * Math.PI) / 360);
  const projected = points.map((point) => {
    const shifted = point.x - yaw / 80;
    const scale = mode === "perspective" ? perspectiveScale / point.z : 42;
    return {
      x: 176 + shifted * scale,
      y: 214 - point.z * 4,
      color: point.color,
      label: point.label,
      z: point.z,
    };
  });
  return (
    <SvgFrame label="可调相机规格实验：切换透视与正交投影并改变视场角和深度范围">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live camera：规格改变会留下屏幕证据
      </text>
      <rect
        x="46"
        y="64"
        width="340"
        height="250"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="84"
        y1="214"
        x2="344"
        y2="214"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="176"
        y1="96"
        x2="176"
        y2="286"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {mode === "perspective" ? (
        <>
          {projected.map((point) => (
            <line
              key={`ray-${point.label}`}
              x1="176"
              y1="214"
              x2={point.x}
              y2={point.y}
              stroke={point.color}
              strokeWidth="2"
              strokeDasharray="7 5"
            />
          ))}
        </>
      ) : (
        <>
          {projected.map((point) => (
            <line
              key={`ray-${point.label}`}
              x1="94"
              y1={point.y}
              x2="338"
              y2={point.y}
              stroke={point.color}
              strokeWidth="2"
              strokeDasharray="7 5"
            />
          ))}
        </>
      )}
      {projected.map((point) => (
        <g key={point.label}>
          <circle
            cx={point.x}
            cy={point.y}
            r={mode === "perspective" ? Math.max(7, 20 - point.z * 1.6) : 12}
            fill={point.color}
          />
          <text
            x={point.x + 12}
            y={point.y - 10}
            fontSize="13"
            fill={COLORS.text}
          >
            {point.label} · z={point.z}
          </text>
        </g>
      ))}
      <text x="74" y="294" fontSize="13" fill={COLORS.secondary}>
        {mode === "perspective" ? "透视：深度参与尺度" : "正交：深度不改变尺度"}
      </text>
      <rect
        x="420"
        y="72"
        width="272"
        height="226"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="444" y="108" fontSize="14" fontWeight="700" fill={COLORS.text}>
        当前规格
      </text>
      <text x="444" y="142" fontSize="13" fill={COLORS.accent}>
        {mode === "perspective" ? "perspective camera" : "orthographic camera"}
      </text>
      <text x="444" y="174" fontSize="13" fill={COLORS.secondary}>
        fov：{fov}°
      </text>
      <text x="444" y="202" fontSize="13" fill={COLORS.secondary}>
        far：{depth.toFixed(1)}
      </text>
      <text x="444" y="230" fontSize="13" fill={COLORS.secondary}>
        yaw：{yaw}°
      </text>
      <text x="444" y="270" fontSize="13" fill={COLORS.success}>
        先看投影，再看参数
      </text>
      <text
        x="360"
        y="340"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        一个参数一次改变，才能把规格和画面变化对应起来
      </text>
    </SvgFrame>
  );
}

export function Cgp13CameraSpecificationsLab() {
  const [mode, setMode] = useState<ProjectionMode>("perspective");
  const [fov, setFov] = useState(60);
  const [depth, setDepth] = useState(8);
  const [yaw, setYaw] = useState(0);
  const currentMode = useMemo(
    () => (mode === "perspective" ? "透视相机" : "正交相机"),
    [mode],
  );

  function reset() {
    setMode("perspective");
    setFov(60);
    setDepth(8);
    setYaw(0);
  }

  return (
    <section
      aria-label="相机规格与投影专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-13-camera-specifications"
      data-unit-id="cgp-13"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CameraViz · projection spec
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让相机规格留下投影证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：从透视切到正交后，远处的点会不会继续变小？把视场角调大时，可见范围和点的屏幕位置如何变化？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置相机规格实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择相机投影模式">
          {(
            [
              ["perspective", "透视相机"],
              ["orthographic", "正交相机"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={mode === value}
              onClick={() => setMode(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                mode === value
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>视场角 fov</span>
              <span className="font-mono text-primary">{fov}°</span>
            </span>
            <input
              type="range"
              min="35"
              max="90"
              step="1"
              value={fov}
              onChange={(event) => setFov(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>远裁剪 far</span>
              <span className="font-mono text-primary">{depth.toFixed(1)}</span>
            </span>
            <input
              type="range"
              min="4"
              max="12"
              step="0.1"
              value={depth}
              onChange={(event) => setDepth(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
          <label className="flex min-w-40 flex-1 flex-col gap-1 text-sm text-secondary">
            <span className="flex justify-between gap-3">
              <span>相机 yaw</span>
              <span className="font-mono text-primary">{yaw}°</span>
            </span>
            <input
              type="range"
              min="-35"
              max="35"
              step="1"
              value={yaw}
              onChange={(event) => setYaw(Number(event.target.value))}
              className="accent-accent"
            />
          </label>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <ProjectionScene mode={mode} fov={fov} depth={depth} yaw={yaw} />
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前投影：{currentMode}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            先固定相机位置和姿态，再改变投影规格；若点突然消失，回到 near/far
            和可见体边界检查。
          </p>
        </div>
      </div>
    </section>
  );
}
