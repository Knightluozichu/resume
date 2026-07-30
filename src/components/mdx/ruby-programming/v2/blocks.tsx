"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-11",
  title: "第11章 块",
  question: "怎样区分方法拥有的流程与块注入的策略、局部变量和返回语义？",
  concepts: [
    "块的使用方法",
    "隐藏常规处理",
    "替换部分算法",
    "定义带块的方法",
    "执行块",
    "传递块参数，获取块的值",
    "控制块的执行",
    "将块封装为对象",
    "局部变量与块变量",
  ],
  stages: [
    {
      label: "建立块的使用方法输入",
      input: "固定块的使用方法所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明隐藏常规处理的允许状态。",
      evidence: "保存第11章 块的初值、参数、编码或资源位置。",
    },
    {
      label: "执行隐藏常规处理",
      input: "保持相同输入，只改变与隐藏常规处理直接相关的一项操作。",
      state: "逐步记录替换部分算法造成的对象、控制或边界变化。",
      evidence:
        "定位“把普通 Proc 中的 return 当作只离开 Proc，意外提前退出外层方法”出现时的第一处不同状态。",
    },
    {
      label: "验收局部变量与块变量",
      input: "恢复基线，再以局部变量与块变量覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：yield 次数、块参数、返回位置与外部状态变化都能逐步解释。",
      evidence:
        "交付第11章 块的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定块的使用方法的输入和接收者",
    "执行隐藏常规处理并记录状态",
    "观察替换部分算法的返回或副作用",
    "用局部变量与块变量核对不变量并复位",
  ],
  failureTrace: [
    "保持第11章 块的输入与初值不变",
    "仅注入故障：把普通 Proc 中的 return 当作只离开 Proc，意外提前退出外层方法",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "yield 次数、块参数、返回位置与外部状态变化都能逐步解释。",
  fault: "把普通 Proc 中的 return 当作只离开 Proc，意外提前退出外层方法",
  artifact:
    "第11章 块的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubBlocksObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubBlocksControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubBlocksBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
