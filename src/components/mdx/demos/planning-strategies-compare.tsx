"use client";

import { useState } from "react";

import { DemoStage } from "../controls";

/**
 * <PlanningStrategiesCompare>：CoT / ToT / Plan-and-Execute 三种规划策略对比交互演示
 * （HEL-302，《规划与任务分解 Planning》篇2·4，知识点 3）。
 *
 * 全书隐喻：AI Agent = 私人助理「小特」。三种规划策略**结构不同、适用场景不同**：
 *   - CoT（思维链）：一条直线，想 1 → 想 2 → 想 3 → 答。线性一步步往下想，简单任务够用。
 *   - ToT（思维树）：从一个想法分出多个分支、探索后选最优路；差的分支被剪掉。适合有多解 /
 *     要试错的难题。
 *   - Plan-and-Execute（先规划后执行）：先列一张完整计划清单，再逐项打勾执行。适合步骤明确
 *     的复杂多步任务。
 * 点 / 切策略 → 高亮其结构（换一张对应的小 SVG 示意图）+ 旁注「适合什么场景」。必有重置。
 *
 * 每种策略各画一张**独立小 SVG**：CoT 横向直线、ToT 分叉树（剪掉的分支用 danger 虚线淡显、
 * 选中的最优路用 success 高亮）、Plan-Execute 竖排清单（打勾项 success）。每张图自成一体、
 * 几何天然守规则（单一 x/y 公式、text 居中、距边 ≥16px、字号 ≥10px，不套整圈大框）。
 *
 * 为何 client：策略切换是真交互（受控状态），用状态高亮当前策略 + 换图 + 换旁注。颜色 /
 * 间距 / 圆角 / 动效全部走 DESIGN token（硬规则 5）。
 */

type StrategyKey = "cot" | "tot" | "plan";

type Strategy = {
  key: StrategyKey;
  label: string;
  en: string;
  color: string;
  /** 一句话结构。 */
  structure: string;
  /** 适合什么场景。 */
  scene: string;
};

const STRATEGIES: readonly Strategy[] = [
  {
    key: "cot",
    label: "思维链 CoT",
    en: "Chain-of-Thought",
    color: "var(--accent)",
    structure: "一条直线：想 1 → 想 2 → 想 3 → 答，线性一步步往下推。",
    scene:
      "适合简单、线性的问题——一条路想到底就能解，不需要试错或比较多种走法。结构最轻，最省事。",
  },
  {
    key: "tot",
    label: "思维树 ToT",
    en: "Tree-of-Thoughts",
    color: "var(--warning)",
    structure:
      "一棵树：从一个想法分出多个分支、各探一探，比较后选最优路，差的分支剪掉。",
    scene:
      "适合有多种解法、需要试错的难题——像下棋，得展开几条路探一探、互相比较再挑最好的那条。代价是更慢更贵。",
  },
  {
    key: "plan",
    label: "先规划后执行",
    en: "Plan-and-Execute",
    color: "var(--success)",
    structure:
      "先一次性列出一张完整计划清单，再逐项打勾执行——计划在前，执行在后。",
    scene:
      "适合步骤清楚的复杂多步任务——大目标能提前拆成有序的几步（像办旅行），先排好整张计划再照着一项项做，不必边走边猜下一步。",
  },
];

// —— 各策略的独立小 SVG（viewBox 各自适配，几何守规则）。 ——

