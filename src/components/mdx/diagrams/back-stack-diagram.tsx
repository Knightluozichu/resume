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
 * <BackStackDiagram>：《Android 编程权威指南》second-activity 章「返回栈」配图（HEL-173）。
 *
 * 「可控教学动画」：一个竖直的 Activity 返回栈容器，随时间线演示一次完整的
 * **push / pop**——看清「栈顶 = 当前可见 Activity」这条铁律，以及按返回键如何把栈顶弹掉：
 *   ① App 启动，CrimeListActivity 入栈，成为栈顶（也是栈底，独占一层、当前可见）→
 *   ② 点列表项，显式 Intent 启动 CrimeDetailActivity，新卡片从上方滑入压栈、抢占栈顶高亮，
 *      CrimeListActivity 被压到下层、变暗下沉（不可见）→
 *   ③ CrimeDetailActivity 稳坐栈顶（当前可见），CrimeListActivity 安静躺在它下面 →
 *   ④ 用户按返回键，栈顶 CrimeDetailActivity 出栈：向上滑出 + 淡出销毁（finish）→
 *   ⑤ CrimeListActivity 重新浮到栈顶、重新高亮，再次成为当前可见 Activity。
 *
 * 时序照 GradleBuildPipelineDiagram / MvcDataFlowDiagram：步 i 的呈现占
 * [BEAT*i, BEAT*(i+1)]，label 落在呈现完成处 BEAT*(i+1)，最后一步停在亮态不淡出
 * （表示列表页已回到栈顶、闭环完成），杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：栈顶（当前可见 Activity）始终用 --accent 描边 + 高填充高亮，栈内非顶卡片降到
 * 低透明度下沉。全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS 具名常量、
 * 几何布局常量均为 4 的倍数且具名（硬规则 5）。
 */

// —— 卡片与栈布局常量（间距走 4 倍数；卡片等宽竖直堆叠）。 ——
const CARD_W = 240;
const CARD_H = 56;
const CARD_X = 132; // 卡片左边距（容器内居中）
const STACK_GAP = 16; // 同一时刻相邻两层卡片的垂直间隔（露出下层一条边）
const SLOT_H = CARD_H + STACK_GAP; // 一层「栈槽」高度
const BASE_Y = 248; // 栈底层卡片的顶边 y（栈底在下、栈顶在上）

// 进/出场动画的滑动位移：卡片从「栈外上方」滑入、出栈时再滑回上方（4 的倍数）。
const ENTER_OFFSET = 72;

const VIEW_W = CARD_W + CARD_X * 2; // 左右留白对称
const VIEW_H = 320;

// 栈内非顶卡片的下沉透明度（被遮挡、不可见）。
const SUNK_OPACITY = 0.28;

/**
 * 某一步里某张卡片的状态：slot = 它在栈里的层号（0 = 栈底），从下往上数；
 * present = 是否在栈中；top = 是否栈顶（当前可见 Activity，高亮）。
 * slot 为 null 表示该步它已出栈 / 尚未入栈（移到栈外上方且隐形）。
 */
type CardState = {
  slot: number | null;
  top: boolean;
};

// 两张 Activity 卡片，用真实类名。
type CardDef = { id: string; title: string; role: string };
const CARDS: readonly CardDef[] = [
  { id: "list", title: "CrimeListActivity", role: "列表页（App 首屏）" },
  { id: "detail", title: "CrimeDetailActivity", role: "详情页" },
];

// —— 关键帧步骤：每步声明两张卡片各自的栈状态（驱动 anime.js 算目标 y / 透明度）。 ——
type BackStackStep = TeachingStep & {
  /** 该步每张卡片的状态（key = 卡片 id）。 */
  state: Record<string, CardState>;
};

