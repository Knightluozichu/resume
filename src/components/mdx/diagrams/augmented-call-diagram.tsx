"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AugmentedCallDiagram>：一次「增强调用」核心动画（HEL-291，第 2 章主 viz）。
 *
 * 「可控教学动画」：中央一个 LLM，三路增强从三个方向汇聚进它的上下文 ——
 *   检索（左）/ 记忆（左上）/ 工具（右）—— 区别于第 1 章的「循环迭代」，
 *   这里讲的是三路增强 **汇聚** 让一次 LLM 调用变强。
 * 用一个具体例子「根据公司退货政策，回答顾客这单能不能退」驱动 6 步：
 *   ① 裸 prompt 到达：顾客问题进入 LLM 的上下文。
 *   ② 检索增强：去知识库捞「退货政策」片段，汇入上下文（检索通路高亮、资料卡出现）。
 *   ③ 记忆增强：载入这位顾客历史「VIP·上月已退一次」，汇入上下文（记忆通路高亮、记忆卡出现）。
 *   ④ LLM 处理这份「富化」输入（中央 LLM 高亮）。
 *   ⑤ 产出工具调用 check_order_status(订单号)，系统执行、结果回填（工具通路高亮、结果卡出现）。
 *   ⑥ 给出有依据的最终回答（出口高亮）。
 *
 * 时序铁律照 agent-loop-diagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * tl.label(name, BEAT*(i+1)) 落在呈现完成处，最后一步停在亮态不淡出（杜绝 off-by-one）。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6），本组件再经 mdx-components
 * 静态注册为客户端叶子，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色，无裸 hex；时长走 TEACHING_BEAT_MS 具名常量，
 * 几何布局常量均具名、为 4 的倍数（硬规则 5）。淡入淡出（无位移，几何稳定）。
 */

// —— 整体画布。 ——
const VIEW_W = 680;
const VIEW_H = 440;

// —— 中央 LLM（汇聚核心）。 ——
const LLM_W = 152;
const LLM_H = 72;
const LLM_X = (VIEW_W - LLM_W) / 2; // 264
const LLM_Y = 176;
const LLM_CX = LLM_X + LLM_W / 2; // 340
const LLM_CY = LLM_Y + LLM_H / 2; // 212

// —— 三个增强源（左=检索、左上=记忆、右=工具）。统一尺寸。 ——
const SRC_W = 148;
const SRC_H = 60;
// 检索源（左中）
const RET_X = 24;
const RET_Y = 184;
const RET_CY = RET_Y + SRC_H / 2; // 214
// 记忆源（左上）
const MEM_X = 24;
const MEM_Y = 40;
const MEM_CY = MEM_Y + SRC_H / 2; // 70
// 工具（右中）
const TOOL_X = VIEW_W - SRC_W - 24; // 508
const TOOL_Y = 184;
const TOOL_CY = TOOL_Y + SRC_H / 2; // 214

// —— 资料卡 / 记忆卡 / 工具结果卡（汇入时出现，统一尺寸）。 ——
const CARD_W = 168;
const CARD_H = 52;
// 检索资料卡（左下，落在检索源下方，避开中央出口框）
const RET_CARD_X = 24;
const RET_CARD_Y = 284;
// 记忆卡（中上，落在 LLM 上方、记忆源右侧）
const MEM_CARD_X = (VIEW_W - CARD_W) / 2; // 256
const MEM_CARD_Y = 100;
// 工具结果卡（右下，落在工具源下方，避开中央出口框）
const TOOL_CARD_X = VIEW_W - CARD_W - 24; // 488
const TOOL_CARD_Y = 284;

// —— 出口：最终答案（底部居中，完成时高亮）。 ——
const ANSWER_W = 232;
const ANSWER_H = 56;
const ANSWER_X = (VIEW_W - ANSWER_W) / 2; // 224
const ANSWER_Y = 360; // 出口框 y（highlight 底 420，距下边 20px ≥12）
const ANSWER_CX = ANSWER_X + ANSWER_W / 2; // 340

// 透明度常量（具名，禁魔法数字）。
const SHOWN = 1;
const HIDDEN = 0;

