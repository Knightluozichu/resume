import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "稀疏激活",
  "路由器",
  "专家容量",
  "负载均衡",
  "词元丢弃",
  "专家并行",
] as const;

export function Llm07SparseMoeModelLab() {
  return (
    <OfficialLlmBookLab
      title="第7章 稀疏专家模型"
      concepts={concepts}
      accent="#4338ca"
      view="model"
    />
  );
}
export function Llm07SparseMoeExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第7章 稀疏专家模型"
      concepts={concepts}
      accent="#4338ca"
      view="experiment"
    />
  );
}
export function Llm07SparseMoeEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第7章 稀疏专家模型"
      concepts={concepts}
      accent="#4338ca"
      view="evidence"
    />
  );
}
