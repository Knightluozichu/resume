"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-3.5",
  title: "3.5 · Searching Applications",
  focus: "把集合、字典、倒排索引、稀疏向量与系统符号表归结为键值操作组合",
  formula: "稀疏向量点积可按较小非零集合迭代，成本 O(nnz_small × lookup)",
  invariant: "应用结果必须与所选 Set/Map 语义一致，缺失键与显式零值不得混淆",
  fault: "在遍历索引时原地修改同一符号表，或把重复词频误压成集合存在性",
  evidence:
    "输入记录、规范化键、索引 postings、非零坐标、查询轨迹与朴素扫描结果",
  concepts: [
    "searching applications",
    "查找应用",
    "set APIs",
    "集合API",
    "dictionary clients",
    "字典客户端",
    "indexing clients",
    "索引客户端",
    "sparse vectors and matrices",
    "稀疏向量与矩阵",
    "system symbol table",
    "系统符号表",
  ],
  trace: [
    "选择集合或映射",
    "规范化输入键",
    "构建正向或倒排索引",
    "执行查询组合",
    "核对应用语义",
  ],
  scenarios: [
    {
      label: "倒排索引",
      input: "文档 d1=[A,B]、d2=[B,C]，查询 B",
      expected: "返回 postings d1 与 d2，并保持文档标识去重规则",
    },
    {
      label: "稀疏点积",
      input: "只在共同非零坐标 2 和 9 上相乘",
      expected: "跳过其余零项，结果与完整向量点积一致",
    },
  ],
} satisfies Algs4SectionModel;

export function SearchingApplicationsModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function SearchingApplicationsTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function SearchingApplicationsCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
