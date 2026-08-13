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
    detail: "JDK / 堆边界 / 完成量",
    evidence: "建立可重放基线",
  },
  {
    key: "allocate",
    label: "对象分配",
    detail: "大小 / 速率 / 存活",
    evidence: "记录 Eden 与晋升",
  },
  {
    key: "trace",
    label: "追踪存活",
    detail: "根 / 引用 / 记忆集",
    evidence: "解释为何留下",
  },
  {
    key: "collect",
    label: "执行回收",
    detail: "标记 / 复制 / 整理",
    evidence: "绑定停顿阶段",
  },
  {
    key: "compare",
    label: "比较收集器",
    detail: "吞吐 / P95 / 内存",
    evidence: "同输入才可比较",
  },
  {
    key: "replay",
    label: "重放交接",
    detail: "首个分叉 / 失败率",
    evidence: "记录未知与清理",
  },
] as const;

const COLLECTORS = [
  {
    key: "serial",
    label: "Serial",
    detail: "单线程基线",
    signal: "阶段容易解释，暂停可能变长",
  },
  {
    key: "g1",
    label: "G1",
    detail: "区域化与目标暂停",
    signal: "关注混合周期与 remembered set",
  },
  {
    key: "zgc",
    label: "ZGC",
    detail: "并发标记与重定位",
    signal: "关注并发 CPU、RSS 与长尾",
  },
  {
    key: "epsilon",
    label: "Epsilon",
    detail: "负向分配对照",
    signal: "不回收，暴露容量边界",
  },
] as const;

const OFFICIAL_NODES = [
  "第3章 垃圾收集器与内存分配策略",
  "3.1 概述",
  "3.2 对象已死？",
  "3.2.1 引用计数算法",
  "3.2.2 可达性分析算法",
  "3.2.3 再谈引用",
  "3.2.4 生存还是死亡？",
  "3.2.5 回收方法区",
  "3.3 垃圾收集算法",
  "3.3.1 分代收集理论",
  "3.3.2 标记-清除算法",
  "3.3.3 标记-复制算法",
  "3.3.4 标记-整理算法",
  "3.4 HotSpot的算法细节实现",
  "3.4.1 根节点枚举",
  "3.4.2 安全点",
  "3.4.3 安全区域",
  "3.4.4 记忆集与卡表",
  "3.4.5 写屏障",
  "3.4.6 并发的可达性分析",
  "3.5 经典垃圾收集器",
  "3.5.1 Serial收集器",
  "3.5.2 ParNew收集器",
  "3.5.3 Parallel Scavenge收集器",
  "3.5.4 Serial Old收集器",
  "3.5.5 Parallel Old收集器",
  "3.5.6 CMS收集器",
  "3.5.7 Garbage First收集器",
  "3.6 低延迟垃圾收集器",
  "3.6.1 Shenandoah收集器",
  "3.6.2 ZGC收集器",
  "3.7 选择合适的垃圾收集器",
  "3.7.1 Epsilon收集器",
  "3.7.2 收集器的权衡",
  "3.7.3 虚拟机及垃圾收集器日志",
  "3.7.4 垃圾收集器参数总结",
  "3.8 实战：内存分配与回收策略",
  "3.8.1 对象优先在Eden分配",
  "3.8.2 大对象直接进入老年代",
  "3.8.3 长期存活的对象将进入老年代",
  "3.8.4 动态对象年龄判定",
  "3.8.5 空间分配担保",
  "3.9 本章小结",
] as const;

