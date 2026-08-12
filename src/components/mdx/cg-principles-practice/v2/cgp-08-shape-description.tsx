"use client";

import { useState, type ReactNode } from "react";

type ShapeKind = "triangle" | "quad";
type DisplayMode = "filled" | "wireframe";

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

function VertexDot({
  label,
  x,
  y,
  color = COLORS.accent,
}: {
  label: string;
  x: number;
  y: number;
  color?: string;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="8" fill={color} />
      <text
        x={x + 12}
        y={y - 10}
        fontSize="14"
        fontWeight="700"
        fill={COLORS.text}
      >
        {label}
      </text>
    </g>
  );
}

export function Cgp08ShapeRecipeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="形状描述配方：左侧轮廓对应右侧的顶点位置和连接索引">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            describe shape：轮廓只是结果，数据才是可重建的配方
          </text>
          <rect
            x="42"
            y="72"
            width="292"
            height="214"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <polygon
            points="112,236 188,104 300,236"
            fill={COLORS.accent}
            fillOpacity="0.16"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <VertexDot label="0" x={112} y={236} color={COLORS.warning} />
          <VertexDot label="1" x={188} y={104} color={COLORS.success} />
          <VertexDot label="2" x={300} y={236} color={COLORS.accent} />
          <text
            x="188"
            y="316"
            textAnchor="middle"
            fontSize="14"
            fill={COLORS.secondary}
          >
            画面上的三角形
          </text>
          <line
            x1="370"
            y1="178"
            x2="414"
            y2="178"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <polygon points="406,168 426,178 406,188" fill={COLORS.accent} />
          <rect
            x="442"
            y="72"
            width="234"
            height="214"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="466"
            y="108"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            positions
          </text>
          <text x="466" y="138" fontSize="13" fill={COLORS.secondary}>
            0 → (-1, -1)
          </text>
          <text x="466" y="164" fontSize="13" fill={COLORS.secondary}>
            1 → (0, 1)
          </text>
          <text x="466" y="190" fontSize="13" fill={COLORS.secondary}>
            2 → (1, -1)
          </text>
          <text
            x="466"
            y="232"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            indices
          </text>
          <text x="466" y="260" fontSize="13" fill={COLORS.success}>
            [0, 1, 2]
          </text>
          <text x="466" y="316" fontSize="13" fill={COLORS.secondary}>
            位置 + 连接 = 可重建形状
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一个形状必须能从数据重新画出；否则它只是一次不可验证的截图。
      </figcaption>
    </figure>
  );
}

export function Cgp08TopologyDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="网格拓扑图：顶点顺序决定三角形连接和表面绕向">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            mesh：顶点位置与连接关系是两份不同的证据
          </text>
          <rect
            x="42"
            y="72"
            width="292"
            height="214"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <polygon
            points="92,238 184,100 290,238"
            fill={COLORS.success}
            fillOpacity="0.14"
            stroke={COLORS.success}
            strokeWidth="3"
          />
          <VertexDot label="0" x={92} y={238} color={COLORS.warning} />
          <VertexDot label="1" x={184} y={100} color={COLORS.success} />
          <VertexDot label="2" x={290} y={238} color={COLORS.accent} />
          <text
            x="188"
            y="316"
            textAnchor="middle"
            fontSize="14"
            fill={COLORS.success}
          >
            [0, 1, 2]：顺时针约定
          </text>
          <rect
            x="390"
            y="72"
            width="292"
            height="214"
            rx="14"
            fill={COLORS.surface}
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <polygon
            points="440,238 532,100 638,238"
            fill={COLORS.warning}
            fillOpacity="0.12"
            stroke={COLORS.warning}
            strokeWidth="3"
            strokeDasharray="8 5"
          />
          <line
            x1="440"
            y1="238"
            x2="638"
            y2="238"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <VertexDot label="0" x={440} y={238} color={COLORS.warning} />
          <VertexDot label="2" x={532} y={100} color={COLORS.warning} />
          <VertexDot label="1" x={638} y={238} color={COLORS.accent} />
          <text
            x="536"
            y="316"
            textAnchor="middle"
            fontSize="14"
            fill={COLORS.warning}
          >
            [0, 2, 1]：绕向翻转
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        改变点的位置会改形状，改变索引顺序会改连接和朝向；排查时必须分开记录。
      </figcaption>
    </figure>
  );
}

