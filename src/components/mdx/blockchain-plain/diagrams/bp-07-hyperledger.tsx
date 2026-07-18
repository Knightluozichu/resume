import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = [
  "区块链开发平台：超级账本",
  "项目介绍",
  "项目背景",
  "项目组成",
  "Fabric项目",
  "Fabric基本运行分析",
] as const;

export function Bp07HyperledgerFlowLab() {
  return (
    <OfficialBpBookLab
      title="第7章 区块链开发平台：超级账本"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function Bp07HyperledgerExperimentLab() {
  return (
    <OfficialBpBookLab
      title="第7章 区块链开发平台：超级账本"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function Bp07HyperledgerEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="第7章 区块链开发平台：超级账本"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
