"use client";

import { useState } from "react";

type Kind = "binary" | "ternary" | "leftist" | "skew" | "binomial";
type Operation = "build" | "insert" | "delete" | "fault" | "meld";
type Node = {
  id: number;
  key: number;
  children: (number | null)[];
  npl: number;
  rank: number;
};
type Frame = {
  array: number[];
  nodes: Node[];
  roots: number[];
  message: string;
  highlight: number[];
  violations: number[];
  removed: number | null;
};
type Request = { kind: Kind; operation: Operation; input: string };
type Run = { frames: Frame[]; error: string | null };

const INITIAL: Request = {
  kind: "binary",
  operation: "delete",
  input: "1,4,2,9 | 8,3,7",
};

/** Bounded, deterministic trace. Every mutation is local to this call. */
export function heapsModel(request: Request): Run {
  const { kind, operation, input } = request;
  const frames: Frame[] = [];
  const fail = (error: string): Run => ({ frames: [], error });
  if (!["binary", "ternary", "leftist", "skew", "binomial"].includes(kind))
    return fail("未知结构。");
  const parts = input.split("|");
  if (parts.length > 2) return fail("最多用一个 | 分隔 A 与 B。");
  const parsed = parts.map((part) =>
    part.trim() === ""
      ? []
      : part
          .trim()
          .split(/[\s,，]+/)
          .map((token) => (/^[+-]?\d+$/.test(token) ? Number(token) : NaN)),
  );
  const a = parsed[0];
  const b = parsed[1] ?? [];
  if (a.concat(b).some((x) => !Number.isInteger(x) || x < -99 || x > 99))
    return fail("仅接受 -99 到 99 的整数；不截断、不取模。");
  if (a.length + b.length > 8) return fail("图示容量为 8，已拒绝超容量输入。");
  const isArray = kind === "binary" || kind === "ternary";
  if (isArray && !["build", "insert", "delete", "fault"].includes(operation))
    return fail("数组堆请选择建堆、插入或删除。");
  if (!isArray && operation !== "meld") return fail("此结构展示 meld 合并。");
  if (isArray) {
    if (operation === "insert" && b.length !== 1)
      return fail("插入格式为 A | x，右侧必须恰有一个整数。");
    const values = operation === "insert" ? [...a] : a.concat(b);
    const d = kind === "binary" ? 2 : 3;
    let removed: number | null = null;
    const record = (message: string, highlight: number[] = []) => {
      const violations = values.flatMap((x, i) =>
        i > 0 && values[Math.floor((i - 1) / d)] > x ? [i] : [],
      );
      frames.push({
        array: [...values],
        nodes: [],
        roots: [],
        message,
        highlight,
        violations,
        removed,
      });
    };
    const down = (start: number, trace: boolean, wrong: boolean) => {
      let p = start;
      while (d * p + 1 < values.length) {
        let c = d * p + 1;
        for (let j = c + 1; !wrong && j <= d * p + d && j < values.length; j++)
          if (values[j] < values[c]) c = j;
        if (trace)
          record(
            `比较父 [${p}] 与${wrong ? "错误指定的首" : "最小"}孩子 [${c}]。`,
            [p, c],
          );
        if (values[p] <= values[c]) break;
        [values[p], values[c]] = [values[c], values[p]];
        if (trace) record(`交换 [${p}] 与 [${c}]；继续下滤。`, [p, c]);
        p = c;
      }
    };
    if (operation === "build")
      record("原数组：形状完整，但红边表示尚未满足堆序。");
    for (let i = Math.floor((values.length - 2) / d); i >= 0; i--)
      down(i, operation === "build", false);
    if (operation !== "build")
      record("已由 A（删除时含 B）建成最小堆；准备执行操作。");
    if (operation === "insert") {
      values.push(b[0]);
      let c = values.length - 1;
      record("新值追加末尾：形状仍完整，沿父链上滤。", [c]);
      while (c > 0) {
        const p = Math.floor((c - 1) / d);
        if (values[p] <= values[c]) break;
        [values[p], values[c]] = [values[c], values[p]];
        record(`上滤交换 [${p}] 与 [${c}]。`, [p, c]);
        c = p;
      }
    }
    if (operation === "delete" || operation === "fault") {
      if (!values.length) return fail("空堆：deleteMin 被拒绝，未读取根。");
      removed = values[0];
      const last = values.pop()!;
      if (values.length) values[0] = last;
      record(
        `取出 ${removed}，用末项补根（若还有元素）。`,
        values.length ? [0] : [],
      );
      down(0, true, operation === "fault");
    }
    record("操作结束；检查所有父子边，而不只检查根。");
    return { frames, error: null };
  }

  const nodes: Node[] = [];
  let tracing = false;
  const newNode = (key: number) => {
    const id = nodes.length;
    nodes.push({
      id,
      key,
      children: kind === "binomial" ? [] : [null, null],
      npl: 0,
      rank: 0,
    });
    return id;
  };
  const npl = (id: number | null): number => (id === null ? -1 : nodes[id].npl);
  const record = (message: string, highlight: number[] = []) => {
    if (!tracing) return;
    const children = new Set(
      nodes.flatMap((node) => node.children).filter((id) => id !== null),
    );
    const roots = nodes
      .filter((node) => !children.has(node.id))
      .map((node) => node.id);
    const violations = nodes.flatMap((node) =>
      node.children.flatMap((id) =>
        id !== null && node.key > nodes[id].key ? [id] : [],
      ),
    );
    frames.push({
      array: [],
      nodes: nodes.map((node) => ({ ...node, children: [...node.children] })),
      roots,
      message,
      highlight,
      violations,
      removed: null,
    });
  };
  const meld = (x: number | null, y: number | null): number | null => {
    if (x === null) return y;
    if (y === null) return x;
    if (nodes[y].key < nodes[x].key) [x, y] = [y, x];
    const root = nodes[x];
    const right = root.children[1];
    root.children[1] = null;
    root.npl = 0;
    record(`保留根 ${root.key}；暂拆右子树，与另一根递归合并。`, [x, y]);
    root.children[1] = meld(right, y);
    record(`把递归结果接回 ${root.key} 的右侧；尚未调整左右结构。`, [x]);
    if (kind === "skew" || npl(root.children[0]) < npl(root.children[1])) {
      [root.children[0], root.children[1]] = [
        root.children[1],
        root.children[0],
      ];
      record(
        kind === "skew"
          ? `斜堆：在 ${root.key} 无条件交换左右孩子。`
          : `左式堆：在 ${root.key} 因左 npl 较小而交换孩子。`,
        [x],
      );
    }
    root.npl = 1 + Math.min(npl(root.children[0]), npl(root.children[1]));
    record(
      `返回根 ${root.key}${kind === "leftist" ? `，更新 npl=${root.npl}` : "，不使用 npl 决策"}。`,
      [x],
    );
    return x;
  };
  const carryIn = (forest: (number | null)[], id: number) => {
    let carry = id;
    while (forest[nodes[carry].rank] != null) {
      const rank = nodes[carry].rank;
      let other = forest[rank]!;
      forest[rank] = null;
      if (nodes[other].key < nodes[carry].key) [carry, other] = [other, carry];
      nodes[carry].children.push(other);
      nodes[carry].rank++;
      record(
        `两个 B${rank} 链接：${nodes[other].key} 成为 ${nodes[carry].key} 的孩子；进位 B${rank + 1}。`,
        [carry, other],
      );
    }
    forest[nodes[carry].rank] = carry;
    record(`进位落入空的 rank ${nodes[carry].rank} 槽。`, [carry]);
  };
  if (kind === "binomial") {
    const left: (number | null)[] = [];
    const right: (number | null)[] = [];
    a.forEach((key) => carryIn(left, newNode(key)));
    b.forEach((key) => carryIn(right, newNode(key)));
    tracing = true;
    record(
      `A 根秩 [${left.flatMap((id, rank) => (id == null ? [] : [rank]))}]；B 根秩 [${right.flatMap((id, rank) => (id == null ? [] : [rank]))}]。`,
    );
    right.forEach((id) => {
      if (id != null) carryIn(left, id);
    });
  } else {
    let left: number | null = null;
    let right: number | null = null;
    a.forEach((key) => {
      left = meld(left, newNode(key));
    });
    b.forEach((key) => {
      right = meld(right, newNode(key));
    });
    tracing = true;
    record(
      `输入 A 根 ${left === null ? "∅" : nodes[left].key}，B 根 ${right === null ? "∅" : nodes[right].key}；节点集合互不共享。`,
    );
    meld(left, right);
  }
  record("合并结束：空堆是单位元；B 的节点已转入结果，不再单独拥有。");
  return { frames, error: null };
}

