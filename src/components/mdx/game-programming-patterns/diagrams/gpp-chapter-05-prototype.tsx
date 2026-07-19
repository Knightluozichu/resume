import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "5. Prototype";
const focus = "用可复制对象或数据模板定义新种类，并区分深浅复制边界";
const stages = [
  "定义原型",
  "校验数据",
  "复制实例",
  "重建所有权",
  "修改隔离"
];
const nodes = [
  {
    "label": "5. Prototype",
    "mechanism": "5. Prototype 把本章机制落到一个具体设计坐标：原型保存共享配置，生成过程复制可变状态并重建所有权关系，并以“克隆实例可独立变化且不会反向修改原型”作为通过条件。",
    "probe": "检查对象图、资源引用、克隆差异与数据装载日志"
  },
  {
    "label": "The Prototype Design Pattern",
    "mechanism": "The Prototype Design Pattern 把本章机制落到一个具体设计坐标：原型保存共享配置，生成过程复制可变状态并重建所有权关系，并以“克隆实例可独立变化且不会反向修改原型”作为通过条件。",
    "probe": "检查对象图、资源引用、克隆差异与数据装载日志"
  },
  {
    "label": "How well does it work?",
    "mechanism": "How well does it work? 是设计分叉题；回答必须说明选择怎样改变原型保存共享配置，生成过程复制可变状态并重建所有权关系，以及哪条反例会推翻选择。",
    "probe": "检查对象图、资源引用、克隆差异与数据装载日志"
  },
  {
    "label": "Spawn functions",
    "mechanism": "Spawn functions 把本章机制落到一个具体设计坐标：原型保存共享配置，生成过程复制可变状态并重建所有权关系，并以“克隆实例可独立变化且不会反向修改原型”作为通过条件。",
    "probe": "检查对象图、资源引用、克隆差异与数据装载日志"
  },
  {
    "label": "Templates",
    "mechanism": "Templates 把本章机制落到一个具体设计坐标：原型保存共享配置，生成过程复制可变状态并重建所有权关系，并以“克隆实例可独立变化且不会反向修改原型”作为通过条件。",
    "probe": "检查对象图、资源引用、克隆差异与数据装载日志"
  },
  {
    "label": "First-class types",
    "mechanism": "First-class types 把本章机制落到一个具体设计坐标：原型保存共享配置，生成过程复制可变状态并重建所有权关系，并以“克隆实例可独立变化且不会反向修改原型”作为通过条件。",
    "probe": "检查对象图、资源引用、克隆差异与数据装载日志"
  },
  {
    "label": "The Prototype Language Paradigm",
    "mechanism": "The Prototype Language Paradigm 把本章机制落到一个具体设计坐标：原型保存共享配置，生成过程复制可变状态并重建所有权关系，并以“克隆实例可独立变化且不会反向修改原型”作为通过条件。",
    "probe": "检查对象图、资源引用、克隆差异与数据装载日志"
  },
  {
    "label": "Self",
    "mechanism": "Self 把本章机制落到一个具体设计坐标：原型保存共享配置，生成过程复制可变状态并重建所有权关系，并以“克隆实例可独立变化且不会反向修改原型”作为通过条件。",
    "probe": "检查对象图、资源引用、克隆差异与数据装载日志"
  },
  {
    "label": "How did it go?",
    "mechanism": "How did it go? 是设计分叉题；回答必须说明选择怎样改变原型保存共享配置，生成过程复制可变状态并重建所有权关系，以及哪条反例会推翻选择。",
    "probe": "检查对象图、资源引用、克隆差异与数据装载日志"
  },
  {
    "label": "What about JavaScript?",
    "mechanism": "What about JavaScript? 是设计分叉题；回答必须说明选择怎样改变原型保存共享配置，生成过程复制可变状态并重建所有权关系，以及哪条反例会推翻选择。",
    "probe": "检查对象图、资源引用、克隆差异与数据装载日志"
  },
  {
    "label": "Prototypes for Data Modeling",
    "mechanism": "Prototypes for Data Modeling 把本章机制落到一个具体设计坐标：原型保存共享配置，生成过程复制可变状态并重建所有权关系，并以“克隆实例可独立变化且不会反向修改原型”作为通过条件。",
    "probe": "检查对象图、资源引用、克隆差异与数据装载日志"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "种类子类",
  "candidateLabel": "数据原型",
  "unit": "类型改动",
  "baselineBase": 10,
  "baselineSlope": 4.5,
  "candidateBase": 6,
  "candidateSlope": 1.2,
  "faultPenalty": 9,
  "invariant": "克隆实例可独立变化且不会反向修改原型",
  "fault": "浅复制让两个实例共享可变背包",
  "evidence": "对象图、资源引用、克隆差异与数据装载日志"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppChapter05PrototypeMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppChapter05PrototypeExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppChapter05PrototypeEvidenceLab() {
  return <GppFailureLab {...props} />;
}
