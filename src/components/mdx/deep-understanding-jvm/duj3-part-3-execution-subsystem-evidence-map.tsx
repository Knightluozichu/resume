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
    key: "verify",
    label: "验证",
    detail: "版本 / 结构 / 类型",
    evidence: "Class 是否可接受",
  },
  {
    key: "load",
    label: "加载",
    detail: "来源 / 加载器 / 哈希",
    evidence: "实际拿到哪份字节",
  },
  {
    key: "link",
    label: "链接",
    detail: "准备 / 解析 / 依赖",
    evidence: "二进制契约是否一致",
  },
  {
    key: "initialize",
    label: "初始化",
    detail: "静态代码 / 副作用",
    evidence: "首次触发是否污染",
  },
  {
    key: "execute",
    label: "执行",
    detail: "方法 / 栈帧 / 结果",
    evidence: "语义与实现分层",
  },
  {
    key: "handoff",
    label: "交接",
    detail: "重放 / 回滚 / 未知",
    evidence: "结论能否复现",
  },
] as const;

const BOUNDARIES = [
  {
    key: "class",
    label: "Class 字节",
    value: "sha256",
    signal: "版本 · 常量池 · 指令",
  },
  {
    key: "loader",
    label: "类加载器",
    value: "source",
    signal: "资源路径 · loader",
  },
  {
    key: "linkage",
    label: "链接依赖",
    value: "binary",
    signal: "符号 · 方法签名",
  },
  {
    key: "init",
    label: "初始化",
    value: "<clinit>",
    signal: "副作用 · 原因链",
  },
  {
    key: "frame",
    label: "栈帧执行",
    value: "locals/stack",
    signal: "JFR · 线程栈 · 结果",
  },
] as const;

const OFFICIAL_NODES = ["第三部分 虚拟机执行子系统"] as const;

type Lens = "contract" | "failure" | "implementation";
const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  contract: {
    label: "规范合同",
    title: "阶段边界先于实现细节",
    note: "用 JVMS 解释 Class 格式与执行语义，再把实际 JDK 观察写成版本化证据。",
  },
  failure: {
    label: "首个失败",
    title: "异常出现在哪一段状态转移",
    note: "保存首个 stderr、退出码、类加载器和字节码哈希，不用后续包装异常覆盖原因。",
  },
  implementation: {
    label: "实现观察",
    title: "HotSpot 行为必须注明版本",
    note: "解释器、JIT、内联和采样栈是实现层观察；用 JFR、编译日志和同输入重放确认。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Part3ExecutionSubsystemEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-part3-execution-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("contract");
  const [boundary, setBoundary] =
    useState<(typeof BOUNDARIES)[number]["key"]>("class");
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
    setLens("contract");
    setBoundary("class");
    setFailureInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-part-3-execution-subsystem-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第三部分
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Class 到执行结果的状态证据链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿验证、加载、链接、初始化、执行和交接移动；高亮只表示观察顺序，不替代
              JVMS、JDK 和原始日志证据。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置执行子系统证据图"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div
            className="flex flex-wrap gap-2"
            aria-label="选择执行子系统证据镜头"
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
            {failureInjected ? "恢复基线" : "注入阶段失败"}
          </button>
        </div>

        <svg
          aria-label="Class 到执行结果的状态证据链"
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
              ? "首个失败：保留原始异常并回到基线"
              : lensState.title}
          </text>
          <text x="76" y="940" fontSize="12" fill={COLORS.secondary}>
            {failureInjected
              ? "不把包装异常当成根因；保存阶段、stderr、退出码、哈希和新 JVM 重放结果。"
              : lensState.note}
          </text>
          <text x="76" y="970" fontSize="12" fill={COLORS.secondary}>
            当前边界：{selectedBoundary.label} · 下一份记录：
            {activeStage.detail}
          </text>
        </svg>

        <div className="mt-4 grid gap-2" aria-label="本部分 1 个正式目录节点">
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
          caption="先固定 Class 和运行时，再按阶段记录输入、失败和实现观察；证据冲突就回到基线。"
          reset={{
            label: "重置执行子系统证据链",
            ariaLabel: "重置执行子系统证据链",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        章节地图：1 个正式目录节点接入“验证—加载—链接—初始化—执行—交接”状态链。
      </figcaption>
    </figure>
  );
}
