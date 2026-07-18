import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 5 Basic Primitive Tests";
const focus = "最近点 / 静态相交 / 射线区间 / 包含谓词 / 首次接触";
const stages = [
  "归约最近点",
  "构造静态谓词",
  "求解射线区间",
  "处理包含关系",
  "求首次接触时间",
];

export function RtcdChapter05BasicPrimitiveTestsMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter05BasicPrimitiveTestsExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter05BasicPrimitiveTestsEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
