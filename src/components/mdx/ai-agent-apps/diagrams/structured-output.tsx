import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_StructuredOutput
const officialQualityProps = {
  title: "结构化输出与工具调用协议",
  stages: [
    "结构化输出与工具调用协议",
    "先打个比方",
    "第一个概念：为什么非要结构化",
    "第二个概念：JSON 模式与 schema，约束的是两层",
    "动手看：一次工具调用，消息是怎么来回走的",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsStructuredOutputMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsStructuredOutputExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsStructuredOutputEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
