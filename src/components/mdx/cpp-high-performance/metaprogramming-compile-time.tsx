"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从“哪些事实能在编译期证明”开始",
    mechanism:
      "元编程不是把运行期代码机械搬到compiler，而是利用type、non-type template argument和constant expression生成类型、值或合法性证据。收益包括提前拒绝错误、消除不可能分支、针对具体类型生成代码；成本包括compile time、diagnostic complexity、binary size和过多实例化。",
    failure:
      "若脱离基线与成本模型讨论「从“哪些事实能在编译期证明”开始」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「从“哪些事实能在编译期证明”开始」前后的时间和资源变化。",
  },
  {
    label: "template metaprogramming与stat…",
    mechanism:
      "传统TMP通过class template specialization递归。base specialization终止递归，primary template组合前一步结果。",
    failure:
      "若脱离基线与成本模型讨论「template metaprogramming与stat…」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「template metaprogramming与stat…」前后的时间和资源变化。",
  },
  {
    label: "type traits与decltype读取类型事实",
    mechanism:
      "type traits把type property编码为type/value，例如 is integral v 、 is trivially copyable v 、 remove reference t 。它们适合选择合法实现或优化路径，但标准trait只承诺定义中的property；trivia…",
    failure:
      "若脱离基线与成本模型讨论「type traits与decltype读取类型事实」，局部优化可能只是在移动开销，甚至让缓存、分配或同步瓶颈更严重。",
    evidence:
      "保留可复现基准、输入规模和编译参数，用采样剖析与硬件计数器核对「type traits与decltype读取类型事实」前后的时间和资源变化。",
  },
];

export function MetaprogrammingCompileTimeDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第8章：元编程与编译期求值：机制与证据"
      prompt="切换《第8章：元编程与编译期求值》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第8章：元编程与编译期求值》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function MetaprogrammingCompileTimeMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第8章：元编程与编译期求值：机制路径"
      stages={STAGES}
    />
  );
}

export function MetaprogrammingCompileTimeFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第8章：元编程与编译期求值：失效与核验"
      stages={STAGES}
    />
  );
}
