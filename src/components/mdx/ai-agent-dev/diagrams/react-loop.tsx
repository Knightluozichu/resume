import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_ReactLoop
const officialQualityProps = {
  title: "ReAct：推理与行动循环",
  stages: [
    "ReAct：推理与行动循环",
    "小特办事，是边想边查边调整的",
    "ReAct：把「想」和「干」拧成一股绳",
    "Thought：把「我现在在想什么」写出来",
    "Action 与 Observation：一个去做，一个把结果带回来",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevReactLoopMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevReactLoopExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevReactLoopEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
