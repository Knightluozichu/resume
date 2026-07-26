"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh17DataLocalityTradeoff>：数据局部性模式取舍对照动画（GPP 第17章 · 图2）。
 *
 * 故事：遍历 10 个对象。
 *  ① 场景：内存布局
 *  ② 基线（散落布局）：对象散落在堆各处 → 80% cache miss ✗
 *  ③ 候选（连续布局）：同类数据紧密排列 → 90% cache hit ✓
 *  ④ 对照：CPU cache 一次加载一整行（64B），连续排列 = 免费搭车
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "要遍历 10 个对象，看内存布局如何影响 cache 命中" },
  { label: "scattered", caption: "基线（散落布局）：对象散落在堆各处 → 80% cache miss，慢 10-100× ✗" },
  { label: "contiguous", caption: "候选（连续布局）：同类数据紧密排列 → 90% cache hit，快 ✓" },
  { label: "insight", caption: "对照：CPU cache 一次加载一整行（64B），连续排列 = 免费搭车" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh17DataLocalityTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const scatteredBadgeRef = useRef<SVGGElement | null>(null);
  const contiguousBadgeRef = useRef<SVGGElement | null>(null);
  const scatteredRef = useRef<SVGGElement | null>(null);
  const contiguousRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② scattered（t: T→2T）：散落徽章 + 散落布局（红）+ 判定✗
      tl.add(scatteredBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(scatteredRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 1.1);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("scattered", T);

      // ③ contiguous（t: 2T→3T）：切候选——散落淡出，连续徽章 + 连续布局（绿）+ 判定✓
      tl.add(scatteredBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(scatteredRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(contiguousBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(contiguousRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2.3);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.label("contiguous", T * 2);

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
          aria-label="数据局部性模式取舍对照动画。要遍历 10 个对象。基线散落布局对象散落在堆各处 80% cache miss 慢 10 到 100 倍。候选连续布局同类数据紧密排列 90% cache hit 快。对照：CPU cache 一次加载一整行 64 字节，连续排列等于免费搭车。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：散落布局 vs 连续布局（数据局部性）
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            CPU cache 一次加载一整行（64B），连续排列 = 免费搭车
          </text>

          {/* 方式徽章 */}
          <g ref={scatteredBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 散落布局</text>
          </g>
          <g ref={contiguousBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 连续布局</text>
          </g>

          {/* 场景标签 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">内存布局（遍历 10 个对象）</text>
          </g>

          {/* 散落布局（红） */}
          <g ref={scatteredRef} style={{ opacity: 0 }}>
            {[
              { x: 60, label: "A", obj: true }, { x: 130, label: "…", obj: false },
              { x: 200, label: "B", obj: true }, { x: 270, label: "…", obj: false },
              { x: 340, label: "…", obj: false }, { x: 410, label: "C", obj: true },
              { x: 480, label: "…", obj: false }, { x: 550, label: "D", obj: true },
              { x: 620, label: "…", obj: false },
            ].map((slot, i) => (
              <g key={i}>
                <rect x={slot.x} y="96" width="55" height="36" rx="4"
                  fill={slot.obj ? WARN_COLOR : "rgba(255,255,255,0.02)"} fillOpacity={slot.obj ? 0.12 : 1}
                  stroke={slot.obj ? WARN_COLOR : "var(--border)"} strokeWidth="1" strokeDasharray={slot.obj ? "none" : "2 2"} />
                <text x={slot.x + 27} y="119" textAnchor="middle" fontSize="11" fill={slot.obj ? WARN_COLOR : "var(--text-secondary)"}>{slot.label}</text>
              </g>
            ))}
            <text x="360" y="156" textAnchor="middle" fontSize="11" fill={WARN_COLOR}>对象散布在不同 cache line → 每次访问都 miss</text>
          </g>

          {/* 连续布局（绿） */}
          <g ref={contiguousRef} style={{ opacity: 0 }}>
            {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((label, i) => (
              <g key={i}>
                <rect x={60 + i * 62} y="96" width="55" height="36" rx="4" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1" />
                <text x={87 + i * 62} y="119" textAnchor="middle" fontSize="11" fill={OK_COLOR}>{label}</text>
              </g>
            ))}
            <text x="360" y="156" textAnchor="middle" fontSize="11" fill={OK_COLOR}>同类数据连续排列 → 一次 cache load 带走多个</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="190" width="600" height="50" rx="10" fill={WARN_COLOR} fillOpacity="0.08" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="212" fontSize="11" fontWeight="700" fill="var(--text-secondary)">遍历 10 个对象的 cache 统计：</text>
            <text x="76" y="232" fontSize="12" fontWeight="700" fill={WARN_COLOR}>命中：2/10 缺失：8/10 → 80% miss → 慢 10-100×</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="190" width="600" height="50" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="212" fontSize="11" fontWeight="700" fill="var(--text-secondary)">遍历 10 个对象的 cache 统计：</text>
            <text x="76" y="232" fontSize="12" fontWeight="700" fill={OK_COLOR}>命中：9/10 缺失：1/10 → 90% hit → 快</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="270" width="600" height="60" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="295" fontSize="13" fontWeight="700" fill={OK_COLOR}>连续布局：cache 命中率高，CPU 流水线满载</text>
            <text x="76" y="317" fontSize="11" fill="var(--text-secondary)">代价：对象不能随意移动，需要 SoA 或固定大小池（见反例）</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（散落布局）80% cache miss；候选（连续布局）90% cache hit。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：散落布局让对象分布在不同 cache line，遍历时 80% cache miss；连续布局让同类数据紧密排列，cache 命中率 90%。代价是对象不能随意移动。
      </figcaption>
    </figure>
  );
}
