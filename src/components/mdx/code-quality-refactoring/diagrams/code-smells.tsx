import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_CodeQualityRefactoring_CodeSmells
const officialQualityProps = {
  title: "代码异味",
  stages: [
    "代码异味",
    "痛点场景：闻到坏味道却说不出名字",
    "解决方案：三大异味分类",
    "1. 冗余异味（说得太多）",
    "2. 复杂异味（想得太多）",
  ],
  sourceLabel: "Pearson Clean Code + Fowler Refactoring",
} as const;

export function OfficialCodeQualityRefactoringCodeSmellsMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialCodeQualityRefactoringCodeSmellsExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialCodeQualityRefactoringCodeSmellsEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
