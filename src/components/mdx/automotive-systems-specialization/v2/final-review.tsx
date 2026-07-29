"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "final-review",
  title: "全书回顾与系统全景",
  focus:
    "用加速、转弯、制动和停车四种工况串联能量、机械、电子与安全边界，并比较燃油动力与纯电动力的共同接口",
  invariant:
    "系统级结论必须能下钻到传感器原始量和执行器反馈，也能上卷到轮胎力、车辆运动和安全状态",
  fault:
    "把各章静态框图拼成全景图，却没有共享时间轴、边界条件、控制所有权和故障传播路径",
  evidence:
    "统一时间戳的踏板/方向输入、能量功率、轴系扭矩、轮速滑移、网络消息、执行器反馈、温度、故障与降级事件",
  concepts: [
    "驾驶意图入口",
    "动力路线分叉",
    "传动与轮胎汇合",
    "分布式控制协作",
    "热与能量守恒",
    "故障传播与隔离",
  ],
  zones: [
    {
      label: "意图与控制",
      detail: "驾驶输入、ECU 目标、网络协作和诊断",
    },
    {
      label: "能量与机械",
      detail: "储能、转换、变速、差速、制动和轮胎",
    },
    {
      label: "车辆与安全",
      detail: "运动响应、附着、热、降级和驾驶员告警",
    },
  ],
  trace: [
    "固定输入与时间",
    "追踪能量转换",
    "追踪控制消息",
    "核对轮胎响应",
    "注入故障复盘",
  ],
  scenarios: [
    {
      label: "弯中加速",
      input: "方向盘已有横向力需求，驾驶员继续增加动力请求且内侧驱动轮开始滑移",
      expected:
        "动力与底盘系统共同限制轮胎合力，保留轨迹控制并记录限扭和介入链",
    },
    {
      label: "高速减速",
      input: "纯电车高 SOC 下高速制动，既有再生请求又接近轮胎滑移边界",
      expected:
        "BMS、逆变器和制动控制协调再生/摩擦分配，ABS 需要时拥有轮端稳定优先权",
    },
  ],
} satisfies VehicleSystemModel;

export function FinalReviewSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function FinalReviewTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function FinalReviewFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
