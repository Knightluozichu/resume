import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_EnginePrinciples
const officialQualityProps = {
  title: "第 3 章：发动机",
  stages: [
    "第3章 发动机",
    "3.1 发动机基本原理",
    "3.2 气缸排列形式",
    "3.3 发动机工作过程",
    "3.4 发动机燃烧原理",
  ],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsEnginePrinciplesMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsEnginePrinciplesExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsEnginePrinciplesEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
