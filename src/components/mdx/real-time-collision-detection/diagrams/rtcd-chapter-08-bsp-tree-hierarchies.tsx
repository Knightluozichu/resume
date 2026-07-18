import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 8 BSP Tree Hierarchies";
const focus = "分割平面 / 多边形分类 / 叶语义 / 查询遍历 / 分割鲁棒";
const stages = [
  "选择分割平面",
  "分类并切分多边形",
  "构建叶语义",
  "遍历点与射线",
  "验证分割鲁棒性",
];

export function RtcdChapter08BspTreeHierarchiesMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter08BspTreeHierarchiesExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter08BspTreeHierarchiesEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
