"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <MultiTurnLoopDiagram>：多轮迭代核心动画（HEL-297，第 3 章主 viz）。
 *
 * 「可控教学动画」：一个「一次工具调用不够」的任务驱动 3 轮智能体循环，
 * 让人亲眼看出 ——
 *   ① 每轮都走 思考 Thought → 行动 Action → 观察 Observation；
 *   ② 每轮的 observation 喂回左侧「上下文」栏，上下文越滚越长（逐条淡入）；
 *   ③ 下一轮的思考 **基于上一轮的结果** 变化（这是循环的精髓，区别于
 *      第 1 章单轮、第 2 章一次调用）。
 *
 * 任务：「帮我订明天去上海最便宜的高铁票」——
 *   轮1：思考「先查有哪些车次」→ search_trains(明天,上海) → 观察「G1 ¥553(最便宜)/G7 ¥553/…」
 *   轮2：思考「订最便宜的 G1」→ book(G1) → 观察「G1 已售罄 ❌」
 *   轮3：思考「G1 没了，那订次便宜的 G7」→ book(G7) → 观察「订票成功 ✓」→ 完成
 *
 * 几何稳定策略（杜绝位移/重排）：思考/行动/观察三张卡片位置固定，每张卡片备 3 个
 * 轮次版本的文本图层、同位置叠放，按当前轮 opacity 淡入对应版本；左侧上下文 3 条
 * 槽位固定、逐轮淡入。全程只动 opacity，无位移。
 *
 * 时序铁律照 agent-loop-diagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
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
const VIEW_H = 480;

// —— 左侧「上下文（记忆）」栏：标题 + 3 条逐轮累积的槽位。 ——
const CTX_X = 24;
const CTX_W = 196;
const CTX_TITLE_Y = 56;
// 上下文条目槽（统一尺寸，竖直堆叠；单一 y 公式）。
const SLOT_W = CTX_W;
const SLOT_H = 64;
const SLOT_Y0 = 80; // 第 0 条顶
const SLOT_GAP = 12;

/** 第 i 条上下文槽左上角 y（单一公式）。 */
function slotY(i: number): number {
  return SLOT_Y0 + i * (SLOT_H + SLOT_GAP);
}

// —— 右侧当前轮三段卡片（思考 / 行动 / 观察，竖直堆叠；单一 y 公式）。 ——
const CARD_X = 280;
const CARD_W = 416;
const CARD_H = 80;
const CARD_Y0 = 116; // 思考卡顶（给顶部「当前轮」指示留位）
const CARD_GAP = 20;

/** 第 i 张当前轮卡片左上角 y（0=思考 1=行动 2=观察；单一公式）。 */
function cardY(i: number): number {
  return CARD_Y0 + i * (CARD_H + CARD_GAP);
}

// —— 顶部「当前轮次」指示框。 ——
const TURN_W = 416;
const TURN_X = CARD_X;
const TURN_Y = 56;
const TURN_H = 40;
const TURN_CX = TURN_X + TURN_W / 2; // 488

// —— 底部「完成」出口（贯通底部，完成时高亮）。 ——
const DONE_W = 416;
const DONE_X = CARD_X;
const DONE_Y = 408;
const DONE_H = 40;
const DONE_CX = DONE_X + DONE_W / 2;

// 透明度常量（具名，禁魔法数字）。
const SHOWN = 1;
const HIDDEN = 0;

/** 当前轮（1/2/3）与三段文本随轮变化。卡片 textAnchor 用左对齐起点。 */
const CARD_TEXT_X = CARD_X + 16;

type TurnText = {
  /** 思考（基于上一轮结果而变）。 */
  thought: string;
  /** 行动（工具调用，等宽）。 */
  action: string;
  /** 观察（工具返回）。 */
  observation: string;
};

