import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "The Structure of a Transaction",
  "Legacy Transactions",
  "EIP-2930 Transactions",
  "EIP-1559 Transactions",
  "EIP-4844 Transactions",
  "EIP-7702 Transactions",
] as const;

export function Met206TransactionsFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第6章：交易"
      concepts={concepts}
      accent="#1d4ed8"
      view="state"
    />
  );
}

export function Met206TransactionsExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第6章：交易"
      concepts={concepts}
      accent="#1d4ed8"
      view="execution"
    />
  );
}

export function Met206TransactionsEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第6章：交易"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
