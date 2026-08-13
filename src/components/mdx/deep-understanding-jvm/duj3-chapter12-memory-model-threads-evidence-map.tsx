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
  {
    key: "action",
    label: "动作",
    detail: "read / write / lock",
    evidence: "冻结动作序列",
  },
  {
    key: "buffer",
    label: "缓存",
    detail: "main / working",
    evidence: "区分本地观察",
  },
  {
    key: "edge",
    label: "同步边",
    detail: "start / unlock / join",
    evidence: "写出关系链",
  },
  {
    key: "observe",
    label: "观察",
    detail: "visibility / order",
    evidence: "保存读到的值",
  },
  {
    key: "thread",
    label: "线程",
    detail: "state / carrier",
    evidence: "记录状态快照",
  },
  {
    key: "replay",
    label: "重放",
    detail: "fresh pid / exit",
    evidence: "复核反例与恢复",
  },
] as const;

const BOUNDARIES = [
  {
    key: "action",
    label: "动作边界",
    value: "read + write",
    signal: "线程、变量、顺序",
  },
  {
    key: "memory",
    label: "内存边界",
    value: "main + working",
    signal: "写回、读取、可见性",
  },
  {
    key: "sync",
    label: "同步边界",
    value: "edge + order",
    signal: "锁、volatile、start、join",
  },
  {
    key: "thread",
    label: "线程边界",
    value: "state + carrier",
    signal: "NEW、RUNNABLE、WAITING",
  },
  {
    key: "replay",
    label: "重放边界",
    value: "fresh + same input",
    signal: "PID、退出码、采集窗口",
  },
] as const;

const OFFICIAL_NODES = [
  "第12章 Java内存模型与线程",
  "12.1 概述",
  "12.2 硬件的效率与一致性",
  "12.3 Java内存模型",
  "12.3.1 主内存与工作内存",
  "12.3.2 内存间交互操作",
  "12.3.3 对于volatile型变量的特殊规则",
  "12.3.4 针对long和double型变量的特殊规则",
  "12.3.5 原子性、可见性与有序性",
  "12.3.6 先行发生原则",
  "12.4 Java与线程",
  "12.4.1 线程的实现",
  "12.4.2 Java线程调度",
  "12.4.3 状态转换",
  "12.5 Java与协程",
  "12.5.1 内核线程的局限",
  "12.5.2 协程的复苏",
  "12.5.3 Java的解决方案",
  "12.6 本章小结",
] as const;

