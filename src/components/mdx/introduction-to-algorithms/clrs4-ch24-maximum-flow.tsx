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
  { label: "contract", caption: "声明 capacity、conservation、source 与 sink" },
  { label: "residual", caption: "把剩余容量和可撤回 flow 画成 residual edges" },
  { label: "augment", caption: "沿 residual path 发送 bottleneck" },
  { label: "certify", caption: "无增广路时提取 source-reachable cut" },
  { label: "reduce", caption: "把 unit-capacity flow 解释成 bipartite matching" },
  { label: "verify", caption: "检查 flow、cut、value 和应用 witness" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "residual" | "augment" | "cut" | "matching";

type ModeInfo = {
  title: string;
  field: string;
  result: string;
  claim: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  residual: {
    title: "Residual network",
    field: "c_f(u,v) = c(u,v) − f(u,v)",
    result: "可继续发送或撤回",
    claim: "reverse residual edge 只取消旧 flow，不是新的业务边",
  },
  augment: {
    title: "Ford-Fulkerson",
    field: "bottleneck = 2",
    result: "flow value 增加",
    claim: "每条 path 同时更新 forward 与 reverse residual capacity",
  },
  cut: {
    title: "Max-flow min-cut",
    field: "S = residual-reachable(s)",
    result: "tight certificate",
    claim: "无 s-to-t residual path 时，flow value 等于 cut capacity",
  },
  matching: {
    title: "Bipartite matching",
    field: "unit capacities",
    result: "flow value = |M|",
    claim: "flow 为 1 的 left-to-right edges 就是 matching witness",
  },
};

export function Clrs4Chapter24MaximumFlowLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("residual");

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

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeStep = STEPS[activeIndex] ?? STEPS[0];
  const selected = MODE_COPY[mode];
  const isProofStage = activeIndex >= 3;
  const isWarningMode = mode === "cut";

  function reset() {
    timeline.goToStep(0);
    setMode("residual");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch24-maximum-flow"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 24 · Maximum Flow
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              最大流的数字，如何变成一份证书？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换 residual、augmenting path、tight cut 和二分匹配，沿时间线观察 capacity、flow、cut 与 application witness。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择最大流证据</span>
          <select
            aria-label="选择 residual network、Ford-Fulkerson、最大流最小割或最大二分匹配模式"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="residual">Residual network · 可发送与撤回</option>
            <option value="augment">Ford-Fulkerson · 增广瓶颈</option>
            <option value="cut">Max-flow min-cut · 紧割证书</option>
            <option value="matching">Bipartite matching · 单位容量归约</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 720"
          role="img"
          aria-label="CLRS 4e Chapter 24 专属最大流实验。覆盖 maximum flow、最大流、flow networks、流网络、Ford-Fulkerson method、Ford-Fulkerson方法、maximum bipartite matching、最大二分匹配。展示 residual network、augmenting path、bottleneck、source-reachable cut、max-flow min-cut certificate 与 unit-capacity matching reduction，并支持模式切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch24-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch24-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch24-warning-arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="720" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            contract → residual → augment → certify → reduce → verify
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            maximum flow · {selected.title} · {selected.result}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>输入合同</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>capacity · conservation · s → t</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>flow value = source net outflow</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch24-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={isProofStage ? C.accent : C.elevated} fillOpacity={isProofStage ? 0.12 : 1} stroke={isProofStage ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={isProofStage ? C.accent : C.primary}>状态证据</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.field}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>每次 update 都保持 conservation</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>flow 与 residual 必须同步</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isWarningMode ? C.warning : C.success} strokeWidth="2.5" markerEnd={isWarningMode ? "url(#clrs4-ch24-warning-arrow)" : "url(#clrs4-ch24-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isWarningMode ? C.warning : C.success} fillOpacity="0.1" stroke={isWarningMode ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isWarningMode ? C.warning : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{isWarningMode ? "tight cut" : "flow 可复核"}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={isWarningMode ? C.warning : C.secondary}>{selected.claim}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>结果必须保留 cut 或 matching witness</text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === 1 || index === 3;
            const tone = isActive ? C.accent : isBoundary ? C.warning : C.border;
            return (
              <g
                key={"stage-" + step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y={222 + index * 52} width="840" height="44" rx="10" fill={isActive ? C.accent : isBoundary ? C.warning : C.elevated} fillOpacity={isActive || isBoundary ? 0.1 : 1} stroke={tone} strokeWidth={isActive ? 2.5 : 1.5} />
                <text x="52" y={242 + index * 52} fontSize="13" fontWeight="700" fill={isActive ? C.accent : isBoundary ? C.warning : C.primary}>{index + 1} · {step.label}</text>
                <text x="188" y={242 + index * 52} fontSize="12" fill={C.primary}>{step.caption}</text>
                <text x="52" y={258 + index * 52} fontSize="11" fill={C.secondary}>{index < activeIndex ? "证据已确认" : index === activeIndex ? "当前要回答的问题" : "等待前一步"}</text>
                <text x="870" y={258 + index * 52} textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "input" : index === 1 ? "residual" : index === 2 ? "delta" : index === 3 ? "cut" : index === 4 ? "matching" : "witness"}</text>
              </g>
            );
          })}

          <text x="30" y="548" fontSize="13" fontWeight="700" fill={C.primary}>flow network 与证书证据</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>切换机制，保持同一组端点</text>

          {mode === "residual" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>residual network：forward capacity 与 reverse cancellation</text>
              <circle cx="122" cy="646" r="28" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="318" cy="612" r="28" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <circle cx="318" cy="680" r="28" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <circle cx="520" cy="646" r="28" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="2" />
              <text x="122" y="652" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.accent}>s</text>
              <text x="318" y="618" textAnchor="middle" fontSize="13" fill={C.primary}>a</text>
              <text x="318" y="686" textAnchor="middle" fontSize="13" fill={C.primary}>b</text>
              <text x="520" y="652" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.success}>t</text>
              <line x1="150" y1="638" x2="286" y2="616" stroke={C.success} strokeWidth="3" markerEnd="url(#clrs4-ch24-success-arrow)" />
              <line x1="150" y1="654" x2="286" y2="676" stroke={C.success} strokeWidth="3" markerEnd="url(#clrs4-ch24-success-arrow)" />
              <line x1="346" y1="612" x2="490" y2="638" stroke={C.success} strokeWidth="3" markerEnd="url(#clrs4-ch24-success-arrow)" />
              <line x1="346" y1="680" x2="490" y2="654" stroke={C.success} strokeWidth="3" markerEnd="url(#clrs4-ch24-success-arrow)" />
              <text x="205" y="604" fontSize="11" fill={C.success}>c_f = 3</text>
              <text x="205" y="696" fontSize="11" fill={C.success}>c_f = 2</text>
              <text x="370" y="596" fontSize="11" fill={C.success}>forward</text>
              <text x="370" y="708" fontSize="11" fill={C.warning}>reverse = cancel</text>
              <text x="606" y="620" fontSize="12" fontWeight="700" fill={C.accent}>可发送的 residual edge</text>
              <text x="606" y="646" fontSize="11" fill={C.secondary}>反向箭头只表示撤回已有 flow</text>
              <text x="606" y="672" fontSize="11" fill={C.secondary}>不是原 network 的新业务边</text>
            </>
          )}

          {mode === "augment" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>augmenting path：delta 是 path 上最小 residual capacity</text>
              <circle cx="122" cy="646" r="28" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="318" cy="646" r="28" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <circle cx="520" cy="646" r="28" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="2" />
              <text x="122" y="652" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.accent}>s</text>
              <text x="318" y="652" textAnchor="middle" fontSize="13" fill={C.primary}>a</text>
              <text x="520" y="652" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.success}>t</text>
              <line x1="150" y1="646" x2="286" y2="646" stroke={C.success} strokeWidth="5" markerEnd="url(#clrs4-ch24-success-arrow)" />
              <line x1="346" y1="646" x2="490" y2="646" stroke={C.success} strokeWidth="5" markerEnd="url(#clrs4-ch24-success-arrow)" />
              <text x="214" y="630" fontSize="12" fontWeight="700" fill={C.success}>4</text>
              <text x="410" y="630" fontSize="12" fontWeight="700" fill={C.success}>2</text>
              <text x="606" y="620" fontSize="12" fontWeight="700" fill={C.accent}>bottleneck δ = 2</text>
              <text x="606" y="646" fontSize="11" fill={C.secondary}>两条 forward residual 都减 2</text>
              <text x="606" y="672" fontSize="11" fill={C.secondary}>对应 reverse residual 各增 2</text>
            </>
          )}

          {mode === "cut" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>无增广路：S 是从 s residual-reachable 的顶点集合</text>
              <rect x="54" y="600" width="328" height="92" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="394" y="600" width="210" height="92" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="1.5" />
              <text x="76" y="628" fontSize="12" fontWeight="700" fill={C.accent}>S = {"{s, a}"}</text>
              <text x="76" y="654" fontSize="11" fill={C.secondary}>所有 S → T original edges saturated</text>
              <text x="76" y="680" fontSize="11" fill={C.secondary}>residual 无法穿过边界</text>
              <text x="416" y="628" fontSize="12" fontWeight="700" fill={C.warning}>T = {"{b, t}"}</text>
              <text x="416" y="654" fontSize="11" fill={C.secondary}>cut capacity = 5</text>
              <text x="416" y="680" fontSize="11" fill={C.secondary}>flow value = 5</text>
              <text x="630" y="628" fontSize="12" fontWeight="700" fill={C.success}>tight cut</text>
              <text x="630" y="654" fontSize="11" fill={C.secondary}>|f| = c(S,T)</text>
              <text x="630" y="680" fontSize="11" fill={C.secondary}>因此 flow 与 cut 都 optimal</text>
            </>
          )}

          {mode === "matching" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>maximum bipartite matching：unit-capacity flow 的应用 witness</text>
              <circle cx="122" cy="622" r="25" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="122" cy="680" r="25" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="356" cy="622" r="25" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="2" />
              <circle cx="356" cy="680" r="25" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="2" />
              <line x1="147" y1="622" x2="331" y2="622" stroke={C.success} strokeWidth="4" markerEnd="url(#clrs4-ch24-success-arrow)" />
              <line x1="147" y1="680" x2="331" y2="680" stroke={C.success} strokeWidth="4" markerEnd="url(#clrs4-ch24-success-arrow)" />
              <text x="122" y="628" textAnchor="middle" fontSize="12" fill={C.accent}>u₁</text>
              <text x="122" y="686" textAnchor="middle" fontSize="12" fill={C.accent}>u₂</text>
              <text x="356" y="628" textAnchor="middle" fontSize="12" fill={C.success}>v₁</text>
              <text x="356" y="686" textAnchor="middle" fontSize="12" fill={C.success}>v₂</text>
              <text x="450" y="620" fontSize="12" fontWeight="700" fill={C.accent}>s → L → R → t</text>
              <text x="450" y="646" fontSize="11" fill={C.secondary}>所有 edge capacity = 1</text>
              <text x="450" y="672" fontSize="11" fill={C.secondary}>flow 为 1 的 L → R edge = matching</text>
              <text x="450" y="698" fontSize="11" fill={C.success}>flow value = |M| = 2</text>
            </>
          )}

          <rect x="30" y="696" width="840" height="18" rx="8" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="709" fontSize="11" fill={C.secondary}>端到端证书：capacity · conservation · residual path · bottleneck · cut · matching witness</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定 flow network 合同，再让每次 augmentation 回指 residual path；终态用 cut 或 matching 独立验证。"
          reset={{ label: "重置实验", ariaLabel: "重置最大流实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        最大流不是一个孤立数字；residual、tight cut 和应用归约共同构成可复核的 optimality witness。
      </figcaption>
    </figure>
  );
}
