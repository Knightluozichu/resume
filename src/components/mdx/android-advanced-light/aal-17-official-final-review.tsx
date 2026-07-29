"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从可观察行为开始",
    mechanism:
      "在《Android进阶之光》全书总复习中， 版本语境 、 行为基线 、 源码调用链 、 生命周期所有权 、 迁移账本 构成本页的分析词汇。先预测一次输入会穿过哪些对象、线程、队列、View或语言边界，再运行正常与失败样本；没有版本和原始证据的“源码原理”不能复查。",
    failure:
      "若把「从可观察行为开始」只写成旧框架 API 示例而不说明线程、生命周期、状态所有者与现代迁移边界，正常演示会在取消、重建或版本升级后失效。",
    evidence:
      "在固定 Android 5–7 基线运行「从可观察行为开始」的正常与单变量失败样本，保存回调线程、状态快照、资源释放和 AndroidX/现代 API 迁移对照。",
  },
  {
    label: "最小实现与边界",
    mechanism:
      "在《Android进阶之光》全书总复习中，实现后用固定输入记录输出、线程名、生命周期、异常和资源释放。再构造错误输入、取消、旋转、后台切前台及低版本设备，验证便利框架没有隐藏所有权问题。",
    failure:
      "若把「最小实现与边界」只写成旧框架 API 示例而不说明线程、生命周期、状态所有者与现代迁移边界，正常演示会在取消、重建或版本升级后失效。",
    evidence:
      "在固定 Android 5–7 基线运行「最小实现与边界」的正常与单变量失败样本，保存回调线程、状态快照、资源释放和 AndroidX/现代 API 迁移对照。",
  },
  {
    label: "证据解释",
    mechanism:
      "第一份证据是行为基线。固定Android版本、依赖版本、构建类型、输入数据和页面生命周期，完整记录“从版本与UI行为出发，复盘线程、网络、模式、事件流、依赖图、应用架构和MediaPlayer源码证据”从入口到结果的顺序。除了成功输出，还要保存回调线程、对象身份、队列或订阅状态以及释放日志；否则无法判断升级后的差异来自业务代码、框架实现还是测试环境。",
    failure:
      "若把「证据解释」只写成旧框架 API 示例而不说明线程、生命周期、状态所有者与现代迁移边界，正常演示会在取消、重建或版本升级后失效。",
    evidence:
      "在固定 Android 5–7 基线运行「证据解释」的正常与单变量失败样本，保存回调线程、状态快照、资源释放和 AndroidX/现代 API 迁移对照。",
  },
];

export function Aal17OfficialFinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="《Android进阶之光》全书总复习：机制与证据"
      prompt="切换《《Android进阶之光》全书总复习》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《《Android进阶之光》全书总复习》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Aal17OfficialFinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="《Android进阶之光》全书总复习：机制路径"
      stages={STAGES}
    />
  );
}

export function Aal17OfficialFinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="《Android进阶之光》全书总复习：失效与核验"
      stages={STAGES}
    />
  );
}
