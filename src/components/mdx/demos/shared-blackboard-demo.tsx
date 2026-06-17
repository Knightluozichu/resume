"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <SharedBlackboardDemo>：共享状态 / 黑板（blackboard）的步进交互（HEL-310，
 * 《编排·通信·终止》篇4·2，知识点 2：共享状态 / 黑板）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。除了点对点传消息，还有种办法是给所有 Agent 一块
 * 共享的状态板（黑板）——谁都能往上写、谁都能读。三个 Agent 围着同一块黑板，轮流读黑板
 * 已有内容 + 往黑板上写自己的产出，黑板逐步累积完善：
 *   ① 研究员读（空）→ 写上「查到的资料」
 *   ② 写手读黑板（资料）→ 写上「初稿」
 *   ③ 审查读黑板（资料 + 初稿）→ 写上「修改意见」
 * 突出「都读同一块、都写同一块」vs 点对点各传各的。
 *
 * 交互：步进式（0 空黑板 → 1/2/3 三个 Agent 依次读写），点「下一步」看黑板内容累积；当前
 * 正在读写的 Agent 高亮。必有重置（回到第 0 步）。curated 示例数据，标注「示意·非实时」。
 *
 * 几何守规则：黑板居中、3 Agent 环绕（单一角度公式 agentAngle(i)）；text 距 viewBox 边
 * ≥16px、字号 ≥10px；不套整圈大框（黑板本身是内容容器，非「给一组卡套大框」）。非当前
 * Agent 保持基底可见（opacity 不为 0，HEL-292）。
 *
 * 为何 client：步进 + 累积是真交互（受控状态）。颜色 / 间距 / 圆角 / 动效全走 DESIGN token。
 */

const VIEW_W = 560;
const VIEW_H = 340;

// 黑板（居中偏上的一块面板，Agent 围着它）。
const BB = { x: 168, y: 70, w: 224, h: 150 };

// 3 个 Agent 环绕黑板：上方两侧 + 下方居中，单一角度公式。
type AgentDef = { role: string; write: string };
const AGENTS: readonly AgentDef[] = [
  { role: "研究员", write: "查到：A 篇评测、参数表" },
  { role: "写手", write: "初稿：800 字测评" },
  { role: "审查", write: "意见：改 5 处事实 / 措辞" },
];

// Agent 节点圆心：研究员左上、写手右上、审查正下。固定三点（围黑板）。
const AGENT_POS = [
  { cx: 78, cy: 96 },
  { cx: VIEW_W - 78, cy: 96 },
  { cx: VIEW_W / 2, cy: 296 },
] as const;
const A_W = 132;
const A_H = 52;

// 步进阶段：0 空黑板 → 1 研究员 → 2 写手 → 3 审查。
type Stage = 0 | 1 | 2 | 3;

const STAGE_INFO: readonly { title: string; note: string }[] = [
  {
    title: "① 一块空黑板，三个 Agent 围着它",
    note: "中间是一块所有 Agent 都能读、都能写的共享黑板（共享状态）。开局它是空的。注意：三个 Agent 不互相点对点传话，而是都冲着同一块板。",
  },
  {
    title: "② 研究员：读黑板（空）→ 写上资料",
    note: "研究员先读一眼黑板（现在还空），然后把查到的资料写上去。黑板从此有了第一条内容——别的 Agent 待会都能读到。",
  },
  {
    title: "③ 写手：读黑板（有资料）→ 写上初稿",
    note: "写手读黑板，直接拿到研究员留下的资料（不用研究员专门点对点发给它），据此写出初稿，再写回黑板。黑板内容又长了一条。",
  },
  {
    title: "④ 审查：读黑板（资料 + 初稿）→ 写上意见",
    note: "审查读黑板，一次性看到资料和初稿，挑出问题、写上修改意见。黑板累积成完整产物——这就是「都读同一块、都写同一块」围着同一份产物逐步完善。",
  },
];

