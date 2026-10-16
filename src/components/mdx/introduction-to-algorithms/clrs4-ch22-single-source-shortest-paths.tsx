"use client";

import { useMemo, useRef, useState } from "react";

import { TEACHING_BEAT_MS, TimelineControls } from "../anim/timeline-controls";
import {
  useTeachingTimeline,
  type TeachingStep,
} from "../anim/use-teaching-timeline";

const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  danger: "var(--danger)",
  success: "var(--success)",
  warning: "var(--warning)",
} as const;

const T = TEACHING_BEAT_MS;

const STEPS: readonly TeachingStep[] = [
  { label: "init", caption: "初始化 d 与 parent：源为 0，其余为 ∞" },
  { label: "expand", caption: "第一批候选距离沿出边展开" },
  { label: "propagate", caption: "距离沿路径继续传播并收紧" },
  { label: "order", caption: "本算法的顺序保证此刻可以锁定什么" },
  { label: "detect", caption: "负权环检测或收敛判定" },
  { label: "verify", caption: "三角不等式逐边独立验签" },
];

const LABEL_TEXT: Readonly<Record<string, string>> = Object.fromEntries(
  STEPS.map((step) => [step.label, step.caption ?? step.label]),
);

type VertexId = "s" | "a" | "b" | "c" | "t";

const VERTICES: readonly VertexId[] = ["s", "a", "b", "c", "t"];
const VI: Record<VertexId, number> = { s: 0, a: 1, b: 2, c: 3, t: 4 };
const POS: Record<VertexId, { x: number; y: number }> = {
  s: { x: 110, y: 230 },
  a: { x: 300, y: 140 },
  b: { x: 300, y: 320 },
  c: { x: 500, y: 230 },
  t: { x: 700, y: 230 },
};
const INF = Infinity;

type Edge = { u: VertexId; v: VertexId; w: number; key: string };

const BASE_EDGES: readonly Edge[] = [
  { u: "s", v: "a", w: 1, key: "s-a" },
  { u: "s", v: "b", w: 2, key: "s-b" },
  { u: "a", v: "c", w: 3, key: "a-c" },
  { u: "b", v: "c", w: 5, key: "b-c" },
  { u: "c", v: "t", w: 2, key: "c-t" },
  { u: "a", v: "t", w: 8, key: "a-t" },
];

const FAULT_NEG_EDGE: Edge = { u: "b", v: "a", w: -3, key: "b-a" };
const FAULT_CYCLE_EDGE: Edge = { u: "t", v: "b", w: -10, key: "t-b" };

type Mode = "bellman" | "dag" | "dijkstra";

const MODE_COPY: Record<Mode, { title: string; claim: string; order: string }> =
  {
    bellman: {
      title: "Bellman-Ford",
      claim: "重复 |V|−1 轮全边松弛，再多扫一遍检测负权环",
      order: "每轮按固定边序全量 relax，允许负权边",
    },
    dag: {
      title: "DAG 最短路径",
      claim: "按拓扑序处理顶点，每条边只 relax 一次",
      order: "拓扑序保证处理 u 时 d[u] 已是最短距离",
    },
    dijkstra: {
      title: "Dijkstra",
      claim: "每次 extract-min 并永久锁定当前最小距离",
      order: "非负权边保证已锁定顶点的距离不再被改进",
    },
  };

type Row = {
  d: number[];
  settled: boolean[];
  active: string | null;
  ignored: string | null;
  note: string;
  verdict?: "ok" | "warn" | "fail";
};

function initD(): number[] {
  return [0, INF, INF, INF, INF];
}

function relaxEdge(d: number[], e: Edge): number[] | null {
  if (d[VI[e.u]] === INF) return null;
  const cand = d[VI[e.u]] + e.w;
  if (cand < d[VI[e.v]]) {
    const next = d.slice();
    next[VI[e.v]] = cand;
    return next;
  }
  return null;
}

function buildEdges(faultNeg: boolean, faultCycle: boolean): Edge[] {
  const edges: Edge[] = [];
  for (const e of BASE_EDGES) {
    edges.push(e);
    if (e.key === "s-b" && faultNeg) edges.push(FAULT_NEG_EDGE);
    if (e.key === "c-t" && faultCycle) edges.push(FAULT_CYCLE_EDGE);
  }
  return edges;
}

