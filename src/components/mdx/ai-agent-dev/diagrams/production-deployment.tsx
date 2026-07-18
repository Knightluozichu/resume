import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_ProductionDeployment
const officialQualityProps = {
  title: "生产化部署",
  stages: [
    "生产化部署",
    "小特要从一个人，变成一支正规军",
    "生产架构：上线不是一个脚本，是一套架构",
    "并发与异步：海量请求同时来，一个个串着处理必死",
    "超时·降级·重试：生产里，调用一定会失败",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevProductionDeploymentMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevProductionDeploymentExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevProductionDeploymentEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