export function SharedBlackboardDemo() {
  const [stage, setStage] = useState<Stage>(0);
  const reset = () => setStage(0);
  const next = () => setStage((s) => Math.min(3, s + 1) as Stage);
  const prev = () => setStage((s) => Math.max(0, s - 1) as Stage);

  const info = STAGE_INFO[stage];
  // 当前正在读写的 Agent 下标（stage 1/2/3 → agent 0/1/2；stage 0 无）。
  const activeAgent = stage === 0 ? -1 : stage - 1;
  // 黑板上已累积的条目数（写完第 k 个 Agent 后有 k 条）。
  const writtenCount = stage; // 0,1,2,3

  return (
    <DemoStage
      title="共享黑板：三个 Agent 轮流读 / 写同一块板，内容逐步累积完善（示意·非实时）"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-secondary">
            一步步看黑板内容怎么累积：
          </span>
          <button
            type="button"
            onClick={prev}
            disabled={stage === 0}
            aria-label="上一步"
            className="rounded-control border border-border px-3 py-1 text-xs text-secondary transition-colors duration-(--duration-hover) ease-standard hover:border-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span aria-hidden="true">⏮</span> 上一步
          </button>
          <button
            type="button"
            onClick={next}
            disabled={stage === 3}
            aria-label="下一步"
            className="rounded-control border border-border px-3 py-1 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            下一步 <span aria-hidden="true">⏭</span>
          </button>
          <span className="ml-1 text-xs text-secondary">
            第 {stage + 1} / 4 步
          </span>
        </div>
      }
    >
      <div className="w-full max-w-[560px] text-sm">
        <div className="rounded-control border border-border bg-bg p-3">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`共享黑板第 ${stage + 1} 步：${info.title}。${info.note}`}
            className="mx-auto block h-auto w-full max-w-[560px]"
          >
            <defs>
              <marker
                id="sbd-arrow-accent"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
              </marker>
            </defs>

            {/* 顶 caption（baseline y=30，bbox 距顶 ≥16px） */}
            <text
              x={VIEW_W / 2}
              y={30}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill="var(--accent)"
            >
              {info.title}
            </text>

            {/* 当前 Agent ⇄ 黑板的「读 / 写」双向连线（活跃时高亮） */}
            {activeAgent >= 0 && (
              <line
                x1={AGENT_POS[activeAgent].cx}
                y1={AGENT_POS[activeAgent].cy}
                x2={BB.x + BB.w / 2}
                y2={BB.y + BB.h / 2}
                stroke="var(--accent)"
                strokeWidth="1.6"
                strokeDasharray="4 3"
                markerStart="url(#sbd-arrow-accent)"
                markerEnd="url(#sbd-arrow-accent)"
                opacity="0.55"
              />
            )}

            {/* 黑板面板 */}
            <rect
              x={BB.x}
              y={BB.y}
              width={BB.w}
              height={BB.h}
              rx="10"
              fill="var(--accent-glow)"
              stroke="var(--accent)"
              strokeWidth="1.8"
            />
            <text
              x={BB.x + BB.w / 2}
              y={BB.y + 22}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fill="var(--accent)"
            >
              共享黑板（谁都能读 / 写）
            </text>
            {/* 黑板上累积的条目 */}
            {AGENTS.map((a, i) => {
              const shown = i < writtenCount;
              const justWritten = i === activeAgent;
              return (
                <text
                  key={`bb-line-${i}`}
                  x={BB.x + 14}
                  y={BB.y + 48 + i * 24}
                  textAnchor="start"
                  fontSize="10.5"
                  fontWeight={justWritten ? 700 : 400}
                  fill={
                    justWritten
                      ? "var(--text-primary)"
                      : "var(--text-secondary)"
                  }
                  opacity={shown ? 1 : 0}
                >
                  • {a.write}
                </text>
              );
            })}
            {/* 空黑板提示（stage 0） */}
            {writtenCount === 0 && (
              <text
                x={BB.x + BB.w / 2}
                y={BB.y + 88}
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--text-secondary)"
              >
                （还是空的）
              </text>
            )}

            {/* 3 个 Agent 节点（当前活跃高亮，其余基底淡显） */}
            {AGENTS.map((a, i) => {
              const pos = AGENT_POS[i];
              const active = i === activeAgent;
              const done = i < activeAgent;
              return (
                <g key={`agent-${i}`} opacity={active ? 1 : done ? 0.7 : 0.5}>
                  <rect
                    x={pos.cx - A_W / 2}
                    y={pos.cy - A_H / 2}
                    width={A_W}
                    height={A_H}
                    rx="10"
                    fill={active ? "var(--accent-glow)" : "var(--bg)"}
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                  />
                  <text
                    x={pos.cx}
                    y={pos.cy - 3}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="var(--text-primary)"
                  >
                    {a.role}
                  </text>
                  <text
                    x={pos.cx}
                    y={pos.cy + 13}
                    textAnchor="middle"
                    fontSize="9.5"
                    fill={active ? "var(--accent)" : "var(--text-secondary)"}
                  >
                    {active
                      ? "读黑板 + 写黑板"
                      : done
                        ? "写过了"
                        : "等着读黑板"}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* 旁注：当前阶段说明 */}
        <div className="mt-3 rounded-control border border-border bg-elevated p-3">
          <p className="mb-1 text-xs font-semibold text-accent">{info.title}</p>
          <p className="text-xs leading-relaxed text-secondary">{info.note}</p>
        </div>

        {/* 一句话要点 */}
        <p className="mt-3 rounded-control border border-accent/40 bg-bg p-2 text-[11px] leading-relaxed text-secondary">
          <strong className="text-primary">要点</strong>
          ：共享黑板让所有 Agent
          读同一块、写同一块，围着同一份逐步完善的产物协作——不必各传各的点对点消息，后来的
          Agent 一读黑板就拿到前面所有人的产出。
        </p>
      </div>
    </DemoStage>
  );
}
