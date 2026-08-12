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

type SampleMode = "focus" | "cursor" | "custom";

const STEPS: readonly TeachingStep[] = [
  {
    label: "native focus",
    caption: "先保留浏览器的原生焦点路径，确认键盘用户能找到当前控件",
  },
  {
    label: "outline",
    caption: "outline 在边框外绘制，不参与盒模型，不应让布局跳动",
  },
  {
    label: "offset / radius",
    caption: "偏移和圆角让焦点环避开内容与阴影，仍要覆盖窄宽和高对比场景",
  },
  {
    label: "cursor intent",
    caption: "cursor 只传达指针意图，不能把普通元素伪装成真正的按钮",
  },
  {
    label: "custom fallback",
    caption: "自定义光标必须先有可用关键字回退，加载失败时仍能表达状态",
  },
  {
    label: "input parity",
    caption: "键盘、鼠标和触摸都应得到同一状态反馈，不能只为指针优化",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw11UserInterfaceLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("focus");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-11-ui-arrow-${instanceId}`;
  const dangerArrowId = `css-world-11-ui-danger-arrow-${instanceId}`;

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
    sample === "focus"
      ? "键盘焦点"
      : sample === "cursor"
        ? "系统光标"
        : "自定义回退";
  const firstDivergence =
    sample === "focus"
      ? "焦点环是否仍可见且不改变布局尺寸"
      : sample === "cursor"
        ? "指针意图与真实控件语义不一致"
        : "资源失败后是否回到可用关键字";

  function reset() {
    setSample("focus");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-11-user-interface-focus-cursor"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 11 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              焦点反馈和指针意图必须同时服务真实交互
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              用 outline 留出清晰焦点环，再用 cursor
              表达状态；两者都不能替代语义和输入路径。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择用户界面样本">
            {(
              [
                ["focus", "键盘焦点"],
                ["cursor", "系统光标"],
                ["custom", "自定义回退"],
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
          aria-label={`CSS 世界第 11 章用户界面教学图：当前样本为${sampleLabel}。时间线展示原生焦点、outline、偏移圆角、cursor 意图、自定义回退和键盘指针一致性；当前首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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
            原生焦点 → outline 外绘 → cursor 意图 → 多输入路径一致
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            装饰只是反馈：真实语义、焦点顺序和可用回退仍然决定控件能否使用
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
            观测路径：输入方式 → 焦点状态 → 外部绘制 → 指针反馈 → 语义回退
          </text>
          <text x="46" y="161" fontSize="12" fill={C.secondary}>
            首个偏离点：{firstDivergence} · 固定控件尺寸和文本后只改一个变量
          </text>
          <rect
            x="690"
            y="112"
            width="154"
            height="42"
            rx="9"
            fill={sample === "custom" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "custom" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="767"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "custom" ? C.warning : C.success}
          >
            {sample === "custom" ? "检查回退" : "反馈可解释"}
          </text>

          <text x="30" y="214" fontSize="12" fontWeight="700" fill={C.primary}>
            outline 与盒模型
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
            同一按钮，焦点环在盒外绘制
          </text>
          <rect
            x="92"
            y="292"
            width="260"
            height="74"
            rx="12"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <rect
            x="78"
            y="278"
            width="288"
            height="102"
            rx="18"
            fill="none"
            stroke={sample === "focus" ? C.success : C.border}
            strokeWidth={sample === "focus" ? "3" : "1.5"}
            strokeDasharray={sample === "focus" ? undefined : "6 4"}
          />
          <text
            x="222"
            y="334"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.primary}
          >
            可聚焦按钮
          </text>
          <text
            x="222"
            y="358"
            textAnchor="middle"
            fontSize="11"
            fill={C.secondary}
          >
            border box 不因 outline 改变
          </text>
          <text x="48" y="410" fontSize="11" fill={C.secondary}>
            offset / radius 调整焦点环与内容边缘的距离
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
            cursor 表达意图，不制造语义
          </text>
          <rect
            x="486"
            y="278"
            width="356"
            height="42"
            rx="8"
            fill={sample === "cursor" ? C.accent : C.elevated}
            fillOpacity="0.12"
            stroke={sample === "cursor" ? C.accent : C.border}
            strokeWidth="1.5"
          />
          <text x="502" y="304" fontSize="11" fontWeight="700" fill={C.primary}>
            cursor: {sample === "custom" ? "url(custom), pointer" : "pointer"}
          </text>
          <rect
            x="486"
            y="332"
            width="356"
            height="42"
            rx="8"
            fill={sample === "custom" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "custom" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text x="502" y="358" fontSize="11" fontWeight="700" fill={C.primary}>
            {sample === "custom"
              ? "资源失败 → pointer 回退"
              : "按钮语义仍来自真实元素"}
          </text>
          <rect
            x="486"
            y="386"
            width="356"
            height="42"
            rx="8"
            fill={C.danger}
            fillOpacity="0.1"
            stroke={C.danger}
            strokeWidth="1.5"
          />
          <text x="502" y="412" fontSize="11" fill={C.primary}>
            无键盘焦点或 aria 状态，光标也不能补救
          </text>

          <text x="30" y="474" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = sample === "custom" && (index === 3 || index === 4);
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
            焦点、轮廓、光标和输入路径分别留证
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测键盘焦点和布局尺寸，再切换 cursor 或资源回退样本定位首个变化。"
          reset={{
            label: "重置用户界面实验",
            ariaLabel: "重置 CSS 世界第 11 章用户界面实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        用户界面样式是焦点可见性、轮廓几何、指针意图和语义交互共同构成的反馈。
      </figcaption>
    </figure>
  );
}
