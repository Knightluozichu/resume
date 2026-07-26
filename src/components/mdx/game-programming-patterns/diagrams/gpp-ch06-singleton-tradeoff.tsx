"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh06SingletonTradeoff>：单例模式取舍对照动画（GPP 第6章 · 图2）。
 *
 * 故事：战斗/菜单/过场三个场景都需要 AudioManager。
 *  ① 场景：3 个调用者
 *  ② 基线（随意 new）：3 个实例 × 3 份状态（音量 80/30/0），互不一致 ✗
 *  ③ 候选（单例）：1 个实例 × 1 份状态（音量 72），所有场景共享 ✓
 *  ④ 对照：单例 = 唯一实例 + 全局访问点
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const CALLERS = [
  { id: "battle", label: "战斗场景", x: 120 },
  { id: "menu", label: "菜单界面", x: 360 },
  { id: "cutscene", label: "过场动画", x: 600 },
];

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "战斗/菜单/过场三个场景都需要 AudioManager" },
  { label: "naive", caption: "基线（随意 new）：3 个实例 × 3 份状态（音量 80/30/0），互不一致 ✗" },
  { label: "singleton", caption: "候选（单例）：1 个实例 × 1 份状态（音量 72），所有场景共享 ✓" },
  { label: "insight", caption: "对照：单例 = 唯一实例 + 全局访问点；但全局访问 ≠ 全局状态" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh06SingletonTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const naiveBadgeRef = useRef<SVGGElement | null>(null);
  const singletonBadgeRef = useRef<SVGGElement | null>(null);
  const naiveGroupRef = useRef<SVGGElement | null>(null);
  const singletonGroupRef = useRef<SVGGElement | null>(null);
  const naiveLinesRef = useRef<SVGGElement | null>(null);
  const singletonLinesRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② naive（t: T→2T）：随意 new 徽章 + 3 实例（红）+ 连线
      tl.add(naiveBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(naiveLinesRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.1);
      tl.add(naiveGroupRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.2);
      tl.label("naive", T);

      // ③ singleton（t: 2T→3T）：切候选——基线淡出，单例徽章 + 1 实例（绿）+ 连线
      tl.add(naiveBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(naiveLinesRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(naiveGroupRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(singletonBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(singletonLinesRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.3);
      tl.add(singletonGroupRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.4);
      tl.label("singleton", T * 2);

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
          aria-label="单例模式取舍对照动画。战斗菜单过场三个场景都需要 AudioManager。基线随意 new 产生 3 个实例各持不同状态音量 80 30 0 互不一致。候选单例保证全局唯一实例，所有场景共享同一状态音量 72。对照：单例等于唯一实例加全局访问点，但全局访问不等于全局状态。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：随意 new（多实例）vs 单例（唯一）
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            单例提供两个保证：唯一实例 + 全局访问点
          </text>

          {/* 方式徽章 */}
          <g ref={naiveBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 随意 new</text>
          </g>
          <g ref={singletonBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 单例</text>
          </g>

          {/* 场景：3 个调用者 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {CALLERS.map((c) => (
              <g key={c.id}>
                <rect x={c.x - 50} y="100" width="100" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.2" />
                <text x={c.x} y="123" textAnchor="middle" fontSize="12" fill="var(--text-primary)">{c.label}</text>
              </g>
            ))}
          </g>

          {/* 基线：3 实例 */}
          <g ref={naiveLinesRef} style={{ opacity: 0 }}>
            {CALLERS.map((c) => (
              <line key={c.id} x1={c.x} y1="136" x2={c.x} y2="195" stroke={WARN_COLOR} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.8" />
            ))}
          </g>
          <g ref={naiveGroupRef} style={{ opacity: 0 }}>
            {CALLERS.map((c, i) => (
              <g key={c.id}>
                <rect x={c.x - 60} y="195" width="120" height="82" rx="10" fill={WARN_COLOR} fillOpacity="0.06" stroke={WARN_COLOR} strokeWidth="1.5" />
                <text x={c.x} y="217" textAnchor="middle" fontSize="11" fontWeight="600" fill={WARN_COLOR}>AudioManager #{i + 1}</text>
                <text x={c.x} y="237" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">vol: {[80, 30, 0][i]}</text>
                <text x={c.x} y="254" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{["battle_theme", "menu_ambient", "silence"][i]}</text>
                <text x={c.x} y="271" textAnchor="middle" fontSize="11" fill={WARN_COLOR}>✗ 不一致</text>
              </g>
            ))}
          </g>

          {/* 候选：1 实例 */}
          <g ref={singletonLinesRef} style={{ opacity: 0 }}>
            {CALLERS.map((c) => (
              <line key={c.id} x1={c.x} y1="136" x2="360" y2="195" stroke={OK_COLOR} strokeWidth="1.5" opacity="0.7" />
            ))}
          </g>
          <g ref={singletonGroupRef} style={{ opacity: 0 }}>
            <rect x="270" y="195" width="180" height="92" rx="12" fill={OK_COLOR} fillOpacity="0.06" stroke={OK_COLOR} strokeWidth="2" />
            <text x="360" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>AudioManager（唯一）</text>
            <text x="360" y="243" textAnchor="middle" fontSize="11" fill="var(--text-primary)">vol: 72</text>
            <text x="360" y="261" textAnchor="middle" fontSize="11" fill="var(--text-primary)">battle_theme</text>
            <text x="360" y="280" textAnchor="middle" fontSize="11" fill={OK_COLOR}>✓ 全局一致</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="310" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="335" fontSize="13" fontWeight="700" fill={OK_COLOR}>单例 = 唯一实例 + 全局访问点 → 所有场景读写同一状态</text>
            <text x="76" y="357" fontSize="11" fill="var(--text-secondary)">代价：全局访问点也是隐式依赖（见反例）；全局访问 ≠ 全局状态</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（随意 new）3 个实例状态互不一致；候选（单例）唯一实例、全局一致。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：随意 new 产生多个状态不一致的实例；单例保证全局唯一实例、所有调用者共享同一状态。
      </figcaption>
    </figure>
  );
}
