"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么先锁定第四版Identity与权威目录",
    mechanism:
      "本课程对应Jon Skeet的 C in Depth, Fourth Edition ，Manning于2019年3月出版，ISBN 9781617294532。全书是4个Part、15章，从Chapter 1的语言/平台/社区演进背景，经过C 2-5与C 6，进入C 7和当时的C 8 previe…",
    failure:
      "若解释「为什么先锁定第四版Identity与权威目录」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「为什么先锁定第四版Identity与权威目录」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "个Part的纵向路线",
    mechanism:
      "Chapter 1 Survival of the sharpest 先建立方法论：language、platform、community和book本身持续演进。Reader需要区分语言syntax、runtime/BCL capability、compiler/tooling和社区practice，后面每个feature都按这四层定位。",
    failure:
      "若解释「个Part的纵向路线」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「个Part的纵向路线」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
  {
    label: "条横向Dependency Chain",
    mechanism:
      "本节把「条横向Dependency Chain」放回《C# in Depth 第四版学习地图：4 Parts / 15 Chapters》的输入、状态变化与输出路径中理解。",
    failure:
      "若解释「条横向Dependency Chain」时混淆语言规范、编译器降级、运行时和类库责任，版本变化后就会把实现细节误当作 C# 语义保证。",
    evidence:
      "以明确的 LangVersion 与目标框架构建「条横向Dependency Chain」的正反案例，并用编译诊断、生成 IL、运行轨迹或分配数据核对实际边界。",
  },
];

export function DcsLearningMapDecisionLab() {
  return (
    <ChapterDecisionLab
      title="C# in Depth 第四版学习地图：4 Parts / 15 Chapters：机制与证据"
      prompt="切换《C# in Depth 第四版学习地图：4 Parts / 15 Chapters》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《C# in Depth 第四版学习地图：4 Parts / 15 Chapters》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function DcsLearningMapMechanismMap() {
  return (
    <ChapterMechanismMap
      title="C# in Depth 第四版学习地图：4 Parts / 15 Chapters：机制路径"
      stages={STAGES}
    />
  );
}

export function DcsLearningMapFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="C# in Depth 第四版学习地图：4 Parts / 15 Chapters：失效与核验"
      stages={STAGES}
    />
  );
}
