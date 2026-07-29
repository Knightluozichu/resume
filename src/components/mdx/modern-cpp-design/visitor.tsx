"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "为什么一次 virtual call 不够",
    mechanism:
      "Visitor Basics 解决“操作取决于两个动态类型”：一边是 Shape 实际指向 Circle/Polygon，另一边是 Serialize/Render/Validate operation。C++ virtual dispatch 默认只按 receiver 的动态类型选择；function overload 按参数静态类型选择。",
    failure:
      "若只复制「为什么一次 virtual call 不够」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「为什么一次 virtual call 不够」的组合规则与扩展边界。",
  },
  {
    label: "Visitor 的适用扩展方向",
    mechanism:
      "Visitor 把 operation 从 element classes 中抽出，新增 operation 只需新 Visitor；但新增 element 要给 Visitor base 增 virtual method，并修改所有 concrete visitors。它适合 element hi…",
    failure:
      "若只复制「Visitor 的适用扩展方向」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Visitor 的适用扩展方向」的组合规则与扩展边界。",
  },
  {
    label: "Overloading：The Catch-All Fun…",
    mechanism:
      "Overloading: The Catch-All Function 为未列出的 element 提供 fallback，例如 visit(Base&) 或 template catch-all。由于 overload resolution 发生在 concrete accept 中，exact …",
    failure:
      "若只复制「Overloading：The Catch-All Fun…」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Overloading：The Catch-All Fun…」的组合规则与扩展边界。",
  },
];

export function VisitorDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第10章：Visitor：机制与证据"
      prompt="切换《第10章：Visitor》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第10章：Visitor》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function VisitorMechanismMap() {
  return (
    <ChapterMechanismMap title="第10章：Visitor：机制路径" stages={STAGES} />
  );
}

export function VisitorFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第10章：Visitor：失效与核验" stages={STAGES} />
  );
}
