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
} as const;

const STAGES = [
  { key: "scope", label: "固定边界", detail: "JDK / 参数 / 时间窗" },
  { key: "regions", label: "映射区域", detail: "线程 / 堆 / 方法区" },
  { key: "objects", label: "追踪对象", detail: "创建 / 布局 / 定位" },
  { key: "pressure", label: "制造压力", detail: "只改变一个限制" },
  { key: "evidence", label: "收集证据", detail: "异常 / GC / NMT / RSS" },
  { key: "replay", label: "重放结论", detail: "同输入再现首错" },
] as const;

const MEMORY_LAYERS = [
  { label: "程序计数器", detail: "线程执行位置", signal: "线程生命周期" },
  {
    label: "Java 虚拟机栈",
    detail: "栈帧与局部状态",
    signal: "-Xss / 线程转储",
  },
  { label: "Java 堆", detail: "对象与垃圾收集", signal: "-Xmx / GC 日志" },
  { label: "方法区与常量池", detail: "类元数据与符号", signal: "类加载 / NMT" },
  { label: "直接内存", detail: "堆外缓冲区", signal: "RSS / Native Memory" },
] as const;

const OFFICIAL_NODES = [
  "第2章 Java内存区域与内存溢出异常",
  "2.1 概述",
  "2.2 运行时数据区域",
  "2.2.1 程序计数器",
  "2.2.2 Java虚拟机栈",
  "2.2.3 本地方法栈",
  "2.2.4 Java堆",
  "2.2.5 方法区",
  "2.2.6 运行时常量池",
  "2.2.7 直接内存",
  "2.3 HotSpot虚拟机对象探秘",
  "2.3.1 对象的创建",
  "2.3.2 对象的内存布局",
  "2.3.3 对象的访问定位",
  "2.4 实战：OutOfMemoryError异常",
  "2.4.1 Java堆溢出",
  "2.4.2 虚拟机栈和本地方法栈溢出",
  "2.4.3 方法区和运行时常量池溢出",
  "2.4.4 本机直接内存溢出",
  "2.5 本章小结",
] as const;

type Lens = "boundary" | "failure" | "replay";

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  boundary: {
    label: "边界",
    title: "先对齐逻辑区域与实现边界",
    note: "规范回答可依赖行为；实现和参数决定对象布局、回收与堆外细节。",
  },
  failure: {
    label: "首错",
    title: "先锁定时间线上的第一处分叉",
    note: "保留异常全文、启动参数、退出码和资源快照，不用最终摘要覆盖首因。",
  },
  replay: {
    label: "重放",
    title: "同一输入才允许比较",
    note: "固定工作量、JDK、参数与观测窗口，再比较 GC、NMT、RSS 和线程信号。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter2MemoryAreasEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter2-memory-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("boundary");
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
              opacity: [0.2, 1],
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

  function reset() {
    setLens("boundary");
    setGapInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-chapter2-memory-areas-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第 2 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              内存区域到 OOM 证据链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿边界、对象、压力、证据和重放移动；状态表示调查顺序，不冒充真实内存数值。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置 Java 内存区域证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择内存诊断镜头">
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
          aria-label={`Java 内存区域证据路线图：当前阶段为${activeStage.label}，镜头为${lensState.label}，${gapInjected ? "已注入堆外证据缺口" : "处于基线"}。路线连接固定边界、区域映射、对象追踪、压力实验、证据收集和重放交接，并支持播放、暂停、单步、拖动进度、镜头切换、缺口注入和重置。`}
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
            区域 → 对象 → 压力 → 证据 → 重放
          </text>
          <text
            x="350"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            每个 OOM 结论都要绑定限制、原始输出与时间窗口
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
                  {stage.detail}
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
            五类区域 · 各自的观察出口
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
                <text x="188" y={y + 18} fontSize="12" fill={COLORS.secondary}>
                  {layer.detail}
                </text>
                <text x="188" y={y + 34} fontSize="11" fill={COLORS.secondary}>
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
            {gapInjected ? "没有堆外账本，不能归因" : lensState.title}
          </text>
          <text x="76" y="968" fontSize="12" fill={COLORS.secondary}>
            {gapInjected
              ? "补采 NMT、线程、RSS 与容器限制后再重放。"
              : lensState.note}
          </text>
        </svg>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-2"
          aria-label="本章 20 个正式目录节点"
        >
          {OFFICIAL_NODES.map((node, index) => (
            <div
              key={node}
              className="flex min-h-11 items-start gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary"
            >
              <span className="shrink-0 font-medium text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{node}</span>
            </div>
          ))}
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定输入，再只改变一个压力条件，最后用异常、GC、NMT、RSS 和线程信号交叉核对。"
          reset={{
            label: "重置内存区域探针",
            ariaLabel: "重置内存区域探针",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        章节地图：20 个正式目录节点接入同一条“区域—限制—证据—重放”链路。
      </figcaption>
    </figure>
  );
}
