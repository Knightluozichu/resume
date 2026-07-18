import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_WhatIsAgent
const officialQualityProps = {
  title: "什么是 AI Agent",
  stages: [
    "什么是 AI Agent",
    "为什么我们需要一个会「自己办事」的程序",
    "小特是怎么炼成的：Agent 的四要素",
    "小特办一件事的一圈：感知 → 决策 → 行动 → 观察",
    "同样是程序，凭什么它才叫 Agent",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevWhatIsAgentMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevWhatIsAgentExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevWhatIsAgentEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
