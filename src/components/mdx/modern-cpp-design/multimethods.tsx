"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么需要先问 What Are Multimethods?",
    mechanism:
      "What Are Multimethods? 普通 virtual method 只按一个 receiver 的 dynamic type 选择；multimethod 根据两个或更多 arguments 的 dynamic types 共同选择 operation。CLOS 等语言原生支持，C++…",
    failure:
      "若只复制「为什么需要先问 What Are Multimethods?」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「为什么需要先问 What Are Multimethods?」的组合规则与扩展边界。",
  },
  {
    label: "When Are Multimethods Needed?",
    mechanism:
      "When Are Multimethods Needed? 要同时满足：参与对象来自开放/多态 hierarchy；operation 真正依赖多个 dynamic types；把逻辑放进任一 class 都造成 cross-type coupling；组合数量足以让 hand-written conditionals 漂移。",
    failure:
      "若只复制「When Are Multimethods Needed?」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「When Are Multimethods Needed?」的组合规则与扩展边界。",
  },
  {
    label: "Double Switch-on-Type：Brute F…",
    mechanism:
      "Double Switch-on-Type: Brute Force 对第一个 object 逐类 dynamic cast，命中后再对第二个逐类 cast。N 种 types 最坏有 N² pairs，central function 知道所有 concrete classes。",
    failure:
      "若只复制「Double Switch-on-Type：Brute F…」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Double Switch-on-Type：Brute F…」的组合规则与扩展边界。",
  },
];

export function MultimethodsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第11章：Multimethods：机制与证据"
      prompt="切换《第11章：Multimethods》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第11章：Multimethods》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function MultimethodsMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第11章：Multimethods：机制路径"
      stages={STAGES}
    />
  );
}

export function MultimethodsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第11章：Multimethods：失效与核验"
      stages={STAGES}
    />
  );
}
