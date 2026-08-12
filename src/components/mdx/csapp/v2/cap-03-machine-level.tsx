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

type Mode = "instruction" | "branch" | "call" | "array" | "float";
type Sample = "normal" | "boundary" | "bug";

const CONCEPTS = [
  "第3章 程序的机器级表示",
  "3.1 历史观点",
  "3.2 程序编码",
  "3.2.1 机器级代码",
  "3.2.2 代码示例",
  "3.2.3 关于格式的注解",
  "3.3 数据格式",
  "3.4 访问信息",
  "3.4.1 操作数指示符",
  "3.4.2 数据传送指令",
  "3.4.3 数据传送示例",
  "3.4.4 压入和弹出栈数据",
  "3.5 算术和逻辑操作",
  "3.5.1 加载有效地址",
  "3.5.2 一元和二元操作",
  "3.5.3 移位操作",
  "3.5.4 讨论",
  "3.5.5 特殊的算术操作",
  "3.6 控制",
  "3.6.1 条件码",
  "3.6.2 访问条件码",
  "3.6.3 跳转指令",
  "3.6.4 跳转指令的编码",
  "3.6.5 用条件控制来实现条件分支",
  "3.6.6 用条件传送来实现条件分支",
  "3.6.7 循环",
  "3.6.8 switch语句",
  "3.7 过程",
  "3.7.1 运行时栈",
  "3.7.2 转移控制",
  "3.7.3 数据传送",
  "3.7.4 栈上的局部存储",
  "3.7.5 寄存器中的局部存储空间",
  "3.7.6 递归过程",
  "3.8 数组分配和访问",
  "3.8.1 基本原则",
  "3.8.2 指针运算",
  "3.8.3 嵌套的数组",
  "3.8.4 定长数组",
  "3.8.5 变长数组",
  "3.9 异质的数据结构",
  "3.9.1 结构",
  "3.9.2 联合",
  "3.9.3 数据对齐",
  "3.10 在机器级程序中将控制与数据结合起来",
  "3.10.1 理解指针",
  "3.10.2 应用：使用GDB调试器",
  "3.10.3 内存越界引用和缓冲区溢出",
  "3.10.4 对抗缓冲区溢出攻击",
  "3.10.5 支持变长栈帧",
  "3.11 浮点代码",
  "3.11.1 浮点传送和转换操作",
  "3.11.2 过程中的浮点代码",
  "3.11.3 浮点运算操作",
  "3.11.4 定义和使用浮点常数",
  "3.11.5 在浮点代码中使用位级操作",
  "3.11.6 浮点比较操作",
  "3.11.7 对浮点代码的观察结论",
  "3.12 小结",
] as const;

const MODES: readonly { id: Mode; label: string; focus: string }[] = [
  { id: "instruction", label: "指令语义", focus: "mov · add · lea" },
  { id: "branch", label: "控制流", focus: "条件码 · 跳转 · 循环" },
  { id: "call", label: "过程调用", focus: "call · 栈帧 · 返回" },
  { id: "array", label: "数组地址", focus: "基址 + 索引 × 尺寸" },
  { id: "float", label: "浮点路径", focus: "转换 · 运算 · 比较" },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  result: string;
  evidence: string;
}[] = [
  {
    id: "normal",
    label: "正常输入",
    result: "状态按 ABI 闭合",
    evidence: "寄存器、栈和内存均可重放",
  },
  {
    id: "boundary",
    label: "边界输入",
    result: "宽度或索引逼近边界",
    evidence: "条件码与地址需要逐字段核对",
  },
  {
    id: "bug",
    label: "故障注入",
    result: "在副作用前停住",
    evidence: "记录首个错误寄存器或地址",
  },
] as const;

const LANES: readonly {
  id: string;
  label: string;
  artifact: string;
}[] = [
  { id: "source", label: "C 源码", artifact: "i = a[n]" },
  { id: "instruction", label: "指令", artifact: "mov / lea" },
  { id: "operand", label: "操作数", artifact: "%rdi + %rax" },
  { id: "flags", label: "条件码", artifact: "ZF · SF · OF" },
  { id: "frame", label: "栈帧", artifact: "%rsp · %rbp" },
  { id: "address", label: "地址", artifact: "base + index" },
  { id: "float", label: "浮点", artifact: "xmm0 · round" },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "固定 C 输入与类型。" },
  { label: "decode", caption: "拆解操作数与指令编码。" },
  { label: "state", caption: "更新寄存器和条件码。" },
  { label: "control", caption: "沿跳转或调用边前进。" },
  { label: "replay", caption: "核对地址、栈帧和结果。" },
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

