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
    label: "model",
    caption:
      "auto type deduction 把 auto 当作 T，把 declarator 当作 ParamType pattern",
  },
  {
    label: "plain",
    caption:
      "template deduction correspondence 让 plain auto 复用 by-value 规则，移除 top-level cv",
  },
  {
    label: "declarator",
    caption:
      "const、reference 和 pointer 修饰在 T 推导后组成最终 declaration type",
  },
  {
    label: "category",
    caption:
      "auto&& 按 initializer value category 推导并通过 reference collapsing 保留 lvalue/rvalue",
  },
  {
    label: "braced",
    caption:
      "braced initializer 触发 initializer_list 特例，所有 elements 必须推导为同一类型",
  },
  {
    label: "contexts",
    caption:
      "variable、auto return、generic lambda 与 language version 需要分别验证",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 136,
}));

export function EmcppItem02AutoDeductionLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mixedBracedFault, setMixedBracedFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐上下文/特例转换起点，让 auto/T 的关系可单步审查。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setMixedBracedFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-02-auto-type-deduction"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 2
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              auto 不是魔法，是带上下文的 T
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先识别 declaration context，再决定是否套用 by-value、reference 或
              initializer_list 规则。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 430"
          role="img"
          aria-label="Effective Modern C++ Item 2 auto type deduction 教学时间线：auto type deduction 把 auto 映射为 T，把 declarator 映射为 ParamType；plain auto 复用 template deduction correspondence，const/reference/pointer 修饰再组成最终类型；auto double ampersand 保留值类别；braced initializer 触发 initializer_list 特例；最后区分 variable、auto return、generic lambda 和 language version。可播放、暂停、单步、拖进度、重置，并可注入混合花括号元素故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item02-auto-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item02-auto-fault-arrow"
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
            context → T model → declarator → exception
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            plain · const/ref · auto&& · braces · return/lambda · version
          </text>

          <line
            x1="82"
            y1="186"
            x2="756"
            y2="186"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item02-auto-arrow)"
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
                markerEnd="url(#emcpp-item02-auto-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = mixedBracedFault && index === 4;
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
                    ? "auto = T"
                    : index === 1
                      ? "by value"
                      : index === 2
                        ? "declarator"
                        : index === 3
                          ? "auto&&"
                          : index === 4
                            ? "{ } list"
                            : "context"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "conflict"
                    : index === 0
                      ? "model"
                      : index === 1
                        ? "strip cv"
                        : index === 2
                          ? "compose"
                          : index === 3
                            ? "collapse"
                            : index === 4
                              ? "list rule"
                              : "verify"}
                </text>
              </g>
            );
          })}

          {mixedBracedFault && (
            <g>
              <path
                d="M 612 244 C 562 292, 502 292, 454 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item02-auto-fault-arrow)"
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
                故障：auto 花括号自动寻找 common type
              </text>
              <text x="193" y="332" fontSize="11" fill={C.secondary}>
                现象：int 与 double 推导冲突；修法：显式声明 initializer_list
                目标类型
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
          caption="每个 label 位于一个 auto 规则/上下文转折的动画起点；可单步核对 T、declarator 和 braced-list 例外。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 2 auto type deduction 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={mixedBracedFault}
          onClick={() => setMixedBracedFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            mixedBracedFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {mixedBracedFault
            ? "关闭混合 initializer 故障"
            : "注入混合 initializer 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        auto 的规则取决于语法位置：变量花括号有 initializer_list 特例，而 auto
        return 与 generic lambda 回到模板推导模型。
      </figcaption>
    </figure>
  );
}
