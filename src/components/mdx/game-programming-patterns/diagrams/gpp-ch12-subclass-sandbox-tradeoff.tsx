"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh12SubclassSandboxTradeoff>：子类沙箱模式取舍对照动画（GPP 第12章 · 图2）。
 *
 * 故事：Sparkle/Dust/Smoke 三个粒子子类要访问音频/物理/渲染三个引擎。
 *  ① 场景：3 个子类 + 3 个引擎
 *  ② 基线（子类直连引擎）：每个子类连所有引擎 → 9 条耦合边 ✗
 *  ③ 候选（沙箱操作）：子类只连基类沙箱 → 3 条耦合边 ✓
 *  ④ 对照：沙箱把引擎细节封装在基类里，改引擎只改基类
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const SUBCLASSES = [
  { id: "sparkle", label: "Sparkle", x: 120 },
  { id: "dust", label: "Dust", x: 360 },
  { id: "smoke", label: "Smoke", x: 600 },
];

const ENGINES = [
  { id: "audio", label: "音频引擎", x: 160 },
  { id: "physics", label: "物理引擎", x: 360 },
  { id: "render", label: "渲染引擎", x: 560 },
];

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "Sparkle/Dust/Smoke 三个粒子子类要访问音频/物理/渲染三个引擎" },
  { label: "direct", caption: "基线（子类直连引擎）：每个子类连所有引擎 → 9 条耦合边 ✗" },
  { label: "sandbox", caption: "候选（沙箱操作）：子类只连基类沙箱 → 3 条耦合边 ✓" },
  { label: "insight", caption: "对照：沙箱把引擎细节封装在基类里，改引擎只改基类，子类不受影响" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh12SubclassSandboxTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const directBadgeRef = useRef<SVGGElement | null>(null);
  const sandboxBadgeRef = useRef<SVGGElement | null>(null);
  const directLinesRef = useRef<SVGGElement | null>(null);
  const baseClassRef = useRef<SVGGElement | null>(null);
  const sandboxLinesRef = useRef<SVGGElement | null>(null);
  const sandboxMethodsRef = useRef<SVGTextElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：子类 + 引擎
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② direct（t: T→2T）：直连徽章 + 9 条红色耦合边 + 判定✗
      tl.add(directBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(directLinesRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 1.1);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("direct", T);

      // ③ sandbox（t: 2T→3T）：切候选——直连淡出，沙箱徽章 + 基类 + 3 条绿边 + 判定✓
      tl.add(directBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(directLinesRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(sandboxBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(baseClassRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.3);
      tl.add(sandboxLinesRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.5);
      tl.add(sandboxMethodsRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.8);
      tl.label("sandbox", T * 2);

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
          aria-label="子类沙箱模式取舍对照动画。Sparkle Dust Smoke 三个粒子子类要访问音频物理渲染三个引擎。基线子类直连引擎，每个子类连所有引擎，9 条耦合边，改引擎接口要改所有子类。候选沙箱操作，子类只连基类沙箱，3 条耦合边，引擎细节被基类封装。对照：沙箱把引擎细节封装在基类里，改引擎只改基类子类不受影响。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：子类直连引擎 vs 沙箱操作
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            沙箱把引擎细节封装在基类里，子类只看到受保护的操作
          </text>

          {/* 方式徽章 */}
          <g ref={directBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 子类直连引擎</text>
          </g>
          <g ref={sandboxBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 沙箱操作</text>
          </g>

          {/* 场景：子类 + 引擎 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            {SUBCLASSES.map((s) => (
              <g key={s.id}>
                <rect x={s.x - 45} y="80" width="90" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.2" />
                <text x={s.x} y="103" textAnchor="middle" fontSize="12" fill="var(--text-primary)">{s.label}</text>
              </g>
            ))}
            {ENGINES.map((e) => (
              <g key={e.id}>
                <rect x={e.x - 50} y="260" width="100" height="36" rx="8" fill="rgba(255,255,255,0.04)" stroke="var(--border)" strokeWidth="1.2" />
                <text x={e.x} y="283" textAnchor="middle" fontSize="11" fill="var(--text-primary)">{e.label}</text>
              </g>
            ))}
          </g>

          {/* 直连耦合边（9 条红） */}
          <g ref={directLinesRef} style={{ opacity: 0 }}>
            {SUBCLASSES.flatMap((s) =>
              ENGINES.map((e) => (
                <line key={`${s.id}-${e.id}`} x1={s.x} y1="116" x2={e.x} y2="260" stroke={WARN_COLOR} strokeWidth="1.2" opacity="0.5" />
              ))
            )}
          </g>

          {/* 基类沙箱 */}
          <g ref={baseClassRef} style={{ opacity: 0 }}>
            <rect x="240" y="160" width="240" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.8" />
            <text x="360" y="187" textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>Particle（基类沙箱）</text>
          </g>

          {/* 沙箱耦合边（3 条绿） */}
          <g ref={sandboxLinesRef} style={{ opacity: 0 }}>
            {SUBCLASSES.map((s) => (
              <line key={s.id} x1={s.x} y1="116" x2="360" y2="160" stroke={OK_COLOR} strokeWidth="1.5" opacity="0.7" />
            ))}
          </g>
          <text ref={sandboxMethodsRef} x="360" y="225" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)" style={{ opacity: 0 }}>
            playSound() · move() · draw() · getElapsed()
          </text>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="160" y="320" width="400" height="44" rx="10" fill={WARN_COLOR} fillOpacity="0.1" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="360" y="347" textAnchor="middle" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ 耦合边：9 条（3 子类 × 3 引擎）</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="160" y="320" width="400" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="360" y="347" textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 耦合边：3 条（3 子类 → 1 基类）</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="380" width="600" height="40" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="405" fontSize="12" fontWeight="700" fill={OK_COLOR}>改引擎 → 只改基类，子类不受影响；子类只组合受保护操作</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（子类直连引擎）9 条耦合边、改接口牵一发动全身；候选（沙箱操作）3 条耦合边、改引擎只改基类。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：子类直连引擎产生 9 条耦合边，改接口牵一发动全身；沙箱操作把引擎封装在基类里，子类只调用受保护方法，耦合降到 3 条。
      </figcaption>
    </figure>
  );
}
