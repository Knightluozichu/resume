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

type SampleMode = "valid" | "invalid" | "undefined";

const STEPS: readonly TeachingStep[] = [
  {
    label: "author",
    caption: "把属性、值、关键字、单位和声明拆成可检查的输入",
  },
  {
    label: "parse",
    caption: "先判断语法是否有效；无效声明不应进入后续值阶段",
  },
  {
    label: "cascade",
    caption: "在有效声明之间处理来源、重要性、层叠与继承",
  },
  {
    label: "compute",
    caption: "得到计算值，再根据上下文推导使用值与实际呈现",
  },
  {
    label: "boundary",
    caption: "圈出规范没有规定唯一结果的边界，不把偶然结果当契约",
  },
  {
    label: "contract",
    caption: "改写为明确 DOM 与声明，并用多环境样本锁定可移植行为",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw02TermsUndefinedBehaviorLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("valid");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-02-values-arrow-${instanceId}`;
  const dangerArrowId = `css-world-02-values-danger-arrow-${instanceId}`;

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
    sample === "valid"
      ? "有效声明"
      : sample === "invalid"
        ? "无效语法"
        : "未定义边界";
  const inputText =
    sample === "valid"
      ? "color: inherit"
      : sample === "invalid"
        ? "color: 12px"
        : "规则没有规定唯一结果";
  const resultText =
    sample === "valid"
      ? "可继续计算与使用"
      : sample === "invalid"
        ? "声明被丢弃"
        : "不得承诺跨环境一致";

  function reset() {
    setSample("valid");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-02-declaration-value-undefined"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 2 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              一条声明如何变成可承诺的结果
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              把有效语法、无效声明和未定义边界分开，沿指定值到实际呈现的阶段逐一验收。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择术语样本">
            {(
              [
                ["valid", "有效"],
                ["invalid", "无效"],
                ["undefined", "未定义"],
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
          aria-label={`CSS 世界第 2 章术语与未定义行为教学图：当前样本为${sampleLabel}，输入为${inputText}，结果为${resultText}。时间线展示作者声明、语法解析、层叠继承、计算值、使用值、未定义边界与可移植契约；支持播放、暂停、单步、拖进度、样本切换和重置。`}
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
            声明 → 解析 → 层叠/继承 → 计算值 → 使用值 → 契约
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            未定义行为不是“浏览器都能随便做”，而是作者不能把结果写成唯一保证
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
            输入：{inputText}
          </text>
          <text x="46" y="158" fontSize="12" fill={C.secondary}>
            验收结果：{resultText} · 先检查定义边界，再记录跨浏览器证据
          </text>
          <rect
            x="660"
            y="112"
            width="184"
            height="42"
            rx="9"
            fill={
              sample === "undefined"
                ? C.warning
                : sample === "invalid"
                  ? C.danger
                  : C.success
            }
            fillOpacity="0.12"
            stroke={
              sample === "undefined"
                ? C.warning
                : sample === "invalid"
                  ? C.danger
                  : C.success
            }
            strokeWidth="1.5"
          />
          <text
            x="752"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={
              sample === "undefined"
                ? C.warning
                : sample === "invalid"
                  ? C.danger
                  : C.success
            }
          >
            {sample === "valid"
              ? "可形成契约"
              : sample === "invalid"
                ? "先修语法"
                : "禁止过度承诺"}
          </text>

          <text x="30" y="222" fontSize="12" fontWeight="700" fill={C.primary}>
            值阶段：每一格都有不同的问题
          </text>
          {[
            ["指定", "作者写了什么"],
            ["解析", "语法是否有效"],
            ["计算", "继承与相对单位"],
            ["使用", "上下文落地"],
            ["实际", "平台呈现"],
          ].map(([title, detail], index) => {
            const x = 38 + index * 166;
            const isFault = sample === "invalid" && index === 1;
            const isBoundary = sample === "undefined" && index === 4;
            return (
              <g key={title}>
                <rect
                  x={x}
                  y="246"
                  width="142"
                  height="70"
                  rx="9"
                  fill={isFault ? C.danger : isBoundary ? C.warning : C.accent}
                  fillOpacity="0.1"
                  stroke={
                    isFault ? C.danger : isBoundary ? C.warning : C.accent
                  }
                  strokeWidth="1.5"
                />
                <text
                  x={x + 71}
                  y="274"
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {title}值
                </text>
                <text
                  x={x + 71}
                  y="296"
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {isFault ? "被丢弃" : isBoundary ? "不保证唯一" : detail}
                </text>
                {index < 4 && (
                  <line
                    x1={x + 142}
                    y1="281"
                    x2={x + 158}
                    y2="281"
                    stroke={isFault || isBoundary ? C.danger : C.border}
                    strokeWidth="1.5"
                    markerEnd={`url(#${isFault || isBoundary ? dangerArrowId : arrowId})`}
                  />
                )}
              </g>
            );
          })}

          <rect
            x="38"
            y="340"
            width="824"
            height="72"
            rx="10"
            fill={sample === "undefined" ? C.warning : C.success}
            fillOpacity="0.08"
            stroke={sample === "undefined" ? C.warning : C.success}
            strokeWidth="1"
          />
          <text
            x="58"
            y="368"
            fontSize="12"
            fontWeight="700"
            fill={sample === "undefined" ? C.warning : C.success}
          >
            {sample === "valid"
              ? "有效声明：可以继续讨论继承、计算值、使用值和实际呈现"
              : sample === "invalid"
                ? "无效声明：停止在解析阶段，不能把容错结果当作值语义"
                : "未定义边界：边界外的规则仍有效，但边界内不可写成唯一契约"}
          </text>
          <text x="58" y="392" fontSize="11" fill={C.secondary}>
            对照证据：规范条文 · 两个浏览器 · 两个视口 · 正常/边界/恢复输入
          </text>

          <text x="30" y="444" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault =
              (sample === "invalid" && index === 1) ||
              (sample === "undefined" && index === 4);
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
                  cy="480"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="485"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="476"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="496" fontSize="11" fill={C.secondary}>
                  {isFault ? "边界" : step.caption?.slice(0, 8)}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="480"
                    x2={x + 132}
                    y2="480"
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
            y="516"
            width="844"
            height="28"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1"
          />
          <text x="46" y="535" fontSize="11" fontWeight="700" fill={C.accent}>
            当前验收门：{activeStep?.caption ?? "选择一个步骤"} · 第{" "}
            {activeIndex + 1} / {STEPS.length} 步
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测声明会在哪个阶段停止或分叉，再切换样本验证；重置用于确认恢复路径仍可重放。"
          reset={{
            label: "重置术语实验",
            ariaLabel: "重置 CSS 世界第 2 章术语与未定义行为实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        有效、无效和未定义是三个不同的判断：先定位阶段，再决定能否写成跨浏览器契约。
      </figcaption>
    </figure>
  );
}
