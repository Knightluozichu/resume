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
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "bind", caption: "在外层作用域创建被回调继续使用的绑定" },
  { label: "capture", caption: "函数定义时记录自由变量与词法环境" },
  { label: "escape", caption: "把函数传出原作用域，保留环境引用" },
  { label: "retain", caption: "外层调用栈结束，闭包仍持有私有状态" },
  { label: "invoke", caption: "再次执行函数并解析当下的自由变量" },
  { label: "publish", caption: "模块只公开方法，约束状态的访问边界" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 创建外层绑定",
    "counter 的 value 由外层调用创建，后续函数将继续引用这份状态。",
    "输出：binding owner + initial value",
  ],
  [
    "2 · 捕获词法环境",
    "函数定义时保留对 value 的词法引用；自由变量不靠调用位置猜测。",
    "输出：free variable + lexical environment",
  ],
  [
    "3 · 函数离开作用域",
    "return 把函数交给外部，函数值带着环境引用一起离开原调用帧。",
    "输出：escaped function + retained environment",
  ],
  [
    "4 · 外层栈帧结束",
    "外层函数返回并不等于 value 被清除；仍被闭包引用的环境保持可达。",
    "输出：stack ended + state still reachable",
  ],
  [
    "5 · 回调再次执行",
    "调用 next 时重新解析 value，闭包读到的是同一份私有绑定并更新它。",
    "输出：shared binding + next state",
  ],
  [
    "6 · 公开最小 API",
    "模块模式只返回必要方法，外部不能直接改写 value，却能通过方法观察变化。",
    "输出：public method + private state",
  ],
] as const;

type Mode = "closure" | "loop-var" | "loop-let" | "module";

