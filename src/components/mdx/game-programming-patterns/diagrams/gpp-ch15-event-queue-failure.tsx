"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh15EventQueueFailure>：事件队列模式反例复位动画（GPP 第15章 · 图3）。
 *
 * 故事：事件队列。
 *  ① 正常：队列平稳（2 个事件），入队速率 ≤ 处理速率
 *  ② 反例：反馈循环——处理事件时又产生新事件入队
 *  ③ 反例结果：队列无限膨胀 → 溢出 → 崩溃 ✗
 *  ④ 复位：队列上限（截断）+ 事件合并（同类去重）
 *  ⑤ 复位结果：队列稳定有界 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "正常：队列平稳（2 个事件），入队速率 ≤ 处理速率" },
  { label: "feedback", caption: "反例：反馈循环——处理事件时又产生新事件入队" },
  { label: "overflow", caption: "反例结果：队列无限膨胀 → 溢出 → 内存耗尽崩溃 ✗" },
  { label: "reset", caption: "复位：队列上限（截断）+ 事件合并（同类去重）" },
  { label: "bounded", caption: "复位结果：队列稳定有界 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh15EventQueueFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const queueNormalRef = useRef<SVGGElement | null>(null);
  const queueBrokenRef = useRef<SVGGElement | null>(null);
  const feedbackRef = useRef<SVGGElement | null>(null);
  const resetNoteRef = useRef<SVGGElement | null>(null);
  const queueResetRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：队列 + 2 个事件
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(queueNormalRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.4);
      tl.label("setup", 0);

      // ② feedback（t: T→2T）：反馈循环箭头（红）出现
      tl.add(feedbackRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 1.1);
      tl.label("feedback", T);

      // ③ overflow（t: 2T→3T）：正常队列淡出，爆满队列（红）出现 + 判定✗
      tl.add(queueNormalRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(queueBrokenRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.6);
      tl.label("overflow", T * 2);

      // ④ reset（t: 3T→4T）：爆满队列/反馈/坏判定淡出，复位说明 + 合并后队列（绿）出现
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(queueBrokenRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(feedbackRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(resetNoteRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.2);
      tl.add(queueResetRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.4);
      tl.label("reset", T * 3);

      // ⑤ bounded（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("bounded", T * 4);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">🧪</span>
            反例与复位
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="事件队列模式反例复位动画。正常时队列平稳两个事件入队速率小于等于处理速率。反例是反馈循环处理事件时又产生新事件入队，队列无限膨胀溢出内存耗尽崩溃。复位是队列上限截断加事件合并同类去重，队列稳定有界。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：反馈循环撑爆队列 → 复位加上限+合并
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            队列需要防护：上限 + 合并 + 丢弃策略
          </text>

          {/* 场景标签 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">事件队列</text>
            <rect x="60" y="96" width="600" height="50" rx="10" fill="rgba(255,255,255,0.03)" stroke="var(--border)" strokeWidth="1.5" />
          </g>

          {/* 正常队列（2 个事件） */}
          <g ref={queueNormalRef} style={{ opacity: 0 }}>
            {["🔊 play", "🎵 stop"].map((e, i) => (
              <g key={i}>
                <rect x={76 + i * 70} y="108" width="60" height="24" rx="4" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1" />
                <text x={106 + i * 70} y="124" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{e}</text>
              </g>
            ))}
          </g>

          {/* 爆满队列（红） */}
          <g ref={queueBrokenRef} style={{ opacity: 0 }}>
            {["🔊", "🔊", "🔊", "🔊", "🔊", "🔊", "🔊", "…∞"].map((e, i) => (
              <g key={i}>
                <rect x={76 + i * 70} y="108" width="60" height="24" rx="4" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="1" />
                <text x={106 + i * 70} y="124" textAnchor="middle" fontSize="11" fill={FAIL_COLOR}>{e}</text>
              </g>
            ))}
          </g>

          {/* 反馈循环箭头（红） */}
          <g ref={feedbackRef} style={{ opacity: 0 }}>
            <path d="M 600 146 Q 650 200 400 200 Q 100 200 100 146" fill="none" stroke={FAIL_COLOR} strokeWidth="2" strokeDasharray="5 3" />
            <text x="360" y="222" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>反馈循环：处理 → 产生新事件 → 入队 → 处理 → …</text>
          </g>

          {/* 复位说明（绿） */}
          <g ref={resetNoteRef} style={{ opacity: 0 }}>
            <rect x="60" y="180" width="600" height="70" rx="10" fill={OK_COLOR} fillOpacity="0.06" stroke={OK_COLOR} strokeWidth="1.5" />
            <text x="76" y="206" fontSize="11" fontWeight="700" fill={OK_COLOR}>复位：防护策略</text>
            <text x="76" y="228" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">① 队列上限：size ≥ 8 → 丢弃最旧 / 拒绝入队</text>
            <text x="76" y="244" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">② 事件合并：同类事件只保留最新（play+play → 1个play）</text>
          </g>

          {/* 合并后队列（绿） */}
          <g ref={queueResetRef} style={{ opacity: 0 }}>
            <rect x="76" y="108" width="120" height="24" rx="4" fill={OK_COLOR} fillOpacity="0.16" stroke={OK_COLOR} strokeWidth="1.2" />
            <text x="136" y="124" textAnchor="middle" fontSize="11" fill={OK_COLOR}>🔊 play (合并)</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="280" width="600" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="76" y="307" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 反馈循环：入队速率 &gt; 处理速率 → 无限膨胀 → 溢出</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="280" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="307" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 上限截断 + 合并去重 → 队列稳定</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="340" width="600" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="76" y="363" fontSize="11" fontWeight="700" fill={OK_COLOR}>事件队列的不变量：队列大小有界；任何反馈循环都必须被截断</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：反馈循环让队列无限膨胀直到溢出。复位：队列上限（截断）+ 事件合并（同类去重），保证队列有界。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：反馈循环让事件处理时又产生新事件，队列无限膨胀直到溢出；加队列上限（截断）+ 事件合并（同类去重），保证队列有界。
      </figcaption>
    </figure>
  );
}
