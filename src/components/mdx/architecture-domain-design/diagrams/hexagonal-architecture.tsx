import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_ArchitectureDomainDesign_HexagonalArchitecture
const officialQualityProps = {
  title: "六边形架构",
  stages: ["六边形架构", "核心概念", "常见误区", "小结与练习", "名词解释"],
  sourceLabel: "Pearson DDD + Clean Architecture",
} as const;

export function OfficialArchitectureDomainDesignHexagonalArchitectureMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialArchitectureDomainDesignHexagonalArchitectureExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialArchitectureDomainDesignHexagonalArchitectureEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
