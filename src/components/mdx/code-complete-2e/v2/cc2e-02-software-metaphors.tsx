"use client";

import { useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "@/components/mdx/anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "@/components/mdx/anim/use-teaching-timeline";

const VIEW_W = 780;
const VIEW_H = 460;
const T = TEACHING_BEAT_MS;

const ACCENT = "var(--accent)";
const MUTED = "var(--text-secondary)";
const PRIMARY = "var(--text-primary)";
const BORDER = "var(--border)";
const SUCCESS = "var(--success)";
const WARNING = "var(--warning)";

const OFFICIAL_NODES = [
  "第2章 用隐喻来更充分地理解软件开发",
  "2.1 隐喻的重要性",
  "2.2 如何使用软件隐喻",
  "2.3 常见的软件隐喻",
  "软件中的书法：写作代码",
  "软件的耕作法：培植系统",
  "软件的牡蛎养殖观点：系统生长",
  "软件构建：建造软件",
  "应用软件技术：智慧工具箱",
  "组合各个隐喻",
  "更多资源",
  "关键点",
] as const;

const METAPHORS = [
  {
    id: "craft",
    label: "书法",
    name: "软件中的书法：写作代码",
    maps: "表达、结构与修改都需要熟练度",
    omission: "它不等于审美偏好，也不能替代测试与协作",
  },
  {
    id: "garden",
    label: "耕作",
    name: "软件的耕作法：培植系统",
    maps: "小步照料、反馈和渐进式生长",
    omission: "它不能把系统当成自然物而放弃边界和设计",
  },
  {
    id: "oyster",
    label: "牡蛎养殖",
    name: "软件的牡蛎养殖观点：系统生长",
    maps: "在受控环境中逐步积累复杂度与价值",
    omission: "它不保证每个需求都会自然长成可维护功能",
  },
] as const;

const STEPS: readonly TeachingStep[] = [
  {
    label: "question",
    caption: "先把陌生问题说清楚：隐喻只能提供候选视角。",
  },
  {
    label: "mapping",
    caption: "列出映射成立处，并把对象、关系和观察窗口写下来。",
  },
  {
    label: "counterexample",
    caption: "注入一个遗漏或反例，检查模型在哪一步失效。",
  },
  {
    label: "decision",
    caption: "保留适用边界，才把隐喻转成可复核的工程决定。",
  },
] as const;

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type MetaphorId = (typeof METAPHORS)[number]["id"];

export function Cc2e02SoftwareMetaphorsMechanismLab() {
  const [metaphorId, setMetaphorId] = useState<MetaphorId>("craft");
  const [faultInjected, setFaultInjected] = useState(false);
  const stageRefs = useRef<Record<string, SVGGElement | null>>({});
  const mappingRef = useRef<SVGLineElement | null>(null);
  const counterexampleRef = useRef<SVGGElement | null>(null);
  const decisionRef = useRef<SVGGElement | null>(null);
  const metaphor = METAPHORS.find((item) => item.id === metaphorId) ?? METAPHORS[0];

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      tl.add(stageRefs.current.question!, { opacity: [0, 1], duration: T * 0.6 }, 0);
      tl.label("question", 0);
      tl.add(stageRefs.current.mapping!, { opacity: [0, 1], duration: T * 0.6 }, T);
      tl.label("mapping", T);
      tl.add(counterexampleRef.current!, { opacity: [0, 1], duration: T * 0.6 }, T * 2);
      tl.label("counterexample", T * 2);
      tl.add(decisionRef.current!, { opacity: [0, 1], duration: T * 0.6 }, T * 3);
      tl.label("decision", T * 3);
      tl.add(mappingRef.current!, { strokeWidth: [1, 3], duration: T * 0.35 }, T);
    },
  });

  const reset = () => {
    setMetaphorId("craft");
    setFaultInjected(false);
    timeline.goToStep(0);
  };

  return (
    <section
      aria-label="软件隐喻机制实验"
      data-visual-kind="cc2e-software-metaphors-mechanism"
      className="not-prose my-8 min-w-0 overflow-hidden rounded-card border border-border bg-elevated"
    >
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-wide text-accent">
            第2章 · 反例约束的多模型推理
          </p>
          <h3 className="mt-1 text-base font-semibold text-primary">
            隐喻不是答案：从映射走到工程决定
          </h3>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-secondary">
            选择一个软件隐喻，再打开反例注入；只有保留遗漏项和退出条件，类比才不会悄悄变成系统事实。
          </p>
        </div>
        <span className="rounded-control border border-border bg-surface px-3 py-2 text-xs text-secondary">
          目录节点 {OFFICIAL_NODES.length}/12
        </span>
      </header>

      <div className="min-w-0 p-5">
        <div className="grid min-w-0 gap-3 sm:grid-cols-3" aria-label="选择隐喻">
          {METAPHORS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={metaphorId === item.id}
              onClick={() => setMetaphorId(item.id)}
              className={`min-h-11 min-w-0 rounded-control border px-3 py-2 text-left text-sm transition-colors ${
                metaphorId === item.id
                  ? "border-accent bg-accent/10 text-primary"
                  : "border-border bg-surface text-secondary hover:border-accent hover:text-primary"
              }`}
            >
              <span className="block font-semibold">{item.label}</span>
              <span className="mt-1 block truncate text-xs">{item.name}</span>
            </button>
          ))}
        </div>

        <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-border bg-surface px-3 py-2 text-sm text-primary">
          <input
            type="checkbox"
            checked={faultInjected}
            onChange={(event) => setFaultInjected(event.target.checked)}
            className="h-5 w-5 accent-accent"
          />
          <span>
            注入遗漏：把“{metaphor.label}”的映射当成事实，跳过反例检查
          </span>
        </label>

        <div className="mt-5 min-w-0 overflow-x-auto rounded-card border border-border bg-surface p-3">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`软件隐喻机制图：从陌生问题经过候选隐喻、映射表和反例检查，最后形成工程决定。当前隐喻为${metaphor.name}。${faultInjected ? "当前已注入遗漏，工程决定被标为待拒绝。" : "当前没有注入遗漏。"}图支持播放、暂停、单步、拖动进度、选择隐喻、反例注入和重置。`}
            className="mx-auto block h-auto min-w-[330px] w-full max-w-[780px]"
          >
            <defs>
              <marker id="cc2e-metaphor-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill={ACCENT} />
              </marker>
            </defs>

            <text x="24" y="30" fontSize="18" fontWeight="700" fill={PRIMARY}>
              五节点机制链：隐喻 → 映射 → 反例 → 决定
            </text>
            <text x="24" y="52" fontSize="12" fill={MUTED}>
              {metaphor.name} · 只保留能被反例约束的部分
            </text>

            <line x1="115" y1="177" x2="665" y2="177" stroke={BORDER} strokeWidth="2" />
            {[115, 252, 389, 526, 665].map((x, index) => (
              <circle key={`track-${x}-${index}`} cx={x} cy="177" r="7" fill="var(--bg)" stroke={BORDER} strokeWidth="2" />
            ))}

            {[
              ["question", 32, "1", "陌生问题"],
              ["mapping", 169, "2", "候选隐喻"],
              ["counterexample", 306, "3", "映射表"],
              ["counterexample-check", 443, "4", "反例检查"],
              ["decision", 582, "5", "工程决定"],
            ].map(([key, x, number, label], index) => (
              <g key={`${String(key)}-${index}`}>
                <rect x={Number(x)} y="95" width="118" height="82" rx="12" fill="var(--bg)" stroke={BORDER} strokeWidth="1.5" />
                <circle cx={Number(x) + 20} cy="119" r="12" fill={index === 4 ? SUCCESS : ACCENT} />
                <text x={Number(x) + 20} y="124" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--bg)">{number}</text>
                <text x={Number(x) + 59} y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill={PRIMARY}>{label}</text>
                <text x={Number(x) + 59} y="149" textAnchor="middle" fontSize="11" fill={MUTED}>
                  {index === 0 ? "对象与边界" : index === 1 ? "选择视角" : index === 2 ? "成立 / 遗漏" : index === 3 ? "最小失败" : "适用 / 退出"}
                </text>
              </g>
            ))}

            <g ref={(node) => { stageRefs.current.question = node; }} style={{ opacity: 0 }}>
              <circle cx="115" cy="177" r="12" fill={ACCENT} />
              <text x="115" y="181" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bg)">问</text>
            </g>
            <g ref={(node) => { stageRefs.current.mapping = node; }} style={{ opacity: 0 }}>
              <circle cx="252" cy="177" r="12" fill={ACCENT} />
              <text x="252" y="181" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bg)">映</text>
            </g>
            <g ref={counterexampleRef} style={{ opacity: 0 }}>
              <circle cx="389" cy="177" r="12" fill={WARNING} />
              <text x="389" y="181" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bg)">例</text>
            </g>
            <g ref={decisionRef} style={{ opacity: 0 }}>
              <circle cx="665" cy="177" r="12" fill={SUCCESS} />
              <text x="665" y="181" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--bg)">决</text>
            </g>

            <line ref={mappingRef} x1="252" y1="217" x2="389" y2="217" stroke={ACCENT} strokeWidth="1" markerEnd="url(#cc2e-metaphor-arrow)" />
            <text x="320" y="210" textAnchor="middle" fontSize="11" fill={ACCENT}>映射关系</text>

            <rect x="32" y="250" width="700" height="74" rx="12" fill="var(--bg)" stroke={BORDER} strokeWidth="1.5" />
            <text x="50" y="276" fontSize="13" fontWeight="700" fill={PRIMARY}>当前映射：{metaphor.maps}</text>
            <text x="50" y="300" fontSize="12" fill={MUTED}>遗漏项：{metaphor.omission}</text>

            <g style={{ opacity: faultInjected ? 1 : 0 }}>
              <rect x="32" y="344" width="700" height="50" rx="10" fill="var(--bg)" stroke={WARNING} strokeWidth="2" strokeDasharray="6 4" />
              <text x="50" y="375" fontSize="13" fontWeight="700" fill={WARNING}>
                反例：把隐喻当作事实 → 结论拒绝，回到映射表补齐遗漏
              </text>
            </g>
            <g style={{ opacity: faultInjected ? 0 : 1 }}>
              <rect x="32" y="344" width="700" height="50" rx="10" fill="var(--bg)" stroke={SUCCESS} strokeWidth="1.5" />
              <text x="50" y="375" fontSize="13" fontWeight="700" fill={SUCCESS}>
                决定：采用可验证的启发，并声明边界、反例与退出条件
              </text>
            </g>
            <text x="32" y="430" fontSize="12" fill={MUTED}>
              {faultInjected ? "状态：待拒绝 · 需要补充反例后才能进入工程实现" : "状态：可继续 · 隐喻提供结构启发，证据决定能否采用"}
            </text>
          </svg>
        </div>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="先预测反例会在哪个节点出现，再用单步或播放检查你的预测。"
          reset={{ label: "重置实验", ariaLabel: "重置软件隐喻实验", onClick: reset }}
        />
      </div>
    </section>
  );
}
