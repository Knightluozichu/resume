"use client";

import { useMemo, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 820;
const VIEW_H = 460;
const T = TEACHING_BEAT_MS;

const COLORS = {
  accent: "var(--accent)",
  border: "var(--border)",
  danger: "var(--danger)",
  elevated: "var(--bg-elevated)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

type Mode = "translation" | "hardware" | "os" | "network";
type Sample = "normal" | "boundary" | "failure";

const CONCEPTS = [
  "第1章 计算机系统漫游",
  "1.1 信息就是位+上下文",
  "1.2 程序被其他程序翻译成不同的格式",
  "1.3 了解编译系统如何工作是大有益处的",
  "1.4 处理器读并解释储存在内存中的指令",
  "1.4.1 系统的硬件组成",
  "1.4.2 运行hello程序",
  "1.5 高速缓存至关重要",
  "1.6 存储设备形成层次结构",
  "1.7 操作系统管理硬件",
  "1.7.1 进程",
  "1.7.2 线程",
  "1.7.3 虚拟内存",
  "1.7.4 文件",
  "1.8 系统之间利用网络通信",
  "1.9 重要主题",
  "1.9.1 Amdahl定律",
  "1.9.2 并发和并行",
  "1.9.3 计算机系统中抽象的重要性",
  "1.10 小结",
] as const;

const MODES: readonly {
  id: Mode;
  label: string;
  focus: string;
  next: string;
}[] = [
  {
    id: "translation",
    label: "翻译链",
    focus: "预处理 · 汇编 · 目标文件",
    next: "1.2 / 1.3",
  },
  {
    id: "hardware",
    label: "硬件执行",
    focus: "取指 · 寄存器 · 缓存",
    next: "1.4 / 1.5",
  },
  {
    id: "os",
    label: "操作系统",
    focus: "进程 · 映射 · 文件",
    next: "1.7 / 1.7.3 / 1.7.4",
  },
  {
    id: "network",
    label: "网络输出",
    focus: "字节流 · 连接 · 清理",
    next: "1.8 / 1.9.2",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  observation: string;
  artifact: string;
}[] = [
  {
    id: "normal",
    label: "正常基线",
    observation: "hello 输出稳定",
    artifact: "阶段快照",
  },
  {
    id: "boundary",
    label: "边界输入",
    observation: "容量或权限接近边缘",
    artifact: "状态与计数",
  },
  {
    id: "failure",
    label: "故障注入",
    observation: "某个阶段先出现差异",
    artifact: "首个偏差",
  },
] as const;

const STAGES: readonly {
  id: string;
  label: string;
  artifact: string;
}[] = [
  { id: "source", label: "源码", artifact: "hello.c" },
  { id: "translate", label: "翻译", artifact: ".i · .s · .o" },
  { id: "load", label: "装载", artifact: "ELF · map" },
  { id: "fetch", label: "取指", artifact: "PC · regs" },
  { id: "memory", label: "存储", artifact: "cache · page" },
  { id: "resource", label: "资源", artifact: "fd · bytes" },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "描述源码输入。" },
  { label: "translate", caption: "保存翻译产物。" },
  { label: "load", caption: "核对装载边界。" },
  { label: "execute", caption: "观察取指与存储。" },
  { label: "replay", caption: "重放资源与输出。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

function ToggleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`min-h-11 rounded-control border px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${active ? "border-accent bg-accent/10 text-primary" : "border-border bg-background text-secondary hover:border-accent hover:text-primary"}`}
    >
      {children}
    </button>
  );
}

function StageCard({
  stage,
  index,
  mode,
  sample,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  mode: Mode;
  sample: Sample;
}) {
  const focusIndex =
    mode === "translation"
      ? index === 0 || index === 1
      : mode === "hardware"
        ? index === 3 || index === 4
        : mode === "os"
          ? index === 2 || index === 5
          : index === 5;
  const isFault = sample === "failure" && focusIndex;
  const isBoundary = sample === "boundary" && focusIndex;
  const color = isFault
    ? COLORS.danger
    : isBoundary
      ? COLORS.warning
      : focusIndex
        ? COLORS.accent
        : COLORS.border;
  const state = isFault
    ? "首个偏差"
    : isBoundary
      ? "边界"
      : focusIndex
        ? "重点"
        : "已记录";
  return (
    <g>
      <rect
        x={20 + index * 130}
        y="116"
        width="112"
        height="98"
        rx="12"
        fill={COLORS.elevated}
        stroke={color}
        strokeWidth={focusIndex ? 2 : 1.2}
      />
      <circle cx={42 + index * 130} cy="138" r="6" fill={color} />
      <text
        x={56 + index * 130}
        y="143"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {stage.label}
      </text>
      <text x={34 + index * 130} y="172" fontSize="12" fill={COLORS.secondary}>
        {stage.artifact}
      </text>
      <text x={34 + index * 130} y="199" fontSize="13" fill={color}>
        {state}
      </text>
    </g>
  );
}

function StageArrow({ index }: { index: number }) {
  return (
    <line
      x1={132 + index * 130}
      y1="165"
      x2={144 + index * 130}
      y2="165"
      stroke={COLORS.border}
      strokeWidth="2"
      markerEnd="url(#cap01-system-tour-arrow)"
    />
  );
}

/** 第1章专属实验：回放 hello 从源码到系统资源的端到端阶段轨迹。 */
export function Cap01SystemTourLab() {
  const [mode, setMode] = useState<Mode>("translation");
  const [sample, setSample] = useState<Sample>("normal");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const currentMode = useMemo(
    () => MODES.find((item) => item.id === mode) ?? MODES[0],
    [mode],
  );
  const currentSample = useMemo(
    () => SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0],
    [sample],
  );
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = timelineRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.3, 1],
            scale: [0.94, 1],
            duration: T * 0.65,
            ease: "out(3)",
          },
          T * index,
        );
        tl.label(step.label, T * index);
      });
    },
  });

  function reset() {
    setMode("translation");
    setSample("normal");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第1章计算机系统漫游专属 hello 执行轨迹实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-01"
      data-visual-kind="cap-01-system-tour-hello-trace"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap01SystemTourLab · hello 执行轨迹回放台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            从源码卡片走到资源边界，再把故障重放一遍
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：当前样本下，哪一张阶段卡最先暴露与基线不同的字段？
          </p>
        </div>
      </header>

      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择 hello 观察模式">
          {MODES.map((item) => (
            <ToggleButton
              key={item.id}
              active={mode === item.id}
              onClick={() => setMode(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择 hello 样本">
          {SAMPLES.map((item) => (
            <ToggleButton
              key={item.id}
              active={sample === item.id}
              onClick={() => setSample(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`第1章 hello 执行轨迹可视化；当前模式${currentMode.label}，关注${currentMode.focus}，样本为${currentSample.label}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cap01-system-tour-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.border} />
              </marker>
            </defs>
            <rect
              x="0"
              y="0"
              width={VIEW_W}
              height={VIEW_H}
              rx="12"
              fill="var(--bg)"
            />
            <text
              x="24"
              y="42"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {currentMode.label} · {currentSample.label}
            </text>
            <text x="24" y="68" fontSize="13" fill={COLORS.secondary}>
              关注 {currentMode.focus}，下一组坐标：{currentMode.next}
            </text>
            <g aria-hidden="true" opacity="0" pointerEvents="none">
              {STEPS.map((step, index) => (
                <g
                  key={step.label}
                  ref={(element) => {
                    timelineRefs.current[step.label] = element;
                  }}
                  transform={`translate(${36 + index * 150} 82)`}
                >
                  <rect width="120" height="22" rx="6" fill={COLORS.accent} />
                  <text x="10" y="16" fontSize="11" fill="var(--bg)">
                    T{index} · {step.label}
                  </text>
                </g>
              ))}
            </g>
            {STAGES.map((stage, index) => (
              <g key={stage.id}>
                <StageCard
                  stage={stage}
                  index={index}
                  mode={mode}
                  sample={sample}
                />
                {index < STAGES.length - 1 && <StageArrow index={index} />}
              </g>
            ))}
            <rect
              x="20"
              y="248"
              width="780"
              height="78"
              rx="12"
              fill={
                sample === "failure"
                  ? COLORS.danger
                  : sample === "boundary"
                    ? COLORS.warning
                    : COLORS.success
              }
              fillOpacity="0.12"
              stroke={
                sample === "failure"
                  ? COLORS.danger
                  : sample === "boundary"
                    ? COLORS.warning
                    : COLORS.success
              }
              strokeWidth="2"
            />
            <text
              x="42"
              y="276"
              fontSize="14"
              fontWeight="700"
              fill={
                sample === "failure"
                  ? COLORS.danger
                  : sample === "boundary"
                    ? COLORS.warning
                    : COLORS.success
              }
            >
              {sample === "failure"
                ? "首个偏差：先停在重点阶段"
                : sample === "boundary"
                  ? "边界观察：比较字段与资源责任"
                  : "正常基线：所有卡片可沿路线重放"}
            </text>
            <text x="42" y="302" fontSize="13" fill={COLORS.secondary}>
              {currentSample.observation}；建议保存 {currentSample.artifact}。
            </text>
            <g transform="translate(20 358)">
              <text
                x="0"
                y="0"
                fontSize="13"
                fontWeight="700"
                fill={COLORS.primary}
              >
                下一步实验
              </text>
              <rect
                x="0"
                y="16"
                width="780"
                height="44"
                rx="9"
                fill={COLORS.elevated}
                stroke={COLORS.border}
              />
              <circle cx="20" cy="38" r="6" fill={COLORS.accent} />
              <text x="38" y="43" fontSize="13" fill={COLORS.primary}>
                运行 {currentMode.label} 探针，保存 {currentSample.artifact}
                ，再进入 {currentMode.next}
              </text>
            </g>
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">
            {currentMode.label}
          </p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {sample === "failure"
              ? "只沿重点阶段查找最早不一致的字段，后续卡片先记录为连锁结果。"
              : sample === "boundary"
                ? "边界样本要同时保存范围、权限、计数和清理状态，不能只比较输出。"
                : `正常基线将 hello 的 ${currentMode.focus} 变成可复查产物，下一步是 ${currentMode.next}。`}
          </p>
        </div>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="单步回放 source、translate、load、execute 和 replay；重置后可用同一模式重新选择样本。"
          reset={{
            label: "重置 hello 轨迹",
            ariaLabel: "重置第1章计算机系统漫游专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
