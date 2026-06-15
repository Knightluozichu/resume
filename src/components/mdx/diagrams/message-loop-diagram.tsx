"use client";

import { useRef } from "react";

import {
  TEACHING_BEAT_MS,
  TimelineControls,
} from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <MessageLoopDiagram>：《Android 编程权威指南》looper-handler 章「消息循环三件套」配图（HEL-194）。
 *
 * 「可控教学动画」：画一个线程框，框内横排一条 MessageQueue（消息队列，几个槽位，左=队头 右=队尾），
 * 框右上角一个 Looper（循环）标记、左下角一个 Handler，演示一条消息从「投递」到「被处理」的完整循环：
 *   ① Handler.post(msg)：消息卡片从队尾入队（沿 translateX 滑入队列尾槽）→
 *   ② 队列里排着几条消息（先到的排在队头）→
 *   ③ Looper.loop()：从队头取出最早的那条消息（队头消息滑出、其余整体前移补位）→
 *   ④ 分发给对应 Handler.handleMessage 处理：消息流向 Handler、Handler 高亮处理 →
 *   ⑤ 处理完取下一条；若队列已空，Looper 阻塞等待（idle 标记亮起）。
 *
 * 时序铁律照 RecyclerViewRecyclingDiagram / GradleBuildPipelineDiagram：步 i 的呈现占
 * [BEAT*i, BEAT*(i+1)]，tl.label(name, BEAT*(i+1)) 落在呈现完成处，最后一步停在亮态不淡出，
 * 杜绝单步 off-by-one。
 *
 * 标注：主线程天生有 Looper —— ActivityThread.main() 里 Looper.prepareMainLooper() + loop()；
 * Handler 常用于工作线程 post 回主线程更新 UI（跨线程通信）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色，无裸 hex；时长走 TEACHING_BEAT_MS 具名常量、几何布局常量
 * 均为 4 的倍数且具名（硬规则 5）。
 */

// —— 整体画布。 ——
const VIEW_W = 600;
const VIEW_H = 320;

// —— 线程框（= 一个跑着消息循环的线程，框内含队列 + Looper + Handler）。 ——
const THREAD_X = 16;
const THREAD_Y = 48;
const THREAD_W = 568;
const THREAD_H = 232;

// —— MessageQueue（消息队列）：横排槽位，左=队头（先处理）右=队尾（新入队）。 ——
const QUEUE_SLOTS = 4; // 队列可视槽位数
const SLOT_W = 96;
const SLOT_H = 56;
const SLOT_GAP = 12; // 相邻槽位水平间隔
const SLOT_STRIDE = SLOT_W + SLOT_GAP; // 一格队列位的水平步进
const QUEUE_X = 80; // 队头槽位左上角 x
const QUEUE_Y = 96; // 队列行 y
// 队头（slot 0）槽位中心 x，用于消息卡片定位。
const SLOT0_CX = QUEUE_X + SLOT_W / 2;

// —— Handler（消息收发器）：左下角，负责投递（入队）与处理（handleMessage）。 ——
const HANDLER_X = 32;
const HANDLER_Y = 196;
const HANDLER_W = 160;
const HANDLER_H = 60;
const HANDLER_CX = HANDLER_X + HANDLER_W / 2;
const HANDLER_CY = HANDLER_Y + HANDLER_H / 2;

// —— Looper（循环引擎）：右上角标记，从队头取消息分发。 ——
const LOOPER_X = 480;
const LOOPER_Y = 96;
const LOOPER_W = 88;
const LOOPER_H = 56;
const LOOPER_CX = LOOPER_X + LOOPER_W / 2;
const LOOPER_CY = LOOPER_Y + LOOPER_H / 2;

// —— 消息卡片几何（与队列槽位同尺寸，停在槽位中央）。 ——
const MSG_W = 80;
const MSG_H = 40;
// 消息卡片在某槽位停放时左上角的 x（卡片在槽内水平居中）。
const MSG_INSET_X = (SLOT_W - MSG_W) / 2;
const MSG_INSET_Y = (SLOT_H - MSG_H) / 2;
// 队尾入队前消息停在队列右侧（屏外待命）的水平偏移（4 的倍数）。
const ENQUEUE_FROM_OFFSET = 120;
// 队头消息被 Looper 取出后向 Handler 流动落点（Handler 上方处理位）的坐标。
const DISPATCH_X = HANDLER_CX - MSG_W / 2;
const DISPATCH_Y = HANDLER_Y - MSG_H - 12;

// 被处理 / 已离队消息的淡出透明度。
const GONE_OPACITY = 0;

