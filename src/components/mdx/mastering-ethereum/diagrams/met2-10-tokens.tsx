import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "How Tokens Are Used",
  "Tokens and Fungibility",
  "Counterparty Risk",
  "Tokens and Intrinsicality",
  "Utility, Equity, or Cash Grab?",
  "It’s a Duck!",
] as const;

export function Met210TokensFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第10章：代币"
      concepts={concepts}
      accent="#b45309"
      view="state"
    />
  );
}

export function Met210TokensExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第10章：代币"
      concepts={concepts}
      accent="#b45309"
      view="execution"
    />
  );
}

export function Met210TokensEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第10章：代币"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
