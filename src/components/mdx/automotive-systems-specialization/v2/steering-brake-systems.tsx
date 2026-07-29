"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "automotivesystemsspecialization-06",
  title: "转向与制动系统",
  focus:
    "把驾驶员方向与减速意图、机械/液压传递、EPS 助力、ABS 滑移控制和 ESC 横摆修正放在同一底盘闭环中",
  invariant:
    "电子控制只能在轮胎附着圆内分配纵横向力，基础转向与制动必须保留可诊断的机械或液压安全边界",
  fault:
    "把 ABS 描述为所有路面都缩短制动距离，或把 ESC 当成能违反附着极限自动修正任何入弯速度",
  evidence:
    "方向盘角与扭矩、转向机位置、四轮速度、估算车速、滑移率、制动压力、横摆率、横向加速度和介入状态",
  concepts: [
    "转向几何与转向比",
    "EPS 助力闭环",
    "摩擦制动能量",
    "ABS 轮滑移调节",
    "ESC 横摆控制",
    "基础系统与降级",
  ],
  zones: [
    {
      label: "驾驶意图",
      detail: "方向盘、踏板、目标轨迹与目标减速度",
    },
    {
      label: "底盘执行",
      detail: "EPS、电机、液压、卡钳和选择性轮制动",
    },
    {
      label: "轮胎与车身",
      detail: "滑移、横摆、附着、热和稳定边界",
    },
  ],
  trace: [
    "读取驾驶意图",
    "估计车辆状态",
    "分配轮胎力",
    "执行助力/压力",
    "诊断并降级",
  ],
  scenarios: [
    {
      label: "分离附着制动",
      input: "左右车轮分别位于高低附着路面，驾驶员紧急制动并保持转向",
      expected:
        "ABS 分轮调压并控制横摆趋势，基础目标是可控与稳定而非承诺固定最短距离",
    },
    {
      label: "过度转向趋势",
      input: "实际横摆率显著偏离驾驶员方向盘所表达的目标响应",
      expected:
        "ESC 在可用附着内选择车轮制动并协调动力，若边界不足则降低速度而非伪造轨迹",
    },
  ],
} satisfies VehicleSystemModel;

export function SteeringBrakeSystemsSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function SteeringBrakeSystemsTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function SteeringBrakeSystemsFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
