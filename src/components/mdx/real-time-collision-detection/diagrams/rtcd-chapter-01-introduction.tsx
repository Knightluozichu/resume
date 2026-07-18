import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 1 Introduction";
const focus = "查询类型 / 几何表示 / 空间结构 / 精确测试 / 代码复核";
const stages = [
  "识别查询类型",
  "选择几何表示",
  "组织空间结构",
  "执行精确测试",
  "复核鲁棒与性能",
];

export function RtcdChapter01IntroductionMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter01IntroductionExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter01IntroductionEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
