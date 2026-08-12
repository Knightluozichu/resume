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

type View = "separation" | "selection" | "recovery";
type Strategy = "exception" | "result" | "return-code";
type Fault = "none" | "empty-catch" | "missing-cleanup";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "separation",
    label: "路径分离",
    detail: "观察正常下单路径与异常路径如何在同一个责任边界汇合。",
  },
  {
    id: "selection",
    label: "方式选择",
    detail: "比较异常、Optional/Result 与返回码在可预期失败中的语义边界。",
  },
  {
    id: "recovery",
    label: "清理恢复",
    detail: "注入空 catch 或遗漏清理，检查错误分类、资源释放与重放结果。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "observe",
    caption: "先沿下单、扣款和发货追踪正常行为，标出可能失败的边界。",
  },
  {
    label: "separate",
    caption: "把主流程与异常处理分开，保留调用者能理解的错误分类。",
  },
  {
    label: "recover",
    caption: "故障发生后释放资源、记录上下文，并决定是否安全重试。",
  },
  {
    label: "verify",
    caption: "用同一输入重放正常、边界和故障路径，确认没有陈旧副作用。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STRATEGIES: readonly { id: Strategy; label: string; detail: string }[] = [
  {
    id: "exception",
    label: "异常",
    detail: "意外失败集中交给边界处理；主流程保持连续，但跳转必须可追踪。",
  },
  {
    id: "result",
    label: "Optional/Result",
    detail: "可预期的没有结果显式进入类型，调用者必须处理成功或失败分支。",
  },
  {
    id: "return-code",
    label: "返回码",
    detail: "适合稳定的低层协议；调用方若漏检，错误会重新污染主流程。",
  },
];

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

function SeparationView({
  activeStep,
  errorRate,
  fault,
  nodeRefs,
  strategy,
}: {
  activeStep: number;
  errorRate: number;
  fault: Fault;
  nodeRefs: MutableRefObject<Record<string, SVGGElement | null>>;
  strategy: Strategy;
}) {
  const faultText =
    fault === "empty-catch"
      ? "空 catch：失败被隐藏"
      : fault === "missing-cleanup"
        ? "未清理：资源仍被占用"
        : "无故障注入";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        路径分离：正常行为与失败责任各自清楚
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        正常路径保持可读；错误边界负责分类、记录、清理与可控恢复。
      </text>
      <Stage
        active={activeStep >= 0}
        label="观察"
        refCallback={(element) => {
          nodeRefs.current.observe = element;
        }}
        status="下单输入"
        x={28}
        y={98}
      />
      <line
        x1="182"
        y1="145"
        x2="216"
        y2="145"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-error-arrow)"
      />
      <Stage
        active={activeStep >= 1}
        label="分离"
        refCallback={(element) => {
          nodeRefs.current.separate = element;
        }}
        status={strategy === "exception" ? "异常边界" : "显式结果"}
        x={230}
        y={98}
      />
      <line
        x1="384"
        y1="145"
        x2="418"
        y2="145"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-error-arrow)"
      />
      <Stage
        active={activeStep >= 2}
        label="恢复"
        refCallback={(element) => {
          nodeRefs.current.recover = element;
        }}
        status={fault === "missing-cleanup" ? "清理未完成" : "释放资源"}
        x={432}
        y={98}
      />
      <line
        x1="586"
        y1="145"
        x2="620"
        y2="145"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-error-arrow)"
      />
      <Stage
        active={activeStep >= 3}
        label="验证"
        refCallback={(element) => {
          nodeRefs.current.verify = element;
        }}
        status={fault === "empty-catch" ? "陈旧结果" : "行为可重放"}
        x={634}
        y={98}
      />
      <rect
        x="28"
        y="232"
        width="326"
        height="98"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="50" y="262" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前观察
      </text>
      <text x="50" y="292" fontSize="13" fill={COLORS.secondary}>
        失败概率：{errorRate.toFixed(2)} · 注入：{faultText}
      </text>
      <rect
        x="50"
        y="304"
        width="250"
        height="12"
        rx="6"
        fill={COLORS.border}
      />
      <rect
        x="50"
        y="304"
        width={250 * errorRate}
        height="12"
        rx="6"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
        fillOpacity="0.82"
      />
      <rect
        x="378"
        y="232"
        width="338"
        height="98"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="402"
        y="262"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前检查点：第 {activeStep + 1} 步
      </text>
      <text x="402" y="292" fontSize="13" fill={COLORS.secondary}>
        {fault === "empty-catch"
          ? "错误被吞掉，调用者可能继续使用旧结果。"
          : fault === "missing-cleanup"
            ? "先释放连接或锁，再决定是否重试。"
            : "保持错误分类、日志和清理责任在边界内。"}
      </text>
      <text x="28" y="370" fontSize="13" fill={COLORS.accent}>
        预测：若失败概率上升，哪一个阶段必须先拥有可观察的状态？
      </text>
    </g>
  );
}

