import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgent_ChatbotToAgent
const officialQualityProps = {
  title: "从聊天机器人到智能体",
  stages: [
    "从聊天机器人到智能体",
    "一位关在小屋里的失忆天才",
    "三种系统：直线、固定流程、自主循环",
    "智能体的灵魂：感知—决策—行动—观察",
    "动手：这个任务该用哪一种？",
  ],
  sourceLabel: "Anthropic Agent 基础架构",
} as const;

export function OfficialAiAgentChatbotToAgentMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentChatbotToAgentExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentChatbotToAgentEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
