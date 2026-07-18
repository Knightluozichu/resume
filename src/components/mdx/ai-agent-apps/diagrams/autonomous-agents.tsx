import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_AutonomousAgents
const officialQualityProps = {
  title: "自主智能体：让模型在环境反馈里自己推进任务",
  stages: [
    "自主智能体：让模型在环境反馈里自己推进任务",
    "先打个比方",
    "先分清：固定工作流和自主智能体不是同一件事",
    "自主智能体靠什么往前走：反馈，而不是自言自语",
    "什么时候才值得放权给它",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsAutonomousAgentsMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsAutonomousAgentsExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsAutonomousAgentsEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
