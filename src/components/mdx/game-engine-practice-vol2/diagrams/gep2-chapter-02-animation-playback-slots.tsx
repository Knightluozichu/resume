import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第2章 动画播放与插槽";
const focus = "播放时钟 / 根骨运动 / 姿态采样 / 插槽空间 / 边界更新";
const stages = [
  "推进播放时钟",
  "采样骨骼姿态",
  "提取根骨运动",
  "更新动态边界",
  "解析插槽挂接",
];

export function Gep2Chapter02AnimationPlaybackSlotsMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter02AnimationPlaybackSlotsExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter02AnimationPlaybackSlotsEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
