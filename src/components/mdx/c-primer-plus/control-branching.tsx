"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么程序需要「岔路口」？",
    mechanism:
      "想象你在工厂流水线的质检站：每块巧克力经过时，工人要判断——合格装箱、轻微瑕疵降级、严重不合格丢弃。同一条传送带，不同情况走不同处理路径。程序也一样：分数高低给不同等级、菜单选项触发不同功能、传感器读数决定报警还是正常——都需要「根据条件选一条路走」。",
    failure:
      "若只记语法而忽略「为什么程序需要「岔路口」？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么程序需要「岔路口」？」的实际行为。",
  },
  {
    label: "if / else if / else：互斥分支链",
    mechanism: "当只有「是 / 否」两条路时，加 else ：",
    failure:
      "若只记语法而忽略「if / else if / else：互斥分支链」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「if / else if / else：互斥分支链」的实际行为。",
  },
  {
    label: "switch-case：离散值的多路跳转",
    mechanism:
      "当要根据离散整数值在多个固定选项间跳转时， switch 语句 比一长串 else if 更清晰。控制表达式必须具有整数类型； char 、 short 和枚举也能使用，是因为它们会先做整数提升。每个 case 都必须是整数常量表达式，转换后不能与同一 switch 中的其他标签重复。",
    failure:
      "若只记语法而忽略「switch-case：离散值的多路跳转」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「switch-case：离散值的多路跳转」的实际行为。",
  },
];

export function ControlBranchingDecisionLab() {
  return (
    <ChapterDecisionLab
      title="C控制语句：分支与跳转：机制与证据"
      prompt="切换《C控制语句：分支与跳转》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《C控制语句：分支与跳转》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function ControlBranchingMechanismMap() {
  return (
    <ChapterMechanismMap
      title="C控制语句：分支与跳转：机制路径"
      stages={STAGES}
    />
  );
}

export function ControlBranchingFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="C控制语句：分支与跳转：失效与核验"
      stages={STAGES}
    />
  );
}
