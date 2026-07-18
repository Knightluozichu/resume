import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_ToolDesign
const officialQualityProps = {
  title: "设计好用的工具",
  stages: [
    "设计好用的工具",
    "先打个比方",
    "先看全景：好工具的五个维度",
    "第一个取舍：工具粒度——不大不小才好用",
    "第二个关键：错误信息——决定 agent 能不能自己爬起来",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsToolDesignMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsToolDesignExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsToolDesignEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
