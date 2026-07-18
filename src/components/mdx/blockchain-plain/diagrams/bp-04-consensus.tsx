import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = [
  "区块链灵魂：共识算法",
  "分布式系统的一致性",
  "一致性问题",
  "两个原理：FLP与CAP",
  "拜占庭将军问题",
  "共识算法的目的",
] as const;

export function Bp04ConsensusFlowLab() {
  return (
    <OfficialBpBookLab
      title="第4章 区块链灵魂：共识算法"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function Bp04ConsensusExperimentLab() {
  return (
    <OfficialBpBookLab
      title="第4章 区块链灵魂：共识算法"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function Bp04ConsensusEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="第4章 区块链灵魂：共识算法"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
