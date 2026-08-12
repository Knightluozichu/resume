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
const VIEW_H = 470;
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

type Mode = "seq" | "pipe" | "hazard" | "exception";
type Sample = "normal" | "load-use" | "branch";

const CONCEPTS = [
  "第4章 处理器体系结构",
  "4.1 Y86-64指令集体系结构",
  "4.1.1 程序员可见的状态",
  "4.1.2 Y86-64指令",
  "4.1.3 指令编码",
  "4.1.4 Y86-64异常",
  "4.1.5 Y86-64程序",
  "4.1.6 一些Y86-64指令的详情",
  "4.2 逻辑设计和硬件控制语言HCL",
  "4.2.1 逻辑门",
  "4.2.2 组合电路和HCL布尔表达式",
  "4.2.3 字级的组合电路和HCL整数表达式",
  "4.2.4 集合关系",
  "4.2.5 存储器和时钟",
  "4.3 Y86-64的顺序实现",
  "4.3.1 将处理组织成阶段",
  "4.3.2 SEQ硬件结构",
  "4.3.3 SEQ的时序",
  "4.3.4 SEQ阶段的实现",
  "4.4 流水线的通用原理",
  "4.4.1 计算流水线",
  "4.4.2 流水线操作的详细说明",
  "4.4.3 流水线的局限性",
  "4.4.4 带反馈的流水线系统",
  "4.5 Y86-64的流水线实现",
  "4.5.1 SEQ+：重新安排计算阶段",
  "4.5.2 插入流水线寄存器",
  "4.5.3 对信号进行重新排列和标号",
  "4.5.4 预测下一个PC",
  "4.5.5 流水线冒险",
  "4.5.6 异常处理",
  "4.5.7 PIPE各阶段的实现",
  "4.5.8 流水线控制逻辑",
  "4.5.9 性能分析",
  "4.5.10 未完成的工作",
  "4.6 小结",
  "4.6.1 Y86-64模拟器",
] as const;

const MODES: readonly { id: Mode; label: string; focus: string }[] = [
  { id: "seq", label: "SEQ 顺序", focus: "一条指令完成后再推进" },
  { id: "pipe", label: "PIPE 流水", focus: "阶段重叠与吞吐" },
  { id: "hazard", label: "冒险处理", focus: "转发 · 暂停 · 气泡" },
  { id: "exception", label: "异常优先级", focus: "取消错误指令副作用" },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  result: string;
  evidence: string;
}[] = [
  {
    id: "normal",
    label: "正常序列",
    result: "体系结构状态一致",
    evidence: "SEQ 与 PIPE 的提交值可逐项对齐",
  },
  {
    id: "load-use",
    label: "load/use",
    result: "插入暂停或转发",
    evidence: "消费者等待加载结果，错误指令不提交",
  },
  {
    id: "branch",
    label: "分支改道",
    result: "预测路径被取消",
    evidence: "清空错误路径并恢复正确 PC",
  },
] as const;

const STAGES: readonly {
  id: string;
  label: string;
  artifact: string;
}[] = [
  { id: "fetch", label: "取指", artifact: "PC / icode" },
  { id: "decode", label: "译码", artifact: "寄存器读" },
  { id: "execute", label: "执行", artifact: "ALU / 条件码" },
  { id: "memory", label: "访存", artifact: "读写内存" },
  { id: "write", label: "写回", artifact: "寄存器写" },
  { id: "pc", label: "更新 PC", artifact: "valP / valC" },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "isa", caption: "读取编码与程序员可见状态。" },
  { label: "logic", caption: "把控制信号写成组合逻辑。" },
  { label: "seq", caption: "按阶段完成一次 SEQ 执行。" },
  { label: "pipe", caption: "让相邻指令在流水线中重叠。" },
  { label: "recover", caption: "处理冒险、异常并核对提交。" },
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
    mode === "seq"
      ? index === 0 || index === 5
      : mode === "pipe"
        ? index === 2 || index === 3
        : mode === "hazard"
          ? sample === "load-use"
            ? index === 1 || index === 2
            : index === 5
          : index === 4 || index === 5;
  const isHazard =
    (sample === "load-use" && (index === 1 || index === 2)) ||
    (sample === "branch" && index === 5);
  const color = isHazard
    ? sample === "branch"
      ? COLORS.warning
      : COLORS.danger
    : focusIndex
      ? COLORS.accent
      : COLORS.border;
  const status = isHazard
    ? sample === "branch"
      ? "取消路径"
      : "等待结果"
    : focusIndex
      ? "当前阶段"
      : "已观察";
  return (
    <g>
      <rect
        x={18 + index * 130}
        y="142"
        width="112"
        height="104"
        rx="12"
        fill={COLORS.elevated}
        stroke={color}
        strokeWidth={focusIndex || isHazard ? 2 : 1.2}
      />
      <circle cx={40 + index * 130} cy="164" r="6" fill={color} />
      <text
        x={54 + index * 130}
        y="169"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {stage.label}
      </text>
      <text x={30 + index * 130} y="197" fontSize="11" fill={COLORS.secondary}>
        {stage.artifact}
      </text>
      <text
        x={30 + index * 130}
        y="224"
        fontSize="12"
        fontWeight="600"
        fill={color}
      >
        {status}
      </text>
    </g>
  );
}

