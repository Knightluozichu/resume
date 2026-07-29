"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么访问授权、错误传播和类型探测都需要窄边界",
    mechanism:
      "friend、exception 与 RTTI 看似是三个附加主题，实际都在跨越普通局部边界：friend 跨 private 访问，throw 跨调用帧返回， dynamic cast 跨静态类型查看动态类型。越界能力越强，越要限制授予对象、传播范围和失败语义。",
    failure:
      "若只复述「为什么访问授权、错误传播和类型探测都需要窄边界」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么访问授权、错误传播和类型探测都需要窄边界」的状态变化。",
  },
  {
    label: "friend class 适合紧密但明确的协作",
    mechanism:
      "友元类（friend class）让被指定类的所有成员访问授权类的 private/protected 数据。友元关系不对称、不传递、不继承：A 把 B 设为 friend，不代表 A 能访问 B，也不代表 B 的派生类自动获得权限。",
    failure:
      "若只复述「friend class 适合紧密但明确的协作」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「friend class 适合紧密但明确的协作」的状态变化。",
  },
  {
    label: "friend member 把权限缩到一个成员函数",
    mechanism:
      "友元成员（friend member）只授权另一个类的指定成员。它减少意外依赖，但需要安排前置声明、类定义和成员定义顺序，让双方类型在使用点完整或已声明。",
    failure:
      "若只复述「friend member 把权限缩到一个成员函数」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「friend member 把权限缩到一个成员函数」的状态变化。",
  },
];

export function FriendsExceptionsAndMoreDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 15：Friends, Exceptions, and More：机制与证据"
      prompt="切换《Chapter 15：Friends, Exceptions, and More》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 15：Friends, Exceptions, and More》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FriendsExceptionsAndMoreMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 15：Friends, Exceptions, and More：机制路径"
      stages={STAGES}
    />
  );
}

export function FriendsExceptionsAndMoreFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 15：Friends, Exceptions, and More：失效与核验"
      stages={STAGES}
    />
  );
}
