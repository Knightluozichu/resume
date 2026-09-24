"use client";

import { useMemo, useState } from "react";

type Edge = { u: number; v: number; w: number };
type Graph = { n: number; directed: boolean; edges: Edge[] };
type Algorithm = "dijkstra" | "bfs" | "topo" | "flow" | "mst" | "dfs";
type Frame = {
  message: string;
  frontier: number[];
  values: number[];
  low: number[];
  selected: number[];
  active: number[];
  done: number[];
  flow: number[];
  cut: number[];
  articulation: number[];
  bridges: number[];
  total: number;
  rejected: boolean;
};
const names = ["A", "B", "C", "D", "E"];
const presets: { label: string; graph: Graph }[] = [
  {
    label: "有向加权路线",
    graph: {
      n: 4,
      directed: true,
      edges: [
        { u: 0, v: 1, w: 2 },
        { u: 0, v: 2, w: 5 },
        { u: 1, v: 2, w: 1 },
        { u: 1, v: 3, w: 7 },
        { u: 2, v: 3, w: 2 },
      ],
    },
  },
  {
    label: "有向单位权路线",
    graph: {
      n: 4,
      directed: true,
      edges: [
        { u: 0, v: 1, w: 1 },
        { u: 0, v: 2, w: 1 },
        { u: 1, v: 2, w: 1 },
        { u: 1, v: 3, w: 1 },
        { u: 2, v: 3, w: 1 },
      ],
    },
  },
  {
    label: "负权反例",
    graph: {
      n: 4,
      directed: true,
      edges: [
        { u: 0, v: 1, w: 2 },
        { u: 0, v: 2, w: 5 },
        { u: 2, v: 1, w: -4 },
        { u: 1, v: 3, w: 2 },
      ],
    },
  },
  {
    label: "有向环 + 孤立 E",
    graph: {
      n: 5,
      directed: true,
      edges: [
        { u: 0, v: 1, w: 1 },
        { u: 1, v: 2, w: 1 },
        { u: 2, v: 0, w: 1 },
        { u: 2, v: 3, w: 1 },
      ],
    },
  },
  {
    label: "无向三角 + 桥 + 孤立 E",
    graph: {
      n: 5,
      directed: false,
      edges: [
        { u: 0, v: 1, w: 2 },
        { u: 0, v: 2, w: 3 },
        { u: 1, v: 2, w: -1 },
        { u: 1, v: 3, w: 4 },
      ],
    },
  },
  {
    label: "流：必须撤销 B→C",
    graph: {
      n: 4,
      directed: true,
      edges: [
        { u: 0, v: 1, w: 1 },
        { u: 1, v: 2, w: 1 },
        { u: 2, v: 3, w: 1 },
        { u: 0, v: 2, w: 1 },
        { u: 1, v: 3, w: 1 },
      ],
    },
  },
];

/** Bounded, pure execution trace. Edge indices identify parallel edges distinctly.
 * Source=0; flow sink=n-1. No random values, timers, or prewritten result arrays.
 */
