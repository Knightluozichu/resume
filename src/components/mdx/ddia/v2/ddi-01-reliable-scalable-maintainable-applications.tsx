"use client";

import { useId, useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

const T = TEACHING_BEAT_MS;

type SampleMode = "baseline" | "overload" | "fault";

const STEPS: readonly TeachingStep[] = [
  {
    label: "contract",
    caption: "先写功能正确性、SLO、数据损失边界和可接受陈旧度",
  },
  {
    label: "load",
    caption: "用请求率、读写比、热点与数据量描述真实负载",
  },
  {
    label: "performance",
    caption: "同时看吞吐、P50、P95、P99和资源等待",
  },
  {
    label: "scale",
    caption: "选择纵向、横向、缓存或分区，并记录新的瓶颈",
  },
  {
    label: "operate",
    caption: "让值班人员能观测、回滚、修复和解释一次变更",
  },
  {
    label: "evolve",
    caption: "以兼容接口和渐进迁移验证长期可演化性",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Ddi01ReliableScalableMaintainableLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("baseline");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `ddia-01-reliability-arrow-${instanceId}`;
  const dangerArrowId = `ddia-01-reliability-danger-${instanceId}`;

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const sampleLabel =
    sample === "baseline"
      ? "正常基线"
      : sample === "overload"
        ? "负载增长"
        : "部分故障";
  const firstDivergence =
    sample === "baseline"
      ? "尚未注入；先保存不变量和服务目标"
      : sample === "overload"
        ? "尾延迟先于平均值恶化，需回到负载画像"
        : "节点在线但请求或数据语义已不满足合同";

  function reset() {
    setSample("baseline");
    timeline.goToStep(0);
  }

  const overload = sample === "overload";
  const fault = sample === "fault";
  const statusColor = fault ? C.danger : overload ? C.warning : C.accent;

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ddia-01-reliability-load-maintainability"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              DDIA · 第 1 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              可靠、可扩展、可维护是同一份服务合同
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              改变负载或注入故障后，沿合同、性能、扩展和运维证据找到首个分叉。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择可靠性样本">
            {(
              [
                ["baseline", "正常基线"],
                ["overload", "负载增长"],
                ["fault", "部分故障"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={sample === value}
                onClick={() => setSample(value)}
                className={`min-h-11 rounded-control border px-3 py-2 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                  sample === value
                    ? "border-accent text-accent"
                    : "border-border text-secondary hover:border-accent hover:text-primary"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label={`数据密集型应用系统设计第 1 章可靠性、可扩展性与可维护性实验图：当前样本为${sampleLabel}。时间线展示服务合同、负载、性能、扩展、运维和演化六阶段；首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id={arrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id={dangerArrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            用户结果 → 服务合同 → 负载与性能 → 扩展与运维 → 演化
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            节点在线只是资源状态；可靠性还要求结果正确、损害受限且恢复可解释
          </text>

          <rect
            x="28"
            y="78"
            width="844"
            height="104"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="46"
            y="106"
            fontSize="12"
            fontWeight="700"
            fill={statusColor}
          >
            当前样本 · {sampleLabel}
          </text>
          <text x="46" y="134" fontSize="12" fill={C.primary}>
            观测契约：正确性 · 可用性 · 尾延迟 · 资源等待 · 恢复终点
          </text>
          <text x="46" y="160" fontSize="11" fill={C.secondary}>
            首个偏离点：{firstDivergence}
          </text>
          <rect
            x="702"
            y="112"
            width="142"
            height="42"
            rx="9"
            fill={statusColor}
            fillOpacity="0.12"
            stroke={statusColor}
            strokeWidth="1.5"
          />
          <text
            x="773"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={statusColor}
          >
            {fault ? "停止并对账" : overload ? "查尾部" : "基线就绪"}
          </text>

          <text x="30" y="214" fontSize="12" fontWeight="700" fill={C.primary}>
            三个目标如何互相约束
          </text>
          <rect
            x="28"
            y="230"
            width="844"
            height="174"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <rect
            x="50"
            y="252"
            width="230"
            height="112"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
          />
          <text x="70" y="280" fontSize="12" fontWeight="700" fill={C.success}>
            可靠性
          </text>
          <text x="70" y="305" fontSize="11" fill={C.secondary}>
            故障存在时仍给出正确结果
          </text>
          <text x="70" y="328" fontSize="11" fill={C.secondary}>
            记录损害、检测、切换、恢复
          </text>
          <text x="70" y="351" fontSize="11" fill={C.secondary}>
            不是“节点还在线”
          </text>
          <line
            x1="292"
            y1="308"
            x2="346"
            y2="308"
            stroke={C.border}
            strokeWidth="1.8"
            markerEnd={`url(#${arrowId})`}
          />
          <rect
            x="350"
            y="252"
            width="230"
            height="112"
            rx="10"
            fill={C.warning}
            fillOpacity="0.08"
            stroke={C.warning}
          />
          <text x="370" y="280" fontSize="12" fontWeight="700" fill={C.warning}>
            可扩展性
          </text>
          <text x="370" y="305" fontSize="11" fill={C.secondary}>
            负载增长时保持目标余量
          </text>
          <text x="370" y="328" fontSize="11" fill={C.secondary}>
            看热点、扇出、P95、P99
          </text>
          <text x="370" y="351" fontSize="11" fill={C.secondary}>
            不是只报日均 QPS
          </text>
          <line
            x1="592"
            y1="308"
            x2="646"
            y2="308"
            stroke={fault ? C.danger : C.border}
            strokeWidth={fault ? 2.3 : 1.8}
            markerEnd={`url(#${fault ? dangerArrowId : arrowId})`}
          />
          <rect
            x="650"
            y="252"
            width="194"
            height="112"
            rx="10"
            fill={C.accent}
            fillOpacity="0.08"
            stroke={C.accent}
          />
          <text x="670" y="280" fontSize="12" fontWeight="700" fill={C.accent}>
            可维护性
          </text>
          <text x="670" y="305" fontSize="11" fill={C.secondary}>
            人能理解、观测、变更
          </text>
          <text x="670" y="328" fontSize="11" fill={C.secondary}>
            复杂性不能转嫁值班
          </text>
          <text x="670" y="351" fontSize="11" fill={C.secondary}>
            兼容迁移可回滚
          </text>

          <text x="30" y="442" fontSize="12" fontWeight="700" fill={C.primary}>
            六阶段验收时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = fault && (index === 1 || index === 3);
            const x = 34 + index * 140;
            return (
              <g
                key={step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <circle
                  cx={x + 16}
                  cy="480"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="485"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="476"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="498" fontSize="11" fill={C.secondary}>
                  {isFault ? "首个失败" : "留证"}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="480"
                    x2={x + 132}
                    y2="480"
                    stroke={isFault ? C.danger : C.border}
                    strokeWidth="1.5"
                    markerEnd={`url(#${isFault ? dangerArrowId : arrowId})`}
                  />
                )}
              </g>
            );
          })}

          <rect
            x="28"
            y="536"
            width="844"
            height="86"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="565" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个阶段"}
          </text>
          <text x="46" y="590" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} / {STEPS.length} 步 ·
            保存输入、观测、反例、恢复和回滚条件
          </text>
          <text x="46" y="612" fontSize="11" fill={C.secondary}>
            {overload
              ? "负载增长：优先找尾延迟和排队，不用平均值遮盖最慢请求"
              : fault
                ? "部分故障：先停止扩散，外部对账后再决定重试或切换"
                : "正常基线：先声明成功标准，再选择架构和扩展方式"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="从服务合同开始，依次经过负载、性能、扩展、运维和演化；每一步都能被故障历史推翻。"
          reset={{
            label: "重置第 1 章实验",
            ariaLabel: "重置数据密集型应用系统设计第 1 章实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可靠、可扩展、可维护不是三个孤立指标，而是同一份数据系统服务合同的不同观测面。
      </figcaption>
    </figure>
  );
}
