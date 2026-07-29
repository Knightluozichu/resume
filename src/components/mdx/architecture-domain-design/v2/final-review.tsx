"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "final-review",
  title: "架构与领域设计总复习",
  focus:
    "用一个订单履约切片串联依赖规则、限界上下文、战术模型、上下文映射与可选扩展",
  invariant:
    "每个设计选择都能追溯到一种具体变化压力，并能用边界测试或模型示例证伪",
  fault: "把所有模式堆进最终架构图，用术语数量代替边界清晰度和运行证据",
  evidence:
    "依赖图、上下文地图、聚合测试、端口合同、读模型延迟、事件重放与模式删除清单",
  concepts: [
    "政策保护",
    "语言划界",
    "一致性设计",
    "关系治理",
    "扩展取舍",
    "反例验收",
  ],
  zones: [
    {
      label: "业务模型",
      detail: "语言、实体、值对象与聚合不变量",
    },
    {
      label: "协作边界",
      detail: "上下文关系、端口和翻译合同",
    },
    {
      label: "技术与扩展",
      detail: "适配器、投影、事件存储与运行证据",
    },
  ],
  trace: [
    "选核心规则",
    "划模型边界",
    "保护依赖方向",
    "设计上下文关系",
    "用反例删除过度设计",
  ],
  scenarios: [
    {
      label: "最小订单切片",
      input: "创建订单、计算价格并保存，不要求历史重建和专用报表",
      expected: "先使用用例、领域模型与存储端口，不引入 CQRS 或事件溯源",
    },
    {
      label: "演进后的履约",
      input: "读模型压力、审计重建和外部仓储协议都已被数据证明",
      expected:
        "分别引入投影、事件事实源和仓储适配器，并为每项保存独立验收证据",
    },
  ],
} satisfies ArchitectureCourseModel;

export function FinalReviewBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function FinalReviewTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function FinalReviewViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
