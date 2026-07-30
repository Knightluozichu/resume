"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-13",
  title: "第13章 数组类",
  question: "怎样用容量、索引、元素身份和初始化策略证明数组操作正确？",
  concepts: [
    "Array.new、%w与%i",
    "to_a与split",
    "索引的使用方法",
    "作为集合的数组",
    "作为列的数组",
    "数组的添加、删除与替换",
    "数组与迭代器",
    "矩阵与初始化",
    "同时访问多个数组",
  ],
  stages: [
    {
      label: "建立Array.new、%w与%i输入",
      input: "固定Array.new、%w与%i所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明to_a与split的允许状态。",
      evidence: "保存第13章 数组类的初值、参数、编码或资源位置。",
    },
    {
      label: "执行to_a与split",
      input: "保持相同输入，只改变与to_a与split直接相关的一项操作。",
      state: "逐步记录索引的使用方法造成的对象、控制或边界变化。",
      evidence:
        "定位“使用 Array.new 的同一默认对象初始化多行矩阵”出现时的第一处不同状态。",
    },
    {
      label: "验收同时访问多个数组",
      input: "恢复基线，再以同时访问多个数组覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：所有索引落在有效区间，嵌套元素的共享或复制行为符合声明。",
      evidence:
        "交付第13章 数组类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定Array.new、%w与%i的输入和接收者",
    "执行to_a与split并记录状态",
    "观察索引的使用方法的返回或副作用",
    "用同时访问多个数组核对不变量并复位",
  ],
  failureTrace: [
    "保持第13章 数组类的输入与初值不变",
    "仅注入故障：使用 Array.new 的同一默认对象初始化多行矩阵",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "所有索引落在有效区间，嵌套元素的共享或复制行为符合声明。",
  fault: "使用 Array.new 的同一默认对象初始化多行矩阵",
  artifact:
    "第13章 数组类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubArraysObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubArraysControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubArraysBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
