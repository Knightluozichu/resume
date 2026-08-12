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
  height = 430,
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

export function GpuGems3Ch21BillboardDiagram() {
  return (
    <Figure>
      <Frame
        label="true impostor 的 billboard 几何：卡片朝向相机，像一扇窗让片元着色器重建卡片后的体积"
        height={420}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          turn one quad into a window for a 3D object
        </text>
        <g transform="translate(40 88)">
          <rect
            x="0"
            y="0"
            width="190"
            height="238"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <circle cx="88" cy="104" r="48" fill={C.accent} fillOpacity="0.13" />
          <path
            d="M 43 143 C 58 92 75 78 91 78 C 111 78 133 102 143 143"
            fill="none"
            stroke={C.accent}
            strokeWidth="4"
          />
          <path
            d="M 56 143 C 73 128 104 128 131 143"
            fill="none"
            stroke={C.success}
            strokeWidth="3"
          />
          <text
            x="95"
            y="188"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            many detailed models
          </text>
          <text
            x="95"
            y="214"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            the object stays behind the window
          </text>
        </g>
        <Arrow x1={264} x2={318} y1={208} y2={208} color={C.warning} />
        <g transform="translate(334 88)">
          <rect
            x="0"
            y="0"
            width="188"
            height="238"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <path
            d="M 38 188 L 150 188 L 150 48 L 38 48 Z"
            fill={C.accent}
            fillOpacity="0.08"
            stroke={C.accent}
            strokeWidth="3"
          />
          <circle
            cx="94"
            cy="119"
            r="32"
            fill={C.warning}
            fillOpacity="0.18"
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="94"
            y="196"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            camera-facing quad
          </text>
          <text
            x="94"
            y="218"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            rotated around its center
          </text>
        </g>
        <Arrow x1={555} x2={612} y1={208} y2={208} color={C.success} />
        <g transform="translate(626 88)">
          <circle
            cx="52"
            cy="116"
            r="45"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="2"
          />
          <path
            d="M 52 116 L 14 73 M 52 116 L 90 73 M 52 116 L 52 58"
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="52"
            y="194"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            view ray
          </text>
          <text
            x="52"
            y="216"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            tested per pixel
          </text>
        </g>
        <rect
          x="40"
          y="348"
          width="680"
          height="38"
          rx="10"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="373"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          geometry cost becomes one quad; detail is recovered where the ray
          meets the stored volume
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch21TextureVolumeDiagram() {
  const channelColors = [C.accent, C.warning, C.success, C.danger];
  return (
    <Figure>
      <Frame
        label="四通道纹理承载多个高度场：每个通道沿 W 轴表达一层深度，组合后形成一个可被射线查询的体积"
        height={430}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          four channels become depth layers along W
        </text>
        <g transform="translate(48 78)">
          <rect
            x="0"
            y="0"
            width="250"
            height="276"
            rx="14"
            fill={C.surface}
            stroke={C.border}
          />
          <text
            x="125"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            one RGBA texture
          </text>
          <rect
            x="48"
            y="60"
            width="154"
            height="154"
            rx="10"
            fill={C.bg}
            stroke={C.border}
          />
          {channelColors.map((color, index) => (
            <g key={`channel-${index}`} opacity={0.3 + index * 0.15}>
              <path
                d={`M ${60 + index * 6} ${190 - index * 17} C ${88 + index * 10} ${160 - index * 8} ${100 + index * 12} ${92 + index * 14} ${188 - index * 8} ${72 + index * 12}`}
                fill="none"
                stroke={color}
                strokeWidth="10"
                strokeLinecap="round"
              />
              <text x="66" y={242 + index * 0} fontSize="12" fill={color}>
                {index === 0
                  ? "R"
                  : index === 1
                    ? "G"
                    : index === 2
                      ? "B"
                      : "A"}
              </text>
            </g>
          ))}
          <text
            x="125"
            y="264"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            each channel stores a height field
          </text>
        </g>
        <Arrow x1={330} x2={384} y1={215} y2={215} />
        <g transform="translate(408 78)">
          <rect
            x="0"
            y="0"
            width="304"
            height="276"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
          />
          <text
            x="152"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            texture-coordinate volume
          </text>
          {channelColors.map((color, index) => {
            const y = 72 + index * 43;
            return (
              <g key={`layer-${index}`}>
                <line
                  x1="42"
                  y1={y}
                  x2="230"
                  y2={y}
                  stroke={color}
                  strokeWidth="3"
                />
                <circle
                  cx={92 + index * 27}
                  cy={y}
                  r="9"
                  fill={color}
                  fillOpacity="0.25"
                  stroke={color}
                  strokeWidth="2"
                />
                <text x="248" y={y + 5} fontSize="12" fill={color}>
                  W layer {index + 1}
                </text>
              </g>
            );
          })}
          <Arrow x1={44} x2={44} y1={244} y2={65} color={C.warning} />
          <text
            x="44"
            y="260"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            depth
          </text>
          <text
            x="152"
            y="258"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            UV stays 2D; channels provide volume samples
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch21RayMarchDiagram() {
  return (
    <Figure>
      <Frame
        label="视线射线在纹理体积中逐步前进：每次读取高度场，找到首次命中区间，再交给二分搜索收敛"
        height={452}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          march, bracket, refine
        </text>
        <g transform="translate(44 80)">
          <rect
            x="0"
            y="0"
            width="205"
            height="292"
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
            1 · march
          </text>
          <rect
            x="42"
            y="72"
            width="120"
            height="168"
            rx="10"
            fill={C.bg}
            stroke={C.border}
          />
          <path
            d="M 58 204 C 78 174 84 118 146 96"
            fill="none"
            stroke={C.warning}
            strokeWidth="3"
          />
          <line
            x1="62"
            y1="220"
            x2="145"
            y2="96"
            stroke={C.accent}
            strokeWidth="3"
          />
          {Array.from({ length: 6 }).map((_, index) => (
            <circle
              key={`march-point-${index}`}
              cx={70 + index * 14}
              cy={208 - index * 19}
              r="5"
              fill={index === 4 ? C.danger : C.accent}
            />
          ))}
          <text
            x="102"
            y="264"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            fixed steps test occupancy
          </text>
        </g>
        <Arrow x1={270} x2={322} y1={226} y2={226} color={C.warning} />
        <g transform="translate(338 80)">
          <rect
            x="0"
            y="0"
            width="205"
            height="292"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
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
            2 · bracket
          </text>
          <rect
            x="42"
            y="72"
            width="120"
            height="168"
            rx="10"
            fill={C.bg}
            stroke={C.border}
          />
          <path
            d="M 58 204 C 78 174 84 118 146 96"
            fill="none"
            stroke={C.warning}
            strokeWidth="3"
          />
          <line
            x1="64"
            y1="196"
            x2="134"
            y2="120"
            stroke={C.accent}
            strokeWidth="3"
          />
          <circle cx="64" cy="196" r="7" fill={C.success} />
          <circle cx="134" cy="120" r="7" fill={C.danger} />
          <text
            x="102"
            y="264"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            previous and first-hit samples
          </text>
        </g>
        <Arrow x1={560} x2={612} y1={226} y2={226} color={C.success} />
        <g transform="translate(628 80)">
          <rect
            x="0"
            y="0"
            width="88"
            height="292"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="44"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            3
          </text>
          <line
            x1="44"
            y1="74"
            x2="44"
            y2="230"
            stroke={C.success}
            strokeWidth="4"
          />
          <circle
            cx="44"
            cy="151"
            r="12"
            fill={C.success}
            fillOpacity="0.25"
            stroke={C.success}
            strokeWidth="3"
          />
          <text
            x="44"
            y="264"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            exact hit
          </text>
        </g>
        <rect
          x="44"
          y="396"
          width="672"
          height="34"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="418"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          the loop is fixed-size on the GPU; the bracket makes the final search
          precise
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch21RefractionDiagram() {
  return (
    <Figure>
      <Frame
        label="透明 true impostor 的多层射线：命中第一层后计算折射，继续穿过体积并累计行进距离"
        height={420}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          translucent surfaces reuse the remaining ray
        </text>
        <rect
          x="44"
          y="84"
          width="672"
          height="252"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <path
          d="M 90 296 C 210 266 238 150 340 122 C 414 102 438 180 520 164 C 590 150 620 112 682 102"
          fill="none"
          stroke={C.warning}
          strokeWidth="3"
          strokeDasharray="8 7"
        />
        <path
          d="M 90 296 C 210 266 238 150 340 122"
          fill="none"
          stroke={C.accent}
          strokeWidth="4"
        />
        <path
          d="M 340 122 C 394 152 416 228 470 250 C 530 274 588 224 682 184"
          fill="none"
          stroke={C.success}
          strokeWidth="4"
        />
        <circle cx="340" cy="122" r="10" fill={C.accent} />
        <circle cx="470" cy="250" r="10" fill={C.success} />
        <line
          x1="242"
          y1="96"
          x2="242"
          y2="316"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <line
          x1="530"
          y1="96"
          x2="530"
          y2="316"
          stroke={C.border}
          strokeWidth="2"
          strokeDasharray="6 6"
        />
        <text
          x="242"
          y="320"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          first surface
        </text>
        <text
          x="530"
          y="320"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          next surface
        </text>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          accumulate distance inside the volume to approximate translucency
        </text>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "quad", caption: "把 UV 与相机射线装进朝向相机的卡片" },
  { label: "intersect", caption: "在纹理体积中步进并收窄首次交点" },
  { label: "shade", caption: "用命中位置、法线与剩余射线完成着色" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  quad: "把 UV 与相机射线装进朝向相机的卡片",
  intersect: "在纹理体积中步进并收窄首次交点",
  shade: "用命中位置、法线与剩余射线完成着色",
};

export function GpuGems3Ch21PipelineDiagram() {
  const quadRef = useRef<SVGGElement>(null);
  const intersectRef = useRef<SVGGElement>(null);
  const shadeRef = useRef<SVGGElement>(null);
  const refs = [quadRef, intersectRef, shadeRef];
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
        label="true impostor 的三步 GPU 管线：准备 billboard，搜索纹理体积交点，最后用命中结果着色"
        height={430}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          true impostor in three fragment stages
        </text>
        <g ref={quadRef} style={{ opacity: 0.32 }}>
          <rect
            x="34"
            y="86"
            width="204"
            height="248"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <rect
            x="82"
            y="136"
            width="108"
            height="108"
            rx="8"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="136"
            y="112"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            billboard
          </text>
          <text
            x="136"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            UV + view ray
          </text>
        </g>
        <Arrow x1={258} x2={294} y1={210} y2={210} />
        <g ref={intersectRef} style={{ opacity: 0.32 }}>
          <rect
            x="314"
            y="86"
            width="204"
            height="248"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <line
            x1="350"
            y1="276"
            x2="478"
            y2="132"
            stroke={C.warning}
            strokeWidth="3"
          />
          {Array.from({ length: 5 }).map((_, index) => (
            <circle
              key={`pipeline-sample-${index}`}
              cx={368 + index * 24}
              cy={256 - index * 27}
              r="6"
              fill={index === 3 ? C.danger : C.warning}
            />
          ))}
          <text
            x="416"
            y="112"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            ray search
          </text>
          <text
            x="416"
            y="306"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            march + refine
          </text>
        </g>
        <Arrow x1={538} x2={574} y1={210} y2={210} />
        <g ref={shadeRef} style={{ opacity: 0.32 }}>
          <rect
            x="594"
            y="86"
            width="122"
            height="248"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <circle
            cx="655"
            cy="192"
            r="42"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="3"
          />
          <path
            d="M 625 204 Q 655 174 685 204"
            fill="none"
            stroke={C.success}
            strokeWidth="3"
          />
          <text
            x="655"
            y="112"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            shade
          </text>
          <text
            x="655"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            color + normal
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
          the card is cheap; the fragment search pays only for visible pixels
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="逐步观察几何、交点和着色如何从同一张卡片中接力。"
      />
    </Figure>
  );
}

type PackingMode = "rgba" | "layers";
type SurfaceMode = "opaque" | "translucent";
type SortingMode = "sorted" | "unsorted";

const DEFAULTS = {
  marchSteps: 16,
  packing: "rgba" as PackingMode,
  refineSteps: 4,
  sorting: "sorted" as SortingMode,
  surface: "opaque" as SurfaceMode,
};

export function GpuGems3Ch21TrueImpostorLab() {
  const [packing, setPacking] = useState<PackingMode>(DEFAULTS.packing);
  const [marchSteps, setMarchSteps] = useState(DEFAULTS.marchSteps);
  const [refineSteps, setRefineSteps] = useState(DEFAULTS.refineSteps);
  const [surface, setSurface] = useState<SurfaceMode>(DEFAULTS.surface);
  const [sorting, setSorting] = useState<SortingMode>(DEFAULTS.sorting);

  const result = useMemo(() => {
    const channelCoverage = packing === "rgba" ? 92 : 78;
    const marchCoverage = Math.min(96, 55 + marchSteps * 2.2);
    const refinement = Math.min(98, 58 + refineSteps * 8);
    const coverage = Math.round(
      Math.min(channelCoverage, marchCoverage, refinement),
    );
    const reads =
      marchSteps +
      refineSteps * 2 +
      (surface === "translucent" ? marchSteps / 2 : 0);
    const overdraw = sorting === "sorted" ? "可控" : "偏高";
    const overdrawTone = sorting === "sorted" ? C.success : C.danger;
    const interval = `${Math.max(0.5, 10 / Math.max(1, refineSteps * refineSteps)).toFixed(1)}%`;
    const note =
      surface === "translucent"
        ? "命中后折射并继续步进，读取次数上升但可以累计体积距离。"
        : "首次命中后停止着色，适合不透明表面。";
    return { coverage, interval, note, overdraw, overdrawTone, reads };
  }, [marchSteps, packing, refineSteps, sorting, surface]);

  const reset = () => {
    setPacking(DEFAULTS.packing);
    setMarchSteps(DEFAULTS.marchSteps);
    setRefineSteps(DEFAULTS.refineSteps);
    setSurface(DEFAULTS.surface);
    setSorting(DEFAULTS.sorting);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 21
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              True Impostor Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          调整体数据打包、射线步数、交点细化、材质路径和深度排序，观察每个可见片元的搜索成本与遮挡风险。
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
              viewBox="0 0 730 326"
              role="img"
              aria-label={`True impostor 实验：${packing} 打包，${marchSteps} 次射线步进，${refineSteps} 次细化，${surface} 材质，${sorting} 排序，覆盖 ${result.coverage}%`}
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
                {surface === "translucent"
                  ? "ray continues through multiple surfaces"
                  : "first-hit ray casting"}
              </text>
              <rect
                x="70"
                y="66"
                width="590"
                height="176"
                rx="12"
                fill={C.surface}
                stroke={C.border}
              />
              <path
                d="M 94 214 C 190 204 240 114 338 124 C 436 134 468 212 628 86"
                fill="none"
                stroke={C.warning}
                strokeWidth="3"
                strokeDasharray="8 7"
              />
              <path
                d="M 94 214 C 190 204 240 114 338 124"
                fill="none"
                stroke={C.accent}
                strokeWidth="4"
              />
              {Array.from({
                length: Math.min(12, Math.max(5, Math.round(marchSteps / 2))),
              }).map((_, index, points) => {
                const t = (index + 1) / (points.length + 1);
                const x = 112 + t * 220;
                const y = 210 - t * 84;
                return (
                  <circle
                    key={`lab-ray-${index}`}
                    cx={x}
                    cy={y}
                    r="5"
                    fill={index === points.length - 1 ? C.danger : C.accent}
                  />
                );
              })}
              {surface === "translucent" && (
                <path
                  d="M 338 124 C 406 164 446 232 520 210 C 562 198 586 174 628 150"
                  fill="none"
                  stroke={C.success}
                  strokeWidth="4"
                />
              )}
              <circle cx="338" cy="124" r="10" fill={C.danger} />
              <text
                x="338"
                y="101"
                textAnchor="middle"
                fontSize="12"
                fill={C.danger}
              >
                hit
              </text>
              <text
                x="365"
                y="270"
                textAnchor="middle"
                fontSize="13"
                fill={C.secondary}
              >
                {result.note}
              </text>
              <text
                x="365"
                y="296"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                {packing === "rgba"
                  ? "RGBA packs four height fields"
                  : "separate layers add memory but extend shape"}{" "}
                · coverage {result.coverage}%
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric
              label="交点覆盖"
              tone={result.coverage < 80 ? C.warning : C.success}
              value={`${result.coverage}%`}
            />
            <Metric
              label="最终区间宽度"
              tone={C.accent}
              value={result.interval}
            />
            <Metric
              label="纹理读取估算"
              tone={C.warning}
              value={`${result.reads.toFixed(0)} reads`}
            />
            <Metric
              label="卡片遮挡风险"
              tone={result.overdrawTone}
              value={result.overdraw}
            />
          </div>
        </div>
        <div className="space-y-4">
          <label
            className="block text-sm text-secondary"
            htmlFor="ch21-packing"
          >
            texture packing
            <select
              id="ch21-packing"
              value={packing}
              onChange={(event) =>
                setPacking(event.target.value as PackingMode)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="rgba">one RGBA texture</option>
              <option value="layers">separate depth layers</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch21-march">
            march steps: {marchSteps}
            <input
              id="ch21-march"
              type="range"
              min="8"
              max="32"
              value={marchSteps}
              onChange={(event) => setMarchSteps(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch21-refine">
            binary refinement: {refineSteps}
            <input
              id="ch21-refine"
              type="range"
              min="2"
              max="8"
              value={refineSteps}
              onChange={(event) => setRefineSteps(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch21-surface"
          >
            material path
            <select
              id="ch21-surface"
              value={surface}
              onChange={(event) =>
                setSurface(event.target.value as SurfaceMode)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="opaque">opaque first hit</option>
              <option value="translucent">translucent continuation</option>
            </select>
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch21-sorting"
          >
            depth sorting
            <select
              id="ch21-sorting"
              value={sorting}
              onChange={(event) =>
                setSorting(event.target.value as SortingMode)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="sorted">CPU sorted cards</option>
              <option value="unsorted">unsorted cards</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
