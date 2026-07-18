import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_SuspensionSystem
const officialQualityProps = {
  title: "第 6 章：悬架系统",
  stages: [
    "第6章 悬架系统",
    "6.1 悬架的作用和构造",
    "6.2 悬架形式",
    "6.3 悬架性能",
  ],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsSuspensionSystemMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsSuspensionSystemExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsSuspensionSystemEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
