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

const VIEW_W = 760;
const VIEW_H = 420;
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

type View = "syntax" | "operations" | "control";
type Sample = "move" | "arith" | "bit";
type Fault = "none" | "operand" | "branch";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "syntax",
    label: "语法槽位",
    detail: "把 AT&T 文本拆成助记符、宽度、源和目的操作数。",
  },
  {
    id: "operations",
    label: "指令族",
    detail: "比较传输、算术与位运算的机器码、读写集合和 EFLAGS。",
  },
  {
    id: "control",
    label: "控制转移",
    detail: "沿 cmp、条件跳转、标签目标和 fall-through 验收两条路径。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  source: string;
  operand: string;
  bytes: string;
  flags: string;
}[] = [
  {
    id: "move",
    label: "传输",
    source: "movl %eax, (%ecx)",
    operand: "EAX → [ECX]",
    bytes: "89 01",
    flags: "unchanged",
  },
  {
    id: "arith",
    label: "算术",
    source: "addl %ebx, %eax",
    operand: "EAX ← EAX + EBX",
    bytes: "01 d8",
    flags: "ZF / SF / OF / CF",
  },
  {
    id: "bit",
    label: "位运算",
    source: "andl $0xff, %eax",
    operand: "EAX ← EAX & 00ff",
    bytes: "25 ff 00 00 00",
    flags: "ZF / SF",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "读取汇编文本和目标参数。" },
  { label: "syntax", caption: "拆出助记符、宽度与操作数。" },
  { label: "encode", caption: "核对机器码与寄存器读写。" },
  { label: "branch", caption: "重放标志位和控制转移。" },
  { label: "verify", caption: "清理后用同一命令重建。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第13章 x86汇编器编程",
  "13.1 基于GNU汇编器的编程",
  "13.2 GNU汇编器的语法",
  "13.3 传输指令",
  "13.4 算术运算指令",
  "13.5 位运算指令",
  "13.6 流程的控制",
] as const;

function ViewButton({
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

function Stage({
  label,
  status,
  x,
  refCallback,
}: {
  label: string;
  status: string;
  x: number;
  refCallback?: (element: SVGGElement | null) => void;
}) {
  return (
    <g ref={refCallback}>
      <rect
        x={x}
        y="108"
        width="132"
        height="76"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 16}
        y="136"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y="164" fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function SyntaxView({
  activeStep,
  fault,
  sample,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const operandFault = fault === "operand";
  const source = operandFault ? "movl (%ecx), %eax" : selected.source;
  const destination = operandFault ? "EAX ← [ECX]" : selected.operand;
  const cards = [
    [
      "mnemonic",
      selected.id === "move" ? "mov" : selected.id === "arith" ? "add" : "and",
      COLORS.accent,
    ],
    [
      "width",
      selected.id === "bit" ? "l · 32 bit" : "l · 32 bit",
      COLORS.warning,
    ],
    [
      "source",
      operandFault
        ? "(%ecx)"
        : selected.id === "move"
          ? "%eax"
          : selected.id === "arith"
            ? "%ebx"
            : "$0xff",
      COLORS.success,
    ],
    [
      "destination",
      operandFault ? "%eax" : selected.id === "move" ? "(%ecx)" : "%eax",
      COLORS.accent,
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        AT&T syntax：一行文本的四个槽位
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        源/目的顺序与宽度后缀先进入解析表，再进入机器码核对。
      </text>
      <rect
        x="28"
        y="86"
        width="704"
        height="54"
        rx="10"
        fill={COLORS.elevated}
        stroke={operandFault ? COLORS.warning : COLORS.border}
        strokeWidth="2"
      />
      <text
        x="50"
        y="120"
        fontSize="15"
        fontWeight="700"
        fill={operandFault ? COLORS.warning : COLORS.primary}
      >
        {source}
      </text>
      <text x="28" y="169" fontSize="13" fill={COLORS.secondary}>
        解析状态：
        {operandFault
          ? "源/目的次序与预期写入不一致"
          : "助记符、宽度与操作数已锁定"}
      </text>
      {cards.map(([label, detail, color], index) => {
        const x = 28 + index * 176;
        const active = activeStep >= Math.min(index + 1, 4);
        return (
          <g key={label} opacity={active ? 1 : 0.45}>
            <rect
              x={x}
              y="196"
              width="156"
              height="96"
              rx="10"
              fill={color}
              fillOpacity={active ? 0.14 : 0.05}
              stroke={active ? color : COLORS.border}
              strokeWidth="2"
            />
            <text
              x={x + 16}
              y="224"
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text
              x={x + 16}
              y="256"
              fontSize="14"
              fill={active ? color : COLORS.secondary}
            >
              {detail}
            </text>
            {index < cards.length - 1 && (
              <line
                x1={x + 156}
                y1="244"
                x2={x + 172}
                y2="244"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-assembly-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="320"
        width="704"
        height="64"
        rx="12"
        fill={operandFault ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={operandFault ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="50" y="348" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {operandFault
          ? "停止：解析表显示 EAX ← [ECX]，但期望的写入方向已改变"
          : `${destination} · width suffix = l · 语法槽位通过`}
      </text>
      <text
        x="50"
        y="372"
        fontSize="13"
        fill={operandFault ? COLORS.warning : COLORS.success}
      >
        {operandFault
          ? "先修正文本或测试预期，再比较机器码；不能只看装配退出码。"
          : "可以继续核对编码字节、读写集合和标志位。"}
      </text>
    </g>
  );
}

function OperationsView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const operandFault = fault === "operand";
  const rows = [
    ["传输", "movl", "源值 → 目的", "不改变", selected.id === "move"],
    ["算术", "addl", "EAX ← EAX + EBX", "ZF/SF/OF/CF", selected.id === "arith"],
    ["位运算", "andl", "EAX ← EAX & mask", "ZF/SF", selected.id === "bit"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        指令族：机器码、写入集合与 EFLAGS
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        每一行都要把文本语义和反汇编字节绑定到同一宽度。
      </text>
      <rect
        x="28"
        y="86"
        width="704"
        height="48"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="48" y="117" fontSize="13" fontWeight="700" fill={COLORS.primary}>
        指令族
      </text>
      <text
        x="150"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        样本
      </text>
      <text
        x="278"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        状态变化
      </text>
      <text
        x="538"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        EFLAGS
      </text>
      {rows.map(([label, mnemonic, effect, flags, active], index) => {
        const y = 146 + index * 58;
        const highlighted = active;
        const error = operandFault && highlighted;
        return (
          <g key={label}>
            <rect
              x="28"
              y={y}
              width="704"
              height="44"
              rx="8"
              fill={
                error
                  ? COLORS.warning
                  : highlighted
                    ? COLORS.success
                    : COLORS.elevated
              }
              fillOpacity={error || highlighted ? 0.14 : 1}
              stroke={
                error
                  ? COLORS.warning
                  : highlighted
                    ? COLORS.success
                    : COLORS.border
              }
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 28}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text
              x="150"
              y={y + 28}
              fontSize="13"
              fill={error ? COLORS.warning : COLORS.secondary}
            >
              {error ? `${mnemonic} · 顺序错` : mnemonic}
            </text>
            <text x="278" y={y + 28} fontSize="13" fill={COLORS.secondary}>
              {effect}
            </text>
            <text
              x="538"
              y={y + 28}
              fontSize="13"
              fill={error ? COLORS.warning : COLORS.secondary}
            >
              {flags}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="338"
        width="704"
        height="46"
        rx="10"
        fill={operandFault ? COLORS.warning : COLORS.accent}
        fillOpacity="0.12"
        stroke={operandFault ? COLORS.warning : COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="48"
        y="367"
        fontSize="13"
        fontWeight="700"
        fill={operandFault ? COLORS.warning : COLORS.accent}
      >
        {operandFault
          ? "证据不一致：装配成功 ≠ 指令语义通过"
          : `${selected.source} · bytes ${selected.bytes} · flags ${selected.flags}`}
      </text>
    </g>
  );
}

function ControlView({ fault }: { fault: Fault }) {
  const branchFault = fault === "branch";
  const paths = [
    ["cmp", "cmp %ebx, %eax", "ZF = 1 / 0", COLORS.accent],
    [
      "jump",
      "jz done",
      branchFault ? "taken 条件取反" : "ZF=1 时 taken",
      branchFault ? COLORS.warning : COLORS.success,
    ],
    ["done", "done:", "标签重定位目标", COLORS.success],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        流程的控制：taken 与 fall-through 都要出现
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        cmp 设置 EFLAGS，条件跳转消费它，标签把控制流连接到目标地址。
      </text>
      {paths.map(([label, code, detail, color], index) => {
        const x = 28 + index * 236;
        return (
          <g key={label}>
            <rect
              x={x}
              y="96"
              width="208"
              height="126"
              rx="12"
              fill={color}
              fillOpacity="0.12"
              stroke={color}
              strokeWidth="2"
            />
            <text
              x={x + 20}
              y="128"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 20} y="164" fontSize="13" fill={COLORS.secondary}>
              {code}
            </text>
            <text x={x + 20} y="196" fontSize="13" fill={color}>
              {detail}
            </text>
            {index < paths.length - 1 && (
              <line
                x1={x + 208}
                y1="158"
                x2={x + 228}
                y2="158"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-assembly-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="252"
        width="704"
        height="64"
        rx="12"
        fill={branchFault ? COLORS.warning : COLORS.elevated}
        fillOpacity={branchFault ? 0.14 : 1}
        stroke={branchFault ? COLORS.warning : COLORS.border}
        strokeWidth="2"
      />
      <text x="50" y="280" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {branchFault
          ? "故障样本：相等输入未到达 done，先检查 EFLAGS 与 jz 条件"
          : "通过样本：相等输入走 taken，不等输入走 fall-through"}
      </text>
      <text
        x="50"
        y="304"
        fontSize="13"
        fill={branchFault ? COLORS.warning : COLORS.secondary}
      >
        {branchFault
          ? "记录 cmp 的机器码、标签地址与退出码，再清理目标文件。"
          : "两条路径、标签地址和退出码已进入验收表。"}
      </text>
      <text x="28" y="360" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        as --32 → objdump -drwC → readelf -h
      </text>
      <text x="28" y="385" fontSize="13" fill={COLORS.accent}>
        重建后必须得到同一目标类别与控制流证据。
      </text>
    </g>
  );
}

/** 第13章专属实验：回放 GNU as 语法、指令族和控制转移。 */
export function Crc13X86AssemblyLab() {
  const [view, setView] = useState<View>("syntax");
  const [sample, setSample] = useState<Sample>("move");
  const [fault, setFault] = useState<Fault>("none");
  const stageRefs = useRef<Record<string, SVGGElement | null>>({});
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = stageRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.35, 1],
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
    setView("syntax");
    setSample("move");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第13章 x86 汇编器编程专属 GNU as 指令编码实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-13"
      data-visual-kind="crc-x86-assembly-instruction-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Crc13X86AssemblyLab · GNU as 指令编码台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把汇编文本锁定到机器码和控制流证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：装配成功后，哪一个字段最先证明源/目的顺序或宽度后缀错了？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择 x86 汇编实验视角"
        >
          {VIEWS.map((item) => (
            <ViewButton
              key={item.id}
              active={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择 x86 指令样本">
          {SAMPLES.map((item) => (
            <ViewButton
              key={item.id}
              active={sample === item.id}
              onClick={() => setSample(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择 x86 汇编故障模式"
        >
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常编码
          </ViewButton>
          <ViewButton
            active={fault === "operand"}
            onClick={() => setFault("operand")}
          >
            源/目的错位
          </ViewButton>
          <ViewButton
            active={fault === "branch"}
            onClick={() => setFault("branch")}
          >
            条件跳转错误
          </ViewButton>
        </div>
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="crc-assembly-arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <path d="M0,0 L10,5 L0,10 z" fill={COLORS.accent} />
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
            <g aria-hidden="true" opacity="0" pointerEvents="none">
              <Stage
                label="source"
                status="汇编文本"
                x={28}
                refCallback={(element) => {
                  stageRefs.current.source = element;
                }}
              />
              <Stage
                label="syntax"
                status="语法槽位"
                x={174}
                refCallback={(element) => {
                  stageRefs.current.syntax = element;
                }}
              />
              <Stage
                label="encode"
                status="机器码/读写"
                x={320}
                refCallback={(element) => {
                  stageRefs.current.encode = element;
                }}
              />
              <Stage
                label="branch"
                status="EFLAGS/标签"
                x={466}
                refCallback={(element) => {
                  stageRefs.current.branch = element;
                }}
              />
              <Stage
                label="verify"
                status="清理重建"
                x={612}
                refCallback={(element) => {
                  stageRefs.current.verify = element;
                }}
              />
            </g>
            {view === "syntax" ? (
              <SyntaxView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
              />
            ) : view === "operations" ? (
              <OperationsView fault={fault} sample={sample} />
            ) : (
              <ControlView fault={fault} />
            )}
          </svg>
        </div>
        <div
          className="rounded-card border border-border bg-background p-4"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm font-semibold text-primary">{current.label}</p>
          <p className="mt-1 text-sm leading-6 text-secondary">
            {current.detail}
          </p>
        </div>
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="单步查看 source、syntax、encode、branch 和 verify；重置后用同一输入重放，确认 IA-32 目标与指令语义没有漂移。"
          reset={{
            label: "重置 x86 汇编实验",
            ariaLabel: "重置 x86 汇编器编程专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
