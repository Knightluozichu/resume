"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：为什么需要模板",
    mechanism:
      '你写了一个排序函数——接受 int 数组排序。老板说"同样的排序逻辑， double 数组也要"。你复制粘贴，改了类型。老板又说 string 数组也要、 long 也要——你复制了四次几乎一模一样的代码，只改了类型名。每次代码逻辑出现 bug，你要改四个地方。这显然不是一个好办法。',
    failure:
      "若把「直觉：为什么需要模板」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：为什么需要模板」的契约。",
  },
  {
    label: "官方 Chapter 16 的完整模板解析链",
    mechanism:
      "模板调用不是简单的文本替换。编译器先形成候选，推断模板实参，进行重载决议与模板偏序，再把选中模式代入并检查实例语义。某个类型能写进模板参数，不代表模板体里的全部操作对它都有效。",
    failure:
      "若把「官方 Chapter 16 的完整模板解析链」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「官方 Chapter 16 的完整模板解析链」的契约。",
  },
  {
    label: "函数模板：从具体函数到类型无关的公式",
    mechanism: "你写 int max(int a, int b) return a b ?",
    failure:
      "若把「函数模板：从具体函数到类型无关的公式」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「函数模板：从具体函数到类型无关的公式」的契约。",
  },
];

export function TemplatesDecisionLab() {
  return (
    <ChapterDecisionLab
      title="模板与泛型编程：机制与证据"
      prompt="切换《模板与泛型编程》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《模板与泛型编程》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function TemplatesMechanismMap() {
  return (
    <ChapterMechanismMap title="模板与泛型编程：机制路径" stages={STAGES} />
  );
}

export function TemplatesFailureDiagram() {
  return (
    <ChapterFailureMatrix title="模板与泛型编程：失效与核验" stages={STAGES} />
  );
}
