"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-02",
  title: "Lesson 2：C++ 的基本结构",
  question: "一条输入怎样经过 main 和语句顺序变成可验证的标准输出？",
  concepts: ["C++ 程序基本结构", "屏幕输出", "键盘输入", "注释"],
  steps: [
    {
      label: "输入与前置条件",
      contract:
        "为C++ 程序基本结构声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence:
        "保存Lesson 2：C++ 的基本结构的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释屏幕输出改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“输入流失败后仍读取未建立的值”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“成功读取前不得使用输入值，程序只从已验证状态生成输出。”。",
      evidence:
        "交付输入文本、流状态、变量初始化值、语句顺序、标准输出与退出码。",
    },
  ],
  normalTrace: [
    "进入 main",
    "输出明确提示",
    "验证 cin 读取成功",
    "用已初始化值计算并返回",
  ],
  failureTrace: [
    "提示与读取类型不一致",
    "cin 设置失败状态",
    "变量保持旧值或无效值",
    "输出看似正常但证据已断裂",
  ],
  invariant: "成功读取前不得使用输入值，程序只从已验证状态生成输出。",
  artifact: "输入文本、流状态、变量初始化值、语句顺序、标准输出与退出码。",
  fault: "输入流失败后仍读取未建立的值",
} satisfies CppEvidenceModel;

export function EasyCppBasicsContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppBasicsTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppBasicsFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
