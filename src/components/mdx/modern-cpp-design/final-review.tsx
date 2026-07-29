"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从一个系统事故开始",
    mechanism:
      "场景编辑器支持 runtime plugins。启动时选择 Vulkan/OpenGL backend；plugins 注册 Node creators 与 collision handlers；scene nodes 经 Visitor 执行 serialize/render/validate；两…",
    failure:
      "若只复制「从一个系统事故开始」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「从一个系统事故开始」的组合规则与扩展边界。",
  },
  {
    label: "Ch1-3：先生成可验证的类型结构",
    mechanism:
      "第1章把 backend storage、error checking、thread mode 拆成 Policies；第2章用 concepts/traits 证明 compatibility；第3章用 ProductList/NodeList 生成 factory/visitor schema。目标不是模板数量，而是一个变化轴只有一个 owner。",
    failure:
      "若只复制「Ch1-3：先生成可验证的类型结构」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Ch1-3：先生成可验证的类型结构」的组合规则与扩展边界。",
  },
  {
    label: "Ch4：Node 内存必须服从 phase lifetime",
    mechanism:
      "旧设计为每个 node 使用全局 small-object pool。plugins 卸载时，某些 nodes 仍在 pool；delete 又穿过 plugin-specific destructor。真正问题不是 block 快慢，而是 object lifetime 与 code/memory domain 不一致。",
    failure:
      "若只复制「Ch4：Node 内存必须服从 phase lifetime」模板结构而不声明替换点、所有权和实例化边界，组合后的类型会迅速产生二义性或不可诊断错误。",
    evidence:
      "用正向与应拒绝的编译案例、生成类型和生命周期测试核对「Ch4：Node 内存必须服从 phase lifetime」的组合规则与扩展边界。",
  },
];

export function FinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="Modern C++ Design 总复习：插件式场景运行时：机制与证据"
      prompt="切换《Modern C++ Design 总复习：插件式场景运行时》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《Modern C++ Design 总复习：插件式场景运行时》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function FinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="Modern C++ Design 总复习：插件式场景运行时：机制路径"
      stages={STAGES}
    />
  );
}

export function FinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="Modern C++ Design 总复习：插件式场景运行时：失效与核验"
      stages={STAGES}
    />
  );
}
