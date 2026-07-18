import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第4章 变形动画混合";
const focus = "形态目标 / 顶点增量 / 变形树 / 权重约束 / 网格一致";
const stages = [
  "导入形态目标",
  "压缩顶点增量",
  "构建变形树",
  "求解混合权重",
  "验证网格输出",
];

export function Gep2Chapter04MorphAnimationBlendingMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter04MorphAnimationBlendingExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter04MorphAnimationBlendingEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
