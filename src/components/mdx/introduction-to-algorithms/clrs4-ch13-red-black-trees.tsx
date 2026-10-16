"use client";

import { useRef, useState } from "react";

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

type MarkTone = "accent" | "warning" | "danger" | "success";

type RBNode = {
  key: number;
  color: "R" | "B";
  mark?: { label: string; tone: MarkTone };
  left?: RBNode;
  right?: RBNode;
};

type Snapshot = {
  tree: RBNode;
  note: string;
  claim: string;
  showBh?: boolean;
  pathNote?: string;
  spin?: { pivot: number; dir: "L" | "R" };
};

type Scenario = {
  key: string;
  title: string;
  field: string;
  steps: readonly TeachingStep[];
  snapshots: readonly Snapshot[];
  failure?: { title: string; desc: string };
};

const NIL = undefined;

function n(
  key: number,
  color: "R" | "B",
  mark?: RBNode["mark"],
  left?: RBNode,
  right?: RBNode,
): RBNode {
  return { key, color, mark, left, right };
}

/* 有效红黑树底图：bh(11)=3，每条到 NIL 的路径黑数均为 3。 */
const PROPS_TREE: RBNode = n(
  11,
  "B",
  undefined,
  n(2, "B", undefined, n(1, "B"), n(7, "R")),
  n(14, "B", undefined, n(13, "B"), n(15, "B")),
);

const FAULT_TREE: RBNode = n(
  11,
  "B",
  undefined,
  n(2, "B", undefined, n(1, "B"), n(7, "R")),
  n(
    14,
    "R",
    { label: "违例", tone: "danger" },
    n(13, "B"),
    n(15, "B", { label: "红孩子", tone: "danger" }),
  ),
);

