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
    label: "acquire",
    caption:
      "unique_ptr 把 exclusive ownership 写进类型：任一时刻只有一个 owner 负责 resource 的销毁",
  },
  {
    label: "move",
    caption:
      "ownership transfer 只能通过 move：destination 接管 pointer/deleter，source 变为空但仍可析构",
  },
  {
    label: "factory",
    caption:
      "factory return 先交付最小的独占承诺，caller 可继续独占，也可单向升级 shared ownership",
  },
  {
    label: "deleter",
    caption:
      "custom deleter 属于 unique_ptr 的 type/state；stateless、stateful 与 function-pointer 成本不同",
  },
  {
    label: "boundary",
    caption:
      "get 只是 raw observing access；release 是 ownership release escape，必须立即交给明确接管者",
  },
  {
    label: "contract",
    caption:
      "polymorphic conversion、unique array owner 与 unique_ptr pimpl 都需要单独的 ownership contract 验收",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 330,
}));

export function EmcppItem18UniquePtrLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [releaseEscapeFault, setReleaseEscapeFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐 ownership 图变化的起点，保证单步观察和字幕同步。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setReleaseEscapeFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-18-unique-ptr"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 18
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把“谁负责销毁”画成一条唯一的边
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              从 owner 图出发，逐步观察 move、deleter 与 raw pointer
              边界如何改变责任，而不是只看指针地址。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 470"
          role="img"
          aria-label="Effective Modern C++ Item 18 unique_ptr 教学时间线：展示 unique_ptr 的 exclusive ownership 和唯一销毁责任，move 后 ownership transfer 让 source 为空，factory return 保留调用者决策，custom deleter 的类型与尺寸成本，get 和 release 的责任差异，以及 polymorphic conversion、unique array owner、unique_ptr pimpl 的验收边界。可播放、暂停、单步、拖进度、重置，并可注入 release 后未立即接管导致泄漏的故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item18-unique-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item18-unique-fault-arrow"
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
            acquire → move → release protocol → exactly one cleanup path
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            exclusive ownership · factory return · custom deleter · raw boundary
            · contract matrix
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
            初始 ownership graph
          </text>
          <circle
            cx="130"
            cy="137"
            r="17"
            fill={C.accent}
            fillOpacity="0.18"
            stroke={C.accent}
            strokeWidth="2"
          />
          <text
            x="130"
            y="142"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={C.accent}
          >
            owner A
          </text>
          <line
            x1="150"
            y1="137"
            x2="294"
            y2="137"
            stroke={C.accent}
            strokeWidth="3"
            markerEnd="url(#emcpp-item18-unique-arrow)"
          />
          <rect
            x="310"
            y="116"
            width="156"
            height="42"
            rx="10"
            fill={C.accent}
            fillOpacity="0.1"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text
            x="388"
            y="142"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={C.primary}
          >
            resource
          </text>
          <line
            x1="482"
            y1="137"
            x2="626"
            y2="137"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item18-unique-arrow)"
          />
          <circle
            cx="664"
            cy="137"
            r="17"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="664"
            y="142"
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={C.secondary}
          >
            owner B
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            实线表示唯一销毁责任；move 后箭头会转移，不能出现两个同时负责 delete
            的 owner
          </text>

          {STEPS.map((step, index) => {
            const failed = releaseEscapeFault && index === 4;
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
                      unique_ptr：把唯一 owner 变成 move-only type
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      owner A ──owns──&gt; resource；copy 被删除，scope exit
                      调用 deleter
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      exclusive ownership 不是注释，而是类型系统拒绝复制的约束
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      deterministic RAII cleanup
                      覆盖异常、早退和正常返回的控制流出口
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
                      ownership transfer：move 一次，责任转移一次
                    </text>
                    <rect
                      x="48"
                      y="222"
                      width="174"
                      height="42"
                      rx="8"
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <text
                      x="135"
                      y="248"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.primary}
                    >
                      owner A：empty
                    </text>
                    <line
                      x1="232"
                      y1="243"
                      x2="310"
                      y2="243"
                      stroke={C.success}
                      strokeWidth="3"
                      markerEnd="url(#emcpp-item18-unique-arrow)"
                    />
                    <rect
                      x="316"
                      y="222"
                      width="210"
                      height="42"
                      rx="8"
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <text
                      x="421"
                      y="248"
                      textAnchor="middle"
                      fontSize="12"
                      fill={C.primary}
                    >
                      nextOwner：owns resource
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      source 可析构、赋值或再次接收资源；它不再承担原 resource
                      的销毁责任
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
                      factory return：交付最小 ownership 承诺
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      makeInvestment() → unique_ptr&lt;Investment&gt; → caller
                      自选持有方式
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      需要共享时可从 rvalue unique_ptr 构造
                      shared_ptr；反向恢复独占不可靠
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      factory 不替 caller 过早决定 ownership，API
                      保留最大决策空间
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
                      fill={C.elevated}
                      stroke={C.border}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.accent}
                    >
                      custom deleter：释放协议也是类型的一部分
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      stateless functor：通常可借 EBO 压缩；stateful
                      functor：携带 pool/allocator 状态
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      function-pointer
                      deleter：统一运行期策略，但增加存储和间接调用
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      deleter 不应抛异常；类型、尺寸、ABI 与 noexcept 都属于
                      review contract
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
                      fill={failed ? C.danger : C.warning}
                      fillOpacity="0.1"
                      stroke={failed ? C.danger : C.border}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={failed ? C.danger : C.accent}
                    >
                      get 与 release：同样返回 raw pointer，不同责任结果
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      get()：borrow only，unique_ptr 继续负责 delete
                    </text>
                    <text
                      x="48"
                      y="259"
                      fontSize="12"
                      fill={failed ? C.danger : C.primary}
                    >
                      release()：ownership release escape，caller
                      必须立即接管，否则泄漏
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      reset() 则是 owner 仍在场的替换/销毁动作；三者不能按普通
                      getter 混用
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
                      contract matrix：为特殊边界单独验收
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      Derived → Base：Base destructor 必须 virtual；array
                      owner：使用 delete[] 语义
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      unique_ptr&lt;Impl&gt; pimpl：Impl complete 的 destructor
                      放到 source file
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      static traits、异常 factory、deleter 次数与 upgrade path
                      共同证明 ownership 未丢失
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {releaseEscapeFault && (
            <g>
              <path
                d="M 612 302 C 592 278, 584 250, 590 226"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item18-unique-fault-arrow)"
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
                故障：release 后没有明确接管者；修法：立即交给 owner/C
                API，并测试只销毁一次
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
            markerEnd="url(#emcpp-item18-unique-arrow)"
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
                markerEnd="url(#emcpp-item18-unique-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = releaseEscapeFault && index === 4;
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
                    ? "one owner"
                    : index === 1
                      ? "move"
                      : index === 2
                        ? "minimal"
                        : index === 3
                          ? "deleter"
                          : index === 4
                            ? "raw edge"
                            : "special"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "leak"
                    : index === 0
                      ? "acquire"
                      : index === 1
                        ? "transfer"
                        : index === 2
                          ? "choose"
                          : index === 3
                            ? "type/state"
                            : index === 4
                              ? "handoff"
                              : "verify"}
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
          caption="每个 label 位于 ownership graph 的关键转换起点；可单步查看 move、deleter、raw pointer 和特殊边界。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 18 unique ptr 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={releaseEscapeFault}
          onClick={() => setReleaseEscapeFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            releaseEscapeFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {releaseEscapeFault
            ? "关闭 release 泄漏故障"
            : "注入 release 泄漏故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        unique_ptr
        的核心不是“有一个指针”，而是任何时刻都能回答：谁拥有资源、谁负责销毁、责任如何转交。
      </figcaption>
    </figure>
  );
}
