import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_Planning
const officialQualityProps = {
  title: "规划与任务分解",
  stages: [
    "规划与任务分解",
    "小特接了个大活，不能想哪做哪",
    "为什么要先规划：复杂任务得先谋全局",
    "任务分解：把大目标拆成一棵任务树",
    "三种规划策略：CoT、ToT、先规划后执行",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevPlanningMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevPlanningExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevPlanningEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
