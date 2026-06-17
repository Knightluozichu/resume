"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <FunctionCallingDecisionDiagram>：模型「怎么在工具菜单里挑中一个」的决策动画（HEL-314，第 8 章主 viz）。
 *
 * 「可控教学动画」：把 function calling 的**模型侧决策**一步步演出来——这区别于第 7 章
 * ToolCallProtocolDiagram 演的「消息往返协议」。本图只盯一件事：模型拿到用户意图 + 一份工具菜单后，
 * 它**凭什么、怎么**从菜单里挑中（或都不挑）某个工具。
 *   左侧「工具菜单」面板：3 个工具项（名字 + 一句 description），随步给每项画一条「匹配度」小条，
 *     比对阶段三条都亮、定夺阶段最匹配的那条点亮高亮、其余压暗；
 *   右侧「这一步在想什么」状态卡：一句人话解释当前这一步。
 * 照第 7 章 ToolCallProtocolDiagram 的「左面板 + 右状态卡 + 只动 opacity」模式。
 *
 * 五步：
 *   ① 收到请求：用户意图 +「工具菜单」（N 工具）一起进入模型视野；
 *   ② 读意图：模型先读懂用户到底想要什么（「我的快递到哪了」= 想查订单状态）；
 *   ③ 逐个比对：拿意图去对每个工具的 description，给出匹配度（菜单三项的匹配条都亮起）；
 *   ④ 挑中：最匹配的 check_order 被点亮（若都不匹配→不调、直接答，状态卡里点出这条兜底）；
 *   ⑤ 产出调用意图：模型给出「调 check_order(order_id=...)」——注意这只是**意图**，执行由 app 做。
 *
 * 几何稳定策略（杜绝位移/重排）：左侧 3 个工具项位置固定、各自的「匹配条」逐步淡入 / 高亮切换，
 * 全程只切 opacity；右侧 5 张状态卡同位叠放交叉淡入。匹配条用「底条 + 高亮覆盖条」两层，
 * 高亮层与底条同位、同宽高（落入 svg-check「同位叠加范式」白名单，不报 rect 重叠）。
 *
 * 时序铁律照 ToolCallProtocolDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
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
const VIEW_H = 432;

// 透明度常量（具名，禁魔法数字）。
const SHOWN = 1;
const HIDDEN = 0;
const DIMMED = 0.32; // 落选工具压暗

// —— 顶部「用户意图」横条（贯通左右，作为每步的输入）。 ——
const INTENT_X = 24;
const INTENT_W = 672; // 右边界 = 24 + 672 = 696 → 右留白 24
const INTENT_Y = 48;
const INTENT_H = 44;

// —— 左侧「工具菜单」面板：标题 + 3 个工具项（竖直堆叠）。 ——
const MENU_X = 24;
const MENU_W = 348;
const MENU_TITLE_Y = 128;
const TOOL_H = 64;
const TOOL_Y0 = 152; // 第 0 项顶
const TOOL_GAP = 14;

/** 第 i 个工具项左上角 y（单一公式）。底项底 = 152 + 2*78 + 64 = 372 → 距底 60。 */
function toolY(i: number): number {
  return TOOL_Y0 + i * (TOOL_H + TOOL_GAP);
}

// 匹配条（每个工具项右侧）：底条 + 高亮覆盖条同位。
const BAR_W = 96;
const BAR_H = 12;
const BAR_X = MENU_X + MENU_W - BAR_W - 16;

// —— 右侧「这一步在想什么」面板：标题 + 当前步状态卡（5 张叠同位）。 ——
const PANEL_X = 396;
const PANEL_W = 300; // 右边界 = 396 + 300 = 696 → 右留白 24
const PANEL_TITLE_Y = 128;
const STATUS_CARD_Y = 152;
const STATUS_CARD_H = 220; // 底 = 152 + 220 = 372 → 距底 60，与左对齐

type Tool = {
  /** 工具名（等宽） */
  name: string;
  /** 一句 description（模型比对的依据） */
  desc: string;
};

/** 左侧 3 个工具（一个客服 agent 的菜单）。 */
const TOOLS: readonly Tool[] = [
  { name: "check_order", desc: "查订单状态：到货 / 退货" },
  { name: "get_weather", desc: "查某城市实时天气" },
  { name: "search_docs", desc: "搜帮助文档 / 政策" },
];

/** 命中工具的下标（与用户意图「快递到哪了」最匹配的是 check_order）。 */
const WINNER = 0;

type DecisionStep = TeachingStep & {
  /** 各工具「匹配条」此步是否可见（按工具下标）。 */
  barsVisible: boolean;
  /** 此步是否进入「定夺」——只让 WINNER 亮、其余压暗。 */
  decided: boolean;
  /** 右侧状态卡：标题 + 两行说明。 */
  cardTitle: string;
  cardLine1: string;
  cardLine2: string;
  /** 状态卡语义色。 */
  grade: "in" | "read" | "match" | "pick" | "emit";
};

