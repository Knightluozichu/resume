"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-05",
  title: "Lesson 5：按情况处理",
  question: "怎样证明所有互斥分支都可达、无重叠，并覆盖业务允许的完整输入域？",
  concepts: ["if 语句", "switch 语句", "关系运算符", "逻辑运算符"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为if 语句声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence: "保存Lesson 5：按情况处理的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释switch 语句改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“相邻区间在边界值上同时遗漏或重叠”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“任一合法输入恰好进入一个预期分支，非法输入进入显式拒绝路径。”。",
      evidence:
        "交付输入域、谓词真值表、最小边界集合、实际分支标签和拒绝路径。",
    },
  ],
  normalTrace: ["列出输入域", "写出互斥谓词", "生成边界表", "逐项核对唯一分支"],
  failureTrace: [
    "凭样例编写条件",
    "遗漏等号或顺序错误",
    "边界进入错误分支",
    "随机测试未触达缺口",
  ],
  invariant: "任一合法输入恰好进入一个预期分支，非法输入进入显式拒绝路径。",
  artifact: "输入域、谓词真值表、最小边界集合、实际分支标签和拒绝路径。",
  fault: "相邻区间在边界值上同时遗漏或重叠",
} satisfies CppEvidenceModel;

export function EasyCppConditionalsContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppConditionalsTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppConditionalsFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
