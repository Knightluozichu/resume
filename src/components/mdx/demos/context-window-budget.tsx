"use client";

import { useState } from "react";

import { DemoStage, Slider } from "../controls";

/**
 * <ContextWindowBudget>：「上下文窗口预算」交互演示（HEL-254，《LLM：Agent 的大脑》
 * 篇1·2，知识点 2）。
 *
 * 一条固定容量的「上下文窗口」横条（容量 8000 token）。自左向右堆叠三段：
 *   系统提示（固定）+ 对话历史（随滑块「历史轮数 0–20」增长）+ 当前问题（固定）。
 * 滑块加历史轮数 → 历史段变长；总量超容量时，超出的部分标红，并示意「最早的对话被
 * 挤出去 → 遗忘」。同时显示「已用 / 容量」数字。必有重置，初始停在「快满但没溢出」的
 * 轮数（一拖就能看到溢出）。
 *
 * 为何 client：滑块是真交互（受控状态），用状态直接算 SVG 属性——chapter-spec「每个知识
 * 点配可视化」里「CSS/SVG 轻量演示」的落地方式（无 WebGL，参考 AutonomySpectrumExplorer）。
 *
 * 颜色 / 间距 / 圆角全部走 DESIGN token（硬规则 5）：系统提示=--text-secondary、
 * 对话历史=--accent、当前问题=--success、溢出=--danger；几何常量具名、节点距边 ≥14px、
 * 字号 ≥10px、单一 x 公式起算（HEL-274 几何硬规则）。
 */

// —— 画布与窗口横条几何（viewBox 0 0 680 260；横条距边 ≥14px）。 ——
const VIEW_W = 680;
const VIEW_H = 260;

const BAR_X = 40; // 横条左端
const BAR_W = 600; // 横条宽度（右端 640，距右边 40）
const BAR_Y = 96; // 横条顶边
const BAR_H = 56; // 横条高

// —— token 预算模型（容量 8000；系统提示 / 当前问题固定，对话历史随轮数增长）。 ——
const CAPACITY = 8000;
const SYSTEM_TOKENS = 1200; // 系统提示（固定，钉在窗口最前）
const QUESTION_TOKENS = 600; // 当前问题（固定，永远要留在窗口里）
const PER_ROUND = 380; // 每一轮对话历史占的 token
const MAX_ROUNDS = 20;
const INITIAL_ROUNDS = 15; // 快满但没溢出：1200 + 15*380 + 600 = 7500 < 8000

// token → 横条像素宽（按容量线性映射；溢出部分按同比例继续，越界靠裁剪展示）。
const pxPerToken = BAR_W / CAPACITY;

