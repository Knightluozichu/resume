"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <SupervisorDispatchDemo>：supervisor 主管分派的交互演示（HEL-308，《多智能体协作模式》
 * 篇4·1，知识点 1/3：为什么多智能体 + 角色专精）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。一个 supervisor 把一桩活（写一篇产品测评）拆成
 * 几个子任务，分派给专精 worker（研究员查资料 / 写手成稿 / 审查挑错），worker 各自完成、
 * 汇报回主管，主管汇总成最终稿。
 *
 * 交互：步进式（猜一猜 → 0 拆活 → 1 分派 → 2 并行干 → 3 汇报 → 4 汇总定稿），点「下一步」
 * 看分派→并行→汇总的流转；每步把当前阶段高亮 + 旁注。必有重置（回到第 0 步）。
 * curated 示例数据，标注「示意·非实时」。
 *
 * 几何守规则：主管居中、3 worker 横排（单一 x 公式 colX(i)）；text 居中、距 viewBox 边
 * ≥16px、字号 ≥10px；不套整圈大框。非当前阶段节点保持基底可见（opacity 不为 0，HEL-292）。
 *
 * 为何 client：步进是真交互（受控状态高亮）。颜色 / 间距 / 圆角 / 动效全走 DESIGN token
 * （硬规则 5）。
 */

const VIEW_W = 560;
const VIEW_H = 300;

// 主管节点（上方居中）。
const BOSS = { cx: VIEW_W / 2, cy: 70, w: 196, h: 50 };

// 3 个 worker（下方横排，单一 x 公式）。
const W_Y = 220;
const W_W = 150;
const W_H = 64;
const MARGIN_X = 28;
const INNER_W = VIEW_W - 2 * MARGIN_X;
const workerCx = (i: number) => MARGIN_X + ((i + 0.5) * INNER_W) / 3;

type Worker = {
  role: string;
  task: string;
  /** 该 worker 干完交回的产出（汇报阶段显示）。 */
  result: string;
};

const WORKERS: readonly Worker[] = [
  { role: "研究员", task: "查资料", result: "查到 3 篇评测 + 参数表" },
  { role: "写手", task: "写初稿", result: "成稿 800 字测评" },
  { role: "审查", task: "挑错校对", result: "改了 5 处事实 / 措辞" },
];

// 步进阶段：0 拆活 → 1 分派 → 2 并行干 → 3 汇报 → 4 汇总定稿。
type Stage = 0 | 1 | 2 | 3 | 4;

const STAGE_INFO: readonly { title: string; note: string }[] = [
  {
    title: "① 主管拆活",
    note: "主管收到大活「写一篇产品测评」，先把它拆成三件子任务：查资料、写初稿、挑错校对。",
  },
  {
    title: "② 分派给专精 worker",
    note: "主管把三件子任务分别派给三个各有专长的 worker——研究员、写手、审查，每人只领自己那一摊。",
  },
  {
    title: "③ 各自并行干",
    note: "三个 worker 同时开工，各管各的：研究员查、写手写、审查校。互不打架，比一个 Agent 又查又写又校稳得多。",
  },
  {
    title: "④ 汇报结果回主管",
    note: "每个 worker 干完，把自己的产出交回主管——研究员交资料、写手交初稿、审查交修订意见。",
  },
  {
    title: "⑤ 主管汇总定稿",
    note: "主管把三份产出捏到一起，整合成一篇最终测评——这就是「中心化指挥」：拆、派、汇都由主管统筹。",
  },
];

