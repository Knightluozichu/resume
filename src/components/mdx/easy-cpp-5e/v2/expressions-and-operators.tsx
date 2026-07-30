"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-04",
  title: "Lesson 4：表达式与运算符",
  question: "怎样在运行前预测表达式的结果类型和值，而不是凭数学直觉猜测？",
  concepts: ["表达式", "算术运算符", "赋值运算符", "运算符优先级", "类型转换"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为表达式声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence:
        "保存Lesson 4：表达式与运算符的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释算术运算符改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“把整数除法结果赋给浮点变量后才期待保留小数”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“每个中间表达式的类型和范围明确，关键转换通过代码显式表达。”。",
      evidence:
        "交付原表达式、加括号版本、各中间类型和值、转换位置、边界输入和预期输出。",
    },
  ],
  normalTrace: [
    "标注操作数类型",
    "按括号与优先级分组",
    "计算中间结果",
    "显式转换并核对范围",
  ],
  failureTrace: [
    "忽略两个操作数都是整数",
    "先执行截断除法",
    "结果再转为 double",
    "错误小数无法恢复",
  ],
  invariant: "每个中间表达式的类型和范围明确，关键转换通过代码显式表达。",
  artifact:
    "原表达式、加括号版本、各中间类型和值、转换位置、边界输入和预期输出。",
  fault: "把整数除法结果赋给浮点变量后才期待保留小数",
} satisfies CppEvidenceModel;

export function EasyCppExpressionsContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppExpressionsTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppExpressionsFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
