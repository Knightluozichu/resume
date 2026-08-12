"use client";

import { useState, type ReactNode } from "react";

type SurfaceMode = "tensor-product" | "subdivision";

type Point3 = {
  x: number;
  y: number;
  z: number;
};

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

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        {children}
      </div>
    </figure>
  );
}

function SvgFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 720 380"
      role="img"
      aria-label={label}
      className="block h-auto w-full"
    >
      <rect width="720" height="380" rx="14" fill={COLORS.bg} />
      {children}
    </svg>
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

function pointOnPatch(
  u: number,
  v: number,
  height: number,
  crease: number,
): Point3 {
  const center = Math.sin(u * Math.PI) * Math.sin(v * Math.PI);
  const ridge = crease * Math.sin(u * Math.PI * 2) * (0.35 + 0.65 * v);
  return {
    x: u,
    y: v,
    z: height * center + ridge,
  };
}

function project(point: Point3, scale = 1): { x: number; y: number } {
  const x = 310 + (point.x - point.y) * 156 * scale;
  const y = 236 - (point.x + point.y) * 55 * scale - point.z * 90 * scale;
  return {
    x: Math.round(x * 1000) / 1000,
    y: Math.round(y * 1000) / 1000,
  };
}

function pathFromProjected(points: Array<{ x: number; y: number }>): string {
  return points
    .map((point, index) => (index === 0 ? "M" : "L") + point.x + " " + point.y)
    .join(" ");
}

function SurfaceGrid({
  height,
  crease,
  level,
  mode,
  showNet,
}: {
  height: number;
  crease: number;
  level: number;
  mode: SurfaceMode;
  showNet: boolean;
}) {
  const count = mode === "subdivision" ? 4 + level * 2 : 5;
  const lines: ReactNode[] = [];
  for (let row = 0; row <= count; row += 1) {
    const v = row / count;
    const points = Array.from({ length: count + 1 }, (_, column) => {
      const u = column / count;
      const point = pointOnPatch(
        u,
        v,
        mode === "subdivision" ? height * (0.6 + level * 0.1) : height,
        mode === "subdivision" ? crease * 0.6 : crease,
      );
      return project(point);
    });
    lines.push(
      <path
        key={"surface-row-" + row}
        d={pathFromProjected(points)}
        fill="none"
        stroke={row === 0 || row === count ? COLORS.accent : COLORS.border}
        strokeOpacity={row === 0 || row === count ? "0.9" : "0.72"}
        strokeWidth={row === 0 || row === count ? "3" : "1.5"}
      />,
    );
  }
  for (let column = 0; column <= count; column += 1) {
    const u = column / count;
    const points = Array.from({ length: count + 1 }, (_, row) => {
      const v = row / count;
      const point = pointOnPatch(
        u,
        v,
        mode === "subdivision" ? height * (0.6 + level * 0.1) : height,
        mode === "subdivision" ? crease * 0.6 : crease,
      );
      return project(point);
    });
    lines.push(
      <path
        key={"surface-column-" + column}
        d={pathFromProjected(points)}
        fill="none"
        stroke={
          column === 0 || column === count ? COLORS.accent : COLORS.border
        }
        strokeOpacity={column === 0 || column === count ? "0.9" : "0.72"}
        strokeWidth={column === 0 || column === count ? "3" : "1.5"}
      />,
    );
  }
  const cornerPoints = [0, 1].flatMap((x) =>
    [0, 1].map((y) =>
      project(
        pointOnPatch(
          x,
          y,
          mode === "subdivision" ? height * (0.6 + level * 0.1) : height,
          mode === "subdivision" ? crease * 0.6 : crease,
        ),
      ),
    ),
  );
  return (
    <g>
      {lines}
      {showNet
        ? cornerPoints.map((point, index) => (
            <circle
              key={"surface-corner-" + index}
              cx={point.x}
              cy={point.y}
              r="7"
              fill={COLORS.surface}
              stroke={COLORS.warning}
              strokeWidth="3"
            />
          ))
        : null}
    </g>
  );
}

