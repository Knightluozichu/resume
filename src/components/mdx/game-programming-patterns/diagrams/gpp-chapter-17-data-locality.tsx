import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "17. Data Locality";
const focus = "访问轨迹 / 热字段 / 连续数组 / 批量更新 / 缓存事件";
const stages = [
  "采样访问轨迹",
  "识别热字段",
  "连续重排数据",
  "批量执行更新",
  "测量缓存事件",
];

export function GppChapter17DataLocalityMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter17DataLocalityExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter17DataLocalityEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
