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
    label: "lambda",
    caption:
      "generic lambda 暴露 auto double ampersand parameter：auto&& value",
  },
  {
    label: "operator",
    caption:
      "编译器生成 hidden call operator template<typename T>，参数变成 T&&",
  },
  {
    label: "decltype",
    caption: "decltype on auto parameters 取回未加括号参数的 declared type",
  },
  {
    label: "forward",
    caption:
      "std forward 使用 decltype(value) 恢复 caller 的 lvalue/rvalue category",
  },
  {
    label: "pack",
    caption:
      "variadic args 使用 std::forward<decltype(args)>(args)... 逐项配对展开",
  },
  {
    label: "return",
    caption: "decltype(auto) 另行保留 target 的 reference/cv 返回契约",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 126,
}));

export function EmcppItem33GenericLambdaForwardingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [parenthesizedDecltype, setParenthesizedDecltype] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 位于该阶段动画起点，控制条文本与画面保持同一语义时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setParenthesizedDecltype(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-33-generic-lambda-forwarding"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 33
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              generic lambda 如何找回隐藏的 T
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              `auto&&` 负责绑定，`decltype(value)`
              负责取回声明类型，`std::forward`
              负责恢复类别；三者各自承担不同合同。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 420"
          role="img"
          aria-label="Effective Modern C++ Item 33 generic lambda 转发时间线：auto&& 参数生成隐藏的 T&& call operator，decltype 未加括号取回参数声明类型，std::forward 恢复 lvalue 或 rvalue，variadic pack 逐项展开，decltype(auto) 保留返回引用和 cv。可播放、暂停、单步、拖进度，并可注入 decltype((value)) 误用故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item33-forward-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item33-forward-fault-arrow"
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
            auto&& → decltype → std::forward：泛型转发链
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            binding · hidden T · declared type · category · pack · return
          </text>

          <line
            x1="82"
            y1="176"
            x2="756"
            y2="176"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item33-forward-arrow)"
          />

          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 110}
                y1="176"
                x2={end.x - 10}
                y2="176"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item33-forward-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = parenthesizedDecltype && index === 3;
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
                  height="100"
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
                  y={box.y + 58}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index === 0
                    ? "auto&&"
                    : index === 1
                      ? "T&&"
                      : index === 2
                        ? "declared type"
                        : index === 3
                          ? "cast"
                          : index === 4
                            ? "args..."
                            : "return cv/ref"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 80}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "category loss"
                    : index < 3
                      ? "取回"
                      : index === 3
                        ? "恢复"
                        : "保留"}
                </text>
              </g>
            );
          })}

          {parenthesizedDecltype && (
            <g>
              <path
                d="M 560 244 C 500 286, 430 286, 360 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item33-forward-fault-arrow)"
              />
              <rect
                x="250"
                y="292"
                width="370"
                height="48"
                rx="10"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="266"
                y="313"
                fontSize="12"
                fontWeight="700"
                fill={C.danger}
              >
                故障：decltype((value)) 抹掉 rvalue
              </text>
              <text x="266" y="330" fontSize="11" fill={C.secondary}>
                现象：named value 是 lvalue；修法：使用未加括号的
                decltype(value)
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
          caption="每个 label 位于对应转发阶段的起点；可单步检查 type recovery 与 expression cast 的边界。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 33 泛型 lambda 转发时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={parenthesizedDecltype}
          onClick={() => setParenthesizedDecltype((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            parenthesizedDecltype
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {parenthesizedDecltype
            ? "关闭 decltype 括号故障"
            : "注入 decltype 括号故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        泛型 lambda 不需要暴露隐藏的 T：未加括号的 decltype(parameter)
        就是转发所需的声明类型证据。
      </figcaption>
    </figure>
  );
}
