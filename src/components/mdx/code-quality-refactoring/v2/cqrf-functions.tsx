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

type View = "anatomy" | "cqs" | "parameters";
type Pitfall = "none" | "flags" | "output";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "anatomy",
    label: "函数解剖",
    detail: "沿输入、决策、副作用与结果观察一个大函数如何承载多个责任。",
  },
  {
    id: "cqs",
    label: "CQS 分离",
    detail: "比较只查询、只命令和同时读写状态的调用契约。",
  },
  {
    id: "parameters",
    label: "参数边界",
    detail: "改变参数数量与副作用信号，判断何时应引入参数对象或拆分函数。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "observe",
    caption: "先列出函数的输入、动作、输出和副作用，不被行数单独带偏。",
  },
  {
    label: "split",
    caption: "按同一层抽象和变化理由拆出责任，让名字成为可读的边界。",
  },
  {
    label: "separate",
    caption: "把查询和命令分开，让调用者知道一次调用会不会改变状态。",
  },
  {
    label: "verify",
    caption: "用正常、边界和故障输入重放，确认拆分没有改变行为契约。",
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
  refCallback: (element: SVGGElement | null) => void;
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

function AnatomyView({
  activeStep,
  complexity,
  nodeRefs,
  pitfall,
}: {
  activeStep: number;
  complexity: number;
  nodeRefs: MutableRefObject<Record<string, SVGGElement | null>>;
  pitfall: Pitfall;
}) {
  const responsibilities = ["验证输入", "计算价格", "扣减库存", "发送通知"];
  const visibleCount = Math.max(2, Math.round(2 + complexity * 2));
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        函数解剖：从“做什么”定位责任边界
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        行数只是线索；输入、变化理由、抽象层级和副作用才决定是否应该拆分。
      </text>
      <Stage
        active={activeStep >= 0}
        label="观察"
        refCallback={(element) => {
          nodeRefs.current.observe = element;
        }}
        status={`责任段：${visibleCount}`}
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
        markerEnd="url(#cqrf-functions-arrow)"
      />
      <Stage
        active={activeStep >= 1}
        label="拆分"
        refCallback={(element) => {
          nodeRefs.current.split = element;
        }}
        status={pitfall === "flags" ? "布尔旗标分支" : "同层命名"}
        x={230}
        y={96}
      />
      <line
        x1="384"
        y1="143"
        x2="418"
        y2="143"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-functions-arrow)"
      />
      <Stage
        active={activeStep >= 2}
        label="分离"
        refCallback={(element) => {
          nodeRefs.current.separate = element;
        }}
        status={pitfall === "output" ? "隐式写回" : "查询 / 命令"}
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
        markerEnd="url(#cqrf-functions-arrow)"
      />
      <Stage
        active={activeStep >= 3}
        label="验证"
        refCallback={(element) => {
          nodeRefs.current.verify = element;
        }}
        status={pitfall === "none" ? "契约稳定" : "先修正陷阱"}
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
        当前责任清单
      </text>
      {responsibilities.slice(0, visibleCount).map((item, index) => (
        <text
          key={item}
          x={50 + (index % 2) * 138}
          y={290 + Math.floor(index / 2) * 25}
          fontSize="13"
          fill={COLORS.secondary}
        >
          {index + 1}. {item}
        </text>
      ))}
      <rect
        x="378"
        y="230"
        width="338"
        height="106"
        rx="12"
        fill={COLORS.elevated}
        stroke={pitfall === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="402"
        y="260"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前检查点：第 {activeStep + 1} 步
      </text>
      <text x="402" y="292" fontSize="13" fill={COLORS.secondary}>
        {pitfall === "flags"
          ? "布尔参数让调用者猜测函数模式。"
          : pitfall === "output"
            ? "输出藏在输入对象里，契约不透明。"
            : "每个名字都能说明一段单一责任。"}
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        预测：责任段增加时，哪个边界最先需要一个有意图的名字？
      </text>
    </g>
  );
}

function CqsView({ mode }: { mode: "mixed" | "separated" }) {
  const mixed = mode === "mixed";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        CQS：命令与查询的契约应该一眼可见
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        同时读写会让调用者猜测副作用；分离后，函数名与返回值更容易形成稳定预期。
      </text>
      <rect
        x="28"
        y="96"
        width="326"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={mixed ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text x="52" y="130" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        {mixed ? "混合函数" : "分离后的接口"}
      </text>
      <text x="52" y="174" fontSize="13" fill={COLORS.secondary}>
        {mixed ? "getUserAndUpdateCache()" : "getUser()"}
      </text>
      <text
        x="52"
        y="212"
        fontSize="13"
        fill={mixed ? COLORS.warning : COLORS.success}
      >
        {mixed ? "读取 + 改缓存" : "只读，不改状态"}
      </text>
      <text x="52" y="266" fontSize="13" fill={COLORS.secondary}>
        调用者是否需要防范隐藏副作用？
      </text>
      <line
        x1="356"
        y1="206"
        x2="414"
        y2="206"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-functions-arrow)"
      />
      <rect
        x="436"
        y="96"
        width="280"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x="460"
        y="130"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        两个清楚的动作
      </text>
      <text x="460" y="174" fontSize="13" fill={COLORS.success}>
        query → 返回数据，不改状态
      </text>
      <text x="460" y="218" fontSize="13" fill={COLORS.accent}>
        command → 改状态，不伪装查询
      </text>
      <text x="460" y="274" fontSize="13" fill={COLORS.secondary}>
        先猜：哪一个更容易写出测试预期？
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        动手试：切换混合与分离，说明调用者需要承担的认知成本。
      </text>
    </g>
  );
}

