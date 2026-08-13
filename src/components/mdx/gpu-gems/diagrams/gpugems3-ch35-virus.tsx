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

function Packet({
  fill = C.accent,
  label,
  x,
  y,
}: {
  fill?: string;
  label: string;
  x: number;
  y: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width="76" height="44" rx="8" fill={fill} fillOpacity="0.16" stroke={fill} strokeWidth="2" />
      <rect x={x + 10} y={y + 13} width="10" height="18" rx="2" fill={fill} />
      <rect x={x + 26} y={y + 13} width="10" height="18" rx="2" fill={fill} fillOpacity="0.75" />
      <rect x={x + 42} y={y + 13} width="10" height="18" rx="2" fill={fill} fillOpacity="0.5" />
      <rect x={x + 58} y={y + 13} width="8" height="18" rx="2" fill={fill} fillOpacity="0.3" />
      <text x={x + 38} y={y + 61} textAnchor="middle" fontSize="12" fill={C.secondary}>{label}</text>
    </g>
  );
}

function ByteRow({
  cellWidth = 40,
  startX = 72,
  step = 48,
  y,
  values,
}: {
  cellWidth?: number;
  startX?: number;
  step?: number;
  y: number;
  values: readonly string[];
}) {
  return (
    <g>
      {values.map((value, index) => (
        <g key={`byte-${y}-${index}`}>
          <rect x={startX + index * step} y={y} width={cellWidth} height="34" rx="5" fill={index % 3 === 1 ? C.warning : C.surface} fillOpacity={index % 3 === 1 ? 0.2 : 1} stroke={index % 3 === 1 ? C.warning : C.border} />
          <text x={startX + index * step + cellWidth / 2} y={y + 22} textAnchor="middle" fontSize="12" fontFamily="monospace" fill={index % 3 === 1 ? C.warning : C.text}>{value}</text>
        </g>
      ))}
    </g>
  );
}

