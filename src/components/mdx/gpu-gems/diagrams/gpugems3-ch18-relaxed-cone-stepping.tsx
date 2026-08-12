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
  height = 440,
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

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "fragment", caption: "fragment f 先把观察方向变换到 tangent space" },
  { label: "search", caption: "沿二维纹理射线搜索 depth map 的交点 P" },
  { label: "shade", caption: "用 P 的位置和 normal map 的法线完成着色" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  fragment: "fragment f 先把观察方向变换到 tangent space",
  search: "沿二维纹理射线搜索 depth map 的交点 P",
  shade: "用 P 的位置和 normal map 的法线完成着色",
};

export function GpuGems3Ch18ReliefPipelineDiagram() {
  const fragmentRef = useRef<SVGGElement>(null);
  const searchRef = useRef<SVGGElement>(null);
  const shadeRef = useRef<SVGGElement>(null);
  const refs = [fragmentRef, searchRef, shadeRef];
  const timeline = useTeachingTimeline({
    steps: PIPELINE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(
          ref.current!,
          { opacity: [0.35, 1], duration: T * 0.45 },
          T * index,
        );
        tl.label(PIPELINE_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame
        label="relief mapping 三步管线：fragment 在切线空间生成观察射线，搜索 depth map 的交点，再用交点位置和 normal map 法线着色"
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
          per-fragment relief rendering
        </text>
        <g ref={fragmentRef} style={{ opacity: 0.35 }}>
          <rect
            x="36"
            y="92"
            width="190"
            height="222"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <circle
            cx="130"
            cy="174"
            r="45"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="2"
          />
          <circle cx="130" cy="174" r="7" fill={C.warning} />
          <line
            x1="130"
            y1="174"
            x2="194"
            y2="128"
            stroke={C.warning}
            strokeWidth="3"
          />
          <text
            x="130"
            y="254"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            fragment f
          </text>
          <text
            x="130"
            y="279"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            V → tangent space
          </text>
        </g>
        <Arrow x1={244} x2={280} y1={204} y2={204} />
        <g ref={searchRef} style={{ opacity: 0.35 }}>
          <rect
            x="294"
            y="78"
            width="210"
            height="250"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <path
            d="M 316 262 C 350 190 384 250 420 148 S 476 208 486 116"
            fill="none"
            stroke={C.warning}
            strokeWidth="4"
          />
          <line
            x1="322"
            y1="124"
            x2="476"
            y2="276"
            stroke={C.accent}
            strokeWidth="3"
          />
          <circle cx="420" cy="148" r="7" fill={C.success} />
          <text
            x="399"
            y="110"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            depth map
          </text>
          <text
            x="420"
            y="294"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            intersection P in 2D UV
          </text>
        </g>
        <Arrow x1={522} x2={558} y1={204} y2={204} color={C.success} />
        <g ref={shadeRef} style={{ opacity: 0.35 }}>
          <rect
            x="572"
            y="92"
            width="152"
            height="222"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <path
            d="M 648 124 L 604 246 L 692 246 Z"
            fill={C.success}
            fillOpacity="0.14"
            stroke={C.success}
            strokeWidth="2"
          />
          <line
            x1="648"
            y1="190"
            x2="700"
            y2="160"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="648"
            y="278"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            shade at P
          </text>
          <text
            x="648"
            y="299"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            normal + color
          </text>
        </g>
        <rect
          x="36"
          y="352"
          width="688"
          height="42"
          rx="11"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          depth / normal can stay separate: search reads depth first, lighting
          reads normal last
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="播放三步：把表面细节留在纹理里，把交点和法线重新带回片元着色。"
      />
    </Figure>
  );
}

export function GpuGems3Ch18SearchCompareDiagram() {
  return (
    <Figure>
      <Frame
        label="三种高度场交点搜索比较：线性搜索可能跳过薄结构，直接二分可能收敛到错误位置，放松锥步进先跨越再二分"
        height={470}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          why the first search matters
        </text>
        <g transform="translate(28 70)">
          <rect
            width="218"
            height="330"
            rx="14"
            fill={C.surface}
            stroke={C.danger}
            strokeWidth="2"
          />
          <text
            x="109"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            linear search
          </text>
          <path
            d="M 28 274 C 62 228 74 256 96 196 C 121 124 132 244 162 210 C 182 188 191 130 199 86"
            fill="none"
            stroke={C.danger}
            strokeWidth="4"
          />
          <line
            x1="30"
            y1="278"
            x2="201"
            y2="96"
            stroke={C.accent}
            strokeWidth="3"
          />
          {[0, 1, 2, 3, 4].map((index) => (
            <circle
              key={`linear-dot-${index}`}
              cx={48 + index * 38}
              cy={264 - index * 40}
              r="6"
              fill={C.warning}
            />
          ))}
          <circle
            cx="120"
            cy="171"
            r="9"
            fill={C.danger}
            fillOpacity="0.28"
            stroke={C.danger}
            strokeWidth="2"
          />
          <text
            x="109"
            y="306"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            thin structure skipped
          </text>
          <text
            x="109"
            y="326"
            textAnchor="middle"
            fontSize="12"
            fill={C.danger}
          >
            aliasing artifact
          </text>
        </g>
        <g transform="translate(270 70)">
          <rect
            width="218"
            height="330"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="109"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            binary from start
          </text>
          <path
            d="M 28 274 C 62 228 74 256 96 196 C 121 124 132 244 162 210 C 182 188 191 130 199 86"
            fill="none"
            stroke={C.warning}
            strokeWidth="4"
          />
          <line
            x1="30"
            y1="278"
            x2="201"
            y2="96"
            stroke={C.accent}
            strokeWidth="3"
          />
          <line
            x1="116"
            y1="226"
            x2="116"
            y2="116"
            stroke={C.warning}
            strokeDasharray="7 6"
            strokeWidth="2"
          />
          <circle cx="116" cy="171" r="8" fill={C.warning} />
          <text x="128" y="166" fontSize="12" fill={C.warning}>
            Q
          </text>
          <text
            x="109"
            y="306"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            no safe bracket yet
          </text>
          <text
            x="109"
            y="326"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            wrong convergence
          </text>
        </g>
        <g transform="translate(512 70)">
          <rect
            width="220"
            height="330"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="110"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            relaxed cone + binary
          </text>
          <path
            d="M 28 274 C 62 228 74 256 96 196 C 121 124 132 244 162 210 C 182 188 191 130 199 86"
            fill="none"
            stroke={C.success}
            strokeWidth="4"
          />
          <path
            d="M 36 268 L 168 112 L 198 88 L 86 230 Z"
            fill={C.success}
            fillOpacity="0.11"
            stroke={C.success}
            strokeDasharray="8 6"
            strokeWidth="2"
          />
          <circle cx="149" cy="188" r="8" fill={C.success} />
          <line
            x1="118"
            y1="221"
            x2="175"
            y2="151"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="110"
            y="306"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            wider safe leap
          </text>
          <text
            x="110"
            y="326"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            then refine in bracket
          </text>
        </g>
        <text
          x="380"
          y="444"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          RCS changes the first phase; binary search remains the precision phase
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch18ConeMapDiagram() {
  return (
    <Figure>
      <Frame
        label="保守锥步进与放松锥步进：保守锥不穿透表面但可能提前停止，放松锥允许最多穿透一次后交给二分搜索"
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
          the useful relaxation: enter once, never leave twice
        </text>
        <g transform="translate(36 74)">
          <rect
            width="324"
            height="292"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="162"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            conservative cone map
          </text>
          <path
            d="M 42 238 C 86 192 110 222 148 150 C 184 82 224 208 282 112"
            fill="none"
            stroke={C.warning}
            strokeWidth="4"
          />
          <path
            d="M 58 226 L 198 112 L 234 94 L 104 232 Z"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeDasharray="8 6"
            strokeWidth="2"
          />
          <line
            x1="58"
            y1="226"
            x2="198"
            y2="112"
            stroke={C.accent}
            strokeWidth="3"
          />
          <circle cx="158" cy="144" r="7" fill={C.warning} />
          <text
            x="162"
            y="270"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            never pierces → safe but narrow
          </text>
          <text
            x="162"
            y="290"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            max steps may stop before P
          </text>
        </g>
        <g transform="translate(400 74)">
          <rect
            width="324"
            height="292"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="162"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            relaxed cone map
          </text>
          <path
            d="M 42 238 C 86 192 110 222 148 150 C 184 82 224 208 282 112"
            fill="none"
            stroke={C.success}
            strokeWidth="4"
          />
          <path
            d="M 56 228 L 244 82 L 286 60 L 118 250 Z"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeDasharray="8 6"
            strokeWidth="2"
          />
          <line
            x1="56"
            y1="228"
            x2="244"
            y2="82"
            stroke={C.accent}
            strokeWidth="3"
          />
          <circle cx="151" cy="153" r="7" fill={C.success} />
          <circle cx="184" cy="127" r="7" fill={C.success} />
          <text
            x="162"
            y="270"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            wider leap → reaches inside surface
          </text>
          <text
            x="162"
            y="290"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            at most one crossing → binary safe
          </text>
        </g>
        <rect
          x="36"
          y="384"
          width="688"
          height="28"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="403"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          wider cones reduce texture accesses without giving up a valid
          refinement interval
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch18ConeMapBakeDiagram() {
  return (
    <Figure>
      <Frame
        label="放松锥图离线生成：每个源 texel 与所有目标 texel 配对，计算 cone ratio，取最小值并把上限裁剪到 1"
        height={440}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          offline relaxed-cone-map construction
        </text>
        <g transform="translate(38 78)">
          <rect
            width="180"
            height="264"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="90"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            source texel ti
          </text>
          <rect
            x="46"
            y="72"
            width="88"
            height="88"
            fill={C.bg}
            stroke={C.border}
          />
          {Array.from({ length: 9 }).map((_, index) => (
            <rect
              key={`source-cell-${index}`}
              x={50 + (index % 3) * 26}
              y={76 + Math.floor(index / 3) * 26}
              width="22"
              height="22"
              fill={index === 4 ? C.accent : C.surface}
              stroke={C.border}
            />
          ))}
          <circle cx="90" cy="116" r="7" fill={C.accent} />
          <text
            x="90"
            y="202"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            start at depth 0
          </text>
          <text
            x="90"
            y="224"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            scan every destination
          </text>
          <text
            x="90"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            O(n²), offline only
          </text>
        </g>
        <Arrow x1={240} x2={282} y1={210} y2={210} />
        <g transform="translate(300 78)">
          <rect
            width="190"
            height="264"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="95"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            pairwise ratio
          </text>
          <line
            x1="36"
            y1="90"
            x2="152"
            y2="214"
            stroke={C.warning}
            strokeWidth="3"
          />
          <circle cx="36" cy="90" r="8" fill={C.accent} />
          <circle cx="152" cy="214" r="8" fill={C.success} />
          <text
            x="95"
            y="74"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            ti → tj → next hit
          </text>
          <text
            x="95"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            ratio = width / height
          </text>
        </g>
        <Arrow x1={514} x2={556} y1={210} y2={210} color={C.success} />
        <g transform="translate(574 78)">
          <rect
            width="150"
            height="264"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="75"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            cone map texel
          </text>
          {[0.3, 0.62, 0.95].map((value, index) => (
            <g key={`ratio-${index}`}>
              <rect
                x="30"
                y={78 + index * 42}
                width={90}
                height="24"
                rx="6"
                fill={C.success}
                fillOpacity={0.16 + value * 0.24}
                stroke={C.success}
              />
              <text
                x="75"
                y={95 + index * 42}
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                ratio {value.toFixed(2)}
              </text>
            </g>
          ))}
          <text
            x="75"
            y="226"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            take minimum
          </text>
          <text
            x="75"
            y="248"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            clamp max to 1.0
          </text>
        </g>
        <text
          x="380"
          y="390"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          a single channel stores w/h; the runtime shader only reads the result
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch18RcsRefineDiagram() {
  return (
    <Figure>
      <Frame
        label="运行时放松锥步进与二分精化：锥步进到达 K，随后以 H 和 K 作为区间端点二分逼近真实交点 P"
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
          runtime: leap to K, refine between H and K
        </text>
        <line
          x1="64"
          y1="294"
          x2="696"
          y2="294"
          stroke={C.border}
          strokeWidth="2"
        />
        <path
          d="M 76 266 C 134 220 176 258 238 174 C 294 98 342 246 412 160 C 468 94 552 190 686 92"
          fill="none"
          stroke={C.success}
          strokeWidth="4"
        />
        <path
          d="M 82 254 L 262 148 L 406 166 L 492 122"
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
        />
        <circle cx="262" cy="148" r="8" fill={C.accent} />
        <circle cx="406" cy="166" r="8" fill={C.warning} />
        <circle cx="370" cy="184" r="9" fill={C.success} />
        <text
          x="258"
          y="122"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          H
        </text>
        <text
          x="414"
          y="146"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          K
        </text>
        <text
          x="370"
          y="216"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          P ≈ binary result
        </text>
        <Arrow x1={104} x2={244} y1={250} y2={164} color={C.accent} />
        <Arrow x1={274} x2={394} y1={152} y2={164} color={C.warning} />
        <line
          x1="262"
          y1="330"
          x2="406"
          y2="330"
          stroke={C.success}
          strokeWidth="3"
        />
        <line
          x1="262"
          y1="320"
          x2="262"
          y2="340"
          stroke={C.success}
          strokeWidth="3"
        />
        <line
          x1="406"
          y1="320"
          x2="406"
          y2="340"
          stroke={C.success}
          strokeWidth="3"
        />
        <text
          x="334"
          y="354"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          binary search halves [H, K] for a fixed number of iterations
        </text>
        <rect
          x="64"
          y="382"
          width="632"
          height="28"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="401"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          fewer dependent texture reads and more active threads: keep the loop
          compact
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch18MipMapDiagram() {
  return (
    <Figure>
      <Frame
        label="纹理过滤取舍：颜色和法线地图可做常规 mipmap，锥图不能平均过滤，应使用保守最小值或 nearest 采样"
        height={410}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          filter the data according to its meaning
        </text>
        <g transform="translate(42 82)">
          <rect
            width="202"
            height="246"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="101"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            color / normal map
          </text>
          <rect
            x="34"
            y="66"
            width="134"
            height="82"
            fill={C.bg}
            stroke={C.border}
          />
          {[0, 1, 2, 3].map((index) => (
            <rect
              key={`color-cell-${index}`}
              x={40 + index * 30}
              y="76"
              width="24"
              height="62"
              fill={C.accent}
              fillOpacity={0.18 + index * 0.12}
            />
          ))}
          <Arrow x1={101} x2={101} y1={164} y2={198} color={C.success} />
          <rect
            x="58"
            y="208"
            width="86"
            height="22"
            rx="6"
            fill={C.success}
            fillOpacity="0.2"
            stroke={C.success}
          />
          <text
            x="101"
            y="224"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            regular mip OK
          </text>
        </g>
        <g transform="translate(280 82)">
          <rect
            width="202"
            height="246"
            rx="14"
            fill={C.surface}
            stroke={C.danger}
            strokeWidth="2"
          />
          <text
            x="101"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            cone map average
          </text>
          <rect
            x="34"
            y="66"
            width="134"
            height="82"
            fill={C.bg}
            stroke={C.border}
          />
          {[0.1, 0.9, 0.2, 0.8].map((value, index) => (
            <rect
              key={`bad-cone-${index}`}
              x={40 + index * 30}
              y={76 + (1 - value) * 40}
              width="24"
              height={value * 40}
              fill={C.danger}
              fillOpacity="0.22"
            />
          ))}
          <Arrow x1={101} x2={101} y1={164} y2={198} color={C.danger} />
          <rect
            x="48"
            y="208"
            width="106"
            height="22"
            rx="6"
            fill={C.danger}
            fillOpacity="0.16"
            stroke={C.danger}
          />
          <text
            x="101"
            y="224"
            textAnchor="middle"
            fontSize="12"
            fill={C.danger}
          >
            average cone wrong
          </text>
        </g>
        <g transform="translate(518 82)">
          <rect
            width="202"
            height="246"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="101"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            cone map safe path
          </text>
          <rect
            x="34"
            y="66"
            width="134"
            height="82"
            fill={C.bg}
            stroke={C.border}
          />
          {[0.1, 0.9, 0.2, 0.8].map((value, index) => (
            <rect
              key={`safe-cone-${index}`}
              x={40 + index * 30}
              y={76 + (1 - value) * 40}
              width="24"
              height={value * 40}
              fill={C.warning}
              fillOpacity="0.22"
            />
          ))}
          <Arrow x1={101} x2={101} y1={164} y2={198} color={C.warning} />
          <rect
            x="40"
            y="208"
            width="122"
            height="22"
            rx="6"
            fill={C.warning}
            fillOpacity="0.16"
            stroke={C.warning}
          />
          <text
            x="101"
            y="224"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            min reduce / nearest
          </text>
        </g>
        <text
          x="380"
          y="370"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          filtering color is smoothing; filtering cone ratios changes the
          intersection guarantee
        </text>
      </Frame>
    </Figure>
  );
}

type SearchMode = "linear" | "csm" | "rcs";
type ConeSampling = "nearest" | "minimum" | "filtered";

const DEFAULTS = {
  binarySteps: 6,
  coneRatio: 72,
  coneSteps: 12,
  mode: "rcs" as SearchMode,
  sampling: "minimum" as ConeSampling,
};

export function GpuGems3Ch18RelaxedConeLab() {
  const [mode, setMode] = useState<SearchMode>(DEFAULTS.mode);
  const [coneRatio, setConeRatio] = useState(DEFAULTS.coneRatio);
  const [coneSteps, setConeSteps] = useState(DEFAULTS.coneSteps);
  const [binarySteps, setBinarySteps] = useState(DEFAULTS.binarySteps);
  const [sampling, setSampling] = useState<ConeSampling>(DEFAULTS.sampling);

  const result = useMemo(() => {
    const leap =
      mode === "rcs"
        ? coneRatio / 100
        : mode === "csm"
          ? (coneRatio * 0.62) / 100
          : 0.22;
    const samples = mode === "linear" ? 36 : coneSteps + binarySteps;
    const samplingPenalty =
      sampling === "filtered" ? 18 : sampling === "nearest" ? 4 : 0;
    const thinRisk = Math.max(
      2,
      Math.round(42 - leap * 28 - binarySteps * 2 + samplingPenalty),
    );
    const confidence = Math.min(
      98,
      Math.max(
        54,
        Math.round(62 + leap * 36 + binarySteps * 2 - samplingPenalty),
      ),
    );
    const registers =
      mode === "linear"
        ? 18
        : 14 + (coneSteps > 14 ? 4 : 0) + (binarySteps > 6 ? 2 : 0);
    const note =
      mode === "rcs"
        ? sampling === "filtered"
          ? "锥图被平均过滤后，空间跳跃的保证变弱；改用 minimum 或 nearest。"
          : "放松锥先进入高度场，再把安全区间交给二分搜索。"
        : mode === "csm"
          ? "保守锥不会穿透，但步数不足时会停在真实交点之前。"
          : "线性搜索容易漏掉薄结构；它适合作为对照，不适合作为最终路径。";
    return { confidence, registers, samples, thinRisk, note };
  }, [binarySteps, coneRatio, coneSteps, mode, sampling]);

  const reset = () => {
    setMode(DEFAULTS.mode);
    setConeRatio(DEFAULTS.coneRatio);
    setConeSteps(DEFAULTS.coneSteps);
    setBinarySteps(DEFAULTS.binarySteps);
    setSampling(DEFAULTS.sampling);
  };

  const surfacePath =
    "M 34 204 C 82 156 116 188 158 116 C 198 48 252 172 300 96 C 354 12 422 158 474 84 C 530 20 604 132 694 52";
  const rayEnd =
    mode === "linear"
      ? { x: 548, y: 100 }
      : mode === "csm"
        ? { x: 500, y: 112 }
        : { x: 458, y: 124 };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 18
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Relaxed Cone Stepping Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          调整搜索路径与锥图参数，观察“先跨越、后精化”如何在纹理访问、薄结构风险和寄存器预算之间取舍。
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary"
        >
          重置实验
        </button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.15fr_0.85fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg
              viewBox="0 0 730 300"
              role="img"
              aria-label={`放松锥步进实验：当前路径 ${mode}，锥图比例 ${coneRatio}%，锥步 ${coneSteps} 次，二分 ${binarySteps} 次，置信度 ${result.confidence}%`}
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
                tangent-space ray / relief height field
              </text>
              <path
                d={surfacePath}
                fill="none"
                stroke={C.success}
                strokeWidth="4"
              />
              <line
                x1="44"
                y1="244"
                x2="690"
                y2="244"
                stroke={C.border}
                strokeWidth="2"
              />
              <path
                d={`M 54 232 L ${rayEnd.x - 90} ${rayEnd.y + 30} L ${rayEnd.x + 18} ${rayEnd.y - 28} L ${rayEnd.x - 12} ${rayEnd.y + 60} Z`}
                fill={
                  mode === "rcs"
                    ? C.accent
                    : mode === "csm"
                      ? C.warning
                      : C.danger
                }
                fillOpacity="0.12"
                stroke={
                  mode === "rcs"
                    ? C.accent
                    : mode === "csm"
                      ? C.warning
                      : C.danger
                }
                strokeDasharray="8 6"
                strokeWidth="2"
              />
              <line
                x1="54"
                y1="232"
                x2={rayEnd.x}
                y2={rayEnd.y}
                stroke={C.accent}
                strokeWidth="3"
              />
              <circle cx={rayEnd.x} cy={rayEnd.y} r="8" fill={C.success} />
              <text
                x={rayEnd.x + 15}
                y={rayEnd.y - 10}
                fontSize="13"
                fontWeight="700"
                fill={C.success}
              >
                {mode === "rcs" ? "P" : mode === "csm" ? "P′" : "sample"}
              </text>
              {Array.from({
                length:
                  mode === "linear"
                    ? 8
                    : Math.min(8, Math.max(3, Math.round(coneSteps / 2))),
              }).map((_, index) => {
                const x = 90 + index * 70;
                const y = 220 - index * 19;
                return (
                  <circle
                    key={`lab-step-${index}`}
                    cx={x}
                    cy={y}
                    r="5"
                    fill={mode === "rcs" ? C.accent : C.warning}
                  />
                );
              })}
              <text
                x="365"
                y="276"
                textAnchor="middle"
                fontSize="13"
                fill={C.secondary}
              >
                {result.note}
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric
              label="命中可信度"
              tone={C.success}
              value={`${result.confidence}%`}
            />
            <Metric
              label="薄结构风险"
              tone={result.thinRisk > 30 ? C.danger : C.warning}
              value={`${result.thinRisk}%`}
            />
            <Metric
              label="纹理访问估算"
              tone={C.accent}
              value={`${result.samples} reads`}
            />
            <Metric
              label="寄存器压力"
              tone={result.registers > 18 ? C.warning : C.success}
              value={`${result.registers} regs`}
            />
          </div>
        </div>
        <div className="space-y-4">
          <label
            className="block text-sm text-secondary"
            htmlFor="ch18-search-mode"
          >
            search mode
            <select
              id="ch18-search-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as SearchMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="rcs">RCS + binary refine</option>
              <option value="csm">conservative cone step</option>
              <option value="linear">linear baseline</option>
            </select>
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch18-cone-ratio"
          >
            relaxed cone ratio: {coneRatio}%
            <input
              id="ch18-cone-ratio"
              type="range"
              min="35"
              max="95"
              value={coneRatio}
              onChange={(event) => setConeRatio(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch18-cone-steps"
          >
            cone steps: {coneSteps}
            <input
              id="ch18-cone-steps"
              type="range"
              min="4"
              max="18"
              value={coneSteps}
              onChange={(event) => setConeSteps(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch18-binary-steps"
          >
            binary steps: {binarySteps}
            <input
              id="ch18-binary-steps"
              type="range"
              min="2"
              max="8"
              value={binarySteps}
              onChange={(event) => setBinarySteps(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch18-cone-sampling"
          >
            cone-map sampling
            <select
              id="ch18-cone-sampling"
              value={sampling}
              onChange={(event) =>
                setSampling(event.target.value as ConeSampling)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="minimum">conservative minimum reduction</option>
              <option value="nearest">nearest neighbor</option>
              <option value="filtered">regular filtered mip</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