/** CoT：横向一条直线，4 个节点（想1 → 想2 → 想3 → 答）。 */
function CotMiniSvg() {
  const W = 440;
  const H = 120;
  const cy = 60;
  const n = 4;
  const marginX = 24;
  const innerW = W - 2 * marginX;
  const nodeW = 78;
  const nodeH = 36;
  // 单一 x 公式：第 i 个节点中心。
  const cx = (i: number) => marginX + ((i + 0.5) * innerW) / n;
  const nodes = ["想 1", "想 2", "想 3", "答案"];
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="思维链 CoT 的结构：四个盒子想 1、想 2、想 3、答案横向排成一条直线，用箭头依次相连，表示线性一步步往下推到答案，没有分支。"
      className="mx-auto block h-auto w-full max-w-[440px]"
    >
      <text
        x={marginX}
        y={28}
        textAnchor="start"
        fontSize="11"
        fontWeight="700"
        fill="var(--accent)"
      >
        CoT：一条直线想到底（无分支）
      </text>
      {/* 连线（节点间向右箭头） */}
      {nodes.slice(0, -1).map((_, i) => (
        <line
          key={`cot-edge-${i}`}
          x1={cx(i) + nodeW / 2}
          y1={cy}
          x2={cx(i + 1) - nodeW / 2}
          y2={cy}
          stroke="var(--accent)"
          strokeWidth="2"
          markerEnd="url(#psc-arrow-accent)"
        />
      ))}
      {/* 节点 */}
      {nodes.map((label, i) => {
        const isAnswer = i === nodes.length - 1;
        return (
          <g key={`cot-node-${i}`}>
            <rect
              x={cx(i) - nodeW / 2}
              y={cy - nodeH / 2}
              width={nodeW}
              height={nodeH}
              rx="8"
              fill={isAnswer ? "var(--accent-glow)" : "var(--bg)"}
              stroke="var(--accent)"
              strokeWidth="1.8"
            />
            <text
              x={cx(i)}
              y={cy + 4}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight={isAnswer ? 700 : 600}
              fill={isAnswer ? "var(--accent)" : "var(--text-primary)"}
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** ToT：一棵分叉树，根 → 3 分支 → 选中 1 条最优路（绿）、剪掉 2 条差分支（红虚线淡显）。 */
function TotMiniSvg() {
  const W = 440;
  const H = 200;
  const marginX = 24;
  const innerW = W - 2 * marginX;
  const rootCx = W / 2;
  const rootCy = 44;
  const branchCy = 116;
  const leafCy = 178;
  const nodeW = 96;
  const nodeH = 34;
  const branchW = 80;
  const branchH = 30;
  const nb = 3;
  // 单一 x 公式：第 i 个分支中心。
  const branchCx = (i: number) => marginX + ((i + 0.5) * innerW) / nb;
  // 选中的最优路 = 中间分支（index 1）。
  const chosen = 1;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="思维树 ToT 的结构：顶部一个根想法，向下分出三条分支去探索。左右两条是被剪掉的差分支，用红色虚线淡显标注已剪掉。中间一条是选中的最优路，用绿色高亮，往下接到答案。表示像下棋一样展开多条路探一探、比较后选最优、剪掉差的。"
      className="mx-auto block h-auto w-full max-w-[440px]"
    >
      <text
        x={marginX}
        y={28}
        textAnchor="start"
        fontSize="11"
        fontWeight="700"
        fill="var(--warning)"
      >
        ToT：探多条路，选最优、剪掉差的
      </text>
      {/* 根 → 3 分支的连线 */}
      {[0, 1, 2].map((i) => {
        const isChosen = i === chosen;
        return (
          <line
            key={`tot-edge-${i}`}
            x1={rootCx}
            y1={rootCy + nodeH / 2}
            x2={branchCx(i)}
            y2={branchCy - branchH / 2}
            stroke={isChosen ? "var(--success)" : "var(--danger)"}
            strokeWidth={isChosen ? "2.4" : "1.6"}
            strokeDasharray={isChosen ? undefined : "4 3"}
            opacity={isChosen ? 1 : 0.5}
          />
        );
      })}
      {/* 选中分支 → 答案的连线 */}
      <line
        x1={branchCx(chosen)}
        y1={branchCy + branchH / 2}
        x2={rootCx}
        y2={leafCy - nodeH / 2}
        stroke="var(--success)"
        strokeWidth="2.4"
        markerEnd="url(#psc-arrow-success)"
      />
      {/* 根 */}
      <g>
        <rect
          x={rootCx - nodeW / 2}
          y={rootCy - nodeH / 2}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="var(--bg)"
          stroke="var(--warning)"
          strokeWidth="1.8"
        />
        <text
          x={rootCx}
          y={rootCy + 4}
          textAnchor="middle"
          fontSize="11"
          fontWeight="600"
          fill="var(--text-primary)"
        >
          根想法
        </text>
      </g>
      {/* 3 分支 */}
      {[0, 1, 2].map((i) => {
        const isChosen = i === chosen;
        return (
          <g key={`tot-branch-${i}`}>
            <rect
              x={branchCx(i) - branchW / 2}
              y={branchCy - branchH / 2}
              width={branchW}
              height={branchH}
              rx="8"
              fill={isChosen ? "var(--bg)" : "var(--bg)"}
              stroke={isChosen ? "var(--success)" : "var(--danger)"}
              strokeWidth={isChosen ? "2.2" : "1.4"}
              strokeDasharray={isChosen ? undefined : "4 3"}
              opacity={isChosen ? 1 : 0.5}
            />
            <text
              x={branchCx(i)}
              y={branchCy + 4}
              textAnchor="middle"
              fontSize="10.5"
              fontWeight={isChosen ? 700 : 600}
              fill={isChosen ? "var(--success)" : "var(--danger)"}
              opacity={isChosen ? 1 : 0.6}
            >
              {isChosen ? "最优路" : "剪掉"}
            </text>
          </g>
        );
      })}
      {/* 答案 */}
      <g>
        <rect
          x={rootCx - nodeW / 2}
          y={leafCy - nodeH / 2}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="var(--bg)"
          stroke="var(--success)"
          strokeWidth="2"
        />
        <text
          x={rootCx}
          y={leafCy + 4}
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="var(--success)"
        >
          选中路的答案
        </text>
      </g>
    </svg>
  );
}

/** Plan-and-Execute：先一张完整计划清单（左），再逐项打勾执行（右用勾）。 */
function PlanMiniSvg() {
  const W = 440;
  const H = 184;
  const marginX = 24;
  const itemX = marginX + 8;
  const itemW = W - 2 * marginX - 16;
  const itemH = 30;
  const gap = 10;
  const topY = 44;
  const items = ["1 订往返高铁票", "2 订酒店", "3 排三天行程", "4 出发"];
  // 单一 y 公式：第 i 项顶边。前两项已执行（打勾）。
  const itemY = (i: number) => topY + i * (itemH + gap);
  const done = 2; // 前 2 项已打勾
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="先规划后执行 Plan-and-Execute 的结构：先列出一张完整计划清单，共四项，从上到下是订往返高铁票、订酒店、排三天行程、出发。然后逐项打勾执行：前两项订高铁票和订酒店已经打上绿色对勾表示完成，后两项还在排队。表示计划在前、执行在后，照着清单一项项做。"
      className="mx-auto block h-auto w-full max-w-[440px]"
    >
      <text
        x={marginX}
        y={28}
        textAnchor="start"
        fontSize="11"
        fontWeight="700"
        fill="var(--success)"
      >
        Plan-and-Execute：先列整张计划，再逐项打勾执行
      </text>
      {items.map((label, i) => {
        const isDone = i < done;
        return (
          <g key={`plan-item-${i}`}>
            <rect
              x={itemX}
              y={itemY(i)}
              width={itemW}
              height={itemH}
              rx="8"
              fill={isDone ? "var(--bg-elevated)" : "var(--bg)"}
              stroke={isDone ? "var(--success)" : "var(--border)"}
              strokeWidth="1.6"
            />
            {/* 勾选框 / 对勾 */}
            {isDone ? (
              <path
                d={`M ${itemX + 12} ${itemY(i) + itemH / 2} l 5 5 l 9 -10`}
                fill="none"
                stroke="var(--success)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <rect
                x={itemX + 10}
                y={itemY(i) + itemH / 2 - 7}
                width={14}
                height={14}
                rx="3"
                fill="none"
                stroke="var(--text-secondary)"
                strokeWidth="1.6"
              />
            )}
            <text
              x={itemX + 36}
              y={itemY(i) + itemH / 2 + 4}
              textAnchor="start"
              fontSize="11.5"
              fontWeight="600"
              fill={isDone ? "var(--success)" : "var(--text-primary)"}
            >
              {label}
            </text>
            <text
              x={itemX + itemW - 12}
              y={itemY(i) + itemH / 2 + 4}
              textAnchor="end"
              fontSize="10"
              fontWeight="600"
              fill="var(--text-secondary)"
            >
              {isDone ? "已完成" : "待执行"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** SVG 共用箭头标记（一处定义，三图复用）。 */
function SharedDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <marker
          id="psc-arrow-accent"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6 z" fill="var(--accent)" />
        </marker>
        <marker
          id="psc-arrow-success"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L6 3 L0 6 z" fill="var(--success)" />
        </marker>
      </defs>
    </svg>
  );
}

export function PlanningStrategiesCompare() {
  // 默认选中 ToT（章节「猜一猜」引导读者比较 CoT vs ToT，落点正是 ToT 适合试错难题）。
  const [active, setActive] = useState<StrategyKey>("tot");
  const reset = () => setActive("tot");

  const current = STRATEGIES.find((s) => s.key === active)!;

  return (
    <DemoStage
      title="三种规划策略对比：CoT / ToT / 先规划后执行，结构不同、适用场景不同"
      onReset={reset}
      controls={
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs text-secondary">
            点一种策略，看它的结构 + 适合什么场景：
          </span>
          {STRATEGIES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActive(s.key)}
              aria-pressed={active === s.key}
              className={`rounded-control border px-3 py-1 text-xs transition-colors duration-(--duration-hover) ease-standard ${
                active === s.key
                  ? "border-accent text-accent"
                  : "border-border text-secondary hover:text-primary"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      }
    >
      <SharedDefs />
      <div className="w-full max-w-[460px] text-sm">
        {/* 当前策略的结构示意图 */}
        <div className="rounded-control border border-border bg-bg p-3">
          {active === "cot" && <CotMiniSvg />}
          {active === "tot" && <TotMiniSvg />}
          {active === "plan" && <PlanMiniSvg />}
        </div>

        {/* 旁注：结构 + 适合什么场景 */}
        <div className="mt-3 rounded-control border border-border bg-elevated p-3">
          <p
            className="mb-1 text-xs font-semibold"
            style={{ color: current.color }}
          >
            {current.label}（{current.en}）
          </p>
          <p className="mb-2 text-xs text-secondary">
            <strong className="text-primary">结构</strong>：{current.structure}
          </p>
          <p className="text-xs text-secondary">
            <strong className="text-primary">适合什么场景</strong>：
            {current.scene}
          </p>
        </div>

        {/* 一句话选型口诀 */}
        <p className="mt-3 rounded-control border border-accent/40 bg-bg p-2 text-[11px] leading-relaxed text-secondary">
          <strong className="text-primary">选型口诀</strong>：简单线性问题用
          <strong className="text-accent">「CoT」</strong>
          ；有多解、要试错的难题用
          <strong className="text-warning">「ToT」</strong>
          ；步骤明确的复杂多步任务用
          <strong className="text-success">「先规划后执行」</strong>。
        </p>
      </div>
    </DemoStage>
  );
}
