"use client";

import { useId, useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const COLORS = {
  background: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const STAGES = [
  {
    key: "input",
    label: "固定输入",
    detail: "JDK / 参数 / 限制",
    evidence: "先定义时间线和边界",
  },
  {
    key: "allocate",
    label: "产生压力",
    detail: "速率 / 存活 / 线程",
    evidence: "只改变一个轴",
  },
  {
    key: "reachability",
    label: "判断可达性",
    detail: "根 / 引用 / 存活",
    evidence: "解释对象为何留下",
  },
  {
    key: "collect",
    label: "观察回收",
    detail: "GC 日志 / 停顿",
    evidence: "保存首个分叉",
  },
  {
    key: "native",
    label: "核对堆外",
    detail: "NMT / RSS / 线程",
    evidence: "补齐进程外账本",
  },
  {
    key: "replay",
    label: "重放交接",
    detail: "同输入 / 同窗口",
    evidence: "差异有解释才交接",
  },
] as const;

const MEMORY_LAYERS = [
  { label: "堆", detail: "对象与回收", signal: "GC 日志 / 堆曲线" },
  { label: "线程栈", detail: "调用帧与局部状态", signal: "线程数 / 转储" },
  { label: "元空间", detail: "类元数据", signal: "类加载 / NMT" },
  { label: "代码缓存", detail: "编译产物", signal: "编译日志 / NMT" },
  {
    label: "本地内存",
    detail: "直接缓冲与本地库",
    signal: "RSS / NMT / cgroup",
  },
] as const;

type Lens = "contract" | "failure" | "replay";

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  contract: {
    label: "边界",
    title: "每个信号回到所属区域",
    note: "堆曲线回答对象问题；进程、线程和本地追踪回答堆外问题。",
  },
  failure: {
    label: "首错",
    title: "先找时间线上的第一处分叉",
    note: "保留未过滤日志、退出码和 PID 生命周期，不用最终摘要覆盖原因。",
  },
  replay: {
    label: "重放",
    title: "同一输入才允许比较",
    note: "固定工作量、参数、窗口和限制，再比较 GC、NMT、RSS 与线程信号。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Part2MemoryManagementEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-part2-memory-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("contract");
  const [gapInjected, setGapInjected] = useState(false);
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STAGES.forEach((stage, index) => {
        const element = stageRefs.current[index];
        if (element) {
          tl.add(
            element,
            {
              opacity: [0.18, 1],
              translateY: [10, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            index * TEACHING_BEAT_MS,
          );
        }
        tl.label(stage.key, index * TEACHING_BEAT_MS);
      });
    },
  });

  const activeIndex = timeline.currentStep;
  const activeStage = STAGES[activeIndex] ?? STAGES[0];
  const lensState = LENSES[lens];
  const statusColor = gapInjected ? COLORS.warning : COLORS.success;
  const statusTitle = gapInjected
    ? "证据链出现一个未登记缺口"
    : lensState.title;
  const statusNote = gapInjected
    ? "缺少堆外信号时不能把 RSS 变化归因给 GC；补采 NMT、线程和容器限制后再重放。"
    : lensState.note;

  function reset() {
    setLens("contract");
    setGapInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-part-2-memory-management-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第二部分 自动内存管理
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从对象压力走到堆外证据
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿分配、可达性、回收、本地资源和重放的时间线移动；状态只表示证据顺序，不冒充真实停顿或内存数值。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置第二部分自动内存管理探针"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div
            className="flex flex-wrap gap-2"
            aria-label="选择内存诊断证据镜头"
          >
            <span className="self-center text-xs text-secondary">镜头：</span>
            {(Object.entries(LENSES) as [Lens, (typeof LENSES)[Lens]][]).map(
              ([value, item]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={lens === value}
                  onClick={() => setLens(value)}
                  className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                    lens === value
                      ? "border-accent text-accent"
                      : "border-border text-secondary hover:border-accent hover:text-primary"
                  }`}
                >
                  {item.label}
                </button>
              ),
            )}
          </div>
          <button
            type="button"
            aria-pressed={gapInjected}
            onClick={() => setGapInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              gapInjected
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {gapInjected ? "补齐缺口" : "注入缺口"}
          </button>
        </div>

        <svg
          viewBox="0 0 700 1040"
          role="img"
          aria-label={`第二部分自动内存管理证据路线图：当前阶段为${activeStage.label}，镜头为${lensState.label}，${gapInjected ? "已注入一个堆外证据缺口" : "处于基线"}。路线连接固定输入、分配压力、可达性、垃圾收集、堆外核对和重放交接，并支持播放、暂停、单步、拖动进度、镜头切换、缺口注入和重置。`}
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id={arrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L7,4 L0,8 Z" fill={COLORS.border} />
            </marker>
          </defs>
          <rect
            x="0"
            y="0"
            width="700"
            height="1040"
            rx="16"
            fill={COLORS.background}
          />
          <text
            x="350"
            y="32"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={COLORS.primary}
          >
            分配 → 可达性 → 回收 → 堆外 → 重放
          </text>
          <text
            x="350"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            每个结论都要绑定输入、原始输出和时间窗口
          </text>

          {STAGES.map((stage, index) => {
            const y = 86 + index * 76;
            const selected = index === activeIndex;
            const fill = selected ? COLORS.accent : COLORS.elevated;
            const textColor = selected ? COLORS.background : COLORS.primary;
            return (
              <g
                key={stage.key}
                ref={(element) => {
                  stageRefs.current[index] = element;
                }}
              >
                {index < STAGES.length - 1 ? (
                  <line
                    x1="350"
                    y1={y + 58}
                    x2="350"
                    y2={y + 72}
                    stroke={COLORS.border}
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                ) : null}
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="58"
                  rx="10"
                  fill={fill}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <circle
                  cx="88"
                  cy={y + 29}
                  r="14"
                  fill={selected ? COLORS.background : COLORS.accent}
                  stroke={selected ? COLORS.background : COLORS.accent}
                  strokeWidth="1"
                />
                <text
                  x="88"
                  y={y + 34}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.background}
                >
                  {index + 1}
                </text>
                <text
                  x="118"
                  y={y + 25}
                  fontSize="13"
                  fontWeight="700"
                  fill={textColor}
                >
                  {stage.label}
                </text>
                <text
                  x="118"
                  y={y + 44}
                  fontSize="12"
                  fill={selected ? COLORS.background : COLORS.secondary}
                >
                  {stage.detail} · {stage.evidence}
                </text>
                <circle
                  cx="614"
                  cy={y + 29}
                  r="5"
                  fill={selected ? COLORS.success : COLORS.border}
                />
              </g>
            );
          })}

          <text
            x="54"
            y="570"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            内存地图 · 当前证据出口
          </text>
          {MEMORY_LAYERS.map((layer, index) => {
            const y = 594 + index * 56;
            const affected = gapInjected && index === 4;
            return (
              <g key={layer.label}>
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="42"
                  rx="8"
                  fill={COLORS.elevated}
                  stroke={affected ? COLORS.warning : COLORS.border}
                  strokeWidth={affected ? 2 : 1}
                />
                <text
                  x="72"
                  y={y + 18}
                  fontSize="12"
                  fontWeight="700"
                  fill={affected ? COLORS.warning : COLORS.primary}
                >
                  {layer.label}
                </text>
                <text x="176" y={y + 18} fontSize="12" fill={COLORS.secondary}>
                  {layer.detail}
                </text>
                <text x="176" y={y + 34} fontSize="11" fill={COLORS.secondary}>
                  证据：{layer.signal}
                </text>
              </g>
            );
          })}

          <rect
            x="54"
            y="888"
            width="592"
            height="104"
            rx="10"
            fill={COLORS.background}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="76"
            y="916"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {gapInjected ? "证据缺口" : "当前判定"} · {lensState.label}
          </text>
          <text
            x="76"
            y="943"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {statusTitle}
          </text>
          <text x="76" y="968" fontSize="12" fill={COLORS.secondary}>
            {statusNote}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定输入，再只改变一个压力条件，最后用 GC、NMT、RSS 和线程信号交叉核对。"
          reset={{
            label: "重置内存诊断探针",
            ariaLabel: "重置内存诊断探针",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        内存诊断路线：堆内事件与堆外账本必须在同一时间线交叉验证。
      </figcaption>
    </figure>
  );
}
