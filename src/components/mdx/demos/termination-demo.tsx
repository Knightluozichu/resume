"use client";

import { useState } from "react";

import { DemoStage, Toggle } from "../controls";

/**
 * <TerminationDemo>：终止条件 / 死循环防护的对比交互（HEL-310，《编排·通信·终止》篇4·2，
 * 知识点 4：终止条件 / 死循环防护）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。两个 Agent 互相审稿、谁都不满意，会无限踢皮球
 * （A:再改改 → B:你改 → A:再改改…），轮次无限涨、token 烧光。对比两条路：
 *   - 无终止条件：轮次失控涨（标红「死循环·烧 token」）；
 *   - 有终止条件：到最大轮数 / 达成目标就收工（标绿「正常停」）。
 *
 * 交互：toggle 切「无终止 vs 有终止」；点「再转一轮」推进轮次——无终止那条永远能再转、计数器
 * 一直涨；有终止那条到第 maxRounds 轮（或第 2 轮就达成目标）就停、按钮禁用。必有重置。
 * curated 示例数据，标注「示意·非实时」。
 *
 * 几何守规则：两个 Agent 左右排（固定两点）；轮次卡片纵向堆叠（单一 y 公式 cardY(k)）；
 * text 距 viewBox 边 ≥16px、字号 ≥10px；不套整圈大框。状态色：失控用 --danger，正常停用
 * --success（仅小面积，符合 DESIGN）。
 *
 * 为何 client：toggle + 轮次推进是真交互（受控状态）。颜色 / 间距 / 圆角全走 DESIGN token。
 */

const VIEW_W = 560;
const VIEW_H = 286;

// 两个 Agent（左右排，互相审稿）。
const A_W = 150;
const A_H = 56;
const A_CY = 70;
const A_LX = 28 + A_W / 2; // 左 Agent 圆心 x
const A_RX = VIEW_W - 28 - A_W / 2; // 右 Agent 圆心 x

// 设了终止条件时：最多转 3 轮就强制收工。
const MAX_ROUNDS = 3;
// 无终止条件，演示上限到 12 轮就不再让点（防演示本身失控），但语义是「本可以无限」。
const RUNAWAY_CAP = 12;

// 每一轮谁踢给谁、说什么（交替）。curated。
const TURNS = [
  { from: "审稿 Agent", to: "写作 Agent", say: "这段不行，再改改" },
  { from: "写作 Agent", to: "审稿 Agent", say: "改好了，你再看看" },
] as const;

