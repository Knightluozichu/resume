"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "测试代码也会腐化反馈",
    mechanism:
      "生产代码变化后，测试会被每天阅读和执行。慢、随机、难懂或过度绑定实现的测试会使团队减少运行频率，最终把安全网变成负担。",
    failure:
      "若把「测试代码也会腐化反馈」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「测试代码也会腐化反馈」是否提供快速反馈。",
  },
  {
    label: "FIRST 把质量要求变成五个检查面",
    mechanism:
      "Fast 让开发者愿意频繁运行；Independent 让顺序和并行不影响结论；Repeatable 让相同输入稳定产生相同结果；Self-validating 让程序自动判定；Timely 让测试在设计仍可变化时提供反馈。五项互相支撑，缺一项都会拉长因果距离。",
    failure:
      "若把「FIRST 把质量要求变成五个检查面」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「FIRST 把质量要求变成五个检查面」是否提供快速反馈。",
  },
  {
    label: "Fast：时长要按分布而非感觉管理",
    mechanism:
      "记录单例和全套的中位数、p95 与最慢列表，避免“我机器上挺快”。单元层应尽量在内存完成；真实数据库、进程和网络进入独立慢层。固定 sleep 等待异步结果既慢又不稳定，应改用可观察事件、条件变量或可控调度器。",
    failure:
      "若把「Fast：时长要按分布而非感觉管理」退化成先写实现再补断言，测试会耦合内部步骤，既不能驱动设计，也无法稳定解释失败。",
    evidence:
      "保存红—绿—重构的最小提交与失败消息，用行为断言、替身交互和重复运行核对「Fast：时长要按分布而非感觉管理」是否提供快速反馈。",
  },
];

export function QualityTestsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 7：Quality Tests：机制与证据"
      prompt="切换《Chapter 7：Quality Tests》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 7：Quality Tests》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function QualityTestsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 7：Quality Tests：机制路径"
      stages={STAGES}
    />
  );
}

export function QualityTestsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 7：Quality Tests：失效与核验"
      stages={STAGES}
    />
  );
}
