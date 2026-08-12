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

type SampleMode = "baseline" | "leading" | "align";

const STEPS: readonly TeachingStep[] = [
  {
    label: "字体度量",
    caption: "先标出 x-height、上伸部和下伸部，字体决定的是度量，不是最终行高",
  },
  {
    label: "行内盒",
    caption: "文字或替换元素进入行内格式化上下文，生成自己的行内盒",
  },
  {
    label: "行框",
    caption: "一行的最高行内盒撑起行框，不能把它等同于某个元素的 height",
  },
  {
    label: "line-height",
    caption: "line-height 在行内盒上下分配 leading，形成可观察的行框高度",
  },
  {
    label: "vertical-align",
    caption: "vertical-align 改变基线对齐，图片底部空隙与垂直居中因此可推导",
  },
  {
    label: "恢复重放",
    caption: "删除故障声明并重放同一 DOM，确认行框、基线和流体宽度同时恢复",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw05InlineFlowLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("baseline");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-05-inline-arrow-${instanceId}`;
  const dangerArrowId = `css-world-05-inline-danger-arrow-${instanceId}`;

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
      ? "基线与字母 x"
      : sample === "leading"
        ? "line-height 大值"
        : "vertical-align 对齐";
  const firstDivergence =
    sample === "baseline"
      ? "null"
      : sample === "leading"
        ? "行框高度由较大的 line-height 主导"
        : "替换元素相对基线发生位移";

  function reset() {
    setSample("baseline");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-05-inline-flow-baseline-linebox"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 5 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              基线如何把字符、图片和行框串起来
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先看字体度量，再看行内盒与行框；最后用 line-height 和
              vertical-align 解释同一行里的垂直变化。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择内联流样本">
            {(
              [
                ["baseline", "基线与字母 x"],
                ["leading", "line-height 大值"],
                ["align", "vertical-align 对齐"],
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
          viewBox="0 0 900 590"
          role="img"
          aria-label={`CSS 世界第 5 章内联流教学图：当前样本为${sampleLabel}。时间线展示字体度量、行内盒、行框、line-height、vertical-align 和恢复重放；当前首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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

          <rect x="0" y="0" width="900" height="590" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            字体度量 → 行内盒 → 行框 → 基线对齐
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            行框是参与者共同撑起的高度，line-height 与 vertical-align
            改变的是关系
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
          <text x="46" y="105" fontSize="12" fontWeight="700" fill={C.accent}>
            当前样本 · {sampleLabel}
          </text>
          <text x="46" y="134" fontSize="12" fill={C.primary}>
            观测路径：字体度量 → 行内盒 → 行框 → 基线
          </text>
          <text x="46" y="160" fontSize="12" fill={C.secondary}>
            首个偏离点：{firstDivergence} · 固定 DOM、字体和视口后只改一个变量
          </text>
          <rect
            x="690"
            y="112"
            width="154"
            height="42"
            rx="9"
            fill={sample === "align" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "align" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="767"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "align" ? C.warning : C.success}
          >
            {sample === "align" ? "检查基线位移" : "轨迹可解释"}
          </text>

          <text x="30" y="216" fontSize="12" fontWeight="700" fill={C.primary}>
            一行的可见证据
          </text>
          <rect
            x="28"
            y="232"
            width="844"
            height="170"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <rect
            x="52"
            y={sample === "leading" ? "250" : "270"}
            width="796"
            height={sample === "leading" ? "122" : "82"}
            rx="8"
            fill={C.accent}
            fillOpacity="0.08"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text x="70" y="252" fontSize="11" fill={C.secondary}>
            行框盒 · 最高行内盒与 leading 共同决定
          </text>
          <line
            x1="70"
            y1={sample === "leading" ? "332" : "352"}
            x2="830"
            y2={sample === "leading" ? "332" : "352"}
            stroke={C.warning}
            strokeWidth="2"
            strokeDasharray="8 6"
          />
          <text
            x="78"
            y={sample === "leading" ? "326" : "346"}
            fontSize="11"
            fontWeight="700"
            fill={C.warning}
          >
            baseline
          </text>
          <line
            x1="70"
            y1={sample === "leading" ? "286" : "306"}
            x2="830"
            y2={sample === "leading" ? "286" : "306"}
            stroke={C.border}
            strokeWidth="1"
          />
          <text
            x="78"
            y={sample === "leading" ? "281" : "301"}
            fontSize="11"
            fill={C.secondary}
          >
            x-height
          </text>
          <text
            x="230"
            y={sample === "leading" ? "324" : "344"}
            fontSize="44"
            fontWeight="700"
            fill={C.primary}
          >
            xg
          </text>
          <text
            x="230"
            y={sample === "leading" ? "276" : "296"}
            fontSize="11"
            fill={C.secondary}
          >
            字符盒：x-height / 下伸部
          </text>
          <rect
            x="470"
            y={
              sample === "align" ? "288" : sample === "leading" ? "294" : "314"
            }
            width="112"
            height="42"
            rx="6"
            fill={C.success}
            fillOpacity="0.16"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="526"
            y={
              sample === "align" ? "314" : sample === "leading" ? "320" : "340"
            }
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.success}
          >
            图片 / 替换元素
          </text>
          <line
            x1="592"
            y1={
              sample === "align" ? "309" : sample === "leading" ? "315" : "335"
            }
            x2="690"
            y2={
              sample === "align" ? "288" : sample === "leading" ? "315" : "335"
            }
            stroke={sample === "align" ? C.danger : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${sample === "align" ? dangerArrowId : arrowId})`}
          />
          <text
            x="610"
            y={
              sample === "align" ? "278" : sample === "leading" ? "306" : "326"
            }
            fontSize="11"
            fill={sample === "align" ? C.danger : C.secondary}
          >
            {sample === "align" ? "vertical-align 位移" : "按基线参与排版"}
          </text>
          <text x="70" y="386" fontSize="11" fill={C.secondary}>
            {sample === "leading"
              ? "大 line-height 把 leading 分到行内盒两侧，行框随之变高。"
              : sample === "align"
                ? "替换元素相对基线移动，但不会让 vertical-align 脱离行内上下文。"
                : "图片默认按基线对齐，基线下方保留字体下行空间，因此可能出现底部空隙。"}
          </text>

          <text x="30" y="434" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = sample === "align" && index === 4;
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
                  cy="470"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="475"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="466"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="486" fontSize="11" fill={C.secondary}>
                  {isFault ? "基线偏移" : step.caption?.slice(0, 8)}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="470"
                    x2={x + 132}
                    y2="470"
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
            y="520"
            width="844"
            height="58"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="544" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个步骤"}
          </text>
          <text x="46" y="566" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} / {STEPS.length} 步 ·
            字体度量、行框高度与基线位移分别留证
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测行框和基线，再切换 line-height 或 vertical-align 样本定位首个变化。"
          reset={{
            label: "重置内联流实验",
            ariaLabel: "重置 CSS 世界第 5 章内联流实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先定位字体度量，再解释行内盒、行框、line-height 与 vertical-align
        的联动。
      </figcaption>
    </figure>
  );
}
