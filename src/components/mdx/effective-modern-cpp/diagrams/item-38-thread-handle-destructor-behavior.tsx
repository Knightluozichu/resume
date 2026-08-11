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
    label: "handle",
    caption:
      "先区分 resource：std::thread 关联执行线程，future 关联 provider/consumer 共享状态",
  },
  {
    label: "thread",
    caption:
      "joinable std::thread 析构直接 terminate；worker 完成并不会自动解除 association",
  },
  {
    label: "shared",
    caption:
      "promise/packaged_task future 通常只释放 shared-state 引用，不等待 provider",
  },
  {
    label: "async",
    caption:
      "async state + async policy + 最后 future reference 三个条件同时满足才可能等待",
  },
  {
    label: "temporary",
    caption:
      "丢弃 async temporary 在完整表达式末尾析构，连续语句因此隐式串行；deferred 则可能不执行",
  },
  {
    label: "order",
    caption:
      "追踪 move/share 后的最后引用和成员逆序析构，优先在可控位置显式 get/wait",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem38FutureDestructorLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [discardedTemporaryFault, setDiscardedTemporaryFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐 handle action、last-reference 或 destruction-order 的起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];

  function reset() {
    timeline.goToStep(0);
    setDiscardedTemporaryFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-38-thread-handle-destructor-behavior"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 38
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              句柄析构动作取决于 resource 与最后引用
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              不要把所有 future 想成 join，也不要把所有临时对象想成
              fire-and-forget。沿着 shared state 的 provider、consumer
              和最后引用逐步推导析构行为。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 38 教学时间线：比较 std::thread 析构 terminate、promise 或 packaged_task future 释放 shared-state 引用、std::async async policy 的最后 future reference 等待、丢弃 temporary 导致串行化，以及 deferred future 被放弃时不执行。支持播放、暂停、单步、拖进度、重置和注入丢弃 temporary 故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item38-future-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item38-future-fault-arrow"
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
            handle type → shared state → destructor action
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            thread association · provider/consumer · last reference ·
            async/deferred · member order
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
            三种 handle：析构不共享同一条规则
          </text>
          <rect
            x="46"
            y="116"
            width="180"
            height="32"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="136"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            std::thread → association
          </text>
          <rect
            x="248"
            y="116"
            width="208"
            height="32"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="352"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            promise future → 引用
          </text>
          <rect
            x="478"
            y="116"
            width="316"
            height="32"
            rx="8"
            fill={discardedTemporaryFault ? C.danger : C.success}
            fillOpacity="0.12"
            stroke={discardedTemporaryFault ? C.danger : C.success}
            strokeWidth="1.5"
          />
          <text
            x="636"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            async future → 最后引用等待
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            正确推导必须同时看 handle 类型、shared state 来源、policy 和最后一个
            owner 的销毁位置
          </text>

          {STEPS.map((step, index) => {
            const faulted =
              discardedTemporaryFault && (index === 3 || index === 4);
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
                      1 · handle：thread 与 future 关联不同资源
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      std::thread 直接关联底层执行线程；future 关联
                      provider/consumer 之间的 shared state
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      所以“句柄析构”不能只凭变量名判断等待、释放、terminate
                      或放弃计算
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      审查起点：资源是什么？谁是 provider？谁持有最后一个
                      consumer reference？
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
                      fill={C.warning}
                    >
                      2 · thread：joinable destructor 直接 terminate
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      worker 即使已返回，只要 object 未 join/detach，association
                      仍存在
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      析构不自动等待，也不自动 detach；它调用 terminate 迫使
                      owner 明确收束
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      这条规则看 association，不看 worker 的 CPU 活跃度
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
                      fill={C.accent}
                    >
                      3 · ordinary future：通常只释放 shared-state 引用
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      promise/packaged_task future 析构减少 consumer
                      reference，不默认等待 provider
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      若 provider 先销毁，仍存在的 state 可交付 broken-promise
                      exception
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      “最后引用释放”只决定 state lifetime，不自动等同于 thread
                      join
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
                      fill={faulted ? C.danger : C.success}
                    >
                      4 · async：等待特例有三个同时条件
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      state 来自 std::async、实际 policy 是 async、当前 handle
                      是最后 future reference
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      三者同时成立时，最后 future destructor 可能等待 task 完成
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      move 或 shared_future copy 会移动最后等待点，不能只盯着
                      local 变量名
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
                      fill={faulted ? C.danger : C.warning}
                    >
                      5 · temporary：分号可能变成同步点
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      丢弃 launch::async 返回值，temporary
                      在完整表达式末尾成为最后引用并等待
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      连续两行 async 因此隐式串行；deferred state 若未 get/wait
                      则可能完全不执行
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      命名 futures 才能表达 overlap，并在明确位置 get 观察
                      value/exception
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
                      fill={C.success}
                    >
                      6 · order：把等待放在依赖销毁之前
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      Session 先声明 Data、后声明 future；逆序析构时 future
                      先析构并等待 worker
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      更稳妥是在可控位置显式 get/wait，并先释放 worker 需要的
                      mutex
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      最终审查同时覆盖 member order、last
                      reference、latency、deadlock 和 exception consumption
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {discardedTemporaryFault && (
            <g>
              <path
                d="M 684 338 C 644 306, 598 274, 548 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item38-future-fault-arrow)"
              />
              <rect
                x="166"
                y="326"
                width="508"
                height="28"
                rx="8"
                fill={C.warning}
                fillOpacity="0.12"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text
                x="184"
                y="346"
                fontSize="11"
                fontWeight="700"
                fill={C.danger}
              >
                故障注入：丢弃 async temporary 造成隐式等待；修法：命名 futures
                并显式 get/wait
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
            markerEnd="url(#emcpp-item38-future-arrow)"
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
                markerEnd="url(#emcpp-item38-future-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted =
              discardedTemporaryFault && (index === 3 || index === 4);
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
                    ? "句柄"
                    : index === 1
                      ? "thread"
                      : index === 2
                        ? "引用"
                        : index === 3
                          ? "async"
                          : index === 4
                            ? "临时"
                            : "顺序"}
                </text>
                <text
                  x={box.x + 52}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={faulted ? C.danger : selected ? C.accent : C.secondary}
                >
                  {faulted
                    ? "wait"
                    : index < 2
                      ? "resource"
                      : index < 5
                        ? "state"
                        : "guard"}
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
            当前验收门：{activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="按步骤检查 handle 类型、shared state、最后引用和 destruction order；单步最适合复现 temporary 串行化。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 38 future destructor 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={discardedTemporaryFault}
          onClick={() => setDiscardedTemporaryFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            discardedTemporaryFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {discardedTemporaryFault
            ? "关闭丢弃 temporary 故障"
            : "注入丢弃 temporary 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        析构行为不是 future 的统一属性，而是 handle 类型、shared state
        来源、policy 和最后引用位置共同决定的结果。
      </figcaption>
    </figure>
  );
}
