import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "《游戏引擎原理与实践·卷2：高级技术》权威学习地图";
const focus = "动画管线 / 渲染架构 / 材质系统 / 并行运行时 / 性能证据";
const stages = [
  "校准卷1基础",
  "建立动画管线",
  "构建渲染架构",
  "并行资源工作",
  "完成性能验收",
];

export function Gep2OfficialLearningMapMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2OfficialLearningMapExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2OfficialLearningMapEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
