import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_Orchestration
const officialQualityProps = {
  title: "编排·通信·终止",
  stages: [
    "编排·通信·终止",
    "小队组好了，可它们怎么真正配合起来",
    "通信：Agent 之间靠「消息」交流",
    "共享状态：给所有 Agent 一块黑板",
    "编排：谁先谁后、转几轮，得有人调度",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevOrchestrationMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevOrchestrationExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevOrchestrationEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
