"use client";

import { useMemo, useState } from "react";

type BstNode = {
  key: string;
  left: BstNode | null;
  right: BstNode | null;
  size: number;
};

function nodeSize(node: BstNode | null) {
  return node?.size ?? 0;
}

function insert(node: BstNode | null, key: string): BstNode {
  if (node === null) return { key, left: null, right: null, size: 1 };
  if (key < node.key) node.left = insert(node.left, key);
  else if (key > node.key) node.right = insert(node.right, key);
  node.size = 1 + nodeSize(node.left) + nodeSize(node.right);
  return node;
}

function buildTree(keys: string[]) {
  let root: BstNode | null = null;
  for (const key of keys) root = insert(root, key);
  return root;
}

function cloneTree(node: BstNode | null): BstNode | null {
  if (node === null) return null;
  return {
    key: node.key,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
    size: node.size,
  };
}

function inorder(node: BstNode | null, output: string[] = []) {
  if (node === null) return output;
  inorder(node.left, output);
  output.push(node.key);
  inorder(node.right, output);
  return output;
}

function searchPath(root: BstNode | null, query: string) {
  const path: string[] = [];
  let current = root;
  while (current !== null) {
    path.push(current.key);
    if (query < current.key) current = current.left;
    else if (query > current.key) current = current.right;
    else break;
  }
  return path;
}

function findNode(root: BstNode | null, key: string) {
  let current = root;
  while (current !== null) {
    if (key < current.key) current = current.left;
    else if (key > current.key) current = current.right;
    else return current;
  }
  return null;
}

function treeHeight(node: BstNode | null): number {
  if (node === null) return -1;
  return 1 + Math.max(treeHeight(node.left), treeHeight(node.right));
}

function depthSum(node: BstNode | null, depth = 0): number {
  if (node === null) return 0;
  return depth + depthSum(node.left, depth + 1) + depthSum(node.right, depth + 1);
}

function minNode(node: BstNode) {
  let current = node;
  while (current.left !== null) current = current.left;
  return current;
}

function deleteMin(node: BstNode | null): BstNode | null {
  if (node === null) return null;
  if (node.left === null) return node.right;
  node.left = deleteMin(node.left);
  node.size = 1 + nodeSize(node.left) + nodeSize(node.right);
  return node;
}

function deleteKey(node: BstNode | null, key: string): BstNode | null {
  if (node === null) return null;
  if (key < node.key) node.left = deleteKey(node.left, key);
  else if (key > node.key) node.right = deleteKey(node.right, key);
  else {
    if (node.right === null) return node.left;
    if (node.left === null) return node.right;
    const old = node;
    const oldRight = node.right;
    const successor = minNode(oldRight);
    node = {
      key: successor.key,
      left: old.left,
      right: deleteMin(oldRight),
      size: 0,
    };
  }
  node.size = 1 + nodeSize(node.left) + nodeSize(node.right);
  return node;
}

function levelRows(root: BstNode | null, maxDepth = 4) {
  const rows: (BstNode | null)[][] = [];
  let current: (BstNode | null)[] = [root];
  for (let depth = 0; depth <= maxDepth; depth += 1) {
    rows.push(current);
    current = current.flatMap((node) => node ? [node.left, node.right] : [null, null]);
    if (current.every((node) => node === null)) break;
  }
  return rows;
}

