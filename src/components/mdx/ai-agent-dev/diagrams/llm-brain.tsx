import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_LlmBrain
const officialQualityProps = {
  title: "LLM：Agent 的大脑",
  stages: [
    "LLM：Agent 的大脑",
    "小特的大脑，到底是怎么读你的话的",
    "大脑眼里没有「字」，只有 token",
    "一次能「看进」多少：上下文窗口",
    "它怎么「写」下一个字：采样与温度",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevLlmBrainMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevLlmBrainExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevLlmBrainEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
