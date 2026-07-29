"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-1.1",
  title: "1.1 · Basic Programming Model",
  focus:
    "把 Java 表达式、数组、静态方法、API、输入输出与二分查找连成可执行程序合同",
  formula:
    "remaining = hi - lo + 1；下一轮 remaining ≤ floor(上一轮 remaining / 2)",
  invariant:
    "若 key 存在，它始终位于闭区间 a[lo..hi]；区间为空时才能报告未找到",
  fault: "不验证数组已有序，或用可能溢出的 (lo + hi) / 2 计算中点",
  evidence: "输入类型、数组快照、lo/mid/hi、比较结果、退出原因与线性扫描预言机",
  concepts: [
    "basic programming model",
    "基础编程模型",
    "primitive data types and expressions",
    "原始数据类型与表达式",
    "arrays and static methods",
    "数组与静态方法",
    "APIs and strings",
    "API与字符串",
    "input and output",
    "输入与输出",
    "binary search",
    "二分查找",
  ],
  trace: [
    "解析输入类型",
    "验证数组有序",
    "计算安全中点",
    "收缩候选区间",
    "返回索引证书",
  ],
  scenarios: [
    {
      label: "表达式边界",
      input: "比较 7 / 2、7 / 2.0 与 (double) (7 / 2)",
      expected: "先由操作数类型决定除法语义，再谈结果值",
    },
    {
      label: "查找边界",
      input: "在 [2, 4, 7, 9] 中查找 7 与 8",
      expected: "每轮保存闭区间，命中返回索引，空区间返回 -1",
    },
  ],
} satisfies Algs4SectionModel;

export function BasicProgrammingModelModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function BasicProgrammingModelTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function BasicProgrammingModelCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
