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

type View = "pipeline" | "stage" | "checkpoint";
type Sample = "expression" | "function" | "external";
type Fault = "none" | "stale" | "handoff";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "pipeline",
    label: "管线总览",
    detail: "沿 C♭ 源文件、token、AST、IR、汇编、ELF 到进程查看阶段交接。",
  },
  {
    id: "stage",
    label: "阶段探针",
    detail: "选择前端、语义、机器或装载阶段，写出该阶段的输入、产物和边界。",
  },
  {
    id: "checkpoint",
    label: "验收检查",
    detail: "用证据包、故障注入和清理重建决定回补、前进或重放。",
  },
];

const SAMPLES: readonly {
  id: Sample;
  label: string;
  detail: string;
}[] = [
  {
    id: "expression",
    label: "整数表达式",
    detail: "验证 token、AST、IR、算术指令和输出。",
  },
  {
    id: "function",
    label: "函数调用",
    detail: "补充绑定、参数、栈帧和调用约定。",
  },
  {
    id: "external",
    label: "外部符号",
    detail: "观察目标文件、重定位、链接和加载。",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "source",
    caption: "固定 C♭ 源文件、工具链坐标和命令，建立可重建入口。",
  },
  {
    label: "front",
    caption: "核对 token、AST、绑定和类型，确认前端交接没有伪产物。",
  },
  {
    label: "backend",
    caption: "沿 IR、IA-32 汇编和调用约定观察降低后的结构。",
  },
  {
    label: "load",
    caption: "检查 ELF、符号、重定位、加载轨迹和进程结果，再决定回补。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const PIPELINE_NODES = [
  { label: "C♭", detail: "源文件", color: COLORS.primary },
  { label: "token", detail: "词法", color: COLORS.accent },
  { label: "AST", detail: "语法树", color: COLORS.accent },
  { label: "IR", detail: "语义降低", color: COLORS.warning },
  { label: "IA-32", detail: "汇编", color: COLORS.warning },
  { label: "ELF", detail: "目标文件", color: COLORS.success },
  { label: "进程", detail: "运行结果", color: COLORS.success },
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
  const safeValue = Number.isFinite(value) ? value : min;
  return (
    <label className="flex min-w-48 flex-1 flex-col gap-1 text-sm text-secondary">
      <span className="flex justify-between gap-3">
        <span>{label}</span>
        <span className="font-mono text-primary">{safeValue}</span>
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

function PipelineView({
  activeStep,
  fault,
  sample,
  station,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
  station: number;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const selectedIndex = Math.min(6, Math.max(0, station - 1));
  const message =
    fault === "stale"
      ? "旧产物混入当前运行，先清理再比较"
      : fault === "handoff"
        ? "阶段交接缺少产物，不能直接进入下游"
        : `${selected.label}沿管线留下可核对产物`;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        管线总览：从源码到进程的证据接力
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        每个箭头都代表一次数据、约束和错误语义的交接。
      </text>
      {PIPELINE_NODES.map((node, index) => {
        const x = 28 + index * 103;
        const active =
          activeStep >= Math.min(index, 3) || selectedIndex === index;
        return (
          <g key={node.label}>
            <rect
              x={x}
              y="112"
              width="84"
              height="82"
              rx="12"
              fill={node.color}
              fillOpacity={active ? 0.15 : 0.04}
              stroke={active ? node.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={x + 42}
              y="146"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill={active ? node.color : COLORS.primary}
            >
              {node.label}
            </text>
            <text
              x={x + 42}
              y="174"
              textAnchor="middle"
              fontSize="11"
              fill={COLORS.secondary}
            >
              {node.detail}
            </text>
            {index < PIPELINE_NODES.length - 1 && (
              <line
                x1={x + 84}
                y1="153"
                x2={x + 100}
                y2="153"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-learning-map-arrow)"
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
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text x="52" y="266" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        当前探针：{selected.detail}
      </text>
      <text
        x="52"
        y="296"
        fontSize="13"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        {message}；当前站点 {station} / 10。
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        预测：故障出现在 ELF 时，哪一份上游产物能帮助你回到最早差异？
      </text>
    </g>
  );
}

function StageView({
  activeStep,
  fault,
  sample,
  station,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
  station: number;
}) {
  const phaseIndex = station <= 3 ? 0 : station <= 6 ? 1 : station <= 8 ? 2 : 3;
  const phases = [
    {
      label: "前端",
      input: "源码 / token",
      output: "AST / 源位置",
      color: COLORS.accent,
    },
    {
      label: "语义",
      input: "AST / 绑定",
      output: "类型 / IR",
      color: COLORS.warning,
    },
    {
      label: "机器",
      input: "IR / 约束",
      output: "IA-32 / 栈",
      color: COLORS.warning,
    },
    {
      label: "装载",
      input: "ELF / 符号",
      output: "进程 / 退出码",
      color: COLORS.success,
    },
  ];
  const selected = phases[phaseIndex];
  const message =
    fault === "handoff"
      ? "缺少当前阶段的产物，先停在交接处"
      : fault === "stale"
        ? "产物版本不一致，清理后重建"
        : `${selected.label}阶段可以用一个 ${SAMPLES.find((item) => item.id === sample)?.label ?? "探针"} 观察`;
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        阶段探针：输入、产物与边界
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        选择一个阶段，不求覆盖全部语言，只求让当前交接可以复现和解释。
      </text>
      {phases.map((phase, index) => {
        const active = index === phaseIndex;
        const x = 28 + index * 174;
        return (
          <g key={phase.label}>
            <rect
              x={x}
              y="96"
              width="144"
              height="92"
              rx="12"
              fill={phase.color}
              fillOpacity={active ? 0.16 : 0.04}
              stroke={active ? phase.color : COLORS.border}
              strokeWidth={active ? 2.5 : 1.5}
            />
            <text
              x={x + 72}
              y="132"
              textAnchor="middle"
              fontSize="16"
              fontWeight="700"
              fill={active ? phase.color : COLORS.primary}
            >
              {phase.label}
            </text>
            <text
              x={x + 72}
              y="159"
              textAnchor="middle"
              fontSize="11"
              fill={COLORS.secondary}
            >
              {phase.input} → {phase.output}
            </text>
            <text
              x={x + 72}
              y="178"
              textAnchor="middle"
              fontSize="11"
              fill={COLORS.secondary}
            >
              {active ? "当前探针" : "可回补"}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="230"
        width="688"
        height="86"
        rx="12"
        fill={COLORS.elevated}
        stroke={fault === "none" ? COLORS.success : COLORS.warning}
        strokeWidth="2"
      />
      <text x="52" y="264" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        阶段合同
      </text>
      <text
        x="164"
        y="264"
        fontSize="13"
        fill={fault === "none" ? COLORS.success : COLORS.warning}
      >
        {message}
      </text>
      <text x="52" y="294" fontSize="12" fill={COLORS.secondary}>
        时间线阶段：{STEPS[activeStep]?.label ?? STEPS[0].label}；站点位置{" "}
        {station} / 10。
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        动手试：阶段产物缺失时，为什么不应该直接生成下游结果？
      </text>
    </g>
  );
}

function CheckpointView({
  activeStep,
  fault,
  sample,
  station,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
  station: number;
}) {
  const rows = [
    {
      label: "输入",
      normal: "源码 / 版本",
      boundary: "目标 ABI",
      color: COLORS.primary,
    },
    {
      label: "产物",
      normal: "AST / IR",
      boundary: "符号 / 重定位",
      color: COLORS.accent,
    },
    {
      label: "结果",
      normal: "输出 / 退出码",
      boundary: "错误位置",
      color: COLORS.success,
    },
  ];
  const stopped = fault !== "none" && activeStep >= 2;
  const decision = stopped
    ? "清理重建并回补"
    : station >= 8
      ? "可以进入下一阶段"
      : "继续补充当前证据";
  return (
    <g>
      <text x="28" y="31" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        验收检查：证据包决定下一步
      </text>
      <text x="28" y="58" fontSize="13" fill={COLORS.secondary}>
        通过不是“最终文件存在”，而是同一输入能重建同一交接并解释失败边界。
      </text>
      <rect
        x="28"
        y="94"
        width="460"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="52" y="127" fontSize="15" fontWeight="700" fill={COLORS.primary}>
        最小证据包
      </text>
      <text x="52" y="157" fontSize="12" fill={COLORS.secondary}>
        样本：
        {SAMPLES.find((item) => item.id === sample)?.label ?? "整数表达式"}
      </text>
      {rows.map((row, index) => {
        const y = 190 + index * 38;
        return (
          <g key={row.label}>
            <circle cx="58" cy={y - 5} r="6" fill={row.color} />
            <text x="78" y={y} fontSize="13" fill={COLORS.primary}>
              {row.label}
            </text>
            <text x="170" y={y} fontSize="12" fill={COLORS.secondary}>
              {row.normal}
            </text>
            <text x="296" y={y} fontSize="12" fill={COLORS.secondary}>
              {row.boundary}
            </text>
          </g>
        );
      })}
      <text x="52" y="292" fontSize="12" fill={COLORS.secondary}>
        工具、命令、退出码与清理记录也随证据包保存。
      </text>
      <rect
        x="516"
        y="94"
        width="200"
        height="222"
        rx="12"
        fill={COLORS.elevated}
        stroke={stopped ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="540"
        y="127"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        当前决定
      </text>
      <text
        x="540"
        y="175"
        fontSize="17"
        fontWeight="700"
        fill={stopped ? COLORS.warning : COLORS.success}
      >
        {decision}
      </text>
      <text x="540" y="220" fontSize="13" fill={COLORS.secondary}>
        {stopped ? "先保留最早差异" : "交接可被重建"}
      </text>
      <text x="540" y="260" fontSize="12" fill={COLORS.secondary}>
        站点：{station} / 10
      </text>
      <text x="540" y="289" fontSize="12" fill={COLORS.secondary}>
        阶段：{STEPS[activeStep]?.label ?? STEPS[0].label}
      </text>
      <text x="28" y="376" fontSize="13" fill={COLORS.accent}>
        先猜一猜：清理重建后仍不一致，应该把探针带回哪一层？
      </text>
    </g>
  );
}

/** 《自制编译器》学习地图专属实验：导航阶段、选择探针并完成证据验收。 */
export function CrcLearningMapLab() {
  const [view, setView] = useState<View>("pipeline");
  const [sample, setSample] = useState<Sample>("expression");
  const [station, setStation] = useState(4);
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
    setView("pipeline");
    setSample("expression");
    setStation(4);
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label="《自制编译器》专属编译管线、阶段探针与验收实验"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crafting-compiler-learning-map"
      data-visual-kind="crc-learning-map-pipeline"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 CrcLearningMapLab · 管线、探针与验收
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            把章节路线变成可重建的编译证据
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：当前问题发生在哪一层，下一份产物能否证明你的判断？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div
          className="flex flex-wrap gap-2"
          aria-label="选择编译器学习地图视角"
        >
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
        </div>
        <div className="flex flex-wrap gap-2" aria-label="选择编译探针样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择编译管线误区模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常证据
          </ViewButton>
          <ViewButton
            active={fault === "stale"}
            onClick={() => setFault("stale")}
          >
            旧产物混入
          </ViewButton>
          <ViewButton
            active={fault === "handoff"}
            onClick={() => setFault("handoff")}
          >
            交接缺失
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
                id="crc-learning-map-arrow"
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
                label="源码"
                refCallback={(element) => {
                  nodeRefs.current.source = element;
                }}
                status="固定入口"
                x={28}
                y={100}
              />
              <Stage
                active
                label="前端"
                refCallback={(element) => {
                  nodeRefs.current.front = element;
                }}
                status="树与类型"
                x={202}
                y={100}
              />
              <Stage
                active
                label="机器"
                refCallback={(element) => {
                  nodeRefs.current.backend = element;
                }}
                status="IR 与汇编"
                x={376}
                y={100}
              />
              <Stage
                active
                label="装载"
                refCallback={(element) => {
                  nodeRefs.current.load = element;
                }}
                status="ELF 与进程"
                x={550}
                y={100}
              />
            </g>
            {view === "pipeline" ? (
              <PipelineView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
                station={station}
              />
            ) : view === "stage" ? (
              <StageView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
                station={station}
              />
            ) : (
              <CheckpointView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
                station={station}
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
          caption="单步查看源码、前端、机器和装载；播放后重置，再用另一种样本重放同一条管线。"
          reset={{
            label: "重置编译器学习地图实验",
            ariaLabel: "重置自制编译器学习地图专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