function HeapDrawing({ frame, kind }: { frame: Frame; kind: Kind }) {
  const d = kind === "ternary" ? 3 : 2;
  const arrayMode = kind === "binary" || kind === "ternary";
  const nodes: Node[] = arrayMode
    ? frame.array.map((key, id) => ({
        id,
        key,
        npl: 0,
        rank: 0,
        children: Array.from({ length: d }, (_, j) => id * d + j + 1).filter(
          (i) => i < frame.array.length,
        ),
      }))
    : frame.nodes;
  const roots = arrayMode ? (nodes.length ? [0] : []) : frame.roots;
  const positions = new Map<number, { x: number; y: number }>();
  let slot = 0;
  let depthMax = 0;
  const visit = (id: number, depth: number) => {
    const node = nodes[id];
    const half = Math.ceil(node.children.length / 2);
    node.children.slice(0, half).forEach((child) => {
      if (child !== null) visit(child, depth + 1);
    });
    positions.set(id, {
      x: ((slot++ + 0.5) * 280) / Math.max(nodes.length, 1),
      y: depth * 76 + 28,
    });
    depthMax = Math.max(depthMax, depth);
    node.children.slice(half).forEach((child) => {
      if (child !== null) visit(child, depth + 1);
    });
  };
  roots.forEach((root) => visit(root, 0));
  const height = nodes.length ? depthMax * 76 + 72 : 72;
  return (
    <div className="mx-auto w-full max-w-[280px]">
      {arrayMode && (
        <svg
          viewBox={`0 0 280 ${Math.max(1, Math.ceil(nodes.length / 4)) * 58}`}
          className="block w-full"
          role="img"
          aria-label="数组下标和值"
        >
          <title>{"数组与树使用相同的下标；未占用的尾部不画节点"}</title>
          {frame.array.map((key, i) => (
            <g
              key={i}
              transform={`translate(${(i % 4) * 70 + 3},${Math.floor(i / 4) * 58 + 2})`}
            >
              <rect
                width="64"
                height="50"
                rx="5"
                fill="var(--bg-elevated)"
                stroke={
                  frame.highlight.includes(i)
                    ? "var(--accent)"
                    : "var(--border)"
                }
              />
              <text
                x="32"
                y="20"
                textAnchor="middle"
                fontSize="16"
                fill="var(--text-primary)"
              >
                {key}
              </text>
              <text
                x="32"
                y="41"
                textAnchor="middle"
                fontSize="14"
                fill="var(--text-secondary)"
              >{`[${i}]`}</text>
            </g>
          ))}
        </svg>
      )}
      <svg
        viewBox={`0 0 280 ${height}`}
        className="block w-full"
        role="img"
        aria-label={`${kind} 的真实父子关系`}
      >
        <title>
          {
            "父子连线表示堆序；红边为违反堆序的边；n 为 npl，r 为 rank，i 为数组下标"
          }
        </title>
        {nodes.flatMap((node) =>
          node.children.flatMap((child) => {
            if (child === null) return [];
            const from = positions.get(node.id)!;
            const to = positions.get(child)!;
            return [
              <line
                key={`${node.id}-${child}`}
                x1={from.x}
                y1={from.y + 34}
                x2={to.x}
                y2={to.y - 16}
                stroke={
                  frame.violations.includes(child)
                    ? "var(--danger)"
                    : "var(--border)"
                }
                strokeWidth="2"
              />,
            ];
          }),
        )}
        {nodes.map((node) => {
          const at = positions.get(node.id)!;
          return (
            <g key={node.id} transform={`translate(${at.x},${at.y})`}>
              <rect
                x="-16"
                y="-16"
                width="32"
                height="50"
                rx="12"
                fill="var(--bg-elevated)"
                stroke={
                  frame.highlight.includes(node.id)
                    ? "var(--accent)"
                    : "var(--text-secondary)"
                }
                strokeWidth="2"
              />
              <text
                y="3"
                textAnchor="middle"
                fontSize="14"
                fill="var(--text-primary)"
              >
                {node.key}
              </text>
              <text
                y="24"
                textAnchor="middle"
                fontSize="14"
                fill="var(--text-secondary)"
              >
                {arrayMode
                  ? `i${node.id}`
                  : kind === "leftist"
                    ? `n${node.npl}`
                    : kind === "binomial"
                      ? `r${node.rank}`
                      : "·"}
              </text>
            </g>
          );
        })}
        {!nodes.length && (
          <text
            x="140"
            y="36"
            textAnchor="middle"
            fontSize="16"
            fill="var(--text-secondary)"
          >
            ∅ 空堆
          </text>
        )}
      </svg>
    </div>
  );
}