function TreeView({
  root,
  highlighted = [],
  selected,
}: {
  root: BstNode | null;
  highlighted?: string[];
  selected?: string;
}) {
  const rows = levelRows(root);
  return (
    <div className="space-y-2">
      {rows.map((row, depth) => (
        <div
          key={depth}
          className="grid gap-1"
          style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
        >
          {row.map((node, index) => (
            <div
              key={index}
              className={
                "min-h-11 border p-2 text-center font-mono text-xs " +
                (node === null
                  ? "border-dashed border-border text-secondary"
                  : node.key === selected
                    ? "border-warning bg-warning/10 text-warning"
                    : highlighted.includes(node.key)
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border bg-background text-primary")
              }
            >
              {node ? (
                <>
                  <div>{node.key}</div>
                  <div className="text-[9px] text-secondary">n={node.size}</div>
                </>
              ) : "·"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const baseOrder = ["S", "E", "X", "A", "R", "C", "H", "M", "P", "L"];
const baseTree = buildTree(baseOrder);
const baseKeys = inorder(baseTree, []);

export function Algs4BstInvariantMap() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selectedKey = baseKeys[selectedIndex];
  const node = findNode(baseTree, selectedKey);
  const left = inorder(node?.left ?? null, []);
  const right = inorder(node?.right ?? null, []);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          selected node = {selectedKey}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={baseKeys.length - 1}
            value={selectedIndex}
            onChange={(event) => setSelectedIndex(Number(event.target.value))}
          />
        </label>
        <div className="mt-4"><TreeView root={baseTree} selected={selectedKey} /></div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-accent bg-accent/10 p-3 text-secondary">left keys<div className="font-mono text-accent">{left.join(" ") || "none"}</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-secondary">node size<div className="font-mono text-warning">{node?.size ?? 0}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">right keys<div className="font-mono text-success">{right.join(" ") || "none"}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每个node左subtree全小、右subtree全大，size等于左右sizes加1；local checks组合成全树certificate。
      </figcaption>
    </figure>
  );
}

export function Algs4BstSearchInsertLab() {
  const [count, setCount] = useState(6);
  const root = useMemo(() => buildTree(baseOrder.slice(0, count)), [count]);
  const key = baseOrder[Math.max(0, count - 1)];
  const previous = useMemo(() => buildTree(baseOrder.slice(0, Math.max(0, count - 1))), [count]);
  const path = count > 0 ? searchPath(previous, key) : [];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          inserted keys = {count}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max={baseOrder.length}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
          />
        </label>
        <div className="mt-4"><TreeView root={root} highlighted={path} selected={key} /></div>
        <div className="mt-3 border border-success bg-success/10 p-3 text-xs text-success">
          Search path for new key {key}: {path.join(" → ") || "empty tree"} → null link
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Put沿与get相同的comparison path，到null link创建node，再在return path重算subtree sizes。
      </figcaption>
    </figure>
  );
}

type ShapeMode = "balanced order" | "random order" | "sorted order";

const shapeOrders = {
  "balanced order": ["H", "D", "L", "B", "F", "J", "N", "A", "C", "E", "G", "I", "K", "M", "O"],
  "random order": ["H", "C", "M", "A", "F", "K", "O", "D", "B", "N", "J", "G", "E", "I", "L"],
  "sorted order": ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"],
} as const;

export function Algs4BstShapeAnalysisLab() {
  const [mode, setMode] = useState<ShapeMode>("random order");
  const root = useMemo(() => buildTree([...shapeOrders[mode]]), [mode]);
  const height = treeHeight(root);
  const averageDepth = depthSum(root) / nodeSize(root);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <select
          className="min-h-11 w-full border border-border bg-background px-3 text-sm text-primary"
          value={mode}
          onChange={(event) => setMode(event.target.value as ShapeMode)}
        >
          {(Object.keys(shapeOrders) as ShapeMode[]).map((candidate) => <option key={candidate}>{candidate}</option>)}
        </select>
        <div className="mt-4"><TreeView root={root} /></div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-border bg-background p-3 text-secondary">nodes<div className="font-mono text-primary">{nodeSize(root)}</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-secondary">height<div className="font-mono text-warning">{height}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">average depth<div className="font-mono text-success">{averageDepth.toFixed(2)}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一keys因插入顺序形成不同shape；普通BST没有机制阻止sorted input变成linear chain。
      </figcaption>
    </figure>
  );
}

export function Algs4BstFloorCeilingLab() {
  const [queryCode, setQueryCode] = useState("G".charCodeAt(0));
  const query = String.fromCharCode(queryCode);
  const floor = [...baseKeys].filter((key) => key <= query).at(-1) ?? "none";
  const ceiling = baseKeys.find((key) => key >= query) ?? "none";
  const path = searchPath(baseTree, query);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          query = {query}
          <input className="mt-2 w-full accent-current" type="range" min="65" max="90" value={queryCode} onChange={(event) => setQueryCode(Number(event.target.value))} />
        </label>
        <div className="mt-4"><TreeView root={baseTree} highlighted={path} /></div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="border border-accent bg-accent/10 p-3 text-secondary">floor<div className="font-mono text-accent">{floor}</div></div>
          <div className="border border-success bg-success/10 p-3 text-secondary">ceiling<div className="font-mono text-success">{ceiling}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        向右寻找floor时当前node成为candidate；右subtree无解才回退它，ceiling完全对称。
      </figcaption>
    </figure>
  );
}

export function Algs4BstRankSelectLab() {
  const [rank, setRank] = useState(4);
  const key = baseKeys[rank];
  const path = searchPath(baseTree, key);
  const node = findNode(baseTree, key);
  const leftSize = nodeSize(node?.left ?? null);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          select rank = {rank}
          <input className="mt-2 w-full accent-current" type="range" min="0" max={baseKeys.length - 1} value={rank} onChange={(event) => setRank(Number(event.target.value))} />
        </label>
        <div className="mt-4"><TreeView root={baseTree} highlighted={path} selected={key} /></div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
          <div className="border border-success bg-success/10 p-3 text-secondary">selected key<div className="font-mono text-success">{key}</div></div>
          <div className="border border-warning bg-warning/10 p-3 text-secondary">local left size<div className="font-mono text-warning">{leftSize}</div></div>
          <div className="border border-border bg-background p-3 text-secondary">inverse check<div className="font-mono text-primary">rank({key})={rank}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Subtree sizes让rank/select在一条path上跳过整棵subtree；`rank(select(i))=i` 是关键certificate。
      </figcaption>
    </figure>
  );
}

export function Algs4HibbardDeletionLab() {
  const [step, setStep] = useState(1);
  const target = "E";
  const targetNode = findNode(baseTree, target);
  const successor = targetNode?.right ? minNode(targetNode.right).key : "none";
  const deleted = useMemo(() => deleteKey(cloneTree(baseTree), target), []);
  const root = step < 3 ? baseTree : deleted;
  const highlighted = step === 1 ? [target] : step === 2 ? [target, successor] : [successor];
  const notes = [
    "locate target by BST search",
    "save target and identify successor",
    "detach min from old right subtree",
    "successor owns old left and repaired right",
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          delete({target}) Hibbard step = {step}
          <input className="mt-2 w-full accent-current" type="range" min="0" max="3" value={step} onChange={(event) => setStep(Number(event.target.value))} />
        </label>
        <div className="mt-4"><TreeView root={root} highlighted={highlighted} selected={step < 3 ? target : successor} /></div>
        <div className="mt-3 border border-warning bg-warning/10 p-3 font-mono text-xs text-warning">{notes[step]}; successor = {successor}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        两子节点删除用右subtree minimum替换target，再deleteMin并接回old left；所有受影响sizes都要重算。
      </figcaption>
    </figure>
  );
}

export function Algs4BstRangeTraversalLab() {
  const [loCode, setLoCode] = useState("C".charCodeAt(0));
  const [hiCode, setHiCode] = useState("R".charCodeAt(0));
  const lo = String.fromCharCode(Math.min(loCode, hiCode));
  const hi = String.fromCharCode(Math.max(loCode, hiCode));
  const included = baseKeys.filter((key) => key >= lo && key <= hi);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          range lo = {lo}
          <input className="mt-2 w-full accent-current" type="range" min="65" max="90" value={loCode} onChange={(event) => setLoCode(Number(event.target.value))} />
        </label>
        <label className="mt-4 block text-sm font-semibold text-primary">
          range hi = {hi}
          <input className="mt-2 w-full accent-current" type="range" min="65" max="90" value={hiCode} onChange={(event) => setHiCode(Number(event.target.value))} />
        </label>
        <div className="mt-4"><TreeView root={baseTree} highlighted={included} /></div>
        <div className="mt-3 border border-success bg-success/10 p-3 text-xs text-success">inorder output: {included.join(" ")}; count = {included.length}</div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Range inorder traversal跳过不可能命中的subtrees，并按ascending key顺序输出inclusive interval。
      </figcaption>
    </figure>
  );
}
