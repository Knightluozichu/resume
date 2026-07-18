import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "I. Introduction";
const focus = "问题范围 / GoF语境 / 阅读路径 / 示例语境 / 迁移实验";
const stages = [
  "明确问题范围",
  "连接GoF语境",
  "选择阅读路径",
  "校准示例代码",
  "建立迁移实验",
];

export function GppIntroductionMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppIntroductionExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppIntroductionEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
