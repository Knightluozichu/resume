import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AiAgentApps_ProductionReadinessChecklist
const officialQualityProps = {
  title: "生产化收官：简单、透明与 ACI 上线检查清单",
  stages: [
    "生产化收官：简单、透明与 ACI 上线检查清单",
    "先打个比方",
    "三条生产原则：先简单、再透明、最后打磨接口",
    "复杂度升级门槛：不是能做，而是值得做",
    "透明 planning / review：让人能看见它为什么这么做",
  ],
  sourceLabel: "Anthropic Agent 应用模式",
} as const;

export function OfficialAiAgentAppsProductionReadinessChecklistMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAiAgentAppsProductionReadinessChecklistExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAiAgentAppsProductionReadinessChecklistEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
