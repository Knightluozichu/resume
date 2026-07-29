"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "automotivesystemsspecialization-02",
  title: "发动机性能与增压技术",
  focus:
    "从扭矩、转速和功率关系出发，沿进气—压缩—冷却—燃烧—排气路径解释增压、爆震和 VVT 的协同",
  invariant:
    "任何功率提升都必须对应可持续的空气量、燃料量、燃烧相位、排气能量、冷却能力和机械负荷",
  fault:
    "把峰值增压压力当成功率保证，忽略进气温度、压气机工作区、排气背压、爆震退点火和热保护",
  evidence:
    "扭矩—转速曲线、空气质量流量、歧管压力温度、空燃比、点火角、爆震计数、排气温度和增压器工况点",
  concepts: [
    "扭矩、转速与功率",
    "容积效率与空气量",
    "涡轮增压能量链",
    "中冷与热管理",
    "爆震、辛烷值与控制",
    "VVT 与有效充气",
  ],
  zones: [
    {
      label: "空气与燃料",
      detail: "流量、压力、温度、空燃比和燃烧相位",
    },
    {
      label: "涡轮与机械",
      detail: "排气取能、压缩、曲轴扭矩和转速",
    },
    {
      label: "控制与保护",
      detail: "爆震、排温、限扭、冷却和诊断",
    },
  ],
  trace: ["读取需求", "核对空气量", "定位增压工况", "校正燃烧", "验证热保护"],
  scenarios: [
    {
      label: "低转速急加速",
      input: "驾驶员突然请求大扭矩，涡轮尚未建立目标压比且排气能量有限",
      expected:
        "控制器协调节气门、点火、燃油和废气旁通，输出受可用空气与爆震边界限制",
    },
    {
      label: "高温高负荷",
      input: "环境温度高，中冷后进气温度上升并出现爆震趋势",
      expected:
        "通过退点火、富化或限增压保护系统，不能保持标称峰值而牺牲燃烧与热安全",
    },
  ],
} satisfies VehicleSystemModel;

export function EnginePerformanceSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function EnginePerformanceTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function EnginePerformanceFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
