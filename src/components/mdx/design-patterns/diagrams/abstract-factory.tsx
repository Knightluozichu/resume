import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_AbstractFactory
const officialQualityProps = {
  title: "抽象工厂模式",
  stages: ["抽象工厂模式", "意图", "适用性", "结构", "协作"],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsAbstractFactoryMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsAbstractFactoryExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsAbstractFactoryEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
