"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-2.5",
  title: "2.5 · Sorting Applications",
  focus: "依据数据类型、稳定性、内存、输入分布与归约目标选择排序实现",
  formula: "比较排序最坏比较下界为 ceil(log2(N!)) = Θ(N log N)",
  invariant:
    "输出必须全序且保持输入多重集；若合同要求稳定，相等键的原始次序也必须保持",
  fault:
    "比较器违反传递性，或把 equals 与 compareTo 不一致的数据交给依赖全序的客户端",
  evidence:
    "数据类型、比较器、原始序号、排序结果、稳定性、峰值空间与归约后的答案",
  concepts: [
    "sorting applications",
    "排序应用",
    "sorting various types of data",
    "不同类型数据排序",
    "sorting algorithm selection",
    "排序算法选择",
    "reductions",
    "归约",
    "stability and indirect sorting",
    "稳定性与间接排序",
  ],
  trace: [
    "声明排序合同",
    "选择比较器",
    "选择排序实现",
    "执行应用归约",
    "核对全序与稳定性",
  ],
  scenarios: [
    {
      label: "稳定多键",
      input: "先按姓名排序，再稳定地按部门排序",
      expected: "部门相同记录仍保持姓名顺序，形成多键结果",
    },
    {
      label: "交集归约",
      input: "将两个点集排序后扫描检测共同点",
      expected: "排序把成对比较归约为两个有序游标的线性扫描",
    },
  ],
} satisfies Algs4SectionModel;

export function SortingApplicationsModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function SortingApplicationsTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function SortingApplicationsCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
