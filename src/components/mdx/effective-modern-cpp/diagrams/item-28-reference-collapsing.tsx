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
    label: "rules",
    caption:
      "先展开 reference collapsing 的四条规则：三种组合得到 &，只有 && + && 保留 &&",
  },
  {
    label: "lvalue",
    caption: "lvalue reference wins：T& && 会先保留 lvalue 身份，结果为 T&",
  },
  {
    label: "rvalue",
    caption: "只有两个 rvalue references 相遇时，T&& && 才得到 T&&",
  },
  {
    label: "forwarding",
    caption: "forwarding reference 先推导 T，再把 T&& 替换并折叠",
  },
  {
    label: "contexts",
    caption:
      "template instantiation、auto、typedef/using 与 decltype 最终共用同一张表",
  },
  {
    label: "category",
    caption:
      "折叠只确定类型；有名字的 param 仍是 lvalue，要用 std::forward<T> 恢复 category",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 126,
}));

export function EmcppItem28ReferenceCollapsingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [wrongShortcut, setWrongShortcut] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 位于该阶段动画的起点，保证步骤字幕与规则变化同步。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setWrongShortcut(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-28-reference-collapsing"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 28
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              引用折叠把“引用的引用”压成一个确定类型
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先形成完整的 `T&` / `T&&` 组合，再应用统一规则；不要从外层 `&&`
              的字面形状跳过类型推导。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 420"
          role="img"
          aria-label="Effective Modern C++ Item 28 引用折叠教学时间线：展示四条 reference collapsing 规则，突出 lvalue reference wins，演示 forwarding reference 的 T 推导与 T&& 替换，连接 template instantiation、auto、typedef using 和 decltype，最后区分 declaration type 与 named parameter 的 expression category。可播放、暂停、单步、拖进度，并可注入看到 && 就断言 rvalue 的错误直觉。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item28-collapse-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item28-collapse-fault-arrow"
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
            form → collapse → forward：同一张引用规则表
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            T& & · T& && · T&& & · T&& &&
          </text>

          <line
            x1="82"
            y1="176"
            x2="756"
            y2="176"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item28-collapse-arrow)"
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
                markerEnd="url(#emcpp-item28-collapse-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = wrongShortcut && index === 5;
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
                    ? "四条规则"
                    : index === 1
                      ? "& 优先"
                      : index === 2
                        ? "&& + &&"
                        : index === 3
                          ? "T&& 替换"
                          : index === 4
                            ? "四种上下文"
                            : "type ≠ expr"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 80}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "误判"
                    : index < 4
                      ? "展开"
                      : index === 4
                        ? "统一"
                        : "恢复"}
                </text>
              </g>
            );
          })}

          {wrongShortcut && (
            <g>
              <path
                d="M 695 244 C 620 286, 548 286, 478 244"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item28-collapse-fault-arrow)"
              />
              <rect
                x="270"
                y="292"
                width="350"
                height="48"
                rx="10"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="286"
                y="313"
                fontSize="12"
                fontWeight="700"
                fill={C.danger}
              >
                故障：看到 && 就断言 rvalue
              </text>
              <text x="286" y="330" fontSize="11" fill={C.secondary}>
                现象：把 declaration type 当 expression；修法：先展开 T，再看
                named param
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
          caption="每个 label 位于对应规则开始建立的时刻；可单步查看推导与折叠如何协作。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 28 引用折叠时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={wrongShortcut}
          onClick={() => setWrongShortcut((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            wrongShortcut
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {wrongShortcut ? "关闭错误直觉" : "注入错误直觉"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        先形成完整 reference combination，再套用 collapse
        table；最后仍需区分变量类型与表达式类别。
      </figcaption>
    </figure>
  );
}
