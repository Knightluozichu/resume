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

export function GpuGems2Ch36FilteringPipelineDiagram() {
  const input = ["+4", "−2", "+7", "∅", "+1", "∅", "+3", "∅"];
  const output = ["+4", "+7", "+1", "+3"];
  return (
    <Figure>
      <Frame label="GPU data filtering 流程图：输入 stream 经过 predicate，把不保留的元素写为 null record，再通过 scan 得到偏移，最后用 search 和 gather 形成没有空洞的紧凑输出 stream">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          固定输出位置，也能生成变长结果
        </text>
        <text x="44" y="80" fontSize="14" fontWeight="700" fill={C.secondary}>
          input stream
        </text>
        {input.map((value, index) => (
          <g key={`input-${index}`}>
            <rect
              x={44 + index * 78}
              y="99"
              width="61"
              height="42"
              rx="7"
              fill={value === "∅" ? C.border : C.accent}
              fillOpacity={value === "∅" ? 0.32 : 0.2}
              stroke={value === "∅" ? C.border : C.accent}
            />
            <text
              x={74 + index * 78}
              y="126"
              textAnchor="middle"
              fontSize="13"
              fill={C.text}
            >
              {value}
            </text>
          </g>
        ))}
        <Arrow x1={380} y1={155} x2={380} y2={193} color={C.warning} />
        <rect
          x="126"
          y="200"
          width="508"
          height="50"
          rx="10"
          fill={C.warning}
          fillOpacity="0.12"
          stroke={C.warning}
        />
        <text
          x="380"
          y="231"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.warning}
        >
          predicate：保留正值，其余写成 null record；scan 计算每个元素应移动几格
        </text>
        <Arrow x1={380} y1={265} x2={380} y2={304} color={C.success} />
        <text
          x="380"
          y="292"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          search / gather 替代 scatter
        </text>
        <text x="44" y="343" fontSize="14" fontWeight="700" fill={C.success}>
          compacted output
        </text>
        {output.map((value, index) => (
          <g key={`output-${index}`}>
            <rect
              x={44 + index * 98}
              y="359"
              width="82"
              height="42"
              rx="7"
              fill={C.success}
              fillOpacity="0.2"
              stroke={C.success}
            />
            <text
              x={85 + index * 98}
              y="386"
              textAnchor="middle"
              fontSize="13"
              fill={C.text}
            >
              {value}
            </text>
          </g>
        ))}
        <text x="580" y="385" fontSize="12" fill={C.secondary}>
          length = 4
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch36ScanTreeDiagram() {
  const rows = [
    ["offset 1", [1, 0, 1, 1, 0, 1, 0, 1]],
    ["offset 2", [1, 1, 2, 2, 1, 2, 1, 2]],
    ["offset 4", [1, 1, 2, 3, 2, 3, 2, 4]],
  ] as const;
  return (
    <Figure>
      <Frame label="scan 多 pass 图：第一轮统计相邻一个位置的 null，第二轮把两个位置前的累计值加入，第三轮把四个位置前的累计值加入；每轮距离翻倍，直到覆盖整个 stream">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          scan：每一轮把“知道的范围”扩大一倍
        </text>
        <text
          x="380"
          y="57"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          同一轮的每个 record 都能并行读取上一轮的固定偏移
        </text>
        {rows.map(([label, values], rowIndex) => (
          <g key={label}>
            <text
              x="42"
              y={106 + rowIndex * 92}
              fontSize="14"
              fontWeight="700"
              fill={rowIndex === 2 ? C.success : C.accent}
            >
              {label}
            </text>
            {values.map((value, index) => (
              <g key={`${label}-${index}`}>
                <rect
                  x={150 + index * 62}
                  y={84 + rowIndex * 92}
                  width="48"
                  height="46"
                  rx="7"
                  fill={rowIndex === 2 ? C.success : C.accent}
                  fillOpacity="0.18"
                  stroke={rowIndex === 2 ? C.success : C.accent}
                />
                <text
                  x={174 + index * 62}
                  y={113 + rowIndex * 92}
                  textAnchor="middle"
                  fontSize="13"
                  fill={C.text}
                >
                  {value}
                </text>
              </g>
            ))}
            {rowIndex < rows.length - 1 && (
              <Arrow
                x1={380}
                y1={139 + rowIndex * 92}
                x2={380}
                y2={162 + rowIndex * 92}
                color={C.warning}
              />
            )}
          </g>
        ))}
        <rect
          x="102"
          y="367"
          width="556"
          height="43"
          rx="10"
          fill={C.surface}
          stroke={C.warning}
        />
        <text
          x="380"
          y="394"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          n 个元素需要约 log₂(n) 个依赖 pass；最右值给出 null 总数
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch36SearchGatherDiagram() {
  return (
    <Figure>
      <Frame label="search 和 gather 图：每个输出位置在单调递增的 scan 结果中做并行二分搜索，找到对应输入后主动 gather；避免 fragment processor 不能执行的任意 scatter 写入">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          找位置，不把记录“推”过去
        </text>
        <text
          x="380"
          y="57"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          scan 产生单调递增的偏移；search 找到来源，gather 在固定输出位置读取它
        </text>
        <rect
          x="40"
          y="92"
          width="244"
          height="222"
          rx="13"
          fill={C.surface}
          stroke={C.accent}
        />
        <text
          x="162"
          y="124"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          scan stream
        </text>
        {Array.from({ length: 6 }, (_, index) => (
          <g key={`scan-${index}`}>
            <rect
              x={70 + index * 28}
              y="157"
              width="22"
              height="36"
              rx="5"
              fill={C.accent}
              fillOpacity="0.22"
              stroke={C.accent}
            />
            <text
              x={81 + index * 28}
              y="180"
              textAnchor="middle"
              fontSize="11"
              fill={C.text}
            >
              {index + Math.floor(index / 2)}
            </text>
          </g>
        ))}
        <text
          x="162"
          y="237"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          单调递增，适合 binary search
        </text>
        <text
          x="162"
          y="270"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          目标：输出位置 2
        </text>
        <Arrow x1={310} y1={205} x2={365} y2={205} color={C.warning} />
        <text
          x="337"
          y="183"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          search
        </text>
        <rect
          x="392"
          y="92"
          width="324"
          height="222"
          rx="13"
          fill={C.surface}
          stroke={C.success}
        />
        <text
          x="554"
          y="124"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          fixed output locations
        </text>
        <rect
          x="435"
          y="157"
          width="214"
          height="42"
          rx="8"
          fill={C.success}
          fillOpacity="0.18"
          stroke={C.success}
        />
        <text x="542" y="183" textAnchor="middle" fontSize="13" fill={C.text}>
          out[2] = gather(value[4])
        </text>
        <Arrow x1={542} y1={218} x2={542} y2={253} color={C.success} />
        <text
          x="554"
          y="278"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          读取代替任意地址写入
        </text>
        <text
          x="380"
          y="379"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.danger}
        >
          禁止的 scatter：让 value[4] 自己写到 out[2]
        </text>
        <text
          x="380"
          y="402"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          fragment processor 只能在预定位置输出，因此把地址关系反过来表达
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch36CollisionBreadthFirstDiagram() {
  return (
    <Figure>
      <Frame label="碰撞检测 breadth-first 图：候选包围盒对先被并行过滤，不相交的 pair 被移除，相交的非叶节点被拆成子节点 pair，列表反复变短或展开，直到叶节点做三角形检测">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          filtering 让树遍历的候选列表随状态变化
        </text>
        <rect
          x="42"
          y="92"
          width="170"
          height="204"
          rx="13"
          fill={C.surface}
          stroke={C.accent}
        />
        <text
          x="127"
          y="123"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          level 0
        </text>
        <rect
          x="92"
          y="164"
          width="70"
          height="46"
          rx="8"
          fill={C.accent}
          fillOpacity="0.2"
          stroke={C.accent}
        />
        <text x="127" y="192" textAnchor="middle" fontSize="12" fill={C.text}>
          A × B
        </text>
        <text
          x="127"
          y="249"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          一个根节点 pair
        </text>
        <Arrow x1={232} y1={195} x2={280} y2={195} color={C.warning} />
        <text
          x="256"
          y="173"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          overlap?
        </text>
        <rect
          x="298"
          y="92"
          width="190"
          height="204"
          rx="13"
          fill={C.surface}
          stroke={C.warning}
        />
        <text
          x="393"
          y="123"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          filter + split
        </text>
        {[
          ["reject", C.border],
          ["A₀ × B₀", C.success],
          ["A₁ × B₀", C.success],
          ["A₀ × B₁", C.success],
        ].map(([label, tone], index) => (
          <g key={label}>
            <rect
              x="329"
              y={150 + index * 32}
              width="128"
              height="23"
              rx="5"
              fill={tone}
              fillOpacity={tone === C.border ? 0.25 : 0.2}
              stroke={tone}
            />
            <text
              x="393"
              y={166 + index * 32}
              textAnchor="middle"
              fontSize="11"
              fill={C.text}
            >
              {label}
            </text>
          </g>
        ))}
        <Arrow x1={507} y1={195} x2={555} y2={195} color={C.success} />
        <text
          x="531"
          y="173"
          textAnchor="middle"
          fontSize="12"
          fill={C.success}
        >
          next level
        </text>
        <rect
          x="573"
          y="92"
          width="145"
          height="204"
          rx="13"
          fill={C.surface}
          stroke={C.success}
        />
        <text
          x="645"
          y="123"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          level n
        </text>
        <circle
          cx="620"
          cy="177"
          r="17"
          fill={C.success}
          fillOpacity="0.2"
          stroke={C.success}
        />
        <circle
          cx="672"
          cy="177"
          r="17"
          fill={C.success}
          fillOpacity="0.2"
          stroke={C.success}
        />
        <text
          x="646"
          y="235"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          nonleaf 继续展开
        </text>
        <text
          x="646"
          y="258"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          leaf 进入 triangle test
        </text>
        <path
          d="M 645 320 C 645 383, 127 383, 127 320"
          fill="none"
          stroke={C.danger}
          strokeWidth="3"
          strokeDasharray="8 7"
        />
        <polygon points="127,320 118,337 136,337" fill={C.danger} />
        <text
          x="380"
          y="369"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.danger}
        >
          列表每轮先过滤再展开，直到 active list 变成空
        </text>
      </Frame>
    </Figure>
  );
}

export function GpuGems2Ch36SubdivisionStreamDiagram() {
  return (
    <Figure>
      <Frame label="自适应 subdivision stream 图：输入三角形根据边约束被标记为 complete 或 active，complete 被过滤到输出，active 被拆成四个新三角形并带着邻居信息进入下一轮">
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          变长输出不只是删除，也可以过滤后再展开
        </text>
        <text
          x="380"
          y="57"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          自适应细分把“已足够小”和“还要继续”的三角形分开处理
        </text>
        <rect
          x="42"
          y="96"
          width="196"
          height="214"
          rx="13"
          fill={C.surface}
          stroke={C.accent}
        />
        <text
          x="140"
          y="127"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.accent}
        >
          input triangles
        </text>
        <path
          d="M 84 246 L 140 153 L 196 246 Z"
          fill={C.accent}
          fillOpacity="0.2"
          stroke={C.accent}
          strokeWidth="2"
        />
        <text
          x="140"
          y="278"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          邻居坐标 + edge flags
        </text>
        <Arrow x1={263} y1={202} x2={315} y2={202} color={C.warning} />
        <text
          x="289"
          y="180"
          textAnchor="middle"
          fontSize="12"
          fill={C.warning}
        >
          filter
        </text>
        <rect
          x="336"
          y="96"
          width="170"
          height="214"
          rx="13"
          fill={C.surface}
          stroke={C.warning}
        />
        <text
          x="421"
          y="127"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.warning}
        >
          decision
        </text>
        <rect
          x="365"
          y="158"
          width="112"
          height="38"
          rx="7"
          fill={C.success}
          fillOpacity="0.2"
          stroke={C.success}
        />
        <text x="421" y="182" textAnchor="middle" fontSize="12" fill={C.text}>
          complete
        </text>
        <rect
          x="365"
          y="220"
          width="112"
          height="38"
          rx="7"
          fill={C.danger}
          fillOpacity="0.16"
          stroke={C.danger}
        />
        <text x="421" y="244" textAnchor="middle" fontSize="12" fill={C.text}>
          active → split
        </text>
        <Arrow x1={531} y1={170} x2={580} y2={170} color={C.success} />
        <Arrow x1={531} y1={240} x2={580} y2={240} color={C.danger} />
        <rect
          x="598"
          y="96"
          width="120"
          height="214"
          rx="13"
          fill={C.surface}
          stroke={C.success}
        />
        <text
          x="658"
          y="127"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill={C.success}
        >
          next
        </text>
        <text
          x="658"
          y="172"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          render
        </text>
        <text
          x="658"
          y="221"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          4 children
        </text>
        <text
          x="658"
          y="244"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          + neighbors
        </text>
        <text
          x="380"
          y="366"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill={C.danger}
        >
          每轮 active stream 可能变长或变短，但输出位置仍由当前 pass 预先决定
        </text>
        <text
          x="380"
          y="392"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          邻居坐标随 triangle 携带，可少一次 pointer indirection
        </text>
      </Frame>
    </Figure>
  );
}

const TIMELINE_STEPS: readonly TeachingStep[] = [
  { label: "mark", caption: "先用 predicate 标出保留与 null" },
  { label: "scan", caption: "用 log₂(n) 轮 scan 计算偏移" },
  { label: "search", caption: "在单调结果上搜索来源位置" },
  { label: "gather", caption: "在固定输出位置 gather，得到紧凑 stream" },
];

const TIMELINE_LABELS: Record<string, string> = Object.fromEntries(
  TIMELINE_STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function GpuGems2Ch36FilteringTimelineDiagram() {
  const markRef = useRef<SVGGElement>(null);
  const scanRef = useRef<SVGGElement>(null);
  const searchRef = useRef<SVGGElement>(null);
  const gatherRef = useRef<SVGGElement>(null);
  const timeline = useTeachingTimeline({
    steps: TIMELINE_STEPS,
    build: (tl) => {
      tl.add(markRef.current!, { opacity: [0.5, 1], duration: T * 0.5 }, 0);
      tl.label("mark", 0);
      tl.add(scanRef.current!, { opacity: [0.5, 1], duration: T * 0.5 }, T);
      tl.label("scan", T);
      tl.add(
        searchRef.current!,
        { opacity: [0.5, 1], duration: T * 0.5 },
        T * 2,
      );
      tl.label("search", T * 2);
      tl.add(
        gatherRef.current!,
        { opacity: [0.5, 1], duration: T * 0.5 },
        T * 3,
      );
      tl.label("gather", T * 3);
    },
  });
  const nodes = [
    ["① mark", C.warning],
    ["② scan", C.accent],
    ["③ search", C.success],
    ["④ gather", C.danger],
  ] as const;
  return (
    <Figure>
      <svg
        viewBox="0 0 760 440"
        role="img"
        aria-label="stream filtering 教学时间线：标记 null、scan 计算偏移、search 定位来源、gather 形成紧凑输出。支持播放、暂停、单步和拖动。"
        className="mx-auto block h-auto w-full max-w-[760px]"
      >
        <rect width="760" height="440" rx="16" fill={C.bg} />
        <text
          x="380"
          y="32"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fill={C.text}
        >
          用四个可观察阶段实现变长输出
        </text>
        <text
          x="380"
          y="57"
          textAnchor="middle"
          fontSize="12"
          fill={C.secondary}
        >
          每个阶段仍是固定输出位置的 stream pass
        </text>
        <g ref={markRef} style={{ opacity: 0.5 }}>
          <rect
            x="48"
            y="91"
            width="664"
            height="52"
            rx="10"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
          />
          <text x="70" y="123" fontSize="13" fontWeight="700" fill={C.warning}>
            ① mark
          </text>
          <text x="215" y="123" fontSize="12" fill={C.text}>
            predicate 输出 value 或 null record
          </text>
        </g>
        <g ref={scanRef} style={{ opacity: 0.5 }}>
          <rect
            x="48"
            y="161"
            width="664"
            height="52"
            rx="10"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
          />
          <text x="70" y="193" fontSize="13" fontWeight="700" fill={C.accent}>
            ② scan
          </text>
          <text x="215" y="193" fontSize="12" fill={C.text}>
            每轮把相邻范围扩大一倍，得到累计 null 数
          </text>
        </g>
        <g ref={searchRef} style={{ opacity: 0.5 }}>
          <rect
            x="48"
            y="231"
            width="664"
            height="52"
            rx="10"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
          />
          <text x="70" y="263" fontSize="13" fontWeight="700" fill={C.success}>
            ③ search
          </text>
          <text x="215" y="263" fontSize="12" fill={C.text}>
            利用单调偏移做二分搜索，解决原本的 scatter 地址
          </text>
        </g>
        <g ref={gatherRef} style={{ opacity: 0.5 }}>
          <rect
            x="48"
            y="301"
            width="664"
            height="52"
            rx="10"
            fill={C.danger}
            fillOpacity="0.1"
            stroke={C.danger}
          />
          <text x="70" y="333" fontSize="13" fontWeight="700" fill={C.danger}>
            ④ gather
          </text>
          <text x="215" y="333" fontSize="12" fill={C.text}>
            每个输出位置读取对应来源，空洞被移到 stream 尾部
          </text>
        </g>
        <line
          x1="48"
          y1="385"
          x2="712"
          y2="385"
          stroke={C.border}
          strokeWidth="2"
        />
        {nodes.map(([label, tone], index) => (
          <g key={label}>
            <circle cx={96 + index * 184} cy="385" r="8" fill={tone} />
            <text
              x={96 + index * 184}
              y="412"
              textAnchor="middle"
              fontSize="12"
              fill={C.secondary}
            >
              {label}
            </text>
          </g>
        ))}
      </svg>
      <TimelineControls
        timeline={timeline}
        labelText={TIMELINE_LABELS}
        caption="核心转换：把不可表达的变长 scatter，改写成多 pass 的 scan + search + gather。"
      />
    </Figure>
  );
}

type ReductionMode = "filter" | "collision" | "subdivide";

export function GpuGems2Ch36ReductionLab() {
  const [mode, setMode] = useState<ReductionMode>("collision");
  const [records, setRecords] = useState(4);
  const [nullRatio, setNullRatio] = useState(50);

  const result = useMemo(() => {
    const inputRecords = 256 * records;
    const activeRecords = Math.max(
      1,
      Math.round(inputRecords * (1 - nullRatio / 100)),
    );
    const scanPasses = Math.ceil(Math.log2(inputRecords));
    const searchSteps = Math.ceil(
      Math.log2(Math.max(2, inputRecords * (nullRatio / 100))),
    );
    const outputRecords =
      mode === "filter"
        ? activeRecords
        : mode === "collision"
          ? Math.max(1, Math.round(activeRecords * 0.34))
          : activeRecords * 2;
    const expansion = mode === "subdivide" ? 4 : mode === "collision" ? 2 : 1;
    const recommendation =
      mode === "filter"
        ? "scan + search/gather：输出保留元素，null 被挪到尾部"
        : mode === "collision"
          ? "每层先 filter 候选 pair，再展开相交的非叶节点"
          : "过滤完成三角形，active triangle 生成 children + neighbors";
    return {
      activeRecords,
      expansion,
      outputRecords,
      recommendation,
      scanPasses,
      searchSteps,
    };
  }, [mode, nullRatio, records]);

  const reset = () => {
    setMode("collision");
    setRecords(4);
    setNullRatio(50);
  };

  return (
    <Figure>
      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="mb-3 text-sm font-semibold text-primary">
            Reduction Lab · inspect variable-length streams
          </p>
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="reduction mode"
          >
            {(["filter", "collision", "subdivide"] as ReductionMode[]).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-full border px-3 py-1.5 text-sm font-semibold transition"
                  style={{
                    background: mode === item ? C.accent : C.surface,
                    borderColor: mode === item ? C.accent : C.border,
                    color: mode === item ? C.bg : C.text,
                  }}
                  onClick={() => setMode(item)}
                >
                  {item}
                </button>
              ),
            )}
            <button
              type="button"
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-secondary transition hover:border-accent hover:text-primary"
              onClick={reset}
            >
              reset
            </button>
          </div>
          <label className="mt-5 block text-sm text-secondary">
            input groups: {records}
            <input
              aria-label="input groups"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="1"
              max="8"
              step="1"
              value={records}
              onChange={(event) => setRecords(Number(event.target.value))}
            />
          </label>
          <label className="mt-4 block text-sm text-secondary">
            filtered ratio: {nullRatio}%
            <input
              aria-label="filtered ratio"
              className="mt-2 block w-full accent-[var(--accent)]"
              type="range"
              min="10"
              max="90"
              step="10"
              value={nullRatio}
              onChange={(event) => setNullRatio(Number(event.target.value))}
            />
          </label>
          <div className="mt-5 rounded-xl border border-border bg-surface p-4">
            <p className="text-sm font-semibold text-primary">
              What this mode exposes
            </p>
            <p className="mt-2 text-sm leading-6 text-secondary">
              {mode === "filter" &&
                "每个输入最多贡献一个输出：关键是找到 compacted index，而不是让输入自己 scatter。"}
              {mode === "collision" &&
                "候选 pair 的列表每轮先缩短，再把相交的 nonleaf pair 展开到下一层。"}
              {mode === "subdivide" &&
                "已完成的三角形被输出，active 三角形被拆成 children；列表长度与邻居状态一起变化。"}
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="mb-2 text-sm font-semibold text-primary">
            Derived metrics
          </p>
          <Metric
            label="input records"
            value={`${records * 256}`}
            tone={C.accent}
          />
          <Metric
            label="active records"
            value={`${result.activeRecords}`}
            tone={C.success}
          />
          <Metric
            label="scan passes"
            value={`${result.scanPasses}`}
            tone={C.warning}
          />
          <Metric
            label="search steps"
            value={`${result.searchSteps}`}
            tone={C.secondary}
          />
          <Metric
            label="output records"
            value={`${result.outputRecords}`}
            tone={C.danger}
          />
          <Metric
            label="expansion factor"
            value={`${result.expansion}×`}
            tone={C.accent}
          />
          <p className="mt-4 text-sm font-semibold text-primary">
            recommended representation
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {result.recommendation}
          </p>
          <p className="mt-4 text-xs leading-5 text-secondary">
            这些是由输入规模、过滤比例和算法模式推导出的 stream
            形状，不是合成性能分数。
          </p>
        </div>
      </div>
    </Figure>
  );
}