const TURN_TEXTS: readonly TurnText[] = [
  {
    thought: "先查有哪些车次，再挑最便宜的",
    action: "search_trains(明天, 上海)",
    observation: "G1 ¥553（最便宜）· G7 ¥553 · G11 ¥667 …",
  },
  {
    thought: "G1 最便宜，就订 G1",
    action: "book(G1)",
    observation: "❌ G1 已售罄",
  },
  {
    thought: "G1 没票了 → 改订次便宜的 G7",
    action: "book(G7)",
    observation: "✓ 订票成功，G7 已出票",
  },
];

/** 左侧上下文栏逐轮追加的条目（= 每轮的 observation 摘要）。 */
const CTX_SLOTS: readonly string[] = [
  "轮1 看到：G1/G7 都 ¥553",
  "轮2 看到：G1 已售罄",
  "轮3 看到：G7 订票成功",
];

type LoopStep = TeachingStep & {
  /** 当前在第几轮（1/2/3）；0 表示「目标刚进入、还没开轮」。 */
  turn: 0 | 1 | 2 | 3;
  /** 当前高亮哪张卡（思考/行动/观察/无）。 */
  active: "none" | "thought" | "action" | "observe";
  /** 左侧上下文已累积到几条（0~3）。 */
  ctxCount: 0 | 1 | 2 | 3;
  /** 完成出口是否高亮。 */
  done: boolean;
};

