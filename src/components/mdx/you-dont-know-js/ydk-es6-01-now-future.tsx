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
  { label: "source", caption: "锁定源码依赖的语言能力和规范语境" },
  { label: "stage", caption: "确认能力处在提案、标准还是实现阶段" },
  { label: "engine", caption: "检查目标引擎是否原生支持这项能力" },
  { label: "transpile", caption: "只转译语法差异，不假设 API 自动出现" },
  { label: "runtime", caption: "用 polyfill 或替代实现补齐运行时缺口" },
  { label: "accept", caption: "在真实目标环境用能力测试完成验收" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

const STAGE_COPY = [
  [
    "1 · 锁定源码能力",
    "先写清楚源码使用了哪项语言能力、哪个规范语境和哪些输入假设，再谈工具链。",
    "证据：source contract",
  ],
  [
    "2 · 确认规范阶段",
    "提案、已标准化能力和引擎实验性实现不是同一承诺；版本标签要可追溯。",
    "证据：spec stage",
  ],
  [
    "3 · 检查目标引擎",
    "目标浏览器、Node.js 或嵌入式引擎可能支持不同集合，先做原生能力测试。",
    "证据：engine support",
  ],
  [
    "4 · 转译语法差异",
    "转译器能把一部分语法变成旧语法，但不会自动提供所有标准库和宿主 API。",
    "证据：output syntax",
  ],
  [
    "5 · 补齐运行时 API",
    "polyfill、按需加载或降级实现分别解决 API 缺口；补丁也有版本、性能和权限边界。",
    "证据：runtime capability",
  ],
  [
    "6 · 真实环境验收",
    "在实际目标环境运行能力测试、错误路径和资源清理，才可签发发布兼容性。",
    "证据：acceptance result",
  ],
] as const;

type Mode = "version" | "proposal" | "engine" | "transpile" | "polyfill";

type ModeInfo = {
  title: string;
  input: string;
  state: string;
  result: string;
  detail: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  version: {
    title: "ECMAScript 版本",
    input: "source → annual spec",
    state: "language contract",
    result: "traceable dependency",
    detail: "先记录源码真正依赖的能力和规范阶段，再决定工具链与支持矩阵。",
  },
  proposal: {
    title: "提案阶段",
    input: "stage 0 / stage 4",
    state: "proposal status",
    result: "known confidence",
    detail: "提案阶段表达的是过程状态，不等于已标准化或每个引擎都实现。",
  },
  engine: {
    title: "目标引擎",
    input: "supports?.feature",
    state: "native support",
    result: "capability test",
    detail: "目标环境的实际能力比用户代理字符串或编译成功更接近发布事实。",
  },
  transpile: {
    title: "转译",
    input: "const / arrow → older syntax",
    state: "syntax output",
    result: "runtime still needed",
    detail: "转译处理语法表面；Promise、迭代器和宿主 API 仍需单独验证。",
  },
  polyfill: {
    title: "polyfill",
    input: "missing API → fallback",
    state: "runtime patch",
    result: "explicit boundary",
    detail: "polyfill 需要说明来源、加载顺序、性能、全局副作用和降级策略。",
  },
};

export function YdkEs601NowFutureLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("version");

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
  const faultIndex = mode === "proposal" ? 1 : mode === "engine" ? 2 : mode === "polyfill" ? 4 : 3;

  function reset() {
    timeline.goToStep(0);
    setMode("version");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="ydk-es6-01-now-future"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              You Don&apos;t Know JS · ES6 &amp; Beyond · Chapter 1
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              ES 现在与未来：规范、工具链与目标环境
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换样本并沿时间线推进，观察源码能力如何经过规范阶段、引擎支持、转译和运行时补丁，最终在真实环境完成验收。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择兼容性样本</span>
          <select
            aria-label="选择 ECMAScript 版本、提案阶段、目标引擎、转译或 polyfill 样本"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="version">ECMAScript 版本 · contract</option>
            <option value="proposal">提案阶段 · status</option>
            <option value="engine">目标引擎 · capability</option>
            <option value="transpile">转译 · syntax output</option>
            <option value="polyfill">polyfill · runtime patch</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 620"
          role="img"
          aria-label="You Don't Know JS ES6 & Beyond Chapter 1 专属教学时间线，覆盖 Chapter 1: ES? Now & Future、Versioning、Transpiling。展示 ECMAScript 版本、提案阶段、目标引擎、转译、polyfill 和真实目标环境验收，并支持样本切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="ydk-es601-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="ydk-es601-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="ydk-es601-warning-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="620" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            source → stage → engine → transpile → runtime → accept
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            Chapter 1: ES? Now &amp; Future · {selected.title} · 当前：{selected.input}
          </text>

          <rect x="30" y="78" width="252" height="122" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>源码依赖</text>
          <text x="52" y="134" fontSize="11" fill={C.primary}>{selected.input}</text>
          <text x="52" y="160" fontSize="11" fill={C.secondary}>先写能力和规范阶段</text>
          <text x="52" y="182" fontSize="11" fill={C.secondary}>再决定工具链策略</text>

          <line x1="294" y1="138" x2="326" y2="138" stroke={C.success} strokeWidth="2.5" markerEnd="url(#ydk-es601-success-arrow)" />

          <rect x="336" y="78" width="252" height="122" rx="12" fill={mode === "proposal" || mode === "engine" ? C.warning : C.elevated} fillOpacity={mode === "proposal" || mode === "engine" ? 0.1 : 1} stroke={mode === "proposal" || mode === "engine" ? C.warning : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={mode === "proposal" || mode === "engine" ? C.warning : C.accent}>兼容性状态</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.state}</text>
          <text x="358" y="160" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="358" y="182" fontSize="11" fill={C.secondary}>证据：能力测试与输出</text>

          <line x1="600" y1="138" x2="632" y2="138" stroke={mode === "version" || mode === "engine" ? C.success : C.warning} strokeWidth="2.5" markerEnd={mode === "version" || mode === "engine" ? "url(#ydk-es601-success-arrow)" : "url(#ydk-es601-warning-arrow)"} />

          <rect x="642" y="78" width="228" height="122" rx="12" fill={mode === "version" || mode === "engine" ? C.success : C.warning} fillOpacity="0.1" stroke={mode === "version" || mode === "engine" ? C.success : C.warning} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={mode === "version" || mode === "engine" ? C.success : C.warning}>发布结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="11" fill={C.primary}>{selected.result}</text>
          <text x="756" y="160" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.detail}</text>
          <text x="756" y="182" textAnchor="middle" fontSize="11" fill={C.secondary}>编译成功不是验收结论</text>

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
                <text x="52" y="324" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "边界样本：把语法、API 与环境分开记录" : isActive ? "当前阶段：沿兼容性证据推进" : "等待前一步签发状态"}</text>
              </g>
            );
          })}

          <line x1="52" y1="386" x2="848" y2="386" stroke={C.border} strokeWidth="2" markerEnd="url(#ydk-es601-arrow)" />
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
                markerEnd={index < activeIndex ? "url(#ydk-es601-success-arrow)" : "url(#ydk-es601-arrow)"}
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
                <circle cx={x + 22} cy="426" r="12" fill={isBoundary || isActive ? tone : C.bg} stroke={tone} strokeWidth="1.5" />
                <text x={x + 22} y="430" textAnchor="middle" fontSize="11" fill={isActive || isBoundary ? C.bg : C.primary}>{index + 1}</text>
                <text x={x + 64} y="430" textAnchor="middle" fontSize="11" fontWeight="700" fill={isBoundary ? C.warning : isActive ? C.accent : C.primary}>{step.label}</text>
                <text x={x + 52} y="458" textAnchor="middle" fontSize="11" fill={C.secondary}>{index < activeIndex ? "checked" : isActive ? "active" : "trace"}</text>
                <text x={x + 52} y="484" textAnchor="middle" fontSize="11" fill={isBoundary ? C.warning : C.secondary}>{isBoundary ? "boundary" : "evidence"}</text>
                <text x={x + 52} y="504" textAnchor="middle" fontSize="11" fill={C.secondary}>{index === 0 ? "source" : index === 1 ? "stage" : index === 2 ? "engine" : index === 3 ? "syntax" : index === 4 ? "api" : "accept"}</text>
              </g>
            );
          })}
          <text x="30" y="548" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label} · {activeStep.caption}</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>先验证能力，再承诺兼容</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先记录规范版本、提案阶段、目标引擎和 API 条件，再推进时间线验证转译与运行时补丁的边界。"
          reset={{ label: "重置实验", ariaLabel: "重置 ES 现在与未来兼容性实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ES 的未来不是猜测发布日期，而是用版本、能力测试、工具链和真实目标环境建立可追溯的兼容性证据。
      </figcaption>
    </figure>
  );
}
