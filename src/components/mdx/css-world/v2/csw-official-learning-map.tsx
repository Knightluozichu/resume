"use client";

import { useRef, useState } from "react";

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

type SampleMode = "normal" | "narrow" | "override";

const STEPS: readonly TeachingStep[] = [
  {
    label: "identity",
    caption: "先固定 DOM、样式、视口与字体，确认 CSS 2.1 的边界",
  },
  {
    label: "flow",
    caption: "正常流生成盒，块级盒沿包含块分配可用空间",
  },
  {
    label: "size",
    caption: "从指定值经过计算值到使用值，auto 仍需要上下文",
  },
  {
    label: "inline",
    caption: "内联格式化上下文把内容放进行框，再由字体度量决定基线",
  },
  {
    label: "stack",
    caption: "浮动与定位会改变参与方式，层叠上下文决定绘制顺序",
  },
  {
    label: "direction",
    caption: "换内容、宽度或书写方向后重放，检查流体契约仍成立",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const CHAPTERS = [
  "概述",
  "术语和概念",
  "流、元素与基本尺寸",
  "盒尺寸四大家族",
  "内联元素与流",
  "流的破坏与保护",
  "层叠规则",
  "文本处理能力",
  "装饰与美化",
  "显示与隐藏",
  "用户界面样式",
  "流向的改变",
] as const;

const BOXES = [
  { x: 34, title: "DOM 内容", detail: "节点 + 文本" },
  { x: 232, title: "生成盒", detail: "外在 / 内在盒" },
  { x: 430, title: "包含块", detail: "可用空间来源" },
  { x: 628, title: "使用值", detail: "尺寸 + 行框" },
] as const;

export function CswOfficialLearningMapLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("normal");

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
        : "脱流覆盖";
  const usedValue =
    sample === "normal"
      ? "auto → 720px"
      : sample === "narrow"
        ? "auto → 288px"
        : "position → 脱流";
  const divergence =
    sample === "normal"
      ? "null：六个阶段均可解释"
      : sample === "narrow"
        ? "尺寸阶段：可用宽度收窄"
        : "脱流阶段：兄弟盒不再占位";

  function reset() {
    setSample("normal");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-flow-box-value-layer"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 学习地图
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从流到绘制：一条可重放的 CSS 2.1 因果链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              每次只改一个输入，沿
              DOM、盒生成、包含块、使用值、行框与层叠顺序追踪首个偏离点。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择样本">
            {(
              [
                ["normal", "正常"],
                ["narrow", "窄视口"],
                ["override", "脱流覆盖"],
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
          viewBox="0 0 900 520"
          role="img"
          aria-label={`CSS 世界学习地图交互图：当前样本为${sampleLabel}。时间线依次展示 CSS 2.1 身份、正常流与盒生成、包含块和使用值、内联行框、脱流与层叠、文本和流向验证；当前使用值为${usedValue}，首个偏离点为${divergence}。`}
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="css-world-map-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="css-world-map-danger-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="520" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            DOM → 生成盒 → 包含块 → 使用值 → 行框 → 绘制层
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            CSS 2.1 世界观：先解释正常流，再解释改变流的声明
          </text>

          <rect
            x="28"
            y="76"
            width="844"
            height="112"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="101" fontSize="12" fontWeight="700" fill={C.accent}>
            当前实验合同 · {sampleLabel}
          </text>
          <text x="46" y="128" fontSize="12" fill={C.primary}>
            固定 DOM / stylesheet / viewport /
            fonts，只改变一个变量；记录首个偏离点。
          </text>
          <text x="46" y="153" fontSize="12" fill={C.secondary}>
            使用值：{usedValue} · 首个偏离点：{divergence}
          </text>
          <rect
            x="650"
            y="112"
            width="196"
            height="42"
            rx="9"
            fill={sample === "override" ? C.danger : C.success}
            fillOpacity="0.12"
            stroke={sample === "override" ? C.danger : C.success}
            strokeWidth="1.5"
          />
          <text
            x="748"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "override" ? C.danger : C.success}
          >
            {sample === "override" ? "需要修复" : "可重放"}
          </text>

          <text x="30" y="216" fontSize="12" fontWeight="700" fill={C.primary}>
            六阶段机制链（点按时间线逐步显现）
          </text>
          {BOXES.map((box, index) => (
            <g key={box.title}>
              <rect
                x={box.x + 6}
                y="250"
                width="160"
                height="70"
                rx="10"
                fill={C.border}
                fillOpacity="0.15"
                stroke={C.border}
                strokeWidth="1"
              />
              <text
                x={box.x + 86}
                y="282"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                {box.title}
              </text>
              <text
                x={box.x + 86}
                y="302"
                textAnchor="middle"
                fontSize="11"
                fill={C.secondary}
              >
                {box.detail}
              </text>
              {index < BOXES.length - 1 && (
                <line
                  x1={box.x + 166}
                  y1="285"
                  x2={box.x + 194}
                  y2="285"
                  stroke={C.border}
                  strokeWidth="2"
                  markerEnd="url(#css-world-map-arrow)"
                />
              )}
            </g>
          ))}

          {STEPS.map((step, index) => {
            const isFault = sample === "override" && index === 4;
            const x = 34 + index * 138;
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
                  cy="366"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="371"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="362"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="381" fontSize="11" fill={C.secondary}>
                  {isFault ? "脱流首偏离" : step.caption?.slice(0, 9)}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="366"
                    x2={x + 132}
                    y2="366"
                    stroke={isFault ? C.danger : C.border}
                    strokeWidth="1.5"
                    markerEnd={
                      isFault
                        ? "url(#css-world-map-danger-arrow)"
                        : "url(#css-world-map-arrow)"
                    }
                  />
                )}
              </g>
            );
          })}

          <rect
            x="28"
            y="414"
            width="844"
            height="78"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="440" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个步骤"}
          </text>
          <text x="46" y="465" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} 步 / {STEPS.length} 步 · 章节路线：正常流 →
            盒尺寸 → 内联 → 脱流与层叠 → 文本与方向
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="播放或单步追踪因果链；再切换窄视口或脱流覆盖，确认你能定位首个偏离点。"
          reset={{
            label: "重置学习地图",
            ariaLabel: "重置 CSS 世界学习地图样本与时间线",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        这张图把目录变成证据路线：盒生成与使用值是中轴，浮动、定位、层叠、文本、装饰、显隐、界面和流向是可验证的分叉。
      </figcaption>
    </figure>
  );
}

export const CSS_WORLD_CHAPTERS = CHAPTERS;
