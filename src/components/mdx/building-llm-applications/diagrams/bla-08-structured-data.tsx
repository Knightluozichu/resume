import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "结构化数据",
  "Chinook",
  "DBCopilot",
  "SQL Agent",
  "只读权限",
  "查询审计",
] as const;

export function Bla08StructuredDataFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 8: Using LLMs with Structured Data"
      concepts={concepts}
      accent="#15803d"
      view="pipeline"
    />
  );
}

export function Bla08StructuredDataExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 8: Using LLMs with Structured Data"
      concepts={concepts}
      accent="#15803d"
      view="training"
    />
  );
}

export function Bla08StructuredDataEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 8: Using LLMs with Structured Data"
      concepts={concepts}
      accent="#15803d"
      view="evidence"
    />
  );
}
