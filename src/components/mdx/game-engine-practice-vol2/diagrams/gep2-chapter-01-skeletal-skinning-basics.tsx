import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第1章 骨骼蒙皮模型与动画基础";
const focus = "骨架层级 / 蒙皮矩阵 / 权重归一 / 轨道压缩 / 动态包围盒";
const stages = [
  "解析骨骼层级",
  "绑定网格权重",
  "导入动作轨道",
  "压缩运行数据",
  "验证姿态包围盒",
];

export function Gep2Chapter01SkeletalSkinningBasicsMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter01SkeletalSkinningBasicsExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter01SkeletalSkinningBasicsEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
