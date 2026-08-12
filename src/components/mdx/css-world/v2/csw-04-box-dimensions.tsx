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

type SampleMode = "layers" | "margin" | "border";

const STEPS: readonly TeachingStep[] = [
  {
    label: "content",
    caption: "内容盒承载文本或替换内容，先确认固有尺寸来源",
  },
  {
    label: "padding",
    caption: "padding 增加内边空间，百分比按包含块宽度解释",
  },
  {
    label: "margin",
    caption: "margin 改变外部尺寸与兄弟间距，不属于内容盒",
  },
  {
    label: "collapse",
    caption: "块级正常流的相邻外边距可能合并，需记录边界条件",
  },
  {
    label: "auto",
    caption: "margin:auto 分配剩余空间，前提是格式化上下文允许",
  },
  {
    label: "border",
    caption: "border 既是尺寸层也是绘制层，可构成透明边框图形",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw04BoxDimensionsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("layers");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-04-box-arrow-${instanceId}`;
  const dangerArrowId = `css-world-04-box-danger-arrow-${instanceId}`;

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
    sample === "layers"
      ? "四层盒"
      : sample === "margin"
        ? "外边距分配"
        : "边框图形";
  const total =
    sample === "margin"
      ? "剩余空间 → auto"
      : sample === "border"
        ? "内容 + 内边 + 边框"
        : "180 + 24×2 + 4×2 + 32×2";
  const firstDivergence =
    sample === "layers"
      ? "null"
      : sample === "margin"
        ? "外部间距受合并/剩余空间规则影响"
        : "边框颜色与透明度改变绘制几何";

  function reset() {
    setSample("layers");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-04-content-padding-margin-border"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 4 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              四大家族如何共同决定一个盒的尺寸
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              把 content、padding、margin 和 border
              分层，分别追踪空间、合并、剩余分配与绘制。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择盒模型样本">
            {(
              [
                ["layers", "四层盒"],
                ["margin", "外边距"],
                ["border", "边框图形"],
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
          aria-label={`CSS 世界第 4 章盒尺寸教学图：当前样本为${sampleLabel}。时间线展示 content、padding、margin、外边距合并、margin auto 和 border；当前尺寸表达式为${total}，首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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
            margin → border → padding → content → 使用尺寸
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            外部间距、边界图形、内边空间和内容承载是四个不同的证据层
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
            尺寸表达式：{total}
          </text>
          <text x="46" y="158" fontSize="12" fill={C.secondary}>
            首个偏离点：{firstDivergence} · 先固定包含块，再改变一个盒层
          </text>
          <rect
            x="690"
            y="112"
            width="154"
            height="42"
            rx="9"
            fill={sample === "border" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "border" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="767"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "border" ? C.warning : C.success}
          >
            {sample === "border" ? "检查绘制层" : "尺寸可解释"}
          </text>

          <text x="30" y="222" fontSize="12" fontWeight="700" fill={C.primary}>
            盒模型分层视图
          </text>
          <rect
            x="54"
            y="244"
            width="382"
            height="126"
            rx="12"
            fill={C.warning}
            fillOpacity="0.08"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text x="74" y="270" fontSize="12" fontWeight="700" fill={C.warning}>
            margin · 外部空间
          </text>
          <rect
            x="88"
            y="286"
            width="314"
            height="62"
            rx="8"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text x="106" y="312" fontSize="11" fill={C.primary}>
            border · 边界图形
          </text>
          <rect
            x="122"
            y="320"
            width="246"
            height="22"
            rx="5"
            fill={C.success}
            fillOpacity="0.14"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text x="136" y="336" fontSize="11" fill={C.primary}>
            padding · 内边空间
          </text>
          <rect
            x="158"
            y="328"
            width="174"
            height="12"
            rx="3"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1"
          />
          <text x="176" y="338" fontSize="11" fill={C.secondary}>
            content
          </text>

          <rect
            x="468"
            y="244"
            width="388"
            height="126"
            rx="12"
            fill={sample === "margin" ? C.warning : C.elevated}
            fillOpacity="0.1"
            stroke={sample === "margin" ? C.warning : C.border}
            strokeWidth="1.5"
          />
          <text
            x="490"
            y="270"
            fontSize="12"
            fontWeight="700"
            fill={sample === "margin" ? C.warning : C.accent}
          >
            {sample === "margin"
              ? "margin 合并 / auto 分配"
              : sample === "border"
                ? "透明边框图形"
                : "计算与绘制分栏"}
          </text>
          {sample === "border" ? (
            <>
              <path
                d="M548 340 L618 278 L688 340 Z"
                fill={C.accent}
                fillOpacity="0.14"
                stroke={C.accent}
                strokeWidth="2"
              />
              <text x="718" y="308" fontSize="11" fill={C.primary}>
                border-style
              </text>
              <text x="718" y="330" fontSize="11" fill={C.secondary}>
                color / transparent
              </text>
            </>
          ) : (
            <>
              <rect
                x="494"
                y="290"
                width="326"
                height="24"
                rx="6"
                fill={C.success}
                fillOpacity="0.12"
                stroke={C.success}
                strokeWidth="1.5"
              />
              <rect
                x="494"
                y="332"
                width="326"
                height="24"
                rx="6"
                fill={C.accent}
                fillOpacity="0.1"
                stroke={C.accent}
                strokeWidth="1.5"
              />
              <text x="510" y="307" fontSize="11" fill={C.primary}>
                {sample === "margin"
                  ? "兄弟 A · 外边距"
                  : "上层：包含块与剩余空间"}
              </text>
              <text x="510" y="349" fontSize="11" fill={C.primary}>
                {sample === "margin"
                  ? "兄弟 B · 合并后间距"
                  : "下层：content + padding + border"}
              </text>
            </>
          )}

          <text x="30" y="402" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = sample === "margin" && index === 3;
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
                  cy="438"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="443"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="434"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="454" fontSize="11" fill={C.secondary}>
                  {isFault ? "合并边界" : step.caption?.slice(0, 8)}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="438"
                    x2={x + 132}
                    y2="438"
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
            y="482"
            width="844"
            height="58"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="506" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个步骤"}
          </text>
          <text x="46" y="528" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} / {STEPS.length} 步 ·
            内容、内边、外边与边界分别留证
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测四层盒的尺寸表达式，再切换 margin 或 border 样本定位首个变化。"
          reset={{
            label: "重置盒模型实验",
            ariaLabel: "重置 CSS 世界第 4 章盒尺寸实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        四大家族各自承担一层责任：content 承载、padding 留内、margin
        留外、border 负责边界与绘制。
      </figcaption>
    </figure>
  );
}
