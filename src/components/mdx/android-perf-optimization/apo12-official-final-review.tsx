"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从正确性与测量协议开始",
    mechanism:
      "内存优化依赖 内存局部性 ，不只是“少用内存”。电池优化依赖 能耗预算 ，减少一段CPU时间却增加网络唤醒并不一定更省电。",
    failure:
      "若优化「从正确性与测量协议开始」时没有等价性断言、固定测量协议和资源边界，一次更快数字可能来自错误结果、热状态、缓存或插桩偏差。",
    evidence:
      "固定设备、版本、构建、输入与热状态，对「从正确性与测量协议开始」做预热和交错重复采样，同时保存正确性、P50/P95/P99 与分配、线程、能耗或帧证据。",
  },
  {
    label: "测量前预测",
    mechanism:
      "先预测《《Android应用性能优化》全书总复习》中哪一段会成为主导成本，并写出结果等价、时间、分配、线程、能耗或帧指标的可推翻阈值；运行后保留不符合预测的原始样本，而不是只挑最快一次。",
    failure:
      "若优化「测量前预测」时没有等价性断言、固定测量协议和资源边界，一次更快数字可能来自错误结果、热状态、缓存或插桩偏差。",
    evidence:
      "固定设备、版本、构建、输入与热状态，对「测量前预测」做预热和交错重复采样，同时保存正确性、P50/P95/P99 与分配、线程、能耗或帧证据。",
  },
  {
    label: "本章回顾",
    mechanism:
      "本页从“第1章 Java代码优化”覆盖到“第9章 RenderScript”，共9个正式节点。掌握标准是能沿“从等价性、时间、内存、线程、能耗和图形六类证据闭环SDK、NDK与RenderScript全部节点”解释执行与资源因果链，运行等价、边界和故障实验，并让另一位开发者凭全书节点表、Java/N…",
    failure:
      "若优化「本章回顾」时没有等价性断言、固定测量协议和资源边界，一次更快数字可能来自错误结果、热状态、缓存或插桩偏差。",
    evidence:
      "固定设备、版本、构建、输入与热状态，对「本章回顾」做预热和交错重复采样，同时保存正确性、P50/P95/P99 与分配、线程、能耗或帧证据。",
  },
];

export function Apo12OfficialFinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="《Android应用性能优化》全书总复习：机制与证据"
      prompt="切换《《Android应用性能优化》全书总复习》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《《Android应用性能优化》全书总复习》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Apo12OfficialFinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="《Android应用性能优化》全书总复习：机制路径"
      stages={STAGES}
    />
  );
}

export function Apo12OfficialFinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="《Android应用性能优化》全书总复习：失效与核验"
      stages={STAGES}
    />
  );
}
