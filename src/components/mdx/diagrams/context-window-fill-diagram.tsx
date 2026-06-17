"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <ContextWindowFillDiagram>：管理一个会涨的上下文窗口——「填满 → 压缩腾空 → 继续」动画（HEL-304，第 6 章主 viz）。
 *
 * 「可控教学动画」：一根竖直的「窗口容量条」，对话一轮轮往里加，条从底往上逐步填高、
 * 逼近顶部的「token 上限」红线 → 快溢出（顶到红线，亮警告）→ 触发压缩（把最旧几轮
 * 总结成一小段摘要，条腾出空间）→ 继续加新轮。让读者看到「填满 → 压缩腾空 → 继续」
 * 的动态循环，亲眼理解上下文窗口为什么要主动管理。
 * 照第 5 章 PromptRefinementDiagram 的「逐步 + 只动 opacity」模式。
 *
 * 六步：
 *   ① 第 1 轮：条填到底部一格；
 *   ② 第 2-3 轮：填到约一半；
 *   ③ 第 4-5 轮：填到高位，开始逼近红线；
 *   ④ 第 6 轮：顶到红线、快溢出（警告亮起）——再加就要截断丢信息；
 *   ⑤ 触发压缩：把最旧 4 轮总结成一条摘要塞回底部，腾出大半空间（条回落）；
 *   ⑥ 继续加新轮：条又往上填，但离红线还远——循环可以一直转下去。
 *
 * 几何稳定策略（杜绝位移/重排）：每一个会出现的方块都预先放在固定 y、各持一个 ref，
 * 全程只切 opacity 淡入淡出，绝不移动。压缩前后是「两套不同方块」交叉淡入淡出
 * （压缩后底部换成一块摘要块 + 两块保留的近期轮，无空隙），而非把旧块挪位置。
 *
 * 时序铁律照 PromptRefinementDiagram：步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
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

// —— 左侧「窗口容量条」：一根竖直条，从底往上填。 ——
const BAR_X = 80;
const BAR_W = 200;
const BAR_TOP = 56; // 条内可填区顶（红线在这里）
const BAR_BOT = 416; // 条内可填区底（距 viewBox 底 44）
const CELL_H = 52; // 一格（约一轮对话）的高度（6 格约填满整条，逼近红线）
const CELL_INSET = 8; // 方块相对条内壁左右各缩进，避免压边

/** 第 level 格（level 0 = 最底格）的方块顶 y（单一公式）。 */
function cellTop(level: number): number {
  return BAR_BOT - (level + 1) * CELL_H;
}

// —— 右侧「状态」面板：标题 + 当前步说明卡（6 张叠同位）。 ——
const PANEL_X = 332;
const PANEL_W = 364; // 右边界 = 332 + 364 = 696 → 右留白 24
const PANEL_TITLE_Y = 40;
const STATUS_CARD_Y = 56;
const STATUS_CARD_H = 360;

type FillStep = TeachingStep & {
  /** 这一步该亮哪些「压缩前的轮块」（round cell 下标集合）。 */
  rounds: readonly number[];
  /** 这一步是否亮「压缩后那套块」（摘要块 + 两块保留近期轮 + 可选新块数）。 */
  compacted: boolean;
  /** 压缩后额外亮几块新轮（仅 compacted 时有意义：0 或 1）。 */
  newRounds: number;
  /** 是否亮「快溢出」警告。 */
  warn: boolean;
  /** 右侧状态卡：当前发生了什么（标题 + 两行说明）。 */
  cardTitle: string;
  cardLine1: string;
  cardLine2: string;
  /** 状态卡语义色。 */
  grade: "ok" | "warn" | "bad";
};

