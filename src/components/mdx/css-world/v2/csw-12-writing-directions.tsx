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

type SampleMode = "direction" | "vertical" | "mixed";

const STEPS: readonly TeachingStep[] = [
  {
    label: "direction",
    caption: "先确定书写方向和起始边，区分 direction 对顺序与对齐的影响",
  },
  {
    label: "unicode-bidi",
    caption: "让双向文本按嵌入与隔离规则排列，保存逻辑顺序与视觉顺序",
  },
  {
    label: "writing-mode",
    caption: "切换块流与内联流方向，确认它不是简单旋转文字的装饰开关",
  },
  {
    label: "logical axes",
    caption: "把 inline 轴和 block 轴从物理水平/垂直中解耦，重算尺寸与对齐",
  },
  {
    label: "logical sizing",
    caption: "用 inline-size、block-size 和逻辑边距适应不同书写模式",
  },
  {
    label: "mixed language",
    caption: "在中英文、RTL 片段和竖排内容中复核顺序、滚动和溢出边界",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw12WritingDirectionsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("direction");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-12-writing-arrow-${instanceId}`;
  const dangerArrowId = `css-world-12-writing-danger-arrow-${instanceId}`;

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
    sample === "direction"
      ? "方向与双向文本"
      : sample === "vertical"
        ? "竖排逻辑轴"
        : "混合语言";
  const firstDivergence =
    sample === "direction"
      ? "视觉顺序与逻辑字符串顺序不同"
      : sample === "vertical"
        ? "inline 轴从水平变为垂直"
        : "RTL 片段在嵌入边界处发生重排";

  function reset() {
    setSample("direction");
    timeline.goToStep(0);
  }

  const vertical = sample === "vertical";
  const rtl = sample === "direction" || sample === "mixed";

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-12-writing-directions-logical-axes"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 12 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              书写方向改变的是轴与顺序，不只是文字角度
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先处理 direction 和双向文本，再切换
              writing-mode，最后用逻辑轴重算尺寸、边距与滚动。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择书写方向样本">
            {(
              [
                ["direction", "方向与双向文本"],
                ["vertical", "竖排逻辑轴"],
                ["mixed", "混合语言"],
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
          aria-label={`CSS 世界第 12 章书写方向教学图：当前样本为${sampleLabel}。时间线展示 direction、unicode-bidi、writing-mode、逻辑轴、逻辑尺寸和混合语言；当前首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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
            direction + unicode-bidi → writing-mode → 逻辑 inline / block 轴
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            物理 left/right 只是结果描述，书写模式决定内容沿哪条逻辑轴流动
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
          <text x="46" y="105" fontSize="12" fontWeight="700" fill={C.accent}>
            当前样本 · {sampleLabel}
          </text>
          <text x="46" y="134" fontSize="12" fill={C.primary}>
            观测路径：方向 → 双向嵌入 → 流向 → 逻辑轴 → 尺寸与滚动
          </text>
          <text x="46" y="161" fontSize="12" fill={C.secondary}>
            首个偏离点：{firstDivergence} · 固定内容和容器后只改一个方向变量
          </text>
          <rect
            x="690"
            y="112"
            width="154"
            height="42"
            rx="9"
            fill={sample === "mixed" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "mixed" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="767"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "mixed" ? C.warning : C.success}
          >
            {sample === "mixed" ? "检查嵌入" : "流向可解释"}
          </text>

          <text x="30" y="214" fontSize="12" fontWeight="700" fill={C.primary}>
            逻辑轴与盒尺寸
          </text>
          <rect
            x="28"
            y="230"
            width="410"
            height="214"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="258" fontSize="12" fontWeight="700" fill={C.primary}>
            {vertical
              ? "writing-mode: vertical-rl"
              : "writing-mode: horizontal-tb"}
          </text>
          <rect
            x={vertical ? "194" : "92"}
            y={vertical ? "278" : "304"}
            width={vertical ? "132" : "250"}
            height={vertical ? "132" : "82"}
            rx="10"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text
            x={vertical ? "260" : "217"}
            y={vertical ? "306" : "336"}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={C.primary}
          >
            {vertical ? "块轴：水平" : "块轴：垂直"}
          </text>
          <text
            x={vertical ? "260" : "217"}
            y={vertical ? "330" : "358"}
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            {vertical ? "inline 轴：垂直" : "inline 轴：水平"}
          </text>
          <line
            x1={vertical ? "260" : "110"}
            y1={vertical ? "350" : "402"}
            x2={vertical ? "260" : "326"}
            y2={vertical ? "394" : "402"}
            stroke={C.success}
            strokeWidth="2"
            markerEnd={`url(#${arrowId})`}
          />
          <text x="48" y="420" fontSize="11" fill={C.secondary}>
            inline-size / block-size 应跟随轴，而不是永远写死 width / height
          </text>

          <rect
            x="458"
            y="230"
            width="414"
            height="214"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="478" y="258" fontSize="12" fontWeight="700" fill={C.primary}>
            双向文本与视觉顺序
          </text>
          <rect
            x="486"
            y="278"
            width="356"
            height="64"
            rx="9"
            fill={sample === "mixed" ? C.warning : C.accent}
            fillOpacity="0.12"
            stroke={sample === "mixed" ? C.warning : C.accent}
            strokeWidth="1.5"
          />
          <text
            x="664"
            y="316"
            textAnchor="middle"
            fontSize="14"
            fontWeight="700"
            fill={C.primary}
            direction={rtl ? "rtl" : "ltr"}
            unicodeBidi="plaintext"
          >
            {sample === "mixed" ? "中文 ABC 123 אבג" : "ABC 123 אבג 中文"}
          </text>
          <text x="502" y="368" fontSize="11" fontWeight="700" fill={C.accent}>
            direction: {rtl ? "rtl / content-aware" : "ltr"}
          </text>
          <text x="502" y="392" fontSize="11" fill={C.secondary}>
            unicode-bidi：嵌入边界与隔离规则
          </text>
          <text x="502" y="416" fontSize="11" fill={C.secondary}>
            记录：逻辑字符串 ≠ 单次截图的视觉顺序
          </text>

          <text x="30" y="474" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = sample === "mixed" && (index === 1 || index === 5);
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
                  cy="510"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="515"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="506"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="528" fontSize="11" fill={C.secondary}>
                  {isFault ? "检查混排" : step.caption?.slice(0, 8)}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="510"
                    x2={x + 132}
                    y2="510"
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
            y="560"
            width="844"
            height="62"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="585" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个步骤"}
          </text>
          <text x="46" y="607" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} / {STEPS.length} 步 ·
            顺序、流向、逻辑轴与混排分别留证
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测逻辑轴和视觉顺序，再切换竖排或混合语言样本定位首个变化。"
          reset={{
            label: "重置书写方向实验",
            ariaLabel: "重置 CSS 世界第 12 章书写方向实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        书写方向的结果是双向算法、流向、逻辑轴和内容边界共同计算后的证据。
      </figcaption>
    </figure>
  );
}
