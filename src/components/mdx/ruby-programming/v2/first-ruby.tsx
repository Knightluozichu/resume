"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-01",
  title: "第1章 Ruby初探",
  question: "怎样区分 Ruby 文件运行、命令行执行与交互环境显示的责任？",
  concepts: [
    "Ruby的运行方法",
    "ruby命令的执行方法",
    "irb命令的执行方法",
    "对象与方法",
    "字符串",
    "puts方法与p方法",
    "中文的输出",
    "数值表示与计算",
    "变量与注释",
    "if～then～end",
    "while语句与times方法",
  ],
  stages: [
    {
      label: "建立Ruby的运行方法输入",
      input: "固定Ruby的运行方法所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明ruby命令的执行方法的允许状态。",
      evidence: "保存第1章 Ruby初探的初值、参数、编码或资源位置。",
    },
    {
      label: "执行ruby命令的执行方法",
      input: "保持相同输入，只改变与ruby命令的执行方法直接相关的一项操作。",
      state: "逐步记录irb命令的执行方法造成的对象、控制或边界变化。",
      evidence:
        "定位“把交互环境自动显示的表达式结果误当成脚本输出”出现时的第一处不同状态。",
    },
    {
      label: "验收while语句与times方法",
      input: "恢复基线，再以while语句与times方法覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：同一脚本、参数和 Ruby 版本产生可解释的输出、错误通道与退出状态。",
      evidence:
        "交付第1章 Ruby初探的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定Ruby的运行方法的输入和接收者",
    "执行ruby命令的执行方法并记录状态",
    "观察irb命令的执行方法的返回或副作用",
    "用while语句与times方法核对不变量并复位",
  ],
  failureTrace: [
    "保持第1章 Ruby初探的输入与初值不变",
    "仅注入故障：把交互环境自动显示的表达式结果误当成脚本输出",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "同一脚本、参数和 Ruby 版本产生可解释的输出、错误通道与退出状态。",
  fault: "把交互环境自动显示的表达式结果误当成脚本输出",
  artifact:
    "第1章 Ruby初探的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubFirstRubyObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubFirstRubyControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubFirstRubyBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
