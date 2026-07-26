"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh07StateTradeoff>：状态模式取舍对照动画（GPP 第7章 · 图2）。
 *
 * 故事：描述主角的行为。
 *  ① 场景：3 个布尔标志 isJumping/isDiving/isAttacking
 *  ② 基线（布尔标志）：同时勾跳跃+俯冲 → 2 个为真 → 非法组合（2³=8 种组合多数非法）✗
 *  ③ 候选（状态机）：4 个显式状态，任一时刻只有一个当前状态
 *  ④ 候选切换：站立→跳跃→俯冲，状态机自动离开前一状态 ✓
 *  ⑤ 对照：状态把"现在是什么情况 + 该有什么行为"显式化
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const FLAGS = ["isJumping", "isDiving", "isAttacking"];
const STATES = [
  { id: "stand", label: "站立", cx: 150 },
  { id: "jump", label: "跳跃", cx: 300 },
  { id: "dive", label: "俯冲", cx: 450 },
  { id: "attack", label: "攻击", cx: 600 },
];

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "用 3 个布尔标志 isJumping/isDiving/isAttacking 描述主角行为" },
  { label: "flags-illegal", caption: "基线（布尔标志）：同时跳跃+俯冲 → 2 个为真 → 非法组合（2³=8 种组合多数非法）✗" },
  { label: "fsm", caption: "候选（状态机）：4 个显式状态，任一时刻只有一个当前状态" },
  { label: "fsm-switch", caption: "候选切换：站立→跳跃→俯冲，状态机自动离开前一状态，无非法态 ✓" },
  { label: "insight", caption: "对照：状态把“现在是什么情况 + 该有什么行为”显式化" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh07StateTradeoff() {
  const flagsGroupRef = useRef<SVGGElement | null>(null);
  const jumpFlagRef = useRef<SVGGElement | null>(null);
  const diveFlagRef = useRef<SVGGElement | null>(null);
  const illegalNoteRef = useRef<SVGGElement | null>(null);
  const fsmGroupRef = useRef<SVGGElement | null>(null);
  const curStandRef = useRef<SVGCircleElement | null>(null);
  const curJumpRef = useRef<SVGCircleElement | null>(null);
  const curDiveRef = useRef<SVGCircleElement | null>(null);
  const fsmNoteRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：3 个标志（全 false）
      tl.add(flagsGroupRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② flags-illegal（t: T→2T）：勾 isJumping + isDiving → 非法
      tl.add(jumpFlagRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.1);
      tl.add(diveFlagRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.3);
      tl.add(illegalNoteRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("flags-illegal", T);

      // ③ fsm（t: 2T→3T）：标志淡出，状态机 4 状态出现（站立为当前）
      tl.add(flagsGroupRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(illegalNoteRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(fsmGroupRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2.2);
      tl.add(curStandRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.5);
      tl.label("fsm", T * 2);

      // ④ fsm-switch（t: 3T→4T）：当前状态 站立→跳跃→俯冲
      tl.add(curStandRef.current!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3.1);
      tl.add(curJumpRef.current!, { opacity: [0, 1], duration: T * 0.2, ease: "out(3)" }, T * 3.2);
      tl.add(curJumpRef.current!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3.5);
      tl.add(curDiveRef.current!, { opacity: [0, 1], duration: T * 0.2, ease: "out(3)" }, T * 3.6);
      tl.add(fsmNoteRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.8);
      tl.label("fsm-switch", T * 3);

      // ⑤ insight（t: 4T→4.6T）
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 4);
      tl.label("insight", T * 4);
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
          aria-label="状态模式取舍对照动画。用三个布尔标志 isJumping isDiving isAttacking 描述主角行为。基线布尔标志同时勾跳跃加俯冲，两个为真，非法组合，2 的 3 次方等于 8 种组合多数非法。候选状态机有四个显式状态，任一时刻只有一个当前状态，切换时自动离开前一状态，无非法态。对照：状态把现在是什么情况加该有什么行为显式化。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：散落布尔标志 vs 显式状态机
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            布尔标志组合爆炸有非法态；状态机任一时刻只有一个状态
          </text>

          {/* 基线：3 个布尔标志 */}
          <g ref={flagsGroupRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill={WARN_COLOR}>散落布尔标志</text>
            {FLAGS.map((f, i) => (
              <g key={f}>
                <rect x={60 + i * 200} y="100" width="180" height="44" rx="8" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.4" />
                <text x={76 + i * 200} y="120" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">☐ {f}</text>
                <text x={76 + i * 200} y="136" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">= false</text>
              </g>
            ))}
            {/* 勾选覆盖层（红） */}
            <g ref={jumpFlagRef} style={{ opacity: 0 }}>
              <rect x="60" y="100" width="180" height="44" rx="8" fill={WARN_COLOR} fillOpacity="0.18" stroke={WARN_COLOR} strokeWidth="1.6" />
              <text x="76" y="120" fontSize="11" fontWeight="700" fontFamily="monospace" fill={WARN_COLOR}>☑ isJumping = true</text>
            </g>
            <g ref={diveFlagRef} style={{ opacity: 0 }}>
              <rect x="260" y="100" width="180" height="44" rx="8" fill={WARN_COLOR} fillOpacity="0.18" stroke={WARN_COLOR} strokeWidth="1.6" />
              <text x="276" y="120" fontSize="11" fontWeight="700" fontFamily="monospace" fill={WARN_COLOR}>☑ isDiving = true</text>
            </g>
          </g>
          {/* 非法提示 */}
          <g ref={illegalNoteRef} style={{ opacity: 0 }}>
            <rect x="60" y="170" width="600" height="50" rx="10" fill={WARN_COLOR} fillOpacity="0.08" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="192" fontSize="11" fontWeight="700" fill="var(--text-secondary)">3 个标志 → 2³ = 8 种组合</text>
            <text x="76" y="212" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ 2 个标志同时为真：跳跃+俯冲，非法组合</text>
          </g>

          {/* 候选：状态机 */}
          <g ref={fsmGroupRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill={OK_COLOR}>显式状态机</text>
            {STATES.map((s) => (
              <g key={s.id}>
                <circle cx={s.cx} cy="140" r="42" fill="var(--text-secondary)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1.4" />
                <text x={s.cx} y="145" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">{s.label}</text>
              </g>
            ))}
            {/* 当前状态高亮环 */}
            <circle ref={curStandRef} cx={STATES[0].cx} cy="140" r="48" fill="none" stroke={OK_COLOR} strokeWidth="2.6" style={{ opacity: 0 }} />
            <circle ref={curJumpRef} cx={STATES[1].cx} cy="140" r="48" fill="none" stroke={OK_COLOR} strokeWidth="2.6" style={{ opacity: 0 }} />
            <circle ref={curDiveRef} cx={STATES[2].cx} cy="140" r="48" fill="none" stroke={OK_COLOR} strokeWidth="2.6" style={{ opacity: 0 }} />
          </g>
          <g ref={fsmNoteRef} style={{ opacity: 0 }}>
            <rect x="60" y="210" width="600" height="40" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="235" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 任一时刻只有一个当前状态，转换自动离开前一状态</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="280" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="305" fontSize="13" fontWeight="700" fill={OK_COLOR}>状态机：状态显式集中、转换条件标在边上，天然无非法态</text>
            <text x="76" y="327" fontSize="11" fill="var(--text-secondary)">状态把“现在是什么情况 + 该有什么行为”显式化；代价是状态多时转换表膨胀</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（布尔标志）组合爆炸、易非法；候选（状态机）任一时刻只有一个状态，无非法态。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：散落布尔标志会组合爆炸、产生非法状态且标志易不同步；显式状态机任一时刻只有一个当前状态，转换条件集中、天然无非法态。
      </figcaption>
    </figure>
  );
}
