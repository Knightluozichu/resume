"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么“像指针”不是设计的全部",
    mechanism:
      "Smart Pointers 101 从 RAII 开始：object 持有 resource handle，constructor 建立 ownership，destructor 释放； operator / operator- 提供 pointer-like access。这样 exceptio…",
    failure:
      "若只复制「为什么“像指针”不是设计的全部」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「为什么“像指针”不是设计的全部」的组合规则与扩展边界。",
  },
  {
    label: "Smart Pointers' Storage",
    mechanism:
      "Storage of Smart Pointers 决定底层表示和 primitive operations：保存 T 还是 custom handle；怎样返回 pointer/reference；销毁用 delete 、 delete[] 、 free 或 custom deleter；null value 是什么。",
    failure:
      "若只复制「Smart Pointers' Storage」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Smart Pointers' Storage」的组合规则与扩展边界。",
  },
  {
    label: "Smart Pointer Member Functions",
    mechanism:
      "Smart Pointer Member Functions 包括 constructor、copy/move、assignment、destructor、 operator 、 operator- 、 get 、 swap 与 boolean test。每个成员都横跨 Policies：copy …",
    failure:
      "若只复制「Smart Pointer Member Functions」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Smart Pointer Member Functions」的组合规则与扩展边界。",
  },
];

export function SmartPointersDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第7章：智能指针：机制与证据"
      prompt="切换《第7章：智能指针》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第7章：智能指针》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SmartPointersMechanismMap() {
  return (
    <ChapterMechanismMap title="第7章：智能指针：机制路径" stages={STAGES} />
  );
}

export function SmartPointersFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第7章：智能指针：失效与核验" stages={STAGES} />
  );
}
