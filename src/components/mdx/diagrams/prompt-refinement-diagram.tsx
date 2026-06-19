"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <PromptRefinementDiagram>：逐步精化一个提示的「左右两栏 + 逐步」动画（HEL-303，第 5 章主 viz）。
 *
 * 「可控教学动画」：把「提示一块块变好」和「输出随之变好」对起来 ——
 *   左侧六个提示部件槽（① 模糊提示 → ② +角色 → ③ +上下文 → ④ +约束 →
 *   ⑤ +少样本示例 → ⑥ +输出格式）逐步累积点亮；
 *   右侧六张「当前输出」卡叠在同一位置，每步只亮当前这一张（交叉淡入），
 *   让读者看到输出从「跑题/含糊」一路变到「精准/规整」；
 *   右下角一条「质量条」随步加长，给出直观的「越改越好」反馈。
 * 这是 A 概念型的「提示工程增益」主 viz，照第 4 章 AgentRunTraceDiagram 的「左右两栏 + 逐步」模式。
 *
 * 任务：「写一句给老顾客的退货提醒」——六步逐步精化：
 *   ① 模糊提示「写点东西」→ 输出跑题；
 *   ② +角色（你是资深客服）→ 口吻对了，但没说退什么；
 *   ③ +上下文（退货政策 + 这位顾客）→ 有内容了，但啰嗦；
 *   ④ +约束（≤ 30 字、礼貌）→ 短了、得体了；
 *   ⑤ +少样本示例（给一条范例）→ 风格对版了；
 *   ⑥ +输出格式（一句话 + 一个行动按钮文案）→ 精准规整、可直接用。
 *
 * 几何稳定策略（杜绝位移/重排）：左侧 6 个部件槽位置固定、逐步淡入；右侧 6 张输出卡
 * 叠在同一矩形里、按当前步交叉淡入（同一时刻只 1 张可见）；质量条 6 段固定、逐段淡入。
 * 全程只动 opacity，无位移。
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
const VIEW_H = 460;

// 透明度常量（具名，禁魔法数字）。
const SHOWN = 1;
const HIDDEN = 0;

// —— 左侧「提示」面板：标题 + 6 个部件槽。 ——
const PROMPT_X = 24;
const PROMPT_W = 320;
const PANEL_TITLE_Y = 44;
const SLOT_H = 52;
const SLOT_Y0 = 72; // 第 0 槽顶
const SLOT_GAP = 10;

/** 第 i 个提示部件槽左上角 y（单一公式）。 */
function slotY(i: number): number {
  return SLOT_Y0 + i * (SLOT_H + SLOT_GAP);
}

// —— 右侧「输出」面板：标题 + 单张输出卡区（6 张叠同位）+ 质量条。 ——
const OUT_X = 376;
const OUT_W = 320;
const OUT_CARD_Y = 72;
const OUT_CARD_H = 232;

// 质量条：6 段，单一 x 公式（在右栏底部）。
const BAR_Y = 360;
const BAR_H = 20;
const BAR_SEG_W = 44;
const BAR_SEG_GAP = 8;
const BAR_X0 = OUT_X;
/** 第 i 段质量条左上角 x（单一公式）。末段右边界 = 376 + 5*52 + 44 = 680 → 右留白 40。 */
function barX(i: number): number {
  return BAR_X0 + i * (BAR_SEG_W + BAR_SEG_GAP);
}

type PromptPart = {
  /** 部件标签（左侧槽标题） */
  tag: string;
  /** 这一步给提示加进去的具体内容 */
  text: string;
};

/** 左侧 6 个提示部件（逐步累加）。 */
const PROMPT_PARTS: readonly PromptPart[] = [
  { tag: "① 模糊提示", text: "「写点东西」" },
  { tag: "② + 角色", text: "你是资深电商客服" },
  { tag: "③ + 上下文", text: "退货政策 + 这位老顾客的信息" },
  { tag: "④ + 约束", text: "≤ 30 字、礼貌、别催" },
  { tag: "⑤ + 少样本示例", text: "给 1 条达标的范例照着学" },
  { tag: "⑥ + 输出格式", text: "一句话 + 一个按钮文案" },
];

type OutCard = {
  /** 这一步的输出文本（两行内） */
  line1: string;
  line2: string;
  /** 一句话评价 */
  verdict: string;
  /** 评价用语义色：good=绿、warn=黄、bad=红 */
  grade: "bad" | "warn" | "good";
};

