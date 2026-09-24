"use client";

import { useState } from "react";

type Tree = Readonly<{ key: number; left: Tree; right: Tree }> | null;
type Direction = "left" | "right";
const node = (key: number, left: Tree = null, right: Tree = null): Tree => ({
  key,
  left,
  right,
});
const scenarios = {
  transfer: { label: "中间子树：30 不能丢", keys: [40, 20, 10, 30, 50] },
  ll: { label: "LL：先右旋根", keys: [50, 30, 20, 10, 40, 70] },
  lr: { label: "LR：需先旋左孩子", keys: [50, 20, 40] },
  rr: { label: "RR：先左旋根", keys: [20, 10, 40, 30, 50, 60] },
  rl: { label: "RL：需先旋右孩子", keys: [20, 50, 30] },
  chain: { label: "长链：不是一次就平衡", keys: [10, 20, 30, 40, 50] },
  empty: { label: "空树：旋转安全拒绝", keys: [] },
} as const;
type Scenario = keyof typeof scenarios;
type State = {
  scenario: Scenario;
  root: Tree;
  fault: boolean;
  message: string;
};
function insert(t: Tree, key: number): Tree {
  if (!t) return node(key);
  if (key === t.key) return t;
  return key < t.key
    ? node(t.key, insert(t.left, key), t.right)
    : node(t.key, t.left, insert(t.right, key));
}
function inorder(t: Tree): number[] {
  return t ? [...inorder(t.left), t.key, ...inorder(t.right)] : [];
}
function preorder(t: Tree): number[] {
  return t ? [t.key, ...preorder(t.left), ...preorder(t.right)] : [];
}
function postorder(t: Tree): number[] {
  return t ? [...postorder(t.left), ...postorder(t.right), t.key] : [];
}
function height(t: Tree): number {
  return t ? 1 + Math.max(height(t.left), height(t.right)) : -1;
}
function balanced(t: Tree): boolean {
  return (
    !t ||
    (Math.abs(height(t.left) - height(t.right)) <= 1 &&
      balanced(t.left) &&
      balanced(t.right))
  );
}
function metrics(t: Tree): { key: number; height: number; balance: number }[] {
  return t
    ? [
        {
          key: t.key,
          height: height(t),
          balance: height(t.left) - height(t.right),
        },
        ...metrics(t.left),
        ...metrics(t.right),
      ]
    : [];
}
function inspect(t: Tree, expected: readonly number[]) {
  const keys = inorder(t);
  const sorted = [...new Set(expected)].sort((a, b) => a - b);
  return {
    keys,
    preorder: preorder(t),
    postorder: postorder(t),
    height: height(t),
    nodes: metrics(t),
    order: keys.every((key, i) => i === 0 || keys[i - 1] < key),
    inventory:
      JSON.stringify([...keys].sort((a, b) => a - b)) ===
      JSON.stringify(sorted),
    balanced: balanced(t),
    missing: sorted.filter((key) => !keys.includes(key)),
  };
}
function rotate(t: Tree, direction: Direction, fault = false) {
  const pivot = direction === "left" ? t?.right : t?.left;
  if (!t || !pivot) {
    return { root: t, message: "拒绝：根或旋转所需孩子为空，树未改变。" };
  }
  const middle = direction === "left" ? pivot.left : pivot.right;
  const moved = fault ? null : middle;
  const root =
    direction === "left"
      ? node(pivot.key, node(t.key, t.left, moved), pivot.right)
      : node(pivot.key, pivot.left, node(t.key, moved, t.right));
  const detail = fault
    ? middle
      ? `故障实际丢失中间子树：${inorder(middle).join("、")}。`
      : "中间子树为空，这次故障没有丢键。请重置后右旋观察。"
    : `中间子树 ${inorder(middle).join("、") || "∅"} 已接到旧根。`;
  return {
    root,
    message: `${direction === "left" ? "左" : "右"}旋：根 ${t.key} → ${root!.key}。${detail}`,
  };
}
function initialState(scenario: Scenario = "transfer"): State {
  return {
    scenario,
    root: scenarios[scenario].keys.reduce<Tree>(insert, null),
    fault: false,
    message: "先预测中序是否改变，再旋转。h(空) = −1。",
  };
}
function step(state: State, direction: Direction): State {
  return { ...state, ...rotate(state.root, direction, state.fault) };
}

