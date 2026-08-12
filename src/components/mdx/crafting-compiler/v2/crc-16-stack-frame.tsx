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

type View = "layout" | "offsets" | "prologue";
type Sample = "fixed" | "temps" | "alloca";
type Fault = "none" | "overlap" | "dynamic";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "layout",
    label: "帧布局",
    detail: "沿操作栈、参数、局部与临时槽展开不重叠的布局表。",
  },
  {
    id: "offsets",
    label: "偏移重算",
    detail: "比较固定槽、虚拟栈临时量和 alloca 对偏移/对齐的影响。",
  },
  {
    id: "prologue",
    label: "序言尾声",
    detail: "回放 ESP/EBP、空间预留、动态分配与每条返回路径。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  object: string;
  size: string;
  offset: string;
  signal: string;
}[] = [
  {
    id: "fixed",
    label: "固定局部",
    object: "params + locals",
    size: "16 bytes",
    offset: "[ebp+8] / [ebp-4]",
    signal: "fixed slots",
  },
  {
    id: "temps",
    label: "虚拟临时",
    object: "temps × 2",
    size: "24 bytes",
    offset: "[ebp-8] / [ebp-12]",
    signal: "virtual depth",
  },
  {
    id: "alloca",
    label: "动态 alloca",
    object: "alloca(n)",
    size: "n bytes, aligned",
    offset: "EBP stable / ESP dynamic",
    signal: "dynamic depth",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "读取帧对象和目标 ABI。" },
  { label: "reserve", caption: "计算大小、对齐与槽位。" },
  { label: "offsets", caption: "重算固定或动态偏移。" },
  { label: "prologue", caption: "生成序言与尾声。" },
  { label: "verify", caption: "用哨兵和 ESP 快照验收。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第16章 分配栈帧",
  "16.1 操作栈",
  "16.2 参数和局部变量的内存分配",
  "16.3 利用虚拟栈分配临时变量",
  "16.4 调整栈访问的偏移量",
  "16.5 生成函数序言和尾声",
  "16.6 alloca函数的实现",
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

function LayoutView({
  activeStep,
  fault,
  sample,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const overlapFault = fault === "overlap";
  const rows = [
    ["[ebp+12]", "arg1", "parameter", "4B"],
    ["[ebp+8]", "arg0", "parameter", "4B"],
    ["[ebp]", "saved ebp", "prologue", "4B"],
    ["[ebp-4]", "local", "local", "4B"],
    [
      "[ebp-8]",
      selected.id === "temps" ? "temp0" : "sentinel",
      "temporary",
      "4B",
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        帧布局：每个槽都有所有者和边界
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        操作栈按地址展示，参数、保存区、局部与临时量不能重叠。
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
        EBP 偏移
      </text>
      <text
        x="180"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        对象
      </text>
      <text
        x="360"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        所有者
      </text>
      <text
        x="548"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        宽度
      </text>
      {rows.map(([offset, object, owner, width], index) => {
        const y = 146 + index * 42;
        const active = activeStep >= Math.min(index + 1, 4);
        const error = overlapFault && index === rows.length - 1;
        return (
          <g key={offset} opacity={active ? 1 : 0.5}>
            <rect
              x="28"
              y={y}
              width="704"
              height="32"
              rx="7"
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
              y={y + 22}
              fontSize="13"
              fontWeight="700"
              fill={error ? COLORS.warning : COLORS.primary}
            >
              {offset}
            </text>
            <text
              x="180"
              y={y + 22}
              fontSize="13"
              fill={error ? COLORS.warning : COLORS.secondary}
            >
              {error ? "temp0 overlaps local" : object}
            </text>
            <text x="360" y={y + 22} fontSize="13" fill={COLORS.secondary}>
              {owner}
            </text>
            <text x="548" y={y + 22} fontSize="13" fill={COLORS.secondary}>
              {width}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="374"
        width="704"
        height="20"
        rx="7"
        fill={overlapFault ? COLORS.warning : COLORS.accent}
        fillOpacity="0.12"
      />
      <text
        x="48"
        y="389"
        fontSize="13"
        fill={overlapFault ? COLORS.warning : COLORS.accent}
      >
        {overlapFault
          ? "哨兵被覆盖：重新计算槽位区间、对齐和虚拟栈深度。"
          : `当前布局：${selected.object} · ${selected.size} · signal=${selected.signal}`}
      </text>
    </g>
  );
}

function OffsetsView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const dynamicFault = fault === "dynamic";
  const rows = [
    ["参数", "EBP + 8", "4", "ABI 固定"],
    ["局部", "EBP - 4", "4", "当前帧"],
    [
      "临时",
      selected.id === "temps" ? "EBP - 8/-12" : "按虚拟深度",
      "8",
      "生命周期",
    ],
    ["alloca", dynamicFault ? "旧 ESP - n" : "当前 ESP - n", "n", "运行时"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        偏移重算：固定基准与动态深度
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        增加临时量或 alloca 后，访问表达式必须引用同一版布局状态。
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
        对象
      </text>
      <text
        x="174"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        访问基准
      </text>
      <text
        x="372"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        大小
      </text>
      <text
        x="500"
        y="117"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        更新信号
      </text>
      {rows.map(([object, offset, size, signal], index) => {
        const y = 146 + index * 52;
        const error = dynamicFault && object === "alloca";
        return (
          <g key={object}>
            <rect
              x="28"
              y={y}
              width="704"
              height="38"
              rx="8"
              fill={error ? COLORS.warning : COLORS.elevated}
              fillOpacity={error ? 0.14 : 1}
              stroke={error ? COLORS.warning : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 25}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {object}
            </text>
            <text
              x="174"
              y={y + 25}
              fontSize="13"
              fill={error ? COLORS.warning : COLORS.secondary}
            >
              {error ? "旧 ESP 偏移" : offset}
            </text>
            <text x="372" y={y + 25} fontSize="13" fill={COLORS.secondary}>
              {size}
            </text>
            <text
              x="500"
              y={y + 25}
              fontSize="13"
              fill={error ? COLORS.warning : COLORS.secondary}
            >
              {error ? "未重算" : signal}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="362"
        width="704"
        height="32"
        rx="8"
        fill={dynamicFault ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={dynamicFault ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="48"
        y="384"
        fontSize="13"
        fontWeight="700"
        fill={dynamicFault ? COLORS.warning : COLORS.success}
      >
        {dynamicFault
          ? "动态栈错误：alloca 后局部访问仍使用旧 ESP 基准"
          : `偏移表通过：${selected.offset} · 对齐与生命周期已记录`}
      </text>
    </g>
  );
}

function PrologueView({ fault }: { fault: Fault }) {
  const dynamicFault = fault === "dynamic";
  const events = [
    ["entry", "ESP=0x1000", "返回地址已入栈", COLORS.accent],
    ["prologue", "push ebp; mov ebp, esp", "建立固定基准", COLORS.warning],
    [
      "reserve",
      dynamicFault ? "sub esp, n" : "sub esp, 16",
      dynamicFault ? "运行时空间" : "局部/临时空间",
      dynamicFault ? COLORS.warning : COLORS.success,
    ],
    [
      "epilogue",
      dynamicFault ? "leave; ret?" : "add esp, 16; pop ebp; ret",
      dynamicFault ? "恢复路径缺少动态深度" : "ESP 恢复到入口",
      dynamicFault ? COLORS.warning : COLORS.success,
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        序言尾声：每条返回路径闭合栈状态
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        固定帧和动态帧都要让 ESP、EBP、哨兵与返回地址同时恢复。
      </text>
      {events.map(([label, register, detail, color], index) => {
        const x = 28 + index * 176;
        return (
          <g key={label}>
            <rect
              x={x}
              y="94"
              width="156"
              height="144"
              rx="12"
              fill={color}
              fillOpacity="0.12"
              stroke={color}
              strokeWidth="2"
            />
            <text
              x={x + 16}
              y="126"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 16} y="162" fontSize="13" fill={color}>
              {register}
            </text>
            <text x={x + 16} y="198" fontSize="13" fill={COLORS.secondary}>
              {detail}
            </text>
            {index < events.length - 1 && (
              <line
                x1={x + 156}
                y1="166"
                x2={x + 172}
                y2="166"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-stack-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="268"
        width="704"
        height="66"
        rx="12"
        fill={dynamicFault ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={dynamicFault ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="50" y="298" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {dynamicFault
          ? "alloca 故障：返回前没有恢复动态空间，ESP 与哨兵不一致"
          : "恢复通过：固定/动态空间、保存区和返回地址均有配对动作"}
      </text>
      <text
        x="50"
        y="322"
        fontSize="13"
        fill={dynamicFault ? COLORS.warning : COLORS.success}
      >
        {dynamicFault
          ? "沿 gdb 的入口、分配后和返回前快照回到动态偏移计算。"
          : "可继续比较 objdump 与清理重建后的相同序列。"}
      </text>
      <text x="28" y="374" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        objdump -drwC frame.o → gdb --batch -x stack.gdb ./frame
      </text>
      <text x="28" y="397" fontSize="13" fill={COLORS.accent}>
        静态序言/尾声与运行时 ESP/EBP 必须描述同一个布局。
      </text>
    </g>
  );
}

/** 第16章专属实验：回放栈帧布局、偏移重算和动态恢复路径。 */
export function Crc16StackFrameLab() {
  const [view, setView] = useState<View>("layout");
  const [sample, setSample] = useState<Sample>("fixed");
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
    setView("layout");
    setSample("fixed");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第16章 分配栈帧专属栈帧布局实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-16"
      data-visual-kind="crc-stack-frame-layout-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Crc16StackFrameLab · 栈帧布局计算台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让动态栈变化也能回到同一张布局表
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：加入 `alloca` 后，哪个证据最先说明旧偏移已经失效？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择栈帧实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择栈帧对象样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择栈帧故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常布局
          </ViewButton>
          <ViewButton
            active={fault === "overlap"}
            onClick={() => setFault("overlap")}
          >
            槽位重叠
          </ViewButton>
          <ViewButton
            active={fault === "dynamic"}
            onClick={() => setFault("dynamic")}
          >
            动态偏移错误
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
                id="crc-stack-arrow"
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
                status="帧对象"
                x={28}
                refCallback={(element) => {
                  stageRefs.current.source = element;
                }}
              />
              <Stage
                label="reserve"
                status="大小/对齐"
                x={174}
                refCallback={(element) => {
                  stageRefs.current.reserve = element;
                }}
              />
              <Stage
                label="offsets"
                status="偏移表"
                x={320}
                refCallback={(element) => {
                  stageRefs.current.offsets = element;
                }}
              />
              <Stage
                label="prologue"
                status="序言/尾声"
                x={466}
                refCallback={(element) => {
                  stageRefs.current.prologue = element;
                }}
              />
              <Stage
                label="verify"
                status="哨兵/ESP"
                x={612}
                refCallback={(element) => {
                  stageRefs.current.verify = element;
                }}
              />
            </g>
            {view === "layout" ? (
              <LayoutView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
              />
            ) : view === "offsets" ? (
              <OffsetsView fault={fault} sample={sample} />
            ) : (
              <PrologueView fault={fault} />
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
          caption="单步查看 source、reserve、offsets、prologue 和 verify；重置后用同一输入重放，确认栈帧布局与恢复路径没有漂移。"
          reset={{
            label: "重置栈帧实验",
            ariaLabel: "重置分配栈帧专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
