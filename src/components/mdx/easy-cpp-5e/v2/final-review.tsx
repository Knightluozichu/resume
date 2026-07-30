"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "review",
  title: "高桥麻奈 C++ 入门教材第 5 版：16 课总复习",
  question:
    "怎样用一个可重放项目证明 16 课知识已经形成系统，而不是分别背过语法？",
  concepts: [
    "Lesson 1：迈出第一步",
    "Lesson 2：C++ 的基本结构",
    "Lesson 3：变量",
    "Lesson 4：表达式与运算符",
    "Lesson 5：按情况处理",
    "Lesson 6：反复执行",
    "Lesson 7：函数",
    "Lesson 8：指针",
    "Lesson 9：数组",
    "Lesson 10：构建大型程序",
    "Lesson 11：各种类型",
    "Lesson 12：类的基本",
    "Lesson 13：类的功能",
    "Lesson 14：新的类",
    "Lesson 15：类的高级主题",
    "Lesson 16：文件输入输出",
  ],
  steps: [
    {
      label: "输入与前置条件",
      contract:
        "为Lesson 1：迈出第一步声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence:
        "保存高桥麻奈 C++ 入门教材第 5 版：16 课总复习的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract:
        "逐步解释Lesson 2：C++ 的基本结构改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“只核对最终输出文本，不保存编译、边界、生命周期和流状态证据”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“同一输入文件和构建命令必须产生同一对象状态、输出文件与退出状态。”。",
      evidence:
        "交付干净构建日志、输入输出文件、边界表、对象生命周期、参数哈希、流状态和故障注入记录。",
    },
  ],
  normalTrace: [
    "从干净目录完整构建",
    "读取并验证记录",
    "通过对象接口计算结果",
    "写出文件并完成往返比较",
  ],
  failureTrace: [
    "复用旧目标文件",
    "输入失败沿用旧值",
    "对象资源状态被破坏",
    "最终文本偶然与期望相同",
  ],
  invariant: "同一输入文件和构建命令必须产生同一对象状态、输出文件与退出状态。",
  artifact:
    "干净构建日志、输入输出文件、边界表、对象生命周期、参数哈希、流状态和故障注入记录。",
  fault: "只核对最终输出文本，不保存编译、边界、生命周期和流状态证据",
} satisfies CppEvidenceModel;

export function EasyCppFinalReviewContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppFinalReviewTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppFinalReviewFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