function trace(graph: Graph, algorithm: Algorithm, fault = false): Frame[] {
  const { n, directed, edges } = graph;
  if (
    !Number.isInteger(n) ||
    n < 2 ||
    n > 5 ||
    edges.length > 12 ||
    edges.some(
      (e) =>
        !Number.isInteger(e.u) ||
        !Number.isInteger(e.v) ||
        e.u < 0 ||
        e.v < 0 ||
        e.u >= n ||
        e.v >= n ||
        !Number.isInteger(e.w) ||
        Math.abs(e.w) > 9,
    )
  ) {
    throw new Error("模型边界：2–5 顶点、至多12边、整数权重 -9…9、合法端点。");
  }
  const state: Frame = {
    message: "初始：尚未执行。",
    frontier: [],
    values: Array(n).fill(Infinity),
    low: Array(n).fill(0),
    selected: [],
    active: [],
    done: [],
    flow: edges.map(() => 0),
    cut: [],
    articulation: [],
    bridges: [],
    total: 0,
    rejected: false,
  };
  const frames: Frame[] = [];
  const save = (message: string) => {
    state.message = message;
    frames.push({
      ...state,
      frontier: [...state.frontier],
      values: [...state.values],
      low: [...state.low],
      selected: [...state.selected],
      active: [...state.active],
      done: [...state.done],
      flow: [...state.flow],
      cut: [...state.cut],
      articulation: [...state.articulation],
      bridges: [...state.bridges],
    });
  };
  const reject = (message: string) => {
    state.rejected = true;
    save(message);
    return frames;
  };
  if ((algorithm === "topo" || algorithm === "flow") && !directed)
    return reject("拒绝：拓扑排序 / 本实验的容量网络必须为有向图。");
  if ((algorithm === "mst" || algorithm === "dfs") && directed)
    return reject("拒绝：本实验的生成森林 / 割点 low-link 只处理无向图。");
  if (
    (algorithm === "dijkstra" || algorithm === "flow") &&
    edges.some((e) => e.w < 0)
  )
    return reject("拒绝：Dijkstra 的边权 / 流的容量不能为负。");
  if (algorithm === "bfs" && edges.some((e) => e.w !== 1))
    return reject(
      "拒绝：此 BFS 返回距离，仅接受全部边权为1；否则只能解释为跳数。",
    );
  const adjacent = (u: number) =>
    edges.flatMap((e, id) =>
      e.u === u
        ? [{ v: e.v, w: e.w, id }]
        : !directed && e.v === u
          ? [{ v: e.u, w: e.w, id }]
          : [],
    );

  if (algorithm === "dijkstra" || algorithm === "bfs") {
    state.values[0] = 0;
    state.frontier = [0];
    const parent = Array(n).fill(-1);
    save("源点 A 距离为0；前沿含 A。");
    while (state.frontier.length) {
      if (algorithm === "dijkstra")
        state.frontier.sort(
          (a, b) => state.values[a] - state.values[b] || a - b,
        );
      const u = state.frontier.shift()!;
      state.done.push(u);
      state.active = [];
      for (const e of adjacent(u)) {
        const candidate = state.values[u] + e.w;
        const firstOnly = algorithm === "bfs" || fault;
        if (
          state.done.includes(e.v) ||
          (firstOnly && state.values[e.v] !== Infinity)
        )
          continue;
        if (candidate < state.values[e.v]) {
          state.values[e.v] = candidate;
          parent[e.v] = e.id;
          state.active.push(e.id);
          if (!state.frontier.includes(e.v)) state.frontier.push(e.v);
        }
      }
      state.selected = parent.filter((id) => id >= 0);
      if (algorithm === "dijkstra")
        state.frontier.sort(
          (a, b) => state.values[a] - state.values[b] || a - b,
        );
      save(
        `取出 ${names[u]}，检查出边并${fault && algorithm === "dijkstra" ? "错误地只接受首次发现" : "更新距离"}。`,
      );
    }
    state.active = [];
    save("前沿为空：不可达顶点保持 ∞。故障模式的数值不保证最短。");
  } else if (algorithm === "topo") {
    state.values = Array(n).fill(0);
    for (const e of edges) state.values[e.v]++;
    state.frontier = state.values.flatMap((d, v) => (d === 0 ? [v] : []));
    save("节点内数字为剩余入度；前沿含所有零入度点。");
    while (state.frontier.length) {
      const u = state.frontier.shift()!;
      state.done.push(u);
      state.active = [];
      for (const e of adjacent(u)) {
        state.active.push(e.id);
        if (--state.values[e.v] === 0) state.frontier.push(e.v);
      }
      save(`输出 ${names[u]}，删除其出边的入度贡献。`);
    }
    state.active = [];
    save(
      state.done.length === n
        ? "全部输出：得到一个拓扑序。"
        : "输出不足顶点数：剩余图含有向环；剩余点未必都在环上。",
    );
  } else if (algorithm === "mst") {
    const parent = Array.from({ length: n }, (_, i) => i);
    const root = (v: number): number => (parent[v] === v ? v : root(parent[v]));
    state.values = [...parent];
    save("每点自成一组；数字为当前并查集代表。按权重、边编号排序。");
    const sorted = edges
      .map((_, i) => i)
      .sort((a, b) => edges[a].w - edges[b].w || a - b);
    for (const id of sorted) {
      const e = edges[id];
      const a = root(e.u),
        b = root(e.v);
      state.active = [id];
      if (a !== b) {
        parent[b] = a;
        state.selected.push(id);
        state.total += e.w;
      }
      state.values = parent.map((_, v) => root(v));
      save(
        `${names[e.u]}—${names[e.v]}：${a === b ? "成环，拒绝" : "连接两个分量，接纳"}；总权重 ${state.total}。`,
      );
    }
    state.active = [];
    const components = new Set(state.values).size;
    save(
      `${components} 个连通分量：${components === 1 ? "最小生成树" : "最小生成森林（不是一棵 MST）"}，总权重 ${state.total}。`,
    );
  } else if (algorithm === "flow") {
    state.values = Array(n).fill(0);
    state.frontier = [0];
    save("零流开始。实线标 f/c；虚线是可撤销流量的反向残量边。");
    // DFS path selection intentionally exposes cancellation; integral capacities bound termination.
    while (true) {
      const seen = new Set<number>();
      const path: { id: number; sign: number; residual: number }[] = [];
      const search = (u: number): boolean => {
        seen.add(u);
        if (u === n - 1) return true;
        for (let id = 0; id < edges.length; id++) {
          const e = edges[id];
          const sign = e.u === u ? 1 : e.v === u && !fault ? -1 : 0;
          const v = sign === 1 ? e.v : e.u;
          const residual = sign === 1 ? e.w - state.flow[id] : state.flow[id];
          if (!sign || residual <= 0 || seen.has(v)) continue;
          path.push({ id, sign, residual });
          if (search(v)) return true;
          path.pop();
        }
        return false;
      };
      if (!search(0)) {
        state.cut = [...seen];
        state.frontier = [];
        state.active = [];
        const capacity = edges.reduce(
          (sum, e) => sum + (seen.has(e.u) && !seen.has(e.v) ? e.w : 0),
          0,
        );
        save(
          `残量搜索结束：流值 ${state.total}，S 出割容量 ${capacity}。${fault ? "故障关闭了撤销边；这不构成最大流证书。" : "无增广路，二者相等，构成最大流/最小割证书。"}`,
        );
        break;
      }
      const delta = Math.min(...path.map((e) => e.residual));
      for (const p of path) state.flow[p.id] += p.sign * delta;
      state.total += delta;
      state.active = path.map((p) => p.id);
      state.selected = edges.flatMap((_, id) => (state.flow[id] ? [id] : []));
      state.frontier = [0];
      for (const p of path)
        state.frontier.push(p.sign === 1 ? edges[p.id].v : edges[p.id].u);
      save(
        `增广 ${state.frontier.map((v) => names[v]).join("→")}，瓶颈 ${delta}；${path.some((p) => p.sign < 0) ? "包含反向边，撤销旧流" : "沿正向边加流"}；流值 ${state.total}。`,
      );
    }
  } else {
    state.values = Array(n).fill(0);
    let clock = 0;
    save("节点数字为 disc/low；前沿是 DFS 调用栈。割点在回溯时判定。");
    const visit = (u: number, parentEdge: number) => {
      state.values[u] = state.low[u] = ++clock;
      state.frontier.push(u);
      let children = 0;
      save(`发现 ${names[u]}：disc=low=${clock}。`);
      for (const e of adjacent(u)) {
        if (e.id === parentEdge) continue;
        state.active = [e.id];
        if (state.values[e.v] === 0) {
          children++;
          state.selected.push(e.id);
          visit(e.v, e.id);
          state.low[u] = Math.min(state.low[u], state.low[e.v]);
          if (
            parentEdge !== -1 &&
            state.low[e.v] >= state.values[u] &&
            !state.articulation.includes(u)
          )
            state.articulation.push(u);
          if (state.low[e.v] > state.values[u]) state.bridges.push(e.id);
          state.active = [e.id];
          save(
            `从 ${names[e.v]} 回溯到 ${names[u]}，合并 low 并检查割点 / 桥。`,
          );
        } else {
          state.low[u] = Math.min(state.low[u], state.values[e.v]);
          save(`检查非父边 ${names[u]}—${names[e.v]}，用对方 disc 更新 low。`);
        }
      }
      if (parentEdge === -1 && children >= 2) state.articulation.push(u);
      state.frontier.pop();
      state.done.push(u);
      state.active = [];
      save(
        `完成 ${names[u]}${parentEdge === -1 ? `：根有 ${children} 个 DFS 子树，单独判断` : ""}。`,
      );
    };
    for (let v = 0; v < n; v++) if (!state.values[v]) visit(v, -1);
    save(
      `DFS 森林完成：割点 ${state.articulation.map((v) => names[v]).join("、") || "无"}；桥 ${state.bridges.map((id) => `${names[edges[id].u]}—${names[edges[id].v]}`).join("、") || "无"}。`,
    );
  }
  return frames;
}

