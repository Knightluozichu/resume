import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = ["技术审校"] as const;

export function BpTechnicalReviewFlowLab() {
  return (
    <OfficialBpBookLab
      title="技术审校"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function BpTechnicalReviewExperimentLab() {
  return (
    <OfficialBpBookLab
      title="技术审校"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function BpTechnicalReviewEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="技术审校"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
