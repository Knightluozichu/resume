import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_ToolPromptEngineering
const officialQualityProps = {
  title: "工具提示工程：让 agent 会用工具而不是猜工具",
  stages: [
    "工具提示工程：让 agent 会用工具而不是猜工具",
    "先打个比方",
    "工具定义就是给模型看的提示",
    "描述要写边界，而不只写功能",
    "参数 schema 要替模型消歧",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsToolPromptEngineeringMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsToolPromptEngineeringExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsToolPromptEngineeringEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
