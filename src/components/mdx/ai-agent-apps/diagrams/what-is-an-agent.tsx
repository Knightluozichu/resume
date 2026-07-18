import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_WhatIsAnAgent
const officialQualityProps = {
  title: "从 LLM 到 Agent：什么是智能体",
  stages: [
    "从 LLM 到 Agent：什么是智能体",
    "先打个比方",
    "第一个概念：裸 LLM 是个「只会背书的实习生」",
    "第二个概念：智能体 = LLM 大脑 + 四件外挂",
    "第三个概念：智能体 vs 工作流 vs 聊天机器人",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsWhatIsAnAgentMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsWhatIsAnAgentExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsWhatIsAnAgentEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
