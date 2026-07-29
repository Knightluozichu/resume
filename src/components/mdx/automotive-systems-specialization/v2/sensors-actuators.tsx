"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "automotivesystemsspecialization-08",
  title: "传感器与执行器",
  focus:
    "沿被测物理量、敏感元件、信号调理、采样、估计、控制命令、功率驱动和机械响应建立完整闭环",
  invariant:
    "控制器必须区分真实物理量、传感器电信号、软件估计值和执行器实际响应，并为每次转换声明范围与诊断",
  fault:
    "只要传感器数值处于量程内就认为可信，忽略偏置、漂移、卡滞、动态滞后、采样混叠与交叉合理性",
  evidence:
    "原始 ADC/频率信号、缩放值、采样时间、滤波状态、冗余差值、命令占空比、电流、位置反馈和故障码",
  concepts: [
    "测量链与传递函数",
    "采样、滤波与动态",
    "MAF 空气质量测量",
    "曲轴与凸轮位置",
    "功率级与执行器",
    "闭环与合理性诊断",
  ],
  zones: [
    {
      label: "物理与传感",
      detail: "被测量、敏感元件、量程、噪声和动态",
    },
    {
      label: "软件与估计",
      detail: "采样、缩放、滤波、融合和合理性",
    },
    {
      label: "驱动与动作",
      detail: "功率级、PWM、电流、位置和机械反馈",
    },
  ],
  trace: [
    "定义被测量",
    "采样与缩放",
    "检查可信度",
    "计算控制命令",
    "确认实际响应",
  ],
  scenarios: [
    {
      label: "传感器慢漂移",
      input: "空气质量信号仍在电气量程内，但长期偏高且与歧管压力模型不一致",
      expected:
        "交叉合理性发现偏差并采用受限替代值，不能因未越过量程阈值继续闭环补偿",
    },
    {
      label: "执行器卡滞",
      input: "节气门命令变化但位置反馈和进气响应不随动，驱动电流异常",
      expected:
        "控制器区分命令与动作，停止危险驱动、进入降级并保存可复现诊断证据",
    },
  ],
} satisfies VehicleSystemModel;

export function SensorsActuatorsSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function SensorsActuatorsTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function SensorsActuatorsFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
