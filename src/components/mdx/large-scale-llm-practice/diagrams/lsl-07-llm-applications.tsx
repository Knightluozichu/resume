import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = [
  "推理规划",
  "知识库问答",
  "工具调用",
  "代理状态",
  "多模态输入",
  "推理服务",
] as const;

export function Lsl07LlmApplicationsPipelineLab() {
  return (
    <OfficialLslBookLab
      title="第7章 大语言模型应用"
      concepts={concepts}
      accent="#15803d"
      view="pipeline"
    />
  );
}

export function Lsl07LlmApplicationsTrainingLab() {
  return (
    <OfficialLslBookLab
      title="第7章 大语言模型应用"
      concepts={concepts}
      accent="#15803d"
      view="training"
    />
  );
}

export function Lsl07LlmApplicationsEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="第7章 大语言模型应用"
      concepts={concepts}
      accent="#15803d"
      view="evidence"
    />
  );
}
