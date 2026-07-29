"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "automotivesystemsspecialization-10",
  title: "电机与电机控制器",
  focus:
    "沿电池直流母线、逆变器三相桥、PMSM 电磁转矩、减速器和车轮追踪能量，并区分恒转矩、弱磁与再生区",
  invariant:
    "电池允许功率、直流母线电压、电流、开关器件温度、电机转速与磁链共同限制可用扭矩，命令不能越过最小边界",
  fault:
    "把电机零转速大扭矩理解为全转速恒定大扭矩，忽略反电动势、电压饱和、弱磁、电流和热限制",
  evidence:
    "直流电压电流、三相电流、转子角、d/q 轴电流、调制状态、目标/实际扭矩、转速、器件与绕组温度",
  concepts: [
    "直流母线与逆变器",
    "PMSM 电磁转矩",
    "坐标变换与 FOC",
    "恒转矩与恒功率区",
    "再生制动",
    "热与故障保护",
  ],
  zones: [
    {
      label: "电池与直流",
      detail: "母线电压、电流、允许充放电功率和接触器",
    },
    {
      label: "逆变器与电机",
      detail: "开关、三相电流、转子角、磁链和电磁转矩",
    },
    {
      label: "机械与热",
      detail: "转速、减速器、轮端、回收和温度边界",
    },
  ],
  trace: [
    "接收扭矩请求",
    "核对电池边界",
    "计算电流目标",
    "调制三相电压",
    "反馈转矩与温度",
  ],
  scenarios: [
    {
      label: "低速大扭矩",
      input: "车辆起步请求大正扭矩，转速低但相电流和器件温度接近边界",
      expected: "按最小电流与热边界限扭，转矩响应不能只由踏板请求决定",
    },
    {
      label: "高 SOC 再生",
      input: "高速松开踏板请求再生，但电池接近满电且允许充电功率很低",
      expected: "降低电机负转矩并由摩擦制动补足减速度，保持轮端制动连续性",
    },
  ],
} satisfies VehicleSystemModel;

export function EvMotorControllerSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function EvMotorControllerTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function EvMotorControllerFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
