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
  { label: "baseline", caption: "先固定语言语义，再讨论环境扩展" },
  { label: "host", caption: "识别浏览器、Node 或运行器提供的对象" },
  { label: "polyfill", caption: "检查补丁是否改变了能力与身份" },
  { label: "realm", caption: "把跨 realm 的身份判断从 instanceof 假设中拆出" },
  { label: "feature", caption: "用行为测试能力，而不是猜版本或名称" },
  { label: "prototype", caption: "隔离原生原型修改并恢复干净边界" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 锁定 ECMAScript 基线",
    "先写出语言规范保证的行为，再把宿主 API 和第三方补丁列为外部变量。",
    "输出：language contract",
  ],
  [
    "2 · 识别宿主提供的对象",
    "浏览器、Node 与测试运行器可以提供不同全局对象；它们不是 ECMAScript 核心本身。",
    "输出：host capability map",
  ],
  [
    "3 · 检查 polyfill 注入",
    "polyfill 可能补足旧环境能力，但也会改变属性存在性、方法行为和调试路径。",
    "输出：patch evidence",
  ],
  [
    "4 · 避免跨 realm 的 instanceof 假设",
    "不同 realm 各自拥有构造器身份；对象看起来同类，不代表共享同一个原型链。",
    "输出：identity boundary",
  ],
  [
    "5 · 用行为做特性检测",
    "真正调用需要的能力并检查结果，才能知道当前环境是否满足代码契约。",
    "输出：behavior evidence",
  ],
  [
    "6 · 隔离原生原型修改",
    "把原型补丁限制在明确边界，记录来源并在测试结束时恢复，避免污染其他模块。",
    "输出：clean environment",
  ],
] as const;

type Mode = "baseline" | "host" | "polyfill" | "realm" | "prototype";

type ModeInfo = {
  title: string;
  input: string;
  contract: string;
  evidence: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  baseline: {
    title: "语言基线",
    input: "Promise.resolve(1)",
    contract: "ECMAScript behavior",
    evidence: "标准语义先于宿主 API",
    detail: "先锁定规范保证的结果，再把环境差异单独列账。",
  },
  host: {
    title: "宿主能力",
    input: "globalThis.fetch",
    contract: "host-provided capability",
    evidence: "存在不等于语义完全相同",
    detail: "宿主可以提供额外对象，但它们需要独立的兼容性契约。",
  },
  polyfill: {
    title: "polyfill 注入",
    input: "Array.prototype.includes",
    contract: "patched capability",
    evidence: "记录补丁来源与加载顺序",
    detail: "补丁可以补能力，也可以引入自己的边界和副作用。",
  },
  realm: {
    title: "跨 realm 身份",
    input: "iframe.contentWindow.Array",
    contract: "object identity boundary",
    evidence: "instanceof 依赖构造器身份",
    detail: "跨 realm 对象应优先做行为或标签检测，不要假设共享构造器。",
  },
  prototype: {
    title: "原型隔离",
    input: "Array.prototype.customFlag",
    contract: "isolated patch scope",
    evidence: "可撤销、可追踪、可恢复",
    detail: "原生原型修改应有明确所有权，否则会让无关模块看到隐藏状态。",
  },
};

export function YdkTypesAppendixAMixedEnvironmentLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("baseline");

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
    mode === "host"
      ? 1
      : mode === "polyfill"
        ? 2
        : mode === "realm"
          ? 3
          : mode === "prototype"
            ? 5
            : -1;

  function reset() {
    timeline.goToStep(0);
    setMode("baseline");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-types-appendix-a-mixed-environment"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · Types · Appendix A
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              混合环境的边界：先锁定语义，再验证能力
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换宿主、polyfill、跨 realm 和原型补丁样本，沿六步时间线观察哪些证据属于语言、哪些证据来自环境。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择环境边界样本</span>
          <select
            aria-label="选择语言基线、宿主能力、polyfill、跨 realm 或原型隔离样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="baseline">语言基线 · ECMAScript behavior</option>
            <option value="host">宿主能力 · globalThis.fetch</option>
            <option value="polyfill">polyfill 注入 · includes</option>
            <option value="realm">跨 realm 身份 · iframe Array</option>
            <option value="prototype">原型隔离 · customFlag</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS Types Appendix A 专属教学时间线，覆盖 Appendix A: Mixed Environment JavaScript。展示 ECMAScript 语言基线、宿主对象、polyfill 注入、跨 realm 身份、行为特性检测和原生原型隔离。支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-types21-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-types21-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-types21-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            language contract → environment evidence → behavior check
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Appendix A: Mixed Environment JavaScript · {selected.title} · 当前样本：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>语言基线</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>{selected.contract}</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>先写规范，再写假设</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-types21-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "baseline" ? C.elevated : C.warning} fillOpacity={mode === "baseline" ? 1 : 0.1} stroke={mode === "baseline" ? C.border : C.warning} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "baseline" ? C.accent : C.warning}>环境证据</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.evidence}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>对象存在不等于契约完整</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>身份边界必须单独记录</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "baseline" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "baseline" ? "url(#ydk-types21-success-arrow)" : "url(#ydk-types21-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "baseline" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "baseline" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "baseline" ? C.success : C.warning}>
            行为验收
          </text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{mode === "baseline" ? "标准语义可直接复现" : "先检测，再选择降级路径"}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>记录首个假设偏离</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把语言保证与环境假设分开" : isActive ? "当前阶段：按证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-types21-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-types21-success-arrow)" : "url(#ydk-types21-arrow)"}
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
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "spec" : index === 1 ? "host" : index === 2 ? "patch" : index === 3 ? "realm" : index === 4 ? "test" : "scope"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先验收行为，再信任身份</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测当前对象由谁提供、是否跨 realm、是否被补丁改写，再推进证据链。"
          reset={{ label: "重置实验", ariaLabel: "重置混合环境证据实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        混合环境不是“支持或不支持”的单一标签；先固定 ECMAScript 语义，再用行为、身份和补丁来源验收当前运行环境。
      </figcaption>
    </figure>
  );
}
