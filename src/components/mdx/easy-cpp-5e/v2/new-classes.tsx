"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-14",
  title: "Lesson 14：新的类",
  question: "怎样证明派生对象能在所有基类契约允许的位置安全替换基类对象？",
  concepts: ["继承", "基类", "派生类", "重写", "虚函数"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为继承声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence: "保存Lesson 14：新的类的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释基类改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“按值传递派生对象给基类参数，发生对象切片”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“派生类不加强基类前置条件，虚调用和析构都保持基类公开契约。”。",
      evidence:
        "交付类层次、is-a 契约、构造析构顺序、静态动态类型、虚调用结果和切片反例。",
    },
  ],
  normalTrace: [
    "通过基类引用接收对象",
    "保留动态类型",
    "虚调用派发到覆盖函数",
    "经虚析构释放完整对象",
  ],
  failureTrace: [
    "按值复制到基类对象",
    "派生部分被切掉",
    "后续只剩基类状态",
    "行为与原动态对象不同",
  ],
  invariant: "派生类不加强基类前置条件，虚调用和析构都保持基类公开契约。",
  artifact:
    "类层次、is-a 契约、构造析构顺序、静态动态类型、虚调用结果和切片反例。",
  fault: "按值传递派生对象给基类参数，发生对象切片",
} satisfies CppEvidenceModel;

export function EasyCppNewClassesContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppNewClassesTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppNewClassesFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
