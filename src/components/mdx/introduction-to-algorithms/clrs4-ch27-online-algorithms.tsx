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
  { label: "contract", caption: "声明 request prefix、cost model 与 offline OPT" },
  { label: "reveal", caption: "只让算法看到当前 request，不泄露 future suffix" },
  { label: "act", caption: "选择 threshold、reorder 或 eviction action" },
  { label: "charge", caption: "用 ratio 或 potential 记下当前决策代价" },
  { label: "phase", caption: "按 phase 或 adversary witness 组织全局证明" },
  { label: "verify", caption: "检查 upper bound、lower bound 与资源合同" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "elevator" | "list" | "cache" | "failure";

type ModeInfo = {
  title: string;
  field: string;
  result: string;
  claim: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  elevator: {
    title: "Waiting for an elevator",
    field: "threshold t = b",
    result: "2-competitive",
    claim: "等待成本与购买成本的平衡不需要知道 arrival time",
  },
  list: {
    title: "Maintaining a search list",
    field: "rank + inversion potential",
    result: "constant bound",
    claim: "MTF 用当前 access 改善未来 state，并由 potential 记账",
  },
  cache: {
    title: "Online caching",
    field: "k-distinct phases",
    result: "k-competitive",
    claim: "LRU 每 phase 至多 fault k 次，OPT 提供跨 phase 下界",
  },
  failure: {
    title: "information leak",
    field: "future suffix revealed",
    result: "invalid proof",
    claim: "把 future 交给 online policy 会破坏 competitive model",
  },
};

export function Clrs4Chapter27OnlineAlgorithmsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("elevator");

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
  const isWarningMode = mode === "failure";

  function reset() {
    timeline.goToStep(0);
    setMode("elevator");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch27-online-algorithms"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 27 · Online Algorithms
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              未来未知时，什么叫“做得足够好”？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换 threshold、search-list potential、cache phases 与 information leak，沿时间线观察 online policy 如何面对 unknown future。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择在线模型</span>
          <select
            aria-label="选择等待电梯、维护搜索列表、在线缓存或 future information leak 模式"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="elevator">等待电梯 · threshold hedge</option>
            <option value="list">维护搜索列表 · MTF potential</option>
            <option value="cache">在线缓存 · phase bound</option>
            <option value="failure">故障注入 · future leak</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 720"
          role="img"
          aria-label="CLRS 4e Chapter 27 专属在线算法实验。覆盖 online algorithms、在线算法、waiting for an elevator、等待电梯、maintaining a search list、维护搜索列表、online caching、在线缓存。展示 request prefix、unknown future、offline OPT、competitive ratio、threshold、inversion potential、k-distinct phases、adversary witness 与 resource contract，并支持模式切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch27-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch27-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch27-warning-arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="720" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            contract → reveal → act → charge → phase → verify
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            online algorithms · {selected.title} · {selected.result}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>信息合同</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>prefix only · legal action · cost</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>OPT 可见 full sequence 作 benchmark</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch27-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={isProofStage ? C.accent : C.elevated} fillOpacity={isProofStage ? 0.12 : 1} stroke={isProofStage ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={isProofStage ? C.accent : C.primary}>状态证据</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.field}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>policy 不能读取 future suffix</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>proof 要标明 adversary power</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isWarningMode ? C.warning : C.success} strokeWidth="2.5" markerEnd={isWarningMode ? "url(#clrs4-ch27-warning-arrow)" : "url(#clrs4-ch27-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isWarningMode ? C.warning : C.success} fillOpacity="0.1" stroke={isWarningMode ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isWarningMode ? C.warning : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{isWarningMode ? "model invalid" : "bound 可复核"}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={isWarningMode ? C.warning : C.secondary}>{selected.claim}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>ratio 依赖完整 comparison contract</text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === 1 || index === 4;
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
                <text x="870" y={258 + index * 52} textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "input" : index === 1 ? "prefix" : index === 2 ? "act" : index === 3 ? "ratio" : index === 4 ? "phase" : "bound"}</text>
              </g>
            );
          })}

          <text x="30" y="548" fontSize="13" fontWeight="700" fill={C.primary}>在线状态与竞争证据</text>
          <text x="870" y="548" textAnchor="end" fontSize="11" fill={C.secondary}>切换机制，保持同一组小图</text>

          {mode === "elevator" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>等待电梯：threshold b 在继续等待与走楼梯之间 hedge</text>
              <line x1="94" y1="646" x2="364" y2="646" stroke={C.border} strokeWidth="4" />
              <line x1="364" y1="646" x2="650" y2="646" stroke={C.warning} strokeWidth="4" strokeDasharray="8 6" />
              <circle cx="94" cy="646" r="25" fill={C.accent} fillOpacity="0.14" stroke={C.accent} strokeWidth="2" />
              <circle cx="364" cy="646" r="25" fill={C.success} fillOpacity="0.12" stroke={C.success} strokeWidth="2" />
              <circle cx="650" cy="646" r="25" fill={C.warning} fillOpacity="0.12" stroke={C.warning} strokeWidth="2" />
              <text x="94" y="652" textAnchor="middle" fontSize="12" fill={C.accent}>start</text>
              <text x="364" y="652" textAnchor="middle" fontSize="12" fill={C.success}>t = b</text>
              <text x="650" y="652" textAnchor="middle" fontSize="12" fill={C.warning}>stairs</text>
              <text x="94" y="612" fontSize="11" fill={C.secondary}>wait cost accumulates</text>
              <text x="364" y="612" fontSize="11" fill={C.success}>arrival before threshold → ride</text>
              <text x="650" y="612" fontSize="11" fill={C.warning}>late arrival → buy</text>
              <text x="710" y="680" fontSize="12" fontWeight="700" fill={C.success}>C_A ≤ 2 C_OPT</text>
            </>
          )}

          {mode === "list" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>维护搜索列表：MTF 的 access rank 与 inversion potential</text>
              <rect x="54" y="604" width="290" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <rect x="380" y="604" width="190" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="606" y="604" width="240" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="76" y="632" fontSize="12" fontWeight="700" fill={C.primary}>list: a · b · x · c</text>
              <text x="76" y="660" fontSize="11" fill={C.secondary}>access x pays rank 3</text>
              <text x="76" y="682" fontSize="11" fill={C.secondary}>then move x to front</text>
              <text x="402" y="632" fontSize="12" fontWeight="700" fill={C.accent}>Φ inversions</text>
              <text x="402" y="660" fontSize="11" fill={C.secondary}>online vs OPT order</text>
              <text x="628" y="632" fontSize="12" fontWeight="700" fill={C.success}>amortized charge</text>
              <text x="628" y="660" fontSize="11" fill={C.secondary}>current cost + ΔΦ</text>
              <text x="628" y="682" fontSize="11" fill={C.success}>boundary Φ telescopes</text>
            </>
          )}

          {mode === "cache" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>在线缓存：k-distinct phases 给 LRU 的 worst-case charge</text>
              <rect x="54" y="604" width="164" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="236" y="604" width="164" height="82" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <rect x="418" y="604" width="164" height="82" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="1.5" />
              <rect x="600" y="604" width="246" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="76" y="632" fontSize="12" fontWeight="700" fill={C.accent}>phase 1</text>
              <text x="76" y="660" fontSize="11" fill={C.secondary}>≤ k distinct</text>
              <text x="76" y="682" fontSize="11" fill={C.secondary}>LRU faults ≤ k</text>
              <text x="258" y="632" fontSize="12" fontWeight="700" fill={C.success}>phase 2</text>
              <text x="258" y="660" fontSize="11" fill={C.secondary}>new page enters</text>
              <text x="258" y="682" fontSize="11" fill={C.secondary}>charge transition</text>
              <text x="440" y="632" fontSize="12" fontWeight="700" fill={C.warning}>phase 3</text>
              <text x="440" y="660" fontSize="11" fill={C.secondary}>adversary sees prefix</text>
              <text x="440" y="682" fontSize="11" fill={C.secondary}>same capacity contract</text>
              <text x="622" y="632" fontSize="12" fontWeight="700" fill={C.success}>C_LRU ≤ k C_OPT + O(k)</text>
              <text x="622" y="660" fontSize="11" fill={C.secondary}>upper bound + lower-bound witness</text>
              <text x="622" y="682" fontSize="11" fill={C.secondary}>resource augmentation must be explicit</text>
            </>
          )}

          {mode === "failure" && (
            <>
              <text x="54" y="580" fontSize="13" fontWeight="700" fill={C.primary}>故障注入：把 future suffix 偷偷交给 online policy</text>
              <rect x="54" y="604" width="250" height="82" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <rect x="334" y="604" width="250" height="82" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="1.5" />
              <rect x="614" y="604" width="232" height="82" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="76" y="632" fontSize="12" fontWeight="700" fill={C.accent}>revealed prefix</text>
              <text x="76" y="660" fontSize="11" fill={C.secondary}>合法 online information</text>
              <text x="76" y="682" fontSize="11" fill={C.secondary}>act before next request</text>
              <text x="356" y="632" fontSize="12" fontWeight="700" fill={C.warning}>future suffix leak</text>
              <text x="356" y="660" fontSize="11" fill={C.secondary}>policy reads adversary trace</text>
              <text x="356" y="682" fontSize="11" fill={C.secondary}>not an online algorithm</text>
              <text x="636" y="632" fontSize="12" fontWeight="700" fill={C.warning}>ratio invalid</text>
              <text x="636" y="660" fontSize="11" fill={C.secondary}>must restate information boundary</text>
              <text x="636" y="682" fontSize="11" fill={C.secondary}>and adversary power</text>
            </>
          )}

          <rect x="30" y="696" width="840" height="18" rx="8" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="709" fontSize="11" fill={C.secondary}>端到端证书：information boundary · OPT comparator · ratio · potential · phase charge · adversary witness</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先固定 information arrival 与 cost model，再让每个 action 回指 threshold、potential 或 phase proof。"
          reset={{ label: "重置实验", ariaLabel: "重置在线算法实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        在线算法的核心不是猜中未来，而是在明确的信息边界下，用可审计的 ratio、potential 或 phase 证书承担未知信息的代价。
      </figcaption>
    </figure>
  );
}
