import { OfficialBdpBookLab } from "./official-bdp-book-lab";

const concepts = ["前言"] as const;

export function BdpPrefaceFlowLab() {
  return (
    <OfficialBdpBookLab
      title="前言"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function BdpPrefaceExperimentLab() {
  return (
    <OfficialBdpBookLab
      title="前言"
      concepts={concepts}
      accent="#047857"
      view="state"
    />
  );
}

export function BdpPrefaceEvidenceLab() {
  return (
    <OfficialBdpBookLab
      title="前言"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
