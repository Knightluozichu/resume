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
 * <FragmentTransactionDiagram>：《Android 编程权威指南》ui-fragments 章「FragmentManager 事务」配图（HEL-177）。
 *
 * 「可控教学动画」：左侧画宿主 Activity 的 FrameLayout 容器（标注 R.id.fragment_container），
 * Fragment 是容器内的卡片；右侧画一个「返回栈」小竖栈。随时间线演示一次完整的
 * **add → replace(addToBackStack) → popBackStack**——看清 FragmentManager 如何把 Fragment
 * 装进容器、换成另一个、又被返回键弹回来：
 *   ① 容器空，Activity 刚启动（setContentView 后还没提交任何事务）→
 *   ② `beginTransaction().add(R.id.fragment_container, CrimeListFragment).commit()`：
 *      FragmentA 卡片淡入容器、成为当前可见 Fragment（高亮）→
 *   ③ `replace(..., CrimeFragment).addToBackStack(null).commit()`：FragmentB 覆盖容器、抢占当前可见，
 *      被替换下来的 FragmentA 滑进右侧返回栈待命 →
 *   ④ 用户按返回键 `popBackStack()`：FragmentB 移除销毁，FragmentA 从返回栈弹回容器、重新可见。
 *
 * 时序照 BackStackDiagram / GradleBuildPipelineDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * label 落在呈现完成处 BEAT*(i+1)，最后一步停在亮态不淡出（FragmentA 已回到容器、闭环完成），
 * 杜绝单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：容器内「当前可见 Fragment」始终用 --accent 描边 + 辉光高亮；返回栈里待命的
 * Fragment 降到低透明度下沉。全部 DESIGN token 配色无裸 hex；时长走 TEACHING_BEAT_MS
 * 具名常量、几何布局常量均为 4 的倍数且具名（硬规则 5）。
 */

// —— 整体画布与两区布局（间距走 4 倍数）。左：容器区；右：返回栈区。 ——
const VIEW_W = 560;
const VIEW_H = 320;

// 宿主 Activity 的 FrameLayout 容器（左侧大框）。
const HOST_X = 24;
const HOST_Y = 56;
const HOST_W = 296;
const HOST_H = 224;

// Fragment 卡片尺寸（在容器内居中放置 / 在返回栈里同尺寸缩进堆叠）。
const CARD_W = 248;
const CARD_H = 72;
// 容器内卡片的停靠位（容器水平居中、垂直靠上，留出标注空间）。
const SLOT_X = HOST_X + (HOST_W - CARD_W) / 2;
const SLOT_Y = HOST_Y + 56;

// 右侧「返回栈」竖栈区：一个浅框 + 栈底基线，待命 Fragment 落在其中。
const STACK_X = 360;
const STACK_Y = 56;
const STACK_W = 176;
const STACK_H = 224;
// 返回栈里第 0 层卡片（栈底=最早入栈）的停靠位。
const STACK_SLOT_X = STACK_X + (STACK_W - CARD_W) / 2 + 12;
const STACK_BASE_Y = STACK_Y + STACK_H - CARD_H - 24;

// 进/出场滑动位移（卡片在容器与返回栈之间横向迁移时的过渡偏移；4 的倍数）。
const ENTER_OFFSET = 24;

// 返回栈里待命卡片的下沉透明度（被压住、不可见、仅等待弹回）。
const SUNK_OPACITY = 0.32;

/**
 * 某一步里某张 Fragment 卡片的位置语义：
 * - "host"：停在容器里，是当前可见 Fragment（高亮）。
 * - "stack"：躺在右侧返回栈里待命（下沉变暗）。
 * - "gone"：尚未创建 / 已被销毁（移到容器上方且隐形）。
 */
type CardPlace = "host" | "stack" | "gone";
type CardState = { place: CardPlace };

// 两张 Fragment 卡片，用书中真实类名。
type CardDef = { id: string; title: string; role: string };
const CARDS: readonly CardDef[] = [
  { id: "list", title: "CrimeListFragment", role: "列表页 Fragment" },
  { id: "detail", title: "CrimeFragment", role: "详情页 Fragment" },
];

// —— 关键帧步骤：每步声明两张卡片各自落在容器 / 返回栈 / 销毁。 ——
type TransactionStep = TeachingStep & {
  /** 该步每张卡片的位置语义（key = 卡片 id）。 */
  state: Record<string, CardState>;
};

