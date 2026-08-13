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
    key: "request",
    label: "请求",
    detail: "二进制名 / 触发点",
    evidence: "先固定输入身份",
  },
  {
    key: "load",
    label: "加载",
    detail: "来源 / 委托 / 定义者",
    evidence: "谁定义了这份字节",
  },
  {
    key: "verify",
    label: "验证",
    detail: "结构 / 类型 / 版本",
    evidence: "输入是否合约有效",
  },
  {
    key: "link",
    label: "链接",
    detail: "准备 / 解析 / 模块",
    evidence: "依赖能否对齐",
  },
  {
    key: "init",
    label: "初始化",
    detail: "<clinit> / 副作用",
    evidence: "主动使用才触发",
  },
  {
    key: "handoff",
    label: "交接",
    detail: "身份 / 日志 / 重放",
    evidence: "结论可复现",
  },
] as const;

const BOUNDARIES = [
  {
    key: "identity",
    label: "类身份",
    value: "name + loader",
    signal: "Class 对象 · 转换结果",
  },
  {
    key: "delegation",
    label: "委托链",
    value: "parent-first",
    signal: "请求顺序 · 最终定义者",
  },
  {
    key: "lifecycle",
    label: "生命周期",
    value: "load → init",
    signal: "class-load · class-init",
  },
  {
    key: "module",
    label: "模块边界",
    value: "reads/exports",
    signal: "resolution · access error",
  },
  {
    key: "source",
    label: "代码来源",
    value: "URL / hash",
    signal: "资源路径 · Class 哈希",
  },
] as const;

const OFFICIAL_NODES = [
  "第7章 虚拟机类加载机制",
  "7.1 概述",
  "7.2 类加载的时机",
  "7.3 类加载的过程",
  "7.3.1 加载",
  "7.3.2 验证",
  "7.3.3 准备",
  "7.3.4 解析",
  "7.3.5 初始化",
  "7.4 类加载器",
  "7.4.1 类与类加载器",
  "7.4.2 双亲委派模型",
  "7.4.3 破坏双亲委派模型",
  "7.5 Java模块化系统",
  "7.5.1 模块的兼容性",
  "7.5.2 模块化下的类加载器",
  "7.6 本章小结",
] as const;

type Lens = "identity" | "lifecycle" | "module";
const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  identity: {
    label: "身份",
    title: "同名不等于同一类型",
    note: "二进制名与定义加载器共同决定 Class 身份；用 Class 对象和代码源验证，不只比较名字。",
  },
  lifecycle: {
    label: "生命周期",
    title: "加载日志不等于初始化完成",
    note: "把 load、verify、link、init 和首次主动使用分开记录，保存第一次异常原因链。",
  },
  module: {
    label: "模块",
    title: "可找到不等于可读取",
    note: "模块名、reads、exports、代码来源和加载器是不同边界；用模块解析和访问错误交叉核对。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter7ClassLoadingEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter7-class-loading-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("identity");
  const [boundary, setBoundary] =
    useState<(typeof BOUNDARIES)[number]["key"]>("identity");
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

  const activeStage = STAGES[timeline.currentStep] ?? STAGES[0];
  const selectedBoundary =
    BOUNDARIES.find((item) => item.key === boundary) ?? BOUNDARIES[0];
  const lensState = LENSES[lens];
  const statusColor = failureInjected ? COLORS.warning : COLORS.success;

  function reset() {
    setLens("identity");
    setBoundary("identity");
    setFailureInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-chapter7-class-loading-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第 7 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              类加载的身份与生命周期台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿请求、加载、验证、链接、初始化和交接推进；状态只表达证据顺序，不把类加载日志伪装成兼容性结论。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置类加载证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择类加载证据镜头">
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
            {failureInjected ? "恢复基线" : "注入加载失败"}
          </button>
        </div>

        <svg
          aria-label="类加载的身份与生命周期台"
          className="h-auto w-full"
          role="img"
          viewBox="0 0 700 1040"
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
            当前关键帧 · {activeStage.label}
          </text>
          <text x="54" y="50" fontSize="12" fill={COLORS.secondary}>
            {activeStage.detail} · {activeStage.evidence}
          </text>

          {STAGES.map((stage, index) => {
            const y = 72 + index * 78;
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
                    y1={y + 58}
                    x2="350"
                    y2={y + 74}
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
                  fill={selected ? COLORS.elevated : COLORS.background}
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
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {stage.label}
                </text>
                <text x="118" y={y + 44} fontSize="12" fill={COLORS.secondary}>
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
            当前证据边界 · {selectedBoundary.label} ({selectedBoundary.value})
          </text>
          {BOUNDARIES.map((item, index) => {
            const y = 594 + index * 42;
            const selected = boundary === item.key;
            return (
              <g key={item.key}>
                <rect
                  x="54"
                  y={y}
                  width="592"
                  height="32"
                  rx="8"
                  fill={selected ? COLORS.elevated : COLORS.background}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? 2 : 1}
                />
                <text
                  x="72"
                  y={y + 21}
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.accent : COLORS.primary}
                >
                  {item.label} · {item.value}
                </text>
                <text x="274" y={y + 21} fontSize="12" fill={COLORS.secondary}>
                  证据：{item.signal}
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
            y="880"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {failureInjected ? "失败模式" : "当前观察镜头"} · {lensState.label}
          </text>
          <text
            x="76"
            y="910"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {failureInjected
              ? "首个加载失败：保留原文并回到基线"
              : lensState.title}
          </text>
          <text x="76" y="940" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "记录请求名、定义加载器、代码源、模块关系、退出码和第一次异常，不继续污染 JVM。"
              : lensState.note}
          </text>
          <text x="76" y="970" fontSize="12" fill={COLORS.secondary}>
            当前边界：{selectedBoundary.label} · 下一份记录：
            {activeStage.detail}
          </text>
        </svg>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-2"
          aria-label="本章 17 个正式目录节点"
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
          caption="先锁定名字、加载器和来源，再把生命周期与模块关系分层验收；失败就回到全新 JVM。"
          reset={{
            label: "重置类加载证据链",
            ariaLabel: "重置类加载证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        章节地图：17 个正式目录节点接入“请求—加载—验证—链接—初始化—交接”状态链。
      </figcaption>
    </figure>
  );
}
