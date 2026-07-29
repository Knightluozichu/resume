"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-6.3",
  title: "6.3 · Suffix Arrays",
  focus: "以排序后缀与 LCP 支持最长重复子串、上下文关键词和最长公共前缀查询",
  formula: "二分后缀数组定位长度 M 模式需 O(M log N) 字符比较，匹配输出另计",
  invariant:
    "suffix array 是 0..N-1 的全排列且对应后缀字典序递增；LCP 与相邻后缀一致",
  fault:
    "后缀比较器把 substring 分配成本藏在常数里，或 LCP 索引偏移一位越过文本末端",
  evidence:
    "文本哈希、SA 排列、相邻后缀、LCP、二分区间、匹配位置与朴素后缀排序预言机",
  concepts: [
    "suffix arrays",
    "后缀数组",
    "suffix sorting",
    "后缀排序",
    "longest repeated substring",
    "最长重复子串",
    "keyword in context",
    "上下文关键词查找",
    "longest common prefix",
    "最长公共前缀",
  ],
  trace: [
    "生成后缀索引",
    "按字符比较后缀",
    "形成有序 SA",
    "计算相邻 LCP",
    "执行 LRS/KWIC 查询",
  ],
  scenarios: [
    {
      label: "最长重复",
      input: "文本 banana",
      expected: "相邻后缀的最大 LCP 为 ana，并能返回对应两个起点",
    },
    {
      label: "关键词上下文",
      input: "在有序后缀中二分模式 ana",
      expected: "定位连续匹配区间，再回到原文截取上下文",
    },
  ],
} satisfies Algs4SectionModel;

export function SuffixArraysModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function SuffixArraysTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function SuffixArraysCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
