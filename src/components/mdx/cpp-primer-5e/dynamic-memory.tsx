"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：为什么你需要操心“谁负责清理”",
    mechanism:
      '在之前的章节里，你写的所有变量——int、string、vector——在离开大括号时都会自动消失。这就是"栈"上的变量：创建和销毁都由编译器管，你不用操心。',
    failure:
      "若把「直觉：为什么你需要操心“谁负责清理”」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：为什么你需要操心“谁负责清理”」的契约。",
  },
  {
    label: "智能指针：自动帮你打扫的三个兄弟",
    mechanism:
      "C++11 引入了三种 智能指针（smart pointer） ——它们把清理动作绑定到所有者对象的生命周期，减少手写释放路径，但不会自动替你判断所有权图是否正确。",
    failure:
      "若把「智能指针：自动帮你打扫的三个兄弟」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「智能指针：自动帮你打扫的三个兄弟」的契约。",
  },
  {
    label: "官方 Chapter 12 的完整所有权地图",
    mechanism:
      "原书从智能指针继续向下追到直接管理内存、动态数组、 allocator ，最后用文本查询程序证明共享所有权的价值。关键问题始终相同：谁拥有资源、谁只观察、何时对象被构造、何时删除器可安全运行。",
    failure:
      "若把「官方 Chapter 12 的完整所有权地图」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「官方 Chapter 12 的完整所有权地图」的契约。",
  },
];

export function DynamicMemoryDecisionLab() {
  return (
    <ChapterDecisionLab
      title="动态内存：机制与证据"
      prompt="切换《动态内存》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《动态内存》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function DynamicMemoryMechanismMap() {
  return <ChapterMechanismMap title="动态内存：机制路径" stages={STAGES} />;
}

export function DynamicMemoryFailureDiagram() {
  return <ChapterFailureMatrix title="动态内存：失效与核验" stages={STAGES} />;
}
