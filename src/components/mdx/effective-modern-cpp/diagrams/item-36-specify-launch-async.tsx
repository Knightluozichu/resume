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
      "default launch policy 同时允许 async 与 deferred，调用点没有交付独立进度的契约",
  },
  {
    label: "essential",
    caption:
      "asynchronicity essential 时，把 std::launch::async 直接写进正确性边界",
  },
  {
    label: "worker",
    caption:
      "launch async 成功返回后，task 走独立 execution thread，不依赖 get 才开始",
  },
  {
    label: "deferred",
    caption:
      "deferred policy 是 lazy computation，在 get 或非 timed wait 的线程同步执行",
  },
  {
    label: "poll",
    caption:
      "future wait loop 必须区分 ready、timeout、deferred，不能只检查 ready",
  },
  {
    label: "audit",
    caption:
      "继续检查 thread-local execution state、锁重入、future lifetime 与资源上限",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 134,
  y: 414,
}));

type Policy = "default" | "async" | "deferred";

export function EmcppItem36LaunchPolicyLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [policy, setPolicy] = useState<Policy>("default");
  const [naiveLoop, setNaiveLoop] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐该阶段 policy 或观察证据的起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const deferredFault = policy === "deferred" && naiveLoop;
  const asyncSelected = policy === "async";
  const deferredSelected = policy === "deferred";

  function reset() {
    timeline.goToStep(0);
    setPolicy("default");
    setNaiveLoop(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-36-specify-launch-async"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 36
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              从 policy 选择走到线程与 future 证据
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              先选择 policy，再逐步观察 worker path、deferred path 和轮询结果。勾选
              naive wait loop 可注入 deferred 永不 ready 的故障。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">launch policy</span>
            <select
              aria-label="选择 std async launch policy"
              value={policy}
              onChange={(event) => setPolicy(event.target.value as Policy)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="default">default · async | deferred</option>
              <option value="async">std::launch::async · independent progress</option>
              <option value="deferred">std::launch::deferred · lazy execution</option>
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary">
            <input
              type="checkbox"
              checked={naiveLoop}
              onChange={(event) => setNaiveLoop(event.target.checked)}
              className="accent-[var(--accent)]"
            />
            <span>
              <strong className="text-primary">注入 naive wait loop</strong>
              <br />
              只写 wait_for != ready
            </span>
          </label>
        </div>

        <svg
          viewBox="0 0 840 560"
          role="img"
          aria-label="Effective Modern C++ Item 36 专属教学时间线：展示 default launch policy、asynchronicity essential、launch async 的独立线程、deferred policy 的等待线程执行、future wait loop 的 ready timeout deferred 三种状态，以及 thread-local execution state、锁重入和 future lifetime 审计。可切换 default、std::launch::async、std::launch::deferred，支持播放、暂停、单步、拖进度、重置和 naive wait loop 故障注入。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item36-policy-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item36-fault-arrow"
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
            std::async call → policy branch → execution evidence
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            开始时机 · 执行线程 · future status · thread-local context · lifetime
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
            policy 是行为契约，不只是性能开关
          </text>
          <rect
            x="48"
            y="122"
            width="156"
            height="34"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="126" y="144" textAnchor="middle" fontSize="12" fill={C.primary}>
            caller
          </text>
          <line
            x1="216"
            y1="139"
            x2="280"
            y2="139"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item36-policy-arrow)"
          />
          <rect
            x="296"
            y="122"
            width="196"
            height="34"
            rx="8"
            fill={policy === "default" ? C.accent : C.success}
            fillOpacity="0.14"
            stroke={policy === "default" ? C.accent : C.success}
            strokeWidth="1.5"
          />
          <text x="394" y="144" textAnchor="middle" fontSize="12" fill={C.primary}>
            {policy === "default" ? "async | deferred" : `launch::${policy}`}
          </text>
          <line
            x1="504"
            y1="139"
            x2="568"
            y2="112"
            stroke={asyncSelected ? C.success : C.border}
            strokeWidth={asyncSelected ? 3 : 1.5}
            markerEnd="url(#emcpp-item36-policy-arrow)"
          />
          <line
            x1="504"
            y1="139"
            x2="568"
            y2="166"
            stroke={deferredSelected ? C.warning : C.border}
            strokeWidth={deferredSelected ? 3 : 1.5}
            markerEnd="url(#emcpp-item36-policy-arrow)"
          />
          <rect
            x="584"
            y="94"
            width="188"
            height="34"
            rx="8"
            fill={asyncSelected ? C.success : C.elevated}
            fillOpacity={asyncSelected ? 0.14 : 1}
            stroke={asyncSelected ? C.success : C.border}
            strokeWidth="1.5"
          />
          <text x="678" y="116" textAnchor="middle" fontSize="12" fill={C.primary}>
            worker thread · async
          </text>
          <rect
            x="584"
            y="150"
            width="188"
            height="34"
            rx="8"
            fill={deferredSelected ? C.warning : C.elevated}
            fillOpacity={deferredSelected ? 0.14 : 1}
            stroke={deferredSelected ? C.warning : C.border}
            strokeWidth="1.5"
          />
          <text x="678" y="172" textAnchor="middle" fontSize="12" fill={C.primary}>
            caller thread · deferred
          </text>
          <text x="48" y="185" fontSize="11" fill={C.secondary}>
            default 让 implementation 选择；只有显式 async 才把 independent progress 写入调用契约
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
              height="170"
              rx="12"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
              strokeWidth="1.5"
            />
            <text x="48" y="247" fontSize="12" fontWeight="700" fill={C.accent}>
              1 · contract：default launch policy 隐藏五项选择
            </text>
            <text x="48" y="277" fontSize="12" fill={C.primary}>
              task 可能并发，也可能直到 get 才执行；thread identity 与开始时机都不确定
            </text>
            <text x="48" y="305" fontSize="12" fill={C.primary}>
              future 未被消费时，deferred task 甚至可能完全不运行
            </text>
            <text x="48" y="345" fontSize="11" fill={C.secondary}>
              先问：业务容忍这五种变化吗？若不能，default 就不是正确契约
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
              height="170"
              rx="12"
              fill={C.success}
              fillOpacity="0.1"
              stroke={C.success}
              strokeWidth="1.5"
            />
            <text x="48" y="247" fontSize="12" fontWeight="700" fill={C.success}>
              2 · asynchronicity essential：把正确性边界写出来
            </text>
            <text x="48" y="277" fontSize="12" fill={C.primary}>
              UI、锁边界、producer/consumer overlap 或独立 progress 不能退化成同步执行
            </text>
            <text x="48" y="305" fontSize="12" fill={C.primary}>
              创建端指定 std::launch::async，而不是等 wait loop 再猜 task 是否已启动
            </text>
            <text x="48" y="345" fontSize="11" fill={C.secondary}>
              “希望更快”不是充分理由；这里判断的是语义与不变量
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
              height="170"
              rx="12"
              fill={C.success}
              fillOpacity="0.1"
              stroke={C.success}
              strokeWidth="1.5"
            />
            <text x="48" y="247" fontSize="12" fontWeight="700" fill={C.success}>
              3 · launch async：独立执行线程与资源失败边界
            </text>
            <text x="48" y="277" fontSize="12" fill={C.primary}>
              成功返回后 task 已有独立 progress path，不依赖 caller 先 get/wait 才开始
            </text>
            <text x="48" y="305" fontSize="12" fill={C.primary}>
              线程创建失败仍可能抛 std::system_error；保证异步不是无限资源承诺
            </text>
            <text x="48" y="345" fontSize="11" fill={C.secondary}>
              独立启动得到的是执行保证，不是自动获得 bounded concurrency
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
              height="170"
              rx="12"
              fill={C.warning}
              fillOpacity="0.1"
              stroke={C.warning}
              strokeWidth="1.5"
            />
            <text x="48" y="247" fontSize="12" fontWeight="700" fill={C.warning}>
              4 · deferred policy：future 不是后台线程的承诺
            </text>
            <text x="48" y="277" fontSize="12" fill={C.primary}>
              get 或非 timed wait 的线程触发 callable；它在该线程同步运行
            </text>
            <text x="48" y="305" fontSize="12" fill={C.primary}>
              thread-local execution state、持锁 stack 与 reentrancy 都要按普通调用审查
            </text>
            <text x="48" y="345" fontSize="11" fill={C.secondary}>
              若无人等待，deferred task 可永远不运行；这不是“晚一点创建 worker”
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
              height="170"
              rx="12"
              fill={deferredFault ? C.danger : C.warning}
              fillOpacity="0.1"
              stroke={deferredFault ? C.danger : C.warning}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y="247"
              fontSize="12"
              fontWeight="700"
              fill={deferredFault ? C.danger : C.warning}
            >
              5 · future wait loop：ready、timeout、deferred 是三种状态
            </text>
            <text x="48" y="277" fontSize="12" fill={C.primary}>
              只写 wait_for != ready 会把 deferred 当作“继续等”，循环永不推进
            </text>
            <text x="48" y="305" fontSize="12" fill={C.primary}>
              先 probe deferred；业务必须异步时，从创建端消除 deferred，而不是修补轮询
            </text>
            <text x="48" y="345" fontSize="11" fill={deferredFault ? C.danger : C.secondary}>
              {deferredFault
                ? "故障注入：deferred + naive loop → status 永远不是 ready"
                : "通用代码可 get 同步执行或拒绝；专用代码优先指定 launch::async"}
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
              height="170"
              rx="12"
              fill={deferredFault ? C.danger : C.accent}
              fillOpacity="0.1"
              stroke={deferredFault ? C.danger : C.accent}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y="247"
              fontSize="12"
              fontWeight="700"
              fill={deferredFault ? C.danger : C.accent}
            >
              6 · audit：policy 之外还有 handle lifetime 与资源边界
            </text>
            <text x="48" y="277" fontSize="12" fill={C.primary}>
              明确 future 最后 owner 的 destructor 是否等待，避免临时 future 把两项工作串行化
            </text>
            <text x="48" y="305" fontSize="12" fill={C.primary}>
              不要隐式依赖 thread-local；显式传 context，并给 reallyAsync/helper 设 resource policy
            </text>
            <text x="48" y="345" fontSize="11" fill={C.secondary}>
              最终检查：开始时机、执行线程、观察状态、锁边界、取消与 bounded concurrency
            </text>
          </g>

          {deferredFault && (
            <g>
              <path
                d="M 748 202 C 720 226, 690 256, 652 284"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item36-fault-arrow)"
              />
              <rect
                x="172"
                y="390"
                width="496"
                height="28"
                rx="8"
                fill={C.warning}
                fillOpacity="0.14"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text x="190" y="410" fontSize="11" fontWeight="700" fill={C.danger}>
                故障注入：deferred status 被误当 timeout；修法是 probe 或创建时指定 async
              </text>
            </g>
          )}

          <line
            x1="72"
            y1="442"
            x2="768"
            y2="442"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item36-policy-arrow)"
          />
          {STEPS.slice(0, -1).map((step, index) => {
            const start = BOXES[index];
            const end = BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 108}
                y1="428"
                x2={end.x - 10}
                y2="428"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item36-policy-arrow)"
              />
            );
          })}
          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = deferredFault && index >= 4;
            return (
              <g key={`step-card-${step.label}`}>
                <rect
                  x={box.x}
                  y={box.y}
                  width="108"
                  height="100"
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
                  fill={selected || faulted ? C.bg : C.primary}
                >
                  {index + 1}
                </text>
                <text
                  x={box.x + 54}
                  y={box.y + 26}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={faulted ? C.danger : selected ? C.accent : C.primary}
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
                    ? "policy"
                    : index === 1
                      ? "need"
                      : index === 2
                        ? "worker"
                        : index === 3
                          ? "lazy"
                          : index === 4
                            ? "status"
                            : "lifetime"}
                </text>
                <text
                  x={box.x + 54}
                  y={box.y + 78}
                  textAnchor="middle"
                  fontSize="11"
                  fill={faulted ? C.danger : C.secondary}
                >
                  {faulted ? "check" : selected ? "active" : "ready"}
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
          caption="先预测 policy 的语义，再观察执行线程和 future status 的证据。"
          reset={{ label: "重置实验", ariaLabel: "重置 Item 36 launch policy 实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Item 36 的判断顺序：先决定是否 asynchronicity essential，再选择 launch policy，最后审查
        wait loop、thread-local 与 future lifetime。
      </figcaption>
    </figure>
  );
}
