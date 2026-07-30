"use client";

import {
  VehicleSystemEvidenceLab,
  type VehicleSystemEvidenceModel,
} from "./vehicle-system-evidence-lab";

const model = {
  unitId: "csi23-02-production",
  title: "第2章：汽车的生产方式",
  question: "怎样为每道工序声明输入、状态变化、质量门和不合格回退？",
  concepts: [
    "第2章 汽车的生产方式",
    "汽车的制造",
    "车体制造① 冲压",
    "车体制造② 焊接",
    "车体制造③ 涂装",
    "车体制造④ 组装",
    "副线① 发动机",
    "副线② 车门和仪表板",
    "成车检验",
    "专栏 防撞安全措施",
  ],
  nodeCards: [
    {
      name: "冲压",
      input: "“第2章：汽车的生产方式”在冲压读取任务、能源或材料。",
      transform: "按车体成形与连接解释冲压的转换与控制。",
      output: "冲压向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“把终检当作创造质量的步骤，忽略缺陷已在前序工序形成”时，冲压不能越过“终检结果可以反向追到材料、连接、涂层、装配或校准的具体工序”。",
    },
    {
      name: "焊接",
      input: "“第2章：汽车的生产方式”在焊接读取上游节点已经验证的状态。",
      transform: "按表面处理与总装解释焊接的转换与控制。",
      output: "焊接向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“把终检当作创造质量的步骤，忽略缺陷已在前序工序形成”时，焊接不能越过“终检结果可以反向追到材料、连接、涂层、装配或校准的具体工序”。",
    },
    {
      name: "涂装",
      input: "“第2章：汽车的生产方式”在涂装读取上游节点已经验证的状态。",
      transform: "按副线汇合及终检解释涂装的转换与控制。",
      output: "涂装向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“把终检当作创造质量的步骤，忽略缺陷已在前序工序形成”时，涂装不能越过“终检结果可以反向追到材料、连接、涂层、装配或校准的具体工序”。",
    },
    {
      name: "组装",
      input: "“第2章：汽车的生产方式”在组装读取上游节点已经验证的状态。",
      transform: "按车体成形与连接解释组装的转换与控制。",
      output: "组装向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“把终检当作创造质量的步骤，忽略缺陷已在前序工序形成”时，组装不能越过“终检结果可以反向追到材料、连接、涂层、装配或校准的具体工序”。",
    },
    {
      name: "检验与出厂",
      input: "“第2章：汽车的生产方式”在检验与出厂读取上游节点已经验证的状态。",
      transform: "按表面处理与总装解释检验与出厂的转换与控制。",
      output: "检验与出厂向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“把终检当作创造质量的步骤，忽略缺陷已在前序工序形成”时，检验与出厂不能越过“终检结果可以反向追到材料、连接、涂层、装配或校准的具体工序”。",
    },
  ],
  normalTrace: [
    "为“第2章：汽车的生产方式”声明对象、系统边界和当前工况",
    "沿车体成形与连接记录输入、状态变化与测量量",
    "进入表面处理与总装并核对接口、损失和质量或安全门",
    "完成副线汇合及终检，交付工序流程、输入批次、关键特性、测量位置、质量门、返修或隔离路径和成车检验记录。",
  ],
  failureTrace: [
    "复用“第2章：汽车的生产方式”的相同对象、工况、单位和初始状态",
    "只注入系统故障：把终检当作创造质量的步骤，忽略缺陷已在前序工序形成",
    "沿输入到输出的方向标记最早出现异常的节点",
    "依据“终检结果可以反向追到材料、连接、涂层、装配或校准的具体工序”拒绝或修正解释，再恢复基线",
  ],
  invariant: "终检结果可以反向追到材料、连接、涂层、装配或校准的具体工序",
  fault: "把终检当作创造质量的步骤，忽略缺陷已在前序工序形成",
  artifact:
    "工序流程、输入批次、关键特性、测量位置、质量门、返修或隔离路径和成车检验记录。",
  boundaries: [
    {
      label: "工况边界",
      detail: "核对“第2章：汽车的生产方式”的速度、载荷、温度、能源或制造批次。",
    },
    {
      label: "安全边界",
      detail:
        "核对“第2章：汽车的生产方式”是否涉及高压、旋转、燃油、氢气或道路责任。",
    },
    {
      label: "来源边界",
      detail: "区分“第2章：汽车的生产方式”的2015原版、2023译本与后续技术资料。",
    },
    {
      label: "追溯边界",
      detail: "确保“第2章：汽车的生产方式”的结论能回到对象、接口和原始记录。",
    },
  ],
} satisfies VehicleSystemEvidenceModel;

export function Csi2302ProductionTopologyLab() {
  return <VehicleSystemEvidenceLab model={model} view="topology" />;
}

export function Csi2302ProductionPathTraceLab() {
  return <VehicleSystemEvidenceLab model={model} view="path-trace" />;
}

export function Csi2302ProductionBoundaryProbeLab() {
  return <VehicleSystemEvidenceLab model={model} view="boundary-probe" />;
}
