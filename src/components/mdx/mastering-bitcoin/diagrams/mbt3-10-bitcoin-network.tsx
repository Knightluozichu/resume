import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 10 The Bitcoin Network",
  "Node Types and Roles",
  "The Network",
  "Compact Block Relay",
  "Private Block Relay Networks",
  "Network Discovery",
] as const;

export function Mbt310BitcoinNetworkFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 10 The Bitcoin Network"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt310BitcoinNetworkExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 10 The Bitcoin Network"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt310BitcoinNetworkEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 10 The Bitcoin Network"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
