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
  { label: "pdf", caption: "用材质的 BRDF 形状定义哪些方向更重要" },
  { label: "sequence", caption: "把均匀输入映射成均匀覆盖的样本方向" },
  { label: "filter", caption: "用 PDF 和样本数选择环境图 mip level" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  pdf: "用材质的 BRDF 形状定义哪些方向更重要",
  sequence: "把均匀输入映射成均匀覆盖的样本方向",
  filter: "用 PDF 和样本数选择环境图 mip level",
};

export function GpuGems3Ch20SamplingPipelineDiagram() {
  const pdfRef = useRef<SVGGElement>(null);
  const sequenceRef = useRef<SVGGElement>(null);
  const filterRef = useRef<SVGGElement>(null);
  const refs = [pdfRef, sequenceRef, filterRef];
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
        label="GPU 重要性采样三步管线：由 BRDF 定义 PDF，用序列生成方向，再根据 PDF 与样本数选择环境图 mip level"
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
          importance sampling in one shader
        </text>
        <g ref={pdfRef} style={{ opacity: 0.35 }}>
          <rect
            x="34"
            y="88"
            width="196"
            height="234"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="132"
            y="122"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            material PDF
          </text>
          <path
            d="M 64 258 C 98 248 108 116 132 112 C 156 116 166 248 200 258"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="3"
          />
          <line
            x1="64"
            y1="258"
            x2="200"
            y2="258"
            stroke={C.border}
            strokeWidth="2"
          />
          <text
            x="132"
            y="286"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            peak near specular direction
          </text>
          <text
            x="132"
            y="306"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            p(u) integrates to 1
          </text>
        </g>
        <Arrow x1={248} x2={286} y1={204} y2={204} />
        <g ref={sequenceRef} style={{ opacity: 0.35 }}>
          <rect
            x="300"
            y="76"
            width="196"
            height="258"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="398"
            y="110"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            sample directions
          </text>
          <circle
            cx="398"
            cy="204"
            r="72"
            fill={C.warning}
            fillOpacity="0.08"
            stroke={C.warning}
          />
          {Array.from({ length: 10 }).map((_, index) => {
            const angle = -Math.PI * 0.82 + (index / 9) * Math.PI * 0.64;
            const radius = 28 + (index % 3) * 14;
            return (
              <circle
                key={`direction-${index}`}
                cx={398 + Math.cos(angle) * radius}
                cy={204 + Math.sin(angle) * radius}
                r="5"
                fill={C.warning}
              />
            );
          })}
          <line
            x1="398"
            y1="204"
            x2="398"
            y2="116"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="398"
            y="284"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            ξ₁, ξ₂ → u
          </text>
          <text
            x="398"
            y="306"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            more points where p is high
          </text>
        </g>
        <Arrow x1={514} x2={552} y1={204} y2={204} color={C.success} />
        <g ref={filterRef} style={{ opacity: 0.35 }}>
          <rect
            x="566"
            y="88"
            width="160"
            height="234"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="646"
            y="122"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            filtered lookup
          </text>
          <rect
            x="600"
            y="154"
            width="92"
            height="88"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
          />
          <text
            x="646"
            y="190"
            textAnchor="middle"
            fontSize="13"
            fill={C.success}
          >
            env map
          </text>
          <text
            x="646"
            y="212"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            LOD from p(u)·N
          </text>
          <text
            x="646"
            y="284"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            low PDF → broad average
          </text>
          <text
            x="646"
            y="306"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            high PDF → sharp lookup
          </text>
        </g>
        <rect
          x="34"
          y="354"
          width="692"
          height="40"
          rx="10"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="379"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          sample where the integrand matters, then filter according to how much
          area each sample represents
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="播放三个阶段：PDF 负责偏置，序列负责覆盖，mipmap 负责把有限样本变得可用。"
      />
    </Figure>
  );
}

