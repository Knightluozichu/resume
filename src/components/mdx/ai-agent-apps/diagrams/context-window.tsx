import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_ContextWindow
const officialQualityProps = {
  title: "上下文窗口：预算、压缩与裁剪",
  stages: [
    "上下文窗口：预算、压缩与裁剪",
    "先打个比方",
    "第一个概念：上下文窗口，是一笔有限的 token 预算",
    "第二个概念：窗口装满了，会出什么事",
    "第三个概念：腾地方的两招——压缩 vs 裁剪",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsContextWindowMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsContextWindowExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsContextWindowEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