type Lens = "lifecycle" | "pause" | "allocation";
type CollectorKey = (typeof COLLECTORS)[number]["key"];

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  lifecycle: {
    label: "存活",
    title: "先解释对象为什么留下",
    note: "根、引用、年龄与记忆集共同决定扫描范围；对象大小本身不是存活证明。",
  },
  pause: {
    label: "停顿",
    title: "把暂停分位数放回阶段",
    note: "根枚举、重新标记、复制或重定位都要对应原始日志，平均值不能覆盖长尾。",
  },
  allocation: {
    label: "分配",
    title: "固定完成量再改变一个压力轴",
    note: "同一 rounds、对象大小和存活比例才允许比较收集器；变更项必须写入档案。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter3GcAllocationEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter3-gc-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("lifecycle");
  const [collector, setCollector] = useState<CollectorKey>("g1");
  const [failureInjected, setFailureInjected] = useState(false);
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
  const collectorState =
    COLLECTORS.find((item) => item.key === collector) ?? COLLECTORS[1];
  const statusColor = failureInjected ? COLORS.warning : COLORS.success;
  const statusTitle = failureInjected
    ? "一个输入轴没有登记"
    : `${collectorState.label} · ${lensState.title}`;
  const statusNote = failureInjected
    ? "补齐完成工作量、实际生效参数和退出码后，才能把长尾停顿归因给收集器。"
    : collectorState.signal;

  function reset() {
    setLens("lifecycle");
    setCollector("g1");
    setFailureInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-chapter3-gc-allocation-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第 3 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              对象存活到收集器选择
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿分配、存活、阶段、比较和重放移动；高亮是证据顺序，不是合成性能分数。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置垃圾收集证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择 GC 诊断镜头">
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
            aria-pressed={failureInjected}
            onClick={() => setFailureInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              failureInjected
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {failureInjected ? "补齐输入" : "注入缺口"}
          </button>
        </div>

        <div className="mb-4 flex flex-wrap gap-2" aria-label="选择收集器">
          <span className="self-center text-xs text-secondary">候选：</span>
          {COLLECTORS.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={collector === item.key}
              onClick={() => setCollector(item.key)}
              className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
                collector === item.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <svg
          viewBox="0 0 700 1040"
          role="img"
          aria-label={`垃圾收集证据路线图：当前阶段为${activeStage.label}，镜头为${lensState.label}，候选收集器为${collectorState.label}，${failureInjected ? "已注入一个未登记输入缺口" : "输入已固定"}。路线连接固定输入、对象分配、存活追踪、回收阶段、收集器比较和重放交接，并支持播放、暂停、单步、拖动进度、镜头切换、收集器切换、缺口注入和重置。`}
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
            分配 → 存活 → 回收 → 比较 → 重放
          </text>
          <text
            x="350"
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            固定完成工作量，才有资格解释停顿与吞吐差异
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
            收集器观察出口 · {collectorState.label}
          </text>
          {COLLECTORS.map((item, index) => {
            const y = 594 + index * 56;
            const selected = collector === item.key;
            return (
              <g key={item.key}>
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="42"
                  rx="8"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <text
                  x="72"
                  y={y + 18}
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {item.label}
                </text>
                <text x="164" y={y + 18} fontSize="12" fill={COLORS.secondary}>
                  {item.detail}
                </text>
                <text x="164" y={y + 34} fontSize="11" fill={COLORS.secondary}>
                  观察：{item.signal}
                </text>
              </g>
            );
          })}

          <rect
            x="54"
            y="850"
            width="592"
            height="142"
            rx="10"
            fill={COLORS.background}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="76"
            y="878"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {failureInjected ? "证据缺口" : "当前判定"} · {lensState.label}
          </text>
          <text
            x="76"
            y="906"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {statusTitle}
          </text>
          <text x="76" y="932" fontSize="12" fill={COLORS.secondary}>
            {statusNote}
          </text>
          <text x="76" y="958" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "补采参数、工作量、原始日志与退出码，再进行同输入重放。"
              : "保留停顿分位数、吞吐、内存峰值和错误数，避免单指标归因。"}
          </text>
        </svg>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-2"
          aria-label="本章 43 个正式目录节点"
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
          caption="先固定完成工作量，再沿对象存活与收集阶段取证；最后用停顿、吞吐、内存和错误数重放。"
          reset={{
            label: "重置 GC 证据探针",
            ariaLabel: "重置 GC 证据探针",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        章节地图：43 个正式目录节点接入同一条“存活—算法—收集器—分配—重放”链路。
      </figcaption>
    </figure>
  );
}
