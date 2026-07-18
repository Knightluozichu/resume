import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_ChainingAndRouting
const officialQualityProps = {
  title: "链式与路由：把任务拆成更稳的工作流",
  stages: [
    "链式与路由：把任务拆成更稳的工作流",
    "先打个比方",
    "第一种拆法：同一批活都走同一串固定工序",
    "第二种拆法：先分诊，再送去不同专科",
    "它们都还是工作流，不是自主 agent",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsChainingAndRoutingMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsChainingAndRoutingExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsChainingAndRoutingEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
