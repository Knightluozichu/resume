import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutomotiveSystemsSpecialization_EcuCanBus
const officialQualityProps = {
  title: "ECU 与 CAN 总线",
  stages: [
    "ECU 与 CAN 总线",
    "从点对点到总线",
    "差分信号与抗干扰",
    "ID 仲裁：非破坏性优先级",
    "帧结构与可靠性",
  ],
  sourceLabel: "Bosch Automotive Handbook",
} as const;

export function OfficialAutomotiveSystemsSpecializationEcuCanBusMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutomotiveSystemsSpecializationEcuCanBusExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutomotiveSystemsSpecializationEcuCanBusEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
