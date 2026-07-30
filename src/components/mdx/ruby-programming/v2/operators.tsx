"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-09",
  title: "第9章 运算符",
  question: "怎样从解析优先级、接收者分派与返回类型解释运算符表达式？",
  concepts: [
    "赋值运算符",
    "逻辑运算符的应用",
    "条件运算符",
    "范围运算符",
    "运算符的优先级",
    "定义二元运算符",
    "定义一元运算符",
    "下标方法",
  ],
  stages: [
    {
      label: "建立赋值运算符输入",
      input: "固定赋值运算符所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明逻辑运算符的应用的允许状态。",
      evidence: "保存第9章 运算符的初值、参数、编码或资源位置。",
    },
    {
      label: "执行逻辑运算符的应用",
      input: "保持相同输入，只改变与逻辑运算符的应用直接相关的一项操作。",
      state: "逐步记录条件运算符造成的对象、控制或边界变化。",
      evidence:
        "定位“凭数学直觉读取优先级，忽略运算符实际派发到接收者方法”出现时的第一处不同状态。",
    },
    {
      label: "验收下标方法",
      input: "恢复基线，再以下标方法覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：加括号后的语法树、方法调用和中间值与最终结果一致。",
      evidence:
        "交付第9章 运算符的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定赋值运算符的输入和接收者",
    "执行逻辑运算符的应用并记录状态",
    "观察条件运算符的返回或副作用",
    "用下标方法核对不变量并复位",
  ],
  failureTrace: [
    "保持第9章 运算符的输入与初值不变",
    "仅注入故障：凭数学直觉读取优先级，忽略运算符实际派发到接收者方法",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "加括号后的语法树、方法调用和中间值与最终结果一致。",
  fault: "凭数学直觉读取优先级，忽略运算符实际派发到接收者方法",
  artifact:
    "第9章 运算符的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubOperatorsObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubOperatorsControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubOperatorsBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
