import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_CodeQualityRefactoring_Classes
const officialQualityProps = {
  title: "类与组织",
  stages: [
    "类与组织",
    "痛点场景：上帝类",
    "解决方案：SRP 与高内聚低耦合",
    "SRP：单一职责原则",
    "高内聚",
  ],
  sourceLabel: "Pearson Clean Code + Fowler Refactoring",
} as const;

export function OfficialCodeQualityRefactoringClassesMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialCodeQualityRefactoringClassesExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialCodeQualityRefactoringClassesEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
