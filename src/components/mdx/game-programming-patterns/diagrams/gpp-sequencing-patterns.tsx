import {
  GppFailureLab,
  GppMechanismLab,
  GppTradeoffLab,
  type GppCausalModel,
  type GppCoverageNode,
} from "./official-gpp-book-lab";

const title = "III. Sequencing Patterns";
const focus = "比较双缓冲、游戏循环和更新方法对一帧顺序的控制位置";
const stages = [
  "采集输入",
  "推进时间",
  "切片更新",
  "交换结果",
  "发布帧"
];
const nodes = [
  {
    "label": "III. Sequencing Patterns",
    "mechanism": "III. Sequencing Patterns 把本章机制落到一个具体设计坐标：分别控制发布边界、时间推进和对象切片，再组合成明确帧合同，并以“相同输入和时间步得到与遍历顺序无关的可预测结果”作为通过条件。",
    "probe": "检查帧号、时间步、读写缓冲代际与对象更新序号"
  },
  {
    "label": "The Patterns",
    "mechanism": "The Patterns 把本章机制落到一个具体设计坐标：分别控制发布边界、时间推进和对象切片，再组合成明确帧合同，并以“相同输入和时间步得到与遍历顺序无关的可预测结果”作为通过条件。",
    "probe": "检查帧号、时间步、读写缓冲代际与对象更新序号"
  }
] satisfies GppCoverageNode[];
const model = {
  "baselineLabel": "隐式时序",
  "candidateLabel": "显式帧合同",
  "unit": "顺序差异",
  "baselineBase": 12,
  "baselineSlope": 5,
  "candidateBase": 6,
  "candidateSlope": 1.5,
  "faultPenalty": 11,
  "invariant": "相同输入和时间步得到与遍历顺序无关的可预测结果",
  "fault": "对象更新时直接修改仍待遍历的列表",
  "evidence": "帧号、时间步、读写缓冲代际与对象更新序号"
} satisfies GppCausalModel;
const props = { title, focus, stages, nodes, model };

export function GppSequencingPatternsMapLab() {
  return <GppMechanismLab {...props} />;
}

export function GppSequencingPatternsExperimentLab() {
  return <GppTradeoffLab {...props} />;
}

export function GppSequencingPatternsEvidenceLab() {
  return <GppFailureLab {...props} />;
}
