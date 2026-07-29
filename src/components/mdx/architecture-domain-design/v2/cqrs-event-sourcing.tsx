"use client";

import {
  ArchitectureBoundaryLab,
  type ArchitectureCourseModel,
} from "./architecture-boundary-lab";

const model = {
  unitId: "architecturedomaindesign-10",
  title: "CQRS 与事件溯源",
  focus:
    "分别判断读写模型分离与事件日志作为事实源的必要性，并设计同步、重放和一致性边界",
  invariant:
    "命令只表达改变意图，查询不产生领域副作用；采用事件溯源时事件日志不可被事后改写",
  fault:
    "把 CQRS 等同于双数据库，把事件溯源等同于普通审计日志，并默认两者必须同时采用",
  evidence:
    "命令合同、查询投影、事件顺序、处理幂等键、重放结果、快照版本与一致性窗口",
  concepts: [
    "命令模型",
    "查询模型",
    "读模型同步",
    "事件日志作为事实源",
    "重放与快照",
    "最终一致性",
    "CQRS 与事件溯源可独立采用",
  ],
  zones: [
    {
      label: "命令与事件",
      detail: "验证意图并形成不可改写的领域事实",
    },
    {
      label: "同步与重放",
      detail: "按顺序、幂等地构建可恢复状态",
    },
    {
      label: "查询投影",
      detail: "面向读取场景并声明一致性窗口",
    },
  ],
  trace: [
    "接收命令",
    "验证不变量",
    "追加领域事件",
    "更新查询投影",
    "重放核对状态",
  ],
  scenarios: [
    {
      label: "订单状态历史",
      input: "需要解释订单为什么从已支付转为退款完成",
      expected: "事件序列保留每次领域变化，重放得到同一当前状态和解释路径",
    },
    {
      label: "高频报表读取",
      input: "复杂报表读取远多于订单写入且形状完全不同",
      expected: "先评估独立查询投影；无需因此自动采用事件溯源",
    },
  ],
} satisfies ArchitectureCourseModel;

export function CqrsEventSourcingBoundaryLab() {
  return <ArchitectureBoundaryLab model={model} view="boundary" />;
}

export function CqrsEventSourcingTraceLab() {
  return <ArchitectureBoundaryLab model={model} view="trace" />;
}

export function CqrsEventSourcingViolationLab() {
  return <ArchitectureBoundaryLab model={model} view="violation" />;
}
