import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgent_FunctionCalling
const officialQualityProps = {
  title: "函数调用原理",
  stages: [
    "函数调用原理",
    "给小屋装一部「电话」",
    "工具：模型能「请求外界代办」的能力",
    "函数调用：模型写请求，运行时真执行",
    "tool schema：给模型看的工具说明书",
  ],
  sourceLabel: "Anthropic Agent 基础架构",
} as const;

export function OfficialAiAgentFunctionCallingMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentFunctionCallingExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentFunctionCallingEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
