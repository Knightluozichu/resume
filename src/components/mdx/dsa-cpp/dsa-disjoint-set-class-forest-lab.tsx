"use client";

import { useState } from "react";

// Only states constructed here are supported; this is not a graph-file validator.
export type DisjointForest = {
  readonly parent: readonly number[];
  readonly rank: readonly number[];
  readonly faulted: boolean;
};
export type ForestOperation = "find" | "union" | "wrong-link";
export type ForestResult = {
  forest: DisjointForest;
  paths: number[][];
  changed: number[];
  merged: boolean;
  lostPairs: number;
  message: string;
};
export const FOREST_LIMIT = 16;

export function createForest(n: number): DisjointForest {
  if (!Number.isInteger(n) || n < 0 || n > FOREST_LIMIT)
    throw new RangeError("元素数必须是 0–16 的整数");
  return {
    parent: Array.from({ length: n }, (_, i) => i),
    rank: Array<number>(n).fill(0),
    faulted: false,
  };
}

function checkId(forest: DisjointForest, id: number) {
  if (!Number.isInteger(id) || id < 0 || id >= forest.parent.length)
    throw new RangeError(`编号必须是 0–${forest.parent.length - 1} 的整数`);
}

export function forestPath(forest: DisjointForest, id: number): number[] {
  checkId(forest, id);
  const path = [id];
  while (forest.parent[id] !== id) {
    id = forest.parent[id];
    checkId(forest, id);
    if (path.includes(id)) throw new Error("父指针成环，拒绝遍历");
    path.push(id);
  }
  return path;
}

export function forestStats(forest: DisjointForest) {
  const paths = forest.parent.map((_, id) => forestPath(forest, id));
  return forest.parent.flatMap((parent, id) => {
    if (parent !== id) return [];
    const members = paths.filter((p) => p[p.length - 1] === id);
    return [
      {
        root: id,
        rank: forest.rank[id],
        size: members.length,
        height: Math.max(...members.map((p) => p.length - 1)),
      },
    ];
  });
}

export function executeForest(
  forest: DisjointForest,
  operation: ForestOperation,
  a: number,
  b = 0,
): ForestResult {
  if (forest.faulted) throw new Error("错误状态仅供观察，请先重置");
  checkId(forest, a);
  if (operation !== "find") checkId(forest, b); // before any writes
  const parent = [...forest.parent];
  const rank = [...forest.rank];
  const paths: number[][] = [];
  let merged = false;
  let lostPairs = 0;
  const find = (id: number) => {
    const path = forestPath({ parent, rank, faulted: false }, id);
    paths.push(path);
    const root = path[path.length - 1];
    for (const node of path) parent[node] = root;
    return root;
  };
  let message: string;
  if (operation === "find") {
    message = `find(${a}) = ${find(a)}；沿原路径执行完整压缩，rank 不变。`;
  } else if (operation === "union") {
    let ra = find(a);
    let rb = find(b);
    if (ra !== rb) {
      if (rank[ra] < rank[rb] || (rank[ra] === rank[rb] && ra > rb))
        [ra, rb] = [rb, ra];
      parent[rb] = ra;
      if (rank[ra] === rank[rb]) rank[ra]++;
      merged = true;
    }
    message = merged
      ? `合并成功：根 ${rb} 指向根 ${ra}；只在原秩相等时增加新根的秩。`
      : "冗余合并：返回 false，不增秩；两次 find 仍可压缩路径。";
  } else {
    const bPath = forestPath(forest, b);
    if (a !== b && bPath.includes(a))
      throw new Error("错误连边会成环，已拦截；改用初始 7、1 观察拆组");
    paths.push(forestPath(forest, a));
    parent[a] = b; // deliberately wrong: a need not be a root
    const faulty = { parent, rank, faulted: true };
    for (let i = 0; i < parent.length; i++) {
      for (let j = i + 1; j < parent.length; j++) {
        const oldI = forestPath(forest, i).slice(-1)[0];
        const oldJ = forestPath(forest, j).slice(-1)[0];
        const newI = forestPath(faulty, i).slice(-1)[0];
        const newJ = forestPath(faulty, j).slice(-1)[0];
        if (oldI === oldJ && newI !== newJ) lostPairs++;
      }
    }
    message = `错误地执行 parent[${a}]=${b}：丢失 ${lostPairs} 对原有连通关系。即使本次未拆组，这也不是合法 union 算法；请重置。`;
  }
  return {
    forest: { parent, rank, faulted: operation === "wrong-link" },
    paths,
    changed: parent.flatMap((p, i) => (p !== forest.parent[i] ? [i] : [])),
    merged,
    lostPairs,
    message,
  };
}

