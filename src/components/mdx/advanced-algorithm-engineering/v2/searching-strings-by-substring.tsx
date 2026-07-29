"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "10 Searching Strings by Substring",
  focus: "用后缀数组、LCP 与后缀树把子串查询变成有序区间定位",
  formula: "suffix-array query = O(m log n + occ)",
  invariant: "所有后缀恰出现一次并保持词典序，查询区间与朴素匹配结果一致",
  fault: "遗漏唯一终止符或混淆 LCP 下标，使构造、比较与区间边界不一致",
  evidence: "文本 hash、SA、LCP、比较区间、匹配位置、构造阶段与朴素预言机",
  stages: [
    "Notation and Terminology",
    "The Suffix Array",
    "The Suffix Tree",
    "Some Interesting Problems",
  ],
} satisfies AlgorithmEngineeringModel;

export function SearchingStringsBySubstringCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function SearchingStringsBySubstringTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function SearchingStringsBySubstringEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