/** 第 4 章专属实验：逐周期观察 Y86-64 从 SEQ 到 PIPE 的状态提交。 */
export function Cap04ProcessorArchitectureLab() {
  const [modeId, setModeId] = useState<Mode>("seq");
  const [sampleId, setSampleId] = useState<Sample>("normal");
  const timelineRefs = useRef<Record<string, SVGGElement | null>>({});
  const mode = useMemo(
    () => MODES.find((item) => item.id === modeId) ?? MODES[0],
    [modeId],
  );
  const sample = useMemo(
    () => SAMPLES.find((item) => item.id === sampleId) ?? SAMPLES[0],
    [sampleId],
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
            scale: [0.95, 1],
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
    setModeId("seq");
    setSampleId("normal");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第 4 章处理器体系结构专属流水线状态实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-04"
      data-visual-kind="cap-04-processor-architecture-pipeline-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap04ProcessorArchitectureLab · 流水线状态回放台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从 Y86-64 编码到阶段提交与冒险恢复
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            选择处理组织和样本，逐帧查看指令在哪里等待、取消或提交。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前组织</div>
          <div>{mode.label}</div>
          <div>{mode.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="处理组织">
          {MODES.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === modeId}
              onClick={() => setModeId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="执行样本">
          {SAMPLES.map((item) => (
            <ToggleButton
              key={item.id}
              active={item.id === sampleId}
              onClick={() => setSampleId(item.id)}
            >
              {item.label}
            </ToggleButton>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label={`${mode.label}模式下的 Y86-64 处理轨迹：${sample.result}`}
          className="h-auto w-full"
        >
          <rect
            x="10"
            y="18"
            width="800"
            height="414"
            rx="16"
            fill={COLORS.elevated}
            stroke={COLORS.border}
          />
          <text
            x="28"
            y="52"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.primary}
          >
            Y86-64: icode:ifun → control → stage state → commit
          </text>
          <text x="28" y="78" fontSize="12" fill={COLORS.secondary}>
            {sample.evidence}
          </text>
          <line
            x1="42"
            y1="112"
            x2="778"
            y2="112"
            stroke={COLORS.border}
            strokeWidth="1"
          />
          {STAGES.map((stage, index) => (
            <StageCard
              key={stage.id}
              stage={stage}
              index={index}
              mode={modeId}
              sample={sampleId}
            />
          ))}
          <g
            ref={(node) => {
              timelineRefs.current.isa = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="28"
              y="276"
              width="214"
              height="104"
              rx="12"
              fill={COLORS.accent}
              fillOpacity="0.08"
              stroke={COLORS.accent}
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.logic = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path d="M258 328h106" stroke={COLORS.accent} strokeWidth="3" />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.seq = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <circle
              cx="412"
              cy="328"
              r="24"
              fill={COLORS.accent}
              fillOpacity="0.16"
              stroke={COLORS.accent}
              strokeWidth="2"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.pipe = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M466 328h112v-50"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth="3"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.recover = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="604"
              y="276"
              width="176"
              height="104"
              rx="12"
              fill={COLORS.success}
              fillOpacity="0.08"
              stroke={COLORS.success}
            />
          </g>
          <text x="32" y="408" fontSize="12" fill={COLORS.secondary}>
            提交不变量：顺序与流水线最终状态相同，错误路径没有可见写回或内存副作用
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；单步观察控制信号、流水线寄存器、冒险动作和最终提交。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置处理器体系结构实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
