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
      "先区分参与者：CPU threads 的 shared state 需要同步，device/signal 的特殊访问需要各自平台契约",
  },
  {
    label: "atomic",
    caption:
      "atomic read-modify-write 不可被同对象其他 atomic operation 撕裂，保护单对象并发访问",
  },
  {
    label: "volatile",
    caption:
      "volatile 保留特殊内存的 observable read/write，但不提供 atomicity、happens-before 或 race safety",
  },
  {
    label: "publish",
    caption:
      "release store + acquire load 才把 producer 的普通 data writes 发布给 consumer",
  },
  {
    label: "device",
    caption:
      "MMIO/DMA 还需要寄存器宽度、cache maintenance、CPU/device fence 与 bus ordering 协议",
  },
  {
    label: "audit",
    caption:
      "最后按访问者、冲突关系、ordering 和副作用选择 atomic、mutex、volatile accessor 或 driver API",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 132,
  y: 356,
}));

export function EmcppItem40AtomicVolatileLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [volatileRaceFault, setVolatileRaceFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐原子性、发布关系或平台访问契约的起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];

  function reset() {
    timeline.goToStep(0);
    setVolatileRaceFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-40-atomic-vs-volatile"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 40
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              先识别访问者，再选择内存承诺
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              atomic 解决 CPU threads 对 C++ state 的并发协调；volatile
              解决特殊内存访问不能被随意省略。两个关键词不能互换。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 520"
          role="img"
          aria-label="Effective Modern C++ Item 40 教学时间线：区分 atomic 对 CPU 并发共享状态的原子读改写和 memory ordering，区分 volatile 对 MMIO 等特殊内存访问的 compiler observable constraint，展示 volatile++ data race、release/acquire publication 以及 DMA 和设备平台协议。支持播放、暂停、单步、拖进度、重置和注入 volatile race 故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item40-memory-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item40-memory-fault-arrow"
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
            access domain → synchronization / observability → platform contract
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            atomic RMW · data race · release/acquire · compiler access ·
            MMIO/DMA
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
            两条通道：CPU shared state 与 device special memory
          </text>
          <rect
            x="46"
            y="116"
            width="214"
            height="32"
            rx="8"
            fill={C.success}
            fillOpacity="0.12"
            stroke={C.success}
            strokeWidth="1.5"
          />
          <text
            x="153"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            CPU threads → atomic / mutex
          </text>
          <line
            x1="278"
            y1="132"
            x2="348"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item40-memory-arrow)"
          />
          <rect
            x="364"
            y="116"
            width="156"
            height="32"
            rx="8"
            fill={volatileRaceFault ? C.danger : C.warning}
            fillOpacity="0.12"
            stroke={volatileRaceFault ? C.danger : C.warning}
            strokeWidth="1.5"
          />
          <text
            x="442"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            proof boundary
          </text>
          <line
            x1="538"
            y1="132"
            x2="608"
            y2="132"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item40-memory-arrow)"
          />
          <rect
            x="624"
            y="116"
            width="170"
            height="32"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text
            x="709"
            y="137"
            textAnchor="middle"
            fontSize="12"
            fill={C.primary}
          >
            MMIO / DMA protocol
          </text>
          <text x="46" y="158" fontSize="11" fill={C.secondary}>
            volatile 让访问可观察，不会把 CPU threads 的 read/add/write
            变成同步事务
          </text>

          {STEPS.map((step, index) => {
            const faulted = volatileRaceFault && (index === 1 || index === 2);
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
                      1 · domain：并发共享与特殊内存是两类问题
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      CPU threads 访问 C++ object 时，需要 data-race safety 与
                      happens-before
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      device、signal 或外部 agent 访问时，重点可能是每次
                      read/write 的外部副作用
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      先问“谁在访问、谁在写、是否有设备语义”，再决定 atomic 还是
                      volatile accessor
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
                      2 · atomic：把单对象 read-modify-write 变成一个操作
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      atomic counter 的 ++ 或 fetch_add 不会与同对象其他 atomic
                      operation 撕裂
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      它保护 atomic 自身；跨多个 fields 的不变量仍可能需要 mutex
                      或完整 protocol
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      原子性不是整个函数事务性，也不自动发布旁边的普通 data
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
                      3 · volatile：保留访问，不提供同步
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      volatile counter++ 仍是 read、add、write；两个 threads
                      可能读到同一个旧值
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      即使 compiler 每次都发出访问，conflicting unsynchronized
                      accesses 仍构成 data race
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      “每次读到总线”不等于 atomic、cache coherence 或
                      happens-before
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
                      fill={C.success}
                    >
                      4 · publish：release/acquire 交付普通数据
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      producer 先写 Data，再对 atomic ready 做 release store
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      consumer 用 acquire load 读到 true 后，Data writes 才通过
                      happens-before 可见
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      relaxed 只保护 flag 自身；volatile flag 更没有发布语义
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
                      5 · device：volatile 还不是完整设备协议
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      MMIO register 的每次 read 可能 acknowledge event；compiler
                      不能合并访问
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      DMA/non-coherent memory 还可能需要 cache flush、CPU/device
                      fence、bus ordering
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      不要把任意 pointer cast 成 volatile
                      就认为满足寄存器宽度与平台契约
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
                      6 · audit：分别证明同步与外部可观察性
                    </text>
                    <text x="48" y="241" fontSize="12" fill={C.primary}>
                      检查 conflicting accesses、invariant、memory
                      order、设备副作用和平台 barrier
                    </text>
                    <text x="48" y="267" fontSize="12" fill={C.primary}>
                      CPU shared state 选 atomic/mutex；MMIO/DMA 服从
                      driver/platform API，再交接 copied state
                    </text>
                    <text x="48" y="299" fontSize="11" fill={C.secondary}>
                      signal handler 的 sig_atomic_t
                      也只是特定边界，不能泛化为线程同步工具
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {volatileRaceFault && (
            <g>
              <path
                d="M 684 338 C 644 306, 598 274, 548 238"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item40-memory-fault-arrow)"
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
                故障注入：volatile++ 丢更新并触发 data race；修法：atomic RMW
                或锁
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
            markerEnd="url(#emcpp-item40-memory-arrow)"
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
                markerEnd="url(#emcpp-item40-memory-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const faulted = volatileRaceFault && (index === 1 || index === 2);
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
                    ? "领域"
                    : index === 1
                      ? "atomic"
                      : index === 2
                        ? "volatile"
                        : index === 3
                          ? "发布"
                          : index === 4
                            ? "设备"
                            : "审查"}
                </text>
                <text
                  x={box.x + 52}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={faulted ? C.danger : selected ? C.accent : C.secondary}
                >
                  {faulted
                    ? "race"
                    : index < 2
                      ? "thread"
                      : index < 5
                        ? "contract"
                        : "choose"}
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
          caption="按步骤检查访问域、atomicity、happens-before、设备副作用和平台协议；单步最适合定位 volatile++ 故障。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 40 atomic volatile 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={volatileRaceFault}
          onClick={() => setVolatileRaceFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            volatileRaceFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {volatileRaceFault
            ? "关闭 volatile race 故障"
            : "注入 volatile race 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        atomic 与 volatile 不是强弱版本：前者证明 CPU
        并发同步，后者约束特殊访问的可观察性；跨边界还要遵守平台协议。
      </figcaption>
    </figure>
  );
}
