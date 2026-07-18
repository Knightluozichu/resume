import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "1. Architecture, Performance, and Games";
const focus = "变化范围 / 认知负载 / 耦合传播 / 抽象成本 / 简单设计";
const stages = [
  "描述预期变化",
  "压缩理解范围",
  "切断变化传播",
  "测量抽象成本",
  "选择最简单可行设计",
];

export function GppChapter01ArchitecturePerformanceGamesMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter01ArchitecturePerformanceGamesExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter01ArchitecturePerformanceGamesEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
