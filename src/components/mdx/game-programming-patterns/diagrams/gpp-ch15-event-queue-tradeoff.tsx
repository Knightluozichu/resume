"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh15EventQueueTradeoff>：事件队列模式取舍对照动画（GPP 第15章 · 图2）。
 *
 * 故事：UI 按钮要播放音频。
 *  ① 场景：UI 按钮（发送者）+ Audio（接收者）
 *  ② 基线（同步直调）：UI 直接调用 playSound()，阻塞等待 → 卡顿 ✗
 *  ③ 候选（事件队列）：UI 入队即返回，Audio 按自己节奏处理 → 流畅 ✓
 *  ④ 对照：队列把"发送"和"处理"在时间上解耦
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "UI 按钮（发送者）要播放音频，Audio（接收者）负责播放" },
  { label: "sync", caption: "基线（同步直调）：UI 直接调用 playSound()，阻塞等待 Audio 完成 → 卡顿 ✗" },
  { label: "queue", caption: "候选（事件队列）：UI 入队即返回不阻塞，Audio 按自己节奏处理 → 流畅 ✓" },
  { label: "insight", caption: "对照：队列把“发送”和“处理”在时间上解耦" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh15EventQueueTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const syncBadgeRef = useRef<SVGGElement | null>(null);
  const queueBadgeRef = useRef<SVGGElement | null>(null);
  const syncRef = useRef<SVGGElement | null>(null);
  const queueRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：UI + Audio
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② sync（t: T→2T）：同步徽章 + 直调箭头（红）+ 判定✗
      tl.add(syncBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(syncRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.1);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("sync", T);

      // ③ queue（t: 2T→3T）：切候选——同步淡出，队列徽章 + 队列（绿）+ 判定✓
      tl.add(syncBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(syncRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(queueBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(queueRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.3);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.label("queue", T * 2);

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
          aria-label="事件队列模式取舍对照动画。UI 按钮发送者要播放音频，Audio 接收者负责播放。基线同步直调，UI 直接调用 playSound 阻塞等待 Audio 完成卡顿。候选事件队列，UI 入队即返回不阻塞，Audio 按自己节奏处理流畅。对照：队列把发送和处理在时间上解耦。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：同步直调 vs 事件队列
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            队列把"发送"和"处理"在时间上解耦
          </text>

          {/* 方式徽章 */}
          <g ref={syncBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 同步直调</text>
          </g>
          <g ref={queueBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 事件队列</text>
          </g>

          {/* 场景：UI + Audio */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <rect x="80" y="90" width="120" height="44" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.2" />
            <text x="140" y="117" textAnchor="middle" fontSize="12" fill="var(--text-primary)">UI 按钮</text>
            <rect x="520" y="90" width="120" height="44" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.2" />
            <text x="580" y="117" textAnchor="middle" fontSize="12" fill="var(--text-primary)">Audio</text>
          </g>

          {/* 同步直调（红） */}
          <g ref={syncRef} style={{ opacity: 0 }}>
            <line x1="200" y1="112" x2="520" y2="112" stroke={WARN_COLOR} strokeWidth="2.5" />
            <text x="360" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>直接调用 playSound()</text>
            <text x="360" y="155" textAnchor="middle" fontSize="11" fill={WARN_COLOR}>UI 阻塞等待 Audio 完成 → 卡顿</text>
            <text x="360" y="175" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">发送者必须知道接收者是谁、何时空闲</text>
          </g>

          {/* 事件队列（绿） */}
          <g ref={queueRef} style={{ opacity: 0 }}>
            <line x1="200" y1="112" x2="300" y2="112" stroke={OK_COLOR} strokeWidth="1.5" />
            <rect x="300" y="90" width="160" height="44" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="380" y="117" textAnchor="middle" fontSize="11" fontWeight="600" fill={OK_COLOR}>事件队列 [🔊]</text>
            <line x1="460" y1="112" x2="520" y2="112" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="360" y="155" textAnchor="middle" fontSize="11" fill={OK_COLOR}>UI 入队即返回，不阻塞 → 流畅</text>
            <text x="360" y="175" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">Audio 按自己节奏从队列取事件处理</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="220" width="600" height="44" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="247" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ 同步直调：时间耦合，发送者阻塞等接收者</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="220" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="247" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 事件队列：时间解耦，发送者入队即走</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="290" width="600" height="50" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="312" fontSize="12" fontWeight="700" fill={OK_COLOR}>队列在发送与处理之间做缓冲，二者在时间上解耦</text>
            <text x="76" y="331" fontSize="11" fill="var(--text-secondary)">代价：事件有延迟、队列可能堆积、调试更难追踪（见反例）</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（同步直调）发送者阻塞等接收者；候选（事件队列）发送者入队即走、接收者按自己节奏处理。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：同步直调让发送者阻塞等接收者，时间耦合；事件队列让发送者入队即走，接收者按自己节奏处理，时间解耦。代价是延迟和调试难度。
      </figcaption>
    </figure>
  );
}
