import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "提示合同",
  "任务拆分",
  "分隔符",
  "少样本",
  "思维链",
  "ReAct",
] as const;

export function Bla04PromptEngineeringFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 4: Prompt Engineering"
      concepts={concepts}
      accent="#7e22ce"
      view="pipeline"
    />
  );
}

export function Bla04PromptEngineeringExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 4: Prompt Engineering"
      concepts={concepts}
      accent="#7e22ce"
      view="training"
    />
  );
}

export function Bla04PromptEngineeringEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 4: Prompt Engineering"
      concepts={concepts}
      accent="#7e22ce"
      view="evidence"
    />
  );
}