export function SupervisorDispatchDemo() {
  const [stage, setStage] = useState<Stage>(0);
  const reset = () => setStage(0);
  const next = () => setStage((s) => Math.min(4, s + 1) as Stage);
  const prev = () => setStage((s) => Math.max(0, s - 1) as Stage);

  const info = STAGE_INFO[stage];
  // 各阶段哪些元素「活跃」（高亮），其余基底淡显。
  const bossActive = stage === 0 || stage === 4;
  const dispatchActive = stage === 1;
  const workActive = stage === 2;
  const reportActive = stage === 3;

  return (
    <DemoStage
      title="主管分派：一桩活拆给三个专精 worker，各自干完汇报、主管汇总（示意·非实时）"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-secondary">
            一步步看分派 → 并行干 → 汇总的流转：
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
            disabled={stage === 4}
            aria-label="下一步"
            className="rounded-control border border-border px-3 py-1 text-xs text-accent transition-colors duration-(--duration-hover) ease-standard hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
          >
            下一步 <span aria-hidden="true">⏭</span>
          </button>
          <span className="ml-1 text-xs text-secondary">
            第 {stage + 1} / 5 步
          </span>
        </div>
      }
    >
      <div className="w-full max-w-[560px] text-sm">
        <div className="rounded-control border border-border bg-bg p-3">
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="img"
            aria-label={`主管分派流程第 ${stage + 1} 步：${info.title}。${info.note}`}
            className="mx-auto block h-auto w-full max-w-[560px]"
          >
            <defs>
              <marker
                id="sdd-arrow-accent"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
              </marker>
              <marker
                id="sdd-arrow-success"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
              </marker>
            </defs>

            {/* 顶 caption（baseline y=30，bbox 距顶 ≥16px，HEL-296/299） */}
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

            {/* 分派箭头：主管 → worker（左偏，stage 1 高亮，否则淡显） */}
            {WORKERS.map((_, i) => (
              <line
                key={`disp-${i}`}
                x1={BOSS.cx - 12}
                y1={BOSS.cy + BOSS.h / 2}
                x2={workerCx(i) - 12}
                y2={W_Y - W_H / 2 - 2}
                stroke="var(--accent)"
                strokeWidth="1.8"
                markerEnd="url(#sdd-arrow-accent)"
                opacity={dispatchActive ? 1 : 0.22}
              />
            ))}

            {/* 汇报箭头：worker → 主管（右偏，stage 3 高亮，否则淡显） */}
            {WORKERS.map((_, i) => (
              <line
                key={`rep-${i}`}
                x1={workerCx(i) + 12}
                y1={W_Y - W_H / 2 - 2}
                x2={BOSS.cx + 12}
                y2={BOSS.cy + BOSS.h / 2}
                stroke="var(--success)"
                strokeWidth="1.6"
                strokeDasharray="5 3"
                markerEnd="url(#sdd-arrow-success)"
                opacity={reportActive ? 1 : 0.18}
              />
            ))}

            {/* 主管节点（stage 0 / 4 高亮） */}
            <g opacity={bossActive ? 1 : 0.5}>
              <rect
                x={BOSS.cx - BOSS.w / 2}
                y={BOSS.cy - BOSS.h / 2}
                width={BOSS.w}
                height={BOSS.h}
                rx="10"
                fill={bossActive ? "var(--accent-glow)" : "var(--bg)"}
                stroke="var(--accent)"
                strokeWidth="1.8"
              />
              <text
                x={BOSS.cx}
                y={BOSS.cy - 2}
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="700"
                fill="var(--text-primary)"
              >
                主管 supervisor
              </text>
              <text
                x={BOSS.cx}
                y={BOSS.cy + 14}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-secondary)"
              >
                {stage === 0
                  ? "拆活中…"
                  : stage === 4
                    ? "汇总三份产出 → 最终测评"
                    : "拆活 · 分派 · 汇总"}
              </text>
            </g>

            {/* 3 个 worker */}
            {WORKERS.map((w, i) => {
              const lit = workActive || reportActive;
              return (
                <g key={`w-${i}`} opacity={lit ? 1 : 0.5}>
                  <rect
                    x={workerCx(i) - W_W / 2}
                    y={W_Y - W_H / 2}
                    width={W_W}
                    height={W_H}
                    rx="10"
                    fill={workActive ? "var(--accent-glow)" : "var(--bg)"}
                    stroke="var(--accent)"
                    strokeWidth="1.6"
                  />
                  <text
                    x={workerCx(i)}
                    y={W_Y - 14}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="var(--text-primary)"
                  >
                    {w.role}
                  </text>
                  <text
                    x={workerCx(i)}
                    y={W_Y + 2}
                    textAnchor="middle"
                    fontSize="10"
                    fill="var(--text-secondary)"
                  >
                    专管：{w.task}
                  </text>
                  {/* 汇报阶段显示各自产出 */}
                  <text
                    x={workerCx(i)}
                    y={W_Y + 18}
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="600"
                    fill="var(--success)"
                    opacity={reportActive ? 1 : 0}
                  >
                    {w.result}
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
          ：主管负责「拆活 · 分派 · 汇总」，worker 各管一摊只干一件事——分工 +
          中心化协调，比一个 Agent 又查又写又校稳得多、也好查错。
        </p>
      </div>
    </DemoStage>
  );
}
