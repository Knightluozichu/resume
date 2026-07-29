"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "learning-map",
  title: "架构与领域设计学习地图",
  focus:
    "把 Clean Architecture 的依赖边界、DDD 的模型边界与三类扩展模式排成一条不混淆出处的学习路径",
  invariant:
    "每个概念都标明来源家族；平台学习顺序不能被写成任一本原著的章节顺序",
  fault: "把 CQRS、事件溯源或六边形架构说成两本原书共同给出的统一方案",
  evidence: "来源标签、正式单元映射、边界图、决策轨迹与跨章节复习清单",
  concepts: [
    "架构边界",
    "模型边界",
    "战术建模",
    "战略协作",
    "读写分离扩展",
    "端口与适配器扩展",
  ],
  zones: [
    {
      label: "依赖边界",
      detail: "政策在内，技术细节在外",
    },
    {
      label: "模型边界",
      detail: "语言与规则在上下文内保持一致",
    },
    {
      label: "扩展选择",
      detail: "按读写、历史与外部接口压力选模式",
    },
  ],
  trace: ["识别政策", "划定模型", "建立协作", "选择扩展", "用证据复核"],
  scenarios: [
    {
      label: "新建订单系统",
      input: "团队同时面对界面、数据库、计价语言和报表读模型选择",
      expected: "先稳定业务政策与上下文，再为外部技术和扩展模式设边界",
    },
    {
      label: "遗留系统拆分",
      input: "旧库、共享术语与跨团队调用已经互相缠绕",
      expected: "先画真实依赖和上下文映射，再选择防腐层或端口适配器",
    },
  ],
} satisfies ArchitectureCourseModel;

export function LearningMapBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function LearningMapTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function LearningMapViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
