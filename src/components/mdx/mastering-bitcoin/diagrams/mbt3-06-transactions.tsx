import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 6 Transactions",
  "A Serialized Bitcoin Transaction",
  "Version",
  "Extended Marker and Flag",
  "Inputs",
  "Length of Transaction Input List",
] as const;

export function Mbt306TransactionsFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 6 Transactions"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt306TransactionsExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 6 Transactions"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt306TransactionsEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 6 Transactions"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
