import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_ParallelizationAndOrchestratorWorkers
const officialQualityProps = {
  title: "并行与编排-工作者：什么时候同时做，什么时候先拆再派",
  stages: [
    "并行与编排-工作者：什么时候同时做，什么时候先拆再派",
    "先打个比方",
    "并行：同一批活，预先分块后一起做",
    "并行不只一种：分片（sectioning）和投票（voting）",
    "编排-工作者：先看任务，再临场拆活",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsParallelizationAndOrchestratorWorkersMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsParallelizationAndOrchestratorWorkersExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsParallelizationAndOrchestratorWorkersEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
