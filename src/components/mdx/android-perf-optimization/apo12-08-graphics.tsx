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
      "本页从“第8章 图形”覆盖到“8.4 总结”，共20个正式节点。掌握标准是能沿“从布局优化与层级工具进入OpenGL ES扩展、纹理压缩、Mipmap、多APK、着色、场景复杂度、消隐与功耗”解释执行与资源因果链，运行等价、边界和故障实验，并让另一位开发者凭布局层级、测绘制时间、纹理格式与显存、设备扩展、多APK选择、GPU帧与功耗对照重放结论。",
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

export function Apo1208GraphicsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第8章 图形：机制与证据"
      prompt="切换《第8章 图形》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第8章 图形》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Apo1208GraphicsMechanismMap() {
  return <ChapterMechanismMap title="第8章 图形：机制路径" stages={STAGES} />;
}

export function Apo1208GraphicsFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第8章 图形：失效与核验" stages={STAGES} />
  );
}
