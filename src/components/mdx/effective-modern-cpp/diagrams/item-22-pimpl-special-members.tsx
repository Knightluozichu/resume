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
    label: "header",
    caption:
      "pimpl idiom 让 public header 只暴露 Impl pointer，private representation 留在 source",
  },
  {
    label: "incomplete",
    caption:
      "incomplete type 可以作为 unique_ptr 的声明目标，但不能在未知布局处执行 delete",
  },
  {
    label: "boundary",
    caption:
      "special member functions implementation file 把 destructor 定义放在 Impl complete 之后",
  },
  {
    label: "move",
    caption:
      "user-declared destructor 会抑制 implicit move，source file 需要显式恢复 move operations",
  },
  {
    label: "copy",
    caption:
      "需要 value semantics 时在完整 Impl 处实现 deep copy 与 copy-and-swap",
  },
  {
    label: "abi",
    caption:
      "unique_ptr pimpl 隔离依赖和 layout，contract matrix 固定 ABI、traits 与 moved-from 状态",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 136,
}));

export function EmcppItem22PimplSpecialMembersLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [inlineDestructorFault, setInlineDestructorFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐每个 complete-type boundary 的动画起点，保证步骤可单步复核。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setInlineDestructorFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-22-pimpl-special-members"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 22
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把完整类型边界画在 source file
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              逐步追踪 Pimpl 的 header/source
              分界、析构和移动生成规则；故障按钮会展示 inline destructor
              为什么在 consumer 中触发不完整类型错误。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 430"
          role="img"
          aria-label="Effective Modern C++ Item 22 Pimpl 教学时间线：pimpl idiom 把 Impl representation 隔离到 source；incomplete type 只能声明不能在未知布局处删除；special member functions implementation file 在 Impl 完整后定义 destructor；user-declared destructor 抑制 implicit move，需要恢复移动；deep copy 在完整 Impl 处实现；unique_ptr pimpl 最后通过 contract matrix 验证 ABI、traits 与 moved-from 状态。可播放、暂停、单步、拖进度、重置，并可注入 inline destructor 故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item22-pimpl-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item22-pimpl-fault-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="430" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            header → incomplete → source boundary → special members
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            dependency firewall · complete type · destructor · move · deep copy
            · ABI
          </text>

          <line
            x1="82"
            y1="186"
            x2="756"
            y2="186"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item22-pimpl-arrow)"
          />

          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 110}
                y1="186"
                x2={end.x - 10}
                y2="186"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item22-pimpl-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = inlineDestructorFault && index === 2;
            return (
              <g
                key={step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x={box.x}
                  y={box.y}
                  width="110"
                  height="104"
                  rx="12"
                  fill={failed ? C.danger : selected ? C.accent : C.elevated}
                  fillOpacity={failed || selected ? 0.16 : 1}
                  stroke={failed ? C.danger : selected ? C.accent : C.border}
                  strokeWidth={failed || selected ? 3 : 1.5}
                />
                <circle
                  cx={box.x + 20}
                  cy={box.y + 22}
                  r="12"
                  fill={failed ? C.danger : selected ? C.accent : C.bg}
                  stroke={failed ? C.danger : selected ? C.accent : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x={box.x + 20}
                  y={box.y + 27}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={failed || selected ? C.bg : C.secondary}
                >
                  {index + 1}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 27}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={failed ? C.danger : selected ? C.accent : C.primary}
                >
                  {step.label}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 59}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index === 0
                    ? "public API"
                    : index === 1
                      ? "Impl ?"
                      : index === 2
                        ? "delete here"
                        : index === 3
                          ? "restore move"
                          : index === 4
                            ? "deep copy"
                            : "ABI / traits"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "incomplete error"
                    : index === 0
                      ? "isolate"
                      : index === 1
                        ? "forward"
                        : index === 2
                          ? "complete"
                          : index === 3
                            ? "move"
                            : index === 4
                              ? "value"
                              : "verify"}
                </text>
              </g>
            );
          })}

          {inlineDestructorFault && (
            <g>
              <path
                d="M 342 244 C 290 292, 230 292, 184 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item22-pimpl-fault-arrow)"
              />
              <rect
                x="175"
                y="290"
                width="490"
                height="54"
                rx="10"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="193"
                y="313"
                fontSize="12"
                fontWeight="700"
                fill={C.danger}
              >
                故障：在 header inline default destructor
              </text>
              <text x="193" y="332" fontSize="11" fill={C.secondary}>
                现象：consumer 处 Impl 仍 incomplete；修法：source 中 Impl
                完整后 out-of-line default
              </text>
            </g>
          )}

          <rect
            x="28"
            y="374"
            width="784"
            height="30"
            rx="8"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="44" y="394" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="每个 label 位于一个完整类型边界的动画起点；可单步核对 destructor、move 和 copy 的定义位置。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 22 Pimpl 特殊成员时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={inlineDestructorFault}
          onClick={() => setInlineDestructorFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            inlineDestructorFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {inlineDestructorFault
            ? "关闭 inline destructor 故障"
            : "注入 inline destructor 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        unique_ptr pimpl 的 handle 可以跨 incomplete type
        声明，但真正的删除、移动和复制必须在 Impl 完整的 source boundary
        后定型。
      </figcaption>
    </figure>
  );
}