function ParametersView({
  parameterCount,
  sideEffects,
}: {
  parameterCount: number;
  sideEffects: number;
}) {
  const needsObject = parameterCount > 3;
  const stable = sideEffects < 0.45;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        参数边界：数量是警报，契约才是决定
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        参数太多会让调用者拼装上下文；副作用太多则需要拆责任或显式封装。
      </text>
      <rect
        x="28"
        y="96"
        width="326"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="130" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前输入契约
      </text>
      <text x="52" y="174" fontSize="13" fill={COLORS.secondary}>
        参数数量：{parameterCount}
      </text>
      <rect
        x="52"
        y="186"
        width="238"
        height="12"
        rx="6"
        fill={COLORS.border}
      />
      <rect
        x="52"
        y="186"
        width={238 * (parameterCount / 6)}
        height="12"
        rx="6"
        fill={needsObject ? COLORS.warning : COLORS.success}
        fillOpacity="0.82"
      />
      <text
        x="52"
        y="236"
        fontSize="13"
        fill={needsObject ? COLORS.warning : COLORS.success}
      >
        {needsObject ? "考虑参数对象或拆分调用" : "参数仍可被局部理解"}
      </text>
      <text x="52" y="282" fontSize="13" fill={COLORS.secondary}>
        三个是经验警报，不是机械上限。
      </text>
      <line
        x1="356"
        y1="206"
        x2="414"
        y2="206"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-functions-arrow)"
      />
      <rect
        x="436"
        y="96"
        width="280"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={stable ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="460"
        y="130"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        副作用信号：{sideEffects.toFixed(2)}
      </text>
      <rect
        x="460"
        y="158"
        width="220"
        height="14"
        rx="7"
        fill={COLORS.border}
      />
      <rect
        x="460"
        y="158"
        width={220 * sideEffects}
        height="14"
        rx="7"
        fill={stable ? COLORS.success : COLORS.warning}
        fillOpacity="0.82"
      />
      <text
        x="460"
        y="218"
        fontSize="13"
        fill={stable ? COLORS.success : COLORS.warning}
      >
        {stable ? "查询与命令边界较清楚" : "副作用扩散，先拆出责任"}
      </text>
      <text x="460" y="274" fontSize="13" fill={COLORS.secondary}>
        不能用少参数掩盖多种变化理由。
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        先猜一猜：参数少但副作用高，函数真的更容易理解吗？
      </text>
    </g>
  );
}

/** 函数专属实验：把责任边界、CQS 和参数压力放入一条可复位轨迹。 */
export function CqrfFunctionsLab() {
  const [view, setView] = useState<View>("anatomy");
  const [complexity, setComplexity] = useState(0.62);
  const [parameterCount, setParameterCount] = useState(3);
  const [sideEffects, setSideEffects] = useState(0.38);
  const [pitfall, setPitfall] = useState<Pitfall>("none");
  const [cqsMode, setCqsMode] = useState<"mixed" | "separated">("mixed");
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
    setView("anatomy");
    setComplexity(0.62);
    setParameterCount(3);
    setSideEffects(0.38);
    setPitfall("none");
    setCqsMode("mixed");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="函数专属责任边界、CQS 与参数压力实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="codequalityrefactoring-03"
      data-visual-kind="cqrf-functions-boundaries"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 FunctionBoundaryLab · 责任、CQS 与参数
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让函数边界成为可读、可测的契约
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：把责任段、副作用和参数数量调高后，哪个边界最先失去清晰度？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择函数实验视角">
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
            label="责任复杂度"
            min={0.1}
            max={1}
            step={0.01}
            value={complexity}
            onChange={setComplexity}
          />
          <RangeControl
            label="参数数量"
            min={1}
            max={6}
            step={1}
            value={parameterCount}
            onChange={setParameterCount}
          />
          <RangeControl
            label="副作用信号"
            min={0.05}
            max={1}
            step={0.01}
            value={sideEffects}
            onChange={setSideEffects}
          />
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择函数误区模式">
          <ViewButton
            active={pitfall === "none"}
            onClick={() => setPitfall("none")}
          >
            正常结构
          </ViewButton>
          <ViewButton
            active={pitfall === "flags"}
            onClick={() => setPitfall("flags")}
          >
            布尔参数
          </ViewButton>
          <ViewButton
            active={pitfall === "output"}
            onClick={() => setPitfall("output")}
          >
            输出参数
          </ViewButton>
        </div>
        {view === "cqs" && (
          <div className="flex flex-wrap gap-2" aria-label="选择 CQS 状态">
            <ViewButton
              active={cqsMode === "mixed"}
              onClick={() => setCqsMode("mixed")}
            >
              混合读写
            </ViewButton>
            <ViewButton
              active={cqsMode === "separated"}
              onClick={() => setCqsMode("separated")}
            >
              查询与命令分离
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
                id="cqrf-functions-arrow"
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
            {view === "anatomy" ? (
              <AnatomyView
                activeStep={timeline.currentStep}
                complexity={complexity}
                nodeRefs={nodeRefs}
                pitfall={pitfall}
              />
            ) : view === "cqs" ? (
              <CqsView mode={cqsMode} />
            ) : (
              <ParametersView
                parameterCount={parameterCount}
                sideEffects={sideEffects}
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
          caption="单步查看观察、拆分、CQS 分离和行为验证；播放后用同一输入重放，确认函数契约没有被改坏。"
          reset={{
            label: "重置函数实验",
            ariaLabel: "重置函数专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