const STEPS: readonly TransactionStep[] = [
  {
    label: "empty",
    caption:
      "① Activity 刚启动：setContentView 后 fragment_container 还空着，尚未提交任何事务",
    state: {
      list: { place: "gone" },
      detail: { place: "gone" },
    },
  },
  {
    label: "add",
    caption:
      "② beginTransaction().add(R.id.fragment_container, CrimeListFragment).commit()：列表 Fragment 装入容器，成为当前可见",
    state: {
      list: { place: "host" },
      detail: { place: "gone" },
    },
  },
  {
    label: "replace",
    caption:
      "③ replace(..., CrimeFragment).addToBackStack(null).commit()：详情 Fragment 覆盖容器，被替换下来的列表 Fragment 进入返回栈待命",
    state: {
      list: { place: "stack" },
      detail: { place: "host" },
    },
  },
  {
    label: "pop",
    caption:
      "④ 用户按返回键 popBackStack()：详情 Fragment 移除销毁，列表 Fragment 从返回栈弹回容器、重新可见",
    state: {
      list: { place: "host" },
      detail: { place: "gone" },
    },
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

/** 把位置语义换算成卡片左上角坐标。 */
function placeToXY(place: CardPlace): { x: number; y: number } {
  if (place === "host") return { x: SLOT_X, y: SLOT_Y };
  if (place === "stack") return { x: STACK_SLOT_X, y: STACK_BASE_Y };
  // gone：停在容器上方栈外（隐形待命 / 已销毁）。
  return { x: SLOT_X, y: SLOT_Y - ENTER_OFFSET };
}

export function FragmentTransactionDiagram() {
  // 每张卡片整组（<g>）的 DOM 引用：anime.js 驱动整组的 translateX/translateY（容器↔返回栈迁移）
  // + opacity（容器/返回栈可见，销毁隐形）。
  const cardRefs = useRef<Record<string, SVGGElement | null>>({});
  // 每张卡片的「当前可见高亮覆盖层」DOM 引用：仅在该卡片停在容器（host）时淡入，
  // accent 描边 + 辉光，强调「这是屏幕上正显示的 Fragment」；在返回栈 / 销毁时淡出下沉。
  const hostHiRefs = useRef<Record<string, SVGRectElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        CARDS.forEach((card) => {
          const el = cardRefs.current[card.id];
          const hi = hostHiRefs.current[card.id];
          const st = step.state[card.id];
          const { x, y } = placeToXY(st.place);
          // host / stack 可见（1）；gone 隐形（0）。
          const targetOpacity = st.place === "gone" ? 0 : 1;
          if (el) {
            tl.add(
              el,
              {
                translateX: x - SLOT_X,
                translateY: y - SLOT_Y,
                opacity: targetOpacity,
                duration: TEACHING_BEAT_MS,
                ease: "inOut(2)",
              },
              start,
            );
          }
          // 当前可见高亮层：停在容器（host）→ 淡入到 1；在返回栈待命 → 淡到 SUNK 让卡片下沉变暗；
          // 销毁 → 也淡到 SUNK（卡片本体已 opacity 0，高亮层一并隐没）。
          if (hi) {
            tl.add(
              hi,
              {
                opacity: st.place === "host" ? 1 : SUNK_OPACITY,
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
          aria-label="FragmentManager 事务演示。左侧是宿主 Activity 的 FrameLayout 容器（标注 R.id.fragment_container），Fragment 是容器内的卡片；右侧是一个竖直的返回栈。四步演示一次完整的 add、replace、popBackStack：① Activity 刚启动，setContentView 之后 fragment_container 还空着，尚未提交任何事务；② 调用 beginTransaction().add(R.id.fragment_container, CrimeListFragment).commit()，列表 Fragment 卡片淡入容器，成为当前可见 Fragment 并高亮；③ 调用 replace 换成 CrimeFragment 并 addToBackStack(null).commit()，详情 Fragment 覆盖容器成为当前可见，被替换下来的列表 Fragment 滑进右侧返回栈待命、变暗下沉；④ 用户按返回键 popBackStack()，详情 Fragment 被移除销毁，列表 Fragment 从返回栈弹回容器、重新成为当前可见 Fragment。可播放、暂停、单步、拖动进度逐帧观察 Fragment 如何在容器与返回栈之间进出，以及容器内的高亮如何始终对应屏幕上正显示的那个 Fragment。"
          className="mx-auto block h-auto w-full max-w-[560px]"
        >
          {/* —— 宿主 Activity FrameLayout 容器（左侧大框 + 标注）—— */}
          <rect
            x={HOST_X}
            y={HOST_Y}
            width={HOST_W}
            height={HOST_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={HOST_X + HOST_W / 2}
            y={HOST_Y - 28}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            宿主 Activity 的 FrameLayout
          </text>
          <text
            x={HOST_X + HOST_W / 2}
            y={HOST_Y - 12}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            R.id.fragment_container
          </text>
          {/* 容器空态提示（常驻，被卡片盖住时自然看不见） */}
          <text
            x={HOST_X + HOST_W / 2}
            y={HOST_Y + HOST_H / 2 + 4}
            textAnchor="middle"
            fontSize="11"
            fill="var(--text-secondary)"
            opacity="0.7"
          >
            （容器，等 Fragment 入驻）
          </text>

          {/* —— 右侧「返回栈」区（浅框 + 栈底基线 + 标注）—— */}
          <rect
            x={STACK_X}
            y={STACK_Y}
            width={STACK_W}
            height={STACK_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />
          <text
            x={STACK_X + STACK_W / 2}
            y={STACK_Y - 16}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            返回栈（Back Stack）
          </text>
          <line
            x1={STACK_X + 12}
            y1={STACK_BASE_Y + CARD_H + 12}
            x2={STACK_X + STACK_W - 12}
            y2={STACK_BASE_Y + CARD_H + 12}
            stroke="var(--border)"
            strokeWidth="1.2"
          />
          <text
            x={STACK_X + STACK_W / 2}
            y={STACK_BASE_Y + CARD_H + 28}
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            ▲ 栈底 · 按返回键弹回
          </text>

          {/* —— 容器↔返回栈迁移箭头（提示 replace 把旧 Fragment 推入栈，pop 再弹回）—— */}
          <text
            x={(HOST_X + HOST_W + STACK_X) / 2}
            y={SLOT_Y + 8}
            textAnchor="middle"
            fontSize="14"
            fill="var(--text-secondary)"
            opacity="0.6"
          >
            ⇄
          </text>

          {/* —— 两张 Fragment 卡片（anime.js 驱动整组的 translate / opacity）。 ——
              初始 transform 直接放到步① 的位置（两张都 gone：容器上方隐形），避免首帧从 (0,0) 闪。 */}
          {CARDS.map((card) => {
            const first = STEPS[0].state[card.id];
            const { x: fx, y: fy } = placeToXY(first.place);
            const initGroupOpacity = first.place === "gone" ? 0 : 1;
            const initHiOpacity = first.place === "host" ? 1 : SUNK_OPACITY;
            return (
              <g
                key={card.id}
                ref={(el) => {
                  cardRefs.current[card.id] = el;
                }}
                transform={`translate(${fx - SLOT_X} ${fy - SLOT_Y})`}
                opacity={initGroupOpacity}
              >
                {/* 暗底框（常驻）：返回栈里待命时，靠它读出「一张安静的暗卡片」。 */}
                <rect
                  x={SLOT_X}
                  y={SLOT_Y}
                  width={CARD_W}
                  height={CARD_H}
                  rx="10"
                  fill="var(--bg-elevated)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                {/* 当前可见高亮覆盖层（anime.js 驱动其 opacity）：仅在该卡片停在容器（host）时
                    淡入到 1，accent 描边 + 辉光填充强调「这是屏幕上正显示的 Fragment」；在返回栈 /
                    销毁时淡到 SUNK_OPACITY，accent 隐去，卡片自然变暗。 */}
                <rect
                  ref={(el) => {
                    hostHiRefs.current[card.id] = el;
                  }}
                  x={SLOT_X}
                  y={SLOT_Y}
                  width={CARD_W}
                  height={CARD_H}
                  rx="10"
                  fill="var(--accent-glow)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  opacity={initHiOpacity}
                />
                {/* 类名（主标题） */}
                <text
                  x={SLOT_X + CARD_W / 2}
                  y={SLOT_Y + 32}
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
                  x={SLOT_X + CARD_W / 2}
                  y={SLOT_Y + 52}
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
          caption="点击播放，看 FragmentManager 一笔事务如何把 Fragment 装进容器、replace 换走、再被返回键弹回；容器里高亮的那张永远是屏幕上正显示的 Fragment。可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        FragmentManager 事务：add 把 Fragment 装进 R.id.fragment_container；replace 换成另一个、
        addToBackStack 把旧的推入返回栈；按返回键 popBackStack 把它弹回容器。容器里高亮的那张
        就是用户当前看到的 Fragment。
      </figcaption>
    </figure>
  );
}