export function YdkScope05ScopeClosuresLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("closure");

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
  const loopVar = mode === "loop-var";
  const loopLet = mode === "loop-let";
  const moduleMode = mode === "module";
  const modeLabel = {
    closure: "普通闭包",
    "loop-var": "循环 var 共享绑定",
    "loop-let": "循环 let 独立绑定",
    module: "模块模式",
  }[mode];

  function reset() {
    timeline.goToStep(0);
    setMode("closure");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-scope-05-scope-closures"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Scope 05
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              闭包怎样把词法环境带到作用域之外
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择普通闭包、循环绑定或模块模式，逐步观察外层栈结束后状态为何仍可被安全访问。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">闭包样本</span>
          <select
            aria-label="选择闭包与循环绑定样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="closure">普通闭包 · 保留私有状态</option>
            <option value="loop-var">循环 var · 回调共享最终绑定</option>
            <option value="loop-let">循环 let · 每轮独立绑定</option>
            <option value="module">模块模式 · 只公开方法</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 作用域闭包第5章专属教学时间线：覆盖 Chapter 5: Scope Closures、Enlightenment、Nitty Gritty、Now I Can See、Loops + Closure、Modules。展示外层绑定、词法环境、函数逃逸、调用栈结束、自由变量解析、循环绑定与模块公开 API。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-closure-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-closure-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            outer binding → lexical environment → escaped function → private API
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 5: Scope Closures · Loops + Closure · Modules · 当前：{modeLabel}
          </text>

          <rect x="30" y="78" width="840" height="150" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="12" fontWeight="700" fill={loopVar ? C.danger : C.accent}>
            环境合同：{loopVar ? "共享绑定导致回调看到同一个最终值" : "函数值携带词法环境，不依赖调用位置"}
          </text>

          <rect x="52" y="124" width="364" height="82" rx="10" fill={loopVar ? C.danger : C.accent} fillOpacity="0.1" stroke={loopVar ? C.danger : C.accent} strokeWidth="1.5" />
          <text x="72" y="150" fontSize="12" fontWeight="700" fill={loopVar ? C.danger : C.accent}>
            {loopVar ? "var · one shared binding" : moduleMode ? "module · private state" : "closure · retained environment"}
          </text>
          <text x="72" y="176" fontSize="12" fill={C.primary}>
            {loopVar ? "callbacks resolve the same loop binding" : loopLet ? "let · one binding per iteration" : "free variable resolves lexically"}
          </text>
          <text x="72" y="196" fontSize="11" fill={C.secondary}>
            {moduleMode ? "public methods only · state remains hidden" : loopVar ? "first divergence = callback reads final value" : "stack ended · environment remains reachable"}
          </text>

          <line x1="432" y1="166" x2="500" y2="166" stroke={loopVar ? C.danger : C.border} strokeWidth={loopVar ? 3 : 2} markerEnd={loopVar ? "url(#ydk-closure-fault-arrow)" : "url(#ydk-closure-arrow)"} />
          <rect x="520" y="124" width="328" height="82" rx="10" fill={loopVar ? C.danger : C.success} fillOpacity="0.1" stroke={loopVar ? C.danger : C.success} strokeWidth="1.5" />
          <text x="684" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={loopVar ? C.danger : C.success}>
            {loopVar ? "shared result" : moduleMode ? "minimal public API" : "closure passed"}
          </text>
          <text x="684" y="176" textAnchor="middle" fontSize="12" fill={C.primary}>
            {loopVar ? "all callbacks observe the final index" : loopLet ? "each callback keeps its own index" : "next() reads and updates value"}
          </text>
          <text x="684" y="196" textAnchor="middle" fontSize="11" fill={C.secondary}>
            {loopVar ? "fix: choose a fresh binding per iteration" : "free variables remain traceable"}
          </text>

          {STAGE_COPY.map((stage, index) => {
            const selected = index === activeIndex;
            const failed = loopVar && index >= 4;
            const tone = failed ? C.danger : selected ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={stage[0]}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="250" width="840" height="146" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.1 : 1} stroke={tone} strokeWidth={selected || failed ? 2.5 : 1.5} />
                <text x="52" y="280" fontSize="13" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="310" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="340" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="374" fontSize="11" fill={failed ? C.danger : C.secondary}>
                  {failed ? "故障注入：多个回调共享同一 var 绑定，记录 first divergence 并切换为 let" : index === 5 && moduleMode ? "模块交接：方法公开，value 仍由闭包私有持有" : loopLet && index === 4 ? "每轮 let 创建独立绑定，回调按各自环境解析索引" : "当前阶段输出可被下一阶段消费"}
                </text>
              </g>
            );
          })}

          {loopVar && activeIndex >= 4 && (
            <g>
              <path d="M 790 232 C 750 262, 710 294, 668 328" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#ydk-closure-fault-arrow)" />
              <rect x="182" y="408" width="536" height="30" rx="8" fill={C.danger} fillOpacity="0.12" stroke={C.danger} strokeWidth="1.5" />
              <text x="200" y="428" fontSize="11" fontWeight="700" fill={C.danger}>循环故障：var 只有一份共享绑定；改用 let 或工厂函数建立独立环境</text>
            </g>
          )}

          <line x1="76" y1="466" x2="824" y2="466" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-closure-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return <line key={`connector-${step.label}`} x1={x1} y1="466" x2={x2} y2="466" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#ydk-closure-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const selected = index === activeIndex;
            const failed = loopVar && index >= 4;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="482" width="110" height="104" rx="12" fill={failed ? C.danger : selected ? C.accent : C.elevated} fillOpacity={failed || selected ? 0.16 : 1} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth={failed || selected ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="506" r="12" fill={failed ? C.danger : selected ? C.accent : C.bg} stroke={failed ? C.danger : selected ? C.accent : C.border} strokeWidth="1.5" />
                <text x={x + 22} y="510" textAnchor="middle" fontSize="11" fill={selected || failed ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 62} y="510" textAnchor="middle" fontSize="11" fontWeight="700" fill={failed ? C.danger : selected ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 55} y="544" textAnchor="middle" fontSize="11" fill={C.secondary}>{failed ? "stop" : selected ? "active" : "ready"}</text>
                <text x={x + 55} y="568" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : "trace"}</text>
              </g>
            );
          })}
          <text x="30" y="614" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测外层调用结束后 value 是否消失，再推进循环绑定和模块 API 样本。"
          reset={{ label: "重置实验", ariaLabel: "重置作用域闭包证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        闭包不是复制一份值，而是保留对词法环境的可达引用；模块模式再用方法边界约束这份私有状态。
      </figcaption>
    </figure>
  );
}
