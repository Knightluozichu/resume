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
      "本单元主线是比较EventBus与otto的注册、发布、线程交付和源码索引机制，判断事件总线何时值得使用。交互管线逐项选择目录节点，反例实验切换正常、配置变化、线程竞争、所有者销毁和版本漂移，证据门要求目录、行为、线程、生命周期与迁移全部通过。",
    failure:
      "若把「从可观察行为开始」只写成旧框架 API 示例而不说明线程、生命周期、状态所有者与现代迁移边界，正常演示会在取消、重建或版本升级后失效。",
    evidence:
      "在固定 Android 5–7 基线运行「从可观察行为开始」的正常与单变量失败样本，保存回调线程、状态快照、资源释放和 AndroidX/现代 API 迁移对照。",
  },
  {
    label: "最小实现与边界",
    mechanism:
      "override fun onStop() EventBus.getDefault().unregister(this) super.onStop()",
    failure:
      "若把「最小实现与边界」只写成旧框架 API 示例而不说明线程、生命周期、状态所有者与现代迁移边界，正常演示会在取消、重建或版本升级后失效。",
    evidence:
      "在固定 Android 5–7 基线运行「最小实现与边界」的正常与单变量失败样本，保存回调线程、状态快照、资源释放和 AndroidX/现代 API 迁移对照。",
  },
  {
    label: "证据解释",
    mechanism:
      "第一份证据是行为基线。固定Android版本、依赖版本、构建类型、输入数据和页面生命周期，完整记录“比较EventBus与otto的注册、发布、线程交付和源码索引机制，判断事件总线何时值得使用”从入口到结果的顺序。除了成功输出，还要保存回调线程、对象身份、队列或订阅状态以及释放日志；否则无法判断升级后的差异来自业务代码、框架实现还是测试环境。",
    failure:
      "若把「证据解释」只写成旧框架 API 示例而不说明线程、生命周期、状态所有者与现代迁移边界，正常演示会在取消、重建或版本升级后失效。",
    evidence:
      "在固定 Android 5–7 基线运行「证据解释」的正常与单变量失败样本，保存回调线程、状态快照、资源释放和 AndroidX/现代 API 迁移对照。",
  },
];

export function Aal1707EventBusDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第7章 事件总线：机制与证据"
      prompt="切换《第7章 事件总线》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第7章 事件总线》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Aal1707EventBusMechanismMap() {
  return (
    <ChapterMechanismMap title="第7章 事件总线：机制路径" stages={STAGES} />
  );
}

export function Aal1707EventBusFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第7章 事件总线：失效与核验" stages={STAGES} />
  );
}
