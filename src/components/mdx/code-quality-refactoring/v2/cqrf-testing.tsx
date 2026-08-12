"use client";

import { useMemo, useRef, useState, type MutableRefObject } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 760;
const VIEW_H = 410;
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

type View = "pyramid" | "aaa" | "tdd";
type Fault = "none" | "coverage" | "coupled";
type TddPhase = "red" | "green" | "refactor";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "pyramid",
    label: "测试金字塔",
    detail: "比较单元、集成与端到端测试的速度、边界和数量分配。",
  },
  {
    id: "aaa",
    label: "AAA 结构",
    detail: "把准备、执行和断言拆成可读的单一行为证据。",
  },
  {
    id: "tdd",
    label: "TDD 循环",
    detail: "沿红、绿、重构循环推进，让测试先定义行为再保护结构变化。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "arrange",
    caption: "准备最小输入与依赖，避免测试夹带无关环境状态。",
  },
  {
    label: "act",
    caption: "只执行一个核心行为，把失败位置留在被测动作附近。",
  },
  {
    label: "assert",
    caption: "断言可观察结果和关键不变量，不用实现细节锁死测试。",
  },
  {
    label: "refactor",
    caption: "保持测试绿色再整理生产代码，确认契约没有被破坏。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

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

function RangeControl({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  const safeValue = Number.isFinite(value) ? value : min;
  const display = Number.isInteger(safeValue)
    ? String(safeValue)
    : safeValue.toFixed(2);
  return (
    <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-primary">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={safeValue}
        onChange={(event) => {
          const next = Number(event.currentTarget.value);
          onChange(Number.isFinite(next) ? next : min);
        }}
        className="accent-accent"
      />
    </label>
  );
}

function Stage({
  active,
  label,
  refCallback,
  status,
  x,
  y,
}: {
  active: boolean;
  label: string;
  refCallback?: (element: SVGGElement | null) => void;
  status: string;
  x: number;
  y: number;
}) {
  return (
    <g ref={refCallback} opacity={active ? 1 : 0.36}>
      <rect
        x={x}
        y={y}
        width="154"
        height="94"
        rx="12"
        fill={COLORS.elevated}
        stroke={active ? COLORS.accent : COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 18}
        y={y + 28}
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 18} y={y + 59} fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function PyramidView({
  fault,
  unitShare,
}: {
  fault: Fault;
  unitShare: number;
}) {
  const unitHeight = 78 + unitShare * 30;
  const integrationHeight = 48 + (1 - unitShare) * 24;
  const e2eHeight = 34;
  const safe = fault === "none";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        测试金字塔：快反馈支撑慢反馈
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        底层测试数量多、反馈快；越靠近真实系统，成本和脆弱性越高。
      </text>
      <g transform="translate(46 92)">
        <polygon
          points="118,0 238,224 0,224"
          fill={COLORS.elevated}
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <line
          x1="30"
          y1="170"
          x2="206"
          y2="170"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <line
          x1="57"
          y1="116"
          x2="178"
          y2="116"
          stroke={COLORS.border}
          strokeWidth="2"
        />
        <text x="83" y="211" fontSize="13" fill={COLORS.success}>
          单元 · 快
        </text>
        <text x="76" y="151" fontSize="13" fill={COLORS.accent}>
          集成 · 中
        </text>
        <text x="74" y="91" fontSize="13" fill={COLORS.warning}>
          端到端 · 慢
        </text>
        <rect
          x="252"
          y={224 - unitHeight}
          width="12"
          height={unitHeight}
          rx="6"
          fill={safe ? COLORS.success : COLORS.warning}
          fillOpacity="0.82"
        />
        <rect
          x="272"
          y={224 - integrationHeight - e2eHeight}
          width="12"
          height={integrationHeight}
          rx="6"
          fill={COLORS.accent}
          fillOpacity="0.82"
        />
        <rect
          x="292"
          y="0"
          width="12"
          height={e2eHeight}
          rx="6"
          fill={COLORS.warning}
          fillOpacity="0.82"
        />
      </g>
      <rect
        x="404"
        y="96"
        width="312"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={safe ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="428"
        y="130"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前分配：单元 {unitShare.toFixed(2)}
      </text>
      <text x="428" y="176" fontSize="13" fill={COLORS.secondary}>
        {fault === "coverage"
          ? "覆盖率高，但关键边界仍未验证"
          : fault === "coupled"
            ? "测试层级正确，夹具却互相依赖"
            : "快速测试守住局部行为，慢测试补协作证据"}
      </text>
      <text
        x="428"
        y="236"
        fontSize="13"
        fill={safe ? COLORS.success : COLORS.warning}
      >
        {safe ? "反馈成本与证据范围相匹配" : "先找到缺失的行为证据"}
      </text>
      <text x="428" y="282" fontSize="13" fill={COLORS.secondary}>
        金字塔不是固定比例，而是风险与反馈的取舍。
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        预测：把慢测试全部搬到塔底，反馈会更快还是证据会变窄？
      </text>
    </g>
  );
}

function AaaView({
  assertionCount,
  fault,
  step,
}: {
  assertionCount: number;
  fault: Fault;
  step: number;
}) {
  const clean = fault === "none" && assertionCount <= 2;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        AAA：准备、执行、断言各自说明一个行为
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        测试应该让失败位置可读，而不是把多个场景、动作和结果揉成一团。
      </text>
      <Stage
        active={step >= 0}
        label="Arrange"
        status="输入与依赖"
        x={28}
        y={96}
      />
      <line
        x1="182"
        y1="143"
        x2="216"
        y2="143"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-testing-arrow)"
      />
      <Stage active={step >= 1} label="Act" status="一个行为" x={230} y={96} />
      <line
        x1="384"
        y1="143"
        x2="418"
        y2="143"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-testing-arrow)"
      />
      <Stage
        active={step >= 2}
        label="Assert"
        status={
          fault === "coverage" ? "漏掉边界" : `${assertionCount} 个核心断言`
        }
        x={432}
        y={96}
      />
      <line
        x1="586"
        y1="143"
        x2="620"
        y2="143"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-testing-arrow)"
      />
      <Stage
        active={step >= 3}
        label="复核"
        status={clean ? "可安全整理" : "先缩小测试"}
        x={634}
        y={96}
      />
      <rect
        x="28"
        y="230"
        width="326"
        height="106"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="50" y="260" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前测试切片
      </text>
      <text x="50" y="298" fontSize="13" fill={COLORS.secondary}>
        {fault === "coupled"
          ? "三个场景共用同一夹具"
          : "一个购物车，验证一次折扣行为"}
      </text>
      <text x="50" y="326" fontSize="13" fill={COLORS.secondary}>
        核心断言数：{assertionCount}
      </text>
      <rect
        x="378"
        y="230"
        width="338"
        height="106"
        rx="12"
        fill={COLORS.elevated}
        stroke={clean ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="402"
        y="260"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前检查点：第 {step + 1} 步
      </text>
      <text
        x="402"
        y="298"
        fontSize="13"
        fill={clean ? COLORS.success : COLORS.warning}
      >
        {fault === "coverage"
          ? "高覆盖率不能替代关键边界断言。"
          : fault === "coupled"
            ? "夹具耦合让单测无法独立运行。"
            : "失败时可以定位到准备、执行或断言。"}
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        动手试：增加断言数量后，测试是在变强还是在一次测试里承担太多行为？
      </text>
    </g>
  );
}

