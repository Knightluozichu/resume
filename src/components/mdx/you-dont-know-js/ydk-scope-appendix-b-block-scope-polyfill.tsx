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
  { label: "detect", caption: "识别 let 或 const 的块级生命周期" },
  { label: "capture", caption: "分析闭包捕获、重赋值和引用位置" },
  { label: "wrap", caption: "用函数包装块，建立旧环境边界" },
  { label: "rewrite", caption: "把块内引用映射到包装函数参数或局部变量" },
  { label: "run", caption: "在旧环境执行变换后的代码" },
  { label: "assert", caption: "比较原生与降级版本的行为证据" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 识别块级声明",
    "先记录 let/const 的创建点、可见范围和离开块的时间，不能只看最终输出。",
    "输出：block binding + lifetime",
  ],
  [
    "2 · 分析捕获与重赋值",
    "检查内部函数是否捕获变量、变量是否被重赋值，以及每个读取点指向哪份绑定。",
    "输出：capture map + assignment events",
  ],
  [
    "3 · 生成函数包装",
    "把块的边界转成 IIFE 或工厂函数边界，让旧环境也能结束临时变量生命周期。",
    "输出：function wrapper + private scope",
  ],
  [
    "4 · 重写引用位置",
    "把块内声明和引用一致地搬进包装函数；漏改一个引用就会改变语义。",
    "输出：binding map + rewritten references",
  ],
  [
    "5 · 执行旧环境版本",
    "在不支持块作用域的环境运行变换结果，记录输出、错误、时序和清理状态。",
    "输出：legacy runtime trace",
  ],
  [
    "6 · 核对行为等价",
    "用同一输入比较原生与降级版本，确认作用域边界、闭包捕获和副作用顺序保持一致。",
    "输出：semantic equivalence report",
  ],
] as const;

type Mode = "polyfill" | "native" | "var-leak" | "transpiler";