function LaneCard({
  lane,
  index,
  mode,
  sample,
}: {
  lane: (typeof LANES)[number];
  index: number;
  mode: Mode;
  sample: Sample;
}) {
  const focusIndex =
    mode === "instruction"
      ? index === 1 || index === 2
      : mode === "branch"
        ? index === 3
        : mode === "call"
          ? index === 4
          : mode === "array"
            ? index === 5
            : index === 6;
  const fault = sample === "bug" && (focusIndex || index === 2);
  const boundary = sample === "boundary" && focusIndex;
  const color = fault
    ? COLORS.danger
    : boundary
      ? COLORS.warning
      : focusIndex
        ? COLORS.accent
        : COLORS.border;
  const status = fault
    ? "首个异常"
    : boundary
      ? "边界核对"
      : focusIndex
        ? "当前焦点"
        : "已记录";
  return (
    <g>
      <rect
        x={18 + index * 112}
        y="138"
        width="98"
        height="108"
        rx="12"
        fill={COLORS.elevated}
        stroke={color}
        strokeWidth={focusIndex ? 2 : 1.2}
      />
      <circle cx={38 + index * 112} cy="160" r="6" fill={color} />
      <text
        x={50 + index * 112}
        y="165"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {lane.label}
      </text>
      <text x={30 + index * 112} y="194" fontSize="11" fill={COLORS.secondary}>
        {lane.artifact}
      </text>
      <text
        x={30 + index * 112}
        y="222"
        fontSize="12"
        fontWeight="600"
        fill={color}
      >
        {status}
      </text>
    </g>
  );
}

/** 第 3 章专属实验：把 C 语义逐拍投影到指令、状态、控制与地址证据。 */
export function Cap03MachineLevelLab() {
  const [modeId, setModeId] = useState<Mode>("instruction");
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
    setModeId("instruction");
    setSampleId("normal");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第 3 章机器级表示专属指令状态回放实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="cap-unit-03"
      data-visual-kind="cap-03-machine-level-instruction-state-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Cap03MachineLevelLab · 指令状态回放台
          </p>
          <h3 className="mt-1 text-lg font-semibold text-primary">
            从 C 表达式追到寄存器、条件码、栈帧与地址
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
            先选观察模式，再选择样本；按关键帧单步，定位哪一层改变了状态。
          </p>
        </div>
        <div className="rounded-control border border-border px-3 py-2 text-right text-xs text-secondary">
          <div className="font-medium text-primary">当前模式</div>
          <div>{mode.label}</div>
          <div>{mode.focus}</div>
        </div>
      </header>

      <div className="space-y-4 px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-2" aria-label="观察模式">
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
        <div className="flex flex-wrap gap-2" aria-label="输入样本">
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
          aria-label={`${mode.label}模式下的机器级状态轨迹：${sample.result}`}
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
            trace: a[n] → mov → flags → call/branch → memory
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
          {LANES.map((lane, index) => (
            <LaneCard
              key={lane.id}
              lane={lane}
              index={index}
              mode={modeId}
              sample={sampleId}
            />
          ))}
          <g
            ref={(node) => {
              timelineRefs.current.source = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="28"
              y="272"
              width="238"
              height="108"
              rx="12"
              fill={COLORS.accent}
              fillOpacity="0.08"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.decode = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path d="M284 326h112" stroke={COLORS.accent} strokeWidth="3" />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.state = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <circle
              cx="458"
              cy="326"
              r="24"
              fill={COLORS.accent}
              fillOpacity="0.16"
              stroke={COLORS.accent}
              strokeWidth="2"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.control = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <path
              d="M512 326h112v-48"
              fill="none"
              stroke={COLORS.warning}
              strokeWidth="3"
            />
          </g>
          <g
            ref={(node) => {
              timelineRefs.current.replay = node;
            }}
            aria-hidden="true"
            opacity="0"
            pointerEvents="none"
          >
            <rect
              x="650"
              y="272"
              width="130"
              height="108"
              rx="12"
              fill={COLORS.success}
              fillOpacity="0.08"
              stroke={COLORS.success}
            />
          </g>
          <text x="32" y="408" fontSize="12" fill={COLORS.secondary}>
            证据链：输入与类型 → 编码与操作数 → 状态变化 → 控制边 → 可重放地址
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="动画默认暂停；逐步查看每个状态节点，并用边界样本检验 ABI 与地址不变量。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置机器级表示实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
