import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_EvaluatorOptimizer
const officialQualityProps = {
  title: "评估-优化：什么时候该先出稿，再迭代打磨",
  stages: [
    "评估-优化：什么时候该先出稿，再迭代打磨",
    "先打个比方",
    "这种模式在做什么：先出一版，再按标准返工",
    "它仍是工作流，不是自主 agent",
    "两个适配信号：标准清楚 + 返工真能变好",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsEvaluatorOptimizerMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsEvaluatorOptimizerExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsEvaluatorOptimizerEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
