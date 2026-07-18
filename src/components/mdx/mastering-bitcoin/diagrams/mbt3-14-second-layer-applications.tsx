import { OfficialMbt3BookLab } from "./official-mbt3-book-lab";

const concepts = [
  "Chapter 14 Second-Layer Applications",
  "Building Blocks (Primitives)",
  "Applications from Building Blocks",
  "Colored Coins",
  "Single-Use Seals",
  "Pay to Contract (P2C)",
] as const;

export function Mbt314SecondLayerApplicationsFlowLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 14 Second-Layer Applications"
      concepts={concepts}
      accent="#0369a1"
      view="transaction"
    />
  );
}

export function Mbt314SecondLayerApplicationsExperimentLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 14 Second-Layer Applications"
      concepts={concepts}
      accent="#047857"
      view="proof"
    />
  );
}

export function Mbt314SecondLayerApplicationsEvidenceLab() {
  return (
    <OfficialMbt3BookLab
      title="Chapter 14 Second-Layer Applications"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
