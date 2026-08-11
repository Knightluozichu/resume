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
    label: "outcome",
    caption:
      "先描述 computation 和 outcome；task abstraction 不要求调用者先决定承载它的物理线程",
  },
  {
    label: "thread",
    caption:
      "std::thread 的 join 只等待完成，return value 被丢弃，未捕获异常不会在 join 时重新抛出",
  },
  {
    label: "future",
    caption:
      "std::async 返回 future，共享状态统一保存 value 或 exception，get 在 caller context 交付结果",
  },
  {
    label: "schedule",
    caption:
      "software thread、OS thread 超过 hardware thread 会 oversubscription；task 让 runtime 保留调度空间",
  },
  {
    label: "lifetime",
    caption:
      "future 的 get、wait、shared 与 destructor 都是 lifetime contract，不能把 task 当作无限并行",
  },
  {
    label: "native",
    caption:
      "只有 identity、affinity、priority、native handle 或 owner event loop 是需求时才下沉 thread control",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem35TaskThreadLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [droppedOutcomeFault, setDroppedOutcomeFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐 outcome、调度或 native identity 决策的起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];

  function reset() {
    timeline.goToStep(0);
    setDroppedOutcomeFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-35-prefer-task-based-programming"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 35
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先交付 outcome，再决定 worker identity
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              task 描述工作、结果和错误；thread
              直接暴露执行资源。沿着结果通道和线程层级逐步下沉，才能知道何时需要
              native control。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 35 教学时间线：比较 thread 的 join-only 通道与 async future 的 value/exception 结果通道，展示 software thread、OS thread、hardware thread 和 oversubscription 的层级，说明 future lifetime contract，以及何时必须为 native identity、affinity 或 priority 选择 thread control。支持播放、暂停、单步、拖进度、重置和注入丢失结果故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item35-task-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item35-task-fault-arrow"
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
            computation → outcome channel → execution resource
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            task/future · thread/join · software/OS/hardware · lifetime · native
            control
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
            两条结果通道：同一 computation，不同责任边界
          </text>
          <rect
            x="46"
            y="116"
            width="176"
            height="32"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text
            x="134"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            std::thread
          </text>
          <line
            x1="236"
            y1="132"
            x2="314"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item35-task-arrow)"
          />
          <rect
            x="330"
            y="116"
            width="168"
            height="32"
            rx="8"
            fill={droppedOutcomeFault ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={droppedOutcomeFault ? C.danger : C.warning}
            strokeWidth="1.5"
          />
          <text
            x="414"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            join：只等待
          </text>
          <line
            x1="514"
            y1="132"
            x2="586"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item35-task-arrow)"
          />
          <rect
            x="602"
            y="116"
            width="192"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="698"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            async future：值或异常
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            thread 让应用自己补结果、异常和生命周期；task/future 把 outcome 作为
            typed protocol 交付
          </text>

          {STEPS.map((step, index) => {
            const faulted = droppedOutcomeFault && (index === 1 || index === 2);
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
                      1 · outcome：先说工作和结果
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      task API 关心 callable 的 computation、value 和
                      exception，不先绑定物理 worker
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      thread API 直接创建 software thread，调用者负责
                      join、结果存储和错误回传
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      审查起点：正确性依赖 outcome，还是依赖具体 execution
                      identity？
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
                      fill={faulted ? C.danger : C.warning}
                    >
                      2 · thread：join-only，不是结果通道
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      worker.join() 只证明执行结束；calculateAnswer 的 return
                      value 被丢弃
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      未捕获 exception 不会在 join 时重新抛出，通常直接触发
                      terminate
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      需要结果时必须另建 promise/shared state，并覆盖所有早退与
                      shutdown 路径
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
                      fill={faulted ? C.danger : C.success}
                    >
                      3 · future：value 和 exception 走同一 shared state
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      std::async 返回 typed future；正常返回写入
                      value，抛异常写入 exception
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      caller 调用 get() 等待并取得 int，或在自己的 try/catch
                      中恢复 exception
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      结果、错误和等待点集中在同一个
                      protocol，而不是散落在线程入口
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
                      fill={C.accent}
                    >
                      4 · schedule：线程层级决定并行槽，而不是任务数量
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      software thread 映射到 OS scheduling entity，hardware
                      thread 才提供同时执行槽
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      runnable threads 远多于硬件槽会
                      oversubscription：切换、cache、stack 和 kernel cost 上升
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      task 让 runtime/executor 有机会复用有限 workers；不要把
                      async 误当标准 thread pool
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
                      fill={C.warning}
                    >
                      5 · lifetime：future 也需要明确契约
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      get、wait、shared、destructor 都可能决定 caller 何时阻塞或
                      task 何时完成
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      丢弃 temporary future
                      可能等待关联任务，连续语句因此意外串行化
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      还要记录 launch policy、bounded concurrency、取消和
                      shutdown 的边界
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
                      6 · native：只有 identity 是需求时才下沉 thread
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      priority、affinity、native handle、指定 event-loop 或
                      owner thread 都是例外证据
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      这时可选 thread/executor，但必须补回
                      result、exception、join、cancel、shutdown protocol
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      默认 task，不是绝对 task；选择依据是 outcome 与 execution
                      identity 的真实需求
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {droppedOutcomeFault && (
            <g>
              <path
                d="M 684 338 C 644 306, 598 274, 548 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item35-task-fault-arrow)"
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
                故障注入：只 join 不收集 outcome；修法：使用 future 或显式
                promise/error sink
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
            markerEnd="url(#emcpp-item35-task-arrow)"
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
                markerEnd="url(#emcpp-item35-task-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = droppedOutcomeFault && (index === 1 || index === 2);
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
                    ? "outcome"
                    : index === 1
                      ? "join"
                      : index === 2
                        ? "future"
                        : index === 3
                          ? "调度"
                          : index === 4
                            ? "寿命"
                            : "identity"}
                </text>
                <text
                  x={box.x + 52}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={faulted ? C.danger : selected ? C.accent : C.secondary}
                >
                  {faulted
                    ? "lost"
                    : index < 2
                      ? "channel"
                      : index < 5
                        ? "policy"
                        : "exception"}
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
          caption="按步骤检查 outcome channel、调度自由度、future lifetime 和 native identity；单步最适合定位责任边界。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 35 task thread 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={droppedOutcomeFault}
          onClick={() => setDroppedOutcomeFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            droppedOutcomeFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {droppedOutcomeFault
            ? "关闭丢失 outcome 故障"
            : "注入丢失 outcome 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        prefer task-based programming 的核心是先表达结果与错误；只有 execution
        identity 成为正确性需求时，才选择 thread-based control。
      </figcaption>
    </figure>
  );
}
