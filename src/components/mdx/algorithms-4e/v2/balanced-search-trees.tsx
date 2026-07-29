"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-3.3",
  title: "3.3 · Balanced Search Trees",
  focus: "把 2-3 树等价表示为左倾红黑树，并用旋转与颜色翻转维持对数高度",
  formula: "含 N 个节点的左倾红黑树高度不超过 2 log2 N",
  invariant: "红链接左倾、任一路径不连续两条红链接、根到空链接的黑链接数相同",
  fault:
    "旋转时漏掉颜色或子树 size 转移，导致局部次序看似正确但黑高和 rank 已损坏",
  evidence:
    "键序列、链接颜色、旋转/翻色轨迹、每路黑高、树高、size 与中序预言机",
  concepts: [
    "balanced search trees",
    "平衡搜索树",
    "2-3 search trees",
    "2-3搜索树",
    "red-black BSTs",
    "红黑二叉搜索树",
    "rotations and color flips",
    "旋转与颜色翻转",
    "red-black deletion",
    "红黑树删除",
  ],
  trace: [
    "按 BST 插入",
    "修复右倾红链接",
    "拆分连续红链接",
    "向上传播颜色",
    "核对黑高与中序",
  ],
  scenarios: [
    {
      label: "递增插入",
      input: "依次插入 A、B、C",
      expected: "旋转和翻色把临时 4-node 拆分，避免退化为长度 3 的链",
    },
    {
      label: "删除准备",
      input: "沿路径下行删除最小键",
      expected: "在进入 2-node 前先移动红链接，保证底部可安全删除",
    },
  ],
} satisfies Algs4SectionModel;

export function BalancedSearchTreesModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function BalancedSearchTreesTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function BalancedSearchTreesCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
