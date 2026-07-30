"use client";

import {
  VehicleSystemEvidenceLab,
  type VehicleSystemEvidenceModel,
} from "./vehicle-system-evidence-lab";

const model = {
  unitId: "csi23-prologue",
  title: "序章：汽车的前世今生",
  question:
    "怎样区分发动机位置、驱动轮、动力源和车体用途，避免用一个标签推断全部性能？",
  concepts: [
    "序章 汽车的前世今生",
    "汽车的进化",
    "汽车的零件",
    "汽车的驱动方式",
    "汽车的动力源",
    "专栏 车体风格",
  ],
  nodeCards: [
    {
      name: "时代需求",
      input: "“序章：汽车的前世今生”在时代需求读取任务、能源或材料。",
      transform: "按建立历史与用途背景解释时代需求的转换与控制。",
      output: "时代需求向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“只凭SUV、前驱或电动车标签就断言空间、操控、效率与安全性”时，时代需求不能越过“分类轴分别记录，任何性能判断都附带车型、工况和时代范围”。",
    },
    {
      name: "部件集合",
      input: "“序章：汽车的前世今生”在部件集合读取上游节点已经验证的状态。",
      transform: "按分离四条分类轴解释部件集合的转换与控制。",
      output: "部件集合向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“只凭SUV、前驱或电动车标签就断言空间、操控、效率与安全性”时，部件集合不能越过“分类轴分别记录，任何性能判断都附带车型、工况和时代范围”。",
    },
    {
      name: "动力源",
      input: "“序章：汽车的前世今生”在动力源读取上游节点已经验证的状态。",
      transform: "按验证标签的推断边界解释动力源的转换与控制。",
      output: "动力源向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“只凭SUV、前驱或电动车标签就断言空间、操控、效率与安全性”时，动力源不能越过“分类轴分别记录，任何性能判断都附带车型、工况和时代范围”。",
    },
    {
      name: "驱动布置",
      input: "“序章：汽车的前世今生”在驱动布置读取上游节点已经验证的状态。",
      transform: "按建立历史与用途背景解释驱动布置的转换与控制。",
      output: "驱动布置向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“只凭SUV、前驱或电动车标签就断言空间、操控、效率与安全性”时，驱动布置不能越过“分类轴分别记录，任何性能判断都附带车型、工况和时代范围”。",
    },
    {
      name: "车体用途",
      input: "“序章：汽车的前世今生”在车体用途读取上游节点已经验证的状态。",
      transform: "按分离四条分类轴解释车体用途的转换与控制。",
      output: "车体用途向下游交付带单位的状态、接口或判断证据。",
      boundary:
        "出现“只凭SUV、前驱或电动车标签就断言空间、操控、效率与安全性”时，车体用途不能越过“分类轴分别记录，任何性能判断都附带车型、工况和时代范围”。",
    },
  ],
  normalTrace: [
    "为“序章：汽车的前世今生”声明对象、系统边界和当前工况",
    "沿建立历史与用途背景记录输入、状态变化与测量量",
    "进入分离四条分类轴并核对接口、损失和质量或安全门",
    "完成验证标签的推断边界，交付车型时代、用途、动力源、发动机或电机位置、驱动轮、关键部件和不可由分类直接推出的属性。",
  ],
  failureTrace: [
    "复用“序章：汽车的前世今生”的相同对象、工况、单位和初始状态",
    "只注入系统故障：只凭SUV、前驱或电动车标签就断言空间、操控、效率与安全性",
    "沿输入到输出的方向标记最早出现异常的节点",
    "依据“分类轴分别记录，任何性能判断都附带车型、工况和时代范围”拒绝或修正解释，再恢复基线",
  ],
  invariant: "分类轴分别记录，任何性能判断都附带车型、工况和时代范围",
  fault: "只凭SUV、前驱或电动车标签就断言空间、操控、效率与安全性",
  artifact:
    "车型时代、用途、动力源、发动机或电机位置、驱动轮、关键部件和不可由分类直接推出的属性。",
  boundaries: [
    {
      label: "工况边界",
      detail: "核对“序章：汽车的前世今生”的速度、载荷、温度、能源或制造批次。",
    },
    {
      label: "安全边界",
      detail:
        "核对“序章：汽车的前世今生”是否涉及高压、旋转、燃油、氢气或道路责任。",
    },
    {
      label: "来源边界",
      detail: "区分“序章：汽车的前世今生”的2015原版、2023译本与后续技术资料。",
    },
    {
      label: "追溯边界",
      detail: "确保“序章：汽车的前世今生”的结论能回到对象、接口和原始记录。",
    },
  ],
} satisfies VehicleSystemEvidenceModel;

export function Csi23PrologueTopologyLab() {
  return <VehicleSystemEvidenceLab model={model} view="topology" />;
}

export function Csi23ProloguePathTraceLab() {
  return <VehicleSystemEvidenceLab model={model} view="path-trace" />;
}

export function Csi23PrologueBoundaryProbeLab() {
  return <VehicleSystemEvidenceLab model={model} view="boundary-probe" />;
}
