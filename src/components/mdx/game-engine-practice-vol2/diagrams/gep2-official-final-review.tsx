import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "《游戏引擎原理与实践·卷2：高级技术》全书总复习";
const focus = "姿态证据 / 变体证据 / 依赖证据 / 并发证据 / 预算签收";
const stages = [
  "重放动画证据",
  "复核材质变体",
  "审计渲染依赖",
  "注入并发故障",
  "签收性能预算",
];

export function Gep2OfficialFinalReviewMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2OfficialFinalReviewExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2OfficialFinalReviewEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
