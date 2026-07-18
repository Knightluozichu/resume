import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_ElectricDriveSystem
const officialQualityProps = {
  title: "第 11 章：电力驱动",
  stages: [
    "第11章 电力驱动",
    "11.1 混合动力",
    "11.2 插电式混合动力",
    "11.3 纯电动汽车",
    "11.4 燃料电池汽车",
  ],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsElectricDriveSystemMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsElectricDriveSystemExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsElectricDriveSystemEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
