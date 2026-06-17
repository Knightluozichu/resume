"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ToolErrorRecoveryDiagram>：错误信息质量决定 agent 能不能自救（HEL-317，第 9 章主 viz）。
 *
 * 「可控教学动画」：同一次工具调用失败，左右两路并排对照，演出「错误信息写得好不好」
 * 直接决定 agent 卡死还是自我纠正——
 *   左路（坏）：工具抛裸异常 `KeyError: 'order_id'` → agent 看不懂、原样重试 → 还是同样的错 → 卡死。
 *   右路（好）：工具返回可执行的错误提示「order_id 格式应为 A 开头 + 4 位数字，你传的是 '123'」
 *     → agent 读懂、把参数改成 'A0123' → 重试成功。
 * 两路用同一个起点（agent 调 check_order(order_id='123')），同一次失败，只是返回的错误信息不同。
 *
 * 几何稳定策略（杜绝位移/重排）：左右两栏各 4 张卡片位置固定、各持 ref，全程只切 opacity
 * 淡入；最后一步左路卡死卡 / 右路成功卡分别高亮。照 multi-turn-loop 的「只动 opacity」铁律。
 *
 * 时序铁律照 multi-turn-loop：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * tl.label(name, BEAT*(i+1)) 落在呈现完成处，最后一步停在亮态不淡出（杜绝 off-by-one）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色，无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，
 * 几何布局常量均具名、为 4 的倍数（硬规则 5）。
 */

// —— 整体画布。 ——
const VIEW_W = 720;
const VIEW_H = 488;

// 透明度常量（具名，禁魔法数字）。
const SHOWN = 1;
const HIDDEN = 0;

// —— 顶部共同起点卡（两路共用同一个调用）。 ——
const START_X = 132;
const START_W = 456;
const START_Y = 52;
const START_H = 48;
const START_CX = START_X + START_W / 2;

// —— 两栏分区。 ——
const COL_W = 324;
const LEFT_X = 24; // 左栏左边界
const RIGHT_X = VIEW_W - COL_W - 24; // 372，右栏左边界（右留白 24）
const COL_TOP = 120;
const COL_H = 348; // 底 = 120 + 348 = 468 → 距底 20

// —— 栏内 3 张卡（错误信息 / agent 反应 / 结局；竖直堆叠，单一 y 公式）。 ——
const CARD_W = 284;
const CARD_H = 80;
const CARD_Y0 = COL_TOP + 48; // 第 0 张卡顶
const CARD_GAP = 16;

/** 第 i 张栏内卡左上角 y（单一公式）。底卡底 = 168 + 2*96 + 80 = 440 → 距栏底 28。 */
function cardY(i: number): number {
  return CARD_Y0 + i * (CARD_H + CARD_GAP);
}

/** 栏内卡左边界（栏内水平居中）。 */
function cardX(colLeft: number): number {
  return colLeft + (COL_W - CARD_W) / 2;
}

type TrackCard = {
  /** 卡头（角色 / 阶段）。 */
  head: string;
  /** 卡内容第一行。 */
  line1: string;
  /** 卡内容第二行（可空）。 */
  line2: string;
  /** 内容是否等宽。 */
  mono: boolean;
};

/** 左路（坏）3 张卡。 */
const BAD_CARDS: readonly TrackCard[] = [
  {
    head: "🔧 工具返回（坏）",
    line1: "KeyError: 'order_id'",
    line2: "—— 一个裸异常，没说该怎么办",
    mono: true,
  },
  {
    head: "🤖 agent 看到后",
    line1: "看不懂这是啥、哪里错了，",
    line2: "只能原样把同一个调用再试一次",
    mono: false,
  },
  {
    head: "💥 结局",
    line1: "还是同一个 KeyError，",
    line2: "卡死 / 反复瞎试，办不成事",
    mono: false,
  },
];

/** 右路（好）3 张卡。 */
const GOOD_CARDS: readonly TrackCard[] = [
  {
    head: "🔧 工具返回（好）",
    line1: "order_id 格式应为 A + 4 位数字，",
    line2: "你传的是 '123' —— 请改正后重试",
    mono: false,
  },
  {
    head: "🤖 agent 看到后",
    line1: "读懂了：少了字母前缀、位数不对，",
    line2: "把参数改成 'A0123' 再调一次",
    mono: false,
  },
  {
    head: "🎉 结局",
    line1: "check_order(order_id='A0123') 成功，",
    line2: "agent 自己纠错、把事办成了",
    mono: false,
  },
];

type RecoveryStep = TeachingStep & {
  /** 这一步两栏各亮到第几张卡（0 = 都不亮，1~3）。 */
  cardCount: 0 | 1 | 2 | 3;
  /** 起点卡是否亮。 */
  startLit: boolean;
  /** 左路结局卡高亮（卡死）。 */
  badEnd: boolean;
  /** 右路结局卡高亮（成功）。 */
  goodEnd: boolean;
};

