import { OfficialMet2BookLab } from "./official-met2-book-lab";

const concepts = [
  "Principles of Consensus",
  "Safety",
  "Finality",
  "Liveness",
  "Block Trees and Forking",
  "Consensus via Proof of Work",
] as const;

export function Met215ConsensusFlowLab() {
  return (
    <OfficialMet2BookLab
      title="第15章：共识"
      concepts={concepts}
      accent="#0e7490"
      view="state"
    />
  );
}

export function Met215ConsensusExperimentLab() {
  return (
    <OfficialMet2BookLab
      title="第15章：共识"
      concepts={concepts}
      accent="#0e7490"
      view="execution"
    />
  );
}

export function Met215ConsensusEvidenceLab() {
  return (
    <OfficialMet2BookLab
      title="第15章：共识"
      concepts={concepts}
      accent="#0e7490"
      view="evidence"
    />
  );
}
