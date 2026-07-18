import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 9 Transaction Fees",
  "Who Pays the Transaction Fee?",
  "Fees and Fee Rates",
  "Estimating Appropriate Fee Rates",
  "Replace By Fee (RBF) Fee Bumping",
  "Child Pays for Parent (CPFP) Fee Bumping",
] as const;

export function Mbt309TransactionFeesFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 9 Transaction Fees"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt309TransactionFeesExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 9 Transaction Fees"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt309TransactionFeesEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 9 Transaction Fees"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
