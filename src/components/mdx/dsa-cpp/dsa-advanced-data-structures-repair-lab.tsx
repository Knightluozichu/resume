"use client";

import { useState } from "react";

type Tree = Readonly<{
  key: number;
  level: number;
  left: Tree;
  right: Tree;
}> | null;
type Frame = { tree: Tree; operation: string };
type State = {
  input: string;
  omitSplit: boolean;
  frames: Frame[];
  cursor: number;
  error: string;
};
type Event =
  | { type: "input"; value: string }
  | { type: "fault" }
  | { type: "insert" }
  | { type: "step" }
  | { type: "reset" };
const level = (t: Tree): number => t?.level ?? 0;
const keys = (t: Tree): number[] =>
  t ? [...keys(t.left), t.key, ...keys(t.right)] : [];

function validate(tree: Tree): string[] {
  const errors: string[] = [];
  function visit(t: Tree, low: number, high: number) {
    if (!t) return;
    if (!Number.isInteger(t.key) || t.key <= low || t.key >= high)
      errors.push(`${t.key}：BST 次序错误`);
    if (!Number.isInteger(t.level) || t.level < 1)
      errors.push(`${t.key}：层级必须为正整数`);
    if (level(t.left) !== t.level - 1)
      errors.push(`${t.key}：左孩子必须低一层`);
    if (![t.level, t.level - 1].includes(level(t.right)))
      errors.push(`${t.key}：右孩子只能同层或低一层`);
    if (level(t.right?.right ?? null) >= t.level)
      errors.push(`${t.key}：连续右水平边，必须 split`);
    if (t.level > 1 && (!t.left || !t.right))
      errors.push(`${t.key}：高层节点缺少两个孩子`);
    visit(t.left, low, t.key);
    visit(t.right, t.key, high);
  }
  visit(tree, -Infinity, Infinity);
  return errors;
}

function insertion(tree: Tree, key: number, omitSplit = false): Frame[] {
  if (!Number.isInteger(key) || key < 0 || key > 99)
    throw new RangeError("键必须为 0..99 整数");
  if (validate(tree).length) throw new Error("先重置不合法的树");
  const present = keys(tree);
  if (present.includes(key)) return [{ tree, operation: "重复键：集合不变" }];
  if (present.length >= 7) throw new RangeError("实验上限为 7 个节点");
  const frames: Frame[] = [{ tree, operation: `准备插入 ${key}` }];
  function grow(t: Tree, emit: (t: Tree, operation: string) => void): Tree {
    if (!t) {
      const leaf = { key, level: 1, left: null, right: null };
      emit(leaf, `挂入叶子 ${key}，层级 1`);
      return leaf;
    }
    let n = t;
    if (key < t.key) {
      const left = grow(t.left, (child, op) => emit({ ...t, left: child }, op));
      n = { ...t, left };
    } else {
      const right = grow(t.right, (child, op) =>
        emit({ ...t, right: child }, op),
      );
      n = { ...t, right };
    }
    if (n.left && n.left.level === n.level) {
      const child = n.left;
      n = { ...child, right: { ...n, left: child.right } };
      emit(n, `skew：${t.key} 右旋，层级不变`);
    }
    if (n.right?.right && n.right.right.level === n.level) {
      if (omitSplit)
        emit(n, `故障：跳过 ${n.key} 的 split，连续右水平边留在树中`);
      else {
        const child = n.right;
        n = {
          ...child,
          level: child.level + 1,
          left: { ...n, right: child.left },
        };
        emit(n, `split：左旋并把 ${n.key} 提升到层级 ${n.level}`);
      }
    }
    return n;
  }
  const result = grow(tree, (t, operation) =>
    frames.push({ tree: t, operation }),
  );
  frames.push({ tree: result, operation: "递归返回完成；检查整棵树" });
  return frames;
}

