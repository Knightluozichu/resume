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
 * <RecyclerViewRecyclingDiagram>：《Android 编程权威指南》recyclerview 章「ViewHolder 废物利用」配图（HEL-178）。
 *
 * 「可控教学动画」：左侧画一个「可视窗口」框（= 手机屏幕），框内竖排几张列表 item 卡片
 * （每张标 position 与当前绑定的 ViewHolder 编号 VH#）；右侧画一个「回收池 RecyclerPool」框。
 * 随时间线演示一次「向下滚动一格」如何复用 ViewHolder，看清 RecyclerView 滚动的核心秘密——
 * 屏幕外的 View 不销毁、进回收池，新进屏的 item 复用旧 ViewHolder（onBindViewHolder 重绑数据，不新建）：
 *   ① 初始：窗口内显示 item 0~3，各占一个 ViewHolder（VH0~VH3），回收池空 →
 *   ② 向下滚动：item 0 滑出窗口顶部（VH0 跟着它一起滑出，仍绑着 item 0 的数据）→
 *   ③ item 0 滚出后其 ViewHolder（VH0）不销毁，进入右侧回收池待命 →
 *   ④ item 4 从底部进入窗口，复用回收池里的 VH0：onBindViewHolder(VH0, 4) 把 item4 的数据
 *      重新绑定到这块旧 ViewHolder 上（而非 new 一个），VH0 标号不变、内容换成 item 4 →
 *   ⑤ 强调：屏幕外的 View 被反复复用，列表再长也只需「可见数 + 几个」个 ViewHolder。
 *
 * 时序照 BackStackDiagram / FragmentTransactionDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * label 落在呈现完成处 BEAT*(i+1)，最后一步停在亮态不淡出（复用闭环完成），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：窗口内可见的 item 卡片用 --accent 描边 + 辉光高亮（屏幕上正显示的那几张）；
 * 回收池里待命的 ViewHolder 降到低透明度下沉（不可见、仅等待复用）。全部 DESIGN token
 * 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量、几何布局常量均为 4 的倍数且具名（硬规则 5）。
 */

// —— 整体画布与两区布局（间距走 4 倍数）。左：可视窗口区；右：回收池区。 ——
const VIEW_W = 560;
const VIEW_H = 360;

// 左侧「可视窗口」框（= 手机屏幕，只露得下 4 个 item）。
const SCREEN_X = 24;
const SCREEN_Y = 56;
const SCREEN_W = 280;
const SCREEN_H = 280;

// item 卡片尺寸（窗口内竖排 / 回收池里同尺寸停放）。
const CARD_W = 240;
const CARD_H = 56;
const CARD_GAP = 8; // 相邻两张 item 卡片的垂直间隔
const SLOT_H = CARD_H + CARD_GAP; // 一层「列表槽」高度
// 窗口内第 0 个可见槽（最顶那张）的左上角坐标。
const SLOT_X = SCREEN_X + (SCREEN_W - CARD_W) / 2;
const SLOT_TOP_Y = SCREEN_Y + 12;
// 窗口内可见槽数（屏幕一次塞得下的 item 数）。
const VISIBLE_SLOTS = 4;

// 右侧「回收池 RecyclerPool」框。
const POOL_X = 344;
const POOL_Y = 56;
const POOL_W = 192;
const POOL_H = 280;
// 回收池里停放一块 ViewHolder 的左上角坐标（池内居中靠上）。
const POOL_SLOT_X = POOL_X + (POOL_W - CARD_W) / 2 + 16;
const POOL_SLOT_Y = POOL_Y + 56;

// 滚出窗口顶部时卡片继续上移的位移（滑出屏幕外、淡出；4 的倍数）。
const SCROLL_OUT_OFFSET = 64;
// 从底部进入窗口前卡片停在窗口下方的待命位移（4 的倍数）。
const ENTER_FROM_BOTTOM_OFFSET = 64;

// 回收池里待命 ViewHolder 的下沉透明度（不可见、仅等待复用）。
const POOL_OPACITY = 0.32;

/**
 * 某一步里某张 item 卡片的位置语义：
 * - "screen"：停在可视窗口的某个可见槽里（slot = 第几槽，0 = 最顶），当前可见（高亮）。
 * - "scrolledOut"：刚滚出窗口顶部、滑向屏幕外（过场，淡出）。
 * - "pool"：它绑定的 ViewHolder 进了右侧回收池待命（下沉变暗）。
 * - "below"：尚未进窗口，停在窗口下方待命（隐形，准备从底部滑入）。
 */