export function initialForest(): DisjointForest {
  let forest = createForest(8);
  for (const [a, b] of [
    [0, 1],
    [2, 3],
    [0, 2],
    [4, 5],
    [6, 7],
    [4, 6],
  ])
    forest = executeForest(forest, "union", a, b).forest;
  return forest;
}

export function initialForestLab() {
  const forest = initialForest();
  return {
    a: "7",
    b: "1",
    operation: "find" as ForestOperation,
    before: forest,
    forest,
    paths: [] as number[][],
    changed: [] as number[],
    message: "尚未执行。先预测 find(7) 会修改哪条边，再点击执行。",
    error: "",
  };
}

export function parseForestId(value: string, forest: DisjointForest) {
  if (!/^\d+$/.test(value)) throw new RangeError("请输入完整的非负整数编号");
  const id = Number(value);
  checkId(forest, id);
  return id;
}

// Subtree leaf slots produce actual parent-child geometry, not canned scenes.
export function forestLayout(forest: DisjointForest) {
  const children = forest.parent.map((_, id) =>
    forest.parent.flatMap((p, child) =>
      p === id && child !== id ? [child] : [],
    ),
  );
  const roots = forest.parent.flatMap((p, id) => (p === id ? [id] : []));
  const positions = forest.parent.map(() => ({ x: 0, y: 0 }));
  let leaves = 0;
  const place = (id: number, depth: number): number => {
    const xs = children[id].map((child) => place(child, depth + 1));
    const x = xs.length ? (xs[0] + xs[xs.length - 1]) / 2 : leaves++;
    positions[id] = { x, y: 32 + 88 * depth };
    return x;
  };
  roots.forEach((id) => place(id, 0));
  return positions.map(({ x, y }) => ({
    x: 24 + ((x + 0.5) * 252) / Math.max(1, leaves),
    y,
  }));
}

function ForestPicture({
  forest,
  changed,
  caption,
}: {
  forest: DisjointForest;
  changed: number[];
  caption: string;
}) {
  const positions = forestLayout(forest);
  const height = Math.max(330, ...positions.map((p) => p.y + 62));
  return (
    <figure className="m-0 min-w-0">
      <figcaption className="mb-2 text-center font-semibold text-primary">
        {caption}
      </figcaption>
      <svg
        viewBox={`0 0 300 ${height}`}
        role="img"
        aria-label={`${caption}；箭头从子节点指向父节点；节点下方 r 为秩；根不画自环。`}
        className="mx-auto block h-auto w-full max-w-[300px]"
      >
        <title>{`${caption}：${forest.parent.map((p, i) => `${i} 的父节点 ${p}，秩 ${forest.rank[i]}`).join("；")}`}</title>
        {forest.parent.map((parent, id) => {
          if (parent === id) return null;
          const from = positions[id];
          const to = positions[parent];
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const len = Math.hypot(dx, dy);
          const ux = dx / len;
          const uy = dy / len;
          const tip = { x: to.x - ux * 17, y: to.y - uy * 17 };
          const color = changed.includes(id)
            ? "var(--accent)"
            : "var(--text-secondary)";
          return (
            <g key={id} data-edge={`${id}-${parent}`}>
              <line
                x1={from.x + ux * 17}
                y1={from.y + uy * 17}
                x2={tip.x}
                y2={tip.y}
                stroke={color}
                strokeWidth={changed.includes(id) ? 3 : 1.5}
              />
              <polygon
                points={`${tip.x},${tip.y} ${tip.x - ux * 8 + uy * 4},${tip.y - uy * 8 - ux * 4} ${tip.x - ux * 8 - uy * 4},${tip.y - uy * 8 + ux * 4}`}
                fill={color}
              />
            </g>
          );
        })}
        {positions.map(({ x, y }, id) => (
          <g
            key={id}
            data-node={id}
            data-parent={forest.parent[id]}
            data-rank={forest.rank[id]}
          >
            <circle
              cx={x}
              cy={y}
              r={16}
              fill="var(--bg-elevated)"
              stroke={
                forest.parent[id] === id ? "var(--accent)" : "var(--border)"
              }
              strokeWidth={2}
            />
            <text
              x={x}
              y={y + 6}
              textAnchor="middle"
              fill="var(--text-primary)"
              fontSize={18}
            >
              {id}
            </text>
            <rect
              x={x - 15}
              y={y + 21}
              width={30}
              height={20}
              fill="var(--bg-elevated)"
            />
            <text
              x={x}
              y={y + 37}
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize={16}
            >{`r${forest.rank[id]}`}</text>
          </g>
        ))}
      </svg>
      <ul className="m-0 space-y-1 pl-4 text-sm text-secondary">
        {forestStats(forest).map((s) => (
          <li key={s.root}>
            根 {s.root}：秩 {s.rank} / 大小 {s.size} / 实高 {s.height}
          </li>
        ))}
      </ul>
    </figure>
  );
}