function SelectionView({ strategy }: { strategy: Strategy }) {
  const selected =
    STRATEGIES.find((item) => item.id === strategy) ?? STRATEGIES[0];
  const selectedColor =
    strategy === "return-code"
      ? COLORS.warning
      : strategy === "result"
        ? COLORS.success
        : COLORS.accent;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        方式选择：先区分意外失败与可预期没有结果
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        选择不是偏好投票；它取决于调用者是否能处理、错误是否稀有以及资源边界是否清楚。
      </text>
      <rect
        x="28"
        y="94"
        width="326"
        height="224"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="128" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        三种表达
      </text>
      {STRATEGIES.map((item, index) => {
        const active = item.id === strategy;
        return (
          <g key={item.id}>
            <circle
              cx="62"
              cy={164 + index * 42}
              r="7"
              fill={active ? COLORS.accent : COLORS.border}
            />
            <text
              x="82"
              y={169 + index * 42}
              fontSize="13"
              fill={active ? COLORS.primary : COLORS.secondary}
            >
              {item.label}
            </text>
          </g>
        );
      })}
      <text x="52" y="282" fontSize="13" fill={COLORS.secondary}>
        判断点：调用者能否明确处理失败？
      </text>
      <line
        x1="356"
        y1="206"
        x2="414"
        y2="206"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-error-arrow)"
      />
      <rect
        x="436"
        y="94"
        width="280"
        height="224"
        rx="12"
        fill={COLORS.elevated}
        stroke={selectedColor}
        strokeWidth="2"
      />
      <text
        x="460"
        y="128"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {selected.label}
      </text>
      <text x="460" y="174" fontSize="13" fill={COLORS.secondary}>
        {selected.detail}
      </text>
      <text x="460" y="236" fontSize="13" fill={selectedColor}>
        {strategy === "exception"
          ? "意外失败 → 交给异常边界"
          : strategy === "result"
            ? "可预期没有 → 显式处理"
            : "稳定低层协议 → 约定检查"}
      </text>
      <text x="460" y="280" fontSize="13" fill={COLORS.secondary}>
        不要用一种方式隐藏所有失败。
      </text>
      <text x="28" y="370" fontSize="13" fill={COLORS.accent}>
        动手试：切换方式，说明哪一种最容易让调用者漏掉失败？
      </text>
    </g>
  );
}

