import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "IV. Behavioral Patterns";
const focus = "按内容规模与信任边界选择类型对象、子类沙箱或字节码";
const stages = [
  "统计行为",
  "评估信任",
  "选择表达层",
  "限制能力",
  "测量迭代"
];
const nodes = [
  {
    "label": "IV. Behavioral Patterns",
    "mechanism": "IV. Behavioral Patterns 把本章机制落到一个具体设计坐标：从数据分类、受限原语到虚拟机逐级增加表达力和工具成本，并以“内容作者的表达能力不越过运行时安全边界”作为通过条件。",
    "probe": "检查内容改动时间、可表达操作、沙箱边界与工具维护量"
  },
  {
    "label": "The Patterns",
    "mechanism": "The Patterns 把本章机制落到一个具体设计坐标：从数据分类、受限原语到虚拟机逐级增加表达力和工具成本，并以“内容作者的表达能力不越过运行时安全边界”作为通过条件。",
    "probe": "检查内容改动时间、可表达操作、沙箱边界与工具维护量"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "全部硬编码",
  "candidateLabel": "分级行为模型",
  "unit": "迭代分钟",
  "baselineBase": 14,
  "baselineSlope": 6,
  "candidateBase": 8,
  "candidateSlope": 1.6,
  "faultPenalty": 12,
  "invariant": "内容作者的表达能力不越过运行时安全边界",
  "fault": "为少量固定行为提前建设完整虚拟机",
  "evidence": "内容改动时间、可表达操作、沙箱边界与工具维护量"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppBehavioralPatternsMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppBehavioralPatternsExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppBehavioralPatternsEvidenceLab() {
  return <GppFailureLab {...props} />;
}
