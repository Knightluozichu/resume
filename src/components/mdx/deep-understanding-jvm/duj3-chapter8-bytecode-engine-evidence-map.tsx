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
    key: "decode",
    label: "解码",
    detail: "opcode / 描述符",
    evidence: "先确认指令合同",
  },
  {
    key: "frame",
    label: "入帧",
    detail: "locals / operand stack",
    evidence: "写出栈前后形状",
  },
  {
    key: "invoke",
    label: "调用",
    detail: "constant pool / callsite",
    evidence: "追到符号引用",
  },
  {
    key: "dispatch",
    label: "分派",
    detail: "receiver / target",
    evidence: "确认最终方法",
  },
  {
    key: "interpret",
    label: "解释",
    detail: "pc / branch / return",
    evidence: "重放控制流",
  },
  {
    key: "replay",
    label: "重放",
    detail: "hash / stdout / stderr",
    evidence: "结论可交接",
  },
] as const;

const BOUNDARIES = [
  {
    key: "descriptor",
    label: "描述符",
    value: "name + type",
    signal: "参数 · 返回类型",
  },
  {
    key: "stack",
    label: "栈形状",
    value: "before → after",
    signal: "槽位 · 中间值",
  },
  {
    key: "dispatch",
    label: "目标选择",
    value: "opcode + receiver",
    signal: "声明类 · 实际类",
  },
  {
    key: "dynamic",
    label: "动态调用",
    value: "callsite + bootstrap",
    signal: "MethodType · 句柄",
  },
  {
    key: "runtime",
    label: "运行时",
    value: "version + replay",
    signal: "JDK · 原始输出",
  },
] as const;

const OFFICIAL_NODES = [
  "第8章 虚拟机字节码执行引擎",
  "8.1 概述",
  "8.2 运行时栈帧结构",
  "8.2.1 局部变量表",
  "8.2.2 操作数栈",
  "8.2.3 动态连接",
  "8.2.4 方法返回地址",
  "8.2.5 附加信息",
  "8.3 方法调用",
  "8.3.1 解析",
  "8.3.2 分派",
  "8.4 动态类型语言支持",
  "8.4.1 动态类型语言",
  "8.4.2 Java与动态类型",
  "8.4.3 java.lang.invoke包",
  "8.4.4 invokedynamic指令",
  "8.4.5 实战：掌控方法分派规则",
  "8.5 基于栈的字节码解释执行引擎",
  "8.5.1 解释执行",
  "8.5.2 基于栈的指令集与基于寄存器的指令集",
  "8.5.3 基于栈的解释器执行过程",
  "8.6 本章小结",
] as const;

type Lens = "stack" | "dispatch" | "dynamic";
const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  stack: {
    label: "栈帧",
    title: "先写清每一步栈形状",
    note: "局部变量和操作数栈的前后状态决定指令能否被验证与继续执行。",
  },
  dispatch: {
    label: "分派",
    title: "完整描述符才是调用合同",
    note: "调用指令、声明类型、实际接收者和最终目标必须在同一条证据链上。",
  },
  dynamic: {
    label: "动态调用",
    title: "引导方法不是黑盒",
    note: "调用点描述符、BootstrapMethods、MethodType 和适配链共同解释动态目标。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter8BytecodeEngineEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter8-bytecode-engine-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("stack");
  const [boundary, setBoundary] =
    useState<(typeof BOUNDARIES)[number]["key"]>("descriptor");
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
    setLens("stack");
    setBoundary("descriptor");
    setFailureInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-chapter8-bytecode-engine-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第 8 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              字节码调用与栈帧验收台
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿解码、入帧、调用、分派、解释和重放推进；状态只表达可观察证据顺序，不把一次计时伪装成性能结论。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置字节码执行证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择字节码证据镜头">
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
            {failureInjected ? "恢复基线" : "注入描述符失败"}
          </button>
        </div>

        <svg
          aria-label="字节码调用与栈帧验收台"
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
              ? "首个描述符失败：保留原文并回到基线"
              : lensState.title}
          </text>
          <text x="76" y="940" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "记录调用点、完整描述符、目标方法、JDK、退出码和第一次异常，不继续污染重放环境。"
              : lensState.note}
          </text>
          <text x="76" y="970" fontSize="12" fill={COLORS.secondary}>
            当前边界：{selectedBoundary.label} · 下一份记录：
            {activeStage.detail}
          </text>
        </svg>

        <div
          className="mt-4 grid gap-2 sm:grid-cols-2"
          aria-label="本章 22 个正式目录节点"
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
          caption="先锁定描述符和栈形状，再区分解析、分派与动态调用；失败就清空缓存并回到全新 JVM。"
          reset={{
            label: "重置字节码执行证据链",
            ariaLabel: "重置字节码执行证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        章节地图：22 个正式目录节点接入“解码—入帧—调用—分派—解释—重放”状态链。
      </figcaption>
    </figure>
  );
}
