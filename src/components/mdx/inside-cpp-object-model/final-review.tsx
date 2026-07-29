"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“崩在虚调用，根因却不在虚表”开始",
    mechanism:
      "渲染主进程从 shared memory 读取节点快照，再把 bytes 放进 host object pool。节点行为由 plugin DSO 提供，hierarchy 同时使用 multiple inheritance 与 virtual base；启动时 constructor 调 virt…",
    failure:
      "若只从源码表面理解「从“崩在虚调用，根因却不在虚表”开始」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「从“崩在虚调用，根因却不在虚表”开始」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "事故代码与错误假设",
    mechanism:
      "struct Node : virtual Identity Node() registerType(); virtual void registerType() virtual void update() = 0; ;",
    failure:
      "若只从源码表面理解「事故代码与错误假设」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「事故代码与错误假设」，并区分标准语义与当前 ABI 实现。",
  },
  {
    label: "事件链：从错误表示到迟发崩溃",
    mechanism:
      "shared memory 中的 PluginNode bytes 包含 source process 的 vptr、string internal pointer，以及 virtual base adjustment 所依赖的 ABI representation。即便两进程使用同一 execut…",
    failure:
      "若只从源码表面理解「事件链：从错误表示到迟发崩溃」，忽略编译器生成布局、调用约定和生命周期代码，调试时就会把实现机制误当成语言承诺。",
    evidence:
      "用对象大小、成员地址、反汇编或构造析构轨迹核对「事件链：从错误表示到迟发崩溃」，并区分标准语义与当前 ABI 实现。",
  },
];

export function FinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="深度探索 C++ 对象模型：跨模块节点池综合复盘：机制与证据"
      prompt="切换《深度探索 C++ 对象模型：跨模块节点池综合复盘》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《深度探索 C++ 对象模型：跨模块节点池综合复盘》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="深度探索 C++ 对象模型：跨模块节点池综合复盘：机制路径"
      stages={STAGES}
    />
  );
}

export function FinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="深度探索 C++ 对象模型：跨模块节点池综合复盘：失效与核验"
      stages={STAGES}
    />
  );
}
