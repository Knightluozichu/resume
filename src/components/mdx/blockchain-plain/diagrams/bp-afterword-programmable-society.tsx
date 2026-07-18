import { OfficialBpBookLab } from "./official-bp-book-lab";

const concepts = ["后记 区块链与可编程社会"] as const;

export function BpAfterwordProgrammableSocietyFlowLab() {
  return (
    <OfficialBpBookLab
      title="后记 区块链与可编程社会"
      concepts={concepts}
      accent="#0369a1"
      view="ledger"
    />
  );
}

export function BpAfterwordProgrammableSocietyExperimentLab() {
  return (
    <OfficialBpBookLab
      title="后记 区块链与可编程社会"
      concepts={concepts}
      accent="#047857"
      view="consensus"
    />
  );
}

export function BpAfterwordProgrammableSocietyEvidenceLab() {
  return (
    <OfficialBpBookLab
      title="后记 区块链与可编程社会"
      concepts={concepts}
      accent="#a16207"
      view="evidence"
    />
  );
}
