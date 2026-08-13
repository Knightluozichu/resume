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
    key: "profile",
    label: "画像",
    detail: "calls / branches",
    evidence: "冻结调用序列",
  },
  {
    key: "queue",
    label: "排队",
    detail: "method / request",
    evidence: "记录首次请求",
  },
  {
    key: "tier",
    label: "层级",
    detail: "tier / compiled",
    evidence: "关联安装时间",
  },
  {
    key: "inline",
    label: "内联",
    detail: "caller / callee",
    evidence: "保留决定与假设",
  },
  {
    key: "optimize",
    label: "优化",
    detail: "escape / bounds",
    evidence: "记录可逆条件",
  },
  {
    key: "deopt",
    label: "去优化",
    detail: "assumption / trap",
    evidence: "保留首次回退",
  },
  {
    key: "replay",
    label: "重放",
    detail: "fresh pid / exit",
    evidence: "清理后交接结论",
  },
] as const;

const BOUNDARIES = [
  {
    key: "input",
    label: "输入边界",
    value: "class + sequence",
    signal: "Class 哈希 · 调用摘要",
  },
  {
    key: "profile",
    label: "画像边界",
    value: "count + branch",
    signal: "调用次数 · 类型分布",
  },
  {
    key: "compile",
    label: "编译边界",
    value: "queue + tier",
    signal: "请求 · 层级 · 时间窗",
  },
  {
    key: "assumption",
    label: "假设边界",
    value: "inline + escape",
    signal: "调用者 · 类型 · 逃逸",
  },
  {
    key: "replay",
    label: "重放边界",
    value: "fresh pid + exit",
    signal: "回退原文 · 清理状态",
  },
] as const;

const OFFICIAL_NODES = [
  "第11章 后端编译与优化",
  "11.1 概述",
  "11.2 即时编译器",
  "11.2.1 解释器与编译器",
  "11.2.2 编译对象与触发条件",
  "11.2.3 编译过程",
  "11.2.4 实战：查看及分析即时编译结果",
  "11.3 提前编译器",
  "11.3.1 提前编译的优劣得失",
  "11.3.2 实战：Jaotc的提前编译",
  "11.4 编译器优化技术",
  "11.4.1 优化技术概览",
  "11.4.2 方法内联",
  "11.4.3 逃逸分析",
  "11.4.4 公共子表达式消除",
  "11.4.5 数组边界检查消除",
  "11.5 实战：深入理解Graal编译器",
  "11.5.1 历史背景",
  "11.5.2 构建编译调试环境",
  "11.5.3 JVMCI编译器接口",
  "11.5.4 代码中间表示",
  "11.5.5 代码优化与生成",
  "11.6 本章小结",
] as const;

type Lens = "jit" | "assumption" | "replay";

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  jit: {
    label: "JIT",
    title: "先问热点是否真的相同",
    note: "调用序列、预热窗口和类型分布决定画像；没有输入摘要，编译日志无法独立解释。",
  },
  assumption: {
    label: "假设",
    title: "再问优化依赖什么条件",
    note: "内联、逃逸和边界检查都建立在可验证的类型或范围假设上，假设失效必须可回退。",
  },
  replay: {
    label: "重放",
    title: "最后问现场能否交接",
    note: "全新 PID、相同 Class 和原始事件排除旧代码缓存与旧日志污染，让第三个人可以复核。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter11BackendCompilerEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter11-backend-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("jit");
  const [boundary, setBoundary] =
    useState<(typeof BOUNDARIES)[number]["key"]>("input");
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
    setLens("jit");
    setBoundary("input");
    setFailureInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-chapter11-backend-compiler-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第 11 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              分层编译与去优化回放台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿画像、排队、层级、内联、优化、回退和重放推进；状态只表达可观察证据顺序，不把一次日志事件伪装成跨版本性能结论。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置后端编译证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div
            className="flex flex-wrap gap-2"
            aria-label="选择后端编译证据镜头"
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
            {failureInjected ? "恢复基线" : "注入假设失效"}
          </button>
        </div>

        <svg
          aria-label="后端编译证据图：运行时画像经过编译排队、分层编译、内联、优化、去优化与全新进程重放；支持镜头切换、故障注入、播放、暂停、单步和进度拖动。"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 700 1120"
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
            {activeStage.detail} · {activeStage.evidence}
          </text>

          {STAGES.map((stage, index) => {
            const y = 72 + index * 70;
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
                    y1={y + 54}
                    x2="350"
                    y2={y + 67}
                    stroke={COLORS.border}
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                ) : null}
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="52"
                  rx="10"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <circle
                  cx="88"
                  cy={y + 26}
                  r="14"
                  fill={selected ? COLORS.background : COLORS.accent}
                />
                <text
                  x="88"
                  y={y + 31}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.background}
                >
                  {index + 1}
                </text>
                <text
                  x="118"
                  y={y + 23}
                  fontSize="13"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {stage.label}
                </text>
                <text x="118" y={y + 41} fontSize="12" fill={COLORS.secondary}>
                  {stage.detail} · {stage.evidence}
                </text>
                <circle
                  cx="614"
                  cy={y + 26}
                  r="5"
                  fill={selected ? COLORS.success : COLORS.border}
                />
              </g>
            );
          })}

          <text
            x="54"
            y="586"
            fontSize="14"
            fontWeight="700"
            fill={COLORS.primary}
          >
            当前证据边界 · {selectedBoundary.label} ({selectedBoundary.value})
          </text>
          {BOUNDARIES.map((item, index) => {
            const y = 610 + index * 40;
            const selected = boundary === item.key;
            return (
              <g key={item.key}>
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="30"
                  rx="8"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <text
                  x="72"
                  y={y + 20}
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {item.label} · {item.value}
                </text>
                <text x="284" y={y + 20} fontSize="12" fill={COLORS.secondary}>
                  证据：{item.signal}
                </text>
              </g>
            );
          })}

          <rect
            x="54"
            y="834"
            width="592"
            height="150"
            rx="10"
            fill={COLORS.background}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="76"
            y="864"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {failureInjected ? "失败模式" : "当前观察镜头"} · {lensState.label}
          </text>
          <text
            x="76"
            y="894"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {failureInjected
              ? "首次假设失效：保留回退原文并回到基线"
              : lensState.title}
          </text>
          <text x="76" y="924" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "记录触发输入、内联决定、首次去优化、PID、退出码和完整日志，不继续污染重放目录。"
              : lensState.note}
          </text>
          <text x="76" y="954" fontSize="12" fill={COLORS.secondary}>
            当前边界：{selectedBoundary.label} · 下一份记录：
            {activeStage.detail}
          </text>

          <line
            x1="54"
            y1="1010"
            x2="646"
            y2="1010"
            stroke={COLORS.border}
            strokeDasharray="5 4"
          />
          <text x="54" y="1040" fontSize="12" fill={COLORS.secondary}>
            结论格式：固定 Class · 一个变化 · 原始事件 · 全新进程重放
          </text>
          <text x="54" y="1066" fontSize="12" fill={COLORS.secondary}>
            未测量的阈值、默认值与跨版本差异保留为 unknowns，不用分数替代证据。
          </text>
        </svg>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-2"
          aria-label="本章 23 个正式目录节点"
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
          caption="先固定 Class 和调用序列，再观察画像、层级与假设；出现回退就清理现场，用同输入启动全新进程。"
          reset={{
            label: "重置后端编译证据链",
            ariaLabel: "重置后端编译证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        专属证据地图：23
        个正式目录节点接入“画像—排队—层级—内联—优化—回退—重放”状态链。
      </figcaption>
    </figure>
  );
}
