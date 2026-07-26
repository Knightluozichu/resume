"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh20SpatialPartitionTradeoff>：空间分区模式取舍对照动画（GPP 第20章 · 图2）。
 *
 * 故事：100 个物体的碰撞检测。
 *  ① 场景：碰撞检测需求
 *  ② 基线（全量 O(n²)）：每对都比较 → 4950 次 ✗
 *  ③ 候选（网格分区）：只检测同格/邻格 → ~400 次（接近 O(n)）✓
 *  ④ 对照：空间分区把"和谁比较"从所有人缩小到邻居
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const WARN_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const DOTS = [
  { x: 160, y: 120 }, { x: 300, y: 90 }, { x: 440, y: 130 },
  { x: 560, y: 100 }, { x: 220, y: 180 }, { x: 500, y: 170 },
];

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "100 个物体要做碰撞检测，看比较次数" },
  { label: "brute", caption: "基线（全量 O(n²)）：每对都比较 → 4950 次比较 ✗" },
  { label: "grid", caption: "候选（网格分区）：只检测同格/邻格 → ~400 次（接近 O(n)）✓" },
  { label: "insight", caption: "对照：空间分区把“和谁比较”从所有人缩小到邻居" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh20SpatialPartitionTradeoff() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const bruteBadgeRef = useRef<SVGGElement | null>(null);
  const gridBadgeRef = useRef<SVGGElement | null>(null);
  const bruteRef = useRef<SVGGElement | null>(null);
  const gridRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.label("setup", 0);

      // ② brute（t: T→2T）：全量徽章 + 全连接（红）+ 判定✗
      tl.add(bruteBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T);
      tl.add(bruteRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 1.1);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 1.6);
      tl.label("brute", T);

      // ③ grid（t: 2T→3T）：切候选——全量淡出，网格徽章 + 网格（绿）+ 判定✓
      tl.add(bruteBadgeRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(bruteRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(gridBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.add(gridRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 2.3);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.7);
      tl.label("grid", T * 2);

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
          aria-label="空间分区模式取舍对照动画。100 个物体要做碰撞检测。基线全量 O n 平方每对都比较 4950 次比较。候选网格分区只检测同格邻格约 400 次接近 O n。对照：空间分区把和谁比较从所有人缩小到邻居。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            取舍：全量 O(n²) vs 网格分区
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            空间分区把"和谁比较"从所有人缩小到邻居
          </text>

          {/* 方式徽章 */}
          <g ref={bruteBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={WARN_COLOR} fillOpacity="0.14" stroke={WARN_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={WARN_COLOR}>基线 · 全量 O(n²)</text>
          </g>
          <g ref={gridBadgeRef} style={{ opacity: 0 }}>
            <rect x="520" y="16" width="168" height="26" rx="13" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="604" y="33" textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>候选 · 网格分区</text>
          </g>

          {/* 场景标签 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">100 个物体的碰撞检测</text>
          </g>

          {/* 全量连接（红） */}
          <g ref={bruteRef} style={{ opacity: 0 }}>
            {DOTS.map((dot, i) => (
              <g key={i}>
                <circle cx={dot.x} cy={dot.y} r="8" fill={WARN_COLOR} fillOpacity="0.3" stroke={WARN_COLOR} strokeWidth="1.5" />
                {DOTS.slice(i + 1).map((other, j) => (
                  <line key={j} x1={dot.x} y1={dot.y} x2={other.x} y2={other.y} stroke={WARN_COLOR} strokeWidth="0.8" opacity="0.3" />
                ))}
              </g>
            ))}
            <text x="360" y="220" textAnchor="middle" fontSize="11" fill={WARN_COLOR}>每对都比较：6 个物体 = 15 条连线</text>
          </g>

          {/* 网格（绿） */}
          <g ref={gridRef} style={{ opacity: 0 }}>
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => (
                <rect key={`${row}-${col}`} x={160 + col * 140} y={80 + row * 50} width="130" height="44" rx="4"
                  fill="rgba(255,255,255,0.02)" stroke="var(--border)" strokeWidth="0.8" />
              ))
            )}
            <circle cx="220" cy="100" r="6" fill={OK_COLOR} fillOpacity="0.5" stroke={OK_COLOR} strokeWidth="1.5" />
            <circle cx="250" cy="108" r="6" fill={OK_COLOR} fillOpacity="0.5" stroke={OK_COLOR} strokeWidth="1.5" />
            <circle cx="500" cy="150" r="6" fill={OK_COLOR} fillOpacity="0.5" stroke={OK_COLOR} strokeWidth="1.5" />
            <circle cx="370" cy="105" r="6" fill={OK_COLOR} fillOpacity="0.5" stroke={OK_COLOR} strokeWidth="1.5" />
            <line x1="220" y1="100" x2="250" y2="108" stroke={OK_COLOR} strokeWidth="1.5" opacity="0.7" />
            <text x="360" y="250" textAnchor="middle" fontSize="11" fill={OK_COLOR}>只检测同格/邻格：大部分格子空 → 比较极少</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="270" width="600" height="50" rx="10" fill={WARN_COLOR} fillOpacity="0.08" stroke={WARN_COLOR} strokeWidth="1.6" />
            <text x="76" y="292" fontSize="11" fontWeight="700" fill="var(--text-secondary)">100 个物体的碰撞检测比较次数：</text>
            <text x="76" y="312" fontSize="12" fontWeight="700" fill={WARN_COLOR}>✗ O(n²)：4,950 次比较</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="270" width="600" height="50" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="292" fontSize="11" fontWeight="700" fill="var(--text-secondary)">100 个物体的碰撞检测比较次数：</text>
            <text x="76" y="312" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 网格分区：~400 次（接近 O(n)）</text>
          </g>

          {/* 对照结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="340" width="600" height="40" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="365" fontSize="12" fontWeight="700" fill={OK_COLOR}>物体多了也不怕：只和邻居比，线性增长</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="基线（全量 O(n²)）4950 次比较；候选（网格分区）~400 次，接近 O(n)。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        取舍对照：全量碰撞检测 O(n²)，100 个物体要比较 4950 次；网格分区只检测同格/邻格，接近 O(n)。代价是网格大小需调优。
      </figcaption>
    </figure>
  );
}