function TddView({ phase, fault }: { phase: TddPhase; fault: Fault }) {
  const states: readonly { id: TddPhase; label: string; detail: string }[] = [
    { id: "red", label: "红", detail: "先写出当前行为的失败例子" },
    { id: "green", label: "绿", detail: "用最少实现满足可观察契约" },
    { id: "refactor", label: "重构", detail: "保持绿色，改善结构与命名" },
  ];
  const selected = states.find((item) => item.id === phase) ?? states[0];
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        TDD：红、绿、重构让反馈先于设计扩张
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        每轮只增加一个行为证据；重构发生在绿色保护下，而不是没有反馈时大改结构。
      </text>
      <rect
        x="28"
        y="98"
        width="326"
        height="218"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="132" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        循环状态
      </text>
      {states.map((item, index) => {
        const active = item.id === phase;
        return (
          <g key={item.id}>
            <circle
              cx="62"
              cy={170 + index * 42}
              r="7"
              fill={active ? COLORS.accent : COLORS.border}
            />
            <text
              x="82"
              y={175 + index * 42}
              fontSize="13"
              fill={active ? COLORS.primary : COLORS.secondary}
            >
              {item.label}
            </text>
          </g>
        );
      })}
      <text x="52" y="282" fontSize="13" fill={COLORS.secondary}>
        失败测试先说明缺少什么行为。
      </text>
      <line
        x1="356"
        y1="206"
        x2="414"
        y2="206"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-testing-arrow)"
      />
      <rect
        x="436"
        y="98"
        width="280"
        height="218"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="460"
        y="132"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前阶段：{selected.label}
      </text>
      <text x="460" y="180" fontSize="13" fill={COLORS.secondary}>
        {selected.detail}
      </text>
      <text
        x="460"
        y="238"
        fontSize="13"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        {fault === "coverage"
          ? "不要让覆盖率数字替代行为选择。"
          : fault === "coupled"
            ? "先拆独立夹具，再进入下一轮。"
            : "下一步由当前失败或契约决定。"}
      </text>
      <text x="460" y="280" fontSize="13" fill={COLORS.secondary}>
        重置后从红阶段重新预测。
      </text>
      <text x="28" y="370" fontSize="13" fill={COLORS.accent}>
        先猜一猜：没有红阶段就直接写代码，重构时少了哪一份证据？
      </text>
    </g>
  );
}

