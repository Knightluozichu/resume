"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh19ObjectPoolFreelist>：对象池空闲链表动画（GPP 第19章）。
 *
 * 核心：预先分配一批对象循环复用，避免频繁的堆分配/释放和内存碎片——用固定内存换稳定性能。
 *
 * 场景：粒子系统。预先建好 6 个粒子的池，用 free list（空闲链表）串起未用粒子。
 * 需要粒子时从 free list 头取一个激活；粒子死亡时归还到 free list 头。绝不 new/delete。
 *
 * 节拍：
 *  ① 池初始化：6 个槽全部空闲，串成 free list（头→0→1→2→3→4→5）
 *  ② 取一个：从 free list 头摘下槽0 激活，free list 头指向槽1
 *  ③ 再取一个：摘下槽1 激活，free list 头指向槽2
 *  ④ 回收：槽0 粒子死亡，归还到 free list 头，头重新指向槽0
 *  ⑤ 洞见：对象不创建/销毁，只在"空闲↔活跃"间循环，分配是 O(1) 摘链
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const IDLE_COLOR = "#8a8a8a";

const T = TEACHING_BEAT_MS;

const SLOT_COUNT = 6;
const SLOT_W = 84;
const SLOT_H = 64;
const SLOT_GAP = 12;
const POOL_X = 90;
const POOL_Y = 200;

function slotX(i: number): number {
  return POOL_X + i * (SLOT_W + SLOT_GAP);
}