/** 右侧 6 张「当前输出」卡（同位叠放，按步交叉淡入）。 */
const OUT_CARDS: readonly OutCard[] = [
  {
    line1: "「今天天气不错，",
    line2: "祝您生活愉快！」",
    verdict: "✗ 跑题：没提退货",
    grade: "bad",
  },
  {
    line1: "「您好，我是客服，",
    line2: "有问题随时找我～」",
    verdict: "△ 口吻对了，但没说退什么",
    grade: "warn",
  },
  {
    line1: "「关于您 7 天前那笔订单，",
    line2: "按政策仍在可退期内，详情如下……」",
    verdict: "△ 有内容了，但太啰嗦",
    grade: "warn",
  },
  {
    line1: "「您那单还在 7 天可退期内，",
    line2: "需要的话我帮您办～」",
    verdict: "△ 短了、得体了，风格还没定",
    grade: "warn",
  },
  {
    line1: "「亲，您那单仍可退，",
    line2: "随时戳我帮您办理 🙂」",
    verdict: "○ 风格对版了，差个落点",
    grade: "good",
  },
  {
    line1: "「亲，您那单仍在可退期内～」",
    line2: "[按钮：一键申请退货]",
    verdict: "✓ 精准规整，可直接用",
    grade: "good",
  },
];

type RefineStep = TeachingStep & {
  /** 左侧提示已累积到几块（1~6）。 */
  partCount: number;
  /** 右侧当前显示第几张输出卡（0~5）。 */
  outIdx: number;
  /** 质量条已点亮到几段（1~6）。 */
  barCount: number;
};

