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

type View = "loop" | "decision" | "replay";
type Fault = "none" | "skip" | "optimize";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "loop",
    label: "闭环地图",
    detail: "把异味、手法、测试和复盘连接成一条有方向的反馈回路。",
  },
  {
    id: "decision",
    label: "风险分诊",
    detail: "比较变化压力、证据强度和行动范围，选择立即处理、补证据或暂缓。",
  },
  {
    id: "replay",
    label: "行为回放",
    detail: "对照基线、结构改动、边界验证和复盘记录，决定接受或回退。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "smell",
    caption: "命名让维护变贵的结构信号，而不是先选择手法。",
  },
  {
    label: "change",
    caption: "选择一个变化半径可控的重构小步。",
  },
  {
    label: "test",
    caption: "用正常、边界和故障输入回放外部承诺。",
  },
  {
    label: "review",
    caption: "记录接受条件与回退点，把证据交给下一次变化。",
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
    <label className="flex min-w-48 flex-1 flex-col gap-1 text-sm text-secondary">
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
        height="84"
        rx="12"
        fill={COLORS.elevated}
        stroke={active ? COLORS.accent : COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 18}
        y={y + 27}
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 18} y={y + 57} fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function LoopView({ activeStep, fault }: { activeStep: number; fault: Fault }) {
  const nodes = [
    { label: "异味", detail: "描述维护阻力", color: COLORS.danger },
    { label: "手法", detail: "改变一个边界", color: COLORS.accent },
    { label: "测试", detail: "回放外部行为", color: COLORS.success },
    { label: "复盘", detail: "记录下一步", color: COLORS.warning },
  ];
  const loopMessage =
    fault === "skip"
      ? "跳过行为验证，闭环停在结构变化"
      : fault === "optimize"
        ? "先优化再确认正确性，验收顺序反了"
        : "四个节点互相提供下一步的证据";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        闭环地图：异味、手法、测试、复盘
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        质量判断沿箭头推进；每个节点都要交付下一步能使用的证据。
      </text>
      {nodes.map((node, index) => {
        const x = 28 + index * 174;
        const active = activeStep >= index;
        return (
          <g key={node.label}>
            <rect
              x={x}
              y="102"
              width="144"
              height="92"
              rx="12"
              fill={node.color}
              fillOpacity={active ? 0.16 : 0.05}
              stroke={active ? node.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={x + 72}
              y="139"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={active ? node.color : COLORS.primary}
            >
              {node.label}
            </text>
            <text
              x={x + 72}
              y="169"
              textAnchor="middle"
              fontSize="12"
              fill={COLORS.secondary}
            >
              {node.detail}
            </text>
            {index < nodes.length - 1 && (
              <line
                x1={x + 144}
                y1="148"
                x2={x + 166}
                y2="148"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#cqrf-final-review-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="236"
        width="688"
        height="80"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text x="52" y="269" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前反馈
      </text>
      <text
        x="164"
        y="269"
        fontSize="14"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        {loopMessage}
      </text>
      <text x="52" y="296" fontSize="12" fill={COLORS.secondary}>
        当前节点：{nodes[activeStep]?.label ?? nodes[0].label}
        ；下一步前先检查输入、结果和回退点。
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        预测：如果测试节点被跳过，复盘还能判断结构变化是否安全么？
      </text>
    </g>
  );
}

function DecisionView({
  activeStep,
  fault,
  pressure,
}: {
  activeStep: number;
  fault: Fault;
  pressure: number;
}) {
  const evidence = Math.round((1 - pressure * 0.45) * 100);
  const scope = Math.round(pressure * 100);
  const action =
    fault === "skip"
      ? "先补测试"
      : fault === "optimize"
        ? "回到正确性"
        : pressure >= 0.7 && evidence >= 65
          ? "进入小步重构"
          : pressure >= 0.45
            ? "缩小变化半径"
            : "登记并观察";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        风险分诊：收益、证据与变化半径
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        不用一个指标拍板；把异味严重度放回变化频率、行为保护和回退成本中。
      </text>
      <rect
        x="28"
        y="92"
        width="326"
        height="224"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="125" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前输入
      </text>
      <text x="52" y="163" fontSize="13" fill={COLORS.secondary}>
        变化压力：{scope}%
      </text>
      <rect
        x="52"
        y="176"
        width="278"
        height="12"
        rx="6"
        fill={COLORS.border}
      />
      <rect
        x="52"
        y="176"
        width={278 * (scope / 100)}
        height="12"
        rx="6"
        fill={COLORS.accent}
      />
      <text x="52" y="222" fontSize="13" fill={COLORS.secondary}>
        行为证据：{evidence}%
      </text>
      <rect
        x="52"
        y="235"
        width="278"
        height="12"
        rx="6"
        fill={COLORS.border}
      />
      <rect
        x="52"
        y="235"
        width={278 * (evidence / 100)}
        height="12"
        rx="6"
        fill={COLORS.success}
      />
      <text x="52" y="284" fontSize="12" fill={COLORS.secondary}>
        当前阶段：{STEPS[activeStep]?.label ?? STEPS[0].label}
      </text>
      <rect
        x="386"
        y="92"
        width="330"
        height="224"
        rx="12"
        fill={COLORS.elevated}
        stroke={action === "进入小步重构" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="412"
        y="125"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前建议
      </text>
      <text
        x="412"
        y="171"
        fontSize="19"
        fontWeight="700"
        fill={action === "进入小步重构" ? COLORS.success : COLORS.warning}
      >
        {action}
      </text>
      <text x="412" y="214" fontSize="13" fill={COLORS.secondary}>
        {fault === "none"
          ? "接受条件：行为可回放，范围仍然可归因。"
          : "故障提醒：先修复判断顺序，再扩大改动。"}
      </text>
      <text x="412" y="254" fontSize="13" fill={COLORS.secondary}>
        回退成本：{pressure >= 0.65 ? "需要明确停点" : "容易回到基线"}
      </text>
      <text x="412" y="286" fontSize="12" fill={COLORS.accent}>
        证据不足时，缩小问题比扩大承诺更安全。
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        动手试：把压力调高，为什么证据不足时仍不能直接进入大重构？
      </text>
    </g>
  );
}

function ReplayView({
  activeStep,
  fault,
}: {
  activeStep: number;
  fault: Fault;
}) {
  const cards = [
    { title: "基线", detail: "输入、输出、异常", color: COLORS.primary },
    { title: "改动", detail: "一个结构变量", color: COLORS.accent },
    { title: "验证", detail: "正常与边界", color: COLORS.success },
    { title: "复盘", detail: "接受或回退", color: COLORS.warning },
  ];
  const diverged = fault !== "none" && activeStep >= 2;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        行为回放：把“没改坏”变成可核对证据
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        复习的终点不是记住手法，而是能解释一次变化为什么可以交接。
      </text>
      {cards.map((card, index) => {
        const x = 28 + index * 174;
        const active = activeStep >= index;
        return (
          <g key={card.title}>
            <rect
              x={x}
              y="98"
              width="144"
              height="96"
              rx="12"
              fill={card.color}
              fillOpacity={active ? 0.14 : 0.04}
              stroke={active ? card.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={x + 72}
              y="137"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={active ? card.color : COLORS.primary}
            >
              {card.title}
            </text>
            <text
              x={x + 72}
              y="169"
              textAnchor="middle"
              fontSize="12"
              fill={COLORS.secondary}
            >
              {card.detail}
            </text>
            {index < cards.length - 1 && (
              <line
                x1={x + 144}
                y1="146"
                x2={x + 166}
                y2="146"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#cqrf-final-review-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="232"
        width="688"
        height="84"
        rx="12"
        fill={COLORS.elevated}
        stroke={diverged ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="52" y="266" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        {diverged ? "发现差异：回到最近稳定点" : "回放结论：可以交接"}
      </text>
      <text
        x="52"
        y="296"
        fontSize="13"
        fill={diverged ? COLORS.warning : COLORS.success}
      >
        {diverged
          ? "边界或错误语义改变，先保留差异记录，不继续叠加手法。"
          : "输入、结果、异常和关键副作用顺序仍与行为基线一致。"}
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        先猜一猜：同一输入重放后结果不同，哪一份证据最先帮助你缩小范围？
      </text>
    </g>
  );
}

/** 代码质量总复习专属实验：把异味、手法、测试和复盘串成可回放闭环。 */
export function CqrfFinalReviewLab() {
  const [view, setView] = useState<View>("loop");
  const [pressure, setPressure] = useState(0.5);
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
            opacity: [0.34, 1],
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
    setView("loop");
    setPressure(0.5);
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="代码质量总复习专属闭环、分诊与行为回放实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="codequalityrefactoring-final-review"
      data-visual-kind="cqrf-final-review-loop"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 FinalReviewLab · 闭环、分诊与回放
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让每次重构都留下下一步能使用的证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：一次结构变化完成后，哪些结果必须能被下一位维护者复核？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择代码质量复习视角">
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
            label="变化压力"
            min={0.1}
            max={1}
            step={0.01}
            value={pressure}
            onChange={setPressure}
          />
        </div>
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择代码质量复习误区模式"
        >
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常闭环
          </ViewButton>
          <ViewButton
            active={fault === "skip"}
            onClick={() => setFault("skip")}
          >
            跳过验证
          </ViewButton>
          <ViewButton
            active={fault === "optimize"}
            onClick={() => setFault("optimize")}
          >
            先做优化
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
                id="cqrf-final-review-arrow"
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
                label="异味"
                refCallback={(element) => {
                  nodeRefs.current.smell = element;
                }}
                status="维护阻力"
                x={28}
                y={98}
              />
              <Stage
                active
                label="手法"
                refCallback={(element) => {
                  nodeRefs.current.change = element;
                }}
                status="局部变化"
                x={202}
                y={98}
              />
              <Stage
                active
                label="测试"
                refCallback={(element) => {
                  nodeRefs.current.test = element;
                }}
                status="行为回放"
                x={376}
                y={98}
              />
              <Stage
                active
                label="复盘"
                refCallback={(element) => {
                  nodeRefs.current.review = element;
                }}
                status="交接证据"
                x={550}
                y={98}
              />
            </g>
            {view === "loop" ? (
              <LoopView activeStep={timeline.currentStep} fault={fault} />
            ) : view === "decision" ? (
              <DecisionView
                activeStep={timeline.currentStep}
                fault={fault}
                pressure={pressure}
              />
            ) : (
              <ReplayView activeStep={timeline.currentStep} fault={fault} />
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
          caption="单步查看异味、手法、测试和复盘；播放后重置，再用另一种视角检验同一条质量闭环。"
          reset={{
            label: "重置代码质量复习实验",
            ariaLabel: "重置代码质量总复习专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
