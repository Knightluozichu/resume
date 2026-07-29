"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从官方11章开始",
    mechanism:
      "《C++ High Performance》第一版不是“缓存、线程、模板技巧”的随意集合。它先建立C++ object/value/ownership契约，再补现代语言设施；随后说明如何测量，才进入data structures、iterators与algorithms；内存、metaprogram…",
    failure:
      "若脱离基线与成本模型讨论「从官方11章开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从官方11章开始」前后的时间和资源变化。",
  },
  {
    label: "阶段一：语言契约与可核查测量",
    mechanism:
      "第1章建立zero-cost abstraction、value semantics、ownership、reference和error handling。它回答“接口实际承诺了什么成本与lifetime”。第2章扩展到auto、lambda、move、optional与any，回答“现代语法怎样保…",
    failure:
      "若脱离基线与成本模型讨论「阶段一：语言契约与可核查测量」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「阶段一：语言契约与可核查测量」前后的时间和资源变化。",
  },
  {
    label: "阶段二：让算法看到正确的数据形状",
    mechanism:
      "第4章从memory properties出发比较array/vector/deque/list、ordered/unordered containers与parallel arrays。第5章解释iterator concept、category、traits、tag dispatch和linea…",
    failure:
      "若脱离基线与成本模型讨论「阶段二：让算法看到正确的数据形状」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「阶段二：让算法看到正确的数据形状」前后的时间和资源变化。",
  },
];

export function LearningMapDecisionLab() {
  return (
    <ChapterDecisionLab
      title="全书学习地图：机制与证据"
      prompt="切换《全书学习地图》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《全书学习地图》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function LearningMapMechanismMap() {
  return <ChapterMechanismMap title="全书学习地图：机制路径" stages={STAGES} />;
}

export function LearningMapFailureDiagram() {
  return (
    <ChapterFailureMatrix title="全书学习地图：失效与核验" stages={STAGES} />
  );
}
