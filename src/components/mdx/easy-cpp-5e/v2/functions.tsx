"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-07",
  title: "Lesson 7：函数",
  question:
    "怎样从调用点追到唯一函数定义，并证明参数身份和返回生命周期都正确？",
  concepts: ["函数定义", "函数调用", "参数", "返回值", "函数重载"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为函数定义声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence: "保存Lesson 7：函数的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释函数调用改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“声明与定义签名不一致却只检查调用语法”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“声明、定义与调用签名一致，所有非 void 路径返回有效对象或值。”。",
      evidence:
        "交付声明、定义和调用签名、参数传递方式、重载候选、返回路径与链接器诊断。",
    },
  ],
  normalTrace: [
    "读取可见声明",
    "匹配实参与形参",
    "链接唯一匹配定义",
    "返回满足生命周期的结果",
  ],
  failureTrace: [
    "声明允许调用编译",
    "定义使用另一参数类型",
    "链接找不到目标符号",
    "误把链接失败当作语法错误",
  ],
  invariant: "声明、定义与调用签名一致，所有非 void 路径返回有效对象或值。",
  artifact:
    "声明、定义和调用签名、参数传递方式、重载候选、返回路径与链接器诊断。",
  fault: "声明与定义签名不一致却只检查调用语法",
} satisfies CppEvidenceModel;

export function EasyCppFunctionsContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppFunctionsTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppFunctionsFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
