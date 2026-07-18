import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = [
  "区块链应用发展",
  "比特币及其朋友圈：加密数字货币",
  "以太坊",
  "比特币现金",
  "莱特币",
  "零币",
] as const;

export function Bp02ApplicationDevelopmentFlowLab() {
  return (
    <OfficialBpBookLab
      title="第2章 区块链应用发展"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function Bp02ApplicationDevelopmentExperimentLab() {
  return (
    <OfficialBpBookLab
      title="第2章 区块链应用发展"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function Bp02ApplicationDevelopmentEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="第2章 区块链应用发展"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
