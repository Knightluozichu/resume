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

type Mode = "baseline" | "dependency" | "memory" | "branch";
type Sample = "normal" | "latency" | "mispredict";

const CONCEPTS = [
  "第5章 优化程序性能",
  "5.1 优化编译器的能力和局限性",
  "5.2 表示程序性能",
  "5.3 程序示例",
  "5.4 消除循环的低效率",
  "5.5 减少过程调用",
  "5.6 消除不必要的内存引用",
  "5.7 理解现代处理器",
  "5.7.1 整体操作",
  "5.7.2 功能单元的性能",
  "5.7.3 处理器操作的抽象模型",
  "5.8 循环展开",
  "5.9 提高并行性",
  "5.9.1 多个累积变量",
  "5.9.2 重新结合变换",
  "5.10 优化合并代码的结果小结",
  "5.11 一些限制因素",
  "5.11.1 寄存器溢出",
  "5.11.2 分支预测和预测错误处罚",
  "5.12 理解内存性能",
  "5.12.1 加载的性能",
  "5.12.2 存储的性能",
  "5.13 应用：性能提高技术",
  "5.14 确认和消除性能瓶颈",
  "5.14.1 程序剖析",
  "5.14.2 使用剖析程序来指导优化",
  "5.15 小结",
] as const;

const MODES: readonly { id: Mode; label: string; focus: string }[] = [
  { id: "baseline", label: "基线测量", focus: "CPE · 热点 · 重复运行" },
  { id: "dependency", label: "依赖链", focus: "关键路径 · 累积变量" },
  { id: "memory", label: "内存路径", focus: "加载 · 存储 · 局部性" },
  { id: "branch", label: "分支路径", focus: "预测 · 处罚 · 重放" },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  result: string;
  evidence: string;
}[] = [
  {
    id: "normal",
    label: "稳定输入",
    result: "优化后 CPE 下降",
    evidence: "输出、汇编和样本分布均可复查",
  },
  {
    id: "latency",
    label: "高延迟访存",
    result: "瓶颈转到内存路径",
    evidence: "加载/存储与关键路径需要分开计数",
  },
  {
    id: "mispredict",
    label: "误预测输入",
    result: "分支处罚抵消收益",
    evidence: "比较命中率、处罚周期和语义结果",
  },
] as const;

const LANES: readonly { id: string; label: string; artifact: string }[] = [
  { id: "source", label: "源码", artifact: "loop / call" },
  { id: "compile", label: "编译器", artifact: "-O2 / -O3" },
  { id: "path", label: "依赖链", artifact: "latency" },
  { id: "unit", label: "功能单元", artifact: "throughput" },
  { id: "memory", label: "内存", artifact: "load / store" },
  { id: "branch", label: "分支", artifact: "predict" },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "baseline", caption: "固定输入并测量 CPE 基线。" },
  { label: "profile", caption: "用剖析定位热点和限制。" },
  { label: "transform", caption: "应用一种语义保持变换。" },
  { label: "inspect", caption: "对照汇编、依赖链和访存。" },
  { label: "replay", caption: "重放样本并验收语义等价。" },
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
    mode === "baseline"
      ? index === 0 || index === 1
      : mode === "dependency"
        ? index === 2 || index === 3
        : mode === "memory"
          ? index === 4
          : index === 5;
  const issue =
    (sample === "latency" && (index === 2 || index === 4)) ||
    (sample === "mispredict" && index === 5);
  const color = issue
    ? sample === "mispredict"
      ? COLORS.warning
      : COLORS.danger
    : focusIndex
      ? COLORS.accent
      : COLORS.border;
  const status = issue
    ? sample === "mispredict"
      ? "处罚"
      : "瓶颈"
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

/** 第 5 章专属实验：把优化变换连接到 CPE、汇编、瓶颈与语义回归。 */
export function Cap05OptimizationLab() {
  const [modeId, setModeId] = useState<Mode>("baseline");
  const [sampleId, setSampleId] = useState<Sample>("normal");
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
    setModeId("baseline");
    setSampleId("normal");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第 5 章优化程序性能专属瓶颈定位实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-05"
      data-visual-kind="cap-05-optimization-bottleneck-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap05OptimizationLab · 性能瓶颈定位台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从 CPE 基线追到依赖链、内存与分支处罚
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            先测量，再定位，再变换，最后用汇编和语义回归验收收益。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前视角</div>
          <div>{mode.label}</div>
          <div>{mode.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="分析视角">
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
        <div className="flex flex-wrap gap-2" aria-label="测量样本">
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
          aria-label={`${mode.label}视角下的性能轨迹：${sample.result}`}
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
            CPE → profile → transform → assembly → replay
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
              timelineRefs.current.baseline = node;
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
              timelineRefs.current.profile = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path d="M258 328h106" stroke={COLORS.accent} strokeWidth="3" />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.transform = node;
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
              timelineRefs.current.inspect = node;
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
            验收不变量：性能收益必须与输出、异常行为、资源状态和汇编证据同时成立
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；逐步查看测量、剖析、变换、机器检查和语义重放。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置优化程序性能实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
