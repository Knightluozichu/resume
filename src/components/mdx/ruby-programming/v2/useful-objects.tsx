"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-02",
  title: "第2章 便利的对象",
  question: "怎样从数组、符号、散列和正则的对象形状预测一次读取或更新？",
  concepts: [
    "数组的创建",
    "数组元素的读取与保存",
    "数组的循环",
    "符号",
    "散列的创建与使用",
    "散列的循环",
    "正则表达式",
  ],
  stages: [
    {
      label: "建立数组的创建输入",
      input: "固定数组的创建所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明数组元素的读取与保存的允许状态。",
      evidence: "保存第2章 便利的对象的初值、参数、编码或资源位置。",
    },
    {
      label: "执行数组元素的读取与保存",
      input: "保持相同输入，只改变与数组元素的读取与保存直接相关的一项操作。",
      state: "逐步记录数组的循环造成的对象、控制或边界变化。",
      evidence:
        "定位“让多个键或数组位置意外共享同一个可变默认对象”出现时的第一处不同状态。",
    },
    {
      label: "验收正则表达式",
      input: "恢复基线，再以正则表达式覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：容器身份、键语义、默认值和匹配范围在操作前后都明确可查。",
      evidence:
        "交付第2章 便利的对象的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定数组的创建的输入和接收者",
    "执行数组元素的读取与保存并记录状态",
    "观察数组的循环的返回或副作用",
    "用正则表达式核对不变量并复位",
  ],
  failureTrace: [
    "保持第2章 便利的对象的输入与初值不变",
    "仅注入故障：让多个键或数组位置意外共享同一个可变默认对象",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "容器身份、键语义、默认值和匹配范围在操作前后都明确可查。",
  fault: "让多个键或数组位置意外共享同一个可变默认对象",
  artifact:
    "第2章 便利的对象的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubUsefulObjectsObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubUsefulObjectsControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubUsefulObjectsBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
