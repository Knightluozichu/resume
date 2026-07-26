"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh07StateFsm>：有限状态机机制动画（GPP 第7章 · 图1）。
 *
 * 核心：把对象的行为随内部状态切换的逻辑，显式建模为状态机/状态对象，避免散落的布尔标志。
 *
 * 场景：英雄 Bjørn 的行为由状态机驱动——站立 / 跳跃 / 俯冲 / 攻击。按键触发状态转换，
 * 当前状态决定行为与可响应输入。
 *
 * 节拍：
 *  ① 状态机结构：四个状态节点 + 标在边上的转换条件
 *  ② 初始状态 = 站立
 *  ③ 按 B → 站立 转换为 跳跃
 *  ④ 按下 → 跳跃 转换为 俯冲
 *  ⑤ 触地回站立，再按 A → 站立 转换为 攻击
 *  ⑥ 当前状态决定行为与可响应输入；非法输入直接被忽略
 */

const VIEW_W = 720;
const VIEW_H = 480;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";

const T = TEACHING_BEAT_MS;
const R = 46;

type StateId = "standing" | "jumping" | "diving" | "attacking";

const STATES: readonly { id: StateId; label: string; sub: string; x: number; y: number }[] = [
  { id: "standing", label: "站立", sub: "Standing", x: 200, y: 160 },
  { id: "jumping", label: "跳跃", sub: "Jumping", x: 500, y: 160 },
  { id: "diving", label: "俯冲", sub: "Diving", x: 500, y: 330 },
  { id: "attacking", label: "攻击", sub: "Attacking", x: 200, y: 330 },
];

const STATE_MAP: Record<StateId, (typeof STATES)[number]> = Object.fromEntries(
  STATES.map((s) => [s.id, s]),
) as Record<StateId, (typeof STATES)[number]>;

type Transition = { from: StateId; to: StateId; input: string; lx: number; ly: number };

const TRANSITIONS: readonly Transition[] = [
  { from: "standing", to: "jumping", input: "按 B", lx: 350, ly: 140 },
  { from: "jumping", to: "diving", input: "按下", lx: 560, ly: 245 },
  { from: "diving", to: "standing", input: "触地", lx: 350, ly: 372 },
  { from: "standing", to: "attacking", input: "按 A", lx: 140, ly: 245 },
  { from: "attacking", to: "standing", input: "完成", lx: 250, ly: 245 },
];

