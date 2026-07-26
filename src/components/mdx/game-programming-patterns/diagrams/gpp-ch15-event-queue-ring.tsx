"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../../anim/use-teaching-timeline";

/**
 * <GppCh15EventQueueRing>：事件队列环形缓冲动画（GPP 第15章）。
 *
 * 核心：把事件/请求放进一个队列缓冲，发送方发完即走，接收方按自己的节奏出队处理——
 * 解耦双方的时间。
 *
 * 场景：游戏线程产生音频请求（"播放爆炸音"），不直接调用音频系统（会阻塞/抢资源），
 * 而是把请求入队；音频线程从环形缓冲队列逐个出队播放。
 *
 * 节拍：
 *  ① 游戏线程把"播放爆炸音"写入队尾，tail 前移，发完即走不阻塞
 *  ② 再写入"播放点击音"，tail 再前移
 *  ③ 音频线程从队头取出"播放爆炸音"，head 前移
 *  ④ 音频线程播放该音频
 *  ⑤ 洞见：队列解耦"何时发"与"何时处理"
 */

const VIEW_W = 720;
const VIEW_H = 500;

const ACCENT = "var(--accent)";
const OK_COLOR = "#3FB97F";
const PRODUCER_COLOR = "#5AA9E6";
const CONSUMER_COLOR = "#C792EA";

const T = TEACHING_BEAT_MS;

// 环形队列布局
const QUEUE_X = 200;
const QUEUE_Y = 220;
const SLOT_W = 56;
const SLOT_H = 56;
const SLOT_GAP = 6;
const SLOT_COUNT = 6;

function slotX(i: number): number {
  return QUEUE_X + i * (SLOT_W + SLOT_GAP);
}

const EVENTS = [
  { label: "爆炸音", color: PRODUCER_COLOR },
  { label: "点击音", color: "#E5B567" },
];

