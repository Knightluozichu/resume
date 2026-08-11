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
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "observe", caption: "先确定被观察的语言操作" },
  { label: "symbol", caption: "用知名 Symbol 接入协议" },
  { label: "trap", caption: "让 Proxy 捕获对应内部方法" },
  { label: "reflect", caption: "用 Reflect 转发默认语义" },
  { label: "invariant", caption: "检查代理不变量和接收者" },
  { label: "feature", caption: "检测能力并保留撤销与性能边界" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 观察操作",
    "先问代码想观察 get、set、调用、迭代还是构造，而不是先写一个万能代理。",
    "证据：operation + receiver",
  ],
  [
    "2 · 协议入口",
    "Function Names 与 Meta Properties 提供上下文，知名 Symbol 则把对象接入语言协议。",
    "证据：name + symbol hook",
  ],
  [
    "3 · Proxy 捕获",
    "Proxy 拦截内部方法并收到目标、键、值和接收者；处理器决定是否改变路径。",
    "证据：trap + target",
  ],
  [
    "4 · Reflect 转发",
    "Reflect API 与内部操作对齐，用 receiver 转发默认语义，避免手写 obj[key] 偷换 this。",
    "证据：Reflect + receiver",
  ],
  [
    "5 · 不变量检查",
    "处理器不能任意违背目标对象的约束；不可配置属性、原型和返回类型都要回归。",
    "证据：invariant + result",
  ],
  [
    "6 · 能力边界",
    "Feature Testing 先探测可用能力；Tail Call Optimization (TCO) 等运行时特性不能靠语法猜测。",
    "证据：feature + fallback",
  ],
] as const;

type Mode = "get" | "set" | "iterate" | "call";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  get: {
    title: "读取拦截",
    input: "proxy.value",
    state: "get(target, key, receiver)",
    result: "Reflect.get",
    detail: "通过 receiver 保留 getter 的接收者语义，再决定是否记录或拒绝读取。",
  },
  set: {
    title: "写入拦截",
    input: "proxy.value = next",
    state: "set(target, key, value, receiver)",
    result: "true / false",
    detail: "set trap 的布尔结果影响严格模式行为；成功返回和目标不变量必须同时成立。",
  },
  iterate: {
    title: "迭代协议",
    input: "for (const item of proxy)",
    state: "Symbol.iterator",
    result: "next() sequence",
    detail: "知名 Symbol 接入语言协议；代理可以观察入口，但不能伪造错误的迭代器契约。",
  },
  call: {
    title: "调用边界",
    input: "proxy(...args)",
    state: "apply(target, thisArg, args)",
    result: "return / throw",
    detail: "调用代理要保留 this、参数和异常边界；撤销后应停止进入目标函数。",
  },
};

