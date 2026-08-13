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
  { key: "system", label: "技术体系", detail: "规则 / 类库 / 工具" },
  { key: "family", label: "虚拟机家族", detail: "平台 / 实现" },
  { key: "future", label: "未来边界", detail: "日期 / 提案" },
  { key: "source", label: "源码构建", detail: "提交 / boot JDK" },
  { key: "image", label: "运行时镜像", detail: "清单 / 哈希" },
  { key: "debug", label: "源码调试", detail: "Class / 断点" },
] as const;

const OFFICIAL_NODES = [
  "第1章 走近Java",
  "1.1 概述",
  "1.2 Java技术体系",
  "1.3 Java发展史",
  "1.4 Java虚拟机家族",
  "1.4.1 虚拟机始祖：Sun Classic/Exact VM",
  "1.4.2 武林盟主：HotSpot VM",
  "1.4.3 小家碧玉：Mobile/Embedded VM",
  "1.4.4 天下第二：BEA JRockit/IBM J9 VM",
  "1.4.5 软硬合璧：BEA Liquid VM/Azul VM",
  "1.4.6 挑战者：Apache Harmony/Google Android Dalvik VM",
  "1.4.7 没有成功，但并非失败：Microsoft JVM及其他",
  "1.4.8 百家争鸣",
  "1.5 展望Java技术的未来",
  "1.5.1 无语言倾向",
  "1.5.2 新一代即时编译器",
  "1.5.3 向Native迈进",
  "1.5.4 灵活的胖子",
  "1.5.5 语言语法持续增强",
  "1.6 实战：自己编译JDK",
  "1.6.1 获取源码",
  "1.6.2 系统需求",
  "1.6.3 构建编译环境",
  "1.6.4 进行编译",
  "1.6.5 在IDE工具中进行源码调试",
  "1.7 本章小结",
] as const;

type Lens = "contract" | "failure" | "replay";

const LENSES: Record<Lens, { label: string; title: string; note: string }> = {
  contract: {
    label: "合同",
    title: "责任边界清楚",
    note: "先区分规则、实现、产物和调试工具，再决定哪条证据能够支撑结论。",
  },
  failure: {
    label: "首错",
    title: "沿第一处分叉回溯",
    note: "保存未过滤日志和环境输入，不用最后一行汇总掩盖工具链或断点映射问题。",
  },
  replay: {
    label: "重放",
    title: "镜像与断点可交接",
    note: "用同一源码、工具、参数和窗口重放，再核对 Class、文件清单、哈希和源码路径。",
  },
};