export function Cgp23SurfacePatchDiagram() {
  return (
    <Figure>
      <SvgFrame label="样条曲面参数图：二维参数域中的 u 和 v 经过曲面映射，生成三维曲面上的点">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          spline surfaces：二维参数域变成三维曲面
        </text>
        <rect
          x="34"
          y="88"
          width="242"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="155"
          y="122"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          参数域 (u, v)
        </text>
        <rect
          x="72"
          y="150"
          width="164"
          height="96"
          fill={COLORS.bg}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <line
          x1="72"
          y1="246"
          x2="236"
          y2="246"
          stroke={COLORS.accent}
          strokeWidth="3"
        />
        <line
          x1="72"
          y1="246"
          x2="72"
          y2="150"
          stroke={COLORS.success}
          strokeWidth="3"
        />
        <Arrow x1={178} y1={246} x2={226} y2={246} color={COLORS.accent} />
        <Arrow x1={72} y1={198} x2={72} y2={158} color={COLORS.success} />
        <text
          x="226"
          y="268"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.accent}
        >
          u
        </text>
        <text
          x="58"
          y="160"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.success}
        >
          v
        </text>
        <circle cx="166" cy="196" r="6" fill={COLORS.warning} />
        <text
          x="166"
          y="222"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.warning}
        >
          参数点
        </text>
        <Arrow x1={300} y1={187} x2={350} y2={187} color={COLORS.accent} />
        <rect
          x="372"
          y="88"
          width="314"
          height="198"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="529"
          y="122"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          曲面点 S(u, v)
        </text>
        <SurfaceGrid
          height={0.9}
          crease={0.2}
          level={2}
          mode="tensor-product"
          showNet={true}
        />
        <text
          x="529"
          y="268"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          控制网 + 权重 → 位置与法线
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          参数方向、控制网和接缝规则共同决定曲面形状
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp23TensorProductDiagram() {
  return (
    <Figure>
      <SvgFrame label="张量积曲面流程图：先沿 u 方向生成曲线，再沿 v 方向混合曲线得到曲面">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          tensor-product：两个参数方向的分层构造
        </text>
        <rect
          x="34"
          y="88"
          width="178"
          height="196"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="123"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          控制网行
        </text>
        <path
          d="M58 236 Q100 146 188 208"
          fill="none"
          stroke={COLORS.warning}
          strokeWidth="4"
        />
        <path
          d="M58 252 Q112 176 188 224"
          fill="none"
          stroke={COLORS.warning}
          strokeOpacity="0.55"
          strokeWidth="3"
        />
        <path
          d="M58 220 Q112 134 188 192"
          fill="none"
          stroke={COLORS.warning}
          strokeOpacity="0.55"
          strokeWidth="3"
        />
        <text
          x="123"
          y="268"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          固定 v，沿 u 评价
        </text>
        <Arrow x1={230} y1={184} x2={274} y2={184} color={COLORS.accent} />
        <rect
          x="290"
          y="88"
          width="178"
          height="196"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="379"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          中间曲线
        </text>
        <path
          d="M314 238 Q360 134 444 204"
          fill="none"
          stroke={COLORS.success}
          strokeWidth="5"
        />
        <path
          d="M314 250 Q360 162 444 216"
          fill="none"
          stroke={COLORS.success}
          strokeOpacity="0.5"
          strokeWidth="3"
        />
        <path
          d="M314 224 Q360 112 444 192"
          fill="none"
          stroke={COLORS.success}
          strokeOpacity="0.5"
          strokeWidth="3"
        />
        <text
          x="379"
          y="268"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          每条曲线是 v 的函数
        </text>
        <Arrow x1={486} y1={184} x2={530} y2={184} color={COLORS.accent} />
        <rect
          x="546"
          y="88"
          width="140"
          height="196"
          rx="16"
          fill={COLORS.surface}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text
          x="616"
          y="124"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.text}
        >
          曲面
        </text>
        <SurfaceGrid
          height={0.8}
          crease={0.05}
          level={2}
          mode="tensor-product"
          showNet={false}
        />
        <text
          x="616"
          y="268"
          textAnchor="middle"
          fontSize="13"
          fill={COLORS.secondary}
        >
          再沿 v 混合
        </text>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          张量积不是“二维采样”：它是两个参数方向的权重组合
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp23SubdivisionSurfaceDiagram() {
  const panels = [
    { x: 34, title: "粗控制网", level: 0 },
    { x: 254, title: "一次细分", level: 1 },
    { x: 474, title: "平滑极限", level: 2 },
  ];
  return (
    <Figure>
      <SvgFrame label="细分曲面步骤图：粗控制网经过面点、边点和顶点规则更新，逐步逼近平滑曲面">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          subdivision surfaces：从网格到平滑形体
        </text>
        {panels.map((panel, index) => (
          <g key={panel.title}>
            <rect
              x={panel.x}
              y="84"
              width="184"
              height="202"
              rx="16"
              fill={COLORS.surface}
              stroke={COLORS.border}
              strokeWidth="2"
            />
            <text
              x={panel.x + 92}
              y="119"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.text}
            >
              {panel.title}
            </text>
            <SurfaceGrid
              height={index === 0 ? 0.7 : 0.9}
              crease={index === 0 ? 0.35 : 0.12}
              level={panel.level + 1}
              mode="subdivision"
              showNet={true}
            />
            <text
              x={panel.x + 92}
              y="268"
              textAnchor="middle"
              fontSize="13"
              fill={COLORS.secondary}
            >
              {index === 0
                ? "少量面与顶点"
                : index === 1
                  ? "重建邻域"
                  : "逼近极限曲面"}
            </text>
          </g>
        ))}
        <Arrow x1={230} y1={184} x2={246} y2={184} color={COLORS.accent} />
        <Arrow x1={450} y1={184} x2={466} y2={184} color={COLORS.accent} />
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          细分规则同时决定平滑、收缩、边界和尖锐特征的保留
        </text>
      </SvgFrame>
    </Figure>
  );
}