const STEPS: readonly RecoveryStep[] = [
  {
    label: "call",
    caption:
      "① 同一个起点：agent 调 check_order(order_id='123')——参数格式不对，这次调用注定失败。两路从这同一步出发。",
    cardCount: 0,
    startLit: true,
    badEnd: false,
    goodEnd: false,
  },
  {
    label: "return",
    caption:
      "② 工具返回——分叉就在这里：左路抛一个裸异常 KeyError；右路返回一句能看懂、能照做的错误提示。返回的信息质量是唯一的差别。",
    cardCount: 1,
    startLit: true,
    badEnd: false,
    goodEnd: false,
  },
  {
    label: "react",
    caption:
      "③ agent 看到后：左路看不懂裸异常、只能原样重试；右路读懂了「格式该是 A+4 位」，主动把参数改成 'A0123'。",
    cardCount: 2,
    startLit: true,
    badEnd: false,
    goodEnd: false,
  },
  {
    label: "outcome",
    caption:
      "④ 结局：左路还是同一个 KeyError，卡死、反复瞎试；右路这次调用成功，agent 自己把错纠了过来。错误信息写得好不好，直接决定 agent 能不能自救。",
    cardCount: 3,
    startLit: true,
    badEnd: true,
    goodEnd: true,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function ToolErrorRecoveryDiagram() {
  const startRef = useRef<SVGRectElement | null>(null);
  // 左路 3 张卡 + 右路 3 张卡。
  const badRefs = useRef<(SVGGElement | null)[]>([null, null, null]);
  const goodRefs = useRef<(SVGGElement | null)[]>([null, null, null]);
  // 结局高亮层。
  const badEndRef = useRef<SVGRectElement | null>(null);
  const goodEndRef = useRef<SVGRectElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (
        el: SVGGElement | SVGRectElement | null,
        on: boolean,
        start: number,
      ) => {
        if (!el) return;
        tl.add(
          el,
          {
            opacity: on ? SHOWN : HIDDEN,
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          start,
        );
      };

      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        fade(startRef.current, step.startLit, start);

        // 两栏卡片：累积到 cardCount 张。
        badRefs.current.forEach((el, c) => {
          fade(el, c < step.cardCount, start);
        });
        goodRefs.current.forEach((el, c) => {
          fade(el, c < step.cardCount, start);
        });

        // 结局高亮。
        fade(badEndRef.current, step.badEnd, start);
        fade(goodEndRef.current, step.goodEnd, start);

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
          aria-label="错误信息质量决定 agent 能不能自救的对照动画，左右两路并排，共四步。最上方是两路共用的同一个起点：agent 调用 check_order，传入的 order_id 是 '123'，这个格式不对，调用注定失败。左路是「坏的错误信息」，右路是「好的错误信息」。第一步，同一个起点：两路都从这次失败的调用出发。第二步，工具返回，分叉就在这里：左路抛出一个裸异常 KeyError 冒号 order_id，没说该怎么办；右路返回一句能看懂能照做的提示——order_id 格式应为 A 开头加四位数字，你传的是 '123'，请改正后重试。返回的信息质量是两路唯一的差别。第三步，agent 看到后：左路看不懂裸异常，只能原样把同一个调用再试一次；右路读懂了格式要求，主动把参数改成 'A0123' 再调一次。第四步，结局：左路还是同一个 KeyError，卡死、反复瞎试，办不成事；右路这次调用成功，agent 自己把错误纠正了过来、把事办成了。核心结论：同一次工具失败，错误信息写成看不懂的裸异常还是写成能照做的提示，直接决定 agent 是卡死还是能自我纠正、重试成功。可以播放、暂停、单步、拖动进度逐帧观察。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="ter-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* —— 顶部共同起点卡 —— */}
          <rect
            ref={(el) => {
              startRef.current = el;
            }}
            x={START_X}
            y={START_Y}
            width={START_W}
            height={START_H}
            rx="10"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="1.8"
            opacity={HIDDEN}
          />
          <text
            x={START_CX}
            y={START_Y + 20}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🟰 同一个起点：agent 调用同一个工具、传了同样的坏参数
          </text>
          <text
            x={START_CX}
            y={START_Y + 38}
            textAnchor="middle"
            fontSize="11"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            check_order(order_id=&apos;123&apos;) —— 注定失败
          </text>

          {/* —— 起点分叉到两栏的暗线 —— */}
          <line
            x1={START_CX}
            y1={START_Y + START_H}
            x2={LEFT_X + COL_W / 2}
            y2={COL_TOP - 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            opacity="0.5"
            markerEnd="url(#ter-arrow)"
          />
          <line
            x1={START_CX}
            y1={START_Y + START_H}
            x2={RIGHT_X + COL_W / 2}
            y2={COL_TOP - 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            opacity="0.5"
            markerEnd="url(#ter-arrow)"
          />

          {/* —— 左栏「坏」底框 + 标题 —— */}
          <rect
            x={LEFT_X}
            y={COL_TOP}
            width={COL_W}
            height={COL_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--danger)"
            strokeWidth="1.6"
          />
          <text
            x={LEFT_X + COL_W / 2}
            y={COL_TOP + 28}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--danger)"
          >
            ✗ 坏错误信息：抛裸异常
          </text>

          {/* —— 右栏「好」底框 + 标题 —— */}
          <rect
            x={RIGHT_X}
            y={COL_TOP}
            width={COL_W}
            height={COL_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--success)"
            strokeWidth="1.6"
          />
          <text
            x={RIGHT_X + COL_W / 2}
            y={COL_TOP + 28}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--success)"
          >
            ✓ 好错误信息：可照做
          </text>

          {/* —— 左栏 3 张卡（逐步淡入）—— */}
          {BAD_CARDS.map((card, i) => {
            const x = cardX(LEFT_X);
            const y = cardY(i);
            const isEnd = i === BAD_CARDS.length - 1;
            return (
              <g key={`bad-card-${i}`}>
                {/* 结局卡的高亮层（仅最后一张） */}
                {isEnd && (
                  <rect
                    ref={(el) => {
                      badEndRef.current = el;
                    }}
                    x={x - 4}
                    y={y - 4}
                    width={CARD_W + 8}
                    height={CARD_H + 8}
                    rx="12"
                    fill="var(--danger)"
                    opacity={HIDDEN}
                  />
                )}
                <g
                  ref={(el) => {
                    badRefs.current[i] = el;
                  }}
                  opacity={HIDDEN}
                >
                  <rect
                    x={x}
                    y={y}
                    width={CARD_W}
                    height={CARD_H}
                    rx="8"
                    fill="var(--bg-elevated)"
                    stroke="var(--danger)"
                    strokeWidth="1.4"
                  />
                  <text
                    x={x + 14}
                    y={y + 22}
                    fontSize="11"
                    fontWeight="700"
                    fill="var(--danger)"
                  >
                    {card.head}
                  </text>
                  <text
                    x={x + 14}
                    y={y + 46}
                    fontSize="11"
                    fontFamily={card.mono ? "var(--font-mono)" : undefined}
                    fill="var(--text-primary)"
                  >
                    {card.line1}
                  </text>
                  {card.line2 && (
                    <text
                      x={x + 14}
                      y={y + 66}
                      fontSize="11"
                      fill="var(--text-secondary)"
                    >
                      {card.line2}
                    </text>
                  )}
                </g>
              </g>
            );
          })}

          {/* —— 右栏 3 张卡（逐步淡入）—— */}
          {GOOD_CARDS.map((card, i) => {
            const x = cardX(RIGHT_X);
            const y = cardY(i);
            const isEnd = i === GOOD_CARDS.length - 1;
            return (
              <g key={`good-card-${i}`}>
                {isEnd && (
                  <rect
                    ref={(el) => {
                      goodEndRef.current = el;
                    }}
                    x={x - 4}
                    y={y - 4}
                    width={CARD_W + 8}
                    height={CARD_H + 8}
                    rx="12"
                    fill="var(--success)"
                    opacity={HIDDEN}
                  />
                )}
                <g
                  ref={(el) => {
                    goodRefs.current[i] = el;
                  }}
                  opacity={HIDDEN}
                >
                  <rect
                    x={x}
                    y={y}
                    width={CARD_W}
                    height={CARD_H}
                    rx="8"
                    fill="var(--bg-elevated)"
                    stroke="var(--success)"
                    strokeWidth="1.4"
                  />
                  <text
                    x={x + 14}
                    y={y + 22}
                    fontSize="11"
                    fontWeight="700"
                    fill="var(--success)"
                  >
                    {card.head}
                  </text>
                  <text
                    x={x + 14}
                    y={y + 46}
                    fontSize="11"
                    fontFamily={card.mono ? "var(--font-mono)" : undefined}
                    fill="var(--text-primary)"
                  >
                    {card.line1}
                  </text>
                  {card.line2 && (
                    <text
                      x={x + 14}
                      y={y + 66}
                      fontSize="11"
                      fill="var(--text-secondary)"
                    >
                      {card.line2}
                    </text>
                  )}
                </g>
              </g>
            );
          })}
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看同一次工具失败、两路对照：错误信息写成看不懂的裸异常（左），agent 卡死、原样瞎试；写成能照做的提示（右），agent 读懂、改对参数、重试成功。可暂停、单步、拖进度逐帧看。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        错误信息的质量，直接决定 agent
        能不能自救：裸异常（左）让它卡死、反复瞎试；一句「错在哪 +
        怎么改」的提示（右），让它读懂、纠正参数、重试成功。
      </figcaption>
    </figure>
  );
}
