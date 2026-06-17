"use client";

import { useState } from "react";

import { DemoStage, Slider } from "../controls";

/**
 * <ContextBudgetDemo>：「上下文预算分配」多类别交互演示（HEL-306，《上下文工程与压缩》
 * 篇3·2，知识点 2）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。本章主隐喻：小特的「桌面」（上下文窗口）就那么大，
 * 该往上摆什么、摆多少，是门讲究。第 2 章的 <ContextWindowBudget> 只调「对话历史轮数」一个
 * 变量；这个 Demo 更细——把一笔 8000 token 的预算切给**五个类别**（系统提示 / few-shot 示例 /
 * 对话历史 / 检索资料 / 当前问题），每一项一个滑块，实时看总和、是否超预算（超了标红）。
 *
 * 核心教学点：窗口是一笔**有限预算**，五样分着用，加起来不能超——这样多了那样就得砍，是个
 * **权衡（trade-off）**。这正是「上下文工程」要解决的：在有限空间里精心安排放什么、放多少。
 *
 * 为何 client：五个滑块是真交互（受控状态），用状态直接算每段像素宽并渲染 SVG 横条——
 * 这是「预算分配」在「没法在线跑」约束下的可视化落地（参考 ContextWindowBudget 范式）。
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）；几何守 HEL-274/296/299：单一 x 公式、
 * text/rect 距 viewBox 边 ≥16px（顶 caption y≥20）、字号 ≥10px、利用率 ≥55%。
 */

// —— 画布与窗口横条几何（viewBox 0 0 680 240；横条距边 ≥16px）。 ——
const VIEW_W = 680;
const VIEW_H = 240;

const BAR_X = 40; // 横条左端
const BAR_W = 600; // 横条宽度（右端 640，距右边 40）
const BAR_Y = 92; // 横条顶边
const BAR_H = 54; // 横条高

// —— token 预算模型（容量 8000；五个类别各一个滑块，单位 token）。 ——
const CAPACITY = 8000;

type Slot = {
  id: string;
  /** 类别名。 */
  label: string;
  /** 一句话说明它装什么。 */
  note: string;
  /** 滑块上下界与步长（token）。 */
  min: number;
  max: number;
  step: number;
  /** 初始占用（token）。 */
  initial: number;
  /** 段配色 token。 */
  color: string;
};

// 五个类别，自左向右堆叠。初值之和 = 1200+800+2400+2400+400 = 7200 < 8000（快满没溢出，
// 一拖检索资料 / 历史就溢出，立刻看到「这样多了那样就得砍」的权衡）。
const SLOTS: readonly Slot[] = [
  {
    id: "system",
    label: "系统提示",
    note: "给小特定角色 / 规矩（固定开销）",
    min: 200,
    max: 2000,
    step: 100,
    initial: 1200,
    color: "var(--text-secondary)",
  },
  {
    id: "fewshot",
    label: "few-shot 示例",
    note: "几个「问→答」范例，教它照样答",
    min: 0,
    max: 3000,
    step: 100,
    initial: 800,
    color: "var(--warning)",
  },
  {
    id: "history",
    label: "对话历史",
    note: "之前几轮的来回（越聊越长）",
    min: 0,
    max: 4000,
    step: 100,
    initial: 2400,
    color: "var(--accent)",
  },
  {
    id: "retrieved",
    label: "检索资料",
    note: "RAG 从知识库捞回的相关片段",
    min: 0,
    max: 4000,
    step: 100,
    initial: 2400,
    color: "var(--success)",
  },
  {
    id: "question",
    label: "当前问题",
    note: "用户这一轮真正要问的（必留）",
    min: 200,
    max: 1200,
    step: 100,
    initial: 400,
    color: "var(--danger)",
  },
];

const INITIAL: Record<string, number> = Object.fromEntries(
  SLOTS.map((s) => [s.id, s.initial]),
);

// token → 横条像素宽（按容量线性映射）。
const pxPerToken = BAR_W / CAPACITY;

