"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-10",
  title: "第10章 错误处理与异常",
  question: "怎样划分异常的产生、传播、恢复与 ensure 清理责任？",
  concepts: [
    "错误处理",
    "begin、rescue与else",
    "ensure后处理",
    "retry重试",
    "rescue修饰符",
    "指定需要捕捉的异常",
    "异常类",
    "主动抛出异常",
  ],
  stages: [
    {
      label: "建立错误处理输入",
      input: "固定错误处理所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明begin、rescue与else的允许状态。",
      evidence: "保存第10章 错误处理与异常的初值、参数、编码或资源位置。",
    },
    {
      label: "执行begin、rescue与else",
      input: "保持相同输入，只改变与begin、rescue与else直接相关的一项操作。",
      state: "逐步记录ensure后处理造成的对象、控制或边界变化。",
      evidence:
        "定位“捕获过宽异常并返回成功值，掩盖状态已经不可信”出现时的第一处不同状态。",
    },
    {
      label: "验收主动抛出异常",
      input: "恢复基线，再以主动抛出异常覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：只捕获当前层能够恢复的异常，资源清理覆盖成功和失败路径。",
      evidence:
        "交付第10章 错误处理与异常的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定错误处理的输入和接收者",
    "执行begin、rescue与else并记录状态",
    "观察ensure后处理的返回或副作用",
    "用主动抛出异常核对不变量并复位",
  ],
  failureTrace: [
    "保持第10章 错误处理与异常的输入与初值不变",
    "仅注入故障：捕获过宽异常并返回成功值，掩盖状态已经不可信",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "只捕获当前层能够恢复的异常，资源清理覆盖成功和失败路径。",
  fault: "捕获过宽异常并返回成功值，掩盖状态已经不可信",
  artifact:
    "第10章 错误处理与异常的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubErrorsExceptionsObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubErrorsExceptionsControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubErrorsExceptionsBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
