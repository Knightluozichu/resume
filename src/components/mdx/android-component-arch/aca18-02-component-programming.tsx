"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从组件边界与证据开始",
    mechanism:
      "运行阶段还要明确 生命周期所有者 。Activity、Fragment、View、Application和后台线程的阶段不同，分发迟到或重复会造成泄漏与副作用。发布阶段用 制品坐标 把源码提交连接到AAR与消费者，任何可变版本都会破坏回滚。",
    failure:
      "若把「从组件边界与证据开始」简化成拆分 Gradle module，却不约束依赖、构建输入、运行所有者与制品版本，集成成功也会在冲突、重建或回滚时失效。",
    evidence:
      "以最小多模块工程验证「从组件边界与证据开始」，保存依赖图、任务/合并报告、运行时序、产物校验和，并注入一个冲突或仓库失败样本。",
  },
  {
    label: "最小垂直切片",
    mechanism:
      "先预测依赖图和初始化顺序，再运行一个只有壳、合同和业务实现的最小工程。合同放在下层，业务实现不能反向依赖壳工程；注册必须幂等且能释放。",
    failure:
      "若把「最小垂直切片」简化成拆分 Gradle module，却不约束依赖、构建输入、运行所有者与制品版本，集成成功也会在冲突、重建或回滚时失效。",
    evidence:
      "以最小多模块工程验证「最小垂直切片」，保存依赖图、任务/合并报告、运行时序、产物校验和，并注入一个冲突或仓库失败样本。",
  },
  {
    label: "层架构与故障证明",
    mechanism:
      "源码边界。 画出壳、业务、公共与基础层，列出允许和禁止依赖。公共合同不得泄漏业务实现，资源前缀、包名、ProGuard规则与Manifest占位符都属于边界。用依赖图和违规样例让构建自动失败。",
    failure:
      "若把「层架构与故障证明」简化成拆分 Gradle module，却不约束依赖、构建输入、运行所有者与制品版本，集成成功也会在冲突、重建或回滚时失效。",
    evidence:
      "以最小多模块工程验证「层架构与故障证明」，保存依赖图、任务/合并报告、运行时序、产物校验和，并注入一个冲突或仓库失败样本。",
  },
];

export function Aca1802ComponentProgrammingDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第2章 组件化编程：机制与证据"
      prompt="切换《第2章 组件化编程》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第2章 组件化编程》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Aca1802ComponentProgrammingMechanismMap() {
  return (
    <ChapterMechanismMap title="第2章 组件化编程：机制路径" stages={STAGES} />
  );
}

export function Aca1802ComponentProgrammingFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第2章 组件化编程：失效与核验"
      stages={STAGES}
    />
  );
}