export function GpuGems3Ch20IntegralDiagram() {
  return (
    <Figure>
      <Frame
        label="环境光照积分：每个入射方向带来环境光、BRDF 与余弦项的乘积，最终在半球上积分得到出射光"
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
          from every direction to a finite estimate
        </text>
        <g transform="translate(34 78)">
          <rect
            width="230"
            height="278"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="115"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            incident hemisphere
          </text>
          <path
            d="M 36 228 Q 115 76 194 228"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
            strokeWidth="2"
          />
          <line
            x1="44"
            y1="228"
            x2="186"
            y2="228"
            stroke={C.border}
            strokeWidth="2"
          />
          {[-0.72, -0.42, -0.13, 0.2, 0.52, 0.78].map((value, index) => (
            <line
              key={`integral-ray-${index}`}
              x1="115"
              y1="228"
              x2={115 + value * 90}
              y2={228 - (1 - Math.abs(value)) * 120}
              stroke={C.warning}
              strokeWidth="2.5"
            />
          ))}
          <text
            x="115"
            y="260"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            Li(u) · f(u, v) · cos θu
          </text>
        </g>
        <Arrow x1={282} x2={326} y1={216} y2={216} />
        <g transform="translate(342 78)">
          <rect
            width="184"
            height="278"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="92"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            finite samples
          </text>
          <path
            d="M 28 226 C 70 100 116 252 156 116"
            fill="none"
            stroke={C.warning}
            strokeWidth="3"
          />
          {[0, 1, 2, 3, 4].map((index) => (
            <circle
              key={`estimate-${index}`}
              cx={44 + index * 28}
              cy={184 - (index % 2) * 42}
              r="6"
              fill={C.warning}
            />
          ))}
          <text
            x="92"
            y="260"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            average estimates
          </text>
        </g>
        <Arrow x1={544} x2={586} y1={216} y2={216} color={C.success} />
        <g transform="translate(602 78)">
          <rect
            width="124"
            height="278"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="62"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            Lo(v)
          </text>
          <circle
            cx="62"
            cy="142"
            r="48"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="62"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            reflected
          </text>
          <text
            x="62"
            y="158"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            toward camera
          </text>
          <text
            x="62"
            y="248"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            finite ≈ integral
          </text>
        </g>
        <rect
          x="34"
          y="382"
          width="692"
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
          the challenge is not the equation; it is choosing a few directions
          that represent the whole hemisphere
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch20PdfCdfDiagram() {
  return (
    <Figure>
      <Frame
        label="PDF 到 CDF 的采样映射：把概率密度沿横轴累积，均匀随机数通过反函数更频繁地落在高概率区域"
        height={450}
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          turn a uniform input into a biased direction
        </text>
        <g transform="translate(36 82)">
          <rect
            width="318"
            height="292"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="159"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            PDF: probability density
          </text>
          <path
            d="M 34 244 C 78 230 104 206 144 84 C 180 112 198 236 284 238"
            fill="none"
            stroke={C.accent}
            strokeWidth="4"
          />
          <line
            x1="34"
            y1="244"
            x2="284"
            y2="244"
            stroke={C.border}
            strokeWidth="2"
          />
          <text
            x="159"
            y="274"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            low probability high probability low probability
          </text>
        </g>
        <Arrow x1={374} x2={414} y1={228} y2={228} />
        <g transform="translate(430 82)">
          <rect
            width="294"
            height="292"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="147"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            CDF: stacked probability
          </text>
          <path
            d="M 34 244 L 110 244 L 174 106 L 284 106"
            fill="none"
            stroke={C.success}
            strokeWidth="4"
          />
          <line
            x1="34"
            y1="244"
            x2="284"
            y2="244"
            stroke={C.border}
            strokeWidth="2"
          />
          {[0.1, 0.34, 0.57, 0.82].map((value, index) => (
            <g key={`cdf-input-${index}`}>
              <circle cx={34 + value * 250} cy="244" r="6" fill={C.warning} />
              <line
                x1={34 + value * 250}
                y1="244"
                x2={34 + value * 250}
                y2={index < 2 ? 226 : 106}
                stroke={C.warning}
                strokeDasharray="6 5"
                strokeWidth="2"
              />
            </g>
          ))}
          <text
            x="147"
            y="274"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            uniform ξ → CDF⁻¹(ξ) → sample
          </text>
        </g>
        <rect
          x="36"
          y="398"
          width="688"
          height="28"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="417"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          a high PDF region occupies more of the cumulative stack, so more
          uniform inputs land there
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch20SequenceDiagram() {
  return (
    <Figure>
      <Frame
        label="伪随机与 Hammersley 低差异序列的二维覆盖比较：随机点成团，低差异点均匀铺开但需要过滤抑制规律性别名"
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
          coverage matters when samples are few
        </text>
        <g transform="translate(36 76)">
          <rect
            width="322"
            height="294"
            rx="14"
            fill={C.surface}
            stroke={C.danger}
            strokeWidth="2"
          />
          <text
            x="161"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            pseudorandom
          </text>
          {[
            [54, 74],
            [74, 204],
            [92, 158],
            [114, 114],
            [144, 226],
            [174, 132],
            [202, 86],
            [224, 184],
            [250, 108],
            [270, 218],
            [284, 166],
            [96, 252],
          ].map(([x, y], index) => (
            <circle
              key={`random-point-${index}`}
              cx={x}
              cy={y}
              r="6"
              fill={C.danger}
            />
          ))}
          <rect
            x="28"
            y="60"
            width="266"
            height="204"
            fill="none"
            stroke={C.border}
          />
          <text
            x="161"
            y="282"
            textAnchor="middle"
            fontSize="12"
            fill={C.danger}
          >
            clusters + accidental gaps
          </text>
        </g>
        <Arrow x1={382} x2={416} y1={224} y2={224} />
        <g transform="translate(438 76)">
          <rect
            width="286"
            height="294"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="143"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            Hammersley sequence
          </text>
          {Array.from({ length: 16 }).map((_, index) => {
            const x = 42 + ((index * 53) % 210);
            let binary = index + 1;
            let inverse = 0;
            let factor = 0.5;
            while (binary > 0) {
              inverse += (binary % 2) * factor;
              factor *= 0.5;
              binary = Math.floor(binary / 2);
            }
            const y = 72 + inverse * 178;
            return (
              <circle
                key={`hammersley-point-${index}`}
                cx={x}
                cy={y}
                r="6"
                fill={C.success}
              />
            );
          })}
          <rect
            x="28"
            y="60"
            width="230"
            height="204"
            fill="none"
            stroke={C.border}
          />
          <text
            x="143"
            y="282"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            low discrepancy ≈ even coverage
          </text>
        </g>
        <rect
          x="36"
          y="394"
          width="688"
          height="28"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="413"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          deterministic coverage reduces variance, but fixed patterns can alias
          without filtered samples
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch20MipFilterDiagram() {
  return (
    <Figure>
      <Frame
        label="依据 PDF 和样本数选择 mip level：低 PDF 样本代表更大的立体角而使用更粗 mip，高 PDF 样本使用更细 mip"
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
          one sample can represent a variable area
        </text>
        <g transform="translate(36 78)">
          <rect
            width="212"
            height="286"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="106"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            low PDF
          </text>
          <circle
            cx="106"
            cy="146"
            r="76"
            fill={C.warning}
            fillOpacity="0.1"
            stroke={C.warning}
            strokeDasharray="8 6"
            strokeWidth="2"
          />
          <circle cx="106" cy="146" r="7" fill={C.warning} />
          <text
            x="106"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            broad solid angle
          </text>
          <text
            x="106"
            y="272"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            coarse mip level
          </text>
        </g>
        <g transform="translate(274 78)">
          <rect
            width="212"
            height="286"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="106"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            mip pyramid
          </text>
          {[0, 1, 2, 3].map((index) => {
            const size = 132 - index * 28;
            const x = 106 - size / 2;
            const y = 62 + index * 42;
            return (
              <g key={`mip-level-${index}`}>
                <rect
                  x={x}
                  y={y}
                  width={size}
                  height={size * 0.34}
                  rx="5"
                  fill={C.accent}
                  fillOpacity={0.1 + index * 0.07}
                  stroke={C.accent}
                />
                <text
                  x="106"
                  y={y + size * 0.24}
                  textAnchor="middle"
                  fontSize="12"
                  fill={C.secondary}
                >
                  LOD {index}
                </text>
              </g>
            );
          })}
          <text
            x="106"
            y="270"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            average texture area
          </text>
        </g>
        <g transform="translate(512 78)">
          <rect
            width="212"
            height="286"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="106"
            y="32"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.text}
          >
            high PDF
          </text>
          <circle
            cx="106"
            cy="146"
            r="26"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeDasharray="8 6"
            strokeWidth="2"
          />
          <circle cx="106" cy="146" r="7" fill={C.success} />
          <text
            x="106"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            narrow solid angle
          </text>
          <text
            x="106"
            y="272"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            fine mip level
          </text>
        </g>
        <rect
          x="36"
          y="388"
          width="688"
          height="28"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="407"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          choose LOD from the sample footprint, not from a single fixed blur
          amount
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch20EnvironmentMapDiagram() {
  return (
    <Figure>
      <Frame
        label="环境映射选择：cube map 的每面独立 mip 容易在接缝处缺少邻域信息，scaled dual-paraboloid 用上下半球纹理共享更多对侧信息"
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
          keep filtered neighborhoods connected
        </text>
        <g transform="translate(36 78)">
          <rect
            width="318"
            height="286"
            rx="14"
            fill={C.surface}
            stroke={C.danger}
            strokeWidth="2"
          />
          <text
            x="159"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            cube map faces
          </text>
          <path
            d="M 74 96 L 144 70 L 216 96 L 146 124 Z M 74 96 L 74 188 L 146 218 L 146 124 Z M 146 124 L 216 96 L 216 188 L 146 218 Z"
            fill={C.danger}
            fillOpacity="0.1"
            stroke={C.danger}
            strokeWidth="2"
          />
          <line
            x1="146"
            y1="124"
            x2="216"
            y2="96"
            stroke={C.warning}
            strokeDasharray="7 6"
            strokeWidth="3"
          />
          <text
            x="159"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            each face mipmaps alone
          </text>
          <text
            x="159"
            y="272"
            textAnchor="middle"
            fontSize="12"
            fill={C.danger}
          >
            seam can lose neighbors
          </text>
        </g>
        <Arrow x1={374} x2={414} y1={220} y2={220} />
        <g transform="translate(430 78)">
          <rect
            width="294"
            height="286"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="147"
            y="32"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            scaled dual-paraboloid
          </text>
          <ellipse
            cx="147"
            cy="132"
            rx="96"
            ry="54"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="2"
          />
          <ellipse
            cx="147"
            cy="206"
            rx="96"
            ry="54"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="147"
            y="136"
            textAnchor="middle"
            fontSize="13"
            fill={C.success}
          >
            upper hemisphere
          </text>
          <text
            x="147"
            y="210"
            textAnchor="middle"
            fontSize="13"
            fill={C.accent}
          >
            lower hemisphere
          </text>
          <text
            x="147"
            y="250"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            scale b ≈ 1.2 adds overlap
          </text>
          <text
            x="147"
            y="272"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            fewer seam-like artifacts
          </text>
        </g>
        <rect
          x="36"
          y="388"
          width="688"
          height="28"
          rx="9"
          fill={C.surface}
          stroke={C.border}
        />
        <text
          x="380"
          y="407"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          the map layout is part of the filtering algorithm because mip levels
          average texture neighborhoods
        </text>
      </Frame>
    </Figure>
  );
}

type SamplingMode = "uniform" | "brdf" | "hammersley";
type FilterMode = "pdf" | "fixed" | "none";
type EnvironmentMode = "dual" | "cube";

const DEFAULTS = {
  environment: "dual" as EnvironmentMode,
  filter: "pdf" as FilterMode,
  mode: "hammersley" as SamplingMode,
  roughness: 32,
  samples: 32,
};

export function GpuGems3Ch20ImportanceSamplingLab() {
  const [mode, setMode] = useState<SamplingMode>(DEFAULTS.mode);
  const [samples, setSamples] = useState(DEFAULTS.samples);
  const [roughness, setRoughness] = useState(DEFAULTS.roughness);
  const [filter, setFilter] = useState<FilterMode>(DEFAULTS.filter);
  const [environment, setEnvironment] = useState<EnvironmentMode>(
    DEFAULTS.environment,
  );

  const result = useMemo(() => {
    const sampleFactor = samples / 40;
    const glossy = Math.max(0.15, Math.min(1, roughness / 64));
    const modeVariance =
      mode === "hammersley" ? 0.55 : mode === "brdf" ? 0.82 : 1.35;
    const filterFactor =
      filter === "pdf" ? 0.58 : filter === "fixed" ? 0.9 : 1.22;
    const mapPenalty = environment === "cube" ? 0.16 : 0.03;
    const variance = Math.max(
      3,
      Math.round(
        (100 * modeVariance * filterFactor) /
          Math.sqrt(Math.max(1, sampleFactor)) +
          glossy * 12 +
          mapPenalty * 18,
      ),
    );
    const sharpness = Math.max(
      34,
      Math.min(96, Math.round(93 - variance * 0.48 + roughness * 0.12)),
    );
    const lod =
      filter === "pdf"
        ? Math.max(
            0,
            Math.round(
              6 - Math.log2(Math.max(2, samples)) + (100 - roughness) / 36,
            ),
          )
        : filter === "fixed"
          ? 3
          : 0;
    const coverage = mode === "hammersley" ? 92 : mode === "brdf" ? 78 : 63;
    const fetches = samples * (filter === "none" ? 1 : 1.15);
    const note =
      filter === "pdf"
        ? "PDF-aware filtering lets low-probability samples average a wider environment footprint."
        : filter === "fixed"
          ? "A fixed mip level cannot adapt to the solid angle represented by each sample."
          : "Without filtering, a deterministic low-count pattern can become visible aliasing.";
    return { coverage, fetches, lod, note, sharpness, variance };
  }, [environment, filter, mode, roughness, samples]);

  const reset = () => {
    setMode(DEFAULTS.mode);
    setSamples(DEFAULTS.samples);
    setRoughness(DEFAULTS.roughness);
    setFilter(DEFAULTS.filter);
    setEnvironment(DEFAULTS.environment);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 20
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              GPU Importance Sampling Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          调整采样分布、样本数、材质光泽、过滤策略和环境图布局，观察方差、覆盖、LOD
          与纹理访问的取舍。
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
              viewBox="0 0 730 316"
              role="img"
              aria-label={`重要性采样实验：${mode} 采样，${samples} 个样本，粗糙度 ${roughness}，${filter} 过滤，${environment} 环境映射，方差 ${result.variance}`}
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
                {mode === "uniform"
                  ? "uniform directions"
                  : mode === "brdf"
                    ? "BRDF-weighted directions"
                    : "Hammersley + BRDF directions"}
              </text>
              <path
                d="M 54 242 C 124 230 166 80 250 90 C 320 96 350 236 420 226 C 506 214 554 122 678 198"
                fill="none"
                stroke={C.accent}
                strokeWidth="3"
              />
              <line
                x1="54"
                y1="242"
                x2="678"
                y2="242"
                stroke={C.border}
                strokeWidth="2"
              />
              {Array.from({
                length: Math.min(18, Math.max(6, Math.round(samples / 2))),
              }).map((_, index) => {
                const t =
                  (index + 1) /
                  (Math.min(18, Math.max(6, Math.round(samples / 2))) + 1);
                const x = 62 + t * 600;
                const peak = Math.exp(
                  -Math.pow((t - 0.34) / (0.12 + roughness / 360), 2),
                );
                const y =
                  236 -
                  (mode === "uniform"
                    ? 26 + (index % 4) * 12
                    : 24 + peak * 124);
                return (
                  <circle
                    key={`lab-sample-${index}`}
                    cx={x}
                    cy={y}
                    r="5"
                    fill={
                      mode === "hammersley"
                        ? C.success
                        : mode === "brdf"
                          ? C.warning
                          : C.danger
                    }
                  />
                );
              })}
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
                y="296"
                textAnchor="middle"
                fontSize="12"
                fill={C.secondary}
              >
                env: {environment} · chosen LOD: {result.lod} · samples:{" "}
                {samples}
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric
              label="估算方差"
              tone={result.variance > 55 ? C.danger : C.success}
              value={`${result.variance}`}
            />
            <Metric
              label="方向覆盖"
              tone={C.success}
              value={`${result.coverage}%`}
            />
            <Metric
              label="环境图 LOD"
              tone={C.accent}
              value={`${result.lod}`}
            />
            <Metric
              label="纹理读取估算"
              tone={C.warning}
              value={`${result.fetches.toFixed(0)} fetches`}
            />
          </div>
        </div>
        <div className="space-y-4">
          <label
            className="block text-sm text-secondary"
            htmlFor="ch20-sampling-mode"
          >
            sampling distribution
            <select
              id="ch20-sampling-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value as SamplingMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="hammersley">Hammersley + BRDF</option>
              <option value="brdf">BRDF-weighted random</option>
              <option value="uniform">uniform hemisphere</option>
            </select>
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch20-samples"
          >
            samples per pixel: {samples}
            <input
              id="ch20-samples"
              type="range"
              min="8"
              max="64"
              value={samples}
              onChange={(event) => setSamples(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch20-roughness"
          >
            glossy exponent: {roughness}
            <input
              id="ch20-roughness"
              type="range"
              min="4"
              max="64"
              value={roughness}
              onChange={(event) => setRoughness(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch20-filter">
            sample filtering
            <select
              id="ch20-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value as FilterMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="pdf">PDF-aware mip filtering</option>
              <option value="fixed">fixed mip level</option>
              <option value="none">no filtering</option>
            </select>
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch20-environment"
          >
            environment mapping
            <select
              id="ch20-environment"
              value={environment}
              onChange={(event) =>
                setEnvironment(event.target.value as EnvironmentMode)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="dual">scaled dual-paraboloid</option>
              <option value="cube">cube map</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
