import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "19. Object Pool";
const focus = "容量预算 / 空闲槽位 / 对象重置 / 代际句柄 / 碎片控制";
const stages = [
  "预算池容量",
  "获取空闲槽位",
  "完整初始化",
  "使用并记录代际",
  "重置归还池",
];

export function GppChapter19ObjectPoolMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter19ObjectPoolExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter19ObjectPoolEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
