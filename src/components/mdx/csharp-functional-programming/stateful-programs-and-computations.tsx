"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么Stateful不等于必须依赖Mutable Obj…",
    mechanism:
      "业务程序总会有state：账户余额、解析位置、随机数种子、购物车或workflow阶段。函数式方法不是否认state，而是让每次transition的输入、输出和ownership可见。隐藏field让signature看似 Command - Result ，真实行为却依赖之前调用、thread …",
    failure:
      "若把「为什么Stateful不等于必须依赖Mutable Obj…」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「为什么Stateful不等于必须依赖Mutable Obj…」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "Programs that manage state",
    mechanism:
      "先盘点state ownership。Local state只在stack frame内，可用普通loop/builder；aggregate state由单一domain transition管理；shared state需要serialization/version；external state…",
    failure:
      "若把「Programs that manage state」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「Programs that manage state」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
  {
    label: "State machines and invariant …",
    mechanism:
      "复杂workflow应把phase建成discriminated states或受控constructors，使illegal transitions无法随意构造。Transition table记录from、command/event、guard、to与output；property tests验…",
    failure:
      "若把「State machines and invariant …」只写成函数式术语而不隔离副作用、状态和失败分支，组合后的程序仍会依赖隐藏时序，无法从输入稳定推导结果。",
    evidence:
      "以确定输入重复运行「State machines and invariant …」的最小管线，用属性测试、状态快照和副作用调用轨迹核对返回值、失败传播与资源边界。",
  },
];

export function StatefulProgramsAndComputationsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Chapter 12. Stateful programs and stateful computations：机制与证据"
      prompt="切换《Chapter 12. Stateful programs and stateful computations》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Chapter 12. Stateful programs and stateful computations》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function StatefulProgramsAndComputationsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Chapter 12. Stateful programs and stateful computations：机制路径"
      stages={STAGES}
    />
  );
}

export function StatefulProgramsAndComputationsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Chapter 12. Stateful programs and stateful computations：失效与核验"
      stages={STAGES}
    />
  );
}
