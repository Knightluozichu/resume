"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-1.5",
  title: "1.5 · Case Study: Union-Find",
  focus: "在动态连通问题中比较 quick-find、quick-union、加权合并与路径压缩",
  formula:
    "加权 quick-union 树高 ≤ floor(log2 N)；加路径压缩后 M 次操作为近线性成本",
  invariant:
    "connected(p,q) 当且仅当 root(p)=root(q)，每次 union 只连接两个不同根",
  fault: "把非根节点接到另一棵树，或按节点编号而不是树大小决定连接方向",
  evidence:
    "id/parent 数组、size、root 路径、component count、访问次数与朴素图连通预言机",
  concepts: [
    "dynamic connectivity",
    "动态连通性",
    "union-find API",
    "并查集API",
    "quick-find",
    "快速查找",
    "quick-union",
    "快速合并",
    "weighted quick-union",
    "加权快速合并",
    "path compression",
    "路径压缩",
  ],
  trace: [
    "读取节点对",
    "寻找两个根",
    "比较树大小",
    "连接较小根",
    "压缩路径并核对分量",
  ],
  scenarios: [
    {
      label: "链式退化",
      input: "按 0-1、1-2、2-3、3-4 合并",
      expected: "quick-union 可能形成长链，加权策略限制树高",
    },
    {
      label: "重复合并",
      input: "先 union(1,2)，再重复 union(1,2)",
      expected: "第二次不得再次减少 component count",
    },
  ],
} satisfies Algs4SectionModel;

export function UnionFindModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function UnionFindTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function UnionFindCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