const STEPS: readonly RefineStep[] = [
  {
    label: "vague",
    caption:
      "① 模糊提示：只丢一句「写点东西」，模型不知道要干嘛，输出直接跑题（质量最低）",
    partCount: 1,
    outIdx: 0,
    barCount: 1,
  },
  {
    label: "role",
    caption:
      "② 加角色：告诉它「你是资深电商客服」，口吻立刻对了——但还没说要退什么",
    partCount: 2,
    outIdx: 1,
    barCount: 2,
  },
  {
    label: "context",
    caption:
      "③ 加上下文：把退货政策 + 这位老顾客的信息喂进去，终于有内容了——可惜太啰嗦",
    partCount: 3,
    outIdx: 2,
    barCount: 3,
  },
  {
    label: "constraint",
    caption:
      "④ 加约束：限定「≤ 30 字、礼貌、别催」，输出短了、也得体了——只是风格还没定",
    partCount: 4,
    outIdx: 3,
    barCount: 4,
  },
  {
    label: "fewshot",
    caption:
      "⑤ 加少样本示例：给 1 条达标范例让它照着学，风格一下对版了——就差个落点",
    partCount: 5,
    outIdx: 4,
    barCount: 5,
  },
  {
    label: "format",
    caption:
      "⑥ 加输出格式：要求「一句话 + 一个按钮文案」，输出精准规整、可直接上线（质量拉满）",
    partCount: 6,
    outIdx: 5,
    barCount: 6,
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

/** 语义色映射（输出卡评价 + 质量条用）。 */
function gradeColor(grade: OutCard["grade"]): string {
  if (grade === "good") return "var(--success)";
  if (grade === "warn") return "var(--warning)";
  return "var(--danger)";
}

export function PromptRefinementDiagram() {
  // 6 个提示部件槽。
  const slotRefs = useRef<(SVGGElement | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  // 6 张输出卡（同位叠放）。
  const outRefs = useRef<(SVGGElement | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  // 6 段质量条。
  const barRefs = useRef<(SVGRectElement | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

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

        // 左侧提示槽：累积点亮（s < partCount 的槽亮）。
        slotRefs.current.forEach((el, s) => {
          fade(el, s < step.partCount, start);
        });

        // 右侧输出卡：只亮当前这一张（交叉淡入，其余淡出）。
        outRefs.current.forEach((el, o) => {
          fade(el, o === step.outIdx, start);
        });

        // 质量条：累积点亮（b < barCount 的段亮）。
        barRefs.current.forEach((el, b) => {
          fade(el, b < step.barCount, start);
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
          aria-label="逐步精化一个提示的演示动画。任务是「写一句给老顾客的退货提醒」。画面左半边是「提示」面板，自上而下六个部件槽会逐步累积点亮；右半边是「输出」面板，每一步换上一张当前输出卡，下方还有一条质量条随步加长。共六步。第一步只给一句模糊提示「写点东西」，模型不知道要干嘛，输出跑题成「今天天气不错，祝您生活愉快」，质量最低。第二步加角色「你是资深电商客服」，口吻对了，但还没说退什么。第三步加上下文，把退货政策和这位老顾客的信息喂进去，终于有内容了，可惜太啰嗦。第四步加约束，限定不超过三十字、礼貌、别催，输出短了也得体了，只是风格还没定。第五步加少样本示例，给一条达标范例让它照着学，风格一下对版了，就差个落点。第六步加输出格式，要求一句话加一个按钮文案，输出变成「亲，您那单仍在可退期内」配一个一键申请退货按钮，精准规整、可直接上线，质量拉满。核心要点：提示工程不是一句话定胜负，而是一块块往上加部件——每加一块角色、上下文、约束、示例、格式，输出就好一截，质量条就长一段。这就是「逐步精化一个提示」带来的增益。可以播放、暂停、单步、拖动进度逐帧观察。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 左侧「提示」面板标题 —— */}
          <text
            x={PROMPT_X + 4}
            y={PANEL_TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            📝 提示（一块块往上加）
          </text>
          <text
            x={PROMPT_X + 4}
            y={PANEL_TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            高亮 = 这一步新加进去的部件
          </text>

          {/* —— 左侧 6 个提示部件槽（逐步淡入）—— */}
          {PROMPT_PARTS.map((p, i) => {
            const y = slotY(i);
            return (
              <g
                key={`prompt-slot-${i}`}
                ref={(el) => {
                  slotRefs.current[i] = el;
                }}
                opacity={HIDDEN}
              >
                <rect
                  x={PROMPT_X}
                  y={y}
                  width={PROMPT_W}
                  height={SLOT_H}
                  rx="8"
                  fill="var(--bg)"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                />
                <text
                  x={PROMPT_X + 14}
                  y={y + 22}
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--accent)"
                >
                  {p.tag}
                </text>
                <text
                  x={PROMPT_X + 14}
                  y={y + 40}
                  fontSize="11"
                  fontFamily="var(--font-mono)"
                  fill="var(--text-primary)"
                >
                  {p.text}
                </text>
              </g>
            );
          })}

          {/* —— 右侧「输出」面板标题 —— */}
          <text
            x={OUT_X + 4}
            y={PANEL_TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            💬 输出（随之变好）
          </text>
          <text
            x={OUT_X + 4}
            y={PANEL_TITLE_Y + 8}
            fontSize="10"
            fill="var(--text-secondary)"
          >
            每加一块，模型的回答就好一截
          </text>

          {/* —— 右侧输出卡底框（固定，不随步变；卡内容叠放在上）—— */}
          <rect
            x={OUT_X}
            y={OUT_CARD_Y}
            width={OUT_W}
            height={OUT_CARD_H}
            rx="12"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.4"
          />

          {/* —— 右侧 6 张输出卡（同位叠放，按步交叉淡入）—— */}
          {OUT_CARDS.map((c, o) => {
            const color = gradeColor(c.grade);
            return (
              <g
                key={`out-card-${o}`}
                ref={(el) => {
                  outRefs.current[o] = el;
                }}
                opacity={HIDDEN}
              >
                {/* 当前步标号徽标 */}
                <text
                  x={OUT_X + 16}
                  y={OUT_CARD_Y + 32}
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--text-secondary)"
                >
                  {`第 ${o + 1} 版输出`}
                </text>
                {/* 输出气泡 */}
                <rect
                  x={OUT_X + 16}
                  y={OUT_CARD_Y + 48}
                  width={OUT_W - 32}
                  height={88}
                  rx="8"
                  fill="var(--bg-elevated)"
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={OUT_X + 28}
                  y={OUT_CARD_Y + 80}
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {c.line1}
                </text>
                <text
                  x={OUT_X + 28}
                  y={OUT_CARD_Y + 108}
                  fontSize="12"
                  fill="var(--text-primary)"
                >
                  {c.line2}
                </text>
                {/* 评价条 */}
                <rect
                  x={OUT_X + 16}
                  y={OUT_CARD_Y + 156}
                  width={OUT_W - 32}
                  height={44}
                  rx="8"
                  fill="var(--bg-elevated)"
                  stroke={color}
                  strokeWidth="1.6"
                />
                <text
                  x={OUT_X + 28}
                  y={OUT_CARD_Y + 183}
                  fontSize="12"
                  fontWeight="700"
                  fill={color}
                >
                  {c.verdict}
                </text>
              </g>
            );
          })}

          {/* —— 右下角质量条标签 —— */}
          <text
            x={OUT_X + 4}
            y={BAR_Y - 10}
            fontSize="11"
            fontWeight="700"
            fill="var(--text-secondary)"
          >
            质量条（越改越长）
          </text>

          {/* —— 质量条 6 段（逐段淡入）—— */}
          {OUT_CARDS.map((c, i) => (
            <rect
              key={`bar-seg-${i}`}
              ref={(el) => {
                barRefs.current[i] = el;
              }}
              x={barX(i)}
              y={BAR_Y}
              width={BAR_SEG_W}
              height={BAR_H}
              rx="4"
              fill={gradeColor(c.grade)}
              opacity={HIDDEN}
            />
          ))}
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看一个提示从「模糊」一步步精化到「可直接用」：左边每加一块部件（角色 / 上下文 / 约束 / 示例 / 格式），右边的输出就好一截、质量条就长一段。可暂停、单步、拖进度逐帧看。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        逐步精化一个提示：左侧提示一块块往上加部件，右侧输出从「跑题/含糊」一路变到「精准/规整」。提示工程的增益，就是这样一块块攒出来的。
      </figcaption>
    </figure>
  );
}
