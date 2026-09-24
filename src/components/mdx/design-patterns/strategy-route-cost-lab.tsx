"use client";

import { useId, useState } from "react";

export const vertices = ["S", "A", "B", "T"] as const;
export type Vertex = (typeof vertices)[number];
export type Edge = Readonly<{ from: Vertex; to: Vertex; cost: number }>;
export type Request = Readonly<{
  edges: readonly Edge[];
  start: Vertex;
  goal: Vertex;
}>;
export type Route = { path: Vertex[]; hops: number; cost: number };
export type Result =
  | ({ status: "ok" } & Route)
  | { status: "unreachable" }
  | { status: "invalid"; reason: string };
export type Strategy = (request: Request) => Result;
export type Objective = "hops" | "cost";
export type Scenario = "base" | "shortcut" | "closed" | "negative";

export function validate(q: Request): string | undefined {
  if (!vertices.includes(q.start) || !vertices.includes(q.goal)) {
    return "invalid-node";
  }
  const pairs = new Set<string>();
  for (const e of q.edges) {
    if (!vertices.includes(e.from) || !vertices.includes(e.to)) {
      return "invalid-node";
    }
    if (!Number.isSafeInteger(e.cost) || e.cost < 0 || e.cost > 1_000_000) {
      return "invalid-weight";
    }
    const pair = `${e.from}:${e.to}`;
    if (pairs.has(pair)) return "duplicate-edge";
    pairs.add(pair);
  }
}

// Tiny graph: a sorted array is clearer here than a production priority queue.
// Settling on removal (not discovery) is essential for nonnegative weights.
export function search(q: Request, objective: Objective): Result {
  const reason = validate(q);
  if (reason) return { status: "invalid", reason };
  const frontier: Route[] = [{ path: [q.start], hops: 0, cost: 0 }];
  const settled = new Set<Vertex>();
  while (frontier.length) {
    frontier.sort((a, b) => a[objective] - b[objective]);
    const route = frontier.shift()!;
    const last = route.path[route.path.length - 1];
    if (settled.has(last)) continue;
    settled.add(last);
    if (last === q.goal) return { status: "ok", ...route };
    for (const edge of q.edges) {
      if (edge.from === last && !settled.has(edge.to)) {
        frontier.push({
          path: [...route.path, edge.to],
          hops: route.hops + 1,
          cost: route.cost + edge.cost,
        });
      }
    }
  }
  return { status: "unreachable" };
}

export const fewestHops: Strategy = (q) => search(q, "hops");
export const lowestCost: Strategy = (q) => search(q, "cost");
// Intentionally violates the minimum-cost postcondition on the base graph.
export const brokenCost: Strategy = (q) => fewestHops(q);

export function makeRequest(scenario: Scenario): Request {
  const direct = scenario === "shortcut" ? 2 : scenario === "negative" ? -1 : 9;
  const edges: Edge[] = [
    { from: "S", to: "T", cost: direct },
    { from: "S", to: "A", cost: 1 },
    { from: "A", to: "T", cost: 7 },
    { from: "A", to: "B", cost: 1 },
    { from: "B", to: "T", cost: 1 },
  ];
  return {
    start: "S",
    goal: "T",
    edges: scenario === "closed" ? edges.filter((e) => e.to !== "T") : edges,
  };
}

export class RouteContext {
  constructor(private strategy: Strategy) {}
  setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }
  plan(q: Request): Result {
    return this.strategy(q);
  }
}

const positions: Record<Vertex, { x: number; y: number }> = {
  S: { x: 32, y: 196 },
  A: { x: 92, y: 58 },
  B: { x: 248, y: 58 },
  T: { x: 308, y: 196 },
};
const labels: Record<string, { x: number; y: number }> = {
  "S:T": { x: 170, y: 182 },
  "S:A": { x: 43, y: 123 },
  "A:T": { x: 198, y: 144 },
  "A:B": { x: 170, y: 44 },
  "B:T": { x: 299, y: 123 },
};
const control =
  "min-h-11 w-full rounded-control border border-border bg-bg px-3 text-base text-primary focus-visible:outline-2 focus-visible:outline-accent";

