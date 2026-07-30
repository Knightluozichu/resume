"use client";

import { CppEvidenceLab, type CppEvidenceModel } from "./cpp-evidence-lab";

const model = {
  unitId: "ecp-15",
  title: "Lesson 15：类的高级主题",
  question:
    "怎样让开放的多态接口扩展新类型，同时避免不安全向下转换和所有权混乱？",
  concepts: ["多态", "抽象类", "纯虚函数", "多重继承", "类与指针"],
  steps: [
    {
      label: "输入与前置条件",
      contract: "为多态声明输入类型、有效范围、对象生命周期和失败策略。",
      evidence:
        "保存Lesson 15：类的高级主题的原始输入、初值与第一条可检查诊断。",
    },
    {
      label: "状态变化",
      contract: "逐步解释抽象类改变了哪个值、对象或构建产物。",
      evidence:
        "记录每步前后状态，并定位“未经验证把基类指针强制转换为错误派生类型”造成的首个分岔。",
    },
    {
      label: "结果与复位",
      contract:
        "输出、诊断和退出状态都必须能回到“调用者只依赖抽象接口，动态对象生命周期覆盖全部虚调用且析构路径完整。”。",
      evidence:
        "交付抽象接口、动态类型、派发轨迹、转换检查、多重继承路径、所有权和析构日志。",
    },
  ],
  normalTrace: [
    "通过抽象接口持有对象",
    "虚调用按动态类型派发",
    "不需要具体派生假设",
    "通过虚析构释放",
  ],
  failureTrace: [
    "调用者猜测具体类型",
    "执行错误向下转换",
    "访问不存在的派生成员",
    "未定义行为破坏对象状态",
  ],
  invariant:
    "调用者只依赖抽象接口，动态对象生命周期覆盖全部虚调用且析构路径完整。",
  artifact:
    "抽象接口、动态类型、派发轨迹、转换检查、多重继承路径、所有权和析构日志。",
  fault: "未经验证把基类指针强制转换为错误派生类型",
} satisfies CppEvidenceModel;

export function EasyCppAdvancedClassesContractLab() {
  return <CppEvidenceLab model={model} view="contract" />;
}

export function EasyCppAdvancedClassesTraceLab() {
  return <CppEvidenceLab model={model} view="trace" />;
}

export function EasyCppAdvancedClassesFaultLab() {
  return <CppEvidenceLab model={model} view="fault" />;
}
