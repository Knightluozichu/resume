"use client";

import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <AaSamplingStepsDiagram>：「一次采样」分步可控教学动画旗舰图（HEL-294，采样与解码章）。
 *
 * 演一次采样从头到尾五步，每步一张「阶段卡」，含一组迷你条形图展示该步分布长什么样：
 *   ① 原始 logits（模型吐出的原始分数，有正有负）
 *   ② softmax 成概率（归一成一摞和为 1 的概率）
 *   ③ 按温度重塑（这里画「高温→变平」，对比第②步更均匀）
 *   ④ top-p 截断（砍掉尾巴，只留头部累积到 p 的候选）
 *   ⑤ 掷骰子抽中一个（在存活候选里按概率随机挑一个）
 * 五张卡在一行里依次点亮（每步 1 beat），caption 用人话讲该步在干啥。
 *
 * 布局（§四几何，无容器框圈内容——靠标题 + 等距对齐分组，不用大 rect 把卡片框住）：
 *   - 五卡同一行，x 用单一公式 cardX(i) = LEFT + i*(CARD_W + GAP)，等宽等距；
 *   - 卡间用箭头连接（在卡之下先画，不穿字）；
 *   - 每卡内迷你条形用单一公式 barX(j) 排，条不溢出卡、文字 textAnchor=middle 居中；
 *   - 距 viewBox 边 ≥24px；字号 ≥10px；TimelineControls 在 viewBox 外（外层 div）。
 *   - label 锚在「该卡点亮完成」时刻 lit = BEAT*(i+1)，防单步 off-by-one。
 *
 * 为何 client：anime.js 时钟 + 受控控制条。anime.js 经 useTeachingTimeline 内部
 * 动态 import("animejs") 切独立 chunk（硬规则 2/6），不进首屏关键路径。
 * 视觉全走 DESIGN token，无裸 hex；时长走 TEACHING_BEAT_MS 具名常量（硬规则 5）。
 */

// —— 布局常量（viewBox 内坐标，间距均 2 的倍数）——
const VIEW_W = 770;
const VIEW_H = 300;

const CARD_W = 130;
const CARD_H = 196;
const GAP = 18;
const LEFT = 24; // 第一卡左缘距 viewBox 边 24（≥24）
const CARD_TOP = 64; // 卡顶 y（给上方标题留白）
const cardX = (i: number) => LEFT + i * (CARD_W + GAP);

// 卡内迷你条形区。
const BARS_TOP = CARD_TOP + 56; // 条形区顶（卡内，给两行卡头文字留白）
const BARS_H = 90; // 条形区高
const BARS_BASE = BARS_TOP + BARS_H; // 条形基线 y

type StageCard = {
  id: string;
  index: string; // 序号
  title: string; // 阶段名
  sub: string; // 一句话
  /** 该步每根迷你条的「高度比例」0~1（仅作示意形状，非真实计算）。 */
  bars: readonly number[];
  /** 该步是否有「被截掉」的灰条（top-p 之后用）。survived[j]=false 即灰显。 */
  survived?: readonly boolean[];
  color: string;
};

// 五张阶段卡（顺序即时间顺序）。bars 用示意比例画出「分布形状」的变化。
const NBARS = 5;
const STAGES: readonly StageCard[] = [
  {
    id: "logits",
    index: "①",
    title: "原始 logits",
    sub: "模型吐出的原始分数",
    // logits 有正有负——这里用「相对高度」示意（尾巴也有一点点）。
    bars: [0.95, 0.78, 0.55, 0.38, 0.22],
    color: "var(--text-secondary)",
  },
  {
    id: "softmax",
    index: "②",
    title: "softmax 成概率",
    sub: "归一成一摞和为 1",
    bars: [0.9, 0.62, 0.36, 0.18, 0.08],
    color: "var(--accent)",
  },
  {
    id: "temp",
    index: "③",
    title: "按温度重塑",
    sub: "高温 → 分布变平",
    bars: [0.62, 0.52, 0.42, 0.32, 0.24],
    color: "var(--accent)",
  },
  {
    id: "topp",
    index: "④",
    title: "top-p 截断",
    sub: "砍掉尾巴，只留头部",
    bars: [0.62, 0.52, 0.42, 0.32, 0.24],
    survived: [true, true, true, false, false],
    color: "var(--warning)",
  },
  {
    id: "pick",
    index: "⑤",
    title: "掷骰子抽中",
    sub: "存活里按概率挑一个",
    bars: [0.62, 0.52, 0.42, 0.32, 0.24],
    survived: [false, true, false, false, false], // 高亮抽中的第 2 根
    color: "var(--success)",
  },
];

const STEPS: readonly TeachingStep[] = [
  {
    label: "logits",
    caption: "① 模型先吐出一排原始分数（logits）——有高有低，还没法当概率",
  },
  {
    label: "softmax",
    caption: "② softmax 把这排分数归一成一摞「和为 1」的概率：分数越高，概率越大",
  },
  {
    label: "temp",
    caption: "③ 温度 T 重塑分布的陡峭度：这里 T 调高，头尾差距被拉平、更随机",
  },
  {
    label: "topp",
    caption: "④ top-p 从高到低累加概率，只留累积刚够 p 的头部候选，尾巴灰显被砍掉",
  },
  {
    label: "pick",
    caption: "⑤ 最后在存活的候选里掷骰子，按概率随机挑一个——这就是采出的下一个 token",
  },
];

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

