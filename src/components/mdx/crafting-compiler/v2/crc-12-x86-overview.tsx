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

type View = "boundary" | "storage" | "abi";
type Sample = "byte" | "word" | "dword";
type Fault = "none" | "x64" | "width";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "boundary",
    label: "目标边界",
    detail: "沿 C♭ 类型、宽度/对齐和 IA-32 操作数展开目标合同。",
  },
  {
    id: "storage",
    label: "存放位置",
    detail: "比较寄存器、栈和静态区的宽度、生命周期与保存责任。",
  },
  {
    id: "abi",
    label: "工具与 ABI",
    detail: "用 as --32、objdump 和 readelf 验证目标格式与调用边界。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  code: string;
  width: string;
  align: string;
  operand: string;
}[] = [
  {
    id: "byte",
    label: "8 位",
    code: "char flag",
    width: "8 bit",
    align: "1 byte",
    operand: "AL / byte ptr",
  },
  {
    id: "word",
    label: "16 位",
    code: "short delta",
    width: "16 bit",
    align: "2 bytes",
    operand: "AX / word ptr",
  },
  {
    id: "dword",
    label: "32 位",
    code: "int total",
    width: "32 bit",
    align: "4 bytes",
    operand: "EAX / dword ptr",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "读取 C♭ 类型与目标约束。" },
  { label: "width", caption: "确定宽度、扩展和对齐。" },
  { label: "storage", caption: "选择寄存器、栈或静态区。" },
  { label: "abi", caption: "核对 IA-32 ABI 与工具参数。" },
  { label: "verify", caption: "比较编码、反汇编和目标格式。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第3部分 汇编代码",
  "第12章 x86架构的概要",
  "12.1 计算机的系统结构",
  "12.2 x86系列CPU的历史",
  "12.3 IA-32的概要",
  "12.4 数据的表现形式和格式",
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
        y="106"
        width="132"
        height="78"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 16}
        y="134"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y="162" fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function BoundaryView({
  activeStep,
  fault,
  sample,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault !== "none";
  const cards = [
    ["C♭ type", selected.code, COLORS.accent],
    ["size / align", `${selected.width} · ${selected.align}`, COLORS.warning],
    ["IA-32 operand", selected.operand, COLORS.success],
  ] as const;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        C♭ type → size/alignment → register/memory operand
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        目标合同把类型、位宽、对齐和操作数绑定在同一条证据链上。
      </text>
      <rect
        x="28"
        y="94"
        width="704"
        height="170"
        rx="14"
        fill="var(--bg)"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {cards.map(([label, detail, color], index) => {
        const x = 48 + index * 226;
        const active = activeStep >= index;
        return (
          <g key={label} opacity={active ? 1 : 0.45}>
            <rect
              x={x}
              y="122"
              width="194"
              height="114"
              rx="12"
              fill={color}
              fillOpacity={active ? 0.14 : 0.05}
              stroke={active ? color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <circle
              cx={x + 24}
              cy="150"
              r="8"
              fill={active ? color : COLORS.border}
            />
            <text
              x={x + 42}
              y="155"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 18} y="192" fontSize="13" fill={COLORS.secondary}>
              {detail}
            </text>
            <text x={x + 18} y="218" fontSize="13" fill={color}>
              {active ? "contract recorded" : "waiting"}
            </text>
            {index < cards.length - 1 && (
              <line
                x1={x + 194}
                y1="178"
                x2={x + 218}
                y2="178"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-x86-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="294"
        width="704"
        height="72"
        rx="12"
        fill={broken ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="52" y="324" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {broken
          ? fault === "x64"
            ? "目标漂移：发现 RAX / ELF64，IA-32 合同拒绝"
            : "宽度证据不一致：编码与源类型不匹配"
          : `${selected.code} → ${selected.width} → ${selected.operand} · IA-32 合同通过`}
      </text>
      <text
        x="52"
        y="350"
        fontSize="13"
        fill={broken ? COLORS.warning : COLORS.success}
      >
        {broken
          ? "先停在目标边界，再检查工具参数和反汇编。"
          : "可以进入 as --32 和目标文件验收。"}
      </text>
      <text x="28" y="394" fontSize="13" fill={COLORS.accent}>
        只有三层字段一致，操作数选择才可复现。
      </text>
    </g>
  );
}

function StorageView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "width";
  const rows = [
    ["寄存器", selected.operand, "短生命周期值/地址"],
    ["栈", "[ebp-04]", `${selected.align} 对齐 · 局部量`],
    ["静态区", "symbol+offset", "全局生命周期 · 重定位"],
  ] as const;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        存放位置：宽度、生命周期与保存责任
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        位置选择不是偏好；它受操作数宽度、栈对齐和调用约定共同限制。
      </text>
      <rect
        x="28"
        y="94"
        width="704"
        height="52"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="126" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        位置
      </text>
      <text
        x="220"
        y="126"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        操作数/偏移
      </text>
      <text
        x="458"
        y="126"
        fontSize="14"
        fontWeight="700"
        fill={COLORS.primary}
      >
        责任
      </text>
      {rows.map(([label, operand, detail], index) => {
        const y = 160 + index * 56;
        const isError = broken && index === 1;
        return (
          <g key={label}>
            <rect
              x="28"
              y={y}
              width="704"
              height="44"
              rx="8"
              fill={isError ? COLORS.warning : COLORS.elevated}
              fillOpacity={isError ? 0.14 : 1}
              stroke={isError ? COLORS.warning : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="52"
              y={y + 28}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x="220" y={y + 28} fontSize="13" fill={COLORS.secondary}>
              {operand}
            </text>
            <text
              x="458"
              y={y + 28}
              fontSize="13"
              fill={isError ? COLORS.warning : COLORS.secondary}
            >
              {isError ? "4-byte 写入，未对齐" : detail}
            </text>
          </g>
        );
      })}
      <text
        x="28"
        y="394"
        fontSize="13"
        fill={broken ? COLORS.warning : COLORS.accent}
      >
        {broken
          ? "对齐失败：保留源位置并拒绝当前目标操作数。"
          : "边界样本通过：宽度、偏移和生命周期均有记录。"}
      </text>
    </g>
  );
}

function AbiView({ fault }: { fault: Fault }) {
  const broken = fault === "x64";
  const checks = [
    ["as --32", "装配目标", broken ? "默认 ELF64" : "ELF32 / i386"],
    ["objdump", "指令与宽度", broken ? "RAX / qword" : "EAX / dword"],
    ["readelf -h", "格式证据", broken ? "Class: ELF64" : "Class: ELF32"],
  ] as const;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        工具与 ABI：目标参数必须可追踪
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        as、objdump 和 readelf 分别提供装配、编码和目标格式证据。
      </text>
      {checks.map(([tool, label, detail], index) => {
        const x = 28 + index * 236;
        return (
          <g key={tool}>
            <rect
              x={x}
              y="106"
              width="208"
              height="142"
              rx="12"
              fill={broken ? COLORS.warning : COLORS.success}
              fillOpacity="0.12"
              stroke={broken ? COLORS.warning : COLORS.success}
              strokeWidth="2"
            />
            <text
              x={x + 20}
              y="142"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {tool}
            </text>
            <text x={x + 20} y="176" fontSize="13" fill={COLORS.secondary}>
              {label}
            </text>
            <text
              x={x + 20}
              y="210"
              fontSize="13"
              fill={broken ? COLORS.warning : COLORS.success}
            >
              {detail}
            </text>
            {index < checks.length - 1 && (
              <line
                x1={x + 208}
                y1="176"
                x2={x + 228}
                y2="176"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-x86-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="282"
        width="704"
        height="70"
        rx="12"
        fill={broken ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="52" y="312" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {broken
          ? "ABI mismatch：stop before link"
          : "IA-32 target contract：width + format + ABI aligned"}
      </text>
      <text
        x="52"
        y="336"
        fontSize="13"
        fill={broken ? COLORS.warning : COLORS.success}
      >
        {broken
          ? "记录 host default，不得把 ELF64 结果当成 IA-32 证据。"
          : "可继续核对栈对齐、寄存器保存责任和链接参数。"}
      </text>
      <text x="28" y="394" fontSize="13" fill={COLORS.accent}>
        反汇编通过不等于 ABI 合同自动通过。
      </text>
    </g>
  );
}

/** 第12章专属实验：回放 IA-32 宽度、存放位置与目标 ABI。 */
export function CrcX86OverviewLab() {
  const [view, setView] = useState<View>("boundary");
  const [sample, setSample] = useState<Sample>("dword");
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
    setView("boundary");
    setSample("dword");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第12章 x86 架构概要专属 IA-32 宽度、存放与 ABI 实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-12"
      data-visual-kind="crc-x86-overview-ia32-contract-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcX86OverviewLab · IA-32 宽度、存放与 ABI
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把主机默认值隔离在目标边界之外
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：`as` 装配成功后，哪一份证据能确认结果仍是 IA-32？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择 x86 架构实验视角"
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
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择 IA-32 数据宽度样本"
        >
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
          aria-label="选择 x86 架构故障模式"
        >
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            IA-32 正常
          </ViewButton>
          <ViewButton active={fault === "x64"} onClick={() => setFault("x64")}>
            x86-64 漂移
          </ViewButton>
          <ViewButton
            active={fault === "width"}
            onClick={() => setFault("width")}
          >
            宽度/对齐错误
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
                id="crc-x86-arrow"
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
                status="C♭ 类型"
                x={28}
                refCallback={(element) => {
                  stageRefs.current.source = element;
                }}
              />
              <Stage
                label="width"
                status="宽度/对齐"
                x={174}
                refCallback={(element) => {
                  stageRefs.current.width = element;
                }}
              />
              <Stage
                label="storage"
                status="寄存器/栈"
                x={320}
                refCallback={(element) => {
                  stageRefs.current.storage = element;
                }}
              />
              <Stage
                label="abi"
                status="目标合同"
                x={466}
                refCallback={(element) => {
                  stageRefs.current.abi = element;
                }}
              />
              <Stage
                label="verify"
                status="字节/格式"
                x={612}
                refCallback={(element) => {
                  stageRefs.current.verify = element;
                }}
              />
            </g>
            {view === "boundary" ? (
              <BoundaryView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
              />
            ) : view === "storage" ? (
              <StorageView fault={fault} sample={sample} />
            ) : (
              <AbiView fault={fault} />
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
          caption="单步查看 source、width、storage、abi 和 verify；重置后用同一输入重放，确认 IA-32 目标契约没有被主机默认值污染。"
          reset={{
            label: "重置 x86 架构实验",
            ariaLabel: "重置 x86 架构概要专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
