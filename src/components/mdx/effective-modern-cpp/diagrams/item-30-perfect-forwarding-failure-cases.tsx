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
    label: "stages",
    caption:
      "perfect forwarding failure cases 要分两阶段诊断：先看 T 能否推导，再看 reference binding 与 target conversion 是否成立",
  },
  {
    label: "braces",
    caption:
      "braced initializers 不是普通 typed expression；direct target 可提供上下文，generic T&& deduction 没有目标类型",
  },
  {
    label: "intent",
    caption:
      "0/NULL 在 deduction 中保留 integral type；先物化 nullptr 或 typed object，才能保留 pointer intent",
  },
  {
    label: "storage",
    caption:
      "static const member 绑定 reference 会触发 ODR-use；bitfields 没有独立地址，不能绑定普通 forwarding lvalue reference",
  },
  {
    label: "callable",
    caption:
      "overloaded function names 和 template names 不是唯一 callable type；先用 function pointer 或 specialization 消歧",
  },
  {
    label: "checklist",
    caption:
      "target-type context 无法反向参与 deduction；用 typed value、callable cast 或 value boundary 做最小修复",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem30ForwardingFailuresLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [contextFault, setContextFault] = useState(false);

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

  function reset() {
    timeline.goToStep(0);
    setContextFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-30-perfect-forwarding-failure-cases"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 30
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              direct call 的上下文不会穿过 wrapper
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              依次检查 deduction、storage/addressability 和 target conversion，找出 perfect forwarding 失败发生在哪一层。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 30 教学时间线：展示 perfect forwarding failure cases 的 deduction 与 binding 两阶段，展示 braced initializers 缺少普通 expression type，展示 0 与 NULL 的 null-literal type mismatch，展示 static const member 的 ODR-use storage requirement 与 bitfields 的不可寻址限制，展示 overloaded function names 与 template names 需要 target-type context 消歧，最后给出 typed value、callable cast 和 value boundary 的最小修复清单。支持播放、暂停、单步、拖进度、重置和注入 direct-call context 丢失故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item30-forwarding-failures-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item30-forwarding-failures-fault-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="520" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            direct context → deduction → reference boundary → target conversion
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            braced initializers · null intent · static const member · bitfields · overloaded function names · template names
          </text>

          <rect
            x="28"
            y="78"
            width="784"
            height="88"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="104" fontSize="12" fontWeight="700" fill={C.accent}>
            direct call 能给 target type context；wrapper 必须先独立完成 T deduction
          </text>
          <rect
            x="46"
            y="116"
            width="166"
            height="32"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text
            x="129"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.primary}
          >
            direct f(argument)
          </text>
          <line
            x1="230"
            y1="132"
            x2="304"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item30-forwarding-failures-arrow)"
          />
          <rect
            x="322"
            y="116"
            width="166"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="405"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.primary}
          >
            target signature
          </text>
          <line
            x1="506"
            y1="132"
            x2="580"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item30-forwarding-failures-arrow)"
          />
          <rect
            x="598"
            y="116"
            width="196"
            height="32"
            rx="8"
            fill={contextFault ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={contextFault ? C.danger : C.warning}
            strokeWidth="1.5"
          />
          <text
            x="696"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={contextFault ? C.danger : C.primary}
          >
            {contextFault ? "context lost → failure" : "typed target"}
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            wrapper body 中的 std::forward 不能把已经丢失的目标类型上下文倒推回来
          </text>

          {STEPS.map((step, index) => {
            const faulted = contextFault && (index === 1 || index === 4);
            return (
              <g
                key={step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect
                  x="28"
                  y="184"
                  width="784"
                  height="140"
                  rx="12"
                  fill={faulted ? C.danger : C.accent}
                  fillOpacity="0.1"
                  stroke={faulted ? C.danger : C.accent}
                  strokeWidth="1.5"
                />

                {index === 0 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.accent}
                    >
                      1 · stages：perfect forwarding failure cases 分两阶段
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      阶段一：argument 是否有普通且唯一的 typed expression，T 能否从它推导出来
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      阶段二：reference 是否能绑定实体，std::forward 后 target conversion 是否仍成立
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      先判断失败阶段，再选 typed value、callable cast 或 value boundary 修复
                    </text>
                  </>
                )}

                {index === 1 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={faulted ? C.danger : C.success}
                    >
                      2 · braces：braced initializers 没有普通单一类型
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      direct target 的 vector parameter 提供构造上下文；generic T&& deduction 先看不到 target
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      修复：显式物化 typed object，或利用 auto 的 initializer-list 规则，再交给 wrapper
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：把每个 {"{"}...{"}"} 都当成 initializer_list；修法是让目标类型在 wrapper 之前出现
                    </text>
                  </>
                )}

                {index === 2 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.warning}
                    >
                      3 · intent：0/NULL 的 language type 不是 pointer intent
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      direct pointer call 可把 0 当 null pointer constant；wrapper deduction 得到 int，转发后不再有相同语义
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      nullptr 物化为 std::nullptr_t，让空指针意图在 deduction 阶段就可见
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      forwarding 保留 language type，不会保留调用者心里未写入类型系统的意图
                    </text>
                  </>
                )}

                {index === 3 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.warning}
                    >
                      4 · storage：static const member 与 bitfields 暴露 identity 边界
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      static const member 的 direct value call 可能不需 storage；绑定 reference 会触发 ODR-use
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      bitfields 有共享 storage unit 却没有独立地址；non-const forwarding reference 无法绑定
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      前者补 definition 或复制 local，后者物化 ordinary object；两者不是同一种 deduction failure
                    </text>
                  </>
                )}

                {index === 4 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={faulted ? C.danger : C.success}
                    >
                      5 · callable：overloaded function names 和 template names 需要消歧
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      direct target function pointer signature 能选择一个 overload；wrapper 的 T 看见的是候选集合
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      显式 function pointer、static_cast 或 template specialization 先建立唯一 callable type
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：把 overload set 当 function object；修法是在 deduction 之前恢复 target-type context
                    </text>
                  </>
                )}

                {index === 5 && (
                  <>
                    <text
                      x="48"
                      y="212"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.warning}
                    >
                      6 · checklist：按信息丢失点选择最小修复
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      deduction failure：物化 typed value；意图错误：nullptr；callable 歧义：function pointer 或 specialization
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      storage/identity failure：补 static definition 或复制 bitfield；最后再检查 target conversion
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      forwarding 的边界越清楚，修复越小；不要在 wrapper 内堆叠 casts 猜测语义
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {contextFault && (
            <g>
              <path
                d="M 710 338 C 662 306, 610 270, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item30-forwarding-failures-fault-arrow)"
              />
              <rect
                x="126"
                y="326"
                width="588"
                height="28"
                rx="8"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="144"
                y="346"
                fontSize="11"
                fontWeight="700"
                fill={C.danger}
              >
                故障注入：把 direct-call context 留在 wrapper 外；修法：先物化类型或消歧 callable
              </text>
            </g>
          )}

          <line
            x1="82"
            y1="390"
            x2="756"
            y2="390"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item30-forwarding-failures-arrow)"
          />

          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 104}
                y1="378"
                x2={end.x - 10}
                y2="378"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item30-forwarding-failures-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = contextFault && (index === 1 || index === 4);
            return (
              <g key={`step-card-${step.label}`}>
                <rect
                  x={box.x}
                  y={box.y}
                  width="104"
                  height="104"
                  rx="12"
                  fill={faulted ? C.danger : selected ? C.accent : C.elevated}
                  fillOpacity={faulted || selected ? 0.16 : 1}
                  stroke={faulted ? C.danger : selected ? C.accent : C.border}
                  strokeWidth={faulted || selected ? 3 : 1.5}
                />
                <circle
                  cx={box.x + 20}
                  cy={box.y + 22}
                  r="12"
                  fill={faulted ? C.danger : selected ? C.accent : C.bg}
                  stroke={faulted ? C.danger : selected ? C.accent : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x={box.x + 20}
                  y={box.y + 27}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={faulted || selected ? C.bg : C.secondary}
                >
                  {index + 1}
                </text>
                <text
                  x={box.x + 56}
                  y={box.y + 27}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={faulted ? C.danger : selected ? C.accent : C.primary}
                >
                  {step.label}
                </text>
                <text
                  x={box.x + 52}
                  y={box.y + 59}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index === 0
                    ? "阶段"
                    : index === 1
                      ? "花括号"
                      : index === 2
                        ? "意图"
                        : index === 3
                          ? "存储"
                          : index === 4
                            ? "函数"
                            : "清单"}
                </text>
                <text
                  x={box.x + 52}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={faulted ? C.danger : selected ? C.accent : C.secondary}
                >
                  {faulted
                    ? "风险"
                    : index < 2
                      ? "推导"
                      : index < 5
                        ? "边界"
                        : "修复"}
                </text>
              </g>
            );
          })}

          <rect
            x="28"
            y="478"
            width="784"
            height="26"
            rx="7"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="44" y="496" fontSize="11" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep?.caption ?? "选择一个步骤"}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="按步骤检查 deduction、storage、addressability 和 target context；单步可对照 direct call 与 wrapper call 的信息边界。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 30 perfect forwarding failures 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={contextFault}
          onClick={() => setContextFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            contextFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {contextFault ? "关闭 target context 故障" : "注入 target context 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        perfect forwarding 不是万能语法通道：先让类型、可寻址身份或 callable 具体化，再进入 forwarding boundary。
      </figcaption>
    </figure>
  );
}