export function AaSamplingStepsDiagram() {
  // 五张卡的高亮层引用（点亮动画驱动 opacity）。
  const cardRefs = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STAGES.forEach((s, i) => {
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);
        const el = cardRefs.current[s.id];
        if (el) {
          tl.add(
            el,
            {
              opacity: [0.18, 1],
              translateY: [10, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        tl.label(s.id, lit);
      });
    },
  });

  const barAreaW = CARD_W - 20; // 条形区宽（卡内左右各留 10）
  const barGap = 6;
  const barW = (barAreaW - barGap * (NBARS - 1)) / NBARS;

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="一次采样的五步可控动画。第一步：模型吐出一排原始分数 logits，有高有低。第二步：softmax 把这排分数归一成一摞和为 1 的概率，分数越高概率越大。第三步：温度 T 重塑分布的陡峭度，温度调高时头尾差距被拉平、采样更随机。第四步：top-p 核采样从高到低累加概率，只保留累积刚够 p 的头部候选，尾巴灰显被砍掉。第五步：在存活的候选里按概率掷骰子，随机挑中一个，这就是采出的下一个 token。五步在一行里依次点亮，可播放、暂停、单步、拖动进度查看。"
          className="mx-auto block h-auto w-full max-w-[770px]"
        >
          <defs>
            <marker
              id="aass-arrow"
              markerWidth="9"
              markerHeight="9"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
            </marker>
          </defs>

          {/* ===== 标题 ===== */}
          <text
            x={LEFT}
            y="30"
            fontSize="15"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            一次采样：从原始分数到挑出一个 token
          </text>
          <text x={LEFT} y="50" fontSize="11" fill="var(--text-secondary)">
            logits → softmax → 按温度重塑 → top-p 截断 → 掷骰子抽一个
          </text>

          {/* ===== 卡间箭头（先画，落在卡之下，不穿字）===== */}
          {STAGES.slice(0, -1).map((s, i) => {
            const x1 = cardX(i) + CARD_W;
            const x2 = cardX(i + 1);
            const y = CARD_TOP + CARD_H / 2;
            return (
              <line
                key={`arr-${s.id}`}
                x1={x1 + 2}
                y1={y}
                x2={x2 - 4}
                y2={y}
                stroke="var(--text-secondary)"
                strokeWidth="1.6"
                markerEnd="url(#aass-arrow)"
                opacity="0.5"
              />
            );
          })}

          {/* ===== 五张阶段卡（无容器框：各卡独立 rect + 标题分组）===== */}
          {STAGES.map((s, i) => {
            const x = cardX(i);
            const cx = x + CARD_W / 2;
            return (
              <g
                key={s.id}
                ref={(el) => {
                  cardRefs.current[s.id] = el;
                }}
                opacity="0.18"
              >
                {/* 卡片（单卡 rect，仅圈自己——非「容器框圈别的内容」）*/}
                <rect
                  x={x}
                  y={CARD_TOP}
                  width={CARD_W}
                  height={CARD_H}
                  rx="10"
                  fill={s.color}
                  fillOpacity="0.08"
                  stroke={s.color}
                  strokeWidth="1.6"
                />
                {/* 卡头：序号 + 阶段名 */}
                <text
                  x={cx}
                  y={CARD_TOP + 22}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {s.index} {s.title}
                </text>
                <text
                  x={cx}
                  y={CARD_TOP + 40}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {s.sub}
                </text>

                {/* 迷你条形基线 */}
                <line
                  x1={x + 10}
                  y1={BARS_BASE}
                  x2={x + 10 + barAreaW}
                  y2={BARS_BASE}
                  stroke="var(--border)"
                  strokeWidth="1"
                />

                {/* 迷你条形（单一公式 barX(j)） */}
                {s.bars.map((bh, j) => {
                  const bx = x + 10 + j * (barW + barGap);
                  const barH = bh * BARS_H;
                  const by = BARS_BASE - barH;
                  const survived = s.survived ? s.survived[j] : true;
                  // ⑤ 步：survived[j]=true 表示「抽中的那根」（高亮）；其余存活但不高亮。
                  const isPickStep = s.id === "pick";
                  const fill = isPickStep
                    ? survived
                      ? "var(--success)"
                      : "var(--accent)"
                    : survived
                      ? s.color
                      : "var(--border)";
                  const alpha = isPickStep
                    ? survived
                      ? 1
                      : 0.4
                    : survived
                      ? 0.8
                      : 0.3;
                  return (
                    <rect
                      key={`bar-${s.id}-${j}`}
                      x={bx}
                      y={by}
                      width={barW}
                      height={barH}
                      rx="2"
                      fill={fill}
                      fillOpacity={alpha}
                    />
                  );
                })}

                {/* 卡底：阶段强调标签 */}
                <text
                  x={cx}
                  y={CARD_TOP + CARD_H - 12}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill={s.color}
                >
                  {s.id === "pick"
                    ? "🎲 抽中第 2 个"
                    : s.id === "topp"
                      ? "尾巴被砍"
                      : s.id === "temp"
                        ? "更平 = 更随机"
                        : s.id === "softmax"
                          ? "和 = 100%"
                          : "有正有负"}
                </text>
              </g>
            );
          })}
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="一次采样五步：logits → softmax → 按温度重塑 → top-p 截断 → 掷骰子抽一个。可暂停、单步、拖进度。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        从模型吐出的原始分数，到最后挑出一个 token——温度在第③步把分布捏陡或捏平，top-p
        在第④步砍掉长尾，最后一步才真正掷骰子。
      </figcaption>
    </figure>
  );
}
