import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_FirstAgent
const officialQualityProps = {
  title: "你的第一个最小 Agent",
  stages: [
    "你的第一个最小 Agent",
    "先说说这一章干嘛",
    "最小 Agent，就是这四块拼起来",
    "动手看：最小 agent 跑一次长什么样",
    "一段段把它拼出来",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsFirstAgentMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsFirstAgentExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsFirstAgentEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