/**
 * 某一步里某条消息的位置语义：
 * - "below"：尚未投递，停在队列右侧屏外待命（隐形）。
 * - "queue"：在队列里排队，slot = 第几槽（0 = 队头）。
 * - "dispatch"：被 Looper 从队头取出、正流向 Handler 处理（高亮）。
 * - "done"：已处理完、离开（淡出）。
 */
type MsgPlace = "below" | "queue" | "dispatch" | "done";
type MsgState = {
  place: MsgPlace;
  /** place === "queue" 时占第几槽（0 = 队头）。 */
  slot?: number;
};

type MsgDef = { id: string; what: string };
const MESSAGES: readonly MsgDef[] = [
  { id: "msgA", what: "what=1" },
  { id: "msgB", what: "what=2" },
  { id: "msgC", what: "what=3" },
];

// —— 关键帧步骤：每步声明每条消息落在屏外 / 队列某槽 / 分发中 / 已处理，及 Looper 是否阻塞。 ——
type LoopStep = TeachingStep & {
  /** 该步每条消息的状态（key = 消息 id）。 */
  state: Record<string, MsgState>;
  /** 该步 Looper 是否在阻塞空转等待（队列空）。 */
  looperIdle: boolean;
  /** 该步 Handler 是否正在 handleMessage 处理（高亮）。 */
  handlerBusy: boolean;
};

