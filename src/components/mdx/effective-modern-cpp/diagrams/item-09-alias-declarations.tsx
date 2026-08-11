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
    label: "read",
    caption:
      "alias declarations 用 Name = Type 固定阅读方向；typedef 把名字嵌进 declarator，需要先拆语法",
  },
  {
    label: "identity",
    caption:
      "alias 与 typedef 都是 type synonym，不创建新类型；const 仍按展开后的最外层分析",
  },
  {
    label: "family",
    caption:
      "alias template 直接表达参数化类型族，调用处看到最终类型而不是 wrapper::type",
  },
  {
    label: "typename",
    caption:
      "dependent type typename 仍用于未决 nested type；只有不再访问 dependent member 才能移除",
  },
  {
    label: "traits",
    caption:
      "C++14 trait type alias 用 _t 暴露结果，并可组合成 type normalization pipeline",
  },
  {
    label: "boundary",
    caption:
      "多结果、value 或 partial specialization 仍保留 structured metafunction，别名迁移要用断言验证",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 324,
}));

export function EmcppItem09AliasDeclarationsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [typenameFault, setTypenameFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐每个声明/模板边界出现的起点，使单步审查可复现。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setTypenameFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-09-alias-declarations"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 9
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从“读声明”走到“生成类型族”
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              using 的等号把名称放在左侧；进入模板后，再观察 alias template
              如何减少 wrapper 与 typename 噪声。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 460"
          role="img"
          aria-label="Effective Modern C++ Item 9 alias declarations 教学时间线：比较 typedef 和 alias declarations 的阅读方向与相同 type identity，展示 alias template 直接生成类型族、dependent type typename 的保留边界、C++14 trait type alias 和 type normalization pipeline，最后区分何时保留 structured metafunction。可播放、暂停、单步、拖进度、重置，并可注入遗漏 typename 的故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item09-alias-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item09-alias-fault-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="460" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            spelling → type identity → type family → boundary
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            typedef · using · alias template · typename · trait _t · structured
            trait
          </text>

          <rect
            x="28"
            y="82"
            width="370"
            height="104"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="108" fontSize="12" fontWeight="700" fill={C.warning}>
            typedef：先解析 declarator
          </text>
          <text x="46" y="137" fontSize="13" fill={C.primary}>
            typedef void (*Callback)(int);
          </text>
          <text x="46" y="164" fontSize="11" fill={C.secondary}>
            名字藏在 (*Callback) 中
          </text>

          <rect
            x="414"
            y="82"
            width="398"
            height="104"
            rx="12"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text x="432" y="108" fontSize="12" fontWeight="700" fill={C.accent}>
            alias declaration：先定位名字
          </text>
          <text x="432" y="137" fontSize="13" fill={C.primary}>
            using Callback = void (*)(int);
          </text>
          <text x="432" y="164" fontSize="11" fill={C.secondary}>
            两者 type identity 相同，阅读顺序不同
          </text>

          <line
            x1="82"
            y1="220"
            x2="756"
            y2="220"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item09-alias-arrow)"
          />

          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 110}
                y1="376"
                x2={end.x - 10}
                y2="376"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item09-alias-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = typenameFault && index === 3;
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
                    ? "read order"
                    : index === 1
                      ? "same type"
                      : index === 2
                        ? "T → family"
                        : index === 3
                          ? "nested type"
                          : index === 4
                            ? "_t chain"
                            : "multi-result"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "parse error"
                    : index === 0
                      ? "compare"
                      : index === 1
                        ? "assert"
                        : index === 2
                          ? "expand"
                          : index === 3
                            ? "typename"
                            : index === 4
                              ? "compose"
                              : "choose"}
                </text>
              </g>
            );
          })}

          {typenameFault && (
            <g>
              <path
                d="M 477 302 C 487 278, 500 260, 520 246"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item09-alias-fault-arrow)"
              />
              <rect
                x="174"
                y="242"
                width="492"
                height="60"
                rx="10"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="192"
                y="266"
                fontSize="12"
                fontWeight="700"
                fill={C.danger}
              >
                故障：直接写 MyAllocList&lt;T&gt;::type，漏掉 typename
              </text>
              <text x="192" y="287" fontSize="11" fill={C.secondary}>
                现象：dependent name 被 parser 当成 value；修法：保留
                typename，或改用直接 alias template
              </text>
            </g>
          )}

          <rect
            x="28"
            y="424"
            width="784"
            height="26"
            rx="8"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="44" y="442" fontSize="12" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="每个 label 位于一个类型声明边界的起点；可单步比较 spelling、类型族、typename 和 trait 结果。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 9 alias declarations 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={typenameFault}
          onClick={() => setTypenameFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            typenameFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {typenameFault ? "关闭 typename 故障" : "注入 typename 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        alias template
        让类型族更像普通类型表达式；但多结果或特化协议仍应保留具名 metafunction
        struct。
      </figcaption>
    </figure>
  );
}
