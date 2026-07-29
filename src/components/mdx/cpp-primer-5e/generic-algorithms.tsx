"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：为什么 100 种容器不能有 100 种算法？",
    mechanism:
      '你已经学了六种容器——每种都有自己的一套操作接口。如果要在 vector 里找一个值，你会写一个循环；要在 list 里找同样的值，再写一个循环——除了容器名字变了，代码几乎一模一样。难道每学一种新容器，就要把排序、查找、计数这些"工序"重写一遍？',
    failure:
      "若把「直觉：为什么 100 种容器不能有 100 种算法？」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：为什么 100 种容器不能有 100 种算法？」的契约。",
  },
  {
    label: "算法不认识容器——只认迭代器",
    mechanism:
      "C++ 标准库提供大量 泛型算法（generic algorithm） ——它们被设计成与容器类型解耦。算法不是容器的成员函数，也不直接拥有容器——它们依靠 迭代器范围（iterator range） 与迭代器能力工作。并非每个算法适用于每个容器，例如 sort 需要随机访问， list 必须使用成员 sort 。",
    failure:
      "若把「算法不认识容器——只认迭代器」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「算法不认识容器——只认迭代器」的契约。",
  },
  {
    label: "官方 Chapter 10 的完整算法契约",
    mechanism:
      "泛型并不意味着“任何算法都能接任何迭代器”。每个算法声明最低能力，调用者提供满足能力的范围、操作和输出位置；算法通常只重排或改写元素，不会替容器插入或删除元素。",
    failure:
      "若把「官方 Chapter 10 的完整算法契约」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「官方 Chapter 10 的完整算法契约」的契约。",
  },
];

export function GenericAlgorithmsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="泛型算法：机制与证据"
      prompt="切换《泛型算法》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《泛型算法》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function GenericAlgorithmsMechanismMap() {
  return <ChapterMechanismMap title="泛型算法：机制路径" stages={STAGES} />;
}

export function GenericAlgorithmsFailureDiagram() {
  return <ChapterFailureMatrix title="泛型算法：失效与核验" stages={STAGES} />;
}
