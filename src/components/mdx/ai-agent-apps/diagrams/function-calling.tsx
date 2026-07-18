import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_FunctionCalling
const officialQualityProps = {
  title: "Function Calling 原理",
  stages: [
    "Function Calling 原理",
    "先打个比方",
    "第一个概念：工具是怎么进入模型「视野」的",
    "第二个概念：模型怎么从菜单里挑一个——工具选择",
    "第三个概念：挑中之后，多个调用是并排发还是排队发",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsFunctionCallingMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsFunctionCallingExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsFunctionCallingEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