export function TerminationDemo() {
  // false = 无终止条件；true = 有终止条件。
  const [hasTermination, setHasTermination] = useState(false);
  // 已转的轮次数（从 0 起；点一次 +1）。
  const [rounds, setRounds] = useState(0);

  const reset = () => setRounds(0);
  const onToggle = (on: boolean) => {
    setHasTermination(on);
    setRounds(0); // 切模式重置计数，避免跨模式串味
  };

  // 有终止：到 MAX_ROUNDS 轮就停（这里设第 3 轮达成「双方都满意」目标 → 收工）。
  // 无终止：到演示上限 RUNAWAY_CAP 才不让再点（语义上本可无限）。
  const stopped = hasTermination ? rounds >= MAX_ROUNDS : rounds >= RUNAWAY_CAP;
  const canStep = !stopped;
  const next = () => setRounds((r) => r + 1);

  // 状态文案 + 配色。
  const runawayDanger = !hasTermination && rounds >= 4; // 转了几轮还停不下 → 标红示警
  const statusColor = hasTermination
    ? "var(--success)"
    : runawayDanger
      ? "var(--danger)"
      : "var(--warning)";
  const statusText = hasTermination
    ? rounds >= MAX_ROUNDS
      ? `✓ 到第 ${MAX_ROUNDS} 轮触发终止条件，收工！正常停。`
      : `设了终止条件：到第 ${MAX_ROUNDS} 轮（或达成目标）就强制收工。`
    : rounds >= RUNAWAY_CAP
      ? `已经 ${rounds} 轮还没停……（演示就到这，真实里它会一直烧下去）`
      : runawayDanger
        ? `✗ 没有终止条件：已 ${rounds} 轮还在踢皮球，轮次无限涨、token 烧光！`
        : `没设终止条件：两个 Agent 互相踢皮球，谁都不满意……`;

  // 最近显示几轮（最多展示 4 张卡，避免溢出 viewBox）。
  const visibleStart = Math.max(0, rounds - 4);
  const visibleRounds = Array.from(
    { length: rounds - visibleStart },
    (_, k) => visibleStart + k,
  );
  const cardY = (slot: number) => 116 + slot * 40;

  return (
    <DemoStage
      title="终止条件：无终止（死循环烧 token）vs 有终止（到点收工）对比（示意·非实时）"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-3">
          <Toggle
            checked={hasTermination}
            onChange={onToggle}
            label={hasTermination ? "有终止条件" : "无终止条件"}
          />
          <button
            type="button"
            onClick={next}
            disabled={!canStep}
            aria-label="再转一轮"
            className="rounded-control border border-border px-3 py-1 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            再转一轮 <span aria-hidden="true">⟳</span>
          </button>
          <span className="text-xs text-secondary">
            已转 {rounds} 轮{hasTermination ? `（上限 ${MAX_ROUNDS}）` : ""}
          </span>
        </div>
      }
    >
      <div className="w-full max-w-[560px] text-sm">
        <div className="rounded-control border border-border bg-bg p-3">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`终止条件对比：当前为${hasTermination ? "有终止条件" : "无终止条件"}，已转 ${rounds} 轮。${statusText}`}
            className="mx-auto block h-auto w-full max-w-[560px]"
          >
            <defs>
              <marker
                id="td-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0 0 L6 3 L0 6 z" fill="var(--text-secondary)" />
              </marker>
            </defs>

            {/* 顶 caption（baseline y=30，bbox 距顶 ≥16px） */}
            <text
              x={VIEW_W / 2}
              y={30}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={statusColor}
            >
              {hasTermination
                ? "有终止条件：到点就收工"
                : "无终止条件：互相踢皮球，停不下来"}
            </text>

            {/* 两个 Agent 互相审稿的连线（双向） */}
            <line
              x1={A_LX + A_W / 2}
              y1={A_CY}
              x2={A_RX - A_W / 2}
              y2={A_CY}
              stroke="var(--text-secondary)"
              strokeWidth="1.4"
              strokeDasharray="5 3"
              markerStart="url(#td-arrow)"
              markerEnd="url(#td-arrow)"
              opacity="0.6"
            />

            {/* 左右两个 Agent */}
            {[
              { cx: A_LX, label: "写作 Agent", sub: "改稿" },
              { cx: A_RX, label: "审稿 Agent", sub: "挑错" },
            ].map((a) => (
              <g key={a.label}>
                <rect
                  x={a.cx - A_W / 2}
                  y={A_CY - A_H / 2}
                  width={A_W}
                  height={A_H}
                  rx="10"
                  fill="var(--bg)"
                  stroke="var(--accent)"
                  strokeWidth="1.6"
                />
                <text
                  x={a.cx}
                  y={A_CY - 3}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill="var(--text-primary)"
                >
                  {a.label}
                </text>
                <text
                  x={a.cx}
                  y={A_CY + 13}
                  textAnchor="middle"
                  fontSize="9.5"
                  fill="var(--text-secondary)"
                >
                  {a.sub}
                </text>
              </g>
            ))}

            {/* 轮次卡片：每转一轮堆一张（谁踢给谁说什么），最多显示最近 4 张 */}
            {visibleRounds.map((r, slot) => {
              const turn = TURNS[r % 2];
              return (
                <g key={`round-${r}`}>
                  <rect
                    x={70}
                    y={cardY(slot)}
                    width={VIEW_W - 140}
                    height={32}
                    rx="7"
                    fill="var(--bg)"
                    stroke={
                      !hasTermination && r >= 4
                        ? "var(--danger)"
                        : "var(--border)"
                    }
                    strokeWidth="1.2"
                  />
                  <text
                    x={84}
                    y={cardY(slot) + 20}
                    textAnchor="start"
                    fontSize="10.5"
                    fill="var(--text-secondary)"
                  >
                    第 {r + 1} 轮 · {turn.from} → {turn.to}：「{turn.say}」
                  </text>
                </g>
              );
            })}

            {/* 没转过时的提示 */}
            {rounds === 0 && (
              <text
                x={VIEW_W / 2}
                y={150}
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--text-secondary)"
              >
                点「再转一轮」让它们开始互相审稿……
              </text>
            )}
          </svg>
        </div>

        {/* 状态行：失控标红 / 正常停标绿 */}
        <div
          className="mt-3 rounded-control border p-3"
          style={{ borderColor: statusColor }}
        >
          <p
            className="text-xs font-semibold leading-relaxed"
            style={{ color: statusColor }}
          >
            {statusText}
          </p>
        </div>

        {/* 一句话要点 */}
        <p className="mt-3 rounded-control border border-accent/40 bg-bg p-2 text-[11px] leading-relaxed text-secondary">
          <strong className="text-primary">要点</strong>
          ：多 Agent 最危险的坑是停不下来。必须设终止条件——达成目标 / 到最大轮数
          /
          连续几轮没进展，就强制收工。切到「有终止条件」对比一下：同样互相审稿，它到第{" "}
          {MAX_ROUNDS} 轮就稳稳停住，不会无限烧 token。
        </p>
      </div>
    </DemoStage>
  );
}
