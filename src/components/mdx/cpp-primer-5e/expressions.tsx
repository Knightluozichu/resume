"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：程序里每一个“算”都有规矩",
    mechanism:
      "想象一条工厂流水线：原料从一端进入，经过切割、打磨、组装、喷漆——每一步都有固定的顺序，不能先喷漆再切割。每一步的操作员也只认特定规格的原料：你给切割工塞一块布，他只会摇头。",
    failure:
      "若把「直觉：程序里每一个“算”都有规矩」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：程序里每一个“算”都有规矩」的契约。",
  },
  {
    label: '表达式——把"计算"写出来',
    mechanism:
      '在 C++ 里， 表达式（expression） 就是你告诉计算机"算一下这个"的基本单位。一个最简单的表达式可以只是一个变量名或一个字面值（比如 42 或 x ），它们本身就是一个求值结果。一旦你把运算符和操作数组合起来——比如 a + b c ——就形成了一个更复杂的表达式。',
    failure:
      '若把「表达式——把"计算"写出来」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。',
    evidence:
      '保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「表达式——把"计算"写出来」的契约。',
  },
  {
    label: "官方运算符族与求值契约",
    mechanism:
      "Chapter 4 还包括 logical/relational operators、member access、conditional、bitwise、 sizeof 、comma operator 和 order of evaluation。它们不能只靠优先级表带过，因为“表达式怎样分组”和“操作数何时求值”是两套规则。",
    failure:
      "若把「官方运算符族与求值契约」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「官方运算符族与求值契约」的契约。",
  },
];

export function ExpressionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="表达式：机制与证据"
      prompt="切换《表达式》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《表达式》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ExpressionsMechanismMap() {
  return <ChapterMechanismMap title="表达式：机制路径" stages={STAGES} />;
}

export function ExpressionsFailureDiagram() {
  return <ChapterFailureMatrix title="表达式：失效与核验" stages={STAGES} />;
}
