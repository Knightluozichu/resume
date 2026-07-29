"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：为什么不能只用一种容器？",
    mechanism:
      "你已经学了用 vector 装数据——它简单好用，往末尾塞数据又快又稳。但如果你的程序需要在开头频繁插入、在中间随机删除、或者数据量巨大—— vector 就开始喘气了。",
    failure:
      "若把「直觉：为什么不能只用一种容器？」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：为什么不能只用一种容器？」的契约。",
  },
  {
    label: "种容器，六种底层结构",
    mechanism:
      "在 C++ 里， 顺序容器（sequential container） 就是按你插入的顺序存放元素的盒子——第一个塞进去的元素就在第一个位置。但不同的「盒子」内部结构完全不同——这决定了哪些操作快、哪些操作慢。",
    failure:
      "若把「种容器，六种底层结构」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「种容器，六种底层结构」的契约。",
  },
  {
    label: "所有容器都听你的同一套指令",
    mechanism:
      "不管你选了哪种容器，C++ 给你一套 迭代器（iterator） 让你用同样的方式遍历、读、写—— begin() 永远指第一个元素， end() 永远指最后一个元素之后的位置， iter 解引用得到元素自己。",
    failure:
      "若把「所有容器都听你的同一套指令」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「所有容器都听你的同一套指令」的契约。",
  },
];

export function SequentialContainersDecisionLab() {
  return (
    <ChapterDecisionLab
      title="顺序容器：机制与证据"
      prompt="切换《顺序容器》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《顺序容器》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SequentialContainersMechanismMap() {
  return <ChapterMechanismMap title="顺序容器：机制路径" stages={STAGES} />;
}

export function SequentialContainersFailureDiagram() {
  return <ChapterFailureMatrix title="顺序容器：失效与核验" stages={STAGES} />;
}
