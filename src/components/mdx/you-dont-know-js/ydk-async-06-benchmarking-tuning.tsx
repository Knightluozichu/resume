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
  { label: "question", caption: "提出可证伪的性能问题与成功标准" },
  { label: "freeze", caption: "固定运行时、输入、热身与采样协议" },
  { label: "warmup", caption: "预热 JIT、缓存和数据结构后再采样" },
  { label: "alternate", caption: "交替运行多个样本，减少顺序偏差" },
  { label: "distribution", caption: "比较中位数、p95、离群点与置信范围" },
  { label: "reality", caption: "回到真实负载验证端到端收益" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 提出可证伪性能问题",
    "把“更快”改写为可测量的问题：哪个输入、哪个指标、改善多少、付出什么代价。",
    "输出：testable claim",
  ],
  [
    "2 · 固定环境与输入",
    "锁定引擎、设备、输入分布、数据布局和采样边界，避免把环境差异当成优化。",
    "输出：frozen protocol",
  ],
  [
    "3 · 预热 JIT 和缓存",
    "先让代码和数据结构进入稳定运行阶段，再区分启动、编译与稳态成本。",
    "输出：warm samples",
  ],
  [
    "4 · 交替运行多个样本",
    "让候选实现按交替顺序运行，降低温度、频率、垃圾回收和时间漂移带来的偏差。",
    "输出：paired runs",
  ],
  [
    "5 · 比较分布而非单次值",
    "观察中位数、p95、离群点和波动范围；单次最小值不是稳定收益的证明。",
    "输出：distribution evidence",
  ],
  [
    "6 · 回到真实负载验证收益",
    "把微基准的变化放回真实请求、渲染或任务队列，检查端到端收益是否仍存在。",
    "输出：production decision",
  ],
] as const;

type Mode = "naive" | "warmed" | "alternating" | "realistic" | "tco";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  naive: {
    title: "单次直觉基准",
    input: "run(candidate) once",
    state: "cold start + unknown context",
    result: "not enough evidence",
    detail: "单次最小值可能只是编译、频率或垃圾回收时机的偶然结果。",
  },
  warmed: {
    title: "预热后采样",
    input: "warmup → sample N times",
    state: "JIT + cache stabilized",
    result: "steady-state sample",
    detail: "预热隔离启动成本，但仍需要交替运行和分布统计。",
  },
  alternating: {
    title: "交替样本",
    input: "A → B → A → B",
    state: "paired order control",
    result: "less order bias",
    detail: "候选实现共享相近的环境时间片，比较更接近配对实验。",
  },
  realistic: {
    title: "真实负载",
    input: "request + render + queue",
    state: "end-to-end context",
    result: "production decision",
    detail: "微基准的收益只有在真实输入、调度和资源成本中仍成立才值得采用。",
  },
  tco: {
    title: "尾调用优化边界",
    input: "tailCall() → return tailCall()",
    state: "engine-dependent semantics",
    result: "feature detection required",
    detail: "不能假设所有 JavaScript 引擎都实现规范中的尾调用优化。",
  },
};

export function YdkAsync06BenchmarkingTuningLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("naive");

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
  const faultIndex = mode === "naive" ? 0 : mode === "tco" ? 5 : 4;

  function reset() {
    timeline.goToStep(0);
    setMode("naive");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-async-06-benchmarking-tuning"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Async · Chapter 6
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              基准的可信度：从一次数字到一条证据链
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换冷启动、预热、交替样本、真实负载和尾调用边界，沿六阶段观察如何把“更快”变成可复核的决策。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择基准样本</span>
          <select
            aria-label="选择单次直觉基准、预热后采样、交替样本、真实负载或尾调用优化边界"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="naive">单次直觉基准 · cold start</option>
            <option value="warmed">预热后采样 · steady state</option>
            <option value="alternating">交替样本 · paired order</option>
            <option value="realistic">真实负载 · end to end</option>
            <option value="tco">尾调用边界 · engine dependent</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Async Chapter 6 专属教学时间线，覆盖 Chapter 6: Benchmarking & Tuning、Benchmarking、Context Is King、jsPerf.com、Writing Good Tests、Microperformance、Tail Call Optimization (TCO)。展示可证伪问题、固定环境、预热、交替运行、分布统计和真实负载验证，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-async06-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-async06-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-async06-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            question → freeze → warmup → alternate → distribution → reality
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 6: Benchmarking &amp; Tuning · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>实验问题</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>输入 / 环境 / 指标</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>先写成功标准</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-async06-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "naive" || mode === "tco" ? C.warning : C.elevated} fillOpacity={mode === "naive" || mode === "tco" ? 0.1 : 1} stroke={mode === "naive" || mode === "tco" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "naive" || mode === "tco" ? C.warning : C.accent}>运行上下文</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>采样：重复 + 交替</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>结果：{selected.result}</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "realistic" || mode === "alternating" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "realistic" || mode === "alternating" ? "url(#ydk-async06-success-arrow)" : "url(#ydk-async06-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "realistic" || mode === "alternating" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "realistic" || mode === "alternating" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "realistic" || mode === "alternating" ? C.success : C.warning}>决策证据</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>记录离群与上下文</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把偶然波动与稳定收益分开" : isActive ? "当前阶段：按统计证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-async06-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-async06-success-arrow)" : "url(#ydk-async06-arrow)"}
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
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "claim" : index === 1 ? "freeze" : index === 2 ? "warm" : index === 3 ? "pair" : index === 4 ? "p95" : "real"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看分布，再做优化决策</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测冷启动、顺序偏差和离群点会如何影响结论，再推进时间线验证。"
          reset={{ label: "重置实验", ariaLabel: "重置性能测试与调优证据链实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可信基准是一条协议：问题可证伪、环境可复现、样本有分布，最后还要回到真实负载确认收益。
      </figcaption>
    </figure>
  );
}