type Lens = "memory" | "ordering" | "threads";

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  memory: {
    label: "内存",
    title: "先问读写能否被看见",
    note: "主内存与工作内存是分析模型；观察到一个值不等于所有线程都已建立可见性合同。",
  },
  ordering: {
    label: "顺序",
    title: "再问同步边是否成立",
    note: "volatile、锁、线程启动与 join 各自提供不同关系，不能用墙上时间替代 happens-before。",
  },
  threads: {
    label: "线程",
    title: "最后问状态能否交接",
    note: "线程状态、调度与载体是实现现场；用转储和全新进程重放验证，不把一次调度当成保证。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter12MemoryModelThreadsEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter12-memory-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("memory");
  const [boundary, setBoundary] =
    useState<(typeof BOUNDARIES)[number]["key"]>("action");
  const [failureInjected, setFailureInjected] = useState(false);
  const [carrier, setCarrier] = useState<"platform" | "virtual">("platform");
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
              translateX: [-12, 0],
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

  const activeStage = STAGES[timeline.currentStep] ?? STAGES[0];
  const selectedBoundary =
    BOUNDARIES.find((item) => item.key === boundary) ?? BOUNDARIES[0];
  const lensState = LENSES[lens];
  const statusColor = failureInjected ? COLORS.warning : COLORS.success;

  function reset() {
    setLens("memory");
    setBoundary("action");
    setFailureInjected(false);
    setCarrier("platform");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-chapter12-memory-model-threads-evidence"
      data-unit-id="duj3-12-memory-model-threads"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第 12 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              内存模型与线程状态回放台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿动作、缓存、同步边、观察、线程和重放推进；状态只表达证据顺序，不把一次“看见了”伪装成跨版本保证。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置内存模型证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div
            className="flex flex-wrap gap-2"
            aria-label="选择内存模型证据镜头"
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
            aria-pressed={failureInjected}
            onClick={() => setFailureInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              failureInjected
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {failureInjected ? "恢复基线" : "移除发布边"}
          </button>
        </div>

        <div
          className="mb-4 grid gap-2 sm:grid-cols-2"
          aria-label="选择线程载体"
        >
          <button
            type="button"
            aria-pressed={carrier === "platform"}
            onClick={() => setCarrier("platform")}
            className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
              carrier === "platform"
                ? "border-accent text-accent"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            平台线程：一个载体对应一个 OS 线程
          </button>
          <button
            type="button"
            aria-pressed={carrier === "virtual"}
            onClick={() => setCarrier("virtual")}
            className={`min-h-11 rounded-control border px-3 py-2 text-left text-xs transition-colors ${
              carrier === "virtual"
                ? "border-accent text-accent"
                : "border-border text-secondary hover:border-accent hover:text-primary"
            }`}
          >
            虚拟线程：载体与 OS 线程分离
          </button>
        </div>

        <svg
          aria-label="内存模型证据图：读写动作经过主内存与工作内存、同步边、可见性、线程状态和全新进程重放；支持镜头切换、线程载体切换、故障注入、播放、暂停、单步和进度拖动。"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 700 1160"
        >
          <defs>
            <marker
              id={arrowId}
              markerHeight="8"
              markerWidth="8"
              orient="auto"
              refX="6"
              refY="4"
              viewBox="0 0 8 8"
            >
              <path d="M0 0 L8 4 L0 8 Z" fill={COLORS.border} />
            </marker>
          </defs>

          <text
            x="54"
            y="28"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            当前阶段 · {activeStage.label}
          </text>
          <text x="54" y="50" fontSize="12" fill={COLORS.secondary}>
            {activeStage.detail} · {activeStage.evidence} · {carrier} carrier
          </text>

          {STAGES.map((stage, index) => {
            const y = 72 + index * 60;
            const selected = index === timeline.currentStep;
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
                    y1={y + 46}
                    x2="350"
                    y2={y + 58}
                    stroke={COLORS.border}
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                ) : null}
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="46"
                  rx="10"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <circle
                  cx="88"
                  cy={y + 23}
                  r="13"
                  fill={selected ? COLORS.background : COLORS.accent}
                />
                <text
                  x="88"
                  y={y + 28}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.background}
                >
                  {index + 1}
                </text>
                <text
                  x="118"
                  y={y + 20}
                  fontSize="13"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {stage.label}
                </text>
                <text x="118" y={y + 36} fontSize="12" fill={COLORS.secondary}>
                  {stage.detail} · {stage.evidence}
                </text>
                <circle
                  cx="614"
                  cy={y + 23}
                  r="5"
                  fill={selected ? COLORS.success : COLORS.border}
                />
              </g>
            );
          })}

          <text
            x="54"
            y="452"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            当前证据边界 · {selectedBoundary.label} ({selectedBoundary.value})
          </text>
          {BOUNDARIES.map((item, index) => {
            const y = 476 + index * 38;
            const selected = boundary === item.key;
            return (
              <g key={item.key}>
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="29"
                  rx="8"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <text
                  x="72"
                  y={y + 19}
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {item.label} · {item.value}
                </text>
                <text x="310" y={y + 19} fontSize="12" fill={COLORS.secondary}>
                  证据：{item.signal}
                </text>
              </g>
            );
          })}

          <rect
            x="54"
            y="704"
            width="592"
            height="154"
            rx="10"
            fill={COLORS.background}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="76"
            y="734"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {failureInjected ? "失败模式" : "当前观察镜头"} · {lensState.label}
          </text>
          <text
            x="76"
            y="764"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {failureInjected
              ? "首次可见性异常：保留发布边、读值与线程转储"
              : lensState.title}
          </text>
          <text x="76" y="794" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "记录写入线程、读取线程、载体、同步动作、PID、采集窗口和完整日志，不先重启覆盖现场。"
              : lensState.note}
          </text>
          <text x="76" y="824" fontSize="12" fill={COLORS.secondary}>
            当前边界：{selectedBoundary.label} · 下一份记录：
            {activeStage.detail}
          </text>

          <line
            x1="54"
            y1="888"
            x2="646"
            y2="888"
            stroke={COLORS.border}
            strokeDasharray="5 4"
          />
          <text x="54" y="918" fontSize="12" fill={COLORS.secondary}>
            结论格式：固定动作 · 同步边 · 原始转储 · 全新进程重放
          </text>
          <text x="54" y="944" fontSize="12" fill={COLORS.secondary}>
            未测量的调度顺序、默认值与跨版本差异保留为 unknowns。
          </text>
          <text x="54" y="982" fontSize="12" fill={COLORS.accent}>
            正式节点：{OFFICIAL_NODES.length} 个 · 当前：{OFFICIAL_NODES[0]}
          </text>
        </svg>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-2"
          aria-label="本章 19 个正式目录节点"
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
          caption="先写动作与不变量，再标同步边；出现异常就保存现场，用同输入启动全新进程重放。"
          reset={{
            label: "重置内存模型证据链",
            ariaLabel: "重置内存模型证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        专属证据地图：19
        个正式目录节点接入“动作—缓存—同步边—观察—线程—重放”状态链。
      </figcaption>
    </figure>
  );
}
