"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";

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

function Frame({
  children,
  height = 420,
  label,
}: {
  children: ReactNode;
  height?: number;
  label: string;
}) {
  return (
    <svg
      viewBox={`0 0 760 ${height}`}
      role="img"
      aria-label={label}
      className="mx-auto block h-auto w-full max-w-[760px]"
    >
      <rect width="760" height={height} rx="16" fill={C.bg} />
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
  const size = 9;
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
        strokeDasharray={dashed ? "7 6" : undefined}
        strokeWidth="3"
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

export function GpuGems3Ch25CurveRepresentationDiagram() {
  return (
    <Figure>
      <Frame
        height={424}
        label="向量曲线的紧凑表示：控制点先形成 Bézier 凸包，GPU 光栅化覆盖三角形，像素着色器再判断曲线内外"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          describe the boundary, rasterize the hull, shade the curve
        </text>
        <g transform="translate(34 82)">
          <rect
            width="214"
            height="260"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="107"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            control points
          </text>
          <path
            d="M 44 190 Q 94 62 166 166"
            fill="none"
            stroke={C.warning}
            strokeWidth="5"
          />
          <path
            d="M 44 190 L 107 72 L 166 166 Z"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeDasharray="7 6"
            strokeWidth="2"
          />
          <circle cx="44" cy="190" r="7" fill={C.warning} />
          <circle cx="107" cy="72" r="7" fill={C.warning} />
          <circle cx="166" cy="166" r="7" fill={C.warning} />
          <text
            x="107"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            few points, no dense tessellation
          </text>
        </g>
        <Arrow x1={266} x2={304} y1={212} y2={212} color={C.warning} />
        <g transform="translate(304 82)">
          <rect
            width="214"
            height="260"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="107"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            GPU interpolation
          </text>
          <path
            d="M 44 190 L 107 72 L 166 166 Z"
            fill={C.success}
            fillOpacity="0.16"
            stroke={C.success}
            strokeWidth="3"
          />
          <path
            d="M 44 190 Q 94 62 166 166"
            fill="none"
            stroke={C.success}
            strokeWidth="5"
          />
          <circle cx="87" cy="142" r="5" fill={C.accent} />
          <circle cx="111" cy="134" r="5" fill={C.accent} />
          <circle cx="129" cy="136" r="5" fill={C.accent} />
          <text
            x="107"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            procedural coordinates interpolate
          </text>
        </g>
        <Arrow x1={536} x2={574} y1={212} y2={212} color={C.success} />
        <g transform="translate(570 82)">
          <rect
            width="156"
            height="260"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="78"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            pixel test
          </text>
          <path
            d="M 28 184 Q 72 72 130 166"
            fill="none"
            stroke={C.accent}
            strokeWidth="5"
          />
          <circle cx="70" cy="133" r="7" fill={C.success} />
          <circle cx="111" cy="133" r="7" fill={C.danger} />
          <text
            x="78"
            y="222"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            sign of f(x,y)
          </text>
          <text
            x="78"
            y="244"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            inside / outside
          </text>
        </g>
        <text
          x="380"
          y="382"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          geometry stores the boundary; the fragment stage decides coverage
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch25ImplicitQuadraticDiagram() {
  return (
    <Figure>
      <Frame
        height={430}
        label="二次 Bézier 的隐式化：u 和 v 在三角形顶点赋值，GPU 插值后像素着色器计算 u 的平方减 v 的符号"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          quadratic coverage: u² − v = 0
        </text>
        <g transform="translate(42 84)">
          <rect
            width="324"
            height="272"
            rx="14"
            fill={C.surface}
            stroke={C.border}
          />
          <text
            x="162"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            assign procedural coordinates
          </text>
          <path
            d="M 66 214 Q 161 54 260 194"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="4"
          />
          <path
            d="M 66 214 L 161 72 L 260 194 Z"
            fill="none"
            stroke={C.border}
            strokeDasharray="7 6"
            strokeWidth="2"
          />
          <text x="58" y="232" fontSize="13" fill={C.accent}>
            (u,v)=(0,0)
          </text>
          <text
            x="161"
            y="62"
            textAnchor="middle"
            fontSize="13"
            fill={C.accent}
          >
            (u,v)=(1/2,0)
          </text>
          <text x="267" y="214" fontSize="13" fill={C.accent}>
            (u,v)=(1,1)
          </text>
          <text
            x="162"
            y="260"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            interpolate u and v across the hull
          </text>
        </g>
        <Arrow x1={384} x2={424} y1={220} y2={220} color={C.accent} />
        <g transform="translate(430 84)">
          <rect
            width="286"
            height="272"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="143"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            fragment shader
          </text>
          <rect
            x="58"
            y="66"
            width="170"
            height="82"
            rx="10"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="143"
            y="101"
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            fill={C.accent}
          >
            f = u² − v
          </text>
          <text
            x="143"
            y="127"
            textAnchor="middle"
            fontSize="13"
            fill={C.secondary}
          >
            f &lt; 0: inside · f &gt; 0: outside
          </text>
          <path
            d="M 68 208 C 108 164 153 158 218 200"
            fill="none"
            stroke={C.success}
            strokeWidth="5"
          />
          <circle cx="105" cy="188" r="7" fill={C.success} />
          <circle cx="203" cy="191" r="7" fill={C.danger} />
          <text
            x="143"
            y="244"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            no texture lookup, no tessellation error
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch25CubicClassificationDiagram() {
  return (
    <Figure>
      <Frame
        height={432}
        label="三次曲线分类：根据拐点多项式判别式的正负零，分类为 serpentine、loop 或 cusp，再统一使用 k 的三次减去 l m 的隐式方程"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          cubic curves share one shader, not one shape
        </text>
        <g transform="translate(34 82)">
          <rect
            width="202"
            height="272"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="101"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            serpentine
          </text>
          <path
            d="M 34 204 C 56 86 134 252 172 76"
            fill="none"
            stroke={C.success}
            strokeWidth="5"
          />
          <text
            x="101"
            y="246"
            textAnchor="middle"
            fontSize="13"
            fill={C.success}
          >
            discriminant &gt; 0
          </text>
        </g>
        <g transform="translate(278 82)">
          <rect
            width="202"
            height="272"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="101"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            loop
          </text>
          <path
            d="M 34 110 C 148 38 148 252 72 182 C 48 160 110 132 172 204"
            fill="none"
            stroke={C.warning}
            strokeWidth="5"
          />
          <text
            x="101"
            y="246"
            textAnchor="middle"
            fontSize="13"
            fill={C.warning}
          >
            discriminant &lt; 0
          </text>
        </g>
        <g transform="translate(522 82)">
          <rect
            width="204"
            height="272"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="102"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            cusp
          </text>
          <path
            d="M 34 202 C 90 204 80 82 112 142 C 134 182 146 90 172 78"
            fill="none"
            stroke={C.accent}
            strokeWidth="5"
          />
          <text
            x="102"
            y="246"
            textAnchor="middle"
            fontSize="13"
            fill={C.accent}
          >
            discriminant = 0
          </text>
        </g>
        <rect
          x="68"
          y="372"
          width="624"
          height="34"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="394"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          classify offline; interpolate k,l,m at runtime; evaluate k³ − lm in
          every fragment
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch25AntialiasDiagram() {
  return (
    <Figure>
      <Frame
        height={420}
        label="曲线抗锯齿：像素着色器用 ddx 和 ddy 得到隐式函数梯度，将近似有符号距离映射成边界 alpha"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          gradients turn an implicit value into a soft edge
        </text>
        <g transform="translate(38 84)">
          <rect
            width="210"
            height="258"
            rx="14"
            fill={C.surface}
            stroke={C.border}
          />
          <text
            x="105"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            neighboring pixels
          </text>
          <path
            d="M 30 214 Q 102 64 180 198"
            fill="none"
            stroke={C.accent}
            strokeWidth="5"
          />
          <circle
            cx="86"
            cy="166"
            r="14"
            fill={C.warning}
            fillOpacity="0.35"
            stroke={C.warning}
            strokeWidth="2"
          />
          <path d="M 86 166 L 116 150" stroke={C.warning} strokeWidth="3" />
          <text
            x="105"
            y="238"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            ddx(f), ddy(f)
          </text>
        </g>
        <Arrow x1={270} x2={310} y1={214} y2={214} color={C.warning} />
        <g transform="translate(320 84)">
          <rect
            width="184"
            height="258"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="92"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            signed distance
          </text>
          <rect
            x="42"
            y="70"
            width="100"
            height="100"
            rx="50"
            fill={C.warning}
            fillOpacity="0.14"
            stroke={C.warning}
            strokeWidth="3"
          />
          <path
            d="M 58 150 Q 92 78 128 148"
            fill="none"
            stroke={C.warning}
            strokeWidth="4"
          />
          <text
            x="92"
            y="208"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            sd ≈ f / |∇f|
          </text>
          <text
            x="92"
            y="236"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            screen-space scale
          </text>
        </g>
        <Arrow x1={526} x2={566} y1={214} y2={214} color={C.success} />
        <g transform="translate(576 84)">
          <rect
            width="148"
            height="258"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="74"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            alpha ramp
          </text>
          <path
            d="M 30 180 L 52 180 L 74 164 L 96 112 L 118 96"
            fill="none"
            stroke={C.success}
            strokeWidth="5"
          />
          <circle cx="74" cy="164" r="7" fill={C.success} />
          <text
            x="74"
            y="214"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            alpha = 0.5 − sd
          </text>
          <text
            x="74"
            y="240"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            smooth edge
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "hull", caption: "用 Bézier 控制点的凸包生成最小覆盖三角形" },
  {
    label: "implicit",
    caption: "让 GPU 插值函数坐标，片元阶段判断隐式方程的符号",
  },
  { label: "edge", caption: "用屏幕梯度近似距离，把边界映射成抗锯齿 alpha" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  hull: "用 Bézier 控制点的凸包生成最小覆盖三角形",
  implicit: "让 GPU 插值函数坐标，片元阶段判断隐式方程的符号",
  edge: "用屏幕梯度近似距离，把边界映射成抗锯齿 alpha",
};

export function GpuGems3Ch25PipelineDiagram() {
  const hullRef = useRef<SVGGElement>(null);
  const implicitRef = useRef<SVGGElement>(null);
  const edgeRef = useRef<SVGGElement>(null);
  const refs = [hullRef, implicitRef, edgeRef];
  const timeline = useTeachingTimeline({
    steps: PIPELINE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(
          ref.current!,
          { opacity: [0.32, 1], duration: T * 0.45 },
          T * index,
        );
        tl.label(PIPELINE_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame
        height={438}
        label="GPU 向量曲线三步管线：凸包覆盖、隐式方程内外判断、梯度近似距离与抗锯齿"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          vector art as a compact fragment pipeline
        </text>
        <g ref={hullRef} style={{ opacity: 0.32 }}>
          <rect
            x="34"
            y="88"
            width="204"
            height="246"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="136"
            y="116"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            1 · hull
          </text>
          <path
            d="M 82 256 L 136 154 L 192 238 Z"
            fill={C.warning}
            fillOpacity="0.15"
            stroke={C.warning}
            strokeWidth="3"
          />
          <path
            d="M 82 256 Q 132 138 192 238"
            fill="none"
            stroke={C.warning}
            strokeWidth="5"
          />
          <text
            x="136"
            y="282"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            rasterize minimum cover
          </text>
        </g>
        <Arrow x1={258} x2={294} y1={211} y2={211} color={C.warning} />
        <g ref={implicitRef} style={{ opacity: 0.32 }}>
          <rect
            x="314"
            y="88"
            width="204"
            height="246"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="416"
            y="116"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            2 · implicit
          </text>
          <rect
            x="360"
            y="154"
            width="112"
            height="72"
            rx="9"
            fill={C.accent}
            fillOpacity="0.14"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="416"
            y="199"
            textAnchor="middle"
            fontSize="19"
            fontWeight="700"
            fill={C.accent}
          >
            sign(f)
          </text>
          <text
            x="416"
            y="282"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            keep or discard fragment
          </text>
        </g>
        <Arrow x1={538} x2={574} y1={211} y2={211} color={C.accent} />
        <g ref={edgeRef} style={{ opacity: 0.32 }}>
          <rect
            x="594"
            y="88"
            width="122"
            height="246"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="655"
            y="116"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            3 · edge
          </text>
          <path
            d="M 622 244 Q 648 154 688 218"
            fill="none"
            stroke={C.success}
            strokeWidth="5"
          />
          <path
            d="M 626 248 Q 648 170 684 222"
            fill="none"
            stroke={C.success}
            strokeOpacity="0.35"
            strokeWidth="12"
          />
          <text
            x="655"
            y="282"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            gradient → alpha
          </text>
        </g>
        <rect
          x="34"
          y="360"
          width="682"
          height="34"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="382"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          the vector stays resolution independent because coverage is decided
          per pixel
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="逐步观察少量曲线数据如何在 GPU 上变成可缩放、可透视的像素覆盖。"
      />
    </Figure>
  );
}

type CurveType = "quadratic" | "cubic";
type TransformMode = "flat" | "perspective";
type EdgeMode = "smooth" | "binary";

const DEFAULTS = {
  curve: "cubic" as CurveType,
  edge: "smooth" as EdgeMode,
  perspective: "perspective" as TransformMode,
  shape: 58,
};

export function GpuGems3Ch25VectorArtLab() {
  const [curve, setCurve] = useState<CurveType>(DEFAULTS.curve);
  const [perspective, setPerspective] = useState<TransformMode>(
    DEFAULTS.perspective,
  );
  const [edge, setEdge] = useState<EdgeMode>(DEFAULTS.edge);
  const [shape, setShape] = useState(DEFAULTS.shape);

  const result = useMemo(() => {
    const controlCount = curve === "quadratic" ? 3 : 4;
    const hullTriangles = curve === "quadratic" ? 1 : 2;
    const implicitCost = curve === "quadratic" ? "u² − v" : "k³ − lm";
    const perspectiveNote =
      perspective === "perspective"
        ? "perspective-correct interpolation keeps the curve stable"
        : "flat view makes the hull easier to inspect";
    const edgePixels = edge === "smooth" ? 18 + Math.round(shape * 0.08) : 0;
    const representation =
      curve === "quadratic" ? "quadratic Bézier" : "cubic Bézier";
    return {
      controlCount,
      edgePixels,
      hullTriangles,
      implicitCost,
      perspectiveNote,
      representation,
    };
  }, [curve, edge, perspective, shape]);

  const reset = () => {
    setCurve(DEFAULTS.curve);
    setPerspective(DEFAULTS.perspective);
    setEdge(DEFAULTS.edge);
    setShape(DEFAULTS.shape);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 25
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Vector Art on the GPU Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          切换曲线阶数、透视变换、边界模式和控制点形状，观察同一套隐式覆盖逻辑如何处理不同曲线。
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg
              viewBox="0 0 730 350"
              role="img"
              aria-label={`向量曲线实验：${result.representation}，${perspective} 变换，${edge} 边界，${result.controlCount} 个控制点，隐式方程 ${result.implicitCost}`}
              className="mx-auto block h-auto w-full"
            >
              <text
                x="365"
                y="24"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={C.text}
              >
                {result.representation} · {result.implicitCost} ·{" "}
                {result.perspectiveNote}
              </text>
              <rect
                x="42"
                y="56"
                width="646"
                height="208"
                rx="12"
                fill={C.surface}
                stroke={C.border}
              />
              <path
                d={
                  curve === "quadratic"
                    ? `M 102 218 Q ${240 + shape * 0.45} ${70 + (100 - shape) * 0.4} 432 198`
                    : `M 102 218 C ${180 + shape * 0.35} ${78 + (100 - shape) * 0.35}, ${294 + shape * 0.45} ${245 - shape * 0.35}, 432 198`
                }
                fill="none"
                stroke={C.accent}
                strokeWidth={edge === "smooth" ? 12 : 7}
                strokeOpacity={edge === "smooth" ? 0.24 : 0.14}
              />
              <path
                d={
                  curve === "quadratic"
                    ? `M 102 218 Q ${240 + shape * 0.45} ${70 + (100 - shape) * 0.4} 432 198`
                    : `M 102 218 C ${180 + shape * 0.35} ${78 + (100 - shape) * 0.35}, ${294 + shape * 0.45} ${245 - shape * 0.35}, 432 198`
                }
                fill="none"
                stroke={C.accent}
                strokeWidth="4"
              />
              <path
                d={
                  curve === "quadratic"
                    ? `M 102 218 L ${240 + shape * 0.45} ${70 + (100 - shape) * 0.4} L 432 198 Z`
                    : `M 102 218 L ${180 + shape * 0.35} ${78 + (100 - shape) * 0.35} L ${294 + shape * 0.45} ${245 - shape * 0.35} L 432 198 Z`
                }
                fill={C.accent}
                fillOpacity={perspective === "perspective" ? 0.12 : 0.18}
                stroke={C.border}
                strokeDasharray="7 6"
                strokeWidth="2"
              />
              {[
                [102, 218],
                [180 + shape * 0.35, 78 + (100 - shape) * 0.35],
                ...(curve === "cubic"
                  ? [[294 + shape * 0.45, 245 - shape * 0.35]]
                  : []),
                [432, 198],
              ].map(([x, y], index) => (
                <circle
                  key={`ch25-lab-control-${index}`}
                  cx={x}
                  cy={y}
                  r="7"
                  fill={
                    index === 0 || index === result.controlCount - 1
                      ? C.warning
                      : C.success
                  }
                />
              ))}
              {edge === "smooth" && (
                <path
                  d="M 108 222 Q 250 105 427 201"
                  fill="none"
                  stroke={C.success}
                  strokeOpacity="0.58"
                  strokeWidth="2"
                  strokeDasharray="4 5"
                />
              )}
              <text
                x="365"
                y="292"
                textAnchor="middle"
                fontSize="13"
                fill={C.secondary}
              >
                {perspective === "perspective"
                  ? "projective transform"
                  : "design-space view"}{" "}
                · hull triangles {result.hullTriangles} · edge pixels{" "}
                {result.edgePixels}
              </text>
              <text
                x="365"
                y="320"
                textAnchor="middle"
                fontSize="13"
                fill={edge === "smooth" ? C.success : C.warning}
              >
                {edge === "smooth"
                  ? "gradient-based alpha softens the boundary"
                  : "binary sign test keeps only inside fragments"}
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric
              label="控制点"
              tone={C.warning}
              value={`${result.controlCount}`}
            />
            <Metric
              label="凸包三角形"
              tone={C.accent}
              value={`${result.hullTriangles}`}
            />
            <Metric
              label="隐式方程"
              tone={C.success}
              value={result.implicitCost}
            />
            <Metric
              label="边界像素"
              tone={edge === "smooth" ? C.success : C.warning}
              value={`${result.edgePixels}`}
            />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch25-curve">
            curve family
            <select
              id="ch25-curve"
              value={curve}
              onChange={(event) => setCurve(event.target.value as CurveType)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="quadratic">quadratic · u² − v</option>
              <option value="cubic">cubic · k³ − lm</option>
            </select>
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch25-perspective"
          >
            transform
            <select
              id="ch25-perspective"
              value={perspective}
              onChange={(event) =>
                setPerspective(event.target.value as TransformMode)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="perspective">arbitrary projective view</option>
              <option value="flat">flat design-space view</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch25-edge">
            boundary mode
            <select
              id="ch25-edge"
              value={edge}
              onChange={(event) => setEdge(event.target.value as EdgeMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="smooth">gradient antialiasing</option>
              <option value="binary">binary inside / outside</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch25-shape">
            control-point shape: {shape}
            <input
              id="ch25-shape"
              type="range"
              min="12"
              max="88"
              value={shape}
              onChange={(event) => setShape(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