/** Immutable model used by both UI and offline invariant tests. */
export const treeLab = {
  node,
  insert,
  inspect,
  rotate,
  initialState,
  step,
  scenarios,
  toggleFault: (state: State): State => ({ ...state, fault: !state.fault }),
};

const colors = {
  ink: "var(--text-primary)",
  muted: "var(--text-secondary)",
  edge: "var(--border)",
  accent: "var(--accent)",
  paper: "var(--bg-elevated)",
};
function TreeDrawing({ root }: { root: Tree }) {
  const keys = inorder(root);
  const positions: { tree: NonNullable<Tree>; x: number; y: number }[] = [];
  function place(t: Tree, depth: number) {
    if (!t) return;
    positions.push({
      tree: t,
      x: 25 + ((keys.indexOf(t.key) + 0.5) * 280) / keys.length,
      y: 60 + depth * 80,
    });
    place(t.left, depth + 1);
    place(t.right, depth + 1);
  }
  place(root, 0);
  const viewHeight = Math.max(330, 110 + height(root) * 80);
  return (
    <svg
      viewBox={`0 0 330 ${viewHeight}`}
      role="img"
      aria-label="真实二叉树：连线是父子关系，左孩子在左，右孩子在右；旋转改变根和边。"
      className="mx-auto block w-full max-w-[440px]"
      data-tree-svg="true"
    >
      <title>{`树根 ${root?.key ?? "空"}；中序 ${keys.join(" ") || "空"}`}</title>
      {positions.flatMap(({ tree, x, y }) =>
        [tree.left, tree.right].filter(Boolean).map((child) => {
          const target = positions.find((p) => p.tree === child)!;
          const dx = target.x - x;
          const dy = target.y - y;
          const length = Math.hypot(dx, dy);
          return (
            <line
              key={`${tree.key}-${child!.key}`}
              x1={x + (dx * 23) / length}
              y1={y + (dy * 23) / length}
              x2={target.x - (dx * 23) / length}
              y2={target.y - (dy * 23) / length}
              stroke={colors.muted}
              strokeWidth={2}
            />
          );
        }),
      )}
      {positions.map(({ tree, x, y }) => (
        <g key={tree.key}>
          {tree === root && (
            <text
              x={x}
              y={y - 32}
              textAnchor="middle"
              fontSize={18}
              fill={colors.ink}
            >
              根
            </text>
          )}
          <circle
            cx={x}
            cy={y}
            r={22}
            fill={colors.paper}
            stroke={colors.accent}
            strokeWidth={2}
          />
          <text
            x={x}
            y={y + 6}
            textAnchor="middle"
            fontSize={18}
            fill={colors.ink}
          >
            {tree.key}
          </text>
        </g>
      ))}
      {!root && (
        <text
          x={165}
          y={80}
          textAnchor="middle"
          fontSize={18}
          fill={colors.ink}
        >
          空树 ∅
        </text>
      )}
    </svg>
  );
}

export function DsaTreesRotationLab() {
  const [state, setState] = useState<State>(() => initialState());
  const report = inspect(state.root, scenarios[state.scenario].keys);
  const control =
    "min-h-11 rounded border border-border px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2";
  return (
    <section
      aria-label="树旋转与不变量实验"
      className="my-6 rounded-xl border border-border bg-elevated p-3 text-primary"
    >
      <h3 className="text-lg font-semibold">旋转搬的是边，不是键</h3>
      <p className="my-2 text-sm text-secondary">
        仅旋转当前根；不是自动 AVL 修复器。LR/RL
        需先旋孩子，不能只按根旋转冒充双旋。
      </p>
      <div className="flex flex-wrap gap-2">
        <label className="flex w-full flex-col gap-1 text-sm">
          输入树（切换会清除故障）
          <select
            className={`${control} w-full min-w-0 bg-elevated`}
            value={state.scenario}
            onChange={(event) =>
              setState(initialState(event.target.value as Scenario))
            }
          >
            {Object.entries(scenarios).map(([id, scenario]) => (
              <option key={id} value={id}>
                {scenario.label}
              </option>
            ))}
          </select>
        </label>
        <button
          className={control}
          onClick={() => setState(step(state, "left"))}
        >
          左旋根
        </button>
        <button
          className={control}
          onClick={() => setState(step(state, "right"))}
        >
          右旋根
        </button>
        <button className={control} onClick={() => setState(initialState())}>
          重置全部
        </button>
        <label className="flex min-h-11 w-full cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={state.fault}
            onChange={() => setState(treeLab.toggleFault(state))}
            className="h-5 w-5"
          />
          故障：旋转时丢弃中间子树
        </label>
      </div>
      <TreeDrawing root={state.root} />
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="space-y-1 break-words text-sm"
      >
        <p>{state.message}</p>
        <p>
          根：{state.root?.key ?? "∅"}；高度：{report.height}；有序：
          {report.order ? "通过" : "失败"}；键集合：
          {report.inventory
            ? "完整"
            : `失败，缺少 ${report.missing.join("、")}`}
          ；AVL 平衡：{report.balanced ? "满足" : "不满足"}。
        </p>
        <p>中序：{report.keys.join(" → ") || "∅"}</p>
        <p>前序：{report.preorder.join(" → ") || "∅"}</p>
        <p>后序：{report.postorder.join(" → ") || "∅"}</p>
        <p>
          逐节点（键:高度/平衡因子）：
          {report.nodes
            .map((n) => `${n.key}:${n.height}/${n.balance}`)
            .join("；") || "∅"}
        </p>
      </div>
      <p className="mt-3 text-sm text-secondary">
        检查要分开：中序仍递增不代表没丢数据，普通 BST 也不一定满足 AVL
        平衡。重置会恢复默认树、输入选项、故障开关和全部输出。
      </p>
    </section>
  );
}