type CallStep = TeachingStep & {
  /** 检索通路 + 资料卡是否点亮 / 可见。 */
  retLit: boolean;
  /** 记忆通路 + 记忆卡是否点亮 / 可见。 */
  memLit: boolean;
  /** 工具通路 + 工具结果卡是否点亮 / 可见。 */
  toolLit: boolean;
  /** 中央 LLM 是否高亮（处理富化输入）。 */
  llmLit: boolean;
  /** 出口（最终答案）是否高亮。 */
  answerLit: boolean;
};

const STEPS: readonly CallStep[] = [
  {
    label: "prompt",
    caption:
      "① 裸 prompt 到达：顾客问「根据退货政策，我这单能退吗？」先进入 LLM 的上下文",
    retLit: false,
    memLit: false,
    toolLit: false,
    llmLit: false,
    answerLit: false,
  },
  {
    label: "retrieval",
    caption:
      "② 检索增强：去知识库捞出「退货政策」相关片段，汇入上下文（检索通路亮起、资料卡出现）",
    retLit: true,
    memLit: false,
    toolLit: false,
    llmLit: false,
    answerLit: false,
  },
  {
    label: "memory",
    caption:
      "③ 记忆增强：载入这位顾客的历史「VIP · 上月已退一次」，汇入上下文（记忆通路亮起、记忆卡出现）",
    retLit: true,
    memLit: true,
    toolLit: false,
    llmLit: false,
    answerLit: false,
  },
  {
    label: "process",
    caption:
      "④ LLM 处理这份「被检索 + 记忆富化」的输入 —— 三路信息已汇齐，它有料可依（中央 LLM 高亮）",
    retLit: true,
    memLit: true,
    toolLit: false,
    llmLit: true,
    answerLit: false,
  },
  {
    label: "tool",
    caption:
      "⑤ 工具增强：产出调用 check_order_status(订单号)，系统执行、结果回填（工具通路亮起、结果卡出现）",
    retLit: true,
    memLit: true,
    toolLit: true,
    llmLit: true,
    answerLit: false,
  },
  {
    label: "answer",
    caption:
      "⑥ 给出有依据的最终回答：「按政策 + 您的 VIP 身份，本单可退」—— 三路增强汇成这一次强调用（出口亮起）",
    retLit: true,
    memLit: true,
    toolLit: true,
    llmLit: false,
    answerLit: true,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function AugmentedCallDiagram() {
  // 各高亮层 / 卡片的 DOM 引用：anime.js 驱动 opacity（淡入淡出，无位移，几何稳定）。
  const retPathRef = useRef<SVGGElement | null>(null);
  const retCardRef = useRef<SVGGElement | null>(null);
  const memPathRef = useRef<SVGGElement | null>(null);
  const memCardRef = useRef<SVGGElement | null>(null);
  const toolPathRef = useRef<SVGGElement | null>(null);
  const toolCardRef = useRef<SVGGElement | null>(null);
  const llmHiRef = useRef<SVGRectElement | null>(null);
  const answerHiRef = useRef<SVGRectElement | null>(null);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (
        ref: React.RefObject<SVGGElement | SVGRectElement | null>,
        on: boolean,
        start: number,
      ) => {
        if (!ref.current) return;
        tl.add(
          ref.current,
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

        fade(retPathRef, step.retLit, start);
        fade(retCardRef, step.retLit, start);
        fade(memPathRef, step.memLit, start);
        fade(memCardRef, step.memLit, start);
        fade(toolPathRef, step.toolLit, start);
        fade(toolCardRef, step.toolLit, start);
        fade(llmHiRef, step.llmLit, start);
        fade(answerHiRef, step.answerLit, start);

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
          aria-label="一次增强调用的演示动画。画面正中是一个 LLM 节点，作为三路增强信息的汇聚核心。左中方是检索源（连着知识库），左上方是记忆源（连着顾客历史），右中方是工具节点（check_order_status）。三个增强源各有一条箭头指向中央的 LLM，表示三路信息汇聚进它的上下文。底部居中是一个最终答案出口。整段动画用一个具体例子驱动：根据公司退货政策，回答顾客这单能不能退，共六步。第一步，裸 prompt 到达，顾客的问题先进入 LLM 的上下文。第二步检索增强，系统去知识库捞出退货政策的相关片段，汇入上下文，检索通路高亮、资料卡出现。第三步记忆增强，载入这位顾客的历史，VIP 且上月已退过一次，汇入上下文，记忆通路高亮、记忆卡出现。第四步，LLM 处理这份被检索和记忆富化过的输入，三路信息已汇齐，它有料可依，中央 LLM 高亮。第五步工具增强，LLM 产出一个工具调用 check_order_status 订单号，系统执行后把结果回填，工具通路高亮、结果卡出现。第六步，给出有依据的最终回答：按政策加上您的 VIP 身份，本单可退，出口高亮。核心要点：和第一章的循环迭代不同，这里讲的是检索、记忆、工具三路增强汇聚到一起，让同一个 base LLM 的一次调用变得有据可依、脱胎换骨。可以播放、暂停、单步、拖动进度逐帧观察整个汇聚过程。"
          className="mx-auto block h-auto w-full max-w-[680px]"
        >
          <defs>
            <marker
              id="aug-call-arrow"
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
              id="aug-call-arrow-dim"
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

          {/* —— 三路增强 → LLM 的「底色暗线」（常驻，标出三条汇聚通路）—— */}
          {/* 检索 → LLM */}
          <line
            x1={RET_X + SRC_W + 4}
            y1={RET_CY}
            x2={LLM_X - 6}
            y2={LLM_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            opacity="0.3"
          />
          {/* 记忆 → LLM */}
          <line
            x1={MEM_X + SRC_W + 4}
            y1={MEM_CY}
            x2={LLM_X + 12}
            y2={LLM_Y - 6}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            opacity="0.3"
          />
          {/* 工具 → LLM */}
          <line
            x1={TOOL_X - 4}
            y1={TOOL_CY}
            x2={LLM_X + LLM_W + 6}
            y2={LLM_CY}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            opacity="0.3"
          />
          {/* LLM → 最终答案（出口暗线，常驻） */}
          <line
            x1={LLM_CX}
            y1={LLM_Y + LLM_H + 4}
            x2={ANSWER_CX}
            y2={ANSWER_Y - 6}
            stroke="var(--text-secondary)"
            strokeWidth="1.2"
            opacity="0.3"
          />

          {/* —— 检索通路（高亮组：亮箭头）—— */}
          <g
            ref={(el) => {
              retPathRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <line
              x1={RET_X + SRC_W + 4}
              y1={RET_CY}
              x2={LLM_X - 6}
              y2={LLM_CY}
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd="url(#aug-call-arrow)"
            />
          </g>
          {/* —— 记忆通路（高亮组）—— */}
          <g
            ref={(el) => {
              memPathRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <line
              x1={MEM_X + SRC_W + 4}
              y1={MEM_CY}
              x2={LLM_X + 12}
              y2={LLM_Y - 6}
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd="url(#aug-call-arrow)"
            />
          </g>
          {/* —— 工具通路（高亮组）—— */}
          <g
            ref={(el) => {
              toolPathRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <line
              x1={TOOL_X - 4}
              y1={TOOL_CY}
              x2={LLM_X + LLM_W + 6}
              y2={LLM_CY}
              stroke="var(--accent)"
              strokeWidth="2"
              markerEnd="url(#aug-call-arrow)"
            />
          </g>

          {/* —— 检索源（左中）—— */}
          <rect
            x={RET_X}
            y={RET_Y}
            width={SRC_W}
            height={SRC_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={RET_X + SRC_W / 2}
            y={RET_Y + 26}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🔍 检索 · 知识库
          </text>
          <text
            x={RET_X + SRC_W / 2}
            y={RET_Y + 44}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            退货政策文档
          </text>

          {/* —— 记忆源（左上）—— */}
          <rect
            x={MEM_X}
            y={MEM_Y}
            width={SRC_W}
            height={SRC_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={MEM_X + SRC_W / 2}
            y={MEM_Y + 26}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🧠 记忆 · 顾客档案
          </text>
          <text
            x={MEM_X + SRC_W / 2}
            y={MEM_Y + 44}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            历史 / 偏好
          </text>

          {/* —— 工具（右中）—— */}
          <rect
            x={TOOL_X}
            y={TOOL_Y}
            width={SRC_W}
            height={SRC_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={TOOL_X + SRC_W / 2}
            y={TOOL_Y + 26}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🔧 工具
          </text>
          <text
            x={TOOL_X + SRC_W / 2}
            y={TOOL_Y + 44}
            textAnchor="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="var(--accent)"
          >
            check_order()
          </text>

          {/* —— 中央 LLM（汇聚核心）—— */}
          <rect
            ref={(el) => {
              llmHiRef.current = el;
            }}
            x={LLM_X - 4}
            y={LLM_Y - 4}
            width={LLM_W + 8}
            height={LLM_H + 8}
            rx="14"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={LLM_X}
            y={LLM_Y}
            width={LLM_W}
            height={LLM_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--accent)"
            strokeWidth="1.8"
          />
          <text
            x={LLM_CX}
            y={LLM_CY - 4}
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🧩 Base LLM
          </text>
          <text
            x={LLM_CX}
            y={LLM_CY + 16}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            三路汇聚的核心
          </text>

          {/* —— 检索资料卡（左下，②出现）—— */}
          <g
            ref={(el) => {
              retCardRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <rect
              x={RET_CARD_X}
              y={RET_CARD_Y}
              width={CARD_W}
              height={CARD_H}
              rx="10"
              fill="var(--bg-elevated)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text
              x={RET_CARD_X + CARD_W / 2}
              y={RET_CARD_Y + 22}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--accent)"
            >
              ↘ 检索片段汇入
            </text>
            <text
              x={RET_CARD_X + CARD_W / 2}
              y={RET_CARD_Y + 40}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-primary)"
            >
              「7 天无理由可退」
            </text>
          </g>

          {/* —— 记忆卡（中上，③出现）—— */}
          <g
            ref={(el) => {
              memCardRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <rect
              x={MEM_CARD_X}
              y={MEM_CARD_Y}
              width={CARD_W}
              height={CARD_H}
              rx="10"
              fill="var(--bg-elevated)"
              stroke="var(--accent)"
              strokeWidth="1.5"
            />
            <text
              x={MEM_CARD_X + CARD_W / 2}
              y={MEM_CARD_Y + 22}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--accent)"
            >
              ↓ 记忆汇入
            </text>
            <text
              x={MEM_CARD_X + CARD_W / 2}
              y={MEM_CARD_Y + 40}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-primary)"
            >
              「VIP · 上月已退一次」
            </text>
          </g>

          {/* —— 工具结果卡（右下，⑤出现）—— */}
          <g
            ref={(el) => {
              toolCardRef.current = el;
            }}
            opacity={HIDDEN}
          >
            <rect
              x={TOOL_CARD_X}
              y={TOOL_CARD_Y}
              width={CARD_W}
              height={CARD_H}
              rx="10"
              fill="var(--bg-elevated)"
              stroke="var(--success)"
              strokeWidth="1.6"
            />
            <text
              x={TOOL_CARD_X + CARD_W / 2}
              y={TOOL_CARD_Y + 22}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="var(--success)"
            >
              ✓ 工具回填
            </text>
            <text
              x={TOOL_CARD_X + CARD_W / 2}
              y={TOOL_CARD_Y + 40}
              textAnchor="middle"
              fontSize="10"
              fill="var(--text-primary)"
            >
              订单状态：已签收 3 天
            </text>
          </g>

          {/* —— 出口：最终答案（底部居中，⑥高亮）—— */}
          <rect
            ref={(el) => {
              answerHiRef.current = el;
            }}
            x={ANSWER_X - 4}
            y={ANSWER_Y - 4}
            width={ANSWER_W + 8}
            height={ANSWER_H + 8}
            rx="14"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="2.5"
            opacity={HIDDEN}
          />
          <rect
            x={ANSWER_X}
            y={ANSWER_Y}
            width={ANSWER_W}
            height={ANSWER_H}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />
          <text
            x={ANSWER_CX}
            y={ANSWER_Y + 24}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🎯 有依据的最终回答
          </text>
          <text
            x={ANSWER_CX}
            y={ANSWER_Y + 42}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            「按政策 + 您是 VIP，本单可退」
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看检索 / 记忆 / 工具三路增强如何汇聚进同一次 LLM 调用，让它从「凭空乱答」变成「有据可依」。可暂停、单步、拖进度逐帧看。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        一次增强调用：检索（捞资料）、记忆（载历史）、工具（取实况）三路信息汇聚进同一个 base LLM 的上下文，让这一次调用有据可依。这是「汇聚增强」，区别于第 1 章的「循环迭代」。
      </figcaption>
    </figure>
  );
}
