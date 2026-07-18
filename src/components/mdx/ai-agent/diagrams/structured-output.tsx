import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgent_StructuredOutput
const officialQualityProps = {
  title: "结构化输出",
  stages: [
    "结构化输出",
    "让天才不光会回话，还得「照表格填空」",
    "散文 vs 表格：先看整条「容错」流程",
    "为什么非要结构化：程序接不住散文",
    "怎么让它输出 JSON：递一张空表格",
  ],
  sourceLabel: "Anthropic Agent 基础架构",
} as const;

export function OfficialAiAgentStructuredOutputMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentStructuredOutputExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentStructuredOutputEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
