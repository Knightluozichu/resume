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
    label: "absent",
    caption:
      "move operations not present：std::move 仍可能落到 const-reference copy，形成 copy fallback；编译成功不是 move 证据",
  },
  {
    label: "cost",
    caption:
      "move operations not cheap：inline resource storage、std::array 和 small string optimization 让 move 仍需重建内容",
  },
  {
    label: "unused",
    caption:
      "move operations not used：vector 为 strong exception guarantee 可能在 throwing move 与可用 copy 间选择 copy",
  },
  {
    label: "policy",
    caption:
      "noexcept move contract 与 copy availability 共同决定 move_if_noexcept selection，而不是 std::move token 决定",
  },
  {
    label: "generic",
    caption:
      "conservative generic move model 不假设未知 T 有 move、move 廉价或一定被采用，把优化留给明确契约与测量",
  },
  {
    label: "measure",
    caption:
      "move-path instrumentation 用 copy/move counters、reserve、allocation 与 benchmark 验证真实路径和成本",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem29MoveAssumptionsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [throwingMoveFault, setThrowingMoveFault] = useState(false);

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
    setThrowingMoveFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-29-assume-move-absent-costly-unused"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 29
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把“移动更快”拆成存在、成本、采用三条证据
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              从类型能力、资源拓扑和 library 异常策略三层观察为什么 move 可能没有发生，最后用实验替代语法猜测。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 29 教学时间线：展示 move operations not present 时 std::move 可能进入 copy fallback，展示 move operations not cheap 的 inline resource storage、std::array 和 small string optimization，展示 move operations not used 时 vector 为 strong exception guarantee 可能选择 copy，展示 noexcept move contract 与 move_if_noexcept selection，展示 conservative generic move model，最后用 move-path instrumentation 的 copy/move counters、reserve、allocation 和 benchmark 验证。支持播放、暂停、单步、拖进度、重置和注入 throwing move 故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item29-move-assumptions-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item29-move-assumptions-fault-arrow"
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
            type capability → resource topology → library policy → observed path
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            move not present · move not cheap · move not used · noexcept · instrumentation
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
            std::move 只是意图；最终路径由 type、资源布局、异常规格和 algorithm 决定
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
            std::move expression
          </text>
          <line
            x1="230"
            y1="132"
            x2="304"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item29-move-assumptions-arrow)"
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
            type + member path
          </text>
          <line
            x1="506"
            y1="132"
            x2="580"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item29-move-assumptions-arrow)"
          />
          <rect
            x="598"
            y="116"
            width="196"
            height="32"
            rx="8"
            fill={throwingMoveFault ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={throwingMoveFault ? C.danger : C.warning}
            strokeWidth="1.5"
          />
          <text
            x="696"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill={throwingMoveFault ? C.danger : C.primary}
          >
            {throwingMoveFault ? "throwing move → copy" : "observed move/copy"}
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            先分别回答：move 是否存在？一次 move 是否便宜？当前 algorithm 是否真的采用它？
          </text>

          {STEPS.map((step, index) => {
            const faulted = throwingMoveFault && (index === 2 || index === 3);
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
                      1 · absent：move operations not present 仍可能编译
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      copy-only type 没有 move overload；const-reference copy 仍能绑定 rvalue，形成 copy fallback
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      std::move 不会降低 copy 成本；不同 T 的同一个 template instantiation 可能走完全不同路径
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      证据：检查 selected constructor、special members 和 copy/move counters，而不是看调用语法
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
                      2 · cost：move operations not cheap 取决于 resource topology
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      vector 可转交 heap pointer；inline resource storage 没有外部句柄可偷，目标仍要重建内容
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      std::array 逐元素 move，成本随 N 增长；small string optimization 让短 string move 接近 copy
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      容器都支持 move 不代表复杂度相同；先画资源位于 object 还是 heap
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
                      fill={faulted ? C.danger : C.warning}
                    >
                      3 · unused：move operations not used 可能是 library 的理性选择
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      vector reallocation 要保护 strong exception guarantee；throwing move 会让已移动旧元素难以回滚
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      copy 可用时 library 通常复制旧 elements，即使 type 公开了 move constructor
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：把“有 move”当成“algorithm 必用 move”；修法是把 noexcept 与 copy availability 一起检查
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
                      4 · policy：noexcept move contract 改变 move_if_noexcept selection
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      nothrow move 或 copy 不可用：迁移表达式更可能提供 rvalue，允许 library 选择 move
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      potentially-throwing move 且 copy 可用：返回 const-reference path，优先保持旧 vector 可恢复
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      fault：为追求性能盲加 noexcept；修法是先证明整条 move path 真实不抛
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
                      fill={C.success}
                    >
                      5 · generic：conservative generic move model 是正确性底线
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      未知 T 可能没有 move、move 不便宜，或当前 algorithm 因异常策略不采用 move
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      template 先按 copy-equivalent 成本保证正确性；已知类型再依据 documented contract 做优化
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      不要把某个 library/version 的 SSO 阈值或汇编结果写成泛型前置条件
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
                      6 · measure：move-path instrumentation 让假设变成证据
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      counters 记录 copy/move；reserve 控制是否 reallocation；allocation 与 benchmark 记录真实成本
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      切换 noexcept、删除 copy、改变 N 或 string length，比较同一类型的多条路径
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      constructor 次数只说明路径，不等于每次 operation 的价格；成本还要用目标实现测量
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {throwingMoveFault && (
            <g>
              <path
                d="M 710 338 C 662 306, 610 270, 556 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item29-move-assumptions-fault-arrow)"
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
                故障注入：throwing move + copy 可用；修法：接受 copy fallback，或证明后声明 noexcept
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
            markerEnd="url(#emcpp-item29-move-assumptions-arrow)"
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
                markerEnd="url(#emcpp-item29-move-assumptions-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = throwingMoveFault && (index === 2 || index === 3);
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
                    ? "存在"
                    : index === 1
                      ? "成本"
                      : index === 2
                        ? "采用"
                        : index === 3
                          ? "策略"
                          : index === 4
                            ? "泛型"
                            : "测量"}
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
                    : index < 3
                      ? "假设"
                      : index < 5
                        ? "决策"
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
          caption="按步骤检查 move 的存在、资源拓扑、library policy、泛型边界和实测路径；单步适合对比 vector、array、SSO 与 copy-only 类型。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 29 move assumptions 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={throwingMoveFault}
          onClick={() => setThrowingMoveFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            throwingMoveFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {throwingMoveFault ? "关闭 throwing move 故障" : "注入 throwing move 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        不要把 std::move 当性能承诺：先证明 move 存在，再计算资源拓扑成本，最后检查 library 是否因异常保证采用它。
      </figcaption>
    </figure>
  );
}
