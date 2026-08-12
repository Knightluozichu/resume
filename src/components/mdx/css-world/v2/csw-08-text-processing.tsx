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

type SampleMode = "units" | "fallback" | "wrap";

const STEPS: readonly TeachingStep[] = [
  {
    label: "font-size",
    caption: "先确定字号和单位，区分 em、rem、ex 的参考对象与继承时机",
  },
  {
    label: "font-family",
    caption: "按字符逐个匹配字体族，缺失字形时沿回退链寻找可用字体",
  },
  {
    label: "weight / style",
    caption: "字重和字形可能来自真实字体，也可能由浏览器合成，不能只看数字",
  },
  {
    label: "@font-face",
    caption: "声明字体资源、范围和加载状态，区分网络字体可用与本机回退",
  },
  {
    label: "spacing",
    caption:
      "letter-spacing、word-spacing 和 text-indent 改变文字几何而非字体选择",
  },
  {
    label: "wrap / pseudo",
    caption: "white-space、断词规则与首字首行伪元素共同决定可读的文本边界",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw08TextProcessingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("units");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-08-text-arrow-${instanceId}`;
  const dangerArrowId = `css-world-08-text-danger-arrow-${instanceId}`;

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
    sample === "units"
      ? "单位与字号"
      : sample === "fallback"
        ? "字体回退"
        : "断行与间距";
  const firstDivergence =
    sample === "units"
      ? "em 读取当前字号，rem 读取根字号"
      : sample === "fallback"
        ? "当前字体缺少中文或符号字形"
        : "窄宽下文字在断词规则处换行";

  function reset() {
    setSample("units");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-08-text-processing-metrics-fallback"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 8 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              文字最终长什么样，取决于整条匹配链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先算单位和字号，再匹配字形；最后用间距、断行和伪元素验证文本边界。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择文本处理样本">
            {(
              [
                ["units", "单位与字号"],
                ["fallback", "字体回退"],
                ["wrap", "断行与间距"],
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
          viewBox="0 0 900 610"
          role="img"
          aria-label={`CSS 世界第 8 章文本处理教学图：当前样本为${sampleLabel}。时间线展示 font-size、font-family、字重字形、@font-face、间距和断行伪元素；当前首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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

          <rect x="0" y="0" width="900" height="610" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            字号与单位 → 字体匹配 → 间距断行 → 可见文本
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            声明值只是输入：最终字形、宽度和换行还要经过字体与内容边界
          </text>

          <rect
            x="28"
            y="78"
            width="844"
            height="108"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="105" fontSize="12" fontWeight="700" fill={C.accent}>
            当前样本 · {sampleLabel}
          </text>
          <text x="46" y="134" fontSize="12" fill={C.primary}>
            观测路径：声明值 → 计算值 → 字体/字形 → 文本几何 → 断行结果
          </text>
          <text x="46" y="161" fontSize="12" fill={C.secondary}>
            首个偏离点：{firstDivergence} · 固定 DOM、视口和内容后只改一个变量
          </text>
          <rect
            x="690"
            y="112"
            width="154"
            height="42"
            rx="9"
            fill={sample === "fallback" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "fallback" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="767"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "fallback" ? C.warning : C.success}
          >
            {sample === "fallback" ? "检查字形来源" : "文本可解释"}
          </text>

          <text x="30" y="218" fontSize="12" fontWeight="700" fill={C.primary}>
            文本几何与字体证据
          </text>
          <rect
            x="28"
            y="234"
            width="500"
            height="184"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="260" fontSize="12" fontWeight="700" fill={C.primary}>
            当前字体与单位
          </text>
          <rect
            x="52"
            y="280"
            width="212"
            height="112"
            rx="9"
            fill={sample === "units" ? C.accent : C.elevated}
            fillOpacity="0.1"
            stroke={sample === "units" ? C.accent : C.border}
            strokeWidth="1.5"
          />
          <text x="68" y="306" fontSize="11" fontWeight="700" fill={C.accent}>
            font-size: 16px
          </text>
          <text x="68" y="332" fontSize="11" fill={C.secondary}>
            em → 当前字号
          </text>
          <text x="68" y="354" fontSize="11" fill={C.secondary}>
            rem → 根字号
          </text>
          <text x="68" y="376" fontSize="11" fill={C.secondary}>
            ex → x-height
          </text>
          <rect
            x="286"
            y="280"
            width="220"
            height="112"
            rx="9"
            fill={sample === "fallback" ? C.warning : C.success}
            fillOpacity="0.1"
            stroke={sample === "fallback" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text x="302" y="306" fontSize="11" fontWeight="700" fill={C.primary}>
            字形匹配结果
          </text>
          <text x="302" y="332" fontSize="11" fill={C.secondary}>
            {sample === "fallback"
              ? "Latin Font → 中文回退"
              : "Latin Font → 当前字形"}
          </text>
          <text x="302" y="354" fontSize="11" fill={C.secondary}>
            weight / style → 真实或合成
          </text>
          <text x="302" y="376" fontSize="11" fill={C.secondary}>
            {sample === "fallback"
              ? "缺字形：保留内容，换字体"
              : "@font-face：资源可用"}
          </text>

          <rect
            x="558"
            y="234"
            width="314"
            height="184"
            rx="12"
            fill={sample === "wrap" ? C.warning : C.elevated}
            fillOpacity="0.1"
            stroke={sample === "wrap" ? C.warning : C.border}
            strokeWidth="1.5"
          />
          <text x="578" y="260" fontSize="12" fontWeight="700" fill={C.primary}>
            {sample === "wrap" ? "窄宽断行" : "文本控制"}
          </text>
          <text x="578" y="286" fontSize="11" fill={C.secondary}>
            {sample === "wrap"
              ? "white-space + word-break + overflow-wrap"
              : "letter-spacing / word-spacing / text-indent"}
          </text>
          <rect
            x="580"
            y="306"
            width={sample === "wrap" ? "248" : "264"}
            height="62"
            rx="7"
            fill={sample === "wrap" ? C.warning : C.accent}
            fillOpacity="0.14"
            stroke={sample === "wrap" ? C.warning : C.accent}
            strokeWidth="1.5"
          />
          {sample === "wrap" ? (
            <>
              <text x="596" y="330" fontSize="11" fill={C.primary}>
                LongURL / 中文内容
              </text>
              <line
                x1="596"
                y1="346"
                x2="782"
                y2="346"
                stroke={C.danger}
                strokeWidth="1.5"
                markerEnd={`url(#${dangerArrowId})`}
              />
              <text x="596" y="360" fontSize="11" fill={C.danger}>
                首个断行点
              </text>
            </>
          ) : (
            <>
              <text x="596" y="330" fontSize="11" fill={C.primary}>
                文字：字形 / 间距 / 缩进
              </text>
              <text x="596" y="354" fontSize="11" fill={C.secondary}>
                不是强行改容器宽度
              </text>
            </>
          )}
          <text x="580" y="396" fontSize="11" fill={C.secondary}>
            {sample === "wrap"
              ? "先记录内容边界，再判断规则是否可读"
              : "控制文字几何，不替代字体匹配"}
          </text>

          <text x="30" y="450" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = sample === "fallback" && index === 3;
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
                  cy="486"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="491"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="482"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="502" fontSize="11" fill={C.secondary}>
                  {isFault ? "资源回退" : step.caption?.slice(0, 8)}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="486"
                    x2={x + 132}
                    y2="486"
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
            y="538"
            width="844"
            height="58"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="562" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个步骤"}
          </text>
          <text x="46" y="584" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} / {STEPS.length} 步 ·
            单位、字形、间距和断行分别留证
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测文字宽度和字体来源，再切换回退或断行样本定位首个变化。"
          reset={{
            label: "重置文本处理实验",
            ariaLabel: "重置 CSS 世界第 8 章文本处理实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        文本结果是字号、字体、字形、间距、断行和伪元素共同计算后的证据。
      </figcaption>
    </figure>
  );
}