function runBellman(edges: Edge[]): {
  rounds: { d: number[]; lastKey: string | null }[];
  negCycle: boolean;
  witness: string | null;
} {
  let d = initD();
  const rounds: { d: number[]; lastKey: string | null }[] = [];
  for (let r = 0; r < VERTICES.length - 1; r++) {
    let changed = false;
    let lastKey: string | null = null;
    for (const e of edges) {
      const next = relaxEdge(d, e);
      if (next) {
        d = next;
        changed = true;
        lastKey = e.key;
      }
    }
    rounds.push({ d: d.slice(), lastKey });
    if (!changed) break;
  }
  let negCycle = false;
  let witness: string | null = null;
  for (const e of edges) {
    if (relaxEdge(d, e)) {
      negCycle = true;
      witness = e.key;
      break;
    }
  }
  return { rounds, negCycle, witness };
}

function runDijkstra(edges: Edge[]): {
  rows: {
    d: number[];
    settled: boolean[];
    extracted: VertexId;
    ignored: string | null;
  }[];
} {
  let d = initD();
  const settledSet = new Set<VertexId>(["s"]);
  const relaxOut = (u: VertexId): string | null => {
    let ignored: string | null = null;
    for (const e of edges) {
      if (e.u !== u) continue;
      const next = relaxEdge(d, e);
      if (next) {
        if (settledSet.has(e.v)) ignored = e.key;
        else d = next;
      }
    }
    return ignored;
  };
  relaxOut("s");
  const rows = [
    {
      d: d.slice(),
      settled: VERTICES.map((v) => settledSet.has(v)),
      extracted: "s" as VertexId,
      ignored: null as string | null,
    },
  ];
  while (rows.length < VERTICES.length) {
    let best: VertexId | null = null;
    for (const v of VERTICES) {
      if (settledSet.has(v) || d[VI[v]] === INF) continue;
      if (best === null || d[VI[v]] < d[VI[best]]) best = v;
    }
    if (best === null) break;
    settledSet.add(best);
    const ignored = relaxOut(best);
    rows.push({
      d: d.slice(),
      settled: VERTICES.map((v) => settledSet.has(v)),
      extracted: best,
      ignored,
    });
  }
  return { rows };
}

function runTopo(edges: Edge[]): VertexId[] | null {
  const indeg: Record<VertexId, number> = { s: 0, a: 0, b: 0, c: 0, t: 0 };
  for (const e of edges) indeg[e.v] += 1;
  const ready = VERTICES.filter((v) => indeg[v] === 0);
  const order: VertexId[] = [];
  const localIndeg = { ...indeg };
  while (ready.length > 0) {
    const u = ready.shift()!;
    order.push(u);
    for (const e of edges) {
      if (e.u !== u) continue;
      localIndeg[e.v] -= 1;
      if (localIndeg[e.v] === 0) ready.push(e.v);
    }
    ready.sort((x, y) => VI[x] - VI[y]);
  }
  return order.length === VERTICES.length ? order : null;
}

function fmt(v: number): string {
  return v === INF ? "∞" : String(v);
}

function decreased(prev: number[] | undefined, cur: number[]): boolean[] {
  if (!prev) return cur.map(() => false);
  return cur.map((v, i) => v !== prev[i]);
}

