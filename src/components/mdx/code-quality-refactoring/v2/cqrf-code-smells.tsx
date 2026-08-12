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

type View = "map" | "triage" | "migration";
type Smell = "duplication" | "complexity" | "design";
type Fault = "none" | "symptom" | "overreact";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "map",
    label: "分类图",
    detail: "把重复知识、理解负担和错误边界放进三类异味，再回到具体证据。",
  },
  {
    id: "triage",
    label: "影响分诊",
    detail: "用变化频率、影响范围和证据强度决定立即处理、先补证据或暂缓。",
  },
  {
    id: "migration",
    label: "小步迁移",
    detail: "沿识别、命名、评估和修改推进，每步保留接受与回退条件。",
  },
];

const SMELLS: readonly {
  id: Smell;
  label: string;
  short: string;
  color: string;
}[] = [
  {
    id: "duplication",
    label: "冗余",
    short: "重复知识",
    color: COLORS.danger,
  },
  {
    id: "complexity",
    label: "复杂",
    short: "理解负担",
    color: COLORS.warning,
  },
  {
    id: "design",
    label: "命名与设计",
    short: "错误边界",
    color: COLORS.accent,
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "spot",
    caption: "标出让阅读、修改或测试变贵的具体结构信号。",
  },
  {
    label: "name",
    caption: "用异味名称描述现象，避免直接跳到某个重构手法。",
  },
  {
    label: "assess",
    caption: "结合变化频率、影响范围和行为证据做分诊。",
  },
  {
    label: "refactor",
    caption: "只迁移一个小步，回放行为后再接受或回退。",
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

function MapView({
  activeStep,
  fault,
  smell,
  pressure,
}: {
  activeStep: number;
  fault: Fault;
  smell: Smell;
  pressure: number;
}) {
  const selected = SMELLS.find((item) => item.id === smell) ?? SMELLS[0];
  const signalWidth = 84 + pressure * 190;
  const summary =
    fault === "symptom"
      ? "只看到了表面症状，仍缺少行为与历史证据"
      : fault === "overreact"
        ? "重构手法先于异味证据，范围正在失控"
        : `${selected.label}信号已命名，下一步应检查影响范围`;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        分类图：先命名维护阻力，再选择重构手法
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        三类异味共享一个判断顺序：现象、影响、证据、下一步。
      </text>
      <rect
        x="28"
        y="90"
        width="200"
        height="72"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.primary}
        strokeWidth="2"
      />
      <text x="52" y="120" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        代码异味
      </text>
      <text x="52" y="146" fontSize="12" fill={COLORS.secondary}>
        维护阻力的命名入口
      </text>
      <line
        x1="228"
        y1="126"
        x2="262"
        y2="126"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-code-smells-arrow)"
      />
      <g>
        {SMELLS.map((item, index) => {
          const y = 76 + index * 88;
          const active = item.id === smell;
          return (
            <g key={item.id}>
              <rect
                x="278"
                y={y}
                width="184"
                height="68"
                rx="12"
                fill={active ? item.color : COLORS.elevated}
                fillOpacity={active ? 0.16 : 1}
                stroke={active ? item.color : COLORS.border}
                strokeWidth={active ? 2.5 : 1.5}
              />
              <text
                x="300"
                y={y + 29}
                fontSize="15"
                fontWeight="700"
                fill={active ? item.color : COLORS.primary}
              >
                {item.label}
              </text>
              <text x="300" y={y + 51} fontSize="12" fill={COLORS.secondary}>
                {item.short}
              </text>
            </g>
          );
        })}
      </g>
      <rect
        x="500"
        y="90"
        width="216"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={selected.color}
        strokeWidth="2"
      />
      <text
        x="524"
        y="122"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前观察：{selected.label}
      </text>
      <text x="524" y="153" fontSize="13" fill={COLORS.secondary}>
        信号强度
      </text>
      <rect
        x="524"
        y="166"
        width="166"
        height="12"
        rx="6"
        fill={COLORS.border}
      />
      <rect
        x="524"
        y="166"
        width={signalWidth}
        height="12"
        rx="6"
        fill={selected.color}
      />
      <text x="524" y="208" fontSize="13" fill={COLORS.secondary}>
        {summary}
      </text>
      <text x="524" y="252" fontSize="13" fill={COLORS.primary}>
        当前步骤：{activeStep + 1} / 4
      </text>
      <text
        x="524"
        y="284"
        fontSize="12"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        {fault === "none" ? "证据链可继续" : "先补证据再扩大范围"}
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        预测：标签改变后，下一次修改会少触碰哪一条变化链？
      </text>
    </g>
  );
}

