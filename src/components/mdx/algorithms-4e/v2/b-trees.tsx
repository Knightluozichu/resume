"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-6.2",
  title: "6.2 · B-trees",
  focus: "以磁盘页为成本单位，用多路节点、查找、插入与分裂控制外存访问",
  formula: "M 阶 B 树高度为 O(log_M N)，一次查找读取从根到叶的一页序列",
  invariant:
    "除根外节点保持规定的最小/最大占用，所有叶位于同一深度，键分隔子树范围",
  fault: "满节点分裂时提升了错误中位键，或只更新兄弟页而漏写父页的子指针",
  evidence:
    "页 id、页内键、child 指针、占用率、split WAL 顺序、页读取次数与有序扫描预言机",
  concepts: [
    "B-trees",
    "B树",
    "external-memory search",
    "外存查找",
    "multiway search nodes",
    "多路查找节点",
    "page access cost",
    "页访问成本",
    "B-tree search insertion and splitting",
    "B树查找、插入与分裂",
  ],
  trace: [
    "读取根页",
    "页内定位区间",
    "下降到子页",
    "插入并检测溢出",
    "分裂提升并核对叶深",
  ],
  scenarios: [
    {
      label: "页访问",
      input: "每页容纳 4 个分支，在三层树中查找键 K",
      expected: "成本按读取的页数计，不按页内每次比较等同于一次磁盘 I/O",
    },
    {
      label: "根分裂",
      input: "向已满根页插入新键",
      expected: "生成新根并提升中位键，树高只在根分裂时增加",
    },
  ],
} satisfies Algs4SectionModel;

export function BTreesModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function BTreesTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function BTreesCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
