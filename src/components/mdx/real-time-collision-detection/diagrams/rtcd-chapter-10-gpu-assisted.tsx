import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 10 GPU-assisted Collision Detection";
const focus = "批量编码 / GPU测试 / 读回延迟 / 候选压缩 / 端到端收益";
const stages = [
  "批量编码几何",
  "提交GPU测试",
  "避免同步读回",
  "压缩候选结果",
  "验证CPU/GPU端到端收益",
];

export function RtcdChapter10GpuAssistedMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter10GpuAssistedExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter10GpuAssistedEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
