"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh08DoubleBufferSwap>：双缓冲前后台交换动画（GPP 第8章）。
 *
 * 核心：用两份缓冲——一份对外可见（前台）、一份在后台更新——在某一瞬间整体切换（swap），
 * 让外部永远看不到中间状态。图形渲染即典型：渲染写 back buffer，显示读 front buffer，
 * 帧末 swap。
 *
 * 场景（舞台剧分幕）：演员在后台缓冲排练新走位，观众看的是前台缓冲；排练完成后幕布
 * 一次性切换，观众瞬间看到新场景，绝不看到排练中途的混乱。
 *
 * 节拍：
 *  ① 前台显示旧布局，观众看到稳定画面
 *  ② 后台逐个移动演员到新位置，前台不变（观众无感）
 *  ③ 帧末 swap：前后台整体交换
 *  ④ 观众瞬间看到新布局，全程没见过中间状态
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const BACK_COLOR = "#E5B567";

const T = TEACHING_BEAT_MS;

const BAND_X = 130;
const BAND_W = 540;
const BAND_H = 96;
const FRONT_Y = 120;
const BACK_Y = 300;

// 三个演员在缓冲带内的 x 位置
const SLOT_X = [220, 380, 540];
// 旧布局（前台初始）：A B C 在 slot 0/1/2
// 新布局（后台渲染）：A B C 移到 slot 1/2/0（整体换位）
const FRONT_ACTORS = [
  { emoji: "🎭", label: "A", slot: 0 },
  { emoji: "🤹", label: "B", slot: 1 },
  { emoji: "🎪", label: "C", slot: 2 },
];
const BACK_ACTORS = [
  { emoji: "🎭", label: "A", slot: 1 },
  { emoji: "🤹", label: "B", slot: 2 },
  { emoji: "🎪", label: "C", slot: 0 },
];

