import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_AugmentedLlm
const officialQualityProps = {
  title: "增强型 LLM：工具、检索与记忆",
  stages: [
    "增强型 LLM：工具、检索与记忆",
    "先打个比方",
    "第一个概念：增强，加的是外面的壳，不是里面的模型",
    "第二个概念：检索——先捞对资料，再带着资料回答",
    "第三个概念：工具——让它从「只会说」到「真能做」",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsAugmentedLlmMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsAugmentedLlmExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsAugmentedLlmEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
