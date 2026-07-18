import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgent_PromptEngineering
const officialQualityProps = {
  title: "提示工程基础",
  stages: [
    "提示工程基础",
    "同一个问题，凭什么纸条写法不同答案天差地别",
    "三种纸条：system、user、assistant",
    "一条提示由什么组成：角色 + 清晰指令 + 输入",
    "few-shot：与其讲一堆要求，不如给它几个范例",
  ],
  sourceLabel: "Anthropic Agent 基础架构",
} as const;

export function OfficialAiAgentPromptEngineeringMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentPromptEngineeringExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentPromptEngineeringEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
