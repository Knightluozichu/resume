import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_AgenticLoop
const officialQualityProps = {
  title: "智能体循环：感知、思考与行动",
  stages: [
    "智能体循环：感知、思考与行动",
    "先打个比方",
    "第一个概念：为什么一次调用不够，得让它转圈",
    "第二个概念：ReAct——把一圈拆成「想、做、看」三段",
    "第三个概念：多轮迭代——结果喂回，思考随之改变",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsAgenticLoopMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsAgenticLoopExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsAgenticLoopEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
