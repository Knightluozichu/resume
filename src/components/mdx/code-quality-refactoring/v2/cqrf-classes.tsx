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

type View = "boundary" | "dependency" | "migration";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "boundary",
    label: "职责边界",
    detail: "改变一个类承担的变化理由数量，观察高内聚与 God Class 的差别。",
  },
  {
    id: "dependency",
    label: "依赖方向",
    detail: "改变注入程度，比较类自己创建具体依赖与依赖抽象之间的替换边界。",
  },
  {
    id: "migration",
    label: "迁移过程",
    detail: "按方法分组、抽新类、逐步迁移，并用测试信号保护每一个小步。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "observe",
    caption: "列出类的方法、数据和副作用，找到真正的变化理由。",
  },
  {
    label: "group",
    caption: "按责任和协作关系分组，而不是机械地一方法一类。",
  },
  {
    label: "inject",
    caption: "让变化频繁的外部实现从类外注入，保留清楚的依赖方向。",
  },
  {
    label: "verify",
    caption: "逐步迁移方法，用正常、边界和一处故障回放后再接受变化。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const RESPONSIBILITIES = [
  { title: "用户数据", method: "findUser / saveUser" },
  { title: "邮件通知", method: "sendEmail" },
  { title: "积分计算", method: "calculatePoints" },
  { title: "报表生成", method: "buildReport" },
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

function BoundaryView({
  activeStep,
  nodeRefs,
  responsibilityLoad,
}: {
  activeStep: number;
  nodeRefs: MutableRefObject<Record<string, SVGGElement | null>>;
  responsibilityLoad: number;
}) {
  const shown = RESPONSIBILITIES.slice(0, responsibilityLoad);
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        职责边界：一个类有几个变化理由？
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        SRP 关注变化的理由；方法数量只是线索，不是机械拆分类的规则。
      </text>
      <g
        ref={(element) => {
          nodeRefs.current.observe = element;
        }}
        opacity={activeStep >= 0 ? 1 : 0.4}
      >
        <rect
          x="28"
          y="94"
          width="326"
          height="224"
          rx="12"
          fill={COLORS.elevated}
          stroke={COLORS.danger}
          strokeWidth="2"
        />
        <text
          x="52"
          y="128"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.primary}
        >
          UserService · 当前类
        </text>
        <text x="52" y="155" fontSize="13" fill={COLORS.danger}>
          变化理由：{responsibilityLoad}
        </text>
        {shown.map((item, index) => (
          <g key={item.title}>
            <circle cx="62" cy={184 + index * 29} r="5" fill={COLORS.warning} />
            <text
              x="76"
              y={189 + index * 29}
              fontSize="13"
              fill={COLORS.secondary}
            >
              {item.title} · {item.method}
            </text>
          </g>
        ))}
        <text x="52" y="298" fontSize="13" fill={COLORS.secondary}>
          “用户和邮件和积分”说明边界需要重画。
        </text>
      </g>
      <line
        x1="356"
        y1="206"
        x2="414"
        y2="206"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-classes-arrow)"
      />
      <g
        ref={(element) => {
          nodeRefs.current.group = element;
        }}
        opacity={activeStep >= 1 ? 1 : 0.4}
      >
        <rect
          x="436"
          y="94"
          width="280"
          height="224"
          rx="12"
          fill={COLORS.elevated}
          stroke={COLORS.success}
          strokeWidth="2"
        />
        <text
          x="460"
          y="128"
          fontSize="15"
          fontWeight="700"
          fill={COLORS.primary}
        >
          责任组 · 更清楚的变化入口
        </text>
        {[
          ["UserService", "用户数据"],
          ["EmailService", "邮件通知"],
          ["PointsService", "积分计算"],
        ].map(([name, reason], index) => (
          <g key={name}>
            <rect
              x="460"
              y={150 + index * 38}
              width="232"
              height="27"
              rx="7"
              fill={COLORS.success}
              fillOpacity="0.12"
              stroke={COLORS.success}
            />
            <text
              x="474"
              y={168 + index * 38}
              fontSize="13"
              fill={COLORS.primary}
            >
              {name} · {reason}
            </text>
          </g>
        ))}
        <text x="460" y="285" fontSize="13" fill={COLORS.secondary}>
          先按变化理由分组，再决定类的边界。
        </text>
      </g>
      <text x="28" y="358" fontSize="13" fill={COLORS.secondary}>
        当前阶段：第 {activeStep + 1} 步 ·
        高内聚来自共同责任，低耦合来自清楚的依赖方向。
      </text>
      <text x="28" y="386" fontSize="13" fill={COLORS.accent}>
        预测：把方法平均分配给多个类，是否就一定得到高内聚？
      </text>
    </g>
  );
}

