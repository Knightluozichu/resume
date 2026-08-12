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

type View = "flow" | "techniques" | "acceptance";
type Technique = "extract" | "inline" | "move" | "rename";
type Fault = "none" | "noTest" | "bigStep";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "flow",
    label: "安全流程",
    detail: "沿基线、识别、改变和验证推进，把未知范围限制在一个小步内。",
  },
  {
    id: "techniques",
    label: "手法对照",
    detail: "比较提取函数、内联、移动和重命名的适用条件与结构结果。",
  },
  {
    id: "acceptance",
    label: "验收面板",
    detail: "用行为结果、变化半径和回退点判断继续、缩小或回退。",
  },
];

const TECHNIQUES: readonly {
  id: Technique;
  label: string;
  problem: string;
  action: string;
  boundary: string;
  color: string;
}[] = [
  {
    id: "extract",
    label: "提取函数",
    problem: "长函数或一段独立规则",
    action: "给片段命名并显式传依赖",
    boundary: "输入输出清楚，参数不过载",
    color: COLORS.accent,
  },
  {
    id: "inline",
    label: "内联",
    problem: "无解释价值的间接层",
    action: "把一次性包装展开",
    boundary: "名字没有承载稳定概念",
    color: COLORS.warning,
  },
  {
    id: "move",
    label: "移动",
    problem: "方法依恋另一个对象",
    action: "把规则放到真实责任边界",
    boundary: "数据、不变量和变化理由一致",
    color: COLORS.success,
  },
  {
    id: "rename",
    label: "重命名",
    problem: "名字制造错误预期",
    action: "把角色、动作或状态写清楚",
    boundary: "调用者契约与实现保持一致",
    color: COLORS.danger,
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "baseline",
    caption: "记录输入、输出、异常和关键副作用，建立可比较的行为基线。",
  },
  {
    label: "identify",
    caption: "命名异味与变化理由，不让手法名称代替诊断。",
  },
  {
    label: "change",
    caption: "只执行一个局部手法，保持变化半径可归因。",
  },
  {
    label: "verify",
    caption: "回放正常、边界和故障输入，再决定接受或回退。",
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

function FlowView({ activeStep, fault }: { activeStep: number; fault: Fault }) {
  const stages = [
    { label: "基线", detail: "行为证据", color: COLORS.primary },
    { label: "识别", detail: "异味与理由", color: COLORS.danger },
    { label: "改变", detail: "局部手法", color: COLORS.accent },
    { label: "验证", detail: "接受或回退", color: COLORS.success },
  ];
  const message =
    fault === "noTest"
      ? "没有基线，改变无法可靠比较"
      : fault === "bigStep"
        ? "变化半径过大，先拆成更小的步"
        : "每个阶段都为下一阶段交付证据";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        安全流程：基线 → 识别 → 改变 → 验证
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        手法只是中间一步，真正的终点是可解释的行为结果和清晰回退点。
      </text>
      {stages.map((stage, index) => {
        const x = 28 + index * 174;
        const active = activeStep >= index;
        return (
          <g key={stage.label}>
            <rect
              x={x}
              y="104"
              width="144"
              height="88"
              rx="12"
              fill={stage.color}
              fillOpacity={active ? 0.15 : 0.04}
              stroke={active ? stage.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={x + 72}
              y="141"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={active ? stage.color : COLORS.primary}
            >
              {stage.label}
            </text>
            <text
              x={x + 72}
              y="170"
              textAnchor="middle"
              fontSize="12"
              fill={COLORS.secondary}
            >
              {stage.detail}
            </text>
            {index < stages.length - 1 && (
              <line
                x1={x + 144}
                y1="148"
                x2={x + 166}
                y2="148"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#cqrf-refactoring-techniques-arrow)"
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
        {message}
      </text>
      <text x="52" y="296" fontSize="12" fill={COLORS.secondary}>
        当前阶段：{stages[activeStep]?.label ?? stages[0].label}
        ；下一步前保留输入、结果和回退记录。
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        预测：跳过基线后，哪一种差异会最难归因？
      </text>
    </g>
  );
}

function TechniquesView({
  activeStep,
  fault,
  technique,
}: {
  activeStep: number;
  fault: Fault;
  technique: Technique;
}) {
  const selected =
    TECHNIQUES.find((item) => item.id === technique) ?? TECHNIQUES[0];
  const safe = fault === "none" && activeStep >= 2;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        手法对照：先看边界，再看名字
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        同一个长函数可能需要不同动作；选择由异味、数据所有权和调用契约决定。
      </text>
      <rect
        x="28"
        y="94"
        width="326"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={selected.color}
        strokeWidth="2"
      />
      <text x="52" y="127" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        {selected.label}
      </text>
      <text x="52" y="164" fontSize="13" fill={COLORS.secondary}>
        解决线索：{selected.problem}
      </text>
      <text x="52" y="208" fontSize="13" fill={COLORS.secondary}>
        小步动作：{selected.action}
      </text>
      <text x="52" y="252" fontSize="13" fill={COLORS.secondary}>
        边界检查：
      </text>
      <text x="52" y="278" fontSize="12" fill={selected.color}>
        {selected.boundary}
      </text>
      <text x="52" y="304" fontSize="12" fill={COLORS.secondary}>
        当前阶段：{STEPS[activeStep]?.label ?? STEPS[0].label}
      </text>
      <rect
        x="378"
        y="94"
        width="338"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={safe ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="402"
        y="127"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        结构前后对照
      </text>
      <rect
        x="402"
        y="151"
        width="136"
        height="96"
        rx="10"
        fill={COLORS.border}
        fillOpacity="0.35"
      />
      <text
        x="420"
        y="178"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.secondary}
      >
        改动前
      </text>
      <text x="420" y="206" fontSize="12" fill={COLORS.secondary}>
        {technique === "rename"
          ? "data"
          : technique === "move"
            ? "A.process"
            : "巨大函数"}
      </text>
      <text x="420" y="229" fontSize="12" fill={COLORS.secondary}>
        责任混在一起
      </text>
      <line
        x1="552"
        y1="199"
        x2="578"
        y2="199"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-refactoring-techniques-arrow)"
      />
      <rect
        x="590"
        y="151"
        width="102"
        height="96"
        rx="10"
        fill={selected.color}
        fillOpacity="0.12"
        stroke={selected.color}
        strokeWidth="1.5"
      />
      <text
        x="606"
        y="178"
        fontSize="13"
        fontWeight="700"
        fill={selected.color}
      >
        改动后
      </text>
      <text x="606" y="206" fontSize="12" fill={COLORS.secondary}>
        边界可读
      </text>
      <text x="606" y="229" fontSize="12" fill={COLORS.secondary}>
        可单独回放
      </text>
      <text
        x="402"
        y="278"
        fontSize="13"
        fill={safe ? COLORS.success : COLORS.warning}
      >
        {fault === "none" ? "行为保护仍在" : "先检查行为保护"}
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        动手试：切换手法，哪一项边界条件会随动作改变？
      </text>
    </g>
  );
}

function AcceptanceView({
  activeStep,
  fault,
  stepSize,
}: {
  activeStep: number;
  fault: Fault;
  stepSize: number;
}) {
  const scope = Math.round(stepSize * 100);
  const behavior = fault === "none" ? 100 : fault === "noTest" ? 42 : 58;
  const canContinue = fault === "none" && stepSize <= 0.6 && activeStep >= 3;
  const verdict = canContinue
    ? "接受并记录"
    : fault === "none"
      ? "继续缩小"
      : "回退定位";
  const checks = [
    {
      label: "结果一致",
      value: behavior,
      color: behavior >= 80 ? COLORS.success : COLORS.warning,
    },
    {
      label: "范围可控",
      value: 100 - scope / 2,
      color: scope <= 60 ? COLORS.success : COLORS.warning,
    },
    {
      label: "回退清楚",
      value: fault === "none" ? 94 : 48,
      color: fault === "none" ? COLORS.success : COLORS.warning,
    },
  ];
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        验收面板：继续、缩小还是回退？
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        验收不只看测试是否绿色，还要看行为、变化半径和回退点是否可解释。
      </text>
      <rect
        x="28"
        y="94"
        width="430"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="127" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        三项接受条件
      </text>
      {checks.map((check, index) => {
        const y = 160 + index * 48;
        return (
          <g key={check.label}>
            <text x="52" y={y} fontSize="13" fill={COLORS.secondary}>
              {check.label}
            </text>
            <rect
              x="150"
              y={y - 11}
              width="260"
              height="12"
              rx="6"
              fill={COLORS.border}
            />
            <rect
              x="150"
              y={y - 11}
              width={260 * (check.value / 100)}
              height="12"
              rx="6"
              fill={check.color}
            />
            <text
              x="420"
              y={y}
              textAnchor="end"
              fontSize="12"
              fill={check.color}
            >
              {Math.round(check.value)}%
            </text>
          </g>
        );
      })}
      <text x="52" y="292" fontSize="12" fill={COLORS.secondary}>
        当前变化半径：{scope}%；阶段：
        {STEPS[activeStep]?.label ?? STEPS[0].label}
      </text>
      <rect
        x="486"
        y="94"
        width="230"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={canContinue ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="512"
        y="127"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前决定
      </text>
      <text
        x="512"
        y="174"
        fontSize="19"
        fontWeight="700"
        fill={canContinue ? COLORS.success : COLORS.warning}
      >
        {verdict}
      </text>
      <text x="512" y="218" fontSize="13" fill={COLORS.secondary}>
        {fault === "none"
          ? "行为与结构证据可以交接。"
          : "先保留差异，再回到最近稳定点。"}
      </text>
      <text x="512" y="260" fontSize="13" fill={COLORS.secondary}>
        {fault === "bigStep" ? "故障：一步改变太多" : "每一步都应有接受条件"}
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        先猜一猜：边界失败时，哪一个指标会让你先回退？
      </text>
    </g>
  );
}

/** 重构手法专属实验：比较流程、四种手法与行为验收的可回退边界。 */
export function CqrfRefactoringTechniquesLab() {
  const [view, setView] = useState<View>("flow");
  const [technique, setTechnique] = useState<Technique>("extract");
  const [stepSize, setStepSize] = useState(0.45);
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
    setView("flow");
    setTechnique("extract");
    setStepSize(0.45);
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="重构手法专属安全流程、手法对照与验收实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="codequalityrefactoring-09"
      data-visual-kind="cqrf-refactoring-techniques-flow"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 RefactoringTechniquesLab · 流程、手法与验收
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把结构变化切成可解释的小步
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：哪一种证据会决定下一步继续，哪一种差异会触发回退？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择重构手法实验视角">
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
            label="单步变化幅度"
            min={0.1}
            max={1}
            step={0.01}
            value={stepSize}
            onChange={setStepSize}
          />
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择重构手法">
          {TECHNIQUES.map((item) => (
            <ViewButton
              key={item.id}
              active={technique === item.id}
              onClick={() => setTechnique(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择重构流程误区模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常保护
          </ViewButton>
          <ViewButton
            active={fault === "noTest"}
            onClick={() => setFault("noTest")}
          >
            没有基线
          </ViewButton>
          <ViewButton
            active={fault === "bigStep"}
            onClick={() => setFault("bigStep")}
          >
            大步改动
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
                id="cqrf-refactoring-techniques-arrow"
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
                label="基线"
                refCallback={(element) => {
                  nodeRefs.current.baseline = element;
                }}
                status="行为证据"
                x={28}
                y={100}
              />
              <Stage
                active
                label="识别"
                refCallback={(element) => {
                  nodeRefs.current.identify = element;
                }}
                status="异味与理由"
                x={202}
                y={100}
              />
              <Stage
                active
                label="改变"
                refCallback={(element) => {
                  nodeRefs.current.change = element;
                }}
                status="局部手法"
                x={376}
                y={100}
              />
              <Stage
                active
                label="验证"
                refCallback={(element) => {
                  nodeRefs.current.verify = element;
                }}
                status="接受或回退"
                x={550}
                y={100}
              />
            </g>
            {view === "flow" ? (
              <FlowView activeStep={timeline.currentStep} fault={fault} />
            ) : view === "techniques" ? (
              <TechniquesView
                activeStep={timeline.currentStep}
                fault={fault}
                technique={technique}
              />
            ) : (
              <AcceptanceView
                activeStep={timeline.currentStep}
                fault={fault}
                stepSize={stepSize}
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
          caption="单步查看基线、识别、改变和验证；播放后重置，再用另一种手法检查同一条行为契约。"
          reset={{
            label: "重置重构手法实验",
            ariaLabel: "重置重构手法专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