const STEPS: readonly TeachingStep[] = [
  { label: "front", caption: "前台缓冲对观众可见，显示稳定画面（旧布局 A-B-C）" },
  { label: "back", caption: "渲染在后台缓冲逐个把演员移到新位置，前台丝毫不变，观众毫无察觉" },
  { label: "swap", caption: "帧末 swap：前后台整体交换——后台（新布局）升到前台" },
  { label: "result", caption: "观众瞬间看到新布局，全程没有看到任何中间/撕裂状态" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh08DoubleBufferSwap() {
  const frontRef = useRef<SVGGElement | null>(null);
  const backRef = useRef<SVGGElement | null>(null);
  const backActorsRef = useRef<SVGGElement | null>(null);
  const swapBadgeRef = useRef<SVGGElement | null>(null);
  const eyeRef = useRef<SVGGElement | null>(null);
  const resultRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① front（t: 0→T）：前台高亮，观众眼睛指向前台
      tl.add(eyeRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, 0);
      tl.label("front", 0);

      // ② back（t: T→2T）：后台演员逐个移动到新位置（后台带淡入演员）
      tl.add(backActorsRef.current!, { opacity: [0.2, 1], duration: T * 0.7, ease: "out(3)" }, T);
      tl.label("back", T);

      // ③ swap（t: 2T→3T）：前台带下移到 BACK_Y，后台带上移到 FRONT_Y
      tl.add(swapBadgeRef.current!, { opacity: [0, 1], duration: T * 0.3, ease: "out(3)" }, T * 2);
      tl.add(frontRef.current!, { y: [FRONT_Y, BACK_Y], duration: T * 0.8, ease: "inOut(2)" }, T * 2.1);
      tl.add(backRef.current!, { y: [BACK_Y, FRONT_Y], duration: T * 0.8, ease: "inOut(2)" }, T * 2.1);
      tl.label("swap", T * 2);

      // ④ result（t: 3T→4T）：结论浮现
      tl.add(resultRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 3);
      tl.label("result", T * 3);
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="overflow-x-auto rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="双缓冲动画。前台缓冲对观众可见，显示稳定的旧布局 A-B-C；渲染在后台缓冲把演员逐个移到新位置，前台丝毫不变，观众毫无察觉；帧末 swap 前后台整体交换，后台的新布局升到前台；观众瞬间看到新布局，全程没有看到任何中间或撕裂状态。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            双缓冲：后台更新，瞬间切换，外部不见中间态
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            渲染写后台、显示读前台，帧末整体 swap——观众永远看到完整画面
          </text>

          {/* 观众眼睛（指向当前前台位置） */}
          <g ref={eyeRef} style={{ opacity: 0 }}>
            <text x="60" y={FRONT_Y + BAND_H / 2} fontSize="22">
              👁
            </text>
            <text x="48" y={FRONT_Y + BAND_H / 2 + 22} fontSize="11" fill="var(--text-secondary)">
              观众
            </text>
          </g>

          {/* 前台缓冲带（可移动） */}
          <g ref={frontRef} style={{ transform: `translateY(${FRONT_Y}px)` }}>
            <rect x={BAND_X} y={0} width={BAND_W} height={BAND_H} rx="10" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeWidth="2" />
            <text x={BAND_X + 12} y={20} fontSize="11" fontWeight="700" fill={ACCENT}>
              前台 front buffer（可见）
            </text>
            {FRONT_ACTORS.map((a) => (
              <g key={`front-${a.label}`}>
                <circle cx={SLOT_X[a.slot]} cy={BAND_H / 2 + 8} r="18" fill={ACCENT} fillOpacity="0.16" stroke={ACCENT} strokeWidth="1.6" />
                <text x={SLOT_X[a.slot]} y={BAND_H / 2 + 14} textAnchor="middle" fontSize="16">
                  {a.emoji}
                </text>
              </g>
            ))}
          </g>

          {/* 后台缓冲带（可移动） */}
          <g ref={backRef} style={{ transform: `translateY(${BACK_Y}px)` }}>
            <rect x={BAND_X} y={0} width={BAND_W} height={BAND_H} rx="10" fill={BACK_COLOR} fillOpacity="0.08" stroke={BACK_COLOR} strokeWidth="1.6" strokeDasharray="5 3" />
            <text x={BAND_X + 12} y={20} fontSize="11" fontWeight="700" fill={BACK_COLOR}>
              后台 back buffer（渲染写入）
            </text>
            <g ref={backActorsRef} style={{ opacity: 0.2 }}>
              {BACK_ACTORS.map((a) => (
                <g key={`back-${a.label}`}>
                  <circle cx={SLOT_X[a.slot]} cy={BAND_H / 2 + 8} r="18" fill={BACK_COLOR} fillOpacity="0.2" stroke={BACK_COLOR} strokeWidth="1.6" />
                  <text x={SLOT_X[a.slot]} y={BAND_H / 2 + 14} textAnchor="middle" fontSize="16">
                    {a.emoji}
                  </text>
                </g>
              ))}
            </g>
          </g>

          {/* swap 徽章 */}
          <g ref={swapBadgeRef} style={{ opacity: 0 }}>
            <rect x={VIEW_W / 2 - 60} y={(FRONT_Y + BACK_Y) / 2 + 30} width={120} height={28} rx="7" fill={OK_COLOR} fillOpacity="0.16" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={VIEW_W / 2} y={(FRONT_Y + BACK_Y) / 2 + 48} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              ⇅ swap（原子切换）
            </text>
          </g>

          {/* 结论 */}
          <g ref={resultRef} style={{ opacity: 0 }}>
            <rect x={BAND_X} y={VIEW_H - 46} width={BAND_W} height={30} rx="8" fill={OK_COLOR} fillOpacity="0.1" stroke={OK_COLOR} strokeWidth="1.6" />
            <text x={VIEW_W / 2} y={VIEW_H - 27} textAnchor="middle" fontSize="12" fontWeight="700" fill={OK_COLOR}>
              更新与展示在时间上分离，swap 是原子的 → 外部只见结果不见过程
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="渲染在后台缓冲完成整帧，再一次性 swap 到前台。代价：swap 本身耗时、需要两份缓冲的内存。不仅用于图形，也用于任何'更新中途不能被读到'的场景。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        双缓冲（Double Buffer）：维护两份缓冲，一份对外可见、一份在后台更新，
        在某一瞬间整体切换。这样外部永远读到完整一致的状态，看不到更新过程中的
        中间/撕裂状态。典型应用是图形渲染：渲染写后台、显示读前台、帧末交换。
      </figcaption>
    </figure>
  );
}
