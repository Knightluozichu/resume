import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_BodyStructure
const officialQualityProps = {
  title: "第 2 章：车身",
  stages: ["第2章 车身", "2.1 车身规格", "2.2 车身构造", "2.3 车身材料"],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsBodyStructureMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsBodyStructureExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsBodyStructureEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
