"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-11",
  title: "Lesson 11：各种类型",
  question: "哪种用户定义类型能让非法状态最难表达，并保留清晰的活动成员证据？",
  concepts: ["结构体", "枚举", "联合体", "类型别名"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为结构体声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence: "保存Lesson 11：各种类型的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释枚举改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“联合体写入一个成员后按另一个成员解释同一存储”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“对象的标签与当前活动数据成员同步，读取方式与最近一次有效写入一致。”。",
      evidence:
        "交付类型选择理由、对象布局、标签、活动成员、写入读取序列和非法状态反例。",
    },
  ],
  normalTrace: [
    "选择能表达状态的类型",
    "初始化标签与数据",
    "只读取活动成员",
    "转换状态时同步更新",
  ],
  failureTrace: [
    "写入整型成员",
    "标签仍声称浮点成员活动",
    "按错误成员读取",
    "位模式被误当有效数值",
  ],
  invariant:
    "对象的标签与当前活动数据成员同步，读取方式与最近一次有效写入一致。",
  artifact:
    "类型选择理由、对象布局、标签、活动成员、写入读取序列和非法状态反例。",
  fault: "联合体写入一个成员后按另一个成员解释同一存储",
} satisfies CppEvidenceModel;

export function EasyCppVariousTypesContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppVariousTypesTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppVariousTypesFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
