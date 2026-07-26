"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh17DataLocalityFailure>：数据局部性模式反例复位动画（GPP 第17章 · 图3）。
 *
 * 故事：一条 cache line（64 字节）。
 *  ① 正常：热数据紧凑排列（SoA），100% 填满 cache line
 *  ② 反例：热冷混排——热数据 + 冷数据混在一起
 *  ③ 反例结果：热数据只占 50%，冷数据白白浪费 cache 空间 ✗
 *  ④ 复位：热冷分离——热数组紧凑（每帧遍历），冷数组单独存放（偶尔访问）
 *  ⑤ 复位结果：热数据 100% 填满 cache line ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "正常：热数据紧凑排列（SoA），100% 填满 cache line" },
  { label: "mixed", caption: "反例：热冷混排——position(热) + texture(冷) + name(冷) 混在一起" },
  { label: "wasted", caption: "反例结果：热数据只占 50%，冷数据白白浪费 cache 空间 ✗" },
  { label: "separate", caption: "复位：热冷分离——热数组紧凑（每帧遍历），冷数组单独存放（偶尔访问）" },
  { label: "packed", caption: "复位结果：热数据 100% 填满 cache line，命中率最高 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh17DataLocalityFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const packedRef = useRef<SVGGElement | null>(null);
  const mixedRef = useRef<SVGGElement | null>(null);
  const separateRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：热数据紧凑
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, 0);
      tl.add(packedRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.4);
      tl.label("setup", 0);

      // ② mixed（t: T→2T）：紧凑淡出，热冷混排出现
      tl.add(packedRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 1);
      tl.add(mixedRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.2);
      tl.label("mixed", T);

      // ③ wasted（t: 2T→3T）：判定✗（浪费）
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.2);
      tl.label("wasted", T * 2);

      // ④ separate（t: 3T→4T）：混排/坏判定淡出，热冷分离（绿）出现
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.2, ease: "out(3)" }, T * 3);
      tl.add(mixedRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(separateRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.2);
      tl.label("separate", T * 3);

      // ⑤ packed（t: 4T→5T）：判定✓ + 结论
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.1);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.4);
      tl.label("packed", T * 4);
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
          aria-label="数据局部性模式反例复位动画。一条 cache line 64 字节。正常时热数据紧凑排列 SoA 100% 填满 cache line。反例是热冷混排 position 热加 texture 冷加 name 冷混在一起，热数据只占 50% 冷数据白白浪费 cache 空间。复位是热冷分离热数组紧凑每帧遍历冷数组单独存放偶尔访问，热数据 100% 填满 cache line 命中率最高。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：热冷混排浪费 cache → 复位热冷分离
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            只遍历热数据时，冷数据白白占了 cache 空间
          </text>

          {/* 场景标签 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">一条 cache line（64 字节）</text>
          </g>

          {/* 热数据紧凑（绿） */}
          <g ref={packedRef} style={{ opacity: 0 }}>
            {["pos.x", "pos.y", "pos.x", "pos.y", "pos.x", "pos.y", "pos.x", "pos.y"].map((field, i) => (
              <g key={i}>
                <rect x={60 + i * 78} y="96" width="72" height="36" rx="4" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="1.2" />
                <text x={96 + i * 78} y="119" textAnchor="middle" fontSize="11" fill={OK_COLOR}>{field}</text>
              </g>
            ))}
            <text x="360" y="156" textAnchor="middle" fontSize="11" fill={OK_COLOR}>热数据 100% 填满 cache line → 命中率最高</text>
          </g>

          {/* 热冷混排（热绿 + 冷红） */}
          <g ref={mixedRef} style={{ opacity: 0 }}>
            {[
              { label: "pos.x", hot: true }, { label: "pos.y", hot: true },
              { label: "texture*", hot: false }, { label: "name[32]", hot: false },
              { label: "pos.x", hot: true }, { label: "pos.y", hot: true },
              { label: "texture*", hot: false }, { label: "name[32]", hot: false },
            ].map((field, i) => (
              <g key={i}>
                <rect x={60 + i * 78} y="96" width="72" height="36" rx="4"
                  fill={field.hot ? OK_COLOR : FAIL_COLOR} fillOpacity="0.12"
                  stroke={field.hot ? OK_COLOR : FAIL_COLOR} strokeWidth="1.2" />
                <text x={96 + i * 78} y="119" textAnchor="middle" fontSize="11" fill={field.hot ? OK_COLOR : FAIL_COLOR}>{field.label}</text>
              </g>
            ))}
            <text x="360" y="156" textAnchor="middle" fontSize="11" fill={FAIL_COLOR}>热数据只占 50%，冷数据白白浪费 cache 空间</text>
          </g>

          {/* 热冷分离（绿） */}
          <g ref={separateRef} style={{ opacity: 0 }}>
            <text x="60" y="106" fontSize="11" fontWeight="700" fill={OK_COLOR}>热数组（每帧遍历）：</text>
            {["x", "y", "x", "y", "x", "y"].map((f, i) => (
              <g key={i}>
                <rect x={200 + i * 50} y="92" width="44" height="24" rx="4" fill={OK_COLOR} fillOpacity="0.14" stroke={OK_COLOR} strokeWidth="1.2" />
                <text x={222 + i * 50} y="108" textAnchor="middle" fontSize="11" fill={OK_COLOR}>{f}</text>
              </g>
            ))}
            <text x="60" y="146" fontSize="11" fontWeight="700" fill="var(--text-secondary)">冷数组（偶尔访问）：</text>
            {["texture", "name"].map((f, i) => (
              <g key={i}>
                <rect x={200 + i * 90} y="132" width="80" height="24" rx="4" fill="var(--text-secondary)" fillOpacity="0.08" stroke="var(--border)" strokeWidth="1" />
                <text x={240 + i * 90} y="148" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">{f}</text>
              </g>
            ))}
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="190" width="600" height="44" rx="10" fill={FAIL_COLOR} fillOpacity="0.1" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="76" y="217" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 热冷混排：cache line 50% 被冷数据浪费</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="190" width="600" height="44" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="76" y="217" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 热冷分离：热数组紧凑，冷数据不占 cache</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="260" width="600" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="76" y="283" fontSize="11" fontWeight="700" fill={OK_COLOR}>数据局部性的不变量：每帧遍历的数据必须连续且紧凑（SoA）</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：热冷混排让冷数据占据 cache line。复位：SoA 热冷分离，热数据紧凑、冷数据单独存放。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：热冷混排让冷数据占据 cache line，热数据命中率下降；SoA 热冷分离——热数据紧凑排列每帧遍历，冷数据单独存放偶尔访问。
      </figcaption>
    </figure>
  );
}
