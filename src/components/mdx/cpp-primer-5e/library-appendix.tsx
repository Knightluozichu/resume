"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "直觉：附录不是名单，而是一张导航图",
    mechanism:
      "标准库名字很多，死记每个声明位置很快会失效。更稳定的方法是先判断问题属于容器、算法、迭代器、所有权、文本、I/O 还是随机数，再进入对应头文件核对接口。头文件解决声明可见性， std:: 解决名字查找，两者不能互相替代。",
    failure:
      "若把「直觉：附录不是名单，而是一张导航图」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「直觉：附录不是名单，而是一张导航图」的契约。",
  },
  {
    label: "库名字和头文件：先定位设施家族",
    mechanism:
      "标准头文件（standard header） 是可移植的声明入口。应直接包含自己使用的设施对应头，而不是因为某个平台碰巧经别的头间接包含就省略。",
    failure:
      "若把「库名字和头文件：先定位设施家族」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「库名字和头文件：先定位设施家族」的契约。",
  },
  {
    label: "算法概览：区间、操作与结果",
    mechanism:
      "半开区间 是标准算法的共同输入模型。区间不拥有元素，算法通过迭代器读写已有对象，因此容器类型往往不是算法模板参数的一部分。",
    failure:
      "若把「算法概览：区间、操作与结果」当作孤立语法点，忽略类型约束、对象生命周期或库契约，代码即使通过编译也可能破坏不变量。",
    evidence:
      "保留编译诊断，运行本节最小示例，并用边界断言、对象计数或 sanitizer 复核「算法概览：区间、操作与结果」的契约。",
  },
];

export function LibraryAppendixDecisionLab() {
  return (
    <ChapterDecisionLab
      title="附录 A：标准库：机制与证据"
      prompt="切换《附录 A：标准库》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《附录 A：标准库》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function LibraryAppendixMechanismMap() {
  return (
    <ChapterMechanismMap title="附录 A：标准库：机制路径" stages={STAGES} />
  );
}

export function LibraryAppendixFailureDiagram() {
  return (
    <ChapterFailureMatrix title="附录 A：标准库：失效与核验" stages={STAGES} />
  );
}
