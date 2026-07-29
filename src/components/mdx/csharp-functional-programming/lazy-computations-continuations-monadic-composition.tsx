"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么“现在算还是以后算”属于程序语义",
    mechanism:
      "函数式组合不只关心输入输出值，还关心计算何时启动、是否重复、失败是否缓存、资源是否仍有效。把昂贵查询包装成function会延迟执行，却不自动memoize；把它包装成 Lazy&lt;T&gt; 通常共享一次结果，却又引入并发publication和异常缓存策略。Continuation则把“算完…",
    failure:
      "若把「为什么“现在算还是以后算”属于程序语义」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么“现在算还是以后算”属于程序语义」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "The virtue of laziness",
    mechanism:
      "Eager expression在construction point立刻求值；thunk Func&lt;T&gt; 把computation变成可调用值，每次调用通常重新执行；memoized lazy cell则在第一次demand后保存value。Laziness可避免未使用分支、建立inf…",
    failure:
      "若把「The virtue of laziness」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「The virtue of laziness」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Laziness, caching, and invali…",
    mechanism:
      "Memoization的key不只是function arguments，还隐含locale、clock、authorization、configuration和data version。对impure computation缓存会冻结旧world state；对failure缓存则可能把短暂故障永…",
    failure:
      "若把「Laziness, caching, and invali…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Laziness, caching, and invali…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function LazyComputationsContinuationsMonadicCompositionDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 11. Lazy computations, continuations, and the beauty of monadic composition：机制与证据"
      prompt="切换《Chapter 11. Lazy computations, continuations, and the beauty of monadic composition》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 11. Lazy computations, continuations, and the beauty of monadic composition》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function LazyComputationsContinuationsMonadicCompositionMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 11. Lazy computations, continuations, and the beauty of monadic composition：机制路径"
      stages={STAGES}
    />
  );
}

export function LazyComputationsContinuationsMonadicCompositionFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 11. Lazy computations, continuations, and the beauty of monadic composition：失效与核验"
      stages={STAGES}
    />
  );
}
