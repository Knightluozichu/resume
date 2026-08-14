"use client";

import { useState } from "react";

type DecisionId = "choice" | "state" | "proof";
type RecurrenceId = "split" | "memo" | "bound";
type SearchId = "random" | "prune" | "verify";

const conceptLine =
  "algorithm design techniques · greedy algorithms · divide and conquer · dynamic programming · randomized algorithms · backtracking algorithms";

const frameClass =
  "not-prose overflow-hidden rounded-card border border-border bg-elevated";

const buttonClass =
  "min-h-11 rounded-control border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function VisualHeader({
  title,
  prompt,
  onReset,
}: {
  title: string;
  prompt: string;
  onReset: () => void;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3 border-b border-border p-4">
      <div>
        <p className="text-xs font-medium text-accent">
          Algorithm Design 证据图
        </p>
        <h3 className="mt-1 text-lg font-semibold text-primary">{title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-secondary">
          {prompt}
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className={`${buttonClass} border-border font-medium text-secondary hover:border-accent hover:text-accent`}
      >
        重置
      </button>
    </header>
  );
}

function DecisionSvg({ active }: { active: DecisionId }) {
  const stages = [
    { id: "choice", label: "choice", detail: "先选什么" },
    { id: "state", label: "state", detail: "保存什么" },
    { id: "proof", label: "proof", detail: "凭什么对" },
  ] as const;
  const accent = "var(--accent)";
  return (
    <svg
      viewBox="0 0 760 360"
      role="img"
      aria-label={`设计技巧决策图，当前阶段 ${active}`}
      className="mx-auto block h-auto w-full"
    >
      <title>Algorithm design decision map</title>
      <text
        x="380"
        y="28"
        textAnchor="middle"
        fill="var(--text-primary)"
        fontSize="16"
        fontWeight="700"
      >
        先确定证据责任，再选择 algorithm design techniques
      </text>
      <text
        x="380"
        y="52"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="12"
      >
        counterexample → state/choice → proof → benchmark
      </text>
      {stages.map((stage, index) => {
        const x = 42 + index * 240;
        const selected = active === stage.id;
        return (
          <g key={stage.id}>
            <rect
              x={x}
              y="82"
              width="190"
              height="76"
              rx="12"
              fill={selected ? "var(--accent)" : "var(--bg)"}
              fillOpacity={selected ? "0.14" : "1"}
              stroke={selected ? accent : "var(--border)"}
              strokeWidth={selected ? "2" : "1"}
            />
            <text
              x={x + 95}
              y="112"
              textAnchor="middle"
              fill={selected ? accent : "var(--text-primary)"}
              fontSize="15"
              fontWeight="700"
            >
              {stage.label}
            </text>
            <text
              x={x + 95}
              y="136"
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="12"
            >
              {stage.detail}
            </text>
            {index < stages.length - 1 && (
              <path
                d={`M${x + 194} 120 H${x + 232}`}
                stroke="var(--text-secondary)"
                strokeWidth="2"
                markerEnd="url(#decision-arrow)"
              />
            )}
          </g>
        );
      })}
      <defs>
        <marker
          id="decision-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--text-secondary)" />
        </marker>
      </defs>
      <rect
        x="42"
        y="202"
        width="676"
        height="104"
        rx="12"
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <text x="64" y="230" fill={accent} fontSize="13" fontWeight="700">
        {active === "choice"
          ? "greedy algorithms"
          : active === "state"
            ? "dynamic programming"
            : "backtracking algorithms"}
      </text>
      <text x="64" y="257" fill="var(--text-primary)" fontSize="12">
        {active === "choice"
          ? "证明 safe choice：交换后，余下问题仍可行且不变差。"
          : active === "state"
            ? "定义 state 与 transition：只保存影响未来决策的信息。"
            : "证明搜索完整，且每次 pruning 只删除无法扩展的部分状态。"}
      </text>
      <text x="64" y="282" fill="var(--text-secondary)" fontSize="12">
        记录一个反例、一条不变量和一个可复现输入；只看代码外形不足以证明正确性。
      </text>
    </svg>
  );
}

