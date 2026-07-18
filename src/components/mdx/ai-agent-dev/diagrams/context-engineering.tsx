import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_ContextEngineering
const officialQualityProps = {
  title: "上下文工程与压缩",
  stages: [
    "上下文工程与压缩",
    "桌子就那么大，该摆什么、怎么摆，是门讲究",
    "上下文工程：在有限窗口里安排「放什么、放多少、怎么排」",
    "上下文预算分配：窗口是一笔有限预算，分给好几样",
    "压缩 / 摘要：太长了就浓缩成几句要点",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevContextEngineeringMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevContextEngineeringExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevContextEngineeringEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