const STEPS: readonly LoopStep[] = [
  {
    label: "goal",
    caption:
      "① 目标进入：「帮我订明天去上海最便宜的高铁票」—— 这事一次调用搞不定，得多转几轮",
    turn: 0,
    active: "none",
    ctxCount: 0,
    done: false,
  },
  {
    label: "t1-think",
    caption:
      "② 轮 1·思考：上下文还空着，LLM 想「先查有哪些车次，再挑最便宜的」",
    turn: 1,
    active: "thought",
    ctxCount: 0,
    done: false,
  },
  {
    label: "t1-act",
    caption:
      "③ 轮 1·行动：调 search_trains(明天, 上海)，工具返回「G1/G7 都 ¥553，G1 最便宜」",
    turn: 1,
    active: "action",
    ctxCount: 0,
    done: false,
  },
  {
    label: "t1-obs",
    caption:
      "④ 轮 1·观察：把车次结果喂回左侧上下文（上下文 +1 条）—— 第一圈转完",
    turn: 1,
    active: "observe",
    ctxCount: 1,
    done: false,
  },
  {
    label: "t2-think",
    caption:
      "⑤ 轮 2·思考：基于轮 1 看到的「G1 最便宜」，LLM 决定「就订 G1」—— 思考变了，因为它看见了上一轮结果",
    turn: 2,
    active: "thought",
    ctxCount: 1,
    done: false,
  },
  {
    label: "t2-act",
    caption: "⑥ 轮 2·行动：调 book(G1)，工具返回「❌ G1 已售罄」—— 出师不利",
    turn: 2,
    active: "action",
    ctxCount: 1,
    done: false,
  },
  {
    label: "t2-obs",
    caption:
      "⑦ 轮 2·观察：把「G1 已售罄」喂回上下文（上下文 +1 条）—— 第二圈转完，任务还没成",
    turn: 2,
    active: "observe",
    ctxCount: 2,
    done: false,
  },
  {
    label: "t3-think",
    caption:
      "⑧ 轮 3·思考：基于轮 2 的「G1 没票」，LLM 随机应变「改订次便宜的 G7」—— 又一次基于新结果调整",
    turn: 3,
    active: "thought",
    ctxCount: 2,
    done: false,
  },
  {
    label: "t3-act",
    caption: "⑨ 轮 3·行动：调 book(G7)，工具返回「✓ 订票成功」—— 这回成了",
    turn: 3,
    active: "action",
    ctxCount: 2,
    done: false,
  },
  {
    label: "done",
    caption:
      "⑩ 完成：观察到「订票成功」，上下文已攒满 3 条；LLM 判定任务办妥，跳出循环（出口亮起）",
    turn: 3,
    active: "observe",
    ctxCount: 3,
    done: true,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function MultiTurnLoopDiagram() {
  // 当前轮指示文本组（轮1/2/3 各一份，叠放，按 turn 淡入）。
  const turnTextRefs = useRef<(SVGTextElement | null)[]>([null, null, null]);
  // 三张卡片的高亮层。
  const thoughtHiRef = useRef<SVGRectElement | null>(null);
  const actionHiRef = useRef<SVGRectElement | null>(null);
  const observeHiRef = useRef<SVGRectElement | null>(null);
  // 三张卡片各 3 个轮次版本的文本组（[card][turn]）。
  const thoughtTextRefs = useRef<(SVGGElement | null)[]>([null, null, null]);
  const actionTextRefs = useRef<(SVGGElement | null)[]>([null, null, null]);
  const observeTextRefs = useRef<(SVGGElement | null)[]>([null, null, null]);
  // 左侧上下文 3 条槽。
  const ctxSlotRefs = useRef<(SVGGElement | null)[]>([null, null, null]);
  // 完成出口高亮。
  const doneHiRef = useRef<SVGRectElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (
        el: SVGGElement | SVGRectElement | SVGTextElement | null,
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

        // 当前轮指示：turn>=1 时点亮对应轮版本，turn=0 全灭。
        turnTextRefs.current.forEach((el, t) => {
          fade(el, step.turn === t + 1, start);
        });

        // 三张卡片各自只在「当前轮已开始」后显示对应轮版本文本。
        const turnIdx = step.turn - 1; // 0/1/2；turn=0 → -1（全灭）
        thoughtTextRefs.current.forEach((el, t) => {
          fade(el, t === turnIdx && step.turn >= 1, start);
        });
        actionTextRefs.current.forEach((el, t) => {
          // 行动文本：该轮进到 action 或之后才显示。
          const reached =
            step.turn === t + 1 &&
            (step.active === "action" || step.active === "observe");
          fade(el, reached, start);
        });
        observeTextRefs.current.forEach((el, t) => {
          // 观察文本：该轮进到 observe 才显示。
          const reached = step.turn === t + 1 && step.active === "observe";
          fade(el, reached, start);
        });

        // 卡片高亮：当前 active 段亮。
        fade(thoughtHiRef.current, step.active === "thought", start);
        fade(actionHiRef.current, step.active === "action", start);
        fade(observeHiRef.current, step.active === "observe", start);

        // 左侧上下文逐条累积：i < ctxCount 的槽点亮。
        ctxSlotRefs.current.forEach((el, s) => {
          fade(el, s < step.ctxCount, start);
        });

        // 完成出口。
        fade(doneHiRef.current, step.done, start);

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
          aria-label="多轮迭代演示动画。任务是帮我订明天去上海最便宜的高铁票，这件事一次调用搞不定，要多转几轮。画面左侧是一个上下文（记忆）栏，会随每轮的观察结果逐条往下累积、越滚越长。右侧上方是当前轮次指示，下面竖排三张卡片，分别是当前这一轮的思考 Thought、行动 Action、观察 Observation。最下面是一个完成出口。整段动画共十步。第一步，目标进入，因为一次调用搞不定，得多转几轮。第二步，轮一思考，上下文还空着，LLM 想先查有哪些车次。第三步，轮一行动，调 search_trains 明天 上海，返回 G1 和 G7 都五百五十三元，G1 最便宜。第四步，轮一观察，把车次结果喂回左侧上下文，上下文加一条，第一圈转完。第五步，轮二思考，基于轮一看到的 G1 最便宜，LLM 决定就订 G1，思考变了，因为它看见了上一轮结果。第六步，轮二行动，调 book G1，返回 G1 已售罄。第七步，轮二观察，把 G1 已售罄喂回上下文，上下文加一条，第二圈转完，任务还没成。第八步，轮三思考，基于轮二的 G1 没票，LLM 随机应变改订次便宜的 G7，又一次基于新结果调整。第九步，轮三行动，调 book G7，返回订票成功。第十步，完成，观察到订票成功，上下文已攒满三条，LLM 判定任务办妥，跳出循环，出口亮起。核心要点：和第一章单轮、第二章一次调用不同，这里是多轮迭代，每轮的观察都喂回上下文让它越滚越长，而下一轮的思考会基于上一轮的结果变化，这就是循环的精髓。可以播放、暂停、单步、拖动进度逐帧观察整个多轮过程。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          <defs>
            <marker
              id="multi-turn-arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="var(--accent)" />
            </marker>
            <marker
              id="multi-turn-arrow-dim"
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

          {/* —— 卡片间竖向箭头：思考 → 行动 → 观察 —— */}
          {[0, 1].map((i) => (
            <line
              key={`card-arrow-${i}`}
              x1={CARD_X + CARD_W / 2}
              y1={cardY(i) + CARD_H + 2}
              x2={CARD_X + CARD_W / 2}
              y2={cardY(i + 1) - 4}
              stroke="var(--accent)"
              strokeWidth="1.5"
              opacity="0.5"
              markerEnd="url(#multi-turn-arrow)"
            />
          ))}

          {/* —— 观察 → 上下文 的喂回暗线（常驻，标出「结果回流」）—— */}
          <line
            x1={CARD_X - 6}
            y1={cardY(2) + CARD_H / 2}
            x2={CTX_X + CTX_W + 6}
            y2={cardY(2) + CARD_H / 2}
            stroke="var(--text-secondary)"
            strokeWidth="1.4"
            strokeDasharray="5 4"
            opacity="0.5"
            markerEnd="url(#multi-turn-arrow-dim)"
          />

          {/* —— 观察 → 完成 的出口暗线（常驻）—— */}
          <line
            x1={CARD_X + CARD_W / 2}
            y1={cardY(2) + CARD_H + 2}
            x2={DONE_CX}
            y2={DONE_Y - 4}
            stroke="var(--accent)"
            strokeWidth="1.4"
            opacity="0.4"
            markerEnd="url(#multi-turn-arrow)"
          />

          {/* —— 左侧上下文栏标题 —— */}
          <text
            x={CTX_X + CTX_W / 2}
            y={CTX_TITLE_Y - 10}
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🧠 上下文（记忆）
          </text>
          <text
            x={CTX_X + CTX_W / 2}
            y={CTX_TITLE_Y + 8}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            每轮观察喂回，越滚越长
          </text>

          {/* —— 左侧上下文 3 条槽（逐轮淡入）—— */}
          {CTX_SLOTS.map((txt, s) => {
            const y = slotY(s);
            return (
              <g
                key={`ctx-slot-${s}`}
                ref={(el) => {
                  ctxSlotRefs.current[s] = el;
                }}
                opacity={HIDDEN}
              >
                <rect
                  x={CTX_X}
                  y={y}
                  width={SLOT_W}
                  height={SLOT_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                />
                <text
                  x={CTX_X + 12}
                  y={y + 26}
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {`📌 第 ${s + 1} 条`}
                </text>
                <text
                  x={CTX_X + 12}
                  y={y + 46}
                  fontSize="10"
                  fill="var(--text-primary)"
                >
                  {txt}
                </text>
              </g>
            );
          })}

          {/* —— 顶部「当前轮次」指示框 + 三个轮版本文本叠放 —— */}
          <rect
            x={TURN_X}
            y={TURN_Y}
            width={TURN_W}
            height={TURN_H}
            rx="8"
            fill="var(--bg-elevated)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          {[0, 1, 2].map((t) => (
            <text
              key={`turn-text-${t}`}
              ref={(el) => {
                turnTextRefs.current[t] = el;
              }}
              x={TURN_CX}
              y={TURN_Y + 25}
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--text-primary)"
              opacity={HIDDEN}
            >
              {`🔁 第 ${t + 1} 轮循环`}
            </text>
          ))}

          {/* —— 思考卡 —— */}
          <rect
            ref={(el) => {
              thoughtHiRef.current = el;
            }}
            x={CARD_X - 4}
            y={cardY(0) - 4}
            width={CARD_W + 8}
            height={CARD_H + 8}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={CARD_X}
            y={cardY(0)}
            width={CARD_W}
            height={CARD_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={CARD_TEXT_X}
            y={cardY(0) + 28}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            💭 思考 Thought
          </text>
          {TURN_TEXTS.map((tt, t) => (
            <g
              key={`thought-text-${t}`}
              ref={(el) => {
                thoughtTextRefs.current[t] = el;
              }}
              opacity={HIDDEN}
            >
              <text
                x={CARD_TEXT_X}
                y={cardY(0) + 54}
                fontSize="12"
                fill="var(--text-secondary)"
              >
                {tt.thought}
              </text>
            </g>
          ))}

          {/* —— 行动卡 —— */}
          <rect
            ref={(el) => {
              actionHiRef.current = el;
            }}
            x={CARD_X - 4}
            y={cardY(1) - 4}
            width={CARD_W + 8}
            height={CARD_H + 8}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={CARD_X}
            y={cardY(1)}
            width={CARD_W}
            height={CARD_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={CARD_TEXT_X}
            y={cardY(1) + 28}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🛠️ 行动 Action
          </text>
          {TURN_TEXTS.map((tt, t) => (
            <g
              key={`action-text-${t}`}
              ref={(el) => {
                actionTextRefs.current[t] = el;
              }}
              opacity={HIDDEN}
            >
              <text
                x={CARD_TEXT_X}
                y={cardY(1) + 54}
                fontSize="12"
                fontFamily="var(--font-mono)"
                fill="var(--accent)"
              >
                {tt.action}
              </text>
            </g>
          ))}

          {/* —— 观察卡 —— */}
          <rect
            ref={(el) => {
              observeHiRef.current = el;
            }}
            x={CARD_X - 4}
            y={cardY(2) - 4}
            width={CARD_W + 8}
            height={CARD_H + 8}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={CARD_X}
            y={cardY(2)}
            width={CARD_W}
            height={CARD_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={CARD_TEXT_X}
            y={cardY(2) + 28}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            👀 观察 Observation
          </text>
          {TURN_TEXTS.map((tt, t) => (
            <g
              key={`observe-text-${t}`}
              ref={(el) => {
                observeTextRefs.current[t] = el;
              }}
              opacity={HIDDEN}
            >
              <text
                x={CARD_TEXT_X}
                y={cardY(2) + 54}
                fontSize="12"
                fill="var(--text-primary)"
              >
                {tt.observation}
              </text>
            </g>
          ))}

          {/* —— 底部完成出口（done 时高亮）—— */}
          <rect
            ref={(el) => {
              doneHiRef.current = el;
            }}
            x={DONE_X - 4}
            y={DONE_Y - 4}
            width={DONE_W + 8}
            height={DONE_H + 8}
            rx="12"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={DONE_X}
            y={DONE_Y}
            width={DONE_W}
            height={DONE_H}
            rx="8"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={DONE_CX}
            y={DONE_Y + 25}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🎯 任务完成 → 跳出循环
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看「订高铁票」这件事如何转 3 轮才办成：每轮观察喂回左侧上下文（越滚越长），下一轮的思考都基于上一轮看到的结果调整。可暂停、单步、拖进度逐帧看。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        多轮迭代：一次工具调用不够时，智能体反复转圈——每轮的观察都喂回上下文（左侧越滚越长），下一轮的思考基于上一轮的结果随机应变。这是「循环」区别于单轮问答（第
        1 章）、一次增强调用（第 2 章）的精髓。
      </figcaption>
    </figure>
  );
}
