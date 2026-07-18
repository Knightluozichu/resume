import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgent_ReactLoop
const officialQualityProps = {
  title: "ReAct 循环",
  stages: [
    "ReAct 循环",
    "小屋里的天才终于会「边办边问」",
    "ReAct 循环：想和做交替出现",
    "Thought：先想「下一通电话该打给谁」",
    "Action：写出一次工具请求",
  ],
  sourceLabel: "Anthropic Agent 基础架构",
} as const;

export function OfficialAiAgentReactLoopMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentReactLoopExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentReactLoopEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
