"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh20SpatialPartitionFailure>：空间分区模式反例复位动画（GPP 第20章 · 图3）。
 *
 * 故事：网格分区。
 *  ① 正常：物体均匀分布，各格少量 → 比较极少
 *  ② 反例：所有单位挤在同一个格子 + 物体跨界但只查本格
 *  ③ 反例结果：格内退化 O(n²) + 跨界漏检 → 碰撞丢失 ✗
 *  ④ 复位：动态调整格大小 + 跨界物体同时注册到相邻格
 *  ⑤ 复位结果：不退化不漏检 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "正常：物体均匀分布，各格少量 → 比较极少" },
  { label: "crowded", caption: "反例：所有单位挤在同一个格子 + 物体跨界但只查本格" },
  { label: "degraded", caption: "反例结果：格内退化 O(n²) + 跨界漏检 → 碰撞丢失 ✗" },
  { label: "reset", caption: "复位：动态调整格大小 + 跨界物体同时注册到相邻格" },
  { label: "fixed", caption: "复位结果：不退化不漏检 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh20SpatialPartitionFailure() {
  const gridRef = useRef<SVGGElement | null>(null);
  const normalRef = useRef<SVGGElement | null>(null);
  const crowdedRef = useRef<SVGGElement | null>(null);
  const resetRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：网格 + 正常分布
      tl.add(gridRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(normalRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.4);
      tl.label("setup", 0);

      // ② crowded（t: T→2T）：正常分布淡出，挤同格 + 跨界（红）出现
      tl.add(normalRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 1);
      tl.add(crowdedRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.2);
      tl.label("crowded", T);

      // ③ degraded（t: 2T→3T）：判定✗
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.label("degraded", T * 2);

      // ④ reset（t: 3T→4T）：挤同格/坏判定淡出，复位分布（绿）出现
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(crowdedRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(resetRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.2);
      tl.label("reset", T * 3);

      // ⑤ fixed（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("fixed", T * 4);
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
          aria-label="空间分区模式反例复位动画。正常时物体均匀分布各格少量比较极少。反例是所有单位挤在同一个格子加物体跨界但只查本格，格内退化 O n 平方加跨界漏检碰撞丢失。复位是动态调整格大小加跨界物体同时注册到相邻格，不退化不漏检。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：挤同格退化 + 跨界漏检 → 复位
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            空间分区的不变量：每格物体少 + 跨界不漏
          </text>

          {/* 网格 */}
          <g ref={gridRef} style={{ opacity: 0 }}>
            {[0, 1].map((row) =>
              [0, 1, 2].map((col) => (
                <rect key={`${row}-${col}`} x={120 + col * 170} y={70 + row * 90} width="160" height="80" rx="6"
                  fill="rgba(255,255,255,0.02)" stroke="var(--border)" strokeWidth="1" />
              ))
            )}
          </g>

          {/* 正常分布（绿） */}
          <g ref={normalRef} style={{ opacity: 0 }}>
            <circle cx="180" cy="110" r="6" fill={OK_COLOR} fillOpacity="0.6" stroke={OK_COLOR} strokeWidth="1" />
            <circle cx="350" cy="100" r="6" fill={OK_COLOR} fillOpacity="0.6" stroke={OK_COLOR} strokeWidth="1" />
            <circle cx="520" cy="120" r="6" fill={OK_COLOR} fillOpacity="0.6" stroke={OK_COLOR} strokeWidth="1" />
            <circle cx="200" cy="200" r="6" fill={OK_COLOR} fillOpacity="0.6" stroke={OK_COLOR} strokeWidth="1" />
            <circle cx="450" cy="190" r="6" fill={OK_COLOR} fillOpacity="0.6" stroke={OK_COLOR} strokeWidth="1" />
            <text x="360" y="270" textAnchor="middle" fontSize="11" fill={OK_COLOR}>每格 1-2 个物体 → 比较极少 ✓</text>
          </g>

          {/* 挤同格 + 跨界（红） */}
          <g ref={crowdedRef} style={{ opacity: 0 }}>
            {Array.from({ length: 8 }, (_, i) => (
              <circle key={i} cx={340 + (i % 4) * 20} cy={95 + Math.floor(i / 4) * 20} r="5"
                fill={FAIL_COLOR} fillOpacity="0.5" stroke={FAIL_COLOR} strokeWidth="1" />
            ))}
            <text x="370" y="145" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>50 个挤一格!</text>
            <circle cx="280" cy="150" r="7" fill={FAIL_COLOR} fillOpacity="0.3" stroke={FAIL_COLOR} strokeWidth="2" strokeDasharray="3 2" />
            <text x="280" y="172" textAnchor="middle" fontSize="11" fill={FAIL_COLOR}>跨界</text>
            <text x="360" y="270" textAnchor="middle" fontSize="11" fill={FAIL_COLOR}>格内退化 O(n²) + 跨界漏检 → 碰撞丢失</text>
          </g>

          {/* 复位分布（绿） */}
          <g ref={resetRef} style={{ opacity: 0 }}>
            <circle cx="180" cy="110" r="6" fill={OK_COLOR} fillOpacity="0.6" stroke={OK_COLOR} strokeWidth="1" />
            <circle cx="350" cy="100" r="6" fill={OK_COLOR} fillOpacity="0.6" stroke={OK_COLOR} strokeWidth="1" />
            <circle cx="520" cy="120" r="6" fill={OK_COLOR} fillOpacity="0.6" stroke={OK_COLOR} strokeWidth="1" />
            <circle cx="280" cy="150" r="7" fill={OK_COLOR} fillOpacity="0.4" stroke={OK_COLOR} strokeWidth="2" />
            <text x="280" y="172" textAnchor="middle" fontSize="11" fill={OK_COLOR}>注册两格</text>
            <text x="360" y="270" textAnchor="middle" fontSize="11" fill={OK_COLOR}>动态格大小 + 跨界注册两格 → 不退化不漏检 ✓</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="300" width="600" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="76" y="327" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 挤同格 → O(n²) 退化；跨界只查本格 → 漏检</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="300" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="327" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 动态格大小 + 跨界注册 → 不退化不漏检</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="360" width="600" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="76" y="383" fontSize="11" fontWeight="700" fill={OK_COLOR}>空间分区的不变量：每格物体数有界 + 跨界物体不漏</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：挤同格退化 O(n²)、跨界漏检。复位：动态格大小 + 跨界注册两格。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：单位挤同格退化为 O(n²)，跨界物体只查本格导致漏检；动态调整格大小 + 跨界物体同时注册到相邻格，保证不退化不漏检。
      </figcaption>
    </figure>
  );
}
