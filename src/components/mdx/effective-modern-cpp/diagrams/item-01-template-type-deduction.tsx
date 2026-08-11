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
    label: "pattern",
    caption:
      "template type deduction 先读取 expression 与 ParamType pattern，再决定 T",
  },
  {
    label: "refptr",
    caption:
      "paramtype reference or pointer 保留匹配所需 cv，并按 reference/pointer 方向推导",
  },
  {
    label: "universal",
    caption:
      "universal reference 的精确 T&& 可让 lvalue 推导出 T&，再通过 reference collapsing",
  },
  {
    label: "value",
    caption:
      "by-value 丢弃 top-level cv 与 reference，但保留复合类型内部的 low-level cv",
  },
  {
    label: "decay",
    caption:
      "array arguments 与 function arguments 按值分别 decay 成 pointer；按 reference 可保留原类型",
  },
  {
    label: "worksheet",
    caption:
      "deduction worksheet 固定 T、最终 ParamType、cv、value category 与 decay 证据",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 136,
}));

export function EmcppItem01TemplateDeductionLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [arrayDecayFault, setArrayDecayFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐每个 deduction 阶段起点，让 T/ParamType 变化可单步检查。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setArrayDecayFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-01-template-type-deduction"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 1
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先分类 ParamType，再推导 T
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              推导不是“把实参类型抄给 T”：参数模式决定 cv、reference、pointer 和
              decay 的处理顺序。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 430"
          role="img"
          aria-label="Effective Modern C++ Item 1 template type deduction 教学时间线：从 ParamType pattern 和 expression 开始，区分 paramtype reference or pointer、universal reference 与 by-value；展示 T 的 cv 与 reference deduction、reference collapsing，以及 array arguments 和 function arguments 的 decay；最后用 deduction worksheet 验证 T、ParamType 和 array extent。可播放、暂停、单步、拖进度、重置，并可注入把数组直接当 pointer 的错误。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item01-deduction-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item01-deduction-fault-arrow"
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
            expression → ParamType → T → final type
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            pattern · reference/pointer · T&& · cv · decay · worksheet
          </text>

          <line
            x1="82"
            y1="186"
            x2="756"
            y2="186"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item01-deduction-arrow)"
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
                markerEnd="url(#emcpp-item01-deduction-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = arrayDecayFault && index === 4;
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
                    ? "T + Param"
                    : index === 1
                      ? "T& / T*"
                      : index === 2
                        ? "T&&"
                        : index === 3
                          ? "copy value"
                          : index === 4
                            ? "array / fn"
                            : "assertions"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "extent lost"
                    : index === 0
                      ? "classify"
                      : index === 1
                        ? "match"
                        : index === 2
                          ? "collapse"
                          : index === 3
                            ? "strip cv"
                            : index === 4
                              ? "decay?"
                              : "verify"}
                </text>
              </g>
            );
          })}

          {arrayDecayFault && (
            <g>
              <path
                d="M 612 244 C 562 292, 502 292, 454 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item01-deduction-fault-arrow)"
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
                故障：所有数组实参都按 pointer 推导
              </text>
              <text x="193" y="332" fontSize="11" fill={C.secondary}>
                反例：T reference 可保留 array extent；修法：区分 by-value decay
                与 reference deduction
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
          caption="每个 label 位于一次推导规则切换的动画起点；可单步核对 T、ParamType、cv 和 decay。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 1 template type deduction 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={arrayDecayFault}
          onClick={() => setArrayDecayFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            arrayDecayFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {arrayDecayFault ? "关闭 array decay 故障" : "注入 array decay 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        template type deduction 的答案由 ParamType pattern 决定；array/function
        decay 只是按值路径的一步，不是所有参数形式的默认结论。
      </figcaption>
    </figure>
  );
}