export function Cgp23SurfaceContinuityDiagram() {
  return (
    <Figure>
      <SvgFrame label="曲面接缝连续性图：G0 连接位置，G1 还对齐切向平面，G2 进一步平滑曲率变化">
        <text
          x="360"
          y="31"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={COLORS.text}
        >
          曲面接缝：位置、切向平面与曲率
        </text>
        <g>
          <rect
            x="34"
            y="82"
            width="204"
            height="210"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="136"
            y="117"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            G0
          </text>
          <path
            d="M58 230 Q95 150 136 186 Q178 222 212 136"
            fill="none"
            stroke={COLORS.warning}
            strokeWidth="5"
          />
          <line
            x1="136"
            y1="186"
            x2="110"
            y2="152"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
          <line
            x1="136"
            y1="186"
            x2="172"
            y2="218"
            stroke={COLORS.warning}
            strokeWidth="3"
          />
          <circle cx="136" cy="186" r="6" fill={COLORS.warning} />
          <text
            x="136"
            y="266"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            位置相接，法向可跳变
          </text>
        </g>
        <g>
          <rect
            x="258"
            y="82"
            width="204"
            height="210"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="360"
            y="117"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            G1
          </text>
          <path
            d="M282 230 Q322 150 360 186 Q398 222 438 136"
            fill="none"
            stroke={COLORS.success}
            strokeWidth="5"
          />
          <line
            x1="360"
            y1="186"
            x2="326"
            y2="152"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <line
            x1="360"
            y1="186"
            x2="394"
            y2="220"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <circle cx="360" cy="186" r="6" fill={COLORS.success} />
          <text
            x="360"
            y="266"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            切向平面方向一致
          </text>
        </g>
        <g>
          <rect
            x="482"
            y="82"
            width="204"
            height="210"
            rx="16"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="584"
            y="117"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            G2
          </text>
          <path
            d="M506 230 C540 154 556 154 584 186 C612 218 628 218 662 136"
            fill="none"
            stroke={COLORS.accent}
            strokeWidth="5"
          />
          <circle cx="584" cy="186" r="6" fill={COLORS.accent} />
          <path
            d="M548 202 Q584 164 620 202"
            fill="none"
            stroke={COLORS.accent}
            strokeOpacity="0.65"
            strokeWidth="3"
          />
          <text
            x="584"
            y="266"
            textAnchor="middle"
            fontSize="13"
            fill={COLORS.secondary}
          >
            曲率变化也更平滑
          </text>
        </g>
        <text
          x="360"
          y="337"
          textAnchor="middle"
          fontSize="14"
          fill={COLORS.warning}
        >
          高光断裂通常暴露法向或曲率连续性问题，而不只是位置缝隙
        </text>
      </SvgFrame>
    </Figure>
  );
}

