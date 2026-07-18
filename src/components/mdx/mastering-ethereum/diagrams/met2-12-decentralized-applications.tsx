import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "What Is a DApp?",
  "Backend (Smart Contract)",
  "The Tornado Cash Saga",
  "Data Storage",
  "IPFS",
  "Merkle trees",
] as const;

export function Met212DecentralizedApplicationsFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第12章：去中心化应用"
      concepts={concepts}
      accent="#0f766e"
      view="state"
    />
  );
}

export function Met212DecentralizedApplicationsExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第12章：去中心化应用"
      concepts={concepts}
      accent="#0f766e"
      view="execution"
    />
  );
}

export function Met212DecentralizedApplicationsEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第12章：去中心化应用"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