export function ContextWindowBudget() {
  const [rounds, setRounds] = useState(INITIAL_ROUNDS);
  const reset = () => setRounds(INITIAL_ROUNDS);

  const historyTokens = rounds * PER_ROUND;
  const usedTokens = SYSTEM_TOKENS + historyTokens + QUESTION_TOKENS;
  const overflowTokens = Math.max(0, usedTokens - CAPACITY);
  const isOverflow = overflowTokens > 0;

  // 三段在横条内的像素宽（系统提示、对话历史、当前问题）。
  const sysW = SYSTEM_TOKENS * pxPerToken;
  const qW = QUESTION_TOKENS * pxPerToken;
  // 当前问题永远占住窗口尾部；系统提示永远占住窗口头部；历史填中间剩余空间。
  // 真实占用超容量时，历史段在「头部」被挤掉（最早的对话先遗忘）。
  const historyBudgetPx = BAR_W - sysW - qW; // 留给历史的窗口内空间
  const historyWantPx = historyTokens * pxPerToken; // 历史想要的空间
  const historyFitPx = Math.min(historyWantPx, historyBudgetPx); // 实际能塞进窗口的历史
  const droppedPx = Math.max(0, historyWantPx - historyBudgetPx); // 被挤出的历史宽度

  // 段起点 x。
  const sysX = BAR_X;
  const historyX = BAR_X + sysW;
  const questionX = BAR_X + sysW + historyFitPx;

  // 溢出条（画在横条右侧外，红色，示意被挤出去的部分）。
  const overflowX = BAR_X + BAR_W + 8;
  const overflowW = Math.min(droppedPx, VIEW_W - 14 - overflowX);

  const usedPct = Math.round((usedTokens / CAPACITY) * 100);

  return (
    <DemoStage
      title="上下文窗口：一次能「看进」的 token 有上限，超了最早的被挤出去"
      onReset={reset}
      controls={
        <Slider
          label="对话历史轮数"
          min={0}
          max={MAX_ROUNDS}
          step={1}
          value={rounds}
          onChange={setRounds}
          format={(v) => `${v} 轮`}
        />
      }
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={`上下文窗口预算演示。一条固定容量 ${CAPACITY} token 的上下文窗口横条，里面自左向右堆三段：系统提示固定占 ${SYSTEM_TOKENS} token、对话历史占 ${historyTokens} token（当前 ${rounds} 轮，每轮约 ${PER_ROUND} token）、当前问题固定占 ${QUESTION_TOKENS} token。当前共用掉 ${usedTokens} token，约为容量的 ${usedPct}%。${isOverflow ? `已经溢出：超出 ${overflowTokens} token，最早的那几轮对话被挤出窗口、被大脑遗忘。` : "还没溢出，窗口装得下。"}拖动「对话历史轮数」滑块加历史，历史段会变长；一旦总量超过容量，最早的对话就会从窗口头部被挤出去、被遗忘。`}
        className="mx-auto block h-auto w-full max-w-[680px]"
      >
        {/* —— 顶部「已用 / 容量」读数 —— */}
        <text
          x={BAR_X}
          y={40}
          textAnchor="start"
          fontSize="13"
          fontWeight="700"
          fill={isOverflow ? "var(--danger)" : "var(--text-primary)"}
        >
          {`已用 ${usedTokens.toLocaleString()} / 容量 ${CAPACITY.toLocaleString()} token`}
        </text>
        <text
          x={BAR_X + BAR_W}
          y={40}
          textAnchor="end"
          fontSize="12"
          fontWeight="700"
          fill={isOverflow ? "var(--danger)" : "var(--accent)"}
        >
          {isOverflow
            ? `溢出 ${overflowTokens.toLocaleString()}！`
            : `${usedPct}%`}
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

        {/* —— 段 1：系统提示（固定，窗口最前）—— */}
        <rect
          x={sysX}
          y={BAR_Y}
          width={sysW}
          height={BAR_H}
          rx="6"
          fill="var(--text-secondary)"
          fillOpacity="0.28"
        />
        {/* —— 段 2：对话历史（随轮数增长，能塞进窗口的部分）—— */}
        <rect
          x={historyX}
          y={BAR_Y}
          width={Math.max(0, historyFitPx)}
          height={BAR_H}
          fill="var(--accent)"
          fillOpacity="0.3"
        />
        {/* —— 段 3：当前问题（固定，窗口尾部，永远保留）—— */}
        <rect
          x={questionX}
          y={BAR_Y}
          width={qW}
          height={BAR_H}
          rx="6"
          fill="var(--success)"
          fillOpacity="0.32"
        />

        {/* 段内标签（仅在段够宽时显示，避免文字溢出段外） */}
        {sysW > 70 && (
          <text
            x={sysX + sysW / 2}
            y={BAR_Y + BAR_H / 2 + 4}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="600"
            fill="var(--text-primary)"
          >
            系统提示
          </text>
        )}
        {historyFitPx > 90 && (
          <text
            x={historyX + historyFitPx / 2}
            y={BAR_Y + BAR_H / 2 + 4}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--accent)"
          >
            {`对话历史 · ${rounds} 轮`}
          </text>
        )}
        {qW > 56 && (
          <text
            x={questionX + qW / 2}
            y={BAR_Y + BAR_H / 2 + 4}
            textAnchor="middle"
            fontSize="10.5"
            fontWeight="700"
            fill="var(--success)"
          >
            当前问题
          </text>
        )}

        {/* —— 溢出条：被挤出窗口的最早对话（红，画在窗口右侧外）—— */}
        {isOverflow && overflowW > 2 && (
          <g>
            <rect
              x={overflowX}
              y={BAR_Y}
              width={overflowW}
              height={BAR_H}
              rx="6"
              fill="var(--danger)"
              fillOpacity="0.3"
              stroke="var(--danger)"
              strokeWidth="1.4"
              strokeDasharray="5 4"
            />
          </g>
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
          y={BAR_Y + BAR_H + 24}
          textAnchor="end"
          fontSize="10"
          fontWeight="600"
          fill="var(--text-secondary)"
        >
          ← 容量上限
        </text>

        {/* —— 底部状态说明（一句话，居中，距底边 ≥14px）—— */}
        <text
          x={VIEW_W / 2}
          y={VIEW_H - 18}
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="600"
          fill={isOverflow ? "var(--danger)" : "var(--text-primary)"}
        >
          {isOverflow
            ? "窗口装不下了！最早的对话被挤出去 → 大脑把它忘了"
            : "系统提示和当前问题钉死两端；历史在中间，越堆越长，快顶到上限了"}
        </text>
      </svg>
    </DemoStage>
  );
}
