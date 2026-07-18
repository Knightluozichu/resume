import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "概念索引",
  "代码索引",
  "数据索引",
  "实验索引",
  "失败索引",
  "双向追踪",
] as const;

export function BlaIndexFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Index"
      concepts={concepts}
      accent="#9f1239"
      view="pipeline"
    />
  );
}

export function BlaIndexExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Index"
      concepts={concepts}
      accent="#9f1239"
      view="training"
    />
  );
}

export function BlaIndexEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Index"
      concepts={concepts}
      accent="#9f1239"
      view="evidence"
    />
  );
}
