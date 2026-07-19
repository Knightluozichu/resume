import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "Acknowledgements";
const focus = "把作者、审校、社区反馈与发布版本连成来源证据";
const stages = [
  "接收反馈",
  "复现问题",
  "核对来源",
  "审校修订",
  "标记版本"
];
const nodes = [
  {
    "label": "Acknowledgements",
    "mechanism": "Acknowledgements 把本章机制落到一个具体设计坐标：让反馈从提出、复现、修订、审校到发布都留下责任人与证据，并以“每条事实都能定位到版本、来源和复核动作”作为通过条件。",
    "probe": "检查提交记录、勘误、发布日期与来源类型"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "无来源笔记",
  "candidateLabel": "可追溯勘误",
  "unit": "歧义项",
  "baselineBase": 7,
  "baselineSlope": 3.2,
  "candidateBase": 4,
  "candidateSlope": 0.9,
  "faultPenalty": 6,
  "invariant": "每条事实都能定位到版本、来源和复核动作",
  "fault": "网页修订被误写成纸书原始内容",
  "evidence": "提交记录、勘误、发布日期与来源类型"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppAcknowledgementsMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppAcknowledgementsExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppAcknowledgementsEvidenceLab() {
  return <GppFailureLab {...props} />;
}
