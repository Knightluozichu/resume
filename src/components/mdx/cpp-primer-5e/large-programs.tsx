"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么需要这三种大型工程工具",
    mechanism:
      '你已经掌握了类的设计、拷贝控制、模板——这些是写一个类的"微观本事"。但程序规模大到几百个类、几千行代码、甚至多团队协作时，你需要三样"宏观武器"来管住混乱——它们各自看守工程的一个维度。',
    failure:
      "若把「为什么需要这三种大型工程工具」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「为什么需要这三种大型工程工具」的契约。",
  },
  {
    label: "异常处理：从 throw 到异常安全的完整策略",
    mechanism:
      "程序运行时遇到文件打不开、内存耗尽或输入不合法，如何跨越多层调用报告失败？",
    failure:
      "若把「异常处理：从 throw 到异常安全的完整策略」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「异常处理：从 throw 到异常安全的完整策略」的契约。",
  },
  {
    label: "命名空间：工程规模的名字隔离系统",
    mechanism:
      '当一个工程同时用了两个 GitHub 上的第三方库——它们各自定义了一个叫 Logger 的类。如果这两个 Logger 全扔进全局——编译报"重复定义"，你怎么办？重命名其中的一个？修完这次，下次再撞怎么办？',
    failure:
      "若把「命名空间：工程规模的名字隔离系统」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「命名空间：工程规模的名字隔离系统」的契约。",
  },
];

export function LargeProgramsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="用于大型程序的工具：机制与证据"
      prompt="切换《用于大型程序的工具》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《用于大型程序的工具》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function LargeProgramsMechanismMap() {
  return (
    <ChapterMechanismMap title="用于大型程序的工具：机制路径" stages={STAGES} />
  );
}

export function LargeProgramsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="用于大型程序的工具：失效与核验"
      stages={STAGES}
    />
  );
}
