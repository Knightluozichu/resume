"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "learning-map",
  title: "汽车系统专项学习地图",
  focus:
    "沿能量流、机械传递、控制闭环和故障安全四条线连接动力、底盘、电子与电驱，而不是把部件名堆成目录",
  invariant:
    "每个功能都能指出能量入口、状态观测、控制动作、机械输出和失效后的安全边界",
  fault:
    "只按燃油车与电动车分组，忽略两条技术路线共享的轮胎、制动、车载网络和诊断闭环",
  evidence:
    "能量流图、信号路径、执行器状态、故障降级、边界条件和同工况复盘记录",
  concepts: [
    "能量转换主线",
    "底盘接地边界",
    "感知—决策—执行",
    "分布式网络",
    "故障安全",
    "传统与电驱共性",
  ],
  zones: [
    {
      label: "能量与机械",
      detail: "储能、转换、传动、轮胎与车身运动",
    },
    {
      label: "感知与控制",
      detail: "传感器、ECU、网络、执行器与反馈",
    },
    {
      label: "安全与证据",
      detail: "边界、诊断、降级、告警与复盘",
    },
  ],
  trace: ["确定工况", "画能量流", "画信号流", "检查执行边界", "注入故障复盘"],
  scenarios: [
    {
      label: "低附着加速",
      input: "驾驶员请求大扭矩，但驱动轮可用附着低且轮速开始分化",
      expected:
        "动力控制与底盘控制共享状态并限制轮端扭矩，不能只提高动力源输出",
    },
    {
      label: "紧急制动",
      input: "踏板请求最大减速度，同时车轮接近抱死且车辆存在横摆偏差",
      expected: "液压或再生制动受 ABS/ESC 边界协调，保留转向能力并记录介入原因",
    },
  ],
} satisfies VehicleSystemModel;

export function LearningMapSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function LearningMapTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function LearningMapFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
