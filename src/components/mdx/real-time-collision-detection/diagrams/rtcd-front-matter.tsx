import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "前置资料：版本、作者、图表与前言";
const focus = "版次坐标 / 作者语境 / 图表索引 / 代码环境 / 实验合同";
const stages = [
  "固定版次",
  "核对作者语境",
  "建立图表索引",
  "校准代码环境",
  "声明复现实验",
];

export function RtcdFrontMatterMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdFrontMatterExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdFrontMatterEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
