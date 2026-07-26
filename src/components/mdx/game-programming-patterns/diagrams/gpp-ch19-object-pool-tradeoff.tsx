"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh19ObjectPoolTradeoff>：对象池模式取舍对照动画（GPP 第19章 · 图2）。
 *
 * 故事：频繁生成/回收对象（如子弹）。
 *  ① 场景：对象分配需求
 *  ② 基线（频繁 new/delete）：堆碎片化，慢 + 不确定 ✗
 *  ③ 候选（对象池）：预分配固定池，acquire/release O(1)，零碎片 ✓
 *  ④ 对照：对象池把分配从 O(不确定) 降到 O(1)
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "频繁生成/回收对象（如子弹），看分配方式的影响" },
  { label: "newdelete", caption: "基线（频繁 new/delete）：堆碎片化，每次 ~100-1000ns + 碎片累积 ✗" },
  { label: "pool", caption: "候选（对象池）：预分配固定池，acquire/release O(1) ~10ns，零碎片 ✓" },
  { label: "insight", caption: "对照：对象池把分配从 O(不确定) 降到 O(1)，无碎片、确定性" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh19ObjectPoolTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const newdeleteBadgeRef = useRef<SVGGElement | null>(null);
  const poolBadgeRef = useRef<SVGGElement | null>(null);
  const heapRef = useRef<SVGGElement | null>(null);
  const poolRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② newdelete（t: T→2T）：new/delete 徽章 + 碎片化堆（红）+ 判定✗
      tl.add(newdeleteBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(heapRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 1.1);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("newdelete", T);

      // ③ pool（t: 2T→3T）：切候选——new/delete 淡出，池徽章 + 对象池（绿）+ 判定✓
      tl.add(newdeleteBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(heapRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(poolBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(poolRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2.3);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.label("pool", T * 2);

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
          aria-label="对象池模式取舍对照动画。频繁生成回收对象如子弹。基线频繁 new delete 堆碎片化每次 100 到 1000 纳秒加碎片累积。候选对象池预分配固定池 acquire release O1 约 10 纳秒零碎片。对照：对象池把分配从 O 不确定降到 O1 无碎片确定性。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：频繁 new/delete vs 对象池复用
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            对象池把分配从 O(不确定) 降到 O(1)，无碎片
          </text>

          {/* 方式徽章 */}
          <g ref={newdeleteBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · new/delete</text>
          </g>
          <g ref={poolBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 对象池</text>
          </g>

          {/* 场景标签 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">内存布局</text>
          </g>

          {/* 碎片化堆（红） */}
          <g ref={heapRef} style={{ opacity: 0 }}>
            {[
              { label: "used", active: true }, { label: "free", active: false },
              { label: "used", active: true }, { label: "free", active: false },
              { label: "free", active: false }, { label: "used", active: true },
              { label: "free", active: false }, { label: "used", active: true },
            ].map((slot, i) => (
              <g key={i}>
                <rect x={60 + i * 78} y="96" width="72" height="36" rx="4"
                  fill={slot.active ? WARN_COLOR : "rgba(255,255,255,0.02)"} fillOpacity={slot.active ? 0.12 : 1}
                  stroke={slot.active ? WARN_COLOR : "var(--border)"} strokeWidth="1" strokeDasharray={slot.active ? "none" : "3 2"} />
                <text x={96 + i * 78} y="119" textAnchor="middle" fontSize="11" fill={slot.active ? WARN_COLOR : "var(--text-secondary)"}>{slot.label}</text>
              </g>
            ))}
            <text x="360" y="156" textAnchor="middle" fontSize="11" fill={WARN_COLOR}>碎片：free 块不连续，大块分配可能失败</text>
          </g>

          {/* 对象池（绿） */}
          <g ref={poolRef} style={{ opacity: 0 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i}>
                <rect x={60 + i * 78} y="96" width="72" height="36" rx="4" fill={OK_COLOR} fillOpacity={i < 3 ? 0.15 : 0.05} stroke={OK_COLOR} strokeWidth="1" />
                <text x={96 + i * 78} y="119" textAnchor="middle" fontSize="11" fill={OK_COLOR}>{i < 3 ? "active" : "idle"}</text>
              </g>
            ))}
            <text x="360" y="156" textAnchor="middle" fontSize="11" fill={OK_COLOR}>连续内存：acquire = 取空闲槽，release = 归还，O(1)</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="190" width="600" height="44" rx="10" fill={WARN_COLOR} fillOpacity="0.08" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="217" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ new/delete：~100-1000ns + 碎片累积 + GC 暂停</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="190" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="217" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 池复用：~10ns（O(1) 指针交换），零碎片</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="270" width="600" height="50" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="292" fontSize="12" fontWeight="700" fill={OK_COLOR}>对象池：快 O(1) + 无碎片 + 确定性</text>
            <text x="76" y="311" fontSize="11" fill="var(--text-secondary)">代价：池大小固定，复用时必须清空旧状态（见反例）</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（new/delete）慢且碎片；候选（对象池）O(1) 零碎片。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：频繁 new/delete 慢且产生碎片；对象池预分配后 acquire/release O(1)，零碎片。代价是池大小固定，复用时必须清空旧状态。
      </figcaption>
    </figure>
  );
}
