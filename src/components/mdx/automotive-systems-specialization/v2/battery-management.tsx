"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "automotivesystemsspecialization-11",
  title: "电池管理系统",
  focus:
    "从单体、模组、整包测量出发，区分 SOC 估计、SOH 评估、功率边界、均衡、热管理和高压接触器安全状态",
  invariant:
    "充放电允许功率必须同时服从最弱单体电压、温度、电流、绝缘、接触器与估计不确定性，整包平均值不能掩盖单体越界",
  fault:
    "把 SOC 当作可直接测量的精确百分比，或只看整包电压而忽略单体差异、温度梯度和传感器偏置",
  evidence:
    "单体/模组电压、总电流、温度分布、库仑积分、静置校正、SOC/SOH 状态、均衡命令、绝缘、预充和接触器反馈",
  concepts: [
    "单体—模组—整包",
    "SOC 估计",
    "SOH 与可用功率",
    "单体均衡",
    "热管理与传播边界",
    "预充、接触器与绝缘",
  ],
  zones: [
    {
      label: "电芯与测量",
      detail: "单体电压、总电流、温度、绝缘和传感可信度",
    },
    {
      label: "估计与边界",
      detail: "SOC、SOH、可用能量和充放电功率",
    },
    {
      label: "高压与热安全",
      detail: "均衡、冷却、预充、接触器、熔断和降级",
    },
  ],
  trace: [
    "校验测量",
    "更新 SOC/SOH",
    "寻找最弱单体",
    "计算功率边界",
    "控制热与高压状态",
  ],
  scenarios: [
    {
      label: "低温快充请求",
      input: "电池整体 SOC 不高，但最低单体温度低且内阻上升",
      expected: "按低温单体限制充电功率并先加热，不能由平均 SOC 直接批准快充",
    },
    {
      label: "预充失败",
      input: "预充开始后直流母线电压未按预期接近电池电压，接触器反馈存在异常",
      expected: "拒绝闭合主接触器、释放高压请求并保存电压时间轨迹与反馈诊断",
    },
  ],
} satisfies VehicleSystemModel;

export function BatteryManagementSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function BatteryManagementTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function BatteryManagementFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
