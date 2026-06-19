"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

/**
 * <TokenizationDiagram>：Token 化的旗舰「可控教学动画」（HEL-254，《LLM：Agent 的大脑》
 * 篇1·2，知识点 1）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」，LLM = 小特的大脑。这张图把一句你对小特说的话
 * 「我要订去上海的高铁票」摊给大脑看——大脑眼里没有「字 / 词」，只有一排带编号的 token：
 *   [我][要][订][去][上海][的][高铁][票]，每个 token 下挂一个稳定的 token-id 徽标。
 *
 * anime 逐 chip 点亮：步 i 点亮第 i 个 chip（描边变色 + 放大）并显出它的 token-id 徽标；
 * 时序铁律照 AgentLoopDiagram —— 步 i 的呈现占 [BEAT*i, BEAT*(i+1)]，
 * tl.label(name, BEAT*(i+1)) 落在「该 chip 点亮完成」时刻，杜绝单步 off-by-one；
 * 最后一个 chip 停在亮态，表示整句已切成一排 token 序列。caption 串讲 token 化要义。
 *
 * 为何 client：anime.js 时钟 + 受控控制条都是真交互。anime.js 经 useTeachingTimeline
 * 内部的动态 import("animejs") 切成独立 chunk（硬规则 2/6）；本文件再用 next/dynamic
 * (ssr:false) 把叶子组件包成动态边界懒加载，anime.js 绝不进首屏 / 公共 layout。
 *
 * 视觉：全部 DESIGN token 配色（accent / border / text-*），无裸 hex；时长走
 * TEACHING_BEAT_MS 具名常量；单一 x 公式 chipX(i)=MARGIN + i*(CHIP_W+GAP)，GAP≥12，
 * 节点距 viewBox 边 ≥14px、字号 ≥10px（硬规则 5 + HEL-274 几何硬规则）。
 */

// —— 画布与 chip 行几何（viewBox 0 0 660 280；单一 x 公式；chip 距边 ≥14px）。 ——
const VIEW_W = 660;
const VIEW_H = 280;

const CHIP_COUNT = 8;
const CHIP_W = 60;
const CHIP_H = 52;
const GAP = 16; // ≥12
// 整行居中：行总宽 = N*CHIP_W + (N-1)*GAP，左右对称留白。
const ROW_W = CHIP_COUNT * CHIP_W + (CHIP_COUNT - 1) * GAP;
const MARGIN = (VIEW_W - ROW_W) / 2; // = (660 - 608)/2 = 26 ≥14
const CHIP_Y = 132; // chip 顶边
// 单一坐标公式：第 i 个 chip 左上角 x。
const chipX = (i: number) => MARGIN + i * (CHIP_W + GAP);
const chipCX = (i: number) => chipX(i) + CHIP_W / 2;

// token-id 徽标 y（chip 下方）。
const ID_Y = CHIP_Y + CHIP_H + 22;

type TokenCell = {
  /** chip 上显示的 token 文本。 */
  text: string;
  /** 稳定的 token 编号（演示用，编号随便但固定）。 */
  id: number;
};

// 一句你对小特说的差事，被大脑切成 8 个 token（含「上海」「高铁」这类多字 token）。
const TOKENS: readonly TokenCell[] = [
  { text: "我", id: 1023 },
  { text: "要", id: 788 },
  { text: "订", id: 4501 },
  { text: "去", id: 312 },
  { text: "上海", id: 9087 },
  { text: "的", id: 42 },
  { text: "高铁", id: 6610 },
  { text: "票", id: 2750 },
];

// —— 关键帧步骤（顺序即时间顺序；每步点亮一个 chip）。 ——
const STEPS: readonly TeachingStep[] = TOKENS.map((t, i) => ({
  label: `tok-${i}`,
  caption:
    i === 0
      ? `① 大脑读到第 1 个 token「${t.text}」，给它一个固定编号 #${t.id}——它眼里没有「字」，只有编号`
      : i === TOKENS.length - 1
        ? `⑧ 最后一个 token「${t.text}」#${t.id}。整句已切成一排带编号的 token 序列，大脑就按这串编号处理`
        : `${"①②③④⑤⑥⑦⑧"[i]} token「${t.text}」→ 编号 #${t.id}。注意「上海」「高铁」这种是一整块 token，不按单字切`,
}));

const LABEL_TEXT: Record<string, string> = Object.fromEntries(
  STEPS.map((s) => [s.label, s.caption ?? s.label]),
);

