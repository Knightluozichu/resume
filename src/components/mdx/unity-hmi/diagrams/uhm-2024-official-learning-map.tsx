import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "《Unity for HMI》2024官方演讲学习地图";
const focus =
  "从23页官方演讲建立量产证据、平台适配、URAS架构、能力底座和创新场景的完整学习路线。";
const stages = [
  "核对23页材料",
  "建立平台矩阵",
  "实现渲染服务",
  "执行目标机实验",
  "归档量产证据",
];

export function Uhm24OfficialLearningMapMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24OfficialLearningMapExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24OfficialLearningMapEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