const STEPS: readonly FillStep[] = [
  {
    label: "r1",
    caption: "① 第 1 轮对话进来，窗口刚填了一点点，离上限远着呢",
    rounds: [0],
    compacted: false,
    newRounds: 0,
    warn: false,
    cardTitle: "对话开始",
    cardLine1: "第 1 轮的问答进了窗口，",
    cardLine2: "占用还很低，空间充裕。",
    grade: "ok",
  },
  {
    label: "r23",
    caption: "② 又聊了第 2、3 轮，历史一轮轮累加，条填到约一半",
    rounds: [0, 1, 2],
    compacted: false,
    newRounds: 0,
    warn: false,
    cardTitle: "历史在累加",
    cardLine1: "每多聊一轮，历史就往里加一块，",
    cardLine2: "窗口填到约一半。",
    grade: "ok",
  },
  {
    label: "r45",
    caption: "③ 第 4、5 轮又加进来，条逼近顶部的 token 上限红线了",
    rounds: [0, 1, 2, 3, 4],
    compacted: false,
    newRounds: 0,
    warn: false,
    cardTitle: "开始逼近上限",
    cardLine1: "历史越堆越高，已经快顶到",
    cardLine2: "上方的 token 上限红线。",
    grade: "warn",
  },
  {
    label: "full",
    caption: "④ 第 6 轮顶到红线、快溢出！再加就要截断、丢信息，还更贵更慢",
    rounds: [0, 1, 2, 3, 4, 5],
    compacted: false,
    newRounds: 0,
    warn: true,
    cardTitle: "快溢出了！",
    cardLine1: "再往里塞，最旧的内容会被截断丢掉，",
    cardLine2: "token 也越烧越多、越来越慢。",
    grade: "bad",
  },
  {
    label: "compact",
    caption: "⑤ 触发压缩：把最旧 4 轮总结成一条摘要塞回底部，腾出大半空间",
    rounds: [],
    compacted: true,
    newRounds: 0,
    warn: false,
    cardTitle: "压缩腾空间",
    cardLine1: "把最旧 4 轮交给模型总结成一条短摘要，",
    cardLine2: "只保留最近两轮原文——窗口一下宽松了。",
    grade: "ok",
  },
  {
    label: "again",
    caption: "⑥ 继续加新一轮，条又往上填，但离红线还远——循环就这样一直转下去",
    rounds: [],
    compacted: true,
    newRounds: 1,
    warn: false,
    cardTitle: "继续往下聊",
    cardLine1: "新一轮加进来，窗口又开始往上填，",
    cardLine2: "但离上限还远。填满→压缩→继续，循环往复。",
    grade: "ok",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

/** 状态卡语义色映射。 */
function gradeColor(grade: FillStep["grade"]): string {
  if (grade === "ok") return "var(--success)";
  if (grade === "warn") return "var(--warning)";
  return "var(--danger)";
}

// 压缩前最多 6 个轮块（level 0~5）。
const ROUND_COUNT = 6;

/** 容量条里一个「方块」（轮块 / 摘要块 / 保留块 / 新块）的静态描述。 */
type Cell = {
  /** 类别，决定它在每一步是否点亮。 */
  kind: "round" | "summary" | "recent" | "new";
  /** 该类别内的序号（round 0~5、recent 0~1；summary/new 恒 0）。 */
  idx: number;
  /** 底部堆叠层（level 0 = 最底格）。 */
  level: number;
  /** 跨几格高（摘要块 = 2，其余 = 1）。 */
  span: number;
  /** 块内文字。 */
  label: string;
  /** 语义色。 */
  color: string;
};

/** 所有会出现的方块（全程固定位置，仅切 opacity；含压缩前后两套，交叉淡入淡出）。 */
const CELLS: readonly Cell[] = [
  // 压缩前 6 个轮块（level 0~5，从底往上）。
  ...Array.from({ length: ROUND_COUNT }, (_, r) => ({
    kind: "round" as const,
    idx: r,
    level: r,
    span: 1,
    label: `第 ${r + 1} 轮`,
    color: "var(--info)",
  })),
  // 压缩后：摘要块（占底部 level 0~1 两格高）。
  {
    kind: "summary",
    idx: 0,
    level: 0,
    span: 2,
    label: "📝 旧 4 轮的摘要",
    color: "var(--success)",
  },
  // 压缩后：保留的两块近期轮（level 2、3）。
  {
    kind: "recent",
    idx: 0,
    level: 2,
    span: 1,
    label: "最近一轮",
    color: "var(--info)",
  },
  {
    kind: "recent",
    idx: 1,
    level: 3,
    span: 1,
    label: "最近第二轮",
    color: "var(--info)",
  },
  // 压缩后继续加的新块（level 4）。
  {
    kind: "new",
    idx: 0,
    level: 4,
    span: 1,
    label: "新一轮",
    color: "var(--accent)",
  },
];

/** 某方块在某一步是否点亮。 */
function cellLit(cell: Cell, step: FillStep): boolean {
  if (cell.kind === "round") return step.rounds.includes(cell.idx);
  if (cell.kind === "summary") return step.compacted;
  if (cell.kind === "recent") return step.compacted;
  return step.compacted && step.newRounds > 0; // new
}

export function ContextWindowFillDiagram() {
  // 容量条里全部方块（压缩前后两套同位叠放，仅切 opacity）。
  const cellRefs = useRef<(SVGGElement | null)[]>(
    Array.from({ length: CELLS.length }, () => null),
  );
  // 快溢出警告（红线旁徽标）。
  const warnRef = useRef<SVGGElement | null>(null);
  // 6 张右侧状态卡（同位叠放）。
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

        // 容量条方块：按 cellLit 判定该步点亮哪些。
        cellRefs.current.forEach((el, c) => {
          fade(el, cellLit(CELLS[c], step), start);
        });

        // 警告徽标。
        fade(warnRef.current, step.warn, start);

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
          aria-label="管理一个会涨的上下文窗口的演示动画，共六步。画面左半边是一根竖直的「窗口容量条」，对话一轮轮往里加，方块从底往上堆；条顶部有一条红色的「token 上限」红线。右半边是一张状态卡，说明当前发生了什么。第一步：第 1 轮对话进来，窗口只填了最底下一格，离上限远着呢，空间充裕。第二步：又聊了第 2、3 轮，历史一轮轮累加，条填到约一半。第三步：第 4、5 轮又加进来，条往上堆，开始逼近顶部的 token 上限红线。第四步：第 6 轮顶到了红线、快溢出，警告亮起——这时再往里加，最旧的内容就会被截断丢掉，token 也越烧越多、越来越慢。第五步：触发压缩，把最旧的 4 轮交给模型总结成一条短摘要塞回底部，只保留最近两轮原文，窗口一下腾出大半空间、回落到低位。第六步：继续加新一轮，条又开始往上填，但离红线还远——填满、压缩腾空、继续，这个循环就这样一直转下去。核心要点：上下文窗口是固定大小的，历史会一直涨、迟早顶到上限；与其被动等它溢出截断，不如主动压缩——把老历史总结成摘要腾出空间，让最该看的内容始终留在模型眼前。可以播放、暂停、单步、拖动进度逐帧观察。"
          className="mx-auto block h-auto w-full max-w-[720px]"
        >
          {/* —— 左侧标题 —— */}
          <text
            x={BAR_X}
            y={32}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            🪟 窗口容量条（从底往上填）
          </text>

          {/* —— 容量条外框 —— */}
          <rect
            x={BAR_X}
            y={BAR_TOP}
            width={BAR_W}
            height={BAR_BOT - BAR_TOP}
            rx="10"
            fill="var(--bg)"
            stroke="var(--border)"
            strokeWidth="1.6"
          />

          {/* —— token 上限红线（条顶内壁）—— */}
          <line
            x1={BAR_X - 4}
            y1={BAR_TOP}
            x2={BAR_X + BAR_W + 4}
            y2={BAR_TOP}
            stroke="var(--danger)"
            strokeWidth="2.4"
          />
          <text
            x={BAR_X + BAR_W + 8}
            y={BAR_TOP + 4}
            fontSize="11"
            fontWeight="700"
            fill="var(--danger)"
          >
            ← token 上限
          </text>

          {/* —— 容量条里全部方块（压缩前 6 轮块 + 压缩后摘要/保留/新块，同位叠放，按步交叉淡入）—— */}
          {CELLS.map((cell, c) => {
            const h = cell.span * CELL_H - 8; // 留 8px 行间缝
            const top = cellTop(cell.level + cell.span - 1) + 4;
            return (
              <g
                key={`cell-${cell.kind}-${cell.idx}`}
                ref={(el) => {
                  cellRefs.current[c] = el;
                }}
                opacity={HIDDEN}
              >
                <rect
                  x={BAR_X + CELL_INSET}
                  y={top}
                  width={BAR_W - CELL_INSET * 2}
                  height={h}
                  rx="6"
                  fill={cell.color}
                  opacity="0.28"
                />
                <rect
                  x={BAR_X + CELL_INSET}
                  y={top}
                  width={BAR_W - CELL_INSET * 2}
                  height={h}
                  rx="6"
                  fill="none"
                  stroke={cell.color}
                  strokeWidth="1.4"
                />
                <text
                  x={BAR_X + BAR_W / 2}
                  y={top + h / 2 + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={cell.color}
                >
                  {cell.label}
                </text>
              </g>
            );
          })}

          {/* —— 快溢出警告徽标（红线下方居中）—— */}
          <g ref={warnRef} opacity={HIDDEN}>
            <rect
              x={BAR_X + BAR_W / 2 - 64}
              y={BAR_TOP + 8}
              width={128}
              height={28}
              rx="14"
              fill="var(--danger)"
              opacity="0.18"
            />
            <text
              x={BAR_X + BAR_W / 2}
              y={BAR_TOP + 26}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--danger)"
            >
              ⚠ 快溢出！
            </text>
          </g>

          {/* —— 右侧状态面板标题 —— */}
          <text
            x={PANEL_X}
            y={PANEL_TITLE_Y - 8}
            fontSize="13"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            📋 这一步发生了什么
          </text>

          {/* —— 右侧状态卡底框（固定，不随步变）—— */}
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
                {/* 步号徽标 */}
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
                  fontSize="20"
                  fontWeight="700"
                  fill={color}
                >
                  {step.cardTitle}
                </text>
                {/* 一条语义色横杠分隔 */}
                <rect
                  x={cardCx - 64}
                  y={STATUS_CARD_Y + 156}
                  width={128}
                  height={4}
                  rx="2"
                  fill={color}
                  opacity="0.6"
                />
                {/* 两行说明 */}
                <text
                  x={cardCx}
                  y={STATUS_CARD_Y + 200}
                  textAnchor="middle"
                  fontSize="13"
                  fill="var(--text-primary)"
                >
                  {step.cardLine1}
                </text>
                <text
                  x={cardCx}
                  y={STATUS_CARD_Y + 226}
                  textAnchor="middle"
                  fontSize="13"
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
          caption="点击播放，看一个上下文窗口怎么「填满 → 压缩腾空 → 继续」：对话一轮轮往里加，条逼近 token 上限红线，快溢出时触发压缩把老历史总结成一小段、腾出空间，再继续。可暂停、单步、拖进度逐帧看。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        上下文窗口大小固定，历史会一直涨、迟早顶到上限。与其被动等它溢出截断，不如主动压缩——把老历史总结成摘要腾出空间，让最该看的内容始终留在模型眼前。
      </figcaption>
    </figure>
  );
}