/** 单元测试专属实验：比较测试分层、AAA 证据与 TDD 反馈循环。 */
export function CqrfTestingLab() {
  const [view, setView] = useState<View>("pyramid");
  const [unitShare, setUnitShare] = useState(0.72);
  const [assertionCount, setAssertionCount] = useState(1);
  const [phase, setPhase] = useState<TddPhase>("red");
  const [fault, setFault] = useState<Fault>("none");
  const nodeRefs = useRef<Record<string, SVGGElement | null>>({});
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = nodeRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.36, 1],
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
    setView("pyramid");
    setUnitShare(0.72);
    setAssertionCount(1);
    setPhase("red");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="单元测试专属测试金字塔、AAA 与 TDD 实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="codequalityrefactoring-06"
      data-visual-kind="cqrf-testing-feedback"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 TestingFeedbackLab · 分层、AAA 与 TDD
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让测试成为可定位、可重放的安全网
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：测试变多后，反馈速度、证据范围和失败定位会怎样变化？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择单元测试实验视角">
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
        <div className="flex flex-wrap gap-4 rounded-card border border-border bg-background p-4">
          <RangeControl
            label="单元测试占比"
            min={0.1}
            max={1}
            step={0.01}
            value={unitShare}
            onChange={setUnitShare}
          />
          <RangeControl
            label="核心断言数"
            min={1}
            max={5}
            step={1}
            value={assertionCount}
            onChange={setAssertionCount}
          />
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择单元测试误区模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常结构
          </ViewButton>
          <ViewButton
            active={fault === "coverage"}
            onClick={() => setFault("coverage")}
          >
            覆盖率陷阱
          </ViewButton>
          <ViewButton
            active={fault === "coupled"}
            onClick={() => setFault("coupled")}
          >
            测试耦合
          </ViewButton>
        </div>
        {view === "tdd" && (
          <div className="flex flex-wrap gap-2" aria-label="选择 TDD 阶段">
            <ViewButton
              active={phase === "red"}
              onClick={() => setPhase("red")}
            >
              红
            </ViewButton>
            <ViewButton
              active={phase === "green"}
              onClick={() => setPhase("green")}
            >
              绿
            </ViewButton>
            <ViewButton
              active={phase === "refactor"}
              onClick={() => setPhase("refactor")}
            >
              重构
            </ViewButton>
          </div>
        )}
        <div className="min-w-0 rounded-card border border-border bg-background p-3 sm:p-4">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`${current.label}可视化：${current.detail}`}
            className="h-auto w-full"
          >
            <defs>
              <marker
                id="cqrf-testing-arrow"
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
                active
                label="Arrange"
                refCallback={(element) => {
                  nodeRefs.current.arrange = element;
                }}
                status="输入与依赖"
                x={28}
                y={96}
              />
              <Stage
                active
                label="Act"
                refCallback={(element) => {
                  nodeRefs.current.act = element;
                }}
                status="一个行为"
                x={230}
                y={96}
              />
              <Stage
                active
                label="Assert"
                refCallback={(element) => {
                  nodeRefs.current.assert = element;
                }}
                status="核心断言"
                x={432}
                y={96}
              />
              <Stage
                active
                label="复核"
                refCallback={(element) => {
                  nodeRefs.current.refactor = element;
                }}
                status="整理代码"
                x={634}
                y={96}
              />
            </g>
            {view === "pyramid" ? (
              <PyramidView fault={fault} unitShare={unitShare} />
            ) : view === "aaa" ? (
              <AaaView
                assertionCount={assertionCount}
                fault={fault}
                step={timeline.currentStep}
              />
            ) : (
              <TddView phase={phase} fault={fault} />
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
          caption="单步查看准备、执行、断言和重构；播放后用同一输入重放，确认测试保护的是行为而不是实现细节。"
          reset={{
            label: "重置单元测试实验",
            ariaLabel: "重置单元测试专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
