import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "VI. Optimization Patterns";
const focus = "只在剖析定位热点后选择数据布局、延迟计算、复用或空间索引";
const stages = [
  "固定场景",
  "采集剖析",
  "归因热点",
  "应用模式",
  "整帧复测"
];
const nodes = [
  {
    "label": "VI. Optimization Patterns",
    "mechanism": "VI. Optimization Patterns 把本章机制落到一个具体设计坐标：把热点归因到缓存、重复计算、分配或邻域查询，再选择对应模式，并以“每项优化都有同场景基线、目标指标和可回退实现”作为通过条件。",
    "probe": "检查目标机帧分位、缓存事件、分配轨迹和查询对数"
  },
  {
    "label": "The Patterns",
    "mechanism": "The Patterns 把本章机制落到一个具体设计坐标：把热点归因到缓存、重复计算、分配或邻域查询，再选择对应模式，并以“每项优化都有同场景基线、目标指标和可回退实现”作为通过条件。",
    "probe": "检查目标机帧分位、缓存事件、分配轨迹和查询对数"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "猜测优化",
  "candidateLabel": "剖析驱动",
  "unit": "ms帧时",
  "baselineBase": 15,
  "baselineSlope": 6,
  "candidateBase": 8,
  "candidateSlope": 1.4,
  "faultPenalty": 13,
  "invariant": "每项优化都有同场景基线、目标指标和可回退实现",
  "fault": "微基准提升但完整帧P99退化",
  "evidence": "目标机帧分位、缓存事件、分配轨迹和查询对数"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppOptimizationPatternsMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppOptimizationPatternsExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppOptimizationPatternsEvidenceLab() {
  return <GppFailureLab {...props} />;
}
