import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_AgentsInPractice
const officialQualityProps = {
  title: "真实场景解剖：客服智能体与编码智能体为什么适合 agent",
  stages: [
    "真实场景解剖：客服智能体与编码智能体为什么适合 agent",
    "先打个比方",
    "先看一张适配矩阵：为什么是客服和编码",
    "客服案例：从回答问题到解决问题",
    "编码案例：为什么代码特别适合反馈循环",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsAgentsInPracticeMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsAgentsInPracticeExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsAgentsInPracticeEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