export function YdkEs607MetaProgrammingLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("get");

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
  const boundaryIndex = mode === "get" ? 3 : mode === "set" ? 4 : mode === "iterate" ? 1 : 5;

  function reset() {
    timeline.goToStep(0);
    setMode("get");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-es6-07-meta-programming"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · ES6 &amp; Beyond · Chapter 7
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              元编程：观察、转发，再守住不变量
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换 get、set、迭代和调用样本，沿时间线观察知名 Symbol、Proxy 与 Reflect 如何共同改变语言级操作的入口与出口。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择内部操作样本</span>
          <select
            aria-label="选择 Proxy get、set、知名 Symbol 迭代或 apply 调用样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="get">Proxy · get + Reflect.get</option>
            <option value="set">Proxy · set + invariant</option>
            <option value="iterate">Well Known Symbols · iterator</option>
            <option value="call">Proxy · apply + revoke</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 650"
          role="img"
          aria-label="You Don't Know JS ES6 & Beyond Chapter 7 专属元编程时间线，覆盖 Chapter 7: Meta Programming、Function Names、Meta Properties、Well Known Symbols、Proxies、Reflect API、Feature Testing、Tail Call Optimization (TCO)。展示语言操作、知名 Symbol、Proxy trap、Reflect 转发、代理不变量、撤销和特性检测，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-es607-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-es607-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-es607-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="650" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            operation → protocol → trap → Reflect → invariant → feature
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 7: Meta Programming · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="124" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>操作入口</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>先预测 receiver 与返回值</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>再观察协议和撤销</text>

          <line x1="294" y1="140" x2="326" y2="140" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-es607-success-arrow)" />

          <rect x="336" y="78" width="252" height="124" rx="12" fill={mode === "set" || mode === "call" ? C.warning : C.elevated} fillOpacity={mode === "set" || mode === "call" ? 0.1 : 1} stroke={mode === "set" || mode === "call" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "set" || mode === "call" ? C.warning : C.accent}>处理器状态</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>证据：target、receiver、result</text>

          <line x1="600" y1="140" x2="632" y2="140" stroke={mode === "set" || mode === "call" ? C.warning : C.success} strokeWidth="2.5" markerEnd={mode === "set" || mode === "call" ? "url(#ydk-es607-warning-arrow)" : "url(#ydk-es607-success-arrow)"} />

          <rect x="642" y="78" width="228" height="124" rx="12" fill={mode === "set" || mode === "call" ? C.warning : C.success} fillOpacity="0.1" stroke={mode === "set" || mode === "call" ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "set" || mode === "call" ? C.warning : C.success}>观察结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>默认语义必须可回放</text>

          {STAGE_COPY.map((stage, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === boundaryIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : index === 5 ? C.success : C.border;
            return (
              <g
                key={`stage-${stage[0]}`}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="222" width="840" height="106" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.1 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <text x="52" y="250" fontSize="13" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{stage[0]}</text>
                <text x="52" y="278" fontSize="12" fill={C.primary}>{stage[1]}</text>
                <text x="52" y="306" fontSize="12" fill={C.primary}>{stage[2]}</text>
                <text x="52" y="322" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把转发、返回和撤销分开记录" : isActive ? "当前阶段：沿内部操作证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="382" x2="848" y2="382" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-es607-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 52 + index * 148 + 104;
            const x2 = 52 + (index + 1) * 148 - 12;
            return (
              <line
                key={`connector-${step.label}`}
                x1={x1}
                y1="382"
                x2={x2}
                y2="382"
                stroke={index < activeIndex ? C.success : C.border}
                strokeWidth={index < activeIndex ? 3 : 1.5}
                markerEnd={index < activeIndex ? "url(#ydk-es607-success-arrow)" : "url(#ydk-es607-arrow)"}
              />
            );
          })}
          {STEPS.map((step, index) => {
            const x = 52 + index * 148;
            const isActive = index === activeIndex;
            const isBoundary = index === boundaryIndex;
            const tone = isBoundary ? C.warning : isActive ? C.accent : C.border;
            return (
              <g key={`step-${step.label}`}>
                <rect x={x} y="398" width="104" height="116" rx="12" fill={isBoundary ? C.warning : isActive ? C.accent : C.elevated} fillOpacity={isBoundary || isActive ? 0.16 : 1} stroke={tone} strokeWidth={isBoundary || isActive ? 2.5 : 1.5} />
                <circle cx={x + 22} cy="422" r="12" fill={isBoundary || isActive ? tone : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="426" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 64} y="426" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 52} y="454" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 52} y="480" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 52} y="502" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "observe" : index === 1 ? "symbol" : index === 2 ? "trap" : index === 3 ? "forward" : index === 4 ? "guard" : "detect"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先保留默认语义，再改变它</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测内部操作的 receiver、返回值和撤销边界，再推进时间线验证 Proxy 如何捕获、Reflect 如何转发。"
          reset={{ label: "重置实验", ariaLabel: "重置元编程实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        元编程的力量来自能改变入口，但可靠性来自保留默认语义、验证不变量并测试能力边界。
      </figcaption>
    </figure>
  );
}
