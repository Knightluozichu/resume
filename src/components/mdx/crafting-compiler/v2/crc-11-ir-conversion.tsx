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

type View = "pipeline" | "control" | "effects";
type Sample = "pure" | "lvalue" | "effect";
type Fault = "none" | "duplicate" | "target";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "pipeline",
    label: "IR 流水线",
    detail: "沿 typed AST、地址/值、标签和安全副作用 IR 展开转换。",
  },
  {
    id: "control",
    label: "控制流标签",
    detail: "检查分支和循环的标签定义、引用与跳转顺序。",
  },
  {
    id: "effects",
    label: "副作用序列",
    detail: "比较纯值、左值和副作用表达式的事件次数与地址复用。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  code: string;
  shape: string;
  signal: string;
}[] = [
  {
    id: "pure",
    label: "纯值",
    code: "count + 1",
    shape: "LOAD → ADD → temp",
    signal: "side effects = 0",
  },
  {
    id: "lvalue",
    label: "左值",
    code: "slot += 1",
    shape: "addr0 → LOAD → ADD → STORE",
    signal: "address reused = 1",
  },
  {
    id: "effect",
    label: "副作用",
    code: "a[i++] += 1",
    shape: "addr0 → LOAD → STORE + i++",
    signal: "events = 1 each",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "ast", caption: "读取已类型检查的 AST。" },
  { label: "lower", caption: "拆分地址、值和临时量。" },
  { label: "control", caption: "分配并闭合控制流标签。" },
  { label: "order", caption: "保留副作用和求值顺序。" },
  { label: "verify", caption: "输出 IR 差分包与解释结果。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第11章 中间代码的转换",
  "11.1 cbc的中间代码",
  "11.2 IRGenerator类的概要",
  "11.3 流程控制语句的转换",
  "11.4 没有副作用的表达式的转换",
  "11.5 左值的转换",
  "11.6 存在副作用的表达式的转换",
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
  const broken = fault !== "none";
  const cards = [
    ["typed AST", "类型和值类别", COLORS.accent],
    ["addresses", "地址与 LOAD", COLORS.warning],
    ["labels", "分支与循环", COLORS.success],
    ["safe IR", "顺序可解释", COLORS.accent],
  ] as const;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        typed AST → addresses/values → labels → side-effect-safe IR
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        IR 更接近执行顺序，但仍保留源跨度、值类别和副作用证据。
      </text>
      <rect
        x="28"
        y="92"
        width="704"
        height="170"
        rx="14"
        fill="var(--bg)"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {cards.map(([label, detail, color], index) => {
        const x = 44 + index * 174;
        const active = activeStep >= index;
        return (
          <g key={label} opacity={active ? 1 : 0.45}>
            <rect
              x={x}
              y="120"
              width="144"
              height="114"
              rx="12"
              fill={color}
              fillOpacity={active ? 0.14 : 0.05}
              stroke={active ? color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <circle
              cx={x + 24}
              cy="148"
              r="8"
              fill={active ? color : COLORS.border}
            />
            <text
              x={x + 42}
              y="153"
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 18} y="190" fontSize="13" fill={COLORS.secondary}>
              {detail}
            </text>
            <text x={x + 18} y="216" fontSize="13" fill={color}>
              {active ? "已记录" : "等待"}
            </text>
            {index < cards.length - 1 && (
              <line
                x1={x + 144}
                y1="176"
                x2={x + 166}
                y2="176"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-ir-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="292"
        width="704"
        height="72"
        rx="12"
        fill={broken ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="52" y="322" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        当前样本：{selected.code} · {selected.shape}
      </text>
      <text
        x="52"
        y="348"
        fontSize="13"
        fill={broken ? COLORS.warning : COLORS.success}
      >
        {broken
          ? fault === "duplicate"
            ? "地址被重复求值：IR 差分失败"
            : "跳转目标未闭合：IR 许可为否"
          : `${selected.signal} · 可进入解释执行`}
      </text>
      <text x="28" y="394" fontSize="13" fill={COLORS.accent}>
        每一步都保留输入节点与输出指令的对应关系。
      </text>
    </g>
  );
}

function ControlView({ fault }: { fault: Fault }) {
  const broken = fault === "target";
  const labels = [
    ["L_head", "条件入口", 44, COLORS.accent],
    ["L_body", "循环主体", 244, COLORS.success],
    ["L_exit", "退出目标", 444, COLORS.warning],
  ] as const;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        11.3 流程控制语句的转换：定义和引用必须闭合
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        while 的条件、主体和退出路径各有标签；短路右侧只在需要时生成。
      </text>
      {labels.map(([label, detail, x, color], index) => (
        <g key={label}>
          <rect
            x={x}
            y="112"
            width="164"
            height="108"
            rx="12"
            fill={color}
            fillOpacity="0.12"
            stroke={color}
            strokeWidth="2"
          />
          <text
            x={x + 20}
            y="146"
            fontSize="15"
            fontWeight="700"
            fill={COLORS.primary}
          >
            {label}
          </text>
          <text x={x + 20} y="176" fontSize="13" fill={COLORS.secondary}>
            {detail}
          </text>
          <text x={x + 20} y="202" fontSize="13" fill={color}>
            {broken && label === "L_exit" ? "undefined" : "defined"}
          </text>
          {index < labels.length - 1 && (
            <line
              x1={x + 164}
              y1="166"
              x2={x + 192}
              y2="166"
              stroke={COLORS.accent}
              strokeWidth="3"
              markerEnd="url(#crc-ir-arrow)"
            />
          )}
        </g>
      ))}
      <path
        d="M126 224 C126 274 326 274 326 224"
        fill="none"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#crc-ir-arrow)"
      />
      <rect
        x="28"
        y="306"
        width="704"
        height="62"
        rx="12"
        fill={broken ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={broken ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="52" y="336" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {broken
          ? "引用集合 - 定义集合 ≠ ∅：拒绝交给后端"
          : "标签定义集合 = 引用集合：控制流闭合，可解释执行"}
      </text>
      <text
        x="52"
        y="358"
        fontSize="13"
        fill={broken ? COLORS.warning : COLORS.success}
      >
        {broken
          ? "diagnostic E_LABEL_TARGET · exit=1"
          : "true → L_body · false → L_exit · body → L_head"}
      </text>
      <text x="28" y="394" fontSize="13" fill={COLORS.accent}>
        先核对标签集合，再核对最终返回值。
      </text>
    </g>
  );
}

function EffectsView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const duplicated = fault === "duplicate";
  const events =
    selected.id === "pure"
      ? ["LOAD count", "ADD 1", "RETURN temp"]
      : selected.id === "lvalue"
        ? ["ADDR slot", "LOAD old", "ADD 1", "STORE slot"]
        : ["ADDR a[i]", "LOAD old", "STORE new", "i++"];
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        11.4–11.6：用事件序列保护求值语义
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        左值保存地址，副作用保存次数；纯值也不能跳过语言规定的顺序。
      </text>
      <rect
        x="28"
        y="94"
        width="704"
        height="62"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="132" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        {selected.code} · {selected.signal}
      </text>
      <line
        x1="52"
        y1="206"
        x2="708"
        y2="206"
        stroke={COLORS.border}
        strokeWidth="2"
      />
      {events.map((event, index) => {
        const x = 54 + index * 164;
        const isError = duplicated && index === 1;
        return (
          <g key={`${event}-${index}`}>
            <circle
              cx={x}
              cy="206"
              r="16"
              fill={isError ? COLORS.warning : COLORS.accent}
            />
            <text
              x={x}
              y="211"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--bg)"
            >
              {index + 1}
            </text>
            <text
              x={x - 34}
              y="252"
              fontSize="13"
              fill={isError ? COLORS.warning : COLORS.secondary}
            >
              {isError ? `${event} × 2` : event}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="294"
        width="704"
        height="70"
        rx="12"
        fill={duplicated ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={duplicated ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="52" y="324" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {duplicated
          ? "副作用计数不一致：期望 1，实际 2"
          : "事件序列通过：地址只求一次，副作用计数稳定"}
      </text>
      <text
        x="52"
        y="348"
        fontSize="13"
        fill={duplicated ? COLORS.warning : COLORS.success}
      >
        {duplicated
          ? "IR 语义差分包标记重复求值"
          : "解释结果、退出码和 IR 指令顺序一致"}
      </text>
      <text x="28" y="394" fontSize="13" fill={COLORS.accent}>
        结果相同不代表事件序列相同。
      </text>
    </g>
  );
}

/** 第11章专属实验：回放 IR 顺序、控制流标签与副作用事件。 */
export function CrcIrConversionLab() {
  const [view, setView] = useState<View>("pipeline");
  const [sample, setSample] = useState<Sample>("effect");
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
    setSample("effect");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第11章中间代码转换专属顺序、控制流与副作用实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-11"
      data-visual-kind="crc-ir-conversion-order-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcIrConversionLab · 顺序、标签与副作用
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让 IR 的每条指令都能回到源语义
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：复合赋值降低时，应该复用地址临时量，还是重新生成左值表达式？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择 IR 转换实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择 IR 表达式样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择 IR 转换故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常转换
          </ViewButton>
          <ViewButton
            active={fault === "duplicate"}
            onClick={() => setFault("duplicate")}
          >
            重复求值
          </ViewButton>
          <ViewButton
            active={fault === "target"}
            onClick={() => setFault("target")}
          >
            悬空标签
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
                id="crc-ir-arrow"
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
                label="ast"
                status="类型节点"
                x={28}
                refCallback={(element) => {
                  stageRefs.current.ast = element;
                }}
              />
              <Stage
                label="lower"
                status="地址/值"
                x={174}
                refCallback={(element) => {
                  stageRefs.current.lower = element;
                }}
              />
              <Stage
                label="control"
                status="标签跳转"
                x={320}
                refCallback={(element) => {
                  stageRefs.current.control = element;
                }}
              />
              <Stage
                label="order"
                status="事件顺序"
                x={466}
                refCallback={(element) => {
                  stageRefs.current.order = element;
                }}
              />
              <Stage
                label="verify"
                status="差分包"
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
            ) : view === "control" ? (
              <ControlView fault={fault} />
            ) : (
              <EffectsView fault={fault} sample={sample} />
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
          caption="单步查看 ast、lower、control、order 和 verify；重置后用同一输入重放，确认标签、地址与副作用证据保持一致。"
          reset={{
            label: "重置 IR 转换实验",
            ariaLabel: "重置 IR 转换专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