const SCENARIOS: Record<string, Scenario> = {
  props: {
    key: "props",
    title: "五条性质与黑高",
    field: "每条 root→NIL 路径黑数相等 ⇒ h ≤ 2 lg(n+1)",
    steps: [
      { label: "color", caption: "每个节点非红即黑，颜色不改 BST 搜索顺序" },
      { label: "root", caption: "root 必须为黑" },
      { label: "nil", caption: "每个缺失孩子是黑 NIL 哨兵，参与计数" },
      { label: "red", caption: "红节点的两个孩子必须全黑" },
      { label: "bh", caption: "任意节点到后代 NIL 的黑数相等——黑高" },
      { label: "bound", caption: "最长路径不超过最短全黑路径的两倍" },
    ],
    snapshots: [
      {
        tree: PROPS_TREE,
        note: "颜色只是限制形状的标记：中序序列仍是 1,2,7,11,13,14,15，search 与普通 BST 完全一致。",
        claim: "性质 1",
      },
      {
        tree: n(
          11,
          "B",
          { label: "root", tone: "accent" },
          n(2, "B", undefined, n(1, "B"), n(7, "R")),
          n(14, "B", undefined, n(13, "B"), n(15, "B")),
        ),
        note: "root 若染红，性质 2 立即违例；插入修复收尾时总要补一次 root 染黑。",
        claim: "性质 2",
      },
      {
        tree: PROPS_TREE,
        note: "NIL 不是“空指针什么都没有”：它是一个可共享的黑哨兵，fixup 可以安全读取它的 color。",
        claim: "性质 3",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            undefined,
            n(1, "B"),
            n(7, "R", { label: "红", tone: "accent" }),
          ),
          n(14, "B", undefined, n(13, "B"), n(15, "B")),
        ),
        note: "红节点的孩子必须全黑：两个红节点相邻时，修复循环才有工作要做。",
        claim: "性质 4",
      },
      {
        tree: PROPS_TREE,
        note: "黑高是从节点到 NIL 路径上的黑节点数（不含节点自身）。11 的 bh=3，它的每个子孙也都左右相等。",
        claim: "性质 5",
        showBh: true,
        pathNote:
          "11→2→1→NIL：黑 3 · 11→2→7→NIL：黑 3 · 11→14→13→NIL：黑 3 · 11→14→15→NIL：黑 3",
      },
      {
        tree: PROPS_TREE,
        note: "红节点不连红 ⇒ 任一路径至少一半节点为黑 ⇒ h ≤ 2·bh(root) ≤ 2 lg(n+1)，查询保持对数。",
        claim: "h ≤ 2 lg(n+1)",
        showBh: true,
      },
    ],
  },
  "uncle-red": {
    key: "uncle-red",
    title: "插入 · 叔红上移",
    field: "uncle 为红时旋转无解，只能把冲突上移两层",
    steps: [
      { label: "bst", caption: "普通 BST 插入新叶 1 并染红" },
      {
        label: "detect",
        caption: "发现 red-red：z=1，parent=3，grandparent=7",
      },
      {
        label: "recolor",
        caption: "parent 与 uncle 染黑，grandparent 染红，z 上移",
      },
      { label: "root", caption: "z 到达 root，循环结束并染黑" },
    ],
    snapshots: [
      {
        tree: n(
          7,
          "B",
          undefined,
          n(3, "R", undefined, n(1, "R", { label: "z", tone: "accent" })),
          n(10, "R"),
        ),
        note: "新叶染红：黑高不变，只可能违反“root 黑”或“红不连红”。若染黑，经过 1 的路径黑数立刻 +1。",
        claim: "黑高暂不变",
      },
      {
        tree: n(
          7,
          "B",
          { label: "g", tone: "warning" },
          n(
            3,
            "R",
            { label: "p", tone: "accent" },
            n(1, "R", { label: "z", tone: "accent" }),
          ),
          n(10, "R", { label: "u", tone: "warning" }),
        ),
        note: "uncle=10 也是红：无论左旋右旋都无法摆脱两个红节点，只能靠换色把冲突上交。",
        claim: "case 1 · 叔红",
      },
      {
        tree: n(
          7,
          "R",
          { label: "z↑", tone: "accent" },
          n(3, "B", undefined, n(1, "R")),
          n(10, "B"),
        ),
        note: "3、10 变黑各 +1，7 变红 −1：经过 z 一侧的每条路径黑数仍相等，冲突上移到 root。",
        claim: "冲突上移两层",
      },
      {
        tree: n(7, "B", undefined, n(3, "B", undefined, n(1, "R")), n(10, "B")),
        note: "z 已是 root，循环结束；root 染黑覆盖“违例升到 root”的情况。本场景旋转 0 次。",
        claim: "rotations = 0",
      },
    ],
  },
  line: {
    key: "line",
    title: "插入 · 直线旋转",
    field: "uncle 黑且 z、p、g 成直线：换色 + 一次旋转终结",
    steps: [
      { label: "bst", caption: "BST 插入 8，作为 7 的右孩子并染红" },
      { label: "detect", caption: "red-red：uncle=1 黑，z/p/g 成右-右直线" },
      { label: "recolor", caption: "parent 7 染黑、grandparent 2 染红" },
      { label: "rotate", caption: "对 grandparent 2 左旋，中序序列不变" },
      { label: "done", caption: "局部冲突消除，root 11 保持黑色" },
    ],
    snapshots: [
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            undefined,
            n(1, "B"),
            n(
              7,
              "R",
              undefined,
              NIL,
              n(8, "R", { label: "z", tone: "accent" }),
            ),
          ),
          n(14, "B", undefined, n(13, "B"), n(15, "B")),
        ),
        note: "8 落在 7 的右孩子位置。染红保证黑高不变——此刻 8 是红、parent 7 也是红。",
        claim: "黑高暂不变",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            { label: "g", tone: "warning" },
            n(1, "B", { label: "u", tone: "warning" }),
            n(
              7,
              "R",
              { label: "p", tone: "accent" },
              undefined,
              n(8, "R", { label: "z", tone: "accent" }),
            ),
          ),
          n(14, "B"),
        ),
        note: "z 是 parent 的右孩子、parent 是 grandparent 的右孩子：右-右直线，直接换色旋转。",
        claim: "case 3 · 直线",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "R",
            { label: "g", tone: "warning" },
            n(1, "B"),
            n(
              7,
              "B",
              { label: "p", tone: "accent" },
              undefined,
              n(8, "R", { label: "z", tone: "accent" }),
            ),
          ),
          n(14, "B"),
        ),
        note: "7 变黑、2 变红：7 子树整体黑数 +1，恰好补上 z 带来的红节点，各路径黑数仍相等。",
        claim: "换色不改黑高",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            7,
            "B",
            { label: "p↑", tone: "accent" },
            n(2, "R", undefined, n(1, "B")),
            n(8, "R"),
          ),
          n(14, "B", undefined, n(13, "B"), n(15, "B")),
        ),
        spin: { pivot: 2, dir: "L" },
        note: "左旋 pivot=2：中序序列 1,2,7,8 不变，只有指针 O(1) 改写；2 的旧右子树（NIL）移交 2.right。",
        claim: "Θ(1) 旋转",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(7, "B", undefined, n(2, "R", undefined, n(1, "B")), n(8, "R")),
          n(14, "B", undefined, n(13, "B"), n(15, "B")),
        ),
        note: "8 的 parent 现在是黑的 7，red-red 消除；root 11 从未变红。插入修复至多 2 次旋转。",
        claim: "rotations ≤ 2",
      },
    ],
  },
  triangle: {
    key: "triangle",
    title: "插入 · 三角转直线",
    field: "uncle 黑且 z、p、g 成三角：先旋转成直线再复用直线修复",
    steps: [
      { label: "bst", caption: "BST 插入 6，作为 7 的左孩子并染红" },
      { label: "detect", caption: "red-red：uncle=1 黑，z/p/g 成左-右三角" },
      { label: "convert", caption: "对 parent 7 右旋，z 上移到 7 的位置" },
      { label: "fix", caption: "按直线情形换色，再对 grandparent 2 左旋" },
      { label: "done", caption: "局部冲突消除，结构恢复合法" },
    ],
    snapshots: [
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            undefined,
            n(1, "B"),
            n(7, "R", undefined, n(6, "R", { label: "z", tone: "accent" })),
          ),
          n(14, "B", undefined, n(13, "B"), n(15, "B")),
        ),
        note: "6 落在 7 的左孩子位置。它和 parent 7 同为红，触发修复循环。",
        claim: "黑高暂不变",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            { label: "g", tone: "warning" },
            n(1, "B", { label: "u", tone: "warning" }),
            n(
              7,
              "R",
              { label: "p", tone: "accent" },
              n(6, "R", { label: "z", tone: "accent" }),
            ),
          ),
          n(14, "B"),
        ),
        note: "z 是 parent 的左孩子、parent 是 grandparent 的右孩子：左-右三角，直线旋转够不着 z。",
        claim: "case 2 · 三角",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            { label: "g", tone: "warning" },
            n(1, "B"),
            n(
              6,
              "R",
              { label: "z↑", tone: "accent" },
              undefined,
              n(7, "R", { label: "p↓", tone: "secondary" as MarkTone }),
            ),
          ),
          n(14, "B"),
        ),
        spin: { pivot: 7, dir: "R" },
        note: "右旋 pivot=7：z=6 上提，7 降为右孩子，三角变成右-右直线。只改形状，颜色与黑高都不动。",
        claim: "三角 → 直线",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            6,
            "B",
            { label: "p↑", tone: "accent" },
            n(2, "R", undefined, n(1, "B")),
            n(7, "R"),
          ),
          n(14, "B", undefined, n(13, "B"), n(15, "B")),
        ),
        spin: { pivot: 2, dir: "L" },
        note: "6 染黑、2 染红，再对 grandparent 2 左旋——与直线情形完全同构。",
        claim: "复用直线修复",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(6, "B", undefined, n(2, "R", undefined, n(1, "B")), n(7, "R")),
          n(14, "B", undefined, n(13, "B"), n(15, "B")),
        ),
        note: "三角情形共 2 次旋转：先转换成直线，再终结。总比逐层上移快。",
        claim: "rotations ≤ 2",
      },
    ],
  },
  case1: {
    key: "case1",
    title: "删除 · 兄弟为红先转换",
    field: "w 红 ⇒ parent 必黑：换色 + 左旋转成黑兄弟情形",
    steps: [
      { label: "bst", caption: "BST 删除黑叶 1，x=NIL 携带额外黑色" },
      { label: "case1", caption: "w=7 为红：交换颜色，对 parent 2 左旋" },
      { label: "case2", caption: "新兄弟全黑：亏空上移到 parent=2" },
      { label: "absorb", caption: "x=2 是红节点，吸收额外黑色后结束" },
    ],
    snapshots: [
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            undefined,
            {
              key: -1,
              color: "B",
              mark: { label: "x+", tone: "danger" },
            } as RBNode,
            n(7, "R", { label: "w", tone: "accent" }),
          ),
          n(14, "B", undefined, n(13, "B"), n(15, "B")),
        ),
        note: "删掉的是黑节点 1：经过 x 所在 NIL 的路径少了一个黑节点，x 携带“额外黑色”等待修复。",
        claim: "x 携带额外黑色",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            7,
            "B",
            { label: "w↑", tone: "accent" },
            n(2, "R", undefined, {
              key: -1,
              color: "B",
              mark: { label: "x+", tone: "danger" },
            } as RBNode),
            n(-2, "B"),
          ),
          n(14, "B"),
        ),
        spin: { pivot: 2, dir: "L" },
        note: "w=7 与 parent=2 交换颜色（7→黑、2→红）后左旋：x 的兄弟变成黑色节点，归约为黑兄弟情形。",
        claim: "转为黑兄弟",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            7,
            "B",
            undefined,
            n(2, "R", { label: "x++", tone: "danger" }, n(-1, "B")),
            n(-2, "B"),
          ),
          n(14, "B"),
        ),
        note: "新兄弟（2 的右 NIL）两个孩子全黑：把它染红，额外黑色从 x 上移到 parent=2，2 成为“双黑”节点。",
        claim: "亏空上移",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(7, "B", undefined, n(2, "B"), n(-2, "B")),
          n(14, "B", undefined, n(13, "B"), n(15, "B")),
        ),
        note: "x=2 本身是红节点：循环终止时让它吸收额外黑色（染黑）即可，经过它的路径黑数复原。",
        claim: "黑高复原",
      },
    ],
  },
  case2: {
    key: "case2",
    title: "删除 · 兄弟孩子全黑上移",
    field: "w 黑且两个孩子全黑 ⇒ w 染红，亏空沿祖先链上移",
    steps: [
      { label: "bst", caption: "BST 删除黑叶 1，x=NIL 携带额外黑色" },
      { label: "up1", caption: "w=7 全黑 ⇒ 染红，亏空上移到 2（双黑）" },
      { label: "up2", caption: "新 w=14 全黑 ⇒ 染红，亏空上移到 11" },
      { label: "root", caption: "x 到达 root：root 吸收额外黑色，结束" },
    ],
    snapshots: [
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            undefined,
            {
              key: -1,
              color: "B",
              mark: { label: "x+", tone: "danger" },
            } as RBNode,
            n(7, "B", { label: "w", tone: "accent" }),
          ),
          n(14, "B", undefined, n(13, "B"), n(15, "B")),
        ),
        note: "删掉黑叶 1 后，x=NIL 在 2 的左孩子位置，兄弟 w=7 为黑。",
        claim: "x 携带额外黑色",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            { label: "x++", tone: "danger" },
            n(-1, "B"),
            n(7, "R", { label: "w", tone: "accent" }),
          ),
          n(14, "B"),
        ),
        note: "w=7 染红：它自己所在路径黑数 −1，与亏空抵消；额外黑色上移到 2，2 成为双黑节点。",
        claim: "亏空上移一层",
      },
      {
        tree: n(
          11,
          "B",
          { label: "x++", tone: "danger" },
          n(2, "B", undefined, n(-1, "B"), n(7, "R")),
          n(14, "R", { label: "w", tone: "accent" }, n(13, "B"), n(15, "B")),
        ),
        note: "对双黑的 2 继续：新兄弟 w=14 也是黑且孩子全黑，同样染红上移。亏空一路上移到 root。",
        claim: "继续上移",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(2, "B", undefined, n(-1, "B"), n(7, "R")),
          n(14, "R", undefined, n(13, "B"), n(15, "B")),
        ),
        note: "x=root 时直接结束：root 天然吸收额外黑色（它保持黑色）。此情形旋转 0 次，recolor O(lg n) 次。",
        claim: "rotations = 0",
      },
    ],
  },
  case3: {
    key: "case3",
    title: "删除 · 近侄为红先转换",
    field: "w 黑、近侄红、远侄黑 ⇒ 换色 + 右旋转成 case 4",
    steps: [
      { label: "bst", caption: "BST 删除黑叶 1，x=NIL，w=7 黑" },
      { label: "case3", caption: "近侄 5 红、远侄 8 黑：5↔7 换色，右旋 7" },
      { label: "case4", caption: "归约为 case 4：换色后对 parent 2 左旋" },
      { label: "done", caption: "额外黑色消除，各路径黑高复原" },
    ],
    snapshots: [
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            undefined,
            {
              key: -1,
              color: "B",
              mark: { label: "x+", tone: "danger" },
            } as RBNode,
            n(
              7,
              "B",
              { label: "w", tone: "accent" },
              n(5, "R", { label: "近", tone: "warning" }),
              n(8, "B", { label: "远", tone: "secondary" as MarkTone }),
            ),
          ),
          n(
            14,
            "B",
            undefined,
            n(13, "B", undefined, NIL, n(12, "R")),
            n(15, "B", undefined, NIL, n(16, "R")),
          ),
        ),
        note: "删掉黑叶 1，x=NIL；w=7 黑，近侄 5 红、远侄 8 黑——case 3 的精确形状。",
        claim: "x 携带额外黑色",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            undefined,
            n(-1, "B", { label: "x+", tone: "danger" }),
            n(
              5,
              "B",
              { label: "w↑", tone: "accent" },
              undefined,
              n(7, "R", undefined, undefined, n(8, "B")),
            ),
          ),
          n(14, "B"),
        ),
        spin: { pivot: 7, dir: "R" },
        note: "5 与 7 交换颜色（5→黑、7→红）后右旋 7：红节点转到远侧，问题变成 case 4。",
        claim: "近红先转换",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            5,
            "B",
            { label: "w↑", tone: "accent" },
            n(2, "B", undefined, n(-1, "B")),
            n(7, "B", undefined, undefined, n(8, "B")),
          ),
          n(
            14,
            "B",
            undefined,
            n(13, "B", undefined, NIL, n(12, "R")),
            n(15, "B", undefined, NIL, n(16, "R")),
          ),
        ),
        spin: { pivot: 2, dir: "L" },
        note: "w=5 取 parent 颜色（黑）、parent=2 与远侄 7 染黑，再左旋 2：x 的亏空由 5 的黑补上。",
        claim: "归约到 case 4",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            5,
            "B",
            undefined,
            n(2, "B", undefined, n(-1, "B")),
            n(7, "B", undefined, undefined, n(8, "B")),
          ),
          n(
            14,
            "B",
            undefined,
            n(13, "B", undefined, NIL, n(12, "R")),
            n(15, "B", undefined, NIL, n(16, "R")),
          ),
        ),
        note: "修复结束：2 子树的黑高与修复前一致，x 额外黑色被 5 的黑色吸收。共 2 次旋转。",
        claim: "黑高复原",
      },
    ],
  },
  case4: {
    key: "case4",
    title: "删除 · 远侄为红直接终结",
    field: "w 黑、远侄红 ⇒ 换色 + 左旋一次消除亏空",
    steps: [
      { label: "bst", caption: "BST 删除黑叶 1，x=NIL，w=7 黑" },
      { label: "case4", caption: "w=7 取 parent 颜色，2 与远侄 8 染黑" },
      { label: "rotate", caption: "对 parent 2 左旋，额外黑色消除" },
      { label: "done", caption: "x 上提为 root 方向，循环结束" },
    ],
    snapshots: [
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            undefined,
            {
              key: -1,
              color: "B",
              mark: { label: "x+", tone: "danger" },
            } as RBNode,
            n(
              7,
              "B",
              { label: "w", tone: "accent" },
              n(5, "B"),
              n(8, "R", { label: "远", tone: "warning" }),
            ),
          ),
          n(
            14,
            "B",
            undefined,
            n(13, "B", undefined, NIL, n(12, "R")),
            n(15, "B", undefined, NIL, n(16, "R")),
          ),
        ),
        note: "删掉黑叶 1，x=NIL；w=7 黑且远侄 8 为红——最有利的删除情形。",
        claim: "x 携带额外黑色",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            2,
            "B",
            { label: "p", tone: "accent" },
            n(-1, "B", { label: "x+", tone: "danger" }),
            n(
              7,
              "B",
              { label: "w", tone: "accent" },
              n(5, "B"),
              n(8, "B", { label: "远", tone: "warning" }),
            ),
          ),
          n(14, "B"),
        ),
        note: "w=7 取 parent 的颜色（仍是黑）、parent=2 与远侄 8 染黑：为左旋后的黑高铺路。",
        claim: "case 4 · 换色",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            7,
            "B",
            { label: "w↑", tone: "accent" },
            n(2, "B", undefined, n(-1, "B"), n(5, "B")),
            n(8, "B"),
          ),
          n(
            14,
            "B",
            undefined,
            n(13, "B", undefined, NIL, n(12, "R")),
            n(15, "B", undefined, NIL, n(16, "R")),
          ),
        ),
        spin: { pivot: 2, dir: "L" },
        note: "左旋 pivot=2：w=7 上提取代 2 的位置，它带来的黑节点恰好补上 x 的亏空。",
        claim: "旋转 1 次",
      },
      {
        tree: n(
          11,
          "B",
          undefined,
          n(
            7,
            "B",
            undefined,
            n(2, "B", undefined, n(-1, "B"), n(5, "B")),
            n(8, "B"),
          ),
          n(
            14,
            "B",
            undefined,
            n(13, "B", undefined, NIL, n(12, "R")),
            n(15, "B", undefined, NIL, n(16, "R")),
          ),
        ),
        note: "循环令 x=root 结束：整个删除修复至多 3 次旋转，摊到每次删除是常数。",
        claim: "rotations ≤ 3",
      },
    ],
  },
  audit: {
    key: "audit",
    title: "完整证书与故障注入",
    field: "BST 有序 + root/NIL 黑 + 红不连红 + 黑高一致",
    steps: [
      { label: "inorder", caption: "中序遍历必须得到升序序列" },
      { label: "rootnil", caption: "root 为黑 · 每个 NIL 为黑" },
      { label: "redred", caption: "红节点的两个孩子必须全黑" },
      { label: "blackheight", caption: "递归比对左右子树的黑高" },
    ],
    snapshots: [
      {
        tree: PROPS_TREE,
        note: "证书 1/4：中序序列 1,2,7,11,13,14,15 升序。注意——只查中序会漏掉颜色和黑高错误。",
        claim: "BST 证书",
      },
      {
        tree: PROPS_TREE,
        note: "证书 2/4：root 11 为黑；所有缺失孩子都是黑 NIL 哨兵。",
        claim: "性质 2/3 ✓",
      },
      {
        tree: PROPS_TREE,
        note: "证书 3/4：红节点 7 的孩子（两个 NIL）全黑。注入故障后，这一步会首先报警。",
        claim: "性质 4 ✓",
      },
      {
        tree: PROPS_TREE,
        note: "证书 4/4：每个节点左右子树黑高相等（11 为 3）。四张证书全部通过才算合法红黑树。",
        claim: "性质 5 ✓",
        showBh: true,
      },
    ],
    failure: {
      title: "漏改远侄颜色",
      desc: "现象：验证器在性质 4 上报 14↔15 红-红。原因：删除修复只改兄弟与近侄，漏改另一侧的远侄。修法：每次 recolor 后沿祖父链重跑完整证书，不要只比对中序输出。",
    },
  },
};