function TriageView({
  activeStep,
  fault,
  smell,
  pressure,
}: {
  activeStep: number;
  fault: Fault;
  smell: Smell;
  pressure: number;
}) {
  const selected = SMELLS.find((item) => item.id === smell) ?? SMELLS[0];
  const frequency = Math.round(pressure * 100);
  const impact = Math.round((1 - pressure / 2) * 100);
  const action =
    fault === "symptom"
      ? "先补行为证据"
      : fault === "overreact"
        ? "缩小迁移切片"
        : frequency >= 60 && impact >= 60
          ? "进入小步重构"
          : "登记并观察";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        影响分诊：异味不等于同一种优先级
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        变化频率、影响范围与行为证据共同决定行动，不由单个数字拍板。
      </text>
      <rect
        x="28"
        y="92"
        width="300"
        height="218"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="124" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        {selected.label} · 证据面板
      </text>
      <text x="52" y="160" fontSize="13" fill={COLORS.secondary}>
        变化频率：{frequency}%
      </text>
      <rect
        x="52"
        y="174"
        width="244"
        height="12"
        rx="6"
        fill={COLORS.border}
      />
      <rect
        x="52"
        y="174"
        width={244 * (frequency / 100)}
        height="12"
        rx="6"
        fill={selected.color}
      />
      <text x="52" y="222" fontSize="13" fill={COLORS.secondary}>
        影响范围：{impact}%
      </text>
      <rect
        x="52"
        y="236"
        width="244"
        height="12"
        rx="6"
        fill={COLORS.border}
      />
      <rect
        x="52"
        y="236"
        width={244 * (impact / 100)}
        height="12"
        rx="6"
        fill={COLORS.accent}
      />
      <text x="52" y="282" fontSize="12" fill={COLORS.secondary}>
        行为证据：{fault === "symptom" ? "不足" : "可回放"}
      </text>
      <rect
        x="370"
        y="92"
        width="346"
        height="218"
        rx="12"
        fill={COLORS.elevated}
        stroke={action === "进入小步重构" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="396"
        y="124"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        建议动作
      </text>
      <text
        x="396"
        y="164"
        fontSize="18"
        fontWeight="700"
        fill={action === "进入小步重构" ? COLORS.success : COLORS.warning}
      >
        {action}
      </text>
      <text x="396" y="207" fontSize="13" fill={COLORS.secondary}>
        {fault === "none"
          ? "记录支持判断的结构与行为证据。"
          : "故障模式提醒：不要把不完整的观察当成结论。"}
      </text>
      <text x="396" y="246" fontSize="13" fill={COLORS.secondary}>
        当前阶段：{STEPS[activeStep]?.label ?? STEPS[0].label}
      </text>
      <text x="396" y="282" fontSize="12" fill={COLORS.accent}>
        有收益才扩大切片；不确定就先降低变化半径。
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        先猜一猜：频率高但证据不足时，为什么“先补证据”比“先拆结构”稳？
      </text>
    </g>
  );
}

