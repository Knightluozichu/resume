import {
  RtcdPipelineLab,
  RtcdBudgetLab,
  RtcdEvidenceLab,
} from "./official-rtcd-lab";

const title = "《实时碰撞检测算法技术》权威学习地图";
const focus = "查询合同 / 几何内核 / 候选对 / 精确查询 / 鲁棒性能";
const stages = [
  "定义查询合同",
  "建立几何内核",
  "生成候选对",
  "执行精确查询",
  "复核鲁棒性能",
];

export function RtcdOfficialLearningMapMapLab() {
  return <RtcdPipelineLab title={title} focus={focus} stages={stages} />;
}
export function RtcdOfficialLearningMapExperimentLab() {
  return <RtcdBudgetLab title={title} focus={focus} stages={stages} />;
}
export function RtcdOfficialLearningMapEvidenceLab() {
  return <RtcdEvidenceLab title={title} focus={focus} stages={stages} />;
}
