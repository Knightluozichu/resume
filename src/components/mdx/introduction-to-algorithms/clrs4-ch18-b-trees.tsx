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
  { label: "page", caption: "把一页装满有序 keys 与 child ranges" },
  { label: "route", caption: "在 page 内定位 separator，再读取一个 child" },
  { label: "split", caption: "下降前分裂 full child，提升 median" },
  { label: "delete", caption: "删除前保证目标 child 至少有 t 个 keys" },
  { label: "repair", caption: "借位或合并，保持占用边界" },
  { label: "verify", caption: "核对 ranges、occupancy 与等深叶子" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type Mode = "search" | "split" | "delete" | "failure";

type ModeInfo = {
  title: string;
  field: string;
  result: string;
  claim: string;
};

const MODE_COPY: Record<Mode, ModeInfo> = {
  search: {
    title: "页面搜索",
    field: "[10 | 20 | 30] · 4 个 child ranges",
    result: "page access = 3",
    claim: "先在页内找 separator，再向下读取一个 child",
  },
  split: {
    title: "分裂插入",
    field: "full child = 2t−1 keys",
    result: "median 20 ↑",
    claim: "永远下降到 nonfull child",
  },
  delete: {
    title: "删除修复",
    field: "target child ≥ t keys",
    result: "borrow / merge",
    claim: "下行时提前消除 underflow 风险",
  },
  failure: {
    title: "错误路径",
    field: "child = t−1 keys",
    result: "underflow",
    claim: "只删完再修会破坏一遍下行不变量",
  },
};

export function Clrs4Chapter18BTreesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("search");

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
  const isRepairStage = activeIndex >= 3;
  const isFailure = mode === "failure";

  function reset() {
    timeline.goToStep(0);
    setMode("search");
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch18-b-trees"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 18 · B-Trees
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              把磁盘访问压缩成少数几层页面
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换搜索、分裂、删除和故障模式，沿时间线观察 page、separator、child 与不变量如何共同工作。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <label className="mb-4 block text-xs text-secondary">
          <span className="mb-1 block font-semibold text-primary">选择 B 树机制</span>
          <select
            aria-label="选择页面搜索、分裂插入、删除修复或错误路径"
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}
            className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
          >
            <option value="search">页面搜索 · page access</option>
            <option value="split">分裂插入 · split before descent</option>
            <option value="delete">删除修复 · borrow or merge</option>
            <option value="failure">错误路径 · stale underflow</option>
          </select>
        </label>

        <svg
          viewBox="0 0 900 660"
          role="img"
          aria-label="CLRS 4e Chapter 18 专属 B 树实验。覆盖 B-trees、B 树、B树、definition of B-trees、B 树定义、B树定义、basic operations on B-trees、B 树基本操作、B树基本操作、deleting a key from a B-tree、B 树删除、B树删除。展示页面搜索、separator 路由、full child 分裂、median 提升、删除前的下行不变量、borrow、merge、root 收缩与错误 underflow，并支持机制切换、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker id="clrs4-ch18-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker id="clrs4-ch18-success-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.success} />
            </marker>
            <marker id="clrs4-ch18-warning-arrow" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="660" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            page → route → split → delete → repair → verify
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            B-trees · {selected.title} · {selected.result}
          </text>

          <rect x="30" y="78" width="258" height="126" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="106" fontSize="13" fontWeight="700" fill={C.accent}>一页装什么</text>
          <text x="52" y="134" fontSize="12" fill={C.primary}>有序 keys · separator · child pointers</text>
          <text x="52" y="162" fontSize="11" fill={C.secondary}>当前阶段：{activeStep.label}</text>
          <text x="52" y="184" fontSize="11" fill={C.secondary}>root 例外，叶子同一 depth</text>

          <line x1="300" y1="141" x2="326" y2="141" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch18-success-arrow)" />

          <rect x="336" y="78" width="258" height="126" rx="12" fill={isRepairStage ? C.accent : C.elevated} fillOpacity={isRepairStage ? 0.12 : 1} stroke={isRepairStage ? C.accent : C.border} strokeWidth="1.5" />
          <text x="358" y="106" fontSize="13" fontWeight="700" fill={isRepairStage ? C.accent : C.primary}>当前不变量</text>
          <text x="358" y="134" fontSize="11" fill={C.primary}>{selected.field}</text>
          <text x="358" y="162" fontSize="11" fill={C.secondary}>每次下降都先检查 child</text>
          <text x="358" y="184" fontSize="11" fill={C.secondary}>page I/O 与页内比较分开计</text>

          <line x1="606" y1="141" x2="632" y2="141" stroke={isFailure ? C.warning : C.success} strokeWidth="2.5" markerEnd={isFailure ? "url(#clrs4-ch18-warning-arrow)" : "url(#clrs4-ch18-success-arrow)"} />

          <rect x="642" y="78" width="228" height="126" rx="12" fill={isFailure ? C.warning : C.success} fillOpacity="0.1" stroke={isFailure ? C.warning : C.success} strokeWidth="1.5" />
          <text x="756" y="106" textAnchor="middle" fontSize="13" fontWeight="700" fill={isFailure ? C.warning : C.success}>当前结论</text>
          <text x="756" y="134" textAnchor="middle" fontSize="12" fill={C.primary}>{isFailure ? "结构可能 underflow" : "每层少一次 page access"}</text>
          <text x="756" y="162" textAnchor="middle" fontSize="11" fill={C.secondary}>{selected.claim}</text>
          <text x="756" y="184" textAnchor="middle" fontSize="11" fill={C.secondary}>正确性与 I/O 一起验</text>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isBoundary = index === 2 || index === 4;
            const tone = isActive ? C.accent : isBoundary ? C.warning : C.border;
            return (
              <g
                key={"stage-" + step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: 0 }}
              >
                <rect x="30" y="222" width="840" height="76" rx="12" fill={isActive ? C.accent : isBoundary ? C.warning : C.elevated} fillOpacity={isActive || isBoundary ? 0.1 : 1} stroke={tone} strokeWidth={isActive ? 2.5 : 1.5} />
                <text x="52" y="250" fontSize="13" fontWeight="700" fill={isActive ? C.accent : isBoundary ? C.warning : C.primary}>{index + 1} · {step.label}</text>
                <text x="188" y="250" fontSize="12" fill={C.primary}>{step.caption}</text>
                <text x="52" y="276" fontSize="11" fill={C.secondary}>{index < activeIndex ? "证据已确认" : index === activeIndex ? "当前要回答的问题" : "等待前一步"}</text>
                <text x="870" y="276" textAnchor="end" fontSize="11" fill={isActive ? C.accent : C.secondary}>{index === 0 ? "page" : index === 1 ? "range" : index === 2 ? "median" : index === 3 ? "t keys" : index === 4 ? "occupancy" : "certificate"}</text>
              </g>
            );
          })}

          <text x="30" y="328" fontSize="13" fontWeight="700" fill={C.primary}>页面结构与故障证据</text>
          <text x="870" y="328" textAnchor="end" fontSize="11" fill={C.secondary}>切换机制，保持同一端到端检查</text>

          {mode === "search" && (
            <>
              <rect x="54" y="354" width="792" height="78" rx="12" fill={C.elevated} stroke={C.accent} strokeWidth="1.8" />
              <text x="78" y="382" fontSize="13" fontWeight="700" fill={C.accent}>root page</text>
              <rect x="188" y="362" width="116" height="48" rx="8" fill={C.bg} stroke={C.border} />
              <rect x="312" y="362" width="116" height="48" rx="8" fill={C.bg} stroke={C.border} />
              <rect x="436" y="362" width="116" height="48" rx="8" fill={C.success} fillOpacity="0.12" stroke={C.success} />
              <rect x="560" y="362" width="116" height="48" rx="8" fill={C.bg} stroke={C.border} />
              <rect x="684" y="362" width="138" height="48" rx="8" fill={C.bg} stroke={C.border} />
              <text x="246" y="384" textAnchor="middle" fontSize="13" fill={C.primary}>10</text>
              <text x="370" y="384" textAnchor="middle" fontSize="13" fill={C.primary}>20</text>
              <text x="494" y="384" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.success}>30</text>
              <text x="618" y="384" textAnchor="middle" fontSize="13" fill={C.primary}>40</text>
              <text x="753" y="384" textAnchor="middle" fontSize="12" fill={C.secondary}>target = 34</text>
              <text x="78" y="466" fontSize="12" fill={C.secondary}>在页内定位首个不小于 target 的 separator；然后只读取对应 child page。</text>
              <text x="822" y="466" textAnchor="end" fontSize="11" fill={C.success}>Q = O(log_t n)</text>
              <line x1="494" y1="432" x2="494" y2="500" stroke={C.success} strokeWidth="2.5" markerEnd="url(#clrs4-ch18-success-arrow)" />
              <rect x="352" y="510" width="284" height="58" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="494" y="536" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.success}>child range：30 ≤ key &lt; 40</text>
              <text x="494" y="556" textAnchor="middle" fontSize="11" fill={C.secondary}>页内比较与 page access 分开报告</text>
            </>
          )}

          {mode === "split" && (
            <>
              <text x="54" y="360" fontSize="13" fontWeight="700" fill={C.primary}>full child：2t−1 keys → median promote</text>
              <rect x="54" y="384" width="280" height="112" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="1.5" />
              <text x="74" y="412" fontSize="12" fontWeight="700" fill={C.warning}>before · full child</text>
              <text x="74" y="442" fontSize="12" fill={C.primary}>[4 | 8 | 12 | 20 | 24]</text>
              <text x="74" y="470" fontSize="11" fill={C.secondary}>t = 3，median = 12</text>
              <line x1="356" y1="440" x2="452" y2="440" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#clrs4-ch18-success-arrow)" />
              <rect x="474" y="384" width="372" height="112" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="494" y="412" fontSize="12" fontWeight="700" fill={C.success}>after · parent receives median</text>
              <text x="494" y="442" fontSize="12" fill={C.primary}>left [4 | 8] · parent [12] · right [20 | 24]</text>
              <text x="494" y="470" fontSize="11" fill={C.secondary}>两个 child 都 nonfull，再安全下降</text>
              <text x="54" y="536" fontSize="12" fill={C.secondary}>split-before-descent 把“接下来要写入的 child”变成可接收 key 的状态。</text>
              <text x="846" y="536" textAnchor="end" fontSize="11" fill={C.success}>height 只在 root split 时增加</text>
              <rect x="54" y="552" width="792" height="34" rx="10" fill={C.elevated} stroke={C.border} />
              <text x="450" y="574" textAnchor="middle" fontSize="11" fill={C.secondary}>parent nonfull · median 到 parent · pointers 同步分裂</text>
            </>
          )}

          {mode === "delete" && (
            <>
              <text x="54" y="360" fontSize="13" fontWeight="700" fill={C.primary}>delete：下降前先把 child 补到至少 t 个 keys</text>
              <rect x="54" y="384" width="242" height="112" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="74" y="412" fontSize="12" fontWeight="700" fill={C.primary}>parent separator</text>
              <text x="74" y="442" fontSize="12" fill={C.primary}>[20] → target child</text>
              <text x="74" y="470" fontSize="11" fill={C.secondary}>child 只有 t−1 keys</text>
              <line x1="318" y1="440" x2="398" y2="440" stroke={C.accent} strokeWidth="2.5" markerEnd="url(#clrs4-ch18-success-arrow)" />
              <rect x="420" y="384" width="178" height="112" rx="12" fill={C.success} fillOpacity="0.1" stroke={C.success} strokeWidth="1.5" />
              <text x="509" y="412" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.success}>borrow</text>
              <text x="509" y="442" textAnchor="middle" fontSize="11" fill={C.secondary}>rich sibling ≥ t</text>
              <text x="509" y="470" textAnchor="middle" fontSize="11" fill={C.secondary}>separator 往下</text>
              <rect x="620" y="384" width="226" height="112" rx="12" fill={C.accent} fillOpacity="0.1" stroke={C.accent} strokeWidth="1.5" />
              <text x="733" y="412" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.accent}>merge</text>
              <text x="733" y="442" textAnchor="middle" fontSize="11" fill={C.secondary}>两边都 t−1</text>
              <text x="733" y="470" textAnchor="middle" fontSize="11" fill={C.secondary}>合并 separator</text>
              <text x="54" y="536" fontSize="12" fill={C.secondary}>borrow 保留 page ranges；merge 让目标节点接收 parent separator 后再递归。</text>
              <text x="846" y="536" textAnchor="end" fontSize="11" fill={C.success}>one-pass downward</text>
              <rect x="54" y="552" width="792" height="34" rx="10" fill={C.elevated} stroke={C.border} />
              <text x="450" y="574" textAnchor="middle" fontSize="11" fill={C.secondary}>目标：递归进入的 child 至少拥有 t 个 keys</text>
            </>
          )}

          {mode === "failure" && (
            <>
              <text x="54" y="360" fontSize="13" fontWeight="700" fill={C.primary}>故障注入：先删除，最后才处理 underflow</text>
              <rect x="54" y="384" width="250" height="112" rx="12" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
              <text x="74" y="412" fontSize="12" fontWeight="700" fill={C.primary}>before</text>
              <text x="74" y="442" fontSize="12" fill={C.primary}>child = [8]，t = 2</text>
              <text x="74" y="470" fontSize="11" fill={C.secondary}>删除 8 后变成空 child</text>
              <line x1="328" y1="440" x2="438" y2="440" stroke={C.warning} strokeWidth="2.5" markerEnd="url(#clrs4-ch18-warning-arrow)" />
              <rect x="460" y="384" width="386" height="112" rx="12" fill={C.warning} fillOpacity="0.1" stroke={C.warning} strokeWidth="1.5" />
              <text x="480" y="412" fontSize="12" fontWeight="700" fill={C.warning}>after · 不变量已经失效</text>
              <text x="480" y="442" fontSize="11" fill={C.secondary}>递归过程经过非法 page，修复时机太晚</text>
              <text x="480" y="470" fontSize="11" fill={C.secondary}>可能漏移 separator 或 child pointer</text>
              <text x="54" y="536" fontSize="12" fill={C.secondary}>错误不是“少写一个 if”这么简单：它破坏了每次下行都可证明安全的边界。</text>
              <text x="846" y="536" textAnchor="end" fontSize="11" fill={C.warning}>invariant rejected</text>
              <rect x="54" y="552" width="792" height="34" rx="10" fill={C.warning} fillOpacity="0.08" stroke={C.warning} />
              <text x="450" y="574" textAnchor="middle" fontSize="11" fill={C.warning}>修法：下降前 borrow 或 merge，而不是删除后补救</text>
            </>
          )}

          <rect x="30" y="608" width="840" height="22" rx="8" fill={C.elevated} stroke={C.border} strokeWidth="1.5" />
          <text x="52" y="624" fontSize="11" fill={C.secondary}>端到端证书：page range · occupancy · split/borrow/merge · leaf depth · page access</text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="B 树的关键不是把节点做大，而是让每次下降都在有序页面和占用不变量保护下发生。"
          reset={{ label: "重置实验", ariaLabel: "重置 B 树实验", onClick: reset }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        B 树把外存代价显式建模为 page access，并用 split、borrow、merge 与等深叶子共同维护结构证书。
      </figcaption>
    </figure>
  );
}