export function ContextBudgetDemo() {
  const [budget, setBudget] = useState<Record<string, number>>(INITIAL);

  const reset = () => setBudget(INITIAL);
  const setOne = (id: string, v: number) =>
    setBudget((prev) => ({ ...prev, [id]: v }));

  const used = SLOTS.reduce((sum, s) => sum + budget[s.id], 0);
  const overflow = Math.max(0, used - CAPACITY);
  const isOverflow = overflow > 0;
  const usedPct = Math.round((used / CAPACITY) * 100);

  // 每段在横条内的起点 x 与宽度（自左向右堆叠；能塞进窗口的部分照画，溢出部分裁到右外）。
  // 起点 = 前面各段「想要宽」的前缀和（用 wantPx 累加，溢出段自然落到横条外）；纯函数式
  // 累加，不在 render 里重赋外层 let（React Compiler immutability）。
  const segs = SLOTS.map((s, i) => {
    const startPx =
      BAR_X +
      SLOTS.slice(0, i).reduce((sum, p) => sum + budget[p.id], 0) * pxPerToken;
    const wantPx = budget[s.id] * pxPerToken;
    const room = Math.max(0, BAR_X + BAR_W - startPx); // 横条内还剩多少
    const fitPx = Math.min(wantPx, room);
    return { ...s, x: startPx, w: fitPx, tokens: budget[s.id] };
  });

  return (
    <DemoStage
      title="上下文预算分配：8000 token 切给五样，加起来不能超——这样多了那样就得砍"
      onReset={reset}
      controls={
        <>
          {SLOTS.map((s) => (
            <Slider
              key={s.id}
              label={`${s.label}（${s.note}）`}
              min={s.min}
              max={s.max}
              step={s.step}
              value={budget[s.id]}
              onChange={(v) => setOne(s.id, v)}
              format={(v) => `${v}t`}
            />
          ))}
        </>
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`上下文预算分配演示。一条总容量 ${CAPACITY} token 的上下文窗口横条，里面自左向右堆五段：系统提示 ${budget.system} token、few-shot 示例 ${budget.fewshot} token、对话历史 ${budget.history} token、检索资料 ${budget.retrieved} token、当前问题 ${budget.question} token。当前共用掉 ${used} token，约为容量的 ${usedPct}%。${isOverflow ? `已经超预算：超出 ${overflow} token，必须从某一类砍掉才放得下。` : "还在预算内，装得下。"}拖动每个滑块调对应类别的占用，总和超过容量时会标红——想给一类多塞，就得从另一类省，这就是上下文工程的预算权衡。`}
        className="mx-auto block h-auto w-full max-w-[680px]"
      >
        {/* —— 顶部读数行（y≥20，距顶边 ≥16px）—— */}
        <text
          x={BAR_X}
          y={32}
          textAnchor="start"
          fontSize="13"
          fontWeight="700"
          fill={isOverflow ? "var(--danger)" : "var(--text-primary)"}
        >
          {`已用 ${used.toLocaleString()} / 预算 ${CAPACITY.toLocaleString()} token`}
        </text>
        <text
          x={BAR_X + BAR_W}
          y={32}
          textAnchor="end"
          fontSize="12"
          fontWeight="700"
          fill={isOverflow ? "var(--danger)" : "var(--accent)"}
        >
          {isOverflow ? `超预算 ${overflow.toLocaleString()}！` : `${usedPct}%`}
        </text>

        {/* —— 容量边框（窗口的「物理上限」）—— */}
        <rect
          x={BAR_X}
          y={BAR_Y}
          width={BAR_W}
          height={BAR_H}
          rx="8"
          fill="var(--bg)"
          stroke={isOverflow ? "var(--danger)" : "var(--border)"}
          strokeWidth={isOverflow ? 2 : 1.4}
        />

        {/* —— 五段彩条 + 段内标签 —— */}
        {segs.map((seg) =>
          seg.w > 0.5 ? (
            <g key={seg.id}>
              <rect
                x={seg.x}
                y={BAR_Y}
                width={seg.w}
                height={BAR_H}
                fill={seg.color}
                fillOpacity="0.32"
              />
              {seg.w > 56 && (
                <text
                  x={seg.x + seg.w / 2}
                  y={BAR_Y + BAR_H / 2 + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {seg.label}
                </text>
              )}
            </g>
          ) : null,
        )}

        {/* —— 容量上限竖线标注 —— */}
        <line
          x1={BAR_X + BAR_W}
          y1={BAR_Y - 8}
          x2={BAR_X + BAR_W}
          y2={BAR_Y + BAR_H + 8}
          stroke={isOverflow ? "var(--danger)" : "var(--text-secondary)"}
          strokeWidth="1.4"
          strokeDasharray="3 3"
        />
        <text
          x={BAR_X + BAR_W}
          y={BAR_Y + BAR_H + 22}
          textAnchor="end"
          fontSize="10"
          fontWeight="600"
          fill="var(--text-secondary)"
        >
          ← 预算上限
        </text>

        {/* —— 图例（五类配色，左对齐一行，字号 ≥10px）—— */}
        {SLOTS.map((s, i) => {
          const lx = BAR_X + i * 122;
          return (
            <g key={s.id}>
              <rect
                x={lx}
                y={BAR_Y + BAR_H + 32}
                width={10}
                height={10}
                rx="2"
                fill={s.color}
                fillOpacity="0.5"
              />
              <text
                x={lx + 14}
                y={BAR_Y + BAR_H + 41}
                textAnchor="start"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {s.label}
              </text>
            </g>
          );
        })}

        {/* —— 底部状态说明（一句话，居中，距底边 ≥16px）—— */}
        <text
          x={VIEW_W / 2}
          y={VIEW_H - 16}
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="600"
          fill={isOverflow ? "var(--danger)" : "var(--text-primary)"}
        >
          {isOverflow
            ? "超预算了！想多塞一类，就得从别的类砍——这就是上下文工程的权衡"
            : "五样分着用一笔有限预算：哪样想多放，就得算清楚从哪样省"}
        </text>
      </svg>
    </DemoStage>
  );
}
