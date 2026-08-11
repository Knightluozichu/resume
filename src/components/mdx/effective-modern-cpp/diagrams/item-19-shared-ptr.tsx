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
    label: "owners",
    caption:
      "shared_ptr 让多个 handles 形成 shared ownership，并指向同一个 control block",
  },
  {
    label: "counts",
    caption:
      "control block 维护 reference count 与 weak count；最后一个 strong owner 才销毁 object",
  },
  {
    label: "duplicate",
    caption:
      "同一 raw pointer 独立构造两个 shared_ptr 会产生 duplicate control block 和 double delete",
  },
  {
    label: "deleter",
    caption:
      "custom deleter 被存入 control block 并 type-erase，handle 类型仍保持 shared_ptr<T>",
  },
  {
    label: "from-this",
    caption:
      "enable_shared_from_this 复用已有 control block，避免 shared_ptr(this) 重建 ownership",
  },
  {
    label: "justify",
    caption:
      "用 ownership graph 和 contract matrix 证明 shared ownership 必要且没有强引用环",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 136,
}));

export function EmcppItem19SharedPtrLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [duplicateControlBlockFault, setDuplicateControlBlockFault] =
    useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐阶段动画起点，让 control block 的状态变化可单步复核。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setDuplicateControlBlockFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-19-shared-ptr"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 19
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              多个 owner，只有一份生命周期状态
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              逐步观察 shared_ptr handle、control
              block、计数和删除策略如何协作；错误按钮会展示两个控制块为何不能“自动合并”。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 430"
          role="img"
          aria-label="Effective Modern C++ Item 19 shared_ptr 教学时间线：shared_ptr 通过 shared ownership 让多个 owner 共享一个 control block；control block 保存 reference count 和 weak count；同一 raw pointer 独立构造会产生 duplicate control block 和 double delete；custom deleter 存在控制块并被 type erase；enable_shared_from_this 复用已有控制块；最后用 ownership graph 与 contract matrix 验证共享所有权。可播放、暂停、单步、拖进度、重置，并可注入重复控制块故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item19-shared-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item19-shared-fault-arrow"
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
            handles → control block → resource lifetime
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            shared ownership · reference count · custom deleter · from-this ·
            graph check
          </text>

          <line
            x1="82"
            y1="186"
            x2="756"
            y2="186"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item19-shared-arrow)"
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
                markerEnd="url(#emcpp-item19-shared-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = duplicateControlBlockFault && index === 2;
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
                    ? "owner handles"
                    : index === 1
                      ? "strong + weak"
                      : index === 2
                        ? "one block only"
                        : index === 3
                          ? "erase deleter"
                          : index === 4
                            ? "reuse block"
                            : "no strong cycle"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "double delete"
                    : index === 0
                      ? "share"
                      : index === 1
                        ? "count"
                        : index === 2
                          ? "guard"
                          : index === 3
                            ? "policy"
                            : index === 4
                              ? "from this"
                              : "justify"}
                </text>
              </g>
            );
          })}

          {duplicateControlBlockFault && (
            <g>
              <path
                d="M 342 244 C 290 292, 230 292, 184 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item19-shared-fault-arrow)"
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
                故障：从同一 raw pointer 再造第二个 control block
              </text>
              <text x="193" y="332" fontSize="11" fill={C.secondary}>
                现象：两个 strong count 各自归零并重复 delete；修法：make_shared
                后复制 owner
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
          caption="每个 label 位于一个 ownership 阶段的动画起点；可单步核对 control-block identity 与销毁时机。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 19 shared_ptr 生命周期时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={duplicateControlBlockFault}
          onClick={() => setDuplicateControlBlockFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            duplicateControlBlockFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {duplicateControlBlockFault
            ? "关闭重复控制块故障"
            : "注入重复控制块故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        shared ownership 的关键不是“有很多地址”，而是所有 owner 都复用同一个
        control block；custom deleter 与 from-this
        也必须沿着这份生命周期状态工作。
      </figcaption>
    </figure>
  );
}
