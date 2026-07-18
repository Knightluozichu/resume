import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "3. Flyweight";
const focus = "固有状态 / 外在状态 / 共享对象 / 实例批次 / 内存局部";
const stages = [
  "识别重复状态",
  "冻结共享对象",
  "保存外在状态",
  "批量访问实例",
  "测量内存与局部性",
];

export function GppChapter03FlyweightMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter03FlyweightExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter03FlyweightEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
