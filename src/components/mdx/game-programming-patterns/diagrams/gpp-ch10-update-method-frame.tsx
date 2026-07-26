"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh10UpdateMethodFrame>：更新方法逐帧轮流推进动画（GPP 第10章）。
 *
 * 场景：游戏循环持有对象列表 [Bjørn, Skeleton, Mage]。每一帧按顺序调用每个对象的
 * update(dt)，每个对象推进一小步并把自己的状态保存到下一帧。对象之间不是真并发，
 * 而是轮流"演一帧"——协作式伪并发。
 *
 * 节拍：
 *  ① 第 N 帧开始，循环对对象列表拍快照（三个对象都在位置 0）
 *  ② 调用 Bjørn.update(dt)，Bjørn 位置 0→1
 *  ③ 调用 Skeleton.update(dt)，Skeleton 位置 0→1
 *  ④ 调用 Mage.update(dt)，Mage 位置 0→1
 *  ⑤ 第 N 帧结束，帧时钟 N→N+1，所有对象状态已保存、下帧继续
 *  ⑥ 反例：遍历中删除当前对象 Skeleton，迭代器跳过 Mage（失败色）
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const FAIL_COLOR = "#E5675C";

// ─── 对象行布局 ──────────────────────────────────────────────────────────────

type Entity = {
  id: string;
  name: string;
  emoji: string;
  rowY: number;
};

const ENTITIES: readonly Entity[] = [
  { id: "bjorn", name: "Bjørn", emoji: "🧝", rowY: 120 },
  { id: "skeleton", name: "Skeleton", emoji: "💀", rowY: 196 },
  { id: "mage", name: "Mage", emoji: "🧙", rowY: 272 },
];

const CARD_X = 40;
const CARD_W = 250;
const CARD_H = 60;

// 状态标记轨道：位置 0/1/2 对应三个 x 坐标
const TRACK_X0 = 380;
const TRACK_STEP = 70;
function markerX(pos: number): number {
  return TRACK_X0 + pos * TRACK_STEP;
}

// ─── 教学步骤 ────────────────────────────────────────────────────────────────

