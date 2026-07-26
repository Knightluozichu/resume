"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh07StateFailure>：状态模式反例复位动画（GPP 第7章 · 图3）。
 *
 * 故事：主角先跳再俯冲。
 *  ① 初始：站立，isJumping=false, isDiving=false
 *  ② 按跳：isJumping=true（主角跳跃中）
 *  ③ 反例：按俯冲 → isDiving=true 但忘了清 isJumping → 两个同时为真 ✗ 非法
 *  ④ 复位：状态机——跳跃→俯冲，转换时自动离开前一状态
 *  ⑤ 复位结果：任一时刻只有一个状态 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "初始：主角站立，isJumping=false, isDiving=false" },
  { label: "jump", caption: "按跳：isJumping=true，主角跳跃中" },
  { label: "illegal", caption: "反例：按俯冲 → isDiving=true 但忘了清 isJumping → 两个同时为真 ✗ 非法" },
  { label: "fsm-fix", caption: "复位：用状态机——跳跃→俯冲，转换时自动离开前一状态" },
  { label: "single", caption: "复位结果：任一时刻只有一个状态 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh07StateFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const heroTextRef = useRef<Record<string, SVGTextElement | null>>({});
  const jumpFlagRef = useRef<SVGTextElement | null>(null);
  const diveFlagRef = useRef<SVGTextElement | null>(null);
  const heroBoxRef = useRef<SVGRectElement | null>(null);
  const fsmRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② jump（t: T→2T）：isJumping=true，英雄显示"跳跃中"
      tl.add(jumpFlagRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.1);
      tl.add(heroTextRef.current["stand"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 1.2);
      tl.add(heroTextRef.current["jump"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.3);
      tl.label("jump", T);

      // ③ illegal（t: 2T→3T）：isDiving=true（忘清 isJumping）→ 两个为真 → 非法
      tl.add(diveFlagRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.1);
      tl.add(heroTextRef.current["jump"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 2.3);
      tl.add(heroTextRef.current["illegal"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.4);
      tl.add(heroBoxRef.current!, { stroke: [FAIL_COLOR, FAIL_COLOR], duration: T * 0.3, ease: "out(3)" }, T * 2.5);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.6);
      tl.label("illegal", T * 2);

      // ④ fsm-fix（t: 3T→4T）：标志淡出，状态机出现，英雄显示"俯冲"（单一状态）
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(jumpFlagRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(diveFlagRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(heroTextRef.current["illegal"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3.1);
      tl.add(fsmRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.2);
      tl.add(heroTextRef.current["dive"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.4);
      tl.add(heroBoxRef.current!, { stroke: [OK_COLOR, OK_COLOR], duration: T * 0.3, ease: "out(3)" }, T * 3.5);
      tl.label("fsm-fix", T * 3);

      // ⑤ single（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("single", T * 4);
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
          aria-label="状态模式反例复位动画。主角先跳再俯冲。用布尔标志时按跳 isJumping 为 true，按俯冲 isDiving 为 true 但忘了清 isJumping，两个同时为真非法。复位用状态机，跳跃到俯冲转换时自动离开前一状态，任一时刻只有一个状态。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：标志不同步 → 非法状态组合
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            进新状态忘清旧标志会非法；状态机转换自动离开前一状态
          </text>

          {/* 场景 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {/* 英雄状态显示 */}
            <rect ref={heroBoxRef} x="240" y="90" width="240" height="100" rx="12" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="2" />
            <text x="360" y="116" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)">🧝 英雄当前</text>
            <text ref={(el) => { heroTextRef.current["stand"] = el; }} x="360" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)" style={{ opacity: 1 }}>站立</text>
            <text ref={(el) => { heroTextRef.current["jump"] = el; }} x="360" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-primary)" style={{ opacity: 0 }}>跳跃中</text>
            <text ref={(el) => { heroTextRef.current["illegal"] = el; }} x="360" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill={FAIL_COLOR} style={{ opacity: 0 }}>跳跃 + 俯冲（非法!）</text>
            <text ref={(el) => { heroTextRef.current["dive"] = el; }} x="360" y="148" textAnchor="middle" fontSize="13" fontWeight="700" fill={OK_COLOR} style={{ opacity: 0 }}>俯冲（单一状态）</text>

            {/* 布尔标志 */}
            <text ref={jumpFlagRef} x="160" y="240" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>isJumping = true</text>
            <text ref={diveFlagRef} x="560" y="240" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="monospace" fill={FAIL_COLOR} style={{ opacity: 0 }}>isDiving = true</text>

            {/* 状态机提示（复位） */}
            <g ref={fsmRef} style={{ opacity: 0 }}>
              <text x="360" y="240" textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>状态机：跳跃 → 俯冲（自动离开跳跃）</text>
            </g>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="290" width="560" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="2" />
            <text x="96" y="317" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 标志失同步：跳跃+俯冲同时为真，行为未定义</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="80" y="290" width="560" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="96" y="317" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 状态机：转换自动离开前一状态，无非法组合</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="80" y="346" width="560" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="96" y="369" fontSize="11" fontWeight="700" fill={OK_COLOR}>用状态机替代散落标志，任一时刻只有一个状态</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：布尔标志进新状态忘清旧标志，产生非法组合。复位：状态机转换时自动离开前一状态。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：用布尔标志时进入新状态忘了清旧标志，会产生同时为真的非法组合、行为错乱；用状态机，转换时自动离开前一状态。
      </figcaption>
    </figure>
  );
}