const STEPS: readonly BackStackStep[] = [
  {
    label: "launch",
    caption: "① App 启动：CrimeListActivity 入栈，成为栈顶（也是栈底），当前可见",
    state: {
      list: { slot: 0, top: true },
      detail: { slot: null, top: false },
    },
  },
  {
    label: "push-detail",
    caption:
      "② 点列表项：显式 Intent 启动 CrimeDetailActivity，新卡片压栈成为栈顶，列表页下沉变暗",
    state: {
      list: { slot: 0, top: false },
      detail: { slot: 1, top: true },
    },
  },
  {
    label: "detail-visible",
    caption:
      "③ CrimeDetailActivity 稳坐栈顶 = 当前可见；CrimeListActivity 躺在它下面（不可见、仍保活）",
    state: {
      list: { slot: 0, top: false },
      detail: { slot: 1, top: true },
    },
  },
  {
    label: "pop-detail",
    caption:
      "④ 用户按返回键：栈顶 CrimeDetailActivity 出栈，向上滑出并淡出销毁（finish）",
    state: {
      list: { slot: 0, top: false },
      detail: { slot: null, top: false },
    },
  },
  {
    label: "back-to-list",
    caption:
      "⑤ CrimeListActivity 重新浮到栈顶、重新高亮，再次成为当前可见 Activity",
    state: {
      list: { slot: 0, top: true },
      detail: { slot: null, top: false },
    },
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

/** 把「层号 slot」换算成卡片顶边 y（slot 0 在 BASE_Y，越上层 y 越小）。 */
function slotToY(slot: number): number {
  return BASE_Y - slot * SLOT_H;
}

/** 卡片出栈 / 未入栈时停在「栈顶上方栈外」的 y（隐形待命位）。 */
const OFFSCREEN_Y = BASE_Y - 1 * SLOT_H - ENTER_OFFSET;

export function BackStackDiagram() {
  // 每张卡片整组（<g>）的 DOM 引用：anime.js 驱动整组的 translateY（压栈/出栈位移）+
  // opacity（在栈可见 1 / 下沉 SUNK / 栈外 0）。
  const cardRefs = useRef<Record<string, SVGGElement | null>>({});
  // 每张卡片的「栈顶高亮覆盖层」DOM 引用：仅在该卡片是栈顶时淡入（accent 描边 + 辉光），
  // 让「栈顶 = 当前可见 Activity」一眼可辨，与下沉的暗卡片清晰区分。
  const topHiRefs = useRef<Record<string, SVGRectElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      // 卡片初始（首帧 = 步①）：list 在栈底栈顶、detail 在栈外隐形。anime.js 从此态起算。
      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        CARDS.forEach((card) => {
          const el = cardRefs.current[card.id];
          const hi = topHiRefs.current[card.id];
          const st = step.state[card.id];
          // 目标位置：在栈中 → 对应层号的 y；不在栈中 → 栈外上方待命位。
          const targetY = st.slot === null ? OFFSCREEN_Y : slotToY(st.slot);
          // 目标透明度：在栈 = 1（可见）；栈外 = 0（隐形）。下沉的「变暗」交给高亮层关掉表达。
          const targetOpacity = st.slot === null ? 0 : 1;
          if (el) {
            tl.add(
              el,
              {
                translateY: targetY,
                opacity: targetOpacity,
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          }
          // 栈顶高亮层：是栈顶 → 淡入到 1；非栈顶 / 出栈 → 淡到 SUNK_OPACITY 让卡片下沉变暗。
          if (hi) {
            tl.add(
              hi,
              {
                opacity: st.top ? 1 : SUNK_OPACITY,
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
          aria-label="Activity 返回栈的 push 与 pop 演示。一个竖直栈：栈底在下、栈顶在上，栈顶卡片就是当前可见的 Activity（高亮），栈内被压住的卡片下沉变暗不可见。五步演示一次完整的入栈出栈：① App 启动，CrimeListActivity 入栈成为栈顶（也是栈底），当前可见；② 点击列表项，用显式 Intent 启动 CrimeDetailActivity，新卡片从上方滑入压栈成为新栈顶并高亮，CrimeListActivity 被压到下层、变暗下沉不可见；③ CrimeDetailActivity 稳坐栈顶即当前可见，CrimeListActivity 躺在它下面仍保活；④ 用户按返回键，栈顶 CrimeDetailActivity 出栈，向上滑出并淡出销毁（finish）；⑤ CrimeListActivity 重新浮到栈顶、重新高亮，再次成为当前可见 Activity。可播放、暂停、单步、拖动进度逐帧观察卡片如何压栈与出栈，以及栈顶高亮如何始终对应当前屏幕。"
          className="mx-auto block h-auto w-full max-w-[504px]"
        >
          {/* —— 栈底基线 + 标识（常驻参照系，帮读者定位「哪头是栈底」）—— */}
          <line
            x1={CARD_X - 16}
            y1={BASE_Y + CARD_H + 8}
            x2={CARD_X + CARD_W + 16}
            y2={BASE_Y + CARD_H + 8}
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={VIEW_W / 2}
            y={BASE_Y + CARD_H + 24}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            ▲ 栈底（先入）
          </text>
          {/* 栈顶方向标注（当前可见 Activity 所在处） */}
          <text
            x={VIEW_W / 2}
            y={20}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fill="var(--accent)"
          >
            栈顶 = 当前可见 Activity ▾
          </text>

          {/* —— 两张 Activity 卡片（anime.js 驱动整组的 translateY / opacity）。 ——
              初始 transform 直接放到步① 的位置，避免首帧从 (0,0) 闪一下：
              list 在栈底（slot 0），detail 在栈外上方隐形。 */}
          {CARDS.map((card) => {
            const first = STEPS[0].state[card.id];
            const initY =
              first.slot === null ? OFFSCREEN_Y : slotToY(first.slot);
            // 整组初始透明度：在栈可见 = 1，栈外 = 0。
            const initGroupOpacity = first.slot === null ? 0 : 1;
            // 栈顶高亮层初始透明度：是栈顶 = 1（高亮），否则 = SUNK（下沉变暗）。
            const initHiOpacity = first.top ? 1 : SUNK_OPACITY;
            return (
              <g
                key={card.id}
                ref={(el) => {
                  cardRefs.current[card.id] = el;
                }}
                transform={`translate(0 ${initY})`}
                opacity={initGroupOpacity}
              >
                {/* 暗底框（常驻）：栈内非顶卡片下沉时，靠它读出「一张安静的暗卡片」。 */}
                <rect
                  x={CARD_X}
                  y={0}
                  width={CARD_W}
                  height={CARD_H}
                  rx="12"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                {/* 栈顶高亮覆盖层（anime.js 驱动其 opacity）：仅在该卡片是栈顶时淡入到 1，
                    用 accent 描边 + 辉光填充强调「这是当前可见 Activity」；下沉 / 出栈时
                    淡到 SUNK_OPACITY，accent 隐去，卡片自然变暗。 */}
                <rect
                  ref={(el) => {
                    topHiRefs.current[card.id] = el;
                  }}
                  x={CARD_X}
                  y={0}
                  width={CARD_W}
                  height={CARD_H}
                  rx="12"
                  fill="var(--accent-glow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  opacity={initHiOpacity}
                />
                {/* 类名（主标题） */}
                <text
                  x={CARD_X + CARD_W / 2}
                  y={24}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {card.title}
                </text>
                {/* 角色副标题 */}
                <text
                  x={CARD_X + CARD_W / 2}
                  y={42}
                  textAnchor="middle"
                  fontSize="10.5"
                  fill="var(--text-secondary)"
                >
                  {card.role}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次「点进详情、再按返回」如何在返回栈里压栈又出栈；栈顶始终是当前屏幕上的那个 Activity。可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Activity 返回栈（后进先出）：启动新 Activity = 压栈成为栈顶并显示，旧的下沉保活；
        按返回键 = 栈顶出栈销毁，下一个浮上来重新显示。栈顶永远是用户当前看到的那一屏。
      </figcaption>
    </figure>
  );
}
