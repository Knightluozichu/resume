"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-21",
  title: "第21章 Proc类",
  question: "怎样解释 Proc、lambda、块参数转换与 return 的控制流差异？",
  concepts: [
    "Proc类是什么",
    "lambda表达式",
    "通过Proc参数接收块",
    "to_proc方法",
    "Proc的特征",
    "Proc类的实例方法",
  ],
  stages: [
    {
      label: "建立Proc类是什么输入",
      input: "固定Proc类是什么所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明lambda表达式的允许状态。",
      evidence: "保存第21章 Proc类的初值、参数、编码或资源位置。",
    },
    {
      label: "执行lambda表达式",
      input: "保持相同输入，只改变与lambda表达式直接相关的一项操作。",
      state: "逐步记录通过Proc参数接收块造成的对象、控制或边界变化。",
      evidence:
        "定位“把 lambda 与 Proc 的参数和 return 语义视为完全相同”出现时的第一处不同状态。",
    },
    {
      label: "验收Proc类的实例方法",
      input: "恢复基线，再以Proc类的实例方法覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：参数严格度、调用位置、捕获变量和返回目标在执行前已声明。",
      evidence:
        "交付第21章 Proc类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定Proc类是什么的输入和接收者",
    "执行lambda表达式并记录状态",
    "观察通过Proc参数接收块的返回或副作用",
    "用Proc类的实例方法核对不变量并复位",
  ],
  failureTrace: [
    "保持第21章 Proc类的输入与初值不变",
    "仅注入故障：把 lambda 与 Proc 的参数和 return 语义视为完全相同",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "参数严格度、调用位置、捕获变量和返回目标在执行前已声明。",
  fault: "把 lambda 与 Proc 的参数和 return 语义视为完全相同",
  artifact:
    "第21章 Proc类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubProcObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubProcControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubProcBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
