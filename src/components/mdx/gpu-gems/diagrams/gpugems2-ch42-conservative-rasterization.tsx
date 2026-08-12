"use client";

import { useMemo, useRef, useState, type ReactNode, type Ref } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const C = {
  accent: "var(--accent)",
  bg: "var(--bg)",
  border: "var(--border)",
  danger: "var(--danger)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  surface: "var(--surface)",
  text: "var(--text-primary)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

function Figure({ children }: { children: ReactNode }) {
  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-5">
        {children}
      </div>
    </figure>
  );
}

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 760 440"
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[760px]"
    >
      <rect width="760" height="440" rx="16" fill={C.bg} />
      {children}
    </svg>
  );
}

function Arrow({
  color = C.accent,
  dashed = false,
  x1,
  x2,
  y1,
  y2,
}: {
  color?: string;
  dashed?: boolean;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const size = 8;
  const left = `${x2 - size * Math.cos(angle - Math.PI / 6)},${y2 - size * Math.sin(angle - Math.PI / 6)}`;
  const right = `${x2 - size * Math.cos(angle + Math.PI / 6)},${y2 - size * Math.sin(angle + Math.PI / 6)}`;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="3"
        strokeDasharray={dashed ? "7 6" : undefined}
      />
      <polygon points={`${x2},${y2} ${left} ${right}`} fill={color} />
    </g>
  );
}

function Metric({
  label,
  tone = C.accent,
  value,
}: {
  label: string;
  tone?: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-2 last:border-b-0">
      <span className="text-sm text-secondary">{label}</span>
      <span className="font-mono text-sm font-semibold" style={{ color: tone }}>
        {value}
      </span>
    </div>
  );
}

