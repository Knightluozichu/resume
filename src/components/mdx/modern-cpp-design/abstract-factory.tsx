"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么选择单位是“一族产品”",
    mechanism:
      "The Architectural Role of Abstract Factory 是隔离一整组相互兼容 products 的创建。UI toolkit 需要同一平台的 Button/Menu/Dialog；数据库 adapter 需要同一 driver 的 Connection/Command/…",
    failure:
      "若只复制「为什么选择单位是“一族产品”」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「为什么选择单位是“一族产品”」的组合规则与扩展边界。",
  },
  {
    label: "A Generic Abstract Factory In…",
    mechanism:
      "传统 interface 手写 MakeButton/MakeMenu/MakeDialog virtual methods；product 集合变化时，abstract 与每个 concrete factory 都要同步修改。",
    failure:
      "若只复制「A Generic Abstract Factory In…」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「A Generic Abstract Factory In…」的组合规则与扩展边界。",
  },
  {
    label: "Implementing AbstractFactory",
    mechanism:
      "Implementing AbstractFactory 需要把 abstract product list 与 concrete product list 对齐。",
    failure:
      "若只复制「Implementing AbstractFactory」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Implementing AbstractFactory」的组合规则与扩展边界。",
  },
];

export function AbstractFactoryDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第9章：抽象工厂：机制与证据"
      prompt="切换《第9章：抽象工厂》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第9章：抽象工厂》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function AbstractFactoryMechanismMap() {
  return (
    <ChapterMechanismMap title="第9章：抽象工厂：机制路径" stages={STAGES} />
  );
}

export function AbstractFactoryFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第9章：抽象工厂：失效与核验" stages={STAGES} />
  );
}
