"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-09",
  title: "Lesson 9：数组",
  question: "怎样证明每次下标访问都落在当前有效区间，而不是只落在分配容量内？",
  concepts: ["数组", "数组初始化", "多维数组", "数组与指针", "字符串"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为数组声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence: "保存Lesson 9：数组的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释数组初始化改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“循环条件使用小于等于长度，访问末尾后一项”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“访问下标严格小于有效长度，多维索引映射与字符串终止规则保持一致。”。",
      evidence:
        "交付数组容量、有效长度、每次下标、多维映射、终止字符位置和地址检测结果。",
    },
  ],
  normalTrace: [
    "声明容量和有效长度",
    "生成合法下标",
    "完成元素访问",
    "核对最后一个合法位置",
  ],
  failureTrace: [
    "把长度当作最后下标",
    "循环到 index 等于 length",
    "越界读写相邻内存",
    "输出偶然正确",
  ],
  invariant: "访问下标严格小于有效长度，多维索引映射与字符串终止规则保持一致。",
  artifact:
    "数组容量、有效长度、每次下标、多维映射、终止字符位置和地址检测结果。",
  fault: "循环条件使用小于等于长度，访问末尾后一项",
} satisfies CppEvidenceModel;

export function EasyCppArraysContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppArraysTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppArraysFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
