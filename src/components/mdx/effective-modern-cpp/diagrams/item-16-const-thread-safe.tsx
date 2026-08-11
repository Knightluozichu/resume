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
    label: "const",
    caption:
      "const member functions thread safe 是接口契约；bitwise constness 不会自动提供同步，mutable cache 仍是共享状态",
  },
  {
    label: "race",
    caption:
      "两个 const callers 可能同时读 false 并写 cache；数学结果相同也不能消除 data race",
  },
  {
    label: "mutex",
    caption:
      "mutex 将 valid flag 与 cached value 作为 cache publication invariant 一起保护",
  },
  {
    label: "atomic",
    caption:
      "atomic 适合独立 call counter；relaxed ordering 不会替多字段 cache 建立事务",
  },
  {
    label: "publish",
    caption:
      "compute-then-publish 可缩短持锁时间，但最终 check 与 publish 仍需同一同步协议",
  },
  {
    label: "matrix",
    caption:
      "operation concurrency matrix 明确 const/const、const/mutating 与 mutation/mutation 的边界，并用 TSan 验收",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 135,
  y: 330,
}));

export function EmcppItem16ConstThreadSafeLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [atomicFlagFault, setAtomicFlagFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // label 对齐共享状态模型切换的起点，确保字幕与步骤一致。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex];

  function reset() {
    timeline.goToStep(0);
    setAtomicFlagFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-16-const-thread-safe"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 16
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              const 是接口承诺，不是同步原语
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              沿着同一组 mutable fields 推进：先暴露竞态，再选择 mutex、atomic
              或完整的发布协议。
            </p>
          </div>
        </div>

        <svg
          viewBox="0 0 840 470"
          role="img"
          aria-label="Effective Modern C++ Item 16 const member functions thread safe 教学时间线：展示 bitwise constness 与 logical constness 的差异，两个线程并发访问 mutable cache 产生 data race，mutex 保护 valid flag 和 cached value 的复合不变量，atomic 只适合独立计数器，compute-then-publish 缩短锁范围，最后用 operation concurrency matrix 和 ThreadSanitizer 验收。可播放、暂停、单步、拖进度、重置，并可注入把 atomic valid flag 当作完整 cache 保护的故障。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item16-thread-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item16-thread-fault-arrow"
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
            const promise → shared state → synchronization protocol
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            mutable cache · valid/value invariant · mutex · atomic counter ·
            TSan
          </text>

          <rect
            x="28"
            y="82"
            width="784"
            height="76"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="108" fontSize="12" fontWeight="700" fill={C.accent}>
            同一对象的共享 mutable state
          </text>
          <text x="46" y="135" fontSize="13" fill={C.primary}>
            rootsAreValid = false | rootValues = pending | callCount = 0
          </text>
          <text x="46" y="150" fontSize="11" fill={C.secondary}>
            valid 与 value 是一个 cache publication invariant；counter 是独立
            telemetry
          </text>

          {STEPS.map((step, index) => {
            const selected = index === activeIndex;
            const failed = atomicFlagFault && index === 3;
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
                      stroke={selected ? C.accent : C.border}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.accent}
                    >
                      const 的语义分两层
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      bitwise constness：不改 non-mutable bits
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      logical constness：可更新不可观察的
                      cache，但仍需同步共享状态
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      mutable 只放宽写限制，不生成 lock、memory ordering 或
                      happens-before
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
                      fill={C.warning}
                      fillOpacity="0.1"
                      stroke={C.danger}
                      strokeWidth="1.5"
                    />
                    <text
                      x="48"
                      y="207"
                      fontSize="12"
                      fontWeight="700"
                      fill={C.danger}
                    >
                      两个 const callers 的危险交错
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      Thread A：read false → compute → write rootValues
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      Thread B：read false → compute → write rootValues
                    </text>
                    <path
                      d="M 420 226 C 460 250, 500 250, 540 226"
                      fill="none"
                      stroke={C.danger}
                      strokeWidth="3"
                      strokeDasharray="8 6"
                      markerEnd="url(#emcpp-item16-thread-fault-arrow)"
                    />
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      结果相同也不改变并发写同一 storage 的 data race
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
                      mutex：把 check、compute、publish 放进协议
                    </text>
                    <rect
                      x="48"
                      y="222"
                      width="184"
                      height="42"
                      rx="8"
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <text x="64" y="248" fontSize="12" fill={C.primary}>
                      lock → read valid
                    </text>
                    <line
                      x1="232"
                      y1="243"
                      x2="290"
                      y2="243"
                      stroke={C.border}
                      strokeWidth="2"
                      markerEnd="url(#emcpp-item16-thread-arrow)"
                    />
                    <rect
                      x="296"
                      y="222"
                      width="184"
                      height="42"
                      rx="8"
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <text x="312" y="248" fontSize="12" fill={C.primary}>
                      compute / copy value
                    </text>
                    <line
                      x1="480"
                      y1="243"
                      x2="538"
                      y2="243"
                      stroke={C.border}
                      strokeWidth="2"
                      markerEnd="url(#emcpp-item16-thread-arrow)"
                    />
                    <rect
                      x="544"
                      y="222"
                      width="220"
                      height="42"
                      rx="8"
                      fill={C.elevated}
                      stroke={C.border}
                    />
                    <text x="560" y="248" fontSize="12" fill={C.primary}>
                      publish value → valid
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      reader 在同一 lock 下不会看到 valid=true 但 value 未完成
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
                      fill={failed ? C.danger : C.elevated}
                      fillOpacity={failed ? 0.12 : 1}
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
                      atomic：只给独立变量加原子性
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      atomic callCount.fetch_add(1, relaxed) ✓
                    </text>
                    <text
                      x="48"
                      y="259"
                      fontSize="12"
                      fill={failed ? C.danger : C.primary}
                    >
                      rootsAreValid atomic ≠ rootValues 的完整 publication
                      protocol
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      memory ordering 解决可见性条件，不会把多个 fields
                      自动变成事务
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
                      compute-then-publish：缩短持锁时间
                    </text>
                    <text x="48" y="235" fontSize="12" fill={C.primary}>
                      lock/check → unlock → compute candidate →
                      lock/check/publish
                    </text>
                    <text x="48" y="259" fontSize="12" fill={C.primary}>
                      两线程可以重复计算，但只允许一个线程在锁内发布结果
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      若 source 会变化，mutation、version 与 invalidation
                      必须进入同一协议
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
                      operation concurrency matrix：把边界写下来
                    </text>
                    <text x="48" y="236" fontSize="12" fill={C.primary}>
                      const / const：允许？ const / mutating：禁止或外部加锁？
                    </text>
                    <text x="48" y="260" fontSize="12" fill={C.primary}>
                      mutating / mutating：共享 protocol？
                      counter：最终计数是否正确？
                    </text>
                    <text x="48" y="282" fontSize="11" fill={C.secondary}>
                      用 ThreadSanitizer、首次发布、invalidation 和 copy/move
                      tests 逐格验收
                    </text>
                  </>
                )}
              </g>
            );
          })}

          {atomicFlagFault && (
            <g>
              <path
                d="M 612 302 C 592 278, 584 250, 590 226"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item16-thread-fault-arrow)"
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
                故障：atomic valid flag 只保护 flag；修法：mutex 或完整
                immutable publication protocol
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
            markerEnd="url(#emcpp-item16-thread-arrow)"
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
                markerEnd="url(#emcpp-item16-thread-arrow)"
              />
            );
          })}

          {STEPS.map((step, index) => {
            const box = BOXES[index];
            const selected = index === activeIndex;
            const failed = atomicFlagFault && index === 3;
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
                    ? "const"
                    : index === 1
                      ? "interleave"
                      : index === 2
                        ? "lock"
                        : index === 3
                          ? "counter"
                          : index === 4
                            ? "publish"
                            : "TSan"}
                </text>
                <text
                  x={box.x + 55}
                  y={box.y + 82}
                  textAnchor="middle"
                  fontSize="11"
                  fill={failed ? C.danger : selected ? C.accent : C.secondary}
                >
                  {failed
                    ? "gap"
                    : index === 0
                      ? "contract"
                      : index === 1
                        ? "race"
                        : index === 2
                          ? "invariant"
                          : index === 3
                            ? "atomic"
                            : index === 4
                              ? "protocol"
                              : "matrix"}
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
          caption="每个 label 位于共享状态协议切换的起点；可单步查看 data race、mutex invariant、atomic 边界与 TSan 验收。"
          reset={{
            label: "重置时间线",
            ariaLabel: "重置 Item 16 const thread safe 时间线",
            onClick: reset,
          }}
        />

        <button
          type="button"
          aria-pressed={atomicFlagFault}
          onClick={() => setAtomicFlagFault((value) => !value)}
          className={`mx-auto mt-3 block min-h-11 rounded-control border px-4 py-2 text-sm transition-colors ${
            atomicFlagFault
              ? "border-danger bg-danger/10 text-danger"
              : "border-border text-secondary hover:border-danger hover:text-danger"
          }`}
        >
          {atomicFlagFault ? "关闭 atomic flag 故障" : "注入 atomic flag 故障"}
        </button>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        线程安全来自可审计的共享状态协议：mutex 保护复合 invariant，atomic
        保护独立变量，const 只描述接口语义。
      </figcaption>
    </figure>
  );
}
