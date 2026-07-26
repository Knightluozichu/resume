"use client";

import { useMemo, useState } from "react";

const RED = true;
const BLACK = false;

type RbNode = {
  key: string;
  left: RbNode | null;
  right: RbNode | null;
  color: boolean;
  size: number;
};

function nodeSize(node: RbNode | null) {
  return node?.size ?? 0;
}

function isRed(node: RbNode | null | undefined) {
  return node?.color === RED;
}

function updateSize(node: RbNode) {
  node.size = 1 + nodeSize(node.left) + nodeSize(node.right);
  return node;
}

function rotateLeft(head: RbNode) {
  const next = head.right;
  if (next === null) return head;
  head.right = next.left;
  next.left = head;
  next.color = head.color;
  head.color = RED;
  next.size = head.size;
  updateSize(head);
  return next;
}

function rotateRight(head: RbNode) {
  const next = head.left;
  if (next === null) return head;
  head.left = next.right;
  next.right = head;
  next.color = head.color;
  head.color = RED;
  next.size = head.size;
  updateSize(head);
  return next;
}

function flipColors(head: RbNode) {
  head.color = !head.color;
  if (head.left !== null) head.left.color = !head.left.color;
  if (head.right !== null) head.right.color = !head.right.color;
}

function balance(head: RbNode) {
  let root = head;
  if (isRed(root.right) && !isRed(root.left)) root = rotateLeft(root);
  if (isRed(root.left) && isRed(root.left?.left)) root = rotateRight(root);
  if (isRed(root.left) && isRed(root.right)) flipColors(root);
  return updateSize(root);
}

function putNode(node: RbNode | null, key: string): RbNode {
  if (node === null) {
    return { key, left: null, right: null, color: RED, size: 1 };
  }
  if (key < node.key) node.left = putNode(node.left, key);
  else if (key > node.key) node.right = putNode(node.right, key);
  return balance(node);
}

function buildTree(keys: readonly string[]) {
  let root: RbNode | null = null;
  for (const key of keys) {
    root = putNode(root, key);
    root.color = BLACK;
  }
  return root;
}

function cloneTree(node: RbNode | null): RbNode | null {
  if (node === null) return null;
  return {
    key: node.key,
    left: cloneTree(node.left),
    right: cloneTree(node.right),
    color: node.color,
    size: node.size,
  };
}

function contains(node: RbNode | null, key: string) {
  let current = node;
  while (current !== null) {
    if (key < current.key) current = current.left;
    else if (key > current.key) current = current.right;
    else return true;
  }
  return false;
}

function minNode(node: RbNode) {
  let current = node;
  while (current.left !== null) current = current.left;
  return current;
}

function moveRedLeft(head: RbNode) {
  let root = head;
  flipColors(root);
  if (isRed(root.right?.left) && root.right !== null) {
    root.right = rotateRight(root.right);
    root = rotateLeft(root);
    flipColors(root);
  }
  return root;
}

function moveRedRight(head: RbNode) {
  let root = head;
  flipColors(root);
  if (isRed(root.left?.left)) {
    root = rotateRight(root);
    flipColors(root);
  }
  return root;
}

function deleteMinNode(head: RbNode): RbNode | null {
  let root = head;
  if (root.left === null) return null;
  if (!isRed(root.left) && !isRed(root.left.left)) root = moveRedLeft(root);
  if (root.left !== null) root.left = deleteMinNode(root.left);
  return balance(root);
}

function deleteNode(head: RbNode, key: string): RbNode | null {
  let root = head;
  if (key < root.key) {
    if (root.left !== null) {
      if (!isRed(root.left) && !isRed(root.left.left)) root = moveRedLeft(root);
      if (root.left !== null) root.left = deleteNode(root.left, key);
    }
  } else {
    if (isRed(root.left)) root = rotateRight(root);
    if (key === root.key && root.right === null) return null;
    if (root.right !== null) {
      if (!isRed(root.right) && !isRed(root.right.left)) root = moveRedRight(root);
      const right = root.right;
      if (right !== null) {
        if (key === root.key) {
          const successor = minNode(right);
          root.key = successor.key;
          root.right = deleteMinNode(right);
        } else {
          root.right = deleteNode(right, key);
        }
      }
    }
  }
  return balance(root);
}

function deleteKey(root: RbNode | null, key: string) {
  if (root === null || !contains(root, key)) return root;
  if (!isRed(root.left) && !isRed(root.right)) root.color = RED;
  const result = deleteNode(root, key);
  if (result !== null) result.color = BLACK;
  return result;
}

