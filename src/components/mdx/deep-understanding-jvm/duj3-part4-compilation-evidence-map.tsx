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
    key: "source",
    label: "输入",
    detail: "source hash / args",
    evidence: "冻结源码与工作量",
  },
  {
    key: "parse",
    label: "前端",
    detail: "parse / javac",
    evidence: "保存诊断与版本",
  },
  {
    key: "classfile",
    label: "Class",
    detail: "constant pool / bytecode",
    evidence: "核对结构与哈希",
  },
  {
    key: "profile",
    label: "画像",
    detail: "calls / branches",
    evidence: "固定预热和输入",
  },
  {
    key: "compile",
    label: "编译",
    detail: "tier / compiled",
    evidence: "关联方法与时间窗",
  },
  {
    key: "deopt",
    label: "回退",
    detail: "assumption / deopt",
    evidence: "保留首次失败原文",
  },
  {
    key: "replay",
    label: "重放",
    detail: "fresh process / exit",
    evidence: "清理后复核结论",
  },
] as const;

const BOUNDARIES = [
  {
    key: "input",
    label: "输入边界",
    value: "source + args",
    signal: "源码哈希 · 输入摘要",
  },
  {
    key: "class",
    label: "Class 边界",
    value: "version + bytes",
    signal: "版本 · 常量池 · 指令",
  },
  {
    key: "profile",
    label: "画像边界",
    value: "warmup + window",
    signal: "调用次数 · 分支分布",
  },
  {
    key: "runtime",
    label: "运行边界",
    value: "tier + assumption",
    signal: "编译层级 · 去优化原文",
  },
  {
    key: "replay",
    label: "重放边界",
    value: "fresh pid + exit",
    signal: "进程 · 退出码 · 清理",
  },
] as const;

const OFFICIAL_NODES = ["第四部分 程序编译与代码优化"] as const;

type Lens = "frontend" | "jit" | "replay";

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  frontend: {
    label: "前端",
    title: "先问 Class 是否真的相同",
    note: "源码、编译器选项和 Class 哈希共同确定中间成品；输出不同就先回到输入边界。",
  },
  jit: {
    label: "JIT",
    title: "再问运行时为何改变路径",
    note: "画像、编译层级和假设失效解释事件顺序，但不替代跨版本的测量。",
  },
  replay: {
    label: "重放",
    title: "最后问结论能否交接",
    note: "全新进程、同一输入和原始日志让别人可以复核，而不是相信一张耗时截图。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Part4CompilationEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-part4-compilation-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("frontend");
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
    setLens("frontend");
    setBoundary("input");
    setFailureInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-part4-compilation-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第四部分
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              编译流水线证据回放台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿输入、前端、Class、画像、编译、回退和重放推进；状态只表达可观察证据顺序，不把一次耗时伪装成稳定性能结论。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置编译流水线证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择编译证据镜头">
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
            {failureInjected ? "恢复基线" : "注入回退假设"}
          </button>
        </div>

        <svg
          aria-label="程序编译与代码优化证据图：输入经过前端、Class 文件、运行时画像、分层编译、去优化与全新进程重放；支持镜头切换、故障注入、播放、暂停、单步和进度拖动。"
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
              ? "首个假设失效：保留回退原文并回到基线"
              : lensState.title}
          </text>
          <text x="76" y="924" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "记录触发输入、编译层级、首次去优化、PID、退出码和完整日志，不继续污染重放目录。"
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
            结论格式：固定输入 · 一个变化 · 原始事件 · 全新进程重放
          </text>
          <text x="54" y="1066" fontSize="12" fill={COLORS.secondary}>
            未测量的 VM 默认值与跨版本差异保留为 unknowns，不用评分替代证据。
          </text>
        </svg>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-2"
          aria-label="本部分正式目录节点"
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
          caption="先锁定源码与 Class，再观察画像和编译事件；出现回退就清理现场，用同输入启动全新进程。"
          reset={{
            label: "重置编译流水线证据链",
            ariaLabel: "重置编译流水线证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        专属证据地图：输入、前端、Class、画像、编译、回退和重放接入同一条可回放状态链。
      </figcaption>
    </figure>
  );
}
