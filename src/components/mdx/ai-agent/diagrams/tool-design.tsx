import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgent_ToolDesign
const officialQualityProps = {
  title: "工具设计与安全执行",
  stages: [
    "工具设计与安全执行",
    "给电话装防呆和保险丝",
    "工具设计：先让模型选得准",
    "参数校验：第一道防呆",
    "结构化返回：让主循环不用猜",
  ],
  sourceLabel: "Anthropic Agent 基础架构",
} as const;

export function OfficialAiAgentToolDesignMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentToolDesignExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentToolDesignEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