function TokenizationDiagramInner() {
  // 每个 chip 高亮层 + 其 token-id 徽标的 DOM 引用，喂给 anime.js 驱动。
  const chipHi = useRef<Record<string, SVGRectElement | null>>({});
  const idBadge = useRef<Record<string, SVGGElement | null>>({});

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, i) => {
        // 步 i 占 [BEAT*i, BEAT*(i+1)]；lit = BEAT*(i+1) = 点亮完成 = label i 锚点。
        const start = TEACHING_BEAT_MS * i;
        const lit = TEACHING_BEAT_MS * (i + 1);

        const hi = chipHi.current[step.label];
        if (hi) {
          // 点亮当前 chip 高亮层（淡入 + 轻微放大）。
          tl.add(
            hi,
            {
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: TEACHING_BEAT_MS,
              ease: "out(3)",
            },
            start,
          );
        }
        // 同步显出该 chip 的 token-id 徽标。
        const badge = idBadge.current[step.label];
        if (badge) {
          tl.add(
            badge,
            {
              opacity: [0, 1],
              translateY: [-6, 0],
              duration: TEACHING_BEAT_MS,
              ease: "out(2)",
            },
            start,
          );
        }
        // label 落在点亮完成处。
        tl.label(step.label, lit);
      });
    },
  });

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="rounded-card border border-border bg-elevated p-6">
        {/* ⚡ 可交互标签 */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1 rounded-control border border-border px-2 py-1 text-xs font-medium text-accent">
            <span aria-hidden="true">⚡</span>
            可交互
          </span>
        </div>

        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-label="Token 化演示：你对私人助理小特说的一句话「我要订去上海的高铁票」，被小特的大脑 LLM 切成一排带编号的 token。从左到右八个 token chip 依次是：我（编号 #1023）、要（#788）、订（#4501）、去（#312）、上海（#9087）、的（#42）、高铁（#6610）、票（#2750），每个 chip 下方挂着它的 token 编号徽标。注意「上海」「高铁」是一整块 token，并不是按单个字切开的。播放时从左到右逐个点亮 token chip 并显出它的编号，说明大脑眼里没有「字 / 词」，只有一串 token 编号序列，它就按这串编号来处理你的话。可播放、暂停、单步、拖动进度逐帧观察这条切词过程。"
          className="mx-auto block h-auto w-full max-w-[660px]"
        >
          {/* —— 顶部原句卡片 —— */}
          <g>
            <rect
              x={MARGIN}
              y={32}
              width={ROW_W}
              height={44}
              rx="10"
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />
            <text
              x={VIEW_W / 2}
              y={50}
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              你对小特说的话（大脑要读的输入）
            </text>
            <text
              x={VIEW_W / 2}
              y={68}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="var(--accent)"
            >
              我要订去上海的高铁票
            </text>
          </g>

          {/* 「切成 token →」提示文字（左对齐，算清右边缘不超 viewBox-14） */}
          <text
            x={MARGIN}
            y={108}
            textAnchor="start"
            fontSize="11"
            fontWeight="600"
            fill="var(--text-secondary)"
          >
            大脑切词后 ↓ 每块是一个 token，下挂它的固定编号
          </text>

          {/* —— 8 个 token chip + token-id 徽标 —— */}
          {TOKENS.map((t, i) => {
            const x = chipX(i);
            const cx = chipCX(i);
            const label = `tok-${i}`;
            return (
              <g key={label}>
                {/* chip 底框（常驻、低对比） */}
                <rect
                  x={x}
                  y={CHIP_Y}
                  width={CHIP_W}
                  height={CHIP_H}
                  rx="9"
                  fill="var(--bg)"
                  stroke="var(--border)"
                  strokeWidth="1.2"
                />
                {/* chip 高亮层（默认灭，当前步淡入 + 描边变色 + 放大） */}
                <rect
                  ref={(el) => {
                    chipHi.current[label] = el;
                  }}
                  x={x}
                  y={CHIP_Y}
                  width={CHIP_W}
                  height={CHIP_H}
                  rx="9"
                  fill="var(--accent)"
                  fillOpacity="0.12"
                  stroke="var(--accent)"
                  strokeWidth="2.2"
                  opacity="0"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                  }}
                />
                {/* token 文本 */}
                <text
                  x={cx}
                  y={CHIP_Y + CHIP_H / 2 + 6}
                  textAnchor="middle"
                  fontSize="17"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {t.text}
                </text>
                {/* token-id 徽标（默认灭，随该步显出） */}
                <g
                  ref={(el) => {
                    idBadge.current[label] = el;
                  }}
                  opacity="0"
                >
                  <line
                    x1={cx}
                    y1={CHIP_Y + CHIP_H + 2}
                    x2={cx}
                    y2={ID_Y - 12}
                    stroke="var(--border)"
                    strokeWidth="1.2"
                  />
                  <text
                    x={cx}
                    y={ID_Y}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                    fill="var(--accent)"
                  >
                    {`#${t.id}`}
                  </text>
                </g>
              </g>
            );
          })}

          {/* 底部一句话点题（居中，距底边 ≥14px） */}
          <text
            x={VIEW_W / 2}
            y={VIEW_H - 16}
            textAnchor="middle"
            fontSize="10.5"
            fill="var(--text-secondary)"
          >
            大脑眼里没有「字」，只有这一串 token 编号序列
          </text>
        </svg>

        {/* 控制条原语：播放/暂停/单步/拖进度 + 当前步文案 */}
        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="点击播放，看大脑把「我要订去上海的高铁票」一块块切成 token，并给每块一个固定编号；可暂停、单步、拖进度逐帧观察。"
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Token 化：LLM
        把你的话切成一块块带编号的「token」——「上海」「高铁」常是一整块，而非按单字切。它眼里只有这串编号，不是「字」。
      </figcaption>
    </figure>
  );
}

/**
 * 动态边界：把 anime.js 叶子组件经 next/dynamic(ssr:false) 懒加载，确保 anime.js 这条
 * 重交互链路绝不进首屏 / 公共 layout（硬规则 2/6）。导出名供 mdx-components 注册。
 */
const TokenizationDynamic = dynamic(
  () => Promise.resolve(TokenizationDiagramInner),
  {
    ssr: false,
    loading: () => (
      <div className="mdx-figure not-prose mx-auto my-6 rounded-card border border-border bg-elevated p-6">
        <div className="flex min-h-72 items-center justify-center text-center">
          <p className="text-sm text-secondary">Token 化动画加载中…</p>
        </div>
      </div>
    ),
  },
);

export function TokenizationDiagram() {
  return <TokenizationDynamic />;
}
