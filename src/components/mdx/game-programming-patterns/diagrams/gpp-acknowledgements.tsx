import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "Acknowledgements";
const focus = "贡献角色 / 反馈来源 / 出版时间 / 社区修订 / 引用边界";
const stages = [
  "识别贡献角色",
  "追踪反馈来源",
  "固定出版时间",
  "区分正文与社区修订",
  "登记引用边界",
];

export function GppAcknowledgementsMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppAcknowledgementsExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppAcknowledgementsEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
