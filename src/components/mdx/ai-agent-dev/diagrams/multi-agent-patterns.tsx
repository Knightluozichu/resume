import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_MultiAgentPatterns
const officialQualityProps = {
  title: "多智能体协作模式",
  stages: [
    "多智能体协作模式",
    "一个小特忙不过来，就组一支小队",
    "为什么要多智能体：一个 Agent 会撑不住",
    "三种协作拓扑：supervisor、swarm、pipeline",
    "角色专精：每个 Agent 只管一摊",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevMultiAgentPatternsMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevMultiAgentPatternsExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevMultiAgentPatternsEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
