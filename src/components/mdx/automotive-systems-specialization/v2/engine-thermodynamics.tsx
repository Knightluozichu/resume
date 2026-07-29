"use client";

import {
  VehicleSystemLab,
  type VehicleSystemModel,
} from "./vehicle-system-lab";

const model = {
  unitId: "automotivesystemsspecialization-01",
  title: "发动机热力学循环",
  focus:
    "把四冲程机械事件与理想奥托循环的状态点对应起来，再解释真实发动机为何达不到理想热效率",
  invariant:
    "P–V 图的封闭面积代表每循环净功；压缩、定容加热、膨胀和放热的状态顺序不能被进排气冲程混淆",
  fault:
    "把理想奥托循环当成真实缸压轨迹，并由压缩比提高直接推出任何工况下效率都会等比例提升",
  evidence:
    "曲轴相位、气门状态、缸压与容积轨迹、净指示功、热损失、泵气损失和爆震边界",
  concepts: [
    "四冲程与曲轴相位",
    "理想奥托循环状态点",
    "P–V 图与净功",
    "压缩比与理想效率",
    "泵气、传热与摩擦",
    "爆震与材料边界",
  ],
  zones: [
    {
      label: "状态与热量",
      detail: "压力、温度、容积和加热放热过程",
    },
    {
      label: "活塞与曲轴",
      detail: "四冲程、气门事件、指示功和机械损失",
    },
    {
      label: "真实限制",
      detail: "燃烧、爆震、传热、泵气和材料边界",
    },
  ],
  trace: ["标状态点", "执行压缩", "加入热量", "执行膨胀", "扣除真实损失"],
  scenarios: [
    {
      label: "同排量提压缩比",
      input: "几何排量与转速不变，只提高压缩比并保持理想模型假设",
      expected:
        "理想效率趋势提高，但真实方案仍需重新检查爆震、温度、燃烧相位和材料负荷",
    },
    {
      label: "小负荷节气",
      input: "火花点火发动机低负荷运行，进气歧管压力显著低于环境压力",
      expected: "泵气回路扩大，实际制动效率不能仅由理想奥托效率解释",
    },
  ],
} satisfies VehicleSystemModel;

export function EngineThermodynamicsSystemLab() {
  return <VehicleSystemLab model={model} view="system" />;
}

export function EngineThermodynamicsTraceLab() {
  return <VehicleSystemLab model={model} view="trace" />;
}

export function EngineThermodynamicsFaultLab() {
  return <VehicleSystemLab model={model} view="fault" />;
}
