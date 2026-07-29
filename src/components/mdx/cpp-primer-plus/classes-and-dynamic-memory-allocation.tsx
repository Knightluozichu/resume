"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么一个指针成员会改变整个类的复制语义",
    mechanism:
      "类与动态内存（dynamic memory and classes）的风险不在 new 语法本身，而在对象是否宣称拥有那块存储。编译器生成的复制操作按成员复制：整数复制值，指针也只复制地址。若两个对象都认为自己是唯一 owner，它们会修改同一缓冲区，并在析构时释放同一地址两次。",
    failure:
      "若只复述「为什么一个指针成员会改变整个类的复制语义」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么一个指针成员会改变整个类的复制语义」的状态变化。",
  },
  {
    label: "析构函数只解决一个对象的退出路径",
    mechanism:
      "构造函数先分配并建立字符串值，析构函数使用与分配匹配的 delete[] 。析构必须能处理每个成功构造的状态，并且不能让异常逃出。静态成员计数可以观察存活对象数量，但它是类级共享状态，不属于每个对象。",
    failure:
      "若只复述「析构函数只解决一个对象的退出路径」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「析构函数只解决一个对象的退出路径」的状态变化。",
  },
  {
    label: "复制构造函数建立独立的新对象",
    mechanism:
      "复制构造函数（copy constructor）通常接收 const Class& ，用于以同类型对象初始化新对象。复制初始化、按值传参、按值返回（是否消除复制由规则决定）和容器操作都可能需要它。深复制要分配独立存储并复制完整值。",
    failure:
      "若只复述「复制构造函数建立独立的新对象」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「复制构造函数建立独立的新对象」的状态变化。",
  },
];

export function ClassesAndDynamicMemoryAllocationDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 12：Classes and Dynamic Memory Allocation：机制与证据"
      prompt="切换《Chapter 12：Classes and Dynamic Memory Allocation》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 12：Classes and Dynamic Memory Allocation》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ClassesAndDynamicMemoryAllocationMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 12：Classes and Dynamic Memory Allocation：机制路径"
      stages={STAGES}
    />
  );
}

export function ClassesAndDynamicMemoryAllocationFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 12：Classes and Dynamic Memory Allocation：失效与核验"
      stages={STAGES}
    />
  );
}
