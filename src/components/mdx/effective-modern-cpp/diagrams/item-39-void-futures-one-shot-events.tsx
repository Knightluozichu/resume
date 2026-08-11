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
    label: "contract",
    caption:
      "one-shot event communication 只传 ready，不传 payload；先决定事件是否需要复用",
  },
  {
    label: "poll",
    caption:
      "atomic polling 能表达状态却会持续消耗 CPU，sleep/yield 又引入 latency 选择",
  },
  {
    label: "predicate",
    caption:
      "condition variable 必须和 mutex 保护的 predicate 一起使用，才能处理迟到与虚假唤醒",
  },
  {
    label: "ready",
    caption:
      "promise future 把 shared state 从 not-ready 持久转为 ready，wait 不忙等",
  },
  {
    label: "error",
    caption:
      "broken promise 与 set_exception 都让 void future 交付可观察的失败 outcome",
  },
  {
    label: "fanout",
    caption:
      "shared_future<void> 允许多 receiver 观察同一次完成，但仍保持 single-assignment",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 134,
  y: 416,
}));

type Mechanism = "atomic" | "condition" | "promise";

export function EmcppItem39VoidFutureEventLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mechanism, setMechanism] = useState<Mechanism>("promise");
  const [completionFault, setCompletionFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐该协议阶段的动画起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const promiseMode = mechanism === "promise";
  const faulted = completionFault && promiseMode && activeIndex >= 3;

  function reset() {
    timeline.goToStep(0);
    setMechanism("promise");
    setCompletionFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-39-void-futures-one-shot-events"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 39
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              一次 ready transition，三种事件协议
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择 atomic polling、condition variable 或 promise future，逐步观察
              detector、shared state 和 reactor。故障开关会模拟重复完成或 provider
              未完成就退出。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">event mechanism</span>
            <select
              aria-label="选择一次性事件通信机制"
              value={mechanism}
              onChange={(event) => setMechanism(event.target.value as Mechanism)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="atomic">atomic polling · 状态轮询</option>
              <option value="condition">condition variable · predicate wait</option>
              <option value="promise">promise future · void ready state</option>
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary">
            <input
              type="checkbox"
              checked={completionFault}
              onChange={(event) => setCompletionFault(event.target.checked)}
              className="accent-[var(--accent)]"
            />
            <span>
              <strong className="text-primary">注入完成协议故障</strong>
              <br />
              重复 set_value / provider 提前退出
            </span>
          </label>
        </div>

        <svg
          viewBox="0 0 840 560"
          role="img"
          aria-label="Effective Modern C++ Item 39 专属教学时间线：比较 void futures、one-shot event communication、atomic polling、condition variable 和 promise future。展示 detector 发信号、shared state ready transition、reactor wait、broken promise、set_exception 与 shared_future 多接收者扇出。可切换三种机制，支持播放、暂停、单步、拖进度、重置和重复完成或 provider 提前退出的故障注入。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item39-event-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item39-fault-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="840" height="560" rx="14" fill={C.bg} />
          <text x="28" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            detector → ready state → reactor(s)
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            no payload · one-shot transition · blocking / polling · error channel · fanout
          </text>

          <rect
            x="28"
            y="78"
            width="784"
            height="122"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="48" y="105" fontSize="12" fontWeight="700" fill={C.accent}>
            当前事件协议：{mechanism === "atomic" ? "atomic flag" : mechanism === "condition" ? "mutex + predicate" : "promise<void> shared state"}
          </text>
          <rect
            x="48"
            y="122"
            width="150"
            height="34"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="123" y="144" textAnchor="middle" fontSize="12" fill={C.primary}>
            detector
          </text>
          <line
            x1="210"
            y1="139"
            x2="276"
            y2="139"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item39-event-arrow)"
          />
          <rect
            x="292"
            y="122"
            width="218"
            height="34"
            rx="8"
            fill={faulted ? C.danger : C.success}
            fillOpacity="0.14"
            stroke={faulted ? C.danger : C.success}
            strokeWidth="1.5"
          />
          <text x="401" y="144" textAnchor="middle" fontSize="12" fill={C.primary}>
            {faulted ? "error / incomplete" : "not-ready → ready"}
          </text>
          <line
            x1="526"
            y1="139"
            x2="592"
            y2="112"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item39-event-arrow)"
          />
          <line
            x1="526"
            y1="139"
            x2="592"
            y2="166"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item39-event-arrow)"
          />
          <rect
            x="608"
            y="94"
            width="172"
            height="34"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="694" y="116" textAnchor="middle" fontSize="12" fill={C.primary}>
            reactor A
          </text>
          <rect
            x="608"
            y="150"
            width="172"
            height="34"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="694" y="172" textAnchor="middle" fontSize="12" fill={C.primary}>
            reactor B / fanout
          </text>
          <text x="48" y="185" fontSize="11" fill={C.secondary}>
            promise/future 的 shared state 保存 ready；condition variable 的 notification 本身不保存事件
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="28"
              y="216"
              width="784"
              height="174"
              rx="12"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
              strokeWidth="1.5"
            />
            <text x="48" y="248" fontSize="12" fontWeight="700" fill={C.accent}>
              1 · one-shot event communication：没有 payload 也需要同步状态
            </text>
            <text x="48" y="278" fontSize="12" fill={C.primary}>
              detector 只宣布“可以继续”；协议仍需保存 ready、阻塞等待与跨线程可见性
            </text>
            <text x="48" y="306" fontSize="12" fill={C.primary}>
              先问：事件会重复吗？有一个 receiver 还是多个 receiver？需要传错误吗？
            </text>
            <text x="48" y="348" fontSize="11" fill={C.secondary}>
              这三个问题决定 atomic、condition variable 还是 void future
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[1] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="28"
              y="216"
              width="784"
              height="174"
              rx="12"
              fill={C.warning}
              fillOpacity="0.1"
              stroke={C.warning}
              strokeWidth="1.5"
            />
            <text x="48" y="248" fontSize="12" fontWeight="700" fill={C.warning}>
              2 · atomic polling：状态持久，但等待主动消耗资源
            </text>
            <text x="48" y="278" fontSize="12" fill={C.primary}>
              load 循环不会丢掉已置 true 的状态，却持续占用 CPU；yield/sleep 交换 latency
            </text>
            <text x="48" y="306" fontSize="12" fill={C.primary}>
              高频低延迟协议可用 atomic，但它没有直接表达“阻塞直到 ready”的业务意图
            </text>
            <text x="48" y="348" fontSize="11" fill={C.secondary}>
              轮询不是免费：要同时审查功耗、间隔、延迟和退出协议
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[2] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="28"
              y="216"
              width="784"
              height="174"
              rx="12"
              fill={C.warning}
              fillOpacity="0.1"
              stroke={C.warning}
              strokeWidth="1.5"
            />
            <text x="48" y="248" fontSize="12" fontWeight="700" fill={C.warning}>
              3 · condition variable：notification 之外还要有 predicate
            </text>
            <text x="48" y="278" fontSize="12" fill={C.primary}>
              mutex 保护 detected；wait(lock, predicate) 处理 spurious wakeup 与迟到 waiter
            </text>
            <text x="48" y="306" fontSize="12" fill={C.primary}>
              notify_one 不保存事件，保存事件的是 predicate 已被设置的持久状态
            </text>
            <text x="48" y="348" fontSize="11" fill={C.secondary}>
              只调用 wait 而不检查 predicate，会把同步协议留在调用者脑中
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[3] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="28"
              y="216"
              width="784"
              height="174"
              rx="12"
              fill={C.success}
              fillOpacity="0.1"
              stroke={C.success}
              strokeWidth="1.5"
            />
            <text x="48" y="248" fontSize="12" fontWeight="700" fill={C.success}>
              4 · void futures：promise future 把 ready transition 写入 shared state
            </text>
            <text x="48" y="278" fontSize="12" fill={C.primary}>
              set_value() 让 state 持久 ready；reactor 后到 wait 也会立即返回，不忙等
            </text>
            <text x="48" y="306" fontSize="12" fill={C.primary}>
              signal 前的 writes 通过 future event synchronization 对 receiver 可见
            </text>
            <text x="48" y="348" fontSize="11" fill={C.secondary}>
              void 只是不带 result payload，不代表没有同步语义
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[4] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="28"
              y="216"
              width="784"
              height="174"
              rx="12"
              fill={faulted ? C.danger : C.success}
              fillOpacity="0.1"
              stroke={faulted ? C.danger : C.success}
              strokeWidth="1.5"
            />
            <text x="48" y="248" fontSize="12" fontWeight="700" fill={faulted ? C.danger : C.success}>
              5 · error channel：完成一次，也可以完成为失败
            </text>
            <text x="48" y="278" fontSize="12" fill={C.primary}>
              provider 未完成就析构产生 broken promise；provider 也可 set_exception 主动传播
            </text>
            <text x="48" y="306" fontSize="12" fill={C.primary}>
              reactor 只 wait 看不到错误，必须 get 消费 outcome；重复 set_value 会抛 future_error
            </text>
            <text x="48" y="348" fontSize="11" fill={faulted ? C.danger : C.secondary}>
              {faulted
                ? "故障注入：single-assignment 状态被重复完成或 provider 未完成就退出"
                : "错误不是另一个 payload；它是 shared state 的另一种 ready outcome"}
            </text>
          </g>

          <g
            ref={(node) => {
              stageRefs.current[5] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="28"
              y="216"
              width="784"
              height="174"
              rx="12"
              fill={faulted ? C.danger : C.accent}
              fillOpacity="0.1"
              stroke={faulted ? C.danger : C.accent}
              strokeWidth="1.5"
            />
            <text x="48" y="248" fontSize="12" fontWeight="700" fill={faulted ? C.danger : C.accent}>
              6 · shared_future fanout：广播一次，不是无限队列
            </text>
            <text x="48" y="278" fontSize="12" fill={C.primary}>
              future move-only 只适合一个 consumer；share 后多个 copies 可分别 wait/get
            </text>
            <text x="48" y="306" fontSize="12" fill={C.primary}>
              一次 set_value 让所有 receivers ready；reload 等重复事件必须创建新的 pair
            </text>
            <text x="48" y="348" fontSize="11" fill={C.secondary}>
              选择前核对次数、receiver 数、错误通道、等待方式与 shared-state 成本
            </text>
          </g>

          {faulted && (
            <g>
              <path
                d="M 748 202 C 718 230, 684 258, 646 286"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item39-fault-arrow)"
              />
              <rect
                x="164"
                y="394"
                width="512"
                height="28"
                rx="8"
                fill={C.warning}
                fillOpacity="0.14"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text x="182" y="414" fontSize="11" fontWeight="700" fill={C.danger}>
                故障注入：single-assignment 不能复用；shared_future 只增加 readers
              </text>
            </g>
          )}

          <line
            x1="72"
            y1="444"
            x2="768"
            y2="444"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item39-event-arrow)"
          />
          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 108}
                y1="430"
                x2={end.x - 10}
                y2="430"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item39-event-arrow)"
              />
            );
          })}
          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const stageFaulted = faulted && index >= 4;
            return (
              <g key={`step-card-${step.label}`}>
                <rect
                  x={box.x}
                  y={box.y}
                  width="108"
                  height="100"
                  rx="12"
                  fill={stageFaulted ? C.danger : selected ? C.accent : C.elevated}
                  fillOpacity={stageFaulted || selected ? 0.16 : 1}
                  stroke={stageFaulted ? C.danger : selected ? C.accent : C.border}
                  strokeWidth={stageFaulted || selected ? 3 : 1.5}
                />
                <circle
                  cx={box.x + 20}
                  cy={box.y + 22}
                  r="12"
                  fill={stageFaulted ? C.danger : selected ? C.accent : C.bg}
                  stroke={stageFaulted ? C.danger : selected ? C.accent : C.border}
                  strokeWidth="1.5"
                />
                <text
                  x={box.x + 20}
                  y={box.y + 27}
                  textAnchor="middle"
                  fontSize="11"
                  fill={selected || stageFaulted ? C.bg : C.primary}
                >
                  {index + 1}
                </text>
                <text
                  x={box.x + 54}
                  y={box.y + 26}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={stageFaulted ? C.danger : selected ? C.accent : C.primary}
                >
                  {step.label}
                </text>
                <text
                  x={box.x + 54}
                  y={box.y + 55}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.secondary}
                >
                  {index === 0
                    ? "scope"
                    : index === 1
                      ? "CPU"
                      : index === 2
                        ? "predicate"
                        : index === 3
                          ? "ready"
                          : index === 4
                            ? "error"
                            : "readers"}
                </text>
                <text
                  x={box.x + 54}
                  y={box.y + 78}
                  textAnchor="middle"
                  fontSize="11"
                  fill={stageFaulted ? C.danger : C.secondary}
                >
                  {stageFaulted ? "check" : selected ? "active" : "ready"}
                </text>
              </g>
            );
          })}
          <text x="28" y="540" fontSize="11" fill={C.secondary}>
            当前步骤：{activeStep.label} · {activeStep.caption}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测事件是否会丢失，再观察 ready、error 和多 receiver 的状态。"
          reset={{ label: "重置实验", ariaLabel: "重置 Item 39 事件通信实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Item 39 的核心：用一次 shared-state ready transition 表达一次性事件，而不是把通知、错误和复用语义藏在轮询或裸唤醒里。
      </figcaption>
    </figure>
  );
}
