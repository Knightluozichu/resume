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
const VIEW_H = 400;
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

type View = "value" | "cost" | "trace";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "value",
    label: "价值链",
    detail:
      "从痛点、童子军规则到可回退的微小改进，观察结构变化怎样变成维护收益。",
  },
  {
    id: "cost",
    label: "成本账本",
    detail: "改变债务、改动大小和测试信号，比较阅读、修改与恢复的时间成本。",
  },
  {
    id: "trace",
    label: "证据轨迹",
    detail: "在正常、边界和单一故障样本之间切换，定位首个偏离并保留清理步骤。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "baseline",
    caption: "先冻结输入、版本、环境和外部行为，形成可比较的基线。",
  },
  {
    label: "small-change",
    caption: "只做一个小改善，例如重命名、拆函数或删除一处重复。",
  },
  {
    label: "verify",
    caption: "用正常、边界和单一故障样本检查行为是否仍与基线一致。",
  },
  {
    label: "cleaner",
    caption: "保存结构差异、测试结果与回滚点，确认代码更易读易改。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const NODE_COPY = [
  { title: "冻结基线", body: "输入 · 版本 · 行为" },
  { title: "小步改善", body: "一个结构变量" },
  { title: "测试确认", body: "正常 · 边界 · 故障" },
  { title: "结构复盘", body: "接受 · 回退 · 记录" },
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
  const display = Number.isInteger(value) ? String(value) : value.toFixed(2);
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
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="accent-accent"
      />
    </label>
  );
}

function ValueView({
  activeStep,
  nodeRefs,
}: {
  activeStep: number;
  nodeRefs: MutableRefObject<Record<string, SVGGElement | null>>;
}) {
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        整洁代码的价值链：先保护行为，再改善结构
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        童子军规则不是一次大扫除，而是一串可回退、可验证的小步。
      </text>
      {NODE_COPY.map((node, index) => {
        const key = STEPS[index].label;
        const x = 28 + index * 182;
        const active = index === activeStep;
        const done = index < activeStep;
        return (
          <g
            key={key}
            ref={(element) => {
              nodeRefs.current[key] = element;
            }}
            opacity={index <= activeStep ? 1 : 0.36}
          >
            <rect
              x={x}
              y="100"
              width="154"
              height="176"
              rx="12"
              fill={active ? "var(--accent)" : COLORS.elevated}
              fillOpacity={active ? 0.14 : 1}
              stroke={active ? COLORS.accent : COLORS.border}
              strokeWidth={active ? 3 : 2}
            />
            <circle
              cx={x + 24}
              cy="127"
              r="10"
              fill={
                done ? COLORS.success : active ? COLORS.accent : COLORS.border
              }
            />
            <text
              x={x + 43}
              y="133"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {node.title}
            </text>
            <text x={x + 16} y="177" fontSize="13" fill={COLORS.secondary}>
              {node.body}
            </text>
            <text x={x + 16} y="215" fontSize="13" fill={COLORS.secondary}>
              证据
            </text>
            <text x={x + 16} y="241" fontSize="13" fill={COLORS.primary}>
              {index === 0
                ? "可重放输入"
                : index === 1
                  ? "局部差异"
                  : index === 2
                    ? "首个偏离"
                    : "接受或回退"}
            </text>
            {index < NODE_COPY.length - 1 && (
              <line
                x1={x + 157}
                y1="188"
                x2={x + 177}
                y2="188"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#cqrf-intro-arrow)"
              />
            )}
          </g>
        );
      })}
      <text x="28" y="319" fontSize="13" fill={COLORS.secondary}>
        当前检查点：第 {activeStep + 1} 步 · 不把“能跑”误认为“可维护”。
      </text>
      <text x="28" y="350" fontSize="13" fill={COLORS.accent}>
        预测：每次只改一个结构变量，能否让回退边界更清楚？
      </text>
    </g>
  );
}

function CostView({
  changeSize,
  debt,
  testSignal,
}: {
  changeSize: number;
  debt: number;
  testSignal: number;
}) {
  const readingHours = 1.5 + debt * 7;
  const changeHours = 0.8 + debt * 4 + changeSize * 3.5;
  const recoveryHours = 0.6 + (1 - testSignal) * 5 + changeSize * 1.5;
  const bars = [
    { label: "读懂上下文", value: readingHours, color: COLORS.warning },
    { label: "完成一次改动", value: changeHours, color: COLORS.accent },
    { label: "故障后恢复", value: recoveryHours, color: COLORS.danger },
  ];
  const max = Math.max(...bars.map((bar) => bar.value), 1);
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        成本账本：技术债务把未来的改动变贵
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        这里记录的是时间证据，不是给代码贴一个漂亮的总分。
      </text>
      <rect
        x="28"
        y="94"
        width="326"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="128" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        估计维护时间（小时）
      </text>
      {bars.map((bar, index) => {
        const width = (bar.value / max) * 230;
        const y = 168 + index * 42;
        return (
          <g key={bar.label}>
            <text x="52" y={y} fontSize="13" fill={COLORS.secondary}>
              {bar.label}
            </text>
            <rect
              x="52"
              y={y + 8}
              width="230"
              height="14"
              rx="7"
              fill={COLORS.border}
            />
            <rect
              x="52"
              y={y + 8}
              width={width}
              height="14"
              rx="7"
              fill={bar.color}
              fillOpacity="0.82"
            />
            <text
              x="294"
              y={y + 20}
              fontSize="13"
              textAnchor="end"
              fill={COLORS.primary}
            >
              {bar.value.toFixed(1)}
            </text>
          </g>
        );
      })}
      <text x="52" y="294" fontSize="13" fill={COLORS.secondary}>
        债务越高、改动越大，阅读和恢复成本越容易一起上升。
      </text>
      <line
        x1="356"
        y1="200"
        x2="414"
        y2="200"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-intro-arrow)"
      />
      <rect
        x="436"
        y="94"
        width="280"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="460"
        y="128"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前输入
      </text>
      <text x="460" y="166" fontSize="13" fill={COLORS.warning}>
        技术债务：{debt.toFixed(2)}
      </text>
      <text x="460" y="198" fontSize="13" fill={COLORS.accent}>
        改动范围：{changeSize.toFixed(2)}
      </text>
      <text x="460" y="230" fontSize="13" fill={COLORS.success}>
        测试信号：{testSignal.toFixed(2)}
      </text>
      <text x="460" y="272" fontSize="13" fill={COLORS.secondary}>
        童子军规则：把一处小改善留在本次提交。
      </text>
      <text x="28" y="354" fontSize="13" fill={COLORS.secondary}>
        先记录基线，再观察哪一种成本变化与结构调整同时发生。
      </text>
    </g>
  );
}

