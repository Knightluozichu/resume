"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-01",
  title: "Lesson 1：迈出第一步",
  question: "怎样证明当前运行的可执行文件确实来自刚刚保存的源代码？",
  concepts: ["程序", "C++ 开发环境", "源代码", "编译"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为程序声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence: "保存Lesson 1：迈出第一步的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释C++ 开发环境改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“修改源代码后不重新编译，继续运行陈旧产物”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“源文件哈希不变时重建产物一致，修改后时间戳和运行输出都必须对应新版本。”。",
      evidence:
        "交付源文件路径与哈希、完整构建命令、诊断、可执行文件时间戳、标准输出和退出状态。",
    },
  ],
  normalTrace: [
    "保存唯一源文件",
    "启用告警完成编译与链接",
    "运行新产物",
    "核对输出和退出状态",
  ],
  failureTrace: [
    "编辑未保存的缓冲区",
    "构建命令仍指向旧目录",
    "运行旧可执行文件",
    "把陈旧输出误判为代码逻辑",
  ],
  invariant:
    "源文件哈希不变时重建产物一致，修改后时间戳和运行输出都必须对应新版本。",
  artifact:
    "源文件路径与哈希、完整构建命令、诊断、可执行文件时间戳、标准输出和退出状态。",
  fault: "修改源代码后不重新编译，继续运行陈旧产物",
} satisfies CppEvidenceModel;

export function EasyCppFirstStepsContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppFirstStepsTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppFirstStepsFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
