import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_EvaluationObservability
const officialQualityProps = {
  title: "评估与可观测性",
  stages: [
    "评估与可观测性",
    "小特上岗了，可你看不见它在干什么",
    "为什么 Agent 上线后必须能「看见」和「量得出」",
    "trace 与 span：把一次运行的每一步都记下来",
    "三种评估方法：怎么判断 Agent 答得好不好（对比取舍）",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevEvaluationObservabilityMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevEvaluationObservabilityExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevEvaluationObservabilityEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
