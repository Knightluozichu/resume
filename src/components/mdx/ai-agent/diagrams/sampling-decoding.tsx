import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgent_SamplingDecoding
const officialQualityProps = {
  title: "采样与解码",
  stages: [
    "采样与解码",
    "同一张纸条，凭什么有时它死板有时它发疯",
    "从一堆分数到一个字：先看「一次采样」的全过程",
    "两条路：贪心永远挑最高，采样按概率掷骰子",
    "温度：把分布捏陡还是捏平",
  ],
  sourceLabel: "Anthropic Agent 基础架构",
} as const;

export function OfficialAiAgentSamplingDecodingMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentSamplingDecodingExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentSamplingDecodingEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
