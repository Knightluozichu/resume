"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ToolCallProtocolDiagram>：工具调用（function calling）一次完整往返的「消息流」动画（HEL-309，第 7 章主 viz）。
 *
 * 「可控教学动画」：把一次 function calling 的**线路协议**一步步演出来——
 *   左侧「messages 消息流」：随每一步往下累积一张张消息卡，每卡显示 role 徽标 + 内容，
 *     重点把 assistant 返回 tool_calls（content 为空）、以及工具结果用 role:"tool" +
 *     tool_call_id 回填这两条**协议格式**摆在台面上；
 *   右侧「本轮发生了什么」状态卡：一句人话解释当前这一步。
 * 照第 4 章 AgentRunTraceDiagram 的「左累积 + 右状态 + 只动 opacity」模式。
 *
 * 六步（一次完整往返）：
 *   ① 发请求：messages = [system, user] + tools 定义 一起发给模型（前两张卡亮）；
 *   ② assistant 返回 tool_calls：name + arguments(JSON)，content 为空（+assistant 卡）；
 *   ③ app 解析参数、真去执行函数（不新增消息，高亮「我们的代码执行」）；
 *   ④ 回填：把结果作为 role:"tool" + tool_call_id 的消息 append 回 messages（+tool 卡）；
 *   ⑤ 带着工具结果再请求一次模型（高亮「再请求」，不新增消息）；
 *   ⑥ assistant 这次返回 content 终答，往返结束（+assistant 终答卡）。
 *
 * 几何稳定策略（杜绝位移/重排）：左侧 5 张消息卡位置固定、各持 ref，全程只切 opacity
 * 淡入；右侧 6 张状态卡同位叠放交叉淡入。第 ③ ⑤ 步不新增消息（msgCount 不变），
 * 「app 执行 / 再请求」由右侧状态卡文案承载——避免在左右面板间隙塞浮层造成重叠。
 *
 * 时序铁律照 AgentRunTraceDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
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

// 透明度常量（具名，禁魔法数字）。
const SHOWN = 1;
const HIDDEN = 0;

// —— 左侧「messages 消息流」面板：标题 + 5 张消息卡（竖直堆叠）。 ——
const MSG_X = 24;
const MSG_W = 348;
const MSG_TITLE_Y = 48;
const MSG_CARD_H = 60;
const MSG_CARD_Y0 = 72; // 第 0 张卡顶
const MSG_CARD_GAP = 12;

/** 第 i 张消息卡左上角 y（单一公式）。底卡底 = 72 + 4*72 + 60 = 420 → 距 viewBox 底 60。 */
function msgCardY(i: number): number {
  return MSG_CARD_Y0 + i * (MSG_CARD_H + MSG_CARD_GAP);
}

// —— 右侧「本轮发生了什么」面板：标题 + 当前步状态卡（6 张叠同位）。 ——
const PANEL_X = 396;
const PANEL_W = 300; // 右边界 = 396 + 300 = 696 → 右留白 24
const PANEL_TITLE_Y = 48;
const STATUS_CARD_Y = 72;
const STATUS_CARD_H = 348; // 底 = 72 + 348 = 420 → 距底 60，与左对齐

type MsgCard = {
  /** role 徽标文字（含协议字段提示） */
  role: string;
  /** 卡片内容梗概 */
  content: string;
  /** 语义色：发出 / 模型 / 工具 / 终答 */
  color: string;
  /** 内容是否等宽显示（协议字段类用等宽） */
  mono: boolean;
};

/** 左侧 5 张消息卡（自上而下，对应一次往返累积的 messages）。 */
const MSG_CARDS: readonly MsgCard[] = [
  {
    role: 'role: "system"',
    content: "你是客服，可调工具查订单",
    color: "var(--text-secondary)",
    mono: false,
  },
  {
    role: 'role: "user"',
    content: "订单 A123 能退吗？",
    color: "var(--accent)",
    mono: false,
  },
  {
    role: 'role: "assistant" · tool_calls',
    content: 'check_order(id="A123") · content 空',
    color: "var(--warning)",
    mono: true,
  },
  {
    role: 'role: "tool" · tool_call_id',
    content: '{"status":"unopened","day":3}',
    color: "var(--success)",
    mono: true,
  },
  {
    role: 'role: "assistant" · content',
    content: "可以退，未拆封且在 7 天内 🎉",
    color: "var(--accent)",
    mono: false,
  },
];

