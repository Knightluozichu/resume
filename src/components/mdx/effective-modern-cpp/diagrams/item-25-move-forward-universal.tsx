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
    label: "named",
    caption:
      "named reference expression 在函数体内是 lvalue；不能只看 parameter 声明就假设 downstream 会 move",
  },
  {
    label: "move",
    caption:
      "move on rvalue references：ordinary rvalue-reference parameter 只接受可消费 rvalue，last use 处显式 move",
  },
  {
    label: "forward",
    caption:
      "forward on universal references：按 deduced T 恢复 lvalue/rvalue/const caller category",
  },
  {
    label: "last",
    caption:
      "last use 之前先 validate/audit，最终 sink 才恢复类别；多次 forward 会重复暴露消费权限",
  },
  {
    label: "return",
    caption:
      "reference parameter return 用 move/forward 交付；它不是 local object，不能期待 NRVO",
  },
  {
    label: "rvo",
    caption:
      "return value optimization：local plain return 保留 RVO，并在未 elide 时获得 implicit move fallback",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 330,
}));

export function EmcppItem25MoveForwardLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [earlyMoveFault, setEarlyMoveFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐 value-category 恢复的起点，让字幕不会落后于动画。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setEarlyMoveFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-25-move-forward-universal"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 25
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              恢复类别，但只在最后一次消费时恢复
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              `move` 表示入口已授权消费，`forward` 表示保留 caller
              选择；两者都要放在当前 value 的 last use。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 470"
          role="img"
          aria-label="Effective Modern C++ Item 25 move forward universal 教学时间线：展示 named reference expression 是 lvalue，ordinary rvalue-reference parameter 在 last use 处使用 move，forwarding reference 通过 forward 恢复 caller 的 lvalue/rvalue/const category，多次使用先观察后消费，reference parameter return 与 local return 的差异，以及 return value optimization 与 implicit move。可播放、暂停、单步、拖进度、重置，并可注入把 forwarding lvalue 提前 move 的故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item25-forward-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item25-forward-fault-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="470" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            caller category → named lvalue → restore at sink
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            rvalue reference · forwarding reference · last use · return transfer
            · RVO
          </text>

          <rect
            x="28"
            y="82"
            width="784"
            height="86"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="108" fontSize="12" fontWeight="700" fill={C.accent}>
            同一参数的三种观察
          </text>
          <rect
            x="46"
            y="120"
            width="198"
            height="32"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="145"
            y="141"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            lvalue caller → T&amp;
          </text>
          <line
            x1="258"
            y1="136"
            x2="326"
            y2="136"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item25-forward-arrow)"
          />
          <rect
            x="342"
            y="120"
            width="198"
            height="32"
            rx="8"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text
            x="441"
            y="141"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            named param：lvalue
          </text>
          <line
            x1="554"
            y1="136"
            x2="622"
            y2="136"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item25-forward-arrow)"
          />
          <rect
            x="638"
            y="120"
            width="156"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="716"
            y="141"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            sink：恢复
          </text>
          <text x="46" y="160" fontSize="11" fill={C.secondary}>
            参数名称在 body 中永远是 lvalue；只有 move/forward
            才会在消费点恢复正确类别
          </text>

          {STEPS.map((step, index) => {
            const failed = earlyMoveFault && index === 2;
            return (
              <g
                key={step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                {index === 0 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={C.accent}
                      fillOpacity="0.1"
                      stroke={C.accent}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.accent}
                    >
                      named reference expression：声明是 rvalue，表达式是 lvalue
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      void consume(Widget&amp;&amp; widget) 进入函数后，widget
                      这个名字仍是 lvalue
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      downstream 若需 move，必须在当前 value 的消费点显式恢复
                      category
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      先看 parameter declaration，再看 body
                      expression；不要把两者混成一个类型标签
                    </text>
                  </>
                )}

                {index === 1 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={C.success}
                      fillOpacity="0.1"
                      stroke={C.success}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.success}
                    >
                      move on rvalue references：入口已经授权消费
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      ordinary Widget&amp;&amp; 不能绑定 lvalue；caller 已提供
                      temporary / xvalue / 显式 move
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      validate(message) → audit(message) →
                      queue.push(std::move(message))
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      move 恢复入口承诺，而不是擅自消费一个仍由 lvalue caller
                      拥有的对象
                    </text>
                  </>
                )}

                {index === 2 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={failed ? C.danger : C.warning}
                      fillOpacity="0.1"
                      stroke={failed ? C.danger : C.warning}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={failed ? C.danger : C.warning}
                    >
                      forward on universal references：保留 caller 选择
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      T&amp;&amp; + lvalue caller → T = Widget&amp; →
                      std::forward&lt;T&gt;(value) 保留 lvalue
                    </text>
                    <text
                      x="48"
                      y="259"
                      fontSize="12"
                      fill={failed ? C.danger : C.primary}
                    >
                      T&amp;&amp; + rvalue caller → T = Widget →
                      std::forward&lt;T&gt;(value) 恢复 rvalue
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      无条件 move 会把 lvalue caller 也转成可消费值，破坏 relay
                      的语义边界
                    </text>
                  </>
                )}

                {index === 3 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={C.accent}
                      fillOpacity="0.1"
                      stroke={C.accent}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.accent}
                    >
                      last use：观察可以多次，消费只能放在最后
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      validate(message) → audit(message) → final
                      sink(std::forward&lt;T&gt;(message))
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      对 rvalue 多次 forward 会重复暴露消费权限，第一次 sink
                      可能已移动资源
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      last-use analysis 是值类别工具的时间维度：先完成所有
                      non-consuming observation
                    </text>
                  </>
                )}

                {index === 4 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={C.warning}
                      fillOpacity="0.1"
                      stroke={C.warning}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.warning}
                    >
                      return reference parameter：不是 local，不能期待 NRVO
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      Matrix&amp;&amp; left → left += right → return
                      std::move(left)
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      forwarding parameter 则 return
                      std::forward&lt;T&gt;(fraction)，按 caller category 交付
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      reference parameter 的资源交付与 local return 的 elision
                      是两套规则
                    </text>
                  </>
                )}

                {index === 5 && (
                  <>
                    <rect
                      x="28"
                      y="180"
                      width="784"
                      height="112"
                      rx="12"
                      fill={C.success}
                      fillOpacity="0.1"
                      stroke={C.success}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.success}
                    >
                      return value optimization：local plain return
                      保留两条好路径
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      Widget result; configure(result); return result; // RVO
                      candidate
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      若无法 elide，move-eligible local 仍由语言尝试 implicit
                      move
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      return std::move(result) 可能阻止 NRVO；先保持 plain local
                      name，再用 counters 验证
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {earlyMoveFault && (
            <g>
              <path
                d="M 612 302 C 592 278, 584 250, 590 226"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item25-forward-fault-arrow)"
              />
              <rect
                x="174"
                y="300"
                width="492"
                height="30"
                rx="8"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="192"
                y="321"
                fontSize="11"
                fontWeight="700"
                fill={C.danger}
              >
                故障：lvalue caller 被提前 move；修法：保留观察，最后一次 sink
                才 forward
              </text>
            </g>
          )}

          <line
            x1="82"
            y1="388"
            x2="756"
            y2="388"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item25-forward-arrow)"
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
                markerEnd="url(#emcpp-item25-forward-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = earlyMoveFault && index === 2;
            return (
              <g key={`step-card-${step.label}`}>
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
                    ? "named"
                    : index === 1
                      ? "move"
                      : index === 2
                        ? "forward"
                        : index === 3
                          ? "last use"
                          : index === 4
                            ? "return"
                            : "RVO"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "drain"
                    : index === 0
                      ? "lvalue"
                      : index === 1
                        ? "consume"
                        : index === 2
                          ? "preserve"
                          : index === 3
                            ? "sink"
                            : index === 4
                              ? "transfer"
                              : "elide"}
                </text>
              </g>
            );
          })}

          <rect
            x="28"
            y="444"
            width="784"
            height="20"
            rx="7"
            fill={C.success}
            fillOpacity="0.1"
            stroke={C.success}
            strokeWidth="1"
          />
          <text x="44" y="458" fontSize="11" fontWeight="700" fill={C.success}>
            当前验收门：{activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="每个 label 位于 value-category 或 return strategy 的关键转换起点；可单步检查 named lvalue、last use 与 RVO。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 25 move forward 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={earlyMoveFault}
          onClick={() => setEarlyMoveFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            earlyMoveFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {earlyMoveFault ? "关闭提前 move 故障" : "注入提前 move 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        move/forward
        是类别恢复工具，不是“越早越好”的性能按钮；先完成观察，再在唯一的消费点恢复权限。
      </figcaption>
    </figure>
  );
}
