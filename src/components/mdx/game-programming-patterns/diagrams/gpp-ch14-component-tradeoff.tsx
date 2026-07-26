"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh14ComponentTradeoff>：组件模式取舍对照动画（GPP 第14章 · 图2）。
 *
 * 故事：Player/Enemy/NPC 实体如何组织行为。
 *  ① 场景：三个实体需要物理/AI/渲染/音频行为
 *  ② 基线（单体巨类/继承）：所有行为塞在 God Class，复用靠继承，改一处牵全身 ✗
 *  ③ 候选（组件组合）：Entity = 组件容器，行为拆成独立组件，复用靠组合 ✓
 *  ④ 对照：组件把行为拆成可插拔模块，改一个不影响其他
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "Player/Enemy/NPC 实体需要物理/AI/渲染/音频行为" },
  { label: "monolith", caption: "基线（单体巨类/继承）：所有行为塞在 God Class，复用靠继承，改一处牵全身 ✗" },
  { label: "component", caption: "候选（组件组合）：Entity = 组件容器，行为拆成独立组件，复用靠组合 ✓" },
  { label: "insight", caption: "对照：组件把行为拆成可插拔模块，改一个组件不影响其他" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh14ComponentTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const monolithBadgeRef = useRef<SVGGElement | null>(null);
  const componentBadgeRef = useRef<SVGGElement | null>(null);
  const monolithRef = useRef<SVGGElement | null>(null);
  const componentRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② monolith（t: T→2T）：单体徽章 + God Class 继承树（红）+ 判定✗
      tl.add(monolithBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(monolithRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 1.1);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("monolith", T);

      // ③ component（t: 2T→3T）：切候选——单体淡出，组件徽章 + 组件容器（绿）+ 判定✓
      tl.add(monolithBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(monolithRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(componentBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(componentRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2.3);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.label("component", T * 2);

      // ④ insight（t: 3T→3.6T）
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 3);
      tl.label("insight", T * 3);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚖️</span>
            取舍对照
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="组件模式取舍对照动画。Player Enemy NPC 实体需要物理 AI 渲染音频行为。基线单体巨类继承，所有行为塞在 God Class，复用靠继承改一处牵全身。候选组件组合，Entity 等于组件容器，行为拆成独立组件，复用靠组合改一个不影响其他。对照：组件把行为拆成可插拔模块。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：单体巨类（继承）vs 组件组合
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            组件把行为拆成可插拔模块，复用靠组合不靠继承
          </text>

          {/* 方式徽章 */}
          <g ref={monolithBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 单体巨类</text>
          </g>
          <g ref={componentBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 组件组合</text>
          </g>

          {/* 场景标签 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">实体：Player · Enemy · NPC</text>
          </g>

          {/* 单体巨类（红） */}
          <g ref={monolithRef} style={{ opacity: 0 }}>
            <rect x="260" y="100" width="200" height="40" rx="8" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.5" />
            <text x="360" y="125" textAnchor="middle" fontSize="12" fontWeight="700" fill={WARN_COLOR}>GameObject（God Class）</text>
            {["Player", "Enemy", "NPC"].map((s, i) => (
              <g key={s}>
                <rect x={120 + i * 180} y="170" width="140" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.2" />
                <text x={190 + i * 180} y="193" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{s}</text>
                <line x1="360" y1="140" x2={190 + i * 180} y2="170" stroke={WARN_COLOR} strokeWidth="1.2" opacity="0.6" />
              </g>
            ))}
            <text x="360" y="235" textAnchor="middle" fontSize="11" fill={WARN_COLOR}>所有行为（物理+AI+渲染+音频）都在基类里，改物理 → 全部受影响</text>
          </g>

          {/* 组件容器（绿） */}
          <g ref={componentRef} style={{ opacity: 0 }}>
            <rect x="80" y="100" width="560" height="130" rx="12" fill={OK_COLOR} fillOpacity="0.04" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="100" y="124" fontSize="11" fontWeight="700" fill={OK_COLOR}>Entity = 组件容器</text>
            {["Physics", "AI", "Render", "Audio"].map((c, i) => (
              <g key={c}>
                <rect x={100 + i * 135} y="140" width="120" height="44" rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.3" />
                <text x={160 + i * 135} y="167" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{c}</text>
              </g>
            ))}
            <text x="360" y="215" textAnchor="middle" fontSize="11" fill={OK_COLOR}>每个组件独立：改 Physics 不影响 AI/Render/Audio；Player 和 Enemy 共享 Physics</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="270" width="600" height="44" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="297" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ 单体巨类：行为纠缠，复用靠继承，改一处牵全身</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="270" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="297" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 组件组合：行为解耦，复用靠组合，改一个不影响其他</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="340" width="600" height="50" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="362" fontSize="12" fontWeight="700" fill={OK_COLOR}>组合优于继承：实体是组件的容器，行为可插拔</text>
            <text x="76" y="381" fontSize="11" fill="var(--text-secondary)">代价：组件间通信需要额外机制（消息/共享状态，见反例）</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（单体巨类）行为纠缠、改一处牵全身；候选（组件组合）行为解耦、复用靠组合。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：单体巨类把行为纠缠在继承树里，复用靠继承、改一处牵全身；组件组合把行为拆成可插拔模块，复用靠组合、互不影响。代价是组件间通信需额外机制。
      </figcaption>
    </figure>
  );
}
