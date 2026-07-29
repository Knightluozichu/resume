"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: '为什么 C 语言里要分这么多种"数字盒子"？',
    mechanism:
      "想象你在一个零件仓库里：螺丝钉要放在小格子里，螺母要放在中号抽屉，发动机要放在大货架上。如果所有零件都往同一个万能麻袋里塞——小螺丝淹没在角落里找不到、大发动机根本塞不进。",
    failure:
      '若只记语法而忽略「为什么 C 语言里要分这么多种"数字盒子"？」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。',
    evidence:
      '用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「为什么 C 语言里要分这么多种"数字盒子"？」的实际行为。',
  },
  {
    label: "C 的数据类型家族",
    mechanism:
      "变量表示可在生命周期中取得不同值的对象；常量、枚举常量和字符串字面量等则受各自语言规则约束。类型决定值域和操作，存储期决定对象存在多久， const 限定符限制通过该左值修改对象，但 C 中的 const 对象并不自动成为所有语境都可用的整数常量表达式。",
    failure:
      "若只记语法而忽略「C 的数据类型家族」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。",
    evidence:
      "用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「C 的数据类型家族」的实际行为。",
  },
  {
    label: '动手：认识不同数据类型的"个头"差异',
    mechanism:
      "下面用一个 Stepper 分步演示 char / short / int / double 四种类型在内存中占用的空间，以及 sizeof 运算符如何帮你确认当前平台上每种类型真实的大小。",
    failure:
      '若只记语法而忽略「动手：认识不同数据类型的"个头"差异」的类型范围、求值顺序或资源边界，输入变化后可能出现未定义行为或错误结果。',
    evidence:
      '用 -Wall -Wextra -pedantic 构建本节示例，再以正常值、边界值和失败输入核对「动手：认识不同数据类型的"个头"差异」的实际行为。',
  },
];

export function DataAndCDecisionLab() {
  return (
    <ChapterDecisionLab
      title="数据和C：机制与证据"
      prompt="切换《数据和C》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《数据和C》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function DataAndCMechanismMap() {
  return <ChapterMechanismMap title="数据和C：机制路径" stages={STAGES} />;
}

export function DataAndCFailureDiagram() {
  return <ChapterFailureMatrix title="数据和C：失效与核验" stages={STAGES} />;
}
