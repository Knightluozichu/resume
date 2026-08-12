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

type SampleMode = "display" | "visibility" | "collapse";

const STEPS: readonly TeachingStep[] = [
  {
    label: "box generation",
    caption: "先判断 display 是否生成盒，再把盒树和布局结果分开记录",
  },
  {
    label: "space",
    caption: "visibility 隐藏绘制但通常保留布局空间，不能等同于删除元素",
  },
  {
    label: "visibility",
    caption: "隐藏状态参与可见性传播，子树的计算值决定最终绘制状态",
  },
  {
    label: "descendant override",
    caption: "父级 hidden 的后代可以声明 visible，空间仍属于原来的盒树",
  },
  {
    label: "interaction",
    caption: "显示、命中、焦点、读屏和资源请求是不同证据，需分别验收",
  },
  {
    label: "collapse",
    caption: "collapse 在表格行列上有特殊布局语义，普通元素不能照搬推断",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw10DisplayVisibilityLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("display");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-10-display-arrow-${instanceId}`;
  const dangerArrowId = `css-world-10-display-danger-arrow-${instanceId}`;

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
    sample === "display"
      ? "display:none"
      : sample === "visibility"
        ? "visibility:hidden"
        : "visibility:collapse";
  const firstDivergence =
    sample === "display"
      ? "元素没有生成布局盒"
      : sample === "visibility"
        ? "盒保留但绘制与命中状态改变"
        : "表格行列的 collapse 语义与普通盒不同";

  function reset() {
    setSample("display");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-10-display-visibility-box-tree"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 10 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              隐藏不是一个开关，而是盒树与交互契约的选择
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先看盒是否存在，再看空间、绘制、命中、焦点、读屏和表格布局分别发生了什么。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择显示与隐藏样本">
            {(
              [
                ["display", "display:none"],
                ["visibility", "visibility:hidden"],
                ["collapse", "visibility:collapse"],
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
          aria-label={`CSS 世界第 10 章显示与隐藏教学图：当前样本为${sampleLabel}。时间线展示盒生成、布局占位、visibility 传播、后代覆盖、交互可访问性和 collapse；当前首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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
            生成盒 → 保留空间 → 控制绘制 → 验证命中与可访问性
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            声明值只是入口：布局盒、绘制状态和交互树必须分别留证
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
            观测路径：盒生成 → 布局占位 → 可见性传播 → 命中/焦点 → 语义树
          </text>
          <text x="46" y="161" fontSize="12" fill={C.secondary}>
            首个偏离点：{firstDivergence} · 固定
            DOM、内容和容器尺寸后只改一个变量
          </text>
          <rect
            x="690"
            y="112"
            width="154"
            height="42"
            rx="9"
            fill={sample === "collapse" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "collapse" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="767"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "collapse" ? C.warning : C.success}
          >
            {sample === "collapse" ? "检查表格语义" : "隐藏可解释"}
          </text>

          <text x="30" y="214" fontSize="12" fontWeight="700" fill={C.primary}>
            盒树与布局占位
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
            父盒：正常流中的三个子项
          </text>
          <rect
            x="52"
            y="280"
            width="352"
            height="42"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text x="68" y="306" fontSize="11" fontWeight="700" fill={C.primary}>
            A · 可见内容盒
          </text>
          <rect
            x="52"
            y="334"
            width="352"
            height="42"
            rx="8"
            fill={sample === "display" ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={sample === "display" ? C.danger : C.warning}
            strokeWidth="1.5"
            strokeDasharray={sample === "display" ? "6 4" : undefined}
          />
          <text
            x="68"
            y="360"
            fontSize="11"
            fontWeight="700"
            fill={sample === "display" ? C.danger : C.warning}
          >
            B ·{" "}
            {sample === "display"
              ? "无生成盒，后续项目上移"
              : "保留占位，绘制状态关闭"}
          </text>
          <rect
            x="52"
            y="388"
            width="352"
            height="42"
            rx="8"
            fill={sample === "collapse" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "collapse" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text x="68" y="414" fontSize="11" fontWeight="700" fill={C.primary}>
            C ·{" "}
            {sample === "collapse"
              ? "表格行/列的特殊折叠"
              : "后续盒仍按正常流排列"}
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
            绘制、命中与语义证据
          </text>
          <rect
            x="486"
            y="278"
            width="356"
            height="42"
            rx="8"
            fill={sample === "display" ? C.danger : C.success}
            fillOpacity="0.12"
            stroke={sample === "display" ? C.danger : C.success}
            strokeWidth="1.5"
          />
          <text
            x="502"
            y="304"
            fontSize="11"
            fontWeight="700"
            fill={sample === "display" ? C.danger : C.success}
          >
            视觉：{sample === "display" ? "无盒、无绘制" : "盒存在但可见性关闭"}
          </text>
          <rect
            x="486"
            y="332"
            width="356"
            height="42"
            rx="8"
            fill={sample === "display" ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={sample === "display" ? C.danger : C.warning}
            strokeWidth="1.5"
          />
          <text x="502" y="358" fontSize="11" fontWeight="700" fill={C.primary}>
            命中/焦点：
            {sample === "display"
              ? "先确认节点仍在交互树"
              : "隐藏状态不可直接命中"}
          </text>
          <rect
            x="486"
            y="386"
            width="356"
            height="42"
            rx="8"
            fill={sample === "collapse" ? C.warning : C.accent}
            fillOpacity="0.12"
            stroke={sample === "collapse" ? C.warning : C.accent}
            strokeWidth="1.5"
          />
          <text x="502" y="412" fontSize="11" fontWeight="700" fill={C.primary}>
            语义：
            {sample === "collapse"
              ? "表格布局规则需单独验证"
              : "读屏/资源不可由截图推断"}
          </text>

          <text x="30" y="474" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault =
              sample === "collapse" && (index === 4 || index === 5);
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
                  {isFault ? "单独核验" : step.caption?.slice(0, 8)}
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
            盒树、占位、命中和语义分别留证
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测隐藏策略会改变什么，再切换样本定位盒生成、空间和交互语义的首个变化。"
          reset={{
            label: "重置显示与隐藏实验",
            ariaLabel: "重置 CSS 世界第 10 章显示与隐藏实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        显示与隐藏的结果是盒树、布局空间、绘制状态和交互语义共同决定的证据。
      </figcaption>
    </figure>
  );
}