function DependencyView({ injection }: { injection: number }) {
  const directWidth = 220 * (1 - injection);
  const injectedWidth = 220 * injection;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        依赖方向：抽象是为了可替换，而不是为了堆接口
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        调整注入程度，比较 UserService 是否绑死具体数据库实现。
      </text>
      <rect
        x="28"
        y="96"
        width="326"
        height="218"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="130" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        直接创建
      </text>
      <rect
        x="52"
        y="155"
        width="220"
        height="18"
        rx="9"
        fill={COLORS.border}
      />
      <rect
        x="52"
        y="155"
        width={directWidth}
        height="18"
        rx="9"
        fill={COLORS.danger}
        fillOpacity="0.82"
      />
      <text x="52" y="202" fontSize="13" fill={COLORS.secondary}>
        UserService → MySQLConnection
      </text>
      <text x="52" y="238" fontSize="13" fill={COLORS.danger}>
        实现变更需要进入类内部
      </text>
      <text x="52" y="278" fontSize="13" fill={COLORS.secondary}>
        测试替换点：少
      </text>
      <line
        x1="356"
        y1="205"
        x2="414"
        y2="205"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-classes-arrow)"
      />
      <rect
        x="436"
        y="96"
        width="280"
        height="218"
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
        依赖抽象并注入
      </text>
      <rect
        x="460"
        y="155"
        width="220"
        height="18"
        rx="9"
        fill={COLORS.border}
      />
      <rect
        x="460"
        y="155"
        width={injectedWidth}
        height="18"
        rx="9"
        fill={COLORS.success}
        fillOpacity="0.82"
      />
      <text x="460" y="202" fontSize="13" fill={COLORS.secondary}>
        UserService → Database
      </text>
      <text x="460" y="238" fontSize="13" fill={COLORS.success}>
        实现从外部传入，可替换
      </text>
      <text x="460" y="278" fontSize="13" fill={COLORS.secondary}>
        测试替换点：更多
      </text>
      <text x="28" y="354" fontSize="13" fill={COLORS.secondary}>
        注入程度：{injection.toFixed(2)} ·
        只有真实变化压力存在时，抽象层才值得保留。
      </text>
      <text x="28" y="384" fontSize="13" fill={COLORS.accent}>
        先猜一猜：构造函数收进具体类，是否已经完成了依赖反转？
      </text>
    </g>
  );
}

