import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutomotiveSystemsSpecialization_EnginePerformance
const officialQualityProps = {
  title: "发动机性能与增压技术",
  stages: [
    "发动机性能与增压技术",
    "增压：突破自然吸气的天花板",
    "功率扭矩曲线",
    "爆震、辛烷值与 VVT",
    "常见误区",
  ],
  sourceLabel: "Bosch Automotive Handbook",
} as const;

export function OfficialAutomotiveSystemsSpecializationEnginePerformanceMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutomotiveSystemsSpecializationEnginePerformanceExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutomotiveSystemsSpecializationEnginePerformanceEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