function TraceView({ faultLevel }: { faultLevel: number }) {
  const active = faultLevel < 0.34 ? 1 : faultLevel < 0.67 ? 2 : 3;
  const samples = [
    { title: "正常样本", detail: "主路径完成", color: COLORS.success },
    { title: "边界样本", detail: "检查等号与空值", color: COLORS.warning },
    { title: "单一故障样本", detail: "停在首个偏离", color: COLORS.danger },
  ];
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        证据轨迹：失败不是一句“可能出错”
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        同一输入下，把异常停点、错误分类和清理步骤写进轨迹。
      </text>
      {samples.map((sample, index) => {
        const x = 28 + index * 238;
        const isActive = index + 1 === active;
        return (
          <g key={sample.title}>
            <rect
              x={x}
              y="104"
              width="206"
              height="154"
              rx="12"
              fill={isActive ? sample.color : COLORS.elevated}
              fillOpacity={isActive ? 0.14 : 1}
              stroke={isActive ? sample.color : COLORS.border}
              strokeWidth={isActive ? 3 : 2}
            />
            <circle cx={x + 24} cy="132" r="10" fill={sample.color} />
            <text
              x={x + 44}
              y="138"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {sample.title}
            </text>
            <text x={x + 18} y="180" fontSize="13" fill={COLORS.secondary}>
              输入：同一版本与环境
            </text>
            <text x={x + 18} y="210" fontSize="13" fill={COLORS.primary}>
              {sample.detail}
            </text>
            <text
              x={x + 18}
              y="240"
              fontSize="13"
              fill={isActive ? sample.color : COLORS.secondary}
            >
              {isActive ? "当前观察" : "保留证据"}
            </text>
          </g>
        );
      })}
      <line
        x1="234"
        y1="180"
        x2="260"
        y2="180"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-intro-arrow)"
      />
      <line
        x1="472"
        y1="180"
        x2="498"
        y2="180"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-intro-arrow)"
      />
      <rect
        x="28"
        y="292"
        width="688"
        height="52"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <text x="48" y="324" fontSize="13" fill={COLORS.secondary}>
        故障强度：{faultLevel.toFixed(2)} · 停点：第 {active} 类样本 ·
        修复后必须从干净状态重放。
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        先预测：边界样本与单一故障样本会把首个偏离暴露在哪里？
      </text>
    </g>
  );
}

/** 第一个代码质量章节专属实验：把整洁代码的价值转化为可回放证据。 */
export function CqrfIntroLab() {
  const [view, setView] = useState<View>("value");
  const [debt, setDebt] = useState(0.64);
  const [changeSize, setChangeSize] = useState(0.35);
  const [testSignal, setTestSignal] = useState(0.72);
  const [faultLevel, setFaultLevel] = useState(0.42);
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
    setView("value");
    setDebt(0.64);
    setChangeSize(0.35);
    setTestSignal(0.72);
    setFaultLevel(0.42);
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="整洁代码意义专属价值链、成本账本与证据轨迹实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cqrf-intro-clean-code-value"
      data-unit-id="codequalityrefactoring-01"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CleanCodeValueLab · 价值链、成本账本与证据轨迹
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            整洁代码不是更短，而是更容易读、改、验证和回退
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：只让代码“能跑”，会不会让下一次改动更便宜？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择整洁代码实验视角">
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
            label="技术债务"
            min={0.1}
            max={1}
            step={0.01}
            value={debt}
            onChange={setDebt}
          />
          <RangeControl
            label="改动范围"
            min={0.1}
            max={1}
            step={0.01}
            value={changeSize}
            onChange={setChangeSize}
          />
          <RangeControl
            label="测试信号"
            min={0.1}
            max={1}
            step={0.01}
            value={testSignal}
            onChange={setTestSignal}
          />
          <RangeControl
            label="故障强度"
            min={0.1}
            max={1}
            step={0.01}
            value={faultLevel}
            onChange={setFaultLevel}
          />
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
                id="cqrf-intro-arrow"
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
            {view === "value" ? (
              <ValueView
                activeStep={timeline.currentStep}
                nodeRefs={nodeRefs}
              />
            ) : view === "cost" ? (
              <CostView
                changeSize={changeSize}
                debt={debt}
                testSignal={testSignal}
              />
            ) : (
              <TraceView faultLevel={faultLevel} />
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
          caption="单步看责任边界，播放看完整链路；改变参数后，用同一输入重放并保留回退点。"
          reset={{
            label: "重置整洁代码实验",
            ariaLabel: "重置整洁代码意义专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
