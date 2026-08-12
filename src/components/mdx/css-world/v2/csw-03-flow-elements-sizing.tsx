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

type SampleMode = "block" | "narrow" | "inline";

const STEPS: readonly TeachingStep[] = [
  {
    label: "element",
    caption: "先辨认元素类型，再区分外在盒与承载内容的内在盒",
  },
  {
    label: "auto",
    caption: "在包含块中求解 width:auto，不把它直接等同于百分比",
  },
  {
    label: "separate",
    caption: "让外部尺寸由流决定，内层用间距承载内容",
  },
  {
    label: "constraints",
    caption: "用 min/max、固有尺寸和 box-sizing 检查约束顺序",
  },
  {
    label: "inline",
    caption: "把内联盒放进行框，按字体、基线与 line-height 解释高度",
  },
  {
    label: "ghost",
    caption: "移除行尾空白节点后重放，确认幽灵空白不再伪造间距",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw03FlowElementsSizingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("block");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-03-sizing-arrow-${instanceId}`;
  const dangerArrowId = `css-world-03-sizing-danger-arrow-${instanceId}`;

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
    sample === "block"
      ? "块级基线"
      : sample === "narrow"
        ? "窄容器"
        : "内联与空白";
  const outerWidth = sample === "narrow" ? 300 : 620;
  const innerWidth = sample === "narrow" ? 242 : 522;
  const usedValue =
    sample === "narrow" ? "auto → 300px" : "auto → 620px 可用宽度";
  const firstDivergence =
    sample === "block"
      ? "null"
      : sample === "narrow"
        ? "包含块可用宽度变窄"
        : "行尾空白节点改变基线间距";

  function reset() {
    setSample("block");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-03-auto-width-inline-box-sizing"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 3 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              基本尺寸不是一个数字，而是一条求解链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先辨认盒，再把 auto、约束、内联行框与幽灵空白放回各自的布局阶段。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择尺寸样本">
            {(
              [
                ["block", "块级"],
                ["narrow", "窄容器"],
                ["inline", "内联"],
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
          viewBox="0 0 900 560"
          role="img"
          aria-label={`CSS 世界第 3 章基本尺寸教学图：当前样本为${sampleLabel}。时间线展示元素盒、width auto、宽度分离、min/max 约束、内联盒模型和幽灵空白；外在可用宽度为${outerWidth}px，内在内容宽度为${innerWidth}px，使用值为${usedValue}，首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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

          <rect x="0" y="0" width="900" height="560" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            元素 → 外在盒 → 包含块 → auto → 使用尺寸 → 行框
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            同一个 width:auto，在块级、浮动、内联和约束场景里要问不同的问题
          </text>

          <rect
            x="28"
            y="78"
            width="844"
            height="112"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="104" fontSize="12" fontWeight="700" fill={C.accent}>
            当前样本 · {sampleLabel}
          </text>
          <text x="46" y="132" fontSize="12" fill={C.primary}>
            外在可用宽度：{outerWidth}px · 内在内容宽度：{innerWidth}px
          </text>
          <text x="46" y="158" fontSize="12" fill={C.secondary}>
            使用值：{usedValue} · 首个偏离点：{firstDivergence}
          </text>
          <rect
            x="684"
            y="112"
            width="160"
            height="42"
            rx="9"
            fill={sample === "inline" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "inline" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="764"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "inline" ? C.warning : C.success}
          >
            {sample === "inline" ? "检查基线" : "尺寸可解释"}
          </text>

          <text x="30" y="222" fontSize="12" fontWeight="700" fill={C.primary}>
            外部尺寸与内部内容的分离
          </text>
          <rect
            x="44"
            y="244"
            width={outerWidth + 80}
            height="112"
            rx="10"
            fill={C.accent}
            fillOpacity="0.07"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text x="62" y="272" fontSize="12" fontWeight="700" fill={C.accent}>
            外在块级盒 · width:auto
          </text>
          <text x="62" y="296" fontSize="11" fill={C.secondary}>
            包含块提供可用空间，流决定占位
          </text>
          <rect
            x="62"
            y="312"
            width={innerWidth}
            height="28"
            rx="6"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="76" y="331" fontSize="11" fill={C.primary}>
            内在容器盒 · margin/padding 承载内容
          </text>
          <text x="680" y="272" fontSize="12" fontWeight="700" fill={C.primary}>
            {sample === "inline" ? "inline box → line box" : "min/max 约束"}
          </text>
          <text x="680" y="298" fontSize="11" fill={C.secondary}>
            {sample === "inline"
              ? "字体、基线、line-height"
              : "内容与容器的边界"}
          </text>
          <text
            x="680"
            y="326"
            fontSize="11"
            fill={sample === "inline" ? C.warning : C.secondary}
          >
            {sample === "inline"
              ? "行尾空白节点会影响可见间距"
              : "box-sizing 改变尺寸解释入口"}
          </text>

          <text x="30" y="398" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = sample === "inline" && index === 5;
            const x = 38 + index * 140;
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
                  cy="434"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="439"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="430"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="450" fontSize="11" fill={C.secondary}>
                  {isFault ? "幽灵空白" : step.caption?.slice(0, 8)}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="434"
                    x2={x + 132}
                    y2="434"
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
            y="478"
            width="844"
            height="62"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="502" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个步骤"}
          </text>
          <text x="46" y="524" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} / {STEPS.length} 步 ·
            记录外在盒、内在盒、使用值和恢复结果
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 auto 在当前格式化上下文中的使用值，再切换窄容器或内联样本定位首个变化。"
          reset={{
            label: "重置尺寸实验",
            ariaLabel: "重置 CSS 世界第 3 章基本尺寸实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        基本尺寸的证据链是：元素类型、外在盒、包含块、内容约束、使用值与行框，而不是一个孤立的
        width 数字。
      </figcaption>
    </figure>
  );
}
