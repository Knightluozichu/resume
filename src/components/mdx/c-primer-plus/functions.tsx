"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么要把代码装进「函数」？",
    mechanism:
      "想象一家工厂把「切菜」「炒菜」「装盘」拆成三个工位：每个工位只做一件事，原料从上一个工位递过来，成品交给下一个。主程序如果把所有步骤写进 main，就像一个人包办全流程——代码越长越难改，改一处可能牵全身。",
    failure:
      "若只记语法而忽略「为什么要把代码装进「函数」？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么要把代码装进「函数」？」的实际行为。",
  },
  {
    label: "创建和使用函数：定义、原型与调用",
    mechanism:
      "int 是返回类型， sum 是名字， (int a, int b) 是形参列表，花括号里是函数体。",
    failure:
      "若只记语法而忽略「创建和使用函数：定义、原型与调用」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「创建和使用函数：定义、原型与调用」的实际行为。",
  },
  {
    label: "形参、实参与值传递",
    mechanism:
      "调用 sum(3, 5) 时， 3 和 5 是 实参（actual argument） ；定义里的 a 、 b 是 形参（formal parameter） 。",
    failure:
      "若只记语法而忽略「形参、实参与值传递」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「形参、实参与值传递」的实际行为。",
  },
];

export function FunctionsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="函数：机制与证据"
      prompt="切换《函数》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《函数》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FunctionsMechanismMap() {
  return <ChapterMechanismMap title="函数：机制路径" stages={STAGES} />;
}

export function FunctionsFailureDiagram() {
  return <ChapterFailureMatrix title="函数：失效与核验" stages={STAGES} />;
}