function RecoveryView({
  cleanup,
  fault,
  retryBudget,
}: {
  cleanup: number;
  fault: Fault;
  retryBudget: number;
}) {
  const clean = cleanup >= 0.7;
  const retriable = fault !== "empty-catch" && retryBudget > 0;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        清理恢复：错误路径也必须留下可验证的终态
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        finally
        或资源边界负责释放；重试只在失败可分类、操作幂等且预算明确时发生。
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
        故障注入
      </text>
      <text x="52" y="170" fontSize="13" fill={COLORS.secondary}>
        {fault === "empty-catch"
          ? "catch 为空：没有证据出口"
          : fault === "missing-cleanup"
            ? "资源释放被跳过"
            : "边界返回可观察错误"}
      </text>
      <circle
        cx="72"
        cy="220"
        r="12"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      />
      <text x="98" y="226" fontSize="13" fill={COLORS.primary}>
        首个偏离点已标记
      </text>
      <text x="52" y="274" fontSize="13" fill={COLORS.secondary}>
        重试预算：{retryBudget} · 清理完成度：{cleanup.toFixed(2)}
      </text>
      <rect
        x="52"
        y="286"
        width="238"
        height="12"
        rx="6"
        fill={COLORS.border}
      />
      <rect
        x="52"
        y="286"
        width={238 * cleanup}
        height="12"
        rx="6"
        fill={clean ? COLORS.success : COLORS.warning}
        fillOpacity="0.82"
      />
      <line
        x1="356"
        y1="206"
        x2="414"
        y2="206"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-error-arrow)"
      />
      <rect
        x="436"
        y="96"
        width="280"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={clean && retriable ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text
        x="460"
        y="130"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        验收结论
      </text>
      <text
        x="460"
        y="174"
        fontSize="13"
        fill={clean ? COLORS.success : COLORS.warning}
      >
        {clean ? "资源可以回到稳定状态" : "先补清理，再谈恢复"}
      </text>
      <text x="460" y="218" fontSize="13" fill={COLORS.secondary}>
        {retriable
          ? "允许在预算内重试幂等动作。"
          : "禁止盲目重试或继续使用旧结果。"}
      </text>
      <text x="460" y="270" fontSize="13" fill={COLORS.secondary}>
        重放条件：同输入、同版本、同清理规则
      </text>
      <text x="28" y="370" fontSize="13" fill={COLORS.accent}>
        先猜一猜：清理完成度不足时，为什么平均成功率不能证明方案可靠？
      </text>
    </g>
  );
}

/** 错误处理专属实验：比较路径分离、方式选择与清理恢复的责任边界。 */
export function CqrfErrorHandlingLab() {
  const [view, setView] = useState<View>("separation");
  const [strategy, setStrategy] = useState<Strategy>("exception");
  const [fault, setFault] = useState<Fault>("none");
  const [errorRate, setErrorRate] = useState(0.35);
  const [retryBudget, setRetryBudget] = useState(2);
  const [cleanup, setCleanup] = useState(0.72);
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
    setView("separation");
    setStrategy("exception");
    setFault("none");
    setErrorRate(0.35);
    setRetryBudget(2);
    setCleanup(0.72);
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="错误处理专属路径分离、方式选择与清理恢复实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="codequalityrefactoring-05"
      data-visual-kind="cqrf-error-handling-boundaries"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 ErrorBoundaryLab · 路径、方案与恢复
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            让正常流程连续，让失败责任可追踪
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：注入一种故障后，哪条错误路径会先失去证据？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择错误处理实验视角">
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
            label="失败概率"
            min={0.05}
            max={1}
            step={0.01}
            value={errorRate}
            onChange={setErrorRate}
          />
          <RangeControl
            label="重试预算"
            min={0}
            max={5}
            step={1}
            value={retryBudget}
            onChange={setRetryBudget}
          />
          <RangeControl
            label="清理完成度"
            min={0.1}
            max={1}
            step={0.01}
            value={cleanup}
            onChange={setCleanup}
          />
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择错误处理方式">
          {STRATEGIES.map((item) => (
            <ViewButton
              key={item.id}
              active={strategy === item.id}
              onClick={() => setStrategy(item.id)}
            >
              {item.label}
            </ViewButton>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" aria-label="注入错误处理故障">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            无故障
          </ViewButton>
          <ViewButton
            active={fault === "empty-catch"}
            onClick={() => setFault("empty-catch")}
          >
            空 catch
          </ViewButton>
          <ViewButton
            active={fault === "missing-cleanup"}
            onClick={() => setFault("missing-cleanup")}
          >
            遗漏清理
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
                id="cqrf-error-arrow"
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
            {view === "separation" ? (
              <SeparationView
                activeStep={timeline.currentStep}
                errorRate={errorRate}
                fault={fault}
                nodeRefs={nodeRefs}
                strategy={strategy}
              />
            ) : view === "selection" ? (
              <SelectionView strategy={strategy} />
            ) : (
              <RecoveryView
                cleanup={cleanup}
                fault={fault}
                retryBudget={retryBudget}
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
          caption="单步查看从观察、分离到恢复的责任变化；播放后用同一输入重放，确认错误没有被静默吞掉。"
          reset={{
            label: "重置错误处理实验",
            ariaLabel: "重置错误处理专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
