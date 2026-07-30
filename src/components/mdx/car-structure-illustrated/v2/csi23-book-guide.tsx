"use client";

import {
  VehicleSystemEvidenceLab,
  type VehicleSystemEvidenceModel,
} from "./vehicle-system-evidence-lab";

const model = {
  unitId: "csi23-book-guide",
  title: "本书的使用方法",
  question: "怎样用四遍读图法复原一个汽车主题，而不是只看零件标签？",
  concepts: [
    "本书的使用方法",
    "图解坐标",
    "观察视角",
    "连接方向",
    "状态变化",
    "图外假设",
    "安全边界",
  ],
  nodeCards: [
    {
      name: "对象",
      input: "“本书的使用方法”在对象读取任务、能源或材料。",
      transform: "按识别对象与视角解释对象的转换与控制。",
      output: "对象向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“看到剖面图后只记部件名称，却无法解释箭头携带的是力、能量、材料还是信号”时，对象不能越过“每条连线都说明传递对象、方向、状态变化和适用工况”。",
    },
    {
      name: "上游输入",
      input: "“本书的使用方法”在上游输入读取上游节点已经验证的状态。",
      transform: "按追踪连接和状态解释上游输入的转换与控制。",
      output: "上游输入向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“看到剖面图后只记部件名称，却无法解释箭头携带的是力、能量、材料还是信号”时，上游输入不能越过“每条连线都说明传递对象、方向、状态变化和适用工况”。",
    },
    {
      name: "内部转换",
      input: "“本书的使用方法”在内部转换读取上游节点已经验证的状态。",
      transform: "按补充边界与复核解释内部转换的转换与控制。",
      output: "内部转换向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“看到剖面图后只记部件名称，却无法解释箭头携带的是力、能量、材料还是信号”时，内部转换不能越过“每条连线都说明传递对象、方向、状态变化和适用工况”。",
    },
    {
      name: "下游输出",
      input: "“本书的使用方法”在下游输出读取上游节点已经验证的状态。",
      transform: "按识别对象与视角解释下游输出的转换与控制。",
      output: "下游输出向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“看到剖面图后只记部件名称，却无法解释箭头携带的是力、能量、材料还是信号”时，下游输出不能越过“每条连线都说明传递对象、方向、状态变化和适用工况”。",
    },
    {
      name: "保护边界",
      input: "“本书的使用方法”在保护边界读取上游节点已经验证的状态。",
      transform: "按追踪连接和状态解释保护边界的转换与控制。",
      output: "保护边界向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“看到剖面图后只记部件名称，却无法解释箭头携带的是力、能量、材料还是信号”时，保护边界不能越过“每条连线都说明传递对象、方向、状态变化和适用工况”。",
    },
  ],
  normalTrace: [
    "为“本书的使用方法”声明对象、系统边界和当前工况",
    "沿识别对象与视角记录输入、状态变化与测量量",
    "进入追踪连接和状态并核对接口、损失和质量或安全门",
    "完成补充边界与复核，交付图解坐标、对象清单、方向箭头、状态变化、图外假设、安全边界与复述检查。",
  ],
  failureTrace: [
    "复用“本书的使用方法”的相同对象、工况、单位和初始状态",
    "只注入系统故障：看到剖面图后只记部件名称，却无法解释箭头携带的是力、能量、材料还是信号",
    "沿输入到输出的方向标记最早出现异常的节点",
    "依据“每条连线都说明传递对象、方向、状态变化和适用工况”拒绝或修正解释，再恢复基线",
  ],
  invariant: "每条连线都说明传递对象、方向、状态变化和适用工况",
  fault:
    "看到剖面图后只记部件名称，却无法解释箭头携带的是力、能量、材料还是信号",
  artifact:
    "图解坐标、对象清单、方向箭头、状态变化、图外假设、安全边界与复述检查。",
  boundaries: [
    {
      label: "工况边界",
      detail: "核对“本书的使用方法”的速度、载荷、温度、能源或制造批次。",
    },
    {
      label: "安全边界",
      detail: "核对“本书的使用方法”是否涉及高压、旋转、燃油、氢气或道路责任。",
    },
    {
      label: "来源边界",
      detail: "区分“本书的使用方法”的2015原版、2023译本与后续技术资料。",
    },
    {
      label: "追溯边界",
      detail: "确保“本书的使用方法”的结论能回到对象、接口和原始记录。",
    },
  ],
} satisfies VehicleSystemEvidenceModel;

export function Csi23BookGuideTopologyLab() {
  return <VehicleSystemEvidenceLab model={model} view="topology" />;
}

export function Csi23BookGuidePathTraceLab() {
  return <VehicleSystemEvidenceLab model={model} view="path-trace" />;
}

export function Csi23BookGuideBoundaryProbeLab() {
  return <VehicleSystemEvidenceLab model={model} view="boundary-probe" />;
}
