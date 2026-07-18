import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_TransmissionPrinciples
const officialQualityProps = {
  title: "第 4 章：变速器",
  stages: [
    "第4章 变速器",
    "4.1 变速原理",
    "4.2 手动变速器",
    "4.3 同步器",
    "4.4 自动变速器（AT）",
  ],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsTransmissionPrinciplesMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsTransmissionPrinciplesExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsTransmissionPrinciplesEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