function MigrationView({
  activeStep,
  fault,
  smell,
}: {
  activeStep: number;
  fault: Fault;
  smell: Smell;
}) {
  const selected = SMELLS.find((item) => item.id === smell) ?? SMELLS[0];
  const phases = ["识别", "命名", "评估", "修改"];
  const halted = fault !== "none" && activeStep >= 2;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        小步迁移：每一步都能解释、接受或回退
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        迁移不是一次性重排；它是沿行为基线推进的可回退路径。
      </text>
      <g>
        {phases.map((phase, index) => {
          const active = activeStep >= index;
          const blocked = halted && index >= 2;
          const x = 28 + index * 174;
          return (
            <g key={phase}>
              <rect
                x={x}
                y="94"
                width="144"
                height="74"
                rx="12"
                fill={
                  blocked
                    ? COLORS.warning
                    : active
                      ? COLORS.accent
                      : COLORS.elevated
                }
                fillOpacity={blocked || active ? 0.16 : 1}
                stroke={
                  blocked
                    ? COLORS.warning
                    : active
                      ? COLORS.accent
                      : COLORS.border
                }
                strokeWidth={active || blocked ? 2.5 : 1.5}
              />
              <text
                x={x + 72}
                y="126"
                textAnchor="middle"
                fontSize="15"
                fontWeight="700"
                fill={
                  blocked
                    ? COLORS.warning
                    : active
                      ? COLORS.accent
                      : COLORS.primary
                }
              >
                {phase}
              </text>
              <text
                x={x + 72}
                y="150"
                textAnchor="middle"
                fontSize="12"
                fill={COLORS.secondary}
              >
                {blocked ? "先停下" : active ? "已检查" : "待推进"}
              </text>
              {index < phases.length - 1 && (
                <line
                  x1={x + 144}
                  y1="131"
                  x2={x + 166}
                  y2="131"
                  stroke={COLORS.accent}
                  strokeWidth="3"
                  markerEnd="url(#cqrf-code-smells-arrow)"
                />
              )}
            </g>
          );
        })}
      </g>
      <rect
        x="28"
        y="210"
        width="326"
        height="106"
        rx="12"
        fill={COLORS.elevated}
        stroke={selected.color}
        strokeWidth="2"
      />
      <text x="52" y="242" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前切片：{selected.label}
      </text>
      <text x="52" y="274" fontSize="13" fill={COLORS.secondary}>
        保留输入、输出、异常和副作用顺序。
      </text>
      <text x="52" y="300" fontSize="12" fill={COLORS.secondary}>
        只替换一处结构，下一步才有可比较的结果。
      </text>
      <rect
        x="378"
        y="210"
        width="338"
        height="106"
        rx="12"
        fill={COLORS.elevated}
        stroke={halted ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="402"
        y="242"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {halted ? "回退条件已触发" : "当前接受条件"}
      </text>
      <text
        x="402"
        y="274"
        fontSize="13"
        fill={halted ? COLORS.warning : COLORS.success}
      >
        {halted ? "记录差异，回到最近稳定点" : "行为回放通过，再进入下一小步"}
      </text>
      <text x="402" y="300" fontSize="12" fill={COLORS.secondary}>
        {fault === "overreact"
          ? "故障：范围扩张过快"
          : "正常：变化半径保持可读"}
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        动手试：在第三步注入故障，观察为什么此处应该停而不是继续堆改动。
      </text>
    </g>
  );
}

/** 代码异味专属实验：分类维护阻力、分诊影响，再回放一个安全迁移小步。 */
export function CqrfCodeSmellsLab() {
  const [view, setView] = useState<View>("map");
  const [smell, setSmell] = useState<Smell>("duplication");
  const [pressure, setPressure] = useState(0.55);
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
    setView("map");
    setSmell("duplication");
    setPressure(0.55);
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="代码异味专属分类、分诊与迁移实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="codequalityrefactoring-08"
      data-visual-kind="cqrf-code-smells-triage"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CodeSmellsLab · 分类、分诊与迁移
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把“闻起来不对”变成可回放的重构决定
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：异味被命名后，下一次修改的变化半径会如何变化？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择代码异味实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择代码异味类别">
          {SMELLS.map((item) => (
            <ViewButton
              key={item.id}
              active={smell === item.id}
              onClick={() => setSmell(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择代码异味误区模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常证据
          </ViewButton>
          <ViewButton
            active={fault === "symptom"}
            onClick={() => setFault("symptom")}
          >
            只看症状
          </ViewButton>
          <ViewButton
            active={fault === "overreact"}
            onClick={() => setFault("overreact")}
          >
            范围失控
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
                id="cqrf-code-smells-arrow"
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
                label="识别"
                refCallback={(element) => {
                  nodeRefs.current.spot = element;
                }}
                status="结构信号"
                x={28}
                y={95}
              />
              <Stage
                active
                label="命名"
                refCallback={(element) => {
                  nodeRefs.current.name = element;
                }}
                status="异味名称"
                x={202}
                y={95}
              />
              <Stage
                active
                label="评估"
                refCallback={(element) => {
                  nodeRefs.current.assess = element;
                }}
                status="影响证据"
                x={376}
                y={95}
              />
              <Stage
                active
                label="修改"
                refCallback={(element) => {
                  nodeRefs.current.refactor = element;
                }}
                status="小步回放"
                x={550}
                y={95}
              />
            </g>
            {view === "map" ? (
              <MapView
                activeStep={timeline.currentStep}
                fault={fault}
                smell={smell}
                pressure={pressure}
              />
            ) : view === "triage" ? (
              <TriageView
                activeStep={timeline.currentStep}
                fault={fault}
                smell={smell}
                pressure={pressure}
              />
            ) : (
              <MigrationView
                activeStep={timeline.currentStep}
                fault={fault}
                smell={smell}
              />
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
          caption="单步查看识别、命名、评估和修改；每次只扩大一个变化半径，才能知道哪一步真正降低了维护阻力。"
          reset={{
            label: "重置代码异味实验",
            ariaLabel: "重置代码异味专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
