import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 13 Bitcoin Security",
  "Security Principles",
  "Developing Bitcoin Systems Securely",
  "The Root of Trust",
  "User Security Best Practices",
  "Physical Bitcoin Storage",
] as const;

export function Mbt313SecurityFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 13 Bitcoin Security"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt313SecurityExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 13 Bitcoin Security"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt313SecurityEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 13 Bitcoin Security"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