type Mechanism = "props" | "insert" | "delete" | "audit";

const MECHANISM_OPTIONS: ReadonlyArray<{ value: Mechanism; label: string }> = [
  { value: "props", label: "性质与黑高 · properties" },
  { value: "insert", label: "插入修复 · RB-INSERT-FIXUP" },
  { value: "delete", label: "删除修复 · RB-DELETE-FIXUP" },
  { value: "audit", label: "验证器 · 故障注入" },
];

const SCENARIO_OPTIONS: Record<
  Mechanism,
  ReadonlyArray<{ value: string; label: string }>
> = {
  props: [{ value: "props", label: "五条性质 → 高度上界" }],
  insert: [
    { value: "uncle-red", label: "case 1 · 叔红上移" },
    { value: "line", label: "case 3 · 直线旋转" },
    { value: "triangle", label: "case 2 · 三角转直线" },
  ],
  delete: [
    { value: "case1", label: "case 1 · 兄弟为红先转换" },
    { value: "case2", label: "case 2 · 兄弟孩子全黑上移" },
    { value: "case3", label: "case 3 · 近侄为红先转换" },
    { value: "case4", label: "case 4 · 远侄为红直接终结" },
  ],
  audit: [{ value: "audit", label: "完整证书 · 注入红-红故障" }],
};

