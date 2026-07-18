import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 12 Mining and Consensus",
  "Bitcoin Economics and Currency Creation",
  "Decentralized Consensus",
  "Independent Verification of Transactions",
  "Mining Nodes",
  "The Coinbase Transaction",
] as const;

export function Mbt312MiningConsensusFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 12 Mining and Consensus"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt312MiningConsensusExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 12 Mining and Consensus"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt312MiningConsensusEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 12 Mining and Consensus"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
