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

function StateGrid({
  x,
  y,
  cell = 34,
  highlight = "row",
}: {
  x: number;
  y: number;
  cell?: number;
  highlight?: "column" | "row" | "none";
}) {
  return (
    <g>
      {Array.from({ length: 16 }, (_, index) => {
        const row = Math.floor(index / 4);
        const column = index % 4;
        const active = highlight === "row" ? row === 1 : highlight === "column" ? column === 2 : false;
        return (
          <g key={`state-cell-${x}-${y}-${index}`}>
            <rect
              x={x + column * cell}
              y={y + row * cell}
              width={cell - 3}
              height={cell - 3}
              rx="5"
              fill={active ? C.warning : C.surface}
              fillOpacity={active ? 0.2 : 1}
              stroke={active ? C.warning : C.border}
            />
            <text
              x={x + column * cell + (cell - 3) / 2}
              y={y + row * cell + 21}
              textAnchor="middle"
              fontSize="11"
              fontFamily="monospace"
              fill={active ? C.warning : C.secondary}
            >
              {index.toString(16).padStart(2, "0")}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function WordRow({
  labels,
  x,
  y,
}: {
  labels: readonly string[];
  x: number;
  y: number;
}) {
  return (
    <g>
      {labels.map((label, index) => (
        <g key={`word-${x}-${y}-${index}`}>
          <rect x={x + index * 76} y={y} width="64" height="38" rx="7" fill={index === 1 ? C.warning : C.surface} fillOpacity={index === 1 ? 0.2 : 1} stroke={index === 1 ? C.warning : C.border} strokeWidth="2" />
          <text x={x + index * 76 + 32} y={y + 24} textAnchor="middle" fontSize="12" fontFamily="monospace" fill={index === 1 ? C.warning : C.text}>{label}</text>
        </g>
      ))}
    </g>
  );
}

export function GpuGems3Ch36AesOverviewDiagram() {
  return (
    <Figure>
      <Frame
        height={438}
        label="AES 对称密钥管线：同一把密钥生成 round keys，加密把明文 block 变成密文，解密沿逆变换恢复明文"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          one symmetric key, two inverse directions
        </text>
        <g transform="translate(28 82)">
          <rect width="178" height="266" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="89" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>key schedule</text>
          <rect x="36" y="74" width="106" height="44" rx="8" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
          <text x="89" y="101" textAnchor="middle" fontSize="13" fill={C.accent}>128/192/256-bit key</text>
          <Arrow x1={89} x2={89} y1={138} y2={178} color={C.accent} />
          <text x="89" y="210" textAnchor="middle" fontSize="13" fill={C.secondary}>round keys</text>
          <text x="89" y="240" textAnchor="middle" fontSize="12" fill={C.secondary}>10 / 12 / 14 rounds</text>
        </g>
        <Arrow x1={230} x2={268} y1={216} y2={216} color={C.accent} />
        <g transform="translate(284 82)">
          <rect width="192" height="266" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="96" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>AES block</text>
          <StateGrid x={28} y={66} cell={34} highlight="row" />
          <text x="96" y="226" textAnchor="middle" fontSize="13" fill={C.warning}>4 × 4 bytes</text>
          <text x="96" y="252" textAnchor="middle" fontSize="12" fill={C.secondary}>128-bit fixed block</text>
        </g>
        <Arrow x1={500} x2={538} y1={170} y2={170} color={C.success} />
        <g transform="translate(554 82)">
          <rect width="178" height="266" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="89" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>stream result</text>
          <rect x="34" y="78" width="110" height="42" rx="8" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
          <text x="89" y="104" textAnchor="middle" fontSize="13" fill={C.success}>ciphertext</text>
          <Arrow x1={89} x2={89} y1={140} y2={178} color={C.success} />
          <text x="89" y="214" textAnchor="middle" fontSize="13" fill={C.secondary}>same key</text>
          <text x="89" y="242" textAnchor="middle" fontSize="12" fill={C.secondary}>inverse round logic</text>
        </g>
        <rect x="28" y="374" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="394" textAnchor="middle" fontSize="13" fill={C.secondary}>
          AES fixes the block at 128 bits; the key length changes the round count
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch36IntegerPipelineDiagram() {
  return (
    <Figure>
      <Frame
        height={446}
        label="GeForce 8 时代的整数流处理能力：整数和位运算、整数索引表、texture-buffer object，以及 transform feedback 输出"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          the implementation needs an integer stream, not a rendered picture
        </text>
        <g transform="translate(28 84)">
          <rect width="164" height="272" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="82" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>integer ALU</text>
          <text x="82" y="86" textAnchor="middle" fontSize="14" fill={C.accent}>AND / OR</text>
          <text x="82" y="124" textAnchor="middle" fontSize="14" fill={C.accent}>SHL / SHR</text>
          <text x="82" y="162" textAnchor="middle" fontSize="14" fill={C.accent}>XOR</text>
          <line x1="36" x2="128" y1="194" y2="194" stroke={C.border} strokeWidth="2" />
          <text x="82" y="232" textAnchor="middle" fontSize="13" fill={C.secondary}>32-bit lanes</text>
          <text x="82" y="256" textAnchor="middle" fontSize="12" fill={C.secondary}>bitwise state work</text>
        </g>
        <Arrow x1={220} x2={254} y1={220} y2={220} color={C.accent} />
        <g transform="translate(270 84)">
          <rect width="206" height="272" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="103" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>indexed tables</text>
          <rect x="34" y="70" width="138" height="46" rx="8" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
          <text x="103" y="98" textAnchor="middle" fontSize="13" fill={C.warning}>integer index → S-box</text>
          <rect x="34" y="138" width="138" height="46" rx="8" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
          <text x="103" y="166" textAnchor="middle" fontSize="13" fill={C.warning}>buffer → MixColumns</text>
          <text x="103" y="224" textAnchor="middle" fontSize="13" fill={C.secondary}>array parameters</text>
          <text x="103" y="250" textAnchor="middle" fontSize="12" fill={C.secondary}>texture-buffer object</text>
        </g>
        <Arrow x1={504} x2={538} y1={220} y2={220} color={C.warning} />
        <g transform="translate(554 84)">
          <rect width="178" height="272" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="89" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>stream out</text>
          <rect x="32" y="72" width="114" height="52" rx="9" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
          <text x="89" y="103" textAnchor="middle" fontSize="13" fill={C.success}>transform</text>
          <text x="89" y="119" textAnchor="middle" fontSize="13" fill={C.success}>feedback</text>
          <Arrow x1={89} x2={89} y1={144} y2={184} color={C.success} />
          <text x="89" y="222" textAnchor="middle" fontSize="13" fill={C.secondary}>buffer attributes</text>
          <text x="89" y="250" textAnchor="middle" fontSize="12" fill={C.secondary}>rasterizer discard</text>
        </g>
        <rect x="28" y="380" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="400" textAnchor="middle" fontSize="13" fill={C.secondary}>
          these are historical GeForce 8/OpenGL capabilities, not a claim about the best modern AES API
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch36StateLayoutDiagram() {
  return (
    <Figure>
      <Frame
        height={438}
        label="AES 输入输出状态：连续 16 字节解包为 4×4 byte state，四个 32-bit 整数寄存器保存行数据，处理后重新打包"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          pack the stream, work on a 4 × 4 byte state, pack it back
        </text>
        <g transform="translate(28 82)">
          <rect width="190" height="268" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="95" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>input stream</text>
          <WordRow x={26} y={74} labels={["00 01", "02 03"]} />
          <WordRow x={26} y={132} labels={["04 05", "06 07"]} />
          <WordRow x={26} y={190} labels={["08 09", "0a 0b"]} />
          <text x="95" y="246" textAnchor="middle" fontSize="13" fill={C.accent}>16 bytes / block</text>
        </g>
        <Arrow x1={244} x2={278} y1={216} y2={216} color={C.accent} />
        <g transform="translate(294 82)">
          <rect width="190" height="268" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="95" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>state registers</text>
          <StateGrid x={28} y={70} cell={34} highlight="column" />
          <text x="95" y="226" textAnchor="middle" fontSize="13" fill={C.warning}>s0, s1, s2, s3</text>
          <text x="95" y="250" textAnchor="middle" fontSize="12" fill={C.secondary}>four 32-bit integers</text>
        </g>
        <Arrow x1={510} x2={544} y1={216} y2={216} color={C.warning} />
        <g transform="translate(560 82)">
          <rect width="172" height="268" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="86" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>round logic</text>
          <text x="86" y="86" textAnchor="middle" fontSize="13" fill={C.success}>unpack</text>
          <Arrow x1={86} x2={86} y1={104} y2={142} color={C.success} />
          <text x="86" y="174" textAnchor="middle" fontSize="13" fill={C.success}>transform</text>
          <Arrow x1={86} x2={86} y1={192} y2={230} color={C.success} />
          <text x="86" y="258" textAnchor="middle" fontSize="13" fill={C.secondary}>pack output</text>
        </g>
        <rect x="28" y="374" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="394" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the state is an implementation layout; AES still defines byte-level transformations
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch36RoundDiagram() {
  return (
    <Figure>
      <Frame
        height={448}
        label="AES 一轮的四个操作：SubBytes 非线性替换、ShiftRows 行移位、MixColumns 列混合和 AddRoundKey 异或轮密钥"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          each AES round composes four different kinds of mixing
        </text>
        <g transform="translate(28 86)">
          <rect width="150" height="266" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="75" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>SubBytes</text>
          <StateGrid x={24} y={70} cell={28} highlight="none" />
          <text x="75" y="224" textAnchor="middle" fontSize="13" fill={C.accent}>S-box lookup</text>
          <text x="75" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>nonlinear</text>
        </g>
        <Arrow x1={198} x2={224} y1={220} y2={220} color={C.accent} />
        <g transform="translate(240 86)">
          <rect width="150" height="266" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="75" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>ShiftRows</text>
          <StateGrid x={24} y={70} cell={28} highlight="row" />
          <Arrow x1={38} x2={118} y1={210} y2={210} color={C.warning} dashed />
          <text x="75" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>rotate row offsets</text>
        </g>
        <Arrow x1={410} x2={436} y1={220} y2={220} color={C.warning} />
        <g transform="translate(452 86)">
          <rect width="150" height="266" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="75" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>MixColumns</text>
          <StateGrid x={24} y={70} cell={28} highlight="column" />
          <text x="75" y="224" textAnchor="middle" fontSize="13" fill={C.success}>finite field</text>
          <text x="75" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>table-assisted mix</text>
        </g>
        <Arrow x1={622} x2={648} y1={220} y2={220} color={C.success} />
        <g transform="translate(664 86)">
          <rect width="72" height="266" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="36" y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>XOR</text>
          <text x="36" y="102" textAnchor="middle" fontSize="13" fill={C.accent}>round</text>
          <text x="36" y="126" textAnchor="middle" fontSize="13" fill={C.accent}>key</text>
          <Arrow x1={36} x2={36} y1={154} y2={198} color={C.accent} />
          <text x="36" y="238" textAnchor="middle" fontSize="12" fill={C.secondary}>next</text>
          <text x="36" y="258" textAnchor="middle" fontSize="12" fill={C.secondary}>round</text>
        </g>
        <rect x="28" y="378" width="708" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="398" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the final round omits MixColumns; the implementation keeps round count from the key schedule
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch36ModesDiagram() {
  return (
    <Figure>
      <Frame
        height={456}
        label="AES 模式并行性对比：ECB 每个 block 独立，CBC 加密依赖前一密文，CBC 解密可并行，CTR 通过 counter block 让加解密都独立"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          the mode, not just AES, decides the parallel surface
        </text>
        <g transform="translate(28 80)">
          <rect width="214" height="290" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>ECB</text>
          {[0, 1, 2].map((index) => (
            <g key={`ecb-${index}`}>
              <rect x="34" y={70 + index * 54} width="54" height="34" rx="7" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <text x="61" y={92 + index * 54} textAnchor="middle" fontSize="12" fill={C.accent}>P{index}</text>
              <Arrow x1={104} x2={136} y1={87 + index * 54} y2={87 + index * 54} color={C.accent} />
              <rect x="150" y={70 + index * 54} width="40" height="34" rx="7" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
              <text x="170" y={92 + index * 54} textAnchor="middle" fontSize="12" fill={C.success}>C{index}</text>
            </g>
          ))}
          <text x="107" y="254" textAnchor="middle" fontSize="13" fill={C.accent}>independent blocks</text>
          <text x="107" y="276" textAnchor="middle" fontSize="12" fill={C.danger}>pattern leakage</text>
        </g>
        <g transform="translate(270 80)">
          <rect width="214" height="290" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>CBC encrypt</text>
          {[0, 1, 2].map((index) => (
            <g key={`cbc-${index}`}>
              <rect x="34" y={70 + index * 54} width="54" height="34" rx="7" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
              <text x="61" y={92 + index * 54} textAnchor="middle" fontSize="12" fill={C.warning}>P{index}</text>
              <Arrow x1={104} x2={136} y1={87 + index * 54} y2={87 + index * 54} color={C.warning} />
              <rect x="150" y={70 + index * 54} width="40" height="34" rx="7" fill={C.surface} stroke={C.border} strokeWidth="2" />
              <text x="170" y={92 + index * 54} textAnchor="middle" fontSize="12" fill={C.secondary}>C{index}</text>
              {index < 2 && <Arrow x1={170} x2={170} y1={108 + index * 54} y2={120 + index * 54} color={C.danger} dashed />}
            </g>
          ))}
          <text x="107" y="254" textAnchor="middle" fontSize="13" fill={C.warning}>previous C required</text>
          <text x="107" y="276" textAnchor="middle" fontSize="12" fill={C.danger}>encryption chain</text>
        </g>
        <g transform="translate(512 80)">
          <rect width="220" height="290" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="110" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>CTR</text>
          {[0, 1, 2].map((index) => (
            <g key={`ctr-${index}`}>
              <rect x="24" y={70 + index * 54} width="58" height="34" rx="7" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
              <text x="53" y={92 + index * 54} textAnchor="middle" fontSize="12" fill={C.success}>ctr{index}</text>
              <Arrow x1={96} x2={128} y1={87 + index * 54} y2={87 + index * 54} color={C.success} />
              <rect x="142" y={70 + index * 54} width="54" height="34" rx="7" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <text x="169" y={92 + index * 54} textAnchor="middle" fontSize="12" fill={C.accent}>P{index}</text>
            </g>
          ))}
          <text x="110" y="254" textAnchor="middle" fontSize="13" fill={C.success}>independent keystreams</text>
          <text x="110" y="276" textAnchor="middle" fontSize="12" fill={C.secondary}>encrypt or decrypt</text>
        </g>
        <rect x="28" y="392" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="412" textAnchor="middle" fontSize="13" fill={C.secondary}>
          CBC decryption can parallelize from known ciphertext; CBC encryption cannot start block i early
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch36PipelineDiagram() {
  const unpackRef = useRef<SVGGElement>(null);
  const roundRef = useRef<SVGGElement>(null);
  const outputRef = useRef<SVGGElement>(null);
  const streamRef = useRef<SVGGElement>(null);
  const refs = [unpackRef, roundRef, outputRef, streamRef];
  const steps: readonly TeachingStep[] = [
    { label: "unpack", caption: "把 16 字节 block 解包为四个 32-bit state register，并做初始 AddRoundKey" },
    { label: "round", caption: "重复 SubBytes、ShiftRows、MixColumns 与 AddRoundKey；最后一轮省略 MixColumns" },
    { label: "output", caption: "把 4×4 byte state 重新打包为连续 ciphertext block" },
    { label: "stream", caption: "通过 transform feedback 或 fragment 输出，把 block 写回结果 buffer" },
  ];
  const labels = Object.fromEntries(steps.map((step) => [step.label, step.caption])) as Readonly<Record<string, string>>;
  const timeline = useTeachingTimeline({
    steps,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(ref.current!, { opacity: [0.3, 1], duration: T * 0.42 }, T * index);
        tl.label(steps[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame height={466} label="AES GPU 实现动画：解包、轮变换、重新打包和 transform feedback 流输出">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          from 16 input bytes to 16 output bytes
        </text>
        <g ref={unpackRef} style={{ opacity: 0.3 }}>
          <rect x="24" y="86" width="164" height="256" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="106" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · unpack</text>
          <StateGrid x={54} y={150} cell={28} highlight="none" />
          <text x="106" y="294" textAnchor="middle" fontSize="13" fill={C.accent}>state + key</text>
          <text x="106" y="318" textAnchor="middle" fontSize="12" fill={C.secondary}>four registers</text>
        </g>
        <Arrow x1={204} x2={224} y1={214} y2={214} color={C.accent} />
        <g ref={roundRef} style={{ opacity: 0.3 }}>
          <rect x="236" y="86" width="164" height="256" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="318" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · rounds</text>
          <circle cx="318" cy="186" r="42" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="3" />
          <text x="318" y="181" textAnchor="middle" fontSize="13" fill={C.warning}>S / R / M</text>
          <text x="318" y="202" textAnchor="middle" fontSize="12" fill={C.secondary}>XOR key</text>
          <text x="318" y="294" textAnchor="middle" fontSize="13" fill={C.warning}>10–14 rounds</text>
          <text x="318" y="318" textAnchor="middle" fontSize="12" fill={C.secondary}>key length decides</text>
        </g>
        <Arrow x1={416} x2={436} y1={214} y2={214} color={C.warning} />
        <g ref={outputRef} style={{ opacity: 0.3 }}>
          <rect x="448" y="86" width="164" height="256" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="530" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · pack</text>
          <StateGrid x={488} y={150} cell={28} highlight="column" />
          <text x="530" y="294" textAnchor="middle" fontSize="13" fill={C.success}>cipher block</text>
          <text x="530" y="318" textAnchor="middle" fontSize="12" fill={C.secondary}>16 bytes out</text>
        </g>
        <Arrow x1={628} x2={648} y1={214} y2={214} color={C.success} />
        <g ref={streamRef} style={{ opacity: 0.3 }}>
          <rect x="660" y="86" width="76" height="256" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="698" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>4</text>
          <Arrow x1={698} x2={698} y1={154} y2={218} color={C.accent} />
          <text x="698" y="260" textAnchor="middle" fontSize="12" fill={C.accent}>feedback</text>
          <text x="698" y="288" textAnchor="middle" fontSize="11" fill={C.secondary}>buffer</text>
          <text x="698" y="316" textAnchor="middle" fontSize="11" fill={C.secondary}>stream</text>
        </g>
        <rect x="24" y="378" width="712" height="30" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="398" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the shader has no reason to rasterize a picture when its output is a byte stream
        </text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={labels} caption="逐步观察 AES block 在 GPU 上如何完成整数状态变换并写回流。" />
    </Figure>
  );
}

type KeyLength = "128" | "192" | "256";
type CipherMode = "ecb" | "cbc" | "ctr";
type Operation = "encrypt" | "decrypt";
type PipelineMode = "fragment" | "vertex";
type BatchSize = "1" | "8" | "32";

const DEFAULTS = {
  batch: "1" as BatchSize,
  key: "128" as KeyLength,
  mode: "ecb" as CipherMode,
  operation: "encrypt" as Operation,
  pipeline: "fragment" as PipelineMode,
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function GpuGems3Ch36AesLab() {
  const [key, setKey] = useState<KeyLength>(DEFAULTS.key);
  const [mode, setMode] = useState<CipherMode>(DEFAULTS.mode);
  const [operation, setOperation] = useState<Operation>(DEFAULTS.operation);
  const [pipeline, setPipeline] = useState<PipelineMode>(DEFAULTS.pipeline);
  const [batch, setBatch] = useState<BatchSize>(DEFAULTS.batch);

  const result = useMemo(() => {
    const rounds = key === "128" ? 10 : key === "192" ? 12 : 14;
    const batchMb = Number(batch);
    const blocks = Math.round((batchMb * 1024 * 1024) / 16);
    const independent = mode === "ecb" || mode === "ctr" || (mode === "cbc" && operation === "decrypt");
    const dependency = independent ? "independent blocks" : "previous ciphertext required";
    const baseThroughput = pipeline === "fragment" ? 95 : 53;
    const keyFactor = key === "128" ? 1 : key === "192" ? 0.88 : 0.77;
    const batchFactor = batchMb === 1 ? 1 : batchMb === 8 ? 1.08 : 1.12;
    const throughput = Math.round(baseThroughput * keyFactor * batchFactor);
    const tableLookups = Math.round(blocks * rounds * (mode === "ctr" ? 2 : 3));
    const parallelWidth = independent ? blocks : 1;
    const patternRisk = mode === "ecb" ? "same block → same ciphertext pattern" : "mode hides repeated block patterns";
    return { blocks, dependency, independent, parallelWidth, patternRisk, rounds, tableLookups, throughput };
  }, [batch, key, mode, operation, pipeline]);

  const reset = () => {
    setKey(DEFAULTS.key);
    setMode(DEFAULTS.mode);
    setOperation(DEFAULTS.operation);
    setPipeline(DEFAULTS.pipeline);
    setBatch(DEFAULTS.batch);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 36</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">AES GPU Mapping Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-3 text-sm text-secondary">切换 key length、cipher mode、操作方向、历史 GPU 路径和 batch size，观察轮数、依赖宽度与查表成本如何变化。</p>
        <button type="button" onClick={reset} className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary">重置实验</button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg viewBox="0 0 730 420" role="img" aria-label={`AES 实验：${key}-bit key，${mode} ${operation}，${pipeline} path，${batch} MB batch`} className="mx-auto block h-auto w-full">
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>input blocks → AES rounds → stream output</text>
              <rect x="34" y="56" width="662" height="256" rx="12" fill={C.surface} stroke={C.border} />
              <StateGrid x={70} y={112} cell={30} highlight="none" />
              <text x="130" y="254" textAnchor="middle" fontSize="12" fill={C.accent}>{formatNumber(result.blocks)} blocks</text>
              <Arrow x1={220} x2={266} y1={174} y2={174} color={C.accent} />
              <circle cx="330" cy="174" r="58" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="3" />
              <text x="330" y="168" textAnchor="middle" fontSize="14" fill={C.warning}>{result.rounds} rounds</text>
              <text x="330" y="192" textAnchor="middle" fontSize="12" fill={C.secondary}>S / R / M / XOR</text>
              <Arrow x1={394} x2={440} y1={174} y2={174} color={C.warning} />
              <rect x="458" y="112" width="104" height="72" rx="10" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
              <text x="510" y="142" textAnchor="middle" fontSize="13" fill={C.success}>cipher</text>
              <text x="510" y="164" textAnchor="middle" fontSize="13" fill={C.success}>stream</text>
              <text x="610" y="142" textAnchor="middle" fontSize="12" fill={C.secondary}>{pipeline}</text>
              <text x="610" y="166" textAnchor="middle" fontSize="12" fill={C.secondary}>path</text>
              <text x="365" y="238" textAnchor="middle" fontSize="13" fill={C.warning}>{result.dependency} · parallel width {formatNumber(result.parallelWidth)}</text>
              <text x="365" y="266" textAnchor="middle" fontSize="13" fill={C.secondary}>{formatNumber(result.tableLookups)} table-assisted byte operations · {result.throughput} MB/s reference</text>
              <text x="365" y="294" textAnchor="middle" fontSize="13" fill={mode === "ecb" ? C.danger : C.success}>{result.patternRisk}</text>
              <text x="365" y="346" textAnchor="middle" fontSize="13" fill={C.secondary}>educational model of the chapter&apos;s historical GeForce 8 measurements</text>
              <text x="365" y="374" textAnchor="middle" fontSize="13" fill={C.accent}>not a modern cryptographic benchmark or security claim</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="rounds" tone={C.warning} value={`${result.rounds}`} />
            <Metric label="parallel width" tone={C.accent} value={formatNumber(result.parallelWidth)} />
            <Metric label="table-assisted ops" tone={C.success} value={formatNumber(result.tableLookups)} />
            <Metric label="reference throughput" tone={C.success} value={`${result.throughput} MB/s`} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch36-key">key length<select id="ch36-key" value={key} onChange={(event) => setKey(event.target.value as KeyLength)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="128">128-bit · 10 rounds</option><option value="192">192-bit · 12 rounds</option><option value="256">256-bit · 14 rounds</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch36-mode">cipher mode<select id="ch36-mode" value={mode} onChange={(event) => setMode(event.target.value as CipherMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="ecb">ECB · independent but pattern-leaking</option><option value="cbc">CBC · chained or parallel decrypt</option><option value="ctr">CTR · independent keystream blocks</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch36-operation">operation<select id="ch36-operation" value={operation} onChange={(event) => setOperation(event.target.value as Operation)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="encrypt">encrypt</option><option value="decrypt">decrypt</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch36-pipeline">historical GPU path<select id="ch36-pipeline" value={pipeline} onChange={(event) => setPipeline(event.target.value as PipelineMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="fragment">fragment · 95 MB/s reference</option><option value="vertex">vertex + transform feedback · 53 MB/s reference</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch36-batch">batch size<select id="ch36-batch" value={batch} onChange={(event) => setBatch(event.target.value as BatchSize)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="1">1 MB</option><option value="8">8 MB</option><option value="32">32 MB</option></select></label>
        </div>
      </div>
    </div>
  );
}
