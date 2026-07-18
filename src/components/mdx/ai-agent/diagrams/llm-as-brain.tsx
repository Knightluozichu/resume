import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgent_LlmAsBrain
const officialQualityProps = {
  title: "大模型：智能体的大脑",
  stages: [
    "大模型：智能体的大脑",
    "拆开那位失忆天才的脑袋",
    "第一件事：模型不按字读，按 token 读",
    "第二件事：他一次只读得进这么长",
    "第三件事：他写回复，是一个个 token 接出来的",
  ],
  sourceLabel: "Anthropic Agent 基础架构",
} as const;

export function OfficialAiAgentLlmAsBrainMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentLlmAsBrainExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentLlmAsBrainEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
