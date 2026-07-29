"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么标准库的价值是契约组合而不只是少写代码",
    mechanism:
      "标准库把常见资源和算法装进具有复制、生命周期、范围和失败语义的类型。 string 不只是可增长字符数组；container 不只是数据盒；algorithm 也不只是现成循环。它们通过迭代器和 callable contract 组合，让同一算法作用于多种表示。",
    failure:
      "若只复述「为什么标准库的价值是契约组合而不只是少写代码」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「为什么标准库的价值是契约组合而不只是少写代码」的状态变化。",
  },
  {
    label: "string class 把字符、长度与资源绑成值",
    mechanism:
      "string 类（ std::string ）拥有字符序列并保存长度，支持复制、移动和自动释放。它可以包含空字符，因此 size() 才是完整长度证据； c str() 提供以空字符结尾的临时观察指针，用于 C API，但修改 string 后指针可能失效。",
    failure:
      "若只复述「string class 把字符、长度与资源绑成值」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「string class 把字符、长度与资源绑成值」的状态变化。",
  },
  {
    label: "查找和子串要把 npos 当作显式分支",
    mechanism:
      "find() 失败返回 std::string::npos ，不能把它当普通索引继续加一。",
    failure:
      "若只复述「查找和子串要把 npos 当作显式分支」结论而不追踪状态、所有权和失败路径，示例扩展成多文件或多对象程序后就容易偏离预期。",
    evidence:
      "从干净构建开始，以固定输入运行本节示例，再加入一个边界或故障场景验证「查找和子串要把 npos 当作显式分支」的状态变化。",
  },
];

export function StringClassAndStlDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 16：The string Class and the Standard Template Library：机制与证据"
      prompt="切换《Chapter 16：The string Class and the Standard Template Library》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 16：The string Class and the Standard Template Library》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StringClassAndStlMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 16：The string Class and the Standard Template Library：机制路径"
      stages={STAGES}
    />
  );
}

export function StringClassAndStlFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 16：The string Class and the Standard Template Library：失效与核验"
      stages={STAGES}
    />
  );
}
