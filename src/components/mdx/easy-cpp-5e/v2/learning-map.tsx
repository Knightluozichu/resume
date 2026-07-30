"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "map",
  title: "高桥麻奈 C++ 入门教材第 5 版：16 课学习地图",
  question: "16 课怎样从单文件运行闭环逐步扩展到对象生命周期、多态和文件往返？",
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
        "保存高桥麻奈 C++ 入门教材第 5 版：16 课学习地图的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract:
        "逐步解释Lesson 2：C++ 的基本结构改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“按“语法、面向对象、文件”三大主题粗分，跳过指针、数组和分离编译的中间合同”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“每一课都能指出输入、状态变化、失败模式和可重放证据，并与相邻课程形成前后依赖。”。",
      evidence:
        "交付16 课依赖图、每课正式节点、正常与失败轨迹、编译阶段和综合项目验收表。",
    },
  ],
  normalTrace: [
    "建立编译运行闭环",
    "学习值、控制流和函数",
    "进入内存与模块边界",
    "用对象和文件完成综合证据",
  ],
  failureTrace: [
    "直接跳到类语法",
    "缺少变量与函数契约",
    "指针数组错误无法定位",
    "大型程序故障被归为面向对象问题",
  ],
  invariant:
    "每一课都能指出输入、状态变化、失败模式和可重放证据，并与相邻课程形成前后依赖。",
  artifact:
    "16 课依赖图、每课正式节点、正常与失败轨迹、编译阶段和综合项目验收表。",
  fault:
    "按“语法、面向对象、文件”三大主题粗分，跳过指针、数组和分离编译的中间合同",
} satisfies CppEvidenceModel;

export function EasyCppLearningMapContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppLearningMapTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppLearningMapFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