export function GpuGems3Ch35NetworkPipelineDiagram() {
  return (
    <Figure>
      <Frame
        height={440}
        label="病毒扫描协同管线：CPU 准备数据，GPU 高吞吐过滤可能匹配，CPU 验证候选并映射回文件或数据包"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          GPU filter first, CPU verification second
        </text>
        <g transform="translate(28 82)">
          <rect width="164" height="266" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="82" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>input buffer</text>
          <Packet x={44} y={78} label="packet / file" />
          <Packet x={44} y={152} fill={C.success} label="object table" />
          <text x="82" y="236" textAnchor="middle" fontSize="13" fill={C.secondary}>fill before scan</text>
        </g>
        <Arrow x1={216} x2={250} y1={216} y2={216} color={C.accent} />
        <g transform="translate(266 82)">
          <rect width="204" height="266" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="102" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>GPU filter</text>
          <circle cx="66" cy="112" r="19" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="3" />
          <circle cx="102" cy="112" r="19" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="3" />
          <circle cx="138" cy="112" r="19" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="3" />
          <text x="102" y="174" textAnchor="middle" fontSize="13" fill={C.warning}>2-byte key lookup</text>
          <text x="102" y="202" textAnchor="middle" fontSize="13" fill={C.secondary}>short, regular threads</text>
          <text x="102" y="238" textAnchor="middle" fontSize="12" fill={C.secondary}>possible matches only</text>
        </g>
        <Arrow x1={494} x2={528} y1={216} y2={216} color={C.warning} />
        <g transform="translate(544 82)">
          <rect width="188" height="266" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="94" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>CPU verify</text>
          <rect x="38" y="78" width="112" height="54" rx="10" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
          <text x="94" y="101" textAnchor="middle" fontSize="13" fill={C.success}>full signature</text>
          <text x="94" y="121" textAnchor="middle" fontSize="12" fill={C.secondary}>exact / regex work</text>
          <Arrow x1={94} x2={94} y1={154} y2={188} color={C.success} />
          <text x="94" y="222" textAnchor="middle" fontSize="13" fill={C.success}>report object</text>
          <text x="94" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>map offset → file</text>
        </g>
        <rect x="28" y="374" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="394" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the GPU is a high-speed filter, not the final antivirus decision
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch35ParallelismDiagram() {
  return (
    <Figure>
      <Frame
        height={454}
        label="病毒签名扫描的两种并行方向：intrapacket 在一个数据包内部并行，interpacket 同时处理多个数据包"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          choose where the parallel bytes come from
        </text>
        <g transform="translate(28 78)">
          <rect width="338" height="292" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="169" y="34" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>intrapacket scanning</text>
          <text x="169" y="58" textAnchor="middle" fontSize="12" fill={C.secondary}>one packet, many byte windows</text>
          <ByteRow y={92} values={["a1", "b7", "2f", "80", "91", "04"]} />
          {[0, 1, 2, 3].map((index) => (
            <g key={`intra-thread-${index}`}>
              <line x1={92 + index * 48} x2={92 + index * 48} y1="134" y2="174" stroke={C.warning} strokeWidth="2" />
              <circle cx={92 + index * 48} cy="188" r="9" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="2" />
              <text x={92 + index * 48} y="220" textAnchor="middle" fontSize="12" fill={C.warning}>T{index}</text>
            </g>
          ))}
          <text x="169" y="256" textAnchor="middle" fontSize="13" fill={C.accent}>high local reuse</text>
          <text x="169" y="278" textAnchor="middle" fontSize="12" fill={C.secondary}>boundary and overlap handling matter</text>
        </g>
        <g transform="translate(394 78)">
          <rect width="338" height="292" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="169" y="34" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>interpacket scanning</text>
          <text x="169" y="58" textAnchor="middle" fontSize="12" fill={C.secondary}>many packets, one window per thread</text>
          <Packet x={34} y={82} fill={C.success} label="packet A" />
          <Packet x={132} y={82} fill={C.success} label="packet B" />
          <Packet x={230} y={82} fill={C.success} label="packet C" />
          <line x1="72" x2="72" y1="146" y2="190" stroke={C.success} strokeWidth="2" />
          <line x1="170" x2="170" y1="146" y2="190" stroke={C.success} strokeWidth="2" />
          <line x1="268" x2="268" y1="146" y2="190" stroke={C.success} strokeWidth="2" />
          <circle cx="72" cy="204" r="9" fill={C.success} fillOpacity="0.2" stroke={C.success} strokeWidth="2" />
          <circle cx="170" cy="204" r="9" fill={C.success} fillOpacity="0.2" stroke={C.success} strokeWidth="2" />
          <circle cx="268" cy="204" r="9" fill={C.success} fillOpacity="0.2" stroke={C.success} strokeWidth="2" />
          <text x="169" y="256" textAnchor="middle" fontSize="13" fill={C.success}>independent objects</text>
          <text x="169" y="278" textAnchor="middle" fontSize="12" fill={C.secondary}>less shared state, more concurrency</text>
        </g>
        <rect x="28" y="392" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="412" textAnchor="middle" fontSize="13" fill={C.secondary}>
          both layouts fit the GPU; the library can choose based on packet boundaries and buffer occupancy
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch35SignatureTableDiagram() {
  return (
    <Figure>
      <Frame
        height={446}
        label="GPU 签名表：每个连续两字节作为 16-bit key 索引 64,000-entry 数组，表项保存 key 前面的四字节 tag"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          turn a long signature into a tiny table lookup
        </text>
        <g transform="translate(28 88)">
          <rect width="214" height="270" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="107" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>signature bytes</text>
          <ByteRow y={78} startX={38} step={28} cellWidth={24} values={["6d", "61", "6c", "77", "61", "72"]} />
          <rect x={38 + 2 * 28} y="70" width="52" height="50" rx="7" fill="none" stroke={C.warning} strokeWidth="3" />
          <text x="107" y="168" textAnchor="middle" fontSize="13" fill={C.warning}>2-byte key: 6c 77</text>
          <text x="107" y="202" textAnchor="middle" fontSize="13" fill={C.secondary}>preceding four bytes</text>
          <text x="107" y="226" textAnchor="middle" fontSize="13" fill={C.accent}>tag: 6d 61 6c 77</text>
        </g>
        <Arrow x1={270} x2={306} y1={220} y2={220} color={C.warning} />
        <g transform="translate(324 88)">
          <rect width="190" height="270" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="95" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>64,000-entry table</text>
          <rect x="32" y="72" width="126" height="34" rx="7" fill={C.warning} fillOpacity="0.16" stroke={C.warning} />
          <text x="95" y="94" textAnchor="middle" fontSize="13" fill={C.warning}>index = 6c77</text>
          <line x1="42" x2="148" y1="130" y2="130" stroke={C.border} strokeWidth="2" />
          <rect x="46" y="148" width="98" height="54" rx="9" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
          <text x="95" y="172" textAnchor="middle" fontSize="13" fill={C.accent}>stored tag</text>
          <text x="95" y="192" textAnchor="middle" fontSize="12" fill={C.secondary}>6d 61 6c 77</text>
          <text x="95" y="238" textAnchor="middle" fontSize="13" fill={C.secondary}>at most one signature</text>
          <text x="95" y="264" textAnchor="middle" fontSize="12" fill={C.secondary}>in the original table</text>
        </g>
        <Arrow x1={542} x2={578} y1={220} y2={220} color={C.success} />
        <g transform="translate(596 88)">
          <rect width="136" height="270" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="68" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>compare</text>
          <ByteRow y={76} values={["6d", "61"]} />
          <text x="68" y="164" textAnchor="middle" fontSize="13" fill={C.success}>tag match?</text>
          <circle cx="68" cy="204" r="18" fill={C.success} fillOpacity="0.18" stroke={C.success} strokeWidth="3" />
          <path d="M 58 204 L 65 211 L 79 194" fill="none" stroke={C.success} strokeWidth="3" />
          <text x="68" y="248" textAnchor="middle" fontSize="12" fill={C.secondary}>candidate offset</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>
          the key narrows the search; the tag keeps the GPU test cheap but deliberately conservative
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch35BoundaryDiagram() {
  return (
    <Figure>
      <Frame
        height={448}
        label="重叠两字节窗口和 buffer 边界：相邻线程读取 i,i+1，最长签名需要在下一个 buffer 复制前置字节以避免跨边界漏检"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          overlapping windows keep signatures from hiding at boundaries
        </text>
        <g transform="translate(28 82)">
          <rect width="428" height="286" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="214" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>input bytes</text>
          <text x="54" y="78" textAnchor="end" fontSize="12" fill={C.secondary}>offset</text>
          {Array.from({ length: 7 }, (_, index) => (
            <text key={`offset-${index}`} x={92 + index * 46} y="78" textAnchor="middle" fontSize="12" fill={C.secondary}>{index}</text>
          ))}
          <ByteRow y={92} values={["p", "a", "y", "l", "o", "a", "d"]} />
          <rect x="118" y="84" width="86" height="50" rx="7" fill="none" stroke={C.warning} strokeWidth="3" />
          <rect x="164" y="84" width="86" height="50" rx="7" fill="none" stroke={C.success} strokeWidth="3" />
          <text x="161" y="168" textAnchor="middle" fontSize="13" fill={C.warning}>thread i: [1,2]</text>
          <text x="207" y="194" textAnchor="middle" fontSize="13" fill={C.success}>thread i+1: [2,3]</text>
          <text x="214" y="238" textAnchor="middle" fontSize="13" fill={C.accent}>every adjacent 2-byte pair</text>
          <text x="214" y="264" textAnchor="middle" fontSize="12" fill={C.secondary}>can start a candidate signature</text>
        </g>
        <Arrow x1={486} x2={522} y1={222} y2={222} color={C.warning} />
        <g transform="translate(540 82)">
          <rect width="192" height="286" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="96" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>buffer boundary</text>
          <line x1="24" x2="168" y1="94" y2="94" stroke={C.border} strokeWidth="3" strokeDasharray="7 6" />
          <text x="96" y="82" textAnchor="middle" fontSize="12" fill={C.secondary}>end of buffer A</text>
          <rect x="44" y="114" width="104" height="42" rx="8" fill={C.warning} fillOpacity="0.16" stroke={C.warning} strokeWidth="2" />
          <text x="96" y="140" textAnchor="middle" fontSize="13" fill={C.warning}>copy prefix</text>
          <Arrow x1={96} x2={96} y1={170} y2={204} color={C.warning} />
          <text x="96" y="232" textAnchor="middle" fontSize="13" fill={C.success}>buffer B starts</text>
          <text x="96" y="258" textAnchor="middle" fontSize="12" fill={C.secondary}>up to longest signature</text>
        </g>
        <rect x="28" y="390" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="410" textAnchor="middle" fontSize="13" fill={C.secondary}>
          object descriptions stay with the CPU; the GPU only sees a continuous byte buffer
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems3Ch35ResultBufferDiagram() {
  return (
    <Figure>
      <Frame
        height={444}
        label="GPU 结果缓冲区：输入位置 i 的命中写入两字节 signature identifier 到输出偏移 2i，CPU 扫描稀疏结果并按阈值提前停止"
      >
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          sparse results are fast until the CPU must inspect them all
        </text>
        <g transform="translate(28 82)">
          <rect width="230" height="276" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="115" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>input offset i</text>
          <ByteRow y={78} values={["00", "01", "02", "03"]} />
          <circle cx="188" cy="95" r="9" fill={C.warning} />
          <text x="115" y="162" textAnchor="middle" fontSize="13" fill={C.warning}>candidate at i = 2</text>
          <Arrow x1={115} x2={115} y1={184} y2={218} color={C.warning} />
          <text x="115" y="250" textAnchor="middle" fontSize="13" fill={C.accent}>write identifier</text>
          <text x="115" y="274" textAnchor="middle" fontSize="12" fill={C.secondary}>not full signature bytes</text>
        </g>
        <Arrow x1={284} x2={320} y1={220} y2={220} color={C.warning} />
        <g transform="translate(338 82)">
          <rect width="186" height="276" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="93" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>write buffer</text>
          <text x="93" y="74" textAnchor="middle" fontSize="13" fill={C.secondary}>offset = 2i</text>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <rect key={`result-slot-${index}`} x={34 + (index % 3) * 42} y={96 + Math.floor(index / 3) * 42} width="32" height="26" rx="5" fill={index === 2 ? C.success : C.bg} stroke={index === 2 ? C.success : C.border} strokeWidth="2" />
          ))}
          <text x="93" y="204" textAnchor="middle" fontSize="13" fill={C.success}>signature id</text>
          <text x="93" y="232" textAnchor="middle" fontSize="12" fill={C.secondary}>zero means no candidate</text>
          <text x="93" y="258" textAnchor="middle" fontSize="12" fill={C.secondary}>2× input buffer size</text>
        </g>
        <Arrow x1={550} x2={586} y1={220} y2={220} color={C.success} />
        <g transform="translate(604 82)">
          <rect width="128" height="276" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="64" y="32" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>CPU</text>
          <text x="64" y="88" textAnchor="middle" fontSize="13" fill={C.success}>scan count</text>
          <text x="64" y="126" textAnchor="middle" fontSize="13" fill={C.warning}>verify</text>
          <text x="64" y="164" textAnchor="middle" fontSize="13" fill={C.accent}>map object</text>
          <line x1="28" x2="100" y1="194" y2="194" stroke={C.border} strokeWidth="2" />
          <text x="64" y="232" textAnchor="middle" fontSize="12" fill={C.secondary}>threshold may</text>
          <text x="64" y="254" textAnchor="middle" fontSize="12" fill={C.secondary}>stop verification</text>
        </g>
        <rect x="28" y="382" width="704" height="30" rx="8" fill={C.surface} stroke={C.border} />
        <text x="380" y="402" textAnchor="middle" fontSize="13" fill={C.secondary}>
          zero matches keep the readback cheap; positive density moves work from GPU to CPU
        </text>
      </Frame>
    </Figure>
  );
}

const PIPELINE_STEPS: readonly TeachingStep[] = [
  { label: "fill", caption: "CPU 继续填充下一个数据 buffer，同时把当前 buffer 提交给 GPU" },
  { label: "filter", caption: "GPU 为每个相邻 2-byte window 做 key lookup 与 tag compare" },
  { label: "verify", caption: "CPU 扫描候选结果，验证完整签名并把偏移映射回对象" },
  { label: "rotate", caption: "轮转多个 buffer，隐藏 CPU/GPU 之间的传输和执行延迟" },
];

const PIPELINE_LABELS: Readonly<Record<string, string>> = {
  fill: "CPU 继续填充下一个数据 buffer，同时把当前 buffer 提交给 GPU",
  filter: "GPU 为每个相邻 2-byte window 做 key lookup 与 tag compare",
  rotate: "轮转多个 buffer，隐藏 CPU/GPU 之间的传输和执行延迟",
  verify: "CPU 扫描候选结果，验证完整签名并把偏移映射回对象",
};

export function GpuGems3Ch35PipelineDiagram() {
  const fillRef = useRef<SVGGElement>(null);
  const filterRef = useRef<SVGGElement>(null);
  const verifyRef = useRef<SVGGElement>(null);
  const rotateRef = useRef<SVGGElement>(null);
  const refs = [fillRef, filterRef, verifyRef, rotateRef];
  const timeline = useTeachingTimeline({
    steps: PIPELINE_STEPS,
    build: (tl) => {
      refs.forEach((ref, index) => {
        tl.add(ref.current!, { opacity: [0.3, 1], duration: T * 0.42 }, T * index);
        tl.label(PIPELINE_STEPS[index].label, T * index);
      });
    },
  });

  return (
    <Figure>
      <Frame height={464} label="多 buffer 病毒扫描动画：CPU 填充、GPU 过滤、CPU 验证和 buffer 轮转重叠执行">
        <text x="380" y="34" textAnchor="middle" fontSize="17" fontWeight="700" fill={C.text}>
          rotate buffers to overlap variable CPU work with regular GPU work
        </text>
        <g ref={fillRef} style={{ opacity: 0.3 }}>
          <rect x="24" y="86" width="164" height="254" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="106" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>1 · fill</text>
          <Packet x={44} y={154} label="B1" />
          <Packet x={44} y={224} fill={C.success} label="B2 next" />
          <text x="106" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>CPU producer</text>
        </g>
        <Arrow x1={204} x2={224} y1={214} y2={214} color={C.accent} />
        <g ref={filterRef} style={{ opacity: 0.3 }}>
          <rect x="236" y="86" width="164" height="254" rx="14" fill={C.surface} stroke={C.warning} strokeWidth="2" />
          <text x="318" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>2 · filter</text>
          <circle cx="286" cy="186" r="16" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="3" />
          <circle cx="318" cy="186" r="16" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="3" />
          <circle cx="350" cy="186" r="16" fill={C.warning} fillOpacity="0.2" stroke={C.warning} strokeWidth="3" />
          <text x="318" y="248" textAnchor="middle" fontSize="13" fill={C.warning}>key → tag</text>
          <text x="318" y="278" textAnchor="middle" fontSize="12" fill={C.secondary}>GPU regular path</text>
          <text x="318" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>write sparse ids</text>
        </g>
        <Arrow x1={416} x2={436} y1={214} y2={214} color={C.warning} />
        <g ref={verifyRef} style={{ opacity: 0.3 }}>
          <rect x="448" y="86" width="164" height="254" rx="14" fill={C.surface} stroke={C.success} strokeWidth="2" />
          <text x="530" y="116" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>3 · verify</text>
          <rect x="482" y="162" width="96" height="42" rx="9" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
          <text x="530" y="188" textAnchor="middle" fontSize="13" fill={C.success}>full signature</text>
          <text x="530" y="248" textAnchor="middle" fontSize="13" fill={C.success}>CPU cache work</text>
          <text x="530" y="278" textAnchor="middle" fontSize="12" fill={C.secondary}>only candidates</text>
          <text x="530" y="310" textAnchor="middle" fontSize="12" fill={C.secondary}>map object result</text>
        </g>
        <Arrow x1={628} x2={648} y1={214} y2={214} color={C.success} />
        <g ref={rotateRef} style={{ opacity: 0.3 }}>
          <rect x="660" y="86" width="76" height="254" rx="14" fill={C.surface} stroke={C.accent} strokeWidth="2" />
          <text x="698" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.text}>4</text>
          <circle cx="698" cy="178" r="20" fill="none" stroke={C.accent} strokeWidth="3" />
          <path d="M 698 158 A 20 20 0 0 1 716 190" fill="none" stroke={C.accent} strokeWidth="3" />
          <polygon points="716,190 706,186 714,180" fill={C.accent} />
          <text x="698" y="242" textAnchor="middle" fontSize="12" fill={C.accent}>B0 → B1</text>
          <text x="698" y="270" textAnchor="middle" fontSize="12" fill={C.secondary}>overlap</text>
          <text x="698" y="310" textAnchor="middle" fontSize="11" fill={C.secondary}>latency</text>
        </g>
        <rect x="24" y="376" width="712" height="36" rx="9" fill={C.surface} stroke={C.border} />
        <text x="380" y="399" textAnchor="middle" fontSize="13" fill={C.secondary}>
          only positive result readback is serialized in the original implementation
        </text>
      </Frame>
      <TimelineControls timeline={timeline} labelText={PIPELINE_LABELS} caption="逐步观察 CPU 和 GPU 如何通过多 buffer 轮转隐藏等待。" />
    </Figure>
  );
}

type DatabaseSize = "30000" | "64000" | "120000";
type BufferSize = "512" | "8192";
type MatchRate = "0" | "10" | "25" | "50";
type VerifyPolicy = "full" | "block" | "object";
type PipelineMode = "serial" | "rotating";

const DEFAULTS = {
  buffer: "8192" as BufferSize,
  database: "30000" as DatabaseSize,
  matchRate: "10" as MatchRate,
  pipeline: "rotating" as PipelineMode,
  verify: "object" as VerifyPolicy,
};

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function GpuGems3Ch35VirusScanLab() {
  const [database, setDatabase] = useState<DatabaseSize>(DEFAULTS.database);
  const [buffer, setBuffer] = useState<BufferSize>(DEFAULTS.buffer);
  const [matchRate, setMatchRate] = useState<MatchRate>(DEFAULTS.matchRate);
  const [verify, setVerify] = useState<VerifyPolicy>(DEFAULTS.verify);
  const [pipeline, setPipeline] = useState<PipelineMode>(DEFAULTS.pipeline);

  const result = useMemo(() => {
    const bufferMb = Number(buffer);
    const signatures = Number(database);
    const rate = Number(matchRate);
    const inputBytes = bufferMb * 1024;
    const windows = Math.max(1, inputBytes - 1);
    const tableEntries = 64000;
    const tableOverflow = signatures > tableEntries;
    const candidateRate = 0.012 + rate / 220;
    const candidates = Math.round(windows * candidateRate);
    const verificationFactor = verify === "full" ? 1 : verify === "block" ? 0.52 : 0.28;
    const cpuChecks = Math.round(candidates * verificationFactor);
    const gpuGbps = pipeline === "rotating" ? (rate === 0 ? 27 : 17) : rate === 0 ? 19 : 11;
    const transferPenalty = rate === 0 ? "低：结果缓冲区几乎为空" : "高：候选结果需要回读";
    const capacityStatus = tableOverflow ? "超过 64,000：需合并候选或扩表" : "落在单 key 表容量内";
    const decision = rate >= 25 && verify === "block" ? "block 可提前标记 suspect" : "CPU 继续验证候选";
    return { capacityStatus, candidates, cpuChecks, decision, gpuGbps, inputBytes, tableOverflow, transferPenalty, windows };
  }, [buffer, database, matchRate, pipeline, verify]);

  const reset = () => {
    setDatabase(DEFAULTS.database);
    setBuffer(DEFAULTS.buffer);
    setMatchRate(DEFAULTS.matchRate);
    setVerify(DEFAULTS.verify);
    setPipeline(DEFAULTS.pipeline);
  };

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      <div className="border-b border-border px-5 py-4">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-secondary">GPU Gems 3 · Chapter 35</span>
            <h3 className="mt-1 text-lg font-semibold text-primary">GPU Virus Filter Lab</h3>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-[11px] text-accent">可交互</span>
        </div>
        <p className="mt-3 text-sm text-secondary">调节签名表规模、输入 buffer、命中率、CPU 验证策略和 buffer 管线，观察候选数量与回读成本如何移动。</p>
        <button type="button" onClick={reset} className="mt-3 rounded-control border border-border px-3 py-2 text-sm text-secondary transition hover:border-accent hover:text-primary">重置实验</button>
      </div>
      <div className="grid gap-5 p-4 md:grid-cols-[1.12fr_0.88fr] md:p-5">
        <div>
          <div className="overflow-hidden rounded-control border border-border bg-bg p-3">
            <svg viewBox="0 0 730 414" role="img" aria-label={`病毒过滤实验：${database} signatures，${buffer} KB buffer，${matchRate}% tag match，${pipeline} pipeline，${verify} verification`} className="mx-auto block h-auto w-full">
              <text x="365" y="24" textAnchor="middle" fontSize="15" fontWeight="700" fill={C.text}>bytes → key/tag filter → candidate ids → CPU decision</text>
              <rect x="34" y="56" width="662" height="250" rx="12" fill={C.surface} stroke={C.border} />
              <Packet x={66} y={118} label="input" />
              <Arrow x1={154} x2={198} y1={140} y2={140} color={C.accent} />
              <rect x="216" y="96" width="126" height="88" rx="11" fill={C.warning} fillOpacity="0.14" stroke={C.warning} strokeWidth="2" />
              <text x="279" y="122" textAnchor="middle" fontSize="13" fill={C.warning}>64K table</text>
              <text x="279" y="148" textAnchor="middle" fontSize="12" fill={C.secondary}>{result.tableOverflow ? "coarse candidates" : "key → tag"}</text>
              <Arrow x1={360} x2={404} y1={140} y2={140} color={C.warning} />
              <rect x="422" y="96" width="126" height="88" rx="11" fill={C.success} fillOpacity="0.14" stroke={C.success} strokeWidth="2" />
              <text x="485" y="122" textAnchor="middle" fontSize="13" fill={C.success}>output ids</text>
              <text x="485" y="148" textAnchor="middle" fontSize="12" fill={C.secondary}>{formatNumber(result.candidates)} candidates</text>
              <Arrow x1={566} x2={614} y1={140} y2={140} color={C.success} />
              <circle cx="650" cy="140" r="25" fill={result.tableOverflow ? C.danger : C.success} fillOpacity="0.18" stroke={result.tableOverflow ? C.danger : C.success} strokeWidth="3" />
              <text x="650" y="146" textAnchor="middle" fontSize="12" fill={result.tableOverflow ? C.danger : C.success}>{result.tableOverflow ? "!" : "CPU"}</text>
              <text x="365" y="230" textAnchor="middle" fontSize="13" fill={C.secondary}>{formatNumber(result.windows)} overlapping windows · {result.gpuGbps}× reference path</text>
              <text x="365" y="258" textAnchor="middle" fontSize="13" fill={C.warning}>{result.transferPenalty} · {result.capacityStatus}</text>
              <text x="365" y="286" textAnchor="middle" fontSize="13" fill={C.success}>{result.decision} · {formatNumber(result.cpuChecks)} CPU verification checks</text>
              <text x="365" y="340" textAnchor="middle" fontSize="13" fill={C.secondary}>the filter is conservative: candidate does not mean infected</text>
              <text x="365" y="368" textAnchor="middle" fontSize="13" fill={C.accent}>positive density moves cost toward result readback and verification</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Metric label="overlapping windows" tone={C.accent} value={formatNumber(result.windows)} />
            <Metric label="candidate ids" tone={C.warning} value={formatNumber(result.candidates)} />
            <Metric label="CPU checks" tone={C.success} value={formatNumber(result.cpuChecks)} />
            <Metric label="relative filter path" tone={C.success} value={`${result.gpuGbps}×`} />
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm text-secondary" htmlFor="ch35-database">signature database<select id="ch35-database" value={database} onChange={(event) => setDatabase(event.target.value as DatabaseSize)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="30000">30,000 · original demo scale</option><option value="64000">64,000 · table capacity</option><option value="120000">120,000 · overflow case</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch35-buffer">input buffer<select id="ch35-buffer" value={buffer} onChange={(event) => setBuffer(event.target.value as BufferSize)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="512">512 KB · one object group</option><option value="8192">8 MB · full scan buffer</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch35-match">tag match rate: {matchRate}%<input id="ch35-match" type="range" min="0" max="50" step="5" value={matchRate} onChange={(event) => setMatchRate(event.target.value as MatchRate)} className="mt-3 block w-full accent-[var(--accent)]" /></label>
          <label className="block text-sm text-secondary" htmlFor="ch35-verify">CPU verification policy<select id="ch35-verify" value={verify} onChange={(event) => setVerify(event.target.value as VerifyPolicy)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="full">verify every candidate</option><option value="block">block threshold</option><option value="object">object threshold</option></select></label>
          <label className="block text-sm text-secondary" htmlFor="ch35-pipeline">buffer pipeline<select id="ch35-pipeline" value={pipeline} onChange={(event) => setPipeline(event.target.value as PipelineMode)} className="mt-2 block w-full rounded-control border border-border bg-bg px-3 py-3 text-sm text-primary"><option value="rotating">rotating buffers</option><option value="serial">serial CPU/GPU</option></select></label>
        </div>
      </div>
    </div>
  );
}