function MigrationView({
  migrationStep,
  testSignal,
}: {
  migrationStep: number;
  testSignal: number;
}) {
  const steps = [
    ["列出方法", "把用户、邮件、积分和报表分开记录"],
    ["按责任分组", "用变化理由而不是行数决定边界"],
    ["抽出新类", "让原类暂时只协调新对象"],
    ["逐步迁移", "每迁一个方法就回放行为"],
  ] as const;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        God Class 怎么拆：先分组，再逐步迁移
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        重构不是一次切断所有连接，而是让每一步都能解释、测试和回退。
      </text>
      {steps.map(([title, detail], index) => {
        const active = index + 1 === migrationStep;
        const done = index + 1 < migrationStep;
        const x = 28 + index * 182;
        return (
          <g key={title}>
            <rect
              x={x}
              y="102"
              width="154"
              height="154"
              rx="12"
              fill={active ? COLORS.accent : COLORS.elevated}
              fillOpacity={active ? 0.14 : 1}
              stroke={active ? COLORS.accent : COLORS.border}
              strokeWidth={active ? 3 : 2}
            />
            <circle
              cx={x + 24}
              cy="130"
              r="10"
              fill={
                done ? COLORS.success : active ? COLORS.accent : COLORS.border
              }
            />
            <text
              x={x + 43}
              y="136"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {title}
            </text>
            <text x={x + 16} y="180" fontSize="13" fill={COLORS.secondary}>
              {detail}
            </text>
            <text
              x={x + 16}
              y="228"
              fontSize="13"
              fill={active ? COLORS.accent : COLORS.secondary}
            >
              {active ? "当前动作" : done ? "已保留证据" : "待执行"}
            </text>
            {index < steps.length - 1 && (
              <line
                x1={x + 157}
                y1="180"
                x2={x + 177}
                y2="180"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#cqrf-classes-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="290"
        width="688"
        height="52"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <text x="48" y="322" fontSize="13" fill={COLORS.secondary}>
        测试信号：{testSignal.toFixed(2)} · 第 {migrationStep}{" "}
        步之后，仍要从干净状态重放同一行为。
      </text>
      <text x="28" y="382" fontSize="13" fill={COLORS.accent}>
        动手试：如果一个方法迁移后行为变化，先回退哪一步，为什么？
      </text>
    </g>
  );
}

/** 类与组织专属实验：把 SRP、内聚、耦合和依赖注入串成可回放的边界判断。 */
export function CqrfClassesLab() {
  const [view, setView] = useState<View>("boundary");
  const [responsibilityLoad, setResponsibilityLoad] = useState(4);
  const [injection, setInjection] = useState(0.72);
  const [migrationStep, setMigrationStep] = useState(2);
  const [testSignal, setTestSignal] = useState(0.76);
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
            opacity: [0.38, 1],
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
    setView("boundary");
    setResponsibilityLoad(4);
    setInjection(0.72);
    setMigrationStep(2);
    setTestSignal(0.76);
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="类与组织专属职责边界、依赖方向与迁移实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cqrf-classes-boundary-dependency"
      data-unit-id="codequalityrefactoring-07"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 ClassBoundaryLab · 职责边界、依赖方向与迁移保护
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            类的边界由变化理由决定，依赖的方向由替换压力决定
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：把所有方法塞进一个类，会让哪些变化一起发生？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择类与组织实验视角">
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
            label="变化理由数量"
            min={1}
            max={4}
            step={1}
            value={responsibilityLoad}
            onChange={setResponsibilityLoad}
          />
          <RangeControl
            label="注入程度"
            min={0.1}
            max={1}
            step={0.01}
            value={injection}
            onChange={setInjection}
          />
          <RangeControl
            label="迁移步骤"
            min={1}
            max={4}
            step={1}
            value={migrationStep}
            onChange={setMigrationStep}
          />
          <RangeControl
            label="测试信号"
            min={0.1}
            max={1}
            step={0.01}
            value={testSignal}
            onChange={setTestSignal}
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
                id="cqrf-classes-arrow"
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
            {view === "boundary" ? (
              <BoundaryView
                activeStep={timeline.currentStep}
                nodeRefs={nodeRefs}
                responsibilityLoad={responsibilityLoad}
              />
            ) : view === "dependency" ? (
              <DependencyView injection={injection} />
            ) : (
              <MigrationView
                migrationStep={migrationStep}
                testSignal={testSignal}
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
          caption="单步查看边界决策，播放查看迁移顺序；改变参数后，用同一行为样本检查是否需要回退。"
          reset={{
            label: "重置类与组织实验",
            ariaLabel: "重置类与组织专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
