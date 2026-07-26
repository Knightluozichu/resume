"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh09GameLoopTradeoff>：游戏循环取舍对照动画（GPP 第9章 · 图2）。
 *
 * 故事：快机器 60fps、慢机器 20fps。
 *  ① 场景：两台机器
 *  ② 基线（每帧固定移动）：快机器每秒 180 单位、慢机器 20 单位 → 速度随帧率变 ✗
 *  ③ 候选（固定 dt + 累积器）：两台机器每秒都是 60 单位 → 速度恒定 ✓
 *  ④ 对照：固定 dt 让游戏速度独立于帧率
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "快机器 60fps、慢机器 20fps，两台机器跑同一个游戏" },
  { label: "perframe", caption: "基线（每帧固定移动）：快机器每秒 180 单位、慢机器 20 单位 → 速度随帧率变 ✗" },
  { label: "fixed", caption: "候选（固定 dt + 累积器）：两台机器每秒都是 60 单位 → 速度恒定 ✓" },
  { label: "insight", caption: "对照：固定 dt 让游戏速度独立于帧率，快慢机器表现一致" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh09GameLoopTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const perframeBadgeRef = useRef<SVGGElement | null>(null);
  const fixedBadgeRef = useRef<SVGGElement | null>(null);
  const fastBarRef = useRef<SVGRectElement | null>(null);
  const slowBarRef = useRef<SVGRectElement | null>(null);
  const fastLabelRef = useRef<SVGTextElement | null>(null);
  const slowLabelRef = useRef<SVGTextElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：两台机器
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② perframe（t: T→2T）：基线徽章 + 速度条（快=560 长红条，慢=62 短红条）
      tl.add(perframeBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(fastBarRef.current!, { width: [0, 560], duration: T * 0.6, ease: "out(3)" }, T * 1.1);
      tl.add(slowBarRef.current!, { width: [0, 62], duration: T * 0.6, ease: "out(3)" }, T * 1.1);
      tl.add(fastLabelRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.5);
      tl.add(slowLabelRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.5);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.7);
      tl.label("perframe", T);

      // ③ fixed（t: 2T→3T）：切候选——基线徽章/坏判定淡出，速度条变为等长绿条（187）
      tl.add(perframeBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(fixedBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(fastBarRef.current!, { width: [560, 187], duration: T * 0.5, ease: "inOut(2)" }, T * 2.3);
      tl.add(slowBarRef.current!, { width: [62, 187], duration: T * 0.5, ease: "inOut(2)" }, T * 2.3);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.label("fixed", T * 2);

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
          aria-label="游戏循环取舍对照动画。快机器 60fps 慢机器 20fps 两台机器跑同一个游戏。基线每帧固定移动，快机器每秒 180 单位慢机器 20 单位，速度随帧率变。候选固定 dt 加累积器，两台机器每秒都是 60 单位，速度恒定。对照：固定 dt 让游戏速度独立于帧率，快慢机器表现一致。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：每帧固定移动 vs 固定 dt + 累积器
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            固定 dt 让游戏速度独立于帧率
          </text>

          {/* 方式徽章 */}
          <g ref={perframeBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 每帧固定移动</text>
          </g>
          <g ref={fixedBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 固定 dt</text>
          </g>

          {/* 场景：两台机器 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">物体每秒移动距离（游戏速度）</text>

            {/* 快机器 */}
            <text x="60" y="120" fontSize="11" fontWeight="700" fill="var(--text-primary)">快机器 60fps</text>
            <rect x="60" y="128" width="560" height="24" rx="5" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1" />
            <rect ref={fastBarRef} x="60" y="128" width="0" height="24" rx="5" fill={WARN_COLOR} fillOpacity="0.4" stroke={WARN_COLOR} strokeWidth="1.2" />
            <text ref={fastLabelRef} x="630" y="145" textAnchor="end" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)" style={{ opacity: 0 }}>180/60</text>

            {/* 慢机器 */}
            <text x="60" y="185" fontSize="11" fontWeight="700" fill="var(--text-primary)">慢机器 20fps</text>
            <rect x="60" y="193" width="560" height="24" rx="5" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1" />
            <rect ref={slowBarRef} x="60" y="193" width="0" height="24" rx="5" fill={WARN_COLOR} fillOpacity="0.4" stroke={WARN_COLOR} strokeWidth="1.2" />
            <text ref={slowLabelRef} x="630" y="210" textAnchor="end" fontSize="11" fontWeight="700" fontFamily="monospace" fill="var(--text-primary)" style={{ opacity: 0 }}>20/60</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="250" width="600" height="44" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="277" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ 每帧固定移动：快机器游戏飞快、慢机器变慢，速度随帧率变</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="250" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="277" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 固定 dt：两台机器速度一致（每秒 60 单位），与帧率无关</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="310" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="335" fontSize="13" fontWeight="700" fill={OK_COLOR}>累积器吸收帧率波动：frameTime 倒入累积器，攒够 dt 就 update 一次</text>
            <text x="76" y="357" fontSize="11" fill="var(--text-secondary)">移动绑定游戏时间而非帧时间 → 快慢机器表现一致；代价是 update 频率与渲染解耦</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（每帧固定移动）速度随帧率变；候选（固定 dt + 累积器）速度恒定、与帧率无关。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：每帧固定移动会让游戏速度随帧率变化（快机器更快）；固定 dt + 累积器把移动绑定到游戏时间，速度恒定、与硬件帧率无关。
      </figcaption>
    </figure>
  );
}
