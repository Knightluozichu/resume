"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: '为什么 C 的运算像一条"加工流水线"？',
    mechanism:
      "想象一条巧克力工厂的流水线：原料从传送带左边进来，经过混合、加热、冷却、切割、包装五道工序，右边出来的就是成品。每道工序的输入是上一道的输出，工序之间有固定的先后顺序——你先称量再混合，而不是反过来。",
    failure:
      '若只记语法而忽略「为什么 C 的运算像一条"加工流水线"？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。',
    evidence:
      '用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么 C 的运算像一条"加工流水线"？」的实际行为。',
  },
  {
    label: "C 运算符全览——一句话把常用运算符说清楚",
    mechanism:
      '在进入细节之前，先把本章涉及的五大类运算符摊开看一遍。这张表就是你的"运算流水线机器清单"——运算符、含义、示例、优先级，一目了然：',
    failure:
      "若只记语法而忽略「C 运算符全览——一句话把常用运算符说清楚」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「C 运算符全览——一句话把常用运算符说清楚」的实际行为。",
  },
  {
    label: "表达式与类型转换——当 int 遇上 float",
    mechanism:
      "当表达式混合不同类型时，C 会按运算符规则转换操作数。 类型转换（type conversion） 需要结合类型等级和可表示范围判断。",
    failure:
      "若只记语法而忽略「表达式与类型转换——当 int 遇上 float」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「表达式与类型转换——当 int 遇上 float」的实际行为。",
  },
];

export function OperatorsExpressionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="运算符、表达式和语句：机制与证据"
      prompt="切换《运算符、表达式和语句》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《运算符、表达式和语句》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function OperatorsExpressionsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="运算符、表达式和语句：机制路径"
      stages={STAGES}
    />
  );
}

export function OperatorsExpressionsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="运算符、表达式和语句：失效与核验"
      stages={STAGES}
    />
  );
}
