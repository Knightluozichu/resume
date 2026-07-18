import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = [
  "初识区块链",
  "例说区块链",
  "从一本账本说起",
  "区块链技术理念",
  "一般工作流程",
  "区块链技术栈",
] as const;

export function Bp01FirstBlockchainFlowLab() {
  return (
    <OfficialBpBookLab
      title="第1章 初识区块链"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function Bp01FirstBlockchainExperimentLab() {
  return (
    <OfficialBpBookLab
      title="第1章 初识区块链"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function Bp01FirstBlockchainEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="第1章 初识区块链"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