const STEPS: readonly LoopStep[] = [
  {
    label: "post",
    caption:
      "① Handler.post(msg)：Handler 把一条消息投进队列，从队尾入队（MessageQueue.enqueueMessage）",
    state: {
      msgA: { place: "queue", slot: 0 },
      msgB: { place: "below" },
      msgC: { place: "below" },
    },
    looperIdle: false,
    handlerBusy: false,
  },
  {
    label: "queued",
    caption:
      "② 队列里排着几条消息：先到的排在队头（左），后到的排在队尾（右），按时间戳有序",
    state: {
      msgA: { place: "queue", slot: 0 },
      msgB: { place: "queue", slot: 1 },
      msgC: { place: "queue", slot: 2 },
    },
    looperIdle: false,
    handlerBusy: false,
  },
  {
    label: "loop",
    caption:
      "③ Looper.loop()：无限循环从队头取出最早的那条消息（队头出队，后面的消息整体前移补位）",
    state: {
      msgA: { place: "dispatch" },
      msgB: { place: "queue", slot: 0 },
      msgC: { place: "queue", slot: 1 },
    },
    looperIdle: false,
    handlerBusy: false,
  },
  {
    label: "dispatch",
    caption:
      "④ 分发给目标 Handler：msg.target.dispatchMessage 调到 Handler.handleMessage(msg)，在本线程处理",
    state: {
      msgA: { place: "done" },
      msgB: { place: "queue", slot: 0 },
      msgC: { place: "queue", slot: 1 },
    },
    looperIdle: false,
    handlerBusy: true,
  },
  {
    label: "idle",
    caption:
      "⑤ 处理完回到循环取下一条；若队列已空，Looper 阻塞等待新消息（不空转耗 CPU），来消息再唤醒",
    state: {
      msgA: { place: "done" },
      msgB: { place: "done" },
      msgC: { place: "done" },
    },
    looperIdle: true,
    handlerBusy: false,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

/** 把消息的位置语义换算成卡片左上角坐标。 */
function placeToXY(st: MsgState): { x: number; y: number } {
  if (st.place === "queue") {
    return {
      x: QUEUE_X + (st.slot ?? 0) * SLOT_STRIDE + MSG_INSET_X,
      y: QUEUE_Y + MSG_INSET_Y,
    };
  }
  if (st.place === "dispatch") {
    // 被取出、流向 Handler 的处理位（Handler 上方）。
    return { x: DISPATCH_X, y: DISPATCH_Y };
  }
  if (st.place === "done") {
    // 处理完落在 Handler 中央后淡出（顺着分发方向继续下沉一点）。
    return { x: DISPATCH_X, y: HANDLER_CY - MSG_H / 2 };
  }
  // below：停在队列右侧屏外待命。
  return {
    x: QUEUE_X + QUEUE_SLOTS * SLOT_STRIDE + ENQUEUE_FROM_OFFSET,
    y: QUEUE_Y + MSG_INSET_Y,
  };
}

/** 该步该消息整组的目标透明度：队列内 / 分发中 = 1；屏外待命 / 已处理 = 0。 */
function placeToOpacity(place: MsgPlace): number {
  if (place === "queue" || place === "dispatch") return 1;
  return GONE_OPACITY; // below（待命隐形）/ done（处理完淡出）
}

// 消息卡片定位的基准原点（首帧 transform 以队头槽位为锚，translate 相对它算）。
const ORIGIN_X = QUEUE_X + MSG_INSET_X;
const ORIGIN_Y = QUEUE_Y + MSG_INSET_Y;

export function MessageLoopDiagram() {
  // 每条消息卡片整组（<g>）的 DOM 引用：anime.js 驱动整组 translateX/translateY
  // （屏外→队尾→队头→Handler）+ opacity（入队可见 / 处理完淡出）。
  const msgRefs = useRef<Record<string, SVGGElement | null>>({});
  // Looper「阻塞等待」标记的 DOM 引用：队列空时淡入（idle），有消息时淡出。
  const looperIdleRef = useRef<SVGTextElement | null>(null);
  // Handler「正在 handleMessage 处理」高亮层的 DOM 引用：分发步淡入，其余淡出。
  const handlerHiRef = useRef<SVGRectElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        MESSAGES.forEach((msg) => {
          const el = msgRefs.current[msg.id];
          if (!el) return;
          const st = step.state[msg.id];
          const { x, y } = placeToXY(st);
          tl.add(
            el,
            {
              translateX: x - ORIGIN_X,
              translateY: y - ORIGIN_Y,
              opacity: placeToOpacity(st.place),
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            start,
          );
        });

        // Looper「阻塞等待」标记：队列空（idle）→ 淡入；否则淡出。
        if (looperIdleRef.current) {
          tl.add(
            looperIdleRef.current,
            {
              opacity: step.looperIdle ? 1 : 0,
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            start,
          );
        }
        // Handler 处理高亮层：handleMessage 处理中 → 淡入；否则淡出。
        if (handlerHiRef.current) {
          tl.add(
            handlerHiRef.current,
            {
              opacity: step.handlerBusy ? 1 : 0,
              duration: TEACHING_BEAT_MS,
              ease: "inOut(2)",
            },
            start,
          );
        }

        tl.label(step.label, lit);
      });
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {/* ⚡ 可交互标签（与站内 Demo 容器气质一致） */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Android 消息循环三件套（Looper / MessageQueue / Handler）演示。画面是一个线程框，代表一个跑着消息循环的线程：框内中部横排着一条 MessageQueue 消息队列，由几个槽位组成，最左是队头（最先被处理），最右是队尾（新消息从这里入队）；框右上角是一个 Looper 循环引擎标记；框左下角是一个 Handler 消息收发器。五步演示一条消息从投递到被处理的完整循环：① Handler.post(msg)，Handler 把一条消息从队尾投进队列，对应 MessageQueue.enqueueMessage；② 队列里排着几条消息，先到的排在队头，后到的排在队尾，按时间戳有序排列；③ Looper.loop() 进入无限循环，从队头取出最早的那条消息，队头消息出队，后面的消息整体向前移动补位；④ 分发给目标 Handler，msg.target.dispatchMessage 调到 Handler.handleMessage，在本线程处理这条消息，此时 Handler 高亮；⑤ 处理完回到循环取下一条，若队列已经空了，Looper 就阻塞等待新消息到来，不空转浪费 CPU，等有新消息再被唤醒。补充标注：主线程天生就有 Looper —— 系统在 ActivityThread.main() 里调用了 Looper.prepareMainLooper() 和 loop()；Handler 常用于工作线程 post 回主线程来更新 UI，实现跨线程通信。可播放、暂停、单步、拖动进度逐帧观察消息如何入队、出队、流向 Handler 并被处理。"
          className="mx-auto block h-auto w-full max-w-[600px]"
        >
          <defs>
            <marker
              id="mld-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* —— 线程框（= 跑着消息循环的线程）—— */}
          <rect
            x={THREAD_X}
            y={THREAD_Y}
            width={THREAD_W}
            height={THREAD_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={THREAD_X + 16}
            y={THREAD_Y - 16}
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一个线程（自带 Looper + MessageQueue）
          </text>

          {/* —— MessageQueue 槽位（队头在左，队尾在右）—— */}
          {Array.from({ length: QUEUE_SLOTS }).map((_, i) => {
            const x = QUEUE_X + i * SLOT_STRIDE;
            return (
              <rect
                key={`slot-${i}`}
                x={x}
                y={QUEUE_Y}
                width={SLOT_W}
                height={SLOT_H}
                rx="8"
                fill="var(--bg-elevated)"
                stroke="var(--border)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
            );
          })}
          {/* 队列标题 + 队头 / 队尾标注 */}
          <text
            x={QUEUE_X}
            y={QUEUE_Y - 12}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            MessageQueue（消息队列 · 按时间戳排序）
          </text>
          <text
            x={SLOT0_CX}
            y={QUEUE_Y + SLOT_H + 18}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            队头（先处理）
          </text>
          <text
            x={QUEUE_X + (QUEUE_SLOTS - 1) * SLOT_STRIDE + SLOT_W / 2}
            y={QUEUE_Y + SLOT_H + 18}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            队尾（新入队）
          </text>

          {/* —— Looper 标记（右上角，从队头取消息）—— */}
          <rect
            x={LOOPER_X}
            y={LOOPER_Y}
            width={LOOPER_W}
            height={LOOPER_H}
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={LOOPER_CX}
            y={LOOPER_Y + 24}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--accent)"
          >
            ↻ Looper
          </text>
          <text
            x={LOOPER_CX}
            y={LOOPER_Y + 40}
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            loop()
          </text>
          {/* Looper「阻塞等待」标记（anime.js 驱动 opacity）：队列空时亮起。 */}
          <text
            ref={(el) => {
              looperIdleRef.current = el;
            }}
            x={LOOPER_CX}
            y={LOOPER_Y + LOOPER_H + 16}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--warning)"
            opacity="0"
          >
            ⏳ 队空 · 阻塞等待
          </text>

          {/* —— Looper 从队头取消息的箭头（队头 → Looper）—— */}
          <line
            x1={QUEUE_X + SLOT_W + 4}
            y1={QUEUE_Y + SLOT_H / 2}
            x2={LOOPER_X - 6}
            y2={LOOPER_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            markerEnd="url(#mld-arrow)"
            opacity="0.6"
          />

          {/* —— Handler 节点（左下角：投递 + 处理）—— */}
          <rect
            x={HANDLER_X}
            y={HANDLER_Y}
            width={HANDLER_W}
            height={HANDLER_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {/* Handler「正在 handleMessage 处理」高亮层（anime.js 驱动 opacity）。 */}
          <rect
            ref={(el) => {
              handlerHiRef.current = el;
            }}
            x={HANDLER_X}
            y={HANDLER_Y}
            width={HANDLER_W}
            height={HANDLER_H}
            rx="8"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2"
            opacity="0"
          />
          <text
            x={HANDLER_CX}
            y={HANDLER_Y + 26}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            Handler
          </text>
          <text
            x={HANDLER_CX}
            y={HANDLER_Y + 44}
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            fill="var(--text-secondary)"
          >
            post() / handleMessage()
          </text>

          {/* —— Handler 投递到队尾的箭头（Handler → 队尾）—— */}
          <line
            x1={HANDLER_CX}
            y1={HANDLER_Y - 6}
            x2={QUEUE_X + (QUEUE_SLOTS - 1) * SLOT_STRIDE + SLOT_W / 2}
            y2={QUEUE_Y + SLOT_H + 6}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            markerEnd="url(#mld-arrow)"
            opacity="0.6"
            strokeDasharray="4 4"
          />

          {/* —— 消息卡片（anime.js 驱动整组迁移 + 淡入淡出）—— */}
          {MESSAGES.map((msg) => {
            const first = STEPS[0].state[msg.id];
            const { x: fx, y: fy } = placeToXY(first);
            const initOpacity = placeToOpacity(first.place);
            return (
              <g
                key={msg.id}
                ref={(el) => {
                  msgRefs.current[msg.id] = el;
                }}
                transform={`translate(${fx - ORIGIN_X} ${fy - ORIGIN_Y})`}
                opacity={initOpacity}
              >
                <rect
                  x={ORIGIN_X}
                  y={ORIGIN_Y}
                  width={MSG_W}
                  height={MSG_H}
                  rx="6"
                  fill="var(--accent-glow)"
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                />
                <text
                  x={ORIGIN_X + MSG_W / 2}
                  y={ORIGIN_Y + 18}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  Message
                </text>
                <text
                  x={ORIGIN_X + MSG_W / 2}
                  y={ORIGIN_Y + 31}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="var(--font-mono)"
                  fill="var(--accent)"
                >
                  {msg.what}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一条消息走完循环：Handler 入队 → 排队 → Looper 从队头取出 → 分发给 Handler.handleMessage 处理 → 队空则 Looper 阻塞等待。可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        消息循环三件套：Handler 往 MessageQueue 队尾投消息，Looper.loop() 无限循环从队头取出、分发给
        Handler.handleMessage 处理，队空则阻塞等待。主线程天生有 Looper（ActivityThread.main 里
        prepareMainLooper + loop），所以 Handler 常用于工作线程 post 回主线程更新 UI（跨线程通信）。
      </figcaption>
    </figure>
  );
}
