import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgent_AgentAnatomy
const officialQualityProps = {
  title: "智能体解剖图",
  stages: [
    "智能体解剖图",
    "给失忆天才配齐一套装备",
    "一个智能体，拆开看是五大件",
    "一个任务，怎样在五大件之间流转",
    "动手：点一遍，拿到整本书的地图",
  ],
  sourceLabel: "Anthropic Agent 基础架构",
} as const;

export function OfficialAiAgentAgentAnatomyMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAgentAnatomyExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAgentAnatomyEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
