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
  { label: "profile", caption: "定位主线程热点与可接受的响应预算" },
  { label: "partition", caption: "划分可独立计算的数据与结果契约" },
  { label: "message", caption: "序列化或转移数据，明确传输成本" },
  { label: "worker", caption: "让 Worker 或专用执行路径处理计算" },
  { label: "merge", caption: "校验返回结果并合并到主线程状态" },
  { label: "benchmark", caption: "在固定输入与现代基线下复测收益" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 定位主线程热点",
    "先测量长任务、输入规模和响应预算，再决定是否值得迁移计算。",
    "输出：hotspot trace",
  ],
  [
    "2 · 划分可独立计算的数据",
    "把纯计算、输入快照和返回结果分开，避免把 DOM 或共享可变状态带进 Worker。",
    "输出：work contract",
  ],
  [
    "3 · 序列化消息给 Worker",
    "结构化克隆适合普通数据，transferable 可以转移所有权；两者都要计入传输成本。",
    "输出：message boundary",
  ],
  [
    "4 · Worker 并行执行",
    "Worker 拥有独立全局环境，计算不会直接阻塞主线程，但启动与调度也有固定开销。",
    "输出：isolated compute",
  ],
  [
    "5 · 返回结果并合并",
    "主线程校验请求 id、版本和结果形状，再把可信结果提交给界面状态。",
    "输出：validated result",
  ],
  [
    "6 · 以现代基线复测历史优化",
    "固定输入、浏览器、引擎与热身策略，比较总时延、p95 响应和内存，而不是只看一次数字。",
    "输出：repeatable evidence",
  ],
] as const;

type Mode = "main" | "worker" | "simd" | "asmjs" | "wasm";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  main: {
    title: "主线程基线",
    input: "largeArray.reduce(cpuHeavyFn)",
    state: "UI thread · long task",
    result: "responsive budget at risk",
    detail: "先建立同一输入下的基线，再讨论迁移是否值得。",
  },
  worker: {
    title: "Web Worker",
    input: "postMessage(snapshot)",
    state: "main thread ↔ isolated worker",
    result: "message + compute + merge",
    detail: "消息边界隔离执行，但结构化克隆和启动开销必须测量。",
  },
  simd: {
    title: "历史 SIMD 路径",
    input: "SIMD.float32x4.load(data)",
    state: "proposal-era vector lanes",
    result: "not a current JS API",
    detail: "SIMD.js 曾是提案；今天应把向量化基线迁移到 WebAssembly SIMD 语境。",
  },
  asmjs: {
    title: "asm.js 历史基线",
    input: "asmModule(stdlib, foreign, heap)",
    state: "typed subset + ahead-of-time hints",
    result: "portable optimization contract",
    detail: "asm.js 是可移植的优化约定，不应当作今天浏览器的独立部署 API。",
  },
  wasm: {
    title: "现代 WebAssembly",
    input: "WebAssembly.instantiate(bytes)",
    state: "module + linear memory",
    result: "explicit current baseline",
    detail: "用固定版本、模块大小和内存访问记录现代替代路径，再与 Worker 策略组合。",
  },
};

export function YdkAsync05ProgramPerformanceLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("main");

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
  const faultIndex =
    mode === "main" ? 0 : mode === "worker" ? 2 : mode === "simd" ? 5 : 3;

  function reset() {
    timeline.goToStep(0);
    setMode("main");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-async-05-program-performance"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Async · Chapter 5
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              程序性能的证据链：热点、边界与现代基线
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换主线程、Worker、历史 SIMD、asm.js 和现代 WebAssembly 样本，沿六阶段观察计算收益与传输成本如何同时进入验收。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择性能路径</span>
          <select
            aria-label="选择主线程基线、Web Worker、历史 SIMD、asm.js 或现代 WebAssembly 性能路径"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="main">主线程基线 · long task</option>
            <option value="worker">Web Worker · message boundary</option>
            <option value="simd">历史 SIMD · proposal-era</option>
            <option value="asmjs">asm.js · typed subset</option>
            <option value="wasm">WebAssembly · current baseline</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Async Chapter 5 专属教学时间线，覆盖 Chapter 5: Program Performance、Web Workers、SIMD、asm.js。展示主线程热点、数据划分、消息序列化、Worker 隔离执行、结果合并和现代基线复测，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-async05-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-async05-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-async05-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            profile → partition → message → compute → merge → benchmark
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 5: Program Performance · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>主线程</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>输入快照 / 请求 id</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>响应预算：先测再迁移</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-async05-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "main" || mode === "simd" ? C.warning : C.elevated} fillOpacity={mode === "main" || mode === "simd" ? 0.1 : 1} stroke={mode === "main" || mode === "simd" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "main" || mode === "simd" ? C.warning : C.accent}>执行路径</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>边界：传输与启动开销</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>状态：{selected.result}</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "worker" || mode === "wasm" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "worker" || mode === "wasm" ? "url(#ydk-async05-success-arrow)" : "url(#ydk-async05-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "worker" || mode === "wasm" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "worker" || mode === "wasm" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "worker" || mode === "wasm" ? C.success : C.warning}>验收结果</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>记录首个性能偏离</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把工作量与传输成本分开" : isActive ? "当前阶段：按证据链推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-async05-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-async05-success-arrow)" : "url(#ydk-async05-arrow)"}
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
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "hotspot" : index === 1 ? "contract" : index === 2 ? "transfer" : index === 3 ? "isolate" : index === 4 ? "validate" : "repeat"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先看热点，再看迁移收益</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测迁移哪一段会改善响应、哪一段会增加传输成本，再推进时间线验证。"
          reset={{ label: "重置实验", ariaLabel: "重置程序性能证据链实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        性能不是一次数字：先定位热点，再分离工作与传输，最后在固定现代基线下复测响应、时延和资源成本。
      </figcaption>
    </figure>
  );
}
