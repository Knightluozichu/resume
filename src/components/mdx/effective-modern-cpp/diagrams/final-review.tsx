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
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  {
    label: "type",
    caption: "先证明类型与边界：deduction、cv 和 reference 没有漂移",
  },
  {
    label: "object",
    caption: "再检查对象契约：special members、noexcept 与 const 状态有效",
  },
  {
    label: "ownership",
    caption: "画 ownership graph：谁创建、转移、观察并最终释放资源",
  },
  {
    label: "closure",
    caption:
      "核对 closure dependency manifest：capture 不得越过 referent lifetime",
  },
  {
    label: "execution",
    caption: "闭合 task outcome protocol：结果、异常、等待和同步都可观察",
  },
  { label: "evidence", caption: "最后留下五类证据，再决定迁移顺序与性能优化" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_LAYOUT = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 126,
}));

export function EmcppFinalReviewEvidenceTimelineLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [faultInjected, setFaultInjected] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // 每个 label 放在该步动画的起始时刻，避免控制条落后一帧。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setFaultInjected(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-final-review-evidence-timeline"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · 全书复习
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从症状回放六层 contract 证据链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              每次迁移先推进一层，再决定是否进入下一层；故障开关用于观察“关键词现代化”为什么不足以证明语义正确。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 420"
          role="img"
          aria-label="Effective Modern C++ 全书复习六层 contract 证据链动画：依次检查类型、对象、ownership、closure、execution 和五类证据；可播放、暂停、单步、拖进度，并可注入 ownership 到 closure 之间的生命周期故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-final-review-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-final-review-fault-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="420" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            复盘路径：从边界定义到可发布证据
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            类型 → 对象 → ownership → closure → execution → 证据包
          </text>

          <line
            x1="84"
            y1="176"
            x2="756"
            y2="176"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-final-review-arrow)"
          />

          {STEPS.slice(0, -1).map((step, index) => {
            const start = STAGE_LAYOUT[index];
            const end = STAGE_LAYOUT[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 110}
                y1={176}
                x2={end.x - 10}
                y2={176}
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-final-review-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const layout = STAGE_LAYOUT[index];
            const selected = index === activeIndex;
            return (
              <g
                key={step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x={layout.x}
                  y={layout.y}
                  width="110"
                  height="100"
                  rx="12"
                  fill={selected ? C.accent : C.elevated}
                  fillOpacity={selected ? 0.16 : 1}
                  stroke={selected ? C.accent : C.border}
                  strokeWidth={selected ? 3 : 1.5}
                />
                <circle
                  cx={layout.x + 20}
                  cy={layout.y + 22}
                  r="12"
                  fill={selected ? C.accent : C.bg}
                  stroke={selected ? C.accent : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x={layout.x + 20}
                  y={layout.y + 27}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={selected ? C.bg : C.secondary}
                >
                  {index + 1}
                </text>
                <text
                  x={layout.x + 55}
                  y={layout.y + 27}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={selected ? C.accent : C.primary}
                >
                  {step.label}
                </text>
                <text
                  x={layout.x + 55}
                  y={layout.y + 58}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index === 0
                    ? "deduction"
                    : index === 1
                      ? "invariant"
                      : index === 2
                        ? "owner graph"
                        : index === 3
                          ? "lifetime"
                          : index === 4
                            ? "result + sync"
                            : "before / after"}
                </text>
                <text
                  x={layout.x + 55}
                  y={layout.y + 80}
                  textAnchor="middle"
                  fontSize="11"
                  fill={selected ? C.accent : C.secondary}
                >
                  {index === 5 ? "可回放" : "先证明"}
                </text>
              </g>
            );
          })}

          {faultInjected && (
            <g>
              <path
                d="M 285 244 C 340 286, 395 286, 448 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-final-review-fault-arrow)"
              />
              <rect
                x="286"
                y="292"
                width="268"
                height="48"
                rx="10"
                fill={C.danger}
                fillOpacity="0.1"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="302"
                y="313"
                fontSize="12"
                fontWeight="700"
                fill={C.danger}
              >
                故障：closure 引用了已销毁对象
              </text>
              <text x="302" y="330" fontSize="11" fill={C.secondary}>
                现象：延迟调用悬空；修法：改成 owner capture 并做 delayed test
              </text>
            </g>
          )}

          <rect
            x="28"
            y="366"
            width="784"
            height="30"
            rx="8"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="44" y="386" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="按顺序播放或单步：每个 label 都对应该层证据开始建立的时刻。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置六层 contract 证据时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={faultInjected}
          onClick={() => setFaultInjected((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            faultInjected
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {faultInjected ? "关闭生命周期故障" : "注入生命周期故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        复盘不是把 42 个 Item 重新背一遍，而是让每个 contract
        都留下可验证、可回放的证据。
      </figcaption>
    </figure>
  );
}
