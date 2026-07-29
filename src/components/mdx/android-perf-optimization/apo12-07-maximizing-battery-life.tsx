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
    label: "本章回顾",
    mechanism:
      "本页从“第7章 延长电池续航时间”覆盖到“7.9 总结”，共17个正式节点。掌握标准是能沿“从电池计量、广播接收器、网络、位置、传感器、图形、提醒和WakeLock控制唤醒与无线电活动”解释执行与资源因果链，运行等价、边界和故障实验，并让另一位开发者凭电量基线、唤醒次数、传输批次、定位更新、传感器注销、图形负载、Alarm和WakeLock时长重放结论。",
    failure:
      "若优化「本章回顾」时没有等价性断言、固定测量协议和资源边界，一次更快数字可能来自错误结果、热状态、缓存或插桩偏差。",
    evidence:
      "固定设备、版本、构建、输入与热状态，对「本章回顾」做预热和交错重复采样，同时保存正确性、P50/P95/P99 与分配、线程、能耗或帧证据。",
  },
  {
    label: "原版目录概念补充核对",
    mechanism:
      "以下条目补齐官方目录中容易被示例主线掩盖的概念。它们不重复罗列目录，而是明确每项概念的机制、适用边界和验收证据。",
    failure:
      "若优化「原版目录概念补充核对」时没有等价性断言、固定测量协议和资源边界，一次更快数字可能来自错误结果、热状态、缓存或插桩偏差。",
    evidence:
      "固定设备、版本、构建、输入与热状态，对「原版目录概念补充核对」做预热和交错重复采样，同时保存正确性、P50/P95/P99 与分配、线程、能耗或帧证据。",
  },
];

export function Apo1207MaximizingBatteryLifeDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第7章 延长电池续航时间：机制与证据"
      prompt="切换《第7章 延长电池续航时间》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第7章 延长电池续航时间》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Apo1207MaximizingBatteryLifeMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第7章 延长电池续航时间：机制路径"
      stages={STAGES}
    />
  );
}

export function Apo1207MaximizingBatteryLifeFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第7章 延长电池续航时间：失效与核验"
      stages={STAGES}
    />
  );
}