const W = 900;
const H = 648;
const Y0 = 96;
const DY = 78;
const R = 17;

const TONE_FILL: Record<MarkTone, string> = {
  accent: C.accent,
  warning: C.warning,
  danger: C.danger,
  success: C.success,
};

type Laid = {
  nodes: Array<RBNode & { x: number; y: number }>;
  edges: Array<{ x1: number; y1: number; x2: number; y2: number }>;
  nils: Array<{ x: number; y: number; mark?: RBNode["mark"] }>;
};

function countSlots(node: RBNode | undefined): number {
  if (!node) return 1;
  return countSlots(node.left) + countSlots(node.right);
}

function layoutTree(root: RBNode): Laid {
  // countSlots 只数 NIL 叶子；walk 给内部节点与 NIL 各分配一个槽位，
  // 所以总槽位 = NIL + 内部节点 = 2·NIL − 1。分母必须用完整槽位数，
  // 否则最右侧节点会画出 viewBox（桌面 1440 下 NIL 渲染到 x≈1516）。
  const total = countSlots(root);
  const slots = 2 * total - 1;
  const slotW = slots > 1 ? (W - 72) / (slots - 1) : 0;
  const startX = 36;
  const out: Laid = { nodes: [], edges: [], nils: [] };
  let slot = 0;
  const walk = (
    node: RBNode | undefined,
    depth: number,
  ): { x: number; y: number } => {
    const y = Y0 + depth * DY;
    if (!node) {
      const x = startX + slot * slotW;
      slot += 1;
      out.nils.push({ x, y });
      return { x, y };
    }
    const l = walk(node.left, depth + 1);
    const x = startX + slot * slotW;
    slot += 1;
    const r = walk(node.right, depth + 1);
    out.nodes.push({ ...node, x, y });
    out.edges.push({ x1: x, y1: y + R, x2: l.x, y2: l.y - 8 });
    out.edges.push({ x1: x, y1: y + R, x2: r.x, y2: r.y - 8 });
    return { x, y };
  };
  walk(root, 0);
  return out;
}

