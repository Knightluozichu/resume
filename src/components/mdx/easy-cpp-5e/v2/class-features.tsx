"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-13",
  title: "Lesson 13：类的功能",
  question: "拥有资源的类怎样保证构造、复制、赋值和析构形成一致的所有权协议？",
  concepts: ["构造函数", "析构函数", "this 指针", "静态成员", "运算符重载"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为构造函数声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence: "保存Lesson 13：类的功能的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释析构函数改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“默认浅复制让两个对象析构时释放同一资源”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“每项资源恰有一个负责释放的所有者，复制或移动后所有对象仍处于有效状态。”。",
      evidence:
        "交付构造析构日志、资源地址、复制赋值策略、this 身份、静态计数和检测器结果。",
    },
  ],
  normalTrace: [
    "构造获得资源",
    "按明确策略复制或禁止复制",
    "维护各对象不变量",
    "每项资源只释放一次",
  ],
  failureTrace: [
    "默认复制原始指针",
    "两个对象共享所有权却无协议",
    "第一个析构释放资源",
    "第二个析构发生重复释放",
  ],
  invariant:
    "每项资源恰有一个负责释放的所有者，复制或移动后所有对象仍处于有效状态。",
  artifact:
    "构造析构日志、资源地址、复制赋值策略、this 身份、静态计数和检测器结果。",
  fault: "默认浅复制让两个对象析构时释放同一资源",
} satisfies CppEvidenceModel;

export function EasyCppClassFeaturesContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppClassFeaturesTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppClassFeaturesFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
