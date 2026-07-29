"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-6.6",
  title: "6.6 · Intractability",
  focus:
    "区分 P、NP、NP-hard 与 NP-complete，并用多项式归约和证书验证指导工程取舍",
  formula:
    "若 A ≤p B 且 B 有多项式算法，则 A 也有多项式算法；困难性证明使用相反推论方向",
  invariant:
    "NP 结论必须给出多项式长度证书和多项式验证器；NP-hard 必须保持归约方向",
  fault:
    "从目标难题归约到已知难题却声称目标 NP-hard，或把尚未证明的 P≠NP 当作定理",
  evidence:
    "实例编码长度、证书、验证步骤、归约函数、规模界、yes/no 保持与小规模穷举预言机",
  concepts: [
    "intractability",
    "难解性",
    "computational complexity",
    "计算复杂性",
    "polynomial time",
    "多项式时间",
    "P and NP",
    "P与NP",
    "NP-completeness",
    "NP完全性",
    "coping with intractability",
    "应对难解问题",
  ],
  trace: [
    "定义判定问题",
    "写出证书验证器",
    "选择已知困难源问题",
    "构造多项式归约",
    "核对方向与工程策略",
  ],
  scenarios: [
    {
      label: "证书验证",
      input: "给定 Hamilton 回路候选顶点序列",
      expected: "在线性或多项式时间检查每点一次及相邻边存在",
    },
    {
      label: "归约方向",
      input: "要证明新问题 X 困难，选择已知 NP-hard 问题 Y",
      expected: "必须构造 Y≤pX，而不是 X≤pY",
    },
  ],
} satisfies Algs4SectionModel;

export function IntractabilityModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function IntractabilityTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function IntractabilityCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
