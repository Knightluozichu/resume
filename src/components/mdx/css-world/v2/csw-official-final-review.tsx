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

type SampleMode = "normal" | "boundary" | "recovery";

const STEPS: readonly TeachingStep[] = [
  {
    label: "source",
    caption: "冻结 DOM、声明、视口、字体与内容，先写出可推翻的预测",
  },
  {
    label: "boxes",
    caption: "从生成盒和格式化上下文开始，确认包含块属于谁",
  },
  {
    label: "used values",
    caption: "沿正常流求解计算值、使用尺寸、行框与内联基线",
  },
  {
    label: "paint",
    caption: "最后才检查层叠上下文、装饰和绘制顺序",
  },
  {
    label: "edges",
    caption: "在窄宽、长内容、显隐和书写方向边界上找首个偏离",
  },
  {
    label: "replay",
    caption: "删除单一故障并重放同一输入，确认流体契约恢复",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function CswOfficialFinalReviewLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("normal");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-final-review-arrow-${instanceId}`;
  const warningArrowId = `css-world-final-review-warning-${instanceId}`;

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
    sample === "normal"
      ? "正常基线"
      : sample === "boundary"
        ? "边界压力"
        : "故障恢复";
  const divergence =
    sample === "normal"
      ? "暂无；先记录每一层的输入与预期"
      : sample === "boundary"
        ? "使用尺寸或行框先偏离，不能跳到最终截图"
        : "恢复后旧覆盖仍影响流向或显隐";

  function reset() {
    setSample("normal");
    timeline.goToStep(0);
  }

  const boundary = sample === "boundary";
  const recovery = sample === "recovery";
  const statusColor = recovery ? C.success : boundary ? C.warning : C.accent;

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-final-review-mechanism-gate"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 全书总复习
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从盒生成到恢复：一次可重放的机制验收
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先解释原因链，再观察结果；每次只改变一个输入，并把首个偏离点留在轨迹中。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择总复习样本">
            {(
              [
                ["normal", "正常基线"],
                ["boundary", "边界压力"],
                ["recovery", "故障恢复"],
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
          aria-label={`CSS 世界总复习机制验收图：当前样本为${sampleLabel}。时间线展示从源输入、盒生成、使用值、绘制、边界到恢复的六阶段；首个偏离点为${divergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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
              id={warningArrowId}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            DOM + 声明 → 盒树 → 使用值 → 层叠绘制 → 边界 → 重放
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            截图只是末端结果；发布证据必须能回到第一个可解释的机制分叉
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
            观测契约：固定输入 · 单变量故障 · 首个偏离 · 同输入恢复
          </text>
          <text x="46" y="160" fontSize="11" fill={C.secondary}>
            首个偏离点：{divergence}
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
            {recovery ? "契约恢复" : boundary ? "定位偏离" : "等待注入"}
          </text>

          <text x="30" y="214" fontSize="12" fontWeight="700" fill={C.primary}>
            六阶段证据链
          </text>
          <rect
            x="28"
            y="230"
            width="844"
            height="188"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          {STEPS.map((step, index) => {
            const x = 48 + (index % 3) * 272;
            const y = 250 + Math.floor(index / 3) * 84;
            const active = activeIndex === index;
            const fault = boundary && (index === 2 || index === 4);
            return (
              <g
                key={step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x={x}
                  y={y}
                  width="238"
                  height="62"
                  rx="10"
                  fill={active ? C.accent : C.bg}
                  fillOpacity={active ? 0.12 : 1}
                  stroke={fault ? C.warning : active ? C.accent : C.border}
                  strokeWidth={active || fault ? 1.8 : 1.2}
                />
                <circle
                  cx={x + 22}
                  cy={y + 22}
                  r="12"
                  fill={fault ? C.warning : active ? C.accent : C.border}
                  fillOpacity="0.18"
                  stroke={fault ? C.warning : active ? C.accent : C.border}
                />
                <text
                  x={x + 22}
                  y={y + 26}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={fault ? C.warning : active ? C.accent : C.primary}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 44}
                  y={y + 22}
                  fontSize="12"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 44} y={y + 43} fontSize="11" fill={C.secondary}>
                  {fault ? "保存首个偏离" : active ? "当前检查" : "等待证据"}
                </text>
              </g>
            );
          })}

          <text x="30" y="454" fontSize="12" fontWeight="700" fill={C.primary}>
            变量与观测
          </text>
          <rect
            x="28"
            y="470"
            width="844"
            height="66"
            rx="10"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="496" fontSize="11" fontWeight="700" fill={C.accent}>
            输入：视口 / 内容 / 字体 / 方向 / 一条声明
          </text>
          <line
            x1="356"
            y1="493"
            x2="454"
            y2="493"
            stroke={boundary ? C.warning : C.border}
            strokeWidth="2"
            markerEnd={`url(#${boundary ? warningArrowId : arrowId})`}
          />
          <text x="474" y="496" fontSize="11" fontWeight="700" fill={C.primary}>
            观测：盒 / 使用值 / 行框 / 层叠 / 恢复
          </text>
          <text x="48" y="520" fontSize="11" fill={C.secondary}>
            {recovery
              ? "恢复检查：同一 DOM 与输入重新得到可解释流体结果"
              : "不要用最终像素掩盖中间层的错误假设"}
          </text>

          <rect
            x="28"
            y="556"
            width="844"
            height="66"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="582" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个阶段"}
          </text>
          <text x="46" y="605" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} / {STEPS.length} 步 ·
            保留可重放的输入、观察与恢复结果
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先从 DOM 和声明预测盒树，再在边界样本中定位第一处使用值或流向变化。"
          reset={{
            label: "重置总复习实验",
            ariaLabel: "重置 CSS 世界全书总复习实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        总复习不是把十二章截图拼在一起，而是用同一套机制证据解释并恢复流体布局。
      </figcaption>
    </figure>
  );
}