function SurfaceLabScene({
  mode,
  height,
  crease,
  level,
  showNet,
}: {
  mode: SurfaceMode;
  height: number;
  crease: number;
  level: number;
  showNet: boolean;
}) {
  return (
    <svg
      viewBox="0 0 720 330"
      role="img"
      aria-label="样条曲面与细分曲面实验场景：调节隆起、折痕和细分层级观察曲面网格"
      className="block h-auto w-full"
    >
      <rect width="720" height="330" rx="14" fill={COLORS.bg} />
      <text
        x="360"
        y="28"
        textAnchor="middle"
        fontSize="16"
        fontWeight="700"
        fill={COLORS.text}
      >
        {mode === "tensor-product"
          ? "tensor-product 曲面"
          : "subdivision surfaces 曲面"}
        ：参数改变后的网格
      </text>
      <SurfaceGrid
        height={height}
        crease={crease}
        level={level}
        mode={mode}
        showNet={showNet}
      />
      <line
        x1="92"
        y1="278"
        x2="548"
        y2="278"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="110" y="302" fontSize="13" fill={COLORS.secondary}>
        高度 {height.toFixed(1)}
      </text>
      <text x="300" y="302" fontSize="13" fill={COLORS.secondary}>
        折痕 {crease.toFixed(1)}
      </text>
      <text x="480" y="302" fontSize="13" fill={COLORS.secondary}>
        细分 {level} 级
      </text>
    </svg>
  );
}

export function Cgp23SplinesLab() {
  const [mode, setMode] = useState<SurfaceMode>("tensor-product");
  const [height, setHeight] = useState(0.9);
  const [crease, setCrease] = useState(0.2);
  const [level, setLevel] = useState(2);
  const [showNet, setShowNet] = useState(true);

  function reset() {
    setMode("tensor-product");
    setHeight(0.9);
    setCrease(0.2);
    setLevel(2);
    setShowNet(true);
  }

  return (
    <section
      aria-label="样条曲面与细分曲面专属实验"
      data-visual-kind="cgp-23-splines-and-subdivision-surfaces"
      data-unit-id="cgp-23"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-4 sm:p-5"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
            Cgp23 Lab
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            样条曲面与细分曲面专属实验
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-secondary">
            固定参数域后切换表示方式；观察曲面高度、折痕、网格密度与接缝反馈。
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="重置样条曲面与细分曲面实验"
          className="min-h-11 rounded-control border border-border px-3 py-2 text-sm text-secondary hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="选择曲面表示">
        {(["tensor-product", "subdivision"] as const).map((option) => (
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
            <span>曲面隆起</span>
            <span className="font-mono text-primary">{height.toFixed(1)}</span>
          </span>
          <input
            type="range"
            min="0.2"
            max="1.5"
            step="0.1"
            value={height}
            onChange={(event) => setHeight(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>折痕强度</span>
            <span className="font-mono text-primary">{crease.toFixed(1)}</span>
          </span>
          <input
            type="range"
            min="-0.8"
            max="0.8"
            step="0.1"
            value={crease}
            onChange={(event) => setCrease(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex min-w-40 flex-col gap-1 text-sm text-secondary">
          <span className="flex justify-between gap-3">
            <span>细分层级</span>
            <span className="font-mono text-primary">{level}</span>
          </span>
          <input
            type="range"
            min="1"
            max="4"
            value={level}
            onChange={(event) => setLevel(Number(event.target.value))}
            className="accent-accent"
          />
        </label>
        <label className="flex items-center gap-3 text-sm text-secondary md:col-span-3">
          <input
            type="checkbox"
            checked={showNet}
            onChange={(event) => setShowNet(event.target.checked)}
            className="size-5 accent-accent"
          />
          <span>显示控制网角点：区分设计网格与平滑曲面</span>
        </label>
      </div>
      <div className="mt-4 min-w-0 overflow-hidden rounded-card border border-border bg-background p-3 sm:p-4">
        <SurfaceLabScene
          mode={mode}
          height={height}
          crease={crease}
          level={level}
          showNet={showNet}
        />
      </div>
      <div
        className="mt-4 rounded-card border border-border bg-background p-4"
        role="status"
        aria-live="polite"
      >
        <p className="text-sm font-semibold text-primary">
          当前表示：{mode} · 隆起 {height.toFixed(1)} · 折痕 {crease.toFixed(1)}{" "}
          · 细分 {level} 级
        </p>
        <p className="mt-1 text-sm leading-6 text-secondary">
          先预测只改变折痕会影响法向还是位置，再切换表示方式；如果高光或接缝跳变，检查控制网、边界规则与连续性。
        </p>
      </div>
    </section>
  );
}
