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
  { label: "create", caption: "创建 pending 状态，保存未来结果的承诺" },
  { label: "adopt", caption: "识别值、Promise 或 thenable 并完成同化" },
  { label: "settle", caption: "沿 fulfilled 或 rejected 只结算一次" },
  { label: "queue", caption: "把 then、catch 和 finally 处理器排入微任务" },
  { label: "chain", caption: "吸收处理器返回值并建立下一段链" },
  { label: "recover", caption: "让错误沿链传播，并在明确边界恢复" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 创建待定 Promise",
    "Promise 先保存 pending 承诺；它把未来结果与当前调用分离，但不会制造额外的取消协议。",
    "输出：pending state",
  ],
  [
    "2 · 同化输入值",
    "输入可能是普通值、Promise 或带有 then 方法的 thenable；解析过程必须防止多次完成。",
    "输出：adopted resolution",
  ],
  [
    "3 · 以兑现或拒绝只结算一次",
    "状态从 pending 进入 fulfilled 或 rejected 后锁定；后来的 resolve 或 reject 不再改变它。",
    "输出：settled state",
  ],
  [
    "4 · 把处理器排入微任务",
    "then、catch 和 finally 不会同步调用处理器；它们在状态可用后进入微任务检查点。",
    "输出：queued reaction",
  ],
  [
    "5 · 吸收处理器返回值或异常",
    "处理器返回普通值、Promise 或抛出异常时，下一段链分别采用、等待或拒绝。",
    "输出：next promise",
  ],
  [
    "6 · 沿链传播最终结果",
    "错误默认沿链向后传播，直到 catch 处理；恢复应是明确的状态转换，不是静默吞错。",
    "输出：handled or unhandled",
  ],
] as const;

type Mode = "value" | "thenable" | "reject" | "chain" | "limits";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  value: {
    title: "普通值兑现",
    input: "Promise.resolve(2)",
    state: "pending → fulfilled",
    result: "then(value * 3) → 6",
    detail: "值直接成为 fulfilled 结果，处理器仍异步排队。",
  },
  thenable: {
    title: "thenable 同化",
    input: "{ then(resolve) { resolve(2) } }",
    state: "pending → adopt → fulfilled",
    result: "foreign then → trusted state",
    detail: "有 then 方法不等于原生 Promise；同化过程要防多次调用和自解析。",
  },
  reject: {
    title: "拒绝传播",
    input: "Promise.reject(error)",
    state: "pending → rejected",
    result: "then skipped → catch handles",
    detail: "拒绝沿链传播，直到 catch 或边界明确处理它。",
  },
  chain: {
    title: "链式返回",
    input: "then(() => Promise.resolve(next))",
    state: "handler → adopt returned promise",
    result: "outer waits for inner",
    detail: "处理器返回 Promise 时，下一段链吸收它的最终状态。",
  },
  limits: {
    title: "Promise 限制",
    input: "Promise.all(tasks)",
    state: "aggregate → policy required",
    result: "cancel / progress = separate design",
    detail: "Promise 解决状态传播，不自动提供取消、进度或并发上限。",
  },
};

export function YdkAsync03PromisesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("value");

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
  const faultIndex = mode === "thenable" ? 1 : mode === "reject" ? 5 : mode === "chain" ? 4 : mode === "limits" ? 3 : -1;

  function reset() {
    timeline.goToStep(0);
    setMode("value");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-async-03-promises"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Async · Chapter 3
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              Promise 的承诺：状态只结算一次，链条继续流动
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换普通值、thenable、拒绝、链式返回和 Promise 限制样本，沿六步观察状态同化、微任务与错误传播。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择 Promise 状态样本</span>
          <select
            aria-label="选择普通值兑现、thenable 同化、拒绝传播、链式返回或 Promise 限制样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="value">普通值 · pending → fulfilled</option>
            <option value="thenable">thenable · adopt → fulfilled</option>
            <option value="reject">拒绝 · rejected → catch</option>
            <option value="chain">链式返回 · outer waits</option>
            <option value="limits">Promise 限制 · policy required</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Async Chapter 3 专属教学时间线，覆盖 Chapter 3: Promises、What is a Promise?、Thenable Duck-Typing、Promise Trust、Chain Flow、Error Handling、Promise Patterns、Promise API Recap、Promise Limitations。展示 pending、thenable 同化、fulfilled、rejected、微任务处理器、链式返回和错误恢复。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-async03-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-async03-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-async03-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            pending → resolution → settled state → reaction chain
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 3: Promises · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入与承诺</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>先进入 pending</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>值、Promise、thenable 分流</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-async03-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "thenable" ? C.warning : C.elevated} fillOpacity={mode === "thenable" ? 0.1 : 1} stroke={mode === "thenable" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "thenable" ? C.warning : C.accent}>状态解析</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>同化过程只允许一次完成</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>处理器等待微任务</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "value" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "value" ? "url(#ydk-async03-success-arrow)" : "url(#ydk-async03-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "value" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "value" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "value" ? C.success : C.warning}>链式结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>记录首个状态偏离</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把状态变化与处理器执行分开" : isActive ? "当前阶段：按状态证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-async03-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-async03-success-arrow)" : "url(#ydk-async03-arrow)"}
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
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "pending" : index === 1 ? "adopt" : index === 2 ? "settle" : index === 3 ? "job" : index === 4 ? "chain" : "catch"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看状态，再看链条</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测 Promise 的状态、处理器入队点和错误消费方，再推进时间线验证。"
          reset={{ label: "重置实验", ariaLabel: "重置 Promise 状态证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Promise 把未来值的状态传播标准化，但取消、进度与并发策略仍要由应用层明确设计。
      </figcaption>
    </figure>
  );
}
