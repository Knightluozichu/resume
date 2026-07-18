import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "10. Update Method";
const focus = "活跃集合 / 帧切片 / 续运行状态 / 伪并发 / 延迟增删";
const stages = [
  "选择活跃对象",
  "读取帧输入",
  "推进局部状态",
  "提交增删请求",
  "应用结构变更",
];

export function GppChapter10UpdateMethodMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter10UpdateMethodExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter10UpdateMethodEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
