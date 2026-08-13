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
  { key: "source", label: "源码提交", detail: "commit / patch" },
  { key: "boot", label: "boot JDK", detail: "供应商 / 路径" },
  { key: "configure", label: "configure", detail: "参数 / 资源" },
  { key: "compile", label: "make images", detail: "退出码 / 日志" },
  { key: "image", label: "运行时镜像", detail: "文件清单 / 哈希" },
  { key: "replay", label: "重放交接", detail: "同输入 / 同窗口" },
] as const;

type Lens = "contract" | "failure" | "replay";

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  contract: {
    label: "合同",
    title: "输入边界清楚",
    note: "先标注规范、实现、工具和发行版分别承担什么责任。",
  },
  failure: {
    label: "首错",
    title: "沿第一处分叉回溯",
    note: "保留未过滤日志与退出码，不用最后一行汇总掩盖 configure 或工具链问题。",
  },
  replay: {
    label: "重放",
    title: "产物可以交接",
    note: "用同一源码、工具、参数和时间窗口重放，再比较文件清单、哈希和启动探针。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Part1ApproachingJavaEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-part1-arrow-${instanceId}`;
  const [lens, setLens] = useState<Lens>("contract");
  const [faultInjected, setFaultInjected] = useState(false);
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
  const statusColor = faultInjected ? COLORS.warning : COLORS.success;
  const statusTitle = faultInjected
    ? "构建条件发生未登记变化"
    : lensState.title;
  const statusNote = faultInjected
    ? "先保存 boot JDK、configure 摘要和未过滤日志，再恢复到同一输入；黄色状态不是规范改变。"
    : lensState.note;

  function reset() {
    setLens("contract");
    setFaultInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-part-1-approaching-java-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第一部分 走近Java
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从源码输入走到可重放镜像
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先固定 commit 和 boot JDK，再沿
              configure、make、校验和重放观察构建证据；按钮只表达状态变化，不冒充真实构建指标。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置章专属探针"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择构建证据镜头">
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
            aria-pressed={faultInjected}
            onClick={() => setFaultInjected((value) => !value)}
            className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors ${
              faultInjected
                ? "border-warning text-warning"
                : "border-border text-secondary hover:border-warning hover:text-warning"
            }`}
          >
            {faultInjected ? "清除故障" : "注入故障"}
          </button>
        </div>

        <svg
          viewBox="0 0 620 820"
          role="img"
          aria-label={`第一部分 走近Java构建证据图：当前阶段为${activeStage.label}，镜头为${lensState.label}，${faultInjected ? "已注入一个未登记构建条件" : "处于基线"}。图中依次连接源码提交、boot JDK、configure、make images、运行时镜像和重放交接，并支持播放、暂停、单步、拖动进度、镜头切换、故障注入和重置。`}
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
            width="620"
            height="820"
            rx="16"
            fill={COLORS.background}
          />
          <text
            x="310"
            y="32"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={COLORS.primary}
          >
            源码 → 工具链 → 构建 → 镜像 → 重放
          </text>
          <text
            x="310"
            y="55"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            每条边都要带输入、原始输出和可推翻条件
          </text>

          {STAGES.map((stage, index) => {
            const y = 82 + index * 82;
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
                    x1="310"
                    y1={y + 58}
                    x2="310"
                    y2={y + 79}
                    stroke={COLORS.border}
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                ) : null}
                <rect
                  x="70"
                  y={y}
                  width="480"
                  height="58"
                  rx="10"
                  fill={fill}
                  fillOpacity={selected ? "0.92" : "1"}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? "2" : "1"}
                />
                <circle
                  cx="101"
                  cy={y + 29}
                  r="16"
                  fill={selected ? COLORS.background : COLORS.accent}
                  fillOpacity="0.16"
                  stroke={selected ? COLORS.background : COLORS.accent}
                />
                <text
                  x="101"
                  y={y + 34}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.background : COLORS.accent}
                >
                  {index + 1}
                </text>
                <text
                  x="130"
                  y={y + 25}
                  fontSize="13"
                  fontWeight="700"
                  fill={textColor}
                >
                  {stage.label}
                </text>
                <text
                  x="130"
                  y={y + 44}
                  fontSize="12"
                  fill={selected ? COLORS.background : COLORS.secondary}
                >
                  {stage.detail}
                </text>
                {selected ? (
                  <circle cx="526" cy={y + 29} r="6" fill={statusColor} />
                ) : null}
              </g>
            );
          })}

          <rect
            x="70"
            y="604"
            width="480"
            height="136"
            rx="12"
            fill={COLORS.elevated}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="94"
            y="633"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {faultInjected ? "故障窗口" : "当前判定"} · {lensState.label}
          </text>
          <text
            x="94"
            y="659"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {statusTitle}
          </text>
          <text x="94" y="683" fontSize="12" fill={COLORS.secondary}>
            {statusNote}
          </text>
          <text x="94" y="707" fontSize="12" fill={COLORS.secondary}>
            当前出口：{activeStage.label} · {activeStage.detail}
          </text>
          <text x="94" y="731" fontSize="12" fill={COLORS.secondary}>
            当前轨迹：第 {activeIndex + 1} / {STAGES.length} 步 ·{" "}
            {activeStage.label}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定输入，再只改一个条件，最后用同一输入重放并核对镜像。"
          reset={{
            label: "重置章专属探针",
            ariaLabel: "重置章专属探针",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        构建证据路线：源码提交和工具链决定输入，镜像清单和哈希决定能否交接。
      </figcaption>
    </figure>
  );
}
