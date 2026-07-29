"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：为什么位置编号不够用？",
    mechanism:
      '你学过了顺序容器——用 vector 按位置 v[3] 访问元素。但想想这些场景：查电话号码——你输入名字 "Alice"，想知道她的号码——你不可能说「我要第 5 个元素」——你不知道 Alice 在第几个位置。你需要的是按「名字」直接找到「号码」——这就是键值对的核心：通过 key 找到 value。',
    failure:
      "若把「直觉：为什么位置编号不够用？」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：为什么位置编号不够用？」的契约。",
  },
  {
    label: "种容器，两大阵营",
    mechanism:
      "在 C++ 里， 关联容器（associative container） 把你的元素按 key 组织——key 就是你的搜索字——通过它定位数据。",
    failure:
      "若把「种容器，两大阵营」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「种容器，两大阵营」的契约。",
  },
  {
    label: "官方 Chapter 11 的键契约与操作边界",
    mechanism:
      "原书的核心不是记住八个名字，而是理解有序容器如何判断键等价、无序容器如何配对哈希与相等关系，以及 insert 、 find 、下标和删除分别会不会修改容器。",
    failure:
      "若把「官方 Chapter 11 的键契约与操作边界」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「官方 Chapter 11 的键契约与操作边界」的契约。",
  },
];

export function AssociativeContainersDecisionLab() {
  return (
    <ChapterDecisionLab
      title="关联容器：机制与证据"
      prompt="切换《关联容器》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《关联容器》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function AssociativeContainersMechanismMap() {
  return <ChapterMechanismMap title="关联容器：机制路径" stages={STAGES} />;
}

export function AssociativeContainersFailureDiagram() {
  return <ChapterFailureMatrix title="关联容器：失效与核验" stages={STAGES} />;
}