type CardPlace = "screen" | "scrolledOut" | "pool" | "below";
type CardState = {
  place: CardPlace;
  /** place === "screen" 时该卡片占第几个可见槽（0 = 最顶）。 */
  slot?: number;
  /** 当前绑定到这张卡片上的 ViewHolder 编号（复用时 item 变、VH# 不变）。 */
  vh: number;
};

// item 卡片：position 即列表下标；title/role 用书中场景的真实语义。
type CardDef = { id: string; position: number };
const CARDS: readonly CardDef[] = [
  { id: "item0", position: 0 },
  { id: "item1", position: 1 },
  { id: "item2", position: 2 },
  { id: "item3", position: 3 },
  { id: "item4", position: 4 },
];

// —— 关键帧步骤：每步声明每张 item 卡片落在窗口 / 回收池 / 窗口外，及其绑定的 VH#。 ——
type RecyclingStep = TeachingStep & {
  /** 该步每张卡片的状态（key = 卡片 id）。 */
  state: Record<string, CardState>;
};

const STEPS: readonly RecyclingStep[] = [
  {
    label: "initial",
    caption:
      "① 初始：窗口内显示 item 0~3，各占一个 ViewHolder（VH0~VH3），回收池此刻空着",
    state: {
      item0: { place: "screen", slot: 0, vh: 0 },
      item1: { place: "screen", slot: 1, vh: 1 },
      item2: { place: "screen", slot: 2, vh: 2 },
      item3: { place: "screen", slot: 3, vh: 3 },
      item4: { place: "below", vh: 0 },
    },
  },
  {
    label: "scroll-out",
    caption:
      "② 向下滚动：item 0 滑出窗口顶部，绑在它身上的 VH0 跟着一起滑出（数据仍是 item 0）",
    state: {
      item0: { place: "scrolledOut", vh: 0 },
      item1: { place: "screen", slot: 0, vh: 1 },
      item2: { place: "screen", slot: 1, vh: 2 },
      item3: { place: "screen", slot: 2, vh: 3 },
      item4: { place: "below", vh: 0 },
    },
  },
  {
    label: "to-pool",
    caption:
      "③ item 0 滚出屏幕后，它的 ViewHolder（VH0）不销毁，被扔进右侧回收池待命",
    state: {
      item0: { place: "pool", vh: 0 },
      item1: { place: "screen", slot: 0, vh: 1 },
      item2: { place: "screen", slot: 1, vh: 2 },
      item3: { place: "screen", slot: 2, vh: 3 },
      item4: { place: "below", vh: 0 },
    },
  },
  {
    label: "reuse",
    caption:
      "④ item 4 从底部进窗口，复用回收池里的 VH0：onBindViewHolder(VH0, 4) 把 item4 的数据重绑到这块旧 ViewHolder（而非 new 一个）",
    state: {
      item0: { place: "pool", vh: 0 },
      item1: { place: "screen", slot: 0, vh: 1 },
      item2: { place: "screen", slot: 1, vh: 2 },
      item3: { place: "screen", slot: 2, vh: 3 },
      item4: { place: "screen", slot: 3, vh: 0 },
    },
  },
  {
    label: "summary",
    caption:
      "⑤ 屏幕外的 View 被反复复用：列表再长也只需「可见数 + 几个」个 ViewHolder，这就是滚动丝滑的核心",
    state: {
      item0: { place: "pool", vh: 0 },
      item1: { place: "screen", slot: 0, vh: 1 },
      item2: { place: "screen", slot: 1, vh: 2 },
      item3: { place: "screen", slot: 2, vh: 3 },
      item4: { place: "screen", slot: 3, vh: 0 },
    },
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

/** 把位置语义换算成卡片左上角坐标。 */
function placeToXY(st: CardState): { x: number; y: number } {
  if (st.place === "screen") {
    return { x: SLOT_X, y: SLOT_TOP_Y + (st.slot ?? 0) * SLOT_H };
  }
  if (st.place === "scrolledOut") {
    // 滚出：停在窗口最顶槽再上移一段（屏幕外上方）。
    return { x: SLOT_X, y: SLOT_TOP_Y - SCROLL_OUT_OFFSET };
  }
  if (st.place === "pool") {
    return { x: POOL_SLOT_X, y: POOL_SLOT_Y };
  }
  // below：停在窗口最底槽再下移一段（屏幕外下方，待从底部滑入）。
  return {
    x: SLOT_X,
    y: SLOT_TOP_Y + VISIBLE_SLOTS * SLOT_H + ENTER_FROM_BOTTOM_OFFSET,
  };
}

/** 该步该卡片整组的目标透明度：窗口内可见 = 1；回收池下沉 = POOL；滚出/窗口下方 = 0。 */
function placeToOpacity(place: CardPlace): number {
  if (place === "screen") return 1;
  if (place === "pool") return POOL_OPACITY;
  return 0; // scrolledOut（过场淡出）/ below（待命隐形）
}

export function RecyclerViewRecyclingDiagram() {
  // 每张 item 卡片整组（<g>）的 DOM 引用：anime.js 驱动整组的 translateX/translateY
  // （窗口↔回收池↔屏幕外迁移）+ opacity（窗口可见 / 回收池下沉 / 屏幕外隐形）。
  const cardRefs = useRef<Record<string, SVGGElement | null>>({});
  // 每张卡片的「窗口内可见高亮覆盖层」DOM 引用：仅在该卡片停在窗口（screen）时淡入，
  // accent 描边 + 辉光，强调「这是屏幕上正显示的 item」；进回收池 / 滚出时淡出下沉。
  const screenHiRefs = useRef<Record<string, SVGRectElement | null>>({});
  // 每张卡片上「VH 编号 + position」文本组的 DOM 引用：复用步淡出旧文案、淡入新文案，
  // 让「VH0 标号不变、内容从 item0 换成 item4」一眼可辨。
  const labelRefs = useRef<Record<string, SVGTextElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        CARDS.forEach((card) => {
          const el = cardRefs.current[card.id];
          const hi = screenHiRefs.current[card.id];
          const st = step.state[card.id];
          const { x, y } = placeToXY(st);
          if (el) {
            tl.add(
              el,
              {
                translateX: x - SLOT_X,
                translateY: y - SLOT_TOP_Y,
                opacity: placeToOpacity(st.place),
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          }
          // 窗口内可见高亮层：停在窗口（screen）→ 淡入到 1；其余位置 → 淡到 POOL 让卡片下沉变暗。
          if (hi) {
            tl.add(
              hi,
              {
                opacity: st.place === "screen" ? 1 : POOL_OPACITY,
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          }
        });

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
          aria-label="RecyclerView 的 ViewHolder 废物利用（复用）演示。左侧是一个「可视窗口」框，代表手机屏幕，框内竖排着列表条目 item 卡片，每张标着自己的 position 下标和当前绑定的 ViewHolder 编号 VH 几号；右侧是一个「回收池 RecyclerPool」框。五步演示一次向下滚动一格时 ViewHolder 如何被复用：① 初始，窗口内显示 item 0 到 item 3，分别占用 VH0 到 VH3 四个 ViewHolder，回收池此刻空着；② 向下滚动，item 0 从窗口顶部滑出屏幕，绑在它身上的 VH0 跟着一起滑出，数据仍是 item 0；③ item 0 滚出屏幕后，它的 ViewHolder VH0 并不被销毁，而是被扔进右侧回收池待命、变暗下沉；④ item 4 从窗口底部进入，RecyclerView 不新建 ViewHolder，而是从回收池取出 VH0 复用，调用 onBindViewHolder 把 item 4 的数据重新绑定到这块旧的 VH0 上，VH0 的编号不变、显示内容从 item 0 换成 item 4；⑤ 强调，屏幕外的 View 被反复复用，列表再长，也只需要可见条目数加上少数几个的 ViewHolder，这正是 RecyclerView 滚动丝滑的核心秘密。可播放、暂停、单步、拖动进度逐帧观察 item 卡片如何滚出屏幕、ViewHolder 如何进回收池又被复用，以及窗口内的高亮如何始终对应屏幕上正显示的条目。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* —— 左侧「可视窗口」框（= 手机屏幕，标注 + 裁剪掩膜）—— */}
          <defs>
            {/* 窗口裁剪：滚出/进入窗口的卡片只在窗口内可见，超出部分被裁掉（模拟屏幕边界）。 */}
            <clipPath id="rv-screen-clip">
              <rect
                x={SCREEN_X}
                y={SCREEN_Y}
                width={SCREEN_W}
                height={SCREEN_H}
                rx="12"
              />
            </clipPath>
          </defs>
          <rect
            x={SCREEN_X}
            y={SCREEN_Y}
            width={SCREEN_W}
            height={SCREEN_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={SCREEN_X + SCREEN_W / 2}
            y={SCREEN_Y - 16}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            可视窗口（手机屏幕）
          </text>

          {/* —— 右侧「回收池 RecyclerPool」框（虚线浅框 + 标注）—— */}
          <rect
            x={POOL_X}
            y={POOL_Y}
            width={POOL_W}
            height={POOL_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <text
            x={POOL_X + POOL_W / 2}
            y={POOL_Y - 16}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            回收池 RecyclerPool
          </text>
          <text
            x={POOL_X + POOL_W / 2}
            y={POOL_Y + POOL_H - 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
            opacity="0.7"
          >
            （待命 ViewHolder · 复用不销毁）
          </text>

          {/* —— 窗口↔回收池迁移箭头（提示滚出的 ViewHolder 进池、再被取出复用）—— */}
          <text
            x={(SCREEN_X + SCREEN_W + POOL_X) / 2}
            y={SCREEN_Y + 40}
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-secondary)"
            opacity="0.6"
          >
            ⇄
          </text>

          {/* —— 窗口内的 item 卡片（受窗口裁剪，滚出部分被屏幕边界裁掉）—— */}
          <g clipPath="url(#rv-screen-clip)">
            {CARDS.map((card) => {
              const first = STEPS[0].state[card.id];
              const { x: fx, y: fy } = placeToXY(first);
              const initGroupOpacity = placeToOpacity(first.place);
              const initHiOpacity = first.place === "screen" ? 1 : POOL_OPACITY;
              return (
                <g
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[card.id] = el;
                  }}
                  transform={`translate(${fx - SLOT_X} ${fy - SLOT_TOP_Y})`}
                  opacity={initGroupOpacity}
                >
                  {/* 暗底框（常驻）：进回收池待命时，靠它读出「一张安静的暗卡片」。 */}
                  <rect
                    x={SLOT_X}
                    y={SLOT_TOP_Y}
                    width={CARD_W}
                    height={CARD_H}
                    rx="10"
                    fill="var(--bg-elevated)"
                    stroke="var(--border)"
                    strokeWidth="1.2"
                  />
                  {/* 窗口内可见高亮覆盖层（anime.js 驱动其 opacity）：停在窗口（screen）时淡入到 1，
                      accent 描边 + 辉光强调「这是屏幕上正显示的 item」；进池 / 滚出时淡到 POOL_OPACITY。 */}
                  <rect
                    ref={(el) => {
                      screenHiRefs.current[card.id] = el;
                    }}
                    x={SLOT_X}
                    y={SLOT_TOP_Y}
                    width={CARD_W}
                    height={CARD_H}
                    rx="10"
                    fill="var(--accent-glow)"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    opacity={initHiOpacity}
                  />
                  {/* item 主标题：item N（N = position 下标） */}
                  <text
                    x={SLOT_X + 16}
                    y={SLOT_TOP_Y + 24}
                    fontSize="13"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                    fill="var(--text-primary)"
                  >
                    {`item ${card.position}`}
                  </text>
                  {/* 副标题：position 标注 */}
                  <text
                    x={SLOT_X + 16}
                    y={SLOT_TOP_Y + 42}
                    fontSize="10"
                    fill="var(--text-secondary)"
                  >
                    {`position = ${card.position}`}
                  </text>
                  {/* ViewHolder 编号徽标（右侧）：复用步里这里会从 VH0+item0 标到 VH0+item4，
                      但因 item4 复用 VH0，所以 vh 在初始与复用步都是 0，强调「同一块 VH」。 */}
                  <text
                    ref={(el) => {
                      labelRefs.current[card.id] = el;
                    }}
                    x={SLOT_X + CARD_W - 16}
                    y={SLOT_TOP_Y + 33}
                    textAnchor="end"
                    fontSize="12"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                    fill="var(--accent)"
                  >
                    {`VH${STEPS[0].state[card.id].vh}`}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次「向下滚动一格」：item 0 滚出屏幕，它的 ViewHolder 进回收池；item 4 进屏时直接复用这块旧 ViewHolder（onBindViewHolder 重绑数据，不新建）。可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        ViewHolder 废物利用：条目滚出屏幕后 View 不销毁，进回收池待命；新条目进屏时复用池里现成的
        ViewHolder，只用 onBindViewHolder 换数据，不重新创建 View。列表再长也只需「可见数 + 几个」个
        ViewHolder —— 这就是 RecyclerView 滚动丝滑的核心秘密。
      </figcaption>
    </figure>
  );
}
