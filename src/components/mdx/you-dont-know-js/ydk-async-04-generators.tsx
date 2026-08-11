"use client";

import { useRef, useState } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

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
  { label: "create", caption: "调用生成器得到暂停状态的迭代器" },
  { label: "next", caption: "next 恢复执行，直到下一个 yield 或 return" },
  { label: "yield", caption: "yield 把值交给调用者并暂停局部执行" },
  { label: "await", caption: "执行器等待 Promise，再把结果送回生成器" },
  { label: "send", caption: "next(value) 或 throw(error) 形成双向消息" },
  { label: "delegate", caption: "yield* 委托子迭代器，done 后回到父生成器" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 调用生成器取得迭代器",
    "调用生成器函数不会立即执行函数体，而是得到一个可以逐步推进的迭代器对象。",
    "输出：iterator state",
  ],
  [
    "2 · next 恢复到下一个 yield",
    "next() 让生成器从暂停点继续，直到遇到 yield、return 或异常，调用者获得结果记录。",
    "输出：next result",
  ],
  [
    "3 · yield 暂停并向外给值",
    "yield 暂停局部执行，把值交给调用者；下一次 next(value) 的 value 会成为 yield 表达式的结果。",
    "输出：yielded value",
  ],
  [
    "4 · 调用者等待异步结果",
    "执行器可以把 yield 出来的 Promise 接入队列，等待兑现后再调用 next，把顺序逻辑继续推进。",
    "输出：awaited result",
  ],
  [
    "5 · next 或 throw 把结果送回",
    "成功结果通过 next(value) 送回，失败结果通过 throw(error) 在暂停点抛出，生成器可以捕获或结束。",
    "输出：bidirectional message",
  ],
  [
    "6 · yield* 委托并完成",
    "yield* 把迭代权交给子迭代器；子迭代器 done 后，父生成器继续并最终返回 done=true。",
    "输出：delegated completion",
  ],
] as const;

type Mode = "values" | "async" | "throw" | "delegate" | "concurrency";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  values: {
    title: "逐步产生值",
    input: "function* values() { yield 1; yield 2 }",
    state: "suspendedStart → suspendedYield",
    result: "next() → { value: 1, done: false }",
    detail: "迭代器把执行权交还调用者，下一次 next 再恢复。",
  },
  async: {
    title: "Promise 驱动恢复",
    input: "yield Promise.resolve(data)",
    state: "yield → await → next(data)",
    result: "sequential result",
    detail: "执行器把异步等待包装成顺序代码，但必须处理拒绝路径。",
  },
  throw: {
    title: "暂停点注入错误",
    input: "iterator.throw(error)",
    state: "yield → throw → catch or close",
    result: "error handled at yield",
    detail: "throw 从暂停点进入生成器，未捕获时迭代器结束并向外抛错。",
  },
  delegate: {
    title: "yield* 委托",
    input: "yield* child()",
    state: "parent → child → parent",
    result: "child done → parent resumes",
    detail: "委托共享迭代协议，不等同于把两个函数并行执行。",
  },
  concurrency: {
    title: "多个生成器并发",
    input: "runnerA.next() + runnerB.next()",
    state: "two iterator states",
    result: "interleaved progress",
    detail: "并发来自多个 runner 的交错推进，状态仍分别属于各自迭代器。",
  },
};

export function YdkAsync04GeneratorsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("values");

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

  const activeIndex =
    timeline.currentStep >= STEPS.length
      ? STEPS.length - 1
      : timeline.currentStep;
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const selected = MODE_COPY[mode];
  const faultIndex = mode === "async" ? 3 : mode === "throw" ? 4 : mode === "delegate" ? 5 : mode === "concurrency" ? 1 : -1;

  function reset() {
    timeline.goToStep(0);
    setMode("values");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-async-04-generators"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Async · Chapter 4
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              生成器的暂停协议：next 送进来，yield 送出去
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换逐步值、异步恢复、错误注入、yield* 委托和并发 runner，沿六步观察暂停点的双向消息。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择生成器样本</span>
          <select
            aria-label="选择逐步产生值、Promise 驱动恢复、暂停点错误、yield 委托或多个生成器并发样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="values">逐步值 · next → yield</option>
            <option value="async">异步恢复 · yield Promise</option>
            <option value="throw">错误注入 · iterator.throw</option>
            <option value="delegate">委托 · yield* child</option>
            <option value="concurrency">并发 · two iterator states</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Async Chapter 4 专属教学时间线，覆盖 Chapter 4: Generators、Breaking Run-to-completion、Generator'ing Values、Iterating Generators Asynchronously、Generators + Promises、Generator Delegation、Generator Concurrency、Thunks、Pre-ES6 Generators。展示生成器、迭代器、next、yield、Promise 等待、throw、yield* 委托、done 完成和多个 runner 的交错推进。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-async04-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-async04-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-async04-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            caller next(value) ↔ generator yield → iterator result
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 4: Generators · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>调用者</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>next / throw 送入消息</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>等待迭代器结果</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-async04-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "throw" || mode === "delegate" ? C.warning : C.elevated} fillOpacity={mode === "throw" || mode === "delegate" ? 0.1 : 1} stroke={mode === "throw" || mode === "delegate" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "throw" || mode === "delegate" ? C.warning : C.accent}>生成器状态</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>yield 保存暂停点</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>每个 runner 独立持有状态</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "values" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "values" ? "url(#ydk-async04-success-arrow)" : "url(#ydk-async04-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "values" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "values" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "values" ? C.success : C.warning}>迭代结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>记录首个暂停偏离</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={`stage-${stage[0]}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="220" width="840" height="110" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.1 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <text x="52" y="248" fontSize="13" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="276" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="304" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把暂停状态与异步工作分开记录" : isActive ? "当前阶段：按双向消息推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-async04-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 52 + index * 148 + 104;
            const x2 = 52 + (index + 1) * 148 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="386"
                x2={x2}
                y2="386"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-async04-success-arrow)" : "url(#ydk-async04-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 52 + index * 148;
            const isActive = index === activeIndex;
            const isBoundary = index === faultIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="402" width="104" height="112" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="426" r="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="430" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 64} y="430" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 52} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 52} y="484" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "iterator" : index === 1 ? "resume" : index === 2 ? "pause" : index === 3 ? "await" : index === 4 ? "send" : "delegate"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看暂停点，再看异步恢复</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 next 会恢复到哪里、yield 会交出什么、异步结果如何送回，再推进时间线验证。"
          reset={{ label: "重置实验", ariaLabel: "重置生成器双向消息实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        生成器把执行权拆成暂停点；执行器可以把 Promise 恢复成顺序代码，但每个 next、throw 和委托边界都必须可追踪。
      </figcaption>
    </figure>
  );
}
