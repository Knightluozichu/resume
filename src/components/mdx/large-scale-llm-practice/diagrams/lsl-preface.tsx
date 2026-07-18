import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = [
  "研究背景",
  "构建主线",
  "理论基础",
  "工程实践",
  "章节依赖",
  "证据边界",
] as const;

export function LslPrefacePipelineLab() {
  return (
    <OfficialLslBookLab
      title="前言"
      concepts={concepts}
      accent="#b45309"
      view="pipeline"
    />
  );
}

export function LslPrefaceTrainingLab() {
  return (
    <OfficialLslBookLab
      title="前言"
      concepts={concepts}
      accent="#b45309"
      view="training"
    />
  );
}

export function LslPrefaceEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="前言"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
