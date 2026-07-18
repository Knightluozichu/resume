import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_WorkflowVsAgent
const officialQualityProps = {
  title: "工作流 vs 智能体：何时用哪个",
  stages: [
    "工作流 vs 智能体：何时用哪个",
    "先打个比方",
    "再辨析一次：差别不在步数，在「路是谁定的」",
    "一个核心原则：先用最简单的，只在需要时加自主性",
    "同一件事，多种自主性档位：智能体模式光谱",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsWorkflowVsAgentMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsWorkflowVsAgentExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsWorkflowVsAgentEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
