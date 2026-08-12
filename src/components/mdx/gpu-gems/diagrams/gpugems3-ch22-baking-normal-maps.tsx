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

export function GpuGems3Ch22ProjectionDiagram() {
  return (
    <Figure>
      <Frame
        label="法线烘焙的投影流程：把低模光栅化到纹理空间，从 cage 发射射线命中高模，再把命中的法线写入 normal map"
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
          project a high-poly normal into a low-poly UV
        </text>
        <g transform="translate(34 86)">
          <rect
            x="0"
            y="0"
            width="206"
            height="246"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="103"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            working model
          </text>
          <path
            d="M 40 174 L 82 76 L 158 102 L 178 190 L 108 214 Z"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="3"
          />
          <path
            d="M 40 174 L 108 214 M 82 76 L 108 214 M 158 102 L 108 214"
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="103"
            y="232"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            UV + tangent basis
          </text>
        </g>
        <Arrow x1={268} x2={312} y1={210} y2={210} color={C.warning} />
        <g transform="translate(326 86)">
          <rect
            x="0"
            y="0"
            width="206"
            height="246"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="103"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            cage ray
          </text>
          <path
            d="M 44 188 C 50 92 156 66 172 186"
            fill="none"
            stroke={C.warning}
            strokeWidth="3"
            strokeDasharray="7 6"
          />
          <path
            d="M 66 174 C 82 116 128 102 154 174"
            fill="none"
            stroke={C.success}
            strokeWidth="4"
          />
          <line
            x1="80"
            y1="186"
            x2="112"
            y2="128"
            stroke={C.accent}
            strokeWidth="3"
          />
          <line
            x1="116"
            y1="184"
            x2="128"
            y2="106"
            stroke={C.accent}
            strokeWidth="3"
          />
          <circle cx="112" cy="128" r="8" fill={C.danger} />
          <text
            x="103"
            y="232"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            nearest valid hit
          </text>
        </g>
        <Arrow x1={560} x2={604} y1={210} y2={210} color={C.success} />
        <g transform="translate(618 86)">
          <rect
            x="0"
            y="0"
            width="108"
            height="246"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="54"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            map
          </text>
          <rect
            x="24"
            y="78"
            width="60"
            height="86"
            rx="8"
            fill={C.success}
            fillOpacity="0.16"
            stroke={C.success}
            strokeWidth="2"
          />
          <path
            d="M 28 146 L 80 94 M 42 164 L 84 122"
            stroke={C.accent}
            strokeWidth="4"
          />
          <text
            x="54"
            y="198"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            tangent RGB
          </text>
          <text
            x="54"
            y="218"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            normal map
          </text>
        </g>
        <rect
          x="34"
          y="360"
          width="692"
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
          one pixel is independent: rasterize, trace, select a hit, encode
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch22CageDiagram() {
  return (
    <Figure>
      <Frame
        label="boundary cage 包住工作模型与参考模型：射线从 cage 出发，靠近 cage 的有效命中用于当前纹理像素"
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
          the cage controls where projection begins
        </text>
        <rect
          x="56"
          y="80"
          width="648"
          height="258"
          rx="14"
          fill={C.surface}
          stroke={C.border}
        />
        <path
          d="M 128 270 C 138 102 584 86 636 270"
          fill="none"
          stroke={C.warning}
          strokeWidth="3"
          strokeDasharray="9 7"
        />
        <path
          d="M 190 256 C 218 132 516 126 570 256"
          fill="none"
          stroke={C.accent}
          strokeWidth="4"
        />
        <path
          d="M 242 252 C 276 166 464 160 516 252"
          fill="none"
          stroke={C.success}
          strokeWidth="4"
        />
        <line
          x1="206"
          y1="252"
          x2="276"
          y2="166"
          stroke={C.warning}
          strokeWidth="3"
        />
        <line
          x1="540"
          y1="252"
          x2="464"
          y2="160"
          stroke={C.warning}
          strokeWidth="3"
        />
        <circle cx="276" cy="166" r="9" fill={C.danger} />
        <circle cx="464" cy="160" r="9" fill={C.danger} />
        <text
          x="380"
          y="114"
          textAnchor="middle"
          fontSize="14"
          fill={C.warning}
        >
          boundary cage
        </text>
        <text x="380" y="218" textAnchor="middle" fontSize="14" fill={C.accent}>
          working model
        </text>
        <text
          x="380"
          y="306"
          textAnchor="middle"
          fontSize="14"
          fill={C.success}
        >
          reference model
        </text>
        <text
          x="380"
          y="378"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          a good cage encloses both surfaces and keeps the intended hit closest
          to its origin
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch22GridDdaDiagram() {
  return (
    <Figure>
      <Frame
        label="uniform grid 与 3D-DDA：射线按照 tmax 最小的轴跨过相邻 voxel，空 cell 快速跳过，有几何的 cell 才测试三角形"
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
          skip empty cells with a uniform grid and 3D-DDA
        </text>
        <g transform="translate(42 78)">
          <rect
            x="0"
            y="0"
            width="322"
            height="300"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="161"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            uniform grid
          </text>
          {Array.from({ length: 16 }).map((_, index) => {
            const col = index % 4;
            const row = Math.floor(index / 4);
            const occupied = [5, 6, 10, 11].includes(index);
            return (
              <rect
                key={`grid-cell-${index}`}
                x={40 + col * 59}
                y={68 + row * 49}
                width="52"
                height="42"
                rx="5"
                fill={occupied ? C.warning : C.bg}
                fillOpacity={occupied ? 0.18 : 1}
                stroke={occupied ? C.warning : C.border}
              />
            );
          })}
          <path d="M 28 276 L 286 84" stroke={C.accent} strokeWidth="4" />
          <circle cx="147" cy="187" r="8" fill={C.danger} />
          <text
            x="161"
            y="274"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            occupied cells hold triangle-list pointers
          </text>
        </g>
        <Arrow x1={390} x2={438} y1={226} y2={226} color={C.warning} />
        <g transform="translate(454 78)">
          <rect
            x="0"
            y="0"
            width="262"
            height="300"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="131"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            3D-DDA state
          </text>
          <text x="32" y="84" fontSize="14" fill={C.warning}>
            tmax
          </text>
          <text x="112" y="84" fontSize="14" fill={C.accent}>
            step
          </text>
          <text x="182" y="84" fontSize="14" fill={C.success}>
            delta
          </text>
          <line
            x1="32"
            y1="108"
            x2="230"
            y2="108"
            stroke={C.border}
            strokeWidth="2"
          />
          <text x="32" y="142" fontSize="13" fill={C.secondary}>
            choose smallest tmax axis
          </text>
          <Arrow x1={52} x2={208} y1={174} y2={174} color={C.accent} />
          <text x="32" y="214" fontSize="13" fill={C.secondary}>
            advance one voxel
          </text>
          <Arrow x1={52} x2={208} y1={244} y2={244} color={C.success} />
          <text x="32" y="274" fontSize="13" fill={C.secondary}>
            test triangles only there
          </text>
        </g>
        <rect
          x="42"
          y="404"
          width="674"
          height="30"
          rx="8"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="424"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          traversal cost follows visited voxels, not every triangle in the
          reference mesh
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch22GpuMemoryDiagram() {
  return (
    <Figure>
      <Frame
        label="GPU 数据布局：3D grid texture 指向 2D triangle-list texture，列表索引再访问 vertex 与 normal textures"
        height={438}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          map the ray tracer into texture resources
        </text>
        <g transform="translate(32 82)">
          <rect
            x="0"
            y="0"
            width="168"
            height="278"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="84"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            3D grid
          </text>
          <path
            d="M 38 92 L 112 64 L 146 86 L 72 116 Z M 38 92 L 38 188 L 72 212 L 72 116 M 72 116 L 146 86 L 146 182 L 72 212"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="2"
          />
          <circle cx="89" cy="151" r="9" fill={C.warning} />
          <text
            x="84"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            cell → list start
          </text>
        </g>
        <Arrow x1={224} x2={270} y1={221} y2={221} />
        <g transform="translate(286 82)">
          <rect
            x="0"
            y="0"
            width="176"
            height="278"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="88"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            triangle list
          </text>
          {Array.from({ length: 7 }).map((_, index) => (
            <g key={`tri-list-${index}`}>
              <rect
                x="28"
                y={62 + index * 23}
                width="120"
                height="15"
                rx="4"
                fill={index === 4 ? C.warning : C.bg}
                stroke={index === 4 ? C.warning : C.border}
              />
              <text
                x="88"
                y={74 + index * 23}
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                {index === 4 ? "triangle 4" : `index ${index}`}
              </text>
            </g>
          ))}
          <text
            x="88"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            null ends the list
          </text>
        </g>
        <Arrow x1={488} x2={532} y1={164} y2={164} />
        <Arrow x1={488} x2={532} y1={278} y2={278} color={C.success} />
        <g transform="translate(548 82)">
          <rect
            x="0"
            y="0"
            width="178"
            height="278"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="89"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            geometry data
          </text>
          <rect
            x="28"
            y="64"
            width="122"
            height="54"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
          />
          <text
            x="89"
            y="88"
            textAnchor="middle"
            fontSize="13"
            fill={C.success}
          >
            vertex texture
          </text>
          <text
            x="89"
            y="106"
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            positions
          </text>
          <rect
            x="28"
            y="146"
            width="122"
            height="54"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
          />
          <text
            x="89"
            y="170"
            textAnchor="middle"
            fontSize="13"
            fill={C.accent}
          >
            normal texture
          </text>
          <text
            x="89"
            y="188"
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            interpolated normals
          </text>
          <text
            x="89"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            indices stay compact
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch22TangentNormalDiagram() {
  return (
    <Figure>
      <Frame
        label="法线编码：从参考模型的世界空间法线，使用工作模型的切线基变换到 tangent space，再映射到零到一的 RGB"
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
          store the hit normal in the working model&apos;s tangent space
        </text>
        <g transform="translate(44 90)">
          <rect
            x="0"
            y="0"
            width="196"
            height="232"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="98"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            world normal
          </text>
          <circle
            cx="98"
            cy="122"
            r="46"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="2"
          />
          <line
            x1="98"
            y1="122"
            x2="146"
            y2="78"
            stroke={C.success}
            strokeWidth="4"
          />
          <line
            x1="98"
            y1="122"
            x2="98"
            y2="68"
            stroke={C.warning}
            strokeWidth="3"
          />
          <text
            x="98"
            y="196"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            from reference hit
          </text>
        </g>
        <Arrow x1={270} x2={318} y1={206} y2={206} />
        <g transform="translate(334 90)">
          <rect
            x="0"
            y="0"
            width="196"
            height="232"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="98"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            tangent basis
          </text>
          <line
            x1="98"
            y1="144"
            x2="148"
            y2="144"
            stroke={C.accent}
            strokeWidth="3"
          />
          <line
            x1="98"
            y1="144"
            x2="98"
            y2="82"
            stroke={C.warning}
            strokeWidth="3"
          />
          <line
            x1="98"
            y1="144"
            x2="62"
            y2="178"
            stroke={C.success}
            strokeWidth="3"
          />
          <text x="152" y="148" fontSize="12" fill={C.accent}>
            T
          </text>
          <text x="102" y="78" fontSize="12" fill={C.warning}>
            B
          </text>
          <text x="48" y="184" fontSize="12" fill={C.success}>
            N
          </text>
          <text
            x="98"
            y="196"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            dot with T, B, N
          </text>
        </g>
        <Arrow x1={560} x2={608} y1={206} y2={206} color={C.accent} />
        <g transform="translate(624 90)">
          <rect
            x="0"
            y="0"
            width="102"
            height="232"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="51"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            RGB
          </text>
          <rect
            x="22"
            y="76"
            width="58"
            height="64"
            rx="7"
            fill={C.accent}
            fillOpacity="0.14"
            stroke={C.accent}
          />
          <circle cx="38" cy="96" r="8" fill={C.danger} />
          <circle cx="60" cy="96" r="8" fill={C.success} />
          <circle cx="49" cy="120" r="8" fill={C.accent} />
          <text
            x="51"
            y="180"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            normal × 0.5 + 0.5
          </text>
          <text
            x="51"
            y="202"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            write bitmap
          </text>
        </g>
        <text
          x="380"
          y="370"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          tangent space makes the baked map portable with the working model
        </text>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "project", caption: "把工作模型光栅化到 UV 空间并建立射线" },
  { label: "traverse", caption: "用 uniform grid 和 3D-DDA 找到最近三角形" },
  { label: "encode", caption: "把命中法线变换到切线空间并写入 RGB" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  project: "把工作模型光栅化到 UV 空间并建立射线",
  traverse: "用 uniform grid 和 3D-DDA 找到最近三角形",
  encode: "把命中法线变换到切线空间并写入 RGB",
};

export function GpuGems3Ch22PipelineDiagram() {
  const projectRef = useRef<SVGGElement>(null);
  const traverseRef = useRef<SVGGElement>(null);
  const encodeRef = useRef<SVGGElement>(null);
  const refs = [projectRef, traverseRef, encodeRef];
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
        label="GPU 法线烘焙三步管线：投影工作模型，遍历 uniform grid 找命中，编码切线空间法线"
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
          GPU normal-map baking in three fragment stages
        </text>
        <g ref={projectRef} style={{ opacity: 0.32 }}>
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
          <text
            x="136"
            y="112"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            project
          </text>
          <rect
            x="84"
            y="148"
            width="104"
            height="74"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="3"
          />
          <path
            d="M 94 206 L 132 160 L 174 206"
            fill="none"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="136"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            UV pixel + cage ray
          </text>
        </g>
        <Arrow x1={258} x2={294} y1={210} y2={210} />
        <g ref={traverseRef} style={{ opacity: 0.32 }}>
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
          <text
            x="416"
            y="112"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            traverse
          </text>
          <path d="M 350 272 L 482 130" stroke={C.warning} strokeWidth="3" />
          {Array.from({ length: 5 }).map((_, index) => (
            <circle
              key={`pipeline-cell-${index}`}
              cx={370 + index * 25}
              cy={250 - index * 26}
              r="6"
              fill={index === 3 ? C.danger : C.warning}
            />
          ))}
          <text
            x="416"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            cell → triangle list
          </text>
        </g>
        <Arrow x1={538} x2={574} y1={210} y2={210} />
        <g ref={encodeRef} style={{ opacity: 0.32 }}>
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
          <text
            x="655"
            y="112"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            encode
          </text>
          <circle
            cx="655"
            cy="188"
            r="40"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="3"
          />
          <line
            x1="655"
            y1="188"
            x2="684"
            y2="158"
            stroke={C.success}
            strokeWidth="4"
          />
          <text
            x="655"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            tangent RGB
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
          independent pixels make the projection a natural stream-processing
          workload
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="逐步观察一个 UV 像素如何从低模表面走到最终的切线空间法线。"
      />
    </Figure>
  );
}

type GridResolution = "64" | "128" | "256";
type TraversalMode = "dda" | "linear";
type PassMode = "single" | "multi";
type PrecisionMode = "full" | "packed";

const DEFAULTS = {
  antiAliasRays: 4,
  grid: "128" as GridResolution,
  pass: "single" as PassMode,
  precision: "full" as PrecisionMode,
  traversal: "dda" as TraversalMode,
};

export function GpuGems3Ch22NormalMapLab() {
  const [grid, setGrid] = useState<GridResolution>(DEFAULTS.grid);
  const [traversal, setTraversal] = useState<TraversalMode>(DEFAULTS.traversal);
  const [pass, setPass] = useState<PassMode>(DEFAULTS.pass);
  const [antiAliasRays, setAntiAliasRays] = useState(DEFAULTS.antiAliasRays);
  const [precision, setPrecision] = useState<PrecisionMode>(DEFAULTS.precision);

  const result = useMemo(() => {
    const resolution = Number(grid);
    const gridMemory = (resolution ** 3 * 4) / (1024 * 1024);
    const geometryMemory = precision === "full" ? 12 : 6;
    const visits =
      traversal === "dda"
        ? Math.max(4, Math.round((30 * 128) / resolution))
        : Math.round((48 * 128) / resolution);
    const passes = pass === "single" ? 1 : 4;
    const aliasRisk = Math.max(
      8,
      Math.round(58 / antiAliasRays + (precision === "packed" ? 8 : 0)),
    );
    const memory = gridMemory + geometryMemory + (pass === "multi" ? 8 : 0);
    const note =
      pass === "multi"
        ? "多遍渲染把 traversal 状态存入临时纹理，牺牲带宽换取更长的总迭代预算。"
        : "单遍渲染最直接，但要遵守片元循环上限并控制临时变量。";
    return { aliasRisk, memory, note, passes, visits };
  }, [antiAliasRays, grid, pass, precision, traversal]);

  const reset = () => {
    setGrid(DEFAULTS.grid);
    setTraversal(DEFAULTS.traversal);
    setPass(DEFAULTS.pass);
    setAntiAliasRays(DEFAULTS.antiAliasRays);
    setPrecision(DEFAULTS.precision);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 22
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              GPU Normal Map Baking Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          调整网格分辨率、遍历方法、渲染遍数、抗锯齿射线和数据精度，观察 GPU
          法线烘焙的读取、内存与稳定性取舍。
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
              aria-label={`法线烘焙实验：${grid} 网格，${traversal} 遍历，${pass} pass，${antiAliasRays} 条抗锯齿射线，${precision} 精度，访问 ${result.visits} 个 cell`}
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
                {traversal === "dda"
                  ? "3D-DDA visits coherent cells"
                  : "linear traversal checks more empty space"}
              </text>
              <rect
                x="54"
                y="60"
                width="622"
                height="184"
                rx="12"
                fill={C.surface}
                stroke={C.border}
              />
              {Array.from({ length: 25 }).map((_, index) => {
                const col = index % 5;
                const row = Math.floor(index / 5);
                const active =
                  traversal === "dda"
                    ? [6, 7, 12, 13, 18].includes(index)
                    : index % 2 === 0;
                return (
                  <rect
                    key={`lab-grid-${index}`}
                    x={92 + col * 94}
                    y={80 + row * 29}
                    width="78"
                    height="22"
                    rx="4"
                    fill={active ? C.warning : C.bg}
                    fillOpacity={active ? 0.2 : 1}
                    stroke={active ? C.warning : C.border}
                  />
                );
              })}
              <path d="M 88 220 L 552 78" stroke={C.accent} strokeWidth="4" />
              <circle cx="356" cy="138" r="9" fill={C.danger} />
              <path
                d="M 356 138 L 648 138"
                stroke={C.success}
                strokeWidth="3"
                strokeDasharray="7 6"
              />
              <text
                x="365"
                y="274"
                textAnchor="middle"
                fontSize="13"
                fill={C.secondary}
              >
                {result.note}
              </text>
              <text
                x="365"
                y="298"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                {grid}³ grid · {result.visits} visited cells · {antiAliasRays}{" "}
                rays · {precision} data
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric
              label="网格访问"
              tone={C.accent}
              value={`${result.visits} cells`}
            />
            <Metric
              label="纹理内存估算"
              tone={C.warning}
              value={`${result.memory.toFixed(1)} MB`}
            />
            <Metric
              label="临时 pass"
              tone={C.success}
              value={`${result.passes}`}
            />
            <Metric
              label="锯齿风险"
              tone={result.aliasRisk > 28 ? C.danger : C.success}
              value={`${result.aliasRisk}%`}
            />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch22-grid">
            grid resolution
            <select
              id="ch22-grid"
              value={grid}
              onChange={(event) =>
                setGrid(event.target.value as GridResolution)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="64">64 × 64 × 64</option>
              <option value="128">128 × 128 × 128</option>
              <option value="256">256 × 256 × 256</option>
            </select>
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch22-traversal"
          >
            traversal mode
            <select
              id="ch22-traversal"
              value={traversal}
              onChange={(event) =>
                setTraversal(event.target.value as TraversalMode)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="dda">uniform grid + 3D-DDA</option>
              <option value="linear">linear cell scan</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch22-pass">
            rendering passes
            <select
              id="ch22-pass"
              value={pass}
              onChange={(event) => setPass(event.target.value as PassMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="single">single pass</option>
              <option value="multi">multipass / tiled</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch22-aa">
            antialias rays: {antiAliasRays}
            <input
              id="ch22-aa"
              type="range"
              min="1"
              max="16"
              step="1"
              value={antiAliasRays}
              onChange={(event) => setAntiAliasRays(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch22-precision"
          >
            data precision
            <select
              id="ch22-precision"
              value={precision}
              onChange={(event) =>
                setPrecision(event.target.value as PrecisionMode)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="full">full precision textures</option>
              <option value="packed">packed normals / vertices</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