function edgeGeom(t: Transition) {
  const from = STATE_MAP[t.from];
  const to = STATE_MAP[t.to];
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  return {
    x1: from.x + ux * R,
    y1: from.y + uy * R,
    x2: to.x - ux * (R + 8),
    y2: to.y - uy * (R + 8),
  };
}

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "状态机结构：四个状态节点（站立/跳跃/俯冲/攻击），转换条件标在边上" },
  { label: "standing", caption: "初始状态 = 站立；当前状态决定行为与可响应的输入" },
  { label: "jump", caption: "按 B：站立 → 跳跃（转换条件满足，高亮沿边移动）" },
  { label: "dive", caption: "按下：跳跃 → 俯冲" },
  { label: "attack", caption: "触地回到站立，再按 A：站立 → 攻击" },
  { label: "insight", caption: "当前状态决定行为；非法输入在当前状态直接被忽略，避免散落布尔标志的组合爆炸" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh07StateFsm() {
  const structRef = useRef<SVGGElement | null>(null);
  const hiRefs = useRef<Record<string, SVGGElement | null>>({});
  const edgeRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：结构淡入
      tl.add(structRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② standing（t: T→2T）：站立高亮
      tl.add(hiRefs.current["standing"]!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T);
      tl.label("standing", T);

      // ③ jump（t: 2T→3T）：边0亮起，高亮 站立→跳跃
      tl.add(edgeRefs.current["0"]!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2);
      tl.add(hiRefs.current["standing"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(hiRefs.current["jumping"]!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.4);
      tl.label("jump", T * 2);

      // ④ dive（t: 3T→4T）：边1亮起，高亮 跳跃→俯冲
      tl.add(edgeRefs.current["1"]!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3);
      tl.add(hiRefs.current["jumping"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3.2);
      tl.add(hiRefs.current["diving"]!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.4);
      tl.label("dive", T * 3);

      // ⑤ attack（t: 4T→5T）：边2亮起 俯冲→站立；随后边3亮起 站立→攻击
      tl.add(edgeRefs.current["2"]!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 4);
      tl.add(hiRefs.current["diving"]!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 4.1);
      tl.add(hiRefs.current["standing"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.2);
      tl.add(edgeRefs.current["3"]!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 4.5);
      tl.add(hiRefs.current["standing"]!, { opacity: [1, 0], duration: T * 0.25, ease: "out(3)" }, T * 4.6);
      tl.add(hiRefs.current["attacking"]!, { opacity: [0, 1], duration: T * 0.35, ease: "out(3)" }, T * 4.7);
      tl.label("attack", T * 4);

      // ⑥ insight（t: 5T→6T）：结论浮现
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 5);
      tl.label("insight", T * 5);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🎮</span>
            机制
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="有限状态机机制动画。英雄 Bjørn 的行为由状态机驱动：站立、跳跃、俯冲、攻击四个状态节点，转换条件标在边上。初始状态站立，按 B 从站立转换为跳跃，按下从跳跃转换为俯冲，触地回到站立，再按 A 从站立转换为攻击。当前状态决定行为与可响应的输入，非法输入在当前状态直接被忽略，避免散落布尔标志的组合爆炸与非法状态。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker id="gpp07-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill="var(--text-secondary)" />
            </marker>
            <marker id="gpp07-arrow-active" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto">
              <path d="M0,0 L7,3.5 L0,7 Z" fill={ACCENT} />
            </marker>
          </defs>

          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            状态机：行为随内部状态显式切换
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            当前状态决定行为与可响应的输入；转换条件标在边上
          </text>

          {/* 结构：转换边（暗）+ 状态圆（暗）+ 标签 */}
          <g ref={structRef} style={{ opacity: 0 }}>
            {TRANSITIONS.map((t, i) => {
              const g = edgeGeom(t);
              return (
                <g key={`base-${i}`}>
                  <line x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} stroke="var(--text-secondary)" strokeWidth="1.4" strokeOpacity="0.45" markerEnd="url(#gpp07-arrow)" />
                  <rect x={t.lx - 26} y={t.ly - 12} width={52} height={20} rx="5" fill="var(--elevated)" stroke="var(--border)" strokeWidth="1" />
                  <text x={t.lx} y={t.ly + 2} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-secondary)">{t.input}</text>
                </g>
              );
            })}
            {STATES.map((s) => (
              <g key={s.id}>
                <circle cx={s.x} cy={s.y} r={R} fill="var(--text-secondary)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1.6" />
                <text x={s.x} y={s.y - 2} textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--text-primary)">{s.label}</text>
                <text x={s.x} y={s.y + 16} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{s.sub}</text>
              </g>
            ))}
            {/* 初始标记 */}
            <circle cx={STATE_MAP.standing.x - R - 18} cy={STATE_MAP.standing.y} r="5" fill="var(--text-primary)" />
            <line x1={STATE_MAP.standing.x - R - 13} y1={STATE_MAP.standing.y} x2={STATE_MAP.standing.x - R - 2} y2={STATE_MAP.standing.y} stroke="var(--text-primary)" strokeWidth="1.6" markerEnd="url(#gpp07-arrow)" />
          </g>

          {/* 高亮当前状态（叠加层） */}
          {STATES.map((s) => (
            <g key={`hi-${s.id}`} ref={(el) => { hiRefs.current[s.id] = el; }} style={{ opacity: 0 }}>
              <circle cx={s.x} cy={s.y} r={R} fill={ACCENT} fillOpacity="0.18" stroke={ACCENT} strokeWidth="3" />
              <circle cx={s.x} cy={s.y} r={R - 7} fill="none" stroke={ACCENT} strokeWidth="1.4" />
              <text x={s.x} y={s.y - 2} textAnchor="middle" fontSize="14" fontWeight="700" fill={ACCENT}>{s.label}</text>
            </g>
          ))}

          {/* 高亮转换边（叠加层） */}
          {TRANSITIONS.map((t, i) => {
            const g = edgeGeom(t);
            return (
              <g key={`edge-${i}`} ref={(el) => { edgeRefs.current[String(i)] = el; }} style={{ opacity: 0 }}>
                <line x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} stroke={ACCENT} strokeWidth="2.6" markerEnd="url(#gpp07-arrow-active)" />
                <rect x={t.lx - 26} y={t.ly - 12} width={52} height={20} rx="5" fill="var(--elevated)" stroke={ACCENT} strokeWidth="1.4" />
                <text x={t.lx} y={t.ly + 2} textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>{t.input}</text>
              </g>
            );
          })}

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="40" y="404" width="640" height="52" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="56" y="426" fontSize="12" fontWeight="700" fill={OK_COLOR}>每个状态是明确节点，转换标在边上、由输入触发</text>
            <text x="56" y="446" fontSize="11" fill="var(--text-secondary)">避免散落布尔标志的组合爆炸与非法状态，状态流转可复查</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="状态机把'现在是什么情况 + 该有什么行为'显式化：每个状态是节点，转换标在边上由输入触发，当前状态决定行为与可响应输入。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        状态（State）：把对象行为随内部状态切换的逻辑显式建模为状态机——每个状态是一个
        明确节点，状态间的转换标在边上、由输入触发。当前状态决定对象的行为与可响应的输入。
      </figcaption>
    </figure>
  );
}
