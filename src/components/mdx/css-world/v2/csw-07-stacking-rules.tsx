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

type SampleMode = "contexts" | "negative" | "siblings";

const STEPS: readonly TeachingStep[] = [
  {
    label: "背景边界",
    caption: "先把背景和边框作为绘制起点，确认观察对象属于哪个层叠上下文",
  },
  {
    label: "生成上下文",
    caption: "识别哪些元素创建新的层叠上下文，先画上下文树而不是只看数字",
  },
  {
    label: "层叠水平",
    caption: "同一父上下文内才比较层叠水平，负值与普通内容各有绘制位置",
  },
  {
    label: "顺序绘制",
    caption: "按背景、负层级、块级、浮动、内联和定位内容的顺序安排绘制",
  },
  {
    label: "子上下文",
    caption: "子上下文先内部排序，再作为整体参与父上下文；子 z-index 不能越级",
  },
  {
    label: "恢复约束",
    caption: "删除临时 z-index 并重放，保留有限语义层级和可访问的焦点顺序",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw07StackingRulesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("contexts");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-07-stack-arrow-${instanceId}`;
  const dangerArrowId = `css-world-07-stack-danger-arrow-${instanceId}`;

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
    sample === "contexts"
      ? "父上下文约束"
      : sample === "negative"
        ? "负层级绘制"
        : "同级 z-index 比较";
  const firstDivergence =
    sample === "contexts"
      ? "子上下文整体受父级层叠水平约束"
      : sample === "negative"
        ? "负层级进入当前上下文的指定绘制阶段"
        : "同级兄弟的层叠水平决定绘制先后";

  function reset() {
    setSample("contexts");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-07-stacking-context-order"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 7 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先画上下文树，再比较 z-index
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              层叠不是全局数字竞赛；父上下文、同级水平和绘制顺序共同决定谁覆盖谁。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择层叠样本">
            {(
              [
                ["contexts", "父上下文约束"],
                ["negative", "负层级绘制"],
                ["siblings", "同级比较"],
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
          viewBox="0 0 900 600"
          role="img"
          aria-label={`CSS 世界第 7 章层叠规则教学图：当前样本为${sampleLabel}。时间线展示背景边界、生成上下文、层叠水平、顺序绘制、子上下文和恢复约束；当前首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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

          <rect x="0" y="0" width="900" height="600" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            上下文树 → 层叠水平 → 绘制顺序 → 覆盖关系
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            先确定比较发生在哪个父上下文，再决定 z-index 数字是否有意义
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
            观测路径：背景 → 上下文树 → 同级水平 → 内部排序
          </text>
          <text x="46" y="161" fontSize="12" fill={C.secondary}>
            首个偏离点：{firstDivergence} · 固定
            DOM、定位方式和视口后只改一个层级变量
          </text>
          <rect
            x="690"
            y="112"
            width="154"
            height="42"
            rx="9"
            fill={sample === "contexts" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "contexts" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="767"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "contexts" ? C.warning : C.success}
          >
            {sample === "contexts" ? "检查父级" : "顺序可解释"}
          </text>

          <text x="30" y="218" fontSize="12" fontWeight="700" fill={C.primary}>
            层叠关系图
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
            父上下文层级
          </text>
          <rect
            x="52"
            y="282"
            width="196"
            height="112"
            rx="9"
            fill={C.accent}
            fillOpacity="0.08"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text x="68" y="308" fontSize="11" fontWeight="700" fill={C.accent}>
            Context A · level 1
          </text>
          <rect
            x="72"
            y="326"
            width="154"
            height="46"
            rx="7"
            fill={C.warning}
            fillOpacity="0.16"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="149"
            y="354"
            textAnchor="middle"
            fontSize="11"
            fill={C.warning}
          >
            child z-index: 999
          </text>
          <rect
            x="278"
            y="282"
            width="218"
            height="112"
            rx="9"
            fill={sample === "contexts" ? C.success : C.accent}
            fillOpacity="0.08"
            stroke={sample === "contexts" ? C.success : C.accent}
            strokeWidth="1.5"
          />
          <text x="294" y="308" fontSize="11" fontWeight="700" fill={C.success}>
            Context B · level 2
          </text>
          <rect
            x="298"
            y="326"
            width="178"
            height="46"
            rx="7"
            fill={sample === "contexts" ? C.success : C.accent}
            fillOpacity="0.16"
            stroke={sample === "contexts" ? C.success : C.accent}
            strokeWidth="1.5"
          />
          <text
            x="387"
            y="354"
            textAnchor="middle"
            fontSize="11"
            fill={sample === "contexts" ? C.success : C.accent}
          >
            sibling z-index: 2
          </text>
          {sample === "contexts" && (
            <text x="68" y="414" fontSize="11" fill={C.danger}>
              子的 999 仍不能越过父级 level 1
            </text>
          )}

          <rect
            x="558"
            y="234"
            width="314"
            height="184"
            rx="12"
            fill={sample === "negative" ? C.warning : C.elevated}
            fillOpacity="0.1"
            stroke={sample === "negative" ? C.warning : C.border}
            strokeWidth="1.5"
          />
          <text x="578" y="260" fontSize="12" fontWeight="700" fill={C.primary}>
            {sample === "negative" ? "当前绘制阶段" : "同级比较"}
          </text>
          {sample === "negative" ? (
            <>
              <rect
                x="582"
                y="278"
                width="264"
                height="24"
                rx="5"
                fill={C.border}
                fillOpacity="0.25"
              />
              <rect
                x="582"
                y="310"
                width="264"
                height="24"
                rx="5"
                fill={C.danger}
                fillOpacity="0.16"
              />
              <rect
                x="582"
                y="342"
                width="264"
                height="24"
                rx="5"
                fill={C.accent}
                fillOpacity="0.16"
              />
              <text x="596" y="295" fontSize="11" fill={C.secondary}>
                背景 / border
              </text>
              <text x="596" y="327" fontSize="11" fill={C.danger}>
                负层级内容
              </text>
              <text x="596" y="359" fontSize="11" fill={C.accent}>
                普通块与定位内容
              </text>
              <text x="582" y="398" fontSize="11" fill={C.secondary}>
                z-index 先进入阶段，再在上下文内比较
              </text>
            </>
          ) : (
            <>
              <rect
                x="582"
                y="286"
                width="104"
                height="72"
                rx="7"
                fill={C.accent}
                fillOpacity="0.15"
                stroke={C.accent}
                strokeWidth="1.5"
              />
              <rect
                x="744"
                y="286"
                width="104"
                height="72"
                rx="7"
                fill={C.success}
                fillOpacity="0.15"
                stroke={C.success}
                strokeWidth="1.5"
              />
              <text
                x="634"
                y="316"
                textAnchor="middle"
                fontSize="11"
                fill={C.accent}
              >
                A · 1
              </text>
              <text
                x="634"
                y="340"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                先绘制
              </text>
              <text
                x="796"
                y="316"
                textAnchor="middle"
                fontSize="11"
                fill={C.success}
              >
                B · 2
              </text>
              <text
                x="796"
                y="340"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                后绘制
              </text>
              <line
                x1="694"
                y1="322"
                x2="736"
                y2="322"
                stroke={C.border}
                strokeWidth="1.5"
                markerEnd={`url(#${arrowId})`}
              />
              <text x="582" y="398" fontSize="11" fill={C.secondary}>
                只有同一个父上下文的兄弟才直接比较
              </text>
            </>
          )}

          <text x="30" y="450" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = sample === "contexts" && index === 4;
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
                  {isFault ? "不能越级" : step.caption?.slice(0, 8)}
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
            上下文树、绘制阶段与同级比较分别留证
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先画上下文树，再切换负层级或同级 z-index 样本定位首个覆盖变化。"
          reset={{
            label: "重置层叠实验",
            ariaLabel: "重置 CSS 世界第 7 章层叠规则实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        z-index
        是上下文内的排序输入；父上下文和绘制阶段先于数字大小决定覆盖关系。
      </figcaption>
    </figure>
  );
}
