import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "II. Design Patterns Revisited";
const focus = "比较六个经典模式在游戏时序、数据和所有权中的真实角色";
const stages = [
  "识别问题",
  "列出候选",
  "比较时序",
  "比较代价",
  "选择最小项"
];
const nodes = [
  {
    "label": "II. Design Patterns Revisited",
    "mechanism": "II. Design Patterns Revisited 把本章机制落到一个具体设计坐标：以命令、享元、观察者、原型、单例和状态的失败模型做横向选择，并以“同一问题只引入能解释首要变化轴的最小机制”作为通过条件。",
    "probe": "检查依赖边、生命周期、分配轨迹与替代方案"
  },
  {
    "label": "The Patterns",
    "mechanism": "The Patterns 把本章机制落到一个具体设计坐标：以命令、享元、观察者、原型、单例和状态的失败模型做横向选择，并以“同一问题只引入能解释首要变化轴的最小机制”作为通过条件。",
    "probe": "检查依赖边、生命周期、分配轨迹与替代方案"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "模式堆叠",
  "candidateLabel": "单轴选择",
  "unit": "依赖边",
  "baselineBase": 12,
  "baselineSlope": 5,
  "candidateBase": 5,
  "candidateSlope": 1.8,
  "faultPenalty": 10,
  "invariant": "同一问题只引入能解释首要变化轴的最小机制",
  "fault": "为了模式数量同时叠加单例、观察者和命令",
  "evidence": "依赖边、生命周期、分配轨迹与替代方案"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppDesignPatternsRevisitedMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppDesignPatternsRevisitedExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppDesignPatternsRevisitedEvidenceLab() {
  return <GppFailureLab {...props} />;
}
