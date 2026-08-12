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

type View = "roadmap" | "slice" | "checkpoint";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "roadmap",
    label: "路线总览",
    detail: "从整洁代码进入重构手法，再用总复习把判断标准串起来。",
  },
  {
    id: "slice",
    label: "练习切片",
    detail:
      "选择一个学习站点，决定本次只练一个可观察动作，避免把全书当成清单背诵。",
  },
  {
    id: "checkpoint",
    label: "验收检查",
    detail: "用正常、边界和单一故障样本检查自己是否能独立解释与迁移。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "orient",
    caption: "先看全书地图，分清整洁代码、重构手法和复习之间的职责。",
  },
  {
    label: "clean",
    caption: "沿整洁代码板块建立命名、函数、错误处理、测试和组织的直觉。",
  },
  {
    label: "refactor",
    caption: "进入重构板块，把代码异味转化为可回退的小步变换。",
  },
  {
    label: "review",
    caption: "用总复习重放一条完整链路，确认知识能解释、练习和迁移。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STATIONS = [
  { title: "整洁代码的意义", group: "建立直觉", action: "说出维护成本" },
  { title: "有意义的命名", group: "整洁代码", action: "重命名一处" },
  { title: "函数", group: "整洁代码", action: "拆出一个责任" },
  { title: "注释与格式", group: "整洁代码", action: "让意图显式" },
  { title: "错误处理", group: "整洁代码", action: "分离异常路径" },
  { title: "单元测试", group: "整洁代码", action: "固定一个边界" },
  { title: "类与组织", group: "整洁代码", action: "检查依赖方向" },
  { title: "代码异味", group: "准备重构", action: "命名一种异味" },
  { title: "重构手法", group: "安全变换", action: "完成一小步" },
  { title: "总复习", group: "独立验收", action: "解释完整链路" },
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
  return (
    <label className="flex min-w-44 flex-1 flex-col gap-1 text-sm text-secondary">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-primary">{value}</span>
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

function RoadmapView({
  activeStep,
  nodeRefs,
  station,
}: {
  activeStep: number;
  nodeRefs: MutableRefObject<Record<string, SVGGElement | null>>;
  station: number;
}) {
  const selected = STATIONS[station - 1] ?? STATIONS[0];
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        全书路线：从直觉到安全变换，再到独立复盘
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        站点是练习入口，不是必须一次背完的目录；每站都要留下一个动作证据。
      </text>
      <path
        d="M54 190H706"
        fill="none"
        stroke={COLORS.border}
        strokeWidth="8"
        strokeLinecap="round"
      />
      {STATIONS.map((item, index) => {
        const x = 54 + index * 72.5;
        const selectedStation = index + 1 === station;
        const completed = index + 1 < station;
        return (
          <g
            key={item.title}
            ref={(element) => {
              if (index < STEPS.length)
                nodeRefs.current[STEPS[index].label] = element;
            }}
            opacity={index < activeStep + 1 || selectedStation ? 1 : 0.42}
          >
            <circle
              cx={x}
              cy="190"
              r={selectedStation ? 16 : 11}
              fill={
                completed
                  ? COLORS.success
                  : selectedStation
                    ? COLORS.accent
                    : COLORS.border
              }
              stroke={selectedStation ? COLORS.accent : COLORS.elevated}
              strokeWidth="3"
            />
            <text
              x={x}
              y="150"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {index + 1}
            </text>
            <text
              x={x}
              y="235"
              textAnchor="middle"
              fontSize="11"
              fill={COLORS.secondary}
            >
              {item.title.length > 6
                ? `${item.title.slice(0, 6)}…`
                : item.title}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="274"
        width="688"
        height="78"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.accent}
        strokeWidth="2"
      />
      <text x="50" y="304" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        第 {station} 站：{selected.title}
      </text>
      <text x="50" y="330" fontSize="13" fill={COLORS.secondary}>
        板块：{selected.group} · 本站动作：{selected.action} · 当前路线阶段：第{" "}
        {activeStep + 1} 步
      </text>
      <text x="28" y="386" fontSize="13" fill={COLORS.accent}>
        先预测：下一站需要的新能力，会建立在上一站的哪个证据之上？
      </text>
    </g>
  );
}

function SliceView({ minutes, station }: { minutes: number; station: number }) {
  const selected = STATIONS[station - 1] ?? STATIONS[0];
  const slices = [
    {
      title: "读懂",
      detail: "用自己的话说出责任",
      width: Math.min(270, 70 + minutes * 4),
      color: COLORS.accent,
    },
    {
      title: "动手",
      detail: selected.action,
      width: Math.min(270, 45 + minutes * 3.2),
      color: COLORS.success,
    },
    {
      title: "回放",
      detail: "比较一个边界结果",
      width: Math.min(270, 35 + minutes * 2.6),
      color: COLORS.warning,
    },
  ];
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        练习切片：一次只推进一个可观察动作
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        时间不是完成保证；切片必须有输入、动作和可回看的结果。
      </text>
      <rect
        x="28"
        y="94"
        width="326"
        height="226"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="128" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前练习站
      </text>
      <text x="52" y="166" fontSize="15" fill={COLORS.accent}>
        {station}. {selected.title}
      </text>
      <text x="52" y="202" fontSize="13" fill={COLORS.secondary}>
        练习动作：{selected.action}
      </text>
      <text x="52" y="238" fontSize="13" fill={COLORS.secondary}>
        建议切片：{minutes} 分钟
      </text>
      <text x="52" y="278" fontSize="13" fill={COLORS.secondary}>
        结束时写下一个反例，而不是只打勾。
      </text>
      <line
        x1="356"
        y1="206"
        x2="414"
        y2="206"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-map-arrow)"
      />
      <rect
        x="436"
        y="94"
        width="280"
        height="226"
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
        三段证据
      </text>
      {slices.map((slice, index) => {
        const y = 166 + index * 46;
        return (
          <g key={slice.title}>
            <text x="460" y={y} fontSize="13" fill={COLORS.secondary}>
              {slice.title} · {slice.detail}
            </text>
            <rect
              x="460"
              y={y + 9}
              width="220"
              height="12"
              rx="6"
              fill={COLORS.border}
            />
            <rect
              x="460"
              y={y + 9}
              width={slice.width * 0.8}
              height="12"
              rx="6"
              fill={slice.color}
              fillOpacity="0.82"
            />
          </g>
        );
      })}
      <text x="28" y="358" fontSize="13" fill={COLORS.secondary}>
        练习切片越小，越容易判断变化来自理解、实现还是验证，而不是来自时间压力。
      </text>
    </g>
  );
}

function CheckpointView({ checkpoint }: { checkpoint: number }) {
  const checks = [
    {
      title: "正常样本",
      detail: "能说明主路径为何成立",
      color: COLORS.success,
    },
    {
      title: "边界样本",
      detail: "能指出等号、空值或极值",
      color: COLORS.warning,
    },
    {
      title: "一处故障",
      detail: "能定位首个偏离和回退点",
      color: COLORS.danger,
    },
  ];
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        验收检查：学会了不等于能独立复盘
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        逐项检查解释、操作和迁移；第一个未完成的检查点就是下一次练习入口。
      </text>
      {checks.map((check, index) => {
        const active = index + 1 === checkpoint;
        const x = 28 + index * 238;
        return (
          <g key={check.title}>
            <rect
              x={x}
              y="106"
              width="206"
              height="154"
              rx="12"
              fill={active ? check.color : COLORS.elevated}
              fillOpacity={active ? 0.14 : 1}
              stroke={active ? check.color : COLORS.border}
              strokeWidth={active ? 3 : 2}
            />
            <circle cx={x + 25} cy="134" r="10" fill={check.color} />
            <text
              x={x + 45}
              y="140"
              fontSize="15"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {check.title}
            </text>
            <text x={x + 18} y="184" fontSize="13" fill={COLORS.secondary}>
              {check.detail}
            </text>
            <text
              x={x + 18}
              y="226"
              fontSize="13"
              fill={active ? check.color : COLORS.secondary}
            >
              {active ? "当前检查点" : "准备证据"}
            </text>
          </g>
        );
      })}
      <line
        x1="234"
        y1="184"
        x2="260"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-map-arrow)"
      />
      <line
        x1="472"
        y1="184"
        x2="498"
        y2="184"
        stroke={COLORS.accent}
        strokeWidth="3"
        markerEnd="url(#cqrf-map-arrow)"
      />
      <rect
        x="28"
        y="294"
        width="688"
        height="54"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
      />
      <text x="48" y="327" fontSize="13" fill={COLORS.secondary}>
        当前第 {checkpoint} 个检查点：先写出证据，再决定是否进入下一站。
      </text>
      <text x="28" y="384" fontSize="13" fill={COLORS.accent}>
        动手试：把一个章节结论改写成可被别人复现的最小练习。
      </text>
    </g>
  );
}