function treeHeight(node: RbNode | null): number {
  if (node === null) return -1;
  return 1 + Math.max(treeHeight(node.left), treeHeight(node.right));
}

function inorder(node: RbNode | null, output: string[] = []) {
  if (node === null) return output;
  inorder(node.left, output);
  output.push(node.key);
  inorder(node.right, output);
  return output;
}

function levelRows(root: RbNode | null, maxDepth = 4) {
  const rows: (RbNode | null)[][] = [];
  let current: (RbNode | null)[] = [root];
  for (let depth = 0; depth <= maxDepth; depth += 1) {
    rows.push(current);
    current = current.flatMap((node) => node ? [node.left, node.right] : [null, null]);
    if (current.every((node) => node === null)) break;
  }
  return rows;
}

function RedBlackTreeView({
  root,
  selected,
}: {
  root: RbNode | null;
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
                    : node.color === RED
                      ? "border-danger bg-danger/10 text-danger"
                      : "border-primary bg-background text-primary")
              }
            >
              {node ? (
                <>
                  <div>{node.key}</div>
                  <div className="text-[9px] text-secondary">
                    {node.color === RED ? "red link" : "black link"} · n={node.size}
                  </div>
                </>
              ) : "·"}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function TwoThreeNode({ keys, active = false }: { keys: string[]; active?: boolean }) {
  return (
    <div className={"inline-flex min-w-16 border p-1 " + (active ? "border-warning bg-warning/10" : "border-border bg-background")}>
      {keys.map((key) => (
        <span key={key} className="min-w-7 border-r border-border px-2 py-1 text-center font-mono text-xs text-primary last:border-r-0">
          {key}
        </span>
      ))}
    </div>
  );
}

const insertionStages = [
  { key: "S", levels: [[['S']]] },
  { key: "E", levels: [[['E', 'S']]] },
  { key: "A", levels: [[['E']], [['A'], ['S']]] },
  { key: "R", levels: [[['E']], [['A'], ['R', 'S']]] },
  { key: "C", levels: [[['E']], [['A', 'C'], ['R', 'S']]] },
  { key: "H", levels: [[['E', 'R']], [['A', 'C'], ['H'], ['S']]] },
  { key: "X", levels: [[['E', 'R']], [['A', 'C'], ['H'], ['S', 'X']]] },
  { key: "M", levels: [[['E', 'R']], [['A', 'C'], ['H', 'M'], ['S', 'X']]] },
] as const;

