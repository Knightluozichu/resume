"use client";

import { DsvOfficialLab } from "./official-lab";

const conceptCases = [
  { label: "数据", fields: [["定义", "描述客观事物、可被计算机识别和处理的符号集合"], ["例子", "学生记录、像素、道路长度、事件日志"], ["检查", "声明来源、取值域、单位和缺失值"]] },
  { label: "数据元素", fields: [["定义", "数据集合中的基本单位，通常作为整体处理"], ["例子", "一名学生、一幅图的一个像素、图中的一个顶点"], ["检查", "元素identity和生命周期是否明确"]] },
  { label: "数据项", fields: [["定义", "构成数据元素、不可再分的最小语义单位"], ["例子", "学号、姓名、分数；像素的R/G/B通道"], ["检查", "字段类型、范围和约束是否可验证"]] },
  { label: "数据对象", fields: [["定义", "具有相同性质的数据元素的有限集合或子集"], ["例子", "某班学生集合、某路网的顶点集合"], ["检查", "成员规则和集合边界是否稳定"]], alert: "层级不是固定内存大小：同一业务对象在不同问题中可选择不同元素粒度。" },
] as const;

const structureCases = [
  { label: "集合", fields: [["逻辑关系", "元素除同属一个集合外没有额外关系"], ["典型操作", "membership、insert、delete"], ["可能物理表示", "散列表、位图、排序数组"]] },
  { label: "线性", fields: [["逻辑关系", "除端点外每个元素有唯一前驱和后继"], ["典型操作", "按序访问、插入、删除"], ["可能物理表示", "连续数组或链式结点"]] },
  { label: "树形", fields: [["逻辑关系", "一对多的层次关系，通常有唯一父结点"], ["典型操作", "祖先/子树查询与层次遍历"], ["可能物理表示", "父数组、孩子表、二叉链表"]] },
  { label: "图状", fields: [["逻辑关系", "多对多关系，边可有方向和权值"], ["典型操作", "邻接、连通、路径和生成树"], ["可能物理表示", "邻接矩阵、邻接表、边集"]], alert: "逻辑结构回答元素之间是什么关系；物理结构回答这些关系怎样落到地址、指针和索引。两者不能混为同一个概念。" },
] as const;

const adtCases = [
  { label: "Value", fields: [["声明", "允许保存什么值，元素identity如何定义"], ["线性表示例", "有限序列 (a1, a2, ..., an)"], ["失败证据", "越界、重复、缺失值违反哪条约束"]] },
  { label: "Operation", fields: [["声明", "Init/Get/Locate/Insert/Delete/Clear等可观察操作"], ["要求", "前置条件、返回结果和状态变化明确"], ["失败证据", "invalid position不应部分修改结构"]] },
  { label: "Invariant", fields: [["声明", "任何公开操作前后都必须成立的条件"], ["顺序表例子", "0 <= length <= capacity"], ["链表示例", "从head可达结点数等于length且无意外环"]] },
  { label: "Representation", fields: [["声明", "ADT接口不依赖连续或链式的具体存储"], ["替换", "相同测试可运行在SeqList和LinkList实现上"], ["验证", "结果、错误和状态不变量一致"]], alert: "ADT先定义语义，representation后决定成本。只写struct而没有操作契约，不等于完成抽象数据类型。" },
] as const;

export function DsvConceptHierarchyLab() {
  return <DsvOfficialLab cases={conceptCases} caption="数据、数据元素、数据项和数据对象形成可按问题调整的概念层级。" tone="cyan" />;
}

export function DsvStructureViewLab() {
  return <DsvOfficialLab cases={structureCases} caption="集合、线性、树形和图状是逻辑关系，物理表示可以独立选择。" tone="violet" />;
}

export function DsvAdtContractLab() {
  return <DsvOfficialLab cases={adtCases} caption="Value、operation、invariant和representation共同构成可替换的ADT契约。" tone="emerald" />;
}
