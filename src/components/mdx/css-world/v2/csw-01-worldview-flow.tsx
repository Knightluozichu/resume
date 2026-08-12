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

type SampleMode = "normal" | "narrow" | "float";

const STEPS: readonly TeachingStep[] = [
  {
    label: "viewport",
    caption: "固定视口、字体、内容与样式，先明确可用空间",
  },
  {
    label: "containing",
    caption: "从初始包含块找到块级盒的尺寸参考",
  },
  {
    label: "generated",
    caption: "元素与格式化规则共同生成块盒、内联盒和匿名盒",
  },
  {
    label: "normal",
    caption: "正常流按文档顺序安放盒，内容推动后续位置",
  },
  {
    label: "branch",
    caption: "只注入一个浮动，记录不再占位与环绕的首个偏离点",
  },
  {
    label: "replay",
    caption: "删除故障后重放同一 DOM，验证流体契约恢复",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw01WorldviewFlowLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("normal");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-01-flow-arrow-${instanceId}`;
  const dangerArrowId = `css-world-01-flow-danger-arrow-${instanceId}`;

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
      ? "正常流"
      : sample === "narrow"
        ? "窄视口"
        : "浮动分叉";
  const contentWidth = sample === "narrow" ? "288px" : "520px";
  const firstDivergence =
    sample === "normal"
      ? "null"
      : sample === "narrow"
        ? "可用空间变窄，行框重新换行"
        : "浮动盒脱离普通占位并让文字环绕";

  function reset() {
    setSample("normal");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-01-normal-flow-box-generation"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 1 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              正常流如何把一个元素变成可解释的盒
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              从视口和包含块出发，逐步观察盒生成、文档顺序、行框、浮动分叉与恢复。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择流样本">
            {(
              [
                ["normal", "正常"],
                ["narrow", "窄视口"],
                ["float", "浮动分叉"],
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
          viewBox="0 0 900 550"
          role="img"
          aria-label={`CSS 世界第 1 章正常流教学图：当前样本为${sampleLabel}。时间线依次展示视口、包含块、盒生成、正常流、浮动分叉与恢复；内容可用宽度为${contentWidth}，首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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

          <rect x="0" y="0" width="900" height="550" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            视口 → 包含块 → 生成盒 → 正常流 → 行框 → 可重放恢复
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            第一个问题不是“用了哪个属性”，而是“浏览器创造了什么排版对象”
          </text>

          <rect
            x="28"
            y="78"
            width="844"
            height="106"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="104" fontSize="12" fontWeight="700" fill={C.accent}>
            实验合同 · {sampleLabel}
          </text>
          <text x="46" y="130" fontSize="12" fill={C.primary}>
            固定 DOM / stylesheet / fonts，只改变视口或一个脱流声明
          </text>
          <text x="46" y="156" fontSize="12" fill={C.secondary}>
            可用宽度：{contentWidth} · 首个偏离点：{firstDivergence}
          </text>
          <rect
            x="688"
            y="112"
            width="156"
            height="40"
            rx="9"
            fill={sample === "float" ? C.danger : C.success}
            fillOpacity="0.12"
            stroke={sample === "float" ? C.danger : C.success}
            strokeWidth="1.5"
          />
          <text
            x="766"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "float" ? C.danger : C.success}
          >
            {sample === "float" ? "需要解释分叉" : "基线可重放"}
          </text>

          <text x="30" y="216" fontSize="12" fontWeight="700" fill={C.primary}>
            排版对象的生成与参与方式
          </text>
          <rect
            x="46"
            y="238"
            width="808"
            height="126"
            rx="12"
            fill={C.accent}
            fillOpacity="0.06"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text x="68" y="266" fontSize="12" fontWeight="700" fill={C.accent}>
            containing block · 可用空间 {contentWidth}
          </text>
          <rect
            x="68"
            y="286"
            width={sample === "narrow" ? 288 : 520}
            height="54"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="82" y="310" fontSize="11" fill={C.primary}>
            block box · 文档顺序中的盒
          </text>
          <text x="82" y="330" fontSize="11" fill={C.secondary}>
            内容推动下一行，宽度随上下文变化
          </text>
          <rect
            x={sample === "narrow" ? 368 : 600}
            y="286"
            width="196"
            height="54"
            rx="8"
            fill={sample === "float" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "float" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x={sample === "narrow" ? 466 : 698}
            y="310"
            textAnchor="middle"
            fontSize="11"
            fill={C.primary}
          >
            {sample === "float" ? "float box" : "inline box / line box"}
          </text>
          <text
            x={sample === "narrow" ? 466 : 698}
            y="330"
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            {sample === "float" ? "脱离普通占位" : "基线与换行"}
          </text>

          <text x="30" y="396" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = sample === "float" && index === 4;
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
                  cy="432"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="437"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="428"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="448" fontSize="11" fill={C.secondary}>
                  {isFault ? "首个偏离" : step.caption?.slice(0, 8)}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="432"
                    x2={x + 132}
                    y2="432"
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
            y="476"
            width="844"
            height="52"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="500" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个步骤"}
          </text>
          <text x="46" y="519" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} / {STEPS.length} 步 · 恢复后要求 fluid contract
            preserved
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测盒树和占位，再切换样本；步骤停帧用于定位首个偏离，重置用于验证恢复。"
          reset={{
            label: "重置流实验",
            ariaLabel: "重置 CSS 世界第 1 章正常流实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        正常流是可验证的默认秩序：盒生成决定排版对象，文档顺序决定安放，内容与容器共同决定尺寸。
      </figcaption>
    </figure>
  );
}
