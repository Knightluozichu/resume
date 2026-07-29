"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么程序需要「反复执行」？",
    mechanism:
      "想象一条巧克力工厂的流水线：同一道工序要对传送带上的每一块巧克力重复操作——称重、包膜、贴标签。工人不会只做一块就下班，而是「只要还有货，就继续干」。程序里的很多任务也一样：打印 1 到 100、累加用户输入的分数、遍历矩阵每个格子——都需要把同一段代码跑很多遍。",
    failure:
      "若只记语法而忽略「为什么程序需要「反复执行」？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么程序需要「反复执行」？」的实际行为。",
  },
  {
    label: "while 回顾：先判后做的入口条件循环",
    mechanism:
      "上一章你已经见过 while 循环 。它的规则很简单： 先问「还要不要继续？」，答「要」才干活。",
    failure:
      "若只记语法而忽略「while 回顾：先判后做的入口条件循环」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「while 回顾：先判后做的入口条件循环」的实际行为。",
  },
  {
    label: "for 循环：把三要素写在一行",
    mechanism:
      "猜一猜：下面 for 循环结束后， i 的值是多少？通过 Stepper 一步步揭晓。",
    failure:
      "若只记语法而忽略「for 循环：把三要素写在一行」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「for 循环：把三要素写在一行」的实际行为。",
  },
];

export function ControlLoopsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="C控制语句：循环：机制与证据"
      prompt="切换《C控制语句：循环》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《C控制语句：循环》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ControlLoopsMechanismMap() {
  return (
    <ChapterMechanismMap title="C控制语句：循环：机制路径" stages={STAGES} />
  );
}

export function ControlLoopsFailureDiagram() {
  return (
    <ChapterFailureMatrix title="C控制语句：循环：失效与核验" stages={STAGES} />
  );
}
