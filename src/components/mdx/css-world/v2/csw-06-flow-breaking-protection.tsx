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

type SampleMode = "wrap" | "protect" | "position";

const STEPS: readonly TeachingStep[] = [
  {
    label: "正常流",
    caption: "先记录块级盒的顺序、占位和包含块，作为所有故障样本的基线",
  },
  {
    label: "float",
    caption: "浮动盒从普通块排列中偏移，但仍让后续行盒环绕它",
  },
  {
    label: "clear",
    caption: "clear 把后续盒推到浮动影响边界之后，不能凭空修复父高度",
  },
  {
    label: "BFC",
    caption: "BFC 建立独立格式化上下文，包裹浮动并隔离外部边界影响",
  },
  {
    label: "absolute",
    caption: "absolute 脱离正常流，依据最近定位祖先建立包含块并使用偏移",
  },
  {
    label: "relative / fixed",
    caption: "relative 限制局部位移，fixed 绑定视口或特殊包含块，恢复流体边界",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

export function Csw06FlowBreakingProtectionLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [sample, setSample] = useState<SampleMode>("wrap");
  const rawId = useId();
  const instanceId = rawId.replace(/:/g, "");
  const arrowId = `css-world-06-flow-arrow-${instanceId}`;
  const dangerArrowId = `css-world-06-flow-danger-arrow-${instanceId}`;

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
    sample === "wrap"
      ? "float 环绕"
      : sample === "protect"
        ? "BFC / overflow 保护"
        : "absolute / fixed 定位";
  const firstDivergence =
    sample === "wrap"
      ? "浮动盒不再占据普通块的同一排列位置"
      : sample === "protect"
        ? "保护上下文隔离了浮动或溢出边界"
        : "定位盒脱离正常流并读取新的包含块";

  function reset() {
    setSample("wrap");
    timeline.goToStep(0);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="css-world-06-flow-breaking-protection"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CSS 世界 · 第 6 章
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              流被打断后，空间由谁负责保护
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先标出普通流的占位，再观察环绕、清除、格式化上下文和定位包含块如何改变边界。
            </p>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="选择流断裂样本">
            {(
              [
                ["wrap", "float 环绕"],
                ["protect", "BFC / overflow"],
                ["position", "absolute / fixed"],
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
          aria-label={`CSS 世界第 6 章流断裂与保护教学图：当前样本为${sampleLabel}。时间线展示正常流、float、clear、BFC、absolute、relative 和 fixed；当前首个偏离点为${firstDivergence}。支持播放、暂停、单步、拖进度、样本切换和重置。`}
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
            正常流 → 破坏点 → 保护边界 → 恢复策略
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            先问“空间还在谁的计算里”，再问“视觉位置看起来在哪里”
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
            证据路径：普通流占位 → 首个脱流点 → 包含块 / BFC → 恢复重放
          </text>
          <text x="46" y="161" fontSize="12" fill={C.secondary}>
            首个偏离点：{firstDivergence} · 固定 DOM、视口和内容后只改一个声明
          </text>
          <rect
            x="690"
            y="112"
            width="154"
            height="42"
            rx="9"
            fill={sample === "position" ? C.warning : C.success}
            fillOpacity="0.12"
            stroke={sample === "position" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x="767"
            y="138"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={sample === "position" ? C.warning : C.success}
          >
            {sample === "position" ? "检查包含块" : "边界可解释"}
          </text>

          <text x="30" y="218" fontSize="12" fontWeight="700" fill={C.primary}>
            流空间与定位空间
          </text>
          <rect
            x="28"
            y="234"
            width="844"
            height="188"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <rect
            x="52"
            y="258"
            width="374"
            height="142"
            rx="10"
            fill={sample === "protect" ? C.success : C.accent}
            fillOpacity="0.08"
            stroke={sample === "protect" ? C.success : C.accent}
            strokeWidth="1.5"
          />
          <text x="70" y="284" fontSize="12" fontWeight="700" fill={C.primary}>
            普通流容器
          </text>
          <text x="70" y="306" fontSize="11" fill={C.secondary}>
            {sample === "protect"
              ? "BFC / overflow 形成保护边界"
              : "块级盒按顺序占位"}
          </text>
          <rect
            x={sample === "wrap" ? "82" : "72"}
            y="326"
            width="98"
            height="48"
            rx="7"
            fill={sample === "wrap" ? C.warning : C.accent}
            fillOpacity="0.16"
            stroke={sample === "wrap" ? C.warning : C.accent}
            strokeWidth="1.5"
          />
          <text
            x={sample === "wrap" ? "131" : "121"}
            y="355"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={sample === "wrap" ? C.warning : C.accent}
          >
            {sample === "wrap" ? "float" : "受保护盒"}
          </text>
          {sample === "wrap" ? (
            <>
              <line
                x1="188"
                y1="340"
                x2="380"
                y2="340"
                stroke={C.warning}
                strokeWidth="1.5"
                markerEnd={`url(#${arrowId})`}
              />
              <line
                x1="188"
                y1="366"
                x2="380"
                y2="366"
                stroke={C.warning}
                strokeWidth="1.5"
                markerEnd={`url(#${arrowId})`}
              />
              <text x="208" y="322" fontSize="11" fill={C.secondary}>
                后续行盒环绕
              </text>
            </>
          ) : (
            <>
              <rect
                x="198"
                y="326"
                width="180"
                height="48"
                rx="7"
                fill={C.success}
                fillOpacity="0.12"
                stroke={C.success}
                strokeWidth="1.5"
              />
              <text
                x="288"
                y="355"
                textAnchor="middle"
                fontSize="11"
                fill={C.success}
              >
                正常流继续计算
              </text>
            </>
          )}

          <rect
            x="458"
            y="258"
            width="390"
            height="142"
            rx="10"
            fill={sample === "position" ? C.warning : C.elevated}
            fillOpacity="0.1"
            stroke={sample === "position" ? C.warning : C.border}
            strokeWidth="1.5"
          />
          <text x="480" y="284" fontSize="12" fontWeight="700" fill={C.primary}>
            {sample === "position" ? "定位空间" : "保护与恢复"}
          </text>
          <text x="480" y="306" fontSize="11" fill={C.secondary}>
            {sample === "position"
              ? "absolute / fixed 读取包含块和偏移"
              : sample === "protect"
                ? "clear、BFC 与 overflow 各自承担边界责任"
                : "clear 结束影响，relative 保持占位"}
          </text>
          <rect
            x={sample === "position" ? "642" : "500"}
            y={sample === "position" ? "326" : "334"}
            width="176"
            height="42"
            rx="7"
            fill={sample === "position" ? C.warning : C.success}
            fillOpacity="0.14"
            stroke={sample === "position" ? C.warning : C.success}
            strokeWidth="1.5"
          />
          <text
            x={sample === "position" ? "730" : "588"}
            y={sample === "position" ? "352" : "360"}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={sample === "position" ? C.warning : C.success}
          >
            {sample === "position" ? "包含块 + 偏移" : "恢复流体契约"}
          </text>
          {sample === "position" && (
            <line
              x1="626"
              y1="347"
              x2="590"
              y2="347"
              stroke={C.danger}
              strokeWidth="1.5"
              markerEnd={`url(#${dangerArrowId})`}
            />
          )}

          <text x="30" y="454" fontSize="12" fontWeight="700" fill={C.primary}>
            教学时间线
          </text>
          {STEPS.map((step, index) => {
            const isFault = sample === "position" && index === 4;
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
                  cy="490"
                  r="13"
                  fill={isFault ? C.danger : C.accent}
                  fillOpacity="0.16"
                  stroke={isFault ? C.danger : C.accent}
                  strokeWidth="1.5"
                />
                <text
                  x={x + 16}
                  y="495"
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={isFault ? C.danger : C.accent}
                >
                  {index + 1}
                </text>
                <text
                  x={x + 38}
                  y="486"
                  fontSize="11"
                  fontWeight="700"
                  fill={C.primary}
                >
                  {step.label}
                </text>
                <text x={x + 38} y="506" fontSize="11" fill={C.secondary}>
                  {isFault ? "脱离占位" : step.caption?.slice(0, 8)}
                </text>
                {index < STEPS.length - 1 && (
                  <line
                    x1={x + 112}
                    y1="490"
                    x2={x + 132}
                    y2="490"
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
            y="542"
            width="844"
            height="58"
            rx="10"
            fill={C.success}
            fillOpacity="0.08"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="46" y="566" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个步骤"}
          </text>
          <text x="46" y="588" fontSize="11" fill={C.secondary}>
            第 {activeIndex + 1} / {STEPS.length} 步 ·
            占位、边界、包含块与恢复结果分别留证
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测正常流占位，再切换环绕、保护或定位样本定位首个边界变化。"
          reset={{
            label: "重置流断裂实验",
            ariaLabel: "重置 CSS 世界第 6 章流断裂与保护实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        脱离正常流不等于消失：float、clear、BFC、overflow
        与定位各自改变不同的空间边界。
      </figcaption>
    </figure>
  );
}
