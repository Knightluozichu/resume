import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "Chapter 12 Geometrical Robustness";
const focus = "顶点焊接 / 邻接关系 / 裂缝接缝 / 凸分解 / 拓扑一致";
const stages = [
  "焊接顶点",
  "重建邻接",
  "修补裂缝接缝",
  "三角化与凸分解",
  "检查拓扑一致",
];

export function RtcdChapter12GeometricalRobustnessMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter12GeometricalRobustnessExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdChapter12GeometricalRobustnessEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