const STEPS: readonly TeachingStep[] = [
  {
    label: "snapshot",
    caption: "第 N 帧开始，游戏循环对对象列表拍快照，三个对象都停在位置 0",
  },
  {
    label: "upd-bjorn",
    caption: "调用 Bjørn.update(dt)：它推进一格并把新位置存进自身状态",
  },
  {
    label: "upd-skeleton",
    caption: "调用 Skeleton.update(dt)：轮到它演这一帧，推进并保存状态",
  },
  {
    label: "upd-mage",
    caption: "调用 Mage.update(dt)：最后一个对象推进并保存状态",
  },
  {
    label: "frame-done",
    caption: "第 N 帧结束，帧时钟走到 N+1；每个对象都只演了一帧、状态已保存，下帧继续",
  },
  {
    label: "fault",
    caption: "反例：遍历到 Skeleton 时把它从列表删除，后续元素左移，迭代器跳过 Mage",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

const T = TEACHING_BEAT_MS;

// ─── 组件 ────────────────────────────────────────────────────────────────────

export function GppCh10UpdateMethodFrame() {
  const cursorRef = useRef<SVGGElement | null>(null);
  const markerRefs = useRef<Record<string, SVGGElement | null>>({});
  const calloutRef = useRef<SVGGElement | null>(null);
  const frameNRef = useRef<SVGTextElement | null>(null);
  const frameN1Ref = useRef<SVGTextElement | null>(null);
  const savedRef = useRef<SVGGElement | null>(null);
  const faultRef = useRef<SVGGElement | null>(null);
  const normalListRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① snapshot（t=0）：初始态——三个对象都停在位置 0（暂停时呈现）
      tl.label("snapshot", 0);

      // ② upd-bjorn（t: 0→T）：Bjørn 标记 0→1，callout 出现在 Bjørn 行
      tl.add(
        markerRefs.current["bjorn"]!,
        { x: [markerX(0), markerX(1)], duration: T, ease: "out(3)" },
        0,
      );
      tl.add(
        calloutRef.current!,
        { opacity: [0, 1], y: [ENTITIES[0].rowY, ENTITIES[0].rowY], duration: T * 0.4, ease: "out(3)" },
        0,
      );
      tl.label("upd-bjorn", 1);

      // ③ upd-skeleton（t: T→2T）：光标移到 Skeleton，标记 0→1，callout 移到 Skeleton 行
      tl.add(
        cursorRef.current!,
        { y: [ENTITIES[0].rowY, ENTITIES[1].rowY], duration: T * 0.5, ease: "out(3)" },
        T,
      );
      tl.add(
        calloutRef.current!,
        { y: [ENTITIES[0].rowY, ENTITIES[1].rowY], duration: T * 0.5, ease: "out(3)" },
        T,
      );
      tl.add(
        markerRefs.current["skeleton"]!,
        { x: [markerX(0), markerX(1)], duration: T, ease: "out(3)" },
        T,
      );
      tl.label("upd-skeleton", T);

      // ④ upd-mage（t: 2T→3T）：光标移到 Mage，标记 0→1
      tl.add(
        cursorRef.current!,
        { y: [ENTITIES[1].rowY, ENTITIES[2].rowY], duration: T * 0.5, ease: "out(3)" },
        T * 2,
      );
      tl.add(
        calloutRef.current!,
        { y: [ENTITIES[1].rowY, ENTITIES[2].rowY], duration: T * 0.5, ease: "out(3)" },
        T * 2,
      );
      tl.add(
        markerRefs.current["mage"]!,
        { x: [markerX(0), markerX(1)], duration: T, ease: "out(3)" },
        T * 2,
      );
      tl.label("upd-mage", T * 2);

      // ⑤ frame-done（t: 3T→4T）：帧时钟 N→N+1，callout 淡出，"状态已保存"浮现
      tl.add(
        calloutRef.current!,
        { opacity: [1, 0], duration: T * 0.4, ease: "out(3)" },
        T * 3,
      );
      tl.add(
        frameNRef.current!,
        { opacity: [1, 0], duration: T * 0.5, ease: "out(3)" },
        T * 3,
      );
      tl.add(
        frameN1Ref.current!,
        { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" },
        T * 3,
      );
      tl.add(
        savedRef.current!,
        { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" },
        T * 3.3,
      );
      tl.label("frame-done", T * 3);

      // ⑥ fault（t: 4T→5T）：正常列表淡出，反例面板浮现
      tl.add(
        normalListRef.current!,
        { opacity: [1, 0.25], duration: T * 0.5, ease: "out(3)" },
        T * 4,
      );
      tl.add(
        faultRef.current!,
        { opacity: [0, 1], duration: T * 0.7, ease: "out(3)" },
        T * 4.2,
      );
      tl.label("fault", T * 4);
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
          aria-label="更新方法动画。游戏循环持有对象列表 Bjørn、Skeleton、Mage。每一帧按顺序调用每个对象的 update(dt)，对象推进一小步并把状态保存到下一帧：Bjørn 位置 0→1，Skeleton 0→1，Mage 0→1，帧时钟从 N 走到 N+1。对象之间不是真并发，而是轮流演一帧。反例：遍历到 Skeleton 时把它删除，后续元素左移，迭代器跳过 Mage。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            更新方法：游戏循环逐帧轮流推进每个对象
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            协作式伪并发——每个对象演一帧、存状态、下帧继续，而非真正并行
          </text>

          {/* 对象列表标题 */}
          <text x={CARD_X} y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            对象列表 entities[]
          </text>

          {/* 正常列表分组（反例时整体淡化） */}
          <g ref={normalListRef}>
            {/* 对象卡片 */}
            {ENTITIES.map((e) => (
              <g key={e.id}>
                <rect
                  x={CARD_X}
                  y={e.rowY - CARD_H / 2}
                  width={CARD_W}
                  height={CARD_H}
                  rx="8"
                  fill="var(--text-secondary)"
                  fillOpacity="0.06"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text x={CARD_X + 16} y={e.rowY - 4} fontSize="18">
                  {e.emoji}
                </text>
                <text
                  x={CARD_X + 46}
                  y={e.rowY - 2}
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {e.name}
                </text>
                <text
                  x={CARD_X + 46}
                  y={e.rowY + 16}
                  fontSize="11"
                  fontFamily="monospace"
                  fill="var(--text-secondary)"
                >
                  .update(dt)
                </text>

                {/* 状态轨道刻度 0/1/2 */}
                {[0, 1, 2].map((pos) => (
                  <text
                    key={pos}
                    x={markerX(pos)}
                    y={e.rowY - CARD_H / 2 - 6}
                    textAnchor="middle"
                    fontSize="11"
                    fill="var(--text-secondary)"
                  >
                    {pos}
                  </text>
                ))}
                {/* 轨道线 */}
                <line
                  x1={markerX(0)}
                  y1={e.rowY}
                  x2={markerX(2)}
                  y2={e.rowY}
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
              </g>
            ))}

            {/* 状态标记（每对象一个，动画推进） */}
            {ENTITIES.map((e) => (
              <g
                key={`marker-${e.id}`}
                ref={(el) => {
                  markerRefs.current[e.id] = el;
                }}
                style={{ transform: `translateX(${markerX(0)}px)` }}
              >
                <circle
                  cx={0}
                  cy={e.rowY}
                  r="9"
                  fill={ACCENT}
                  stroke="var(--elevated)"
                  strokeWidth="2"
                />
              </g>
            ))}

            {/* 迭代光标（左侧箭头，沿对象行移动） */}
            <g
              ref={cursorRef}
              style={{ transform: `translateY(${ENTITIES[0].rowY}px)` }}
            >
              <path
                d={`M ${CARD_X - 22} 0 l 12 -7 l 0 14 z`}
                fill={ACCENT}
              />
              <text x={CARD_X - 26} y={4} textAnchor="end" fontSize="11" fill={ACCENT}>
                i
              </text>
            </g>

            {/* update(dt) 调用提示（浮动在当前对象右侧） */}
            <g
              ref={calloutRef}
              style={{ opacity: 0, transform: `translateY(${ENTITIES[0].rowY}px)` }}
            >
              <rect
                x={CARD_X + CARD_W + 12}
                y={-13}
                width={70}
                height={26}
                rx="6"
                fill={ACCENT}
                fillOpacity="0.14"
                stroke={ACCENT}
                strokeWidth="1.4"
              />
              <text
                x={CARD_X + CARD_W + 47}
                y={4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fontFamily="monospace"
                fill={ACCENT}
              >
                update
              </text>
            </g>
          </g>

          {/* 帧时钟（右上） */}
          <text x={VIEW_W - 130} y="86" fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            帧时钟
          </text>
          <rect
            x={VIEW_W - 130}
            y="96"
            width={98}
            height={44}
            rx="8"
            fill="var(--text-secondary)"
            fillOpacity="0.06"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            ref={frameNRef}
            x={VIEW_W - 81}
            y="124"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fontFamily="monospace"
            fill="var(--text-primary)"
            style={{ opacity: 1 }}
          >
            帧 N
          </text>
          <text
            ref={frameN1Ref}
            x={VIEW_W - 81}
            y="124"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fontFamily="monospace"
            fill={OK_COLOR}
            style={{ opacity: 0 }}
          >
            帧 N+1
          </text>
          <text x={VIEW_W - 130} y="158" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">
            dt = 16ms
          </text>

          {/* 状态已保存提示 */}
          <g ref={savedRef} style={{ opacity: 0 }}>
            <rect
              x={TRACK_X0 - 10}
              y={ENTITIES[2].rowY + 30}
              width={230}
              height={26}
              rx="6"
              fill={OK_COLOR}
              fillOpacity="0.14"
              stroke={OK_COLOR}
              strokeWidth="1.4"
            />
            <text
              x={TRACK_X0 + 105}
              y={ENTITIES[2].rowY + 47}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill={OK_COLOR}
            >
              ✓ 三个对象各推进一步，状态已保存
            </text>
          </g>

          {/* 反例面板（底部） */}
          <g ref={faultRef} style={{ opacity: 0 }}>
            <rect
              x={CARD_X}
              y={356}
              width={VIEW_W - CARD_X * 2}
              height={120}
              rx="10"
              fill={FAIL_COLOR}
              fillOpacity="0.07"
              stroke={FAIL_COLOR}
              strokeWidth="1.6"
            />
            <text x={CARD_X + 16} y="380" fontSize="12" fontWeight="700" fill={FAIL_COLOR}>
              反例：遍历中删除当前对象 → 迭代器跳过下一个
            </text>

            {/* 删除前列表 */}
            <text x={CARD_X + 16} y="404" fontSize="11" fill="var(--text-secondary)">
              删除前
            </text>
            {["Bjørn", "Skeleton", "Mage"].map((name, i) => (
              <g key={`before-${name}`}>
                <rect
                  x={CARD_X + 64 + i * 78}
                  y="392"
                  width={70}
                  height={20}
                  rx="4"
                  fill="var(--text-secondary)"
                  fillOpacity="0.1"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={CARD_X + 99 + i * 78}
                  y="406"
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {name}
                </text>
              </g>
            ))}
            <text x={CARD_X + 300} y="406" fontSize="11" fontFamily="monospace" fill="var(--text-secondary)">
              i=1
            </text>

            {/* 删除动作 */}
            <text x={CARD_X + 16} y="436" fontSize="11" fill={FAIL_COLOR}>
              remove(i=1)
            </text>

            {/* 删除后列表：Skeleton 消失，Mage 左移到 i=1，但 i++ 后 i=2 越界 → Mage 被跳过 */}
            <text x={CARD_X + 16} y="460" fontSize="11" fill="var(--text-secondary)">
              删除后
            </text>
            <rect
              x={CARD_X + 64}
              y="448"
              width={70}
              height={20}
              rx="4"
              fill="var(--text-secondary)"
              fillOpacity="0.1"
              stroke="var(--border)"
              strokeWidth="1"
            />
            <text x={CARD_X + 99} y="462" textAnchor="middle" fontSize="11" fill="var(--text-primary)">
              Bjørn
            </text>
            <rect
              x={CARD_X + 142}
              y="448"
              width={70}
              height={20}
              rx="4"
              fill={FAIL_COLOR}
              fillOpacity="0.16"
              stroke={FAIL_COLOR}
              strokeWidth="1.4"
            />
            <text x={CARD_X + 177} y="462" textAnchor="middle" fontSize="11" fontWeight="700" fill={FAIL_COLOR}>
              Mage
            </text>
            {/* 迭代器跳到 i=2，越过 Mage */}
            <path
              d={`M ${CARD_X + 250} 458 l 10 -6 l 0 12 z`}
              fill={FAIL_COLOR}
            />
            <text x={CARD_X + 268} y="462" fontSize="11" fontFamily="monospace" fill={FAIL_COLOR}>
              i=2 → 越界，Mage 未更新！
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="游戏循环每帧按顺序调用每个对象的 update(dt)，对象推进并保存状态；对象轮流演一帧，是协作式伪并发。遍历中增删对象会跳过/重复，需延迟到帧边界处理。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        更新方法（Update Method）：让每个活跃对象实现一个"每帧调用一次"的更新方法，
        并自己保存续行状态。游戏循环逐帧轮流调用，模拟出"所有对象同时活动"的假象，
        实则是顺序的协作式伪并发。代价：行为被切成帧片段更复杂、须显式存状态、
        遍历对象列表时增删会导致跳过——增删应延迟到帧边界。
      </figcaption>
    </figure>
  );
}
