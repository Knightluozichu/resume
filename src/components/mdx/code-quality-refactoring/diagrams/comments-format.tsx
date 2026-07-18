import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_CodeQualityRefactoring_CommentsFormat
const officialQualityProps = {
  title: "注释与格式",
  stages: [
    "注释与格式",
    "痛点场景：注释在撒谎",
    "解决方案：让代码自解释",
    "好注释（值得写）",
    "坏注释（该删或该改代码）",
  ],
  sourceLabel: "Pearson Clean Code + Fowler Refactoring",
} as const;

export function OfficialCodeQualityRefactoringCommentsFormatMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialCodeQualityRefactoringCommentsFormatExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialCodeQualityRefactoringCommentsFormatEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
