import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_HeadFirstDesignPatterns_HfdIteratorComposite
const officialQualityProps = {
  title: "第9章 迭代器与组合模式",
  stages: [
    "第9章 迭代器与组合模式",
    "统一遍历",
    "单一职责",
    "树形结构",
    "叶节点",
  ],
  sourceLabel: "O'Reilly Head First Design Patterns 2e",
} as const;

export function OfficialHeadFirstDesignPatternsHfdIteratorCompositeMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialHeadFirstDesignPatternsHfdIteratorCompositeExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialHeadFirstDesignPatternsHfdIteratorCompositeEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