function initial(): State {
  return {
    input: "30",
    omitSplit: false,
    frames: [
      {
        tree: {
          key: 10,
          level: 1,
          left: null,
          right: { key: 20, level: 1, left: null, right: null },
        },
        operation: "初始：10 → 20 是一条合法的右水平边",
      },
    ],
    cursor: 0,
    error: "",
  };
}
function transition(state: State, event: Event): State {
  if (event.type === "reset") return initial();
  const busy = state.cursor < state.frames.length - 1;
  if (event.type === "step")
    return {
      ...state,
      cursor: Math.min(state.cursor + 1, state.frames.length - 1),
      error: "",
    };
  if (busy) return state;
  if (event.type === "input")
    return { ...state, input: event.value, error: "" };
  if (event.type === "fault")
    return { ...state, omitSplit: !state.omitSplit, error: "" };
  if (!/^\d{1,2}$/.test(state.input.trim()))
    return { ...state, error: "请输入 0..99 的整数；空值、小数和负数不接受。" };
  try {
    const frames = insertion(
      state.frames[state.cursor].tree,
      Number(state.input),
      state.omitSplit,
    );
    return {
      ...state,
      frames,
      cursor: Math.min(1, frames.length - 1),
      error: "",
    };
  } catch (error) {
    return {
      ...state,
      error: error instanceof Error ? error.message : "插入失败",
    };
  }
}

/** Bounded immutable AA insertion, not a general-purpose container. */
export const advancedRepairModel = {
  initial,
  transition,
  insertion,
  validate,
  keys,
};

const C = {
  bg: "var(--bg-elevated)",
  text: "var(--text-primary)",
  muted: "var(--text-secondary)",
  line: "var(--border)",
  accent: "var(--accent)",
  danger: "var(--danger)",
};
const button =
  "min-h-11 rounded-control border border-border px-3 py-2 text-sm text-primary focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50";

function AATreeFigure({ tree }: { tree: Tree }) {
  const ordered = keys(tree);
  const positions: { node: NonNullable<Tree>; x: number; y: number }[] = [];
  function place(t: Tree, depth: number) {
    if (!t) return;
    const rank = ordered.indexOf(t.key);
    positions.push({
      node: t,
      x: ordered.length === 1 ? 165 : 35 + (rank * 260) / (ordered.length - 1),
      y: 58 + depth * 82,
    });
    place(t.left, depth + 1);
    place(t.right, depth + 1);
  }
  place(tree, 0);
  const height = Math.max(330, ...positions.map((p) => p.y + 60));
  return (
    <svg
      viewBox={`0 0 330 ${height}`}
      role="img"
      aria-label="AA 树：节点标键和层级；虚线表示右水平边"
      className="mx-auto block h-auto w-full max-w-[430px]"
    >
      <title>{"AA 插入的实际树形；虚线为同层右边"}</title>
      {positions.flatMap((p) =>
        [p.node.left, p.node.right].map((child, side) => {
          if (!child) return null;
          const end = positions.find((q) => q.node.key === child.key)!;
          const dx = end.x - p.x,
            dy = end.y - p.y;
          const length = Math.hypot(dx, dy);
          const horizontal = child.level === p.node.level;
          return (
            <line
              key={`${p.node.key}-${side}`}
              x1={p.x + (dx * 28) / length}
              y1={p.y + (dy * 28) / length}
              x2={end.x - (dx * 28) / length}
              y2={end.y - (dy * 28) / length}
              stroke={horizontal ? C.accent : C.muted}
              strokeWidth="2"
              strokeDasharray={horizontal ? "5 4" : undefined}
            />
          );
        }),
      )}
      {positions.map(({ node, x, y }) => (
        <g key={node.key}>
          <circle
            cx={x}
            cy={y}
            r="27"
            fill={C.bg}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text x={x} y={y - 3} textAnchor="middle" fontSize="18" fill={C.text}>
            {node.key}
          </text>
          <text
            x={x}
            y={y + 16}
            textAnchor="middle"
            fontSize="16"
            fill={C.muted}
          >{`L${node.level}`}</text>
        </g>
      ))}
      <text
        x="165"
        y={height - 12}
        textAnchor="middle"
        fontSize="16"
        fill={C.muted}
      >
        空孩子层级 0 · 中序位置固定
      </text>
    </svg>
  );
}