export function DsaPriorityQueuesHeapsMergeLab() {
  const [request, setRequest] = useState<Request>({ ...INITIAL });
  const [run, setRun] = useState<Run>(() => heapsModel(INITIAL));
  const [step, setStep] = useState(0);
  const arrayMode = request.kind === "binary" || request.kind === "ternary";
  const frame = run.frames[step];
  const complete = step === run.frames.length - 1;
  const change = (next: Request) => {
    const nextRun = heapsModel(next);
    setRequest(next);
    setRun(nextRun);
    setStep(0);
  };
  const control =
    "min-h-11 w-full rounded border border-border bg-elevated px-3 py-2 text-primary";
  return (
    <section
      className="my-6 min-w-0 rounded-xl border border-border bg-elevated p-3"
      aria-label="优先队列结构实验"
    >
      <h3 className="font-semibold">数组筛选与可合并堆</h3>
      <p className="my-2 text-sm text-secondary">
        整数 −99…99；总共最多 8 个。A | B 表示独立输入；插入用 A |
        x。n=npl，r=秩，i=下标；亮框是本步涉及节点。
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label>
          结构
          <select
            className={control}
            value={request.kind}
            onChange={(event) => {
              const kind = event.target.value as Kind;
              change({
                ...request,
                kind,
                operation:
                  kind === "binary" || kind === "ternary" ? "delete" : "meld",
              });
            }}
          >
            <option value="binary">二叉堆 d=2</option>
            <option value="ternary">d 堆 d=3</option>
            <option value="leftist">左式堆</option>
            <option value="skew">斜堆</option>
            <option value="binomial">二项队列</option>
          </select>
        </label>
        <label>
          输入 A | B
          <input
            className={control}
            value={request.input}
            onChange={(event) =>
              change({ ...request, input: event.target.value })
            }
            spellCheck={false}
          />
        </label>
        <label>
          操作（切换即重新计算）
          <select
            className={control}
            value={request.operation}
            onChange={(event) =>
              change({ ...request, operation: event.target.value as Operation })
            }
          >
            {arrayMode ? (
              <>
                <option value="build">从原数组建堆</option>
                <option value="insert">插入并上滤</option>
                <option value="delete">删除最小值</option>
                <option value="fault">错误：只选首孩子下滤</option>
              </>
            ) : (
              <option value="meld">逐步合并 A 与 B</option>
            )}
          </select>
        </label>
        <div className="flex items-end gap-2">
          <button
            type="button"
            className={control}
            disabled={!frame || complete}
            onClick={() => setStep(step + 1)}
          >
            下一步
          </button>
          <button
            type="button"
            className={control}
            onClick={() => change({ ...INITIAL })}
          >
            重置
          </button>
        </div>
      </div>
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="my-3 min-h-16 break-words text-sm"
      >
        {run.error ??
          (frame
            ? `第 ${step + 1}/${run.frames.length} 帧：${frame.message} ${frame.removed === null ? "" : `已取出 ${frame.removed}。`} ${complete ? (frame.violations.length ? `失败：${frame.violations.length} 条边违反堆序。` : "本次完成：所有父子边满足堆序。") : "中间态不代表操作完成。"}`
            : "没有可显示的数据。")}
      </p>
      {frame && <HeapDrawing frame={frame} kind={request.kind} />}
      <p className="mt-2 text-sm text-secondary">
        拆下的子树仍画为独立根；合并中 npl
        可暂未更新。结束再检查左式性质或根秩唯一性。红边同时在状态区报告数量，不仅依靠颜色。
      </p>
    </section>
  );
}