const STEPS: readonly TeachingStep[] = [
  { label: "init", caption: "池初始化：预分配 6 个对象槽，全部空闲，用 free list 串起来（头→0→1→2→3→4→5）" },
  { label: "acquire", caption: "需要粒子：从 free list 头摘下槽0 激活，O(1)；free list 头指向槽1" },
  { label: "acquire2", caption: "再需要一个：摘下槽1 激活；free list 头指向槽2。全程没有 new" },
  { label: "release", caption: "槽0 的粒子死亡：归还到 free list 头，重新串回链；free list 头回到槽0。没有 delete" },
  { label: "insight", caption: "对象从不创建/销毁，只在'空闲↔活跃'间循环——分配/回收都是 O(1) 摘链/挂链" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

// 各节拍下哪些槽是活跃的
const ACTIVE_AT: readonly (readonly number[])[] = [
  [], // init
  [0], // acquire
  [0, 1], // acquire2
  [1], // release（槽0 归还）
];
// 各节拍的 free list 头
const HEAD_AT = [0, 1, 2, 0];

export function GppCh19ObjectPoolFreelist() {
  const activeRefs = useRef<Record<number, SVGRectElement | null>>({});
  const headRef = useRef<SVGGElement | null>(null);
  const activeLabelRef = useRef<SVGGElement | null>(null);
  const insightRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 逐节拍切换活跃槽与 free list 头
      ACTIVE_AT.forEach((activeSet, beat) => {
        // 活跃高亮
        for (let slot = 0; slot < SLOT_COUNT; slot++) {
          const el = activeRefs.current[slot];
          if (!el) continue;
          const isActive = activeSet.includes(slot);
          tl.add(el, { opacity: isActive ? 1 : 0, duration: T * 0.4, ease: "out(3)" }, beat * T + T * 0.2);
        }
        // free list 头指针
        tl.add(headRef.current!, { x: [slotX(HEAD_AT[beat]), slotX(HEAD_AT[beat])], duration: T * 0.3, ease: "out(3)" }, beat * T);
      });
      tl.label("init", 0);
      tl.label("acquire", T);
      tl.label("acquire2", T * 2);
      tl.label("release", T * 3);

      // 活跃区标签
      tl.add(activeLabelRef.current!, { opacity: [0, 1], duration: T * 0.4, ease: "out(3)" }, T);

      // ⑤ insight
      tl.add(insightRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 4);
      tl.label("insight", T * 4);
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
          aria-label="对象池动画。预分配 6 个对象槽，全部空闲时用 free list 串起。需要粒子时从 free list 头摘下槽0 激活、free list 头指向槽1；再摘下槽1 激活、头指向槽2；槽0 粒子死亡时归还到 free list 头、头回到槽0。对象从不创建或销毁，只在空闲与活跃之间循环，分配回收都是 O(1)。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            对象池：对象循环复用，分配是 O(1) 摘链
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            预分配一批对象，用 free list 串起空闲者；取用摘下、回收挂回，绝不 new/delete
          </text>

          {/* 活跃区（上方） */}
          <text x={POOL_X} y={110} fontSize="11" fontWeight="700" fill={OK_COLOR}>
            活跃对象（在场上的粒子）
          </text>
          <rect x={POOL_X - 6} y={120} width={SLOT_COUNT * (SLOT_W + SLOT_GAP)} height={44} rx="8" fill={OK_COLOR} fillOpacity="0.05" stroke={OK_COLOR} strokeWidth="1.2" strokeDasharray="4 3" />
          <g ref={activeLabelRef} style={{ opacity: 0 }}>
            <text x={POOL_X + 10} y={146} fontSize="11" fill={OK_COLOR}>
              ✦ 被激活的槽会在这里"上场"
            </text>
          </g>

          {/* 对象池标题 */}
          <text x={POOL_X} y={POOL_Y - 30} fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            对象池（固定 6 个槽）
          </text>

          {/* 对象槽 */}
          {Array.from({ length: SLOT_COUNT }).map((_, i) => (
            <g key={`slot-${i}`}>
              {/* 空闲底（灰） */}
              <rect x={slotX(i)} y={POOL_Y} width={SLOT_W} height={SLOT_H} rx="8" fill={IDLE_COLOR} fillOpacity="0.08" stroke={IDLE_COLOR} strokeWidth="1.4" />
              {/* 活跃高亮（绿，叠加） */}
              <rect
                ref={(el) => {
                  activeRefs.current[i] = el;
                }}
                x={slotX(i)}
                y={POOL_Y}
                width={SLOT_W}
                height={SLOT_H}
                rx="8"
                fill={OK_COLOR}
                fillOpacity="0.2"
                stroke={OK_COLOR}
                strokeWidth="2"
                style={{ opacity: 0 }}
              />
              <text x={slotX(i) + SLOT_W / 2} y={POOL_Y + 26} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-primary)">
                槽{i}
              </text>
              <text x={slotX(i) + SLOT_W / 2} y={POOL_Y + 46} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
                粒子
              </text>
            </g>
          ))}

          {/* free list 链（穿过空闲槽的虚线） */}
          <line x1={slotX(0) + SLOT_W / 2} y1={POOL_Y + SLOT_H + 16} x2={slotX(SLOT_COUNT - 1) + SLOT_W / 2} y2={POOL_Y + SLOT_H + 16} stroke={IDLE_COLOR} strokeWidth="1.4" strokeDasharray="5 4" />
          <text x={POOL_X} y={POOL_Y + SLOT_H + 40} fontSize="11" fill={IDLE_COLOR}>
            free list（空闲链表）→ 穿过所有空闲槽
          </text>

          {/* free list 头指针 */}
          <g ref={headRef} style={{ transform: `translateX(${slotX(0)}px)` }}>
            <path d={`M ${SLOT_W / 2} ${POOL_Y - 8} l -7 -12 l 14 0 z`} fill={ACCENT} />
            <text x={SLOT_W / 2} y={POOL_Y - 22} textAnchor="middle" fontSize="11" fontWeight="700" fill={ACCENT}>
              free 头
            </text>
          </g>

          {/* 洞见 */}
          <g ref={insightRef} style={{ opacity: 0 }}>
            <rect x={POOL_X} y={VIEW_H - 44} width={560} height={30} rx="8" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="1.6" />
            <text x={POOL_X + 280} y={VIEW_H - 25} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              不 new/delete：对象在空闲↔活跃间循环，避免分配开销与内存碎片
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="对象池预分配固定数量对象，用 free list 管理空闲者：取用从链头摘下、回收挂回链头，都是 O(1)。代价：池满则无对象可用、对象大小固定、复用对象需手动清空状态。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        对象池（Object Pool）：预先分配一批对象并循环复用，用一个空闲链表（free list）
        管理未用对象。需要时从链头摘下一个激活，用完归还到链头——绝不 new/delete。
        这样避免了频繁堆分配/释放的开销与内存碎片，分配回收都是 O(1)。
        代价是池容量固定、对象大小固定、复用对象需要手动清空旧状态。
      </figcaption>
    </figure>
  );
}
