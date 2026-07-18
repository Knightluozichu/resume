import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "Responsible AI",
  "模型层",
  "元提示层",
  "界面层",
  "法规",
  "事件审计",
] as const;

export function Bla12ResponsibleAiFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 12: Responsible AI"
      concepts={concepts}
      accent="#854d0e"
      view="pipeline"
    />
  );
}

export function Bla12ResponsibleAiExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 12: Responsible AI"
      concepts={concepts}
      accent="#854d0e"
      view="training"
    />
  );
}

export function Bla12ResponsibleAiEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 12: Responsible AI"
      concepts={concepts}
      accent="#854d0e"
      view="evidence"
    />
  );
}