export const graphFrontierModel = { trace, presets };
const algorithms: { value: Algorithm; label: string }[] = [
  { value: "dijkstra", label: "Dijkstra：最短距离" },
  { value: "bfs", label: "BFS：单位权距离" },
  { value: "topo", label: "Kahn：拓扑排序" },
  { value: "flow", label: "增广路：最大流" },
  { value: "mst", label: "Kruskal：生成森林" },
  { value: "dfs", label: "DFS：割点与桥" },
];
const points = [
  [150, 40],
  [45, 185],
  [255, 185],
  [150, 330],
  [150, 425],
];
const color = {
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  accent: "var(--accent)",
  bg: "var(--bg-elevated)",
  border: "var(--border)",
  danger: "var(--danger)",
};
const initial = {
  preset: 0,
  algorithm: "dijkstra" as Algorithm,
  fault: false,
  step: 0,
};

export function DsaGraphAlgorithmsFrontierLab() {
  const [control, setControl] = useState({ ...initial });
  const graph = presets[control.preset].graph;
  const frames = useMemo(
    () => trace(graph, control.algorithm, control.fault),
    [graph, control.algorithm, control.fault],
  );
  const frame = frames[control.step];
  const flowMode = control.algorithm === "flow";
  const supportsFault = control.algorithm === "dijkstra" || flowMode;
  const buttonClass =
    "min-h-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50";
  const edgeLine = (id: number, reverse: boolean) => {
    const edge = graph.edges[id];
    const [x1, y1] = points[reverse ? edge.v : edge.u];
    const [x2, y2] = points[reverse ? edge.u : edge.v];
    const length = Math.hypot(x2 - x1, y2 - y1);
    const dx = (x2 - x1) / length,
      dy = (y2 - y1) / length;
    const offset = flowMode ? 8 : 0;
    const sx = x1 + dx * 34 - dy * offset,
      sy = y1 + dy * 34 + dx * offset;
    const ex = x2 - dx * 34 - dy * offset,
      ey = y2 - dy * 34 + dx * offset;
    const ink = frame.active.includes(id)
      ? color.accent
      : frame.selected.includes(id)
        ? color.text
        : color.muted;
    const lx = (sx + ex) / 2 - dy * 14,
      ly = (sy + ey) / 2 + dx * 14;
    const label = reverse
      ? String(frame.flow[id])
      : flowMode
        ? `${frame.flow[id]}/${edge.w}`
        : String(edge.w);
    return (
      <g
        key={`${id}-${reverse}`}
        data-edge={id}
        data-residual={reverse ? "reverse" : "forward"}
      >
        <line
          x1={sx}
          y1={sy}
          x2={ex}
          y2={ey}
          stroke={ink}
          strokeWidth={frame.active.includes(id) ? 3 : 2}
          strokeDasharray={reverse ? "5 4" : undefined}
        />
        {(graph.directed || reverse) && (
          <path
            d={`M ${ex - dx * 9 - dy * 4} ${ey - dy * 9 + dx * 4} L ${ex} ${ey} L ${ex - dx * 9 + dy * 4} ${ey - dy * 9 - dx * 4}`}
            fill="none"
            stroke={ink}
            strokeWidth={2}
          />
        )}
        <rect
          x={lx - 19}
          y={ly - 12}
          width={38}
          height={24}
          rx={4}
          fill={color.bg}
        />
        <text x={lx} y={ly + 5} textAnchor="middle" fontSize={16} fill={ink}>
          {label}
        </text>
      </g>
    );
  };
  return (
    <section
      aria-label="图算法前沿实验：切换输入和算法，单步观察边与顶点的实际变化"
      className="not-prose my-6 rounded-xl border border-border bg-elevated p-3 text-primary"
    >
      <h3 className="mb-3 text-base font-semibold">前沿不是同一种“已访问”</h3>
      <div className="grid min-w-0 gap-3 sm:grid-cols-2">
        <label className="min-w-0 text-sm">
          输入图
          <select
            className={`${buttonClass} mt-1 block w-full min-w-0 bg-elevated`}
            value={control.preset}
            onChange={(e) =>
              setControl({
                ...control,
                preset: Number(e.target.value),
                step: 0,
                fault: false,
              })
            }
          >
            {presets.map((p, i) => (
              <option key={p.label} value={i}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <label className="min-w-0 text-sm">
          执行算法
          <select
            className={`${buttonClass} mt-1 block w-full min-w-0 bg-elevated`}
            value={control.algorithm}
            onChange={(e) =>
              setControl({
                ...control,
                algorithm: e.target.value as Algorithm,
                step: 0,
                fault: false,
              })
            }
          >
            {algorithms.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="my-2 flex min-h-11 cursor-pointer items-center gap-2 text-sm">
        <input
          type="checkbox"
          className="h-11 w-11 shrink-0 accent-[var(--accent)]"
          checked={control.fault}
          disabled={!supportsFault}
          onChange={(e) =>
            setControl({ ...control, fault: e.target.checked, step: 0 })
          }
        />
        {flowMode
          ? "故障：禁止反向残量边"
          : control.algorithm === "dijkstra"
            ? "故障：发现过就不再松弛"
            : "故障开关仅用于 Dijkstra / 最大流"}
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={buttonClass}
          disabled={control.step === frames.length - 1}
          onClick={() =>
            setControl({
              ...control,
              step: Math.min(control.step + 1, frames.length - 1),
            })
          }
        >
          执行下一步
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => setControl({ ...initial })}
        >
          完整重置
        </button>
        <span className="text-sm">
          步骤 {control.step}/{frames.length - 1}
        </span>
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="my-3 min-h-16 text-sm"
        style={{
          color: frame.rejected || control.fault ? color.danger : color.text,
        }}
      >
        {frame.message}
      </p>
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <svg
          viewBox={`0 0 300 ${graph.n === 5 ? 465 : 370}`}
          role="img"
          aria-label={`实际${graph.directed ? "有向" : "无向"}图。${
            flowMode
              ? graph.edges
                  .map(
                    (e, id) =>
                      `${names[e.u]}到${names[e.v]}流量${frame.flow[id]}容量${e.w}`,
                  )
                  .join("；")
              : frame.values
                  .map(
                    (v, id) =>
                      `${names[id]}：${v === Infinity ? "无穷" : v}${control.algorithm === "dfs" ? `，low ${frame.low[id]}` : ""}`,
                  )
                  .join("；")
          }。双圆是当前前沿，加粗边是本步检查。`}
          className="mx-auto block h-auto w-full max-w-[360px]"
        >
          <title>
            {
              "图算法执行图：边的加粗表示本步检查，双圆表示前沿，虚圆表示残量可达集 S"
            }
          </title>
          {graph.edges.map((_, id) => edgeLine(id, false))}
          {flowMode &&
            !frame.rejected &&
            graph.edges.map((_, id) =>
              frame.flow[id] > 0 ? edgeLine(id, true) : null,
            )}
          {Array.from({ length: graph.n }, (_, v) => {
            const [x, y] = points[v];
            const value =
              frame.values[v] === Infinity ? "∞" : String(frame.values[v]);
            return (
              <g key={v} data-vertex={v}>
                {frame.frontier.includes(v) && (
                  <circle
                    cx={x}
                    cy={y}
                    r={32}
                    fill="none"
                    stroke={color.accent}
                    strokeWidth={2}
                  />
                )}
                {frame.cut.includes(v) && (
                  <circle
                    cx={x}
                    cy={y}
                    r={34}
                    fill="none"
                    stroke={color.accent}
                    strokeDasharray="4 3"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={27}
                  fill={color.bg}
                  stroke={
                    frame.articulation.includes(v) ? color.accent : color.text
                  }
                  strokeWidth={frame.articulation.includes(v) ? 4 : 1.5}
                />
                <text
                  x={x}
                  y={y - (flowMode ? -5 : 5)}
                  textAnchor="middle"
                  fontSize={16}
                  fill={color.text}
                >
                  {names[v]}
                </text>
                {!flowMode && (
                  <text
                    x={x}
                    y={y + 15}
                    textAnchor="middle"
                    fontSize={16}
                    fill={color.text}
                  >
                    {control.algorithm === "dfs"
                      ? `${value}/${frame.low[v]}`
                      : value}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="min-w-0 space-y-3 text-sm">
          <p>
            图：{graph.directed ? "有向" : "无向"}，{graph.n} 点 /{" "}
            {graph.edges.length} 边。源点 A；流的汇点为最后一个顶点。
          </p>
          <p>
            双圆：
            {flowMode
              ? "本次增广路径"
              : control.algorithm === "dfs"
                ? "调用栈"
                : "前沿"}{" "}
            [{frame.frontier.map((v) => names[v]).join("，")}]。
          </p>
          <p>
            已取出 / 完成顺序：
            {frame.done.map((v) => names[v]).join(" → ") || "尚无"}。
          </p>
          <p>
            节点数字：
            {control.algorithm === "topo"
              ? "剩余入度"
              : control.algorithm === "mst"
                ? "并查集代表编号（A=0）"
                : control.algorithm === "dfs"
                  ? "发现序号 / low"
                  : flowMode
                    ? "不显示距离；边标流量/容量"
                    : "从 A 的距离；∞ 表示尚未找到路径"}
            。
          </p>
          <p>
            粗线：本步检查的边；深色细线：当前父边、已选树边或有流边。未高亮的边仍存在。
          </p>
          {flowMode && (
            <p>
              虚线箭头标反向残量 f；正向残量需计算
              c−f。故障模式仍画出应有的撤销边，但搜索故意不使用。末步虚圆为残量搜索的可达集
              S。
            </p>
          )}
          {control.algorithm === "mst" && (
            <p>已选边总权重：{frame.total}。孤立点也算一个分量。</p>
          )}
          {control.algorithm === "dfs" && (
            <p>粗边框点为割点；桥见结果文字。根不能套用非根的 low 判据。</p>
          )}
          <p>
            本实验以确定性扫描取代性能优化，最多5点12边；展示不变量，不代表大型图性能。切换输入/算法会清空步骤与故障；完整重置还恢复默认图和算法。
          </p>
        </div>
      </div>
    </section>
  );
}
