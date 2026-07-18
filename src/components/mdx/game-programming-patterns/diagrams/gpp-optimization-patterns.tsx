import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "VI. Optimization Patterns";
const focus = "性能基线 / 真实热点 / 结构变换 / 资源代价 / 长尾收益";
const stages = [
  "建立性能基线",
  "定位真实热点",
  "选择结构变换",
  "验证正确与资源代价",
  "比较长尾收益",
];

export function GppOptimizationPatternsMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppOptimizationPatternsExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppOptimizationPatternsEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