export function DsaTreesBTreeFigure() {
  return (
    <figure className="my-6 rounded-xl border border-border p-3">
      <svg
        viewBox="0 0 330 370"
        role="img"
        aria-label="最小度数 t=2 的 B 树根分裂：满根含10、20、30；提升20后，左右叶分别含10和30。"
        className="mx-auto block w-full max-w-[440px]"
      >
        <title>{"B 树根分裂：三个键变成一个根与两个叶页，所有叶同深"}</title>
        <text
          x={165}
          y={28}
          textAnchor="middle"
          fontSize={18}
          fill={colors.ink}
        >
          分裂前：一个满叶页
        </text>
        <rect
          x={65}
          y={48}
          width={200}
          height={48}
          rx={4}
          fill={colors.paper}
          stroke={colors.accent}
        />
        {[10, 20, 30].map((key, i) => (
          <g key={key}>
            {i > 0 && (
              <line
                x1={65 + i * 66.7}
                y1={48}
                x2={65 + i * 66.7}
                y2={96}
                stroke={colors.edge}
              />
            )}
            <text
              x={98 + i * 66.7}
              y={78}
              textAnchor="middle"
              fontSize={18}
              fill={colors.ink}
            >
              {key}
            </text>
          </g>
        ))}
        <path
          d="M165 108 V146 M157 138 L165 146 L173 138"
          fill="none"
          stroke={colors.muted}
          strokeWidth={2}
        />
        <text
          x={165}
          y={176}
          textAnchor="middle"
          fontSize={18}
          fill={colors.ink}
        >
          提升中间键 20，新建根页
        </text>
        <path
          d="M145 236 L80 294 M185 236 L250 294"
          fill="none"
          stroke={colors.muted}
          strokeWidth={2}
        />
        <rect
          x={125}
          y={194}
          width={80}
          height={42}
          rx={4}
          fill={colors.paper}
          stroke={colors.accent}
        />
        <text
          x={165}
          y={222}
          textAnchor="middle"
          fontSize={18}
          fill={colors.ink}
        >
          20
        </text>
        {[
          { key: 10, x: 40 },
          { key: 30, x: 210 },
        ].map(({ key, x }) => (
          <g key={key}>
            <rect
              x={x}
              y={294}
              width={80}
              height={42}
              rx={4}
              fill={colors.paper}
              stroke={colors.accent}
            />
            <text
              x={x + 40}
              y={322}
              textAnchor="middle"
              fontSize={18}
              fill={colors.ink}
            >
              {key}
            </text>
          </g>
        ))}
        <text
          x={165}
          y={364}
          textAnchor="middle"
          fontSize={18}
          fill={colors.muted}
        >
          叶页深度都是 1；每页至少 1 键
        </text>
      </svg>
      <figcaption className="mt-2 text-sm text-secondary">
        这是插入 40 前对满根的预分裂；再沿右孩子下降，把 40 插入含 30
        的叶页。图中提升的 20 只保留在父页，不是 B+ 树的叶副本。
      </figcaption>
    </figure>
  );
}