export function DsaAdvancedDataStructuresRepairLab() {
  const [state, setState] = useState<State>(initial);
  const current = state.frames[state.cursor];
  const problems = validate(current.tree);
  const busy = state.cursor < state.frames.length - 1;
  // Pure transition executes before setState; no mutation in React updaters.
  const send = (event: Event) => setState(transition(state, event));
  return (
    <section
      aria-label="AA 树插入修复实验"
      className="not-prose my-6 rounded-card border border-border bg-elevated p-3 sm:p-5"
    >
      <h3 className="text-lg font-semibold text-primary">
        AA 插入：挂叶子 → skew → split
      </h3>
      <p className="my-2 text-sm text-secondary">
        只实现 AA 集合插入，不实现删除，也不模拟本章其余六种结构。最多 7
        个节点。先插入 30，再逐步观察 split。
      </p>
      <div className="flex flex-wrap items-end gap-2">
        <label className="text-sm text-primary">
          待插入键
          <input
            aria-label="待插入键"
            className="ml-2 min-h-11 w-20 rounded-control border border-border bg-elevated px-2"
            inputMode="numeric"
            value={state.input}
            disabled={busy}
            onChange={(e) => send({ type: "input", value: e.target.value })}
          />
        </label>
        <button
          type="button"
          className={button}
          disabled={busy}
          onClick={() => send({ type: "insert" })}
        >
          插入
        </button>
        <button
          type="button"
          className={button}
          disabled={!busy}
          onClick={() => send({ type: "step" })}
        >
          下一步
        </button>
        <button
          type="button"
          className={button}
          disabled={busy}
          aria-pressed={state.omitSplit}
          onClick={() => send({ type: "fault" })}
        >
          跳过 split：{state.omitSplit ? "开" : "关"}
        </button>
        <button
          type="button"
          className={button}
          onClick={() => send({ type: "reset" })}
        >
          重置
        </button>
      </div>
      <AATreeFigure tree={current.tree} />
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="space-y-2 text-sm text-primary"
      >
        <p>
          {state.error ||
            `${state.cursor + 1}/${state.frames.length}：${current.operation}`}
        </p>
        <p>
          中序：{keys(current.tree).join(" → ")}；
          {problems.length
            ? busy
              ? "中间态尚待修复"
              : "完成态不合法"
            : "当前 AA 不变量通过"}
        </p>
        {problems.length > 0 && (
          <ul className="list-disc pl-5 text-danger">
            {problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>
      <p className="mt-3 text-sm text-secondary">
        故障不是红色装饰：关闭 split
        真会保留连续右水平边。关闭开关不会自动修复旧树；重置后再正常插入，才能作对照。
      </p>
    </section>
  );
}

/** Static auxiliary geometry; intentionally not a skip-list or kd-tree simulator. */
export function DsaAdvancedAuxiliaryFigures({ kind }: { kind: "skip" | "kd" }) {
  if (kind === "skip")
    return (
      <figure className="not-prose my-5">
        <svg
          viewBox="0 0 330 350"
          role="img"
          aria-label="确定性跳表：下层 10、20、30 间隙提升中间的 20，间隙由三变成一和一"
          className="mx-auto block h-auto w-full max-w-[430px]"
        >
          <title>{"确定性间隙修复：提升 20"}</title>
          <g fill={C.text} fontSize="17">
            <text x="15" y="28">
              提升前：上层边界 −∞ 与 +∞
            </text>
            <text x="15" y="172">
              提升后：拆成两个间隙
            </text>
          </g>
          {[65, 215].map((y) => (
            <g key={y}>
              <line
                x1="26"
                y1={y}
                x2="304"
                y2={y}
                stroke={C.muted}
                strokeWidth="2"
              />
              <line
                x1="26"
                y1={y + 62}
                x2="304"
                y2={y + 62}
                stroke={C.muted}
                strokeWidth="2"
              />
              {[90, 165, 240].map((x, i) => (
                <g key={x}>
                  <circle
                    cx={x}
                    cy={y + 62}
                    r="20"
                    fill={C.bg}
                    stroke={C.accent}
                  />
                  <text
                    x={x}
                    y={y + 68}
                    textAnchor="middle"
                    fontSize="17"
                    fill={C.text}
                  >
                    {(i + 1) * 10}
                  </text>
                </g>
              ))}
              <text x="7" y={y - 10} fontSize="16" fill={C.muted}>
                −∞
              </text>
              <text x="291" y={y - 10} fontSize="16" fill={C.muted}>
                +∞
              </text>
            </g>
          ))}
          <line
            x1="165"
            y1="236"
            x2="165"
            y2="257"
            stroke={C.accent}
            strokeWidth="2"
          />
          <circle
            cx="165"
            cy="215"
            r="20"
            fill={C.bg}
            stroke={C.accent}
            strokeWidth="2"
          />
          <text x="165" y="221" textAnchor="middle" fontSize="17" fill={C.text}>
            20
          </text>
          <text
            x="165"
            y="331"
            textAnchor="middle"
            fontSize="16"
            fill={C.muted}
          >
            实线是层链；竖线是提升关系
          </text>
        </svg>
        <figcaption className="text-sm text-secondary">
          概念层图，不是作者复制分隔键节点的内存布局，也不是随机晋升动画。两端为边界哨兵。
        </figcaption>
      </figure>
    );
  return (
    <figure className="not-prose my-5">
      <svg
        viewBox="0 0 330 350"
        role="img"
        aria-label="二维树空间分割：根 A 的 x=5 竖线，左子树 y=4 横线。闭查询框 x=1..4，y=3..7 命中 B 和 C，剪去右半平面"
        className="mx-auto block h-auto w-full max-w-[430px]"
      >
        <title>{"k-d 树范围查询与切分平面"}</title>
        <rect
          x="30"
          y="30"
          width="260"
          height="260"
          fill={C.bg}
          stroke={C.muted}
        />
        <line
          x1="160"
          y1="30"
          x2="160"
          y2="290"
          stroke={C.muted}
          strokeWidth="2"
        />
        <line
          x1="30"
          y1="186"
          x2="160"
          y2="186"
          stroke={C.muted}
          strokeWidth="2"
        />
        <rect
          x="56"
          y="108"
          width="78"
          height="104"
          fill="none"
          stroke={C.accent}
          strokeWidth="3"
          strokeDasharray="6 4"
        />
        {[
          [160, 160, "A"],
          [108, 186, "B"],
          [82, 134, "C"],
          [238, 212, "D"],
        ].map(([x, y, label]) => (
          <g key={label}>
            <circle cx={Number(x)} cy={Number(y)} r="6" fill={C.accent} />
            <text
              x={Number(x) + 9}
              y={Number(y) - 9}
              fontSize="17"
              fill={C.text}
            >
              {label}
            </text>
          </g>
        ))}
        <g fill={C.text} fontSize="16">
          <text x="164" y="22">
            x = 5
          </text>
          <text x="178" y="186">
            y = 4
          </text>
          <text x="15" y="309">
            0
          </text>
          <text x="270" y="309">
            10 x
          </text>
          <text x="7" y="39">
            y
          </text>
          <text x="165" y="338" textAnchor="middle">
            虚线框是查询区域 Q
          </text>
        </g>
      </svg>
      <figcaption className="text-sm text-secondary">
        固定例图：A=(5,5)，B=(3,4)，C=(2,6)，D=(8,3)。Q=[1,4]×[3,7]。这是空间边界图，不是运行中的查询动画；可运行查询见
        C++。
      </figcaption>
    </figure>
  );
}
