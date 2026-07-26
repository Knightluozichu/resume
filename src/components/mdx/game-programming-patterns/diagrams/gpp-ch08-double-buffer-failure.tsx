"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh08DoubleBufferFailure>：双缓冲模式反例复位动画（GPP 第8章 · 图3）。
 *
 * 故事：swap 必须原子。
 *  ① 初始：前台缓冲 + 后台缓冲（新画面就绪）
 *  ② 反例：非原子 swap（逐行复制），读取方在复制中途读取
 *  ③ 反例结果：读到半新半旧的混合缓冲 ✗
 *  ④ 复位：原子 swap（一次性切换缓冲指针）
 *  ⑤ 复位结果：读取方永远看到完整的一份缓冲 ✓
 */

const VIEW_W = 720;
const VIEW_H = 460;

const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "setup", caption: "前台缓冲（旧画面）+ 后台缓冲（新画面就绪）" },
  { label: "nonatomic", caption: "反例：非原子 swap（逐行复制），复制需要时间" },
  { label: "mixed", caption: "反例结果：读取方在复制中途读取 → 读到半新半旧的混合缓冲 ✗" },
  { label: "atomic", caption: "复位：原子 swap——一次性切换缓冲指针，切换是瞬时的" },
  { label: "complete", caption: "复位结果：读取方永远看到完整的一份缓冲 ✓" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh08DoubleBufferFailure() {
  const sceneRef = useRef<SVGGElement | null>(null);
  const readerRef = useRef<SVGGElement | null>(null);
  const mixedRef = useRef<SVGGElement | null>(null);
  const completeRef = useRef<SVGGElement | null>(null);
  const nonatomicNoteRef = useRef<SVGGElement | null>(null);
  const atomicNoteRef = useRef<SVGGElement | null>(null);
  const verdictRefs = useRef<Record<string, SVGGElement | null>>({});
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① setup（t: 0→T）：前台 + 后台 + 读取方
      tl.add(sceneRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.add(readerRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 0.5);
      tl.label("setup", 0);

      // ② nonatomic（t: T→2T）：非原子 swap 提示（逐行复制）
      tl.add(nonatomicNoteRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 1.1);
      tl.label("nonatomic", T);

      // ③ mixed（t: 2T→3T）：读取方读到混合缓冲（上半旧下半新）+ 判定✗
      tl.add(mixedRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 2.1);
      tl.add(verdictRefs.current["bad"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2.5);
      tl.label("mixed", T * 2);

      // ④ atomic（t: 3T→4T）：非原子提示/混合/坏判定淡出，原子 swap 提示出现
      tl.add(nonatomicNoteRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(mixedRef.current!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(verdictRefs.current["bad"]!, { opacity: [1, 0], duration: T * 0.3, ease: "out(3)" }, T * 3);
      tl.add(atomicNoteRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 3.2);
      tl.label("atomic", T * 3);

      // ⑤ complete（t: 4T→5T）：读取方看到完整缓冲 + 判定✓ + 结论
      tl.add(completeRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T * 4.1);
      tl.add(verdictRefs.current["good"]!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 4.4);
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 4.6);
      tl.label("complete", T * 4);
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
          aria-label="双缓冲模式反例复位动画。swap 必须原子。反例是非原子 swap 逐行复制，复制需要时间，读取方在复制中途读取，读到半新半旧的混合缓冲。复位是原子 swap 一次性切换缓冲指针，切换是瞬时的，读取方永远看到完整的一份缓冲。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <text x="32" y="30" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            反例：非原子 swap → 读到中间态
          </text>
          <text x="32" y="50" fontSize="11" fill="var(--text-secondary)">
            swap 必须原子，否则读取方读到半新半旧
          </text>

          {/* 场景：前台 + 后台缓冲 */}
          <g ref={sceneRef} style={{ opacity: 0 }}>
            <text x="60" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">前台缓冲（旧画面）</text>
            <rect x="60" y="96" width="260" height="120" rx="10" fill="var(--text-secondary)" fillOpacity="0.06" stroke="var(--border)" strokeWidth="1.6" />
            <text x="190" y="160" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">旧画面</text>

            <text x="400" y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">后台缓冲（新画面就绪）</text>
            <rect x="400" y="96" width="260" height="120" rx="10" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="530" y="160" textAnchor="middle" fontSize="11" fill={OK_COLOR}>新画面</text>
          </g>

          {/* 读取方 */}
          <g ref={readerRef} style={{ opacity: 0 }}>
            <text x="60" y="250" fontSize="11" fontWeight="700" fill="var(--text-secondary)">读取方看到的</text>
            <rect x="60" y="260" width="260" height="90" rx="10" fill="var(--text-secondary)" fillOpacity="0.04" stroke="var(--border)" strokeWidth="1.6" />
            <text x="190" y="310" textAnchor="middle" fontSize="11" fill="var(--text-secondary)">完整旧画面</text>
          </g>

          {/* 混合缓冲（反例结果） */}
          <g ref={mixedRef} style={{ opacity: 0 }}>
            <rect x="62" y="262" width="256" height="43" fill={FAIL_COLOR} fillOpacity="0.12" />
            <text x="190" y="288" textAnchor="middle" fontSize="11" fill={FAIL_COLOR}>旧（上半）</text>
            <rect x="62" y="305" width="256" height="43" fill={OK_COLOR} fillOpacity="0.16" />
            <text x="190" y="331" textAnchor="middle" fontSize="11" fill={OK_COLOR}>新（下半）</text>
            <line x1="62" y1="305" x2="318" y2="305" stroke={FAIL_COLOR} strokeWidth="2" strokeDasharray="5 3" />
          </g>

          {/* 完整缓冲（复位结果） */}
          <g ref={completeRef} style={{ opacity: 0 }}>
            <rect x="62" y="262" width="256" height="86" fill={OK_COLOR} fillOpacity="0.14" />
            <text x="190" y="310" textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>完整新画面 ✓</text>
          </g>

          {/* 非原子 swap 提示 */}
          <g ref={nonatomicNoteRef} style={{ opacity: 0 }}>
            <rect x="400" y="260" width="260" height="90" rx="10" fill={FAIL_COLOR} fillOpacity="0.08" stroke={FAIL_COLOR} strokeWidth="1.6" />
            <text x="416" y="284" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>非原子 swap：逐行复制</text>
            <text x="416" y="306" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">for row: front[i]=back[i]</text>
            <text x="416" y="330" fontSize="11" fill="var(--text-secondary)">复制需要时间，读取方可能撞见中途</text>
          </g>

          {/* 原子 swap 提示 */}
          <g ref={atomicNoteRef} style={{ opacity: 0 }}>
            <rect x="400" y="260" width="260" height="90" rx="10" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x="416" y="284" fontSize="11" fontWeight="700" fill={OK_COLOR}>原子 swap：一次切换指针</text>
            <text x="416" y="306" fontSize="11" fontFamily="monospace" fill="var(--text-primary)">swap(front, back) // 一步</text>
            <text x="416" y="330" fontSize="11" fill="var(--text-secondary)">切换是瞬时的，读取方不会撞见中途</text>
          </g>

          {/* 判定 */}
          <g ref={(el) => { verdictRefs.current["bad"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="370" width="600" height="36" rx="8" fill={FAIL_COLOR} fillOpacity="0.12" stroke={FAIL_COLOR} strokeWidth="2" />
            <text x="76" y="393" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>✗ 非原子 swap：读取方读到半新半旧的混合缓冲</text>
          </g>
          <g ref={(el) => { verdictRefs.current["good"] = el; }} style={{ opacity: 0 }}>
            <rect x="60" y="370" width="600" height="36" rx="8" fill={OK_COLOR} fillOpacity="0.12" stroke={OK_COLOR} strokeWidth="2" />
            <text x="76" y="393" fontSize="12" fontWeight="700" fill={OK_COLOR}>✓ 原子 swap：读取方永远看到完整缓冲</text>
          </g>

          {/* 结论 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x="60" y="416" width="600" height="32" rx="8" fill={OK_COLOR} fillOpacity="0.08" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="76" y="437" fontSize="11" fontWeight="700" fill={OK_COLOR}>swap 用一次性切换缓冲指针，保证原子性</text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="反例：非原子 swap（逐行复制）让读取方读到半新半旧。复位：原子 swap（一次切换指针），读取方永远看到完整缓冲。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        反例与复位：若 swap 不是原子的（如逐行复制），读取方可能在切换中途读到半新半旧的混合缓冲；swap 用一次性切换缓冲指针，保证原子性。
      </figcaption>
    </figure>
  );
}
