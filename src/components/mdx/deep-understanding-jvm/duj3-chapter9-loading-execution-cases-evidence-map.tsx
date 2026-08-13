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
    key: "graph",
    label: "加载器图",
    detail: "request / define",
    evidence: "先画清委托方向",
  },
  {
    key: "source",
    label: "代码来源",
    detail: "URL / hash / version",
    evidence: "确认字节从哪里来",
  },
  {
    key: "isolate",
    label: "隔离",
    detail: "container / bundle / process",
    evidence: "只改变一个边界",
  },
  {
    key: "execute",
    label: "执行",
    detail: "protocol / pid / result",
    evidence: "限制输入与资源",
  },
  {
    key: "fail",
    label: "失败",
    detail: "LinkageError / stderr",
    evidence: "保留第一份原文",
  },
  {
    key: "replay",
    label: "重放",
    detail: "same request / fresh process",
    evidence: "恢复可交接",
  },
] as const;

const BOUNDARIES = [
  {
    key: "loader",
    label: "加载器",
    value: "request → define",
    signal: "请求者 · 定义者",
  },
  {
    key: "source",
    label: "来源",
    value: "URL + hash",
    signal: "目录 · JAR · 模块",
  },
  {
    key: "protocol",
    label: "协议",
    value: "allowlist + id",
    signal: "任务 · 输入哈希",
  },
  {
    key: "process",
    label: "进程",
    value: "pid + budget",
    signal: "超时 · 退出码",
  },
  {
    key: "recovery",
    label: "恢复",
    value: "clean + replay",
    signal: "旧状态 · 新结果",
  },
] as const;

const OFFICIAL_NODES = [
  "第9章 类加载及执行子系统的案例与实战",
  "9.1 概述",
  "9.2 案例分析",
  "9.2.1 Tomcat：正统的类加载器架构",
  "9.2.2 OSGi：灵活的类加载器架构",
  "9.2.3 字节码生成技术与动态代理的实现",
  "9.2.4 Backport工具：Java的时光机器",
  "9.3 实战：自己动手实现远程执行功能",
  "9.3.1 目标",
  "9.3.2 思路",
  "9.3.3 实现",
  "9.3.4 验证",
  "9.4 本章小结",
] as const;

type Lens = "container" | "generation" | "remote";
const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  container: {
    label: "容器",
    title: "同名不等于同一类型",
    note: "请求者、定义者、代码来源和可见性一起决定容器案例的类型身份。",
  },
  generation: {
    label: "生成",
    title: "生成成功不等于链接成功",
    note: "工具版本、Class 结构、描述符、目标 JDK 和权限必须分别验收。",
  },
  remote: {
    label: "远程执行",
    title: "结果必须带进程证据",
    note: "请求 ID、白名单任务、PID、退出码、原始输出和清理状态共同构成结果。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter9LoadingExecutionCasesEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter9-loading-execution-cases-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("container");
  const [boundary, setBoundary] =
    useState<(typeof BOUNDARIES)[number]["key"]>("loader");
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
    setLens("container");
    setBoundary("loader");
    setFailureInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-chapter9-loading-execution-cases-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第 9 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              类加载案例与远程执行验收台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿加载器图、代码来源、隔离、执行、失败和重放推进；状态只表达诊断顺序，不把“成功返回”伪装成安全或兼容性证明。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置类加载案例证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div
            className="flex flex-wrap gap-2"
            aria-label="选择类加载案例证据镜头"
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
            {failureInjected ? "恢复基线" : "注入隔离失败"}
          </button>
        </div>

        <svg
          aria-label="类加载案例与远程执行验收台"
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
              ? "首个隔离失败：保留原文并回到基线"
              : lensState.title}
          </text>
          <text x="76" y="940" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "记录请求 ID、加载器、代码来源、Class 哈希、PID、退出码和第一次异常，不继续污染环境。"
              : lensState.note}
          </text>
          <text x="76" y="970" fontSize="12" fill={COLORS.secondary}>
            当前边界：{selectedBoundary.label} · 下一份记录：
            {activeStage.detail}
          </text>
        </svg>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-2"
          aria-label="本章 13 个正式目录节点"
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
          caption="先确认加载器和代码来源，再把执行任务锁进进程边界；失败就清理并以同请求重放。"
          reset={{
            label: "重置类加载案例证据链",
            ariaLabel: "重置类加载案例证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        章节地图：13
        个正式目录节点接入“加载器图—来源—隔离—执行—失败—重放”状态链。
      </figcaption>
    </figure>
  );
}
