"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-16",
  title: "Lesson 16：文件输入输出",
  question:
    "怎样证明写出的格式能被同一协议完整读回，并区分正常结束与读取失败？",
  concepts: ["文件", "文件输出", "文件输入", "打开文件", "输入输出错误"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为文件声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence:
        "保存Lesson 16：文件输入输出的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释文件输出改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“打开失败后仍进入读取循环并使用上一轮值”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“每次读写后检查流状态，成功往返后关键字段与原对象一致。”。",
      evidence:
        "交付规范化路径、打开模式、文件内容、每步流状态、读写字段数、往返差异和错误消息。",
    },
  ],
  normalTrace: [
    "解析并记录路径与模式",
    "验证文件成功打开",
    "逐项读写并检查流状态",
    "往返比较原值与读回值",
  ],
  failureTrace: [
    "路径不存在导致打开失败",
    "代码忽略 fail 状态",
    "变量保留上一轮内容",
    "重复输出被误判为文件数据",
  ],
  invariant: "每次读写后检查流状态，成功往返后关键字段与原对象一致。",
  artifact:
    "规范化路径、打开模式、文件内容、每步流状态、读写字段数、往返差异和错误消息。",
  fault: "打开失败后仍进入读取循环并使用上一轮值",
} satisfies CppEvidenceModel;

export function EasyCppFileIoContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppFileIoTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppFileIoFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