type ProtoStep = TeachingStep & {
  /** 这一步左侧累积到第几张消息卡（亮 0~count-1）。 */
  msgCount: number;
  /** 右侧状态卡：标题 + 两行说明。 */
  cardTitle: string;
  cardLine1: string;
  cardLine2: string;
  /** 状态卡语义色。 */
  grade: "send" | "model" | "app" | "tool" | "done";
};

const STEPS: readonly ProtoStep[] = [
  {
    label: "request",
    caption:
      "① 发请求：把 messages（system + user）连同 tools 定义一起发给模型（前两张消息卡亮）",
    msgCount: 2,
    cardTitle: "① 发请求",
    cardLine1: "messages = [system, user]，",
    cardLine2: "连同 tools 定义一起发给模型。",
    grade: "send",
  },
  {
    label: "tool-calls",
    caption:
      "② assistant 返回 tool_calls：给出要调的函数名 + arguments(JSON)，content 这时是空的（+assistant 卡）",
    msgCount: 3,
    cardTitle: "② 模型要调工具",
    cardLine1: "assistant 返回结构化的 tool_calls",
    cardLine2: "（name + arguments），content 为空。",
    grade: "model",
  },
  {
    label: "exec",
    caption:
      '③ 我们的代码上场：解析出 arguments、真去执行 check_order("A123")——模型自己从不执行函数',
    msgCount: 3,
    cardTitle: "③ app 执行函数",
    cardLine1: "我们的代码解析 arguments、",
    cardLine2: "真去跑 check_order——模型不执行。",
    grade: "app",
  },
  {
    label: "feedback",
    caption:
      '④ 回填：把结果包成 role:"tool" + 对应的 tool_call_id 的消息，append 回 messages（+tool 卡）',
    msgCount: 4,
    cardTitle: "④ 回填工具结果",
    cardLine1: 'role:"tool" 的消息，带上对应的',
    cardLine2: "tool_call_id，append 回 messages。",
    grade: "tool",
  },
  {
    label: "re-request",
    caption:
      "⑤ 带着刚回填的工具结果，把整份 messages 再发一次给模型（不新增消息，只是再请求）",
    msgCount: 4,
    cardTitle: "⑤ 带结果再请求",
    cardLine1: "把含工具结果的整份 messages",
    cardLine2: "再发一次，让模型据此作答。",
    grade: "send",
  },
  {
    label: "answer",
    caption:
      "⑥ assistant 这次返回 content 终答——往返结束。这一轮 content 才有内容（+终答卡）",
    msgCount: 5,
    cardTitle: "⑥ 终答",
    cardLine1: "这一次 assistant 返回 content 终答，",
    cardLine2: "一次完整的工具调用往返就结束了。",
    grade: "done",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

/** 状态卡语义色映射。 */
function gradeColor(grade: ProtoStep["grade"]): string {
  if (grade === "send") return "var(--accent)";
  if (grade === "model") return "var(--warning)";
  if (grade === "app") return "var(--text-primary)";
  if (grade === "tool") return "var(--success)";
  return "var(--success)"; // done
}

export function ToolCallProtocolDiagram() {
  // 左侧 5 张消息卡。
  const msgRefs = useRef<(SVGGElement | null)[]>(
    Array.from({ length: MSG_CARDS.length }, () => null),
  );
  // 右侧 6 张状态卡。
  const cardRefs = useRef<(SVGGElement | null)[]>(
    Array.from({ length: STEPS.length }, () => null),
  );

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (el: SVGGElement | null, on: boolean, start: number) => {
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

        // 左侧消息卡：累积到 msgCount 张。
        msgRefs.current.forEach((el, m) => {
          fade(el, m < step.msgCount, start);
        });

        // 右侧状态卡：只亮当前这一张。
        cardRefs.current.forEach((el, c) => {
          fade(el, c === i, start);
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
          aria-label="一次工具调用（function calling）完整往返的消息流演示动画，共六步。画面左半边是「messages 消息流」，随每一步往下累积一张张消息卡，每张卡显示它的 role 角色和内容。右半边是「本轮发生了什么」状态卡，用一句人话解释当前这一步。第一步发请求：把 messages，也就是 system 提示加 user 问题，连同 tools 工具定义一起发给模型，左侧前两张卡亮起。第二步模型要调工具：assistant 返回的不是文字，而是结构化的 tool_calls，里面是要调的函数名 check_order 和参数 arguments，这时 content 给用户看的文字是空的——左侧追加一张 assistant 卡。第三步我们的代码上场：解析出 arguments、真去执行 check_order 这个函数，模型自己从不执行任何函数，执行永远是 app 的代码做的。第四步回填：把函数结果包成一条 role 为 tool 的消息，并带上与刚才那次调用对应的 tool_call_id，append 追加回 messages——左侧追加一张 tool 卡。第五步带结果再请求：把含有工具结果的整份 messages 再发一次给模型，不新增消息，只是再请求一次让模型据此作答。第六步终答：assistant 这一次返回的才是 content 终答「可以退，未拆封且在 7 天内」，一次完整的工具调用往返就结束了——左侧追加最后一张终答卡。核心要点：function calling 是一套有固定线路格式的往返协议——assistant 用 tool_calls 表达调用意图、content 此刻为空；app 执行后用 role 为 tool 加 tool_call_id 把结果回填；再请求一次模型才给出 content 终答。可以播放、暂停、单步、拖动进度逐帧观察。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 左侧「messages 消息流」标题 —— */}
          <text
            x={MSG_X + 4}
            y={MSG_TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            💬 messages 消息流（逐步累积）
          </text>
          <text
            x={MSG_X + 4}
            y={MSG_TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            每一步往这份列表里 append 一条
          </text>

          {/* —— 左侧 5 张消息卡（逐步淡入）—— */}
          {MSG_CARDS.map((m, i) => {
            const y = msgCardY(i);
            return (
              <g
                key={`msg-${i}`}
                ref={(el) => {
                  msgRefs.current[i] = el;
                }}
                opacity={HIDDEN}
              >
                <rect
                  x={MSG_X}
                  y={y}
                  width={MSG_W}
                  height={MSG_CARD_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke={m.color}
                  strokeWidth="1.4"
                />
                <text
                  x={MSG_X + 14}
                  y={y + 24}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill={m.color}
                >
                  {m.role}
                </text>
                <text
                  x={MSG_X + 14}
                  y={y + 44}
                  fontSize="11"
                  fontFamily={m.mono ? "var(--font-mono)" : undefined}
                  fill="var(--text-primary)"
                >
                  {m.content}
                </text>
              </g>
            );
          })}

          {/* —— 右侧状态面板标题 —— */}
          <text
            x={PANEL_X}
            y={PANEL_TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            📋 本轮发生了什么
          </text>
          <text
            x={PANEL_X}
            y={PANEL_TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            一次完整往返的线路协议
          </text>

          {/* —— 右侧状态卡底框（固定）—— */}
          <rect
            x={PANEL_X}
            y={STATUS_CARD_Y}
            width={PANEL_W}
            height={STATUS_CARD_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />

          {/* —— 右侧 6 张状态卡（同位叠放，按步交叉淡入）—— */}
          {STEPS.map((step, c) => {
            const color = gradeColor(step.grade);
            const cardCx = PANEL_X + PANEL_W / 2;
            return (
              <g
                key={`status-${c}`}
                ref={(el) => {
                  cardRefs.current[c] = el;
                }}
                opacity={HIDDEN}
              >
                {/* 步号 */}
                <text
                  x={PANEL_X + 24}
                  y={STATUS_CARD_Y + 44}
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--text-secondary)"
                >
                  {`第 ${c + 1} / ${STEPS.length} 步`}
                </text>
                {/* 状态标题（语义色） */}
                <text
                  x={cardCx}
                  y={STATUS_CARD_Y + 132}
                  textAnchor="middle"
                  fontSize="19"
                  fontWeight="700"
                  fill={color}
                >
                  {step.cardTitle}
                </text>
                {/* 语义色横杠 */}
                <rect
                  x={cardCx - 60}
                  y={STATUS_CARD_Y + 152}
                  width={120}
                  height={4}
                  rx="2"
                  fill={color}
                  opacity="0.6"
                />
                {/* 两行说明 */}
                <text
                  x={cardCx}
                  y={STATUS_CARD_Y + 196}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {step.cardLine1}
                </text>
                <text
                  x={cardCx}
                  y={STATUS_CARD_Y + 220}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {step.cardLine2}
                </text>
              </g>
            );
          })}
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一次工具调用（function calling）完整往返：assistant 先用 tool_calls 表达「想调哪个函数」（content 此刻为空）→ app 执行 → 用 role:tool + tool_call_id 回填结果 → 再请求一次，assistant 才返回 content 终答。可暂停、单步、拖进度逐帧看。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        function calling 是一套有固定线路格式的往返协议：assistant 用 tool_calls
        表达调用意图（content 此刻为空）→ app 执行 → role:&quot;tool&quot; +
        tool_call_id 回填 → 再请求一次，模型才给出 content 终答。
      </figcaption>
    </figure>
  );
}
