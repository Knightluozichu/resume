"use client";

import {
  VehicleSystemEvidenceLab,
  type VehicleSystemEvidenceModel,
} from "./vehicle-system-evidence-lab";

const model = {
  unitId: "csi23-03-eco-cars",
  title: "第3章：环境友善的汽车",
  question: "怎样用同一系统边界比较四类环保车，而不是只看是否有尾气管？",
  concepts: [
    "第3章 环境友善的汽车",
    "电动车（EV）① 构造",
    "电动车（EV）② 电机的特性",
    "混合动力车（HV）① 构造",
    "混合动力车（HV）② 驱动方式",
    "混合动力车（HV）③ 原理",
    "插电式混合动力车（PHV）",
    "燃料电池车（FCV）",
    "燃料电池和蓄电池",
    "环保车的课题",
    "专栏 汽车业的环保史",
  ],
  nodeCards: [
    {
      name: "EV",
      input: "“第3章：环境友善的汽车”在EV读取任务、能源或材料。",
      transform: "按画出车载能源路径解释EV的转换与控制。",
      output: "EV向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“用零尾气直接宣称全生命周期零排放，或把HV与可外接充电的PHV混为一类”时，EV不能越过“比较同时报告车载能量路径、补能方式、上游能源和适用工况”。",
    },
    {
      name: "HV",
      input: "“第3章：环境友善的汽车”在HV读取上游节点已经验证的状态。",
      transform: "按比较补能与工况解释HV的转换与控制。",
      output: "HV向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“用零尾气直接宣称全生命周期零排放，或把HV与可外接充电的PHV混为一类”时，HV不能越过“比较同时报告车载能量路径、补能方式、上游能源和适用工况”。",
    },
    {
      name: "PHV",
      input: "“第3章：环境友善的汽车”在PHV读取上游节点已经验证的状态。",
      transform: "按扩展上游及基础设施边界解释PHV的转换与控制。",
      output: "PHV向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“用零尾气直接宣称全生命周期零排放，或把HV与可外接充电的PHV混为一类”时，PHV不能越过“比较同时报告车载能量路径、补能方式、上游能源和适用工况”。",
    },
    {
      name: "FCV",
      input: "“第3章：环境友善的汽车”在FCV读取上游节点已经验证的状态。",
      transform: "按画出车载能源路径解释FCV的转换与控制。",
      output: "FCV向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“用零尾气直接宣称全生命周期零排放，或把HV与可外接充电的PHV混为一类”时，FCV不能越过“比较同时报告车载能量路径、补能方式、上游能源和适用工况”。",
    },
    {
      name: "系统与基础设施",
      input:
        "“第3章：环境友善的汽车”在系统与基础设施读取上游节点已经验证的状态。",
      transform: "按比较补能与工况解释系统与基础设施的转换与控制。",
      output: "系统与基础设施向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“用零尾气直接宣称全生命周期零排放，或把HV与可外接充电的PHV混为一类”时，系统与基础设施不能越过“比较同时报告车载能量路径、补能方式、上游能源和适用工况”。",
    },
  ],
  normalTrace: [
    "为“第3章：环境友善的汽车”声明对象、系统边界和当前工况",
    "沿画出车载能源路径记录输入、状态变化与测量量",
    "进入比较补能与工况并核对接口、损失和质量或安全门",
    "完成扩展上游及基础设施边界，交付一次能源来源、车载储能、转换器、驱动电机或发动机、再生制动、补能条件、上游排放与适用任务。",
  ],
  failureTrace: [
    "复用“第3章：环境友善的汽车”的相同对象、工况、单位和初始状态",
    "只注入系统故障：用零尾气直接宣称全生命周期零排放，或把HV与可外接充电的PHV混为一类",
    "沿输入到输出的方向标记最早出现异常的节点",
    "依据“比较同时报告车载能量路径、补能方式、上游能源和适用工况”拒绝或修正解释，再恢复基线",
  ],
  invariant: "比较同时报告车载能量路径、补能方式、上游能源和适用工况",
  fault: "用零尾气直接宣称全生命周期零排放，或把HV与可外接充电的PHV混为一类",
  artifact:
    "一次能源来源、车载储能、转换器、驱动电机或发动机、再生制动、补能条件、上游排放与适用任务。",
  boundaries: [
    {
      label: "工况边界",
      detail: "核对“第3章：环境友善的汽车”的速度、载荷、温度、能源或制造批次。",
    },
    {
      label: "安全边界",
      detail:
        "核对“第3章：环境友善的汽车”是否涉及高压、旋转、燃油、氢气或道路责任。",
    },
    {
      label: "来源边界",
      detail: "区分“第3章：环境友善的汽车”的2015原版、2023译本与后续技术资料。",
    },
    {
      label: "追溯边界",
      detail: "确保“第3章：环境友善的汽车”的结论能回到对象、接口和原始记录。",
    },
  ],
} satisfies VehicleSystemEvidenceModel;

export function Csi2303EcoCarsTopologyLab() {
  return <VehicleSystemEvidenceLab model={model} view="topology" />;
}

export function Csi2303EcoCarsPathTraceLab() {
  return <VehicleSystemEvidenceLab model={model} view="path-trace" />;
}

export function Csi2303EcoCarsBoundaryProbeLab() {
  return <VehicleSystemEvidenceLab model={model} view="boundary-probe" />;
}
