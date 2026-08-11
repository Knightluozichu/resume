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
    label: "domain",
    caption:
      "alternatives to universal reference overloading 从输入域出发：先判断是否真的需要一个无限泛化的入口",
  },
  {
    label: "boundary",
    caption:
      "const reference or value 用稳定的已知类型边界换取更简单的候选集合和更可读的 diagnostics",
  },
  {
    label: "tag",
    caption:
      "tag dispatch 把 integral 与 name-like 分类移到实现层，避免 short 和 greedy forwarding 直接竞争",
  },
  {
    label: "constrain",
    caption:
      "constrain templates 在 candidate boundary 排除 Person/self/derived family，避免 forwarding constructor 劫持 copy/move",
  },
  {
    label: "enable-if",
    caption:
      "enable_if、decay、is_base_of 与 is_constructible 把真实构造前提编码进候选形成阶段",
  },
  {
    label: "matrix",
    caption:
      "用 overload probes、copy/move counters、类型矩阵和错误位置验证每种 alternative 的成本与边界",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem27ForwardingAlternativesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [greedyFault, setGreedyFault] = useState(false);

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
    setGreedyFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-27-forwarding-overload-alternatives"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 27
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先缩小输入域，再决定是否值得 forwarding
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              这张图把五种 alternative 放在同一条候选形成链上，特别标出 constructor 劫持发生在
              body 之前。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 27 教学时间线：比较 alternatives to universal reference overloading 的输入域决策，展示 const reference or value 的稳定边界，展示 tag dispatch 如何在实现层分类，展示 constrain templates 和 enable_if、decay、is_base_of、is_constructible 如何在候选形成阶段排除 Person 与 derived 类型，最后用 overload probes、copy/move counters、类型矩阵和 diagnostic locality 验收。支持播放、暂停、单步、拖进度、重置和注入 greedy forwarding constructor 劫持故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item27-forwarding-alternatives-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item27-forwarding-alternatives-fault-arrow"
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
            input domain → candidate boundary → selected API → diagnostic cost
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            distinct name · const reference or value · tag dispatch · constrain templates · enable_if
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
            forwarding template 的 exact match 只有在“输入域真的需要泛化”时才值得
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
            name / index / Person
          </text>
          <line
            x1="230"
            y1="132"
            x2="304"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item27-forwarding-alternatives-arrow)"
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
            narrow candidate set
          </text>
          <line
            x1="506"
            y1="132"
            x2="580"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item27-forwarding-alternatives-arrow)"
          />
          <rect
            x="598"
            y="116"
            width="196"
            height="32"
            rx="8"
            fill={greedyFault ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={greedyFault ? C.danger : C.warning}
            strokeWidth="1.5"
          />
          <text
            x="696"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={greedyFault ? C.danger : C.primary}
          >
            {greedyFault ? "template steals copy" : "clear overload"}
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            constructor 的 forwarding template 若先胜出，body 里的 static_assert 已经来得太晚
          </text>

          {STEPS.map((step, index) => {
            const faulted = greedyFault && (index === 3 || index === 4);
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
                      1 · domain：alternatives to universal reference overloading 从输入域开始
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      name 与 index 是不同业务命令：distinct name domain split 通常比统一 overload 更清楚
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      constructor 不能改名；只有确实需要统一入口时，才进入 tag dispatch 或 constrained template
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      先列合法输入集合、错误位置和存储目标，再支付 forwarding 的复杂度成本
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
                      fill={C.success}
                    >
                      2 · boundary：const reference or value 以稳定性换简单性
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      只读已知类型：const reference 避开 greedy template，调用点和 diagnostics 更容易理解
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      必然持有副本：by-value sink parameter 接收一次独立 value，再统一 move 到最终 storage
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      用 profile 与 counters 量化额外 temporary/copy；不要因为看见一次 copy 就机械改 forwarding
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
                      fill={C.success}
                    >
                      3 · tag：把类型分类移到 implementation layer
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      public template 只生成 true_type/false_type，再由 tag dispatch 选择 integral 或 name-like path
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      remove_reference 先规范 lvalue T，short/int/long 才能统一进入 integral true tag
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      分类和值处理分两层；分类变化不会让 public overload set 重新发生贪婪竞争
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
                      fill={faulted ? C.danger : C.warning}
                    >
                      4 · constrain：constructor 劫持发生在 body 之前
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      Person(T&&) 对 Person lvalue 是 exact match；若不约束，会先胜出并阻断 copy constructor
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      constrain templates 需要在 candidate boundary 排除 Person、const Person 和整个 derived family
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      body static_assert 只能改善失败文字，不能让 compiler 回头改选 copy/move
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
                      5 · enable_if：把 self-family 和真实构造条件写进候选
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      decay 规范化 cv/reference，is_base_of 排除 Person 与 derived，is_constructible 检查 name-like 输入
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      enable_if 让不满足条件的 template substitution failure 发生在 overload boundary
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：只排除 exact Person；修法是覆盖 self、const、lvalue/rvalue 和 derived hierarchy
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
                      6 · matrix：比较正确性、接口清晰度、成本和错误位置
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      string literal、mutable/const string、short/int、Person copy/move、derived 与 unrelated type 全覆盖
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      overload probes、copy/move counters 和 diagnostic locality 记录“选了谁、花多少、错在哪”
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      domain-first overload design 的结论不是永远 forwarding，而是最窄且足够的方案
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {greedyFault && (
            <g>
              <path
                d="M 710 338 C 662 306, 610 270, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item27-forwarding-alternatives-fault-arrow)"
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
                故障注入：greedy forwarding constructor 劫持 copy；修法：candidate constraint 先排除 self/derived
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
            markerEnd="url(#emcpp-item27-forwarding-alternatives-arrow)"
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
                markerEnd="url(#emcpp-item27-forwarding-alternatives-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = greedyFault && (index === 3 || index === 4);
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
                    ? "输入域"
                    : index === 1
                      ? "边界"
                      : index === 2
                        ? "标签"
                        : index === 3
                          ? "约束"
                          : index === 4
                            ? "候选"
                            : "验收"}
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
                      ? "选择"
                      : index < 5
                        ? "分流"
                        : "证据"}
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
          caption="按步骤比较输入域、简单边界、tag dispatch、candidate constraint 和 enable_if；单步可观察 constructor 劫持发生的位置。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 27 forwarding overload alternatives 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={greedyFault}
          onClick={() => setGreedyFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            greedyFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {greedyFault ? "关闭 forwarding 劫持故障" : "注入 forwarding 劫持故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        forwarding overload 的替代方案不是模板清单，而是输入域与候选边界的设计决策；先选最窄机制，再用矩阵确认成本和错误位置。
      </figcaption>
    </figure>
  );
}
