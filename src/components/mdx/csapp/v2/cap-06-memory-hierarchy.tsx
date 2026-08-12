"use client";

import { useMemo, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 820;
const VIEW_H = 470;
const T = TEACHING_BEAT_MS;

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type Mode = "address" | "locality" | "cache" | "mountain";
type Sample = "sequential" | "conflict" | "working-set";

const CONCEPTS = [
  "第6章 存储器层次结构",
  "6.1 存储技术",
  "6.1.1 随机访问存储器",
  "6.1.2 磁盘存储",
  "6.1.3 固态硬盘",
  "6.1.4 存储技术趋势",
  "6.2 局部性",
  "6.2.1 对程序数据引用的局部性",
  "6.2.2 取指令的局部性",
  "6.2.3 局部性小结",
  "6.3 存储器层次结构",
  "6.3.1 存储器层次结构中的缓存",
  "6.3.2 存储器层次结构概念小结",
  "6.4 高速缓存存储器",
  "6.4.1 通用的高速缓存存储器组织结构",
  "6.4.2 直接映射高速缓存",
  "6.4.3 组相联高速缓存",
  "6.4.4 全相联高速缓存",
  "6.4.5 有关写的问题",
  "6.4.6 一个真实的高速缓存层次结构的解剖",
  "6.4.7 高速缓存参数的性能影响",
  "6.5 编写高速缓存友好的代码",
  "6.6 综合：高速缓存对程序性能的影响",
  "6.6.1 存储器山",
  "6.6.2 重新排列循环以提高空间局部性",
  "6.6.3 在程序中利用局部性",
  "6.7 小结",
] as const;

const MODES: readonly { id: Mode; label: string; focus: string }[] = [
  { id: "address", label: "地址分解", focus: "tag · set · offset" },
  { id: "locality", label: "局部性", focus: "时间 · 空间 · 工作集" },
  { id: "cache", label: "命中策略", focus: "匹配 · 替换 · 写回" },
  { id: "mountain", label: "存储器山", focus: "步长 · 容量 · 带宽" },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  result: string;
  evidence: string;
}[] = [
  {
    id: "sequential",
    label: "顺序访问",
    result: "空间局部性较好",
    evidence: "相邻块共享缓存行，命中轨迹可重放",
  },
  {
    id: "conflict",
    label: "冲突访问",
    result: "同集合反复驱逐",
    evidence: "标记变化而集合索引保持相同",
  },
  {
    id: "working-set",
    label: "工作集超限",
    result: "容量未命中增加",
    evidence: "工作集与缓存容量的关系决定退化",
  },
] as const;

const LANES: readonly { id: string; label: string; artifact: string }[] = [
  { id: "address", label: "地址", artifact: "tag / set / off" },
  { id: "ram", label: "存储技术", artifact: "SRAM / DRAM" },
  { id: "locality", label: "局部性", artifact: "time / space" },
  { id: "cache", label: "缓存行", artifact: "valid / tag" },
  { id: "policy", label: "策略", artifact: "replace / write" },
  { id: "result", label: "结果", artifact: "hit / miss / CPE" },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "address", caption: "把地址拆成标记、集合与块偏移。" },
  { label: "locality", caption: "观察时间和空间局部性。" },
  { label: "match", caption: "匹配有效位和标记。" },
  { label: "policy", caption: "执行替换与写策略。" },
  { label: "replay", caption: "用访问序列和 CPE 验收。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function ToggleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "border-accent bg-accent/10 text-primary" : "border-border bg-background text-secondary hover:border-accent hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function LaneCard({
  lane,
  index,
  mode,
  sample,
}: {
  lane: (typeof LANES)[number];
  index: number;
  mode: Mode;
  sample: Sample;
}) {
  const focusIndex =
    mode === "address"
      ? index === 0 || index === 3
      : mode === "locality"
        ? index === 2
        : mode === "cache"
          ? index === 3 || index === 4
          : index === 5;
  const issue =
    (sample === "conflict" && (index === 3 || index === 4)) ||
    (sample === "working-set" && index === 5);
  const color = issue
    ? sample === "working-set"
      ? COLORS.warning
      : COLORS.danger
    : focusIndex
      ? COLORS.accent
      : COLORS.border;
  const status = issue
    ? sample === "working-set"
      ? "容量边界"
      : "驱逐"
    : focusIndex
      ? "当前焦点"
      : "已记录";
  return (
    <g>
      <rect
        x={18 + index * 130}
        y="142"
        width="112"
        height="104"
        rx="12"
        fill={COLORS.elevated}
        stroke={color}
        strokeWidth={focusIndex || issue ? 2 : 1.2}
      />
      <circle cx={40 + index * 130} cy="164" r="6" fill={color} />
      <text
        x={54 + index * 130}
        y="169"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {lane.label}
      </text>
      <text x={30 + index * 130} y="197" fontSize="11" fill={COLORS.secondary}>
        {lane.artifact}
      </text>
      <text
        x={30 + index * 130}
        y="224"
        fontSize="12"
        fontWeight="600"
        fill={color}
      >
        {status}
      </text>
    </g>
  );
}

/** 第 6 章专属实验：把地址分解、缓存策略和访问轨迹连接成命中证据。 */
export function Cap06MemoryHierarchyLab() {
  const [modeId, setModeId] = useState<Mode>("address");
  const [sampleId, setSampleId] = useState<Sample>("sequential");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const mode = useMemo(
    () => MODES.find((item) => item.id === modeId) ?? MODES[0],
    [modeId],
  );
  const sample = useMemo(
    () => SAMPLES.find((item) => item.id === sampleId) ?? SAMPLES[0],
    [sampleId],
  );
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = timelineRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.3, 1],
            scale: [0.95, 1],
            duration: T * 0.65,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  function reset() {
    setModeId("address");
    setSampleId("sequential");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第 6 章存储器层次结构专属缓存命中回放实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-06"
      data-visual-kind="cap-06-memory-hierarchy-cache-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap06MemoryHierarchyLab · 缓存命中回放台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从地址位段追到命中、驱逐与 CPE
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            选择访问视角和样本，逐帧查看地址如何穿过存储器层次。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前视角</div>
          <div>{mode.label}</div>
          <div>{mode.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="观察视角">
          {MODES.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === modeId}
              onClick={() => setModeId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="访问样本">
          {SAMPLES.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === sampleId}
              onClick={() => setSampleId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${mode.label}视角下的缓存轨迹：${sample.result}`}
          className="h-auto w-full"
        >
          <rect
            x="10"
            y="18"
            width="800"
            height="414"
            rx="16"
            fill={COLORS.elevated}
            stroke={COLORS.border}
          />
          <text
            x="28"
            y="52"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.primary}
          >
            address → tag/set/offset → lookup → replace/write → replay
          </text>
          <text x="28" y="78" fontSize="12" fill={COLORS.secondary}>
            {sample.evidence}
          </text>
          <line
            x1="42"
            y1="112"
            x2="778"
            y2="112"
            stroke={COLORS.border}
            strokeWidth="1"
          />
          {LANES.map((lane, index) => (
            <LaneCard
              key={lane.id}
              lane={lane}
              index={index}
              mode={modeId}
              sample={sampleId}
            />
          ))}
          <g
            ref={(node) => {
              timelineRefs.current.address = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="28"
              y="276"
              width="214"
              height="104"
              rx="12"
              fill={COLORS.accent}
              fillOpacity="0.08"
              stroke={COLORS.accent}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.locality = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path d="M258 328h106" stroke={COLORS.accent} strokeWidth="3" />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.match = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <circle
              cx="412"
              cy="328"
              r="24"
              fill={COLORS.accent}
              fillOpacity="0.16"
              stroke={COLORS.accent}
              strokeWidth="2"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.policy = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M466 328h112v-50"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth="3"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.replay = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="604"
              y="276"
              width="176"
              height="104"
              rx="12"
              fill={COLORS.success}
              fillOpacity="0.08"
              stroke={COLORS.success}
            />
          </g>
          <text x="32" y="408" fontSize="12" fill={COLORS.secondary}>
            命中不变量：相同参数与访问序列应复现相同的标记、集合、替换和性能结论
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；逐步查看地址分解、局部性、匹配、写策略和访问重放。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置存储器层次结构实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
