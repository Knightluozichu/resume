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
      "本单元主线是以六大原则约束创建型、结构型和行为型模式，并落地单例、工厂、建造者、代理、装饰、外观、享元、策略、模板和观察者。交互管线逐项选择目录节点，反例实验切换正常、配置变化、线程竞争、所有者销毁和版本漂移，证据门要求目录、行为、线程、生命周期与迁移全部通过。",
    failure:
      "若把「从可观察行为开始」只写成旧框架 API 示例而不说明线程、生命周期、状态所有者与现代迁移边界，正常演示会在取消、重建或版本升级后失效。",
    evidence:
      "在固定 Android 5–7 基线运行「从可观察行为开始」的正常与单变量失败样本，保存回调线程、状态快照、资源释放和 AndroidX/现代 API 迁移对照。",
  },
  {
    label: "最小实现与边界",
    mechanism:
      "class CachedImageLoader(private val origin: ImageLoader) : ImageLoader private val cache = mutableMapOf () override fun load(url: String): Image = cac…",
    failure:
      "若把「最小实现与边界」只写成旧框架 API 示例而不说明线程、生命周期、状态所有者与现代迁移边界，正常演示会在取消、重建或版本升级后失效。",
    evidence:
      "在固定 Android 5–7 基线运行「最小实现与边界」的正常与单变量失败样本，保存回调线程、状态快照、资源释放和 AndroidX/现代 API 迁移对照。",
  },
  {
    label: "证据解释",
    mechanism:
      "第一份证据是行为基线。固定Android版本、依赖版本、构建类型、输入数据和页面生命周期，完整记录“以六大原则约束创建型、结构型和行为型模式，并落地单例、工厂、建造者、代理、装饰、外观、享元、策略、模板和观察者”从入口到结果的顺序。除了成功输出，还要保存回调线程、对象身份、队列或订阅状态以及释放日志；否则无法判断升级后的差异来自业务代码、框架实现还是测试环境。",
    failure:
      "若把「证据解释」只写成旧框架 API 示例而不说明线程、生命周期、状态所有者与现代迁移边界，正常演示会在取消、重建或版本升级后失效。",
    evidence:
      "在固定 Android 5–7 基线运行「证据解释」的正常与单变量失败样本，保存回调线程、状态快照、资源释放和 AndroidX/现代 API 迁移对照。",
  },
];

export function Aal1706DesignPatternsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第6章 设计模式：机制与证据"
      prompt="切换《第6章 设计模式》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第6章 设计模式》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Aal1706DesignPatternsMechanismMap() {
  return (
    <ChapterMechanismMap title="第6章 设计模式：机制路径" stages={STAGES} />
  );
}

export function Aal1706DesignPatternsFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第6章 设计模式：失效与核验" stages={STAGES} />
  );
}
