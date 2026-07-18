import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentDev_SafetyGuardrails
const officialQualityProps = {
  title: "安全护栏与成本控制",
  stages: [
    "安全护栏与成本控制",
    "小特上岗了，三件事会出大事",
    "prompt injection：把「数据」骗成「指令」",
    "护栏：进出都过一道安检",
    "越权与最小权限：别给查天气的助理配删库的钥匙",
  ],
  sourceLabel: "Anthropic Building effective agents",
} as const;

export function OfficialAiAgentDevSafetyGuardrailsMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentDevSafetyGuardrailsExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentDevSafetyGuardrailsEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