/** 黑高：到 NIL 路径上的黑节点数（含 NIL、不含节点自身）。负数 key 代表 NIL 哨兵位。 */
function blackHeight(node: RBNode | undefined): number {
  if (!node || node.key < 0) return 1;
  return (
    (node.color === "B" ? 1 : 0) +
    Math.max(blackHeight(node.left), blackHeight(node.right))
  );
}

export function Clrs4Chapter13RedBlackTreesLab() {
  const stageRefs = useRef<Array<SVGGElement | null>>([]);
  const [mechanism, setMechanism] = useState<Mechanism>("insert");
  const [scenario, setScenario] = useState("uncle-red");
  const [fault, setFault] = useState(false);

  const scenarioKey = SCENARIO_OPTIONS[mechanism].some(
    (o) => o.value === scenario,
  )
    ? scenario
    : SCENARIO_OPTIONS[mechanism][0].value;
  const active: Scenario = SCENARIOS[scenarioKey];

  const timeline = useTeachingTimeline({
    steps: active.steps,
    build: (tl) => {
      active.steps.forEach((step, index) => {
        tl.add(
          stageRefs.current[index]!,
          {
            opacity: index === 0 ? [1, 1] : [0, 1],
            duration: T * 0.55,
            ease: "out(3)",
          },
          index * T,
        );
        tl.label(step.label, index * T);
      });
    },
  });

  const stepIndex = Math.min(active.steps.length - 1, timeline.currentStep);
  const snapshot = active.snapshots[stepIndex] ?? active.snapshots[0];
  const laid = layoutTree(
    fault && mechanism === "audit" ? FAULT_TREE : snapshot.tree,
  );
  const spinNode = snapshot.spin
    ? laid.nodes.find((node) => node.key === snapshot.spin!.pivot)
    : undefined;
  const redRedFault = fault && mechanism === "audit" && stepIndex === 2;

  function reset() {
    timeline.goToStep(0);
    setMechanism("insert");
    setScenario("uncle-red");
    setFault(false);
  }

  return (
    <figure
      className="mdx-figure not-prose mx-auto my-8"
      data-visual-kind="clrs4-ch13-red-black-trees"
    >
      <div className="overflow-hidden rounded-card border border-border bg-elevated p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
              CLRS 4e · Chapter 13 · Red-Black Trees
            </p>
            <h3 className="mt-1 text-lg font-semibold text-primary">
              旋转与换色如何守住黑高
            </h3>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-secondary">
              切换机制与场景，沿时间线观察真实树结构：新叶染红、red-red
              定位、换色、旋转与额外黑色的逐帧状态。
            </p>
          </div>
          <span className="rounded-control border border-accent px-2 py-1 text-xs text-accent">
            ▷ 可交互
          </span>
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              选择机制
            </span>
            <select
              aria-label="选择红黑树机制：性质与黑高、插入修复、删除修复或验证器"
              value={mechanism}
              onChange={(event) => {
                const next = event.target.value as Mechanism;
                setMechanism(next);
                setScenario(SCENARIO_OPTIONS[next][0].value);
              }}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {MECHANISM_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-secondary">
            <span className="mb-1 block font-semibold text-primary">
              选择场景
            </span>
            <select
              aria-label="选择当前机制下的修复场景"
              value={scenarioKey}
              onChange={(event) => {
                setScenario(event.target.value);
                timeline.goToStep(0);
              }}
              className="min-h-11 w-full rounded-control border border-border bg-bg px-3 py-2 text-sm text-primary"
            >
              {SCENARIO_OPTIONS[mechanism].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div
          role="region"
          aria-label="红黑树步骤图，可在窄屏横向滚动查看"
          tabIndex={0}
          className="overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="CLRS 4e Chapter 13 专属红黑树实验。覆盖 red-black trees、红黑树、properties of red-black trees、红黑树性质、rotations、旋转、insertion、插入、deletion、删除。按步骤渲染真实红黑树结构：节点圆（红/黑）、NIL 黑哨兵、父子边、黑高标注、z/parent/grandparent/uncle/sibling/x 标记与左旋右旋箭头；支持机制与场景切换、播放、暂停、单步、拖进度、重置和故障注入。"
            className="mx-auto block h-auto w-full min-w-[720px] sm:min-w-0"
          >
            <defs>
              <marker
                id="clrs4-rbt-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill={C.border} />
              </marker>
              <marker
                id="clrs4-rbt-spin"
                markerWidth="9"
                markerHeight="9"
                refX="6"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill={C.warning} />
              </marker>
            </defs>

            <rect x="0" y="0" width={W} height={H} rx="14" fill={C.bg} />
            <text x="28" y="32" fontSize="15" fontWeight="700" fill={C.primary}>
              {active.title} · 第 {stepIndex + 1} / {active.steps.length} 步
            </text>
            <text x="28" y="54" fontSize="12" fill={C.secondary}>
              {active.field}
            </text>
            <text
              x={W - 28}
              y="32"
              textAnchor="end"
              fontSize="12"
              fontWeight="700"
              fill={C.accent}
            >
              {snapshot.claim}
            </text>

            {active.steps.map((step, index) => (
              <g
                key={"stage-" + step.label}
                ref={(nodeEl) => {
                  stageRefs.current[index] = nodeEl;
                }}
                style={{ opacity: index === 0 ? 1 : 0 }}
              >
                <rect
                  x="28"
                  y="64"
                  width={W - 56}
                  height="24"
                  rx="8"
                  fill={index === stepIndex ? C.accent : C.elevated}
                  fillOpacity={index === stepIndex ? 0.12 : 1}
                  stroke={index === stepIndex ? C.accent : C.border}
                  strokeWidth="1.4"
                />
                <text
                  x="44"
                  y="80"
                  fontSize="12"
                  fontWeight="700"
                  fill={index === stepIndex ? C.accent : C.primary}
                >
                  {index + 1} · {step.caption}
                </text>
              </g>
            ))}

            {laid.edges.map((edge, index) => (
              <line
                key={"edge-" + index}
                x1={edge.x1}
                y1={edge.y1}
                x2={edge.x2}
                y2={edge.y2}
                stroke={C.border}
                strokeWidth="1.6"
              />
            ))}

            {laid.nils.map((nilNode, index) => (
              <g key={"nil-" + index}>
                <rect
                  x={nilNode.x - 13}
                  y={nilNode.y - 7}
                  width="26"
                  height="14"
                  rx="3"
                  fill={C.primary}
                  stroke={
                    nilNode.mark ? TONE_FILL[nilNode.mark.tone] : C.primary
                  }
                  strokeWidth={nilNode.mark ? 2 : 1}
                />
                <text
                  x={nilNode.x}
                  y={nilNode.y + 3.5}
                  textAnchor="middle"
                  fontSize="11"
                  fill={C.bg}
                >
                  NIL
                </text>
                {nilNode.mark && (
                  <text
                    x={nilNode.x}
                    y={nilNode.y - 14}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill={TONE_FILL[nilNode.mark.tone]}
                  >
                    {nilNode.mark.label}
                  </text>
                )}
              </g>
            ))}

            {laid.nodes.map((node) => {
              const isNil = node.key < 0;
              if (isNil) {
                return (
                  <g key={"node-nil-" + node.key + "-" + node.x}>
                    <rect
                      x={node.x - 13}
                      y={node.y - 7}
                      width="26"
                      height="14"
                      rx="3"
                      fill={C.primary}
                      stroke={node.mark ? TONE_FILL[node.mark.tone] : C.primary}
                      strokeWidth={node.mark ? 2 : 1}
                    />
                    <text
                      x={node.x}
                      y={node.y + 3.5}
                      textAnchor="middle"
                      fontSize="11"
                      fill={C.bg}
                    >
                      NIL
                    </text>
                    {node.mark && (
                      <text
                        x={node.x}
                        y={node.y - 14}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="700"
                        fill={TONE_FILL[node.mark.tone]}
                      >
                        {node.mark.label}
                      </text>
                    )}
                  </g>
                );
              }
              const bh = snapshot.showBh ? blackHeight(node) : 0;
              return (
                <g key={"node-" + node.key}>
                  {node.mark && (
                    <text
                      x={node.x}
                      y={node.y - R - 14}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill={TONE_FILL[node.mark.tone]}
                    >
                      {node.mark.label}
                    </text>
                  )}
                  {node.mark && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={R + 5}
                      fill="none"
                      stroke={TONE_FILL[node.mark.tone]}
                      strokeWidth="1.6"
                      strokeDasharray="4 3"
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={R}
                    fill={node.color === "R" ? C.danger : C.primary}
                    stroke={
                      redRedFault && node.key === 14 ? C.danger : C.border
                    }
                    strokeWidth={redRedFault && node.key === 14 ? 3 : 1.4}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4.5}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="700"
                    fill={C.bg}
                  >
                    {node.key}
                  </text>
                  {snapshot.showBh && (
                    <text
                      x={node.x}
                      y={node.y + R + 15}
                      textAnchor="middle"
                      fontSize="11"
                      fill={C.secondary}
                    >
                      bh{bh}
                    </text>
                  )}
                </g>
              );
            })}

            {spinNode && snapshot.spin && (
              <g>
                <path
                  d={
                    snapshot.spin.dir === "L"
                      ? `M ${spinNode.x + 30} ${spinNode.y} A 30 30 0 1 0 ${spinNode.x + 8} ${spinNode.y - 29}`
                      : `M ${spinNode.x - 30} ${spinNode.y} A 30 30 0 1 1 ${spinNode.x - 8} ${spinNode.y - 29}`
                  }
                  fill="none"
                  stroke={C.warning}
                  strokeWidth="2.4"
                  strokeDasharray="6 4"
                  markerEnd="url(#clrs4-rbt-spin)"
                />
                <text
                  x={spinNode.x + 40}
                  y={spinNode.y - 22}
                  fontSize="12"
                  fontWeight="700"
                  fill={C.warning}
                >
                  {snapshot.spin.dir === "L" ? "↺ 左旋" : "↻ 右旋"}
                </text>
              </g>
            )}

            {snapshot.pathNote && (
              <text x="28" y="330" fontSize="11" fill={C.secondary}>
                {snapshot.pathNote}
              </text>
            )}

            <rect
              x="28"
              y="556"
              width={W - 56}
              height="56"
              rx="10"
              fill={C.elevated}
              stroke={C.border}
              strokeWidth="1.4"
            />
            <text x="44" y="580" fontSize="12" fill={C.primary}>
              {snapshot.note}
            </text>
            <text x="44" y="600" fontSize="11" fill={C.secondary}>
              {fault && mechanism === "audit" && active.failure
                ? `故障：${active.failure.title} — ${active.failure.desc}`
                : "黑节点填深、红节点填红、缺失孩子是黑 NIL；虚线圈标出 z / parent / grandparent / uncle / w / x 的角色。"}
            </text>
          </svg>
        </div>

        {mechanism === "audit" && (
          <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 rounded-control border border-border px-3 py-2 text-sm text-primary">
            <input
              type="checkbox"
              checked={fault}
              onChange={(event) => setFault(event.target.checked)}
              className="h-5 w-5 accent-[var(--accent)]"
              aria-label="注入故障：把节点 14 染红，制造红-红相邻"
            />
            <span>注入故障：把节点 14 染红（制造 14↔15 红-红相邻）</span>
          </label>
        )}

        <TimelineControls
          timeline={timeline}
          labelText={Object.fromEntries(
            active.steps
              .filter(
                (step): step is TeachingStep & { caption: string } =>
                  typeof step.caption === "string",
              )
              .map((step) => [step.label, step.caption]),
          )}
          caption="红黑树的关键不是“绝对平衡”，而是让每条路径黑数相等——旋转只改形状，换色只改计数。"
          reset={{
            label: "重置实验",
            ariaLabel: "重置红黑树实验",
            onClick: reset,
          }}
        />
      </div>
      <figcaption className="mt-2 text-center text-sm text-secondary">
        同一棵树的逐帧快照：插入先看叔节点颜色，删除先看兄弟与侄子颜色，旋转前后中序序列不变。
      </figcaption>
    </figure>
  );
}
