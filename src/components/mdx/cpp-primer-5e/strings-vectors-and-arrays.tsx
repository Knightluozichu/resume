"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么要学这三种「装数据的家伙」？",
    mechanism:
      "前面你已经会声明单个变量—— int x = 5; 、 double pi = 3.14; 。但真实程序里很少只有一个数：你要存全班 50 个同学的成绩、要处理用户输入的一整行文字、要记住游戏里 100 个敌人的位置。一个变量装一个数据——装 100 个难道要写 100 个变量？不可能。",
    failure:
      "若把「为什么要学这三种「装数据的家伙」？」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「为什么要学这三种「装数据的家伙」？」的契约。",
  },
  {
    label: "第一个箱子：专门装文字的 string",
    mechanism:
      '在 C 语言里，一段文字是这样存的： char name[] = "Alice"; ——栈上挤出 6 个格子，A、l、i、c、e、\\0 排好。这六个格子写死了：你永远不能把 "Alice" 换成 "Alice Cooper"——格子的个数在出生时就定好了，改不了。',
    failure:
      "若把「第一个箱子：专门装文字的 string」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「第一个箱子：专门装文字的 string」的契约。",
  },
  {
    label: "第二个箱子：能自动伸缩的 vector",
    mechanism:
      "你存全班 50 个成绩，用固定的语法写 50 个 int 变量是不可能的。你需要一个「格子串」——它得满足三件事：①能存很多个同类型的值；②不用提前知道到底存几个；③能把值轻松地塞进去、查出来、遍历一遍。官方这一节叫 Library vector Type （vector 类型）；C++ 标准库给你准备了 vector 这个容器。",
    failure:
      "若把「第二个箱子：能自动伸缩的 vector」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「第二个箱子：能自动伸缩的 vector」的契约。",
  },
];

export function StringsVectorsAndArraysDecisionLab() {
  return (
    <ChapterDecisionLab
      title="字符串、向量和数组：机制与证据"
      prompt="切换《字符串、向量和数组》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《字符串、向量和数组》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StringsVectorsAndArraysMechanismMap() {
  return (
    <ChapterMechanismMap title="字符串、向量和数组：机制路径" stages={STAGES} />
  );
}

export function StringsVectorsAndArraysFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="字符串、向量和数组：失效与核验"
      stages={STAGES}
    />
  );
}
