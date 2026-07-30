"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-08",
  title: "Lesson 8：指针",
  question: "一次解引用需要哪些对象存在性、类型、生命周期和所有权前提？",
  concepts: ["地址", "指针", "解引用", "引用", "动态内存"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为地址声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence: "保存Lesson 8：指针的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释指针改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“delete 后保留原地址并再次解引用”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“被解引用地址指向仍在生命周期内且类型匹配的对象，并且释放责任唯一。”。",
      evidence:
        "交付对象创建点、地址、所有者、借用范围、释放点、空值状态和检测器诊断。",
    },
  ],
  normalTrace: [
    "创建对象并取得地址",
    "检查指针非空与类型",
    "在对象生命周期内解引用",
    "释放后立即清除所有权状态",
  ],
  failureTrace: [
    "动态对象已经释放",
    "指针仍保存旧地址",
    "再次解引用悬空指针",
    "表面数值掩盖未定义行为",
  ],
  invariant:
    "被解引用地址指向仍在生命周期内且类型匹配的对象，并且释放责任唯一。",
  artifact:
    "对象创建点、地址、所有者、借用范围、释放点、空值状态和检测器诊断。",
  fault: "delete 后保留原地址并再次解引用",
} satisfies CppEvidenceModel;

export function EasyCppPointersContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppPointersTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppPointersFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
