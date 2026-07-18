import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_CombiningPatterns
const officialQualityProps = {
  title: "组合与定制模式：把简单积木拼成合适系统",
  stages: [
    "组合与定制模式：把简单积木拼成合适系统",
    "先打个比方",
    "这些模式是积木，不是处方",
    "加复杂度之前，先让指标说话",
    "透明组合比复杂框架更可靠",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsCombiningPatternsMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsCombiningPatternsExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsCombiningPatternsEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
