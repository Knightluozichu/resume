import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_Mcp
const officialQualityProps = {
  title: "MCP：模型上下文协议",
  stages: [
    "MCP：模型上下文协议",
    "先打个比方",
    "第一个概念：MCP 是什么——「AI 接工具」的通用标准",
    "第二个概念：MCP 的三层架构——Host / Client / Server",
    "第三个概念：一个 Server 能暴露什么——三类能力",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsMcpMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsMcpExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsMcpEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
