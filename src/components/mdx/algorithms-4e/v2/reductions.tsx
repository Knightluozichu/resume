"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-6.5",
  title: "6.5 · Reductions",
  focus:
    "把上界、下界、线性规划、单纯形、指派和零和博弈放进问题变换与答案恢复合同",
  formula: "T_A(n)=T_transform(n)+T_B(f(n))+T_decode(n)",
  invariant:
    "A 的每个合法实例都映射到 B，B 的解可恢复为 A 的解，并保持可行性与目标值关系",
  fault:
    "只展示一个样例映射就宣称完成归约，或把 A≤B 的方向反过来推导 A 的困难性",
  evidence:
    "原实例、变换实例、规模膨胀、可行解映射、目标值、失败样例与逆向恢复结果",
  concepts: [
    "reductions",
    "归约",
    "upper bounds",
    "上界",
    "lower bounds",
    "下界",
    "linear programming",
    "线性规划",
    "simplex algorithm",
    "单纯形算法",
    "assignment problem and zero-sum games",
    "指派问题与零和博弈",
  ],
  trace: [
    "声明源问题和目标问题",
    "构造实例变换",
    "求解目标实例",
    "解码回原问题",
    "证明双向正确与成本",
  ],
  scenarios: [
    {
      label: "排序归约",
      input: "把元素唯一性问题归约为排序后扫描相邻项",
      expected: "排序加线性扫描给出上界，并明确比较模型成本",
    },
    {
      label: "线性规划",
      input: "把零和博弈策略约束写成 LP",
      expected: "可行解对应混合策略，目标值对应可保证收益",
    },
  ],
} satisfies Algs4SectionModel;

export function ReductionsModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function ReductionsTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function ReductionsCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
