"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-3.4",
  title: "3.4 · Hash Tables",
  focus: "从 hashCode/equals 合同、均匀散列假设、拉链法与线性探测推导负载控制",
  formula: "拉链平均链长 α=N/M；线性探测命中/未命中成本随 α→1 急剧上升",
  invariant:
    "equals 相等的键必须有相同 hashCode；所有键可由当前表容量和探测规则重新找到",
  fault: "键入表后发生可影响 hashCode 的变更，或删除线性探测槽位却不重建后续簇",
  evidence:
    "键及哈希值、M/N/α、桶或探测轨迹、resize 前后位置、命中结果与 Map 预言机",
  concepts: [
    "hash tables",
    "散列表",
    "hash functions",
    "散列函数",
    "uniform hashing assumption",
    "均匀散列假设",
    "separate chaining",
    "拉链法",
    "linear probing",
    "线性探测",
    "hash-table resizing",
    "散列表扩缩容",
  ],
  trace: [
    "计算一致哈希",
    "映射到桶或槽",
    "处理碰撞",
    "按负载扩缩容",
    "核对全部键值",
  ],
  scenarios: [
    {
      label: "拉链碰撞",
      input: "让 A、K、U 映射到同一桶",
      expected: "桶内仍用 equals 区分键，碰撞不会覆盖不同键",
    },
    {
      label: "探测删除",
      input: "删除线性探测簇中间的键",
      expected: "重插后续簇元素，不能留下使查找提前停止的空洞",
    },
  ],
} satisfies Algs4SectionModel;

export function HashTablesModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function HashTablesTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function HashTablesCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
