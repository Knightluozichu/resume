import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_ToolCalling
const officialQualityProps = {
  title: "工具调用 Tool Calling",
  stages: [
    "工具调用 Tool Calling",
    "光说「我要查天气」没用，得真给它一部能打的电话",
    "第一步：给小特一份「工具说明书」——工具定义 / Schema",
    "第二步：LLM 看完说明书，产出一个「结构化调用」",
    "第三步：程序解析 + 按名字找到函数 + 真去执行",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevToolCallingMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevToolCallingExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevToolCallingEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
