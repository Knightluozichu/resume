import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_PerceptionAlgorithms
const officialQualityProps = {
  title: "感知算法",
  stages: ["感知算法", "目标检测", "语义分割", "BEV 鸟瞰图", "核心概念"],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligencePerceptionAlgorithmsMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligencePerceptionAlgorithmsExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligencePerceptionAlgorithmsEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