export function Clrs4Chapter22SingleSourceShortestPathsLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mode, setMode] = useState<Mode>("bellman");
  const [faultNeg, setFaultNeg] = useState(false);
  const [faultCycle, setFaultCycle] = useState(false);

  const timeline = useTeachingTimeline({
    steps: STEPS,
    build: (tl) => {
      STEPS.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          {
            opacity: index === 0 ? [1, 1] : ([0, 1] as [number, number]),
            duration: T * 0.55,
            ease: "out(3)",
          },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const edges = useMemo(
    () => buildEdges(faultNeg, faultCycle),
    [faultNeg, faultCycle],
  );

  const rows = useMemo<Row[]>(() => {
    const noneSettled = VERTICES.map((v) => v === "s");
    const initRow: Row = {
      d: initD(),
      settled: noneSettled,
      active: null,
      ignored: null,
      note: "初始化：d[s]=0，其余顶点为 ∞，parent 全部为 NIL。",
    };

    if (mode === "bellman") {
      const { rounds, negCycle, witness } = runBellman(edges);
      const pick = (i: number) => rounds[Math.min(i, rounds.length - 1)];
      const r0 = pick(0);
      const r1 = rounds[1] ?? r0;
      const finalRound = rounds[rounds.length - 1] ?? r0;
      const convergedEarly = rounds.length < VERTICES.length - 1 && !negCycle;
      const rowsBf: Row[] = [
        initRow,
        {
          d: r0.d,
          settled: noneSettled,
          active: r0.lastKey,
          ignored: null,
          note: `第 1 轮全边松弛后：候选距离从 source 向外传播了一整条边。${
            r0.lastKey ? `最后一条生效的边是 ${r0.lastKey}。` : ""
          }`,
        },
        {
          d: r1.d,
          settled: noneSettled,
          active: rounds[1]?.lastKey ?? null,
          ignored: null,
          note:
            rounds.length > 1
              ? `第 2 轮后$d$继续收紧的顶点会被标成高亮${
                  negCycle ? "，负权环存在时距离会一路下降" : ""
                }。`
              : "第 2 轮没有任何更新——可以提前停止，worst-case 仍是 O(VE)。",
          verdict: negCycle ? "warn" : undefined,
        },
        {
          d: pick(2).d,
          settled: noneSettled,
          active: pick(2).lastKey,
          ignored: null,
          note: negCycle
            ? "第 3 轮距离仍在下降：绕环次数越多总权值越小，δ 没有有限值。"
            : convergedEarly
              ? "已经收敛：固定边序下多轮松弛只会提前收敛，不会破坏上界性质。"
              : "第 3 轮：负权边被逐轮吸收，简单路径最多 |V|−1 条边。",
          verdict: negCycle ? "warn" : "ok",
        },
        {
          d: finalRound.d,
          settled: noneSettled,
          active: witness,
          ignored: null,
          note: negCycle
            ? `第 |V|−1 轮后 edge ${witness ?? ""} 仍可松弛——检测到 source 可达的负权环，受影响顶点 δ = −∞。`
            : "再多扫一遍所有边：没有可松弛的边，证明不存在 source 可达的负权环。",
          verdict: negCycle ? "fail" : "ok",
        },
        {
          d: finalRound.d,
          settled: noneSettled,
          active: null,
          ignored: null,
          note: negCycle
            ? "带负权环的实例没有有限答案：调用方必须区分“无路径”和“距离无下界”。"
            : "验签：逐边检查 d[v] ≤ d[u] + w(u,v) 且 parent 链都终止于 s——三角不等式全部成立。",
          verdict: negCycle ? "fail" : "ok",
        },
      ];
      return rowsBf;
    }

    if (mode === "dag") {
      const topo = runTopo(edges);
      if (!topo) {
        const failRow = (note: string): Row => ({
          d: initD(),
          settled: noneSettled,
          active: FAULT_CYCLE_EDGE.key,
          ignored: null,
          note,
          verdict: "fail",
        });
        return [
          initRow,
          failRow(
            "拓扑排序失败：图中存在环（注入的 t→b = −10 参与成环），DAG 算法的前提被违反。",
          ),
          failRow(
            "有环时“处理 u 时其前驱已全部处理”不再成立，单次遍历不可靠。",
          ),
          failRow("边 b→c→t→b 的权值和为 −3 < 0：这同时是一个可达负权环。"),
          failRow("算法必须显式返回失败，而不是输出半成品距离。"),
          failRow("改用 Bellman-Ford：它不要求无环，还能报告负权环。"),
        ];
      }
      let d = initD();
      const snapshots: number[][] = [d.slice()];
      for (const u of topo) {
        for (const e of edges) {
          if (e.u !== u) continue;
          const next = relaxEdge(d, e);
          if (next) d = next;
        }
        snapshots.push(d.slice());
      }
      const orderText = topo.join(" → ");
      const mid = Math.ceil(topo.length / 2);
      const earlyNote = faultNeg
        ? "拓扑序把 b 排在 a 之前，负权边 b→a = −3 在锁定 a 之前就完成了松弛。"
        : "按拓扑序处理：处理每个顶点时，所有进入它的边都已 relax 过。";
      return [
        initRow,
        {
          d: snapshots[0]!,
          settled: noneSettled,
          active: null,
          ignored: null,
          note: `拓扑序 = ${orderText}。${earlyNote}`,
        },
        {
          d: snapshots[mid]!,
          settled: VERTICES.map(() => false),
          active: null,
          ignored: null,
          note: `前半段拓扑序（${topo.slice(0, mid).join("、")}）处理完，距离开始沿多条路径汇合。`,
        },
        {
          d: snapshots[VERTICES.length]!,
          settled: VERTICES.map(() => false),
          active: null,
          ignored: null,
          note: `后半段（${topo.slice(mid).join("、")}）完成：每条边恰好被 relax 一次，总时间 O(V+E)。`,
          verdict: "ok",
        },
        {
          d: snapshots[VERTICES.length]!,
          settled: VERTICES.map(() => false),
          active: null,
          ignored: null,
          note: "收敛判定不需要额外一轮：无环保证第一次处理顶点时其距离已经最终化。",
          verdict: "ok",
        },
        {
          d: snapshots[VERTICES.length]!,
          settled: VERTICES.map(() => false),
          active: null,
          ignored: null,
          note: "验签同 Bellman-Ford：负权边在这个模式里完全合法，因为环不存在。",
          verdict: "ok",
        },
      ];
    }

    const { rows: djRows } = runDijkstra(edges);
    const pickDj = (i: number) =>
      djRows[Math.min(i, djRows.length - 1)] ?? djRows[0]!;
    const lockedEarly =
      faultNeg && djRows.some((r) => r.extracted === "a" && r.d[VI.a]! > -1);
    const ignoredIdx = djRows.findIndex((r) => r.ignored !== null);
    const anyIgnored = ignoredIdx !== -1;
    const ignoredKey = anyIgnored ? djRows[ignoredIdx]!.ignored! : null;
    const ignoredCand =
      ignoredKey === "b-a" ? "−1 < 1" : ignoredKey === "t-b" ? "−4 < 2" : "";
    const finalDj = djRows[djRows.length - 1]!;
    const extractText = djRows
      .map((r) => `${r.extracted}(${fmt(r.d[VI[r.extracted]]!)})`)
      .join("，");
    return [
      initRow,
      {
        d: pickDj(0).d,
        settled: pickDj(0).settled,
        active: "s-a",
        ignored: null,
        note: "extract-min 取出 s（d=0），relax 其出边：d[a]=1，d[b]=2。",
      },
      {
        d: pickDj(1).d,
        settled: pickDj(1).settled,
        active: "a-c",
        ignored: null,
        note: lockedEarly
          ? "extract-min 取出 a 并永久锁定 d[a]=1——但负权边 b→a 还没被处理，真值应是 −1。"
          : `extract-min 取出 a（d=1），非负权边保证它不会再被改进。`,
        verdict: lockedEarly ? "warn" : undefined,
      },
      {
        d: pickDj(2).d,
        settled: pickDj(2).settled,
        active: pickDj(2).ignored ?? "b-c",
        ignored: pickDj(2).ignored,
        note:
          ignoredIdx === 2
            ? `取出 b 后 edge ${ignoredKey} 的候选 ${ignoredCand}，但目标已定居——这条松弛被静默忽略。`
            : "extract-min 取出 b：它的出边无法改进任何未定居顶点。",
        verdict: ignoredIdx === 2 ? "fail" : undefined,
      },
      {
        d: pickDj(3).d,
        settled: pickDj(3).settled,
        active: pickDj(3).ignored ?? "c-t",
        ignored: pickDj(3).ignored,
        note:
          ignoredIdx === 3
            ? `取出 ${djRows[3]!.extracted} 后 edge ${ignoredKey} 的候选 ${ignoredCand}，但目标已定居——负权边被丢弃。`
            : `剩余顶点按 extract-min 顺序定居：${extractText}。`,
        verdict: ignoredIdx === 3 ? "fail" : undefined,
      },
      {
        d: finalDj.d,
        settled: finalDj.settled,
        active: null,
        ignored: null,
        note: lockedEarly
          ? "最终数组与真值不符：d[a]=1 vs −1，d[c]=4 vs 2，d[t]=6 vs 4——错误悄无声息。"
          : anyIgnored
            ? "负权环使受影响顶点的真值为 −∞，而 Dijkstra 既不报错也不更新——它只适用于非负权图。"
            : `验签：定居顺序 ${extractText} 单调不减，parent 链构成最短路径树。`,
        verdict: lockedEarly || anyIgnored ? "fail" : "ok",
      },
    ];
  }, [mode, edges, faultNeg]);

  const activeIndex = Math.min(STEPS.length - 1, timeline.currentStep);
  const activeRow = rows[activeIndex] ?? rows[0]!;
  const selected = MODE_COPY[mode];
  const noteColor =
    activeRow.verdict === "fail"
      ? C.danger
      : activeRow.verdict === "warn"
        ? C.warning
        : activeRow.verdict === "ok"
          ? C.success
          : C.secondary;

  function reset() {
    timeline.goToStep(0);
    setMode("bellman");
    setFaultNeg(false);
    setFaultCycle(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch22-single-source-shortest-paths"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 22 · Single-Source Shortest Paths
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              同一个 relax，三种算法各凭什么停手？
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              在固定小图上切换 Bellman-Ford、DAG 与
              Dijkstra，沿时间线观察距离数组 d、定居集合与负权环检测如何演化。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-3">
          <label className="block min-w-56 flex-1 text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              选择算法模式
            </span>
            <select
              aria-label="选择 Bellman-Ford、DAG 最短路径或 Dijkstra 模式"
              value={mode}
              onChange={(event) => setMode(event.target.value as Mode)}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              <option value="bellman">Bellman-Ford · |V|−1 轮全边松弛</option>
              <option value="dag">DAG · 拓扑序单次遍历</option>
              <option value="dijkstra">Dijkstra · extract-min 定居</option>
            </select>
          </label>

          <div className="flex flex-1 flex-wrap items-end gap-3">
            <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-primary">
              <input
                type="checkbox"
                checked={faultNeg}
                onChange={(event) => setFaultNeg(event.target.checked)}
                className="h-4 w-4 accent-accent"
              />
              注入负权边 b→a = −3
            </label>
            <label className="flex min-h-11 cursor-pointer items-center gap-2 rounded-control border border-border px-3 py-2 text-xs text-primary">
              <input
                type="checkbox"
                checked={faultCycle}
                onChange={(event) => setFaultCycle(event.target.checked)}
                className="h-4 w-4 accent-accent"
              />
              注入负环边 t→b = −10
            </label>
          </div>
        </div>

        <svg
          viewBox="0 0 900 780"
          role="img"
          aria-label="CLRS 4e Chapter 22 专属单源最短路径实验。覆盖 single-source shortest paths、单源最短路径、Bellman-Ford algorithm、Bellman-Ford算法、shortest paths in directed acyclic graphs、有向无环图最短路径、Dijkstra's algorithm、Dijkstra算法、difference constraints、差分约束、proofs of shortest-paths properties、最短路径性质证明。展示 initialize 与 relax 的距离数组演化、Bellman-Ford 轮次与负权环检测、DAG 拓扑序单次遍历、Dijkstra extract-min 定居顺序、负权边导致 Dijkstra 静默出错故障注入，并支持模式切换、故障注入、播放、暂停、单步、拖进度和重置。"
          className="mx-auto block h-auto w-full"
        >
          <defs>
            <marker
              id="clrs4-ch22-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
            </marker>
            <marker
              id="clrs4-ch22-accent-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.accent} />
            </marker>
            <marker
              id="clrs4-ch22-danger-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill={C.danger} />
            </marker>
          </defs>

          <rect x="0" y="0" width="900" height="780" rx="14" fill={C.bg} />
          <text x="30" y="34" fontSize="16" fontWeight="700" fill={C.primary}>
            initialize → relax → {selected.title} → 检测 → 验签
          </text>
          <text x="30" y="58" fontSize="12" fill={C.secondary}>
            {selected.title} · {selected.order}
          </text>

          {edges.map((e) => {
            const from = POS[e.u];
            const to = POS[e.v];
            const isActive = activeRow.active === e.key;
            const isIgnored = activeRow.ignored === e.key;
            const stroke = isIgnored
              ? C.danger
              : isActive
                ? C.accent
                : C.border;
            const mx = (from.x + to.x) / 2;
            const my = (from.y + to.y) / 2;
            const off = e.key === "a-t" || e.key === "b-a" ? 14 : -10;
            return (
              <g key={"edge-" + e.key}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={stroke}
                  strokeWidth={isActive || isIgnored ? 3 : 1.5}
                  strokeDasharray={isIgnored ? "6 4" : undefined}
                  markerEnd={
                    isIgnored
                      ? "url(#clrs4-ch22-danger-arrow)"
                      : isActive
                        ? "url(#clrs4-ch22-accent-arrow)"
                        : "url(#clrs4-ch22-arrow)"
                  }
                />
                <rect
                  x={mx - 22}
                  y={my + off - 11}
                  width="44"
                  height="16"
                  rx="5"
                  fill={C.bg}
                />
                <text
                  x={mx}
                  y={my + off + 1}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={isActive || isIgnored ? "700" : "400"}
                  fill={
                    isIgnored ? C.danger : isActive ? C.accent : C.secondary
                  }
                >
                  {e.u}→{e.v}·{e.w}
                </text>
              </g>
            );
          })}

          {VERTICES.map((v) => {
            const p = POS[v];
            const isSettled = activeRow.settled[VI[v]]!;
            const dVal = activeRow.d[VI[v]]!;
            return (
              <g key={"vertex-" + v}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="26"
                  fill={isSettled ? C.accent : C.elevated}
                  fillOpacity={isSettled ? 0.16 : 1}
                  stroke={isSettled ? C.accent : C.border}
                  strokeWidth={isSettled ? 2.5 : 1.5}
                />
                <text
                  x={p.x}
                  y={p.y + 5}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="700"
                  fill={isSettled ? C.accent : C.primary}
                >
                  {v}
                </text>
                <rect
                  x={p.x - 26}
                  y={p.y + 32}
                  width="52"
                  height="18"
                  rx="5"
                  fill={C.elevated}
                  stroke={C.border}
                  strokeWidth="1"
                />
                <text
                  x={p.x}
                  y={p.y + 45}
                  textAnchor="middle"
                  fontSize="11"
                  fill={
                    dVal === INF
                      ? C.secondary
                      : dVal < 0
                        ? C.warning
                        : C.primary
                  }
                >
                  d={fmt(dVal)}
                </text>
              </g>
            );
          })}

          <text x="30" y="428" fontSize="13" fontWeight="700" fill={C.primary}>
            距离数组 d 的逐阶段演化
          </text>
          <text
            x="870"
            y="428"
            textAnchor="end"
            fontSize="11"
            fill={C.secondary}
          >
            高亮单元格 = 本阶段被收紧
          </text>

          {VERTICES.map((v, col) => (
            <text
              key={"col-" + v}
              x={236 + col * 130}
              y={456}
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fill={C.secondary}
            >
              d[{v}]
            </text>
          ))}

          {STEPS.map((step, index) => {
            const row = rows[index] ?? rows[0]!;
            const isActive = index === activeIndex;
            const prevRow = index > 0 ? rows[index - 1] : undefined;
            const dec = decreased(prevRow?.d, row.d);
            return (
              <g
                key={"stage-" + step.label}
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <rect
                  x="30"
                  y={466 + index * 36}
                  width="840"
                  height="30"
                  rx="8"
                  fill={isActive ? C.accent : C.elevated}
                  fillOpacity={isActive ? 0.08 : 1}
                  stroke={isActive ? C.accent : C.border}
                  strokeWidth={isActive ? 2 : 1}
                />
                <text
                  x="44"
                  y={486 + index * 36}
                  fontSize="12"
                  fontWeight="700"
                  fill={isActive ? C.accent : C.primary}
                >
                  {index + 1}·{step.label}
                </text>
                {VERTICES.map((v, col) => {
                  const val = row.d[col]!;
                  const changedCell = dec[col] && val !== INF;
                  return (
                    <text
                      key={"cell-" + v}
                      x={236 + col * 130}
                      y={486 + index * 36}
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight={changedCell || isActive ? "700" : "400"}
                      fill={
                        changedCell
                          ? C.accent
                          : val < 0
                            ? C.warning
                            : val === INF
                              ? C.secondary
                              : C.primary
                      }
                    >
                      {fmt(val)}
                      {row.settled[col] ? "●" : ""}
                    </text>
                  );
                })}
              </g>
            );
          })}

          <rect
            x="30"
            y="696"
            width="840"
            height="56"
            rx="10"
            fill={C.elevated}
            stroke={noteColor}
            strokeWidth="1.5"
          />
          <text x="48" y="720" fontSize="12" fontWeight="700" fill={noteColor}>
            {STEPS[activeIndex]!.label} · {selected.title}
          </text>
          <text x="48" y="740" fontSize="12" fill={C.primary}>
            {activeRow.note}
          </text>
        </svg>

        <TimelineControls
          timeline={timeline}
          labelText={LABEL_TEXT}
          caption="三种算法跑的是同一个 relax；差别只在“什么时候可以确信某个顶点的距离已经最终”。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置单源最短路径实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        负权边本身不是错误输入——把它交给错的算法（不检查负权环的
        Dijkstra）才会让错误悄悄混进最终数组。
      </figcaption>
    </figure>
  );
}
