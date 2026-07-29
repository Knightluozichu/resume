"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-3.1",
  title: "3.1 · Symbol Tables",
  focus: "用键值 API、顺序查找和有序数组二分建立符号表的语义与成本基线",
  formula: "有序数组查询 O(log N)，插入最坏 O(N)；无序链表查询和插入最坏 O(N)",
  invariant: "每个键至多关联一个当前值，put 已有键只更新值而不增加 size",
  fault: "用 null 同时表示缺失和值，或二分 rank 的返回语义与插入位置语义混淆",
  evidence: "键值序列、比较器、rank、size、数组移动、命中状态与朴素 Map 预言机",
  concepts: [
    "symbol tables",
    "符号表",
    "symbol table API",
    "符号表API",
    "ordered symbol tables",
    "有序符号表",
    "sequential search",
    "顺序查找",
    "binary search in an ordered array",
    "有序数组二分查找",
  ],
  trace: [
    "解析键值操作",
    "查找已有键",
    "决定更新或插入",
    "维护有序表示",
    "核对 size 与返回值",
  ],
  scenarios: [
    {
      label: "更新已有键",
      input: "put(A,1) 后再 put(A,2)",
      expected: "size 保持 1，get(A) 返回 2",
    },
    {
      label: "有序插入",
      input: "在 [A,C,E] 中 rank(D)",
      expected: "返回插入位置 2，并只移动 D 右侧元素",
    },
  ],
} satisfies Algs4SectionModel;

export function SymbolTablesModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function SymbolTablesTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function SymbolTablesCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
