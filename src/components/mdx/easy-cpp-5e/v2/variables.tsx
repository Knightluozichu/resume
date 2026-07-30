"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-03",
  title: "Lesson 3：变量",
  question: "名字、存储、类型解释和有效值怎样共同决定一次变量读取是否合法？",
  concepts: ["变量", "数据类型", "变量初始化", "常量"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为变量声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence: "保存Lesson 3：变量的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释数据类型改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“读取尚未初始化的局部变量”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“变量在每次读取前已经初始化，且其值满足类型与业务共同规定的范围。”。",
      evidence:
        "交付声明位置、初始化路径、作用域、更新前后值、编译器告警和边界输入。",
    },
  ],
  normalTrace: [
    "声明类型与名字",
    "用可检查值初始化",
    "在有效作用域内更新",
    "读取前验证范围",
  ],
  failureTrace: [
    "只声明不初始化",
    "控制流跳过赋值",
    "第一次读取发生",
    "未定义行为污染后续输出",
  ],
  invariant: "变量在每次读取前已经初始化，且其值满足类型与业务共同规定的范围。",
  artifact: "声明位置、初始化路径、作用域、更新前后值、编译器告警和边界输入。",
  fault: "读取尚未初始化的局部变量",
} satisfies CppEvidenceModel;

export function EasyCppVariablesContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppVariablesTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppVariablesFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
