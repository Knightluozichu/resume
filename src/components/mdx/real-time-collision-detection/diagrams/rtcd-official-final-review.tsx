import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "《实时碰撞检测算法技术》全书总复习";
const focus = "退化样本 / 候选生成 / 精确接触 / 误差边界 / 预算签收";
const stages = [
  "重放退化样本",
  "审计候选生成",
  "复算精确接触",
  "注入数值误差",
  "签收目标机预算",
];

export function RtcdOfficialFinalReviewMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdOfficialFinalReviewExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdOfficialFinalReviewEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