const controlClass =
  "min-h-11 min-w-0 rounded-control border border-border bg-elevated px-3 py-2 text-base text-primary focus-visible:outline-2 focus-visible:outline-accent";

export function DsaDisjointSetClassForestLab() {
  const [lab, setLab] = useState(initialForestLab);
  function execute() {
    try {
      const a = parseForestId(lab.a, lab.forest);
      const b = lab.operation === "find" ? 0 : parseForestId(lab.b, lab.forest);
      const result = executeForest(lab.forest, lab.operation, a, b);
      setLab({ ...lab, before: lab.forest, ...result, error: "" });
    } catch (error) {
      setLab({
        ...lab,
        error: error instanceof Error ? error.message : "执行失败",
      });
    }
  }
  return (
    <section
      aria-label="并查集父指针森林实验"
      className="not-prose my-6 min-w-0 rounded-card border border-border bg-elevated p-3 sm:p-4"
    >
      <h3 className="m-0 text-lg font-semibold text-primary">
        一条路径，两幅真实森林
      </h3>
      <p className="my-2 text-sm leading-relaxed text-secondary">
        固定 8 个元素（0–7）；箭头指向父节点，根省略自环。r
        是历史秩，不是大小或当前高度。亮色边是本次实际改写的父指针。
      </p>
      <div className="my-4 grid grid-cols-2 gap-3">
        <label className="grid gap-1 text-sm text-secondary">
          编号 A
          <input
            aria-label="编号 A"
            type="number"
            min={0}
            max={7}
            step={1}
            value={lab.a}
            className={controlClass}
            onChange={(e) => setLab({ ...lab, a: e.target.value })}
          />
        </label>
        <label className="grid gap-1 text-sm text-secondary">
          编号 B（find 不使用）
          <input
            aria-label="编号 B"
            type="number"
            min={0}
            max={7}
            step={1}
            value={lab.b}
            disabled={lab.operation === "find"}
            className={controlClass}
            onChange={(e) => setLab({ ...lab, b: e.target.value })}
          />
        </label>
        <label className="col-span-2 grid gap-1 text-sm text-secondary">
          操作
          <select
            aria-label="并查集操作"
            value={lab.operation}
            className={`${controlClass} w-full`}
            onChange={(e) =>
              setLab({ ...lab, operation: e.target.value as ForestOperation })
            }
          >
            <option value="find">find(A)：完整路径压缩</option>
            <option value="union">union(A,B)：按秩合并</option>
            <option value="wrong-link">错误：直接令 parent[A]=B</option>
          </select>
        </label>
        <button type="button" className={controlClass} onClick={execute}>
          执行操作
        </button>
        <button
          type="button"
          className={controlClass}
          onClick={() => setLab(initialForestLab())}
        >
          重置全部
        </button>
      </div>
      <div
        role="status"
        aria-live="polite"
        className="mb-4 break-words text-sm leading-relaxed text-primary"
      >
        <p>{lab.message}</p>
        {lab.paths.map((path, i) => (
          <p key={i}>
            {lab.forest.faulted
              ? "误连前 A 的路径（仅观测）："
              : `第 ${i + 1} 次查找的原路径：`}
            {path.join(" → ")}（{path.length - 1} 条边）
          </p>
        ))}
        <p>
          改写 parent 的节点：
          {lab.changed.length ? lab.changed.join("、") : "无"}。
          {lab.forest.faulted ? "故障后禁止继续，重置后再比较。" : ""}
        </p>
        {lab.error && (
          <p role="alert" className="text-danger">
            {lab.error}；森林保持不变。
          </p>
        )}
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-5">
        <ForestPicture forest={lab.before} changed={[]} caption="执行前" />
        <ForestPicture
          forest={lab.forest}
          changed={lab.changed}
          caption="执行后"
        />
      </div>
      <p className="mt-4 text-sm text-secondary">
        模型仅接收这里创建的有界状态；不导入任意外部图。错误模式只演示一次受控的误连边，并拦截成环情况。
      </p>
    </section>
  );
}
