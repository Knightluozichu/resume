import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = ["术语", "定义", "依赖", "实现", "证据", "回退"] as const;

export function LslIndexPipelineLab() {
  return (
    <OfficialLslBookLab
      title="索引与概念依赖"
      concepts={concepts}
      accent="#0e7490"
      view="pipeline"
    />
  );
}

export function LslIndexTrainingLab() {
  return (
    <OfficialLslBookLab
      title="索引与概念依赖"
      concepts={concepts}
      accent="#0e7490"
      view="training"
    />
  );
}

export function LslIndexEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="索引与概念依赖"
      concepts={concepts}
      accent="#0e7490"
      view="evidence"
    />
  );
}
