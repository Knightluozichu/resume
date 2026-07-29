"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-3.2",
  title: "3.2 · Binary Search Trees",
  focus: "沿根到键的路径实现查找、插入、有序操作、范围查询与 Hibbard 删除",
  formula: "rank(x)=size(left(x))+rank(x.right,key)（当 key>x.key）",
  invariant:
    "每个节点左子树键更小、右子树键更大，size=1+size(left)+size(right)",
  fault: "Hibbard 删除后只修复局部链接却没有自底向上重算 size",
  evidence: "搜索路径、节点键值、左右链接、子树 size、中序序列与有序数组预言机",
  concepts: [
    "binary search trees",
    "二叉搜索树",
    "BST search and insertion",
    "BST查找与插入",
    "BST analysis",
    "BST分析",
    "order-based methods",
    "有序操作",
    "BST deletion",
    "BST删除",
  ],
  trace: [
    "从根比较键",
    "选择左或右子树",
    "执行更新或删除",
    "重算子树大小",
    "核对中序与 rank",
  ],
  scenarios: [
    {
      label: "路径查找",
      input: "在键 [S,E,X,A,R,C,H] 构成的 BST 中查找 R",
      expected: "每次比较只排除一侧子树，轨迹可由根到 R 重放",
    },
    {
      label: "双子删除",
      input: "删除同时有左右孩子的节点 E",
      expected: "用右子树最小节点接替，并保持两侧链接和 size",
    },
  ],
} satisfies Algs4SectionModel;

export function BinarySearchTreesModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function BinarySearchTreesTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function BinarySearchTreesCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
