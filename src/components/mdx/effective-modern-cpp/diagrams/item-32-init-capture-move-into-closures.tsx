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
    label: "capture",
    caption:
      "init capture 左侧是新 closure member，右侧 expression 在 enclosing scope 求值",
  },
  {
    label: "ownership",
    caption:
      "move objects into closures 把 unique_ptr ownership 从外层 owner 转给 closure",
  },
  {
    label: "member",
    caption:
      "closure class data member 保存真正的 move-only state，生命周期属于 closure object",
  },
  {
    label: "invoke",
    caption:
      "body 中有名字的 member 是 lvalue；消费 state 要 mutable 加显式 std::move",
  },
  {
    label: "emulation",
    caption:
      "C++11 emulation 用 functor 或 bind object 显式/隐式保存同一份 owned state",
  },
  {
    label: "audit",
    caption:
      "最后检查 queue 的 copy/move contract、调用次数与 destruction point",
  },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STEP_BOXES = STEPS.map((_, index) => ({
  x: 28 + index * 134,
  y: 410,
}));

type StorageMode = "init" | "emulation";

export function EmcppItem32InitCaptureOwnershipLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [storageMode, setStorageMode] = useState<StorageMode>("init");
  const [copyFault, setCopyFault] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          { opacity: [0, 1], duration: T * 0.55, ease: "out(3)" },
          index * T,
        );
        // 每个 label 对齐该教学步骤的动画起始时刻。
        tl.label(step.label, index * T);
      });
    },
  });

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const usesInitCapture = storageMode === "init";
  const queueFaulted = copyFault && activeIndex >= 1;

  function reset() {
    timeline.goToStep(0);
    setStorageMode("init");
    setCopyFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="emcpp-item-32-init-capture-move-into-closures"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              Effective Modern C++ · Item 32
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把 ownership 沿着 closure 生命周期走一遍
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择 init capture 或 C++11 emulation，再逐步观察 owner、closure
              member、下游 callable 与 destruction point。故障开关会模拟把
              move-only closure 错送进要求 copyable 的队列。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">state storage</span>
            <select
              aria-label="选择 closure state 的存储方式"
              value={storageMode}
              onChange={(event) => setStorageMode(event.target.value as StorageMode)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="init">C++14 init capture · [p = std::move(p)]</option>
              <option value="emulation">C++11 emulation · functor / bind</option>
            </select>
          </label>
          <label className="flex min-h-11 items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-secondary">
            <input
              type="checkbox"
              checked={copyFault}
              onChange={(event) => setCopyFault(event.target.checked)}
              className="accent-[var(--accent)]"
            />
            <span>
              <strong className="text-primary">注入 copy contract 故障</strong>
              <br />
              把 move-only closure 当成可复制 callable
            </span>
          </label>
        </div>

        <svg
          viewBox="0 0 840 560"
          role="img"
          aria-label="Effective Modern C++ Item 32 专属教学时间线：展示 init capture、move objects into closures、closure class data member、mutable 调用、C++11 emulation，以及 queue copy/move contract 和 destruction point。可在 C++14 init capture 与 C++11 functor 或 bind emulation 之间切换，支持播放、暂停、单步、拖进度、重置和 copy contract 故障注入。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="emcpp-item32-ownership-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="emcpp-item32-fault-arrow"
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
            outer owner → closure state → callable storage → destruction
          </text>
          <text x="28" y="58" fontSize="12" fill={C.secondary}>
            capture initializer 的求值时机 · move-only member · copy/move contract
          </text>

          <rect
            x="28"
            y="78"
            width="784"
            height="92"
            rx="12"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="46" y="104" fontSize="12" fontWeight="700" fill={C.accent}>
            当前实现路径
          </text>
          <rect
            x="46"
            y="118"
            width="236"
            height="32"
            rx="8"
            fill={C.elevated}
            stroke={C.border}
            strokeWidth="1.5"
          />
          <text x="164" y="139" textAnchor="middle" fontSize="12" fill={C.primary}>
            {usesInitCapture ? "[p = std::move(p)]" : "Functor / bind object"}
          </text>
          <line
            x1="294"
            y1="134"
            x2="360"
            y2="134"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item32-ownership-arrow)"
          />
          <rect
            x="376"
            y="118"
            width="176"
            height="32"
            rx="8"
            fill={C.accent}
            fillOpacity="0.12"
            stroke={C.accent}
            strokeWidth="1.5"
          />
          <text x="464" y="139" textAnchor="middle" fontSize="12" fill={C.primary}>
            closure member
          </text>
          <line
            x1="564"
            y1="134"
            x2="630"
            y2="134"
            stroke={queueFaulted ? C.danger : C.border}
            strokeWidth="2"
            markerEnd={
              queueFaulted
                ? "url(#emcpp-item32-fault-arrow)"
                : "url(#emcpp-item32-ownership-arrow)"
            }
          />
          <rect
            x="646"
            y="118"
            width="148"
            height="32"
            rx="8"
            fill={queueFaulted ? C.danger : C.elevated}
            fillOpacity={queueFaulted ? 0.14 : 1}
            stroke={queueFaulted ? C.danger : C.border}
            strokeWidth="1.5"
          />
          <text x="720" y="139" textAnchor="middle" fontSize="12" fill={C.primary}>
            {queueFaulted ? "copy? 失败" : "queue / call"}
          </text>
          <text x="46" y="162" fontSize="11" fill={C.secondary}>
            左侧 expression 在 enclosing scope 求值；右侧 member 名只在 closure body 中可见
          </text>

          <g
            ref={(node) => {
              stageRefs.current[0] = node;
            }}
            style={{ opacity: 0 }}
          >
            <rect
              x="28"
              y="188"
              width="784"
              height="168"
              rx="12"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
              strokeWidth="1.5"
            />
            <text x="48" y="218" fontSize="12" fontWeight="700" fill={C.accent}>
              1 · init capture：左右名称不在同一层 scope
            </text>
            <text x="48" y="248" fontSize="12" fill={C.primary}>
              [member = expression] 声明新的 closure class data member
            </text>
            <text x="48" y="276" fontSize="12" fill={C.primary}>
              expression 在 lambda 创建时求值；member 名在 body 中作为状态出现
            </text>
            <text x="48" y="316" fontSize="11" fill={C.secondary}>
              先问：谁执行 initializer？谁在最后一次调用时拥有 resource？
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
              y="188"
              width="784"
              height="168"
              rx="12"
              fill={C.success}
              fillOpacity="0.1"
              stroke={C.success}
              strokeWidth="1.5"
            />
            <text x="48" y="218" fontSize="12" fontWeight="700" fill={C.success}>
              2 · move objects into closures：owner 边界发生转移
            </text>
            <text x="48" y="248" fontSize="12" fill={C.primary}>
              std::move(p) 只把 resource 转给 closure member，不复制 unique_ptr
            </text>
            <text x="48" y="276" fontSize="12" fill={C.primary}>
              外层 p 进入 moved-from 状态；closure 成为唯一 owner，随后可被移动进 queue
            </text>
            <text x="48" y="316" fontSize="11" fill={C.secondary}>
              move 的发生点是 capture 初始化，不是每次执行 lambda body
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
              y="188"
              width="784"
              height="168"
              rx="12"
              fill={C.accent}
              fillOpacity="0.1"
              stroke={C.accent}
              strokeWidth="1.5"
            />
            <text x="48" y="218" fontSize="12" fontWeight="700" fill={C.accent}>
              3 · closure class data member：闭包是真正的对象
            </text>
            <text x="48" y="248" fontSize="12" fill={C.primary}>
              compiler 生成的 unnamed class 保存 unique_ptr member，并负责析构
            </text>
            <text x="48" y="276" fontSize="12" fill={C.primary}>
              因 member 不可复制，closure 也通常 move-only；storage API 必须接受它
            </text>
            <text x="48" y="316" fontSize="11" fill={C.secondary}>
              看 member 的 special members，就能预测 closure 的 copy/move contract
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
              y="188"
              width="784"
              height="168"
              rx="12"
              fill={queueFaulted ? C.danger : C.warning}
              fillOpacity="0.1"
              stroke={queueFaulted ? C.danger : C.warning}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y="218"
              fontSize="12"
              fontWeight="700"
              fill={queueFaulted ? C.danger : C.warning}
            >
              4 · invoke：named member 是 lvalue，不会自动再次 move
            </text>
            <text x="48" y="248" fontSize="12" fill={C.primary}>
              若要消费 state，operator() 通常需要 mutable，并显式写 std::move(member)
            </text>
            <text x="48" y="276" fontSize="12" fill={C.primary}>
              第一次调用可取走 unique_ptr；第二次调用面对的是空 member，需明确 one-shot contract
            </text>
            <text x="48" y="316" fontSize="11" fill={C.secondary}>
              capture initializer 的 move 与 body 内的 move 是两个不同事件
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
              y="188"
              width="784"
              height="168"
              rx="12"
              fill={C.warning}
              fillOpacity="0.1"
              stroke={C.warning}
              strokeWidth="1.5"
            />
            <text x="48" y="218" fontSize="12" fontWeight="700" fill={C.warning}>
              5 · C++11 emulation：把隐藏状态改写成 callable owner
            </text>
            <text x="48" y="248" fontSize="12" fill={C.primary}>
              functor 显式声明 member；bind object 隐式按值保存 moved argument
            </text>
            <text x="48" y="276" fontSize="12" fill={C.primary}>
              两者都在 callable object 内拥有 state，但 bind 的 cv/reference 行为更难审查
            </text>
            <text x="48" y="316" fontSize="11" fill={C.secondary}>
              模拟的是 ownership 语义，不是把旧语法逐字替换成 lambda
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
              y="188"
              width="784"
              height="168"
              rx="12"
              fill={queueFaulted ? C.danger : C.success}
              fillOpacity="0.1"
              stroke={queueFaulted ? C.danger : C.success}
              strokeWidth="1.5"
            />
            <text
              x="48"
              y="218"
              fontSize="12"
              fontWeight="700"
              fill={queueFaulted ? C.danger : C.success}
            >
              6 · ownership audit：把发布前检查写成问题清单
            </text>
            <text x="48" y="248" fontSize="12" fill={C.primary}>
              owner 是否覆盖最后一次调用？closure/storage 是否需要 copy 还是只需 move？
            </text>
            <text x="48" y="276" fontSize="12" fill={C.primary}>
              consumption 次数、mutable 需求、queue contract 与 destruction point 是否一致？
            </text>
            <text x="48" y="316" fontSize="11" fill={C.secondary}>
              故障开关表示：若 queue 强制复制 move-only closure，修法是换 storage contract
            </text>
          </g>

          {copyFault && (
            <g>
              <path
                d="M 748 174 C 716 208, 690 230, 650 250"
                fill="none"
                stroke={C.danger}
                strokeWidth="3"
                strokeDasharray="8 6"
                markerEnd="url(#emcpp-item32-fault-arrow)"
              />
              <rect
                x="170"
                y="362"
                width="500"
                height="28"
                rx="8"
                fill={C.warning}
                fillOpacity="0.14"
                stroke={C.danger}
                strokeWidth="1.5"
              />
              <text x="188" y="382" fontSize="11" fontWeight="700" fill={C.danger}>
                故障注入：unique_ptr member 删除 copy；修法：让下游接受 move-only callable
              </text>
            </g>
          )}

          <line
            x1="72"
            y1="438"
            x2="768"
            y2="438"
            stroke={C.border}
            strokeWidth="2"
            markerEnd="url(#emcpp-item32-ownership-arrow)"
          />
          {STEPS.slice(0, -1).map((step, index) => {
            const start = STEP_BOXES[index];
            const end = STEP_BOXES[index + 1];
            return (
              <line
                key={`connector-${step.label}`}
                x1={start.x + 108}
                y1="424"
                x2={end.x - 10}
                y2="424"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd="url(#emcpp-item32-ownership-arrow)"
              />
            );
          })}
          {STEPS.map((step, index) => {
            const box = STEP_BOXES[index];
            const selected = index === activeIndex;
            const faulted = copyFault && index >= 1;
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
                    ? "declaration"
                    : index === 1
                      ? "owner"
                      : index === 2
                        ? "member"
                        : index === 3
                          ? "call"
                          : index === 4
                            ? "C++11"
                            : "contract"}
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
          caption="先预测 ownership，再逐步验证 closure member、调用次数和下游存储契约。"
          reset={{ label: "重置实验", ariaLabel: "重置 Item 32 所有权实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Item 32 的关键不是 capture 语法短，而是把 move-only state 的 owner、callable
        contract 与销毁点连成一条可审计的生命周期。
      </figcaption>
    </figure>
  );
}
