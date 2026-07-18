import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 2 How Bitcoin Works",
  "Bitcoin Overview",
  "Buying from an Online Store",
  "Bitcoin Transactions",
  "Transaction Inputs and Outputs",
  "Transaction Chains",
] as const;

export function Mbt302HowBitcoinWorksFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 2 How Bitcoin Works"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt302HowBitcoinWorksExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 2 How Bitcoin Works"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt302HowBitcoinWorksEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 2 How Bitcoin Works"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
