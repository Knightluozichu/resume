import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第3章 动画混合";
const focus = "动画树 / 混合空间 / 过渡曲线 / 局部遮罩 / 实例缓存";
const stages = [
  "构建动画树",
  "采样混合参数",
  "求解状态过渡",
  "叠加局部动作",
  "缓存实例姿态",
];

export function Gep2Chapter03AnimationBlendingMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter03AnimationBlendingExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter03AnimationBlendingEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
