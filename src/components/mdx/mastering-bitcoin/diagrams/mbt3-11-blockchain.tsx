import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 11 The Blockchain",
  "Structure of a Block",
  "Block Header",
  "Block Identifiers: Block Header Hash and Block Height",
  "The Genesis Block",
  "Linking Blocks in the Blockchain",
] as const;

export function Mbt311BlockchainFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 11 The Blockchain"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt311BlockchainExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 11 The Blockchain"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt311BlockchainEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 11 The Blockchain"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
