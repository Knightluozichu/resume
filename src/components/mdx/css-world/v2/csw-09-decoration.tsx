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

type SampleMode = "color" | "position" | "compat";

const STEPS: readonly TeachingStep[] = [
  {
    label: "color",
    caption: "先确定可继承的前景色，保存声明值、计算值与实际绘制色",
  },
  {
    label: "currentColor",
    caption: "让边框和图标读取同一前景色，检查继承链是否真的命中",
  },
  {
    label: "background layers",
    caption: "背景色在底部，图像和渐变按层叠顺序绘制，内容仍保持可读",
  },
  {
    label: "position",
    caption: "百分比作用于容器与图像的剩余空间，而不是容器尺寸本身",
  },
  {
    label: "repeat / fixed",
    caption: "重复方式与固定附着改变采样区域，不能只凭一张静态截图判断",
  },
  {
    label: "resource / fallback",
    caption: "资源失败、隐藏状态和旧浏览器兼容时仍要保留颜色与文字边界",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw09DecorationLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("color");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-09-decoration-arrow-${instanceId}`;
  const dangerArrowId = `css-world-09-decoration-danger-arrow-${instanceId}`;

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
    sample === "color"
      ? "颜色继承"
      : sample === "position"
        ? "定位与重复"
        : "资源与兼容";
  const firstDivergence =
    sample === "color"
      ? "currentColor 未读取到预期的继承值"
      : sample === "position"
        ? "百分比按剩余空间计算"
        : "背景资源或旧语法未命中";

  function reset() {
    setSample("color");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-09-decoration-color-background-stack"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 9 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              装饰效果是颜色、图层和资源状态的合成结果
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先追踪 color 与
              currentColor，再拆开背景的绘制层、定位公式、重复和附着。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择元素装饰样本">
            {(
              [
                ["color", "颜色继承"],
                ["position", "定位与重复"],
                ["compat", "资源与兼容"],
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
          aria-label={`CSS 世界第 9 章元素装饰教学图：当前样本为${sampleLabel}。时间线展示 color、currentColor、背景绘制层、百分比定位、重复固定附着和资源兼容；当前首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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
            color 继承 → 背景分层 → 位置与重复 → 可读的装饰结果
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            声明值只是输入：绘制结果还要经过继承、盒边界、图像尺寸和资源状态
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
            观测路径：继承值 → 背景层 → 图像位置 → 重复/附着 → 资源回退
          </text>
          <text x="46" y="161" fontSize="12" fill={C.secondary}>
            首个偏离点：{firstDivergence} · 固定盒尺寸和内容后只改一个声明
          </text>
          <rect
            x="690"
            y="112"
            width="154"
            height="42"
            rx="9"
            fill={sample === "compat" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "compat" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="767"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "compat" ? C.warning : C.success}
          >
            {sample === "compat" ? "保留回退" : "装饰可解释"}
          </text>

          <text x="30" y="214" fontSize="12" fontWeight="700" fill={C.primary}>
            颜色继承与背景绘制层
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
            color → currentColor → border
          </text>
          <rect
            x="52"
            y="280"
            width="168"
            height="112"
            rx="9"
            fill={sample === "color" ? C.accent : C.elevated}
            fillOpacity="0.1"
            stroke={sample === "color" ? C.accent : C.border}
            strokeWidth="1.5"
          />
          <text x="68" y="306" fontSize="11" fontWeight="700" fill={C.accent}>
            父元素 color
          </text>
          <text x="68" y="332" fontSize="11" fill={C.secondary}>
            声明：var(--accent)
          </text>
          <text x="68" y="356" fontSize="11" fill={C.secondary}>
            子元素：继承前景色
          </text>
          <text x="68" y="380" fontSize="11" fill={C.secondary}>
            记录：计算值 → 绘制色
          </text>
          <line
            x1="228"
            y1="336"
            x2="260"
            y2="336"
            stroke={sample === "color" ? C.accent : C.border}
            strokeWidth="1.5"
            markerEnd={`url(#${sample === "color" ? arrowId : arrowId})`}
          />
          <rect
            x="270"
            y="280"
            width="146"
            height="112"
            rx="9"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text x="286" y="306" fontSize="11" fontWeight="700" fill={C.success}>
            联动结果
          </text>
          <text x="286" y="332" fontSize="11" fill={C.secondary}>
            border: 1px solid
          </text>
          <text x="286" y="356" fontSize="11" fill={C.secondary}>
            读取 currentColor
          </text>
          <text x="286" y="380" fontSize="11" fill={C.secondary}>
            图标与文字同色
          </text>
          <text x="48" y="420" fontSize="11" fill={C.secondary}>
            透明值改变绘制，不应删除可读边界
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
            background：从底到上的绘制顺序
          </text>
          <rect
            x="486"
            y="278"
            width="356"
            height="116"
            rx="9"
            fill={sample === "compat" ? C.warning : C.accent}
            fillOpacity="0.1"
            stroke={sample === "compat" ? C.warning : C.accent}
            strokeWidth="1.5"
          />
          <rect
            x="510"
            y="300"
            width="308"
            height="72"
            rx="7"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1"
          />
          <rect
            x="536"
            y="318"
            width="256"
            height="38"
            rx="6"
            fill={C.accent}
            fillOpacity="0.16"
            stroke={C.accent}
            strokeWidth="1"
          />
          <text x="550" y="294" fontSize="11" fill={C.secondary}>
            最底：background-color
          </text>
          <text x="550" y="338" fontSize="11" fill={C.primary}>
            中间：图像 / 渐变层
          </text>
          <text x="550" y="388" fontSize="11" fill={C.success}>
            最上：内容文字，必须可读
          </text>
          <text x="478" y="420" fontSize="11" fill={C.secondary}>
            多背景先写的层在上方，回退色先于高级图像
          </text>

          <text x="30" y="474" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = sample === "compat" && (index === 2 || index === 5);
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
                  {isFault ? "检查回退" : step.caption?.slice(0, 8)}
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
            颜色、图层、位置和资源状态分别留证
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测装饰的绘制层和资源来源，再切换定位或兼容样本定位首个变化。"
          reset={{
            label: "重置元素装饰实验",
            ariaLabel: "重置 CSS 世界第 9 章元素装饰实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        装饰结果是继承值、背景层、图像几何和资源兼容状态共同计算后的证据。
      </figcaption>
    </figure>
  );
}
