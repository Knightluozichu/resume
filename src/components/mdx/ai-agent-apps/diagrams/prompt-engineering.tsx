import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_PromptEngineering
const officialQualityProps = {
  title: "提示工程精要",
  stages: [
    "提示工程精要",
    "先打个比方",
    "第一个概念：提示工程，调的是「喂给模型的那段话」",
    "第二个概念：清晰具体——同样一句话，模糊和具体差到天上",
    "第三个概念：少样本——与其费劲描述，不如直接给个范例",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsPromptEngineeringMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsPromptEngineeringExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsPromptEngineeringEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
