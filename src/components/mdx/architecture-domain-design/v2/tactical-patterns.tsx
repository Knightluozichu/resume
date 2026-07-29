"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "architecturedomaindesign-08",
  title: "战术模式",
  focus:
    "在单一限界上下文内，用身份、属性值、无状态操作、一致性边界与重建机制表达模型",
  invariant:
    "聚合边界内的不变量在一次业务操作后成立，外部只通过聚合根引用内部对象",
  fault: "把实体、值对象、服务、仓储逐一对应到数据库表、DTO 和通用 CRUD 类",
  evidence:
    "对象身份合同、值相等测试、聚合命令、事务边界、工厂后置条件、仓储接口与领域事件",
  concepts: ["实体", "值对象", "领域服务", "聚合", "工厂", "仓储", "领域事件"],
  zones: [
    {
      label: "身份与值",
      detail: "实体保持连续身份，值对象表达属性组合",
    },
    {
      label: "一致性边界",
      detail: "聚合根执行命令并保护不变量",
    },
    {
      label: "创建与存取",
      detail: "工厂、仓储和事件连接生命周期",
    },
  ],
  trace: [
    "识别身份",
    "写出不变量",
    "确定聚合根",
    "完成合法创建",
    "保存并发布事实",
  ],
  scenarios: [
    {
      label: "订单加商品",
      input: "新增一项后总额和促销资格必须同步更新",
      expected: "通过订单聚合根执行命令，一次操作后所有聚合内不变量成立",
    },
    {
      label: "修改地址",
      input: "收货地址由街道、城市和邮编共同描述",
      expected: "以新的地址值对象整体替换，值相等不依赖数据库主键",
    },
  ],
} satisfies ArchitectureCourseModel;

export function TacticalPatternsBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function TacticalPatternsTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function TacticalPatternsViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
