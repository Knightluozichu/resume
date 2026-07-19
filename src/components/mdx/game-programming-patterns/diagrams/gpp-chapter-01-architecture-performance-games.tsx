import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "1. Architecture, Performance, and Games";
const focus = "在可修改性、运行性能和交付速度之间做阶段性取舍";
const stages = [
  "实现需求",
  "观察变化",
  "测量热点",
  "建立边界",
  "重新简化"
];
const nodes = [
  {
    "label": "1. Architecture, Performance, and Games",
    "mechanism": "1. Architecture, Performance, and Games 聚焦运行代价，固定场景后用改动模块数、性能剖析、交付周期与删除成本定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查改动模块数、性能剖析、交付周期与删除成本"
  },
  {
    "label": "What is Software Architecture?",
    "mechanism": "What is Software Architecture? 是设计分叉题；回答必须说明选择怎样改变先观察真实改动，再只为已经出现的变化轴建立最小边界，以及哪条反例会推翻选择。",
    "probe": "检查改动模块数、性能剖析、交付周期与删除成本"
  },
  {
    "label": "What is good software architecture?",
    "mechanism": "What is good software architecture? 是设计分叉题；回答必须说明选择怎样改变先观察真实改动，再只为已经出现的变化轴建立最小边界，以及哪条反例会推翻选择。",
    "probe": "检查改动模块数、性能剖析、交付周期与删除成本"
  },
  {
    "label": "How do you make a change?",
    "mechanism": "How do you make a change? 是设计分叉题；回答必须说明选择怎样改变先观察真实改动，再只为已经出现的变化轴建立最小边界，以及哪条反例会推翻选择。",
    "probe": "检查改动模块数、性能剖析、交付周期与删除成本"
  },
  {
    "label": "How can decoupling help?",
    "mechanism": "How can decoupling help? 是设计分叉题；回答必须说明选择怎样改变先观察真实改动，再只为已经出现的变化轴建立最小边界，以及哪条反例会推翻选择。",
    "probe": "检查改动模块数、性能剖析、交付周期与删除成本"
  },
  {
    "label": "At What Cost?",
    "mechanism": "At What Cost? 是设计分叉题；回答必须说明选择怎样改变先观察真实改动，再只为已经出现的变化轴建立最小边界，以及哪条反例会推翻选择。",
    "probe": "检查改动模块数、性能剖析、交付周期与删除成本"
  },
  {
    "label": "Performance and Speed",
    "mechanism": "Performance and Speed 聚焦运行代价，固定场景后用改动模块数、性能剖析、交付周期与删除成本定位首个超限点，不能以模式名称推断快慢。",
    "probe": "检查改动模块数、性能剖析、交付周期与删除成本"
  },
  {
    "label": "The Good in Bad Code",
    "mechanism": "The Good in Bad Code 把本章机制落到一个具体设计坐标：先观察真实改动，再只为已经出现的变化轴建立最小边界，并以“架构成本必须由后续改动或性能证据偿还”作为通过条件。",
    "probe": "检查改动模块数、性能剖析、交付周期与删除成本"
  },
  {
    "label": "Striking a Balance",
    "mechanism": "Striking a Balance 把本章机制落到一个具体设计坐标：先观察真实改动，再只为已经出现的变化轴建立最小边界，并以“架构成本必须由后续改动或性能证据偿还”作为通过条件。",
    "probe": "检查改动模块数、性能剖析、交付周期与删除成本"
  },
  {
    "label": "Simplicity",
    "mechanism": "Simplicity 把本章机制落到一个具体设计坐标：先观察真实改动，再只为已经出现的变化轴建立最小边界，并以“架构成本必须由后续改动或性能证据偿还”作为通过条件。",
    "probe": "检查改动模块数、性能剖析、交付周期与删除成本"
  },
  {
    "label": "Get On With It, Already",
    "mechanism": "Get On With It, Already 把本章机制落到一个具体设计坐标：先观察真实改动，再只为已经出现的变化轴建立最小边界，并以“架构成本必须由后续改动或性能证据偿还”作为通过条件。",
    "probe": "检查改动模块数、性能剖析、交付周期与删除成本"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "预先泛化",
  "candidateLabel": "证据驱动边界",
  "unit": "人时",
  "baselineBase": 10,
  "baselineSlope": 4.2,
  "candidateBase": 6,
  "candidateSlope": 1.5,
  "faultPenalty": 9,
  "invariant": "架构成本必须由后续改动或性能证据偿还",
  "fault": "原型代码在没有验证边界的情况下直接进入生产",
  "evidence": "改动模块数、性能剖析、交付周期与删除成本"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter01ArchitecturePerformanceGamesMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter01ArchitecturePerformanceGamesExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter01ArchitecturePerformanceGamesEvidenceLab() {
  return <GppFailureLab {...props} />;
}
