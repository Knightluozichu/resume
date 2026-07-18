import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_DesignManufacturing
const officialQualityProps = {
  title: "第 12 章：设计制造",
  stages: [
    "第12章 设计制造",
    "12.1 设计流程",
    "12.2 样车测试",
    "12.3 空气动力学设计",
    "12.4 制造流程",
  ],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsDesignManufacturingMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsDesignManufacturingExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsDesignManufacturingEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
