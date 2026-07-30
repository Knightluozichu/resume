"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-12",
  title: "Lesson 12：类的基本",
  question:
    "怎样让每个公开操作都保持对象有效，而不是把 private 仅当作语法限制？",
  concepts: ["类", "对象", "数据成员", "成员函数", "访问控制"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为类声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence: "保存Lesson 12：类的基本的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释对象改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“暴露可写数据成员，使调用者绕过验证直接破坏状态”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“对象从构造完成到析构开始始终满足公开声明的不变量。”。",
      evidence:
        "交付类接口、构造初值、对象不变量、公开操作前后状态、非法输入和封装反例。",
    },
  ],
  normalTrace: [
    "构造有效对象",
    "通过公开成员验证输入",
    "更新私有状态",
    "从公开观察验证不变量",
  ],
  failureTrace: [
    "调用者直接写数据成员",
    "非法值绕过成员函数",
    "后续操作读取破坏状态",
    "错误远离根因出现",
  ],
  invariant: "对象从构造完成到析构开始始终满足公开声明的不变量。",
  artifact:
    "类接口、构造初值、对象不变量、公开操作前后状态、非法输入和封装反例。",
  fault: "暴露可写数据成员，使调用者绕过验证直接破坏状态",
} satisfies CppEvidenceModel;

export function EasyCppClassBasicsContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppClassBasicsTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppClassBasicsFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
