"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "9 Searching Strings by Prefix",
  focus: "在前端编码、插值搜索、压缩 Trie 与 Patricia 树间组织前缀查询",
  formula: "query = O(|prefix| + output)",
  invariant: "返回且只返回具有给定前缀的连续词典区间，并限制解码依赖",
  fault: "从非锚点随机解码 front-coded 字符串，导致错误候选或隐藏线性回溯",
  evidence: "词典版本、锚点、LCP、区间边界、解码链、页轨迹与朴素扫描结果",
  stages: [
    "Array of String Pointers",
    "Locality-Preserving Front Coding∞",
    "Interpolation Search",
    "Compacted Trie",
    "Patricia Trie",
    "Managing Huge Dictionaries∞",
  ],
} satisfies AlgorithmEngineeringModel;

export function SearchingStringsByPrefixCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function SearchingStringsByPrefixTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function SearchingStringsByPrefixEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
