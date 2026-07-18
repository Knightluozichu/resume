import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "后置资料：参考文献、索引与配套光盘";
const focus = "算法出处 / 术语索引 / 配套资产 / 环境迁移 / 复现记录";
const stages = [
  "追踪算法出处",
  "定位术语页码",
  "核对配套资产",
  "迁移旧代码环境",
  "登记复现实验",
];

export function RtcdBackMatterMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdBackMatterExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdBackMatterEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
