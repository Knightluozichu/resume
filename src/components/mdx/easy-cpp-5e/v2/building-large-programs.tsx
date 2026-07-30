"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-10",
  title: "Lesson 10：构建大型程序",
  question: "怎样区分预处理、编译和链接错误，并定位声明与定义跨文件的责任？",
  concepts: ["拆分文件", "头文件", "分离编译", "作用域", "命名空间"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为拆分文件声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence:
        "保存Lesson 10：构建大型程序的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释头文件改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“把同一个非 inline 函数定义写进头文件并由多个源文件包含”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“共享接口只有一致声明，非 inline 定义在整个程序中恰有一个。”。",
      evidence:
        "交付依赖图、预处理结果、各编译命令、目标文件符号表、链接命令和诊断阶段。",
    },
  ],
  normalTrace: [
    "头文件提供受保护声明",
    "各源文件独立编译",
    "链接唯一外部定义",
    "运行跨模块调用",
  ],
  failureTrace: [
    "多个翻译单元展开同一定义",
    "各自编译成功",
    "链接发现重复符号",
    "错误被误判为 include 次序",
  ],
  invariant: "共享接口只有一致声明，非 inline 定义在整个程序中恰有一个。",
  artifact:
    "依赖图、预处理结果、各编译命令、目标文件符号表、链接命令和诊断阶段。",
  fault: "把同一个非 inline 函数定义写进头文件并由多个源文件包含",
} satisfies CppEvidenceModel;

export function EasyCppLargeProgramsContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppLargeProgramsTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppLargeProgramsFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