export function Cgp08AttributeDiagram() {
  return (
    <figure className="mdx-figure not-prose mx-auto my-4">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-3 sm:p-4">
        <SvgFrame label="顶点属性图：同一顶点记录位置、颜色和纹理坐标等可并行传递的数据">
          <text
            x="360"
            y="30"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={COLORS.text}
          >
            vertex：一行数据可以携带多种几何证据
          </text>
          <polygon
            points="96,242 192,96 306,242"
            fill={COLORS.accent}
            fillOpacity="0.12"
            stroke={COLORS.accent}
            strokeWidth="3"
          />
          <VertexDot label="0" x={96} y={242} color={COLORS.warning} />
          <VertexDot label="1" x={192} y={96} color={COLORS.success} />
          <VertexDot label="2" x={306} y={242} color={COLORS.accent} />
          <line
            x1="370"
            y1="74"
            x2="370"
            y2="286"
            stroke={COLORS.border}
            strokeWidth="2"
          />
          <text
            x="410"
            y="92"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.text}
          >
            vertex 1
          </text>
          <text x="410" y="128" fontSize="13" fill={COLORS.secondary}>
            position → (0, 1, 0)
          </text>
          <text x="410" y="158" fontSize="13" fill={COLORS.success}>
            color → (0.2, 0.8, 1.0)
          </text>
          <text x="410" y="188" fontSize="13" fill={COLORS.warning}>
            normal → (0, 0, 1)
          </text>
          <text x="410" y="218" fontSize="13" fill={COLORS.accent}>
            uv → (0.5, 1.0)
          </text>
          <text x="410" y="264" fontSize="13" fill={COLORS.secondary}>
            属性跟着顶点进入后续阶段
          </text>
          <text x="410" y="294" fontSize="13" fill={COLORS.secondary}>
            但连接仍由 indices 决定
          </text>
        </SvgFrame>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        位置决定形状，其他属性决定如何着色或采样；不要把属性字段误当成连接关系。
      </figcaption>
    </figure>
  );
}

const SHAPES: Record<
  ShapeKind,
  { label: string; positions: string; indices: string }
> = {
  triangle: {
    label: "三角形",
    positions: "3 个位置",
    indices: "[0, 1, 2]",
  },
  quad: {
    label: "四边形",
    positions: "4 个位置",
    indices: "[0, 1, 2] + [0, 2, 3]",
  },
};

