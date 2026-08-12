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

type View = "reference" | "tables" | "binding" | "bases";
type Sample = "global" | "function" | "mixed";
type Fault = "none" | "absolute" | "provider";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "reference",
    label: "引用链",
    detail: "从源码全局变量/函数引用追到 PIC 指令和动态入口。",
  },
  {
    id: "tables",
    label: "GOT/PLT",
    detail: "比较数据槽、函数跳板和待修补重定位。",
  },
  {
    id: "binding",
    label: "动态绑定",
    detail: "回放加载器搜索、绑定提供者和首次调用后的槽状态。",
  },
  {
    id: "bases",
    label: "双基址",
    detail: "比较两个装载基址下的代码、槽值和返回结果。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  source: string;
  entry: string;
  relocation: string;
  result: string;
}[] = [
  {
    id: "global",
    label: "全局变量",
    source: "load shared",
    entry: "GOT[shared]",
    relocation: "R_386_GLOB_DAT",
    result: "same code / diff slot",
  },
  {
    id: "function",
    label: "外部函数",
    source: "call helper",
    entry: "PLT[helper]",
    relocation: "R_386_JMP_SLOT",
    result: "same code / bound target",
  },
  {
    id: "mixed",
    label: "变量+函数",
    source: "read + call",
    entry: "GOT + PLT",
    relocation: "two entries",
    result: "both stable",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "固定源码引用和目标 ABI。" },
  { label: "pic", caption: "生成相对或间接引用。" },
  { label: "tables", caption: "定位 GOT、PLT 和重定位。" },
  { label: "bind", caption: "追踪动态提供者和槽值。" },
  { label: "bases", caption: "双基址运行并清理重建。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第21章 生成地址无关代码",
  "21.1 地址无关代码",
  "21.2 全局变量引用的实现",
  "21.3 链接器调用的实现",
  "21.4 从程序解析到执行",
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

function PipelineStage({
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

function ReferenceView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "absolute";
  const stages = [
    ["source", selected.source, COLORS.accent],
    [
      "PIC asm",
      broken ? "mov abs, shared" : "load via table",
      broken ? COLORS.danger : COLORS.warning,
    ],
    ["entry", selected.entry, COLORS.warning],
    ["runtime", selected.result, broken ? COLORS.danger : COLORS.success],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        引用链：把地址依赖放到合法入口
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · {selected.source} ·
        代码段应保持可共享，运行时槽值可以随基址变化。
      </text>
      {stages.map(([label, detail, color], index) => {
        const x = 28 + index * 176;
        return (
          <g key={label}>
            <rect
              x={x}
              y="100"
              width="156"
              height="126"
              rx="12"
              fill={color}
              fillOpacity="0.12"
              stroke={color}
              strokeWidth="2"
            />
            <text
              x={x + 16}
              y="132"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 16} y="168" fontSize="13" fill={color}>
              {detail}
            </text>
            <text x={x + 16} y="202" fontSize="13" fill={COLORS.secondary}>
              {index === 0
                ? "symbol ref"
                : index === 1
                  ? broken
                    ? "absolute"
                    : "indirect"
                  : index === 2
                    ? selected.relocation
                    : broken
                      ? "fault"
                      : "reusable"}
            </text>
            {index < stages.length - 1 && (
              <line
                x1={x + 156}
                y1="163"
                x2={x + 172}
                y2="163"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-pic-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="270"
        width="704"
        height="62"
        rx="12"
        fill={broken ? COLORS.danger : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.danger : COLORS.success}
        strokeWidth="2"
      />
      <text x="50" y="298" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {broken
          ? "绝对引用泄漏：换基址时文本段必须被改写"
          : "引用通过：代码保持共享，变化地址留在 GOT/PLT 或重定位槽"}
      </text>
      <text
        x="50"
        y="322"
        fontSize="13"
        fill={broken ? COLORS.danger : COLORS.success}
      >
        {broken
          ? "保留指令、重定位和最小运行输入，先改为合法 PIC 路径。"
          : `entry=${selected.entry} · relocation=${selected.relocation}`}
      </text>
      <text x="28" y="378" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        source → PIC asm → GOT/PLT → runtime address
      </text>
      <text x="28" y="400" fontSize="13" fill={COLORS.accent}>
        判断 PIC 要比较两个装载基址，而不是只看一次启动。
      </text>
    </g>
  );
}

function TablesView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "absolute";
  const rows = [
    [
      "GOT",
      selected.id === "function" ? "—" : "shared",
      selected.id === "function" ? "none" : "R_386_GLOB_DAT",
    ],
    [
      "PLT",
      selected.id === "global" ? "—" : "helper",
      selected.id === "global" ? "none" : "R_386_JMP_SLOT",
    ],
    [
      "text reloc",
      broken ? "present" : "none",
      broken ? "reject" : "shareable",
    ],
    ["code bytes", broken ? "base-specific" : "same at A/B", "compare"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        GOT/PLT：数据槽与函数入口各负其责
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · readelf -r -d / objdump -drwC · 先看表项，再看绑定。
      </text>
      <rect
        x="28"
        y="88"
        width="704"
        height="48"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="48" y="118" fontSize="13" fontWeight="700" fill={COLORS.primary}>
        入口
      </text>
      <text
        x="240"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        目标
      </text>
      <text
        x="500"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        重定位/判定
      </text>
      {rows.map(([entry, target, signal], index) => {
        const y = 148 + index * 52;
        const warning =
          broken && (entry === "text reloc" || entry === "code bytes");
        return (
          <g key={entry}>
            <rect
              x="28"
              y={y}
              width="704"
              height="36"
              rx="8"
              fill={warning ? COLORS.warning : COLORS.elevated}
              fillOpacity={warning ? 0.14 : 1}
              stroke={warning ? COLORS.warning : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 24}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {entry}
            </text>
            <text
              x="240"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {target}
            </text>
            <text
              x="500"
              y={y + 24}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {signal}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="350"
        width="704"
        height="44"
        rx="9"
        fill={broken ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="48"
        y="378"
        fontSize="13"
        fontWeight="700"
        fill={broken ? COLORS.warning : COLORS.success}
      >
        {broken
          ? "表项异常：文本重定位会破坏共享性，停止进入动态绑定"
          : "表项通过：GOT 承担数据地址，PLT 承担外部函数入口"}
      </text>
    </g>
  );
}

function BindingView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "provider";
  const rows = [
    ["lookup", selected.entry, "symbol search"],
    ["provider", broken ? "wrong-lib" : "libcalc.so", "LD_DEBUG=bindings"],
    [
      "slot",
      selected.id === "global" ? "GOT[shared]" : "GOT[helper]",
      broken ? "stale" : "patched",
    ],
    [
      "call",
      selected.id === "global" ? "load" : "PLT → target",
      broken ? "mismatch" : "resolved",
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        动态绑定：从提供者到槽值
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · LD_DEBUG=bindings · 绑定日志解释首次调用和后续跳转。
      </text>
      {rows.map(([phase, result, evidence], index) => {
        const y = 92 + index * 62;
        const warning = broken && (phase === "provider" || phase === "call");
        return (
          <g key={phase}>
            <rect
              x="28"
              y={y}
              width="704"
              height="44"
              rx="9"
              fill={warning ? COLORS.danger : COLORS.elevated}
              fillOpacity={warning ? 0.14 : 1}
              stroke={warning ? COLORS.danger : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 28}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {phase}
            </text>
            <text
              x="240"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.danger : COLORS.secondary}
            >
              {result}
            </text>
            <text
              x="520"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.danger : COLORS.accent}
            >
              {evidence}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="350"
        width="704"
        height="44"
        rx="9"
        fill={broken ? COLORS.danger : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.danger : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="48"
        y="378"
        fontSize="13"
        fontWeight="700"
        fill={broken ? COLORS.danger : COLORS.success}
      >
        {broken
          ? "提供者错误：保留符号版本、搜索顺序和绑定日志"
          : "绑定通过：提供者、槽值和调用目标相互一致"}
      </text>
    </g>
  );
}

function BasesView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const broken = fault === "absolute";
  const rows = [
    ["base A", "0x70000000", broken ? "code changed" : "code same", "run-1"],
    ["base B", "0x71000000", broken ? "text reloc" : "code same", "run-2"],
    [
      "GOT/PLT",
      selected.entry,
      broken ? "absolute" : "slot differs",
      "compare",
    ],
    ["result", selected.result, broken ? "fail" : "same output", "regress"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        双基址：代码可共享，运行时地址可变化
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · 两个装载基址、同一输入和清理重建组成 PIC 证据。
      </text>
      {rows.map(([base, address, code, evidence], index) => {
        const y = 92 + index * 62;
        const warning =
          broken &&
          (base === "base A" || base === "base B" || base === "result");
        return (
          <g key={base}>
            <rect
              x="28"
              y={y}
              width="704"
              height="44"
              rx="9"
              fill={warning ? COLORS.warning : COLORS.elevated}
              fillOpacity={warning ? 0.14 : 1}
              stroke={warning ? COLORS.warning : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 28}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {base}
            </text>
            <text x="220" y={y + 28} fontSize="13" fill={COLORS.secondary}>
              {address}
            </text>
            <text
              x="440"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.accent}
            >
              {code}
            </text>
            <text
              x="600"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {evidence}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="350"
        width="704"
        height="44"
        rx="9"
        fill={broken ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="48"
        y="378"
        fontSize="13"
        fontWeight="700"
        fill={broken ? COLORS.warning : COLORS.success}
      >
        {broken
          ? "双基址失败：固定地址泄漏，先检查文本重定位"
          : "双基址通过：代码字节不随基址改写，槽值按实例变化"}
      </text>
    </g>
  );
}

/** 第21章专属实验：回放 PIC、GOT/PLT、重定位和动态绑定。 */
export function Crc21PositionIndependentCodeLab() {
  const [view, setView] = useState<View>("reference");
  const [sample, setSample] = useState<Sample>("global");
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
    setView("reference");
    setSample("global");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第21章 生成地址无关代码专属 PIC/GOT/PLT 重定位实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-21"
      data-visual-kind="crc-pic-got-plt-relocation-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Crc21PositionIndependentCodeLab · PIC/GOT/PLT 重定位台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让代码在换基址后仍保持同一条引用链
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：两个装载基址下，哪些字节必须相同，哪些槽值允许不同？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择 PIC 实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择 PIC 引用样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择 PIC 故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常 PIC
          </ViewButton>
          <ViewButton
            active={fault === "absolute"}
            onClick={() => setFault("absolute")}
          >
            绝对引用
          </ViewButton>
          <ViewButton
            active={fault === "provider"}
            onClick={() => setFault("provider")}
          >
            错误提供者
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
                id="crc-pic-arrow"
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
              {STEPS.map((step, index) => (
                <PipelineStage
                  key={step.label}
                  label={`T${index}`}
                  status={step.label}
                  x={28 + index * 146}
                  refCallback={(element) => {
                    stageRefs.current[step.label] = element;
                  }}
                />
              ))}
            </g>
            {view === "reference" ? (
              <ReferenceView fault={fault} sample={sample} />
            ) : view === "tables" ? (
              <TablesView fault={fault} sample={sample} />
            ) : view === "binding" ? (
              <BindingView fault={fault} sample={sample} />
            ) : (
              <BasesView fault={fault} sample={sample} />
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
          caption="单步查看 source、pic、tables、bind 和 bases；重置后用同一引用样本重放，确认代码共享性与动态绑定没有漂移。"
          reset={{
            label: "重置 PIC 实验",
            ariaLabel: "重置生成地址无关代码专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