export function YdkScopeAppendixBBlockScopePolyfillLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("polyfill");

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
  const varLeak = mode === "var-leak";
  const nativeMode = mode === "native";
  const transpilerMode = mode === "transpiler";
  const modeLabel = {
    polyfill: "显式函数包装",
    native: "原生块作用域",
    "var-leak": "var 泄漏反例",
    transpiler: "转译器输出",
  }[mode];

  function reset() {
    timeline.goToStep(0);
    setMode("polyfill");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-scope-appendix-b-block-scope-polyfill"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Scope Appendix B
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              没有原生块作用域时，怎样保住生命周期语义
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              选择原生、显式包装、转译器或 var 反例，逐步核对降级方案是否保留绑定边界与闭包行为。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">块作用域兼容样本</span>
          <select
            aria-label="选择块作用域降级样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="polyfill">显式函数包装 · IIFE 保边界</option>
            <option value="native">原生块作用域 · let 生命周期</option>
            <option value="var-leak">var 泄漏反例 · 边界丢失</option>
            <option value="transpiler">转译器输出 · 自动重写</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS 块作用域替代方案附录 B 专属教学时间线：覆盖 Appendix B: Polyfilling Block Scope。展示块级声明、代码变换、作用域包装、转译器、引用重写、旧环境执行与语义等价测试。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-polyfill-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-polyfill-fault-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            block binding → function wrapper → rewritten refs → behavior diff
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Appendix B: Polyfilling Block Scope · old environment compatibility · 当前：{modeLabel}
          </text>

          <rect x="30" y="78" width="840" height="150" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="12" fontWeight="700" fill={varLeak ? C.danger : C.accent}>
            兼容合同：{varLeak ? "var 只提供函数级边界，无法自动复刻块级生命周期" : "变换必须同时保住边界、捕获和行为"}
          </text>

          <rect x="52" y="124" width="364" height="82" rx="10" fill={varLeak ? C.danger : C.accent} fillOpacity="0.1" stroke={varLeak ? C.danger : C.accent} strokeWidth="1.5" />
          <text x="72" y="150" fontSize="12" fontWeight="700" fill={varLeak ? C.danger : C.accent}>
            {varLeak ? "var · leaked binding" : nativeMode ? "let · block lifetime" : "IIFE · function boundary"}
          </text>
          <text x="72" y="176" fontSize="12" fill={C.primary}>
            {varLeak ? "name survives after block exit" : transpilerMode ? "tool-generated wrapper + renamed refs" : "temporary name ends at wrapper return"}
          </text>
          <text x="72" y="196" fontSize="11" fill={C.secondary}>
            {varLeak ? "first divergence = outside read is unexpectedly visible" : "capture map must remain stable"}
          </text>

          <line x1="432" y1="166" x2="500" y2="166" stroke={varLeak ? C.danger : C.border} strokeWidth={varLeak ? 3 : 2} markerEnd={varLeak ? "url(#ydk-polyfill-fault-arrow)" : "url(#ydk-polyfill-arrow)"} />
          <rect x="520" y="124" width="328" height="82" rx="10" fill={varLeak ? C.danger : C.success} fillOpacity="0.1" stroke={varLeak ? C.danger : C.success} strokeWidth="1.5" />
          <text x="684" y="150" textAnchor="middle" fontSize="12" fontWeight="700" fill={varLeak ? C.danger : C.success}>
            {varLeak ? "equivalence failed" : nativeMode ? "native result" : "legacy result"}
          </text>
          <text x="684" y="176" textAnchor="middle" fontSize="12" fill={C.primary}>
            {varLeak ? "scope boundary changed" : transpilerMode ? "behavior test required" : "same output + same lifetime"}
          </text>
          <text x="684" y="196" textAnchor="middle" fontSize="11" fill={C.secondary}>
            {varLeak ? "fix: wrap the block or use a trusted transpiler" : "compare errors, order and cleanup"}
          </text>

          {STAGE_COPY.map((stage, index) => {
            const selected = index === activeIndex;
            const failed = varLeak && index >= 3;
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
                  {failed ? "故障注入：引用或边界未同步重写，行为等价测试在这里停止" : index === 5 && transpilerMode ? "转译器交接：工具生成结果仍需用相同输入回归" : "当前阶段输出可被下一阶段消费"}
                </text>
              </g>
            );
          })}

          {varLeak && activeIndex >= 3 && (
            <g>
              <path d="M 790 232 C 750 262, 710 294, 668 328" fill="none" stroke={C.danger} strokeWidth="3" strokeDasharray="8 6" markerEnd="url(#ydk-polyfill-fault-arrow)" />
              <rect x="182" y="408" width="536" height="30" rx="8" fill={C.danger} fillOpacity="0.12" stroke={C.danger} strokeWidth="1.5" />
              <text x="200" y="428" fontSize="11" fontWeight="700" fill={C.danger}>边界故障：var 泄漏让块外读到临时绑定，不能宣称与 let 等价</text>
            </g>
          )}

          <line x1="76" y1="466" x2="824" y2="466" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-polyfill-arrow)" />
          {STEPS.slice(0, -1).map((step, index) => {
            const x1 = 76 + index * 146 + 110;
            const x2 = 76 + (index + 1) * 146 - 12;
            return <line key={`connector-${step.label}`} x1={x1} y1="466" x2={x2} y2="466" stroke={index < activeIndex ? C.success : C.border} strokeWidth={index < activeIndex ? 3 : 1.5} markerEnd="url(#ydk-polyfill-arrow)" />;
          })}
          {STEPS.map((step, index) => {
            const x = 76 + index * 146;
            const selected = index === activeIndex;
            const failed = varLeak && index >= 3;
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
          caption="先预测块外是否能读到临时变量，再推进包装、重写和行为等价测试。"
          reset={{ label: "重置实验", ariaLabel: "重置块作用域替代方案证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        兼容方案的核心不是把 let 机械替换成 var，而是把块的生命周期、闭包捕获和行为契约一起保留下来。
      </figcaption>
    </figure>
  );
}