/** 学习地图专属实验：把目录路线、练习切片和独立验收放进同一张导航图。 */
export function CqrfLearningMapLab() {
  const [view, setView] = useState<View>("roadmap");
  const [station, setStation] = useState(1);
  const [minutes, setMinutes] = useState(25);
  const [checkpoint, setCheckpoint] = useState(1);
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
    setView("roadmap");
    setStation(1);
    setMinutes(25);
    setCheckpoint(1);
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="代码质量课程学习地图、练习切片与验收检查专属实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-visual-kind="cqrf-learning-map-navigation"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CodeQualityMapLab · 路线、切片与验收
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把“读完整本书”拆成可以走、可以练、可以复盘的站点
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：下一站真正需要的能力，会由哪一个练习证据支撑？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择学习地图观察视角">
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
            label="学习站点"
            min={1}
            max={10}
            step={1}
            value={station}
            onChange={setStation}
          />
          <RangeControl
            label="切片分钟"
            min={10}
            max={60}
            step={5}
            value={minutes}
            onChange={setMinutes}
          />
          <RangeControl
            label="验收检查点"
            min={1}
            max={3}
            step={1}
            value={checkpoint}
            onChange={setCheckpoint}
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
                id="cqrf-map-arrow"
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
            {view === "roadmap" ? (
              <RoadmapView
                activeStep={timeline.currentStep}
                nodeRefs={nodeRefs}
                station={station}
              />
            ) : view === "slice" ? (
              <SliceView minutes={minutes} station={station} />
            ) : (
              <CheckpointView checkpoint={checkpoint} />
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
          caption="单步查看板块边界，播放查看学习顺序；改变站点后，为本站保留一个可复现动作。"
          reset={{
            label: "重置学习地图实验",
            ariaLabel: "重置代码质量学习地图专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
