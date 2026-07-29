"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么需要 Typelists：The Need for …",
    mechanism:
      "普通 container 保存“同一种元素类型的多个值”；generic component 常需要保存“多个不同类型本身”。Functor 要记录参数签名，Abstract Factory 要记录 product family，multimethod dispatcher 要记录参与类型。",
    failure:
      "若只复制「为什么需要 Typelists：The Need for …」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「为什么需要 Typelists：The Need for …」的组合规则与扩展边界。",
  },
  {
    label: "Defining Typelists",
    mechanism:
      "Defining Typelists 使用二元节点： Head 保存当前类型， Tail 指向余下 Typelist； NullType 是终点。这个结构故意模仿 singly linked list，使模板 specialization 能写出递归算法。",
    failure:
      "若只复制「Defining Typelists」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Defining Typelists」的组合规则与扩展边界。",
  },
  {
    label: "Linearizing Typelist Creation",
    mechanism:
      "嵌套写法随着长度增长很难读。 Linearizing Typelist Creation 在书中通过 TYPELIST 1 到 TYPELIST N 宏把线性参数展开为嵌套节点。宏是当时缺少 variadic templates 的工程折衷：它不能检查类型数量以外的语义，且上限固定。",
    failure:
      "若只复制「Linearizing Typelist Creation」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Linearizing Typelist Creation」的组合规则与扩展边界。",
  },
];

export function TypelistsDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第3章：Typelists：机制与证据"
      prompt="切换《第3章：Typelists》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第3章：Typelists》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function TypelistsMechanismMap() {
  return (
    <ChapterMechanismMap title="第3章：Typelists：机制路径" stages={STAGES} />
  );
}

export function TypelistsFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第3章：Typelists：失效与核验"
      stages={STAGES}
    />
  );
}
