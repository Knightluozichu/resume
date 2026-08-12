"use client";

import { useMemo, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 760;
const VIEW_H = 420;
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

type View = "pipeline" | "compare" | "regress";
type Sample = "local" | "cross" | "target";
type Fault = "none" | "sideEffect" | "metric";

const VIEWS: readonly { id: View; label: string; detail: string }[] = [
  {
    id: "pipeline",
    label: "变换链",
    detail: "沿 baseline IR/asm、一个变换、candidate 和差分测试回放。",
  },
  {
    id: "compare",
    label: "指标矩阵",
    detail: "把语义差分、代码尺寸和运行时间分成三项独立判定。",
  },
  {
    id: "regress",
    label: "回归复现",
    detail: "固定输入、失败样本和清理重建记录组成可复现证据包。",
  },
] as const;

const SAMPLES: readonly {
  id: Sample;
  label: string;
  source: string;
  transform: string;
  size: string;
  signal: string;
}[] = [
  {
    id: "local",
    label: "局部变换",
    source: "x + 0",
    transform: "→ x",
    size: "2.0 → 1.0",
    signal: "semantic diff",
  },
  {
    id: "cross",
    label: "跨节点变换",
    source: "load x; load x",
    transform: "→ load x",
    size: "3.0 → 2.0",
    signal: "alias check",
  },
  {
    id: "target",
    label: "目标相关变换",
    source: "mul 2",
    transform: "→ shl 1",
    size: "5.0 → 4.0",
    signal: "target legality",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  { label: "source", caption: "固定源码、工具链和输入。" },
  { label: "transform", caption: "只启用一个候选变换。" },
  { label: "semantic", caption: "先比较可观察语义。" },
  { label: "measure", caption: "再记录尺寸和运行指标。" },
  { label: "verify", caption: "清理重建并回归复现。" },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CONCEPTS = [
  "第17章 优化的方法",
  "17.1 什么是优化",
  "17.2 优化的分类",
  "17.3 cbc中的优化",
  "17.4 更深层的优化",
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

function PipelineStage({
  label,
  status,
  x,
  refCallback,
}: {
  label: string;
  status: string;
  x: number;
  refCallback?: (element: SVGGElement | null) => void;
}) {
  return (
    <g ref={refCallback}>
      <rect
        x={x}
        y="108"
        width="132"
        height="76"
        rx="12"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text
        x={x + 16}
        y="136"
        fontSize="15"
        fontWeight="700"
        fill={COLORS.primary}
      >
        {label}
      </text>
      <text x={x + 16} y="164" fontSize="13" fill={COLORS.secondary}>
        {status}
      </text>
    </g>
  );
}

function PipelineView({
  activeStep,
  fault,
  sample,
}: {
  activeStep: number;
  fault: Fault;
  sample: Sample;
}) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const semanticFault = fault === "sideEffect";
  const stages = [
    ["baseline", "IR / asm", COLORS.accent],
    ["transform", selected.transform, COLORS.warning],
    ["candidate", "IR / asm", COLORS.success],
    [
      "diff",
      semanticFault ? "mismatch" : "same inputs",
      semanticFault ? COLORS.danger : COLORS.success,
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        变换链：一次只改一条规则
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · {selected.source} {selected.transform} ·
        先看语义差分，再看收益。
      </text>
      {stages.map(([label, detail, color], index) => {
        const x = 28 + index * 176;
        const active = activeStep >= Math.min(index + 1, 4);
        return (
          <g key={label} opacity={active ? 1 : 0.45}>
            <rect
              x={x}
              y="100"
              width="156"
              height="126"
              rx="12"
              fill={color}
              fillOpacity="0.12"
              stroke={color}
              strokeWidth="2"
            />
            <text
              x={x + 16}
              y="132"
              fontSize="14"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text x={x + 16} y="168" fontSize="13" fill={color}>
              {detail}
            </text>
            <text x={x + 16} y="202" fontSize="13" fill={COLORS.secondary}>
              {index === 0
                ? "固定参照"
                : index === 1
                  ? "单规则"
                  : index === 2
                    ? "同输入"
                    : semanticFault
                      ? "失败"
                      : selected.signal}
            </text>
            {index < stages.length - 1 && (
              <line
                x1={x + 156}
                y1="163"
                x2={x + 172}
                y2="163"
                stroke={COLORS.accent}
                strokeWidth="3"
                markerEnd="url(#crc-optimization-arrow)"
              />
            )}
          </g>
        );
      })}
      <rect
        x="28"
        y="270"
        width="704"
        height="62"
        rx="12"
        fill={semanticFault ? COLORS.danger : COLORS.success}
        fillOpacity="0.12"
        stroke={semanticFault ? COLORS.danger : COLORS.success}
        strokeWidth="2"
      />
      <text x="50" y="298" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        {semanticFault
          ? "语义差分失败：候选触碰了副作用或边界前提"
          : "语义差分通过：候选可以进入尺寸与时间测量"}
      </text>
      <text
        x="50"
        y="322"
        fontSize="13"
        fill={semanticFault ? COLORS.danger : COLORS.success}
      >
        {semanticFault
          ? "保留最小输入、IR 片段和变换前提，先回滚这一条规则。"
          : `固定输入与目标：${selected.source} ${selected.transform} · signal=${selected.signal}`}
      </text>
      <text x="28" y="378" fontSize="14" fontWeight="700" fill={COLORS.primary}>
        baseline IR/asm → one transform → differential tests
      </text>
      <text x="28" y="400" fontSize="13" fill={COLORS.accent}>
        语义不变量是硬门槛，静态尺寸不是替代品。
      </text>
    </g>
  );
}

function CompareView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const metricFault = fault === "metric";
  const rows = [
    ["语义差分", "same inputs", metricFault ? "先验收" : "PASS"],
    ["代码尺寸", selected.size, "size -A"],
    [
      "运行时间",
      metricFault ? "波动过大" : "固定重复",
      metricFault ? "RECHECK" : "benchmark",
    ],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        指标矩阵：正确性、尺寸与时间分开判定
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        {selected.label} · 候选 {selected.transform} ·
        不把一次测量当成普遍结论。
      </text>
      <rect
        x="28"
        y="88"
        width="704"
        height="48"
        rx="10"
        fill={COLORS.elevated}
        stroke={COLORS.border}
        strokeWidth="2"
      />
      <text x="48" y="118" fontSize="13" fontWeight="700" fill={COLORS.primary}>
        指标
      </text>
      <text
        x="240"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        候选结果
      </text>
      <text
        x="500"
        y="118"
        fontSize="13"
        fontWeight="700"
        fill={COLORS.primary}
      >
        证据命令
      </text>
      {rows.map(([metric, value, command], index) => {
        const y = 148 + index * 62;
        const warning = metricFault && metric === "运行时间";
        return (
          <g key={metric}>
            <rect
              x="28"
              y={y}
              width="704"
              height="44"
              rx="9"
              fill={warning ? COLORS.warning : COLORS.elevated}
              fillOpacity={warning ? 0.14 : 1}
              stroke={warning ? COLORS.warning : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 28}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {metric}
            </text>
            <text
              x="240"
              y={y + 28}
              fontSize="13"
              fill={
                warning
                  ? COLORS.warning
                  : metric === "语义差分"
                    ? COLORS.success
                    : COLORS.secondary
              }
            >
              {value}
            </text>
            <text
              x="500"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.warning : COLORS.secondary}
            >
              {command}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="352"
        width="704"
        height="42"
        rx="9"
        fill={metricFault ? COLORS.warning : COLORS.success}
        fillOpacity="0.12"
        stroke={metricFault ? COLORS.warning : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="48"
        y="379"
        fontSize="13"
        fontWeight="700"
        fill={metricFault ? COLORS.warning : COLORS.success}
      >
        {metricFault
          ? "测量不稳定：固定环境、顺序和重复次数后再报告收益"
          : "矩阵通过：语义先行，尺寸和时间各自留有证据"}
      </text>
    </g>
  );
}

function RegressView({ fault, sample }: { fault: Fault; sample: Sample }) {
  const selected = SAMPLES.find((item) => item.id === sample) ?? SAMPLES[0];
  const semanticFault = fault === "sideEffect";
  const rows = [
    ["固定输入", "case-00..case-03", "same command"],
    ["候选结果", semanticFault ? "case-02 mismatch" : "all matched", "regress"],
    [
      "失败样本",
      semanticFault ? `${selected.source} boundary` : "none",
      "save IR + asm",
    ],
    ["清理重建", "remove *.o; rebuild", "repeat"],
  ] as const;
  return (
    <g>
      <text x="28" y="32" fontSize="16" fontWeight="700" fill={COLORS.primary}>
        回归复现：把环境和失败样本一起保存
      </text>
      <text x="28" y="59" fontSize="13" fill={COLORS.secondary}>
        固定 {selected.label}、目标和输入，清理目标文件后验证同一收益方向。
      </text>
      {rows.map(([label, result, evidence], index) => {
        const y = 92 + index * 62;
        const warning = semanticFault && label === "候选结果";
        return (
          <g key={label}>
            <rect
              x="28"
              y={y}
              width="704"
              height="44"
              rx="9"
              fill={warning ? COLORS.danger : COLORS.elevated}
              fillOpacity={warning ? 0.14 : 1}
              stroke={warning ? COLORS.danger : COLORS.border}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y={y + 28}
              fontSize="13"
              fontWeight="700"
              fill={COLORS.primary}
            >
              {label}
            </text>
            <text
              x="240"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.danger : COLORS.secondary}
            >
              {result}
            </text>
            <text
              x="520"
              y={y + 28}
              fontSize="13"
              fill={warning ? COLORS.danger : COLORS.accent}
            >
              {evidence}
            </text>
          </g>
        );
      })}
      <rect
        x="28"
        y="350"
        width="704"
        height="44"
        rx="9"
        fill={semanticFault ? COLORS.danger : COLORS.success}
        fillOpacity="0.12"
        stroke={semanticFault ? COLORS.danger : COLORS.success}
        strokeWidth="2"
      />
      <text
        x="48"
        y="378"
        fontSize="13"
        fontWeight="700"
        fill={semanticFault ? COLORS.danger : COLORS.success}
      >
        {semanticFault
          ? "证据包未通过：不要组合下一条规则"
          : "证据包通过：可进入下一轮规则组合"}
      </text>
    </g>
  );
}

/** 第17章专属实验：回放优化变换、语义差分和收益复现。 */
export function Crc17OptimizationLab() {
  const [view, setView] = useState<View>("pipeline");
  const [sample, setSample] = useState<Sample>("local");
  const [fault, setFault] = useState<Fault>("none");
  const stageRefs = useRef<Record<string, SVGGElement | null>>({});
  const current = useMemo(
    () => VIEWS.find((item) => item.id === view) ?? VIEWS[0],
    [view],
  );
  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        const node = stageRefs.current[step.label];
        if (!node) return;
        tl.add(
          node,
          {
            opacity: [0.35, 1],
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
    setSample("local");
    setFault("none");
    timeline.goToStep(0);
  }

  return (
    <section
      aria-label={`第17章 优化的方法专属语义保持优化实验；${CONCEPTS.join("；")}`}
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
      data-unit-id="crc-unit-17"
      data-visual-kind="crc-optimization-semantic-diff-replay"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold tracking-wide text-accent">
            专属 Crc17OptimizationLab · 语义保持优化台
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            先证明仍是同一个程序，再讨论变短或变快
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            先预测：候选尺寸下降后，哪一项差分证据能决定是否允许继续测量？
          </p>
        </div>
      </header>
      <div className="min-w-0 space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap gap-2" aria-label="选择优化实验视角">
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
        <div className="flex flex-wrap gap-2" aria-label="选择优化变换样本">
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
        <div className="flex flex-wrap gap-2" aria-label="选择优化故障模式">
          <ViewButton
            active={fault === "none"}
            onClick={() => setFault("none")}
          >
            正常证据
          </ViewButton>
          <ViewButton
            active={fault === "sideEffect"}
            onClick={() => setFault("sideEffect")}
          >
            语义差分失败
          </ViewButton>
          <ViewButton
            active={fault === "metric"}
            onClick={() => setFault("metric")}
          >
            指标漂移
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
                id="crc-optimization-arrow"
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
              {STEPS.map((step, index) => (
                <PipelineStage
                  key={step.label}
                  label={`T${index}`}
                  status={step.label}
                  x={28 + index * 146}
                  refCallback={(element) => {
                    stageRefs.current[step.label] = element;
                  }}
                />
              ))}
            </g>
            {view === "pipeline" ? (
              <PipelineView
                activeStep={timeline.currentStep}
                fault={fault}
                sample={sample}
              />
            ) : view === "compare" ? (
              <CompareView fault={fault} sample={sample} />
            ) : (
              <RegressView fault={fault} sample={sample} />
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
          caption="单步查看 source、transform、semantic、measure 和 verify；重置后用同一输入重放，确认优化收益没有因环境漂移。"
          reset={{
            label: "重置优化实验",
            ariaLabel: "重置优化的方法专属实验",
            onClick: reset,
          }}
        />
      </div>
    </section>
  );
}