export function GpuGems2Ch42SamplingMissDiagram() {
  const cells = Array.from({ length: 25 }, (_, index) => index);
  return (
    <Figure>
      <Frame label="标准采样会漏掉三角形与像素 cell 的几何重叠：左侧只有采样点，右侧 conservative rasterization 直接覆盖所有相交 cell">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          “采样点没碰到”不等于“几何体没碰到”
        </text>
        <rect
          x="42"
          y="88"
          width="300"
          height="260"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="192"
          y="120"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.danger}
        >
          standard rasterization
        </text>
        {cells.map((cell) => {
          const x = 70 + (cell % 5) * 44;
          const y = 146 + Math.floor(cell / 5) * 38;
          return (
            <rect
              key={cell}
              x={x}
              y={y}
              width="38"
              height="32"
              fill="none"
              stroke={C.border}
            />
          );
        })}
        <polygon
          points="126,278 204,144 286,274"
          fill={C.danger}
          fillOpacity="0.18"
          stroke={C.danger}
          strokeWidth="3"
        />
        {[0, 1, 2].map((point) => (
          <circle
            key={point}
            cx={[126, 204, 286][point]}
            cy={[278, 144, 274][point]}
            r="5"
            fill={C.danger}
          />
        ))}
        <circle cx="170" cy="222" r="5" fill={C.text} />
        <text
          x="192"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          sample point 未命中相交 cell
        </text>
        <Arrow x1={342} y1={218} x2={416} y2={218} color={C.accent} />
        <rect
          x="416"
          y="88"
          width="302"
          height="260"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="567"
          y="120"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          conservative rasterization
        </text>
        {cells.map((cell) => {
          const x = 444 + (cell % 5) * 44;
          const y = 146 + Math.floor(cell / 5) * 38;
          const selected = [6, 7, 8, 11, 12, 13, 16, 17, 18].includes(cell);
          return (
            <rect
              key={cell}
              x={x}
              y={y}
              width="38"
              height="32"
              fill={selected ? C.success : "none"}
              fillOpacity={selected ? 0.28 : 1}
              stroke={selected ? C.success : C.border}
            />
          );
        })}
        <polygon
          points="528,278 606,144 688,274"
          fill={C.success}
          fillOpacity="0.2"
          stroke={C.success}
          strokeWidth="3"
        />
        <text
          x="567"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          任何相交 cell 都生成 fragment
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch42DilationErosionDiagram() {
  return (
    <Figure>
      <Frame label="conservative rasterization 的两种定义：overestimated 将三角形按像素 cell 膨胀以包含所有相交 cell，underestimated 将三角形按像素 cell 腐蚀只保留完全位于内部的 cell">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          膨胀保不漏，腐蚀保不多
        </text>
        <rect
          x="48"
          y="92"
          width="300"
          height="246"
          rx="14"
          fill={C.warning}
          fillOpacity="0.1"
          stroke={C.warning}
        />
        <text
          x="198"
          y="126"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          overestimated / dilation
        </text>
        <polygon
          points="112,286 192,144 286,278"
          fill={C.warning}
          fillOpacity="0.18"
          stroke={C.warning}
          strokeWidth="3"
        />
        <polygon
          points="96,302 192,128 302,294"
          fill="none"
          stroke={C.warning}
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        <text
          x="198"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          cell 与 polygon 有任何交集都保留
        </text>
        <rect
          x="412"
          y="92"
          width="300"
          height="246"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="562"
          y="126"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          underestimated / erosion
        </text>
        <polygon
          points="490,270 562,166 638,274"
          fill={C.success}
          fillOpacity="0.22"
          stroke={C.success}
          strokeWidth="3"
        />
        <polygon
          points="476,286 562,148 652,290"
          fill="none"
          stroke={C.success}
          strokeWidth="2"
          strokeDasharray="8 6"
        />
        <text
          x="562"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          cell 必须完全位于 polygon 内
        </text>
        <text
          x="380"
          y="380"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          两者都是把矩形 pixel cell 变成一次几何区域测试
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch42SemidiagonalHullDiagram() {
  const semis = [
    ["↖", 178, 132],
    ["↗", 222, 132],
    ["↙", 178, 176],
    ["↘", 222, 176],
  ] as const;
  return (
    <Figure>
      <Frame label="半对角线与最优 bounding polygon：每个三角形顶点沿像素 cell 中心到四个角的半对角线移动，取生成点的 convex hull">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          用半对角线把像素 cell 的边界风险推到顶点外
        </text>
        <polygon
          points="98,298 222,130 332,286"
          fill={C.accent}
          fillOpacity="0.18"
          stroke={C.accent}
          strokeWidth="3"
        />
        <circle cx="222" cy="130" r="7" fill={C.warning} />
        {semis.map(([label, x, y]) => (
          <g key={label}>
            <line
              x1="222"
              y1="130"
              x2={x}
              y2={y}
              stroke={C.warning}
              strokeWidth="2"
            />
            <text
              x={x}
              y={y - 6}
              textAnchor="middle"
              fontSize="16"
              fill={C.warning}
            >
              {label}
            </text>
          </g>
        ))}
        <rect
          x="154"
          y="154"
          width="92"
          height="92"
          fill="none"
          stroke={C.warning}
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <text
          x="200"
          y="264"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          pixel cell
        </text>
        <Arrow x1={350} y1={216} x2={418} y2={216} color={C.accent} />
        <rect
          x="418"
          y="98"
          width="294"
          height="236"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="565"
          y="132"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          convex hull
        </text>
        <polygon
          points="476,294 458,268 564,118 676,264 654,298"
          fill={C.success}
          fillOpacity="0.16"
          stroke={C.success}
          strokeWidth="3"
        />
        <circle cx="564" cy="118" r="5" fill={C.success} />
        <circle cx="458" cy="268" r="5" fill={C.success} />
        <circle cx="676" cy="264" r="5" fill={C.success} />
        <circle cx="476" cy="294" r="5" fill={C.success} />
        <circle cx="654" cy="298" r="5" fill={C.success} />
        <text
          x="565"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          生成覆盖所有相交 cell 的 polygon
        </text>
        <text
          x="380"
          y="380"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          法线同象限、邻象限、对向象限分别需要 1、2、3 个偏移点
        </text>
      </Frame>
    </Figure>
  );
}

const CONSERVATIVE_STEPS: TeachingStep[] = [
  { label: "cell", caption: "定义 pixel cell" },
  { label: "expand", caption: "移动半对角线" },
  { label: "rasterize", caption: "覆盖候选区域" },
  { label: "verify", caption: "保守测试" },
];

const CONSERVATIVE_LABELS: Record<string, string> = Object.fromEntries(
  CONSERVATIVE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function ConservativeStage({
  accent,
  detail,
  label,
  number,
  stageRef,
  x,
}: {
  accent: string;
  detail: string;
  label: string;
  number: string;
  stageRef: Ref<SVGGElement>;
  x: number;
}) {
  return (
    <g ref={stageRef}>
      <circle cx={x + 30} cy="158" r="21" fill={accent} />
      <text
        x={x + 30}
        y="164"
        textAnchor="middle"
        fontSize="15"
        fontWeight="700"
        fill={C.bg}
      >
        {number}
      </text>
      <rect
        x={x + 58}
        y="114"
        width="112"
        height="88"
        rx="12"
        fill={accent}
        fillOpacity="0.14"
        stroke={accent}
      />
      <text
        x={x + 114}
        y="150"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        fill={C.text}
      >
        {label}
      </text>
      <text
        x={x + 114}
        y="178"
        textAnchor="middle"
        fontSize="12"
        fill={C.secondary}
      >
        {detail}
      </text>
    </g>
  );
}

export function GpuGems2Ch42ConservativeRasterizationTimelineDiagram() {
  const cellRef = useRef<SVGGElement>(null);
  const expandRef = useRef<SVGGElement>(null);
  const rasterizeRef = useRef<SVGGElement>(null);
  const verifyRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: CONSERVATIVE_STEPS,
    build: (tl) => {
      tl.add(cellRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, 0);
      tl.label("cell", 0);
      tl.add(expandRef.current!, { opacity: [0.45, 1], duration: T * 0.5 }, T);
      tl.label("expand", T);
      tl.add(
        rasterizeRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("rasterize", T * 2);
      tl.add(
        verifyRef.current!,
        { opacity: [0.45, 1], duration: T * 0.5 },
        T * 3,
      );
      tl.label("verify", T * 3);
    },
  });

  return (
    <Figure>
      <Frame label="可播放的 conservative rasterization 教学动画：定义像素 cell，沿半对角线扩张三角形，生成候选 fragments，再做覆盖验证">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          conservative rasterization 的四个关键时刻
        </text>
        <ConservativeStage
          stageRef={cellRef}
          number="1"
          label="cell"
          detail="pixel rectangle"
          accent={C.warning}
          x={42}
        />
        <ConservativeStage
          stageRef={expandRef}
          number="2"
          label="expand"
          detail="semidiagonal"
          accent={C.accent}
          x={220}
        />
        <ConservativeStage
          stageRef={rasterizeRef}
          number="3"
          label="rasterize"
          detail="candidate cells"
          accent={C.success}
          x={398}
        />
        <ConservativeStage
          stageRef={verifyRef}
          number="4"
          label="verify"
          detail="over / under"
          accent={C.accent}
          x={576}
        />
        <Arrow x1={212} y1={158} x2={220} y2={158} color={C.border} />
        <Arrow x1={390} y1={158} x2={398} y2={158} color={C.border} />
        <Arrow x1={568} y1={158} x2={576} y2={158} color={C.border} />
        <path
          d="M638 224 C638 300 120 300 120 224"
          fill="none"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="7 6"
        />
        <text
          x="380"
          y="340"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          多生成一些候选 fragment，再用几何条件保证结果不漏
        </text>
        <text
          x="380"
          y="368"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          点击播放、暂停、单步或拖动进度，观察“生成”与“验证”的职责分离
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={CONSERVATIVE_LABELS}
        caption="先把像素 cell 变成几何覆盖问题，再选择 overestimated 或 underestimated。"
      />
    </Figure>
  );
}

export function GpuGems2Ch42AlgorithmCompareDiagram() {
  return (
    <Figure>
      <Frame label="两种 conservative rasterization GPU 算法对比：第一种生成最多九个顶点的最优 bounding polygon，第二种生成 bounding triangle 后在 fragment 阶段用 AABB 裁剪">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          几何处理与填充率之间的两种取舍
        </text>
        <rect
          x="48"
          y="88"
          width="300"
          height="252"
          rx="14"
          fill={C.accent}
          fillOpacity="0.1"
          stroke={C.accent}
        />
        <text
          x="198"
          y="124"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          Algorithm 1：最优 polygon
        </text>
        <polygon
          points="104,286 126,256 190,142 214,122 286,256 304,288"
          fill={C.accent}
          fillOpacity="0.24"
          stroke={C.accent}
          strokeWidth="3"
        />
        {Array.from({ length: 9 }, (_, index) => (
          <circle
            key={index}
            cx={106 + index * 23}
            cy={index % 2 === 0 ? 288 : 256 - (index % 3) * 22}
            r="5"
            fill={C.accent}
          />
        ))}
        <text
          x="198"
          y="326"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          低 overdraw，高 geometry/setup
        </text>
        <Arrow x1={348} y1={214} x2={412} y2={214} color={C.border} />
        <rect
          x="412"
          y="88"
          width="300"
          height="252"
          rx="14"
          fill={C.warning}
          fillOpacity="0.1"
          stroke={C.warning}
        />
        <text
          x="562"
          y="124"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          Algorithm 2：triangle + trim
        </text>
        <polygon
          points="466,298 562,122 676,298"
          fill={C.warning}
          fillOpacity="0.18"
          stroke={C.warning}
          strokeWidth="3"
        />
        <rect
          x="506"
          y="154"
          width="114"
          height="112"
          fill="none"
          stroke={C.success}
          strokeWidth="3"
          strokeDasharray="7 6"
        />
        <text
          x="562"
          y="288"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          vertex 少，fill rate 可能更高
        </text>
        <text
          x="380"
          y="382"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          acute triangle 让宽 bounding triangle 产生更多候选 fragments
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch42DepthBoundsDiagram() {
  return (
    <Figure>
      <Frame label="保守深度：在像素 cell 四个角落评估平面深度，使用 zmax 或 zmin 作为保守深度，辅助碰撞与遮挡测试">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          保守深度不是精确深度，而是安全边界
        </text>
        <rect
          x="74"
          y="112"
          width="246"
          height="198"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="197"
          y="146"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          pixel cell
        </text>
        <path d="M108 266 L286 172" stroke={C.accent} strokeWidth="4" />
        {[
          [108, 266, "z₁"],
          [108, 172, "z₂"],
          [286, 266, "z₃"],
          [286, 172, "z₄"],
        ].map(([x, y, label]) => (
          <g key={label}>
            <circle cx={x} cy={y} r="7" fill={C.warning} />
            <text
              x={Number(x) + 16}
              y={Number(y) + 5}
              fontSize="12"
              fill={C.secondary}
            >
              {label}
            </text>
          </g>
        ))}
        <Arrow x1={320} y1={210} x2={394} y2={210} color={C.accent} />
        <rect
          x="394"
          y="112"
          width="306"
          height="198"
          rx="14"
          fill={C.success}
          fillOpacity="0.1"
          stroke={C.success}
        />
        <text
          x="547"
          y="146"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.text}
        >
          conservative depth
        </text>
        <text
          x="547"
          y="188"
          textAnchor="middle"
          fontSize="13"
          fill={C.success}
        >
          zmax ≥ exact depth
        </text>
        <text x="547" y="222" textAnchor="middle" fontSize="13" fill={C.accent}>
          zmin ≤ exact depth
        </text>
        <text
          x="547"
          y="270"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          用于遮挡、碰撞的候选判定
        </text>
        <text
          x="380"
          y="360"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          过度估计带来候选，精确交集测试再负责最终确认
        </text>
      </Frame>
    </Figure>
  );
}

type RasterMode = "standard" | "over" | "under";

export function GpuGems2Ch42ConservativeRasterizationLab() {
  const [mode, setMode] = useState<RasterMode>("over");
  const [angle, setAngle] = useState(58);
  const [cellSize, setCellSize] = useState(50);
  const [epsilon, setEpsilon] = useState(2);
  const [degenerate, setDegenerate] = useState(false);

  const result = useMemo(() => {
    const baseCells = Math.max(1, Math.round(4 + angle / 22));
    const cellFactor = cellSize / 50;
    const overlapCells = Math.max(1, Math.round(baseCells * cellFactor));
    const candidates =
      mode === "standard"
        ? Math.max(1, overlapCells - (angle > 45 ? 1 : 0))
        : mode === "over"
          ? overlapCells + Math.max(1, Math.round(cellFactor))
          : Math.max(1, overlapCells - Math.round(cellFactor));
    const falsePositiveCells =
      mode === "over"
        ? Math.max(0, candidates - overlapCells)
        : mode === "under"
          ? 0
          : Math.max(0, overlapCells - candidates);
    const missRisk =
      mode === "standard"
        ? "可能漏检"
        : mode === "over"
          ? "不漏；可能多候选"
          : "不多；可能漏掉边界";
    const depth =
      mode === "over"
        ? "zmax / zmin"
        : mode === "under"
          ? "内部深度"
          : "普通深度";
    const robustness =
      degenerate || angle < 12
        ? `用 ε=${epsilon} 回退到标准剔除`
        : `ε=${epsilon} 内保持方向`;
    return {
      candidates,
      depth,
      falsePositiveCells,
      missRisk,
      overlapCells,
      robustness,
    };
  }, [angle, cellSize, degenerate, epsilon, mode]);

  const reset = () => {
    setMode("over");
    setAngle(58);
    setCellSize(50);
    setEpsilon(2);
    setDegenerate(false);
  };

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.82fr]">
        <div>
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="conservative rasterization 实验模式"
          >
            {(
              [
                ["standard", "standard"],
                ["over", "overestimated"],
                ["under", "underestimated"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={mode === value}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${mode === value ? "border-accent bg-accent/15 text-primary" : "border-border text-secondary hover:border-accent"}`}
                onClick={() => setMode(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 rounded-card border border-border bg-surface p-4">
            <label
              className="grid gap-1 text-sm text-secondary"
              htmlFor="ch42-angle"
            >
              triangle angle{" "}
              <span className="font-mono text-primary">{angle}°</span>
              <input
                id="ch42-angle"
                type="range"
                min="8"
                max="88"
                value={angle}
                onChange={(event) => setAngle(Number(event.target.value))}
                className="accent-accent"
              />
            </label>
            <label
              className="grid gap-1 text-sm text-secondary"
              htmlFor="ch42-cell-size"
            >
              pixel cell size{" "}
              <span className="font-mono text-primary">{cellSize}%</span>
              <input
                id="ch42-cell-size"
                type="range"
                min="25"
                max="90"
                value={cellSize}
                onChange={(event) => setCellSize(Number(event.target.value))}
                className="accent-accent"
              />
            </label>
            <label
              className="grid gap-1 text-sm text-secondary"
              htmlFor="ch42-epsilon"
            >
              robustness ε{" "}
              <span className="font-mono text-primary">{epsilon}</span>
              <input
                id="ch42-epsilon"
                type="range"
                min="1"
                max="8"
                value={epsilon}
                onChange={(event) => setEpsilon(Number(event.target.value))}
                className="accent-accent"
              />
            </label>
            <label
              className="flex items-center gap-2 text-sm text-secondary"
              htmlFor="ch42-degenerate"
            >
              <input
                id="ch42-degenerate"
                type="checkbox"
                checked={degenerate}
                onChange={(event) => setDegenerate(event.target.checked)}
                className="accent-accent"
              />
              注入 near-degenerate 三角形
            </label>
          </div>
          <button
            type="button"
            className="mt-3 rounded-full border border-border px-3 py-1.5 text-sm text-secondary hover:border-accent hover:text-primary"
            onClick={reset}
          >
            重置实验
          </button>
        </div>
        <div
          className="rounded-card border border-border bg-surface p-4"
          aria-live="polite"
        >
          <div className="mb-2 text-sm font-semibold text-primary">
            当前模式：
            {mode === "standard"
              ? "standard"
              : mode === "over"
                ? "overestimated"
                : "underestimated"}
          </div>
          <Metric
            label="几何相交 cell"
            value={`${result.overlapCells}`}
            tone={C.success}
          />
          <Metric
            label="生成候选 cell"
            value={`${result.candidates}`}
            tone={C.accent}
          />
          <Metric
            label="额外候选"
            value={`${result.falsePositiveCells}`}
            tone={C.warning}
          />
          <Metric
            label="漏检风险"
            value={result.missRisk}
            tone={mode === "standard" ? C.danger : C.success}
          />
          <Metric label="深度策略" value={result.depth} tone={C.accent} />
          <div
            className={`mt-4 rounded-card border p-3 text-sm ${degenerate || angle < 12 ? "border-warning bg-warning/10 text-primary" : "border-success bg-success/10 text-primary"}`}
          >
            {result.robustness}
          </div>
          <div
            className="mt-4 grid grid-cols-5 gap-1"
            aria-label="像素 cell 候选覆盖预览"
          >
            {Array.from({ length: 25 }, (_, index) => {
              const active = index < result.candidates;
              const exact = index < result.overlapCells;
              return (
                <div
                  key={index}
                  className={`h-7 rounded-sm border ${active ? (exact ? "border-success bg-success/45" : "border-warning bg-warning/35") : "border-border bg-bg"}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Figure>
  );
}
