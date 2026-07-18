import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 2 Collision Detection Design Issues";
const focus = "应用域 / 查询合同 / 运动模型 / 性能预算 / 调试证据";
const stages = [
  "冻结应用域",
  "定义查询合同",
  "估计对象与运动",
  "设置鲁棒边界",
  "建立调试证据",
];

export function RtcdChapter02DesignIssuesMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter02DesignIssuesExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter02DesignIssuesEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