export function Algs4TwoThreeInsertionLab() {
  const [stageIndex, setStageIndex] = useState(5);
  const stage = insertionStages[stageIndex];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          inserted key = {stage.key} · step {stageIndex + 1}/{insertionStages.length}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={insertionStages.length - 1}
            value={stageIndex}
            onChange={(event) => setStageIndex(Number(event.target.value))}
          />
        </label>
        <div className="mt-5 space-y-4">
          {stage.levels.map((level, levelIndex) => (
            <div key={levelIndex} className="flex justify-around gap-3">
              {level.map((keys, nodeIndex) => (
                <TwoThreeNode
                  key={`${levelIndex}-${nodeIndex}`}
                  keys={[...keys]}
                  active={levelIndex === stage.levels.length - 1}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-accent bg-accent/10 p-3">2-node<div className="font-mono text-accent">1 key · 2 links</div></div>
          <div className="border border-warning bg-warning/10 p-3">3-node<div className="font-mono text-warning">2 keys · 3 links</div></div>
          <div className="border border-success bg-success/10 p-3">null depth<div className="font-mono text-success">always equal</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        新key只在bottom暂时扩成4-node，再把middle key向parent传递；所有null links仍保持同一depth。
      </figcaption>
    </figure>
  );
}

type EncodingMode = "2-node" | "3-node" | "temporary 4-node";

export function Algs4RedBlackEncodingMap() {
  const [mode, setMode] = useState<EncodingMode>("3-node");
  const keys = useMemo(
    () => mode === "2-node" ? ["M"] : mode === "3-node" ? ["E", "M"] : ["E", "M", "R"],
    [mode],
  );
  const root = useMemo<RbNode>(() => {
    if (mode === "2-node") {
      return { key: "M", color: BLACK, size: 1, left: null, right: null };
    }
    if (mode === "3-node") {
      return {
        key: "M", color: BLACK, size: 2, right: null,
        left: { key: "E", color: RED, size: 1, left: null, right: null },
      };
    }
    return {
      key: "M", color: BLACK, size: 3,
      left: { key: "E", color: RED, size: 1, left: null, right: null },
      right: { key: "R", color: RED, size: 1, left: null, right: null },
    };
  }, [mode]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="encoding mode">
          {(["2-node", "3-node", "temporary 4-node"] as EncodingMode[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={"min-h-11 border-r border-border px-2 py-2 text-xs last:border-r-0 " + (mode === option ? "bg-primary text-background" : "bg-background text-secondary")}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1.5fr] md:items-center">
          <div className="text-center">
            <div className="mb-2 text-xs uppercase text-secondary">2-3 representation</div>
            <TwoThreeNode keys={keys} active />
          </div>
          <div>
            <div className="mb-2 text-center text-xs uppercase text-secondary">left-leaning red-black encoding</div>
            <RedBlackTreeView root={root} />
          </div>
        </div>
        <div className="mt-4 border border-border bg-background p-3 text-xs text-secondary">
          {mode === "2-node" && "A black-linked BST node represents one 2-node."}
          {mode === "3-node" && "The smaller key is connected to the larger key by one left-leaning red link."}
          {mode === "temporary 4-node" && "Two red children encode a temporary 4-node; flipColors passes its middle key upward."}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Color属于parent link而非node自身；root与null links按约定为black。
      </figcaption>
    </figure>
  );
}

type RepairMode = "rotate left" | "rotate right" | "flip colors";

function repairExample(mode: RepairMode, after: boolean) {
  if (mode === "rotate left") {
    const head: RbNode = {
      key: "E", color: BLACK, size: 2, left: null,
      right: { key: "M", color: RED, size: 1, left: null, right: null },
    };
    return after ? rotateLeft(head) : head;
  }
  if (mode === "rotate right") {
    const head: RbNode = {
      key: "R", color: BLACK, size: 3, right: null,
      left: {
        key: "M", color: RED, size: 2, right: null,
        left: { key: "E", color: RED, size: 1, left: null, right: null },
      },
    };
    return after ? rotateRight(head) : head;
  }
  const head: RbNode = {
    key: "M", color: BLACK, size: 3,
    left: { key: "E", color: RED, size: 1, left: null, right: null },
    right: { key: "R", color: RED, size: 1, left: null, right: null },
  };
  if (after) flipColors(head);
  return head;
}

export function Algs4RedBlackRepairLab() {
  const [mode, setMode] = useState<RepairMode>("rotate left");
  const before = repairExample(mode, false);
  const after = repairExample(mode, true);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="repair operation">
          {(["rotate left", "rotate right", "flip colors"] as RepairMode[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={"min-h-11 border-r border-border px-2 py-2 text-xs last:border-r-0 " + (mode === option ? "bg-primary text-background" : "bg-background text-secondary")}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <div className="mb-2 text-center text-xs font-semibold text-danger">temporary violation</div>
            <RedBlackTreeView root={before} />
          </div>
          <div>
            <div className="mb-2 text-center text-xs font-semibold text-success">local repair</div>
            <RedBlackTreeView root={after} />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-accent p-3">symmetric order<div className="font-mono text-accent">preserved</div></div>
          <div className="border border-warning p-3">black height<div className="font-mono text-warning">preserved</div></div>
          <div className="border border-success p-3">links changed<div className="font-mono text-success">constant</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Rotation改变root与link方向但不改变inorder；color flip把temporary 4-node的middle key向上递交。
      </figcaption>
    </figure>
  );
}

type OrderMode = "book order" | "ascending" | "descending";

const orderKeys = {
  "book order": ["S", "E", "A", "R", "C", "H", "X", "M", "P", "L"],
  ascending: ["A", "C", "E", "H", "L", "M", "P", "R", "S", "X"],
  descending: ["X", "S", "R", "P", "M", "L", "H", "E", "C", "A"],
} as const;

type PlainNode = { key: string; left: PlainNode | null; right: PlainNode | null };

function plainInsert(node: PlainNode | null, key: string): PlainNode {
  if (node === null) return { key, left: null, right: null };
  if (key < node.key) node.left = plainInsert(node.left, key);
  else if (key > node.key) node.right = plainInsert(node.right, key);
  return node;
}

function plainHeight(node: PlainNode | null): number {
  if (node === null) return -1;
  return 1 + Math.max(plainHeight(node.left), plainHeight(node.right));
}

function ordinaryBstHeight(keys: readonly string[]) {
  let root: PlainNode | null = null;
  for (const key of keys) root = plainInsert(root, key);
  return plainHeight(root);
}

export function Algs4RedBlackInsertionLab() {
  const [mode, setMode] = useState<OrderMode>("ascending");
  const [count, setCount] = useState(8);
  const keys = orderKeys[mode].slice(0, count);
  const root = useMemo(() => buildTree(keys), [keys]);
  const bound = Math.ceil(2 * Math.log2(Math.max(1, count)));

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-3 border border-border" role="group" aria-label="insertion order">
          {(["book order", "ascending", "descending"] as OrderMode[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={"min-h-11 border-r border-border px-2 py-2 text-xs last:border-r-0 " + (mode === option ? "bg-primary text-background" : "bg-background text-secondary")}
            >
              {option}
            </button>
          ))}
        </div>
        <label className="mt-4 block text-sm font-semibold text-primary">
          prefix size = {count} · inserted {keys.join(" ")}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="1"
            max={orderKeys[mode].length}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
          />
        </label>
        <div className="mt-5"><RedBlackTreeView root={root} selected={keys.at(-1)} /></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-secondary">
          <div className="border border-danger bg-danger/10 p-3">ordinary BST h<div className="font-mono text-danger">{ordinaryBstHeight(keys)}</div></div>
          <div className="border border-success bg-success/10 p-3">red-black h<div className="font-mono text-success">{treeHeight(root)}</div></div>
          <div className="border border-accent bg-accent/10 p-3">2 ceil(lg N)<div className="font-mono text-accent">{bound}</div></div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        每层return依次修right-red、two-left-red与temporary 4-node，最后强制root black；sorted input也不再退化。
      </figcaption>
    </figure>
  );
}

function collectBlackPaths(node: RbNode | null, black = 0, path: string[] = [], output: { path: string; black: number }[] = []) {
  if (node === null) {
    output.push({ path: [...path, "null"].join(" → "), black });
    return output;
  }
  const nextBlack = black + (node.color === BLACK ? 1 : 0);
  collectBlackPaths(node.left, nextBlack, [...path, node.key], output);
  collectBlackPaths(node.right, nextBlack, [...path, node.key], output);
  return output;
}

export function Algs4BlackHeightCertificateLab() {
  const [count, setCount] = useState(8);
  const root = useMemo(() => buildTree(orderKeys["book order"].slice(0, count)), [count]);
  const paths = collectBlackPaths(root);
  const blackCounts = [...new Set(paths.map((path) => path.black))];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          tree size = {count} · black-height certificate = {blackCounts.join(", ")}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="3"
            max={orderKeys["book order"].length}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
          />
        </label>
        <div className="mt-4"><RedBlackTreeView root={root} /></div>
        <div className="mt-4 max-h-48 overflow-auto border border-border bg-background">
          {paths.map((path, index) => (
            <div key={index} className="grid grid-cols-[1fr_5rem] border-b border-border px-3 py-2 text-xs last:border-b-0">
              <span className="truncate font-mono text-secondary">{path.path}</span>
              <span className="text-right font-mono text-success">black={path.black}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        Collapse每条left-red link后得到perfectly balanced 2-3 tree；因此所有root-to-null paths拥有相同black count。
      </figcaption>
    </figure>
  );
}

const borrowStages = [
  { title: "target is a 2-node", parent: ["M"], children: [["C"], ["R", "T"]], active: 0 },
  { title: "move parent key down", parent: ["R"], children: [["C", "M"], ["T"]], active: 0 },
  { title: "remove minimum C", parent: ["R"], children: [["M"], ["T"]], active: 0 },
  { title: "return and balance", parent: ["R"], children: [["M"], ["T"]], active: -1 },
] as const;

export function Algs4MoveRedLeftLab() {
  const [step, setStep] = useState(0);
  const stage = borrowStages[step];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          moveRedLeft · {stage.title}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={borrowStages.length - 1}
            value={step}
            onChange={(event) => setStep(Number(event.target.value))}
          />
        </label>
        <div className="mt-5 text-center"><TwoThreeNode keys={[...stage.parent]} /></div>
        <div className="mt-6 flex justify-around gap-4">
          {stage.children.map((keys, index) => (
            <TwoThreeNode key={index} keys={[...keys]} active={index === stage.active} />
          ))}
        </div>
        <div className="mt-4 border border-warning bg-warning/10 p-3 text-xs text-secondary">
          Descent invariant: current node is not a 2-node, so the bottom key can be removed without creating an empty node.
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        删除在下降前先borrow或merge；LLRB用flipColors与rotations实现同一2-3 transformation。
      </figcaption>
    </figure>
  );
}

const deletionKeys = ["A", "C", "E", "H", "L", "M", "P", "R", "S", "X"];

export function Algs4RedBlackDeletionLab() {
  const [keyIndex, setKeyIndex] = useState(4);
  const selected = deletionKeys[keyIndex];
  const before = useMemo(() => buildTree(orderKeys["book order"]), []);
  const after = useMemo(() => deleteKey(cloneTree(before), selected), [before, selected]);

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <label className="text-sm font-semibold text-primary">
          delete key = {selected}
          <input
            className="mt-2 w-full accent-current"
            type="range"
            min="0"
            max={deletionKeys.length - 1}
            value={keyIndex}
            onChange={(event) => setKeyIndex(Number(event.target.value))}
          />
        </label>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 text-center text-xs font-semibold text-warning">before</div>
            <RedBlackTreeView root={before} selected={selected} />
          </div>
          <div>
            <div className="mb-2 text-center text-xs font-semibold text-success">after top-down delete</div>
            <RedBlackTreeView root={after} />
          </div>
        </div>
        <div className="mt-4 border border-success bg-success/10 p-3 font-mono text-xs text-success">
          inorder = {inorder(after, []).join(" ")} · size = {nodeSize(after)} · h = {treeHeight(after)}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        下降时保证目标side不是2-node，命中后按BST successor规则替换；return path统一调用balance并更新size。
      </figcaption>
    </figure>
  );
}

type FaultMode = "valid" | "right red" | "double red" | "stale size";

function isBst(node: RbNode | null, min: string | null = null, max: string | null = null): boolean {
  if (node === null) return true;
  if (min !== null && node.key <= min) return false;
  if (max !== null && node.key >= max) return false;
  return isBst(node.left, min, node.key) && isBst(node.right, node.key, max);
}

function is23(node: RbNode | null, root: RbNode | null): boolean {
  if (node === null) return true;
  if (isRed(node.right)) return false;
  if (node !== root && isRed(node) && isRed(node.left)) return false;
  return is23(node.left, root) && is23(node.right, root);
}

function expectedBlackHeight(node: RbNode | null) {
  let black = 0;
  let current = node;
  while (current !== null) {
    if (!isRed(current)) black += 1;
    current = current.left;
  }
  return black;
}

function isBalanced(node: RbNode | null, remaining: number): boolean {
  if (node === null) return remaining === 0;
  const next = remaining - (isRed(node) ? 0 : 1);
  return isBalanced(node.left, next) && isBalanced(node.right, next);
}

function sizesConsistent(node: RbNode | null): boolean {
  if (node === null) return true;
  if (node.size !== 1 + nodeSize(node.left) + nodeSize(node.right)) return false;
  return sizesConsistent(node.left) && sizesConsistent(node.right);
}

function withFault(mode: FaultMode) {
  const root = cloneTree(buildTree(orderKeys["book order"]));
  if (root === null) return root;
  if (mode === "right red") {
    if (root.right !== null) root.right.color = RED;
  } else if (mode === "double red") {
    if (root.left !== null) {
      root.left.color = RED;
      if (root.left.left !== null) root.left.left.color = RED;
    }
  } else if (mode === "stale size") {
    root.size += 2;
  }
  return root;
}

function Certificate({ label, pass }: { label: string; pass: boolean }) {
  return (
    <div className={"border p-3 text-xs " + (pass ? "border-success bg-success/10 text-success" : "border-danger bg-danger/10 text-danger")}>
      {label}<div className="mt-1 font-mono">{pass ? "PASS" : "FAIL"}</div>
    </div>
  );
}

export function Algs4RedBlackCertificateLab() {
  const [mode, setMode] = useState<FaultMode>("valid");
  const root = useMemo(() => withFault(mode), [mode]);
  const certificates = [
    { label: "symmetric order", pass: isBst(root) },
    { label: "left-red / no double-red", pass: is23(root, root) },
    { label: "equal black height", pass: isBalanced(root, expectedBlackHeight(root)) },
    { label: "subtree sizes", pass: sizesConsistent(root) },
  ];

  return (
    <figure className="mdx-figure not-prose mx-auto my-6">
      <div className="border border-border bg-elevated p-4 sm:p-5">
        <div className="grid grid-cols-2 border border-border sm:grid-cols-4" role="group" aria-label="certificate fault">
          {(["valid", "right red", "double red", "stale size"] as FaultMode[]).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setMode(option)}
              className={"min-h-11 border-b border-r border-border px-2 py-2 text-xs sm:border-b-0 last:border-r-0 " + (mode === option ? "bg-primary text-background" : "bg-background text-secondary")}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-5"><RedBlackTreeView root={root} /></div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {certificates.map((certificate) => (
            <Certificate key={certificate.label} {...certificate} />
          ))}
        </div>
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        可靠certificate必须把BST order、2-3 encoding、black balance与metadata分开检查；任一项不能替代其余项。
      </figcaption>
    </figure>
  );
}