const STEPS: readonly TeachingStep[] = [
  { label: "enq1", caption: "游戏线程把'播放爆炸音'写入队尾，tail 前移——发完立刻返回，不阻塞" },
  { label: "enq2", caption: "再写入'播放点击音'，tail 再前移；两个请求在队列里排队" },
  { label: "deq", caption: "音频线程从队头取出'播放爆炸音'，head 前移" },
  { label: "play", caption: "音频线程按自己的节奏播放该音频，与游戏线程互不等待" },
  { label: "decouple", caption: "队列把'何时发'与'何时处理'解耦：发送方发完即走，接收方自行出队" },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function GppCh15EventQueueRing() {
  const event0Ref = useRef<SVGGElement | null>(null);
  const event1Ref = useRef<SVGGElement | null>(null);
  const tailRef = useRef<SVGGElement | null>(null);
  const headRef = useRef<SVGGElement | null>(null);
  const playRef = useRef<SVGGElement | null>(null);
  const decoupleRef = useRef<SVGGElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // ① enq1（t: 0→T）：事件0 落入 slot0，tail 0→1
      tl.add(event0Ref.current!, { opacity: [0, 1], y: [QUEUE_Y - 40, QUEUE_Y], duration: T * 0.6, ease: "out(3)" }, 0);
      tl.add(tailRef.current!, { x: [slotX(0), slotX(1)], duration: T * 0.5, ease: "out(3)" }, T * 0.3);
      tl.label("enq1", 0);

      // ② enq2（t: T→2T）：事件1 落入 slot1，tail 1→2
      tl.add(event1Ref.current!, { opacity: [0, 1], y: [QUEUE_Y - 40, QUEUE_Y], duration: T * 0.6, ease: "out(3)" }, T);
      tl.add(tailRef.current!, { x: [slotX(1), slotX(2)], duration: T * 0.5, ease: "out(3)" }, T * 1.3);
      tl.label("enq2", T);

      // ③ deq（t: 2T→3T）：事件0 从 slot0 取出（淡出上移），head 0→1
      tl.add(event0Ref.current!, { opacity: [1, 0], y: [QUEUE_Y, QUEUE_Y - 40], duration: T * 0.5, ease: "out(3)" }, T * 2);
      tl.add(headRef.current!, { x: [slotX(0), slotX(1)], duration: T * 0.5, ease: "out(3)" }, T * 2.3);
      tl.label("deq", T * 2);

      // ④ play（t: 3T→4T）：消费者播放
      tl.add(playRef.current!, { opacity: [0, 1], duration: T * 0.5, ease: "out(3)" }, T * 3);
      tl.label("play", T * 3);

      // ⑤ decouple（t: 4T→5T）
      tl.add(decoupleRef.current!, { opacity: [0, 1], duration: T * 0.6, ease: "out(3)" }, T * 4);
      tl.label("decouple", T * 4);
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
          aria-label="事件队列动画。游戏线程作为生产者把音频请求写入环形队列：先入'播放爆炸音'tail 前移、发完即走不阻塞，再入'播放点击音'。音频线程作为消费者从队头取出'播放爆炸音'head 前移，然后按自己的节奏播放。队列把何时发送与何时处理解耦，两个线程互不等待。可播放、暂停、单步、拖进度。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* 标题 */}
          <text x="32" y="34" fontSize="16" fontWeight="700" fill="var(--text-primary)">
            事件队列：发送方发完即走，接收方按节奏处理
          </text>
          <text x="32" y="54" fontSize="11" fill="var(--text-secondary)">
            请求入队缓冲，解耦"何时发"与"何时处理"——两个线程互不阻塞
          </text>

          {/* 生产者：游戏线程 */}
          <rect x="40" y={QUEUE_Y - 10} width={120} height={76} rx="10" fill={PRODUCER_COLOR} fillOpacity="0.12" stroke={PRODUCER_COLOR} strokeWidth="2" />
          <text x="100" y={QUEUE_Y + 18} textAnchor="middle" fontSize="12" fontWeight="700" fill={PRODUCER_COLOR}>
            游戏线程
          </text>
          <text x="100" y={QUEUE_Y + 38} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            生产者 · enqueue
          </text>
          <text x="100" y={QUEUE_Y + 54} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            发完即走
          </text>
          {/* 生产者→队列 箭头 */}
          <line x1="164" y1={QUEUE_Y + 28} x2={QUEUE_X - 12} y2={QUEUE_Y + 28} stroke={PRODUCER_COLOR} strokeWidth="1.6" markerEnd="url(#gpp15-arrow)" />

          {/* 环形队列 */}
          <text x={QUEUE_X} y={QUEUE_Y - 30} fontSize="11" fontWeight="700" fill="var(--text-secondary)">
            环形缓冲队列 ring buffer
          </text>
          {Array.from({ length: SLOT_COUNT }).map((_, i) => (
            <rect key={`slot-${i}`} x={slotX(i)} y={QUEUE_Y} width={SLOT_W} height={SLOT_H} rx="7" fill="var(--text-secondary)" fillOpacity="0.05" stroke="var(--border)" strokeWidth="1.3" />
          ))}

          {/* 事件 token */}
          <g ref={event0Ref} style={{ opacity: 0, transform: `translate(0px, ${QUEUE_Y}px)` }}>
            <rect x={slotX(0) + 4} y={4} width={SLOT_W - 8} height={SLOT_H - 8} rx="6" fill={EVENTS[0].color} fillOpacity="0.24" stroke={EVENTS[0].color} strokeWidth="1.6" />
            <text x={slotX(0) + SLOT_W / 2} y={SLOT_H / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">
              {EVENTS[0].label}
            </text>
          </g>
          <g ref={event1Ref} style={{ opacity: 0, transform: `translate(0px, ${QUEUE_Y}px)` }}>
            <rect x={slotX(1) + 4} y={4} width={SLOT_W - 8} height={SLOT_H - 8} rx="6" fill={EVENTS[1].color} fillOpacity="0.24" stroke={EVENTS[1].color} strokeWidth="1.6" />
            <text x={slotX(1) + SLOT_W / 2} y={SLOT_H / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--text-primary)">
              {EVENTS[1].label}
            </text>
          </g>

          {/* tail 指针 */}
          <g ref={tailRef} style={{ transform: `translateX(${slotX(0)}px)` }}>
            <path d={`M ${SLOT_W / 2} ${QUEUE_Y + SLOT_H + 24} l -7 12 l 14 0 z`} fill={PRODUCER_COLOR} />
            <text x={SLOT_W / 2} y={QUEUE_Y + SLOT_H + 50} textAnchor="middle" fontSize="11" fontWeight="700" fill={PRODUCER_COLOR}>
              tail
            </text>
          </g>
          {/* head 指针 */}
          <g ref={headRef} style={{ transform: `translateX(${slotX(0)}px)` }}>
            <path d={`M ${SLOT_W / 2} ${QUEUE_Y - 12} l -7 -12 l 14 0 z`} fill={CONSUMER_COLOR} />
            <text x={SLOT_W / 2} y={QUEUE_Y - 26} textAnchor="middle" fontSize="11" fontWeight="700" fill={CONSUMER_COLOR}>
              head
            </text>
          </g>

          {/* 队列→消费者 箭头 */}
          <line x1={slotX(SLOT_COUNT - 1) + SLOT_W + 8} y1={QUEUE_Y + 28} x2={560} y2={QUEUE_Y + 28} stroke={CONSUMER_COLOR} strokeWidth="1.6" markerEnd="url(#gpp15-arrow)" />

          {/* 消费者：音频线程 */}
          <rect x="564" y={QUEUE_Y - 10} width={120} height={76} rx="10" fill={CONSUMER_COLOR} fillOpacity="0.12" stroke={CONSUMER_COLOR} strokeWidth="2" />
          <text x="624" y={QUEUE_Y + 18} textAnchor="middle" fontSize="12" fontWeight="700" fill={CONSUMER_COLOR}>
            音频线程
          </text>
          <text x="624" y={QUEUE_Y + 38} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            消费者 · dequeue
          </text>
          <text x="624" y={QUEUE_Y + 54} textAnchor="middle" fontSize="11" fill="var(--text-secondary)">
            按节奏处理
          </text>

          {/* 播放提示 */}
          <g ref={playRef} style={{ opacity: 0 }}>
            <rect x="564" y={QUEUE_Y + 76} width={120} height={26} rx="6" fill={OK_COLOR} fillOpacity="0.16" stroke={OK_COLOR} strokeWidth="1.4" />
            <text x="624" y={QUEUE_Y + 93} textAnchor="middle" fontSize="11" fontWeight="700" fill={OK_COLOR}>
              🔊 播放爆炸音
            </text>
          </g>

          <defs>
            <marker id="gpp15-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* 洞见 */}
          <g ref={decoupleRef} style={{ opacity: 0 }}>
            <rect x={QUEUE_X - 60} y={VIEW_H - 46} width={460} height={30} rx="8" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="1.6" />
            <text x={QUEUE_X + 170} y={VIEW_H - 27} textAnchor="middle" fontSize="12" fontWeight="700" fill={ACCENT}>
              队列解耦时间：发送方发完即走，接收方自行出队处理
            </text>
          </g>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="游戏线程把请求入队就返回，音频线程按自己的节奏出队播放，两者互不阻塞。代价：队列是全局变量、世界状态可能滞后、要当心反馈循环撑爆队列。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        事件队列（Event Queue）：把事件或请求存入一个队列缓冲。发送方入队后即可继续，
        不必等待处理；接收方按自己的节奏出队处理。由此解耦了"何时发送"与"何时处理"，
        也解耦了发送者与接收者。代价是引入全局队列、状态滞后与反馈循环风险。
      </figcaption>
    </figure>
  );
}
