import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "8. Double Buffer";
const focus = "前台快照 / 后台写入 / 交换时刻 / 内存翻倍 / 批次粒度";
const stages = [
  "读取当前缓冲",
  "写入下一缓冲",
  "完成整批更新",
  "原子交换角色",
  "回收旧前台",
];

export function GppChapter08DoubleBufferMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter08DoubleBufferExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter08DoubleBufferEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
