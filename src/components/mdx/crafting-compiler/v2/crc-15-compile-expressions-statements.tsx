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

type View = "pipeline" | "dsl" | "verify";
type Sample = "expression" | "assignment" | "jump";
type Fault = "none" | "text" | "label";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "pipeline",
    label: "代码生成流水线",
    detail: "沿 IR 节点、DSL 调用、操作数/标签和汇编产物展开。",
  },
  {
    id: "dsl",
    label: "指令选择",
    detail: "比较表达式、赋值与 jump 的 DSL 模式和副作用。",
  },
  {
    id: "verify",
    label: "三重基线",
    detail: "对照预测汇编、反汇编机器码和执行语义的证据。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  ir: string;
  dsl: string;
  output: string;
  signal: string;
}[] = [
  {
    id: "expression",
    label: "表达式",
    ir: "BinOp(ADD, a, 1)",
    dsl: "movl a, %eax → addl $1, %eax",
    output: "EAX = a + 1",
    signal: "result register",
  },
  {
    id: "assignment",
    label: "赋值",
    ir: "Assign(x, BinOp(ADD, a, b))",
    dsl: "addl %ebx, %eax → movl %eax, x",
    output: "memory[x] = a + b",
    signal: "store side effect",
  },
  {
    id: "jump",
    label: "跳转",
    ir: "JumpIf(x, done)",
    dsl: "cmpl $0, %eax → jne done",
    output: "taken / fall-through",
    signal: "label relocation",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "读取 IR 节点与目标边界。" },
  { label: "lower", caption: "选择 DSL 模式和临时量。" },
  { label: "emit", caption: "生成操作数、标签和汇编。" },
  { label: "branch", caption: "重放副作用与控制路径。" },
  { label: "verify", caption: "比较字节与执行断言。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第15章 编译表达式和语句",
  "15.1 确认编译结果",
  "15.2 x86汇编的对象与DSL",
  "15.3 cbc的x86汇编DSL",
  "15.4 CodeGenerator类的概要",
  "15.5 编译单纯的表达式",
  "15.6 编译二元运算",
  "15.7 引用变量和赋值",
  "15.8 编译jump语句",
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

function PipelineView({
  activeStep,
  fault,
  sample,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const textFault = fault === "text";
  const labelFault = fault === "label";
  const stages = [
    ["IR node", selected.ir, COLORS.accent],
    ["x86 DSL", selected.dsl, COLORS.warning],
    [
      "operands",
      labelFault ? "done_typo / %eax" : "regs + memory + labels",
      COLORS.success,
    ],
    [
      "assembly",
      textFault ? "movl %eax, 4(%ebp)" : "as --32 → codegen.o",
      COLORS.accent,
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        IR node → x86 DSL → labels/operands → assembly
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        每个阶段都保留源节点和目标产物，避免只凭最终汇编猜测语义。
      </text>
      {stages.map(([label, detail, color], index) => {
        const x = 28 + index * 176;
        const active = activeStep >= Math.min(index + 1, 4);
        return (
          <g key={label} opacity={active ? 1 : 0.45}>
            <rect
              x={x}
              y="92"
              width="156"
              height="128"
              rx="12"
              fill={color}
              fillOpacity={active ? 0.14 : 0.05}
              stroke={active ? color : COLORS.border}
              strokeWidth="2"
            />
            <circle
              cx={x + 24}
              cy="122"
              r="8"
              fill={active ? color : COLORS.border}
            />
            <text
              x={x + 42}
              y="128"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 16} y="166" fontSize="13" fill={COLORS.secondary}>
              {detail}
            </text>
            <text
              x={x + 16}
              y="198"
              fontSize="13"
              fill={active ? color : COLORS.secondary}
            >
              {active ? "evidence recorded" : "waiting"}
            </text>
            {index < stages.length - 1 && (
              <line
                x1={x + 156}
                y1="154"
                x2={x + 172}
                y2="154"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-codegen-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="246"
        width="704"
        height="74"
        rx="12"
        fill={textFault || labelFault ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={textFault || labelFault ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="50" y="276" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {textFault
          ? "操作数故障：生成文本可装配，但写入地址不符合 Assign 节点"
          : labelFault
            ? "标签故障：引用未闭合，jump 目标与执行路径不一致"
            : `${selected.ir} → ${selected.output} · 节点到指令对应成立`}
      </text>
      <text
        x="50"
        y="302"
        fontSize="13"
        fill={textFault || labelFault ? COLORS.warning : COLORS.success}
      >
        {textFault || labelFault
          ? "先回到 IR—DSL 记录，再比较反汇编和运行断言。"
          : `运行信号：${selected.signal}，可继续生成目标文件。`}
      </text>
      <text x="28" y="366" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        不变量：模式合法 · 标签闭合 · 执行语义一致
      </text>
      <text x="28" y="390" fontSize="13" fill={COLORS.accent}>
        清理后必须用同一输入重放这三项断言。
      </text>
    </g>
  );
}

function DslView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const textFault = fault === "text";
  const rows = [
    ["load", "movl", "source → %eax", "read", selected.id === "expression"],
    [
      "operate",
      selected.id === "jump" ? "cmpl / jne" : "addl",
      selected.id === "assignment" ? "%eax + %ebx" : selected.output,
      "flags",
      selected.id === "expression" || selected.id === "jump",
    ],
    [
      "store/branch",
      selected.id === "jump" ? "jne done" : "movl %eax, x",
      selected.id === "jump" ? "done / fall-through" : "memory[x]",
      "write / target",
      selected.id === "assignment" || selected.id === "jump",
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        指令选择：DSL 方法必须保留 IR 意图
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        把读取、运算、存储或跳转的副作用写进模式表。
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
        阶段
      </text>
      <text
        x="150"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        DSL
      </text>
      <text
        x="300"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        操作数/效果
      </text>
      <text
        x="584"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        证据
      </text>
      {rows.map(([stage, mnemonic, effect, signal, active], index) => {
        const y = 146 + index * 58;
        const error = textFault && active;
        return (
          <g key={stage}>
            <rect
              x="28"
              y={y}
              width="704"
              height="44"
              rx="8"
              fill={
                error
                  ? COLORS.warning
                  : active
                    ? COLORS.success
                    : COLORS.elevated
              }
              fillOpacity={error || active ? 0.14 : 1}
              stroke={
                error ? COLORS.warning : active ? COLORS.success : COLORS.border
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
              {stage}
            </text>
            <text
              x="150"
              y={y + 28}
              fontSize="13"
              fill={error ? COLORS.warning : COLORS.secondary}
            >
              {error ? `${mnemonic} · address mismatch` : mnemonic}
            </text>
            <text x="300" y={y + 28} fontSize="13" fill={COLORS.secondary}>
              {effect}
            </text>
            <text
              x="584"
              y={y + 28}
              fontSize="13"
              fill={error ? COLORS.warning : COLORS.secondary}
            >
              {signal}
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
        fill={textFault ? COLORS.warning : COLORS.accent}
        fillOpacity="0.12"
        stroke={textFault ? COLORS.warning : COLORS.accent}
        strokeWidth="2"
      />
      <text
        x="48"
        y="367"
        fontSize="13"
        fontWeight="700"
        fill={textFault ? COLORS.warning : COLORS.accent}
      >
        {textFault
          ? "停止：DSL 产物与变量绑定不一致，禁止直接接受汇编文本"
          : `${selected.label} 模式：${selected.dsl} · 副作用已标注`}
      </text>
    </g>
  );
}

function VerifyView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const labelFault = fault === "label";
  const rows = [
    ["预测汇编", selected.dsl, "cbc -S", false],
    [
      "反汇编",
      labelFault ? "jne <missing>" : "bytes + relocations",
      "objdump -drwC",
      labelFault,
    ],
    [
      "执行语义",
      labelFault ? "wrong path" : selected.output,
      "exit code + memory",
      labelFault,
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        三重基线：文本、字节和状态
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        同一节点的预测、反汇编和执行结果必须能够互相解释。
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
        基线
      </text>
      <text
        x="196"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        观察值
      </text>
      <text
        x="538"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        工具
      </text>
      {rows.map(([baseline, value, tool, error], index) => {
        const y = 146 + index * 58;
        return (
          <g key={baseline}>
            <rect
              x="28"
              y={y}
              width="704"
              height="44"
              rx="8"
              fill={error ? COLORS.warning : COLORS.success}
              fillOpacity="0.12"
              stroke={error ? COLORS.warning : COLORS.success}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 28}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {baseline}
            </text>
            <text
              x="196"
              y={y + 28}
              fontSize="13"
              fill={error ? COLORS.warning : COLORS.secondary}
            >
              {value}
            </text>
            <text
              x="538"
              y={y + 28}
              fontSize="13"
              fill={error ? COLORS.warning : COLORS.secondary}
            >
              {tool}
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
        fill={labelFault ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={labelFault ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="48"
        y="367"
        fontSize="13"
        fontWeight="700"
        fill={labelFault ? COLORS.warning : COLORS.success}
      >
        {labelFault
          ? "标签不闭合：重建前先修正条件、目标和重定位记录"
          : "三重基线一致：可以接受本次代码生成结果"}
      </text>
    </g>
  );
}

/** 第15章专属实验：回放 IR、x86 DSL、指令选择和运行语义。 */
export function Crc15CompileExpressionsStatementsLab() {
  const [view, setView] = useState<View>("pipeline");
  const [sample, setSample] = useState<Sample>("expression");
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
    setView("pipeline");
    setSample("expression");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第15章 编译表达式和语句专属 IR 到指令选择实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-15"
      data-visual-kind="crc-codegen-ir-instruction-selection-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Crc15CompileExpressionsStatementsLab · IR 到指令选择台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让每个 IR 节点都能回到运行断言
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：生成的汇编与预期相似但结果错误时，哪条基线最先揭示问题？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择代码生成实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择 IR 类别样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择代码生成故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常生成
          </ViewButton>
          <ViewButton
            active={fault === "text"}
            onClick={() => setFault("text")}
          >
            操作数错位
          </ViewButton>
          <ViewButton
            active={fault === "label"}
            onClick={() => setFault("label")}
          >
            标签不闭合
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
                id="crc-codegen-arrow"
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
                status="IR 节点"
                x={28}
                refCallback={(element) => {
                  stageRefs.current.source = element;
                }}
              />
              <Stage
                label="lower"
                status="模式/临时量"
                x={174}
                refCallback={(element) => {
                  stageRefs.current.lower = element;
                }}
              />
              <Stage
                label="emit"
                status="DSL/标签"
                x={320}
                refCallback={(element) => {
                  stageRefs.current.emit = element;
                }}
              />
              <Stage
                label="branch"
                status="副作用/路径"
                x={466}
                refCallback={(element) => {
                  stageRefs.current.branch = element;
                }}
              />
              <Stage
                label="verify"
                status="字节/断言"
                x={612}
                refCallback={(element) => {
                  stageRefs.current.verify = element;
                }}
              />
            </g>
            {view === "pipeline" ? (
              <PipelineView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
              />
            ) : view === "dsl" ? (
              <DslView fault={fault} sample={sample} />
            ) : (
              <VerifyView fault={fault} sample={sample} />
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
          caption="单步查看 source、lower、emit、branch 和 verify；重置后用同一输入重放，确认代码生成没有偏离 IR 语义。"
          reset={{
            label: "重置代码生成实验",
            ariaLabel: "重置编译表达式和语句专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