function InteractiveShape({
  displayMode,
  shape,
  showIndices,
}: {
  displayMode: DisplayMode;
  shape: ShapeKind;
  showIndices: boolean;
}) {
  const vertices =
    shape === "triangle"
      ? [
          { x: 150, y: 270, label: "0" },
          { x: 286, y: 88, label: "1" },
          { x: 450, y: 270, label: "2" },
        ]
      : [
          { x: 126, y: 246, label: "0" },
          { x: 214, y: 104, label: "1" },
          { x: 418, y: 104, label: "2" },
          { x: 506, y: 246, label: "3" },
        ];
  const points = vertices.map((vertex) => `${vertex.x},${vertex.y}`).join(" ");
  return (
    <SvgFrame label="可交互形状描述实验：切换形状、填充方式和顶点索引标签">
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.text}>
        live shape：先看轮廓，再核对数据契约
      </text>
      <rect
        x="54"
        y="64"
        width="500"
        height="250"
        rx="14"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <line
        x1="82"
        y1="188"
        x2="526"
        y2="188"
        stroke={COLORS.border}
        strokeWidth="1"
      />
      <line
        x1="304"
        y1="86"
        x2="304"
        y2="292"
        stroke={COLORS.border}
        strokeWidth="1"
      />
      {shape === "quad" && (
        <line
          x1="126"
          y1="246"
          x2="418"
          y2="104"
          stroke={COLORS.warning}
          strokeWidth="2"
          strokeDasharray="8 5"
        />
      )}
      <polygon
        points={points}
        fill={displayMode === "filled" ? COLORS.accent : "transparent"}
        fillOpacity="0.18"
        stroke={COLORS.accent}
        strokeWidth="4"
      />
      {vertices.map((vertex, index) => (
        <VertexDot
          key={vertex.label}
          label={showIndices ? vertex.label : ""}
          x={vertex.x}
          y={vertex.y}
          color={
            index === 0
              ? COLORS.warning
              : index === 1
                ? COLORS.success
                : COLORS.accent
          }
        />
      ))}
      <text x="82" y="292" fontSize="13" fill={COLORS.secondary}>
        {displayMode === "filled"
          ? "填充模式：检查面是否闭合"
          : "线框模式：检查边的连接顺序"}
      </text>
      <rect
        x="580"
        y="82"
        width="112"
        height="198"
        rx="12"
        fill={COLORS.surface}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="598" y="112" fontSize="14" fontWeight="700" fill={COLORS.text}>
        数据摘要
      </text>
      <text x="598" y="148" fontSize="13" fill={COLORS.secondary}>
        {SHAPES[shape].label}
      </text>
      <text x="598" y="178" fontSize="13" fill={COLORS.secondary}>
        {SHAPES[shape].positions}
      </text>
      <text x="598" y="214" fontSize="13" fill={COLORS.success}>
        {shape === "triangle" ? "1 个面" : "2 个三角面"}
      </text>
      <text x="598" y="250" fontSize="12" fill={COLORS.warning}>
        {SHAPES[shape].indices}
      </text>
      <text
        x="360"
        y="342"
        textAnchor="middle"
        fontSize="13"
        fill={COLORS.secondary}
      >
        切换输入后，轮廓和 indices 应该同时讲得通
      </text>
    </SvgFrame>
  );
}

export function Cgp08ShapeDescriptionLab() {
  const [shape, setShape] = useState<ShapeKind>("triangle");
  const [displayMode, setDisplayMode] = useState<DisplayMode>("filled");
  const [showIndices, setShowIndices] = useState(true);

  function reset() {
    setShape("triangle");
    setDisplayMode("filled");
    setShowIndices(true);
  }

  return (
    <section
      aria-label="二维与三维形状描述专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cgp-08-shape-description"
      data-unit-id="cgp-08"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 ShapeViz · shape data
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把形状变成可重建的数据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先猜一猜：把三角形切换成四边形时，哪些数据会增加？改成线框后，什么证据更容易检查？
          </p>
        </div>
        <button
          type="button"
          aria-label="重置形状描述实验"
          onClick={reset}
          className="min-h-11 shrink-0 rounded-control border border-border px-3 py-2 text-sm text-secondary transition-colors hover:border-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          重置实验
        </button>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择形状类型">
          {(
            [
              ["triangle", "三角形"],
              ["quad", "四边形"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={shape === value}
              onClick={() => setShape(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                shape === value
                  ? "border-accent bg-accent/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
          {(
            [
              ["filled", "填充"],
              ["wireframe", "线框"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={displayMode === value}
              onClick={() => setDisplayMode(value)}
              className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                displayMode === value
                  ? "border-success bg-success/10 font-semibold text-primary"
                  : "border-border text-secondary hover:border-success hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={showIndices}
            onClick={() => setShowIndices((current) => !current)}
            className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              showIndices
                ? "border-warning bg-warning/10 font-semibold text-primary"
                : "border-border text-secondary hover:border-warning hover:text-primary"
            }`}
          >
            {showIndices ? "隐藏索引" : "显示索引"}
          </button>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <InteractiveShape
            displayMode={displayMode}
            shape={shape}
            showIndices={showIndices}
          />
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            当前记录：{SHAPES[shape].label} ·{" "}
            {displayMode === "filled" ? "填充面" : "线框边"}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            先用形状确认位置，再用索引确认连接；如果两份证据互相矛盾，就先停在数据层排查。
          </p>
        </div>
      </div>
    </section>
  );
}
