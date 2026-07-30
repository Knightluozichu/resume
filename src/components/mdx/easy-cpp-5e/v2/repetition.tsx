"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-06",
  title: "Lesson 6：反复执行",
  question: "怎样同时证明循环不会越界、不会漏项，并且一定能到达终止条件？",
  concepts: [
    "for 循环",
    "while 循环",
    "do while 循环",
    "嵌套循环",
    "break 与 continue",
  ],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为for 循环声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence: "保存Lesson 6：反复执行的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释while 循环改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“continue 跳过状态推进，导致条件永远保持为真”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“每轮开始时已处理区间和待处理区间边界明确，推进量让剩余工作严格减少。”。",
      evidence:
        "交付初值、每轮索引、循环不变量、推进量、终止度量、最后状态和迭代次数。",
    },
  ],
  normalTrace: [
    "建立初值",
    "检查继续条件",
    "保持循环不变量",
    "推进并证明剩余量减少",
  ],
  failureTrace: [
    "条件成立进入循环",
    "分支触发 continue",
    "推进语句被跳过",
    "同一状态无限重放",
  ],
  invariant:
    "每轮开始时已处理区间和待处理区间边界明确，推进量让剩余工作严格减少。",
  artifact:
    "初值、每轮索引、循环不变量、推进量、终止度量、最后状态和迭代次数。",
  fault: "continue 跳过状态推进，导致条件永远保持为真",
} satisfies CppEvidenceModel;

export function EasyCppLoopsContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppLoopsTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppLoopsFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