export function DsaAlgorithmDesignDecisionLab() {
  const [active, setActive] = useState<DecisionId>("choice");
  const options: readonly [DecisionId, string][] = [
    ["choice", "选择与反例"],
    ["state", "状态与转移"],
    ["proof", "证明与剪枝"],
  ];
  return (
    <figure
      className={frameClass}
      data-visual-kind="dsa-algorithm-design-decision"
      data-visual-concepts={conceptLine}
    >
      <VisualHeader
        title="从反例定位设计责任"
        prompt="切换选择、状态或证明视角，观察同一个问题应留下哪类证据。"
        onReset={() => setActive("choice")}
      />
      <div
        className="grid gap-2 border-b border-border p-4 sm:grid-cols-3"
        role="tablist"
        aria-label="算法设计责任"
      >
        {options.map(([id, label]) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(id)}
              className={`${buttonClass} ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        <DecisionSvg active={active} />
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 10-1：算法设计技巧的选择必须连接反例、状态、证明与基准。
      </figcaption>
    </figure>
  );
}

function RecurrenceSvg({ active }: { active: RecurrenceId }) {
  const selected =
    active === "split"
      ? "divide and conquer"
      : active === "memo"
        ? "dynamic programming"
        : "greedy algorithms";
  const note =
    active === "split"
      ? "拆分独立子问题，先证明 combine 保持目标。"
      : active === "memo"
        ? "为重复状态保存结果，并保留选择以重建解。"
        : "只有 safe-choice lemma 成立，局部选择才可承诺全局最优。";
  return (
    <svg
      viewBox="0 0 760 360"
      role="img"
      aria-label={`递推与状态图，当前阶段 ${selected}`}
      className="mx-auto block h-auto w-full"
    >
      <title>Recurrence and state map</title>
      <text
        x="380"
        y="28"
        textAnchor="middle"
        fill="var(--text-primary)"
        fontSize="16"
        fontWeight="700"
      >
        从 recurrence 看 divide and conquer 与 dynamic programming
      </text>
      <text
        x="380"
        y="52"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="12"
      >
        T(n) → subproblems → overlap → saved evidence
      </text>
      <rect
        x="44"
        y="84"
        width="160"
        height="62"
        rx="12"
        fill="var(--bg)"
        stroke={active === "split" ? "var(--accent)" : "var(--border)"}
        strokeWidth={active === "split" ? "2" : "1"}
      />
      <text
        x="124"
        y="112"
        textAnchor="middle"
        fill="var(--text-primary)"
        fontSize="14"
        fontWeight="700"
      >
        T(n)
      </text>
      <text
        x="124"
        y="134"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="11"
      >
        aT(n/b)+f(n)
      </text>
      <path
        d="M208 115 H272"
        stroke="var(--text-secondary)"
        strokeWidth="2"
        markerEnd="url(#recurrence-arrow)"
      />
      <rect
        x="278"
        y="84"
        width="200"
        height="62"
        rx="12"
        fill="var(--bg)"
        stroke={active === "split" ? "var(--accent)" : "var(--border)"}
        strokeWidth={active === "split" ? "2" : "1"}
      />
      <text
        x="378"
        y="112"
        textAnchor="middle"
        fill="var(--text-primary)"
        fontSize="14"
        fontWeight="700"
      >
        subproblems
      </text>
      <text
        x="378"
        y="134"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="11"
      >
        独立？重叠？
      </text>
      <path
        d="M482 115 H546"
        stroke="var(--text-secondary)"
        strokeWidth="2"
        markerEnd="url(#recurrence-arrow)"
      />
      <rect
        x="552"
        y="84"
        width="164"
        height="62"
        rx="12"
        fill="var(--bg)"
        stroke={active === "memo" ? "var(--accent)" : "var(--border)"}
        strokeWidth={active === "memo" ? "2" : "1"}
      />
      <text
        x="634"
        y="112"
        textAnchor="middle"
        fill="var(--text-primary)"
        fontSize="14"
        fontWeight="700"
      >
        evidence
      </text>
      <text
        x="634"
        y="134"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="11"
      >
        cost + choice
      </text>
      <defs>
        <marker
          id="recurrence-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill="var(--text-secondary)" />
        </marker>
      </defs>
      <rect
        x="44"
        y="194"
        width="672"
        height="106"
        rx="12"
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <text x="66" y="224" fill="var(--accent)" fontSize="13" fontWeight="700">
        {selected}
      </text>
      <text x="66" y="252" fill="var(--text-primary)" fontSize="12">
        {note}
      </text>
      <text x="66" y="278" fill="var(--text-secondary)" fontSize="12">
        基准记录输入规模、访问次数、内存和重建路径；不把平均表现写成最坏保证。
      </text>
    </svg>
  );
}

export function DsaAlgorithmDesignRecurrenceLab() {
  const [active, setActive] = useState<RecurrenceId>("split");
  const options: readonly [RecurrenceId, string][] = [
    ["split", "拆分"],
    ["memo", "保存状态"],
    ["bound", "安全选择"],
  ];
  return (
    <figure
      className={frameClass}
      data-visual-kind="dsa-algorithm-design-recurrence"
      data-visual-concepts={conceptLine}
    >
      <VisualHeader
        title="让成本、状态和选择可追踪"
        prompt="切换拆分、保存状态或安全选择，比较证明对象如何改变。"
        onReset={() => setActive("split")}
      />
      <div
        className="grid gap-2 border-b border-border p-4 sm:grid-cols-3"
        role="tablist"
        aria-label="递推证据视角"
      >
        {options.map(([id, label]) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(id)}
              className={`${buttonClass} ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        <RecurrenceSvg active={active} />
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图
        10-2：递推式不只是复杂度记号，也决定子问题、重叠和选择证据的保存方式。
      </figcaption>
    </figure>
  );
}

function SearchSvg({ active }: { active: SearchId }) {
  const label =
    active === "random"
      ? "randomized algorithms"
      : active === "prune"
        ? "backtracking algorithms"
        : "proof replay";
  const detail =
    active === "random"
      ? "记录 seed、试验次数与 error bound，区分 Las Vegas 和 Monte Carlo。"
      : active === "prune"
        ? "apply/undo 对称；pruning 只能删除无法扩展的 partial state。"
        : "重放一个失败分支，验证随机选择、约束与目标边界。";
  const points = [
    { x: 100, y: 116, id: "root" },
    { x: 260, y: 82, id: "a" },
    { x: 260, y: 150, id: "b" },
    { x: 420, y: 52, id: "a1" },
    { x: 420, y: 112, id: "a2" },
    { x: 420, y: 172, id: "b1" },
    { x: 580, y: 82, id: "keep" },
    { x: 580, y: 172, id: "cut" },
  ];
  const edge = (from: (typeof points)[number], to: (typeof points)[number]) => (
    <path
      key={`${from.id}-${to.id}`}
      d={`M${from.x + 14} ${from.y} C${from.x + 70} ${from.y}, ${to.x - 70} ${to.y}, ${to.x - 14} ${to.y}`}
      fill="none"
      stroke="var(--text-secondary)"
      strokeWidth="1.5"
    />
  );
  return (
    <svg
      viewBox="0 0 760 360"
      role="img"
      aria-label={`随机化与回溯搜索图，当前阶段 ${label}`}
      className="mx-auto block h-auto w-full"
    >
      <title>Randomized and backtracking search map</title>
      <text
        x="380"
        y="28"
        textAnchor="middle"
        fill="var(--text-primary)"
        fontSize="16"
        fontWeight="700"
      >
        随机选择与回溯剪枝都要留下失败证据
      </text>
      <text
        x="380"
        y="52"
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize="12"
      >
        seed / constraint / bound → replayable branch
      </text>
      {edge(points[0], points[1])}
      {edge(points[0], points[2])}
      {edge(points[1], points[3])}
      {edge(points[1], points[4])}
      {edge(points[2], points[5])}
      {edge(points[4], points[6])}
      {edge(points[5], points[7])}
      {points.map((point) => {
        const cut = point.id === "cut";
        const activePoint =
          active === "random"
            ? point.id === "root" || point.id === "a"
            : active === "prune"
              ? cut || point.id === "b1"
              : point.id === "keep";
        return (
          <g key={point.id}>
            <circle
              cx={point.x}
              cy={point.y}
              r="14"
              fill={activePoint ? "var(--accent)" : "var(--bg)"}
              fillOpacity={activePoint ? "0.2" : "1"}
              stroke={activePoint ? "var(--accent)" : "var(--border)"}
              strokeWidth={activePoint ? "2" : "1"}
            />
            <text
              x={point.x}
              y={point.y + 4}
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize="11"
              fontWeight="700"
            >
              {cut ? "×" : point.id === "root" ? "S" : "·"}
            </text>
          </g>
        );
      })}
      <rect
        x="44"
        y="230"
        width="672"
        height="74"
        rx="12"
        fill="var(--bg)"
        stroke="var(--border)"
      />
      <text x="66" y="258" fill="var(--accent)" fontSize="13" fontWeight="700">
        {label}
      </text>
      <text x="66" y="282" fill="var(--text-primary)" fontSize="12">
        {detail}
      </text>
    </svg>
  );
}

export function DsaAlgorithmDesignSearchLab() {
  const [active, setActive] = useState<SearchId>("random");
  const options: readonly [SearchId, string][] = [
    ["random", "记录随机性"],
    ["prune", "检查剪枝"],
    ["verify", "重放分支"],
  ];
  return (
    <figure
      className={frameClass}
      data-visual-kind="dsa-algorithm-design-search"
      data-visual-concepts={conceptLine}
    >
      <VisualHeader
        title="把搜索树变成可复核的分支"
        prompt="切换随机性、剪枝或重放视角，观察为什么一次结果不能代替正确性证据。"
        onReset={() => setActive("random")}
      />
      <div
        className="grid gap-2 border-b border-border p-4 sm:grid-cols-3"
        role="tablist"
        aria-label="搜索证据视角"
      >
        {options.map(([id, label]) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(id)}
              className={`${buttonClass} ${selected ? "border-accent bg-accent/10 text-accent" : "border-border text-secondary hover:border-accent hover:text-primary"}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="p-4">
        <SearchSvg active={active} />
      </div>
      <figcaption className="border-t border-border px-4 pb-4 text-center text-xs leading-relaxed text-secondary">
        图 10-3：随机化要复现 seed，回溯要证明被剪枝的分支确实不能产生合格解。
      </figcaption>
    </figure>
  );
}
