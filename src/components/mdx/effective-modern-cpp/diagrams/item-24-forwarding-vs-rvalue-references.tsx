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
    label: "surface",
    caption: "先看参数模式：universal references 只可能来自精确的被推导 T&&",
  },
  {
    label: "deduce",
    caption:
      "type deduction 读取 caller 的 lvalue/rvalue 与 cv，决定 T 是 reference 还是 value",
  },
  {
    label: "collapse",
    caption:
      "reference collapsing 把 T& 与 T&& 的中间组合归一为最终 parameter type",
  },
  {
    label: "ordinary",
    caption:
      "rvalue references 如 Widget&&、const T&&、vector<T>&& 没有精确 T deduction",
  },
  {
    label: "auto",
    caption:
      "auto double ampersand 遵循同一推导规则，generic lambda 与 range-for 也可 forwarding",
  },
  {
    label: "matrix",
    caption:
      "用分类矩阵验证 exact form、class-level fixation、braced list 与 ownership 边界",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 136,
}));

export function EmcppItem24ForwardingVsRvalueLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [ampersandShortcutFault, setAmpersandShortcutFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐推导阶段起点，让类型分类和控制条保持同步。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setAmpersandShortcutFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-24-forwarding-vs-rvalue-references"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 24
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              不数 ampersand，先找推导点
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              同一个 `&&` 语法要经过 parameter pattern、type deduction 和
              reference collapsing 才能分类；错误按钮会高亮误把所有双 ampersand
              当 forwarding 的捷径。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 430"
          role="img"
          aria-label="Effective Modern C++ Item 24 forwarding 与 rvalue reference 教学时间线：先检查 universal references 的精确 T&& 形式，再做 type deduction 和 reference collapsing；ordinary rvalue references 包括 Widget&&、const T&& 和 vector<T>&&；auto double ampersand、generic lambda 和 range-for 可遵循同一推导；最后用分类矩阵验证 class-level fixation、braced list 与 ownership。可播放、暂停、单步、拖进度、重置，并可注入把所有 && 都判为 forwarding 的错误。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item24-forwarding-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item24-forwarding-fault-arrow"
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
            pattern → deduction → collapse → category
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            exact T&& · lvalue/rvalue · cv · auto&& · ordinary rvalue reference
          </text>

          <line
            x1="82"
            y1="186"
            x2="756"
            y2="186"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item24-forwarding-arrow)"
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
                markerEnd="url(#emcpp-item24-forwarding-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = ampersandShortcutFault && index === 3;
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
                    ? "T&& only"
                    : index === 1
                      ? "T = ?"
                      : index === 2
                        ? "T& / T&&"
                        : index === 3
                          ? "Widget&&"
                          : index === 4
                            ? "auto&&"
                            : "compile matrix"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "misclassified"
                    : index === 0
                      ? "pattern"
                      : index === 1
                        ? "deduce"
                        : index === 2
                          ? "collapse"
                          : index === 3
                            ? "rvalue only"
                            : index === 4
                              ? "forward"
                              : "verify"}
                </text>
              </g>
            );
          })}

          {ampersandShortcutFault && (
            <g>
              <path
                d="M 477 244 C 427 292, 367 292, 319 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item24-forwarding-fault-arrow)"
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
                故障：看到任何 && 就宣布 forwarding reference
              </text>
              <text x="193" y="332" fontSize="11" fill={C.secondary}>
                反例：const T&&、vector of T&& 的 T 已被 wrapper
                限定；修法：检查精确形式与当前 deduction
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
          caption="每个 label 位于一次类型分类转折的动画起点；可单步核对 deduction target、collapse 和最终绑定能力。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 24 forwarding 与 rvalue reference 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={ampersandShortcutFault}
          onClick={() => setAmpersandShortcutFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            ampersandShortcutFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {ampersandShortcutFault ? "关闭 && 分类故障" : "注入 && 分类故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        forwarding reference 是推导上下文的结论，不是 `&&`
        字符本身的属性；分类完成后仍需单独决定 forward、move 与 ownership。
      </figcaption>
    </figure>
  );
}
