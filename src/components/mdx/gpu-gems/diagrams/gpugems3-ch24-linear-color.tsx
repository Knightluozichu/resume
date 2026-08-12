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

export function GpuGems3Ch24ColorSpaceDiagram() {
  return (
    <Figure>
      <Frame
        height={414}
        label="线性颜色工作流：捕获或存储的颜色先进入线性空间，着色器在线性空间做光照和合成，显示前再编码"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          one image, three different jobs
        </text>
        <g transform="translate(32 88)">
          <rect
            width="196"
            height="236"
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
            capture / storage
          </text>
          <rect
            x="44"
            y="66"
            width="108"
            height="80"
            rx="9"
            fill={C.warning}
            fillOpacity="0.2"
            stroke={C.warning}
            strokeWidth="3"
          />
          <circle cx="80" cy="106" r="18" fill={C.warning} fillOpacity="0.72" />
          <circle cx="119" cy="106" r="18" fill={C.accent} fillOpacity="0.48" />
          <text
            x="98"
            y="180"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            convenient display values
          </text>
          <text
            x="98"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.warning}
          >
            not yet safe for light math
          </text>
        </g>
        <Arrow x1={248} x2={286} y1={206} y2={206} color={C.warning} />
        <g transform="translate(282 88)">
          <rect
            width="196"
            height="236"
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
            shader math
          </text>
          <rect
            x="44"
            y="66"
            width="108"
            height="80"
            rx="9"
            fill={C.success}
            fillOpacity="0.16"
            stroke={C.success}
            strokeWidth="3"
          />
          <path
            d="M 55 130 L 82 93 L 107 116 L 141 78"
            fill="none"
            stroke={C.success}
            strokeWidth="4"
          />
          <text
            x="98"
            y="180"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            add light, filter, blend
          </text>
          <text
            x="98"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.success}
          >
            contributions should add correctly
          </text>
        </g>
        <Arrow x1={498} x2={536} y1={206} y2={206} color={C.success} />
        <g transform="translate(532 88)">
          <rect
            width="196"
            height="236"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
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
            display
          </text>
          <rect
            x="44"
            y="66"
            width="108"
            height="80"
            rx="9"
            fill={C.accent}
            fillOpacity="0.16"
            stroke={C.accent}
            strokeWidth="3"
          />
          <path
            d="M 55 130 C 84 117 105 93 141 78"
            fill="none"
            stroke={C.accent}
            strokeWidth="4"
          />
          <text
            x="98"
            y="180"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            encode for the monitor
          </text>
          <text
            x="98"
            y="204"
            textAnchor="middle"
            fontSize="12"
            fill={C.accent}
          >
            last step before the eye
          </text>
        </g>
        <text
          x="380"
          y="370"
          textAnchor="middle"
          fontSize="13"
          fill={C.secondary}
        >
          decode once, compute in light space, encode once
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch24GammaCurveDiagram() {
  return (
    <Figure>
      <Frame
        height={430}
        label="gamma 曲线：相同的数值间隔不代表相同的光强，0.5 的显示编码在 gamma 2.2 下约对应 0.22 的线性光"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          code value is not emitted light
        </text>
        <line
          x1="88"
          y1="342"
          x2="684"
          y2="342"
          stroke={C.border}
          strokeWidth="2"
        />
        <line
          x1="88"
          y1="342"
          x2="88"
          y2="76"
          stroke={C.border}
          strokeWidth="2"
        />
        <path
          d="M 88 342 L 684 76"
          fill="none"
          stroke={C.secondary}
          strokeDasharray="8 7"
          strokeWidth="3"
        />
        <path
          d="M 88 342 C 196 329 280 284 360 232 C 474 158 575 112 684 76"
          fill="none"
          stroke={C.warning}
          strokeWidth="5"
        />
        <line
          x1="386"
          y1="342"
          x2="386"
          y2="224"
          stroke={C.accent}
          strokeDasharray="6 5"
        />
        <line
          x1="88"
          y1="224"
          x2="386"
          y2="224"
          stroke={C.accent}
          strokeDasharray="6 5"
        />
        <circle cx="386" cy="224" r="8" fill={C.accent} />
        <text x="386" y="367" textAnchor="middle" fontSize="13" fill={C.text}>
          code 0.50
        </text>
        <text x="104" y="216" fontSize="13" fill={C.accent}>
          emitted light ≈ 0.22
        </text>
        <text x="684" y="368" textAnchor="end" fontSize="13" fill={C.secondary}>
          stored/display code →
        </text>
        <text x="70" y="88" textAnchor="end" fontSize="13" fill={C.secondary}>
          light ↑
        </text>
        <text x="560" y="126" fontSize="13" fill={C.warning}>
          typical monitor response, gamma ≈ 2.2
        </text>
        <text x="560" y="151" fontSize="13" fill={C.secondary}>
          black and white stay fixed; midtones move
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch24MipFilterDiagram() {
  return (
    <Figure>
      <Frame
        height={424}
        label="mipmap 过滤对比：在非线性显示值上直接平均会把黑白边缘变成过暗的中间色，先转线性再平均才保持光强"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          filter light, not the monitor encoding
        </text>
        <g transform="translate(40 78)">
          <rect
            width="300"
            height="274"
            rx="14"
            fill={C.surface}
            stroke={C.border}
          />
          <text
            x="150"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            2 × 2 source texels
          </text>
          <rect
            x="74"
            y="62"
            width="70"
            height="70"
            fill={C.bg}
            stroke={C.border}
          />
          <rect
            x="144"
            y="62"
            width="70"
            height="70"
            fill={C.text}
            stroke={C.border}
          />
          <rect
            x="74"
            y="132"
            width="70"
            height="70"
            fill={C.text}
            stroke={C.border}
          />
          <rect
            x="144"
            y="132"
            width="70"
            height="70"
            fill={C.bg}
            stroke={C.border}
          />
          <text
            x="150"
            y="238"
            textAnchor="middle"
            fontSize="13"
            fill={C.secondary}
          >
            half bright, half dark
          </text>
        </g>
        <Arrow x1={358} x2={402} y1={215} y2={215} />
        <g transform="translate(420 78)">
          <rect
            width="300"
            height="274"
            rx="14"
            fill={C.surface}
            stroke={C.warning}
            strokeWidth="2"
          />
          <text
            x="150"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            average in stored code
          </text>
          <rect
            x="98"
            y="62"
            width="104"
            height="104"
            rx="10"
            fill={C.warning}
            fillOpacity="0.18"
            stroke={C.warning}
            strokeWidth="3"
          />
          <text
            x="150"
            y="126"
            textAnchor="middle"
            fontSize="24"
            fontWeight="700"
            fill={C.warning}
          >
            0.50
          </text>
          <text
            x="150"
            y="198"
            textAnchor="middle"
            fontSize="13"
            fill={C.secondary}
          >
            code 0.50 emits less than half light
          </text>
          <text
            x="150"
            y="224"
            textAnchor="middle"
            fontSize="13"
            fill={C.danger}
          >
            edge looks too dark and can shimmer
          </text>
        </g>
        <text
          x="380"
          y="390"
          textAnchor="middle"
          fontSize="13"
          fill={C.success}
        >
          decode → average in linear space → encode the mip level
        </text>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "decode", caption: "从颜色纹理读取时，把显示编码还原成线性光值" },
  { label: "compute", caption: "在线性空间执行光照、过滤和混合" },
  { label: "encode", caption: "把最终线性结果编码到 sRGB 帧缓冲供显示" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  decode: "从颜色纹理读取时，把显示编码还原成线性光值",
  compute: "在线性空间执行光照、过滤和混合",
  encode: "把最终线性结果编码到 sRGB 帧缓冲供显示",
};

export function GpuGems3Ch24PipelineDiagram() {
  const decodeRef = useRef<SVGGElement>(null);
  const computeRef = useRef<SVGGElement>(null);
  const encodeRef = useRef<SVGGElement>(null);
  const refs = [decodeRef, computeRef, encodeRef];
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
        label="线性颜色三步管线：读取时解码，在线性空间计算，写入显示缓冲时编码"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          the safe boundary around linear math
        </text>
        <g ref={decodeRef} style={{ opacity: 0.32 }}>
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
            decode
          </text>
          <rect
            x="84"
            y="148"
            width="104"
            height="72"
            rx="9"
            fill={C.warning}
            fillOpacity="0.16"
            stroke={C.warning}
            strokeWidth="3"
          />
          <text
            x="136"
            y="192"
            textAnchor="middle"
            fontSize="20"
            fontWeight="700"
            fill={C.warning}
          >
            sRGB → L
          </text>
          <text
            x="136"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            texture fetch
          </text>
        </g>
        <Arrow x1={258} x2={294} y1={211} y2={211} color={C.warning} />
        <g ref={computeRef} style={{ opacity: 0.32 }}>
          <rect
            x="314"
            y="88"
            width="204"
            height="246"
            rx="14"
            fill={C.surface}
            stroke={C.success}
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
            compute
          </text>
          <circle
            cx="382"
            cy="184"
            r="24"
            fill={C.success}
            fillOpacity="0.24"
            stroke={C.success}
            strokeWidth="3"
          />
          <text
            x="382"
            y="191"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={C.success}
          >
            +
          </text>
          <circle
            cx="450"
            cy="184"
            r="24"
            fill={C.accent}
            fillOpacity="0.2"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="450"
            y="191"
            textAnchor="middle"
            fontSize="16"
            fontWeight="700"
            fill={C.accent}
          >
            ×
          </text>
          <path
            d="M 392 244 C 420 224 442 224 470 244"
            fill="none"
            stroke={C.success}
            strokeWidth="3"
          />
          <text
            x="416"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            light, filter, blend
          </text>
        </g>
        <Arrow x1={538} x2={574} y1={211} y2={211} color={C.success} />
        <g ref={encodeRef} style={{ opacity: 0.32 }}>
          <rect
            x="594"
            y="88"
            width="122"
            height="246"
            rx="14"
            fill={C.surface}
            stroke={C.accent}
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
            encode
          </text>
          <rect
            x="622"
            y="148"
            width="66"
            height="72"
            rx="9"
            fill={C.accent}
            fillOpacity="0.16"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="655"
            y="192"
            textAnchor="middle"
            fontSize="19"
            fontWeight="700"
            fill={C.accent}
          >
            L → sRGB
          </text>
          <text
            x="655"
            y="278"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            framebuffer write
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
          alpha, normals, and heights stay linear; only color data crosses the
          curve
        </text>
      </Frame>
      <TimelineControls
        timeline={timeline}
        labelText={PIPELINE_LABELS}
        caption="逐步观察显示编码被限制在输入和输出边界，中间的光照与过滤保持线性。"
      />
    </Figure>
  );
}

export function GpuGems3Ch24SrgbBoundaryDiagram() {
  return (
    <Figure>
      <Frame
        height={418}
        label="sRGB 边界：颜色通道读取时解码、写入时编码，alpha 和法线等非颜色数据不做 gamma 变换"
      >
        <text
          x="380"
          y="34"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          convert color channels, preserve data channels
        </text>
        <g transform="translate(38 82)">
          <rect
            width="206"
            height="256"
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
            sRGB texture
          </text>
          <rect
            x="42"
            y="62"
            width="122"
            height="70"
            rx="9"
            fill={C.warning}
            fillOpacity="0.16"
            stroke={C.warning}
            strokeWidth="3"
          />
          <text
            x="103"
            y="91"
            textAnchor="middle"
            fontSize="13"
            fill={C.warning}
          >
            RGB: decode
          </text>
          <text
            x="103"
            y="113"
            textAnchor="middle"
            fontSize="13"
            fill={C.secondary}
          >
            color / reflectance
          </text>
          <rect
            x="42"
            y="158"
            width="122"
            height="70"
            rx="9"
            fill={C.accent}
            fillOpacity="0.14"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="103"
            y="187"
            textAnchor="middle"
            fontSize="13"
            fill={C.accent}
          >
            A: unchanged
          </text>
          <text
            x="103"
            y="209"
            textAnchor="middle"
            fontSize="13"
            fill={C.secondary}
          >
            coverage / opacity
          </text>
        </g>
        <Arrow x1={268} x2={306} y1={210} y2={210} color={C.warning} />
        <g transform="translate(320 82)">
          <rect
            width="170"
            height="256"
            rx="14"
            fill={C.surface}
            stroke={C.success}
            strokeWidth="2"
          />
          <text
            x="85"
            y="30"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill={C.text}
          >
            linear shader
          </text>
          <circle
            cx="62"
            cy="112"
            r="23"
            fill={C.success}
            fillOpacity="0.2"
            stroke={C.success}
            strokeWidth="3"
          />
          <text
            x="62"
            y="119"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill={C.success}
          >
            RGB
          </text>
          <circle
            cx="111"
            cy="192"
            r="23"
            fill={C.accent}
            fillOpacity="0.18"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text
            x="111"
            y="199"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill={C.accent}
          >
            A
          </text>
          <text
            x="85"
            y="246"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            filter / light / blend
          </text>
        </g>
        <Arrow x1={514} x2={552} y1={210} y2={210} color={C.success} />
        <g transform="translate(566 82)">
          <rect
            width="156"
            height="256"
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
            sRGB framebuffer
          </text>
          <rect
            x="35"
            y="70"
            width="86"
            height="62"
            rx="9"
            fill={C.accent}
            fillOpacity="0.16"
            stroke={C.accent}
            strokeWidth="3"
          />
          <text x="78" y="97" textAnchor="middle" fontSize="13" fill={C.accent}>
            RGB: encode
          </text>
          <text
            x="78"
            y="118"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            after blending
          </text>
          <rect
            x="35"
            y="158"
            width="86"
            height="62"
            rx="9"
            fill={C.surface}
            stroke={C.border}
            strokeWidth="3"
          />
          <text
            x="78"
            y="185"
            textAnchor="middle"
            fontSize="13"
            fill={C.secondary}
          >
            A: linear
          </text>
          <text
            x="78"
            y="206"
            textAnchor="middle"
            fontSize="12"
            fill={C.secondary}
          >
            no gamma
          </text>
        </g>
      </Frame>
    </Figure>
  );
}

type InputMode = "linear" | "srgb";
type Operation = "blend" | "light" | "mipmap";
type OutputMode = "raw" | "srgb";

const DEFAULTS = {
  gamma: 2.2,
  input: "srgb" as InputMode,
  operation: "light" as Operation,
  output: "srgb" as OutputMode,
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function GpuGems3Ch24LinearColorLab() {
  const [gamma, setGamma] = useState(DEFAULTS.gamma);
  const [input, setInput] = useState<InputMode>(DEFAULTS.input);
  const [operation, setOperation] = useState<Operation>(DEFAULTS.operation);
  const [output, setOutput] = useState<OutputMode>(DEFAULTS.output);

  const result = useMemo(() => {
    const sourceCode = 0.5;
    const linearInput = input === "srgb" ? sourceCode ** gamma : sourceCode;
    const linearResult =
      operation === "light"
        ? clamp01(linearInput * 1.8)
        : operation === "blend"
          ? clamp01(linearInput * 0.65 + 0.2)
          : clamp01(linearInput * 0.5);
    const displayCode =
      output === "srgb" ? linearResult ** (1 / gamma) : linearResult;
    const emittedLight =
      output === "srgb" ? displayCode ** gamma : displayCode ** gamma;
    const drift = Math.abs(emittedLight - linearResult);
    const description =
      input === "srgb" && output === "srgb"
        ? "颜色在两端完成解码/编码，shader 中间保持线性。"
        : input === "linear" && output === "srgb"
          ? "输入已经是线性数据，只在显示边界编码。"
          : input === "srgb" && output === "raw"
            ? "输入仍是显示编码，shader 会把亮度和颜色算错。"
            : "两端都按线性值处理，显示端会偏暗。";
    return {
      description,
      displayCode,
      drift,
      emittedLight,
      linearInput,
      linearResult,
      sourceCode,
    };
  }, [gamma, input, operation, output]);

  const reset = () => {
    setGamma(DEFAULTS.gamma);
    setInput(DEFAULTS.input);
    setOperation(DEFAULTS.operation);
    setOutput(DEFAULTS.output);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">
              GPU Gems 3 · Chapter 24
            </span>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Linear Color Lab
            </h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">
            可交互
          </span>
        </div>
        <p className="mt-3 text-sm text-secondary">
          固定一个中间灰值，切换输入、运算和输出边界，观察相同的代码值如何变成不同的线性光强。
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
              viewBox="0 0 730 340"
              role="img"
              aria-label={`线性颜色实验：输入 ${input}，${operation} 操作，输出 ${output}，线性输入 ${result.linearInput.toFixed(3)}，显示代码 ${result.displayCode.toFixed(3)}`}
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
                {input === "srgb" ? "decode color input" : "use linear input"} →{" "}
                {operation} →{" "}
                {output === "srgb" ? "encode output" : "write raw"}
              </text>
              <rect
                x="42"
                y="62"
                width="646"
                height="178"
                rx="12"
                fill={C.surface}
                stroke={C.border}
              />
              <line
                x1="84"
                y1="202"
                x2="646"
                y2="202"
                stroke={C.border}
                strokeWidth="2"
              />
              <text x="84" y="226" fontSize="12" fill={C.secondary}>
                0
              </text>
              <text
                x="646"
                y="226"
                textAnchor="end"
                fontSize="12"
                fill={C.secondary}
              >
                1
              </text>
              <line
                x1="84"
                y1="184"
                x2="84"
                y2="84"
                stroke={C.warning}
                strokeWidth="14"
                strokeLinecap="round"
              />
              <line
                x1="84"
                y1="184"
                x2={84 + result.linearInput * 562}
                y2="184"
                stroke={C.success}
                strokeWidth="14"
                strokeLinecap="round"
              />
              <line
                x1="84"
                y1="144"
                x2={84 + result.linearResult * 562}
                y2="144"
                stroke={C.accent}
                strokeWidth="14"
                strokeLinecap="round"
              />
              <line
                x1="84"
                y1="104"
                x2={84 + result.displayCode * 562}
                y2="104"
                stroke={output === "srgb" ? C.accent : C.danger}
                strokeWidth="14"
                strokeLinecap="round"
              />
              <text x="98" y="88" fontSize="12" fill={C.warning}>
                source code {result.sourceCode.toFixed(2)}
              </text>
              <text x="98" y="128" fontSize="12" fill={C.accent}>
                shader result {result.linearResult.toFixed(3)}
              </text>
              <text x="98" y="168" fontSize="12" fill={C.success}>
                linear input {result.linearInput.toFixed(3)}
              </text>
              <text x="98" y="212" fontSize="12" fill={C.secondary}>
                axis: relative light intensity
              </text>
              <text
                x="365"
                y="274"
                textAnchor="middle"
                fontSize="13"
                fill={C.secondary}
              >
                display code {result.displayCode.toFixed(3)} · emitted light{" "}
                {result.emittedLight.toFixed(3)}
              </text>
              <text
                x="365"
                y="300"
                textAnchor="middle"
                fontSize="13"
                fill={result.drift > 0.03 ? C.danger : C.success}
              >
                middle-value drift {Math.round(result.drift * 100)}% ·{" "}
                {result.description}
              </text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric
              label="线性输入"
              tone={C.success}
              value={result.linearInput.toFixed(3)}
            />
            <Metric
              label="shader 结果"
              tone={C.accent}
              value={result.linearResult.toFixed(3)}
            />
            <Metric
              label="显示代码"
              tone={C.warning}
              value={result.displayCode.toFixed(3)}
            />
            <Metric
              label="中间值偏差"
              tone={result.drift > 0.03 ? C.danger : C.success}
              value={`${Math.round(result.drift * 100)}%`}
            />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch24-input">
            texture input
            <select
              id="ch24-input"
              value={input}
              onChange={(event) => setInput(event.target.value as InputMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="srgb">sRGB / display-encoded</option>
              <option value="linear">already linear</option>
            </select>
          </label>
          <label
            className="block text-sm text-secondary"
            htmlFor="ch24-operation"
          >
            shader operation
            <select
              id="ch24-operation"
              value={operation}
              onChange={(event) =>
                setOperation(event.target.value as Operation)
              }
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="light">light × 1.8</option>
              <option value="blend">blend with 0.2</option>
              <option value="mipmap">average with dark texel</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch24-output">
            framebuffer output
            <select
              id="ch24-output"
              value={output}
              onChange={(event) => setOutput(event.target.value as OutputMode)}
              className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"
            >
              <option value="srgb">sRGB framebuffer</option>
              <option value="raw">raw linear write</option>
            </select>
          </label>
          <label className="block text-sm text-secondary" htmlFor="ch24-gamma">
            display gamma: {gamma.toFixed(1)}
            <input
              id="ch24-gamma"
              type="range"
              min="1.8"
              max="2.4"
              step="0.1"
              value={gamma}
              onChange={(event) => setGamma(Number(event.target.value))}
              className="mt-3 block w-full accent-[var(--accent)]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}