export function StrategyRouteCostLab() {
  const [objective, setObjective] = useState<Objective>("hops");
  const [scenario, setScenario] = useState<Scenario>("base");
  const [broken, setBroken] = useState(false);
  const id = useId().replaceAll(":", "");
  const request = makeRequest(scenario);
  const strategy =
    objective === "hops" ? fewestHops : broken ? brokenCost : lowestCost;
  const result = new RouteContext(strategy).plan(request);
  const expected = (objective === "hops" ? fewestHops : lowestCost)(request);
  const violation =
    result.status === "ok" &&
    expected.status === "ok" &&
    result[objective] !== expected[objective];
  const path = result.status === "ok" ? result.path : [];
  const segments = path
    .slice(1)
    .map(
      (to, i) => request.edges.find((e) => e.from === path[i] && e.to === to)!,
    );
  const cumulative = [0];
  for (const e of segments)
    cumulative.push(cumulative[cumulative.length - 1] + e.cost);
  const summary =
    result.status === "ok"
      ? `${path.join(" → ")}；${result.hops} 跳，成本 ${result.cost}`
      : result.status === "invalid"
        ? `输入拒绝：${result.reason}；未开始搜索`
        : "不可达：T 没有入边，不伪造成功路径";

  return (
    <section
      aria-label="策略路线成本实验"
      className="my-6 rounded-card border border-border bg-elevated p-3 sm:p-5"
    >
      <h3 className="text-base font-semibold text-primary">
        同一张图，两种最优
      </h3>
      <p className="mt-2 text-base text-secondary">
        边上的数是成本，不是距离。箭头给出方向；粗实线是实际返回的路线，节点下方
        Σ 是沿该路线累计的成本。
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1 text-base text-primary">
          选择目标（调用方职责）
          <select
            className={control}
            value={objective}
            onChange={(e) => setObjective(e.target.value as Objective)}
          >
            <option value="hops">最少跳数</option>
            <option value="cost">最小成本</option>
          </select>
        </label>
        <label className="grid gap-1 text-base text-primary">
          输入图（两策略共享）
          <select
            className={control}
            value={scenario}
            onChange={(e) => setScenario(e.target.value as Scenario)}
          >
            <option value="base">基准：S→T 成本 9</option>
            <option value="shortcut">降价：S→T 成本 2</option>
            <option value="closed">封闭终点：删除 T 的入边</option>
            <option value="negative">非法输入：S→T 成本 -1</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-2 text-base text-primary">
          <input
            className="h-5 w-5 accent-(--accent)"
            type="checkbox"
            checked={broken}
            onChange={(e) => setBroken(e.target.checked)}
          />
          错误实现：用最少跳数冒充最小成本
        </label>
        <button
          type="button"
          className={control}
          onClick={() => {
            setObjective("hops");
            setScenario("base");
            setBroken(false);
          }}
        >
          重置实验
        </button>
      </div>
      <p className="mt-3 text-base text-secondary">
        {broken && objective === "hops"
          ? "当前仍是最少跳数；切到最小成本才会调用错误实现。"
          : "先预测，再切换目标，观察高亮边与 Σ 值。"}
      </p>
      <svg
        viewBox="0 0 340 252"
        role="img"
        aria-labelledby={`${id}-title`}
        className="mx-auto mt-3 block w-full max-w-lg"
      >
        <title
          id={`${id}-title`}
        >{`有向加权图。${summary}。${violation ? "当前结果违反最小成本契约。" : ""}`}</title>
        <defs>
          {["neutral", "selected", "warning"].map((tone) => (
            <marker
              key={tone}
              id={`${id}-${tone}`}
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path
                d="M0 0 L8 4 L0 8 Z"
                fill={
                  tone === "selected"
                    ? "var(--accent)"
                    : tone === "warning"
                      ? "var(--warning)"
                      : "var(--text-secondary)"
                }
              />
            </marker>
          ))}
        </defs>
        {request.edges.map((edge) => {
          const key = `${edge.from}:${edge.to}`;
          const selected = segments.includes(edge);
          const a = positions[edge.from],
            b = positions[edge.to];
          const length = Math.hypot(b.x - a.x, b.y - a.y);
          const dx = (b.x - a.x) / length,
            dy = (b.y - a.y) / length;
          const tone =
            edge.cost < 0 ? "warning" : selected ? "selected" : "neutral";
          const color =
            tone === "selected"
              ? "var(--accent)"
              : tone === "warning"
                ? "var(--warning)"
                : "var(--text-secondary)";
          return (
            <g key={key} data-edge={key} data-selected={selected}>
              <line
                x1={a.x + dx * 19}
                y1={a.y + dy * 19}
                x2={b.x - dx * 23}
                y2={b.y - dy * 23}
                stroke={color}
                strokeWidth={selected ? 4 : 1.5}
                strokeDasharray={selected ? "none" : "5 4"}
                markerEnd={`url(#${id}-${tone})`}
              />
              <text
                x={labels[key].x}
                y={labels[key].y}
                fontSize="16"
                textAnchor="middle"
                fill={color}
                stroke="var(--bg-elevated)"
                strokeWidth="5"
                paintOrder="stroke"
              >
                {String(edge.cost)}
              </text>
            </g>
          );
        })}
        {vertices.map((vertex) => {
          const { x, y } = positions[vertex];
          const index = path.indexOf(vertex);
          return (
            <g key={vertex}>
              <circle
                cx={x}
                cy={y}
                r="18"
                fill="var(--bg-elevated)"
                stroke={index >= 0 ? "var(--accent)" : "var(--border)"}
                strokeWidth="2"
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fontSize="16"
                fill="var(--text-primary)"
              >
                {vertex}
              </text>
              <text
                x={x}
                y={y + 38}
                textAnchor="middle"
                fontSize="15"
                fill={index >= 0 ? "var(--accent)" : "var(--text-secondary)"}
              >
                {index >= 0 ? `Σ ${cumulative[index]}` : "—"}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        role="status"
        aria-live="polite"
        className="rounded-control border border-border p-3 text-base text-primary"
      >
        <p>{summary}</p>
        <p className={violation ? "mt-2 text-warning" : "mt-2 text-secondary"}>
          {violation && expected.status === "ok"
            ? `契约失败：声称最小成本却返回 ${result.status === "ok" ? result.cost : ""}；反证路线 ${expected.path.join(" → ")} 只要 ${expected.cost}。`
            : result.status === "ok"
              ? "本输入满足当前目标的后置条件；单次通过不证明所有输入都正确。"
              : "没有成功结果：图中不显示任何选中边或累计值。"}
        </p>
      </div>
      <svg
        viewBox="0 0 340 105"
        role="img"
        aria-label="沿所选路线逐边累加成本；固定刻度0到10，无路线时留空"
        className="mx-auto mt-3 block w-full max-w-lg"
      >
        <text x="20" y="19" fontSize="15" fill="var(--text-primary)">
          {"逐边成本累加（固定 0–10 刻度）"}
        </text>
        <line x1="20" y1="62" x2="320" y2="62" stroke="var(--border)" />
        {segments.map((edge, i) => (
          <g key={`${edge.from}:${edge.to}`}>
            <rect
              x={20 + cumulative[i] * 30}
              y="34"
              width={edge.cost * 30}
              height="27"
              fill="var(--accent)"
              fillOpacity={i % 2 === 0 ? 0.85 : 0.45}
              stroke="var(--bg-elevated)"
            />
            <text
              x={20 + (cumulative[i] + edge.cost / 2) * 30}
              y="51"
              textAnchor="middle"
              fontSize="15"
              fill="var(--text-primary)"
            >
              {String(edge.cost)}
            </text>
          </g>
        ))}
        <text x="20" y="88" fontSize="15" fill="var(--text-secondary)">
          {"0"}
        </text>
        <text
          x="320"
          y="88"
          textAnchor="end"
          fontSize="15"
          fill="var(--text-secondary)"
        >
          {"10"}
        </text>
        {result.status === "ok" && (
          <text
            x={20 + result.cost * 30}
            y="88"
            textAnchor="middle"
            fontSize="15"
            fill="var(--accent)"
          >{`Σ ${result.cost}`}</text>
        )}
      </svg>
      <p className="text-base text-secondary">
        基准图只有三条 S→T 路线：直达（1 跳 / 9）、经 A（2 跳 / 8）、经 A、B（3
        跳 / 3）。这是可穷举的反证，不是模拟评分。
      </p>
    </section>
  );
}
