import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "How to Use This Book",
  "Intended Audience",
  "Code Examples",
  "Ethereum Addresses and Transactions in this Book",
  "Conventions Used in This Book",
  "Using Code Examples",
] as const;

export function Met2PrefaceFlowLab() {
  return (
    <OfficialMet2BookLab
      title="前言：版本、读者与证据合同"
      concepts={concepts}
      accent="#0f766e"
      view="state"
    />
  );
}

export function Met2PrefaceExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="前言：版本、读者与证据合同"
      concepts={concepts}
      accent="#0f766e"
      view="execution"
    />
  );
}

export function Met2PrefaceEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="前言：版本、读者与证据合同"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
