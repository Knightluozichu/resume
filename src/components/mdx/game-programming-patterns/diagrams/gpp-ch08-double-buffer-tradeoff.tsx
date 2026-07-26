"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh08DoubleBufferTradeoff>：双缓冲模式取舍对照动画（GPP 第8章 · 图2）。
 *
 * 故事：画面渲染。
 *  ① 场景：一块屏幕（前台画面）
 *  ② 基线（单缓冲）：边更新边被读取 → 上半旧、下半新，撕裂 ✗
 *  ③ 候选（双缓冲）：后台缓冲更新，前台保持完整
 *  ④ 候选交换：后台更新完整后原子 swap → 前台变成完整新画面 ✓
 *  ⑤ 对照：更新与展示在时间上分离，外部只见结果不见过程
 */

const VIEW_W = 720;
const VIEW_H = 460;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "一块屏幕（前台画面），观众正在看" },
  { label: "single", caption: "基线（单缓冲）：边更新边被读取 → 上半旧、下半新，画面撕裂 ✗" },
  { label: "double", caption: "候选（双缓冲）：后台缓冲更新，前台保持完整旧画面" },
  { label: "swap", caption: "候选交换：后台更新完整后原子 swap → 前台变成完整新画面 ✓" },
  { label: "insight", caption: "对照：更新与展示在时间上分离，swap 是原子的 → 外部只见结果不见过程" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh08DoubleBufferTradeoff() {
  const screenRef = useRef<SVGGElement | null>(null);
  const singleBadgeRef = useRef<SVGGElement | null>(null);
  const doubleBadgeRef = useRef<SVGGElement | null>(null);
  const completeRef = useRef<SVGGElement | null>(null);
  const tearingRef = useRef<SVGGElement | null>(null);
  const backRef = useRef<SVGGElement | null>(null);
  const swapNoteRef = useRef<SVGTextElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：屏幕 + 完整画面
      tl.add(screenRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(completeRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.4);
      tl.label("setup", 0);

      // ② single（t: T→2T）：单缓冲徽章 + 撕裂画面（替换完整画面）
      tl.add(singleBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(completeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 1.1);
      tl.add(tearingRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.2);
      tl.label("single", T);

      // ③ double（t: 2T→3T）：切候选——单缓冲徽章/撕裂淡出，双缓冲徽章 + 完整画面 + 后台缓冲
      tl.add(singleBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(tearingRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(doubleBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(completeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(backRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.4);
      tl.label("double", T * 2);

      // ④ swap（t: 3T→4T）：swap 提示，前台变新画面（完整）
      tl.add(swapNoteRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 3.2);
      tl.label("swap", T * 3);

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
          aria-label="双缓冲模式取舍对照动画。一块屏幕观众正在看。基线单缓冲边更新边被读取，上半旧下半新画面撕裂。候选双缓冲后台缓冲更新前台保持完整旧画面，后台更新完整后原子 swap 前台变成完整新画面。对照：更新与展示在时间上分离，swap 是原子的，外部只见结果不见过程。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：单缓冲（撕裂）vs 双缓冲（完整）
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            双缓冲在后台更新完整后原子切换，外部永远看到完整画面
          </text>

          {/* 方式徽章 */}
          <g ref={singleBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 单缓冲</text>
          </g>
          <g ref={doubleBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 双缓冲</text>
          </g>

          {/* 屏幕 */}
          <g ref={screenRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">前台画面（观众看到的）</text>
            <rect x="60" y="96" width="360" height="180" rx="10" fill="var(--text-secondary)" fillOpacity="0.04" stroke="var(--border)" strokeWidth="2" />
          </g>

          {/* 完整画面 */}
          <g ref={completeRef} style={{ opacity: 0 }}>
            <rect x="62" y="98" width="356" height="176" fill={OK_COLOR} fillOpacity="0.12" />
            <text x="240" y="190" textAnchor="middle" fontSize="13" fontWeight="700" fill={OK_COLOR}>完整画面</text>
          </g>

          {/* 撕裂画面 */}
          <g ref={tearingRef} style={{ opacity: 0 }}>
            <rect x="62" y="98" width="356" height="88" fill={WARN_COLOR} fillOpacity="0.1" />
            <text x="240" y="146" textAnchor="middle" fontSize="12" fill={WARN_COLOR}>旧画面（上半）</text>
            <rect x="62" y="186" width="356" height="88" fill={OK_COLOR} fillOpacity="0.16" />
            <text x="240" y="234" textAnchor="middle" fontSize="12" fill={OK_COLOR}>新画面（下半）</text>
            <line x1="62" y1="186" x2="418" y2="186" stroke={WARN_COLOR} strokeWidth="2" strokeDasharray="6 4" />
            <text x="240" y="180" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>← 撕裂线 →</text>
          </g>

          {/* 后台缓冲 */}
          <g ref={backRef} style={{ opacity: 0 }}>
            <text x="460" y="86" fontSize="11" fontWeight="700" fill={ACCENT}>后台缓冲（更新中）</text>
            <rect x="460" y="96" width="200" height="80" rx="8" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="1.5" />
            <text x="560" y="140" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">新画面就绪</text>
            <text ref={swapNoteRef} x="560" y="200" textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT} style={{ opacity: 0 }}>swap 原子切换 →</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="300" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="325" fontSize="13" fontWeight="700" fill={OK_COLOR}>后台更新完整后原子 swap，前台始终完整</text>
            <text x="76" y="347" fontSize="11" fill="var(--text-secondary)">更新与展示在时间上分离，swap 是原子的 → 外部只见结果不见过程；代价是多一份缓冲内存</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（单缓冲）边更新边被读，画面撕裂；候选（双缓冲）后台更新完整后原子 swap，前台始终完整。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：单缓冲在更新时被读取，画面会撕裂；双缓冲在后台更新完整后原子切换到前台，外部永远看到完整画面。
      </figcaption>
    </figure>
  );
}
