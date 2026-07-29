"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-5.1",
  title: "5.1 · String Sorts",
  focus:
    "利用字符表规模与公共前缀，在键索引计数、LSD、MSD 和三向字符串快排间选择",
  formula: "LSD 固定宽字符串排序时间 Θ(WN)；MSD/三向快排成本取决于被检查字符数",
  invariant:
    "每次分配或切分后，已完成的字符位次序正确，元素多重集和所需稳定性保持不变",
  fault:
    "没有为字符串结束设置小于所有字符的哨兵值，导致前缀字符串排在其扩展之后",
  evidence:
    "alphabet/R、字符索引、count 前缀和、桶边界、递归区间、字符探测数与比较排序预言机",
  concepts: [
    "string sorts",
    "字符串排序",
    "key-indexed counting",
    "键索引计数",
    "LSD radix sort",
    "低位优先字符串排序",
    "MSD radix sort",
    "高位优先字符串排序",
    "three-way string quicksort",
    "三向字符串快速排序",
  ],
  trace: [
    "声明字符表与宽度",
    "读取当前字符",
    "计数或三向切分",
    "递归未决区间",
    "核对字典序",
  ],
  scenarios: [
    {
      label: "固定宽键",
      input: "对等长日期键按日、月、年做 LSD",
      expected: "从最低有效位开始稳定排序，最后得到完整键序",
    },
    {
      label: "公共前缀",
      input: "排序 shell、shore、short、she",
      expected: "MSD 或三向字符串快排跳过已经确认相等的前缀",
    },
  ],
} satisfies Algs4SectionModel;

export function StringSortsModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function StringSortsTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function StringSortsCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
