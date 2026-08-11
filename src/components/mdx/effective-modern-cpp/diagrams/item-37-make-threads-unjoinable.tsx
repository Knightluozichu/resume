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
    label: "state",
    caption:
      "joinable 表示 thread object 仍关联底层执行线程；worker 是否完成不改变 association",
  },
  {
    label: "join",
    caption:
      "显式 join 等待 worker 并解除 association，适合 worker 依赖 owner scope 内的 locals",
  },
  {
    label: "gap",
    caption:
      "early return 或 exception 绕过 cleanup，joinable destructor 调用 std::terminate",
  },
  {
    label: "detach",
    caption:
      "detach 让 thread object 立即 unjoinable，但 worker 可能访问已销毁 reference 且没有 shutdown channel",
  },
  {
    label: "raii",
    caption:
      "RAII owner 在 normal、early return 和 exception paths 统一执行 construction-time join/detach policy",
  },
  {
    label: "jthread",
    caption:
      "C++20 jthread 提供 request-stop + join；仍需协作取消、锁依赖和阻塞时间设计",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem37ThreadOwnerLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [unhandledExitFault, setUnhandledExitFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐 thread state 或 scope-exit policy 的起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];

  function reset() {
    timeline.goToStep(0);
    setUnhandledExitFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-37-make-threads-unjoinable"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 37
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把 thread association 在所有 scope exit 上收束
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              worker 结束不等于 owner 已经解除关联。沿着 joinable
              状态和析构路径检查，才能决定 join、detach 或 RAII owner。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 37 教学时间线：展示 std::thread 的 joinable association、显式 join 变成 unjoinable、early return 或 exception 绕过 cleanup 时析构 terminate、detach 的 lifetime 风险、RAII thread owner 覆盖全部 scope exit，以及 C++20 jthread 的 stop-request 加 join。支持播放、暂停、单步、拖进度、重置和注入未处理 scope exit 故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item37-thread-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item37-thread-fault-arrow"
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
            joinable association → scope exit policy → unjoinable
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            worker completion · join/detach · terminate · RAII · request-stop
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
            状态机：worker 完成 ≠ thread object unjoinable
          </text>
          <rect
            x="46"
            y="116"
            width="178"
            height="32"
            rx="8"
            fill={C.warning}
            fillOpacity="0.12"
            stroke={C.warning}
            strokeWidth="1.5"
          />
          <text
            x="135"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            joinable：仍有关联
          </text>
          <line
            x1="240"
            y1="132"
            x2="318"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item37-thread-arrow)"
          />
          <rect
            x="334"
            y="116"
            width="154"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="411"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            join / detach
          </text>
          <line
            x1="504"
            y1="132"
            x2="582"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item37-thread-arrow)"
          />
          <rect
            x="598"
            y="116"
            width="196"
            height="32"
            rx="8"
            fill={unhandledExitFault ? C.danger : C.accent}
            fillOpacity="0.12"
            stroke={unhandledExitFault ? C.danger : C.accent}
            strokeWidth="1.5"
          />
          <text
            x="696"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            unjoinable / terminate
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            destructor 只看 association 状态；它不根据 worker
            是否已完成来猜测安全策略
          </text>

          {STEPS.map((step, index) => {
            const faulted = unhandledExitFault && index === 2;
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
                      1 · state：joinable 关心 ownership association
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      worker function 返回，只表示底层执行结束；thread object
                      仍可能关联它
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      default、moved-from、joined、detached 才是典型 unjoinable
                      状态
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      先画状态转换，再审查每条 normal、return、throw 和 move
                      路径
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
                      2 · join：等待并解除 association
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      join() 阻塞 caller 直到 worker 完成，然后 thread object
                      变成 unjoinable
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      worker 引用 owner scope 的 locals 时，join 通常是安全
                      lifetime barrier
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      仍要检查锁依赖、self-join 和最长阻塞时间，RAII
                      不会自动消除 deadlock
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
                      3 · gap：scope exit 绕过 cleanup 会 terminate
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      early return 或 exception 让控制流跳过 join；析构时 thread
                      仍然 joinable
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      C++ 不自动 join（可能无限阻塞），也不自动
                      detach（可能悬空访问 locals）
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      手工在末尾 cleanup 不是全路径证明，新增分支就可能重新打开
                      path gap
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
                      4 · detach：状态安全不等于资源安全
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      detach 立即解除 thread association，但 worker
                      仍可能继续执行
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      captured local 可能先销毁；异常、完成和 shutdown
                      也没有内建交付通道
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      只有 self-owned state 和明确 observability/lifetime
                      contract 才能考虑 detach
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
                      fill={C.accent}
                    >
                      5 · RAII：把 policy 绑定到 lexical lifetime
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      owner destructor 检查 joinable，并按 construction-time
                      policy 执行 join 或 detach
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      normal return、early return、exception unwinding
                      都通过同一个 owner cleanup
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      move 后 source 必须 unjoinable，destination 唯一承担
                      association 和析构责任
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
                      6 · jthread：stop request + join 的结构化默认
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      C++20 jthread 析构请求停止并 join；worker 通过 stop_token
                      协作退出
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      它仍可能在析构阻塞，锁依赖、取消响应和 shutdown
                      顺序仍需证明
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      最低验收门是全部路径最终 unjoinable，完整正确性还包括
                      lifetime 与 wait-for graph
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {unhandledExitFault && (
            <g>
              <path
                d="M 684 338 C 644 306, 598 274, 548 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item37-thread-fault-arrow)"
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
                故障注入：exception/early return 绕过 join；修法：让 RAII owner
                接管 scope exit
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
            markerEnd="url(#emcpp-item37-thread-arrow)"
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
                markerEnd="url(#emcpp-item37-thread-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = unhandledExitFault && index === 2;
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
                    ? "状态"
                    : index === 1
                      ? "join"
                      : index === 2
                        ? "路径"
                        : index === 3
                          ? "detach"
                          : index === 4
                            ? "RAII"
                            : "jthread"}
                </text>
                <text
                  x={box.x + 52}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={faulted ? C.danger : selected ? C.accent : C.secondary}
                >
                  {faulted
                    ? "terminate"
                    : index < 2
                      ? "关联"
                      : index < 5
                        ? "policy"
                        : "stop"}
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
          caption="按步骤检查 association、scope exit、lifetime 和 cleanup policy；单步最适合复现 terminate 路径。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 37 thread owner 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={unhandledExitFault}
          onClick={() => setUnhandledExitFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            unhandledExitFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {unhandledExitFault
            ? "关闭未处理 scope exit 故障"
            : "注入未处理 scope exit 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        让 thread 在所有路径上不可 joinable 只是底线；真正的设计还要证明 worker
        lifetime、等待关系、异常和 shutdown 都有明确归属。
      </figcaption>
    </figure>
  );
}
