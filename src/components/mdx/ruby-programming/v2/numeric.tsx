"use client";

import { RubyEvidenceLab, type RubyEvidenceModel } from "./ruby-evidence-lab";

const model = {
  unitId: "tr5-12",
  title: "第12章 数值类",
  question: "怎样为整数、浮点、随机数与近似比较选择正确数值域和边界？",
  concepts: [
    "数值类的构成",
    "数值的字面量",
    "算术运算",
    "Math模块",
    "数值类型转换",
    "位运算",
    "随机数",
    "计数",
    "近似值误差",
  ],
  stages: [
    {
      label: "建立数值类的构成输入",
      input: "固定数值类的构成所需的原始值、Ruby 版本和调用入口。",
      state: "在执行前记录接收者身份，并声明数值的字面量的允许状态。",
      evidence: "保存第12章 数值类的初值、参数、编码或资源位置。",
    },
    {
      label: "执行数值的字面量",
      input: "保持相同输入，只改变与数值的字面量直接相关的一项操作。",
      state: "逐步记录算术运算造成的对象、控制或边界变化。",
      evidence:
        "定位“先执行整数除法再转为浮点，错误的小数部分已经无法恢复”出现时的第一处不同状态。",
    },
    {
      label: "验收近似值误差",
      input: "恢复基线，再以近似值误差覆盖正常、错误和重复执行。",
      state:
        "最终状态必须重新满足：每个中间值的类型、范围、舍入策略和随机种子都明确。",
      evidence:
        "交付第12章 数值类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
    },
  ],
  normalTrace: [
    "固定数值类的构成的输入和接收者",
    "执行数值的字面量并记录状态",
    "观察算术运算的返回或副作用",
    "用近似值误差核对不变量并复位",
  ],
  failureTrace: [
    "保持第12章 数值类的输入与初值不变",
    "仅注入故障：先执行整数除法再转为浮点，错误的小数部分已经无法恢复",
    "记录首个对象、控制或边界分岔",
    "拒绝把最终现象误当成根因",
  ],
  invariant: "每个中间值的类型、范围、舍入策略和随机种子都明确。",
  fault: "先执行整数除法再转为浮点，错误的小数部分已经无法恢复",
  artifact:
    "第12章 数值类的输入样本、接收者与方法、关键状态前后值、正常与失败输出、异常或退出状态，以及复位后的再次运行记录。",
} satisfies RubyEvidenceModel;

export function RubNumericObjectModelLab() {
  return <RubyEvidenceLab model={model} view="object-model" />;
}

export function RubNumericControlTraceLab() {
  return <RubyEvidenceLab model={model} view="control-trace" />;
}

export function RubNumericBoundaryProbeLab() {
  return <RubyEvidenceLab model={model} view="boundary-probe" />;
}
