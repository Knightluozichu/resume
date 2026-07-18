import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = [
  "通用数据",
  "专业数据",
  "质量过滤",
  "近重复",
  "隐私治理",
  "开源集合",
] as const;

export function Lsl03PretrainingDataPipelineLab() {
  return (
    <OfficialLslBookLab
      title="第3章 大语言模型预训练数据"
      concepts={concepts}
      accent="#7e22ce"
      view="pipeline"
    />
  );
}

export function Lsl03PretrainingDataTrainingLab() {
  return (
    <OfficialLslBookLab
      title="第3章 大语言模型预训练数据"
      concepts={concepts}
      accent="#7e22ce"
      view="training"
    />
  );
}

export function Lsl03PretrainingDataEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="第3章 大语言模型预训练数据"
      concepts={concepts}
      accent="#7e22ce"
      view="evidence"
    />
  );
}