const STEPS: readonly TeachingStep[] = STAGES.map((stage) => ({
  label: stage.key,
  caption: `${stage.label}：${stage.detail}`,
}));

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Duj3Chapter1ApproachingJavaEvidenceMap() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `duj3-chapter1-arrow-${instanceId}`;
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
    ? "实现或调试条件发生变化"
    : lensState.title;
  const statusNote = faultInjected
    ? "先保存虚拟机家族、源码提交、镜像哈希和断点映射，再恢复到同一输入；黄色状态不等于规范改变。"
    : lensState.note;

  function reset() {
    setLens("contract");
    setFaultInjected(false);
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="duj3-01-approaching-java-evidence"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DUJ3 · 第1章 走近Java · 26 节点
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从技术体系走到源码断点合同
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              播放路线动画，选择一个证据镜头，再注入一次实现或调试差异；地图列出本章
              26 个正式节点，避免把历史目录压成单一版本结论。
            </p>
          </div>
          <button
            type="button"
            aria-label="重置第1章走近Java探针"
            onClick={reset}
            className="min-h-11 rounded-control border border-border px-3 py-2 text-xs text-secondary transition-colors hover:border-accent hover:text-primary"
          >
            重置
          </button>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex flex-wrap gap-2" aria-label="选择第1章证据镜头">
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
          viewBox="0 0 680 1120"
          role="img"
          aria-label={`第1章 走近Java证据路线图：当前阶段为${activeStage.label}，镜头为${lensState.label}，${faultInjected ? "已注入实现或调试差异" : "处于基线"}。路线连接技术体系、虚拟机家族、未来边界、源码构建、运行时镜像和源码调试，并列出26个正式节点；支持播放、暂停、单步、拖动进度、镜头切换、故障注入和重置。`}
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
            width="680"
            height="1120"
            rx="16"
            fill={COLORS.background}
          />
          <text
            x="340"
            y="32"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
            fill={COLORS.primary}
          >
            规则 → 家族 → 构建 → 镜像 → 断点
          </text>
          <text
            x="340"
            y="55"
            textAnchor="middle"
            fontSize="12"
            fill={COLORS.secondary}
          >
            26 个正式节点共享一条可重放证据路线
          </text>

          {STAGES.map((stage, index) => {
            const y = 82 + index * 74;
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
                    x1="340"
                    y1={y + 54}
                    x2="340"
                    y2={y + 70}
                    stroke={COLORS.border}
                    strokeWidth="2"
                    markerEnd={`url(#${arrowId})`}
                  />
                ) : null}
                <rect
                  x="90"
                  y={y}
                  width="500"
                  height="54"
                  rx="10"
                  fill={fill}
                  fillOpacity={selected ? "0.92" : "1"}
                  stroke={selected ? COLORS.accent : COLORS.border}
                  strokeWidth={selected ? "2" : "1"}
                />
                <circle
                  cx="120"
                  cy={y + 27}
                  r="15"
                  fill={selected ? COLORS.background : COLORS.accent}
                  fillOpacity="0.16"
                  stroke={selected ? COLORS.background : COLORS.accent}
                />
                <text
                  x="120"
                  y={y + 32}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? COLORS.background : COLORS.accent}
                >
                  {index + 1}
                </text>
                <text
                  x="150"
                  y={y + 24}
                  fontSize="13"
                  fontWeight="700"
                  fill={textColor}
                >
                  {stage.label}
                </text>
                <text
                  x="150"
                  y={y + 42}
                  fontSize="12"
                  fill={selected ? COLORS.background : COLORS.secondary}
                >
                  {stage.detail}
                </text>
                {selected ? (
                  <circle cx="565" cy={y + 27} r="6" fill={statusColor} />
                ) : null}
              </g>
            );
          })}

          <text
            x="340"
            y="550"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            正式目录节点覆盖
          </text>
          {OFFICIAL_NODES.map((node, index) => {
            const column = index % 2;
            const row = Math.floor(index / 2);
            const x = column === 0 ? 50 : 350;
            const y = 570 + row * 32;
            return (
              <g key={node}>
                <rect
                  x={x}
                  y={y}
                  width="280"
                  height="24"
                  rx="6"
                  fill={COLORS.elevated}
                  stroke={COLORS.border}
                  strokeWidth="1"
                />
                <text
                  x={x + 10}
                  y={y + 16}
                  fontSize="11"
                  fill={COLORS.secondary}
                >
                  {node}
                </text>
              </g>
            );
          })}

          <rect
            x="50"
            y="1002"
            width="580"
            height="92"
            rx="12"
            fill={COLORS.elevated}
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="74"
            y="1028"
            fontSize="13"
            fontWeight="700"
            fill={statusColor}
          >
            {faultInjected ? "故障窗口" : "当前判定"} · {lensState.label}
          </text>
          <text
            x="74"
            y="1052"
            fontSize="13"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {statusTitle}
          </text>
          <text x="74" y="1074" fontSize="12" fill={COLORS.secondary}>
            当前出口：{activeStage.label} · 第 {activeIndex + 1} /{" "}
            {STAGES.length} 步
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定版本边界，再只改变一个实现或调试条件，最后用同一输入重放。"
          reset={{
            label: "重置第1章走近Java探针",
            ariaLabel: "重置第1章走近Java探针",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        26 个目录节点被压缩成可复核的规则、家族、构建、镜像与断点路线。
      </figcaption>
    </figure>
  );
}
