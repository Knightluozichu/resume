"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么需要这些特殊工具",
    mechanism:
      '你已经学完了 C++ 的核心——变量、容器、算法、类、模板。这些已经够你写 90% 的程序。但还有一撮"特殊场景"——它们不常用，可一但到了那个场景，没有这些工具就非常难受。这四种工具是标准库为你准备的"特种兵"——平时不显眼，该出手时一招制敌。',
    failure:
      "若把「为什么需要这些特殊工具」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「为什么需要这些特殊工具」的契约。",
  },
  {
    label: "tuple：把不同类型捆成一个包裹",
    mechanism:
      "有时你需要从函数返回三个值——一个 int 、一个 double 、一个 string 。为一次局部组合专门定义具名类未必划算。",
    failure:
      "若把「tuple：把不同类型捆成一个包裹」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「tuple：把不同类型捆成一个包裹」的契约。",
  },
  {
    label: "bitset：把二进制位当作独立对象来操作",
    mechanism:
      "标志位是编程里最古老的数据模式之一——一个整数代表若干开关，每个 bit 开/关表示某个状态。以前你用 int flags + & ^ ~ 手动操作每一位——容易写错、不可读。",
    failure:
      "若把「bitset：把二进制位当作独立对象来操作」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「bitset：把二进制位当作独立对象来操作」的契约。",
  },
];

export function SpecializedLibraryDecisionLab() {
  return (
    <ChapterDecisionLab
      title="标准库特殊设施：机制与证据"
      prompt="切换《标准库特殊设施》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《标准库特殊设施》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function SpecializedLibraryMechanismMap() {
  return (
    <ChapterMechanismMap title="标准库特殊设施：机制路径" stages={STAGES} />
  );
}

export function SpecializedLibraryFailureDiagram() {
  return (
    <ChapterFailureMatrix title="标准库特殊设施：失效与核验" stages={STAGES} />
  );
}
