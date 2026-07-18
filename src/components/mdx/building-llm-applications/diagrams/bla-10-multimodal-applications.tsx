import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "多模态",
  "Azure AI工具包",
  "Whisper",
  "图像生成",
  "顺序链",
  "发票分析",
] as const;

export function Bla10MultimodalApplicationsFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 10: Building Multimodal Applications with LLMs"
      concepts={concepts}
      accent="#b91c1c"
      view="pipeline"
    />
  );
}

export function Bla10MultimodalApplicationsExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 10: Building Multimodal Applications with LLMs"
      concepts={concepts}
      accent="#b91c1c"
      view="training"
    />
  );
}

export function Bla10MultimodalApplicationsEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 10: Building Multimodal Applications with LLMs"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