const STEPS: readonly DecisionStep[] = [
  {
    label: "request",
    caption:
      "① 收到请求：用户意图和「工具菜单」（这里有 3 个工具）一起进入模型视野——模型还没开始挑",
    barsVisible: false,
    decided: false,
    cardTitle: "① 进入视野",
    cardLine1: "用户的话 + 整份工具菜单",
    cardLine2: "一起送进模型这一轮的上下文。",
    grade: "in",
  },
  {
    label: "read-intent",
    caption:
      "② 读意图：模型先读懂用户到底想要什么——「我的快递到哪了」其实是想查订单状态",
    barsVisible: false,
    decided: false,
    cardTitle: "② 读懂意图",
    cardLine1: "「我的快递到哪了」",
    cardLine2: "→ 想知道：这单的物流状态。",
    grade: "read",
  },
  {
    label: "match",
    caption:
      "③ 逐个比对：拿这份意图去对每个工具的 description，看哪句话最贴——三条匹配度都亮出来",
    barsVisible: true,
    decided: false,
    cardTitle: "③ 逐个比对描述",
    cardLine1: "把意图和每个工具的那句",
    cardLine2: "description 对一遍，估匹配度。",
    grade: "match",
  },
  {
    label: "pick",
    caption:
      "④ 挑中：check_order 的描述「查订单状态」最贴意图，胜出；其余压暗。（若都不贴 → 不调，直接答）",
    barsVisible: true,
    decided: true,
    cardTitle: "④ 挑中最贴的",
    cardLine1: "check_order 的描述最贴意图，",
    cardLine2: "胜出。都不贴时则直接答、不调。",
    grade: "pick",
  },
  {
    label: "emit",
    caption:
      "⑤ 产出调用意图：模型给出「调 check_order(order_id=…)」——这只是意图，真去执行的是 app 的代码",
    barsVisible: true,
    decided: true,
    cardTitle: "⑤ 产出调用意图",
    cardLine1: "提议 check_order(order_id=…)。",
    cardLine2: "模型只提议，执行交给 app。",
    grade: "emit",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

/** 状态卡语义色映射。 */
function gradeColor(grade: DecisionStep["grade"]): string {
  if (grade === "in") return "var(--accent)";
  if (grade === "read") return "var(--accent)";
  if (grade === "match") return "var(--warning)";
  if (grade === "pick") return "var(--success)";
  return "var(--success)"; // emit
}

export function FunctionCallingDecisionDiagram() {
  // 左侧 3 个工具项的整组（用于压暗落选）。
  const toolRefs = useRef<(SVGGElement | null)[]>(
    Array.from({ length: TOOLS.length }, () => null),
  );
  // 各工具的匹配条整组（底条 + 高亮覆盖）。
  const barRefs = useRef<(SVGGElement | null)[]>(
    Array.from({ length: TOOLS.length }, () => null),
  );
  // 右侧 5 张状态卡。
  const cardRefs = useRef<(SVGGElement | null)[]>(
    Array.from({ length: STEPS.length }, () => null),
  );

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      const fade = (
        el: SVGGElement | null,
        toOpacity: number,
        start: number,
      ) => {
        if (!el) return;
        tl.add(
          el,
          {
            opacity: toOpacity,
            duration: TEACHING_BEAT_MS,
            ease: "inOut(2)",
          },
          start,
        );
      };

      STEPS.forEach((step, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        // 左侧工具项：定夺后只让 WINNER 全亮、其余压暗；否则全亮。
        toolRefs.current.forEach((el, t) => {
          const op = step.decided && t !== WINNER ? DIMMED : SHOWN;
          fade(el, op, start);
        });

        // 匹配条：比对阶段起淡入；定夺后落选者随工具一起压暗（条本身保持显示，靠父项透明度压）。
        barRefs.current.forEach((el, b) => {
          fade(el, step.barsVisible ? SHOWN : HIDDEN, start);
        });

        // 右侧状态卡：只亮当前这一张。
        cardRefs.current.forEach((el, c) => {
          fade(el, c === i ? SHOWN : HIDDEN, start);
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
          aria-label="模型怎么在工具菜单里挑中一个工具的决策演示动画，共五步。这演的是 function calling 的模型侧决策，区别于工具调用的消息往返协议。画面顶部是一条「用户意图」横条：我的快递到哪了。左半边是「工具菜单」面板，三个工具，每个有名字和一句 description 描述：check_order「查订单状态，到货或退货」、get_weather「查某城市实时天气」、search_docs「搜帮助文档或政策」，每个工具右侧还有一条匹配度小条。右半边是「这一步在想什么」状态卡，用一句人话解释当前这一步。第一步进入视野：用户的话和整份工具菜单一起送进模型这一轮的上下文，模型还没开始挑。第二步读懂意图：模型先读懂用户到底想要什么，「我的快递到哪了」其实是想知道这单的物流状态。第三步逐个比对描述：模型拿这份意图去对每个工具的 description，看哪句话最贴，三条匹配度都亮出来。第四步挑中最贴的：check_order 的描述「查订单状态」最贴意图，胜出，其余两个工具压暗；如果所有工具都不贴意图，模型就不调任何工具、直接用文字回答。第五步产出调用意图：模型给出「调 check_order，参数 order_id」，但这只是一个调用意图，真正去执行函数的是 app 的代码。核心要点：模型挑工具靠的是拿用户意图逐个比对每个工具的 description 描述，描述写得清不清楚、贴不贴意图，直接决定模型挑得准不准；而模型自始至终只产出调用意图，从不自己执行。可以播放、暂停、单步、拖动进度逐帧观察。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 顶部「用户意图」横条 —— */}
          <rect
            x={INTENT_X}
            y={INTENT_Y}
            width={INTENT_W}
            height={INTENT_H}
            rx="8"
            fill="var(--accent-glow)"
            stroke="var(--accent)"
            strokeWidth="1.6"
          />
          <text
            x={INTENT_X + 16}
            y={INTENT_Y + 27}
            fontSize="12"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🗣️ 用户意图：「我的快递到哪了？」
          </text>

          {/* —— 左侧「工具菜单」面板标题 —— */}
          <text
            x={MENU_X + 4}
            y={MENU_TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            📋 工具菜单（模型在里头挑）
          </text>
          <text
            x={MENU_X + 4}
            y={MENU_TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            右侧小条 = 与意图的匹配度
          </text>

          {/* —— 左侧 3 个工具项（含匹配条）—— */}
          {TOOLS.map((t, i) => {
            const y = toolY(i);
            const isWinner = i === WINNER;
            const barColor = isWinner ? "var(--success)" : "var(--text-secondary)";
            // 高亮条长度：胜者满格，其余半格示意（静态宽度，不做补间）。
            const litW = isWinner ? BAR_W : BAR_W * 0.4;
            return (
              <g
                key={`tool-${t.name}`}
                ref={(el) => {
                  toolRefs.current[i] = el;
                }}
                opacity={SHOWN}
              >
                <rect
                  x={MENU_X}
                  y={y}
                  width={MENU_W}
                  height={TOOL_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.4"
                />
                <text
                  x={MENU_X + 14}
                  y={y + 26}
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                  fill="var(--accent)"
                >
                  {t.name}
                </text>
                <text
                  x={MENU_X + 14}
                  y={y + 48}
                  fontSize="11"
                  fill="var(--text-primary)"
                >
                  {t.desc}
                </text>
                {/* 匹配条（底条 + 高亮覆盖条，同位叠加；整组随步淡入） */}
                <g
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                  opacity={HIDDEN}
                >
                  <rect
                    x={BAR_X}
                    y={y + 44}
                    width={BAR_W}
                    height={BAR_H}
                    rx="4"
                    fill="var(--border)"
                  />
                  <rect
                    x={BAR_X}
                    y={y + 44}
                    width={litW}
                    height={BAR_H}
                    rx="4"
                    fill={barColor}
                  />
                </g>
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
            🧠 这一步在想什么
          </text>
          <text
            x={PANEL_X}
            y={PANEL_TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            模型侧的挑选过程
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

          {/* —— 右侧 5 张状态卡（同位叠放，按步交叉淡入）—— */}
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
                  x={PANEL_X + 20}
                  y={STATUS_CARD_Y + 32}
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--text-secondary)"
                >
                  {`第 ${c + 1} / ${STEPS.length} 步`}
                </text>
                {/* 状态标题（语义色） */}
                <text
                  x={cardCx}
                  y={STATUS_CARD_Y + 92}
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  fill={color}
                >
                  {step.cardTitle}
                </text>
                {/* 语义色横杠 */}
                <rect
                  x={cardCx - 56}
                  y={STATUS_CARD_Y + 108}
                  width={112}
                  height={4}
                  rx="2"
                  fill={color}
                  opacity="0.6"
                />
                {/* 两行说明 */}
                <text
                  x={cardCx}
                  y={STATUS_CARD_Y + 148}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {step.cardLine1}
                </text>
                <text
                  x={cardCx}
                  y={STATUS_CARD_Y + 172}
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
          caption="点击播放，看模型怎么在工具菜单里挑中一个：读懂用户意图 → 拿意图逐个比对每个工具的 description → 挑中最贴的那个（都不贴就直接答、不调）→ 产出调用意图（执行交给 app）。可暂停、单步、拖进度逐帧看。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        模型挑工具，靠的是拿用户意图逐个比对每个工具的
        description——那句描述写得清不清、贴不贴意图，直接决定它挑得准不准；而它自始至终只「提议」调用，从不自己执行。
      </figcaption>
    </figure>
  );
}
