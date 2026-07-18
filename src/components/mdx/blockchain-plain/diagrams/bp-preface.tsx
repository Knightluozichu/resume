import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = ["前言"] as const;

export function BpPrefaceFlowLab() {
  return (
    <OfficialBpBookLab
      title="前言"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function BpPrefaceExperimentLab() {
  return (
    <OfficialBpBookLab
      title="前言"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function BpPrefaceEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="前言"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
